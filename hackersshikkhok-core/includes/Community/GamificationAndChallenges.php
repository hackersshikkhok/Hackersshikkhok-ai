<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Community;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;
use HackersShikkhok\Core\Users\UserEcosystem;

/**
 * Gamification, Achievements & Daily Challenge Engine
 * Manages learning streaks, daily missions, and badge awards with authoritative XP tracking.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class GamificationAndChallenges {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/gamification/daily-challenge', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'get_today_challenge' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/gamification/daily-challenge/submit', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_daily_challenge' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/gamification/achievements', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'get_user_achievements' ),
        ) );
    }

    public static function get_today_challenge( WP_REST_Request $request ): WP_REST_Response {
        $today_key = gmdate( 'Y-m-d' );
        $challenges_pool = array(
            array(
                'id'          => 'dc_' . $today_key . '_sqli_guard',
                'title'       => 'SQL Injection Defense Barrier',
                'category'    => 'Defensive Security',
                'difficulty'  => 'Medium',
                'xp_reward'   => 50,
                'description' => 'Fix the vulnerable query below using parameterized prepared statements in PHP.',
                'code_snippet'=> "\$user = \$_GET['user'];\n\$sql = \"SELECT * FROM users WHERE username = '\" . \$user . \"'\";",
                'correct_ans' => "\$wpdb->prepare(\"SELECT * FROM {\$wpdb->users} WHERE user_login = %s\", \$user)",
            ),
            array(
                'id'          => 'dc_' . $today_key . '_ohms_law',
                'title'       => 'Electronics Current Limiting Challenge',
                'category'    => 'Engineering',
                'difficulty'  => 'Easy',
                'xp_reward'   => 30,
                'description' => 'Calculate required series resistor for an LED (Vf = 2.0V, If = 20mA) driven by a 5.0V microcontroller pin.',
                'code_snippet'=> "R = (Vsource - Vf) / If",
                'correct_ans' => "150",
            ),
        );

        $day_index = (int) gmdate( 'd' ) % count( $challenges_pool );
        $current   = $challenges_pool[ $day_index ];

        return new WP_REST_Response( array(
            'date'      => $today_key,
            'challenge' => $current,
        ), 200 );
    }

    public static function submit_daily_challenge( WP_REST_Request $request ): WP_REST_Response {
        $user_id      = get_current_user_id();
        $challenge_id = sanitize_text_field( (string) $request->get_param( 'challenge_id' ) );
        $answer       = trim( (string) $request->get_param( 'answer' ) );

        $completed_challenges = (array) get_user_meta( $user_id, '_hs_completed_daily_challenges', true );
        if ( in_array( $challenge_id, $completed_challenges, true ) ) {
            return new WP_REST_Response( array( 'error' => 'You have already completed today’s daily challenge!' ), 400 );
        }

        // Award XP and record in authoritative ledger
        $completed_challenges[] = $challenge_id;
        update_user_meta( $user_id, '_hs_completed_daily_challenges', $completed_challenges );

        // Update streak
        $last_day = (string) get_user_meta( $user_id, '_hs_last_challenge_date', true );
        $today    = gmdate( 'Y-m-d' );
        $streak   = (int) get_user_meta( $user_id, '_hs_learning_streak', true );

        if ( $last_day === gmdate( 'Y-m-d', strtotime( '-1 day' ) ) ) {
            $streak++;
        } elseif ( $last_day !== $today ) {
            $streak = 1;
        }

        update_user_meta( $user_id, '_hs_last_challenge_date', $today );
        update_user_meta( $user_id, '_hs_learning_streak', $streak );

        UserEcosystem::record_ledger_transaction(
            $user_id,
            'reward',
            0.0,
            50,
            'Completed Daily Challenge: ' . $challenge_id,
            'CHALLENGE-' . $challenge_id
        );

        return new WP_REST_Response( array(
            'success'       => true,
            'xp_awarded'    => 50,
            'streak'        => $streak,
            'message'       => 'Challenge solved successfully! +50 XP awarded.',
        ), 200 );
    }

    public static function get_user_achievements( WP_REST_Request $request ): WP_REST_Response {
        $user_id = get_current_user_id();
        $streak  = (int) get_user_meta( $user_id, '_hs_learning_streak', true );
        $xp      = (int) get_user_meta( $user_id, '_hs_learning_xp', true );

        $all_achievements = array(
            array(
                'id'       => 'ach_first_blood',
                'title'    => 'Zero-Trust Initiate',
                'desc'     => 'Completed first lesson in Cyber Academy',
                'unlocked' => $xp >= 15,
                'icon'     => '🛡️',
            ),
            array(
                'id'       => 'ach_streak_7',
                'title'    => '7-Day Cyber Persistence',
                'desc'     => 'Maintained a 7-day continuous learning streak',
                'unlocked' => $streak >= 7,
                'icon'     => '🔥',
            ),
            array(
                'id'       => 'ach_hardware_explorer',
                'title'    => 'Hardware Architect',
                'desc'     => 'Registered an IoT telemetry node or tested hardware schematic',
                'unlocked' => ! empty( get_user_meta( $user_id, '_hs_iot_devices', true ) ),
                'icon'     => '⚡',
            ),
            array(
                'id'       => 'ach_master_scholar',
                'title'    => 'Elite Cyber Scholar',
                'desc'     => 'Earned 500+ XP in cybersecurity challenges',
                'unlocked' => $xp >= 500,
                'icon'     => '👑',
            ),
        );

        return new WP_REST_Response( array(
            'streak'       => $streak,
            'total_xp'     => $xp,
            'achievements' => $all_achievements,
        ), 200 );
    }
}
