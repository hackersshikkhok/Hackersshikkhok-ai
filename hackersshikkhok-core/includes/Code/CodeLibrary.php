<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Code;

final class CodeLibrary {
    public static function register(): void {
        add_action( 'wp_enqueue_scripts', array( self::class, 'enqueue_conditional_assets' ) );
    }

    public static function enqueue_conditional_assets(): void {
        if ( is_singular( 'code' ) || is_page_template( 'page-tools-lab.php' ) ) {
            wp_enqueue_style( 'hs-code-library', HS_CORE_URL . 'assets/css/code-library.css', array(), HS_CORE_VERSION );
            wp_enqueue_script( 'hs-code-editor', HS_CORE_URL . 'assets/js/code-editor.js', array(), HS_CORE_VERSION, true );
        }
    }
}
