<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\LMS;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class Theming_Engine
 * 
 * MODULE 2: DYNAMIC COLOR ACCENT, POWER LEVEL & UI THEMING ENGINE
 * - Category-Based Dynamic Neon Aesthetics (5 distinct presets with animations)
 * - Power Level & AI State Transitions (Low, High/Hacking, Coding)
 * - Dynamic CSS variable injection without page reload
 * - Accessibility Adaptation: clean typography scaling & high contrast mode
 * 
 * @package HackersShikkhok\Core\LMS
 */
final class Theming_Engine {

    public const THEME_CONFIGS = array(
        'Web Hacking / OWASP' => array(
            'slug'               => 'web-hacking',
            'primary_accent'     => '#00ff66',
            'glow_accent'        => 'rgba(0, 255, 102, 0.4)',
            'secondary_accent'   => '#052e16',
            'scanline_intensity' => '0.12',
            'animation_style'    => 'grid-scanlines-text-fade',
            'label'              => 'Matrix Green',
            'badge_bg'           => 'rgba(0, 255, 102, 0.12)',
            'icon'               => 'terminal',
        ),
        'Social Engineering & Defense' => array(
            'slug'               => 'social-defense',
            'primary_accent'     => '#ff9900',
            'glow_accent'        => 'rgba(255, 153, 0, 0.45)',
            'secondary_accent'   => '#451a03',
            'scanline_intensity' => '0.18',
            'animation_style'    => 'alert-pulse-radar-sweep',
            'label'              => 'Cyber Amber',
            'badge_bg'           => 'rgba(255, 153, 0, 0.12)',
            'icon'               => 'radar',
        ),
        'Network & Red Teaming' => array(
            'slug'               => 'network-red-team',
            'primary_accent'     => '#ff0055',
            'glow_accent'        => 'rgba(255, 0, 85, 0.45)',
            'secondary_accent'   => '#4c0519',
            'scanline_intensity' => '0.22',
            'animation_style'    => 'glitch-threat-countdown',
            'label'              => 'Crimson Red',
            'badge_bg'           => 'rgba(255, 0, 85, 0.12)',
            'icon'               => 'crosshair',
        ),
        'Forensics & Blue Team' => array(
            'slug'               => 'forensics-blue-team',
            'primary_accent'     => '#00f0ff',
            'glow_accent'        => 'rgba(0, 240, 255, 0.45)',
            'secondary_accent'   => '#082f49',
            'scanline_intensity' => '0.10',
            'animation_style'    => 'cyber-shield-datastream',
            'label'              => 'Electric Blue',
            'badge_bg'           => 'rgba(0, 240, 255, 0.12)',
            'icon'               => 'shield',
        ),
        'Defensive Systems & Binary Hardening' => array(
            'slug'               => 'defensive-systems',
            'primary_accent'     => '#a100ff',
            'glow_accent'        => 'rgba(161, 0, 255, 0.5)',
            'secondary_accent'   => '#3b0764',
            'scanline_intensity' => '0.25',
            'animation_style'    => 'holographic-deep-hud',
            'label'              => 'Vibrant Neon Purple',
            'badge_bg'           => 'rgba(161, 0, 255, 0.15)',
            'icon'               => 'cpu',
        ),
    );

    public const POWER_LEVELS = array(
        'low' => array(
            'title'        => 'Low Power (Free Tier)',
            'accent'       => '#94a3b8',
            'glow'         => 'rgba(148, 163, 184, 0.2)',
            'hud_class'    => 'hud-minimalist',
            'token_speed'  => 'Standard (1x)',
            'cost_bdt'     => 0,
            'description'  => 'Clean, dark minimalist HUD for standard reading.',
        ),
        'high' => array(
            'title'        => 'High / Hacking Power (Premium)',
            'accent'       => '#00ff66',
            'glow'         => 'rgba(0, 255, 102, 0.6)',
            'hud_class'    => 'hud-cyberpunk-overclock',
            'token_speed'  => 'Hyper Fast (3x)',
            'cost_bdt'     => 50,
            'description'  => 'Full cyberpunk HUD, glowing border animations, dynamic live terminal sandbox prompt.',
        ),
        'coding' => array(
            'title'        => 'Coding Power (IDE Mode)',
            'accent'       => '#10b981',
            'glow'         => 'rgba(16, 185, 129, 0.45)',
            'hud_class'    => 'hud-ide-developer',
            'token_speed'  => 'Optimized Code Mode',
            'cost_bdt'     => 25,
            'description'  => 'IDE-style line highlight green accent with syntax diagnostics and scratchpad sync.',
        ),
    );

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_rest_endpoints' ) );
        add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_theming_assets' ) );
    }

    public static function register_rest_endpoints(): void {
        register_rest_route( 'lms/v1', '/theming/config', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'rest_get_theming_config' ),
        ) );

        register_rest_route( 'lms/v1', '/theming/set-power-level', array(
            'methods'             => 'POST',
            'permission_callback' => array( self::class, 'check_user_auth' ),
            'callback'            => array( self::class, 'rest_set_power_level' ),
        ) );
    }

    public static function check_user_auth(): bool {
        return is_user_logged_in() || ( defined( 'WP_DEBUG' ) && WP_DEBUG );
    }

    public static function rest_get_theming_config( WP_REST_Request $request ): WP_REST_Response {
        $category = $request->get_param( 'category' ) ?? 'Web Hacking / OWASP';
        $user_id = get_current_user_id();

        $active_power = 'low';
        if ( $user_id ) {
            $saved_power = get_user_meta( $user_id, 'hs_cyber_power_level', true );
            if ( $saved_power && isset( self::POWER_LEVELS[ $saved_power ] ) ) {
                $active_power = $saved_power;
            }
        }

        return new WP_REST_Response( array(
            'categories'    => self::THEME_CONFIGS,
            'power_levels'  => self::POWER_LEVELS,
            'active_category_config' => self::THEME_CONFIGS[ $category ] ?? self::THEME_CONFIGS['Web Hacking / OWASP'],
            'active_power_level'     => $active_power,
        ), 200 );
    }

    public static function rest_set_power_level( WP_REST_Request $request ): WP_REST_Response {
        $params = $request->get_json_params();
        $target_level = sanitize_key( $params['power_level'] ?? 'low' );

        if ( ! isset( self::POWER_LEVELS[ $target_level ] ) ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => 'ইনভ্যালিড পাওয়ার লেভেল।',
            ), 400 );
        }

        $user_id = get_current_user_id() ?: 1;
        update_user_meta( $user_id, 'hs_cyber_power_level', $target_level );

        return new WP_REST_Response( array(
            'success'     => true,
            'power_level' => $target_level,
            'config'      => self::POWER_LEVELS[ $target_level ],
            'message'     => "সফলভাবে {$target_level} পাওয়ার লেভেলে স্যুইচ করা হয়েছে!",
        ), 200 );
    }

    public static function enqueue_theming_assets(): void {
        wp_localize_script( 'hs-cyber-lms', 'HS_THEMING_DATA', array(
            'categories'   => self::THEME_CONFIGS,
            'powerLevels'  => self::POWER_LEVELS,
            'restUrl'      => esc_url_raw( rest_url( 'lms/v1/theming/' ) ),
            'nonce'        => wp_create_nonce( 'wp_rest' ),
        ) );
    }

    /**
     * Generate inline CSS variables for a given category
     */
    public static function get_inline_category_css( string $category ): string {
        $cfg = self::THEME_CONFIGS[ $category ] ?? self::THEME_CONFIGS['Web Hacking / OWASP'];
        return sprintf(
            ':root {
                --cyber-primary: %s;
                --cyber-glow: %s;
                --cyber-secondary: %s;
                --scanline-intensity: %s;
            }',
            $cfg['primary_accent'],
            $cfg['glow_accent'],
            $cfg['secondary_accent'],
            $cfg['scanline_intensity']
        );
    }
}
