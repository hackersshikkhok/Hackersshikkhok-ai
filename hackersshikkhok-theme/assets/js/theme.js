(function () {
  'use strict';
  const scrollBtn = document.querySelector('[data-hs-scroll-top]');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
