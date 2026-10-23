/* ==== RENDER COMPONENTS ==== */
import { header } from '../components/header.js';
import { footer } from '../components/footer.js';
import { worldMap } from '../components/world-map.js';

const components = { header, footer, 'world-map': worldMap };

export function renderComponents() {
  const placeholders = document.querySelectorAll('[data-component]');

  placeholders.forEach(el => {
    const name = el.dataset.component;
    const render = components[name];

    if (typeof render !== 'function') {
      console.warn(`[render] компонент не найден: ${name}`);
      return;
    }

    el.outerHTML = render();
  });
}