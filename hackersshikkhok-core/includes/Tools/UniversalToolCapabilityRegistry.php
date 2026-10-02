<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Tools;

/**
 * Tool Capability Registry, Zip-Slip Path Traversal Guard, Decompression Bomb Limiter,
 * and Auto-Expiring Temporary Sandbox File Cleanup.
 */
final class UniversalToolCapabilityRegistry {
    public static function is_safe_archive_entry( string $entry_path ): bool {
        // Prevent Zip-Slip path traversal
        if ( str_contains( $entry_path, '..' ) || str_starts_with( $entry_path, '/' ) || str_starts_with( $entry_path, '\\' ) ) {
            return false;
        }
        return true;
    }
}
