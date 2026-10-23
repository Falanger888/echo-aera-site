/* ==== PROLOGUE: INTERACTIVE STORY ==== */
export function initPrologue() {
  const stage = document.getElementById('prologueStage');
  if (!stage) return;

  const textEl      = document.getElementById('sceneText');
  const choicesEl   = document.getElementById('sceneChoices');
  const continueEl  = document.getElementById('sceneContinue');
  const finalEl     = document.getElementById('sceneFinal');
  const sceneEl     = document.getElementById('scene');
  const skipBtn     = document.getElementById('prologueSkip');
  const continueBtn = document.getElementById('continueBtn');

  let typingTimeout = null;
  let lastResult = null; // на будущее

  /* ==== Кнопка «Пройти заново» в финале ==== */
  if (!document.getElementById('prologueReset')) {
    const resetBtn = document.createElement('button');
    resetBtn.id = 'prologueReset';
    resetBtn.className = 'btn btn--ghost';
    resetBtn.textContent = 'Пройти заново';
    resetBtn.style.marginTop = '1rem';
    resetBtn.addEventListener('click', () => {
      try { localStorage.removeItem('echo-aera-prologue-seen'); } catch (e) {}
      location.reload();
    });

    const finalActions = finalEl.querySelector('.prologue__final-actions');
    if (finalActions) finalActions.appendChild(resetBtn);
  }

  /* ==== Если уже видел — сразу финал ==== */
  if (localStorage.getItem('echo-aera-prologue-seen') === '1') {
    sceneEl.style.display = 'none';
    choicesEl.style.display = 'none';
    continueEl.style.display = 'none';
    finalEl.style.display = 'block';
    if (skipBtn) skipBtn.style.display = 'none';
    return;
  }

  /* ==== Утилиты ==== */
  function typeText(text, speed = 45, onDone) {
    if (typingTimeout) clearTimeout(typingTimeout);
    textEl.textContent = '';
    textEl.classList.add('typing');
    let i = 0;

    function step() {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
        const ch = text.charAt(i - 1);
        const delay = (ch === '.' || ch === '…' || ch === '!' || ch === '?') ? speed * 8 : speed;
        typingTimeout = setTimeout(step, delay);
      } else {
        textEl.classList.remove('typing');
        if (onDone) onDone();
      }
    }
    step();
  }

  function clearUI() {
    choicesEl.innerHTML = '';
    choicesEl.classList.remove('visible');
    continueEl.classList.remove('visible');
    continueEl.style.display = 'none';
    finalEl.style.display = 'none';
  }

  function showChoices(choices) {
    choicesEl.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'prologue__choice';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => {
        clearUI();
        choice.action();
      });
      choicesEl.appendChild(btn);
    });
    setTimeout(() => choicesEl.classList.add('visible'), 100);
  }

  function showContinue(callback) {
    continueEl.style.display = 'block';
    setTimeout(() => continueEl.classList.add('visible'), 100);

    const handler = () => {
      continueBtn.removeEventListener('click', handler);
      continueEl.classList.remove('visible');
      setTimeout(() => {
        continueEl.style.display = 'none';
        callback();
      }, 300);
    };
    continueBtn.addEventListener('click', handler);
  }

  function showFinal() {
    try { localStorage.setItem('echo-aera-prologue-seen', '1'); } catch (e) {}

    sceneEl.style.display = 'none';
    choicesEl.style.display = 'none';
    continueEl.style.display = 'none';
    finalEl.style.display = 'block';
    if (skipBtn) skipBtn.style.display = 'none';
  }

  /* ==== СЦЕНАРИЙ ==== */

  function scene1() {
    clearUI();
    typeText(
      'Ты просыпаешься у воды. Не помнишь, как здесь оказался. Только туман, только холод, только шёпот волн.',
      50,
      () => showContinue(scene2)
    );
  }

  function scene2() {
    clearUI();
    typeText(
      'Голоса звучат из тумана. Три тени у кромки воды. Они не движутся. Они ждут.',
      50,
      () => {
        showChoices([
          { text: 'Кто вы?',  action: () => sceneAnswer('Кто вы') },
          { text: 'Где я?',   action: () => sceneAnswer('Где я') },
          { text: 'Молчать',  action: () => sceneAnswer('Молчать') }
        ]);
      }
    );
  }

  function sceneAnswer(choice) {
    clearUI();
    let response = '';

    if (choice === 'Кто вы') {
      response = '«Мы — эхо. Мы ждали тебя дольше, чем ты можешь вспомнить.»';
    } else if (choice === 'Где я') {
      response = '«Там, где всё началось. И где всё закончится. Если ты позволишь.»';
    } else {
      response = 'Тени молчат. Одна из них улыбается. Или это игра света.';
    }

    typeText(response, 50, () => showContinue(scene3));
  }

  function scene3() {
    clearUI();
    typeText(
      '«Ищи истину там, где её не ждёшь.»\n\nТени растворяются в тумане. Где-то впереди — тропа.',
      45,
      () => showContinue(scene4)
    );
  }

  function scene4() {
    clearUI();
    typeText(
      'Впереди шесть земель. И ни одной подсказки, куда идти. Только ощущение: что бы ты ни выбрал — это будет правильно.',
      50,
      () => showContinue(showFinal)
    );
  }

  /* ==== Кнопка «Пропустить» ==== */
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Пропустить пролог?')) {
        try { localStorage.setItem('echo-aera-prologue-seen', '1'); } catch (err) {}
        window.location.href = 'index.html';
      }
    });
  }

  /* ==== СТАРТ ==== */
  scene1();
}