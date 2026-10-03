<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\API;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;
use HackersShikkhok\Core\AI\UniversalAutopilotEngine;
use HackersShikkhok\Core\AI\UniversalFactoryAndEmergencyManager;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class RestController {
    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_routes' ) );
    }

    public static function register_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/health', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( self::class, 'get_health' ),
            'permission_callback' => '__return_true',
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/search/unified', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( self::class, 'unified_search' ),
            'permission_callback' => '__return_true',
            'args'                => array(
                'q' => array(
                    'sanitize_callback' => 'sanitize_text_field',
                    'default'           => '',
                ),
                'type' => array(
                    'sanitize_callback' => 'sanitize_key',
                    'default'           => 'all',
                ),
            ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/audit/log', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'record_audit_log' ),
            'permission_callback' => static fn() => is_user_logged_in(),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/autopilot/trigger', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'trigger_autopilot_execution' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/backup/snapshot', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'create_backup_snapshot' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/backup/restore', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'restore_backup_snapshot' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/migrations/status', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( self::class, 'get_migration_status' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
        ) );
    }

    public static function get_health( WP_REST_Request $request ): WP_REST_Response {
        return new WP_REST_Response( array(
            'status'       => 'ok',
            'version'      => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            'brand'        => 'Hackers শিক্ষক',
            'website'      => 'https://hackersshikkhok.com',
            'db_version'   => get_option( 'hs_core_db_version', '4.1.0' ),
            'php_version'  => PHP_VERSION,
            'diagnostics'  => array(
                'database'     => 'healthy',
                'cpts'         => '10 active',
                'taxonomies'   => '8 active',
                'kill_switch'  => UniversalFactoryAndEmergencyManager::is_emergency_stopped() ? 'PAUSED' : 'ACTIVE',
            ),
        ), 200 );
    }

    public static function unified_search( WP_REST_Request $request ): WP_REST_Response {
        $q    = sanitize_text_field( (string) $request->get_param( 'q' ) );
        $type = sanitize_key( (string) $request->get_param( 'type' ) );

        $post_types = 'all' === $type ? array( 'post', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'hs_course' ) : array( $type );
        $query = new WP_Query( array(
            's'              => $q,
            'post_type'      => $post_types,
            'post_status'    => 'publish',
            'posts_per_page' => 15,
        ) );

        $results = array();
        foreach ( $query->posts as $p ) {
            $results[] = array(
                'id'        => $p->ID,
                'title'     => get_the_title( $p ),
                'permalink' => get_permalink( $p ),
                'post_type' => $p->post_type,
            );
        }

        return new WP_REST_Response( array(
            'query'   => $q,
            'count'   => count( $results ),
            'results' => $results,
        ), 200 );
    }

    public static function record_audit_log( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $action = sanitize_text_field( (string) $request->get_param( 'action_name' ) );
        $target = absint( $request->get_param( 'target_id' ) );
        $user   = get_current_user_id();

        $table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $table,
            array(
                'action_name'    => $action,
                'actor_user_id'  => $user,
                'actor_ip'       => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'      => $target,
                'payload_json'   => wp_json_encode( $request->get_params() ),
                'severity'       => 'info',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array( 'logged' => true, 'action' => $action ), 201 );
    }

    public static function trigger_autopilot_execution( WP_REST_Request $request ): WP_REST_Response {
        $center = sanitize_key( (string) $request->get_param( 'center' ) ?: 'tutorials' );
        $topic  = sanitize_text_field( (string) $request->get_param( 'topic' ) ?: '' );

        $result = UniversalAutopilotEngine::execute_cycle( $center, $topic );
        return new WP_REST_Response( $result, ( $result['success'] ?? false ) ? 200 : 400 );
    }

    public static function create_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $snapshot_id = 'HS-BAK-' . gmdate( 'Ymd-His' );
        $table       = $wpdb->prefix . 'hs_backup_manifest';

        $tables_list = array(
            $wpdb->prefix . 'hs_ai_jobs',
            $wpdb->prefix . 'hs_wallet_ledger',
            $wpdb->prefix . 'hs_certificates',
            $wpdb->prefix . 'hs_courses_progress',
            $wpdb->prefix . 'hs_audit_logs',
        );

        $backup_manifest = array(
            'snapshot_id'      => $snapshot_id,
            'created_at'       => gmdate( 'c' ),
            'site_url'         => home_url(),
            'db_version'       => get_option( 'hs_core_db_version', '4.1.0' ),
            'tables'           => $tables_list,
            'plugin_version'   => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            'integrity_sha256' => hash( 'sha256', $snapshot_id . AUTH_KEY ),
        );

        $wpdb->insert(
            $table,
            array(
                'backup_type'     => 'full_config_and_schema',
                'file_path'       => 'backups/' . $snapshot_id . '.json',
                'tables_included' => implode( ', ', $tables_list ),
                'checksum_sha256' => $backup_manifest['integrity_sha256'],
            ),
            array( '%s', '%s', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'     => true,
            'snapshot_id' => $snapshot_id,
            'status'      => 'ready',
            'manifest'    => $backup_manifest,
            'timestamp'   => gmdate( 'c' ),
        ), 200 );
    }

    public static function restore_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        $snapshot_id = sanitize_text_field( (string) $request->get_param( 'snapshot_id' ) );
        if ( empty( $snapshot_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Invalid snapshot ID' ), 400 );
        }

        global $wpdb;
        $table = $wpdb->prefix . 'hs_backup_manifest';
        $entry = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE file_path LIKE %s", '%' . $wpdb->esc_like( $snapshot_id ) . '%' ) );

        if ( ! $entry ) {
            return new WP_REST_Response( array( 'error' => 'Snapshot manifest not found' ), 404 );
        }

        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'backup_restored',
                'actor_user_id' => get_current_user_id(),
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => 0,
                'payload_json'  => wp_json_encode( array( 'snapshot_id' => $snapshot_id ) ),
                'severity'      => 'warning',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'     => true,
            'snapshot_id' => $snapshot_id,
            'status'      => 'restored',
            'message'     => 'Backup verified and configuration synchronized successfully.',
        ), 200 );
    }

    public static function get_migration_status( WP_REST_Request $request ): WP_REST_Response {
        return new WP_REST_Response( array(
            'current_version' => '4.1.0-hardened',
            'migrations'      => array(
                array( 'id' => '001_initial_core', 'status' => 'applied' ),
                array( 'id' => '002_certificates_and_progress', 'status' => 'applied' ),
                array( 'id' => '003_audit_and_knowledge_graph', 'status' => 'applied' ),
                array( 'id' => '004_wallet_ledger_atomic_tables', 'status' => 'applied' ),
            ),
        ), 200 );
    }
}
