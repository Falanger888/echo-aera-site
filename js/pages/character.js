/* ==== CHARACTER PAGE RENDERER ==== */
import { characters, characterOrder } from '../data/characters.js';

function getCharacterFromUrl() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  return characters[id] ? characters[id] : null;
}

function getNeighbors(slug) {
  const i = characterOrder.indexOf(slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: characters[characterOrder[(i - 1 + characterOrder.length) % characterOrder.length]],
    next: characters[characterOrder[(i + 1) % characterOrder.length]]
  };
}

function renderCharacter(c) {
  const { prev, next } = getNeighbors(c.slug);

  // HERO
  const heroBg = document.querySelector('.character-hero__bg');
  if (heroBg) {
    heroBg.dataset.label = c.art;
    heroBg.dataset.race = c.race;
    const heroImg = heroBg.querySelector('img');
    if (heroImg) {
      heroImg.src = c.art;
      heroImg.alt = c.name;
      heroImg.onload = () => heroBg.classList.add('loaded');
      heroImg.onerror = () => heroImg.remove();
    }
  }

  document.querySelector('.character-hero__label').textContent = c.raceLabel;
  document.querySelector('.character-hero__title').textContent = c.name;
    const crumbCurrent = document.querySelector('#characterBreadcrumbs .breadcrumbs__current');
  if (crumbCurrent) crumbCurrent.textContent = c.name;
  const epithetEl = document.querySelector('.character-hero__subtitle');
  epithetEl.textContent = c.epithet
    ? `${c.role}. ${c.epithet}`
    : c.role;

  document.title = `${c.name} — Эхо Эйры`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = c.summary;

  // FACTS
  const factsEl = document.querySelector('.character-facts');
  factsEl.innerHTML = c.facts.map(f => `
    <div class="character-facts__item">
      <span class="character-facts__label">${f.label}</span>
      <span class="character-facts__value">${f.value}</span>
    </div>
  `).join('');

  // BIO
  const bioEl = document.querySelector('.character-bio');
  bioEl.innerHTML = c.bio.map(p => `<p>${p}</p>`).join('');

  // СВЯЗАННЫЕ
  const relatedEl = document.querySelector('.character-related');
  if (c.related && c.related.length) {
    relatedEl.innerHTML = c.related.map(r => `
      <a href="character.html?id=${r.slug}" class="char-card">
        <div class="char-card__body">
          <div class="char-card__role">${r.role}</div>
          <div class="char-card__name">${r.name}</div>
        </div>
      </a>
    `).join('');
  } else {
    relatedEl.innerHTML = '<p style="color: var(--text-dim); font-style: italic;">Нет известных связей.</p>';
  }

  // NAV
  const navEl = document.querySelector('.character-nav');
  if (prev && next) {
    navEl.innerHTML = `
      <a href="character.html?id=${prev.slug}" class="character-nav__link">
        <span class="character-nav__hint">← Предыдущий</span>
        <span class="character-nav__title">${prev.name}</span>
      </a>
      <a href="character.html?id=${next.slug}" class="character-nav__link character-nav__link--next">
        <span class="character-nav__hint">Следующий →</span>
        <span class="character-nav__title">${next.name}</span>
      </a>
    `;
  }
}

export function initCharacterPage() {
  if (!document.querySelector('.character-hero')) return;

  const c = getCharacterFromUrl();

  if (!c) {
    document.querySelector('.character-hero__title').textContent = 'Персонаж не найден';
    document.querySelector('.character-hero__subtitle').textContent =
      'Такого персонажа нет в хрониках Эйры.';
    return;
  }

  renderCharacter(c);
}