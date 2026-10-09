<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Earnings;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
     * Hackers শিক্ষক PostPay Counter (PPC) & Earning Engine
     * Pro-grade monetization, view/visit/comment/share/publish rewards, ledger tracking, and automated payout calculator.
     */
final class PostPayCounterEngine {
    private static bool $registered = false;

    public static function register(): void {
        if ( self::$registered ) {
            return;
        }
        self::$registered = true;

        // Hook into WordPress actions for PPC earnings
        add_action( 'transition_post_status', array( __CLASS__, 'handle_publish_earning' ), 10, 3 );
        add_action( 'wp', array( __CLASS__, 'handle_visit_earning' ) );
        add_action( 'wp_ajax_hs_ppc_track_view', array( __CLASS__, 'ajax_track_view' ) );
        add_action( 'wp_ajax_nopriv_hs_ppc_track_view', array( __CLASS__, 'ajax_track_view' ) );
        add_action( 'wp_ajax_hs_ppc_track_share', array( __CLASS__, 'ajax_track_share' ) );
        add_action( 'wp_ajax_nopriv_hs_ppc_track_share', array( __CLASS__, 'ajax_track_share' ) );
        add_action( 'set_comment_posted', array( __CLASS__, 'handle_comment_earning' ), 10, 2 );
        add_action( 'wp_insert_comment', array( __CLASS__, 'handle_insert_comment' ), 10, 2 );

        // Register REST API routes for earnings & PPC calculator
        add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
    }

    public static function get_settings(): array {
        $defaults = array(
            'enabled'            => 'yes',
            'currency'           => 'BDT',
            'rate_publish'       => 50.00,
            'rate_view'          => 0.10,
            'rate_visit'         => 0.05,
            'rate_comment'       => 2.00,
            'rate_share'         => 5.00,
            'min_payout'         => 500.00,
            'payout_methods'     => 'bKash, Nagad, Rocket, Bank Transfer, PayPal, Crypto',
            'daily_author_cap'   => 1000.00,
            'auto_payout_mode'   => 'manual',
        );
        $saved = get_option( 'hs_ppc_settings', array() );
        return wp_parse_args( $saved, $defaults );
    }

    public static function update_settings( array $settings ): void {
        update_option( 'hs_ppc_settings', $settings );
    }

    /**
     * Handle Publish Earning
     */
    public static function handle_publish_earning( string $new_status, string $old_status, \WP_Post $post ): void {
        $settings = self::get_settings();
        if ( 'yes' !== $settings['enabled'] ) {
            return;
        }

        if ( 'publish' === $new_status && 'publish' !== $old_status ) {
            $allowed_types = array( 'tutorials', 'code', 'cyber', 'troubleshooting', 'projects', 'post' );
            if ( ! in_array( $post->post_type, $allowed_types, true ) ) {
                return;
            }

            $author_id = (int) $post->post_author;
            if ( $author_id <= 0 ) {
                return;
            }

            // Check if publish earning already credited for this post
            $credited = get_post_meta( $post->ID, '_hs_ppc_publish_credited', true );
            if ( $credited ) {
                return;
            }

            $amount = (float) $settings['rate_publish'];
            if ( $amount > 0 ) {
                self::credit_earning( $author_id, 'publish', $amount, $post->ID, 'Post Publish Reward: ' . $post->post_title );
                update_post_meta( $post->ID, '_hs_ppc_publish_credited', '1' );
            }
        }
    }

    /**
     * Handle Page Visit Earning (deduplicated per visitor IP per day)
     */
    public static function handle_visit_earning(): void {
        if ( is_admin() || wp_doing_ajax() || wp_doing_cron() ) {
            return;
        }

        $settings = self::get_settings();
        if ( 'yes' !== $settings['enabled'] ) {
            return;
        }

        $visitor_ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0' );
        $today = gmdate( 'Y-m-d' );
        $transient_key = 'hs_ppc_visit_' . md5( $visitor_ip . '_' . $today );

        if ( get_transient( $transient_key ) ) {
            return;
        }
        set_transient( $transient_key, 1, DAY_IN_SECONDS );

        // Credited to site pool or admin/author if single post
        if ( is_singular() ) {
            global $post;
            if ( $post instanceof \WP_Post ) {
                $author_id = (int) $post->post_author;
                $amount = (float) $settings['rate_visit'];
                if ( $author_id > 0 && $amount > 0 ) {
                    self::credit_earning( $author_id, 'visit', $amount, $post->ID, 'Page Visit Reward' );
                }
            }
        }
    }

    /**
     * AJAX: Track Post View
     */
    public static function ajax_track_view(): void {
        check_ajax_referer( 'hs_core_nonce', 'nonce' );
        $post_id = isset( $_POST['post_id'] ) ? (int) $_POST['post_id'] : 0;
        if ( $post_id <= 0 ) {
            wp_send_json_error( array( 'message' => 'Invalid post ID' ) );
        }

        $settings = self::get_settings();
        if ( 'yes' !== $settings['enabled'] ) {
            wp_send_json_success( array( 'tracked' => false ) );
        }

        $visitor_ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0' );
        $today = gmdate( 'Y-m-d' );
        $transient_key = 'hs_ppc_view_' . $post_id . '_' . md5( $visitor_ip . '_' . $today );

        if ( get_transient( $transient_key ) ) {
            wp_send_json_success( array( 'tracked' => false, 'reason' => 'already_counted_today' ) );
        }
        set_transient( $transient_key, 1, 12 * HOUR_IN_SECONDS );

        $post = get_post( $post_id );
        if ( ! $post ) {
            wp_send_json_error( array( 'message' => 'Post not found' ) );
        }

        // Increment post view meta counter
        $views = (int) get_post_meta( $post_id, '_hs_view_count', true );
        update_post_meta( $post_id, '_hs_view_count', $views + 1 );

        $author_id = (int) $post->post_author;
        $amount = (float) $settings['rate_view'];
        if ( $author_id > 0 && $amount > 0 ) {
            self::credit_earning( $author_id, 'view', $amount, $post_id, 'Post View Reward: #' . $post_id );
        }

        wp_send_json_success( array( 'tracked' => true, 'new_views' => $views + 1 ) );
    }

    /**
     * AJAX: Track Post Share
     */
    public static function ajax_track_share(): void {
        check_ajax_referer( 'hs_core_nonce', 'nonce' );
        $post_id = isset( $_POST['post_id'] ) ? (int) $_POST['post_id'] : 0;
        $user_id = get_current_user_id();
        if ( $post_id <= 0 ) {
            wp_send_json_error( array( 'message' => 'Invalid post ID' ) );
        }

        $settings = self::get_settings();
        if ( 'yes' !== $settings['enabled'] ) {
            wp_send_json_success( array( 'tracked' => false ) );
        }

        $post = get_post( $post_id );
        if ( ! $post ) {
            wp_send_json_error( array( 'message' => 'Post not found' ) );
        }

        $shares = (int) get_post_meta( $post_id, '_hs_share_count', true );
        update_post_meta( $post_id, '_hs_share_count', $shares + 1 );

        $target_user = $user_id > 0 ? $user_id : (int) $post->post_author;
        $amount = (float) $settings['rate_share'];
        if ( $target_user > 0 && $amount > 0 ) {
            self::credit_earning( $target_user, 'share', $amount, $post_id, 'Post Share Reward: #' . $post_id );
        }

        wp_send_json_success( array( 'tracked' => true, 'shares' => $shares + 1 ) );
    }

    /**
     * Handle Comment Earning
     */
    public static function handle_insert_comment( int $comment_id, \WP_Comment $comment ): void {
        if ( 1 !== (int) $comment->comment_approved ) {
            return;
        }
        $settings = self::get_settings();
        if ( 'yes' !== $settings['enabled'] ) {
            return;
        }

        $user_id = (int) $comment->user_id;
        if ( $user_id <= 0 ) {
            return; // Only registered users earn for commenting
        }

        $amount = (float) $settings['rate_comment'];
        if ( $amount > 0 ) {
            self::credit_earning( $user_id, 'comment', $amount, (int) $comment->comment_post_ID, 'Comment Reward on Post #' . $comment->comment_post_ID );
        }
    }

    public static function handle_comment_earning( int $comment_id, int $approved ): void {
        if ( 1 !== $approved ) {
            return;
        }
        $comment = get_comment( $comment_id );
        if ( $comment ) {
            self::handle_insert_comment( $comment_id, $comment );
        }
    }

    /**
     * Credit Earning to Ledger & PPC table
     */
    public static function credit_earning( int $user_id, string $type, float $amount, int $post_id, string $description ): bool {
        global $wpdb;
        if ( $amount <= 0 || $user_id <= 0 ) {
            return false;
        }

        $p = $wpdb->prefix . 'hs_';

        // Check daily author cap if configured
        $settings = self::get_settings();
        $daily_cap = (float) ($settings['daily_author_cap'] ?? 1000.00);
        $today_start = gmdate( 'Y-m-d 00:00:00' );

        $today_earned = (float) $wpdb->get_var( $wpdb->prepare(
            "SELECT SUM(amount) FROM {$p}ppc_earnings WHERE user_id = %d AND created_at >= %s",
            $user_id,
            $today_start
        ) );

        if ( ( $today_earned + $amount ) > $daily_cap ) {
            return false; // Daily cap reached
        }

        // Insert into ppc_earnings
        $inserted = $wpdb->insert(
            $p . 'ppc_earnings',
            array(
                'user_id'     => $user_id,
                'post_id'     => $post_id,
                'earning_type'=> $type,
                'amount'      => $amount,
                'status'      => 'approved',
                'created_at'  => current_time( 'mysql' ),
            ),
            array( '%d', '%d', '%s', '%f', '%s', '%s' )
        );

        if ( ! $inserted ) {
            return false;
        }

        // Also record in wallet ledger
        $current_balance = (float) get_user_meta( $user_id, '_hs_wallet_balance', true );
        $new_balance = $current_balance + $amount;
        update_user_meta( $user_id, '_hs_wallet_balance', $new_balance );

        $wpdb->insert(
            $p . 'wallet_ledger',
            array(
                'user_id'       => $user_id,
                'tx_type'       => 'ppc_' . $type,
                'amount_bdt'    => $amount,
                'balance_after' => $new_balance,
                'points_delta'  => (int) ($amount * 10),
                'description'   => $description,
                'reference_id'  => (string) $post_id,
                'reference_hash'=> hash( 'sha256', $user_id . '_' . $type . '_' . time() ),
                'created_at'    => current_time( 'mysql' ),
            ),
            array( '%d', '%s', '%f', '%f', '%d', '%s', '%s', '%s', '%s' )
        );

        return true;
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/ppc/stats', array(
            'methods'             => 'GET',
            'callback'            => array( __CLASS__, 'rest_get_stats' ),
            'permission_callback' => static function () {
                return current_user_can( 'read' );
            },
        ) );
    }

    public static function rest_get_stats( \WP_REST_Request $request ): \WP_REST_Response {
        global $wpdb;
        $user_id = get_current_user_id();
        $p = $wpdb->prefix . 'hs_';

        $total_earned = (float) $wpdb->get_var( $wpdb->prepare(
            "SELECT SUM(amount) FROM {$p}ppc_earnings WHERE user_id = %d AND status = 'approved'",
            $user_id
        ) );

        $balance = (float) get_user_meta( $user_id, '_hs_wallet_balance', true );
        $breakdown = $wpdb->get_results( $wpdb->prepare(
            "SELECT earning_type, COUNT(*) as count, SUM(amount) as total FROM {$p}ppc_earnings WHERE user_id = %d GROUP BY earning_type",
            $user_id
        ), ARRAY_A );

        return rest_ensure_response( array(
            'success'       => true,
            'user_id'       => $user_id,
            'wallet_balance'=> $balance,
            'total_earned'  => $total_earned,
            'breakdown'     => $breakdown,
        ) );
    }
}
