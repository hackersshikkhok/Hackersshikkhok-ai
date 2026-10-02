<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

use HackersShikkhok\Core\PostTypes\PostTypeRegistrar;
use HackersShikkhok\Core\Taxonomies\TaxonomyRegistrar;

final class Activator {
    public static function activate(): void {
        if ( version_compare( PHP_VERSION, '8.2.0', '<' ) ) {
            deactivate_plugins( HS_CORE_BASENAME );
            wp_die( esc_html__( 'Hackers শিক্ষক Core requires PHP 8.2 or higher.', 'hackersshikkhok-core' ) );
        }

        Database::install_tables();
        Capabilities::register_roles_and_caps();
        PostTypeRegistrar::register_now();
        TaxonomyRegistrar::register_now();
        Settings::ensure_defaults();
        flush_rewrite_rules();
    }
}
