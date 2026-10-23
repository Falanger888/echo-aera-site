/* ==== ECHO AERA: APP ENTRY ==== */
import { renderComponents } from './core/render.js';
import { initNav }         from './core/nav.js';
import { initReveal }      from './core/reveal.js';
import { initParticles }   from './core/particles.js';
import { initFaq }         from './core/faq.js';
import { initScrollUI }    from './core/scroll-ui.js';
import { initSearch }      from './core/search.js';
import { initEffects }     from './core/effects.js';
import { initParallax }    from './core/parallax.js';
import { initRegionSparks } from './core/region-sparks.js';
import { initTimelineProgress } from './core/timeline-progress.js';
import { initPageTransitions }  from './core/page-transitions.js';
import { initTimeline }    from './pages/timeline.js';
import { initRegionPage }  from './pages/region.js';
import { initWorldMap }    from './core/world-map.js';
import { initPrologue }    from './pages/prologue.js';
import { initQuiz }        from './pages/quiz.js';
import { initCharacterPage } from './pages/character.js';
import { initCharactersFilter } from './pages/characters-filter.js';
import { initAtlas } from './pages/atlas.js';
import { initConflict } from './pages/conflict.js';
import { initCompare } from './pages/compare.js';

function isDev() {
  return ['localhost', '127.0.0.1'].includes(location.hostname)
      || location.protocol === 'file:';
}

function init() {
  document.documentElement.classList.remove('no-js');

  if (isDev()) {
    console.log('%c Эхо Эйры ', 'background:#c9a227;color:#070a12;font-weight:bold;padding:4px 8px;');
  }

  renderComponents();
  initNav();
  initScrollUI();
  initSearch();
  initPrologue();
  initRegionPage();
  initCharacterPage();
  initCharactersFilter();
  initConflict();
  initCompare();
  initQuiz();
  initAtlas();
  initReveal();
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initParticles(), { timeout: 2000 });
  } else {
    setTimeout(() => initParticles(), 100);
  }
  initFaq();
  initTimeline();
  initTimelineProgress();
  initWorldMap();
  // Эффекты — после того как основная страница отрисована
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initEffects(), { timeout: 2000 });
  } else {
    setTimeout(() => initEffects(), 100);
  }
  initParallax();
  initRegionSparks();
  initPageTransitions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}