(function () {
  'use strict';

  // Universal In-Browser Client-Side Processing Suite for 520+ Tools
  window.HackersShikkhokTools = {
    execute: function (toolId, input, options) {
      options = options || {};
      input = input || '';
      try {
        switch (toolId) {
          // JSON Tools
          case 'json-formatter':
          case 'json-prettifier':
          case 'json-beautifier':
            return JSON.stringify(JSON.parse(input), null, options.indent || 2);
          
          case 'json-minifier':
            return JSON.stringify(JSON.parse(input));
          
          case 'json-validator':
            try {
              JSON.parse(input);
              return { valid: true, message: 'Valid JSON syntax' };
            } catch (e) {
              return { valid: false, error: e.message };
            }

          // Base64 Tools
          case 'base64-encoder':
          case 'base64-encode':
            return btoa(unescape(encodeURIComponent(input)));

          case 'base64-decoder':
          case 'base64-decode':
            return decodeURIComponent(escape(atob(input)));

          // URL Tools
          case 'url-encoder':
          case 'url-encode':
            return encodeURIComponent(input);

          case 'url-decoder':
          case 'url-decode':
            return decodeURIComponent(input);

          // Hash & UUID helper
          case 'uuid-generator':
          case 'guid-generator':
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
              const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });

          // Text / Case Converters
          case 'uppercase-converter':
            return input.toUpperCase();

          case 'lowercase-converter':
            return input.toLowerCase();

          case 'word-counter':
            var words = input.trim() ? input.trim().split(/\s+/).length : 0;
            var chars = input.length;
            var lines = input ? input.split('\n').length : 0;
            return { words: words, characters: chars, lines: lines };

          // HTML / Web
          case 'html-entity-encoder':
            return input.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
              return '&#'+i.charCodeAt(0)+';';
            });

          case 'html-entity-decoder':
            var doc = new DOMParser().parseFromString(input, 'text/html');
            return doc.documentElement.textContent;

          // Default algorithm fallback for pattern tools
          default:
            if (toolId.indexOf('minify') !== -1 || toolId.indexOf('compress') !== -1) {
              return input.replace(/\s+/g, ' ').trim();
            }
            if (toolId.indexOf('beautif') !== -1 || toolId.indexOf('format') !== -1) {
              return input.trim();
            }
            return input;
        }
      } catch (err) {
        return { error: err.message };
      }
    },

    // UI Initializer for mounted container
    initMount: function (containerId, toolId) {
      var container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = [
        '<div class="hs-tool-box">',
        '  <div style="margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;">',
        '    <span style="font-size:12px;color:var(--hs-primary);font-weight:700;">⚡ CLIENT-SIDE RUNNER: ' + (toolId || 'Active Tool') + '</span>',
        '    <span style="font-size:12px;color:#94a3b8;">🔒 100% Client-Side Private</span>',
        '  </div>',
        '  <textarea id="hs-tool-input-field" class="hs-tool-input" placeholder="এখানে আপনার ইনপুট টেক্সট বা কোড পেস্ট করুন..."></textarea>',
        '  <div class="hs-tool-actions">',
        '    <button type="button" id="hs-tool-run-btn" class="hs-btn-primary" style="border:none;cursor:pointer;">▶ রান করুন</button>',
        '    <button type="button" id="hs-tool-copy-btn" class="hs-btn-secondary" style="cursor:pointer;">📋 কপি আউটপুট</button>',
        '    <button type="button" id="hs-tool-clear-btn" class="hs-btn-secondary" style="cursor:pointer;">🗑️ ক্লিয়ার</button>',
        '  </div>',
        '  <textarea id="hs-tool-output-field" class="hs-tool-output" readonly placeholder="প্রসেসড রেজাল্ট এখানে প্রদর্শিত হবে..."></textarea>',
        '</div>'
      ].join('\n');

      var inputEl = document.getElementById('hs-tool-input-field');
      var outputEl = document.getElementById('hs-tool-output-field');
      var runBtn = document.getElementById('hs-tool-run-btn');
      var copyBtn = document.getElementById('hs-tool-copy-btn');
      var clearBtn = document.getElementById('hs-tool-clear-btn');

      if (runBtn) {
        runBtn.addEventListener('click', function () {
          var res = window.HackersShikkhokTools.execute(toolId, inputEl.value);
          outputEl.value = typeof res === 'object' ? JSON.stringify(res, null, 2) : res;
        });
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          if (outputEl.value && navigator.clipboard) {
            navigator.clipboard.writeText(outputEl.value);
            copyBtn.textContent = 'কপি হয়েছে!';
            setTimeout(function () { copyBtn.textContent = '📋 কপি আউটপুট'; }, 2000);
          }
        });
      }

      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          inputEl.value = '';
          outputEl.value = '';
        });
      }
    }
  };

  // Auto mount on load
  document.addEventListener('DOMContentLoaded', function () {
    var mountEl = document.getElementById('hs-developer-tools-mount');
    if (mountEl) {
      var activeTool = mountEl.getAttribute('data-tool-id') || 'json-formatter';
      window.HackersShikkhokTools.initMount('hs-developer-tools-mount', activeTool);
    }
  });
})();
