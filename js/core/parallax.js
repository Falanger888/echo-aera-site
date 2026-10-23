/* ==== PARALLAX ON SCROLL ==== */
export function initParallax() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (reduced || isTouch) return;

  // Элементы с data-parallax="скорость"
  // Скорость: 0.1 (медленно, далеко) — 0.8 (быстро, близко)
  const elements = document.querySelectorAll('[data-parallax]');
  if (!elements.length) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Элемент в зоне видимости?
      if (rect.bottom < 0 || rect.top > winH) return;

      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const offset = (scrollY - el.offsetTop + winH / 2) * speed * -1;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  update();
}