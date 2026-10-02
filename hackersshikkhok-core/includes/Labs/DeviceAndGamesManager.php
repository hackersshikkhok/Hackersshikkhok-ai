<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Labs;

/**
 * Device Diagnostic Lab & Educational Games Center Score -> Points/Badges/Level progression.
 * Strictly enforces: Points != Monetary Balance.
 */
final class DeviceAndGamesManager {
    public static function record_game_score( int $user_id, string $game_slug, int $score ): array {
        $earned_points = min( 50, max( 5, intdiv( $score, 10 ) ) );
        $current_pts   = (int) get_user_meta( $user_id, '_hs_learning_points', true );
        $new_pts       = $current_pts + $earned_points;
        update_user_meta( $user_id, '_hs_learning_points', $new_pts );

        return array(
            'game_slug'     => sanitize_key( $game_slug ),
            'earned_points' => $earned_points,
            'total_points'  => $new_pts,
            'level'         => max( 1, intdiv( $new_pts, 100 ) + 1 ),
        );
    }
}
