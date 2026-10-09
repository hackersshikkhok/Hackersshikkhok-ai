<?php
/**
 * Single Tool Template - Hackers শিক্ষক
 * Dedicated View for 520+ Interactive Client-Side Tools with Direct Runner, Schema & Ad Slots
 */
declare(strict_types=1);

get_header();

$tool_slug = get_post_field( 'post_name', get_the_ID() );
?>

<main id="primary" class="site-main hs-single-tool-workspace hs-section-container">
    <?php while ( have_posts() ) : the_post(); ?>
        
        <nav class="hs-breadcrumbs" style="margin-bottom:16px;font-size:13px;color:var(--hs-text-muted);">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;">হোম</a>
            <span> / </span>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;">টুলস ল্যাব</a>
            <span> / </span>
            <span style="color:#fff;"><?php the_title(); ?></span>
        </nav>

        <article id="post-<?php the_ID(); ?>" class="hs-cyber-card" style="padding:36px;">
            
            <header style="margin-bottom:24px;border-bottom:1px solid var(--hs-border);padding-bottom:16px;">
                <span class="hs-card-badge">Interactive Privacy-Safe Tool</span>
                <h1 style="font-size:2.2rem;font-weight:900;color:#fff;margin:12px 0;"><?php the_title(); ?></h1>
                <p style="color:var(--hs-text-muted);font-size:1.05rem;margin:0;"><?php echo get_the_excerpt() ?: '১০০% ক্লায়েন্ট-সাইড ব্রাউজার এক্সিকিউশন। কোনো সংবেদনশীল ডেটা সার্ভারে সংরক্ষিত হয় না।'; ?></p>
            </header>

            <!-- Direct Interactive Tool Mount -->
            <section class="hs-tool-workspace-container" style="margin:24px 0;">
                <?php echo do_shortcode( '[hs_developer_tools tool="' . esc_attr( $tool_slug ) . '"]' ); ?>
            </section>

            <!-- AdSense Compliant Banner Slot -->
            <div class="hs-ad-slot-container" style="margin:28px 0;">
                <span class="hs-ad-label">Advertisement</span>
                <div><?php do_action( 'hs_render_ad_slot', 'tool_after_processor' ); ?></div>
            </div>

            <!-- How It Works & Documentation -->
            <section class="hs-tool-documentation" style="font-size:1.05rem;line-height:1.8;color:#e2e8f0;margin-top:32px;">
                <h3 style="color:#fff;font-size:1.3rem;margin-bottom:12px;">🔍 টুলটি যেভাবে কাজ করে</h3>
                <?php the_content(); ?>
            </section>

        </article>

    <?php endwhile; ?>
</main>

<?php
get_footer();
