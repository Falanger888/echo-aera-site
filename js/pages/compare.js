/* ==== COMPARE PAGE ==== */
import { compareData, compareFields, compareOrder } from '../data/compare.js';

/* Эмблемы — SVG-код для превью */
const emblems = {
  eldarhalm: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M15 2 L17 2 L17 20 L20 20 L20 23 L17 23 L17 30 L15 30 L15 23 L12 23 L12 20 L15 20 Z" fill="#c9a227"/></svg>`,
  imirdal:   `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M2 28 L12 10 L18 20 L22 14 L30 28 Z" fill="#6fa8dc"/></svg>`,
  aenordal:  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 2 C8 10 8 22 16 30 C24 22 24 10 16 2 Z" fill="#6aa84f"/></svg>`,
  swamp:     `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M2 14 Q8 8 16 14 T30 14 M2 20 Q8 14 16 20 T30 20 M2 26 Q8 20 16 26 T30 26" stroke="#45818e" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  jauhar:    `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="5" fill="#d4a76a"/><path d="M16 2 V6 M16 26 V30 M2 16 H6 M26 16 H30 M6 6 L9 9 M23 23 L26 26 M6 26 L9 23 M23 9 L26 6" stroke="#d4a76a" stroke-width="2" stroke-linecap="round"/></svg>`,
  heavenly:  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 3 L19 13 L30 13 L21 20 L24 30 L16 24 L8 30 L11 20 L2 13 L13 13 Z" fill="#b4a7d6"/></svg>`
};

/* Hex → rgb-компоненты для rgba() */
function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return '201, 162, 39';
  return `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}`;
}

export function initCompare() {
  const selectLeft  = document.getElementById('compareLeft');
  const selectRight = document.getElementById('compareRight');
  if (!selectLeft || !selectRight) return;

  const previewEl = document.getElementById('comparePreview');
  const tableEl   = document.getElementById('compareTable');

  /* Заполнить селекторы */
  const optionsHTML = compareOrder.map(slug => {
    const r = compareData[slug];
    return `<option value="${slug}">${r.name}</option>`;
  }).join('');

  selectLeft.innerHTML = optionsHTML;
  selectRight.innerHTML = optionsHTML;

  // По умолчанию: Аэнордал vs Имирдал
  selectLeft.value  = 'aenordal';
  selectRight.value = 'imirdal';

  /* Рендер */
  function render() {
    const leftSlug  = selectLeft.value;
    const rightSlug = selectRight.value;

    if (leftSlug === rightSlug) {
      tableEl.innerHTML = '<tr><td colspan="3" style="text-align:center;padding:3rem;color:var(--text-dim);font-style:italic;">Выбери два разных региона</td></tr>';
      previewEl.innerHTML = '';
      return;
    }

    const left  = compareData[leftSlug];
    const right = compareData[rightSlug];

    /* ==== ПРЕВЬЮ ==== */
    previewEl.innerHTML = `
      <div class="compare-preview__card" style="--card-color: ${left.color}; --card-rgb: ${hexToRgb(left.color)};">
        <div class="compare-preview__emblem">${emblems[leftSlug] || ''}</div>
        <div class="compare-preview__name">${left.name}</div>
        <div class="compare-preview__status">${left.fields.status}</div>
      </div>
      <div class="compare-preview__card" style="--card-color: ${right.color}; --card-rgb: ${hexToRgb(right.color)};">
        <div class="compare-preview__emblem">${emblems[rightSlug] || ''}</div>
        <div class="compare-preview__name">${right.name}</div>
        <div class="compare-preview__status">${right.fields.status}</div>
      </div>
    `;

    /* ==== ТАБЛИЦА ==== */
    const rows = compareFields.map(field => {
      const lVal = left.fields[field.key]  || '—';
      const rVal = right.fields[field.key] || '—';
      const same = lVal === rVal;

      return `
        <tr>
          <td class="compare-table__label">${field.label}</td>
          <td class="compare-table__cell compare-table__cell--left ${same ? 'compare-table__cell--same' : 'compare-table__cell--diff'}">${lVal}</td>
          <td class="compare-table__cell ${same ? 'compare-table__cell--same' : 'compare-table__cell--diff'}">${rVal}</td>
        </tr>
      `;
    }).join('');

    tableEl.innerHTML = rows;
  }

  selectLeft.addEventListener('change', render);
  selectRight.addEventListener('change', render);

  render();
}