<?php
/**
 * Native Branded Authentication Portal (Login, Register, Forgot/Reset Password, Passkey, 2FA)
 * Never exposes default wp-login.php UI to regular visitors.
 */

declare(strict_types=1);

namespace HackersShikkhok\Core\Auth;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

final class NativeBrandedAuthEngine {
    public static function register(): void {
        add_filter( 'login_url', array( self::class, 'filter_branded_login_url' ), 10, 2 );
        add_filter( 'register_url', array( self::class, 'filter_branded_register_url' ) );
        add_filter( 'lostpassword_url', array( self::class, 'filter_branded_lostpassword_url' ) );
    }

    public static function filter_branded_login_url( string $login_url, string $redirect = '' ): string {
        $url = home_url( '/auth/login/' );
        return '' !== $redirect ? add_query_arg( 'redirect_to', rawurlencode( $redirect ), $url ) : $url;
    }

    public static function filter_branded_register_url(): string {
        return home_url( '/auth/register/' );
    }

    public static function filter_branded_lostpassword_url(): string {
        return home_url( '/auth/reset-password/' );
    }
}
