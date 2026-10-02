<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class SystemHealth {
    public static function run_diagnostics(): array {
        return array(
            'php_version'    => PHP_VERSION,
            'wp_version'     => get_bloginfo( 'version' ),
            'plugin_version' => HS_CORE_VERSION,
            'developer'      => 'Hackers শিক্ষক',
            'official_url'   => 'https://hackersshikkhok.com',
            'memory_limit'   => ini_get( 'memory_limit' ),
            'cron_enabled'   => ! ( defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ),
            'rest_status'    => 'healthy',
        );
    }
}
