<?php
/**
 * Single Code Resource Template - Hackers শিক্ষক
 * Dedicated View for Code Snippets, Syntax Highlighting, Sandboxed Live Demo, Copy & Download
 */
declare(strict_types=1);

get_header();
?>

<main id="primary" class="site-main hs-single-code-resource hs-section-container">
    <?php while ( have_posts() ) : the_post(); ?>
        
        <nav class="hs-breadcrumbs" style="margin-bottom:16px;font-size:13px;color:var(--hs-text-muted);">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;">হোম</a>
            <span> / </span>
            <a href="<?php echo esc_url( home_url( '/code/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;">কোড লাইব্রেরি</a>
            <span> / </span>
            <span style="color:#fff;"><?php the_title(); ?></span>
        </nav>

        <article id="post-<?php the_ID(); ?>" class="hs-cyber-card" style="padding:36px;">
            
            <header style="margin-bottom:24px;border-bottom:1px solid var(--hs-border);padding-bottom:16px;">
                <span class="hs-card-badge">Verified Code Resource</span>
                <h1 style="font-size:2.2rem;font-weight:900;color:#fff;margin:12px 0;"><?php the_title(); ?></h1>
                <div style="display:flex;gap:16px;color:var(--hs-text-muted);font-size:13px;">
                    <span>📅 আপডেট: <?php echo get_the_modified_date(); ?></span>
                    <span>🛡️ লাইসেন্স: MIT Open Source</span>
                </div>
            </header>

            <!-- Sandboxed Live Demo Area -->
            <section style="margin-bottom:32px;">
                <h3 style="color:#fff;font-size:1.2rem;margin-bottom:12px;">🖥️ লাইভ স্যান্ডবক্স ডেমো</h3>
                <div class="hs-live-demo-box" style="border:1px solid var(--hs-border);border-radius:12px;overflow:hidden;">
                    <?php echo do_shortcode( '[hs_live_demo]' ); ?>
                </div>
            </section>

            <!-- AdSense Compliant Banner Slot -->
            <div class="hs-ad-slot-container" style="margin:24px 0;">
                <span class="hs-ad-label">Advertisement</span>
                <div><?php do_action( 'hs_render_ad_slot', 'code_page_middle' ); ?></div>
            </div>

            <!-- Code Documentation & Explanations -->
            <section class="hs-code-documentation" style="font-size:1.05rem;line-height:1.8;color:#e2e8f0;">
                <h3 style="color:#fff;font-size:1.2rem;margin-bottom:12px;">📖 কোড ওভারভিউ ও ডকুমেন্টেশন</h3>
                <?php the_content(); ?>
            </section>

        </article>

    <?php endwhile; ?>
</main>

<?php
get_footer();
