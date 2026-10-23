/* ==== COMPONENT: FOOTER ==== */
export function footer() {
  const links = [
    { href: 'world.html',      label: 'О мире' },
    { href: 'races.html',      label: 'Расы' },
    { href: 'characters.html', label: 'Персонажи' },
    { href: 'timeline.html',   label: 'Хронология' },
    { href: 'atlas.html',      label: 'Атлас' },
    { href: 'conflict.html',   label: 'Дипломатия' },
    { href: 'compare.html',    label: 'Сравнить' },
    { href: 'mysteries.html',  label: 'Загадки' },
    { href: 'philosophy.html', label: 'Философия' },
    { href: 'quiz.html',       label: 'Тест' },
    { href: 'devlog.html',     label: 'Дневник' },
    { href: 'roadmap.html',    label: 'Roadmap' },
    { href: 'faq.html',        label: 'FAQ' }
  ];

  const linksHTML = links
    .map(l => `<a href="${l.href}">${l.label}</a>`)
    .join('');

  return `
    <footer class="footer">
      <div class="footer__links">${linksHTML}</div>
      <p>© 2025 Эхо Эйры · Андрей Коновалов (Lemono)</p>
      <p>Все права защищены. Мир Эйры создан и разрабатывается независимо.</p>
    </footer>
  `;
}