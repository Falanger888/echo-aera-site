/* ==== SCROLL UI: progress bar + scroll-to-top ==== */
export function initScrollUI() {
  // Прогресс-бар
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.innerHTML = '<div class="scroll-progress__bar" id="scrollProgressBar"></div>';
  document.body.appendChild(progress);

  // Кнопка «наверх»
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Наверх');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  const bar = document.getElementById('scrollProgressBar');
  let ticking = false;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (bar) bar.style.width = `${pct}%`;
    btn.classList.toggle('visible', scrollTop > 600);

    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}