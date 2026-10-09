<?php
/**
 * Single Article Template - Hackers শিক্ষক
 * AdSense Compliant, SEO-Optimized Article View with Breadcrumbs, Author Bio & Ad Slots
 */
declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-single-article hs-section-container">
    <?php while ( have_posts() ) : the_post(); ?>
        
        <!-- Breadcrumb & Category -->
        <nav class="hs-breadcrumbs" style="margin-bottom:16px;font-size:13px;color:var(--hs-text-muted);">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;">হোম</a>
            <span> / </span>
            <span><?php the_category( ', ' ); ?></span>
            <span> / </span>
            <span style="color:#fff;"><?php the_title(); ?></span>
        </nav>

        <article id="post-<?php the_ID(); ?>" <?php post_class( 'hs-cyber-card' ); ?> style="padding:36px;">
            
            <header class="hs-article-header" style="margin-bottom:24px;border-bottom:1px solid var(--hs-border);padding-bottom:20px;">
                <span class="hs-card-badge"><?php echo esc_html( get_post_type() ); ?></span>
                <h1 style="font-size:2.2rem;font-weight:900;color:#fff;margin:12px 0;"><?php the_title(); ?></h1>
                
                <div style="display:flex;gap:16px;color:var(--hs-text-muted);font-size:13px;flex-wrap:wrap;">
                    <span>✍️ <?php the_author_posts_link(); ?></span>
                    <span>📅 <?php echo get_the_date(); ?></span>
                    <span>⏱️ <?php echo max( 1, (int) ceil( str_word_count( wp_strip_all_tags( get_the_content() ) ) / 200 ) ); ?> মিনিট পড়ার সময়</span>
                </div>
            </header>

            <!-- AdSense Compliant Banner Slot (Before Article Body) -->
            <div class="hs-ad-slot-container" style="margin:16px 0 28px;">
                <span class="hs-ad-label">Advertisement</span>
                <div><?php do_action( 'hs_render_ad_slot', 'article_before_content' ); ?></div>
            </div>

            <?php if ( has_post_thumbnail() ) : ?>
                <div class="hs-featured-image-wrapper" style="margin-bottom:28px;border-radius:12px;overflow:hidden;border:1px solid var(--hs-border);">
                    <?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto;display:block;' ) ); ?>
                </div>
            <?php endif; ?>

            <!-- Main Content Area -->
            <div class="hs-entry-content" style="font-size:1.05rem;line-height:1.8;color:#e2e8f0;">
                <?php the_content(); ?>
            </div>

            <!-- AdSense Compliant Banner Slot (After Article Body) -->
            <div class="hs-ad-slot-container" style="margin:28px 0 16px;">
                <span class="hs-ad-label">Advertisement</span>
                <div><?php do_action( 'hs_render_ad_slot', 'article_after_content' ); ?></div>
            </div>

            <!-- Author Box -->
            <footer style="margin-top:40px;padding-top:24px;border-top:1px solid var(--hs-border);display:flex;gap:20px;align-items:center;">
                <div style="width:64px;height:64px;border-radius:50%;overflow:hidden;border:2px solid var(--hs-primary);flex-shrink:0;">
                    <?php echo get_avatar( get_the_author_meta( 'ID' ), 64 ); ?>
                </div>
                <div>
                    <h4 style="margin:0 0 4px;color:#fff;font-size:1.1rem;"><?php the_author(); ?></h4>
                    <p style="margin:0;color:var(--hs-text-muted);font-size:13px;"><?php the_author_meta( 'description' ) ?: 'Hackers শিক্ষক রিসার্চ টিম ও কন্ট্রিবিউটর। প্র্যাকটিক্যাল সাইবার সিকিউরিটি ও ডেভেলপার রিসোর্স তৈরিতে নিবেদিত।'; ?></p>
                </div>
            </footer>

        </article>

        <!-- Comments Section -->
        <?php if ( comments_open() || get_comments_number() ) : ?>
            <div style="margin-top:32px;">
                <?php comments_template(); ?>
            </div>
        <?php endif; ?>

    <?php endwhile; ?>
</main>

<?php
get_footer();
