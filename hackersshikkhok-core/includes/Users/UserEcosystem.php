<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Users;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Authoritative User Wallet Ledger & Learning XP System
 * Strictly separates non-monetary Learning Points/XP/Badges from Monetary Wallet Balance (BDT).
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class UserEcosystem {

    /**
     * Get authoritative wallet balance and learning XP without hardcoded fallbacks
     */
    public static function get_wallet_summary( int $user_id ): array {
        global $wpdb;
        if ( $user_id <= 0 ) {
            return array(
                'balance_bdt' => 0.0,
                'points'      => 0,
                'note'        => 'Unauthenticated guest user.',
            );
        }

        $balance_meta = get_user_meta( $user_id, '_hs_wallet_balance_bdt', true );
        $balance = '' !== $balance_meta ? (float) $balance_meta : 0.0;

        $points_meta = get_user_meta( $user_id, '_hs_learning_xp', true );
        if ( '' === $points_meta ) {
            $points_meta = get_user_meta( $user_id, '_hs_learning_points', true );
        }
        $points = '' !== $points_meta ? (int) $points_meta : 0;

        return array(
            'balance_bdt' => $balance,
            'points'      => $points,
            'note'        => 'Points and Monetary Balance are strictly separated and persisted in DB.',
        );
    }

    /**
     * Atomically records a transaction in the database ledger
     */
    public static function record_ledger_transaction(
        int $user_id,
        string $transaction_type,
        float $amount_bdt,
        string $description,
        string $reference_id = ''
    ): array {
        global $wpdb;
        if ( $user_id <= 0 || $amount_bdt <= 0 ) {
            return array( 'success' => false, 'error' => 'Invalid parameters' );
        }

        $table = $wpdb->prefix . 'hs_wallet_ledger';
        $current_balance = (float) get_user_meta( $user_id, '_hs_wallet_balance_bdt', true );

        if ( 'debit' === $transaction_type && $current_balance < $amount_bdt ) {
            return array( 'success' => false, 'error' => 'Insufficient wallet balance' );
        }

        $new_balance = 'credit' === $transaction_type ? ( $current_balance + $amount_bdt ) : ( $current_balance - $amount_bdt );

        $wpdb->query( 'START TRANSACTION' );

        $inserted = $wpdb->insert(
            $table,
            array(
                'user_id'          => $user_id,
                'transaction_type' => $transaction_type,
                'amount_bdt'       => $amount_bdt,
                'balance_after'    => $new_balance,
                'description'      => sanitize_text_field( $description ),
                'reference_id'     => sanitize_text_field( $reference_id ?: 'TXN-' . wp_generate_uuid4() ),
                'created_at'       => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%s', '%f', '%f', '%s', '%s', '%s' )
        );

        if ( false === $inserted ) {
            $wpdb->query( 'ROLLBACK' );
            return array( 'success' => false, 'error' => 'Database transaction failed' );
        }

        update_user_meta( $user_id, '_hs_wallet_balance_bdt', $new_balance );
        $wpdb->query( 'COMMIT' );

        return array(
            'success'       => true,
            'new_balance'   => $new_balance,
            'transaction_id'=> $wpdb->insert_id,
        );
    }

    /**
     * Awards Learning XP to a user
     */
    public static function award_learning_xp( int $user_id, int $xp_amount, string $reason = '' ): int {
        if ( $user_id <= 0 || $xp_amount <= 0 ) {
            return 0;
        }

        $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
        $updated_xp = $current_xp + $xp_amount;
        update_user_meta( $user_id, '_hs_learning_xp', $updated_xp );

        global $wpdb;
        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'xp_awarded',
                'actor_user_id' => $user_id,
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => $user_id,
                'payload_json'  => wp_json_encode( array( 'xp' => $xp_amount, 'total' => $updated_xp, 'reason' => $reason ) ),
                'severity'      => 'info',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return $updated_xp;
    }
}
