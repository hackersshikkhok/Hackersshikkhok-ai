<?php
declare(strict_types=1);
get_header();
?>
<main class="hs-search-results">
    <h1><?php printf( esc_html__( 'Search Results for: %s', 'hackersshikkhok-theme' ), get_search_query() ); ?></h1>
    <?php while ( have_posts() ) : the_post(); get_template_part( 'template-parts/post-card' ); endwhile; ?>
</main>
<?php
get_footer();
