<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Master Ecosystem Control Center & Global Feature Flag Manager
 * Central command hub for Theme Presets, Animation Engine, Feature Flags, and Subsystems.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class EcosystemControlCenter {

    public const OPTION_FEATURE_FLAGS = 'hs_ecosystem_feature_flags';
    public const OPTION_THEME_CONFIG   = 'hs_ecosystem_theme_config';
    public const OPTION_ANIMATION_CFG  = 'hs_ecosystem_animation_config';

    public static function register(): void {
        add_action( 'admin_menu', array( self::class, 'register_admin_menu' ) );
        add_action( 'rest_api_init', array( self::class, 'register_rest_routes' ) );
    }

    public static function register_admin_menu(): void {
        add_menu_page(
            'Hackers শিক্ষক Ecosystem',
            '🛡️ Hackers শিক্ষক',
            'manage_options',
            'hackersshikkhok-ecosystem',
            array( self::class, 'render_control_center_page' ),
            'dashicons-shield-alt',
            3
        );
    }

    public static function register_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/ecosystem/settings', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'get_settings' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/ecosystem/settings/update', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'update_settings' ),
        ) );
    }

    public static function get_default_feature_flags(): array {
        return array(
            'academy_lms'          => true,
            'cyber_desktop'        => true,
            'code_lab'             => true,
            'hardware_lab'         => true,
            'creator_studio'       => true,
            'iot_telemetry'        => true,
            'daily_challenges'     => true,
            'mini_games'           => true,
            'ai_tutor'             => true,
            'universal_bookmarks'  => true,
            'notifications_center' => true,
            'pwa_support'          => true,
            'advanced_animations'  => true,
        );
    }

    public static function get_default_theme_config(): array {
        return array(
            'visual_mode'    => 'cyber_lab', // cyber_lab, neon_city, hacker_terminal, ai_future, academy, engineering
            'color_preset'   => 'cyber_green', // cyber_green, neon_blue, cyber_purple, crimson_cyber, cyan_matrix, dark_gold, aurora
            'primary_color'  => '#00f5d4',
            'secondary_color'=> '#7928ca',
            'accent_color'   => '#00b4d8',
            'bg_dark'        => '#050b14',
            'surface_dark'   => '#0b1320',
        );
    }

    public static function get_default_animation_config(): array {
        return array(
            'level'          => 'balanced', // off, minimal, balanced, full
            'mobile_mode'    => 'reduced',  // auto, reduced, off
            'battery_saver'  => true,
            'reduced_motion' => true, // Auto-detect OS preference
        );
    }

    public static function get_settings( WP_REST_Request $request ): WP_REST_Response {
        $flags     = get_option( self::OPTION_FEATURE_FLAGS, self::get_default_feature_flags() );
        $theme_cfg = get_option( self::OPTION_THEME_CONFIG, self::get_default_theme_config() );
        $anim_cfg  = get_option( self::OPTION_ANIMATION_CFG, self::get_default_animation_config() );

        return new WP_REST_Response( array(
            'feature_flags'    => $flags,
            'theme_config'     => $theme_cfg,
            'animation_config' => $anim_cfg,
        ), 200 );
    }

    public static function update_settings( WP_REST_Request $request ): WP_REST_Response {
        $flags     = $request->get_param( 'feature_flags' );
        $theme_cfg = $request->get_param( 'theme_config' );
        $anim_cfg  = $request->get_param( 'animation_config' );

        if ( is_array( $flags ) ) {
            update_option( self::OPTION_FEATURE_FLAGS, array_merge( self::get_default_feature_flags(), $flags ) );
        }
        if ( is_array( $theme_cfg ) ) {
            update_option( self::OPTION_THEME_CONFIG, array_merge( self::get_default_theme_config(), $theme_cfg ) );
        }
        if ( is_array( $anim_cfg ) ) {
            update_option( self::OPTION_ANIMATION_CFG, array_merge( self::get_default_animation_config(), $anim_cfg ) );
        }

        return new WP_REST_Response( array(
            'success' => true,
            'message' => 'Ecosystem Control Center settings saved successfully.',
        ), 200 );
    }

    public static function render_control_center_page(): void {
        echo '<div class="wrap"><h1>🛡️ Hackers শিক্ষক Master Ecosystem Control Center</h1><p>Control platform subsystems, theme visual modes, animation engine, and hardware IoT gateways.</p><div id="hs-admin-ecosystem-app"></div></div>';
    }
}
