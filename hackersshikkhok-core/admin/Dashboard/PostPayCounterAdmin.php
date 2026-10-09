<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Dashboard;

use HackersShikkhok\Core\Earnings\PostPayCounterEngine;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class PostPayCounterAdmin {
    private static bool $registered = false;

    public static function register(): void {
        if ( self::$registered ) {
            return;
        }
        self::$registered = true;

        add_action( 'admin_menu', array( __CLASS__, 'add_admin_menu' ), 20 );
        add_action( 'admin_init', array( __CLASS__, 'handle_settings_save' ) );
    }

    public static function add_admin_menu(): void {
        add_submenu_page(
            'hs-control-center',
            'PostPay Counter & Payouts',
            '💰 PPC Earnings & Payouts',
            'manage_options',
            'hs-ppc-calculator',
            array( __CLASS__, 'render_admin_page' )
        );
    }

    public static function handle_settings_save(): void {
        if ( ! isset( $_POST['hs_ppc_settings_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['hs_ppc_settings_nonce'] ), 'hs_ppc_save_settings' ) ) {
            return;
        }

        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        $settings = array(
            'enabled'          => sanitize_text_field( $_POST['enabled'] ?? 'yes' ),
            'currency'         => sanitize_text_field( $_POST['currency'] ?? 'BDT' ),
            'rate_publish'     => (float) ($_POST['rate_publish'] ?? 50.00),
            'rate_view'        => (float) ($_POST['rate_view'] ?? 0.10),
            'rate_visit'       => (float) ($_POST['rate_visit'] ?? 0.05),
            'rate_comment'     => (float) ($_POST['rate_comment'] ?? 2.00),
            'rate_share'       => (float) ($_POST['rate_share'] ?? 5.00),
            'min_payout'       => (float) ($_POST['min_payout'] ?? 500.00),
            'payout_methods'   => sanitize_text_field( $_POST['payout_methods'] ?? 'bKash, Nagad, Bank Transfer' ),
            'daily_author_cap' => (float) ($_POST['daily_author_cap'] ?? 1000.00),
            'auto_payout_mode' => sanitize_text_field( $_POST['auto_payout_mode'] ?? 'manual' ),
        );

        PostPayCounterEngine::update_settings( $settings );
        add_settings_error( 'hs_ppc_messages', 'settings_saved', 'PostPay Counter settings successfully updated!', 'updated' );
    }

    public static function render_admin_page(): void {
        global $wpdb;
        $settings = PostPayCounterEngine::get_settings();
        $p = $wpdb->prefix . 'hs_';

        $total_earnings = (float) $wpdb->get_var( "SELECT SUM(amount) FROM {$p}ppc_earnings" );
        $total_views = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$p}ppc_earnings WHERE earning_type = 'view'" );
        $total_shares = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$p}ppc_earnings WHERE earning_type = 'share'" );
        $total_comments = (int) $wpdb->get_var( "SELECT COUNT(*) FROM {$p}ppc_earnings WHERE earning_type = 'comment'" );

        $recent_earnings = $wpdb->get_results(
            "SELECT e.*, u.user_nicename FROM {$p}ppc_earnings e LEFT JOIN {$wpdb->users} u ON e.user_id = u.ID ORDER BY e.id DESC LIMIT 30",
            ARRAY_A
        );
        ?>
        <div class="wrap" style="color: #f8fafc; font-family: Inter, sans-serif;">
            <h1 style="color: #00f5d4; font-size: 26px; font-weight: 800; margin-bottom: 20px;">
                💰 Hackers শিক্ষক PostPay Counter &amp; Earning Calculator (Pro Edition)
            </h1>

            <?php settings_errors( 'hs_ppc_messages' ); ?>

            <!-- Stats Overview -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
                <div style="background: #0b1120; border: 1px solid rgba(0,245,212,0.3); border-radius: 12px; padding: 20px;">
                    <div style="color: #94a3b8; font-size: 13px; font-weight: 600;">Total Payout Liability</div>
                    <div style="color: #00f5d4; font-size: 28px; font-weight: 800; margin-top: 6px;">৳<?php echo number_format( $total_earnings, 2 ); ?></div>
                </div>
                <div style="background: #0b1120; border: 1px solid rgba(167,139,250,0.3); border-radius: 12px; padding: 20px;">
                    <div style="color: #94a3b8; font-size: 13px; font-weight: 600;">Monetized Views</div>
                    <div style="color: #a78bfa; font-size: 28px; font-weight: 800; margin-top: 6px;"><?php echo number_format( $total_views ); ?></div>
                </div>
                <div style="background: #0b1120; border: 1px solid rgba(56,189,248,0.3); border-radius: 12px; padding: 20px;">
                    <div style="color: #94a3b8; font-size: 13px; font-weight: 600;">Monetized Shares</div>
                    <div style="color: #38bdf8; font-size: 28px; font-weight: 800; margin-top: 6px;"><?php echo number_format( $total_shares ); ?></div>
                </div>
                <div style="background: #0b1120; border: 1px solid rgba(251,191,36,0.3); border-radius: 12px; padding: 20px;">
                    <div style="color: #94a3b8; font-size: 13px; font-weight: 600;">Monetized Comments</div>
                    <div style="color: #fbbf24; font-size: 28px; font-weight: 800; margin-top: 6px;"><?php echo number_format( $total_comments ); ?></div>
                </div>
            </div>

            <!-- Tabs Container -->
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
                <!-- Settings Form -->
                <div style="background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; padding: 24px;">
                    <h2 style="color: #f8fafc; font-size: 18px; margin-top: 0; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">⚙️ PPC Rate Settings</h2>
                    <form method="POST" action="">
                        <?php wp_nonce_field( 'hs_ppc_save_settings', 'hs_ppc_settings_nonce' ); ?>
                        
                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Engine Status:</label>
                            <select name="enabled" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;">
                                <option value="yes" <?php selected( $settings['enabled'], 'yes' ); ?>>Active (Earning Enabled)</option>
                                <option value="no" <?php selected( $settings['enabled'], 'no' ); ?>>Paused / Disabled</option>
                            </select>
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Currency Symbol:</label>
                            <input type="text" name="currency" value="<?php echo esc_attr( $settings['currency'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Publish Rate (Per Post/Tutorial):</label>
                            <input type="number" step="0.01" name="rate_publish" value="<?php echo esc_attr( (string)$settings['rate_publish'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">View Rate (Per Post View):</label>
                            <input type="number" step="0.01" name="rate_view" value="<?php echo esc_attr( (string)$settings['rate_view'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Visit Rate (Per Page Visit):</label>
                            <input type="number" step="0.01" name="rate_visit" value="<?php echo esc_attr( (string)$settings['rate_visit'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Comment Rate (Per Comment):</label>
                            <input type="number" step="0.01" name="rate_comment" value="<?php echo esc_attr( (string)$settings['rate_comment'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Share Rate (Per Share):</label>
                            <input type="number" step="0.01" name="rate_share" value="<?php echo esc_attr( (string)$settings['rate_share'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Minimum Payout Threshold:</label>
                            <input type="number" step="0.01" name="min_payout" value="<?php echo esc_attr( (string)$settings['min_payout'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <label style="display:block; font-weight:600; margin-bottom:4px;">Daily Author Earning Cap:</label>
                            <input type="number" step="0.01" name="daily_author_cap" value="<?php echo esc_attr( (string)$settings['daily_author_cap'] ); ?>" style="width:100%; padding:8px; background:#020617; color:#f8fafc; border:1px solid #334155; border-radius:6px;" />
                        </p>

                        <p>
                            <button type="submit" class="button button-primary" style="background:#00f5d4; color:#0b1120; font-weight:700; border:none; padding:10px 20px; border-radius:6px; cursor:pointer;">💾 Save PPC Settings</button>
                        </p>
                    </form>
                </div>

                <!-- Earnings Ledger Table -->
                <div style="background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; padding: 24px;">
                    <h2 style="color: #f8fafc; font-size: 18px; margin-top: 0; border-bottom: 1px solid #1e293b; padding-bottom: 12px;">📊 Recent Earnings Ledger</h2>
                    <table class="wp-list-table widefat fixed striped" style="background: #020617; color: #f8fafc; border: 1px solid #1e293b; border-radius: 8px;">
                        <thead>
                            <tr style="background: #0f172a; color: #00f5d4;">
                                <th style="padding:10px;">ID</th>
                                <th style="padding:10px;">User</th>
                                <th style="padding:10px;">Type</th>
                                <th style="padding:10px;">Post</th>
                                <th style="padding:10px;">Amount</th>
                                <th style="padding:10px;">Status</th>
                                <th style="padding:10px;">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ( empty( $recent_earnings ) ) : ?>
                                <tr><td colspan="7" style="padding: 15px; text-align: center; color: #94a3b8;">No earnings recorded yet.</td></tr>
                            <?php else : ?>
                                <?php foreach ( $recent_earnings as $row ) : ?>
                                    <tr style="border-bottom: 1px solid #1e293b;">
                                        <td style="padding:10px;"><?php echo (int) $row['id']; ?></td>
                                        <td style="padding:10px;"><?php echo esc_html( $row['user_nicename'] ?? 'User #' . $row['user_id'] ); ?></td>
                                        <td style="padding:10px;"><span style="background: rgba(0,245,212,0.1); color: #00f5d4; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600;"><?php echo esc_html( strtoupper( $row['earning_type'] ) ); ?></span></td>
                                        <td style="padding:10px;"><?php echo (int) $row['post_id'] > 0 ? '#' . (int) $row['post_id'] : '—'; ?></td>
                                        <td style="padding:10px; font-weight:700; color: #38bdf8;">৳<?php echo number_format( (float)$row['amount'], 2 ); ?></td>
                                        <td style="padding:10px;"><?php echo esc_html( $row['status'] ); ?></td>
                                        <td style="padding:10px; color: #94a3b8; font-size:11px;"><?php echo esc_html( $row['created_at'] ); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php
    }
}
