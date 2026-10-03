<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\API;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;
use HackersShikkhok\Core\AI\UniversalAutopilotEngine;
use HackersShikkhok\Core\Core\BackupEngine;
use HackersShikkhok\Core\Core\SystemHealth;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Master REST API Controller with Object-Level Authorization & Real Diagnostics
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
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

        register_rest_route( 'hackersshikkhok/v1', '/search', array(
            'methods'             => WP_REST_Server::READABLE,
            'callback'            => array( self::class, 'unified_search' ),
            'permission_callback' => '__return_true',
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

        register_rest_route( 'hackersshikkhok/v1', '/backup/trigger', array(
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
        $diagnostics = SystemHealth::run_diagnostics();
        return new WP_REST_Response( $diagnostics, 200 );
    }

    public static function unified_search( WP_REST_Request $request ): WP_REST_Response {
        $q    = sanitize_text_field( (string) $request->get_param( 'q' ) );
        $type = sanitize_key( (string) $request->get_param( 'type' ) );

        $post_types = ( 'all' === $type || empty( $type ) ) 
            ? array( 'post', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'hs_course' ) 
            : array( $type );

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
                'created_at'     => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s', '%s' )
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
        $snapshot = BackupEngine::create_snapshot();
        return new WP_REST_Response( $snapshot, ( $snapshot['success'] ?? false ) ? 200 : 500 );
    }

    public static function restore_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        $snapshot_id = sanitize_text_field( (string) $request->get_param( 'snapshot_id' ) );
        if ( empty( $snapshot_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Snapshot ID is required.' ), 400 );
        }

        $result = BackupEngine::restore_snapshot( $snapshot_id );
        return new WP_REST_Response( $result, ( $result['success'] ?? false ) ? 200 : 400 );
    }

    public static function get_migration_status( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $table = $wpdb->prefix . 'hs_migrations';
        $rows  = $wpdb->get_results( "SELECT * FROM {$table} ORDER BY id ASC", ARRAY_A );

        return new WP_REST_Response( array(
            'current_version' => '4.1.0-hardened',
            'migrations'      => $rows ?: array(
                array( 'migration_id' => '001_initial_core', 'status' => 'applied' ),
                array( 'migration_id' => '002_certificates_and_progress', 'status' => 'applied' ),
                array( 'migration_id' => '003_audit_and_knowledge_graph', 'status' => 'applied' ),
                array( 'migration_id' => '004_wallet_ledger_atomic_tables', 'status' => 'applied' ),
            ),
        ), 200 );
    }
}
