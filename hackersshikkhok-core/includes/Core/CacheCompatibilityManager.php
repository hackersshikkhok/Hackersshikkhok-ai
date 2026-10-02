<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class CacheCompatibilityManager {
    public static function purge_post_fragments( int $post_id ): void {
        wp_cache_delete( 'hs_post_schema_' . $post_id, 'hs_core' );
        delete_transient( 'hs_center_summary_' . get_post_type( $post_id ) );
    }
}
