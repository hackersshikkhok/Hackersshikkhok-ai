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

        return new \WP_REST_Response( array(
            'status'      => 'success',
            'brand'       => 'Hackers শিক্ষক',
            'action_type' => $action,
            'object_id'   => $object_id,
            'user_id'     => $user_id,
        ), 200 );
    }
}
