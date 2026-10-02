<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\AI;

final class AutopilotScheduler {
    public const MAX_RETRIES = 3;

    public static function should_retry( int $attempt ): bool {
        return $attempt < self::MAX_RETRIES;
    }
}
