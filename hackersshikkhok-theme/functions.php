<?php
/**
 * Hackers শিক্ষক Theme presentation bootstrap (v4.0.0).
 * Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
 * Zero business logic is placed in the theme. All CPTs, DB tables, and tools reside in hackersshikkhok-core.
 */

declare(strict_types=1);

namespace HackersShikkhok\Theme;

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
    wp_enqueue_style( 'hs-cyber-lms', get_template_directory_uri() . '/assets/css/cyber-lms.css', array(), '4.0.0' );
    wp_enqueue_script( 'hs-theme-script', get_template_directory_uri() . '/assets/js/theme.js', array(), '4.0.0', true );
    wp_enqueue_script( 'hs-ui-script', get_template_directory_uri() . '/assets/js/hs-ui.js', array(), '4.0.0', true );
    wp_enqueue_script( 'hs-theming-engine', get_template_directory_uri() . '/assets/js/theming-engine.js', array(), '4.0.0', true );
    wp_enqueue_script( 'hs-terminal-engine', get_template_directory_uri() . '/assets/js/terminal-engine.js', array(), '4.0.0', true );
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
