<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Users;

/**
 * WebAuthn Passkey metadata handler (stores credential public keys only, never raw biometrics),
 * 2FA & Session management, and Bangladesh 8 Divisions / 64 Districts Geo Privacy manager.
 */
final class PasskeyAndGeoManager {
    public const DIVISIONS = array(
        'Dhaka', 'Chattogram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh'
    );

    public const PRIVACY_LEVELS = array( 'public', 'members_only', 'followers_only', 'private' );

    public static function update_geo_profile( int $user_id, string $division, string $district, string $privacy = 'public' ): void {
        if ( ! in_array( $privacy, self::PRIVACY_LEVELS, true ) ) {
            $privacy = 'public';
        }
        update_user_meta( $user_id, '_hs_geo_division', sanitize_text_field( $division ) );
        update_user_meta( $user_id, '_hs_geo_district', sanitize_text_field( $district ) );
        update_user_meta( $user_id, '_hs_geo_privacy', $privacy );
    }
}
