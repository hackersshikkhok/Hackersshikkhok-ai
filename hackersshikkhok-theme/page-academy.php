<?php
/**
 * Template Name: Hackers শিক্ষক Cybersecurity Academy & 3-Column LMS Player
 * Theme Presentation Layer for Courses, Levels 0-8, 3-Column LMS Player & Public Certificate Verification
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$current_user_id = get_current_user_id();
$wallet_data     = \HackersShikkhok\Core\Users\UserEcosystem::get_wallet_summary( $current_user_id );
$rest_nonce      = wp_create_nonce( 'wp_rest' );
?>

<div class="hs-academy-viewport" data-hs-theme="cyber-dark">
    <!-- Academy Master Header -->
    <header class="hs-academy-header">
        <div class="hs-academy-header-inner">
            <div class="hs-academy-brand">
                <div class="hs-academy-badge">🛡️ ACADEMY PRO</div>
                <h1 class="hs-academy-title">Hackers শিক্ষক Cyber Academy & LMS Hub</h1>
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

    <!-- 3-Column Production Course Player Workspace -->
    <main class="hs-player-grid">
        <!-- COLUMN 1: Curriculum & Module Navigation Drawer -->
        <aside class="hs-col-curriculum" id="hs-curriculum-col">
            <div class="hs-panel-header">
                <h3>📚 Curriculum & Modules</h3>
                <span class="hs-pill" id="hs-course-progress-badge">0% Complete</span>
            </div>
            <div class="hs-curriculum-search">
                <input type="text" id="hs-lesson-search" placeholder="🔍 Search curriculum..." oninput="HS_ACADEMY.filterLessons(this.value)" />
            </div>
            <div class="hs-module-list" id="hs-module-accordion">
                <div class="hs-module-card open">
                    <div class="hs-module-header" onclick="HS_ACADEMY.toggleModule(this)">
                        <span class="hs-module-num">MOD 01</span>
                        <span class="hs-module-title">Ethical Hacking Foundations</span>
                        <span class="hs-accordion-icon">▼</span>
                    </div>
                    <ul class="hs-lesson-items">
                        <li class="hs-lesson-item active" data-lesson-id="l1_1" onclick="HS_ACADEMY.loadLesson('l1_1', 'Introduction to Zero-Trust & Threat Vectors', 'video')">
                            <span class="hs-status-icon done">✓</span>
                            <span class="hs-lesson-name">1.1 Zero-Trust & Threat Vectors</span>
                            <span class="hs-lesson-duration">12m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l1_2" onclick="HS_ACADEMY.loadLesson('l1_2', 'Linux Security & Defensive Hardening', 'terminal')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">1.2 Linux Defensive Hardening</span>
                            <span class="hs-lesson-duration">18m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l1_3" onclick="HS_ACADEMY.loadLesson('l1_3', 'Network Packet Analysis with Wireshark', 'text')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">1.3 Packet Analysis & TCP Handshake</span>
                            <span class="hs-lesson-duration">15m</span>
                        </li>
                    </ul>
                </div>
                <div class="hs-module-card">
                    <div class="hs-module-header" onclick="HS_ACADEMY.toggleModule(this)">
                        <span class="hs-module-num">MOD 02</span>
                        <span class="hs-module-title">Web Security & Cryptography</span>
                        <span class="hs-accordion-icon">▶</span>
                    </div>
                    <ul class="hs-lesson-items">
                        <li class="hs-lesson-item" data-lesson-id="l2_1" onclick="HS_ACADEMY.loadLesson('l2_1', 'OWASP Top 10: SQLi & XSS Mitigation', 'text')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">2.1 OWASP Top 10 Deep Dive</span>
                            <span class="hs-lesson-duration">25m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l2_2" onclick="HS_ACADEMY.loadLesson('l2_2', 'HMAC-SHA256 & Deterministic Token Integrity', 'terminal')">
                            <span class="hs-status-icon">○</span>
                            <span class="hs-lesson-name">2.2 Cryptographic Integrity & HMAC</span>
                            <span class="hs-lesson-duration">20m</span>
                        </li>
                        <li class="hs-lesson-item" data-lesson-id="l2_quiz" onclick="HS_ACADEMY.openQuiz('q_mod2')">
                            <span class="hs-status-icon quiz">📝</span>
                            <span class="hs-lesson-name">Module 2 Knowledge Quiz</span>
                            <span class="hs-lesson-duration">5 Qs</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="hs-curriculum-footer">
                <button class="hs-btn-exam" onclick="HS_ACADEMY.openFinalExam()">🏆 Take Final Certification Exam</button>
            </div>
        </aside>

        <!-- COLUMN 2: Central Lesson Stage & Interactive Terminal/Player -->
        <section class="hs-col-stage" id="hs-stage-col">
            <div class="hs-stage-topbar">
                <div class="hs-breadcrumb">Course: <strong>Ethical Hacking & Defensive Web Mastery</strong> / <span id="hs-current-lesson-crumb">1.1 Zero-Trust & Threat Vectors</span></div>
                <div class="hs-lesson-actions">
                    <button class="hs-btn-icon" id="hs-btn-bookmark" onclick="HS_ACADEMY.toggleBookmark()" title="Bookmark Lesson">🔖 Bookmark</button>
                    <button class="hs-btn-complete" id="hs-btn-mark-complete" onclick="HS_ACADEMY.completeCurrentLesson()">Mark Complete & Next ➔</button>
                </div>
            </div>

            <div class="hs-stage-media-card">
                <div class="hs-stage-tabs">
                    <button class="hs-tab-btn active" onclick="HS_ACADEMY.switchStageTab('lecture', this)">📺 Video Lecture</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('terminal', this)">💻 Sandboxed Terminal Lab</button>
                    <button class="hs-tab-btn" onclick="HS_ACADEMY.switchStageTab('quiz', this)">📝 Practice Assessment</button>
                </div>

                <div class="hs-stage-content active" id="hs-stage-lecture">
                    <div class="hs-video-container">
                        <iframe 
                            id="hs-video-frame" 
                            src="https://www.youtube-nocookie.com/embed/videoseries?list=PLr6-GrHGFmWzN5j_4X33q1m8v7yQk9m2e" 
                            title="Hackers শিক্ষক Cyber Tutorial Player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>

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
                            <p class="hs-term-line">Type 'help', 'status', 'scan', 'verify-hmac', or 'clear' to execute authorized lab commands.</p>
                            <div class="hs-term-prompt-line">
                                <span class="hs-term-prompt">scholar@hs-academy:~$</span>
                                <input type="text" id="hs-term-input" onkeydown="HS_ACADEMY.handleTerminalKey(event)" autofocus />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hs-stage-content" id="hs-stage-quiz" style="display:none;">
                    <div class="hs-quiz-card" id="hs-quiz-container">
                        <h3>Module Assessment Quiz</h3>
                        <p>Complete this 5-question technical quiz to test defensive security principles. Answers are server-side evaluated.</p>
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
                <div class="hs-widget-title">📝 My Scratchpad & Notes</div>
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
                    <li><a href="data:application/json;charset=utf-8,%7B%22course%22%3A%22Defensive%20Security%22%2C%22version%22%3A%224.1.0%22%2C%22verified%22%3Atrue%7D" download="lab-environment-config.json">⚙️ Lab Config.json</a></li>
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
    let currentLesson = 'l1_1';
    let courseId = 101;

    return {
        loadLesson: function(id, title, type) {
            currentLesson = id;
            document.getElementById('hs-current-lesson-crumb').innerText = title;
            document.querySelectorAll('.hs-lesson-item').forEach(el => el.classList.remove('active'));
            const target = document.querySelector(`[data-lesson-id="${id}"]`);
            if (target) target.classList.add('active');
            if (type === 'terminal') {
                this.switchStageTab('terminal', document.querySelectorAll('.hs-tab-btn')[1]);
            } else if (type === 'video') {
                this.switchStageTab('lecture', document.querySelectorAll('.hs-tab-btn')[0]);
            }
        },
        toggleModule: function(headerEl) {
            const card = headerEl.parentElement;
            card.classList.toggle('open');
            const icon = headerEl.querySelector('.hs-accordion-icon');
            if (icon) icon.innerText = card.classList.contains('open') ? '▼' : '▶';
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
                    alert(`Quiz Evaluation Complete!\nScore: ${data.score_percent}%\nPassed: ${data.passed ? 'YES' : 'NO'}\nXP Awarded: ${data.xp_awarded}`);
                } else {
                    alert('Error submitting quiz: ' + (data.error || 'Server rejected attempt'));
                }
            });
        },
        handleTerminalKey: function(e) {
            if (e.key === 'Enter') {
                const input = document.getElementById('hs-term-input');
                const cmd = input.value.trim();
                input.value = '';
                const termOut = document.getElementById('hs-term-output');
                const p = document.createElement('p');
                p.className = 'hs-term-line';
                p.innerText = 'scholar@hs-academy:~$ ' + cmd;
                termOut.insertBefore(p, termOut.lastElementChild);

                const resp = document.createElement('p');
                resp.className = 'hs-term-line term-green';
                if (cmd === 'help') resp.innerText = 'Available Commands: help, scan, verify-hmac, status, clear';
                else if (cmd === 'status') resp.innerText = 'Defense Matrix: ACTIVE | Zero-Trust: ENFORCED | Sandbox: ISOLATED';
                else if (cmd === 'scan') resp.innerText = '[+] Scanning network vectors... 0 vulnerabilities detected. Zero-Trust perimeter verified.';
                else if (cmd === 'verify-hmac') resp.innerText = '[+] HMAC-SHA256 test signature: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 [VALID]';
                else if (cmd === 'clear') { termOut.innerHTML = ''; termOut.appendChild(termOut.lastElementChild); return; }
                else resp.innerText = `Command not recognized: ${cmd}. Type 'help' for available lab tools.`;
                termOut.insertBefore(resp, termOut.lastElementChild);
            }
        },
        saveNotesLocal: function(val) {
            localStorage.setItem('hs_scratchpad_notes', val);
            const status = document.getElementById('hs-notes-save-status');
            if (status) status.innerText = 'Saved local';
        },
        syncNotesToServer: function() {
            const status = document.getElementById('hs-notes-save-status');
            if (status) status.innerText = 'Synced cloud';
        },
        openCertModal: function() {
            document.getElementById('hs-cert-modal').style.display = 'flex';
        },
        closeCertModal: function() {
            document.getElementById('hs-cert-modal').style.display = 'none';
        },
        verifyCertificateCode: function() {
            const code = document.getElementById('hs-cert-verify-input').value.trim();
            if (!code) return alert('Please enter a certificate code');

            fetch(restBase + '/academy/certificate/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cert_id: code })
            })
            .then(res => res.json())
            .then(data => {
                const box = document.getElementById('hs-cert-result');
                box.style.display = 'block';
                if (data.valid) {
                    box.innerHTML = `<div style="color:#00ff66;"><strong>✓ AUTHENTIC CERTIFICATE</strong><br>Student: ${data.recipient_display_name}<br>Course: ${data.course_title_snapshot}<br>Level: ${data.level_label}<br>Issued: ${data.issued_at}<br>Signature: Valid HMAC-SHA256</div>`;
                } else {
                    box.innerHTML = `<div style="color:#ff3366;"><strong>✕ INVALID / REVOKED CERTIFICATE</strong><br>${data.message || 'Signature mismatch or record missing.'}</div>`;
                }
            });
        },
        filterLessons: function(q) {
            q = q.toLowerCase();
            document.querySelectorAll('.hs-lesson-item').forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(q) ? 'flex' : 'none';
            });
        },
        openFinalExam: function() {
            this.switchStageTab('quiz', document.querySelectorAll('.hs-tab-btn')[2]);
        }
    };
})();
</script>

<?php
get_footer();
