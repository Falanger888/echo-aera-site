/* ==== HERO PARTICLES ==== */
export function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'hero__particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (8 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = 0.3 + Math.random() * 0.5;
    p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
    container.appendChild(p);
  }
}