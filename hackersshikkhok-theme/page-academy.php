<?php
/**
 * Template Name: Hackers শিক্ষক Cybersecurity Academy & 3-Column LMS Player
 * Theme Presentation Layer for Courses, Levels 0-8, 3-Column LMS Player & Public Certificate Verification
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$current_user_id = get_current_user_id();
$user_xp = $current_user_id ? (int) get_user_meta( $current_user_id, '_hs_learning_xp', true ) : 0;
$wallet_data = \HackersShikkhok\Core\Users\UserEcosystem::get_wallet_summary( $current_user_id );
$rest_nonce = wp_create_nonce( 'wp_rest' );
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
                        <div class="hs-video-mockup">
                            <div class="hs-video-play-btn">▶</div>
                            <p>YouTube Companion Stream: <strong>@HackersShikkhok</strong></p>
                            <small>Hardware-isolated streaming with 1080p 60fps technical walkthrough</small>
                        </div>
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
                                <label><input type="radio" name="q1" value="1" /> hash_equals($a, $b) (Constant-Time Comparison)</label><br />
                                <label><input type="radio" name="q1" value="2" /> strcmp($a, $b)</label><br />
                                <label><input type="radio" name="q1" value="3" /> md5($a) == md5($b)</label>
                            </div>
                            <div class="hs-quiz-q">
                                <p><strong>2. What is the primary function of HMAC-SHA256 in certificate issuance?</strong></p>
                                <label><input type="radio" name="q2" value="0" /> Encrypting database passwords</label><br />
                                <label><input type="radio" name="q2" value="1" /> Compressing image files</label><br />
                                <label><input type="radio" name="q2" value="2" /> Guaranteeing data authenticity & tamper-proof integrity</label><br />
                                <label><input type="radio" name="q2" value="3" /> Client-side localStorage backup</label>
                            </div>
                            <button type="submit" class="hs-btn-submit-quiz">Submit Assessment for Authoritative Grading ➔</button>
                        </form>
                        <div id="hs-quiz-result" class="hs-quiz-result" style="display:none;"></div>
                    </div>
                </div>
            </div>

            <article class="hs-lesson-body">
                <h2>Lesson Notes & Implementation Guide</h2>
                <p>Zero-Trust Architecture assumes that threat actors may already exist within the network perimeter. All requests must be authenticated, authorized, and cryptographically verified before access is granted.</p>
                <div class="hs-code-snippet">
                    <pre><code>// Defensive validation & HMAC calculation
function generateSecurityProof(string $userId, string $certCode, string $secret): string {
    return hash_hmac('sha256', "{$userId}|{$certCode}", $secret);
}</code></pre>
                </div>
            </article>
        </section>

        <!-- COLUMN 3: Student Live Console, Notes & Certificate Hub -->
        <aside class="hs-col-console" id="hs-console-col">
            <div class="hs-panel-header">
                <h3>📝 Live Scholar Notebook</h3>
                <span class="hs-pill-saved" id="hs-note-save-status">Synced to Cloud</span>
            </div>
            <div class="hs-notepad-container">
                <textarea id="hs-student-notes" placeholder="Take personal markdown study notes for this lesson... Auto-saves to your account." oninput="HS_ACADEMY.autoSaveNotes()"></textarea>
            </div>

            <div class="hs-cert-card" id="hs-cert-snapshot-card">
                <div class="hs-cert-badge">🏅 VERIFIED CREDENTIAL</div>
                <h4>Ethical Security Scholar</h4>
                <p>Complete 100% of curriculum and achieve >= 75% on the Final Exam to unlock your deterministic HMAC certificate.</p>
                <div class="hs-cert-progress-bar">
                    <div class="hs-progress-fill" id="hs-console-progress-fill" style="width: 35%;"></div>
                </div>
                <button class="hs-btn-download-cert" id="hs-btn-get-cert" onclick="HS_ACADEMY.generateCertNow()">🎓 Generate Official Certificate</button>
            </div>

            <div class="hs-resources-card">
                <h4>📦 Lesson Artifacts</h4>
                <ul class="hs-resource-list">
                    <li><a href="#" download>📄 Threat-Matrix-CheatSheet.pdf</a></li>
                    <li><a href="#" download>💻 firewall-rules-starter.sh</a></li>
                    <li><a href="#" download>🛡️ hmac-verifier.py</a></li>
                </ul>
            </div>
        </aside>
    </main>

    <div class="hs-modal" id="hs-cert-modal" style="display:none;">
        <div class="hs-modal-backdrop" onclick="HS_ACADEMY.closeCertModal()"></div>
        <div class="hs-modal-dialog">
            <div class="hs-modal-header">
                <h3>📜 Verify Certificate Authenticity</h3>
                <button class="hs-modal-close" onclick="HS_ACADEMY.closeCertModal()">✕</button>
            </div>
            <div class="hs-modal-body">
                <p>Enter the Certificate ID to verify cryptographic proof against the Hackers শিক্ষক Ledger:</p>
                <div class="hs-modal-input-row">
                    <input type="text" id="hs-modal-cert-id" placeholder="e.g. HS-CERT-A1B2C3D4E5" />
                    <button class="hs-btn-search-cert" onclick="HS_ACADEMY.performCertLookup()">Verify Signature</button>
                </div>
                <div id="hs-cert-lookup-result" style="display:none;" class="hs-cert-result-card"></div>
            </div>
        </div>
    </div>
</div>
