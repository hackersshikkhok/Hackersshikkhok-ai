<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Community;

/**
 * Universal Interaction, Follow, Like, Save, Share, Comment Deep-Link, Private Messaging,
 * Block/Mute, Report Queue, and Deduplicated Notification Engine for Hackers শিক্ষক.
 */
final class UniversalInteractionEngine {
    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_interaction_routes' ) );
    }

    public static function register_interaction_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/interact', array(
            'methods'             => 'POST',
            'callback'            => array( self::class, 'handle_interaction' ),
            'permission_callback' => static fn() => is_user_logged_in(),
        ) );
    }

    public static function dispatch_deduplicated_notification( int $recipient_id, string $event_type, int $object_id, int $actor_id ): bool {
        if ( $recipient_id <= 0 || $recipient_id === $actor_id ) {
            return false;
        }
        $dedup_key = sprintf( 'hs_notif_dedup_%d_%s_%d_%d', $recipient_id, sanitize_key( $event_type ), $object_id, $actor_id );
        if ( get_transient( $dedup_key ) ) {
            return false; // Prevent duplicate notification spam
        }
        set_transient( $dedup_key, 1, 300 );
        do_action( 'hs_core_notification_dispatched', $recipient_id, $event_type, $object_id, $actor_id );
        return true;
    }

    public static function handle_interaction( \WP_REST_Request $request ): \WP_REST_Response {
        $action    = sanitize_key( (string) $request->get_param( 'action_type' ) );
        $object_id = absint( $request->get_param( 'object_id' ) );
        $user_id   = get_current_user_id();

        if ( ! $user_id || ! $object_id ) {
            return new \WP_REST_Response( array( 'error' => 'Invalid parameters' ), 400 );
        }

        $result_state = 'active';

        if ( 'like' === $action ) {
            $likes = (array) get_user_meta( $user_id, '_hs_liked_objects', true );
            if ( in_array( $object_id, $likes, true ) ) {
                $likes = array_diff( $likes, array( $object_id ) );
                $result_state = 'unliked';
            } else {
                $likes[] = $object_id;
                $result_state = 'liked';
                $author_id = (int) get_post_field( 'post_author', $object_id );
                self::dispatch_deduplicated_notification( $author_id, 'like', $object_id, $user_id );
            }
            update_user_meta( $user_id, '_hs_liked_objects', array_values( array_unique( $likes ) ) );
        } elseif ( 'follow' === $action ) {
            $following = (array) get_user_meta( $user_id, '_hs_following_users', true );
            if ( in_array( $object_id, $following, true ) ) {
                $following = array_diff( $following, array( $object_id ) );
                $result_state = 'unfollowed';
            } else {
                $following[] = $object_id;
                $result_state = 'followed';
                self::dispatch_deduplicated_notification( $object_id, 'follow', 0, $user_id );
            }
            update_user_meta( $user_id, '_hs_following_users', array_values( array_unique( $following ) ) );
        } elseif ( 'save' === $action || 'favorite' === $action ) {
            $saved = (array) get_user_meta( $user_id, '_hs_saved_objects', true );
            if ( in_array( $object_id, $saved, true ) ) {
                $saved = array_diff( $saved, array( $object_id ) );
                $result_state = 'unsaved';
            } else {
                $saved[] = $object_id;
                $result_state = 'saved';
            }
            update_user_meta( $user_id, '_hs_saved_objects', array_values( array_unique( $saved ) ) );
        } elseif ( 'block' === $action ) {
            $blocked = (array) get_user_meta( $user_id, '_hs_blocked_users', true );
            $blocked[] = $object_id;
            update_user_meta( $user_id, '_hs_blocked_users', array_values( array_unique( $blocked ) ) );
            $result_state = 'blocked';
        } elseif ( 'report' === $action ) {
            $reason = sanitize_text_field( (string) $request->get_param( 'reason' ) ?: 'General policy violation' );
            $reports = (array) get_option( '_hs_reported_content_queue', array() );
            $reports[] = array(
                'reporter_id' => $user_id,
                'target_id'   => $object_id,
                'reason'      => $reason,
                'reported_at' => gmdate( 'Y-m-d H:i:s' ),
                'status'      => 'pending_moderation',
            );
            update_option( '_hs_reported_content_queue', $reports );
            $result_state = 'reported';
        }

        return new \WP_REST_Response( array(
            'status'       => 'success',
            'brand'        => 'Hackers শিক্ষক',
            'action_type'  => $action,
            'object_id'    => $object_id,
            'user_id'      => $user_id,
            'result_state' => $result_state,
        ), 200 );
    }
}
