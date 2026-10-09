<?php
/**
 * Single HS Course Template
 */
get_header();

while ( have_posts() ) :
    the_post();
    $course_id = get_post_meta( get_the_ID(), '_hs_course_slug_id', true );
    ?>
    <div class="hs-lms-single-course container mx-auto py-10">
        <h1 class="text-4xl font-bold text-white"><?php the_title(); ?></h1>
        <div class="mt-5 text-slate-300">
            <?php the_content(); ?>
        </div>
        <!-- LMS Player Placeholder -->
        <div id="hs-lms-player" data-course-id="<?php echo esc_attr( $course_id ); ?>">
            Loading Course Content...
        </div>
    </div>
    <?php
endwhile;

get_footer();
