<?php
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

namespace HackersShikkhok\Core;

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
    $prefix = 'HackersShikkhok\\Core\\';
    if ( strncmp( $prefix, $class, strlen( $prefix ) ) !== 0 ) {
        return;
    }
    $relative_class = substr( $class, strlen( $prefix ) );
    $relative_path  = str_replace( '\\', '/', $relative_class ) . '.php';

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

register_activation_hook( __FILE__, array( Core\Activator::class, 'activate' ) );
register_deactivation_hook( __FILE__, array( Core\Deactivator::class, 'deactivate' ) );

add_action( 'plugins_loaded', static function (): void {
    Core\Plugin::instance()->boot();
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
        . '<img src="' . $icon_url . '" alt="Hackers শিক্ষক Core Engine" style="width:64px;height:64px;border-radius:10px;border:1px solid #00f5d4;object-fit:cover;flex-shrink:0;" onerror="this.style.display='none'" />'
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
