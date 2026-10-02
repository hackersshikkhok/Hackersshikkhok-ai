<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Demo;

final class LiveDemo {
    public static function register(): void {
        add_shortcode( 'hs_live_demo', array( self::class, 'render_sandbox' ) );
    }

    public static function render_sandbox( array $atts = array() ): string {
        wp_enqueue_style( 'hs-live-demo', HS_CORE_URL . 'assets/css/live-demo.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-live-demo', HS_CORE_URL . 'assets/js/live-demo.js', array(), HS_CORE_VERSION, true );

        return '<div class="hs-sandbox-wrapper"><iframe class="hs-sandbox-iframe" sandbox="allow-scripts" referrerpolicy="no-referrer" title="Sandboxed Code Preview"></iframe></div>';
    }
}
