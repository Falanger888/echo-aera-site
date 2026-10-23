/* ==== TIMELINE FILTER (multi-imp) ==== */
export function initTimeline() {
  const legend = document.querySelectorAll('.timeline-legend__item');
  const items  = document.querySelectorAll('.timeline__item');
  const empty  = document.getElementById('timelineEmpty');

  if (!legend.length || !items.length) return;

  legend.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';

      legend.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      let visible = 0;
      items.forEach(item => {
        const imps = (item.dataset.imp || '').split(/\s+/);
        const show = filter === 'all'
          || imps.includes(filter)
          || imps.includes('neutral');

        item.classList.toggle('hidden', !show);
        if (show) visible++;
      });

      if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
}