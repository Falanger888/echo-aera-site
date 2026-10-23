/* ==== ECHO AERA: PROLOGUE ENTRY ==== */
import { initPrologue } from './pages/prologue.js';

function init() {
  document.documentElement.classList.remove('no-js');
  initPrologue();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}