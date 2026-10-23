/* ==== TIMELINE SCROLL PROGRESS ==== */
export function initTimelineProgress() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  // Создаём прогресс-линию
  const progress = document.createElement('div');
  progress.className = 'timeline__progress';
  timeline.appendChild(progress);

  let ticking = false;

  function update() {
    const rect = timeline.getBoundingClientRect();
    const winH = window.innerHeight;

    // Где сейчас "читатель" — на 60% высоты экрана
    const triggerY = winH * 0.6;

    // Позиция относительно таймлайна
    let relative = triggerY - rect.top;
    relative = Math.max(0, Math.min(relative, rect.height));

    progress.style.height = relative + 'px';
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
}