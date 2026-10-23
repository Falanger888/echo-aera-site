/* ==== HEAD: только для пролога ==== */
(function () {
  var css = ['reset', 'variables', 'base', 'prologue'];

  var head = document.head || document.getElementsByTagName('head')[0];
  var base = 'css/';

  for (var i = 0; i < css.length; i++) {
    var href = base + css[i] + '.css';

    var preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'style';
    preload.href = href;
    head.appendChild(preload);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  }
})();