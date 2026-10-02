<?php
declare(strict_types=1);
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-card' ); ?>>
    <h2 class="hs-card-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <div class="hs-card-excerpt"><?php the_excerpt(); ?></div>
</article>
