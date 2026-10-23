/* ==== ATLAS PAGE ==== */
import { cities } from '../data/cities.js';

export function initAtlas() {
  const grid = document.getElementById('atlasGrid');
  if (!grid) return;

  const filtersRegion = document.querySelectorAll('[data-filter-region]');
  const filtersType   = document.querySelectorAll('[data-filter-type]');
  const counter       = document.getElementById('atlasCounter');
  const empty         = document.getElementById('atlasEmpty');

  const state = {
    region: 'all',
    type: 'all'
  };

  function render() {
    const filtered = cities.filter(c => {
      const okRegion = state.region === 'all' || c.region === state.region;
      const okType   = state.type === 'all'   || c.type === state.type;
      return okRegion && okType;
    });

    if (counter) counter.textContent = `Городов: ${filtered.length}`;
    if (empty) empty.style.display = filtered.length === 0 ? 'block' : 'none';

    grid.innerHTML = filtered.map(c => `
      <a href="region.html?id=${c.region}" class="atlas-card reveal">
        <div class="atlas-card__type">${c.type}</div>
        <div class="atlas-card__name">${c.name}</div>
        <div class="atlas-card__region">${c.regionLabel}</div>
        <p class="atlas-card__desc">${c.desc}</p>
      </a>
    `).join('');

    // Reveal-эффект на новые карточки
    const reveals = grid.querySelectorAll('.reveal');
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 30);
    });
  }

  filtersRegion.forEach(btn => {
    btn.addEventListener('click', () => {
      state.region = btn.dataset.filterRegion;
      filtersRegion.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  filtersType.forEach(btn => {
    btn.addEventListener('click', () => {
      state.type = btn.dataset.filterType;
      filtersType.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  render();
}