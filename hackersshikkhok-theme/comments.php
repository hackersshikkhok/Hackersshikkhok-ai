<?php
declare(strict_types=1);
if ( post_password_required() ) {
    return;
}
?>
<section id="comments" class="hs-comments-area">
    <?php wp_list_comments(); ?>
    <?php comment_form(); ?>
</section>
