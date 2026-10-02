<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Community;

final class EngagementManager {
    public static function award_streak_points( int $user_id, int $points = 10 ): void {
        $current = (int) get_user_meta( $user_id, '_hs_learning_points', true );
        update_user_meta( $user_id, '_hs_learning_points', $current + $points );
    }
}
