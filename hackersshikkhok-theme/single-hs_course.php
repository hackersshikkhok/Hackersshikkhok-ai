<?php
/**
 * Single HS Course Template - Hackers শিক্ষক LMS Player Integration
 */
get_header();

while ( have_posts() ) :
    the_post();
    $post_id     = get_the_ID();
    $course_slug = get_post_meta( $post_id, '_hs_course_slug_id', true ) ?: get_post_field( 'post_name', $post_id );
    $title_en    = get_post_meta( $post_id, '_hs_title_en', true ) ?: get_the_title();
    $category_id = get_post_meta( $post_id, '_hs_category_id', true ) ?: 'cybersecurity';
    $level       = (int) get_post_meta( $post_id, '_hs_level', true ) ?: 1;
    $duration    = (int) get_post_meta( $post_id, '_hs_duration_weeks', true ) ?: 4;
    $lessons_cnt = (int) get_post_meta( $post_id, '_hs_curriculum_total_lessons', true ) ?: 12;
    $labs_cnt    = (int) get_post_meta( $post_id, '_hs_curriculum_total_labs', true ) ?: 2;
    
    $modules_json = get_post_meta( $post_id, '_hs_modules_json', true );
    $modules      = ! empty( $modules_json ) ? json_decode( (string) $modules_json, true ) : array();
    $academy_url  = home_url( '/academy/?course_id=' . urlencode( $course_slug ) );
    ?>
    <div class="hs-lms-single-course container mx-auto px-4 py-12 text-slate-100 max-w-5xl">
        <div class="mb-6">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="text-cyan-400 hover:underline text-sm font-mono">← Back to Cyber Academy</a>
        </div>
        
        <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur">
            <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-mono rounded-full uppercase">Faculty: <?php echo esc_html( $category_id ); ?></span>
                <span class="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-mono rounded-full">Level <?php echo esc_html( (string) $level ); ?></span>
                <span class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono rounded-full"><?php echo esc_html( (string) $duration ); ?> Weeks</span>
            </div>

            <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3"><?php the_title(); ?></h1>
            <?php if ( ! empty( $title_en ) && $title_en !== get_the_title() ) : ?>
                <p class="text-lg text-slate-400 font-mono mb-6"><?php echo esc_html( $title_en ); ?></p>
            <?php endif; ?>

            <div class="prose prose-invert max-w-none text-slate-300 mb-8 leading-relaxed">
                <?php the_content(); ?>
            </div>

            <div class="flex flex-wrap gap-6 border-t border-slate-800 pt-6 mb-8 text-sm font-mono text-slate-400">
                <div>📚 Modules: <strong class="text-white"><?php echo count( $modules ); ?></strong></div>
                <div>📖 Lessons: <strong class="text-white"><?php echo esc_html( (string) $lessons_cnt ); ?></strong></div>
                <div>⚡ Practical Labs: <strong class="text-white"><?php echo esc_html( (string) $labs_cnt ); ?></strong></div>
            </div>

            <div class="flex flex-wrap items-center gap-4">
                <a href="<?php echo esc_url( $academy_url ); ?>" class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5 flex items-center gap-2">
                    <span>🚀 Launch Interactive LMS Player</span>
                </a>
            </div>
        </div>

        <?php if ( ! empty( $modules ) ) : ?>
            <div class="mt-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-8">
                <h3 class="text-xl font-bold text-white mb-6">Course Curriculum Modules</h3>
                <div class="space-y-4">
                    <?php foreach ( $modules as $m_idx => $module ) : ?>
                        <div class="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5">
                            <h4 class="text-lg font-semibold text-cyan-300 mb-2">Module <?php echo ($m_idx + 1); ?>: <?php echo esc_html( $module['titleBn'] ?? ($module['titleEn'] ?? 'Module') ); ?></h4>
                            <?php if ( ! empty( $module['lessons'] ) ) : ?>
                                <ul class="mt-3 space-y-2 pl-4 border-l-2 border-cyan-500/30 text-sm">
                                    <?php foreach ( $module['lessons'] as $l_idx => $lesson ) : ?>
                                        <li class="text-slate-300 flex items-center justify-between">
                                            <span>Lesson <?php echo ($m_idx + 1); ?>.<?php echo ($l_idx + 1); ?>: <?php echo esc_html( $lesson['titleBn'] ?? ($lesson['titleEn'] ?? 'Lesson') ); ?></span>
                                            <span class="text-xs font-mono text-slate-500 px-2 py-0.5 bg-slate-900 rounded"><?php echo esc_html( $lesson['type'] ?? 'Lecture' ); ?></span>
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
    <?php
endwhile;

get_footer();

