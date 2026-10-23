/* ==== COMPONENT: HEADER ==== */
export function header() {
  /* Основные пункты — всегда видны на десктопе */
  const primaryLinks = [
    { href: 'world.html',      label: 'О мире' },
    { href: 'characters.html', label: 'Персонажи' },
    { href: 'timeline.html',   label: 'Хронология' },
    { href: 'atlas.html',      label: 'Атлас' },
    { href: 'quiz.html',       label: 'Тест' },
    { href: 'devlog.html',     label: 'Дневник' }
  ];

  /* Дополнительные — видны только в бургере */
  const secondaryLinks = [
    { href: 'races.html',      label: 'Расы' },
    { href: 'conflict.html',   label: 'Дипломатия' },
    { href: 'compare.html',    label: 'Сравнить' },
    { href: 'mysteries.html',  label: 'Загадки' },
    { href: 'philosophy.html', label: 'Философия' },
    { href: 'roadmap.html',    label: 'Roadmap' },
    { href: 'faq.html',        label: 'FAQ' }
  ];

  const primaryHTML = primaryLinks
    .map(l => `<li class="nav__item"><a href="${l.href}">${l.label}</a></li>`)
    .join('');

  const secondaryHTML = secondaryLinks
    .map(l => `<li class="nav__item nav__item--secondary"><a href="${l.href}">${l.label}</a></li>`)
    .join('');

return `
    <nav id="nav" class="nav">
      <div class="nav__logo">
        <a href="index.html">
          <img src="icons/android-icon-72x72.png" alt="" class="nav__logo-icon">
          <span class="nav__logo-text">Эхо Эйры</span>
        </a>
      </div>
      <ul class="nav__links" id="navLinks">
        ${primaryHTML}
        ${secondaryHTML}
      </ul>
      <button class="nav__search" id="searchTrigger" aria-label="Поиск">
        <span class="nav__search-icon">⌕</span>
        <span class="nav__search-hint">Ctrl+K</span>
      </button>
      <button class="nav__toggle" id="navToggle" aria-label="Меню" aria-expanded="false">☰</button>
    </nav>
  `;
}