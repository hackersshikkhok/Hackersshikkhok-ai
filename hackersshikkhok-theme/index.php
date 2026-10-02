<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-archive-container">
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
        <?php get_template_part( 'template-parts/post-card' ); ?>
    <?php endwhile; endif; ?>
</main>
<?php
get_footer();
