(function () {
  'use strict';
  window.HackersShikkhokTools = {
    formatJson: function (raw) {
      return JSON.stringify(JSON.parse(raw), null, 2);
    }
  };
})();
