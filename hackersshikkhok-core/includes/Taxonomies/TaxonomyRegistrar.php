<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Taxonomies;

final class TaxonomyRegistrar {
    public static function register(): void {
        add_action( 'init', array( self::class, 'register_now' ) );
    }

    public static function register_now(): void {
        $taxonomies = array(
            'hs_language'        => array( 'label' => 'Programming Language', 'hierarchical' => false ),
            'hs_difficulty'      => array( 'label' => 'Difficulty', 'hierarchical' => true ),
            'hs_platform'        => array( 'label' => 'Platform', 'hierarchical' => true ),
            'hs_topic'           => array( 'label' => 'Topic', 'hierarchical' => true ),
            'hs_tool_type'       => array( 'label' => 'Tool Type', 'hierarchical' => true ),
            'hs_security_domain' => array( 'label' => 'Security Domain', 'hierarchical' => true ),
            'hs_series'          => array( 'label' => 'Learning Series', 'hierarchical' => true ),
            'hs_license'         => array( 'label' => 'Code License', 'hierarchical' => false ),
            'hs_faculty'         => array( 'label' => 'Faculty', 'hierarchical' => true ),
        );

        $object_types = array( 'tutorials', 'code', 'tools', 'projects', 'cyber', 'troubleshooting', 'hs_question', 'hs_video', 'hs_course', 'hs_resource' );

        foreach ( $taxonomies as $slug => $cfg ) {
            register_taxonomy( $slug, $object_types, array(
                'label'        => $cfg['label'],
                'public'       => true,
                'show_in_rest' => true,
                'hierarchical' => $cfg['hierarchical'],
            ) );
        }
    }
}
