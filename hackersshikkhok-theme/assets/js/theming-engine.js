/**
 * HackersShikkhok — Dynamic Theming & Power Level Transition Controller
 * Brand: HackersShikkhok.com
 * Module: LMS Theming & Accessibility Engine
 */

(function () {
  'use strict';

  var THEME_MAP = {
    'Web Hacking / OWASP': {
      className: 'theme-web-hacking',
      primary: '#00ff66',
      glow: 'rgba(0, 255, 102, 0.5)',
      secondary: '#052e16',
      label: 'Matrix Green'
    },
    'Social Engineering & Defense': {
      className: 'theme-social-defense',
      primary: '#ff9900',
      glow: 'rgba(255, 153, 0, 0.55)',
      secondary: '#451a03',
      label: 'Cyber Amber'
    },
    'Network & Red Teaming': {
      className: 'theme-network-red-team',
      primary: '#ff0055',
      glow: 'rgba(255, 0, 85, 0.55)',
      secondary: '#4c0519',
      label: 'Crimson Red'
    },
    'Forensics & Blue Team': {
      className: 'theme-forensics-blue-team',
      primary: '#00f0ff',
      glow: 'rgba(0, 240, 255, 0.5)',
      secondary: '#082f49',
      label: 'Electric Blue'
    },
    'Defensive Systems & Binary Hardening': {
      className: 'theme-defensive-systems',
      primary: '#a100ff',
      glow: 'rgba(161, 0, 255, 0.6)',
      secondary: '#3b0764',
      label: 'Vibrant Neon Purple'
    }
  };

  function initThemingEngine() {
    var stage = document.querySelector('.hs-cyber-lms-stage') || document.body;
    var categorySelect = document.getElementById('hs-theme-category-picker');
    var powerLevelToggle = document.getElementById('hs-power-level-badge');
    var fontScaleButtons = document.querySelectorAll('[data-font-scale]');
    var contrastToggle = document.getElementById('hs-contrast-toggle');

    // 1. Dynamic Category Theme Switcher
    window.setCyberCategoryTheme = function (categoryName) {
      var cfg = THEME_MAP[categoryName] || THEME_MAP['Web Hacking / OWASP'];
      Object.keys(THEME_MAP).forEach(function (cat) {
        stage.classList.remove(THEME_MAP[cat].className);
      });
      stage.classList.add(cfg.className);

      // Instant CSS Variable Injection without reload
      document.documentElement.style.setProperty('--cyber-primary', cfg.primary);
      document.documentElement.style.setProperty('--cyber-glow', cfg.glow);
      document.documentElement.style.setProperty('--cyber-secondary', cfg.secondary);

      var badge = document.getElementById('hs-current-theme-label');
      if (badge) {
        badge.textContent = cfg.label;
        badge.style.color = cfg.primary;
        badge.style.borderColor = cfg.primary;
      }
    };

    if (categorySelect) {
      categorySelect.addEventListener('change', function (e) {
        window.setCyberCategoryTheme(e.target.value);
      });
    }

    // 2. Power Level State Transitions
    window.setCyberPowerLevel = function (level) {
      var hudContainer = document.querySelector('.hs-cyber-lms-stage') || document.body;
      hudContainer.classList.remove('hud-minimalist', 'hud-cyberpunk-overclock', 'hud-ide-developer');

      var primaryColor = '#94a3b8';
      var modeTitle = 'Low Power';

      if (level === 'high') {
        hudContainer.classList.add('hud-cyberpunk-overclock');
        primaryColor = '#00ff66';
        modeTitle = 'Hacking Overclock (3x)';
      } else if (level === 'coding') {
        hudContainer.classList.add('hud-ide-developer');
        primaryColor = '#10b981';
        modeTitle = 'Coding IDE Mode';
      } else {
        hudContainer.classList.add('hud-minimalist');
        modeTitle = 'Low Power (Free)';
      }

      var powerBadgeText = document.getElementById('hs-power-level-text');
      if (powerBadgeText) {
        powerBadgeText.textContent = modeTitle;
        powerBadgeText.style.color = primaryColor;
      }
    };

    // 3. Accessibility Typography Scaler
    fontScaleButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var scale = btn.getAttribute('data-font-scale');
        stage.classList.remove('text-scale-sm', 'text-scale-md', 'text-scale-lg');
        if (scale !== 'reset') {
          stage.classList.add('text-scale-' + scale);
        }
      });
    });

    if (contrastToggle) {
      contrastToggle.addEventListener('click', function () {
        stage.classList.toggle('high-contrast-mode');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initThemingEngine);
})();
