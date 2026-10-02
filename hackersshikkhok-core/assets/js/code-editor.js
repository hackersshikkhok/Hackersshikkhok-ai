(function () {
  'use strict';
  document.addEventListener('click', function (e) {
    const copyBtn = e.target.closest('[data-hs-copy-code]');
    if (!copyBtn) return;
    const targetId = copyBtn.getAttribute('data-hs-copy-code');
    const codeEl = document.getElementById(targetId);
    if (codeEl && navigator.clipboard) {
      navigator.clipboard.writeText(codeEl.textContent || '');
      copyBtn.textContent = 'Copied!';
    }
  });
})();
