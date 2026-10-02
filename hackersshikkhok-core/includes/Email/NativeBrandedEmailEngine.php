<?php
/**
 * Native Branded HTML Email Engine (Sender: admin@hackersshikkhok.com)
 * Handles Welcome, Verification, Password Reset, Security, Follower, DM, Course, Wallet & Autopilot Emails
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Email;

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
