(function () {
  'use strict';
  window.HackersShikkhokSandbox = {
    compileSrcDoc: function (html, css, js) {
      return '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; script-src \'unsafe-inline\'; img-src data: https:;"><style>' + css + '</style></head><body>' + html + '<script>' + js + '<\/script></body></html>';
    }
  };
})();
