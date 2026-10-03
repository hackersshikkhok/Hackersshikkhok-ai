<?php
/**
 * Template Name: Hackers শিক্ষক Cyber Desktop & Web OS Workspace
 * Brand: Hackers শিক্ষক (https://hackersshikkhok.com)
 */

declare(strict_types=1);

get_header();

$wallet = \HackersShikkhok\Core\Users\UserEcosystem::get_wallet_summary( get_current_user_id() );
$rest_nonce = wp_create_nonce( 'wp_rest' );
?>

<div class="hs-cyber-desktop-root" data-theme="cyber-os">
    <!-- Desktop Canvas & Application Icons -->
    <div class="hs-desktop-canvas" id="hs-desktop-canvas">
        <div class="hs-desktop-icons-grid">
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('academy', '📚 Cyber Academy LMS')">
                <div class="hs-icon-badge">🎓</div>
                <span>Academy LMS</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('codelab', '💻 Multi-Language Code Lab')">
                <div class="hs-icon-badge">💻</div>
                <span>Code Lab</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('hardware', '⚡ Hardware & IoT Lab')">
                <div class="hs-icon-badge">⚡</div>
                <span>Hardware Lab</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('engineering', '📐 Engineering Calculators')">
                <div class="hs-icon-badge">📐</div>
                <span>Engineering</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('creator', '🎨 Creator Studio')">
                <div class="hs-icon-badge">🎨</div>
                <span>Creator Studio</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('terminal', '🛡️ Zero-Trust Security Shell')">
                <div class="hs-icon-badge">📟</div>
                <span>Cyber Shell</span>
            </div>
            <div class="hs-desktop-icon" onclick="HS_DESKTOP.openApp('diagnostics', '🔍 Device Diagnostics Lab')">
                <div class="hs-icon-badge">🔍</div>
                <span>Device Lab</span>
            </div>
        </div>

        <!-- Dynamic Desktop Window Container -->
        <div id="hs-window-container"></div>
    </div>

    <!-- Desktop Taskbar -->
    <footer class="hs-desktop-taskbar">
        <button class="hs-start-btn" onclick="HS_DESKTOP.toggleStartMenu()">
            <span class="hs-logo-glow">🛡️</span> <strong>Hackers শিক্ষক OS</strong>
        </button>

        <div class="hs-taskbar-apps" id="hs-taskbar-active-apps"></div>

        <div class="hs-taskbar-tray">
            <span class="hs-tray-item" title="Command Palette (Ctrl + K)" onclick="HS_DESKTOP.openCommandPalette()">⌨️ Ctrl+K</span>
            <span class="hs-tray-item">⚡ <?php echo esc_html( (string) $wallet['points'] ); ?> XP</span>
            <span class="hs-tray-item" id="hs-desktop-clock">12:00</span>
        </div>
    </footer>

    <!-- Global Command Palette Modal (Ctrl + K) -->
    <div class="hs-cmd-palette-backdrop" id="hs-cmd-palette" style="display:none;">
        <div class="hs-cmd-palette-card">
            <div class="hs-cmd-input-wrap">
                <span>🔍</span>
                <input type="text" id="hs-cmd-input" placeholder="Type a command, course, or tool... (e.g. 'academy', 'ohms law', 'tools')" oninput="HS_DESKTOP.filterCommands(this.value)" />
                <kbd>ESC</kbd>
            </div>
            <div class="hs-cmd-results" id="hs-cmd-results">
                <div class="hs-cmd-item" onclick="HS_DESKTOP.execCmd('academy')">📚 Launch Academy LMS Course Player</div>
                <div class="hs-cmd-item" onclick="HS_DESKTOP.execCmd('codelab')">💻 Launch Multi-Language Code Playground</div>
                <div class="hs-cmd-item" onclick="HS_DESKTOP.execCmd('hardware')">⚡ Open ESP32 & IoT Hardware Hub</div>
                <div class="hs-cmd-item" onclick="HS_DESKTOP.execCmd('engineering')">📐 Open Ohm's Law & CNC Calculators</div>
                <div class="hs-cmd-item" onclick="HS_DESKTOP.execCmd('creator')">🎨 Open Creator Studio (Audio/Video/Image)</div>
            </div>
        </div>
    </div>
</div>

<script>
window.HS_DESKTOP = (function() {
    let activeWindows = {};

    function updateClock() {
        const d = new Date();
        const el = document.getElementById('hs-desktop-clock');
        if (el) el.innerText = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Listen for Ctrl+K
    window.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            HS_DESKTOP.toggleCommandPalette();
        }
        if (e.key === 'Escape') {
            document.getElementById('hs-cmd-palette').style.display = 'none';
        }
    });

    return {
        openApp: function(appId, title) {
            if (activeWindows[appId]) return;
            activeWindows[appId] = true;

            const win = document.createElement('div');
            win.className = 'hs-desktop-window';
            win.id = 'win-' + appId;
            win.innerHTML = `
                <div class="hs-win-header">
                    <span class="hs-win-title">${title}</span>
                    <div class="hs-win-controls">
                        <button onclick="HS_DESKTOP.closeApp('${appId}')">✕</button>
                    </div>
                </div>
                <div class="hs-win-content">
                    <iframe src="<?php echo esc_url( home_url( '/' ) ); ?>?hs_embed=${appId}" style="width:100%;height:100%;border:none;"></iframe>
                </div>
            `;
            document.getElementById('hs-window-container').appendChild(win);
        },
        closeApp: function(appId) {
            const win = document.getElementById('win-' + appId);
            if (win) win.remove();
            delete activeWindows[appId];
        },
        toggleCommandPalette: function() {
            const pal = document.getElementById('hs-cmd-palette');
            pal.style.display = (pal.style.display === 'none') ? 'flex' : 'none';
            if (pal.style.display === 'flex') {
                setTimeout(() => document.getElementById('hs-cmd-input').focus(), 50);
            }
        },
        openCommandPalette: function() {
            document.getElementById('hs-cmd-palette').style.display = 'flex';
            setTimeout(() => document.getElementById('hs-cmd-input').focus(), 50);
        },
        filterCommands: function(q) {
            const items = document.querySelectorAll('.hs-cmd-item');
            items.forEach(item => {
                item.style.display = item.innerText.toLowerCase().includes(q.toLowerCase()) ? 'block' : 'none';
            });
        },
        execCmd: function(target) {
            this.openApp(target, target.toUpperCase());
            document.getElementById('hs-cmd-palette').style.display = 'none';
        },
        toggleStartMenu: function() {
            this.toggleCommandPalette();
        }
    };
})();
</script>

<?php
get_footer();
