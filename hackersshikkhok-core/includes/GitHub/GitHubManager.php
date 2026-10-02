<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\GitHub;

final class GitHubManager {
    public static function get_project_repo( int $post_id ): array {
        return array(
            'repo_url' => esc_url_raw( (string) get_post_meta( $post_id, '_hs_github_repo_url', true ) ),
            'version'  => sanitize_text_field( (string) get_post_meta( $post_id, '_hs_project_version', true ) ?: 'v4.0.0' ),
        );
    }
}
