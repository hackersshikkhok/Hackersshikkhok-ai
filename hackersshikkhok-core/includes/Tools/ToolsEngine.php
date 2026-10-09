<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Tools;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class ToolsEngine {
    public static function register(): void {
        add_shortcode( 'hs_developer_tools', array( self::class, 'render_tools_center' ) );
    }

    public static function render_tools_center( array $atts = array() ): string {
        $atts = shortcode_atts( array(
            'tool' => 'json-formatter',
        ), $atts, 'hs_developer_tools' );

        $tool_id = sanitize_key( $atts['tool'] );

        wp_enqueue_style( 'hs-tools-engine', HS_CORE_URL . 'assets/css/tools-engine.css', array(), HS_CORE_VERSION );
        wp_enqueue_script( 'hs-tools-engine', HS_CORE_URL . 'assets/js/tools-engine.js', array(), HS_CORE_VERSION, true );

        return sprintf(
            '<div id="hs-developer-tools-mount" class="hs-tools-center" data-tool-id="%s"></div>',
            esc_attr( $tool_id )
        );
    }
}
