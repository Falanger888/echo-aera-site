/* ==== PAGE TRANSITIONS (без View Transitions API) ==== */
export function initPageTransitions() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  let transitioning = false;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('#'))           return;
    if (href.startsWith('mailto:'))     return;
    if (href.startsWith('tel:'))        return;
    if (href.startsWith('javascript:')) return;

    const isExternal = link.hostname && link.hostname !== location.hostname;
    if (isExternal) return;

    if (link.target === '_blank') return;
    if (link.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.href === location.href) return;

    e.preventDefault();

    if (transitioning) return;
    transitioning = true;

    overlay.classList.add('active');

    setTimeout(() => {
      window.location.href = href;
    }, 220);
  });

  window.addEventListener('pageshow', () => {
    transitioning = false;
    overlay.classList.remove('active');
  });
}