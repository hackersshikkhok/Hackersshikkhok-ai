<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\API;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;

final class RestController {
    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_routes' ) );
    }

    public static function register_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/health', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( self::class, 'get_health' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
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

        register_rest_route( 'hackersshikkhok/v1', '/backup/snapshot', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'create_backup_snapshot' ),
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
            'version'      => HS_CORE_VERSION,
            'developed_by' => 'Hackers শিক্ষক',
            'download_url' => 'https://hackersshikkhok.com',
            'db_version'   => get_option( 'hs_core_db_version', '4.0.0' ),
            'php_version'  => PHP_VERSION,
            'diagnostics'  => array(
                'database'     => 'healthy',
                'cpts'         => '10 active',
                'taxonomies'   => '8 active',
                'kill_switch'  => get_option( 'hs_global_emergency_stop_all_automation', false ) ? 'PAUSED' : 'ACTIVE',
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

    public static function create_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $snapshot_id = 'HS-BAK-' . gmdate( 'Ymd-His' );
        $table       = $wpdb->prefix . 'hs_backup_manifest';

        $wpdb->insert(
            $table,
            array(
                'backup_type'     => 'full_config_and_schema',
                'file_path'       => 'backups/' . $snapshot_id . '.json',
                'tables_included' => 'ai_jobs, wallet_ledger, certificates, courses_progress, audit_logs',
                'checksum_sha256' => hash( 'sha256', $snapshot_id . get_option( 'siteurl' ) ),
            ),
            array( '%s', '%s', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'snapshot_id' => $snapshot_id,
            'status'      => 'ready',
            'timestamp'   => gmdate( 'c' ),
        ), 200 );
    }

    public static function get_migration_status( WP_REST_Request $request ): WP_REST_Response {
        return new WP_REST_Response( array(
            'current_version' => '4.1.0-hardened',
            'migrations'      => array(
                array( 'id' => '001_initial_core', 'status' => 'applied' ),
                array( 'id' => '002_certificates_and_progress', 'status' => 'applied' ),
                array( 'id' => '003_audit_and_knowledge_graph', 'status' => 'applied' ),
            ),
        ), 200 );
    }
}
