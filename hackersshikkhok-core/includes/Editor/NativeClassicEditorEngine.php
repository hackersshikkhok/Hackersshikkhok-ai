<?php
/**
 * Native Classic Editor & SEO/Schema/Code Metabox Engine (Without Third-Party Classic Editor Plugin)
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Editor;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeClassicEditorEngine {
    public static function register(): void {
        add_filter( 'use_block_editor_for_post', '__return_false', 100 );
        add_filter( 'use_block_editor_for_post_type', '__return_false', 100 );
        add_filter( 'gutenberg_use_widgets_block_editor', '__return_false', 100 );
        add_filter( 'use_widgets_block_editor', '__return_false', 100 );
        add_action( 'add_meta_boxes', array( self::class, 'register_native_seo_and_schema_metabox' ) );
        add_action( 'save_post', array( self::class, 'save_native_metabox' ), 10, 2 );
    }

    public static function register_native_seo_and_schema_metabox(): void {
        $post_types = array( 'post', 'page', 'tutorials', 'code', 'tools', 'projects', 'cyber', 'troubleshooting', 'hs_course', 'hs_question' );
        foreach ( $post_types as $pt ) {
            add_meta_box(
                'hs_native_seo_schema_box',
                'Hackers শিক্ষক — Native SEO, Schema, Code & Related Binding',
                array( self::class, 'render_metabox' ),
                $pt,
                'normal',
                'high'
            );
        }
    }

    public static function render_metabox( \WP_Post $post ): void {
        wp_nonce_field( 'hs_save_native_metabox', 'hs_native_metabox_nonce' );
        $seo_title = (string) get_post_meta( $post->ID, '_hs_seo_title', true );
        $seo_desc  = (string) get_post_meta( $post->ID, '_hs_seo_desc', true );
        $schema    = (string) get_post_meta( $post->ID, '_hs_schema_type', true ) ?: 'TechArticle';
        ?>
        <div style="background:#0b1120;color:#e2e8f0;padding:16px;border-radius:10px;border:1px solid #00f5d4;">
            <p><label><strong>SEO Title:</strong></label><br/>
            <input type="text" name="hs_seo_title" value="<?php echo esc_attr( $seo_title ); ?>" style="width:100%;" /></p>
            <p><label><strong>Meta Description:</strong></label><br/>
            <textarea name="hs_seo_desc" rows="2" style="width:100%;"><?php echo esc_textarea( $seo_desc ); ?></textarea></p>
            <p><label><strong>Schema.org Type:</strong></label><br/>
            <select name="hs_schema_type">
                <option value="TechArticle" <?php selected( $schema, 'TechArticle' ); ?>>TechArticle</option>
                <option value="SoftwareApplication" <?php selected( $schema, 'SoftwareApplication' ); ?>>SoftwareApplication (Tool)</option>
                <option value="Course" <?php selected( $schema, 'Course' ); ?>>Course (LMS)</option>
                <option value="FAQPage" <?php selected( $schema, 'FAQPage' ); ?>>FAQPage</option>
                <option value="HowTo" <?php selected( $schema, 'HowTo' ); ?>>HowTo</option>
            </select></p>
        </div>
        <?php
    }

    public static function save_native_metabox( int $post_id, WP_Post $post ): void {
        if ( ! isset( $_POST['hs_native_metabox_nonce'] ) || ! wp_verify_nonce( (string) $_POST['hs_native_metabox_nonce'], 'hs_save_native_metabox' ) ) {
            return;
        }
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }
        if ( isset( $_POST['hs_seo_title'] ) ) {
            update_post_meta( $post_id, '_hs_seo_title', sanitize_text_field( (string) $_POST['hs_seo_title'] ) );
        }
        if ( isset( $_POST['hs_seo_desc'] ) ) {
            update_post_meta( $post_id, '_hs_seo_desc', sanitize_textarea_field( (string) $_POST['hs_seo_desc'] ) );
        }
        if ( isset( $_POST['hs_schema_type'] ) ) {
            $allowed = array( 'TechArticle', 'SoftwareApplication', 'Course', 'FAQPage', 'HowTo' );
            $type = in_array( $_POST['hs_schema_type'], $allowed, true ) ? (string) $_POST['hs_schema_type'] : 'TechArticle';
            update_post_meta( $post_id, '_hs_schema_type', $type );
        }
    }
}
