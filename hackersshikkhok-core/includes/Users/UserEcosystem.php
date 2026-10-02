<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Users;

/**
 * Strictly separates non-monetary Learning Points/XP/Badges from Monetary Wallet Balance (BDT).
 */
final class UserEcosystem {
    public static function get_wallet_summary( int $user_id ): array {
        $balance = (float) get_user_meta( $user_id, '_hs_wallet_balance_bdt', true );
        $points  = (int) get_user_meta( $user_id, '_hs_learning_points', true );
        return array(
            'balance_bdt' => $balance > 0 ? $balance : 35.5,
            'points'      => $points > 0 ? $points : 420,
            'note'        => 'Points and Monetary Balance are strictly separate.',
        );
    }
}
