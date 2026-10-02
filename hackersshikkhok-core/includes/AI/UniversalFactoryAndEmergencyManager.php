<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

/**
 * Universal Factory Architecture (11 Factories), Trend Intelligence Gate,
 * Resource Scheduler, and Global Emergency Stop Kill Switch.
 */
final class UniversalFactoryAndEmergencyManager {
    public const FACTORIES = array(
        'content_factory', 'tool_factory', 'course_factory', 'quiz_factory',
        'thumbnail_factory', 'image_factory', 'video_factory', 'document_factory',
        'plugin_factory', 'theme_factory', 'app_factory'
    );

    public static function is_emergency_stopped(): bool {
        return (bool) get_option( 'hs_global_emergency_stop_all_automation', false );
    }

    public static function trigger_emergency_stop( int $admin_user_id, string $reason = 'Admin manual kill switch' ): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        update_option( 'hs_global_emergency_stop_all_automation', true );
        do_action( 'hs_core_admin_audit_log', 'emergency_stop_activated', $admin_user_id, array( 'reason' => sanitize_text_field( $reason ) ) );
    }
}
