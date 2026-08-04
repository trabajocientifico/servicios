/* ============================================
   Quiz Engine — with micro-interactions
   ============================================ */

const QuizEngine = {
  currentQuiz: null,
  currentModuleIndex: null,
  answers: {},
  submitted: false,
  // Temporizador
  _timerId: null,
  _secondsLeft: 0,

  render(moduleIndex) {
    this.stopTimer();
    this.currentModuleIndex = moduleIndex;
    this.currentQuiz = COURSE_DATA.modules[moduleIndex].quiz;
    this.answers = {};
    this.submitted = false;

    const unit = (typeof App !== 'undefined' && App.UNIT_LABEL) ? App.UNIT_LABEL : 'Módulo';
    document.getElementById('quiz-badge').textContent = `${unit} ${moduleIndex + 1}`;
    document.getElementById('quiz-title').textContent = this.currentQuiz.title;

    const total = this.currentQuiz.questions.length;
    const limit = this.currentQuiz.timeLimit;
    const instruction = document.querySelector('.quiz-instruction');
    if (instruction) {
      instruction.textContent = limit
        ? `${total} preguntas sobre los temas vistos. Tienes ${limit} minutos y necesitas al menos ${this.currentQuiz.passingScore}% para aprobar.`
        : `Responde correctamente al menos el ${this.currentQuiz.passingScore}% de las preguntas para aprobar este quiz.`;
    }

    const body = document.getElementById('quiz-body');
    body.innerHTML = '';

    this.currentQuiz.questions.forEach((q, i) => {
      const questionEl = document.createElement('div');
      questionEl.className = 'quiz-question';
      questionEl.innerHTML = `
        <div class="question-number">Pregunta ${i + 1} de ${this.currentQuiz.questions.length}</div>
        <div class="question-text">${q.question}</div>
        <div class="question-options" id="options-${i}">
          ${q.options.map((opt, j) => `
            <button class="option-btn" data-question="${i}" data-option="${j}">
              <span class="option-letter">${String.fromCharCode(65 + j)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
        <div class="question-explanation" id="explanation-${i}">${q.explanation}</div>
      `;
      body.appendChild(questionEl);
    });

    // Bind option clicks
    body.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.submitted) return;
        const qIndex = parseInt(btn.dataset.question);
        const oIndex = parseInt(btn.dataset.option);
        this.selectOption(qIndex, oIndex);
      });
    });

    // Show submit, hide results
    document.getElementById('quiz-actions').classList.remove('hidden');
    document.getElementById('quiz-results').classList.add('hidden');

    const submitBtn = document.getElementById('btn-submit-quiz');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar respuestas';

    this.showIntro();
  },

  // ---- Pantalla previa ----
  // El cronómetro solo arranca cuando el estudiante pulsa "Empezar":
  // abrir el quiz para mirarlo no debe consumirle tiempo.
  showIntro() {
    const intro = document.getElementById('quiz-intro');
    if (!intro) { this.beginAttempt(); return; }

    const total = this.currentQuiz.questions.length;
    const limit = this.currentQuiz.timeLimit;
    const rules = [
      `<strong>${total} preguntas</strong> de selección múltiple sobre los temas vistos.`,
      limit
        ? `Tienes <strong>${limit} minutos</strong>. Si se acaba el tiempo se califica lo que hayas respondido.`
        : 'No hay límite de tiempo.',
      `Necesitas <strong>${this.currentQuiz.passingScore}%</strong> para aprobar.`,
      'Puedes <strong>reintentarlo las veces que quieras</strong>, sin penalización.',
      'Si sales a mitad del quiz se pierden las respuestas y el intento vuelve a empezar.'
    ];
    document.getElementById('quiz-intro-rules').innerHTML =
      rules.map(r => `<li>${r}</li>`).join('');

    intro.classList.remove('hidden');
    document.getElementById('quiz-body').classList.add('hidden');
    document.getElementById('quiz-actions').classList.add('hidden');
    document.getElementById('quiz-timer').classList.add('hidden');
  },

  // Arranca el intento: muestra las preguntas y pone en marcha el reloj
  beginAttempt() {
    const intro = document.getElementById('quiz-intro');
    if (intro) intro.classList.add('hidden');
    document.getElementById('quiz-body').classList.remove('hidden');
    document.getElementById('quiz-actions').classList.remove('hidden');
    this.startTimer();
  },

  // ¿Hay un intento en curso con respuestas que se perderían al salir?
  hasUnsavedAttempt() {
    const intro = document.getElementById('quiz-intro');
    const introVisible = intro && !intro.classList.contains('hidden');
    return !introVisible && !this.submitted && Object.keys(this.answers).length > 0;
  },

  // ---- Temporizador (quiz.timeLimit en minutos) ----
  startTimer() {
    const wrap = document.getElementById('quiz-timer');
    if (!wrap) return;

    const limit = this.currentQuiz.timeLimit;
    if (!limit) {
      wrap.classList.add('hidden');
      return;
    }

    wrap.classList.remove('hidden');
    wrap.classList.remove('quiz-timer--warning', 'quiz-timer--danger');
    this._secondsLeft = limit * 60;
    this.renderTimer();

    this._timerId = setInterval(() => {
      this._secondsLeft--;
      this.renderTimer();
      if (this._secondsLeft <= 0) {
        this.stopTimer();
        this.timeUp();
      }
    }, 1000);
  },

  renderTimer() {
    const wrap = document.getElementById('quiz-timer');
    if (!wrap) return;
    const secs = Math.max(this._secondsLeft, 0);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    document.getElementById('quiz-timer-value').textContent =
      `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

    wrap.classList.toggle('quiz-timer--warning', secs <= 300 && secs > 60);
    wrap.classList.toggle('quiz-timer--danger', secs <= 60);
  },

  stopTimer() {
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = null;
    }
  },

  // Se acabó el tiempo: se califica con lo que haya respondido
  timeUp() {
    if (this.submitted) return;
    if (typeof App !== 'undefined') {
      App.showToast('tip', '⏱ Se acabó el tiempo', 'Se califican las respuestas que alcanzaste a marcar.');
    }
    this.submit(true);
  },

  selectOption(questionIndex, optionIndex) {
    this.answers[questionIndex] = optionIndex;

    // Update UI
    const container = document.getElementById(`options-${questionIndex}`);
    container.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (parseInt(btn.dataset.option) === optionIndex) {
        btn.classList.add('selected');
      }
    });
  },

  // force = true cuando se acaba el tiempo (no exige tenerlas todas respondidas)
  submit(force) {
    if (this.submitted) return;
    const totalQuestions = this.currentQuiz.questions.length;
    const answeredCount = Object.keys(this.answers).length;

    if (!force && answeredCount < totalQuestions) {
      // Highlight unanswered with shake
      for (let i = 0; i < totalQuestions; i++) {
        if (this.answers[i] === undefined) {
          const q = document.querySelectorAll('.quiz-question')[i];
          q.style.borderColor = 'var(--error)';
          q.style.animation = 'shakeWrong 0.6s ease';
          setTimeout(() => {
            q.style.borderColor = '';
            q.style.animation = '';
          }, 2000);
        }
      }
      return;
    }

    this.submitted = true;
    this.stopTimer();
    let correct = 0;

    this.currentQuiz.questions.forEach((q, i) => {
      const container = document.getElementById(`options-${i}`);
      const explanation = document.getElementById(`explanation-${i}`);
      const buttons = container.querySelectorAll('.option-btn');
      const isCorrect = this.answers[i] === q.correct;

      if (isCorrect) correct++;

      // Stagger the reveal of each question
      setTimeout(() => {
        buttons.forEach(btn => {
          btn.classList.add('disabled');
          btn.classList.remove('selected');
          const oIndex = parseInt(btn.dataset.option);

          if (oIndex === q.correct) {
            btn.classList.add('correct');
            // Add shake + flash for correct answer
            if (oIndex === this.answers[i]) {
              btn.classList.add('shake-correct', 'flash-green');
            }
          } else if (oIndex === this.answers[i] && oIndex !== q.correct) {
            btn.classList.add('incorrect', 'shake-wrong', 'flash-red');
          }
        });

        explanation.classList.add('show');
      }, i * 200); // 200ms delay per question
    });

    // Show results after all questions revealed
    const revealDelay = totalQuestions * 200 + 300;
    setTimeout(() => {
      const score = Math.round((correct / totalQuestions) * 100);
      const passed = score >= this.currentQuiz.passingScore;

      document.getElementById('quiz-actions').classList.add('hidden');
      const timerWrap = document.getElementById('quiz-timer');
      if (timerWrap) timerWrap.classList.add('hidden');
      const results = document.getElementById('quiz-results');
      results.classList.remove('hidden');

      const resultCard = document.getElementById('result-card');
      resultCard.classList.add('animate-in');

      const icon = document.getElementById('result-icon');
      icon.textContent = passed ? '✓' : '✗';
      icon.className = `result-icon ${passed ? 'pass' : 'fail'}`;

      // Animate score counter
      const messageEl = document.getElementById('result-message');
      this.animateScore(messageEl, score, correct, totalQuestions, passed);

      document.getElementById('result-title').textContent = passed ? '¡Aprobado!' : 'No aprobado';

      const nextBtn = document.getElementById('btn-next-module');
      const retryBtn = document.getElementById('btn-retry-quiz');

      if (passed) {
        const unit = (typeof App !== 'undefined' && App.UNIT_LABEL) ? App.UNIT_LABEL.toLowerCase() : 'módulo';
        const isLast = this.currentModuleIndex === COURSE_DATA.modules.length - 1;
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = isLast ? 'Volver al panel' : `Siguiente ${unit}`;
        retryBtn.classList.add('hidden');

        // Save quiz as passed (pass score for perfect quiz detection)
        if (typeof App !== 'undefined') {
          App.completeQuiz(this.currentModuleIndex, score);
        }
      } else {
        nextBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
      }

      // Scroll to results
      results.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Clean up animation class
      setTimeout(() => resultCard.classList.remove('animate-in'), 500);
    }, revealDelay);
  },

  // Animate score from 0 to final value
  animateScore(element, targetScore, correct, total, passed) {
    const duration = 600;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(targetScore * eased);

      if (passed) {
        element.textContent = `Has obtenido ${current}% (${correct}/${total} correctas). ¡Excelente trabajo!`;
      } else {
        element.textContent = `Has obtenido ${current}% (${correct}/${total} correctas). Necesitas al menos ${this.currentQuiz.passingScore}% para aprobar.`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  },

  retry() {
    this.render(this.currentModuleIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
