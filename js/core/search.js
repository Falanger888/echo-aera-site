/* ==== SEARCH ==== */
import { searchIndex } from '../data/search-index.js';

export function initSearch() {
  // Кнопка в шапке
  const trigger = document.getElementById('searchTrigger');
  if (!trigger) return;

  // Создаём модалку
  const modal = document.createElement('div');
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal__backdrop" data-close></div>
    <div class="search-modal__panel">
      <div class="search-modal__input-wrap">
        <input
          type="text"
          class="search-modal__input"
          id="searchInput"
          placeholder="Поиск по сайту…"
          autocomplete="off"
        >
        <button class="search-modal__close" data-close aria-label="Закрыть">✕</button>
      </div>
      <div class="search-modal__results" id="searchResults">
        <p class="search-modal__empty">Начни вводить — найдём.</p>
      </div>
      <div class="search-modal__hint">
        <kbd>Esc</kbd> — закрыть · <kbd>Enter</kbd> — открыть первое
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');

  // Открыть
  function open() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 50);
    renderResults('');
  }

  // Закрыть
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    input.value = '';
    renderResults('');
  }

  // Поиск
  function normalize(s) {
    return s.toLowerCase().trim();
  }

  function search(query) {
    const q = normalize(query);
    if (!q) return [];

    return searchIndex
      .map(item => {
        const haystack = [
          item.title,
          item.description,
          item.category,
          ...(item.keywords || [])
        ].join(' ').toLowerCase();

        let score = 0;
        if (normalize(item.title).includes(q)) score += 10;
        if (normalize(item.title).startsWith(q)) score += 5;
        if ((item.keywords || []).some(k => normalize(k).includes(q))) score += 3;
        if (haystack.includes(q)) score += 1;

        return { item, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(x => x.item);
  }

  function renderResults(query) {
    const q = normalize(query);

    if (!q) {
      resultsEl.innerHTML = '<p class="search-modal__empty">Начни вводить — найдём.</p>';
      return;
    }

    const results = search(query);

    if (!results.length) {
      resultsEl.innerHTML = '<p class="search-modal__empty">Ничего не найдено.</p>';
      return;
    }

    resultsEl.innerHTML = results.map(r => `
      <a href="${r.url}" class="search-result">
        <div class="search-result__category">${r.category}</div>
        <div class="search-result__title">${r.title}</div>
        <div class="search-result__desc">${r.description}</div>
      </a>
    `).join('');
  }

  // События
  trigger.addEventListener('click', open);

  modal.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) close();
  });

  input.addEventListener('input', (e) => renderResults(e.target.value));

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = resultsEl.querySelector('.search-result');
      if (first) first.click();
    }
  });

  // Горячие клавиши
  document.addEventListener('keydown', (e) => {
    // Ctrl+K или Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      modal.classList.contains('open') ? close() : open();
      return;
    }
    // Слэш, если не в поле ввода
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      open();
      return;
    }
    // Esc
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      close();
    }
  });
}