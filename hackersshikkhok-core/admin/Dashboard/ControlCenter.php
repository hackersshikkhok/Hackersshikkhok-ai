<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Dashboard;

use HackersShikkhok\Core\Core\Settings;
use HackersShikkhok\Core\Core\SystemHealth;

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
