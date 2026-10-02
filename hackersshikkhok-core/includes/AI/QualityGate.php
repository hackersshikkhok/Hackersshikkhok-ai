<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class QualityGate {
    public static function evaluate( array $metrics ): array {
        $score = 0;
        $score += min( 20, (int) ( $metrics['originality'] ?? 0 ) );
        $score += min( 20, (int) ( $metrics['technical_usefulness'] ?? 0 ) );
        $score += min( 20, (int) ( $metrics['code_validity'] ?? 0 ) );
        $score += min( 15, (int) ( $metrics['seo'] ?? 0 ) );
        $score += min( 10, (int) ( $metrics['security'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['ux'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['documentation'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['sources'] ?? 0 ) );

        $decision = 'repair_required';
        if ( $score >= 85 ) {
            $decision = 'eligible';
        } elseif ( $score >= 70 ) {
            $decision = 'review_required';
        }

        return array(
            'total_score' => $score,
            'decision'    => $decision,
        );
    }
}
