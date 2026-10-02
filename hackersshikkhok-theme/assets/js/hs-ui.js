(function () {
  'use strict';
  window.HS_UI = {
    setThemePreset: function (preset) {
      document.documentElement.setAttribute('data-hs-preset', preset);
    }
  };
})();
