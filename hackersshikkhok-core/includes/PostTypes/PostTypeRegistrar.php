<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\PostTypes;

final class PostTypeRegistrar {
    public static function register(): void {
        add_action( 'init', array( self::class, 'register_now' ) );
    }

    public static function register_now(): void {
        $cpts = array(
            'tutorials'       => 'Tutorials',
            'code'            => 'Code Library',
            'tools'           => 'Developer Tools',
            'projects'        => 'Projects',
            'cyber'           => 'Cyber Guides',
            'troubleshooting' => 'Troubleshooting',
            'hs_question'     => 'Forum Q&A',
            'hs_video'        => 'YouTube Resources',
            'hs_course'       => 'Courses',
            'hs_resource'     => 'Resources',
        );

        foreach ( $cpts as $slug => $label ) {
            register_post_type( $slug, array(
                'label'        => $label,
                'public'       => true,
                'show_in_rest' => true,
                'has_archive'  => true,
                'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'author', 'revisions', 'custom-fields' ),
            ) );
        }
    }
}
