<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-creator-profile">
    <h1><?php the_author(); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
