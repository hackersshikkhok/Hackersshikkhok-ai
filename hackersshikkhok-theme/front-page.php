<?php
/**
 * Front Page Template - Hackers শিক্ষক
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com | YouTube: @HackersShikkhok)
 * 100% AdSense Compliant, SEO-Optimized, Cyber-Themed WordPress Homepage
 */
declare(strict_types=1);

get_header();

// Fetch popular tools from Universal Registry
   = class_exists( '\HackersShikkhok\Core\Tools\UniversalToolRegistry' ) ? \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_centers() : array();
 = class_exists( '\HackersShikkhok\Core\Tools\UniversalToolRegistry' ) ? \HackersShikkhok\Core\Tools\UniversalToolRegistry::get_all_tools() : array();
 = array_slice( , 0, 8 );
?>

<main id="primary" class="site-main hs-front-page">

    <!-- Hero Section -->
    <section class="hs-hero-section">
        <div class="hs-hero-badge">Cybersecurity Academy &amp; 520+ Tool Lab</div>
        <h1 class="hs-hero-title">শিখুন প্র্যাকটিক্যাল সাইবার সিকিউরিটি ও ফুল-স্ট্যাক কোডিং</h1>
        <p class="hs-hero-sub">
            Hackers শিক্ষক হলো বাংলা ভাষায় প্রথম পূর্ণাঙ্গ সাইবার ডিফেন্স একাডেমি, কোড লাইব্রেরি এবং ৫২০+ ক্লায়েন্ট-সাইড ডেভেলপার টুলসের ইন্টারেক্টিভ হাব।
        </p>
        <div class="hs-hero-cta">
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" class="hs-btn-primary">🎓 একাডেমি কোর্স ব্রাউজ করুন</a>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" class="hs-btn-secondary">⚡ ৫২০+ টুলস এক্সপ্লোর করুন</a>
        </div>
    </section>

    <!-- AdSense Compliant Banner Slot (Top) -->
    <div class="hs-ad-slot-container">
        <span class="hs-ad-label">Advertisement</span>
        <div class="hs-ad-banner-mock">
            <?php do_action( 'hs_render_ad_slot', 'homepage_top' ); ?>
        </div>
    </div>

    <!-- 8 Master Faculties / Categories -->
    <section class="hs-section-container">
        <div class="hs-section-header">
            <div>
                <h2 class="hs-section-title">🛡️ ৮টি স্পেশালাইজড ফ্যাকাল্টি</h2>
                <p style="color:var(--hs-text-muted);font-size:14px;margin-top:4px;">বেসিক কম্পিউটার থেকে এডভান্সড সাইবার ওয়ারফেয়ার পর্যন্ত পর্যায়ক্রমিক কারিকুলাম।</p>
            </div>
            <a href="<?php echo esc_url( home_url( '/academy/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;font-size:14px;font-weight:600;">সব কোর্স দেখুন &rarr;</a>
        </div>

        <div class="hs-card-grid">
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 01</span>
                <h3 class="hs-card-title">সাইবার সিকিউরিটি ও ইথিক্যাল হ্যাকিং</h3>
                <p class="hs-card-desc">ডিফেন্সিভ সিকিউরিটি, অথরাইজড পেনিট্রেশন টেস্টিং ল্যাব, লিনাক্স হার্ডেনিং ও OWASP Top 10।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=cybersecurity' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 02</span>
                <h3 class="hs-card-title">ওয়েব ডেভেলপমেন্ট ও সফটওয়্যার</h3>
                <p class="hs-card-desc">Modern JavaScript, TypeScript, React 19, Node.js, Python ব্যাকএন্ড ও মাইক্রোসার্ভিসেস আর্কিটেকচার।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=webdev' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 03</span>
                <h3 class="hs-card-title">ওয়ার্ডপ্রেস ডেভেলপমেন্ট ও ইকোসিস্টেম</h3>
                <p class="hs-card-desc">প্রফেশনাল থিম ও কোর প্লাগইন ডেভেলপমেন্ট, CPT, REST API, সিকিউরিটি হার্ডেনিং ও স্পিড অপ্টিমাইজেশন।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=wordpress' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 04</span>
                <h3 class="hs-card-title">AI, ডেটা সায়েন্স ও প্রম্পট ইঞ্জিনিয়ারিং</h3>
                <p class="hs-card-desc">LLM ইন্টিগ্রেশন, জেনারেটিভ AI অটোমেশন, পাইথন ডেটা অ্যানালাইটিক্স এবং অটো-পাইলট সিস্টেম ডিজাইন।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=ai_data' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 05</span>
                <h3 class="hs-card-title">ফ্রিল্যান্সিং ও গ্লোবাল ক্যারিয়ার গ্রোথ</h3>
                <p class="hs-card-desc">আপওয়ার্ক, ফাইভার, ক্লায়েন্ট কমিউনিকেশন, টেক প্রপোজাল রাইটিং এবং আন্তর্জাতিক রিমোট জব কৌশল।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=freelancing' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 06</span>
                <h3 class="hs-card-title">UI/UX ডিজাইন ও মিডিয়া প্রোডাকশন</h3>
                <p class="hs-card-desc">Figma ডিজাইন সিস্টেম, প্রোটোটাইপিং, ইউটিউব ভিডিও এডিটিং ও টেক ব্র্যান্ডিং আর্কিটেকচার।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=design_media' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 07</span>
                <h3 class="hs-card-title">কম্পিউটার হার্ডওয়্যার, নেটওয়ার্কিং ও IoT</h3>
                <p class="hs-card-desc">মাদারবোর্ড ডায়াগনস্টিক, রাউটার সিকিউরিটি, হোম ল্যাব সেটআপ এবং আরডুইনো/রাস্পবেরি পাই প্রজেক্টস।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=hardware_iot' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
            <div class="hs-cyber-card">
                <span class="hs-card-badge">Core Faculty 08</span>
                <h3 class="hs-card-title">ডিজিটাল মার্কেটিং ও টেক বিজনেস</h3>
                <p class="hs-card-desc">টেক এসইও (Technical SEO), কনটেন্ট স্ট্র্যাটেজি, ইউটিউব ব্র্যান্ড গ্রোথ ও সফটওয়্যার সেলস ফানেল।</p>
                <a href="<?php echo esc_url( home_url( '/academy/?cat=marketing_business' ) ); ?>" class="hs-btn-secondary" style="text-align:center;">১০টি মাস্টার কোর্স</a>
            </div>
        </div>
    </section>

    <!-- 520+ Tools Center Preview -->
    <section class="hs-section-container" style="background:rgba(11,17,32,0.4);border-radius:24px;border:1px solid var(--hs-border);margin-top:24px;">
        <div class="hs-section-header">
            <div>
                <h2 class="hs-section-title">⚡ জনপ্রিয় ডেভেলপার ও সাইবার টুলস</h2>
                <p style="color:var(--hs-text-muted);font-size:14px;margin-top:4px;">১০০% ব্রাউজার-সাইড, প্রাইভেসি-সুরক্ষিত এবং ইনস্ট্যান্ট এক্সিকিউশন।</p>
            </div>
            <a href="<?php echo esc_url( home_url( '/tools/' ) ); ?>" style="color:var(--hs-primary);text-decoration:none;font-size:14px;font-weight:600;">৫২০টি টুলসের ডিরেক্টরি &rarr;</a>
        </div>

        <div class="hs-card-grid">
            <?php foreach (  as  ) : ?>
                <div class="hs-cyber-card">
                    <span class="hs-card-badge"><?php echo esc_html( ['category'] ?? 'Tool' ); ?></span>
                    <h3 class="hs-card-title" style="font-size:1.1rem;"><?php echo esc_html( ['name'] ); ?></h3>
                    <p class="hs-card-desc" style="font-size:0.85rem;"><?php echo esc_html( ['name_bn'] ?? ['name'] ); ?></p>
                    <a href="<?php echo esc_url( home_url( '/tools/?tool=' . urlencode( ['tool_id'] ) ) ); ?>" class="hs-btn-secondary" style="padding:8px 16px;text-align:center;font-size:13px;">টুল ওপেন করুন</a>
                </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- YouTube & Community Section -->
    <section class="hs-section-container" style="margin-top:24px;">
        <div style="background:linear-gradient(135deg, rgba(123,44,191,0.2), rgba(0,245,212,0.1));border:1px solid var(--hs-border);border-radius:20px;padding:48px 32px;text-align:center;">
            <span class="hs-card-badge" style="background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.4);">Official YouTube Channel</span>
            <h2 style="font-size:2rem;font-weight:800;color:#fff;margin:12px 0;">Hackers শিক্ষক অফিসিয়াল ভিডিও রিসোর্স</h2>
            <p style="color:var(--hs-text-muted);max-width:640px;margin:0 auto 24px;">
                প্রতিটি একাডেমি কোর্সের সাথে রয়েছে হ্যান্ডস-অন প্র্যাকটিক্যাল ইউটিউব ভিডিও টিউটোরিয়াল। সাবস্ক্রাইব করে যুক্ত থাকুন আমাদের কমিউনিটিতে।
            </p>
            <a href="https://youtube.com/@HackersShikkhok" target="_blank" rel="noopener noreferrer" class="hs-btn-primary" style="background:#ef4444;color:#fff;box-shadow:0 0 20px rgba(239,68,68,0.4);">
                ▶ ইউটিউব চ্যানেল সাবস্ক্রাইব করুন
            </a>
        </div>
    </section>

    <!-- AdSense Compliant Banner Slot (Bottom) -->
    <div class="hs-ad-slot-container">
        <span class="hs-ad-label">Advertisement</span>
        <div class="hs-ad-banner-mock">
            <?php do_action( 'hs_render_ad_slot', 'homepage_bottom' ); ?>
        </div>
    </div>

</main>

<?php
get_footer();
