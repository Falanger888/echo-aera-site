/* ==== REGION PAGE RENDERER ==== */
import { regions, regionOrder } from '../data/regions.js';

function getRegionFromUrl() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (!id) return null;
  return regions[id] ? regions[id] : null;
}

function getNeighbors(slug) {
  const i = regionOrder.indexOf(slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: regions[regionOrder[(i - 1 + regionOrder.length) % regionOrder.length]],
    next: regions[regionOrder[(i + 1) % regionOrder.length]]
  };
}

function renderRegion(region) {
  console.log('[region] рендерим:', region.slug);

  const { prev, next } = getNeighbors(region.slug);

  // ==== HERO ====
  const heroBg = document.querySelector('.region-hero__bg');
  if (heroBg) {
    heroBg.dataset.label = region.art || '';
    heroBg.dataset.region = region.slug;

    const heroImg = heroBg.querySelector('img');
    if (heroImg) {
      heroImg.src = region.art || '';
      heroImg.alt = region.title || '';
      heroImg.onload  = () => heroBg.classList.add('loaded');
      heroImg.onerror = () => heroImg.remove();
    }
  }

  const labelEl = document.querySelector('.region-hero__label');
  if (labelEl) labelEl.textContent = region.label || '';

  const titleEl = document.querySelector('.region-hero__title');
  if (titleEl) titleEl.textContent = region.title || '';

  const subtitleEl = document.querySelector('.region-hero__subtitle');
  if (subtitleEl) subtitleEl.textContent = region.subtitle || '';

  document.title = `${region.title} — Эхо Эйры`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = region.subtitle || '';

  // ==== BREADCRUMBS ====
  const crumbCurrent = document.getElementById('regionBreadcrumbCurrent');
  if (crumbCurrent) {
    crumbCurrent.textContent = region.title || '';
  } else {
    console.warn('[region] не найден #regionBreadcrumbCurrent');
  }

  // ==== FACTS ====
  const factsEl = document.querySelector('.region-facts');
  if (factsEl && region.facts) {
    factsEl.innerHTML = region.facts.map(f => `
      <div class="region-facts__item">
        <span class="region-facts__label">${f.label}</span>
        <span class="region-facts__value">${f.value}</span>
      </div>
    `).join('');
  }

  // ==== DESCRIPTION ====
  const descEl = document.querySelector('.region-description');
  if (descEl && region.description) {
    descEl.innerHTML = region.description.map(p => `<p>${p}</p>`).join('');
  }

  // ==== CITIES ====
  const citiesEl = document.querySelector('.region-cities');
  if (citiesEl && region.cities) {
    citiesEl.innerHTML = region.cities.map(c => `
      <div class="city-card">
        <div class="city-card__role">${c.role}</div>
        <div class="city-card__name">${c.name}</div>
        <p class="city-card__desc">${c.desc}</p>
      </div>
    `).join('');
  }

  // ==== RULERS ====
  const rulersEl = document.querySelector('.region-rulers');
  if (rulersEl && region.rulers) {
    rulersEl.innerHTML = region.rulers.map(r => `
      <div class="char-card reveal">
        <div class="char-card__body">
          <div class="char-card__role">${r.role}</div>
          <div class="char-card__name">${r.name}</div>
          ${r.epithet ? `<div class="char-card__epithet">${r.epithet}</div>` : ''}
        </div>
      </div>
    `).join('');
  }

  // ==== LINKS ====
  const linksEl = document.querySelector('.region-links');
  if (linksEl && region.links) {
    linksEl.innerHTML = region.links.map(l => `<li>${l}</li>`).join('');
  }

  // ==== NAV ====
  const navEl = document.querySelector('.region-nav');
  if (navEl && prev && next) {
    navEl.innerHTML = `
      <a href="region.html?id=${prev.slug}" class="region-nav__link">
        <span class="region-nav__hint">← Предыдущий регион</span>
        <span class="region-nav__title">${prev.title}</span>
      </a>
      <a href="region.html?id=${next.slug}" class="region-nav__link region-nav__link--next">
        <span class="region-nav__hint">Следующий регион →</span>
        <span class="region-nav__title">${next.title}</span>
      </a>
    `;
  }
}

export function initRegionPage() {
  const hero = document.querySelector('.region-hero');
  if (!hero) return;

  const region = getRegionFromUrl();
  console.log('[region] id из URL:', new URLSearchParams(location.search).get('id'));
  console.log('[region] найден:', region ? region.slug : 'НЕТ');

  if (!region) {
    const t = document.querySelector('.region-hero__title');
    if (t) t.textContent = 'Регион не найден';
    const s = document.querySelector('.region-hero__subtitle');
    if (s) s.textContent = 'Такого региона нет на карте Эйры.';
    return;
  }

  renderRegion(region);
}