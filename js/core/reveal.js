/* ==== REVEAL ON SCROLL ==== */
export function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('visible');

        // Сбрасываем transition-delay после завершения анимации появления,
        // чтобы он не тормозил hover и другие эффекты
        setTimeout(() => {
          el.style.transitionDelay = '';
        }, 1400);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => {
    const siblings = el.parentElement
      ? Array.from(el.parentElement.querySelectorAll(':scope > .reveal'))
      : [];
    const idx = siblings.indexOf(el);

    el.style.transitionDelay = `${(Math.max(idx, 0) % 4) * 0.1}s`;
    observer.observe(el);
  });
}