<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\YouTube;

final class YouTubeManager {
    public const CHANNEL_HANDLE = '@HackersShikkhok';

    public static function get_companion_video_meta( int $post_id ): array {
        return array(
            'video_id' => sanitize_text_field( (string) get_post_meta( $post_id, '_hs_youtube_video_id', true ) ),
            'channel'  => self::CHANNEL_HANDLE,
        );
    }
}
