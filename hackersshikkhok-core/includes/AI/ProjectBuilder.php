<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class ProjectBuilder {
    public static function scaffold_plugin_package( string $slug, string $title ): array {
        return array(
            'slug'   => sanitize_title( $slug ),
            'title'  => sanitize_text_field( $title ),
            'status' => 'pending_admin_approval',
        );
    }
}
