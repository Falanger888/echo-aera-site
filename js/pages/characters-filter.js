/* ==== CHARACTERS FILTER ==== */
export function initCharactersFilter() {
  const filtersEl = document.getElementById('charFilters');
  const gridEl    = document.getElementById('charsGrid');
  const emptyEl   = document.getElementById('charsEmpty');
  if (!filtersEl || !gridEl) return;

  const buttons = filtersEl.querySelectorAll('.timeline-legend__item');
  const cards   = gridEl.querySelectorAll('.char-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visible = 0;
      cards.forEach(card => {
        const race = card.dataset.race || '';
        const show = filter === 'all' || race === filter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (emptyEl) emptyEl.style.display = visible === 0 ? 'block' : 'none';
    });
  });
}