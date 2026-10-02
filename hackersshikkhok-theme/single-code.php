<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-code-resource">
    <?php while ( have_posts() ) : the_post(); ?>
        <article class="hs-code-view">
            <h1><?php the_title(); ?></h1>
            <?php echo do_shortcode( '[hs_live_demo]' ); ?>
            <div class="hs-code-documentation"><?php the_content(); ?></div>
        </article>
    <?php endwhile; ?>
</main>
<?php
get_footer();
