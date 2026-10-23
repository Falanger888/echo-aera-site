/* ==== WORLD MAP INTERACTION ==== */
export function initWorldMap() {
  const map = document.querySelector('.world-map');
  if (!map) return;

  const titleEl = document.getElementById('mapPanelTitle');
  const descEl  = document.getElementById('mapPanelDesc');
  const ctaEl   = document.getElementById('mapPanelCta');
  const imgWrap = document.getElementById('mapPanelImg');
  const imgEl   = document.getElementById('mapPanelImgEl');

  const regions = map.querySelectorAll('.world-map__region');

  regions.forEach(region => {
    region.addEventListener('click', () => {
      const data = region.dataset;

      regions.forEach(r => r.classList.remove('active'));
      region.classList.add('active');

      titleEl.textContent = data.title || '';
      descEl.textContent  = data.desc  || '';

      // Статус региона — добавляем в панель
      const statusMap = {
        eldarhalm: { label: 'Фракция', cls: '' },
        imirdal:   { label: 'Фракция', cls: '' },
        aenordal:  { label: 'Фракция', cls: '' },
        swamp:     { label: 'Фракция', cls: '' },
        jauhar:    { label: 'Изгой',   cls: 'map-panel__status--outcast' },
        heavenly:  { label: 'Наблюдатель', cls: 'map-panel__status--observer' }
      };

      const status = statusMap[data.region];
      if (status) {
        let statusEl = document.querySelector('.map-panel__status');
        if (!statusEl) {
          statusEl = document.createElement('div');
          statusEl.className = 'map-panel__status';
          const labelEl = document.querySelector('.map-panel__label');
          if (labelEl && labelEl.parentNode) {
            labelEl.parentNode.insertBefore(statusEl, labelEl);
          }
        }
        statusEl.className = 'map-panel__status ' + (status.cls || '');
        statusEl.textContent = status.label;
      }

      if (data.region) {
        ctaEl.href = `region.html?id=${data.region}`;
        ctaEl.style.display = 'inline-block';
      } else {
        ctaEl.style.display = 'none';
      }

      imgWrap.classList.remove('loaded');
      imgWrap.dataset.label = `images/regions/${data.region}.jpg`;
      imgEl.src = `images/regions/${data.region}.jpg`;
      imgEl.alt = data.title || '';
      imgEl.onload  = () => imgWrap.classList.add('loaded');
      imgEl.onerror = () => imgEl.removeAttribute('src');
    });
  });
}