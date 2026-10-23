/* ==== HEAD: единое подключение CSS ==== */
(function () {
  var head = document.head || document.getElementsByTagName('head')[0];

  // ============ FAVICON ============
  var iconLinks = [
    { rel: 'apple-touch-icon', sizes: '57x57', href: 'icons/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: 'icons/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: 'icons/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: 'icons/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: 'icons/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: 'icons/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: 'icons/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: 'icons/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: 'icons/apple-icon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'icons/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'icons/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'icons/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'icons/favicon-16x16.png' },
    { rel: 'manifest', href: 'icons/manifest.json' },
    { rel: 'msapplication-TileColor', content: '#070a12' },
    { rel: 'msapplication-TileImage', content: 'icons/ms-icon-144x144.png' },
    { rel: 'theme-color', content: '#070a12' }
  ];

  for (var i = 0; i < iconLinks.length; i++) {
    var link = document.createElement('link');
    for (var key in iconLinks[i]) {
      if (key === 'content') link.setAttribute('content', iconLinks[i][key]);
      else link.setAttribute(key, iconLinks[i][key]);
    }
    head.appendChild(link);
  }

  // CSS
var css = [
  'reset',
  'variables',
  'base',
  'placeholders',
  'cards',         // ← НОВЫЙ (вместо devlog/team/contact)
  'nav',
  'hero',
  'sections',
  'world',
  'map',
  'footer',
  'pages',
  'page',
  'conflict',
  'compare',
  'quiz',
  'search',
  'atlas',
  'effects',
  'responsive'
];

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