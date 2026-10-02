<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-category-archive">
    <h1><?php single_cat_title(); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
