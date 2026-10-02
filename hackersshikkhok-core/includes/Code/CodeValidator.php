<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Code;

final class CodeValidator {
    private const BLOCKED_PATTERNS = array(
        '/\beval\s*\(/i',
        '/\bshell_exec\s*\(/i',
        '/\bpassthru\s*\(/i',
        '/\bsystem\s*\(/i',
        '/\bproc_open\s*\(/i',
    );

    public static function validate_snippet( string $code, string $language ): array {
        foreach ( self::BLOCKED_PATTERNS as $pattern ) {
            if ( 1 === preg_match( $pattern, $code ) ) {
                return array(
                    'valid'  => false,
                    'reason' => 'Blocked dangerous execution primitive detected.',
                );
            }
        }
        return array( 'valid' => true, 'reason' => 'Passed static security validation.' );
    }
}
