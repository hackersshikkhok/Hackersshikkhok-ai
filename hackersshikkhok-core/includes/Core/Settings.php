<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class Settings {
    public static function get_master_switches(): array {
        $defaults = array(
            'emergency_kill_switch' => false,
            'ai_autopilot'          => true,
            'auto_draft'            => true,
            'auto_publish'          => false,
            'ai_code_generator'     => true,
            'live_demo'             => true,
            'tool_engine'           => true,
            'creator_studio'        => true,
            'device_lab'            => true,
            'games_center'          => true,
            'youtube_integration'   => true,
            'github_integration'    => true,
            'auto_linking'          => true,
            'schema_engine'         => true,
            'download_system'       => true,
            'user_submission'       => true,
        );
        $saved = get_option( 'hs_core_master_switches', array() );
        return wp_parse_args( is_array( $saved ) ? $saved : array(), $defaults );
    }

    public static function ensure_defaults(): void {
        if ( false === get_option( 'hs_core_master_switches' ) ) {
            update_option( 'hs_core_master_switches', self::get_master_switches() );
        }
    }
}
