<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class Behavioral_Analytics_Engine
 * 
 * MODULE 7: AI MEMORY & USER BEHAVIORAL TRACKING ENGINE
 * - Tracks user actions on site: search queries, clicked links, time spent per course category, AI power usage
 * - Stores encrypted tracking tokens in smart cookies and user meta DB
 * - Dynamic Homepage & Course Recommendations based on user behavior profile
 * 
 * @package HackersShikkhok\Core\AI
 */
final class Behavioral_Analytics_Engine {

    public const COOKIE_NAME = 'hs_cyber_session_v4';
    public const TOKEN_SALT  = 'hs_analytics_memory_salt_2026';

    public static function register(): void {
        add_action( 'init', array( self::class, 'ensure_session_token' ) );
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
    }

    public static function register_rest_endpoints(): void {
        $namespaces = array( 'lms/v1', 'hackersshikkhok/v1' );

        foreach ( $namespaces as $ns ) {
            register_rest_route( $ns, '/analytics/track', array(
                'methods'             => 'POST',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_track_event' ),
            ) );

            register_rest_route( $ns, '/analytics/recommendations', array(
                'methods'             => 'GET',
                'permission_callback' => '__return_true',
                'callback'            => array( self::class, 'rest_get_recommendations' ),
            ) );
        }
    }

    /**
     * Ensure session token exists in cookie
     */
    public static function ensure_session_token(): string {
        if ( isset( $_COOKIE[ self::COOKIE_NAME ] ) ) {
            return sanitize_text_field( $_COOKIE[ self::COOKIE_NAME ] );
        }

        $session_id = wp_generate_uuid4();
        $user_id    = get_current_user_id() ?: 0;
        $sig        = hash_hmac( 'sha256', "{$session_id}:{$user_id}", self::TOKEN_SALT );
        $token      = "{$session_id}.{$sig}";

        if ( ! headers_sent() ) {
            setcookie( self::COOKIE_NAME, $token, time() + ( 86400 * 30 ), COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true );
        }

        return $token;
    }

    /**
     * Track a user behavioral action
     */
    public static function track_event( string $event_type, ?string $category = null, array $metadata = array() ): void {
        global $wpdb;
        $session_token = self::ensure_session_token();
        $user_id = get_current_user_id() ?: 0;

        $table = $wpdb->prefix . 'user_behavior_analytics';
        $wpdb->insert(
            $table,
            array(
                'user_id'       => $user_id,
                'session_token' => substr( $session_token, 0, 120 ),
                'event_type'    => sanitize_text_field( $event_type ),
                'category'      => sanitize_text_field( $category ?? '' ),
                'metadata_json' => json_encode( $metadata ),
                'created_at'    => current_time( 'mysql' ),
            ),
            array( '%d', '%s', '%s', '%s', '%s', '%s' )
        );

        // Update user category affinity score in user meta
        if ( $user_id > 0 && ! empty( $category ) ) {
            $affinities = get_user_meta( $user_id, 'hs_category_affinities', true ) ?: array();
            $affinities[ $category ] = ( $affinities[ $category ] ?? 0 ) + 1;
            update_user_meta( $user_id, 'hs_category_affinities', $affinities );
        }
    }

    /**
     * REST endpoint to track frontend event
     */
    public static function rest_track_event( WP_REST_Request $request ): WP_REST_Response {
        $body = $request->get_json_params() ?: array();
        $event_type = sanitize_text_field( $body['event_type'] ?? 'page_view' );
        $category   = sanitize_text_field( $body['category'] ?? '' );
        $metadata   = is_array( $body['metadata'] ?? null ) ? $body['metadata'] : array();

        self::track_event( $event_type, $category, $metadata );

        return new WP_REST_Response( array( 'success' => true ), 200 );
    }

    /**
     * Generate dynamic personalized recommendations
     */
    public static function get_recommendations( int $user_id = 0 ): array {
        global $wpdb;
        $target_user_id = $user_id ?: ( get_current_user_id() ?: 0 );
        $preferred_cat = 'Web Hacking / OWASP';

        if ( $target_user_id > 0 ) {
            $affinities = get_user_meta( $target_user_id, 'hs_category_affinities', true );
            if ( is_array( $affinities ) && ! empty( $affinities ) ) {
                arsort( $affinities );
                $preferred_cat = array_key_first( $affinities );
            }
        }

        $courses_table = $wpdb->prefix . 'courses';
        $recommended = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT id, slug, title, category, difficulty_tier, estimated_lab_hours, price_bdt, xp_reward 
                 FROM {$courses_table} 
                 WHERE category = %s 
                 ORDER BY id ASC LIMIT 4",
                $preferred_cat
            ),
            ARRAY_A
        );

        if ( empty( $recommended ) ) {
            $recommended = $wpdb->get_results(
                "SELECT id, slug, title, category, difficulty_tier, estimated_lab_hours, price_bdt, xp_reward 
                 FROM {$courses_table} 
                 ORDER BY id ASC LIMIT 4",
                ARRAY_A
            );
        }

        return array(
            'preferred_category' => $preferred_cat,
            'recommendations'    => $recommended ?: array(),
            'ai_reasoning'       => "ব্যবহারকারীর সাম্প্রতিক অনুসন্ধান ও ল্যাব সেশন অনুযায়ী '{$preferred_cat}' স্পেশালাইজেশন ট্র্যাকটি সাজেস্ট করা হয়েছে।",
            'suggested_terminal_prompt' => "cadet@hackersshikkhok:~ [focus: " . strtolower( str_replace( array( ' ', '/', '&' ), '-', $preferred_cat ) ) . "]$ ",
        );
    }

    public static function rest_get_recommendations( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id() ?: 0;
        $data = self::get_recommendations( $user_id );

        return new WP_REST_Response( array(
            'success' => true,
            'data'    => $data,
        ), 200 );
    }
}
