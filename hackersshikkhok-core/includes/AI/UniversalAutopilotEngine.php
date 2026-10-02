<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class UniversalAutopilotEngine {
    public static function register(): void {
        add_action( 'hs_core_autopilot_cron_tick', array( self::class, 'process_next_job' ) );
    }

    public static function process_next_job(): void {
        if ( UniversalFactoryAndEmergencyManager::is_emergency_stopped() ) {
            return; // Respect Global Emergency Kill Switch
        }
    }
}
