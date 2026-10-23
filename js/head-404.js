(function () {
  var css = ['reset', 'variables', 'base', 'nav', 'sections', 'footer', 'pages', 'effects', '404', 'responsive'];
  var head = document.head;
  for (var i = 0; i < css.length; i++) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/' + css[i] + '.css';
    head.appendChild(link);
  }
})();