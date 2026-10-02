<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-forum-thread">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="hs-question-body"><?php the_content(); ?></div>
        <?php comments_template(); ?>
    <?php endwhile; ?>
</main>
<?php
get_footer();
