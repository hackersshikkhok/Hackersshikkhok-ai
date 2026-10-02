<?php
declare(strict_types=1);
get_header();
while ( have_posts() ) : the_post();
    the_content();
endwhile;
get_footer();
