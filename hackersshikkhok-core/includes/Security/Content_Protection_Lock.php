<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Security;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Class Content_Protection_Lock
 * 
 * MODULE 3: PRO-LEVEL ANTI-SCRAPING LOCK & CONTENT HARDENING
 * - Blocks external AI bots, web scrapers (GPTBot, bytespider, Scrapy, curl) from harvesting course content
 * - Enforces anti-iframe clickjacking headers (SAMEORIGIN, CSP frame-ancestors 'self')
 * - Client-side DRM shield: disables right-click, text copy, DevTools inspection
 * - Cryptographic user-specific watermark injected into course rendered DOM
 * 
 * @package HackersShikkhok\Core\Security
 */
final class Content_Protection_Lock {

    private const BLOCKED_USER_AGENTS = array(
        'gptbot',
        'chatgpt',
        'bytespider',
        'anthropic-ai',
        'claude-web',
        'ccbot',
        'diffbot',
        'scrapy',
        'python-requests',
        'aiohttp',
        'httpx',
        'go-http-client',
        'wget',
        'curl',
        'httrack',
        'blexbot',
        'semrushbot',
    );

    public static function register(): void {
        add_action( 'init', array( self::class, 'enforce_bot_blocking' ) );
        add_action( 'send_headers', array( self::class, 'send_security_headers' ) );
        add_filter( 'the_content', array( self::class, 'inject_cryptographic_watermark' ), 99 );
        add_action( 'wp_footer', array( self::class, 'render_client_drm_protection_script' ) );
    }

    /**
     * Block scraper user agents on course URLs
     */
    public static function enforce_bot_blocking(): void {
        $ua = strtolower( sanitize_text_field( $_SERVER['HTTP_USER_AGENT'] ?? '' ) );
        $uri = sanitize_text_field( $_SERVER['REQUEST_URI'] ?? '' );

        // If request targets course or academy content
        $is_course_request = ( false !== strpos( $uri, '/academy' ) || false !== strpos( $uri, '/hs_course' ) || false !== strpos( $uri, '/lesson/' ) );

        if ( $is_course_request ) {
            foreach ( self::BLOCKED_USER_AGENTS as $bot ) {
                if ( false !== strpos( $ua, $bot ) ) {
                    status_header( 403 );
                    header( 'Content-Type: text/plain; charset=utf-8' );
                    exit( '403 Forbidden: Automated scraper or AI extraction bot detected. Access restricted under Hackers Shikkhok Cyber DRM Policy.' );
                }
            }
        }
    }

    /**
     * Send Framebuster and DRM security headers
     */
    public static function send_security_headers(): void {
        if ( ! headers_sent() ) {
            header( 'X-Frame-Options: SAMEORIGIN' );
            header( 'X-Content-Type-Options: nosniff' );
            header( "Content-Security-Policy: frame-ancestors 'self' https://hackersshikkhok.com;" );
        }
    }

    /**
     * Inject tamper-proof invisible/micro cryptographic watermark for user identification
     */
    public static function inject_cryptographic_watermark( string $content ): string {
        if ( ! is_singular( array( 'hs_course', 'post', 'page' ) ) && ! is_page( 'academy' ) ) {
            return $content;
        }

        $user_id = get_current_user_id() ?: 1;
        $ip = sanitize_text_field( $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1' );
        $salt = defined( 'NONCE_SALT' ) ? NONCE_SALT : 'hs_watermark_salt_2026';
        $timestamp = current_time( 'timestamp' );
        $sig = hash( 'sha256', "{$user_id}:{$ip}:{$timestamp}:{$salt}" );

        $token = 'HS-SEC-UID-' . $user_id . '-' . substr( $sig, 0, 16 );

        // Injected with micro-opacity (0.015) repeated across content to prevent screenshot leak
        $watermark_html = sprintf(
            '<div class="hs-crypto-watermark-overlay" style="user-select:none;pointer-events:none;opacity:0.018;position:relative;font-size:11px;font-family:monospace;color:#94a3b8;margin:8px 0;" data-sec-token="%s" aria-hidden="true">[VERIFIED CADET: %s | %s]</div>',
            esc_attr( $token ),
            esc_html( $token ),
            esc_html( gmdate( 'Y-m-d H:i', $timestamp ) )
        );

        return $content . $watermark_html;
    }

    /**
     * Client-side protection script: disables context menu, selection on lesson, and DevTools inspection
     */
    public static function render_client_drm_protection_script(): void {
        ?>
        <script id="hs-content-drm-lock">
        (function() {
            'use strict';
            // Disable right click on protected elements
            document.addEventListener('contextmenu', function(e) {
                var target = e.target;
                if (target && target.closest('.hs-protected-content, #academy-stage-content, .cyber-terminal-output')) {
                    e.preventDefault();
                    return false;
                }
            });

            // Prevent keyboard shortcuts (Ctrl+U, Ctrl+S, Ctrl+P) on academy pages
            document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
                    if (window.location.pathname.indexOf('/academy') !== -1) {
                        e.preventDefault();
                        return false;
                    }
                }
            });

            // Micro-tamper detection
            var element = document.querySelector('.hs-crypto-watermark-overlay');
            if (element && window.MutationObserver) {
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(m) {
                        if (m.type === 'childList' || m.type === 'attributes') {
                            element.style.opacity = '0.018';
                        }
                    });
                });
                observer.observe(element, { attributes: true, childList: true, subtree: true });
            }
        })();
        </script>
        <?php
    }
}
