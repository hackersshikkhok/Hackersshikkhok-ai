<?php
declare(strict_types=1);

namespace HackersShikkhok\Theme;

final class ComponentLibrary {
    public static function render_metadata_line( array $items ): string {
        $escaped = array_map( 'esc_html', array_filter( $items ) );
        return '<div class="hs-meta-line">' . implode( ' <span aria-hidden="true">·</span> ', $escaped ) . '</div>';
    }
}
