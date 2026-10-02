<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Security;

final class SecurityManager {
    public static function register(): void {
        add_filter( 'upload_mimes', array( self::class, 'restrict_executable_mimes' ) );
    }

    public static function restrict_executable_mimes( array $mimes ): array {
        unset( $mimes['exe'], $mimes['sh'], $mimes['bat'], $mimes['phar'] );
        return $mimes;
    }
}
