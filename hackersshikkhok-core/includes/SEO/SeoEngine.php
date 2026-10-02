<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\SEO;

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
        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>
";
    }
}
