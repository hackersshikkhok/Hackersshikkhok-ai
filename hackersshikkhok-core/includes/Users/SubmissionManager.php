<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Users;

final class SubmissionManager {
    public static function create_pending_submission( int $user_id, string $title, string $content, string $type ): int {
        if ( ! is_user_logged_in() ) {
            return 0;
        }
        return (int) wp_insert_post( array(
            'post_title'   => sanitize_text_field( $title ),
            'post_content' => wp_kses_post( $content ),
            'post_status'  => 'pending',
            'post_author'  => $user_id,
            'post_type'    => in_array( $type, array( 'code', 'tutorials', 'tools', 'projects' ), true ) ? $type : 'code',
        ) );
    }
}
