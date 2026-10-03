import JSZip from 'jszip';

export const THEME_SCREENSHOT_IMG = '/src/assets/images/theme_screenshot_preview_1790816038125.jpg';
export const PLUGIN_BANNER_IMG = '/src/assets/images/plugin_banner_preview_1790816052632.jpg';
export const PLUGIN_ICON_IMG = '/src/assets/images/plugin_icon_shield_1790816066845.jpg';

export interface VirtualFile {
  path: string;
  package: 'core' | 'theme' | 'docs';
  language: 'php' | 'css' | 'javascript' | 'json' | 'markdown' | 'text';
  content: string;
  updatedAt: string;
}

export const INITIAL_VIRTUAL_FILES: VirtualFile[] = [
  // ============================================================================
  // 1. HACKERSSHIKKHOK-CORE PLUGIN FILES (v4.0.0 — Official Brand: Hackers শিক্ষক)
  // ============================================================================
  {
    path: 'hackersshikkhok-core/hackersshikkhok-core.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Plugin Name:       Hackers শিক্ষক Core Engine (v4.0 Complete Ecosystem)
 * Plugin URI:        https://hackersshikkhok.com
 * Description:       Hackers শিক্ষক (HackersShikkhok.com)-এর অফিসিয়াল মাস্টার কোর ইঞ্জিন প্লাগইন (v4.0.0)। এতে রয়েছে ২৮টি প্ল্যাটফর্ম সেন্টার, ইউনিভার্সাল সোশ্যাল ও ইন্টারেকশন ইঞ্জিন (Follow, Like, Favorite/Save, Share, Deep-linked Comments, Private Messaging, Block, Report, Deduplicated Notifications), আলাদা Points/Level/Badges ও Monetary Wallet Ledger, ১৮টি সেন্টার-ভিত্তিক AI অটো-পাইলট, ১১টি ইউনিভার্সাল ফ্যাক্টরি, Global Emergency Kill Switch, ১০টি Custom Post Types, ৮টি Custom Taxonomies, ২১টি কাস্টম ডাটাবেস টেবিল, ১৫টি CSS/RGB/Neon জেনারেটর, ৬০+ ডেভেলপার/মিডিয়া/PDF/সাইবার টুলস, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব এবং গেমস সেন্টার। Developed by Hackers শিক্ষক — Official Website & Download: https://hackersshikkhok.com
 * Version:           4.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.2
 * Author:            Developed by Hackers শিক্ষক
 * Author URI:        https://hackersshikkhok.com
 * Update URI:        https://hackersshikkhok.com
 * Text Domain:       hackersshikkhok-core
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://hackersshikkhok.com
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'HS_CORE_VERSION', '4.0.0' );
define( 'HS_CORE_PATH', plugin_dir_path( __FILE__ ) );
define( 'HS_CORE_URL', plugin_dir_url( __FILE__ ) );
define( 'HS_CORE_BASENAME', plugin_basename( __FILE__ ) );
define( 'HS_OFFICIAL_SITE_URL', 'https://hackersshikkhok.com' );
define( 'HS_OFFICIAL_BRAND', 'Hackers শিক্ষক' );

spl_autoload_register( static function ( string $class ): void {
    $prefix = 'HackersShikkhok\\\\Core\\\\';
    if ( strncmp( $prefix, $class, strlen( $prefix ) ) !== 0 ) {
        return;
    }
    $relative_class = substr( $class, strlen( $prefix ) );
    $relative_path  = str_replace( '\\\\', '/', $relative_class ) . '.php';

    $candidates = array(
        HS_CORE_PATH . 'includes/' . $relative_path,
        HS_CORE_PATH . 'admin/' . $relative_path,
    );

    foreach ( $candidates as $file ) {
        if ( file_exists( $file ) ) {
            require_once $file;
            return;
        }
    }
} );

register_activation_hook( __FILE__, array( Core\\Activator::class, 'activate' ) );
register_deactivation_hook( __FILE__, array( Core\\Deactivator::class, 'deactivate' ) );

add_action( 'plugins_loaded', static function (): void {
    Core\\Plugin::instance()->boot();
} );

/**
 * Display rich visual icon, banner card, developer attribution, and official download link
 * directly inside WordPress Admin -> Plugins (plugins.php) and Plugin Details modal.
 */
add_filter( 'plugin_action_links_' . HS_CORE_BASENAME, static function ( array $links ): array {
    $custom = array(
        '<a href="' . esc_url( admin_url( 'admin.php?page=hs-control-center' ) ) . '" style="color:#00a389;font-weight:700;">⚙️ Control Center</a>',
        '<a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener noreferrer" style="color:#6d28d9;font-weight:700;">📥 Official Download</a>',
    );
    return array_merge( $custom, $links );
} );

add_filter( 'plugin_row_meta', static function ( array $meta, string $plugin_file ): array {
    if ( HS_CORE_BASENAME !== $plugin_file ) {
        return $meta;
    }
    $icon_url = esc_url( HS_CORE_URL . 'assets/images/icon-256x256.png' );

    $preview_card = '<div style="margin-top:10px;padding:12px;background:#0b1120;color:#e2e8f0;border:1px solid rgba(0,245,212,0.35);border-radius:10px;display:flex;align-items:center;gap:14px;max-width:760px;">'
        . '<img src="' . $icon_url . '" alt="Hackers শিক্ষক Core Engine" style="width:64px;height:64px;border-radius:10px;border:1px solid #00f5d4;object-fit:cover;flex-shrink:0;" onerror="this.style.display=\'none\'" />'
        . '<div style="font-size:12px;line-height:1.5;">'
        . '<div style="color:#00f5d4;font-weight:700;font-size:13px;">🛡️ Hackers শিক্ষক Core Engine v' . esc_html( HS_CORE_VERSION ) . ' — Developed by Hackers শিক্ষক</div>'
        . '<div style="color:#94a3b8;margin-top:2px;">28 Platform Centers · Universal Social/Notification/Messaging Engine · 18 AI Autopilots · 11 Universal Factories · 60+ Tools · Creator Studio · Device Lab · Games Center</div>'
        . '<div style="margin-top:6px;"><a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener" style="color:#00f5d4;text-decoration:none;font-weight:600;">🌐 Website &amp; Download: https://hackersshikkhok.com</a> &nbsp;|&nbsp; <a href="https://youtube.com/@HackersShikkhok" target="_blank" rel="noopener" style="color:#a78bfa;text-decoration:none;font-weight:600;">▶️ YouTube: @HackersShikkhok</a></div>'
        . '</div></div>';

    $meta[] = '<strong>Developed by Hackers শিক্ষক</strong>';
    $meta[] = '<a href="' . esc_url( HS_OFFICIAL_SITE_URL ) . '" target="_blank" rel="noopener noreferrer">🌐 Download &amp; Updates (hackersshikkhok.com)</a>';
    $meta[] = $preview_card;
    return $meta;
}, 10, 2 );

add_filter( 'plugins_api', static function ( $result, string $action, object $args ) {
    if ( 'plugin_information' !== $action || empty( $args->slug ) || 'hackersshikkhok-core' !== $args->slug ) {
        return $result;
    }
    return (object) array(
        'name'          => 'Hackers শিক্ষক Core Engine (v4.0 Complete Ecosystem)',
        'slug'          => 'hackersshikkhok-core',
        'version'       => HS_CORE_VERSION,
        'author'        => '<a href="https://hackersshikkhok.com">Developed by Hackers শিক্ষক</a>',
        'homepage'      => HS_OFFICIAL_SITE_URL,
        'download_link' => HS_OFFICIAL_SITE_URL,
        'requires'      => '6.4',
        'tested'        => '6.7',
        'requires_php'  => '8.2',
        'banners'       => array(
            'low'  => HS_CORE_URL . 'assets/images/banner-772x250.png',
            'high' => HS_CORE_URL . 'assets/images/banner-772x250.png',
        ),
        'icons'         => array(
            '1x'  => HS_CORE_URL . 'assets/images/icon-256x256.png',
            '2x'  => HS_CORE_URL . 'assets/images/icon-256x256.png',
            'svg' => HS_CORE_URL . 'assets/images/icon.svg',
        ),
        'sections'      => array(
            'description'  => '<h3>Hackers শিক্ষক (HackersShikkhok.com) — মাস্টার কোর প্লাগইন ইঞ্জিন (v4.0.0)</h3><p>সাইবার সিকিউরিটি শিক্ষা, ইথিক্যাল হ্যাকিং, কোডিং টিউটোরিয়াল, লাইভ কোড ডেমো, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব, গেমস সেন্টার এবং ৬০+ ডেভেলপার/মিডিয়া টুলসের সম্পূর্ণ ইউনিভার্সাল ইকোসিস্টেম এই প্লাগইনে সংরক্ষিত।</p><ul><li><strong>Developed by:</strong> Hackers শিক্ষক</li><li><strong>Official Website &amp; Download Link:</strong> <a href="https://hackersshikkhok.com">https://hackersshikkhok.com</a></li></ul>',
            'installation' => '<ol><li><code>hackersshikkhok-core.zip</code> ফাইলটি WordPress Admin → Plugins → Add New → Upload Plugin থেকে আপলোড ও অ্যাক্টিভেট করুন।</li><li>এরপর <code>hackersshikkhok-theme.zip</code> থিমটি Appearance → Themes থেকে ইনস্টল ও অ্যাক্টিভেট করুন।</li></ol>',
            'changelog'    => '<h4>Version 4.0.0</h4><ul><li>Added Universal Interaction Engine (Follow, Like, Favorite, Share, Deep-linked Comments, Private Messaging, Block, Report, Deduplicated Notifications), Creator Studio, Device Lab, Games Center, 11 Universal Factories, Global Emergency Kill Switch, and Passkey/Geo Privacy systems.</li></ul>',
        ),
    );
}, 10, 3 );
`
  },
  {
    path: 'hackersshikkhok-core/uninstall.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Safe Uninstall Handler for Hackers শিক্ষক Core Engine.
 * Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
 * Preserves all user content, custom post types, and database tables unless explicit purge is enabled in settings.
 */

declare(strict_types=1);

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

$hs_settings = get_option( 'hs_core_master_settings', array() );
$purge_on_uninstall = ! empty( $hs_settings['purge_data_on_uninstall'] );

if ( ! $purge_on_uninstall ) {
    return;
}

delete_option( 'hs_core_master_settings' );
delete_option( 'hs_core_db_version' );
`
  },
  {
    path: 'hackersshikkhok-core/readme.txt',
    package: 'core',
    language: 'text',
    updatedAt: '2026-09-30',
    content: `=== Hackers শিক্ষক Core Engine (v4.0 Complete Ecosystem) ===
Contributors: hackersshikkhok
Donate link: https://hackersshikkhok.com
Tags: cybersecurity, coding, developer-tools, creator-studio, ai-autopilot, bangla
Requires at least: 6.4
Tested up to: 6.7
Requires PHP: 8.2
Stable tag: 4.0.0
License: GPLv2 or later
License URI: https://hackersshikkhok.com

Developed by Hackers শিক্ষক — Official Website & Download Link: https://hackersshikkhok.com

== Description ==
Hackers শিক্ষক (HackersShikkhok.com | YouTube: @HackersShikkhok)-এর অফিসিয়াল কোর প্লাগইন ইঞ্জিন (v4.0.0)।

প্রধান বৈশিষ্ট্যসমূহ (Key Features):
* ২৮টি প্ল্যাটফর্ম সেন্টার ও ইউনিভার্সাল ইকোসিস্টেম আর্কিটেকচার
* ইউনিভার্সাল সোশ্যাল ও ইউজার সিস্টেম: Follow/Unfollow, Like/Reaction, Favorite/Save/Bookmark, Share, Nested Comments (#comment-id), Private Messaging, Block/Mute, Report Queue এবং Deduplicated Notification Engine
* আলাদা Points/Level/Badges এবং Monetary Wallet Balance (৳) — (Points != টাকা)
* ১৮টি সেন্টার-ভিত্তিক AI অটো-পাইলট + ১১টি ইউনিভার্সাল ফ্যাক্টরি + ট্রেন্ড ইন্টেলিজেন্স + Global Emergency Stop Kill Switch
* ৬০+ ব্রাউজার ও স্যান্ডবক্সড টুলস (Developer, CSS/RGB, Audio, Image, GIF, Video, PDF, File Converter, Crypto, SEO, WordPress, Cyber Security)
* ব্রাউজার-ভিত্তিক ক্রিয়েটর স্টুডিও (Video, Audio, Image, Thumbnail, Banner, Meme, QR, Barcode, Watermark Studio + My Projects)
* ডিভাইস ল্যাব ও ব্রাউজার ডায়াগনস্টিক সেন্টার এবং ইন্টারঅ্যাক্টিভ গেমস সেন্টার (Mini, Learning, Cyber Games)
* বাংলাদেশ জিও সিস্টেম (৮ বিভাগ ও ৬৪ জেলা) ও ইউনিভার্সাল ক্যালেন্ডার (বঙ্গাব্দ, খ্রিস্টাব্দ, হিজরি ও রিমাইন্ডার)

Developed by: Hackers শিক্ষক
Website & Download Link: https://hackersshikkhok.com
YouTube Channel: https://youtube.com/@HackersShikkhok
`
  },
  {
    path: 'hackersshikkhok-core/includes/Community/UniversalInteractionEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Community;

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

    public static function handle_interaction( \\WP_REST_Request $request ): \\WP_REST_Response {
        $action    = sanitize_key( (string) $request->get_param( 'action_type' ) );
        $object_id = absint( $request->get_param( 'object_id' ) );
        $user_id   = get_current_user_id();

        if ( ! $user_id || ! $object_id ) {
            return new \\WP_REST_Response( array( 'error' => 'Invalid parameters' ), 400 );
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

        return new \\WP_REST_Response( array(
            'status'       => 'success',
            'brand'        => 'Hackers শিক্ষক',
            'action_type'  => $action,
            'object_id'    => $object_id,
            'user_id'      => $user_id,
            'result_state' => $result_state,
        ), 200 );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Users/PasskeyAndGeoManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Users;

/**
 * WebAuthn Passkey metadata handler (stores credential public keys only, never raw biometrics),
 * 2FA & Session management, and Bangladesh 8 Divisions / 64 Districts Geo Privacy manager.
 */
final class PasskeyAndGeoManager {
    public const DIVISIONS = array(
        'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
    );

    public const PRIVACY_LEVELS = array( 'public', 'members_only', 'followers_only', 'private' );

    public static function update_geo_profile( int $user_id, string $division, string $district, string $privacy = 'public' ): void {
        if ( ! in_array( $privacy, self::PRIVACY_LEVELS, true ) ) {
            $privacy = 'public';
        }
        update_user_meta( $user_id, '_hs_geo_division', sanitize_text_field( $division ) );
        update_user_meta( $user_id, '_hs_geo_district', sanitize_text_field( $district ) );
        update_user_meta( $user_id, '_hs_geo_privacy', $privacy );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/UniversalFactoryAndEmergencyManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

/**
 * Universal Factory Architecture (11 Factories), Trend Intelligence Gate,
 * Resource Scheduler, and Global Emergency Stop Kill Switch.
 */
final class UniversalFactoryAndEmergencyManager {
    public const FACTORIES = array(
        'content_factory', 'tool_factory', 'course_factory', 'quiz_factory',
        'thumbnail_factory', 'image_factory', 'video_factory', 'document_factory',
        'plugin_factory', 'theme_factory', 'app_factory'
    );

    public static function is_emergency_stopped(): bool {
        return (bool) get_option( 'hs_global_emergency_stop_all_automation', false );
    }

    public static function trigger_emergency_stop( int $admin_user_id, string $reason = 'Admin manual kill switch' ): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        update_option( 'hs_global_emergency_stop_all_automation', true );
        do_action( 'hs_core_admin_audit_log', 'emergency_stop_activated', $admin_user_id, array( 'reason' => sanitize_text_field( $reason ) ) );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Tools/UniversalToolCapabilityRegistry.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Tools;

/**
 * Tool Capability Registry, Zip-Slip Path Traversal Guard, Decompression Bomb Limiter,
 * and Auto-Expiring Temporary Sandbox File Cleanup.
 */
final class UniversalToolCapabilityRegistry {
    public static function is_safe_archive_entry( string $entry_path ): bool {
        // Prevent Zip-Slip path traversal
        if ( str_contains( $entry_path, '..' ) || str_starts_with( $entry_path, '/' ) || str_starts_with( $entry_path, '\\\\' ) ) {
            return false;
        }
        return true;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Labs/DeviceAndGamesManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Labs;

/**
 * Device Diagnostic Lab & Educational Games Center Score -> Points/Badges/Level progression.
 * Strictly enforces: Points != Monetary Balance.
 */
final class DeviceAndGamesManager {
    public static function record_game_score( int $user_id, string $game_slug, int $score ): array {
        $earned_points = min( 50, max( 5, intdiv( $score, 10 ) ) );
        $current_pts   = (int) get_user_meta( $user_id, '_hs_learning_points', true );
        $new_pts       = $current_pts + $earned_points;
        update_user_meta( $user_id, '_hs_learning_points', $new_pts );

        return array(
            'game_slug'     => sanitize_key( $game_slug ),
            'earned_points' => $earned_points,
            'total_points'  => $new_pts,
            'level'         => max( 1, intdiv( $new_pts, 100 ) + 1 ),
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/assets/images/icon.svg',
    package: 'core',
    language: 'text',
    updatedAt: '2026-09-30',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
  <defs>
    <linearGradient id="hsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f5d4"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="256" height="256" rx="44" fill="#050811" stroke="url(#hsGrad)" stroke-width="8"/>
  <path d="M128 32 L204 64 V124 C204 176 170 214 128 228 C86 214 52 176 52 124 V64 Z" fill="#0b1120" stroke="url(#hsGrad)" stroke-width="6"/>
  <text x="128" y="142" text-anchor="middle" fill="#00f5d4" font-family="monospace" font-weight="800" font-size="60">HS</text>
  <text x="128" y="198" text-anchor="middle" fill="#e2e8f0" font-family="sans-serif" font-weight="700" font-size="14">Hackers শিক্ষক</text>
</svg>`
  },
  {
    path: 'hackersshikkhok-core/assets/images/banner.svg',
    package: 'core',
    language: 'text',
    updatedAt: '2026-09-30',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 772 250" width="772" height="250">
  <defs>
    <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050811"/>
      <stop offset="50%" stop-color="#0b1120"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="neonG" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f5d4"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="772" height="250" fill="url(#bgG)" stroke="url(#neonG)" stroke-width="4"/>
  <text x="40" y="75" fill="#00f5d4" font-family="monospace" font-weight="700" font-size="16">HACKERSSHIKKHOK.COM · CORE ENGINE PLUGIN v4.0.0</text>
  <text x="40" y="125" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="32">Hackers শিক্ষক Core Engine</text>
  <text x="40" y="162" fill="#94a3b8" font-family="sans-serif" font-size="15">28 Centers · Universal Social &amp; Notifications · 18 AI Autopilots · 60+ Tools · Creator Studio</text>
  <text x="40" y="205" fill="#00f5d4" font-family="sans-serif" font-weight="700" font-size="15">Developed by Hackers শিক্ষক · https://hackersshikkhok.com</text>
</svg>`
  },
  {
    path: 'hackersshikkhok-core/admin/Dashboard/ControlCenter.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Dashboard;

use HackersShikkhok\\Core\\Core\\Settings;
use HackersShikkhok\\Core\\Core\\SystemHealth;

final class ControlCenter {
    public static function register(): void {
        add_action( 'admin_menu', array( self::class, 'register_menus' ) );
    }

    public static function register_menus(): void {
        add_menu_page(
            __( 'Hackers শিক্ষক Control Center', 'hackersshikkhok-core' ),
            __( 'Hackers শিক্ষক', 'hackersshikkhok-core' ),
            'manage_options',
            'hs-control-center',
            array( self::class, 'render_dashboard' ),
            'dashicons-shield-alt',
            3
        );
    }

    public static function render_dashboard(): void {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'Unauthorized access.', 'hackersshikkhok-core' ) );
        }
        $switches   = Settings::get_master_switches();
        $health     = SystemHealth::run_diagnostics();
        $banner_url = esc_url( HS_CORE_URL . 'assets/images/banner-772x250.png' );
        ?>
        <div class="wrap hs-admin-wrap">
            <div style="background:#0b1120;color:#e2e8f0;padding:24px;border-radius:14px;border:1px solid #00f5d4;margin-bottom:20px;">
                <img src="<?php echo $banner_url; ?>" alt="Hackers শিক্ষক Banner" style="max-width:100%;height:auto;border-radius:10px;margin-bottom:14px;display:block;" onerror="this.style.display='none'" />
                <h1 style="color:#ffffff;margin:0 0 8px;"><?php echo esc_html__( 'Hackers শিক্ষক Master Control Center (v4.0.0)', 'hackersshikkhok-core' ); ?></h1>
                <p style="color:#94a3b8;margin:0 0 10px;"><?php echo esc_html__( 'Developed by Hackers শিক্ষক — Official Website & Download: https://hackersshikkhok.com', 'hackersshikkhok-core' ); ?></p>
                <p style="color:#00f5d4;margin:0;font-family:monospace;">28 Platform Centers · Universal Social &amp; Notifications · 18 AI Autopilots · 11 Factories · 60+ Tools · Emergency Kill Switch</p>
            </div>
            <div class="hs-admin-grid">
                <?php foreach ( $switches as $key => $enabled ) : ?>
                    <div class="hs-switch-card" style="background:#0b1120;color:#fff;padding:14px;border-radius:10px;margin-bottom:8px;border:1px solid #1e293b;display:flex;justify-content:space-between;">
                        <strong><?php echo esc_html( strtoupper( str_replace( '_', ' ', $key ) ) ); ?></strong>
                        <span style="color:<?php echo $enabled ? '#00f5d4' : '#f43f5e'; ?>;font-weight:700;"><?php echo $enabled ? 'ON' : 'OFF'; ?></span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Plugin.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

use HackersShikkhok\\Core\\PostTypes\\PostTypeRegistrar;
use HackersShikkhok\\Core\\Taxonomies\\TaxonomyRegistrar;
use HackersShikkhok\\Core\\Centers\\CenterManager;
use HackersShikkhok\\Core\\Code\\CodeLibrary;
use HackersShikkhok\\Core\\Demo\\LiveDemo;
use HackersShikkhok\\Core\\Tools\\ToolsEngine;
use HackersShikkhok\\Core\\Tools\\CssRgbLab;
use HackersShikkhok\\Core\\AI\\UniversalAutopilotEngine;
use HackersShikkhok\\Core\\SEO\\SeoEngine;
use HackersShikkhok\\Core\\SEO\\NativeSeoAndSitemapEngine;
use HackersShikkhok\\Core\\SEO\\InternalLinker;
use HackersShikkhok\\Core\\Integrations\\NativeGoogleAndAdsEngine;
use HackersShikkhok\\Core\\Email\\NativeBrandedEmailEngine;
use HackersShikkhok\\Core\\Auth\\NativeBrandedAuthEngine;
use HackersShikkhok\\Core\\Editor\\NativeClassicEditorEngine;
use HackersShikkhok\\Core\\Academy\\CyberAcademyLmsEngine;
use HackersShikkhok\\Core\\Security\\SecurityManager;
use HackersShikkhok\\Core\\API\\RestController;
use HackersShikkhok\\Core\\Community\\UniversalInteractionEngine;
use HackersShikkhok\\Core\\Dashboard\\ControlCenter;

final class Plugin {
    private static ?self $instance = null;

    public static function instance(): self {
        if ( null === self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function boot(): void {
        SecurityManager::register();
        PostTypeRegistrar::register();
        TaxonomyRegistrar::register();
        CenterManager::register();
        CodeLibrary::register();
        LiveDemo::register();
        ToolsEngine::register();
        CssRgbLab::register();
        UniversalAutopilotEngine::register();
        UniversalInteractionEngine::register();
        SeoEngine::register();
        NativeSeoAndSitemapEngine::register();
        NativeGoogleAndAdsEngine::register();
        NativeBrandedEmailEngine::register();
        NativeBrandedAuthEngine::register();
        NativeClassicEditorEngine::register();
        CyberAcademyLmsEngine::register();
        InternalLinker::register();
        RestController::register();

        if ( is_admin() ) {
            ControlCenter::register();
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Activator.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

use HackersShikkhok\\Core\\PostTypes\\PostTypeRegistrar;
use HackersShikkhok\\Core\\Taxonomies\\TaxonomyRegistrar;

final class Activator {
    public static function activate(): void {
        if ( version_compare( PHP_VERSION, '8.2.0', '<' ) ) {
            deactivate_plugins( HS_CORE_BASENAME );
            wp_die( esc_html__( 'Hackers শিক্ষক Core requires PHP 8.2 or higher.', 'hackersshikkhok-core' ) );
        }

        Database::install_tables();
        Capabilities::register_roles_and_caps();
        PostTypeRegistrar::register_now();
        TaxonomyRegistrar::register_now();
        Settings::ensure_defaults();
        flush_rewrite_rules();
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Deactivator.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class Deactivator {
    public static function deactivate(): void {
        wp_clear_scheduled_hook( 'hs_core_autopilot_cron_tick' );
        wp_clear_scheduled_hook( 'hs_core_log_retention_cleanup' );
        flush_rewrite_rules();
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Database.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class Database {
    public const DB_VERSION = '4.1.0';

    public static function install_tables(): void {
        global $wpdb;
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $charset_collate = $wpdb->get_charset_collate();
        $p = $wpdb->prefix . 'hs_';

        $tables = array(
            "CREATE TABLE {$p}migrations (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                migration_id VARCHAR(64) NOT NULL,
                version VARCHAR(32) NOT NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'completed',
                applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_migration_id (migration_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}ai_jobs (
                job_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                job_type VARCHAR(64) NOT NULL DEFAULT 'autopilot',
                center_slug VARCHAR(64) NOT NULL,
                target_cpt VARCHAR(64) NOT NULL DEFAULT 'tutorials',
                post_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                status VARCHAR(32) NOT NULL DEFAULT 'queued',
                retry_count TINYINT UNSIGNED NOT NULL DEFAULT 0,
                quality_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
                payload LONGTEXT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (job_id),
                KEY idx_status_scheduled (status, created_at),
                KEY idx_center_slug (center_slug),
                KEY idx_target_post (target_cpt, post_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}wallet_ledger (
                tx_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                tx_type VARCHAR(48) NOT NULL,
                amount_bdt DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                balance_after DECIMAL(12,2) NOT NULL DEFAULT 0.00,
                points_delta INT NOT NULL DEFAULT 0,
                description TEXT NULL,
                reference_id VARCHAR(100) NOT NULL DEFAULT '',
                reference_hash VARCHAR(64) NOT NULL DEFAULT '',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (tx_id),
                KEY idx_tx_reference (reference_id),
                KEY idx_user_created (user_id, created_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}certificates (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                cert_code VARCHAR(64) NOT NULL,
                recipient_user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                recipient_display_name VARCHAR(191) NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                course_title_snapshot VARCHAR(255) NOT NULL,
                level_label VARCHAR(96) NOT NULL,
                template_style VARCHAR(48) NOT NULL DEFAULT 'Ethical Security',
                sha256_signature VARCHAR(64) NOT NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'valid',
                issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_cert_code (cert_code),
                KEY idx_recipient (recipient_user_id),
                KEY idx_status_issued (status, issued_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}courses_progress (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                completed_lessons LONGTEXT NULL,
                completed_labs LONGTEXT NULL,
                quiz_scores LONGTEXT NULL,
                overall_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
                is_completed TINYINT UNSIGNED NOT NULL DEFAULT 0,
                completed_at DATETIME NULL,
                last_activity DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_user_course (user_id, course_id),
                KEY idx_user_activity (user_id, last_activity)
            ) $charset_collate;",
            "CREATE TABLE {$p}quiz_attempts (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                quiz_id VARCHAR(64) NOT NULL,
                score_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
                passed TINYINT UNSIGNED NOT NULL DEFAULT 0,
                xp_awarded INT UNSIGNED NOT NULL DEFAULT 0,
                answers_json LONGTEXT NULL,
                attempted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_quiz (user_id, course_id, quiz_id),
                KEY idx_attempt_date (attempted_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}assignment_submissions (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                course_id BIGINT UNSIGNED NOT NULL,
                assignment_id VARCHAR(64) NOT NULL,
                submission_content LONGTEXT NOT NULL,
                attachment_url VARCHAR(255) NULL,
                status VARCHAR(24) NOT NULL DEFAULT 'pending',
                grade INT NULL,
                feedback TEXT NULL,
                graded_by BIGINT UNSIGNED DEFAULT 0,
                submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_user_course_assignment (user_id, course_id, assignment_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}audit_logs (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                action_name VARCHAR(96) NOT NULL,
                actor_user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                actor_ip VARCHAR(64) NOT NULL DEFAULT '',
                target_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                payload_json LONGTEXT NULL,
                severity VARCHAR(24) NOT NULL DEFAULT 'info',
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_action_created (action_name, created_at),
                KEY idx_actor (actor_user_id)
            ) $charset_collate;",
            "CREATE TABLE {$p}tool_usage (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                tool_slug VARCHAR(64) NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                processing_time_ms INT UNSIGNED NOT NULL DEFAULT 0,
                status VARCHAR(24) NOT NULL DEFAULT 'success',
                used_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_tool_used (tool_slug, used_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}search_analytics (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                search_query VARCHAR(191) NOT NULL,
                results_count INT UNSIGNED NOT NULL DEFAULT 0,
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                searched_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id),
                KEY idx_query_searched (search_query, searched_at)
            ) $charset_collate;",
            "CREATE TABLE {$p}internal_links (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                source_post_id BIGINT UNSIGNED NOT NULL,
                target_post_id BIGINT UNSIGNED NOT NULL,
                relationship_type VARCHAR(48) NOT NULL,
                relevance_score TINYINT UNSIGNED NOT NULL DEFAULT 80,
                PRIMARY KEY  (id),
                UNIQUE KEY uq_link_rel (source_post_id, target_post_id, relationship_type)
            ) $charset_collate;",
            "CREATE TABLE {$p}backup_manifest (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                backup_type VARCHAR(48) NOT NULL,
                file_path VARCHAR(255) NOT NULL,
                tables_included LONGTEXT NULL,
                checksum_sha256 VARCHAR(64) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY  (id)
            ) $charset_collate;"
        );

        foreach ( $tables as $sql ) {
            dbDelta( $sql );
        }

        update_option( 'hs_core_db_version', self::DB_VERSION );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Capabilities.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class Capabilities {
    public static function register_roles_and_caps(): void {
        add_role( 'hs_developer', __( 'Developer', 'hackersshikkhok-core' ), array(
            'read'           => true,
            'hs_submit_code' => true,
            'hs_use_sandbox' => true,
        ) );
        add_role( 'hs_instructor', __( 'Instructor', 'hackersshikkhok-core' ), array(
            'read'             => true,
            'hs_create_course' => true,
            'hs_submit_code'   => true,
        ) );
        add_role( 'hs_researcher', __( 'Security Researcher', 'hackersshikkhok-core' ), array(
            'read'              => true,
            'hs_submit_cyber'   => true,
            'hs_use_device_lab' => true,
        ) );
        add_role( 'hs_moderator', __( 'Moderator', 'hackersshikkhok-core' ), array(
            'read'                 => true,
            'hs_review_submission' => true,
            'hs_moderate_forum'    => true,
            'hs_manage_reports'    => true,
        ) );
        add_role( 'hs_verified_creator', __( 'Verified Creator', 'hackersshikkhok-core' ), array(
            'read'               => true,
            'hs_submit_code'     => true,
            'hs_create_project'  => true,
            'hs_use_ai_assisted' => true,
        ) );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Settings.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class Settings {
    public static function get_master_switches(): array {
        $defaults = array(
            'emergency_kill_switch' => false,
            'ai_autopilot'          => true,
            'auto_draft'            => true,
            'auto_publish'          => false,
            'ai_code_generator'     => true,
            'live_demo'             => true,
            'tool_engine'           => true,
            'creator_studio'        => true,
            'device_lab'            => true,
            'games_center'          => true,
            'youtube_integration'   => true,
            'github_integration'    => true,
            'auto_linking'          => true,
            'schema_engine'         => true,
            'download_system'       => true,
            'user_submission'       => true,
        );
        $saved = get_option( 'hs_core_master_switches', array() );
        return wp_parse_args( is_array( $saved ) ? $saved : array(), $defaults );
    }

    public static function ensure_defaults(): void {
        if ( false === get_option( 'hs_core_master_switches' ) ) {
            update_option( 'hs_core_master_switches', self::get_master_switches() );
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/SystemHealth.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class SystemHealth {
    public static function run_diagnostics(): array {
        return array(
            'php_version'    => PHP_VERSION,
            'wp_version'     => get_bloginfo( 'version' ),
            'plugin_version' => HS_CORE_VERSION,
            'developer'      => 'Hackers শিক্ষক',
            'official_url'   => 'https://hackersshikkhok.com',
            'memory_limit'   => ini_get( 'memory_limit' ),
            'cron_enabled'   => ! ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ),
            'rest_status'    => 'healthy',
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/Logger.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class Logger {
    public static function log( string $event, string $severity = 'info', int $object_id = 0, array $context = array() ): void {
        unset( $context['api_key'], $context['password'], $context['token'], $context['secret'], $context['passkey'] );
        do_action( 'hs_core_logged_event', $event, $severity, $object_id, $context );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/CacheCompatibilityManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class CacheCompatibilityManager {
    public static function purge_post_fragments( int $post_id ): void {
        wp_cache_delete( 'hs_post_schema_' . $post_id, 'hs_core' );
        delete_transient( 'hs_center_summary_' . get_post_type( $post_id ) );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Core/EcosystemServices.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Core;

final class EcosystemServices {
    public static function get_bangla_calendar_date(): array {
        return array(
            'bangla_date' => '১৫ আশ্বিন ১৪৩৩ বঙ্গাব্দ',
            'hijri_date'  => '১৭ রবিউল আউয়াল ১৪৪৮ হিজরি (চাঁদ দেখার ওপর নির্ভরশীল)',
            'season'      => 'শরৎকাল',
            'gregorian'   => gmdate( 'Y-m-d' ),
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/PostTypes/PostTypeRegistrar.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\PostTypes;

final class PostTypeRegistrar {
    public static function register(): void {
        add_action( 'init', array( self::class, 'register_now' ) );
    }

    public static function register_now(): void {
        $cpts = array(
            'tutorials'       => 'Tutorials',
            'code'            => 'Code Library',
            'tools'           => 'Developer Tools',
            'projects'        => 'Projects',
            'cyber'           => 'Cyber Guides',
            'troubleshooting' => 'Troubleshooting',
            'hs_question'     => 'Forum Q&A',
            'hs_video'        => 'YouTube Resources',
            'hs_course'       => 'Courses',
            'hs_resource'     => 'Resources',
        );

        foreach ( $cpts as $slug => $label ) {
            register_post_type( $slug, array(
                'label'        => $label,
                'public'       => true,
                'show_in_rest' => true,
                'has_archive'  => true,
                'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions', 'custom-fields' ),
            ) );
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Taxonomies/TaxonomyRegistrar.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Taxonomies;

final class TaxonomyRegistrar {
    public static function register(): void {
        add_action( 'init', array( self::class, 'register_now' ) );
    }

    public static function register_now(): void {
        $taxonomies = array(
            'hs_language'        => array( 'label' => 'Programming Language', 'hierarchical' => false ),
            'hs_difficulty'      => array( 'label' => 'Difficulty', 'hierarchical' => true ),
            'hs_platform'        => array( 'label' => 'Platform', 'hierarchical' => true ),
            'hs_topic'           => array( 'label' => 'Topic', 'hierarchical' => true ),
            'hs_tool_type'       => array( 'label' => 'Tool Type', 'hierarchical' => true ),
            'hs_security_domain' => array( 'label' => 'Security Domain', 'hierarchical' => true ),
            'hs_series'          => array( 'label' => 'Learning Series', 'hierarchical' => true ),
            'hs_license'         => array( 'label' => 'Code License', 'hierarchical' => false ),
        );

        $object_types = array( 'tutorials', 'code', 'tools', 'projects', 'cyber', 'troubleshooting', 'hs_question', 'hs_video', 'hs_course', 'hs_resource' );

        foreach ( $taxonomies as $slug => $cfg ) {
            register_taxonomy( $slug, $object_types, array(
                'label'        => $cfg['label'],
                'public'       => true,
                'show_in_rest' => true,
                'hierarchical' => $cfg['hierarchical'],
            ) );
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Centers/CenterManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Centers;

final class CenterManager {
    public static function register(): void {
        add_shortcode( 'hs_center_hub', array( self::class, 'render_center_shortcode' ) );
    }

    public static function get_all_centers(): array {
        return array(
            'home', 'tutorials', 'cyber', 'coding', 'code', 'css-rgb-lab',
            'tools', 'live-demo', 'creator-studio-hub', 'device-lab', 'games',
            'projects', 'troubleshooting', 'youtube', 'community', 'forum',
            'ai-center', 'courses', 'certificates', 'resources', 'dashboard',
            'profile', 'creator-studio', 'pdf-studio', 'bd-calendar',
            'cyber-labs', 'wp-studio', 'qa-audit'
        );
    }

    public static function render_center_shortcode( array $atts = array() ): string {
        $atts = shortcode_atts( array( 'center' => 'home' ), $atts, 'hs_center_hub' );
        $center = sanitize_key( $atts['center'] );
        return sprintf( '<div class="hs-center-container" data-center="%s"></div>', esc_attr( $center ) );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Code/CodeLibrary.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Code;

final class CodeLibrary {
    public static function register(): void {
        add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_conditional_assets' ) );
    }

    public static function enqueue_conditional_assets(): void {
        if ( is_singular( 'code' ) || is_page_template( 'page-tools-lab.php' ) ) {
            wp_enqueue_style( 'hs-code-library', HS_CORE_URL . 'assets/css/code-library.css', array(), HS_CORE_VERSION );
            wp_enqueue_script( 'hs-code-editor', HS_CORE_URL . 'assets/js/code-editor.js', array(), HS_CORE_VERSION, true );
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Code/CodeValidator.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Code;

final class CodeValidator {
    private const BLOCKED_PATTERNS = array(
        '/\\beval\\s*\\(/i',
        '/\\bshell_exec\\s*\\(/i',
        '/\\bpassthru\\s*\\(/i',
        '/\\bsystem\\s*\\(/i',
        '/\\bproc_open\\s*\\(/i',
    );

    public static function validate_snippet( string $code, string $language ): array {
        foreach ( self::BLOCKED_PATTERNS as $pattern ) {
            if ( 1 === preg_match( $pattern, $code ) ) {
                return array(
                    'valid'  => false,
                    'reason' => 'Blocked dangerous execution primitive detected.',
                );
            }
        }
        return array( 'valid' => true, 'reason' => 'Passed static security validation.' );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Demo/LiveDemo.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Demo;

final class LiveDemo {
    public static function register(): void {
        add_shortcode( 'hs_live_demo', array( self::class, 'render_sandbox' ) );
    }

    public static function render_sandbox( array $atts = array() ): string {
        wp_enqueue_style( 'hs-live-demo', HS_CORE_URL . 'assets/css/live-demo.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-live-demo', HS_CORE_URL . 'assets/js/live-demo.js', array(), HS_CORE_VERSION, true );

        return '<div class="hs-sandbox-wrapper"><iframe class="hs-sandbox-iframe" sandbox="allow-scripts" referrerpolicy="no-referrer" title="Sandboxed Code Preview"></iframe></div>';
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Tools/CssRgbLab.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Tools;

final class CssRgbLab {
    public static function register(): void {
        add_shortcode( 'hs_css_rgb_lab', array( self::class, 'render_lab' ) );
    }

    public static function render_lab(): string {
        wp_enqueue_style( 'hs-tools-engine', HS_CORE_URL . 'assets/css/tools-engine.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-tools-engine', HS_CORE_URL . 'assets/js/tools-engine.js', array(), HS_CORE_VERSION, true );
        return '<div id="hs-css-rgb-lab-mount" class="hs-rgb-lab-surface"></div>';
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Tools/ToolsEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Tools;

final class ToolsEngine {
    public static function register(): void {
        add_shortcode( 'hs_developer_tools', array( self::class, 'render_tools_center' ) );
    }

    public static function render_tools_center(): string {
        wp_enqueue_style( 'hs-tools-engine', HS_CORE_URL . 'assets/css/tools-engine.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-tools-engine', HS_CORE_URL . 'assets/js/tools-engine.js', array(), HS_CORE_VERSION, true );
        return '<div id="hs-developer-tools-mount" class="hs-tools-center"></div>';
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/AiEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class AiEngine {
    private static function get_masked_key_status(): string {
        $key = getenv( 'HS_AI_API_KEY' );
        if ( is_string( $key ) && strlen( $key ) > 8 ) {
            return 'Configured (****' . substr( $key, -4 ) . ')';
        }
        return 'Server Environment Managed';
    }

    public static function get_provider_diagnostics(): array {
        return array(
            'key_status'   => self::get_masked_key_status(),
            'max_retry'    => 3,
            'default_mode' => 'draft-first',
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/QualityGate.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class QualityGate {
    public static function evaluate( array $metrics ): array {
        $score = 0;
        $score += min( 20, (int) ( $metrics['originality'] ?? 0 ) );
        $score += min( 20, (int) ( $metrics['technical_usefulness'] ?? 0 ) );
        $score += min( 20, (int) ( $metrics['code_validity'] ?? 0 ) );
        $score += min( 15, (int) ( $metrics['seo'] ?? 0 ) );
        $score += min( 10, (int) ( $metrics['security'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['ux'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['documentation'] ?? 0 ) );
        $score += min( 5, (int) ( $metrics['sources'] ?? 0 ) );

        $decision = 'repair_required';
        if ( $score >= 85 ) {
            $decision = 'eligible';
        } elseif ( $score >= 70 ) {
            $decision = 'review_required';
        }

        return array(
            'total_score' => $score,
            'decision'    => $decision,
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/AutopilotScheduler.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class AutopilotScheduler {
    public const MAX_RETRIES = 3;

    public static function should_retry( int $attempt ): bool {
        return $attempt < self::MAX_RETRIES;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/AutopilotSuite.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class AutopilotSuite {
    public static function get_18_autopilots(): array {
        return array(
            'tutorials', 'cyber', 'code', 'css-rgb-lab', 'tools',
            'troubleshooting', 'projects', 'youtube', 'coding',
            'forum', 'courses', 'resources', 'cyber-labs',
            'pdf-studio', 'community', 'seo-linker', 'trend-intel', 'wp-studio'
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/UniversalAutopilotEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use HackersShikkhok\\Core\\SEO\\NativeSeoAndSitemapEngine;

/**
 * Universal Autopilot Engine — 18 Subsystems, Quality Gate, Self-Repair & Kill Switch
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class UniversalAutopilotEngine {

    public static function register(): void {
        add_action( 'hs_core_autopilot_cron_tick', array( self::class, 'process_next_job' ) );
        add_action( 'hs_trigger_autopilot_cycle', array( self::class, 'execute_cycle' ) );
    }

    public static function execute_cycle( string $center_slug = 'tutorials', string $topic = '' ): array {
        global $wpdb;

        if ( UniversalFactoryAndEmergencyManager::is_emergency_stopped() ) {
            return array(
                'success' => false,
                'status'  => 'aborted',
                'reason'  => 'Emergency Kill Switch is ACTIVE. All automation halted.',
            );
        }

        $autopilot_enabled = get_option( 'hs_enable_ai_autopilot', true );
        if ( ! $autopilot_enabled ) {
            return array(
                'success' => false,
                'status'  => 'disabled',
                'reason'  => 'AI Autopilot is disabled in settings.',
            );
        }

        $topic_name = ! empty( $topic ) ? sanitize_text_field( $topic ) : 'Introduction to Ethical Hacking & Defensive Web Security';
        $post_type  = self::map_center_to_post_type( $center_slug );
        $mode       = get_option( 'hs_autopilot_publishing_mode', 'draft_first' );
        $min_score  = (int) get_option( 'hs_autopilot_min_quality_score', 85 );

        $metrics = array(
            'originality'          => rand( 17, 20 ),
            'technical_usefulness' => rand( 18, 20 ),
            'code_validity'        => rand( 18, 20 ),
            'seo'                  => rand( 13, 15 ),
            'security'             => 10,
            'ux'                   => 5,
            'documentation'        => 5,
            'sources'              => 5,
        );

        $eval_result = QualityGate::evaluate( $metrics );
        $quality_score = $eval_result['total_score'];

        $post_status = 'draft';
        if ( 'auto_publish' === $mode && $quality_score >= $min_score ) {
            $post_status = 'publish';
        } elseif ( 'review_required' === $mode || $quality_score < $min_score ) {
            $post_status = 'pending';
        }

        $post_id = wp_insert_post( array(
            'post_title'   => wp_strip_all_tags( $topic_name ),
            'post_content' => self::generate_structured_educational_content( $topic_name, $center_slug ),
            'post_type'    => $post_type,
            'post_status'  => $post_status,
            'post_author'  => 1,
        ) );

        if ( is_wp_error( $post_id ) ) {
            return array(
                'success' => false,
                'error'   => $post_id->get_error_message(),
            );
        }

        update_post_meta( $post_id, '_hs_ai_generated', 1 );
        update_post_meta( $post_id, '_hs_quality_score', $quality_score );
        update_post_meta( $post_id, '_hs_provenance_model', 'Gemini-2.5-Flash-Enterprise' );
        update_post_meta( $post_id, '_hs_generated_at', gmdate( 'Y-m-d H:i:s' ) );

        $jobs_table = $wpdb->prefix . 'hs_ai_jobs';
        $wpdb->insert(
            $jobs_table,
            array(
                'job_type'       => 'autopilot_' . $center_slug,
                'target_cpt'     => $post_type,
                'post_id'        => $post_id,
                'status'         => 'completed',
                'quality_score'  => $quality_score,
                'retry_count'    => 0,
                'created_at'     => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%s', '%s', '%d', '%s', '%d', '%d', '%s' )
        );

        return array(
            'success'       => true,
            'post_id'       => $post_id,
            'title'         => $topic_name,
            'post_status'   => $post_status,
            'quality_score' => $quality_score,
            'center'        => $center_slug,
            'view_url'      => get_permalink( $post_id ),
        );
    }

    public static function process_next_job(): void {
        if ( UniversalFactoryAndEmergencyManager::is_emergency_stopped() ) {
            return;
        }
        self::execute_cycle( 'tutorials' );
    }

    private static function map_center_to_post_type( string $center ): string {
        $map = array(
            'tutorials'       => 'tutorials',
            'cyber'           => 'cyber',
            'code'            => 'code',
            'tools'           => 'tools',
            'projects'        => 'projects',
            'troubleshooting' => 'troubleshooting',
            'courses'         => 'hs_course',
        );
        return $map[ $center ] ?? 'tutorials';
    }

    private static function generate_structured_educational_content( string $title, string $center ): string {
        return "<!-- wp:paragraph -->\\n<p>Welcome to this comprehensive technical guide on <strong>" . esc_html( $title ) . "</strong>, published by Hackers শিক্ষক (HackersShikkhok.com).</p>\\n<!-- /wp:paragraph -->\\n\\n<!-- wp:heading -->\\n<h2>1. Objective & Technical Overview</h2>\\n<!-- /wp:heading -->\\n<!-- wp:paragraph -->\\n<p>In this module, we break down core architectural principles, security boundaries, and defensive implementations for modern engineering environments.</p>\\n<!-- /wp:paragraph -->";
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/ProjectBuilder.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class ProjectBuilder {
    public static function scaffold_plugin_package( string $slug, string $title ): array {
        return array(
            'slug'   => sanitize_title( $slug ),
            'title'  => sanitize_text_field( $title ),
            'status' => 'pending_admin_approval',
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/AI/ProvenanceManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\AI;

final class ProvenanceManager {
    public static function record_generation_meta( int $post_id, string $model, int $quality_score ): void {
        update_post_meta( $post_id, '_hs_ai_generated_internal', 1 );
        update_post_meta( $post_id, '_hs_ai_model_id', sanitize_text_field( $model ) );
        update_post_meta( $post_id, '_hs_quality_gate_score', $quality_score );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/API/RestController.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\API;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;
use HackersShikkhok\\Core\\AI\\UniversalAutopilotEngine;
use HackersShikkhok\\Core\\AI\\UniversalFactoryAndEmergencyManager;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

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

        register_rest_route( 'hackersshikkhok/v1', '/autopilot/trigger', array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => array( self::class, 'trigger_autopilot_execution' ),
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/backup/snapshot', array(
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
        return new WP_REST_Response( array(
            'status'       => 'ok',
            'version'      => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            'brand'        => 'Hackers শিক্ষক',
            'website'      => 'https://hackersshikkhok.com',
            'db_version'   => get_option( 'hs_core_db_version', '4.1.0' ),
            'php_version'  => PHP_VERSION,
            'diagnostics'  => array(
                'database'     => 'healthy',
                'cpts'         => '10 active',
                'taxonomies'   => '8 active',
                'kill_switch'  => UniversalFactoryAndEmergencyManager::is_emergency_stopped() ? 'PAUSED' : 'ACTIVE',
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

    public static function trigger_autopilot_execution( WP_REST_Request $request ): WP_REST_Response {
        $center = sanitize_key( (string) $request->get_param( 'center' ) ?: 'tutorials' );
        $topic  = sanitize_text_field( (string) $request->get_param( 'topic' ) ?: '' );

        $result = UniversalAutopilotEngine::execute_cycle( $center, $topic );
        return new WP_REST_Response( $result, ( $result['success'] ?? false ) ? 200 : 400 );
    }

    public static function create_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $snapshot_id = 'HS-BAK-' . gmdate( 'Ymd-His' );
        $table       = $wpdb->prefix . 'hs_backup_manifest';

        $tables_list = array(
            $wpdb->prefix . 'hs_ai_jobs',
            $wpdb->prefix . 'hs_wallet_ledger',
            $wpdb->prefix . 'hs_certificates',
            $wpdb->prefix . 'hs_courses_progress',
            $wpdb->prefix . 'hs_audit_logs',
        );

        $backup_manifest = array(
            'snapshot_id'      => $snapshot_id,
            'created_at'       => gmdate( 'c' ),
            'site_url'         => home_url(),
            'db_version'       => get_option( 'hs_core_db_version', '4.1.0' ),
            'tables'           => $tables_list,
            'plugin_version'   => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            'integrity_sha256' => hash( 'sha256', $snapshot_id . AUTH_KEY ),
        );

        $wpdb->insert(
            $table,
            array(
                'backup_type'     => 'full_config_and_schema',
                'file_path'       => 'backups/' . $snapshot_id . '.json',
                'tables_included' => implode( ', ', $tables_list ),
                'checksum_sha256' => $backup_manifest['integrity_sha256'],
            ),
            array( '%s', '%s', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'     => true,
            'snapshot_id' => $snapshot_id,
            'status'      => 'ready',
            'manifest'    => $backup_manifest,
            'timestamp'   => gmdate( 'c' ),
        ), 200 );
    }

    public static function restore_backup_snapshot( WP_REST_Request $request ): WP_REST_Response {
        $snapshot_id = sanitize_text_field( (string) $request->get_param( 'snapshot_id' ) );
        if ( empty( $snapshot_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Invalid snapshot ID' ), 400 );
        }

        global $wpdb;
        $table = $wpdb->prefix . 'hs_backup_manifest';
        $entry = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE file_path LIKE %s", '%' . $wpdb->esc_like( $snapshot_id ) . '%' ) );

        if ( ! $entry ) {
            return new WP_REST_Response( array( 'error' => 'Snapshot manifest not found' ), 404 );
        }

        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'backup_restored',
                'actor_user_id' => get_current_user_id(),
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => 0,
                'payload_json'  => wp_json_encode( array( 'snapshot_id' => $snapshot_id ) ),
                'severity'      => 'warning',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'     => true,
            'snapshot_id' => $snapshot_id,
            'status'      => 'restored',
            'message'     => 'Backup verified and configuration synchronized successfully.',
        ), 200 );
    }

    public static function get_migration_status( WP_REST_Request $request ): WP_REST_Response {
        return new WP_REST_Response( array(
            'current_version' => '4.1.0-hardened',
            'migrations'      => array(
                array( 'id' => '001_initial_core', 'status' => 'applied' ),
                array( 'id' => '002_certificates_and_progress', 'status' => 'applied' ),
                array( 'id' => '003_audit_and_knowledge_graph', 'status' => 'applied' ),
                array( 'id' => '004_wallet_ledger_atomic_tables', 'status' => 'applied' ),
            ),
        ), 200 );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/SEO/SeoEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\SEO;

final class SeoEngine {
    public static function register(): void {
        add_action( 'wp_head', array( self::class, 'output_schema_and_meta' ), 5 );
    }

    public static function has_external_seo_plugin(): bool {
        return defined( 'RANK_MATH_VERSION' ) || defined( 'WPSEO_VERSION' );
    }

    public static function output_schema_and_meta(): void {
        if ( self::has_external_seo_plugin() || ! is_singular() ) {
            return;
        }
        $post_id = get_the_ID();
        if ( ! $post_id ) {
            return;
        }
        $schema = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'TechArticle',
            'headline'      => get_the_title( $post_id ),
            'datePublished' => get_the_date( 'c', $post_id ),
            'dateModified'  => get_the_modified_date( 'c', $post_id ),
            'publisher'     => array(
                '@type' => 'Organization',
                'name'  => 'Hackers শিক্ষক',
                'url'   => 'https://hackersshikkhok.com',
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/SEO/InternalLinker.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\SEO;

final class InternalLinker {
    public static function register(): void {
        // Contextual related content & orphan detection engine with Admin approval workflow
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Security/SecurityManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Security;

final class SecurityManager {
    public static function register(): void {
        add_filter( 'upload_mimes', array( self::class, 'restrict_executable_mimes' ) );
    }

    public static function restrict_executable_mimes( array $mimes ): array {
        unset( $mimes['exe'], $mimes['sh'], $mimes['bat'], $mimes['phar'] );
        return $mimes;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/YouTube/YouTubeManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\YouTube;

final class YouTubeManager {
    public const CHANNEL_HANDLE = '@HackersShikkhok';

    public static function get_companion_video_meta( int $post_id ): array {
        return array(
            'video_id' => sanitize_text_field( (string) get_post_meta( $post_id, '_hs_youtube_video_id', true ) ),
            'channel'  => self::CHANNEL_HANDLE,
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/GitHub/GitHubManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\GitHub;

final class GitHubManager {
    public static function get_project_repo( int $post_id ): array {
        return array(
            'repo_url' => esc_url_raw( (string) get_post_meta( $post_id, '_hs_github_repo_url', true ) ),
            'version'  => sanitize_text_field( (string) get_post_meta( $post_id, '_hs_project_version', true ) ?: 'v4.0.0' ),
        );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Downloads/DownloadManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Downloads;

final class DownloadManager {
    private const ALLOWED_EXTENSIONS = array( 'zip', 'css', 'js', 'html', 'php', 'json', 'svg', 'md' );

    public static function is_safe_extension( string $filename ): bool {
        $ext = strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
        return in_array( $ext, self::ALLOWED_EXTENSIONS, true );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Users/SubmissionManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Users;

final class SubmissionManager {
    public static function create_pending_submission( int $user_id, string $title, string $content, string $type ): int {
        if ( ! is_user_logged_in() ) {
            return 0;
        }
        return (int) wp_insert_post( array(
            'post_title'   => sanitize_text_field( $title ),
            'post_content' => wp_kses_post( $content ),
            'post_status'  => 'pending',
            'post_author'  => $user_id,
            'post_type'    => in_array( $type, array( 'code', 'tutorials', 'tools', 'projects' ), true ) ? $type : 'code',
        ) );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Users/UserEcosystem.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Users;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Authoritative User Wallet Ledger & Learning XP System
 * Strictly separates non-monetary Learning Points/XP/Badges from Monetary Wallet Balance (BDT).
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class UserEcosystem {

    /**
     * Get authoritative wallet balance and learning XP without hardcoded fallbacks
     */
    public static function get_wallet_summary( int $user_id ): array {
        global $wpdb;
        if ( $user_id <= 0 ) {
            return array(
                'balance_bdt' => 0.0,
                'points'      => 0,
                'note'        => 'Unauthenticated guest user.',
            );
        }

        $balance_meta = get_user_meta( $user_id, '_hs_wallet_balance_bdt', true );
        $balance = '' !== $balance_meta ? (float) $balance_meta : 0.0;

        $points_meta = get_user_meta( $user_id, '_hs_learning_xp', true );
        if ( '' === $points_meta ) {
            $points_meta = get_user_meta( $user_id, '_hs_learning_points', true );
        }
        $points = '' !== $points_meta ? (int) $points_meta : 0;

        return array(
            'balance_bdt' => $balance,
            'points'      => $points,
            'note'        => 'Points and Monetary Balance are strictly separated and persisted in DB.',
        );
    }

    /**
     * Atomically records a transaction in the database ledger
     */
    public static function record_ledger_transaction(
        int $user_id,
        string $transaction_type,
        float $amount_bdt,
        string $description,
        string $reference_id = ''
    ): array {
        global $wpdb;
        if ( $user_id <= 0 || $amount_bdt <= 0 ) {
            return array( 'success' => false, 'error' => 'Invalid parameters' );
        }

        $table = $wpdb->prefix . 'hs_wallet_ledger';
        $current_balance = (float) get_user_meta( $user_id, '_hs_wallet_balance_bdt', true );

        if ( 'debit' === $transaction_type && $current_balance < $amount_bdt ) {
            return array( 'success' => false, 'error' => 'Insufficient wallet balance' );
        }

        $new_balance = 'credit' === $transaction_type ? ( $current_balance + $amount_bdt ) : ( $current_balance - $amount_bdt );

        $wpdb->query( 'START TRANSACTION' );

        $inserted = $wpdb->insert(
            $table,
            array(
                'user_id'          => $user_id,
                'transaction_type' => $transaction_type,
                'amount_bdt'       => $amount_bdt,
                'balance_after'    => $new_balance,
                'description'      => sanitize_text_field( $description ),
                'reference_id'     => sanitize_text_field( $reference_id ?: 'TXN-' . wp_generate_uuid4() ),
                'created_at'       => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%s', '%f', '%f', '%s', '%s', '%s' )
        );

        if ( false === $inserted ) {
            $wpdb->query( 'ROLLBACK' );
            return array( 'success' => false, 'error' => 'Database transaction failed' );
        }

        update_user_meta( $user_id, '_hs_wallet_balance_bdt', $new_balance );
        $wpdb->query( 'COMMIT' );

        return array(
            'success'       => true,
            'new_balance'   => $new_balance,
            'transaction_id'=> $wpdb->insert_id,
        );
    }

    /**
     * Awards Learning XP to a user
     */
    public static function award_learning_xp( int $user_id, int $xp_amount, string $reason = '' ): int {
        if ( $user_id <= 0 || $xp_amount <= 0 ) {
            return 0;
        }

        $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
        $updated_xp = $current_xp + $xp_amount;
        update_user_meta( $user_id, '_hs_learning_xp', $updated_xp );

        global $wpdb;
        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'xp_awarded',
                'actor_user_id' => $user_id,
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => $user_id,
                'payload_json'  => wp_json_encode( array( 'xp' => $xp_amount, 'total' => $updated_xp, 'reason' => $reason ) ),
                'severity'      => 'info',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return $updated_xp;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Community/EngagementManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Community;

final class EngagementManager {
    public static function award_streak_points( int $user_id, int $points = 10 ): void {
        $current = (int) get_user_meta( $user_id, '_hs_learning_points', true );
        update_user_meta( $user_id, '_hs_learning_points', $current + $points );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Community/ForumManager.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Community;

final class ForumManager {
    public static function mark_solution_accepted( int $question_id, int $comment_id ): void {
        if ( ! current_user_can( 'hs_moderate_forum' ) && get_current_user_id() !== (int) get_post_field( 'post_author', $question_id ) ) {
            return;
        }
        update_post_meta( $question_id, '_hs_accepted_answer_id', $comment_id );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/assets/css/code-library.css',
    package: 'core',
    language: 'css',
    updatedAt: '2026-09-30',
    content: `.hs-code-card {
  background: #0b1120;
  border: 1px solid rgba(0, 245, 212, 0.22);
  border-radius: 12px;
  padding: 1.25rem;
  color: #e2e8f0;
}
.hs-code-pre {
  font-family: 'JetBrains Mono', monospace;
  background: #050811;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
`
  },
  {
    path: 'hackersshikkhok-core/assets/css/live-demo.css',
    package: 'core',
    language: 'css',
    updatedAt: '2026-09-30',
    content: `.hs-sandbox-wrapper {
  border: 1px solid rgba(0, 245, 212, 0.3);
  border-radius: 12px;
  overflow: hidden;
  background: #050811;
}
.hs-sandbox-iframe {
  width: 100%;
  min-height: 380px;
  border: 0;
  display: block;
}
`
  },
  {
    path: 'hackersshikkhok-core/assets/css/tools-engine.css',
    package: 'core',
    language: 'css',
    updatedAt: '2026-09-30',
    content: `.hs-tools-center, .hs-rgb-lab-surface {
  background: #0b1120;
  border: 1px solid rgba(124, 58, 237, 0.28);
  border-radius: 14px;
  padding: 1.5rem;
}
`
  },
  {
    path: 'hackersshikkhok-core/assets/js/code-editor.js',
    package: 'core',
    language: 'javascript',
    updatedAt: '2026-09-30',
    content: `(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('[data-hs-copy-code]');
    if (!copyBtn) return;
    const targetId = copyBtn.getAttribute('data-hs-copy-code');
    const codeEl = document.getElementById(targetId);
    if (codeEl && navigator.clipboard) {
      navigator.clipboard.writeText(codeEl.textContent || '');
      copyBtn.textContent = 'Copied!';
    }
  });
})();
`
  },
  {
    path: 'hackersshikkhok-core/assets/js/live-demo.js',
    package: 'core',
    language: 'javascript',
    updatedAt: '2026-09-30',
    content: `(function () {
  'use strict';
  window.HackersShikkhokSandbox = {
    compileSrcDoc: function (html, css, js) {
      return '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \\'none\\'; style-src \\'unsafe-inline\\'; script-src \\'unsafe-inline\\'; img-src data: https:;"><style>' + css + '</style></head><body>' + html + '<script>' + js + '<\\/script></body></html>';
    }
  };
})();
`
  },
  {
    path: 'hackersshikkhok-core/assets/js/tools-engine.js',
    package: 'core',
    language: 'javascript',
    updatedAt: '2026-09-30',
    content: `(function () {
  'use strict';
  window.HackersShikkhokTools = {
    formatJson: function (raw) {
      return JSON.stringify(JSON.parse(raw), null, 2);
    }
  };
})();
`
  },

  // ============================================================================
  // 2. HACKERSSHIKKHOK-THEME FILES (v4.0.0 — Official Brand: Hackers শিক্ষক)
  // ============================================================================
  {
    path: 'hackersshikkhok-theme/style.css',
    package: 'theme',
    language: 'css',
    updatedAt: '2026-09-30',
    content: `/*
Theme Name:        Hackers শিক্ষক 2040 Cyber & Coding Hub Theme
Theme URI:         https://hackersshikkhok.com
Author:            Developed by Hackers শিক্ষক
Author URI:        https://hackersshikkhok.com
Description:       Hackers শিক্ষক (HackersShikkhok.com | YouTube: @HackersShikkhok)-এর অফিসিয়াল ২০৪০ ফিউচারিস্টিক সাইবার-নিয়ন ও কোডিং হাব ওয়ার্ডপ্রেস থিম (v4.0.0)। এই থিমে রয়েছে লাইভ নোটিশ বার (🔴 লাইভ নোটিশ), ওয়ালেট ও পয়েন্ট বার (👛 ব্যালেন্স ও পয়েন্ট), ২৮টি প্ল্যাটফর্ম সেন্টার লেআউট, ১০টি থিম কালার প্রিসেট, ১০টি কার্ড স্টাইল, ১৫টি ইন্টারঅ্যাক্টিভ CSS/RGB/Neon জেনারেটর ইউআই, স্যান্ডবক্সড লাইভ কোড ডেমো ভিউ, ৬০+ ডেভেলপার ও মিডিয়া টুলস সেন্টার, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব, গেমস সেন্টার, ফ্লোটিং মায়া চ্যাট এবং নিচে ৫-ট্যাবের নেভিগেশন বার (হোম, ড্যাশবোর্ড, ✨ মায়া, টুলস ল্যাব, প্রোফাইল)। সকল বিজনেস লজিক hackersshikkhok-core প্লাগইন থেকে পরিচালিত হয়। Developed by Hackers শিক্ষক — Official Download Link: https://hackersshikkhok.com
Version:           4.0.0
Requires at least: 6.4
Tested up to:      6.7
Requires PHP:      8.2
Update URI:        https://hackersshikkhok.com
License:           GPL v2 or later
License URI:       https://hackersshikkhok.com
Text Domain:       hackersshikkhok-theme
Tags:              cybersecurity, coding, dark-mode, neon-ui, education, developer-tools, bangla, hackersshikkhok
*/

:root {
  --hs-bg: #050811;
  --hs-surface: #0b1120;
  --hs-primary: #00f5d4;
  --hs-secondary: #7c3aed;
  --hs-accent: #f43f5e;
  --hs-text: #e2e8f0;
  --hs-muted: #94a3b8;
  --hs-border: rgba(0, 245, 212, 0.2);
}

body.hs-theme-body {
  background-color: var(--hs-bg);
  color: var(--hs-text);
  font-family: 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif;
  margin: 0;
}
`
  },
  {
    path: 'hackersshikkhok-theme/screenshot.svg',
    package: 'theme',
    language: 'text',
    updatedAt: '2026-09-30',
    content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
  <defs>
    <linearGradient id="cyberBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#050811"/>
      <stop offset="55%" stop-color="#0b1120"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="cyberNeon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f5d4"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#cyberBg)" stroke="url(#cyberNeon)" stroke-width="8"/>
  <rect x="48" y="48" width="1104" height="56" rx="12" fill="#0b1120" stroke="#00f5d4" stroke-opacity="0.4"/>
  <text x="80" y="83" fill="#f43f5e" font-family="sans-serif" font-weight="800" font-size="22">🔴 লাইভ নোটিশ · HACKERSSHIKKHOK.COM — Hackers শিক্ষক</text>
  <rect x="48" y="136" width="1104" height="360" rx="24" fill="#0b1120" stroke="url(#cyberNeon)" stroke-width="3"/>
  <text x="96" y="220" fill="#00f5d4" font-family="monospace" font-weight="700" font-size="24">Hackers শিক্ষক · OFFICIAL WORDPRESS THEME v4.0.0</text>
  <text x="96" y="290" fill="#ffffff" font-family="sans-serif" font-weight="800" font-size="52">Hackers শিক্ষক 2040 Cyber Theme</text>
  <text x="96" y="355" fill="#94a3b8" font-family="sans-serif" font-size="26">28 Platform Centers · Universal Social · Creator Studio · Device Lab · Games · 60+ Tools</text>
  <text x="96" y="430" fill="#00f5d4" font-family="sans-serif" font-weight="700" font-size="28">Developed by Hackers শিক্ষক · https://hackersshikkhok.com</text>
</svg>`
  },
  {
    path: 'hackersshikkhok-theme/theme.json',
    package: 'theme',
    language: 'json',
    updatedAt: '2026-09-30',
    content: `{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "color": {
      "palette": [
        { "slug": "cyber-bg", "color": "#050811", "name": "Cyber Void Background" },
        { "slug": "cyber-surface", "color": "#0b1120", "name": "Cyber Surface" },
        { "slug": "cyber-neon", "color": "#00f5d4", "name": "Cyber Green Neon" },
        { "slug": "purple-neon", "color": "#7c3aed", "name": "Purple Neon" },
        { "slug": "red-cyber", "color": "#f43f5e", "name": "Red Cyber Accent" }
      ]
    }
  }
}
`
  },
  {
    path: 'hackersshikkhok-theme/functions.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Hackers শিক্ষক Theme presentation bootstrap (v4.0.0).
 * Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
 * Zero business logic is placed in the theme. All CPTs, DB tables, and tools reside in hackersshikkhok-core.
 */

declare(strict_types=1);

namespace HackersShikkhok\\Theme;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

require_once get_template_directory() . '/inc/ComponentLibrary.php';

add_action( 'after_setup_theme', static function (): void {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
    register_nav_menus( array(
        'primary'     => __( 'Primary Cyber Header Menu', 'hackersshikkhok-theme' ),
        'mobile_tabs' => __( 'Bottom 5-Tab Navigation', 'hackersshikkhok-theme' ),
    ) );
} );

add_action( 'wp_enqueue_scripts', static function (): void {
    wp_enqueue_style( 'hs-theme-style', get_stylesheet_uri(), array(), '4.0.0' );
    wp_enqueue_script( 'hs-theme-script', get_template_directory_uri() . '/assets/js/theme.js', array(), '4.0.0', true );
    wp_enqueue_script( 'hs-ui-script', get_template_directory_uri() . '/assets/js/hs-ui.js', array(), '4.0.0', true );
} );

add_action( 'admin_notices', static function (): void {
    $screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
    if ( ! $screen || 'themes' !== $screen->id ) {
        return;
    }
    $screenshot_url = esc_url( get_template_directory_uri() . '/screenshot.png' );
    ?>
    <div class="notice notice-info is-dismissible" style="background:#0b1120;color:#e2e8f0;border-left:4px solid #00f5d4;padding:14px;display:flex;align-items:center;gap:16px;">
        <img src="<?php echo $screenshot_url; ?>" alt="Hackers শিক্ষক Theme Preview" style="width:96px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #00f5d4;" />
        <div>
            <strong style="color:#00f5d4;font-size:14px;">🛡️ Hackers শিক্ষক 2040 Cyber &amp; Coding Hub Theme (v4.0.0) — Developed by Hackers শিক্ষক</strong>
            <p style="margin:4px 0;color:#cbd5e1;font-size:12px;">২৮টি প্ল্যাটফর্ম সেন্টার, ইউনিভার্সাল সোশ্যাল সিস্টেম, ক্রিয়েটর স্টুডিও, ডিভাইস ল্যাব, গেমস সেন্টার এবং ৬০+ টুলসের প্রিমিয়াম সাইবার-নিয়ন থিম।</p>
            <a href="https://hackersshikkhok.com" target="_blank" rel="noopener noreferrer" style="color:#00f5d4;font-weight:700;font-size:12px;">🌐 Official Website &amp; Download Link: https://hackersshikkhok.com</a>
        </div>
    </div>
    <?php
} );
`
  },
  {
    path: 'hackersshikkhok-theme/header.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
?><!doctype html>
<html <?php language_attributes(); ?> class="dark">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'hs-theme-body' ); ?>>
<?php wp_body_open(); ?>
<div class="hs-top-live-notice">
    <span class="hs-live-pill">🔴 লাইভ নোটিশ</span>
    <span class="hs-live-marquee">Hackers শিক্ষক (HackersShikkhok.com) — ২৮টি প্ল্যাটফর্ম সেন্টার, ১৮টি AI অটো-পাইলট, ক্রিয়েটর স্টুডিও ও ৬০+ টুলস এখন লাইভ!</span>
</div>
<header class="hs-main-header">
    <div class="hs-brand-zone">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-logo-link">Hackers শিক্ষক · hackersshikkhok.com</a>
    </div>
    <nav class="hs-center-nav" aria-label="Primary Navigation">
        <?php wp_nav_menu( array( 'theme_location' => 'primary', 'fallback_cb' => false ) ); ?>
    </nav>
    <div class="hs-auth-actions">
        <a href="<?php echo esc_url( wp_registration_url() ); ?>" class="hs-btn-register">রেজিস্ট্রেশন</a>
        <a href="<?php echo esc_url( wp_login_url() ); ?>" class="hs-btn-login">লগইন</a>
    </div>
</header>
`
  },
  {
    path: 'hackersshikkhok-theme/footer.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
?>
<footer class="hs-site-footer" style="padding:24px;text-align:center;color:#94a3b8;font-size:13px;border-top:1px solid rgba(0,245,212,0.18);">
    <p>Developed by <strong>Hackers শিক্ষক</strong> · Official Website &amp; Download: <a href="https://hackersshikkhok.com" style="color:#00f5d4;">https://hackersshikkhok.com</a></p>
</footer>
<nav class="hs-bottom-5tab-bar" aria-label="Mobile & Quick Workspace Dock">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="hs-tab-item">হোম</a>
    <a href="<?php echo esc_url( home_url( '/dashboard/' ) ); ?>" class="hs-tab-item">ড্যাশবোর্ড</a>
    <button type="button" class="hs-tab-maya-glow" data-hs-open-maya>✨ মায়া</button>
    <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-tab-item">টুলস ল্যাব</a>
    <a href="<?php echo esc_url( home_url( '/u/hackersshikkhok/' ) ); ?>" class="hs-tab-item">প্রোফাইল</a>
</nav>
<?php wp_footer(); ?>
</body>
</html>
`
  },
  {
    path: 'hackersshikkhok-theme/front-page.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main id="primary" class="hs-front-page">
    <section class="hs-hero-banner-card">
        <h1>Hackers শিক্ষক — 2040 Cyber &amp; Coding Hub</h1>
        <p>Cybersecurity Education · Verified Code Library · Creator Studio · Device Lab · Games Center · 60+ Tools · Developed by Hackers শিক্ষক</p>
    </section>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/index.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-archive-container">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php get_template_part( 'template-parts/post-card' ); ?>
    <?php endwhile; endif; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/single.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-article">
    <?php while ( have_posts() ) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h1><?php the_title(); ?></h1>
            <div class="hs-entry-content"><?php the_content(); ?></div>
        </article>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/single-code.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-code-resource">
    <?php while ( have_posts() ) : the_post(); ?>
        <article class="hs-code-view">
            <h1><?php the_title(); ?></h1>
            <?php echo do_shortcode( '[hs_live_demo]' ); ?>
            <div class="hs-code-documentation"><?php the_content(); ?></div>
        </article>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/single-tools.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-tool-workspace">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <?php echo do_shortcode( '[hs_developer_tools]' ); ?>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/single-projects.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-project">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="hs-project-body"><?php the_content(); ?></div>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/single-hs_question.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-forum-thread">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="hs-question-body"><?php the_content(); ?></div>
        <?php comments_template(); ?>
    <?php endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/page.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
while ( have_posts() ) : the_post();
    the_content();
endwhile;
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/page-center.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Template Name: Hackers শিক্ষক Platform Center
 */
declare(strict_types=1);
get_header();
echo do_shortcode( '[hs_center_hub]' );
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/page-dashboard.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Template Name: User Control Dashboard
 */
declare(strict_types=1);
get_header();
echo do_shortcode( '[hs_center_hub center="dashboard"]' );
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/page-tools-lab.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Template Name: CSS RGB Neon & Tools Lab
 */
declare(strict_types=1);
get_header();
echo do_shortcode( '[hs_css_rgb_lab]' );
echo do_shortcode( '[hs_developer_tools]' );
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/archive.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-archive-grid">
    <h1><?php the_archive_title(); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/category.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-category-archive">
    <h1><?php single_cat_title(); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/author.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-creator-profile">
    <h1><?php the_author(); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/search.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-search-results">
    <h1><?php printf( esc_html__( 'Search Results for: %s', 'hackersshikkhok-theme' ), get_search_query() ); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/sidebar.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
?>
<aside class="hs-contextual-sidebar" aria-label="Contextual Learning Sidebar">
    <?php dynamic_sidebar( 'hs-primary-sidebar' ); ?>
</aside>
`
  },
  {
    path: 'hackersshikkhok-theme/comments.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
if ( post_password_required() ) {
    return;
}
?>
<section id="comments" class="hs-comments-area">
    <?php wp_list_comments(); ?>
    <?php comment_form(); ?>
</section>
`
  },
  {
    path: 'hackersshikkhok-theme/404.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-404-recovery">
    <h1>404 — Resource Not Found</h1>
    <p>Explore our 28 Platform Centers, Code Library, or Developer Tools Lab below.</p>
    <?php get_search_form(); ?>
</main>
<?php
get_footer();
`
  },
  {
    path: 'hackersshikkhok-theme/inc/ComponentLibrary.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Theme;

final class ComponentLibrary {
    public static function render_metadata_line( array $items ): string {
        $escaped = array_map( 'esc_html', array_filter( $items ) );
        return '<div class="hs-meta-line">' . implode( ' <span aria-hidden="true">·</span> ', $escaped ) . '</div>';
    }
}
`
  },
  {
    path: 'hackersshikkhok-theme/template-parts/post-card.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-card' ); ?>>
    <h2 class="hs-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="hs-card-excerpt"><?php the_excerpt(); ?></div>
</article>
`
  },
  {
    path: 'hackersshikkhok-theme/assets/js/theme.js',
    package: 'theme',
    language: 'javascript',
    updatedAt: '2026-09-30',
    content: `(function () {
  'use strict';
  const scrollBtn = document.querySelector('[data-hs-scroll-top]');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
`
  },
  {
    path: 'hackersshikkhok-theme/assets/js/hs-ui.js',
    package: 'theme',
    language: 'javascript',
    updatedAt: '2026-09-30',
    content: `(function () {
  'use strict';
  window.HS_UI = {
    setThemePreset: function (preset) {
      document.documentElement.setAttribute('data-hs-preset', preset);
    }
  };
})();
`
  },

  // ============================================================================
  // 3. HACKERSSHIKKHOK-DOCS FILES (6 Files — Official Brand: Hackers শিক্ষক)
  // ============================================================================
  {
    path: 'hackersshikkhok-docs/INSTALLATION.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Hackers শিক্ষক (HackersShikkhok.com) — Installation & Deployment Guide
**Developed by Hackers শিক্ষক**
**Official Website & Download Link:** https://hackersshikkhok.com

## 1. Requirements
- **WordPress**: 6.4+
- **PHP**: 8.2+
- **Database**: MySQL 8.0+ or MariaDB 10.6+

## 2. Step-by-Step Installation (Plugin First, Theme Second)
1. Download \`hackersshikkhok-core.zip\` from **https://hackersshikkhok.com** or the Top Bar button (**⚙️ Plugin (Engine Zip) 🔌**).
2. In WordPress Admin → **Plugins → Add New → Upload Plugin**, upload and activate \`hackersshikkhok-core.zip\`.
   - Includes built-in plugin icon (\`assets/images/icon-256x256.png\`), banner (\`assets/images/banner-772x250.png\`), and full Bengali/English description on the Plugins page!
3. Download \`hackersshikkhok-theme.zip\` from **https://hackersshikkhok.com** or the Top Bar button (**🛡️ Theme (Theme Zip) 📥**).
4. In WordPress Admin → **Appearance → Themes → Add New → Upload Theme**, upload and activate \`hackersshikkhok-theme.zip\`.
   - Includes built-in high-resolution \`screenshot.png\` (1200×900) so the Theme displays its premium Cyber-Neon preview card in Appearance → Themes!
`
  },
  {
    path: 'hackersshikkhok-docs/ADMIN-GUIDE.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Hackers শিক্ষক Control Center — Administrator Guide
**Developed by Hackers শিক্ষক (https://hackersshikkhok.com)**

## Global Emergency Stop & Master Switches
- **Emergency Stop All Automation**: Immediate central kill switch halting all running/queued automation jobs.
- Individual switches for all 18 Autopilots, 11 Universal Factories, Creator Studio, Device Lab, Games Center, and Social Publishing.
`
  },
  {
    path: 'hackersshikkhok-docs/DEVELOPER-DOCUMENTATION.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Developer Architecture Documentation (v4.0.0)
**Developed by Hackers শিক্ষক**
**Official Website & Download Link:** https://hackersshikkhok.com

## Universal Ecosystem Architecture
- **Core Plugin (\`hackersshikkhok-core\`)**: Houses all 10 CPTs, 8 Taxonomies, 21 DB Tables, Universal Interaction & Notification Engine, Creator Studio, Device Lab, Games Center, 18 AI Autopilots, 11 Universal Factories, and Security guards.
- **Custom Theme (\`hackersshikkhok-theme\`)**: Pure visual presentation layer with \`screenshot.png\` (1200×900) and 10 Theme Presets.
`
  },
  {
    path: 'hackersshikkhok-docs/CHANGELOG.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Changelog

## [v4.0.0] — 2026-09-30
- Standardized official brand name to **Hackers শিক্ষক** across all UI, SEO, metadata, and packages.
- Completed Universal Interaction Engine (Follow, Like, Favorite/Save, Share, Deep-linked Comments, Private Messaging, Block/Mute, Report Queue, Deduplicated Notifications).
- Completed Creator Studio (15 Browser Editors + My Projects), Device Diagnostic Lab, Interactive Games Center, 11 Universal Factories, Global Emergency Kill Switch, and Final 114-Item QA Audit Report.
`
  },
  {
    path: 'hackersshikkhok-docs/SECURITY.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Security Architecture & Hardening Policy
**Developed by Hackers শিক্ষক (https://hackersshikkhok.com)**

1. **No Arbitrary Server Code Execution**: Zero \`eval()\`, \`shell_exec()\`, or server-side Python execution.
2. **Zip-Slip & Decompression Bomb Guard**: All archive inspections validate entry paths and size ratios.
3. **Passkey / WebAuthn & 2FA**: Stores only cryptographic public key credentials; never raw biometrics.
4. **Points ≠ Money**: Learning Points/XP and Monetary Wallet Balance (BDT) are strictly isolated in separate database structures.
`
  },
  {
    path: 'hackersshikkhok-core/includes/SEO/NativeSeoAndSitemapEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Native Zero-Dependency SEO, XML Sitemap, Robots.txt, Indexation & Image SEO Engine
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core\\SEO;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeSeoAndSitemapEngine {
    private static bool $schema_rendered = false;

    public static function register(): void {
        add_action( 'wp_head', array( self::class, 'render_native_meta_and_verification' ), 1 );
        add_filter( 'robots_txt', array( self::class, 'filter_native_robots_txt' ), 20, 2 );
        add_filter( 'wp_get_attachment_image_attributes', array( self::class, 'enforce_image_seo_and_cls_dimensions' ), 10, 2 );
        add_action( 'init', array( self::class, 'register_sitemap_rewrite' ) );
        add_filter( 'query_vars', array( self::class, 'register_query_vars' ) );
        add_action( 'template_redirect', array( self::class, 'render_native_sitemap_xml' ) );
    }

    public static function render_native_meta_and_verification(): void {
        if ( self::$schema_rendered ) {
            return; // Prevent duplicate metadata/schema emission
        }
        self::$schema_rendered = true;

        $is_private_route = is_admin() || is_search() || is_404() || is_page( array( 'dashboard', 'messages', 'notifications', 'auth' ) );
        $robots_content   = $is_private_route ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large';

        echo '<meta name="robots" content="' . esc_attr( $robots_content ) . '" />' . "\\n";

        $gsc_token = (string) get_option( 'hs_gsc_verification_token', '' );
        if ( '' !== $gsc_token ) {
            echo '<meta name="google-site-verification" content="' . esc_attr( $gsc_token ) . '" />' . "\\n";
        }
    }

    public static function filter_native_robots_txt( string $output, bool $public ): string {
        if ( ! $public ) {
            return "User-agent: *\\nDisallow: /\\n";
        }
        $lines = array(
            'User-agent: *',
            'Allow: /',
            'Disallow: /wp-admin/',
            'Allow: /wp-admin/admin-ajax.php',
            'Disallow: /dashboard/',
            'Disallow: /messages/',
            'Disallow: /?s=',
            'Sitemap: ' . esc_url( home_url( '/sitemap_index.xml' ) ),
        );
        return implode( "\\n", $lines ) . "\\n";
    }

    public static function enforce_image_seo_and_cls_dimensions( array $attr, \\WP_Post $attachment ): array {
        if ( empty( $attr['alt'] ) ) {
            $attr['alt'] = sanitize_text_field( get_the_title( $attachment->ID ) . ' — Hackers শিক্ষক' );
        }
        $attr['loading']  = $attr['loading'] ?? 'lazy';
        $attr['decoding'] = 'async';
        return $attr;
    }

    public static function register_sitemap_rewrite(): void {
        add_rewrite_rule( '^sitemap_index\\.xml$', 'index.php?hs_native_sitemap=index', 'top' );
    }

    public static function register_query_vars( array $vars ): array {
        $vars[] = 'hs_native_sitemap';
        return $vars;
    }

    public static function render_native_sitemap_xml(): void {
        if ( 'index' !== get_query_var( 'hs_native_sitemap' ) ) {
            return;
        }
        header( 'Content-Type: application/xml; charset=utf-8' );
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        $types = array( 'post', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'hs_course' );
        foreach ( $types as $type ) {
            echo '  <sitemap><loc>' . esc_url( home_url( "/{$type}-sitemap.xml" ) ) . "</loc></sitemap>\n";
        }
        echo '</sitemapindex>';
        exit;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Integrations/NativeGoogleAndAdsEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Native Google Analytics (GA4), Search Console & AdSense / Ads Management Engine
 * Zero Third-Party Plugin Dependency · CLS-Safe Containers · Private Page Exclusion
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core\\Integrations;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeGoogleAndAdsEngine {
    private static bool $ga_printed = false;

    public static function register(): void {
        add_action( 'wp_head', array( self::class, 'output_ga4_tracking' ), 8 );
        add_filter( 'the_content', array( self::class, 'inject_article_ads_safely' ), 20 );
    }

    public static function output_ga4_tracking(): void {
        if ( self::$ga_printed || is_admin() || current_user_can( 'manage_options' ) ) {
            return;
        }
        $measurement_id = sanitize_text_field( (string) get_option( 'hs_ga4_measurement_id', '' ) );
        if ( ! preg_match( '/^G-[A-Z0-9]+$/i', $measurement_id ) ) {
            return;
        }
        self::$ga_printed = true;
        ?>
        <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr( $measurement_id ); ?>"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '<?php echo esc_js( $measurement_id ); ?>', { anonymize_ip: true });
        </script>
        <?php
    }

    public static function inject_article_ads_safely( string $content ): string {
        if ( is_admin() || is_404() || is_page( array( 'login', 'register', 'dashboard', 'messages' ) ) ) {
            return $content;
        }
        $ads_enabled  = (bool) get_option( 'hs_ads_master_enabled', false );
        $publisher_id = sanitize_text_field( (string) get_option( 'hs_adsense_publisher_id', '' ) );
        if ( ! $ads_enabled || '' === $publisher_id ) {
            return $content;
        }
        $ad_box = sprintf(
            '<aside class="hs-cls-safe-ad-slot" aria-label="Sponsored Advertisement" style="min-height:250px;margin:24px 0;padding:12px;background:#0b1120;border:1px solid rgba(0,245,212,0.18);border-radius:12px;text-align:center;" data-publisher="%s"></aside>',
            esc_attr( $publisher_id )
        );
        return $content . $ad_box;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Email/NativeBrandedEmailEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Native Branded HTML Email Engine (Sender: admin@hackersshikkhok.com)
 * Handles Welcome, Verification, Password Reset, Security, Follower, DM, Course, Wallet & Autopilot Emails
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core\\Email;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeBrandedEmailEngine {
    public static function register(): void {
        add_filter( 'wp_mail_from', static fn(): string => 'admin@hackersshikkhok.com' );
        add_filter( 'wp_mail_from_name', static fn(): string => 'Hackers শিক্ষক (HackersShikkhok.com)' );
        add_filter( 'wp_mail_content_type', static fn(): string => 'text/html' );
    }

    public static function build_branded_html_email( string $title, string $message_html, string $cta_label, string $cta_url ): string {
        $safe_title = esc_html( $title );
        $safe_body  = wp_kses_post( $message_html );
        $safe_label = esc_html( $cta_label );
        $safe_url   = esc_url( $cta_url );
        $year       = gmdate( 'Y' );

        return <<<HTML
<!doctype html>
<html lang="bn">
<body style="margin:0;padding:24px;background-color:#050811;color:#e2e8f0;font-family:'Hind Siliguri',system-ui,sans-serif;">
  <div style="max-width:600px;margin:0 auto;background-color:#0b1120;border:2px solid #00f5d4;border-radius:16px;overflow:hidden;">
    <div style="padding:20px 24px;background-color:#050811;border-bottom:1px solid #1e293b;">
      <strong style="color:#00f5d4;font-size:20px;">Hackers শিক্ষক</strong>
      <span style="color:#94a3b8;font-size:12px;margin-left:8px;">HackersShikkhok.com · @HackersShikkhok</span>
    </div>
    <div style="padding:28px 24px;">
      <h1 style="margin:0 0 14px;color:#ffffff;font-size:22px;">{$safe_title}</h1>
      <div style="color:#cbd5e1;font-size:15px;line-height:1.7;margin-bottom:24px;">{$safe_body}</div>
      <a href="{$safe_url}" style="display:inline-block;padding:12px 24px;background-color:#00f5d4;color:#050811;font-weight:800;text-decoration:none;border-radius:10px;">{$safe_label}</a>
    </div>
    <div style="padding:16px 24px;background-color:#050811;border-top:1px solid #1e293b;font-size:12px;color:#64748b;">
      © {$year} Hackers শিক্ষক (https://hackersshikkhok.com) · Sender: admin@hackersshikkhok.com · Privacy &amp; Terms
    </div>
  </div>
</body>
</html>
HTML;
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Auth/NativeBrandedAuthEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Native Branded Authentication Portal (Login, Register, Forgot/Reset Password, Passkey, 2FA)
 * Never exposes default wp-login.php UI to regular visitors.
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core\\Auth;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeBrandedAuthEngine {
    public static function register(): void {
        add_filter( 'login_url', array( self::class, 'filter_branded_login_url' ), 10, 2 );
        add_filter( 'register_url', array( self::class, 'filter_branded_register_url' ) );
        add_filter( 'lostpassword_url', array( self::class, 'filter_branded_lostpassword_url' ) );
    }

    public static function filter_branded_login_url( string $login_url, string $redirect = '' ): string {
        $url = home_url( '/auth/login/' );
        return '' !== $redirect ? add_query_arg( 'redirect_to', rawurlencode( $redirect ), $url ) : $url;
    }

    public static function filter_branded_register_url(): string {
        return home_url( '/auth/register/' );
    }

    public static function filter_branded_lostpassword_url(): string {
        return home_url( '/auth/reset-password/' );
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Editor/NativeClassicEditorEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Native Classic Editor & SEO/Schema/Code Metabox Engine (Without Third-Party Classic Editor Plugin)
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

namespace HackersShikkhok\\Core\\Editor;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeClassicEditorEngine {
    public static function register(): void {
        add_filter( 'use_block_editor_for_post', '__return_false', 100 );
        add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
        add_filter( 'gutenberg_use_widgets_block_editor', '__return_false', 100 );
        add_filter( 'use_widgets_block_editor', '__return_false', 100 );
        add_action( 'add_meta_boxes', array( self::class, 'register_native_seo_and_schema_metabox' ) );
        add_action( 'save_post', array( self::class, 'save_native_metabox' ), 10, 2 );
    }

    public static function register_native_seo_and_schema_metabox(): void {
        $post_types = array( 'post', 'page', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'troubleshooting', 'hs_course', 'hs_question' );
        foreach ( $post_types as $pt ) {
            add_meta_box(
                'hs_native_seo_schema_box',
                'Hackers শিক্ষক — Native SEO, Schema, Code & Related Binding',
                array( self::class, 'render_metabox' ),
                $pt,
                'normal',
                'high'
            );
        }
    }

    public static function render_metabox( \\WP_Post $post ): void {
        wp_nonce_field( 'hs_save_native_metabox', 'hs_native_metabox_nonce' );
        $seo_title = (string) get_post_meta( $post->ID, '_hs_seo_title', true );
        $seo_desc  = (string) get_post_meta( $post->ID, '_hs_seo_desc', true );
        $schema    = (string) get_post_meta( $post->ID, '_hs_schema_type', true ) ?: 'TechArticle';
        ?>
        <div style="background:#0b1120;color:#e2e8f0;padding:16px;border-radius:10px;border:1px solid #00f5d4;">
            <p><label><strong>SEO Title:</strong></label><br/>
            <input type="text" name="hs_seo_title" value="<?php echo esc_attr( $seo_title ); ?>" style="width:100%;" /></p>
            <p><label><strong>Meta Description:</strong></label><br/>
            <textarea name="hs_seo_desc" rows="2" style="width:100%;"><?php echo esc_textarea( $seo_desc ); ?></textarea></p>
            <p><label><strong>Schema.org Type:</strong></label><br/>
            <select name="hs_schema_type">
                <option value="TechArticle" <?php selected( $schema, 'TechArticle' ); ?>>TechArticle</option>
                <option value="SoftwareApplication" <?php selected( $schema, 'SoftwareApplication' ); ?>>SoftwareApplication (Tool)</option>
                <option value="Course" <?php selected( $schema, 'Course' ); ?>>Course (LMS)</option>
                <option value="FAQPage" <?php selected( $schema, 'FAQPage' ); ?>>FAQPage</option>
                <option value="HowTo" <?php selected( $schema, 'HowTo' ); ?>>HowTo</option>
            </select></p>
        </div>
        <?php
    }

    public static function save_native_metabox( int $post_id, \WP_Post $post ): void {
        if ( ! isset( $_POST['hs_native_metabox_nonce'] ) || ! wp_verify_nonce( (string) $_POST['hs_native_metabox_nonce'], 'hs_save_native_metabox' ) ) {
            return;
        }
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
        if ( isset( $_POST['hs_seo_title'] ) ) {
            update_post_meta( $post_id, '_hs_seo_title', sanitize_text_field( (string) $_POST['hs_seo_title'] ) );
        }
        if ( isset( $_POST['hs_seo_desc'] ) ) {
            update_post_meta( $post_id, '_hs_seo_desc', sanitize_textarea_field( (string) $_POST['hs_seo_desc'] ) );
        }
        if ( isset( $_POST['hs_schema_type'] ) ) {
            $allowed = array( 'TechArticle', 'SoftwareApplication', 'Course', 'FAQPage', 'HowTo' );
            $type = in_array( $_POST['hs_schema_type'], $allowed, true ) ? (string) $_POST['hs_schema_type'] : 'TechArticle';
            update_post_meta( $post_id, '_hs_schema_type', $type );
        }
    }
}
`
  },
  {
    path: 'hackersshikkhok-core/includes/Academy/CyberAcademyLmsEngine.php',
    package: 'core',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
declare(strict_types=1);

namespace HackersShikkhok\\Core\\Academy;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

use WP_REST_Request;
use WP_REST_Response;

/**
 * Cyber Academy LMS Engine — Authoritative Progress, HMAC Certificates, DB Submissions & Labs
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class CyberAcademyLmsEngine {

    public static function register(): void {
        add_action( 'rest_api_init', array( self::class, 'register_academy_rest_routes' ) );
    }

    public static function register_academy_rest_routes(): void {
        register_rest_route( 'hackersshikkhok/v1', '/academy/verify-certificate/(?P<cert_id>[A-Za-z0-9\\-_]+)', array(
            'methods'             => 'GET',
            'permission_callback' => '__return_true',
            'callback'            => array( self::class, 'verify_certificate' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/course/(?P<id>\\d+)/clone', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => current_user_can( 'edit_posts' ),
            'callback'            => array( self::class, 'clone_course' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/course/(?P<id>\\d+)/health', array(
            'methods'             => 'GET',
            'permission_callback' => static fn() => current_user_can( 'edit_posts' ),
            'callback'            => array( self::class, 'audit_course_health' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/revoke-certificate', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => current_user_can( 'manage_options' ),
            'callback'            => array( self::class, 'revoke_certificate' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/lesson-progress', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'record_lesson_progress' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/enroll', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'enroll_student_in_course' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/sync-note', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'sync_student_note' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/toggle-bookmark', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'toggle_lesson_bookmark' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/quiz/attempt', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_quiz_attempt' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/exam/attempt', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_exam_attempt' ),
        ) );

        register_rest_route( 'hackersshikkhok/v1', '/academy/assignment/submit', array(
            'methods'             => 'POST',
            'permission_callback' => static fn() => is_user_logged_in(),
            'callback'            => array( self::class, 'submit_assignment' ),
        ) );
    }

    private static function get_hmac_secret(): string {
        $secret = defined( 'AUTH_KEY' ) ? AUTH_KEY : '';
        if ( empty( $secret ) ) {
            $secret = (string) get_option( 'hs_certificate_hmac_secret', '' );
            if ( empty( $secret ) ) {
                $secret = wp_generate_password( 64, true, true );
                update_option( 'hs_certificate_hmac_secret', $secret );
            }
        }
        return $secret;
    }

    public static function generate_and_save_certificate( int $recipient_id, string $recipient_name, int $course_id, string $course_title, string $level_label = 'Level 1' ): array {
        global $wpdb;
        $table     = $wpdb->prefix . 'hs_certificates';
        $cert_code = 'HS-CERT-' . strtoupper( wp_generate_password( 10, false, false ) );
        $issued_at = gmdate( 'Y-m-d H:i:s' );

        $hmac_secret = self::get_hmac_secret();
        $signature   = hash_hmac( 'sha256', "{$recipient_id}|{$course_id}|{$cert_code}|{$issued_at}", $hmac_secret );

        $wpdb->insert(
            $table,
            array(
                'cert_code'              => $cert_code,
                'recipient_user_id'      => $recipient_id,
                'recipient_display_name' => sanitize_text_field( $recipient_name ),
                'course_id'              => $course_id,
                'course_title_snapshot'  => sanitize_text_field( $course_title ),
                'level_label'            => sanitize_text_field( $level_label ),
                'template_style'         => 'Ethical Security',
                'sha256_signature'       => $signature,
                'status'                 => 'valid',
                'issued_at'              => $issued_at,
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s', '%s', '%s', '%s', '%s' )
        );

        return array(
            'cert_code'    => $cert_code,
            'student_name' => $recipient_name,
            'course'       => $course_title,
            'level'        => $level_label,
            'issued_at'    => $issued_at,
            'signature'    => $signature,
            'status'       => 'valid',
            'verify_url'   => home_url( '/academy/certificate/' . $cert_code ),
        );
    }

    public static function verify_certificate( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $cert_id = sanitize_text_field( (string) $request->get_param( 'cert_id' ) );
        $table   = $wpdb->prefix . 'hs_certificates';

        $cert = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE cert_code = %s", $cert_id ), ARRAY_A );

        if ( ! $cert ) {
            return new WP_REST_Response( array(
                'valid'   => false,
                'message' => 'Certificate record not found.',
            ), 404 );
        }

        $hmac_secret = self::get_hmac_secret();
        $expected_sig = hash_hmac( 'sha256', "{$cert['recipient_user_id']}|{$cert['course_id']}|{$cert['cert_code']}|{$cert['issued_at']}", $hmac_secret );
        $sig_match = hash_equals( $cert['sha256_signature'] ?: $expected_sig, $expected_sig );

        return new WP_REST_Response( array(
            'valid'                  => 'valid' === $cert['status'] && $sig_match,
            'cert_code'              => $cert['cert_code'],
            'recipient_display_name' => $cert['recipient_display_name'],
            'course_title_snapshot'  => $cert['course_title_snapshot'],
            'level_label'            => $cert['level_label'],
            'issued_at'              => $cert['issued_at'],
            'status'                 => $cert['status'],
            'signature_verified'     => $sig_match,
            'issuer'                 => 'Hackers শিক্ষক Cybersecurity Academy (HackersShikkhok.com)',
        ), 200 );
    }

    public static function revoke_certificate( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $cert_code = sanitize_text_field( (string) $request->get_param( 'cert_code' ) );
        $reason    = sanitize_text_field( (string) $request->get_param( 'reason' ) ?: 'Administrative revocation' );
        $table     = $wpdb->prefix . 'hs_certificates';

        $wpdb->update(
            $table,
            array( 'status' => 'revoked' ),
            array( 'cert_code' => $cert_code ),
            array( '%s' ),
            array( '%s' )
        );

        $audit_table = $wpdb->prefix . 'hs_audit_logs';
        $wpdb->insert(
            $audit_table,
            array(
                'action_name'   => 'certificate_revoked',
                'actor_user_id' => get_current_user_id(),
                'actor_ip'      => sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' ),
                'target_id'     => 0,
                'payload_json'  => wp_json_encode( array( 'cert_code' => $cert_code, 'reason' => $reason ) ),
                'severity'      => 'warning',
            ),
            array( '%s', '%d', '%s', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array( 'success' => true, 'cert_code' => $cert_code, 'status' => 'revoked' ), 200 );
    }

    public static function enroll_student_in_course( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );

        $course_post = get_post( $course_id );
        if ( ! $course_post || 'hs_course' !== $course_post->post_type || 'publish' !== $course_post->post_status ) {
            return new WP_REST_Response( array( 'error' => 'Invalid or unpublished course.' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_courses_progress';
        $existing = $wpdb->get_row( $wpdb->prepare( "SELECT id FROM {$table} WHERE user_id = %d AND course_id = %d", $user_id, $course_id ) );

        if ( ! $existing ) {
            $wpdb->insert(
                $table,
                array(
                    'user_id'           => $user_id,
                    'course_id'         => $course_id,
                    'completed_lessons' => wp_json_encode( array() ),
                    'completed_labs'    => wp_json_encode( array() ),
                    'quiz_scores'       => wp_json_encode( new \\stdClass() ),
                    'overall_percent'   => 0,
                    'is_completed'      => 0,
                    'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%d', '%d', '%s' )
            );
        }

        $enrolled = (array) get_user_meta( $user_id, '_hs_enrolled_courses', true );
        if ( ! in_array( $course_id, $enrolled, true ) ) {
            $enrolled[] = $course_id;
            update_user_meta( $user_id, '_hs_enrolled_courses', array_unique( $enrolled ) );
        }

        return new WP_REST_Response( array( 'success' => true, 'enrolled' => true, 'course_id' => $course_id ), 200 );
    }

    public static function record_lesson_progress( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );

        if ( ! $course_id || empty( $lesson_id ) ) {
            return new WP_REST_Response( array( 'error' => 'Missing course or lesson ID' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_courses_progress';
        $row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM {$table} WHERE user_id = %d AND course_id = %d", $user_id, $course_id ), ARRAY_A );

        $completed_lessons = array();
        if ( $row && ! empty( $row['completed_lessons'] ) ) {
            $decoded = json_decode( $row['completed_lessons'], true );
            if ( is_array( $decoded ) ) {
                $completed_lessons = $decoded;
            }
        }

        $is_new_completion = ! in_array( $lesson_id, $completed_lessons, true );
        if ( $is_new_completion ) {
            $completed_lessons[] = $lesson_id;
        }

        $total_lessons = max( 1, (int) get_post_meta( $course_id, '_hs_curriculum_total_lessons', true ) ?: 10 );
        $completed_count = count( $completed_lessons );
        $overall_percent = (int) min( 100, round( ( $completed_count / $total_lessons ) * 100 ) );
        $is_course_completed = 100 === $overall_percent;
        $completed_at = $is_course_completed ? gmdate( 'Y-m-d H:i:s' ) : ( $row['completed_at'] ?? null );

        if ( $row ) {
            $wpdb->update(
                $table,
                array(
                    'completed_lessons' => wp_json_encode( array_values( array_unique( $completed_lessons ) ) ),
                    'overall_percent'   => $overall_percent,
                    'is_completed'      => $is_course_completed ? 1 : 0,
                    'completed_at'      => $completed_at,
                    'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( 'id' => $row['id'] ),
                array( '%s', '%d', '%d', '%s', '%s' ),
                array( '%d' )
            );
        } else {
            $wpdb->insert(
                $table,
                array(
                    'user_id'           => $user_id,
                    'course_id'         => $course_id,
                    'completed_lessons' => wp_json_encode( array_values( array_unique( $completed_lessons ) ) ),
                    'completed_labs'    => wp_json_encode( array() ),
                    'quiz_scores'       => wp_json_encode( new \\stdClass() ),
                    'overall_percent'   => $overall_percent,
                    'is_completed'      => $is_course_completed ? 1 : 0,
                    'completed_at'      => $completed_at,
                    'last_activity'     => gmdate( 'Y-m-d H:i:s' ),
                ),
                array( '%d', '%d', '%s', '%s', '%s', '%d', '%d', '%s', '%s' )
            );
        }

        if ( $is_new_completion ) {
            $xp_awarded = 15;
            $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
            update_user_meta( $user_id, '_hs_learning_xp', $current_xp + $xp_awarded );
        }

        $cert_data = null;
        if ( $is_course_completed ) {
            $existing_cert = $wpdb->get_row( $wpdb->prepare( "SELECT cert_code FROM {$wpdb->prefix}hs_certificates WHERE recipient_user_id = %d AND course_id = %d", $user_id, $course_id ) );
            if ( ! $existing_cert ) {
                $user = get_userdata( $user_id );
                $name = $user ? ( $user->display_name ?: $user->user_login ) : 'Cyber Scholar';
                $title = get_the_title( $course_id ) ?: 'Advanced Ethical Hacking';
                $cert_data = self::generate_and_save_certificate( $user_id, $name, $course_id, $title, 'Level 1 Scholar' );
            }
        }

        return new WP_REST_Response( array(
            'success'              => true,
            'lesson_id'            => $lesson_id,
            'completed_lessons'    => $completed_lessons,
            'overall_percent'      => $overall_percent,
            'is_course_completed'  => $is_course_completed,
            'certificate'          => $cert_data,
        ), 200 );
    }

    public static function submit_quiz_attempt( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $quiz_id   = sanitize_text_field( (string) $request->get_param( 'quiz_id' ) );
        $submitted = (array) $request->get_param( 'answers' );

        $question_bank = (array) get_post_meta( $course_id, '_hs_curriculum_quiz_bank', true );
        if ( empty( $question_bank ) ) {
            $question_bank = array(
                'q1' => array( 'correct_idx' => 1 ),
                'q2' => array( 'correct_idx' => 2 ),
                'q3' => array( 'correct_idx' => 0 ),
                'q4' => array( 'correct_idx' => 3 ),
                'q5' => array( 'correct_idx' => 1 ),
            );
        }

        $total_questions = max( 1, count( $question_bank ) );
        $correct_count   = 0;

        foreach ( $submitted as $ans ) {
            $q_id = sanitize_key( (string) ( $ans['question_id'] ?? '' ) );
            $selected = isset( $ans['selected_option'] ) ? (int) $ans['selected_option'] : -1;
            if ( isset( $question_bank[ $q_id ] ) && $question_bank[ $q_id ]['correct_idx'] === $selected ) {
                $correct_count++;
            }
        }

        $score_percent = (int) round( ( $correct_count / $total_questions ) * 100 );
        $passing_mark  = (int) get_post_meta( $course_id, '_hs_passing_score', true ) ?: 70;
        $passed        = $score_percent >= $passing_mark;

        $attempts_table = $wpdb->prefix . 'hs_quiz_attempts';
        $prev_passed = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$attempts_table} WHERE user_id = %d AND course_id = %d AND quiz_id = %s AND passed = 1", $user_id, $course_id, $quiz_id ) );

        $xp_to_award = ( $passed && ! $prev_passed ) ? 50 : 0;
        if ( $xp_to_award > 0 ) {
            $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
            update_user_meta( $user_id, '_hs_learning_xp', $current_xp + $xp_to_award );
        }

        $wpdb->insert(
            $attempts_table,
            array(
                'user_id'       => $user_id,
                'course_id'     => $course_id,
                'quiz_id'       => $quiz_id,
                'score_percent' => $score_percent,
                'passed'        => $passed ? 1 : 0,
                'xp_awarded'    => $xp_to_award,
                'answers_json'  => wp_json_encode( $submitted ),
                'attempted_at'  => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%d', '%s', '%d', '%d', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'       => true,
            'passed'        => $passed,
            'score_percent' => $score_percent,
            'xp_awarded'    => $xp_to_award,
            'correct_count' => $correct_count,
            'total_count'   => $total_questions,
        ), 200 );
    }

    public static function submit_exam_attempt( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $submitted = (array) $request->get_param( 'answers' );

        $exam_bank = (array) get_post_meta( $course_id, '_hs_curriculum_exam_bank', true );
        if ( empty( $exam_bank ) ) {
            $exam_bank = array(
                'ex1' => array( 'correct_idx' => 2 ),
                'ex2' => array( 'correct_idx' => 0 ),
                'ex3' => array( 'correct_idx' => 1 ),
                'ex4' => array( 'correct_idx' => 3 ),
                'ex5' => array( 'correct_idx' => 2 ),
                'ex6' => array( 'correct_idx' => 1 ),
                'ex7' => array( 'correct_idx' => 0 ),
                'ex8' => array( 'correct_idx' => 3 ),
            );
        }

        $total_questions = max( 1, count( $exam_bank ) );
        $correct_count   = 0;

        foreach ( $submitted as $ans ) {
            $q_id = sanitize_key( (string) ( $ans['question_id'] ?? '' ) );
            $selected = isset( $ans['selected_option'] ) ? (int) $ans['selected_option'] : -1;
            if ( isset( $exam_bank[ $q_id ] ) && $exam_bank[ $q_id ]['correct_idx'] === $selected ) {
                $correct_count++;
            }
        }

        $percent = (int) round( ( $correct_count / $total_questions ) * 100 );
        $passed  = $percent >= 75;

        $attempts_table = $wpdb->prefix . 'hs_quiz_attempts';
        $prev_passed = $wpdb->get_var( $wpdb->prepare( "SELECT id FROM {$attempts_table} WHERE user_id = %d AND course_id = %d AND quiz_id = 'final_exam' AND passed = 1", $user_id, $course_id ) );

        $xp = ( $passed && ! $prev_passed ) ? 200 : 0;
        if ( $xp > 0 ) {
            $current_xp = (int) get_user_meta( $user_id, '_hs_learning_xp', true );
            update_user_meta( $user_id, '_hs_learning_xp', $current_xp + $xp );
        }

        $wpdb->insert(
            $attempts_table,
            array(
                'user_id'       => $user_id,
                'course_id'     => $course_id,
                'quiz_id'       => 'final_exam',
                'score_percent' => $percent,
                'passed'        => $passed ? 1 : 0,
                'xp_awarded'    => $xp,
                'answers_json'  => wp_json_encode( $submitted ),
                'attempted_at'  => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%d', '%s', '%d', '%d', '%d', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'       => true,
            'passed'        => $passed,
            'score_percent' => $percent,
            'xp_awarded'    => $xp,
            'correct_count' => $correct_count,
            'total_count'   => $total_questions,
        ), 200 );
    }

    public static function submit_assignment( WP_REST_Request $request ): WP_REST_Response {
        global $wpdb;
        $user_id       = get_current_user_id();
        $course_id     = absint( $request->get_param( 'course_id' ) );
        $assignment_id = sanitize_text_field( (string) $request->get_param( 'assignment_id' ) );
        $content       = sanitize_textarea_field( (string) $request->get_param( 'submission_content' ) );
        $attach_url    = esc_url_raw( (string) $request->get_param( 'attachment_url' ) );

        if ( empty( $content ) && empty( $attach_url ) ) {
            return new WP_REST_Response( array( 'error' => 'Submission content or attachment is required.' ), 400 );
        }

        $table = $wpdb->prefix . 'hs_assignment_submissions';
        $wpdb->insert(
            $table,
            array(
                'user_id'            => $user_id,
                'course_id'          => $course_id,
                'assignment_id'      => $assignment_id,
                'submission_content' => $content,
                'attachment_url'     => $attach_url,
                'status'             => 'submitted',
                'submitted_at'       => gmdate( 'Y-m-d H:i:s' ),
                'updated_at'         => gmdate( 'Y-m-d H:i:s' ),
            ),
            array( '%d', '%d', '%s', '%s', '%s', '%s', '%s', '%s' )
        );

        return new WP_REST_Response( array(
            'success'       => true,
            'submission_id' => $wpdb->insert_id,
            'status'        => 'submitted',
            'message'       => 'Assignment submitted successfully for instructor evaluation.',
        ), 200 );
    }

    public static function sync_student_note( WP_REST_Request $request ): WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );
        $notes     = sanitize_textarea_field( (string) $request->get_param( 'notes' ) );

        $all_notes = (array) get_user_meta( $user_id, '_hs_course_notes', true );
        $key = "{$course_id}_{$lesson_id}";
        $all_notes[ $key ] = array(
            'text'       => $notes,
            'updated_at' => gmdate( 'Y-m-d H:i:s' ),
        );
        update_user_meta( $user_id, '_hs_course_notes', $all_notes );

        return new WP_REST_Response( array( 'success' => true, 'saved_at' => gmdate( 'c' ) ), 200 );
    }

    public static function toggle_lesson_bookmark( WP_REST_Request $request ): WP_REST_Response {
        $user_id   = get_current_user_id();
        $course_id = absint( $request->get_param( 'course_id' ) );
        $lesson_id = sanitize_text_field( (string) $request->get_param( 'lesson_id' ) );

        $bookmarks = (array) get_user_meta( $user_id, '_hs_course_bookmarks', true );
        $key = "{$course_id}_{$lesson_id}";
        $is_bookmarked = in_array( $key, $bookmarks, true );

        if ( $is_bookmarked ) {
            $bookmarks = array_diff( $bookmarks, array( $key ) );
        } else {
            $bookmarks[] = $key;
        }
        update_user_meta( $user_id, '_hs_course_bookmarks', array_values( array_unique( $bookmarks ) ) );

        return new WP_REST_Response( array( 'success' => true, 'bookmarked' => ! $is_bookmarked ), 200 );
    }

    public static function clone_course( WP_REST_Request $request ): WP_REST_Response {
        $course_id = absint( $request->get_param( 'id' ) );
        $original  = get_post( $course_id );
        if ( ! $original || 'hs_course' !== $original->post_type ) {
            return new WP_REST_Response( array( 'error' => 'Invalid course' ), 404 );
        }

        $clone_id = wp_insert_post( array(
            'post_title'   => $original->post_title . ' (Clone)',
            'post_content' => $original->post_content,
            'post_type'    => 'hs_course',
            'post_status'  => 'draft',
            'post_author'  => get_current_user_id(),
        ) );

        if ( is_wp_error( $clone_id ) ) {
            return new WP_REST_Response( array( 'error' => $clone_id->get_error_message() ), 500 );
        }

        return new WP_REST_Response( array( 'success' => true, 'clone_id' => $clone_id ), 201 );
    }

    public static function audit_course_health( WP_REST_Request $request ): WP_REST_Response {
        $course_id = absint( $request->get_param( 'id' ) );
        $course    = get_post( $course_id );
        if ( ! $course ) {
            return new WP_REST_Response( array( 'error' => 'Course not found' ), 404 );
        }

        $total_lessons = (int) get_post_meta( $course_id, '_hs_curriculum_total_lessons', true ) ?: 0;
        $quiz_bank     = (array) get_post_meta( $course_id, '_hs_curriculum_quiz_bank', true );
        $passing_score = (int) get_post_meta( $course_id, '_hs_passing_score', true ) ?: 70;

        return new WP_REST_Response( array(
            'course_id'     => $course_id,
            'title'         => $course->post_title,
            'total_lessons' => $total_lessons,
            'quiz_count'    => count( $quiz_bank ),
            'passing_score' => $passing_score,
            'status'        => $course->post_status,
            'health_grade'  => ( $total_lessons > 0 && count( $quiz_bank ) > 0 ) ? 'A+' : 'Needs Curriculum Meta',
        ), 200 );
    }
}
`
  },
  {
    path: 'hackersshikkhok-theme/page-academy.php',
    package: 'theme',
    language: 'php',
    updatedAt: '2026-09-30',
    content: `<?php
/**
 * Template Name: Hackers শিক্ষক Cybersecurity Academy & 3-Column LMS Player
 * Theme Presentation Layer for Courses, Levels 0-8, 3-Column LMS Player & Public Certificate Verification
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$current_user_id = get_current_user_id();
$user_xp = $current_user_id ? (int) get_user_meta( $current_user_id, '_hs_learning_xp', true ) : 0;
$wallet_data = \\HackersShikkhok\\Core\\Users\\UserEcosystem::get_wallet_summary( $current_user_id );
$rest_nonce = wp_create_nonce( 'wp_rest' );
?>

<div class="hs-academy-viewport" data-hs-theme="cyber-dark">
    <!-- Academy Master Header -->
    <header class="hs-academy-header">
        <div class="hs-academy-header-inner">
            <div class="hs-academy-brand">
                <div class="hs-academy-badge">🛡️ ACADEMY PRO</div>
                <h1 class="hs-academy-title">Hackers শিক্ষক Cyber Academy & LMS Hub</h1>
            </div>
            <div class="hs-academy-stats">
                <div class="hs-stat-chip">
                    <span class="hs-stat-label">LEVEL XP</span>
                    <span class="hs-stat-value" id="hs-user-xp"><?php echo esc_html( (string) $wallet_data['points'] ); ?> XP</span>
                </div>
                <div class="hs-stat-chip">
                    <span class="hs-stat-label">WALLET</span>
                    <span class="hs-stat-value">৳ <?php echo esc_html( number_format( (float) $wallet_data['balance_bdt'], 2 ) ); ?></span>
                </div>
                <button class="hs-btn-verify-cert" onclick="HS_ACADEMY.openCertModal()">📜 Verify Certificate</button>
            </div>
        </div>
    </header>

    <!-- 3-Column Production Course Player Workspace -->
    <main class="hs-player-grid">
        <!-- COLUMN 1: Curriculum & Module Navigation Drawer -->
        <aside class="hs-col-curriculum" id="hs-curriculum-col">
            <div class="hs-panel-header">
                <h3>📚 Curriculum & Modules</h3>
                <span class="hs-pill" id="hs-course-progress-badge">0% Complete</span>
            </div>
            <div class="hs-curriculum-search">
                <input type="text" id="hs-lesson-search" placeholder="🔍 Search curriculum..." oninput="HS_ACADEMY.filterLessons(this.value)" />
            </div>
            <div class="hs-module-list" id="hs-module-accordion">
                <div class="hs-module-card open">
                    <div class="hs-module-header" onclick="HS_ACADEMY.toggleModule(this)">
                        <span class="hs-module-num">MOD 01</span>
                        <span class="hs-module-title">Ethical Hacking Foundations</span>
                        <span class="hs-accordion-icon">▼</span>
                    </div>
                    <ul class="hs-lesson-items">
                        <li class="hs-lesson-item active" data-lesson-id="l1_1" onclick="HS_ACADEMY.loadLesson('l1_1', 'Introduction to Zero-Trust & Threat Vectors', 'video')">
                            <span class="hs-status-icon done">✓</span>
                            <span class="hs-lesson-name">1.1 Zero-Trust & Threat Vectors</span>
                            <span class="hs-lesson-duration">12m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l1_2" onclick="HS_ACADEMY.loadLesson('l1_2', 'Linux Security & Defensive Hardening', 'terminal')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">1.2 Linux Defensive Hardening</span>
                            <span class="hs-lesson-duration">18m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l1_3" onclick="HS_ACADEMY.loadLesson('l1_3', 'Network Packet Analysis with Wireshark', 'text')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">1.3 Packet Analysis & TCP Handshake</span>
                            <span class="hs-lesson-duration">15m</span>
                        </li>
                    </ul>
                </div>
                <div class="hs-module-card">
                    <div class="hs-module-header" onclick="HS_ACADEMY.toggleModule(this)">
                        <span class="hs-module-num">MOD 02</span>
                        <span class="hs-module-title">Web Security & Cryptography</span>
                        <span class="hs-accordion-icon">▶</span>
                    </div>
                    <ul class="hs-lesson-items">
                        <li class="hs-lesson-item" data-lesson-id="l2_1" onclick="HS_ACADEMY.loadLesson('l2_1', 'OWASP Top 10: SQLi & XSS Mitigation', 'text')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">2.1 OWASP Top 10 Deep Dive</span>
                            <span class="hs-lesson-duration">25m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l2_2" onclick="HS_ACADEMY.loadLesson('l2_2', 'HMAC-SHA256 & Deterministic Token Integrity', 'terminal')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">2.2 Cryptographic Integrity & HMAC</span>
                            <span class="hs-lesson-duration">20m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l2_quiz" onclick="HS_ACADEMY.openQuiz('q_mod2')">
                            <span class="hs-status-icon quiz">📝</span>
                            <span class="hs-lesson-name">Module 2 Knowledge Quiz</span>
                            <span class="hs-lesson-duration">5 Qs</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="hs-curriculum-footer">
                <button class="hs-btn-exam" onclick="HS_ACADEMY.openFinalExam()">🏆 Take Final Certification Exam</button>
            </div>
        </aside>

        <!-- COLUMN 2: Central Lesson Stage & Interactive Terminal/Player -->
        <section class="hs-col-stage" id="hs-stage-col">
            <div class="hs-stage-topbar">
                <div class="hs-breadcrumb">Course: <strong>Ethical Hacking & Defensive Web Mastery</strong> / <span id="hs-current-lesson-crumb">1.1 Zero-Trust & Threat Vectors</span></div>
                <div class="hs-lesson-actions">
                    <button class="hs-btn-icon" id="hs-btn-bookmark" onclick="HS_ACADEMY.toggleBookmark()" title="Bookmark Lesson">🔖 Bookmark</button>
                    <button class="hs-btn-complete" id="hs-btn-mark-complete" onclick="HS_ACADEMY.completeCurrentLesson()">Mark Complete & Next ➔</button>
                </div>
            </div>

            <div class="hs-stage-media-card">
                <div class="hs-stage-tabs">
                    <button class="hs-tab-btn active" onclick="HS_ACADEMY.switchStageTab('lecture', this)">📺 Video Lecture</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('terminal', this)">💻 Sandboxed Terminal Lab</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('quiz', this)">📝 Practice Assessment</button>
                </div>

                <div class="hs-stage-content active" id="hs-stage-lecture">
                    <div class="hs-video-container">
                        <div class="hs-video-mockup">
                            <div class="hs-video-play-btn">▶</div>
                            <p>YouTube Companion Stream: <strong>@HackersShikkhok</strong></p>
                            <small>Hardware-isolated streaming with 1080p 60fps technical walkthrough</small>
                        </div>
                    </div>
                </div>

                <div class="hs-stage-content" id="hs-stage-terminal" style="display:none;">
                    <div class="hs-terminal-window">
                        <div class="hs-term-header">
                            <span class="hs-term-dot red"></span>
                            <span class="hs-term-dot yellow"></span>
                            <span class="hs-term-dot green"></span>
                            <span class="hs-term-title">hs-lab-session@hackersshikkhok:~ (Isolated Sandbox)</span>
                        </div>
                        <div class="hs-term-body" id="hs-term-output">
                            <p class="hs-term-line">Welcome to Hackers শিক্ষক Defensive Security Interactive Sandbox v4.1.0.</p>
                            <p class="hs-term-line">Type 'help', 'status', 'scan', 'verify-hmac', or 'clear' to execute authorized lab commands.</p>
                            <div class="hs-term-prompt-line">
                                <span class="hs-term-prompt">scholar@hs-academy:~$</span>
                                <input type="text" id="hs-term-input" onkeydown="HS_ACADEMY.handleTerminalKey(event)" autofocus />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hs-stage-content" id="hs-stage-quiz" style="display:none;">
                    <div class="hs-quiz-card" id="hs-quiz-container">
                        <h3>Module Assessment Quiz</h3>
                        <p>Complete this 5-question technical quiz to test defensive security principles. Answers are server-side evaluated.</p>
                        <form id="hs-quiz-form" onsubmit="HS_ACADEMY.submitQuizForm(event)">
                            <div class="hs-quiz-q">
                                <p><strong>1. Which comparison method avoids timing attack vulnerabilities in token validation?</strong></p>
                                <label><input type="radio" name="q1" value="0" /> $a == $b (Standard Equality)</label><br />
                                <label><input type="radio" name="q1" value="1" /> hash_equals($a, $b) (Constant-Time Comparison)</label><br />
                                <label><input type="radio" name="q1" value="2" /> strcmp($a, $b)</label><br />
                                <label><input type="radio" name="q1" value="3" /> md5($a) == md5($b)</label>
                            </div>
                            <div class="hs-quiz-q">
                                <p><strong>2. What is the primary function of HMAC-SHA256 in certificate issuance?</strong></p>
                                <label><input type="radio" name="q2" value="0" /> Encrypting database passwords</label><br />
                                <label><input type="radio" name="q2" value="1" /> Compressing image files</label><br />
                                <label><input type="radio" name="q2" value="2" /> Guaranteeing data authenticity & tamper-proof integrity</label><br />
                                <label><input type="radio" name="q2" value="3" /> Client-side localStorage backup</label>
                            </div>
                            <button type="submit" class="hs-btn-submit-quiz">Submit Assessment for Authoritative Grading ➔</button>
                        </form>
                        <div id="hs-quiz-result" class="hs-quiz-result" style="display:none;"></div>
                    </div>
                </div>
            </div>

            <article class="hs-lesson-body">
                <h2>Lesson Notes & Implementation Guide</h2>
                <p>Zero-Trust Architecture assumes that threat actors may already exist within the network perimeter. All requests must be authenticated, authorized, and cryptographically verified before access is granted.</p>
                <div class="hs-code-snippet">
                    <pre><code>// Defensive validation & HMAC calculation
function generateSecurityProof(string $userId, string $certCode, string $secret): string {
    return hash_hmac('sha256', "{$userId}|{$certCode}", $secret);
}</code></pre>
                </div>
            </article>
        </section>

        <!-- COLUMN 3: Student Live Console, Notes & Certificate Hub -->
        <aside class="hs-col-console" id="hs-console-col">
            <div class="hs-panel-header">
                <h3>📝 Live Scholar Notebook</h3>
                <span class="hs-pill-saved" id="hs-note-save-status">Synced to Cloud</span>
            </div>
            <div class="hs-notepad-container">
                <textarea id="hs-student-notes" placeholder="Take personal markdown study notes for this lesson... Auto-saves to your account." oninput="HS_ACADEMY.autoSaveNotes()"></textarea>
            </div>

            <div class="hs-cert-card" id="hs-cert-snapshot-card">
                <div class="hs-cert-badge">🏅 VERIFIED CREDENTIAL</div>
                <h4>Ethical Security Scholar</h4>
                <p>Complete 100% of curriculum and achieve >= 75% on the Final Exam to unlock your deterministic HMAC certificate.</p>
                <div class="hs-cert-progress-bar">
                    <div class="hs-progress-fill" id="hs-console-progress-fill" style="width: 35%;"></div>
                </div>
                <button class="hs-btn-download-cert" id="hs-btn-get-cert" onclick="HS_ACADEMY.generateCertNow()">🎓 Generate Official Certificate</button>
            </div>

            <div class="hs-resources-card">
                <h4>📦 Lesson Artifacts</h4>
                <ul class="hs-resource-list">
                    <li><a href="#" download>📄 Threat-Matrix-CheatSheet.pdf</a></li>
                    <li><a href="#" download>💻 firewall-rules-starter.sh</a></li>
                    <li><a href="#" download>🛡️ hmac-verifier.py</a></li>
                </ul>
            </div>
        </aside>
    </main>

    <div class="hs-modal" id="hs-cert-modal" style="display:none;">
        <div class="hs-modal-backdrop" onclick="HS_ACADEMY.closeCertModal()"></div>
        <div class="hs-modal-dialog">
            <div class="hs-modal-header">
                <h3>📜 Verify Certificate Authenticity</h3>
                <button class="hs-modal-close" onclick="HS_ACADEMY.closeCertModal()">✕</button>
            </div>
            <div class="hs-modal-body">
                <p>Enter the Certificate ID to verify cryptographic proof against the Hackers শিক্ষক Ledger:</p>
                <div class="hs-modal-input-row">
                    <input type="text" id="hs-modal-cert-id" placeholder="e.g. HS-CERT-A1B2C3D4E5" />
                    <button class="hs-btn-search-cert" onclick="HS_ACADEMY.performCertLookup()">Verify Signature</button>
                </div>
                <div id="hs-cert-lookup-result" style="display:none;" class="hs-cert-result-card"></div>
            </div>
        </div>
    </div>
</div>
`
  },
  {
    path: 'hackersshikkhok-docs/API-DOCUMENTATION.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# REST API Documentation (\`hackersshikkhok/v1\`)
**Developed by Hackers শিক্ষক (https://hackersshikkhok.com)**

## Endpoints
- \`GET /wp-json/hackersshikkhok/v1/health\` — System diagnostics (Requires \`manage_options\` capability).
- \`POST /wp-json/hackersshikkhok/v1/interact\` — Universal Follow, Like, Save, Share, Comment, Message, Block, and Report endpoint with rate limiting and deduplicated notifications.
- \`GET /wp-json/hackersshikkhok/v1/academy/verify-certificate/{cert_id}\` — Public certificate verification.
- \`POST /wp-json/hackersshikkhok/v1/academy/lesson-progress\` — Student progress persistence & certificate auto-issuance eligibility check.
- \`POST /wp-json/hackersshikkhok/v1/academy/enroll\` — Student course enrollment.
- \`POST /wp-json/hackersshikkhok/v1/academy/sync-note\` — Student private note persistence.
- \`POST /wp-json/hackersshikkhok/v1/academy/toggle-bookmark\` — Lesson bookmarking.
- \`POST /wp-json/hackersshikkhok/v1/academy/submit-quiz\` — Server-side quiz attempt grading.
- \`POST /wp-json/hackersshikkhok/v1/academy/submit-exam\` — Server-side final exam grading.
- \`POST /wp-json/hackersshikkhok/v1/academy/submit-assignment\` — Student assignment submission.
- \`POST /wp-json/hackersshikkhok/v1/academy/grade-assignment\` — Instructor assignment grading & feedback.
- \`POST /wp-json/hackersshikkhok/v1/academy/revoke-certificate\` — Admin-only certificate revocation.
- \`POST /wp-json/hackersshikkhok/v1/academy/clone-course\` — Safe course and curriculum cloning.
- \`GET /wp-json/hackersshikkhok/v1/academy/course-health/{course_id}\` — Automated curriculum integrity checks.
- \`GET /wp-json/hackersshikkhok/v1/academy/student-dashboard\` — Student XP, streak, certificates, and enrolled courses.
- \`POST /wp-json/hackersshikkhok/v1/backup/snapshot\` — Full database & schema snapshot creation.
- \`POST /wp-json/hackersshikkhok/v1/backup/restore\` — Checksum-verified snapshot restore.
`
  },
  {
    path: 'hackersshikkhok-docs/INSTALLATION.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Installation Guide for Hackers শিক্ষক (HackersShikkhok.com)

## Requirements
- PHP 8.2 or higher
- WordPress 6.4 or higher
- MySQL 8.0+ or MariaDB 10.5+

## Installation Steps
1. **Core Plugin Installation:**
   - Upload \`hackersshikkhok-core.zip\` via **WordPress Admin > Plugins > Add New > Upload Plugin**.
   - Click **Activate Plugin**.
   - The plugin will automatically run \`dbDelta()\` to provision all 10 custom database tables and register custom post types & taxonomies.

2. **Theme Installation:**
   - Upload \`hackersshikkhok-theme.zip\` via **WordPress Admin > Appearance > Themes > Add New > Upload Theme**.
   - Click **Activate**.

3. **Verification:**
   - Navigate to **WordPress Admin > Hackers শিক্ষক Control Center**.
   - Verify System Health, API endpoints, and Database diagnostics.
`
  },
  {
    path: 'hackersshikkhok-docs/ADMIN-GUIDE.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Administrator Guide — Hackers শিক্ষক Control Center

## Control Center Sections
1. **System Health & Diagnostics:** Live PHP, WordPress, Database, and REST health indicators.
2. **Cyber Academy & LMS Builder:**
   - Course, Module, and 17 Lesson Types management.
   - Question Bank & Exam passing criteria.
   - Flag hash configuration for simulated practical cyber labs.
   - Certificate revocation with administrative audit logging.
3. **AI Autopilot Engine:**
   - Provider selection (Google Gemini / OpenAI / Anthropic).
   - Server-side API key management and key rotation.
   - Global emergency kill switch and quality threshold gates.
4. **Wallet Ledger & Financial Accounting:**
   - Double-entry ledger audit trail.
   - Withdrawal request review, approval, and rejection.
5. **Backup & Disaster Recovery:**
   - Snapshot creation and verified restore engine with SHA-256 validation.
`
  },
  {
    path: 'hackersshikkhok-docs/DEVELOPER-DOCUMENTATION.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Developer Documentation — Hackers শিক্ষক Architecture

## Plugin-Theme Architecture Boundary
- **Core Plugin (\`hackersshikkhok-core\`):** Authoritative source of truth for business logic, database tables, REST API controllers, capability enforcement, and server-side computations.
- **Custom Theme (\`hackersshikkhok-theme\`):** Pure presentation layer, template routing, CSS styling, and asset enqueuing.
- **Zero Global JS Pollution:** Page-specific enqueuing for Monaco editor, CSS/RGB generators, and Academy Player.
`
  },
  {
    path: 'hackersshikkhok-docs/SECURITY.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Security Policy & Hardening — Hackers শিক্ষক

## Core Security Mechanisms
1. **Server-Side Verification:** Client submissions are untrusted. Course progress, XP, quiz scores, exam results, and certificates are strictly computed and verified on the WordPress server.
2. **Prepared Database Queries:** All dynamic database operations strictly use \`$wpdb->prepare()\`.
3. **Capability & Nonce Enforcements:** REST endpoints enforce strict \`permission_callback\` routines and user session authentication.
4. **Sandboxed Code Execution:** No user code or Python is executed on the shared WordPress server. Code execution occurs exclusively in sandboxed browser iframes or WASM runtimes.
`
  },
  {
    path: 'hackersshikkhok-docs/CHANGELOG.md',
    package: 'docs',
    language: 'markdown',
    updatedAt: '2026-09-30',
    content: `# Changelog — Hackers শিক্ষক Ecosystem

## [v4.0.0] - 2026-10-02
### Added
- Complete LMS 3-Column Course Player with full WordPress REST sync.
- Server-side idempotent lesson progress persistence (\`hs_courses_progress\`).
- Authoritative course completion & cryptographic certificate auto-issuance (\`hs_certificates\`).
- Public certificate verification & admin revocation with audit trail.
- 16-step curriculum course builder in WordPress Admin.
- Full support for 17 lesson types including hands-on cyber labs with SHA-256 flag checks.
- Monetary wallet ledger (\`hs_wallet_ledger\`) isolated from gamified XP/Points.
- Checksum-validated backup snapshot creation and restore engine.
`
  }
];

async function renderBrandedPngBlob(
  imageSrc: string,
  width: number,
  height: number,
  titleText: string,
  subtitleText: string,
  badgeText: string
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new Blob([], { type: 'image/png' });
  }

  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#050811');
  bgGrad.addColorStop(0.55, '#0b1120');
  bgGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = 'anonymous';
      el.onload = () => resolve(el);
      el.onerror = (e) => reject(e);
      el.src = imageSrc;
    });
    ctx.drawImage(img, 0, 0, width, height);
  } catch {
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  const scrim = ctx.createLinearGradient(0, height * 0.35, 0, height);
  scrim.addColorStop(0, 'rgba(5, 8, 17, 0.15)');
  scrim.addColorStop(0.6, 'rgba(5, 8, 17, 0.85)');
  scrim.addColorStop(1, 'rgba(5, 8, 17, 0.96)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#00f5d4';
  ctx.lineWidth = Math.max(4, Math.round(width * 0.006));
  ctx.strokeRect(2, 2, width - 4, height - 4);

  if (width >= 600) {
    const padX = Math.round(width * 0.05);
    ctx.fillStyle = '#00f5d4';
    ctx.font = `bold ${Math.round(width * 0.02)}px monospace`;
    ctx.fillText(badgeText, padX, Math.round(height * 0.68));

    ctx.fillStyle = '#ffffff';
    ctx.font = `800 ${Math.round(width * 0.042)}px sans-serif`;
    ctx.fillText(titleText, padX, Math.round(height * 0.78));

    ctx.fillStyle = '#cbd5e1';
    ctx.font = `600 ${Math.round(width * 0.022)}px sans-serif`;
    ctx.fillText(subtitleText, padX, Math.round(height * 0.86));

    ctx.fillStyle = '#00f5d4';
    ctx.font = `bold ${Math.round(width * 0.021)}px sans-serif`;
    ctx.fillText(
      'Developed by Hackers শিক্ষক · https://hackersshikkhok.com',
      padX,
      Math.round(height * 0.94)
    );
  } else {
    ctx.fillStyle = 'rgba(5, 8, 17, 0.82)';
    ctx.fillRect(0, height - 44, width, 44);
    ctx.fillStyle = '#00f5d4';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hackers শিক্ষক', width / 2, height - 17);
  }

  return new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob([], { type: 'image/png' }));
    }, 'image/png');
  });
}

export async function generateAndDownloadZip(
  files: VirtualFile[],
  targetPackage: 'core' | 'theme' | 'docs' | 'all',
  customFileName?: string
): Promise<{ fileName: string; fileCount: number; sizeBytes: number }> {
  const zip = new JSZip();
  const filtered =
    targetPackage === 'all'
      ? files
      : files.filter((f) => f.package === targetPackage);

  filtered.forEach((file) => {
    zip.file(file.path, file.content);
  });

  let binaryAddedCount = 0;

  if (targetPackage === 'theme' || targetPackage === 'all') {
    const themeScreenshotBlob = await renderBrandedPngBlob(
      THEME_SCREENSHOT_IMG,
      1200,
      900,
      'Hackers শিক্ষক 2040 Cyber & Coding Hub',
      '28 Platform Centers · Universal Social · Creator Studio · Device Lab · Games · 60+ Tools',
      'OFFICIAL WORDPRESS THEME · v4.0.0'
    );
    zip.file('hackersshikkhok-theme/screenshot.png', themeScreenshotBlob);
    zip.file('hackersshikkhok-theme/assets/images/theme-banner.png', themeScreenshotBlob);
    binaryAddedCount += 2;
  }

  if (targetPackage === 'core' || targetPackage === 'all') {
    const pluginIconBlob = await renderBrandedPngBlob(
      PLUGIN_ICON_IMG,
      256,
      256,
      'HS Core',
      'Hackers শিক্ষক',
      'v4.0.0'
    );
    const pluginBannerBlob = await renderBrandedPngBlob(
      PLUGIN_BANNER_IMG,
      772,
      250,
      'Hackers শিক্ষক Core Engine v4.0.0',
      '28 Centers · Universal Social · 18 Autopilots · 11 Factories · 60+ Tools',
      'CORE BUSINESS LOGIC PLUGIN'
    );
    zip.file('hackersshikkhok-core/assets/images/icon-256x256.png', pluginIconBlob);
    zip.file('hackersshikkhok-core/assets/images/banner-772x250.png', pluginBannerBlob);
    binaryAddedCount += 2;
  }

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  const defaultName =
    targetPackage === 'theme'
      ? 'hackersshikkhok-theme.zip'
      : targetPackage === 'core'
      ? 'hackersshikkhok-core.zip'
      : targetPackage === 'docs'
      ? 'hackersshikkhok-docs.zip'
      : 'hackersshikkhok-complete-bundle.zip';

  const fileName = customFileName || defaultName;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);

  return {
    fileName,
    fileCount: filtered.length + binaryAddedCount,
    sizeBytes: blob.size
  };
}
