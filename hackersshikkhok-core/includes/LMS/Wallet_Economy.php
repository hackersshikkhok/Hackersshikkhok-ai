<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

/**
 * Class Wallet_Economy
 * 
 * MODULE 5: BDT WALLET, GAMIFIED ECONOMY & REAL PAYMENT WEBHOOKS
 * - Manages BDT Cash Balance and XP Points
 * - Reward Triggers: comments, likes, CTF solves
 * - Spend Triggers: AI power levels, terminal execution time, premium courses
 * - Real Payment Gateway Webhooks (bKash, Nagad, SSLCommerz) with HMAC signature validation
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class Wallet_Economy {

    public const WEBHOOK_SECRET_KEY = 'hs_cyber_payment_hmac_secret_2026';

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
        add_action( 'comment_post', array( self::class, 'on_user_comment_posted' ), 10, 3 );
    }

    public static function register_rest_endpoints(): void {
        $namespaces = array( 'lms/v1', 'hackersshikkhok/v1' );

        foreach ( $namespaces as $ns ) {
            register_rest_route( $ns, '/wallet/me', array(
                'methods'             => 'GET',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_get_wallet' ),
            ) );

            register_rest_route( $ns, '/wallet/spend', array(
                'methods'             => 'POST',
                'permission_callback' => array( self::class, 'check_user_auth' ),
                'callback'            => array( self::class, 'rest_spend_balance' ),
            ) );

            register_rest_route( $ns, '/payment/webhook', array(
                'methods'             => 'POST',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_handle_payment_webhook' ),
            ) );
        }
    }

    public static function check_user_auth(): bool {
        return is_user_logged_in() || ( defined( 'WP_DEBUG' ) && WP_DEBUG );
    }

    /**
     * Get user wallet row with table fallback
     */
    public static function get_wallet( int $user_id ): array {
        global $wpdb;
        $wallet_table = $wpdb->prefix . 'user_wallet';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$wallet_table}'" ) !== $wallet_table ) {
            $wallet_table = $wpdb->prefix . 'cyber_user_wallet';
        }

        $row = $wpdb->get_row(
            $wpdb->prepare( "SELECT * FROM {$wallet_table} WHERE user_id = %d LIMIT 1", $user_id ),
            ARRAY_A
        );

        if ( ! $row ) {
            $initial_data = array(
                'user_id'        => $user_id,
                'balance_bdt'    => 50.00,
                'xp_points'      => 200,
                'level'          => 1,
                'rank_title'     => 'Cyber Cadet',
                'power_level'    => 'low',
                'pending_payout' => 0.00,
            );
            $wpdb->insert( $wallet_table, $initial_data );
            $row = $initial_data;
            $row['id'] = $wpdb->insert_id;
        }

        return $row;
    }

    /**
     * Credit funds and XP
     */
    public static function credit( int $user_id, float $amount_bdt, int $xp_points, string $reason = '' ): bool {
        global $wpdb;
        $wallet_table = $wpdb->prefix . 'user_wallet';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$wallet_table}'" ) !== $wallet_table ) {
            $wallet_table = $wpdb->prefix . 'cyber_user_wallet';
        }

        self::get_wallet( $user_id ); // ensure row exists

        $updated = $wpdb->query( $wpdb->prepare(
            "UPDATE {$wallet_table} 
             SET balance_bdt = balance_bdt + %f, 
                 xp_points = xp_points + %d,
                 updated_at = NOW() 
             WHERE user_id = %d",
            $amount_bdt,
            $xp_points,
            $user_id
        ) );

        self::recalculate_rank( $user_id );
        return (bool) $updated;
    }

    /**
     * Debit balance
     */
    public static function debit( int $user_id, float $amount_bdt, int $xp_points = 0, string $reason = '' ): bool {
        global $wpdb;
        $wallet = self::get_wallet( $user_id );

        if ( floatval( $wallet['balance_bdt'] ) < $amount_bdt ) {
            return false;
        }

        $wallet_table = $wpdb->prefix . 'user_wallet';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$wallet_table}'" ) !== $wallet_table ) {
            $wallet_table = $wpdb->prefix . 'cyber_user_wallet';
        }

        $updated = $wpdb->query( $wpdb->prepare(
            "UPDATE {$wallet_table} 
             SET balance_bdt = GREATEST(0, balance_bdt - %f),
                 xp_points = GREATEST(0, xp_points - %d),
                 updated_at = NOW() 
             WHERE user_id = %d",
            $amount_bdt,
            $xp_points,
            $user_id
        ) );

        return (bool) $updated;
    }

    /**
     * Recalculate rank based on XP
     */
    public static function recalculate_rank( int $user_id ): void {
        global $wpdb;
        $wallet_table = $wpdb->prefix . 'user_wallet';
        if ( $wpdb->get_var( "SHOW TABLES LIKE '{$wallet_table}'" ) !== $wallet_table ) {
            $wallet_table = $wpdb->prefix . 'cyber_user_wallet';
        }

        $xp = (int) $wpdb->get_var( $wpdb->prepare( "SELECT xp_points FROM {$wallet_table} WHERE user_id = %d", $user_id ) );

        $rank = 'Cyber Cadet';
        $level = 1;

        if ( $xp >= 5000 ) {
            $rank = 'Cyber Overlord (Insane)';
            $level = 5;
        } elseif ( $xp >= 2500 ) {
            $rank = 'Red Team Specialist';
            $level = 4;
        } elseif ( $xp >= 1000 ) {
            $rank = 'Cyber Operative';
            $level = 3;
        } elseif ( $xp >= 400 ) {
            $rank = 'Security Apprentice';
            $level = 2;
        }

        $wpdb->update(
            $wallet_table,
            array( 'rank_title' => $rank, 'level' => $level ),
            array( 'user_id' => $user_id ),
            array( '%s', '%d' ),
            array( '%d' )
        );
    }

    /**
     * Reward user on comment
     */
    public static function on_user_comment_posted( int $comment_id, int|string $approved, array $commentdata ): void {
        $user_id = (int) ( $commentdata['user_id'] ?? 0 );
        if ( $user_id > 0 ) {
            self::credit( $user_id, 5.00, 50, 'Community Comment Contribution' );
        }
    }

    /**
     * REST endpoint to get wallet status
     */
    public static function rest_get_wallet( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id() ?: 1;
        $wallet = self::get_wallet( $user_id );

        return new WP_REST_Response( array(
            'success'     => true,
            'user_id'     => $user_id,
            'balance_bdt' => floatval( $wallet['balance_bdt'] ),
            'xp_points'   => intval( $wallet['xp_points'] ),
            'level'       => intval( $wallet['level'] ),
            'rank_title'  => $wallet['rank_title'],
            'power_level' => $wallet['power_level'] ?? 'low',
        ), 200 );
    }

    /**
     * REST endpoint to spend wallet balance
     */
    public static function rest_spend_balance( WP_REST_Request $request ): WP_REST_Response {
        $params = $request->get_json_params();
        $user_id = get_current_user_id() ?: 1;
        $purpose = sanitize_text_field( $params['purpose'] ?? 'power_level_upgrade' );
        $amount_bdt = floatval( $params['amount_bdt'] ?? 25.00 );

        $success = self::debit( $user_id, $amount_bdt, 0, $purpose );
        if ( ! $success ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => 'অপর্যাপ্ত ব্যালেন্স! বিকাশ বা নগদে ওয়ালেট টপ-আপ করুন।',
            ), 400 );
        }

        // If spent for power level
        if ( false !== strpos( $purpose, 'power_level' ) ) {
            $target_power = $params['target_power'] ?? 'high';
            update_user_meta( $user_id, 'hs_cyber_power_level', $target_power );
        }

        $updated = self::get_wallet( $user_id );
        return new WP_REST_Response( array(
            'success'         => true,
            'message'         => 'সফলভাবে ট্রানজাকশন সম্পন্ন হয়েছে!',
            'new_balance_bdt' => floatval( $updated['balance_bdt'] ),
            'xp_points'       => intval( $updated['xp_points'] ),
        ), 200 );
    }

    /**
     * Real Payment Gateway Webhook (bKash, Nagad, SSLCommerz)
     */
    public static function rest_handle_payment_webhook( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $payload_raw = $request->get_body();
        $headers     = $request->get_headers();
        $params      = $request->get_json_params() ?: $request->get_params();

        $gateway   = sanitize_text_field( $params['gateway'] ?? 'bkash' );
        $trx_id    = sanitize_text_field( $params['trx_id'] ?? ( $params['paymentID'] ?? 'TRX_' . time() ) );
        $amount    = floatval( $params['amount'] ?? 100.00 );
        $user_id   = intval( $params['user_id'] ?? ( $params['customer_id'] ?? 1 ) );
        $signature = sanitize_text_field( $headers['x_signature'][0] ?? ( $params['signature'] ?? '' ) );

        // HMAC signature verification
        $expected_sig = hash_hmac( 'sha256', $trx_id . '|' . number_format( $amount, 2, '.', '' ), self::WEBHOOK_SECRET_KEY );

        // In test mode or when matching
        $sig_valid = ( empty( $signature ) && defined( 'WP_DEBUG' ) && WP_DEBUG ) || hash_equals( $expected_sig, $signature );

        if ( ! $sig_valid && ! ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => 'Invalid HMAC Signature. Verification failed.',
            ), 403 );
        }

        // Record payment transaction
        $pay_table = $wpdb->prefix . 'payment_transactions';
        $existing = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$pay_table} WHERE trx_id = %s LIMIT 1", $trx_id ) );

        if ( $existing ) {
            return new WP_REST_Response( array(
                'success' => true,
                'message' => 'Transaction already processed.',
                'trx_id'  => $trx_id,
            ), 200 );
        }

        $wpdb->insert(
            $pay_table,
            array(
                'user_id'        => $user_id,
                'gateway'        => $gateway,
                'trx_id'         => $trx_id,
                'amount_bdt'     => $amount,
                'status'         => 'completed',
                'signature_hash' => $signature ?: $expected_sig,
                'payload_json'   => json_encode( $params ),
                'created_at'     => current_time( 'mysql' ),
            ),
            array( '%d', '%s', '%s', '%f', '%s', '%s', '%s', '%s' )
        );

        // Credit BDT balance directly to user wallet
        self::credit( $user_id, $amount, intval( $amount * 2 ), "Payment Gateway Topup via {$gateway} (TRX: {$trx_id})" );

        return new WP_REST_Response( array(
            'success'    => true,
            'message'    => "Payment successfully credited via {$gateway}!",
            'trx_id'     => $trx_id,
            'amount_bdt' => $amount,
            'status'     => 'completed',
        ), 200 );
    }
}
