<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class ProvenanceManager {
    public static function record_generation_meta( int $post_id, string $model, int $quality_score ): void {
        update_post_meta( $post_id, '_hs_ai_generated_internal', 1 );
        update_post_meta( $post_id, '_hs_ai_model_id', sanitize_text_field( $model ) );
        update_post_meta( $post_id, '_hs_quality_gate_score', $quality_score );
    }
}
