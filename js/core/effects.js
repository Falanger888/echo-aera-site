/* ==== EFFECTS: визуальные приколюшки ==== */

export function initEffects() {
  const isTouch = window.matchMedia('(hover: none)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Звёзды — на всех устройствах, кроме reduced motion
  if (!reduced) {
    initStars();
  }

  // Тяжёлые эффекты — только на десктопе
  if (isTouch || reduced) return;

  initCursorGlow();
  initClickSparks();
  initTilt();
  initCardMouse();
}

/* ==== ЗВЁЗДЫ НА ФОНЕ (динамические) ==== */
function initStars() {
  if (document.querySelector('.stars-bg')) return;

  const container = document.createElement('div');
  container.className = 'stars-bg';
  container.setAttribute('aria-hidden', 'true');
  document.body.appendChild(container);

  // Параметры
  const COUNT = 60; // всего звёзд на экране

  // Создать одну звезду
  function makeStar() {
    const s = document.createElement('span');
    s.className = 'star';

    // Случайный размер: 1–3px
    const size = 1 + Math.random() * 2;
    // Случайный цвет: белый или золотой
    const isGold = Math.random() < 0.35;
    const color = isGold
      ? `rgba(201, 162, 39, ${0.6 + Math.random() * 0.4})`
      : `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;

    // Случайная позиция
    const top  = Math.random() * 100;
    const left = Math.random() * 100;

    // Случайная длительность цикла
    const duration = 3 + Math.random() * 6; // 3–9 секунд
    const delay = Math.random() * 8;         // задержка до старта

    s.style.cssText = `
      position: absolute;
      top: ${top}%;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      box-shadow: 0 0 ${size * 3}px ${color};
      opacity: 0;
      animation: starTwinkle ${duration}s ease-in-out ${delay}s infinite;
      will-change: opacity, transform;
    `;

    // После каждого полного цикла — переехать в новое место
    const respawn = () => {
      s.style.top  = (Math.random() * 100) + '%';
      s.style.left = (Math.random() * 100) + '%';

      // Иногда меняем размер и цвет — но редко
      if (Math.random() < 0.3) {
        const newSize = 1 + Math.random() * 2;
        s.style.width = newSize + 'px';
        s.style.height = newSize + 'px';

        const newGold = Math.random() < 0.35;
        const newColor = newGold
          ? `rgba(201, 162, 39, ${0.6 + Math.random() * 0.4})`
          : `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        s.style.background = newColor;
        s.style.boxShadow = `0 0 ${newSize * 3}px ${newColor}`;
      }

      // Новая длительность
      const newDuration = 3 + Math.random() * 6;
      s.style.animationDuration = newDuration + 's';
      s.style.animationDelay = '0s';

      // Перезапускаем анимацию
      s.style.animation = 'none';
      void s.offsetWidth; // reflow
      s.style.animation = `starTwinkle ${newDuration}s ease-in-out 0s infinite`;

      // Планируем следующий переезд
      setTimeout(respawn, newDuration * 1000);
    };

    // Первый переезд — после первого цикла
    setTimeout(respawn, (duration + delay) * 1000);

    return s;
  }

  // Создаём звёзды
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < COUNT; i++) {
    fragment.appendChild(makeStar());
  }
  container.appendChild(fragment);
}

/* ==== КУРСОР-СВЕЧЕНИЕ ==== */
function initCursorGlow() {
  if (document.querySelector('.cursor-glow')) return;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .btn, input, textarea, [role="button"]')) {
      glow.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .btn, input, textarea, [role="button"]')) {
      glow.classList.remove('hover');
    }
  });

  document.addEventListener('mousedown', () => glow.classList.add('click'));
  document.addEventListener('mouseup', () => glow.classList.remove('click'));
}

/* ==== ИСКРЫ ПРИ КЛИКЕ ==== */
function initClickSparks() {
  if (document.body.dataset.sparksBound === '1') return;
  document.body.dataset.sparksBound = '1';

  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, textarea, select, .btn')) return;

    const count = 8;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const distance = 40 + Math.random() * 60;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      spark.style.left = e.clientX + 'px';
      spark.style.top = e.clientY + 'px';
      spark.style.setProperty('--dx', `${dx}px`);
      spark.style.setProperty('--dy', `${dy}px`);
      spark.style.background = Math.random() > 0.5 ? '#c9a227' : '#e0be5a';

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  });
}

/* ==== 3D-НАКЛОН КАРТОЧЕК ==== */
function initTilt() {
  const selector = [
    '.char-card-home',
    '.mystery-card',
    '.team__card',
    '.atlas-card',
    '.conflict-note',
    '.diplomacy-note',
    '.city-card',
    '.about__feature',
    '.philosophy-card',
    '.contact__link',
    '.region-card'
  ].join(', ');
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    // Защита от двойного навешивания
    if (card.dataset.tiltBound === '1') return;
    card.dataset.tiltBound = '1';
    card.classList.add('tilt');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ==== ПОДСВЕТКА КАРТОЧЕК ПОД КУРСОРОМ ==== */
function initCardMouse() {
  const selector = [
    '.char-card-home',
    '.mystery-card',
    '.team__card',
    '.atlas-card',
    '.conflict-note',
    '.diplomacy-note',
    '.city-card',
    '.about__feature',
    '.philosophy-card',
    '.contact__link',
    '.region-card'
  ].join(', ');
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    if (card.dataset.mouseBound === '1') return;
    card.dataset.mouseBound = '1';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });
}

/* ==== ЖИВОЙ ТУМАН ==== */
function initMistLayers() {
  const mist = document.querySelector('.mist');
  if (!mist) return;
  if (mist.querySelector('.mist__layer')) return;

  const layer = document.createElement('div');
  layer.className = 'mist__layer';
  mist.appendChild(layer);
}