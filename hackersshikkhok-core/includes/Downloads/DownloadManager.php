<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Downloads;

final class DownloadManager {
    private const ALLOWED_EXTENSIONS = array( 'zip', 'css', 'js', 'html', 'php', 'json', 'svg', 'md' );

    public static function is_safe_extension( string $filename ): bool {
        $ext = strtolower( pathinfo( $filename, PATHINFO_EXTENSION ) );
        return in_array( $ext, self::ALLOWED_EXTENSIONS, true );
    }
}
