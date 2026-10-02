<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

final class Logger {
    public static function log( string $event, string $severity = 'info', int $object_id = 0, array $context = array() ): void {
        unset( $context['api_key'], $context['password'], $context['token'], $context['secret'], $context['passkey'] );
        do_action( 'hs_core_logged_event', $event, $severity, $object_id, $context );
    }
}
