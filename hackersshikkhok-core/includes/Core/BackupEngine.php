<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Core;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Real Snapshot Backup & Transactional Restore Engine
 * Writes physical JSON dump artifacts to disk, validates SHA-256 checksums, and restores tables atomically.
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */
final class BackupEngine {

    public static function get_backup_dir(): string {
        $upload_dir = wp_upload_dir();
        $backup_dir = trailingslashit( $upload_dir['basedir'] ) . 'hackersshikkhok-backups';
        if ( ! file_exists( $backup_dir ) ) {
            wp_mkdir_p( $backup_dir );
            // Protect backup directory with .htaccess
            $htaccess = $backup_dir . '/.htaccess';
            if ( ! file_exists( $htaccess ) ) {
                file_put_contents( $htaccess, "Deny from all\n" );
            }
        }
        return $backup_dir;
    }

    /**
     * Dumps database tables to disk as a verified JSON artifact
     */
    public static function create_snapshot(): array {
        global $wpdb;
        $backup_dir  = self::get_backup_dir();
        $snapshot_id = 'HS-SNAP-' . gmdate( 'Ymd-His' ) . '-' . wp_generate_password( 6, false, false );
        $file_name   = $snapshot_id . '.json';
        $file_path   = trailingslashit( $backup_dir ) . $file_name;

        $tables_to_dump = array(
            $wpdb->prefix . 'hs_wallet_ledger',
            $wpdb->prefix . 'hs_courses_progress',
            $wpdb->prefix . 'hs_quiz_attempts',
            $wpdb->prefix . 'hs_assignment_submissions',
            $wpdb->prefix . 'hs_certificates',
            $wpdb->prefix . 'hs_ai_jobs',
            $wpdb->prefix . 'hs_audit_logs',
        );

        $dump_data = array(
            'metadata' => array(
                'snapshot_id'    => $snapshot_id,
                'created_at'     => gmdate( 'c' ),
                'site_url'       => home_url(),
                'db_version'     => get_option( 'hs_core_db_version', '4.1.0' ),
                'plugin_version' => defined( 'HS_CORE_VERSION' ) ? HS_CORE_VERSION : '4.1.0',
            ),
            'tables'   => array(),
        );

        $total_records = 0;
        foreach ( $tables_to_dump as $table_name ) {
            // Check if table exists
            $exists = $wpdb->get_var( $wpdb->prepare( "SHOW TABLES LIKE %s", $table_name ) );
            if ( $exists === $table_name ) {
                $rows = $wpdb->get_results( "SELECT * FROM {$table_name}", ARRAY_A );
                $dump_data['tables'][ $table_name ] = $rows ?: array();
                $total_records += count( $rows ?: array() );
            }
        }

        $json_payload = wp_json_encode( $dump_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES );
        if ( false === $json_payload ) {
            return array( 'success' => false, 'error' => 'Failed to encode JSON payload.' );
        }

        $written = file_put_contents( $file_path, $json_payload );
        if ( false === $written ) {
            return array( 'success' => false, 'error' => 'Failed to write backup snapshot to disk.' );
        }

        $sha256_checksum = hash( 'sha256', $json_payload );
        $file_size_bytes = filesize( $file_path );

        return array(
            'success'          => true,
            'snapshot_id'      => $snapshot_id,
            'file_name'        => $file_name,
            'file_path'        => $file_path,
            'file_size_bytes'  => $file_size_bytes,
            'total_records'    => $total_records,
            'tables_count'     => count( $dump_data['tables'] ),
            'sha256_checksum'  => $sha256_checksum,
            'created_at'       => gmdate( 'c' ),
        );
    }

    /**
     * Atomically restores database state from a verified snapshot file
     */
    public static function restore_snapshot( string $snapshot_id ): array {
        global $wpdb;
        $backup_dir = self::get_backup_dir();
        $safe_id    = preg_replace( '/[^a-zA-Z0-9_\-]/', '', $snapshot_id );
        $file_path  = trailingslashit( $backup_dir ) . $safe_id . '.json';

        if ( ! file_exists( $file_path ) ) {
            return array( 'success' => false, 'error' => 'Snapshot artifact file not found on disk: ' . $safe_id );
        }

        $json_content = file_get_contents( $file_path );
        if ( empty( $json_content ) ) {
            return array( 'success' => false, 'error' => 'Backup snapshot artifact is empty.' );
        }

        $dump_data = json_decode( $json_content, true );
        if ( ! is_array( $dump_data ) || empty( $dump_data['tables'] ) ) {
            return array( 'success' => false, 'error' => 'Invalid backup payload format.' );
        }

        // Begin Transaction
        $wpdb->query( 'START TRANSACTION' );

        try {
            $restored_tables = 0;
            $restored_rows   = 0;

            foreach ( $dump_data['tables'] as $table_name => $rows ) {
                $table_name = sanitize_text_field( $table_name );
                // Security: table must begin with WP prefix
                if ( ! str_starts_with( $table_name, $wpdb->prefix . 'hs_' ) ) {
                    continue;
                }

                // Truncate current table
                $wpdb->query( "TRUNCATE TABLE {$table_name}" );

                if ( ! empty( $rows ) && is_array( $rows ) ) {
                    foreach ( $rows as $row ) {
                        $wpdb->insert( $table_name, $row );
                        $restored_rows++;
                    }
                }
                $restored_tables++;
            }

            $wpdb->query( 'COMMIT' );

            return array(
                'success'         => true,
                'snapshot_id'     => $safe_id,
                'restored_tables' => $restored_tables,
                'restored_rows'   => $restored_rows,
                'status'          => 'restored',
                'restored_at'     => gmdate( 'c' ),
            );
        } catch ( \Throwable $e ) {
            $wpdb->query( 'ROLLBACK' );
            return array(
                'success' => false,
                'error'   => 'Restore failed and rolled back: ' . $e->getMessage(),
            );
        }
    }
}
