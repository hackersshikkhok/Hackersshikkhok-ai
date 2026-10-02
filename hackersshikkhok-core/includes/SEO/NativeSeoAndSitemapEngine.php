<?php
/**
 * Native Zero-Dependency SEO, XML Sitemap, Robots.txt, Indexation & Image SEO Engine
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\SEO;

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

        echo '<meta name="robots" content="' . esc_attr( $robots_content ) . '" />' . "\n";

        $gsc_token = (string) get_option( 'hs_gsc_verification_token', '' );
        if ( '' !== $gsc_token ) {
            echo '<meta name="google-site-verification" content="' . esc_attr( $gsc_token ) . '" />' . "\n";
        }
    }

    public static function filter_native_robots_txt( string $output, bool $public ): string {
        if ( ! $public ) {
            return "User-agent: *\nDisallow: /\n";
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
        return implode( "\n", $lines ) . "\n";
    }

    public static function enforce_image_seo_and_cls_dimensions( array $attr, \WP_Post $attachment ): array {
        if ( empty( $attr['alt'] ) ) {
            $attr['alt'] = sanitize_text_field( get_the_title( $attachment->ID ) . ' — Hackers শিক্ষক' );
        }
        $attr['loading']  = $attr['loading'] ?? 'lazy';
        $attr['decoding'] = 'async';
        return $attr;
    }

    public static function register_sitemap_rewrite(): void {
        add_rewrite_rule( '^sitemap_index\.xml$', 'index.php?hs_native_sitemap=index', 'top' );
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
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "
";
        echo '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "
";
        $types = array( 'post', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'hs_course' );
        foreach ( $types as $type ) {
            echo '  <sitemap><loc>' . esc_url( home_url( "/{$type}-sitemap.xml" ) ) . "</loc></sitemap>
";
        }
        echo '</sitemapindex>';
        exit;
    }
}
