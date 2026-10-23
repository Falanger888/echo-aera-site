/* ==== WORLD MAP INTERACTION ==== */
export function initWorldMap() {
  const map = document.querySelector('.world-map');
  const panel = document.getElementById('mapPanel');
  if (!map || !panel) return;

  const titleEl = document.getElementById('mapPanelTitle');
  const descEl  = document.getElementById('mapPanelDesc');
  const ctaEl   = document.getElementById('mapPanelCta');
  const imgWrap = document.getElementById('mapPanelImg');
  const imgEl   = document.getElementById('mapPanelImgEl');

  const regions = map.querySelectorAll('.world-map__region');

  regions.forEach(region => {
    region.addEventListener('click', () => {
      const data = region.dataset;

      // Подсветка
      regions.forEach(r => r.classList.remove('active'));
      region.classList.add('active');

      // Заголовок и описание
      titleEl.textContent = data.title || '';
      descEl.textContent  = data.desc  || '';

      // Кнопка-ссылка
      if (data.file) {
        ctaEl.href = `region-${data.file}.html`;
        ctaEl.style.display = 'inline-block';
      } else {
        ctaEl.style.display = 'none';
      }

      // Сброс картинки панели
      imgWrap.classList.remove('loaded');
      imgWrap.dataset.label = `images/regions/${data.file}.jpg`;
      imgEl.src = `images/regions/${data.file}.jpg`;
      imgEl.alt = data.title || '';
      imgEl.onload  = () => imgWrap.classList.add('loaded');
      imgEl.onerror = () => imgEl.removeAttribute('src');
    });
  });
}