/* ==== DIPLOMACY PAGE ==== */
import { factions, factionOrder, currentRelations, relationTypes, loreNotes } from '../data/factions.js';

/* Получить ключ для пары (алфавитный порядок) */
function pairKey(a, b) {
  return [a, b].sort().join('-');
}

/* Получить текущее отношение между двумя фракциями */
function getRelation(a, b) {
  const key = pairKey(a, b);
  const type = currentRelations[key] || 'neutral';
  return relationTypes[type] || relationTypes.neutral;
}

export function initConflict() {
  const factionsEl = document.getElementById('diplomacyFactions');
  if (!factionsEl) return;

  let selected = null;

  /* ==== КАРТОЧКИ ФРАКЦИЙ ==== */
  factionsEl.innerHTML = factionOrder.map(slug => {
    const f = factions[slug];
    return `
      <button class="diplomacy-faction" data-slug="${slug}" style="--faction-color: ${f.color};">
        <div class="diplomacy-faction__status">${f.statusLabel}</div>
        <div class="diplomacy-faction__name">${f.name}</div>
        <div class="diplomacy-faction__race">${f.race}</div>
        <div class="diplomacy-faction__ruler">${f.ruler}</div>
      </button>
    `;
  }).join('');

  const factionBtns = factionsEl.querySelectorAll('.diplomacy-faction');
  const detailEl = document.getElementById('diplomacyDetail');

  function selectFaction(slug) {
    selected = slug;

    factionBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.slug === slug);
    });

    const f = factions[slug];
    document.getElementById('diplomacyTitle').textContent = f.name;

    const others = factionOrder.filter(s => s !== slug);
    const listEl = document.getElementById('diplomacyList');

    listEl.innerHTML = others.map(otherSlug => {
      const other = factions[otherSlug];
      const rel = getRelation(slug, otherSlug);

      return `
        <div class="diplomacy-row" style="--relation-color: ${rel.color};">
          <div class="diplomacy-row__badge">${rel.symbol}</div>
          <div class="diplomacy-row__body">
            <div class="diplomacy-row__name">${other.name}</div>
            <div class="diplomacy-row__status">${rel.label}</div>
          </div>
        </div>
      `;
    }).join('');

    detailEl.style.display = 'block';

    // Плавный скролл к панели
    setTimeout(() => {
      detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  factionBtns.forEach(btn => {
    btn.addEventListener('click', () => selectFaction(btn.dataset.slug));
  });

  /* ==== МАТРИЦА ==== */
  const matrixEl = document.getElementById('diplomacyMatrix');
  if (matrixEl) {
    // Заголовок
    const headCells = factionOrder.map(slug => {
      const f = factions[slug];
      return `<th title="${f.name}">${f.name.split(' ')[0]}</th>`;
    }).join('');

    // Строки
    const rows = factionOrder.map(rowSlug => {
      const rowF = factions[rowSlug];

      const cells = factionOrder.map(colSlug => {
        if (rowSlug === colSlug) {
          return `<td><span class="diplomacy-matrix__cell diplomacy-matrix__cell--self">•</span></td>`;
        }

        const rel = getRelation(rowSlug, colSlug);
        const other = factions[colSlug];

        return `
          <td title="${rowF.name} ↔ ${other.name}: ${rel.label}">
            <span class="diplomacy-matrix__cell"
                  style="color: ${rel.color}; border-color: ${rel.color};">
              ${rel.symbol}
            </span>
          </td>
        `;
      }).join('');

      return `
        <tr>
          <td style="color: ${rowF.color};">${rowF.name}</td>
          ${cells}
        </tr>
      `;
    }).join('');

    matrixEl.innerHTML = `
      <thead>
        <tr>
          <th>Фракция</th>
          ${headCells}
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    `;
  }

  /* ==== ЗАМЕТКИ ==== */
  const notesEl = document.getElementById('diplomacyNotes');
  if (notesEl) {
    notesEl.innerHTML = loreNotes.map(note => {
      const firstFaction = factions[note.factions[0]];
      const color = firstFaction ? firstFaction.color : 'var(--gold)';

      const tags = note.factions.map(slug => {
        const f = factions[slug];
        return `<span class="diplomacy-note__tag" style="color: ${f.color};">${f.name}</span>`;
      }).join('');

      return `
        <div class="diplomacy-note reveal" style="--note-color: ${color};">
          <div class="diplomacy-note__title">${note.title}</div>
          <p class="diplomacy-note__text">${note.text}</p>
          <div class="diplomacy-note__tags">${tags}</div>
        </div>
      `;
    }).join('');
  }
}