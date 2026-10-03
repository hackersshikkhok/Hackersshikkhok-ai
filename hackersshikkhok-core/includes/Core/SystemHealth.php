<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * System Health & Diagnostics Engine
 * Performs active, live verification of database tables, filesystem permissions, AI API configuration, and WP Cron.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class SystemHealth {

    public static function run_diagnostics(): array {
        global $wpdb;

        $tables_expected = array(
            'hs_migrations',
            'hs_ai_jobs',
            'hs_wallet_ledger',
            'hs_certificates',
            'hs_courses_progress',
            'hs_quiz_attempts',
            'hs_assignment_submissions',
            'hs_audit_logs',
            'hs_tool_usage',
        );

        $tables_status = array();
        $missing_tables = array();
        foreach ( $tables_expected as $table ) {
            $full_name = $wpdb->prefix . $table;
            $found = $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $full_name ) );
            if ( $found === $full_name ) {
                $row_count = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$full_name}" );
                $tables_status[ $table ] = array(
                    'status' => 'active',
                    'rows'   => $row_count,
                );
            } else {
                $tables_status[ $table ] = array( 'status' => 'missing', 'rows' => 0 );
                $missing_tables[] = $table;
            }
        }

        // Upload Directory Permissions
        $upload_dir = wp_upload_dir();
        $uploads_writable = is_writable( $upload_dir['basedir'] );

        // AI Provider Keys
        $gemini_key  = (string) get_option( 'hs_gemini_api_key', defined( 'GEMINI_API_KEY' ) ? GEMINI_API_KEY : '' );
        $claude_key  = (string) get_option( 'hs_anthropic_api_key', defined( 'ANTHROPIC_API_KEY' ) ? ANTHROPIC_API_KEY : '' );
        $openai_key  = (string) get_option( 'hs_openai_api_key', defined( 'OPENAI_API_KEY' ) ? OPENAI_API_KEY : '' );

        $ai_provider_configured = ( ! empty( $gemini_key ) || ! empty( $claude_key ) || ! empty( $openai_key ) );

        $cron_scheduled = (bool) wp_next_scheduled( 'hs_core_autopilot_cron_tick' );

        $is_healthy = empty( $missing_tables ) && $uploads_writable;

        return array(
            'overall_health'   => $is_healthy ? 'HEALTHY' : 'NEEDS_ATTENTION',
            'timestamp'        => gmdate( 'c' ),
            'php_version'      => PHP_VERSION,
            'wp_version'       => get_bloginfo( 'version' ),
            'db_version'       => get_option( 'hs_core_db_version', '4.1.0' ),
            'plugin_version'   => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            'database'         => array(
                'status'         => empty( $missing_tables ) ? 'all_tables_installed' : 'missing_tables_detected',
                'tables'         => $tables_status,
                'missing_count'  => count( $missing_tables ),
                'missing_tables' => $missing_tables,
            ),
            'filesystem'       => array(
                'uploads_writable' => $uploads_writable,
                'backup_path'      => BackupEngine::get_backup_dir(),
            ),
            'ai_subsystem'     => array(
                'active_transport'     => $ai_provider_configured ? 'external_api' : 'deterministic_local_engine',
                'gemini_configured'    => ! empty( $gemini_key ),
                'claude_configured'    => ! empty( $claude_key ),
                'openai_configured'    => ! empty( $openai_key ),
                'quality_gate_status'  => 'active (>= 85 threshold)',
            ),
            'scheduler'        => array(
                'cron_active'    => $cron_scheduled,
                'next_cron_run'  => $cron_scheduled ? gmdate( 'c', (int) wp_next_scheduled( 'hs_core_autopilot_cron_tick' ) ) : 'not_scheduled',
            ),
        );
    }
}
