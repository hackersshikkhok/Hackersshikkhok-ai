<?php
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
