/* ==== COLORED SPARKS ON REGION CARDS ==== */
export function initRegionSparks() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || reduced) return;

  const cards = document.querySelectorAll('.region-card');
  if (!cards.length) return;

  // Цвета регионов (соответствуют CSS .imp-*)
  const colors = {
    'eldarhalm': '#c9a227',
    'imirdal':   '#6fa8dc',
    'aenordal':  '#6aa84f',
    'swamp':     '#45818e',
    'jauhar':    '#d4a76a',
    'heavenly':  '#b4a7d6'
  };

  // Определяем регион из href
  function getRegionColor(card) {
    const href = card.getAttribute('href') || '';
    for (const key in colors) {
      if (href.includes(key)) return colors[key];
    }
    return '#c9a227';
  }

  cards.forEach(card => {
    const color = getRegionColor(card);
    let lastSpark = 0;

    card.addEventListener('mousemove', (e) => {
      // Не сыпем искры слишком часто
      const now = Date.now();
      if (now - lastSpark < 80) return;
      lastSpark = now;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const spark = document.createElement('span');
      spark.className = 'region-card__spark';
      spark.style.left = x + 'px';
      spark.style.top  = y + 'px';
      spark.style.background = color;
      spark.style.boxShadow  = `0 0 8px ${color}`;

      // Случайное направление
      const angle = Math.random() * Math.PI * 2;
      const dist  = 20 + Math.random() * 40;
      spark.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      spark.style.setProperty('--sy', Math.sin(angle) * dist + 'px');

      card.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    });
  });
}