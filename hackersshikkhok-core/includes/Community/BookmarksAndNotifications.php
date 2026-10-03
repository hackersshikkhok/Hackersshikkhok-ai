<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Community;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Universal Bookmark ("My Library") & Notification Center Subsystem
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class BookmarksAndNotifications {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/library/bookmarks', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'get_bookmarks' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/library/bookmarks/toggle', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'toggle_bookmark' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/notifications', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'get_notifications' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/notifications/mark-read', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'mark_notifications_read' ),
        ) );
    }

    public static function get_bookmarks( WP_REST_Request $request ): WP_REST_Response {
        $user_id   = get_current_user_id();
        $bookmarks = (array) get_user_meta( $user_id, '_hs_user_bookmarks', true );

        return new WP_REST_Response( array(
            'count'     => count( $bookmarks ),
            'bookmarks' => array_values( $bookmarks ),
        ), 200 );
    }

    public static function toggle_bookmark( WP_REST_Request $request ): WP_REST_Response {
        $user_id   = get_current_user_id();
        $item_id   = sanitize_text_field( (string) $request->get_param( 'item_id' ) );
        $item_type = sanitize_key( (string) $request->get_param( 'item_type' ) ?: 'tutorial' );
        $title     = sanitize_text_field( (string) $request->get_param( 'title' ) );
        $url       = esc_url_raw( (string) $request->get_param( 'url' ) );

        if ( empty( $item_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Item ID is required.' ), 400 );
        }

        $bookmarks = (array) get_user_meta( $user_id, '_hs_user_bookmarks', true );
        $is_bookmarked = isset( $bookmarks[ $item_id ] );

        if ( $is_bookmarked ) {
            unset( $bookmarks[ $item_id ] );
            $action = 'removed';
        } else {
            $bookmarks[ $item_id ] = array(
                'item_id'   => $item_id,
                'item_type' => $item_type,
                'title'     => $title ?: 'Saved Item #' . $item_id,
                'url'       => $url ?: '#',
                'saved_at'  => gmdate( 'c' ),
            );
            $action = 'added';
        }

        update_user_meta( $user_id, '_hs_user_bookmarks', $bookmarks );

        return new WP_REST_Response( array(
            'success'       => true,
            'action'        => $action,
            'is_bookmarked' => 'added' === $action,
            'total_saved'   => count( $bookmarks ),
        ), 200 );
    }

    public static function get_notifications( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id();
        $notifications = (array) get_user_meta( $user_id, '_hs_user_notifications', true );

        if ( empty( $notifications ) ) {
            $notifications = array(
                array(
                    'id'        => 'notif_welcome',
                    'title'     => 'Welcome to Hackers শিক্ষক Super Platform!',
                    'body'      => 'Explore our Cyber Academy, Hardware Lab, Engineering Calculators, and Creator Studio.',
                    'type'      => 'system',
                    'read'      => false,
                    'timestamp' => gmdate( 'c' ),
                ),
            );
        }

        $unread_count = count( array_filter( $notifications, fn( $n ) => empty( $n['read'] ) ) );

        return new WP_REST_Response( array(
            'unread_count'  => $unread_count,
            'notifications' => array_values( $notifications ),
        ), 200 );
    }

    public static function mark_notifications_read( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id();
        $notifications = (array) get_user_meta( $user_id, '_hs_user_notifications', true );

        foreach ( $notifications as &$n ) {
            $n['read'] = true;
        }

        update_user_meta( $user_id, '_hs_user_notifications', $notifications );

        return new WP_REST_Response( array( 'success' => true, 'unread_count' => 0 ), 200 );
    }
}
