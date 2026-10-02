<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class AiEngine {
    private static function get_masked_key_status(): string {
        $key = getenv( 'HS_AI_API_KEY' );
        if ( is_string( $key ) && strlen( $key ) > 8 ) {
            return 'Configured (****' . substr( $key, -4 ) . ')';
        }
        return 'Server Environment Managed';
    }

    public static function get_provider_diagnostics(): array {
        return array(
            'key_status'   => self::get_masked_key_status(),
            'max_retry'    => 3,
            'default_mode' => 'draft-first',
        );
    }
}
