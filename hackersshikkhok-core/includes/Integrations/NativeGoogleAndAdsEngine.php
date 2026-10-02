<?php
/**
 * Native Google Analytics (GA4), Search Console & AdSense / Ads Management Engine
 * Zero Third-Party Plugin Dependency · CLS-Safe Containers · Private Page Exclusion
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Integrations;

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
