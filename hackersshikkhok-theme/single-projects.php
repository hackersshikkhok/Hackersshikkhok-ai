<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-project">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <div class="hs-project-body"><?php the_content(); ?></div>
    <?php endwhile; ?>
</main>
<?php
get_footer();
