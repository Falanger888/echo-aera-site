/* ==== QUIZ PAGE ==== */
import { questions, calculateResult } from '../data/quiz.js';

export function initQuiz() {
  const quizEl = document.getElementById('quiz');
  if (!quizEl) return;

  const questionEl = document.getElementById('quizQuestion');
  const answersEl  = document.getElementById('quizAnswers');
  const counterEl  = document.getElementById('quizCounter');
  const progressEl = document.getElementById('quizProgress');
  const resultEl   = document.getElementById('quizResult');

  const state = {
    current: 0,
    answers: []
  };

  let lastResult = null;

  function render() {
    const q = questions[state.current];
    if (!q) return finish();

    counterEl.textContent = `Вопрос ${state.current + 1} из ${questions.length}`;
    progressEl.style.width = `${(state.current / questions.length) * 100}%`;

    // Улетаем влево
    questionEl.classList.add('fade-out');
    answersEl.classList.add('fade-out');

    setTimeout(() => {
      // Обновляем содержимое
      questionEl.textContent = q.text;
      answersEl.innerHTML = '';

      q.answers.forEach((answer, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz__answer';
        btn.textContent = answer.text;
        btn.addEventListener('click', () => pick(idx));
        answersEl.appendChild(btn);
      });

      // Сбрасываем — теперь элемент справа за кадром
      questionEl.classList.remove('fade-out');
      answersEl.classList.remove('fade-out');
      questionEl.classList.add('fade-in');
      answersEl.classList.add('fade-in');

      // Форсируем reflow, потом убираем fade-in — прилетает на место
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          questionEl.classList.remove('fade-in');
          answersEl.classList.remove('fade-in');
        });
      });
    }, 350);
  }

  function pick(idx) {
    const q = questions[state.current];
    state.answers.push(q.answers[idx].scores);
    state.current++;

    if (state.current >= questions.length) {
      progressEl.style.width = '100%';
      setTimeout(finish, 400);
    } else {
      render();
    }
  }

  function finish() {
    const result = calculateResult(state.answers);
    lastResult = result;

    quizEl.style.display = 'none';
    resultEl.style.display = 'block';

    document.getElementById('quizResultTitle').textContent = result.race.name;
    document.getElementById('quizResultTagline').textContent = result.race.tagline;
    document.getElementById('quizResultDesc').textContent = result.race.description;

    document.getElementById('quizResultClass').textContent = result.clazz.name;
    document.getElementById('quizResultClassTagline').textContent = result.clazz.tagline;

    const regionLink = document.getElementById('quizResultRegion');
    regionLink.href = `region.html?id=${result.race.regionId}`;
    regionLink.textContent = `Открыть ${result.race.region}`;

    // Арт-плейсхолдер
    const artWrap = document.getElementById('quizResultArt');
    const artImg  = document.getElementById('quizResultArtImg');
    artWrap.dataset.race = result.raceKey;   // ← ключевое, для эмблемы
    artWrap.dataset.label = result.race.art;
    artImg.src = result.race.art;
    artImg.alt = result.race.name;
    artImg.onload  = () => artWrap.classList.add('loaded');
    artImg.onerror = () => artImg.removeAttribute('src');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==== ШЕРИНГ ==== */
  const shareBtn = document.getElementById('quizShare');
  const shareFeedback = document.getElementById('quizShareFeedback');

  function showFeedback(text) {
    if (!shareFeedback) return;
    shareFeedback.textContent = text;
    shareFeedback.classList.add('visible');
    setTimeout(() => shareFeedback.classList.remove('visible'), 3000);
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (!lastResult) return;

      const text = `В Эйре я был бы: ${lastResult.race.name} / ${lastResult.clazz.name}. А ты?`;

      // Ссылка: если сайт открыт по http(s) — берём реальный URL,
      // если локально (file://) — fallback на относительный путь
      let url;
      if (location.protocol === 'http:' || location.protocol === 'https:') {
        url = location.href; // текущая страница quiz.html со всеми параметрами
      } else {
        url = 'https://echo-aera.game/quiz.html'; // домен-заглушка, замени на реальный
      }

      // Нативный шер (мобильные)
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Кем бы ты был в Эйре?',
            text,
            url
          });
          return;
        } catch (e) {
          if (e.name === 'AbortError') return;
          // падаем в fallback
        }
      }

      // Fallback: копируем в буфер
      const full = `${text}\n${url}`;
      try {
        await navigator.clipboard.writeText(full);
        showFeedback('Скопировано: текст и ссылка ✓');
      } catch (e) {
        // Последний fallback — prompt
        window.prompt('Скопируй текст:', full);
      }
    });
  }
  /* ==== ПРОЙТИ ЗАНОВО ==== */
  document.getElementById('quizRestart').addEventListener('click', () => {
    state.current = 0;
    state.answers = [];
    resultEl.style.display = 'none';
    quizEl.style.display = 'block';
    render();
  });

  /* ==== СТАРТ ==== */
  render();
}