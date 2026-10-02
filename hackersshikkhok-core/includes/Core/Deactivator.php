<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class Deactivator {
    public static function deactivate(): void {
        wp_clear_scheduled_hook( 'hs_core_autopilot_cron_tick' );
        wp_clear_scheduled_hook( 'hs_core_log_retention_cleanup' );
        flush_rewrite_rules();
    }
}
