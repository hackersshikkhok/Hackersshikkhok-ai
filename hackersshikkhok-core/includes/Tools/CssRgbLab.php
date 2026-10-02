<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Tools;

final class CssRgbLab {
    public static function register(): void {
        add_shortcode( 'hs_css_rgb_lab', array( self::class, 'render_lab' ) );
    }

    public static function render_lab(): string {
        wp_enqueue_style( 'hs-tools-engine', HS_CORE_URL . 'assets/css/tools-engine.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-tools-engine', HS_CORE_URL . 'assets/js/tools-engine.js', array(), HS_CORE_VERSION, true );
        return '<div id="hs-css-rgb-lab-mount" class="hs-rgb-lab-surface"></div>';
    }
}
