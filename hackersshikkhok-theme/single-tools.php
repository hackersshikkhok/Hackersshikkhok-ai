<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-single-tool-workspace">
    <?php while ( have_posts() ) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <?php echo do_shortcode( '[hs_developer_tools]' ); ?>
    <?php endwhile; ?>
</main>
<?php
get_footer();
