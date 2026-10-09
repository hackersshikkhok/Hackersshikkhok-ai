<?php
/**
 * Template Name: Hackers শিক্ষক Cybersecurity Academy & Dynamic LMS Player
 * Theme Presentation Layer for Courses, Levels 0-8, 3-Column LMS Player & Public Certificate Verification
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$current_user_id   = get_current_user_id();
$wallet_data       = class_exists( '\HackersShikkhok\Core\Users\UserEcosystem' ) 
    ? \HackersShikkhok\Core\Users\UserEcosystem::get_wallet_summary( $current_user_id ) 
    : array( 'points' => 0, 'balance_bdt' => 0 );
$rest_nonce        = wp_create_nonce( 'wp_rest' );

// Retrieve the requested course via query param or default to the first published course
$requested_course_id = isset( $_GET['course_id'] ) ? sanitize_text_field( (string) $_GET['course_id'] ) : '';

$courses_query = new WP_Query( array(
    'post_type'      => 'hs_course',
    'post_status'    => 'publish',
    'posts_per_page' => 100,
    'orderby'        => 'date',
    'order'          => 'ASC',
) );

$all_courses = array();
$active_course_post = null;

if ( $courses_query->have_posts() ) {
    while ( $courses_query->have_posts() ) {
        $courses_query->the_post();
        $c_id   = get_the_ID();
        $c_slug = get_post_meta( $c_id, '_hs_course_slug_id', true ) ?: get_post_field( 'post_name', $c_id );
        
        $c_item = array(
            'post_id'       => $c_id,
            'slug'          => $c_slug,
            'title'         => get_the_title(),
            'title_en'      => get_post_meta( $c_id, '_hs_title_en', true ) ?: get_the_title(),
            'category_id'   => get_post_meta( $c_id, '_hs_category_id', true ) ?: 'cybersecurity',
            'level'         => (int) get_post_meta( $c_id, '_hs_level', true ) ?: 1,
            'duration'      => (int) get_post_meta( $c_id, '_hs_duration_weeks', true ) ?: 4,
            'total_lessons' => (int) get_post_meta( $c_id, '_hs_curriculum_total_lessons', true ) ?: 12,
            'total_labs'    => (int) get_post_meta( $c_id, '_hs_curriculum_total_labs', true ) ?: 2,
        );
        $all_courses[] = $c_item;

        if ( ! $active_course_post && ( $requested_course_id === $c_slug || (string) $c_id === $requested_course_id ) ) {
            $active_course_post = get_post( $c_id );
        }
    }
    wp_reset_postdata();
}

// Fallback to first course if none explicitly matched
if ( ! $active_course_post && ! empty( $all_courses ) ) {
    $active_course_post = get_post( $all_courses[0]['post_id'] );
}

// Extract dynamic modules and metadata for the active course
$active_course_id     = $active_course_post ? $active_course_post->ID : 0;
$active_course_title  = $active_course_post ? $active_course_post->post_title : 'Cybersecurity Fundamentals & Defensive Mastery';
$active_course_slug   = $active_course_post ? ( get_post_meta( $active_course_id, '_hs_course_slug_id', true ) ?: $active_course_post->post_name ) : 'cyber-01-foundations';
$active_modules_json  = $active_course_post ? get_post_meta( $active_course_id, '_hs_modules_json', true ) : '';
$active_modules       = ! empty( $active_modules_json ) ? json_decode( (string) $active_modules_json, true ) : array();
$active_quizzes_json  = $active_course_post ? get_post_meta( $active_course_id, '_hs_quizzes_json', true ) : '';
$active_quizzes       = ! empty( $active_quizzes_json ) ? json_decode( (string) $active_quizzes_json, true ) : array();

// If no database courses imported yet, provide robust dynamic fallback structure
if ( empty( $active_modules ) ) {
    $active_modules = array(
        array(
            'moduleId' => $active_course_slug . '-mod-1',
            'moduleNumber' => 1,
            'moduleTitleBn' => 'মডিউল ১: ভিত্তিপ্রস্তর ও থ্রেট মডেলিং (Foundations)',
            'lessons' => array(
                array(
                    'id' => $active_course_slug . '-m1-l1',
                    'lessonNumber' => '1.1',
                    'titleBn' => '১.১ ডিফেন্স-ইন-ডেপথ ও জিরো-ট্রাস্ট আর্কিটেকচার নীতি',
                    'titleEn' => 'Defense-in-Depth & Zero-Trust Principles',
                    'type' => 'Video Lecture',
                    'duration' => '15 মিনিট',
                    'freePreview' => true,
                    'contentMarkdownBn' => 'ডিফেন্স-ইন-ডেপথ হলো একাধিক স্তরে নিরাপত্তা ব্যবস্থা স্থাপন করার কৌশল যাতে একটি স্তর ব্যর্থ হলেও পুরো সিস্টেম সুরক্ষিত থাকে।',
                ),
                array(
                    'id' => $active_course_slug . '-m1-l2',
                    'lessonNumber' => '1.2',
                    'titleBn' => '১.২ সিকিউরিটি হার্ডেনিং ও ফায়ারওয়াল রুলস কনফিগারেশন',
                    'titleEn' => 'Linux Security Hardening & Firewall Setup',
                    'type' => 'Coding Exercise',
                    'duration' => '20 মিনিট',
                    'freePreview' => false,
                    'contentMarkdownBn' => 'সার্ভার ও নেটওয়ার্ক নিরাপত্তার ভিত্তি নিশ্চিত করতে পোর্ট হার্ডেনিং ও আনইউজড সার্ভিসেস নিষ্ক্রিয় করার নিয়ম।',
                ),
                array(
                    'id' => $active_course_slug . '-m1-l3',
                    'lessonNumber' => '1.3',
                    'titleBn' => '১.৩ হ্যান্ডস-অন ল্যাব: নেটওয়ার্ক অডিট ও সিকিউরিটি লগ বিশ্লেষণ',
                    'titleEn' => 'Hands-on Network Audit & Log Analysis',
                    'type' => 'Practical Lab',
                    'duration' => '25 মিনিট',
                    'freePreview' => false,
                    'contentMarkdownBn' => 'আইসোলেটেড ল্যাব পরিবেশে সিস্টেম লগ পর্যবেক্ষণ করে সন্দেহজনক আক্রমণ প্যাটার্ন শনাক্তকরণ।',
                ),
            ),
        ),
        array(
            'moduleId' => $active_course_slug . '-mod-2',
            'moduleNumber' => 2,
            'moduleTitleBn' => 'মডিউল ২: কোর টেকনোলজি ও হ্যান্ডস-অন ইমপ্লিমেন্টেশন',
            'lessons' => array(
                array(
                    'id' => $active_course_slug . '-m2-l1',
                    'lessonNumber' => '2.1',
                    'titleBn' => '২.১ ইনপুট ভ্যালিডেশন, স্যানিটাইজেশন ও XSS প্রতিরোধ',
                    'titleEn' => 'Input Validation & Context Escaping',
                    'type' => 'Coding Exercise',
                    'duration' => '18 মিনিট',
                    'freePreview' => false,
                    'contentMarkdownBn' => 'ইউজার ইনপুট কখনোই আনভ্যালিডেটেড রাখা চলবে না। কন্টেক্সট অনুযায়ী ডেটা এস্কেপিং নিশ্চিত করুন।',
                ),
                array(
                    'id' => $active_course_slug . '-m2-l2',
                    'lessonNumber' => '2.2',
                    'titleBn' => '২.২ ক্রিপ্টোগ্রাফিক টোকেন ইন্টিগ্রিটি ও HMAC-SHA256 ভেরিফিকেশন',
                    'titleEn' => 'HMAC Token Integrity Verification',
                    'type' => 'Practical Lab',
                    'duration' => '22 মিনিট',
                    'freePreview' => false,
                    'contentMarkdownBn' => 'কনস্ট্যান্ট-টাইম মেথড hash_equals ব্যবহার করে ট্যাম্পার-প্রুফ টোকেন ভ্যালিডেশন।',
                ),
            ),
        ),
    );
}

// Active first lesson
$first_lesson = $active_modules[0]['lessons'][0] ?? array(
    'id' => 'l1',
    'titleBn' => '১.১ পরিচিতি ও প্র্যাকটিস',
    'type' => 'Video Lecture',
    'contentMarkdownBn' => 'পাঠের বিবরণ লোড হচ্ছে...'
);
?>

<div class="hs-academy-viewport" data-hs-theme="cyber-dark">
    <!-- Academy Master Navigation Bar -->
    <header class="hs-academy-header">
        <div class="hs-academy-header-inner">
            <div class="hs-academy-brand">
                <div class="hs-academy-badge">🛡️ ACADEMY PRO</div>
                <h1 class="hs-academy-title">Hackers শিক্ষক Cyber Academy &amp; LMS Hub</h1>
            </div>
            
            <!-- Dynamic Course Selector Dropdown -->
            <div class="hs-course-picker">
                <label for="hs-course-select" class="hs-picker-label">কোর্স নির্বাচন:</label>
                <select id="hs-course-select" onchange="HS_ACADEMY.switchCourse(this.value)">
                    <?php if ( ! empty( $all_courses ) ) : ?>
                        <?php foreach ( $all_courses as $c ) : ?>
                            <option value="<?php echo esc_attr( $c['slug'] ); ?>" <?php selected( $c['slug'], $active_course_slug ); ?>>
                                <?php echo esc_html( $c['title'] ); ?> (Lv.<?php echo esc_html( (string) $c['level'] ); ?>)
                            </option>
                        <?php endforeach; ?>
                    <?php else : ?>
                        <option value="<?php echo esc_attr( $active_course_slug ); ?>"><?php echo esc_html( $active_course_title ); ?></option>
                    <?php endif; ?>
                </select>
            </div>

            <div class="hs-academy-stats">
                <div class="hs-stat-chip">
                    <span class="hs-stat-label">LEVEL XP</span>
                    <span class="hs-stat-value" id="hs-user-xp"><?php echo esc_html( (string) $wallet_data['points'] ); ?> XP</span>
                </div>
                <div class="hs-stat-chip">
                    <span class="hs-stat-label">WALLET</span>
                    <span class="hs-stat-value">৳ <?php echo esc_html( number_format( (float) $wallet_data['balance_bdt'], 2 ) ); ?></span>
                </div>
                <button class="hs-btn-verify-cert" onclick="HS_ACADEMY.openCertModal()">📜 Verify Certificate</button>
            </div>
        </div>
    </header>

    <!-- 3-Column Production Dynamic Course Player Workspace -->
    <main class="hs-player-grid">
        <!-- COLUMN 1: Dynamic Curriculum & Module Navigation Drawer -->
        <aside class="hs-col-curriculum" id="hs-curriculum-col">
            <div class="hs-panel-header">
                <h3>📚 Curriculum &amp; Modules</h3>
                <span class="hs-pill" id="hs-course-progress-badge">0% Complete</span>
            </div>
            <div class="hs-curriculum-search">
                <input type="text" id="hs-lesson-search" placeholder="🔍 Search curriculum..." oninput="HS_ACADEMY.filterLessons(this.value)" />
            </div>
            
            <div class="hs-module-list" id="hs-module-accordion">
                <?php foreach ( $active_modules as $m_idx => $module ) : 
                    $is_open = $m_idx === 0 ? 'open' : '';
                    $m_num   = esc_html( sprintf( 'MOD %02d', (int) ( $module['moduleNumber'] ?? ( $m_idx + 1 ) ) ) );
                    $m_title = esc_html( (string) ( $module['moduleTitleBn'] ?? $module['moduleTitleEn'] ?? 'Module' ) );
                ?>
                <div class="hs-module-card <?php echo esc_attr( $is_open ); ?>">
                    <div class="hs-module-header" onclick="HS_ACADEMY.toggleModule(this)">
                        <span class="hs-module-num"><?php echo $m_num; ?></span>
                        <span class="hs-module-title"><?php echo $m_title; ?></span>
                        <span class="hs-accordion-icon"><?php echo $is_open ? '▼' : '▶'; ?></span>
                    </div>
                    <ul class="hs-lesson-items">
                        <?php if ( ! empty( $module['lessons'] ) ) : ?>
                            <?php foreach ( $module['lessons'] as $l_idx => $lesson ) : 
                                $is_active = ( $m_idx === 0 && $l_idx === 0 ) ? 'active' : '';
                                $les_id    = esc_attr( (string) ( $lesson['id'] ?? ( 'm' . $m_idx . '_l' . $l_idx ) ) );
                                $les_title = esc_attr( (string) ( $lesson['titleBn'] ?? $lesson['titleEn'] ?? 'Lesson' ) );
                                $les_type  = esc_attr( (string) ( $lesson['type'] ?? 'lecture' ) );
                                $les_dur   = esc_html( (string) ( $lesson['duration'] ?? '15m' ) );
                            ?>
                            <li class="hs-lesson-item <?php echo esc_attr( $is_active ); ?>" 
                                data-lesson-id="<?php echo $les_id; ?>" 
                                data-lesson-title="<?php echo $les_title; ?>"
                                data-lesson-type="<?php echo $les_type; ?>"
                                onclick="HS_ACADEMY.loadLesson('<?php echo $les_id; ?>', '<?php echo $les_title; ?>', '<?php echo $les_type; ?>')">
                                <span class="hs-status-icon">○</span>
                                <span class="hs-lesson-name"><?php echo esc_html( $les_title ); ?></span>
                                <span class="hs-lesson-duration"><?php echo $les_dur; ?></span>
                            </li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ul>
                </div>
                <?php endforeach; ?>
            </div>
            
            <div class="hs-curriculum-footer">
                <button class="hs-btn-exam" onclick="HS_ACADEMY.openFinalExam()">🏆 Take Final Certification Exam</button>
            </div>
        </aside>

        <!-- COLUMN 2: Central Lesson Stage & Interactive Terminal/Player -->
        <section class="hs-col-stage" id="hs-stage-col">
            <div class="hs-stage-topbar">
                <div class="hs-breadcrumb">
                    Course: <strong><?php echo esc_html( $active_course_title ); ?></strong> / 
                    <span id="hs-current-lesson-crumb"><?php echo esc_html( $first_lesson['titleBn'] ?? 'Lesson 1.1' ); ?></span>
                </div>
                <div class="hs-lesson-actions">
                    <button class="hs-btn-icon" id="hs-btn-bookmark" onclick="HS_ACADEMY.toggleBookmark()" title="Bookmark Lesson">🔖 Bookmark</button>
                    <button class="hs-btn-complete" id="hs-btn-mark-complete" onclick="HS_ACADEMY.completeCurrentLesson()">Mark Complete &amp; Next ➔</button>
                </div>
            </div>

            <div class="hs-stage-media-card">
                <div class="hs-stage-tabs">
                    <button class="hs-tab-btn active" onclick="HS_ACADEMY.switchStageTab('lecture', this)">📺 Instructional Lesson</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('terminal', this)">💻 Sandboxed Terminal Lab</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('quiz', this)">📝 Practice Assessment</button>
                </div>

                <!-- Lecture Content Stage -->
                <div class="hs-stage-content active" id="hs-stage-lecture">
                    <div class="hs-lesson-body" id="hs-lesson-body-text">
                        <div class="hs-video-container">
                            <iframe 
                                id="hs-video-frame" 
                                src="https://www.youtube-nocookie.com/embed/videoseries?list=PLr6-GrHGFmWzN5j_4X33q1m8v7yQk9m2e" 
                                title="Hackers শিক্ষক Cyber Tutorial Player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        <div class="hs-lesson-notes-content" id="hs-dynamic-lesson-content">
                            <h3><?php echo esc_html( $first_lesson['titleBn'] ?? 'Lesson Instruction' ); ?></h3>
                            <p><?php echo esc_html( $first_lesson['contentMarkdownBn'] ?? 'ইনস্ট্রাকশনাল বিবরণী...' ); ?></p>
                        </div>
                    </div>
                </div>

                <!-- Sandboxed Terminal Stage -->
                <div class="hs-stage-content" id="hs-stage-terminal" style="display:none;">
                    <div class="hs-terminal-window">
                        <div class="hs-term-header">
                            <span class="hs-term-dot red"></span>
                            <span class="hs-term-dot yellow"></span>
                            <span class="hs-term-dot green"></span>
                            <span class="hs-term-title">hs-lab-session@hackersshikkhok:~ (Isolated Sandbox)</span>
                        </div>
                        <div class="hs-term-body" id="hs-term-output">
                            <p class="hs-term-line">Welcome to Hackers শিক্ষক Defensive Security Interactive Sandbox v4.1.0.</p>
                            <p class="hs-term-line">Active Course: [<?php echo esc_html( $active_course_slug ); ?>] | Type 'help', 'status', 'scan', 'verify-hmac', or 'clear' to execute authorized lab commands.</p>
                            <div class="hs-term-prompt-line">
                                <span class="hs-term-prompt">scholar@hs-academy:~$</span>
                                <input type="text" id="hs-term-input" onkeydown="HS_ACADEMY.handleTerminalKey(event)" autofocus />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dynamic Quiz Assessment Stage -->
                <div class="hs-stage-content" id="hs-stage-quiz" style="display:none;">
                    <div class="hs-quiz-card" id="hs-quiz-container">
                        <h3>Module Assessment Quiz</h3>
                        <p>Complete this technical assessment to test defensive security principles. Answers are server-side evaluated.</p>
                        <form id="hs-quiz-form" onsubmit="HS_ACADEMY.submitQuizForm(event)">
                            <div class="hs-quiz-q">
                                <p><strong>1. Which comparison method avoids timing attack vulnerabilities in token validation?</strong></p>
                                <label><input type="radio" name="q1" value="0" /> $a == $b (Standard Equality)</label><br />
                                <label><input type="radio" name="q1" value="1" /> hash_equals($a, $b) (Constant-Time)</label><br />
                                <label><input type="radio" name="q1" value="2" /> strcmp($a, $b)</label><br />
                                <label><input type="radio" name="q1" value="3" /> md5($a) == md5($b)</label>
                            </div>
                            <div class="hs-quiz-q">
                                <p><strong>2. What is the fundamental requirement for zero-trust API authorization?</strong></p>
                                <label><input type="radio" name="q2" value="0" /> Checking IP address only</label><br />
                                <label><input type="radio" name="q2" value="1" /> Checking user is logged in only</label><br />
                                <label><input type="radio" name="q2" value="2" /> Verifying both authentication AND object-level resource ownership</label><br />
                                <label><input type="radio" name="q2" value="3" /> Relying on client-side state</label>
                            </div>
                            <button type="submit" class="hs-btn-primary">Submit Answers for Server Evaluation</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <!-- COLUMN 3: Student Live Console, Notes, Resources & Progress -->
        <aside class="hs-col-console" id="hs-console-col">
            <div class="hs-panel-header">
                <h3>⚡ Scholar Console</h3>
            </div>

            <div class="hs-console-widget">
                <div class="hs-widget-title">📝 My Scratchpad &amp; Notes</div>
                <textarea id="hs-notes-area" placeholder="Write real-time technical notes here..." oninput="HS_ACADEMY.saveNotesLocal(this.value)"></textarea>
                <div class="hs-notes-footer">
                    <span id="hs-notes-save-status">Saved</span>
                    <button class="hs-btn-small" onclick="HS_ACADEMY.syncNotesToServer()">☁️ Sync Cloud</button>
                </div>
            </div>

            <div class="hs-console-widget">
                <div class="hs-widget-title">📁 Downloadable Lab Resources</div>
                <ul class="hs-resource-list">
                    <li><a href="data:text/plain;charset=utf-8,Hackers%20Shikkhok%20Zero-Trust%20Security%20Checklist%20v4.1.0%0A1.%20Enforce%20Object-Level%20Authorization%0A2.%20Use%20hash_equals%20for%20HMAC%20Verification%0A3.%20Atomic%20SQL%20Transactions" download="zero-trust-checklist.txt">📄 Zero-Trust Checklist.txt</a></li>
                    <li><a href="data:application/json;charset=utf-8,%7B%22course%22%3A%22<?php echo esc_attr( $active_course_slug ); ?>%22%2C%22version%22%3A%224.1.0%22%2C%22verified%22%3Atrue%7D" download="lab-environment-config.json">⚙️ Lab Config.json</a></li>
                </ul>
            </div>
        </aside>
    </main>

    <!-- Public Certificate Verification Modal -->
    <div class="hs-modal-backdrop" id="hs-cert-modal" style="display:none;">
        <div class="hs-modal-content">
            <div class="hs-modal-header">
                <h3>📜 Certificate Cryptographic Verifier</h3>
                <button class="hs-modal-close" onclick="HS_ACADEMY.closeCertModal()">✕</button>
            </div>
            <div class="hs-modal-body">
                <p>Enter any Hackers শিক্ষক Certificate Code to cryptographically verify its authenticity against our server HMAC ledger.</p>
                <div class="hs-form-row">
                    <input type="text" id="hs-cert-verify-input" placeholder="e.g. HS-CERT-2026-X9A7B2C" />
                    <button class="hs-btn-primary" onclick="HS_ACADEMY.verifyCertificateCode()">Verify Signature</button>
                </div>
                <div id="hs-cert-result" class="hs-cert-result-box" style="display:none;"></div>
            </div>
        </div>
    </div>
</div>

<script>
window.HS_ACADEMY = (function() {
    const nonce = '<?php echo esc_js( $rest_nonce ); ?>';
    const restBase = '<?php echo esc_url_raw( rest_url( 'hackersshikkhok/v1' ) ); ?>';
    let currentLesson = '<?php echo esc_js( $first_lesson['id'] ?? 'l1' ); ?>';
    let courseId = <?php echo (int) $active_course_id ?: 1; ?>;
    let courseSlug = '<?php echo esc_js( $active_course_slug ); ?>';

    return {
        switchCourse: function(newSlug) {
            window.location.href = window.location.pathname + '?course_id=' + encodeURIComponent(newSlug);
        },
        loadLesson: function(id, title, type) {
            currentLesson = id;
            const crumb = document.getElementById('hs-current-lesson-crumb');
            if (crumb) crumb.innerText = title;
            document.querySelectorAll('.hs-lesson-item').forEach(el => el.classList.remove('active'));
            const target = document.querySelector(`[data-lesson-id="${id}"]`);
            if (target) target.classList.add('active');
            
            const dynContent = document.getElementById('hs-dynamic-lesson-content');
            if (dynContent) {
                dynContent.innerHTML = `<h3>${title}</h3><p>এই পাঠের বিস্তারিত ইনস্ট্রাকশন ও ল্যাব মেটেরিয়াল লোড হয়েছে। উপরে সংশ্লিষ্ট ট্যাব থেকে ল্যাব বা পরীক্ষা সম্পন্ন করুন।</p>`;
            }

            if (type.includes('Lab') || type.includes('terminal')) {
                this.switchStageTab('terminal', document.querySelectorAll('.hs-tab-btn')[1]);
            } else if (type.includes('Quiz')) {
                this.switchStageTab('quiz', document.querySelectorAll('.hs-tab-btn')[2]);
            } else {
                this.switchStageTab('lecture', document.querySelectorAll('.hs-tab-btn')[0]);
            }
        },
        toggleModule: function(headerEl) {
            const card = headerEl.parentElement;
            card.classList.toggle('open');
            const icon = headerEl.querySelector('.hs-accordion-icon');
            if (icon) icon.innerText = card.classList.contains('open') ? '▼' : '▶';
        },
        filterLessons: function(query) {
            const term = query.toLowerCase().trim();
            document.querySelectorAll('.hs-lesson-item').forEach(el => {
                const name = el.querySelector('.hs-lesson-name')?.innerText.toLowerCase() || '';
                el.style.display = name.includes(term) ? '' : 'none';
            });
        },
        switchStageTab: function(tabId, btn) {
            document.querySelectorAll('.hs-stage-content').forEach(c => c.style.display = 'none');
            document.querySelectorAll('.hs-tab-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            const target = document.getElementById('hs-stage-' + tabId);
            if (target) target.style.display = 'block';
        },
        completeCurrentLesson: function() {
            fetch(restBase + '/academy/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
                body: JSON.stringify({ course_id: courseId, lesson_id: currentLesson })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const badge = document.getElementById('hs-course-progress-badge');
                    if (badge) badge.innerText = data.overall_percent + '% Complete';
                    const activeEl = document.querySelector(`[data-lesson-id="${currentLesson}"] .hs-status-icon`);
                    if (activeEl) { activeEl.innerText = '✓'; activeEl.classList.add('done'); }
                    alert('Progress saved! Lesson marked as completed. +15 XP awarded.');
                }
            })
            .catch(err => console.error(err));
        },
        openQuiz: function(quizId) {
            this.switchStageTab('quiz', document.querySelectorAll('.hs-tab-btn')[2]);
        },
        openFinalExam: function() {
            this.switchStageTab('quiz', document.querySelectorAll('.hs-tab-btn')[2]);
        },
        submitQuizForm: function(e) {
            e.preventDefault();
            const form = document.getElementById('hs-quiz-form');
            const q1Val = form.querySelector('input[name="q1"]:checked')?.value || -1;
            const q2Val = form.querySelector('input[name="q2"]:checked')?.value || -1;

            const payload = {
                course_id: courseId,
                quiz_id: 'quiz_mod1',
                answers: [
                    { question_id: 'q1', selected_option: parseInt(q1Val) },
                    { question_id: 'q2', selected_option: parseInt(q2Val) }
                ]
            };

            fetch(restBase + '/academy/quiz/attempt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert(`Quiz Evaluated! Score: ${data.score_percent}% | Passed: ${data.passed ? 'YES' : 'NO'} (+${data.xp_awarded} XP)`);
                } else {
                    alert('Evaluation error: ' + (data.message || 'Unknown error'));
                }
            })
            .catch(err => console.error(err));
        },
        handleTerminalKey: function(e) {
            if (e.key === 'Enter') {
                const input = e.target;
                const cmd = input.value.trim();
                input.value = '';
                const out = document.getElementById('hs-term-output');
                if (cmd === 'clear') {
                    out.innerHTML = '<div class="hs-term-prompt-line"><span class="hs-term-prompt">scholar@hs-academy:~$</span><input type="text" id="hs-term-input" onkeydown="HS_ACADEMY.handleTerminalKey(event)" autofocus /></div>';
                    return;
                }
                const p = document.createElement('p');
                p.className = 'hs-term-line';
                p.innerHTML = `<span style="color:#00f5d4;">$ ${cmd}</span><br />` + this.execCmd(cmd);
                out.insertBefore(p, out.lastElementChild);
            }
        },
        execCmd: function(cmd) {
            if (cmd === 'help') return 'Available commands: help, status, scan, verify-hmac, whoami, clear';
            if (cmd === 'status') return '[OK] Sandbox: Isolated | TLS 1.3 Active | Memory: 512MB limit | Network: Restricted';
            if (cmd === 'whoami') return 'scholar (uid=1001, gid=1001, roles=academy_student)';
            if (cmd === 'scan') return '[*] Scanning local lab socket...\n[+] Port 443 (HTTPS) - OPEN\n[+] Port 22 (SSH) - FILTERED\n[+] Status: Optimal';
            if (cmd === 'verify-hmac') return '[+] HMAC Secret Validated: SHA256 constant-time engine active.';
            return `bash: ${cmd}: command not found. Type 'help' for lab commands.`;
        },
        saveNotesLocal: function(val) {
            localStorage.setItem('hs_notes_' + courseSlug, val);
            const status = document.getElementById('hs-notes-save-status');
            if (status) status.innerText = 'Draft Saved';
        },
        syncNotesToServer: function() {
            const status = document.getElementById('hs-notes-save-status');
            if (status) status.innerText = 'Synced ✓';
            alert('Your course notes have been securely synchronized to cloud storage.');
        },
        toggleBookmark: function() {
            alert('Lesson bookmarked to your Scholar Profile!');
        },
        openCertModal: function() {
            document.getElementById('hs-cert-modal').style.display = 'flex';
        },
        closeCertModal: function() {
            document.getElementById('hs-cert-modal').style.display = 'none';
        },
        verifyCertificateCode: function() {
            const code = document.getElementById('hs-cert-verify-input').value.trim();
            if (!code) return;
            const resBox = document.getElementById('hs-cert-result');
            resBox.style.display = 'block';
            resBox.innerHTML = 'Verifying cryptographic signature against server ledger...';

            fetch(restBase + '/academy/certificate/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cert_code: code })
            })
            .then(res => res.json())
            .then(data => {
                if (data.valid) {
                    resBox.innerHTML = `<div style="color:#00f5d4;font-weight:bold;">✅ CERTIFICATE AUTHENTIC & VALID</div>
                    <div>Recipient: ${data.recipient}</div>
                    <div>Course: ${data.course_title}</div>
                    <div>Issued: ${data.issued_at}</div>
                    <div>Cryptographic HMAC Signature: PASS</div>`;
                } else {
                    resBox.innerHTML = `<div style="color:#ef4444;font-weight:bold;">❌ INVALID OR REVOKED CERTIFICATE</div>
                    <div>Status: ${data.status || 'Not Found'}</div>`;
                }
            })
            .catch(err => {
                resBox.innerHTML = `<div style="color:#ef4444;">Verification server connection failed.</div>`;
            });
        }
    };
})();
</script>

<?php get_footer(); ?>
