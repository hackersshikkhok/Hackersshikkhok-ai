<?php
/**
 * Safe Uninstall Handler for Hackers শিক্ষক Core Engine.
 * Developed by Hackers শিক্ষক (https://hackersshikkhok.com)
 * Preserves all user content, custom post types, and database tables unless explicit purge is enabled in settings.
 */

declare(strict_types=1);

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

$hs_settings = get_option( 'hs_core_master_settings', array() );
$purge_on_uninstall = ! empty( $hs_settings['purge_data_on_uninstall'] );

if ( ! $purge_on_uninstall ) {
    return;
}

delete_option( 'hs_core_master_settings' );
delete_option( 'hs_core_db_version' );
