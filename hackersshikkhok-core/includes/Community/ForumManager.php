<?php
declare(strict_types=1);

namespace HackersShikkhok\Core\Community;

final class ForumManager {
    public static function mark_solution_accepted( int $question_id, int $comment_id ): void {
        if ( ! current_user_can( 'hs_moderate_forum' ) && get_current_user_id() !== (int) get_post_field( 'post_author', $question_id ) ) {
            return;
        }
        update_post_meta( $question_id, '_hs_accepted_answer_id', $comment_id );
    }
}
