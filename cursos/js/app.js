/* ============================================
   Main Application Logic
   ============================================ */

const App = {
  // State
  state: {
    username: '',
    completedLessons: [],
    completedQuizzes: [],
    currentView: 'dashboard',
    currentModuleIndex: null,
    currentLessonIndex: null,
  },

  STORAGE_KEY: 'tc_progress_' + (new URLSearchParams(window.location.search).get('curso') || 'excel-vida'),
  COURSE_ID: new URLSearchParams(window.location.search).get('curso') || 'excel-vida',
  IS_FREE_COURSE: /curso-gratis\.html/i.test(window.location.pathname),
  get UNIT_LABEL() { return this.IS_FREE_COURSE ? 'Clase' : 'Módulo'; },
  APPS_SCRIPT_URL: (window.TC_CONFIG && window.TC_CONFIG.APPS_SCRIPT_URL) || '',

  // Motivational messages
  MOTIVATIONAL_MESSAGES: [
    '💡 El 90% de los datos del mundo se crearon en los últimos 2 años.',
    '💡 Python es el lenguaje más usado en ciencia de datos.',
    '💡 Netflix ahorra $1B al año gracias a su sistema de recomendaciones basado en ML.',
    '💡 Un data scientist dedica el 80% de su tiempo a limpiar datos.',
    '💡 La visualización de datos existe desde el siglo XVIII.',
    '💡 El término "Machine Learning" fue acuñado por Arthur Samuel en 1959.',
    '💡 Cada minuto se suben 500 horas de video a YouTube.',
    '💡 Los modelos de IA pueden detectar cáncer con más precisión que radiólogos.',
    '💡 Pandas fue creado por Wes McKinney cuando trabajaba en finanzas.',
    '💡 El cerebro humano procesa 11 millones de bits por segundo.',
    '💡 Google procesa más de 8.5 mil millones de búsquedas al día.',
    '💡 La regresión lineal fue inventada hace más de 200 años.',
    '💡 Jupyter Notebook debe su nombre a Julia, Python y R.',
    '💡 El sesgo en los datos es uno de los mayores desafíos éticos en IA.',
    '💡 Sigue así — la constancia supera al talento.',
  ],

  // ---- Init ----
  init() {
    this.loadState();

    // Sincronizar con los datos ingresados en el portal (index.html)
    const portalName = localStorage.getItem('tc_user_name');
    if (portalName && !this.state.username) {
      this.state.username = portalName;
      this.saveState();
    }

    if (this.state.username) {
      this.showApp();
    } else {
      this.showWelcome();
    }

    this.bindEvents();

    // Recupera el avance guardado en la nube (otro equipo, otro navegador)
    this.restoreFromCloud();
  },

  // ============================================
  //  SINCRONIZACIÓN ENTRE DISPOSITIVOS
  //  El avance se guarda en Google Sheets con la
  //  llave correo + curso, para que el estudiante
  //  pueda retomar desde cualquier equipo.
  // ============================================
  _pushTimer: null,

  getUserEmail() {
    return (localStorage.getItem('tc_user_email') || '').trim().toLowerCase();
  },

  setSyncStatus(estado, texto) {
    const el = document.getElementById('sync-status');
    if (!el) return;
    el.className = `sync-status sync-status--${estado}`;
    el.textContent = texto;
    el.title = texto;
  },

  // GET al Apps Script. Si el navegador bloquea la petición por CORS,
  // se reintenta con JSONP, que no depende de esas cabeceras.
  requestRemote(params) {
    const url = this.APPS_SCRIPT_URL + '?' + new URLSearchParams(params).toString();
    return fetch(url)
      .then(r => r.json())
      .catch(() => this.requestJsonp(url));
  },

  requestJsonp(url) {
    return new Promise((resolve, reject) => {
      const cb = 'tcSync' + Date.now() + Math.floor(Math.random() * 1000);
      const script = document.createElement('script');
      let timer = null;
      const limpiar = () => {
        clearTimeout(timer);
        delete window[cb];
        if (script.parentNode) script.parentNode.removeChild(script);
      };
      timer = setTimeout(() => { limpiar(); reject(new Error('timeout')); }, 10000);
      window[cb] = (data) => { limpiar(); resolve(data); };
      script.onerror = () => { limpiar(); reject(new Error('jsonp')); };
      script.src = url + '&callback=' + cb;
      document.body.appendChild(script);
    });
  },

  // Une el avance remoto con el local. Siempre suma, nunca resta:
  // así cambiar de dispositivo no puede borrarle nada al estudiante.
  restoreFromCloud() {
    const correo = this.getUserEmail();
    if (!correo) {
      this.setSyncStatus('local', 'Avance guardado solo en este equipo');
      return Promise.resolve(false);
    }

    this.setSyncStatus('cargando', 'Buscando tu avance…');

    return this.requestRemote({ accion: 'estado', correo: correo, curso: this.COURSE_ID })
      .then(data => {
        if (!data || data.status !== 'ok') throw new Error('respuesta inválida');

        let sumadas = 0;
        if (data.encontrado) {
          const antesL = this.state.completedLessons.length;
          const antesQ = this.state.completedQuizzes.length;
          this.state.completedLessons = this.unir(this.state.completedLessons, data.clases);
          this.state.completedQuizzes = this.unir(this.state.completedQuizzes, data.quizzes);
          sumadas = (this.state.completedLessons.length - antesL) + (this.state.completedQuizzes.length - antesQ);

          if (sumadas > 0) {
            this.saveState();
            this.renderSidebar();
            this.renderDashboard();
            this.showToast('module', 'Avance recuperado',
              `Retomamos donde ibas: ${this.getViewedModulesCount()} de ${COURSE_DATA.modules.length} ${this.UNIT_LABEL.toLowerCase()}s vistos.`);
          }
        }

        this.setSyncStatus('ok', 'Avance sincronizado');
        // Sube el estado unido para que ambos lados queden iguales
        this.pushState(true);
        return true;
      })
      .catch(() => {
        this.setSyncStatus('local', 'Sin conexión — guardado en este equipo');
        return false;
      });
  },

  unir(a, b) {
    const lista = Array.isArray(b) ? b : [];
    return Array.from(new Set([...(a || []), ...lista]));
  },

  // Envía el estado completo (no un evento suelto) para que la nube
  // siempre tenga la foto actual del avance.
  pushState(inmediato) {
    const correo = this.getUserEmail();
    if (!correo) return;

    clearTimeout(this._pushTimer);
    const enviar = () => {
      const payload = {
        tipo: 'estado',
        correo: correo,
        cursoId: this.COURSE_ID,
        curso: COURSE_DATA.title || this.COURSE_ID,
        nombre: this.state.username || '',
        clases: this.state.completedLessons,
        quizzes: this.state.completedQuizzes,
        modulosVistos: `${this.getViewedModulesCount()}/${COURSE_DATA.modules.length}`,
        clasesVistas: `${this.getTotalCompletedLessons()}/${this.getTotalLessons()}`,
        quizzesAprobados: `${this.getCompletedQuizzesCount()}/${COURSE_DATA.modules.filter(m => m.quiz).length}`,
        progreso: this.getGlobalProgress(),
        fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
      };
      fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    };

    if (inmediato) enviar();
    else this._pushTimer = setTimeout(enviar, 1200);
  },

  // ---- LocalStorage ----
  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load saved state');
    }
  },

  saveState() {
    try {
      const toSave = {
        username: this.state.username,
        completedLessons: this.state.completedLessons,
        completedQuizzes: this.state.completedQuizzes,
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not save state');
    }
  },

  sendProgress(evento, detalle, puntaje) {
    try {
      const data = {
        tipo: 'avance',
        nombre: this.state.username || localStorage.getItem('tc_user_name') || '',
        correo: localStorage.getItem('tc_user_email') || '',
        cursoId: this.COURSE_ID,
        curso: COURSE_DATA.title || this.COURSE_ID,
        evento: evento,
        detalle: detalle,
        puntaje: puntaje !== undefined ? puntaje : '',
        modulosVistos: `${this.getViewedModulesCount()}/${COURSE_DATA.modules.length}`,
        progreso: this.getGlobalProgress(),
        fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
      };
      fetch(this.APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(err => console.warn('No se pudo enviar avance:', err));

      // Además del evento, se guarda el estado completo para poder retomarlo
      this.pushState();
    } catch (e) {
      console.warn('Error enviando avance:', e);
    }
  },

  resetProgress() {
    if (!confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) return;
    this.state.completedLessons = [];
    this.state.completedQuizzes = [];
    this.saveState();
    this.renderSidebar();
    this.renderDashboard();
    this.navigateTo('dashboard');
  },

  // ---- Welcome ----
  showWelcome() {
    document.getElementById('welcome-modal').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
    const input = document.getElementById('student-name');
    const btn = document.getElementById('start-btn');
    const emailGroup = document.getElementById('student-email-group');
    const emailInput = document.getElementById('student-email');

    // Si llegó directo al curso sin pasar por el portal no tenemos su correo,
    // y sin correo no se puede recuperar el avance desde otro equipo.
    const faltaCorreo = !this.getUserEmail();
    if (emailGroup && faltaCorreo) emailGroup.classList.remove('hidden');

    input.addEventListener('input', () => {
      btn.disabled = input.value.trim().length === 0;
    });

    btn.addEventListener('click', () => {
      const name = input.value.trim();
      if (!name) return;
      this.state.username = name;
      this.saveState();

      if (emailGroup && faltaCorreo && emailInput) {
        const correo = emailInput.value.trim();
        if (correo) localStorage.setItem('tc_user_email', correo);
      }

      document.getElementById('welcome-modal').classList.add('hidden');
      this.showApp();
      this.restoreFromCloud();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        btn.click();
      }
    });
  },

  // ---- App ----
  showApp() {
    document.getElementById('welcome-modal').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    this.renderSidebar();
    this.renderDashboard();
    this.navigateTo('dashboard');
  },

  // ---- Events ----
  bindEvents() {
    // Mobile menu
    document.getElementById('menu-toggle').addEventListener('click', () => this.toggleSidebar(true));
    document.getElementById('sidebar-close').addEventListener('click', () => this.toggleSidebar(false));
    document.getElementById('sidebar-overlay').addEventListener('click', () => this.toggleSidebar(false));

    // Reiniciar progreso (ya no está en el menú; se conserva por si se expone en otro sitio)
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetProgress());

    // Lesson tabs
    document.querySelectorAll('.lesson-tabs .tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.lesson-tabs .tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
      });
    });

    // Lesson actions (only static handlers here — dynamic onclick set in renderLessonActions)
    document.getElementById('btn-complete-lesson').addEventListener('click', () => this.completeCurrentLesson());
    document.getElementById('btn-back-lesson').addEventListener('click', () => this.navigateTo('dashboard'));
    document.getElementById('btn-back-quiz').addEventListener('click', () => {
      if (QuizEngine.hasUnsavedAttempt() &&
          !confirm('Si sales ahora se pierden las respuestas de este intento. ¿Seguro que quieres salir?')) return;
      QuizEngine.stopTimer();
      this.navigateTo('dashboard');
    });

    // Quiz actions
    const startQuizBtn = document.getElementById('btn-start-quiz');
    if (startQuizBtn) startQuizBtn.addEventListener('click', () => QuizEngine.beginAttempt());
    const cancelQuizBtn = document.getElementById('btn-cancel-quiz');
    if (cancelQuizBtn) cancelQuizBtn.addEventListener('click', () => this.navigateTo('dashboard'));
    document.getElementById('btn-submit-quiz').addEventListener('click', () => QuizEngine.submit());
    document.getElementById('btn-retry-quiz').addEventListener('click', () => QuizEngine.retry());
    document.getElementById('btn-next-module').addEventListener('click', () => this.goToNextModule());

    // Certificate
    document.getElementById('cert-close').addEventListener('click', () => {
      document.getElementById('cert-modal').classList.add('hidden');
    });
    const certNameBtn = document.getElementById('cert-name-edit');
    if (certNameBtn) certNameBtn.addEventListener('click', () => this.editCertName());
    document.getElementById('cert-download').addEventListener('click', () => this.downloadCertificatePNG());
    const pdfBtn = document.getElementById('cert-download-pdf');
    if (pdfBtn) pdfBtn.addEventListener('click', () => this.downloadCertificatePDF());

    // Pro course promo modal (shown on top of certificate — does NOT close cert)
    const promoModal = document.getElementById('promo-modal');
    if (promoModal) {
      const hidePromo = () => promoModal.classList.add('hidden');
      document.getElementById('promo-close').addEventListener('click', hidePromo);
      document.getElementById('promo-continue').addEventListener('click', hidePromo);
    }


  },

  toggleSidebar(open) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (open) {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    } else {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  },

  // ---- Navigation ----
  navigateTo(view, data) {
    // Al salir del quiz se detiene el temporizador
    if (this.state.currentView === 'quiz' && view !== 'quiz' && typeof QuizEngine !== 'undefined') {
      QuizEngine.stopTimer();
    }
    this.state.currentView = view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (view === 'dashboard') {
      document.getElementById('view-dashboard').classList.add('active');
      this.renderDashboard();
    } else if (view === 'lesson') {
      document.getElementById('view-lesson').classList.add('active');
      this.renderLesson(data.moduleIndex, data.lessonIndex);
    } else if (view === 'quiz') {
      document.getElementById('view-quiz').classList.add('active');
      QuizEngine.render(data.moduleIndex);
    }

    this.toggleSidebar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ---- Progress Helpers ----
  isLessonCompleted(lessonId) {
    return this.state.completedLessons.includes(lessonId);
  },

  isQuizCompleted(quizId) {
    return this.state.completedQuizzes.includes(quizId);
  },

  isModuleUnlocked(moduleIndex) {
    return true;
  },

  isLessonUnlocked(moduleIndex, lessonIndex) {
    return true;
  },

  isQuizUnlocked(moduleIndex) {
    return true;
  },

  // Un módulo cuenta como "visto" cuando el estudiante vio todas sus clases
  isModuleViewed(moduleIndex) {
    const mod = COURSE_DATA.modules[moduleIndex];
    return mod.lessons.length > 0 && mod.lessons.every(l => this.isLessonCompleted(l.id));
  },

  getViewedModulesCount() {
    return COURSE_DATA.modules.filter((mod, mi) => this.isModuleViewed(mi)).length;
  },

  getModuleProgress(moduleIndex) {
    const mod = COURSE_DATA.modules[moduleIndex];
    const hasQuiz = !!mod.quiz;
    const totalItems = mod.lessons.length + (hasQuiz ? 1 : 0);
    let completed = mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
    if (hasQuiz && this.isQuizCompleted(mod.quiz.id)) completed++;
    return totalItems > 0 ? Math.round((completed / totalItems) * 100) : 100;
  },

  getGlobalProgress() {
    let total = 0;
    let completed = 0;
    COURSE_DATA.modules.forEach(mod => {
      total += mod.lessons.length + (mod.quiz ? 1 : 0);
      completed += mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
      if (mod.quiz && this.isQuizCompleted(mod.quiz.id)) completed++;
    });
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },

  getTotalCompletedLessons() {
    return this.state.completedLessons.length;
  },

  getTotalLessons() {
    return COURSE_DATA.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  },

  getCompletedQuizzesCount() {
    return this.state.completedQuizzes.length;
  },

  isCourseDone() {
    return COURSE_DATA.modules.every((mod, i) => {
      const lessonsDone = mod.lessons.every(l => this.isLessonCompleted(l.id));
      const quizDone = mod.quiz ? this.isQuizCompleted(mod.quiz.id) : true;
      return lessonsDone && quizDone;
    });
  },

  // ---- Complete Actions ----
  completeCurrentLesson() {
    const mod = COURSE_DATA.modules[this.state.currentModuleIndex];
    const lesson = mod.lessons[this.state.currentLessonIndex];
    const wasAlreadyDone = this.isLessonCompleted(lesson.id);

    if (!wasAlreadyDone) {
      this.state.completedLessons.push(lesson.id);
      this.saveState();

      // Aviso al terminar de ver todas las clases de un módulo
      if (this.isModuleViewed(this.state.currentModuleIndex)) {
        this.showToast('module', `${this.UNIT_LABEL} ${this.state.currentModuleIndex + 1} visto`,
          `Llevas ${this.getViewedModulesCount()} de ${COURSE_DATA.modules.length} ${this.UNIT_LABEL.toLowerCase()}s vistos.`);
      }

      // Enviar avance a Google Sheets
      this.sendProgress('Lección completada', `${mod.title} — ${lesson.title}`);

      // Motivational message (30% chance)
      this.showMotivationalMessage();

      // Milestone 50% check
      this.checkMilestone50();

      // Confetti for lesson completion
      if (typeof Confetti !== 'undefined') {
        Confetti.lessonComplete();
      }
    }

    this.renderSidebar();
    this.renderLessonActions();
    this.updateGlobalProgress();
  },

  completeQuiz(moduleIndex, score) {
    const mod = COURSE_DATA.modules[moduleIndex];
    const quiz = mod && mod.quiz;
    if (!quiz) return;
    const wasAlreadyDone = this.isQuizCompleted(quiz.id);

    if (!wasAlreadyDone) {
      this.state.completedQuizzes.push(quiz.id);
      this.saveState();

      // Confeti según si el módulo quedó completo
      if (typeof Confetti !== 'undefined') {
        if (this.getModuleProgress(moduleIndex) === 100) Confetti.moduleComplete();
        else Confetti.quizPass();
      }

      // Enviar avance a Google Sheets
      this.sendProgress('Quiz aprobado', `${mod.title} — ${quiz.title}`, score);

      // Motivational message + milestone
      this.showMotivationalMessage();
      this.checkMilestone50();
    }

    this.renderSidebar();
    this.updateGlobalProgress();

    // Check if course is complete
    if (this.isCourseDone()) {
      this.sendProgress('Curso completado', COURSE_DATA.title, this.getGlobalProgress());
      setTimeout(() => {
        if (typeof Confetti !== 'undefined') {
          Confetti.courseComplete();
        }
        this.showCertificate();
      }, 800);
    }
  },

  // ---- Render Sidebar ----
  renderSidebar() {
    // Username
    document.getElementById('sidebar-username').textContent = this.state.username;
    document.getElementById('user-avatar').textContent = this.state.username.charAt(0).toUpperCase();

    document.getElementById('sidebar-level-label').textContent = 'Estudiante';

    // Módulos vistos
    const viewed = this.getViewedModulesCount();
    const totalMods = COURSE_DATA.modules.length;
    document.getElementById('modules-viewed-count').textContent = `${viewed} / ${totalMods}`;
    document.getElementById('modules-viewed-label').textContent =
      `${this.UNIT_LABEL}s vistos`;
    document.getElementById('modules-viewed-bar').style.width =
      `${totalMods > 0 ? Math.round((viewed / totalMods) * 100) : 0}%`;

    // Global progress
    this.updateGlobalProgress();

    // Modules nav
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = '';

    COURSE_DATA.modules.forEach((mod, mi) => {
      const unlocked = this.isModuleUnlocked(mi);
      const progress = this.getModuleProgress(mi);
      const isComplete = progress === 100;

      const moduleEl = document.createElement('div');
      moduleEl.className = `nav-module${unlocked ? '' : ' locked'}`;

      // Module button
      const modBtn = document.createElement('button');
      modBtn.className = `nav-module-btn${!unlocked ? ' locked' : ''}${isComplete ? ' completed' : ''}`;
      modBtn.innerHTML = `
        <span class="mod-icon">${mod.icon}</span>
        <span class="mod-title">${mod.title}</span>
        <span class="mod-chevron">▶</span>
      `;

      if (unlocked) {
        modBtn.addEventListener('click', () => {
          moduleEl.classList.toggle('open');
        });
      }

      moduleEl.appendChild(modBtn);

      // Lessons list
      const lessonsEl = document.createElement('div');
      lessonsEl.className = 'nav-lessons';

      mod.lessons.forEach((lesson, li) => {
        const lessonUnlocked = this.isLessonUnlocked(mi, li);
        const lessonDone = this.isLessonCompleted(lesson.id);

        const lessonBtn = document.createElement('button');
        lessonBtn.className = `nav-lesson-btn${lessonDone ? ' completed' : ''}${!lessonUnlocked ? ' locked' : ''}`;
        lessonBtn.innerHTML = `
          <span class="lesson-status">${lessonDone ? '✓' : !lessonUnlocked ? '🔒' : ''}</span>
          <span>${lesson.title}</span>
        `;

        if (lessonUnlocked) {
          lessonBtn.addEventListener('click', () => {
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: li });
          });
        }

        lessonsEl.appendChild(lessonBtn);
      });

      // Quiz button (solo si el módulo tiene quiz propio)
      if (mod.quiz) {
        const quizUnlocked = this.isQuizUnlocked(mi);
        const quizDone = this.isQuizCompleted(mod.quiz.id);

        const quizBtn = document.createElement('button');
        quizBtn.className = `nav-quiz-btn${quizDone ? ' completed' : ''}${!quizUnlocked ? ' locked' : ''}`;
        quizBtn.innerHTML = `
          <span class="quiz-icon">${quizDone ? '✓' : !quizUnlocked ? '🔒' : '?'}</span>
          <span>Quiz</span>
        `;

        if (quizUnlocked || quizDone) {
          quizBtn.addEventListener('click', () => {
            this.navigateTo('quiz', { moduleIndex: mi });
          });
        }

        lessonsEl.appendChild(quizBtn);
      }

      moduleEl.appendChild(lessonsEl);
      nav.appendChild(moduleEl);
    });

  },

  updateGlobalProgress() {
    const pct = this.getGlobalProgress();
    document.getElementById('global-progress-pct').textContent = `${pct}%`;
    document.getElementById('global-progress-bar').style.width = `${pct}%`;
    document.getElementById('header-progress-text').textContent = `${pct}%`;
  },

  // ---- Render Dashboard (Skill Tree) ----
  renderDashboard() {
    document.getElementById('dashboard-username').textContent = this.state.username;

    // Animate stat count-ups
    this.animateCountUp('stat-modules', this.getViewedModulesCount());
    this.animateCountUp('stat-modules-total', COURSE_DATA.modules.length);
    this.animateCountUp('stat-completed', this.getTotalCompletedLessons());
    this.animateCountUp('stat-total', this.getTotalLessons());
    this.animateCountUp('stat-quizzes', this.getCompletedQuizzesCount());
    const modLabel = document.getElementById('stat-modules-label');
    if (modLabel) modLabel.textContent = `${this.UNIT_LABEL}s vistos`;

    const tree = document.getElementById('skill-tree');
    tree.innerHTML = '';

    // Calculate total progress for the path fill
    const globalProgress = this.getGlobalProgress();

    // Central vertical path
    const pathEl = document.createElement('div');
    pathEl.className = 'skill-tree-path';
    pathEl.innerHTML = `<div class="skill-tree-path-fill" style="height: ${globalProgress}%"></div>`;
    tree.appendChild(pathEl);

    // Find first active module (first unlocked not-complete)
    const firstActiveIndex = COURSE_DATA.modules.findIndex((mod, mi) => {
      return this.isModuleUnlocked(mi) && this.getModuleProgress(mi) < 100;
    });

    // Render module nodes
    COURSE_DATA.modules.forEach((mod, mi) => {
      const unlocked = this.isModuleUnlocked(mi);
      const progress = this.getModuleProgress(mi);
      const isComplete = progress === 100;
      const isActive = mi === firstActiveIndex;
      const side = mi % 2 === 0 ? 'left' : 'right';

      // State class
      let stateClass = 'skill-node--locked';
      if (isComplete) stateClass = 'skill-node--completed';
      else if (isActive) stateClass = 'skill-node--unlocked skill-node--active';
      else if (unlocked) stateClass = 'skill-node--unlocked';

      // Status text
      const lessonsSeen = mod.lessons.filter(l => this.isLessonCompleted(l.id)).length;
      let statusText = '🔒 Bloqueado';
      if (isComplete) statusText = '✓ Completado';
      else if (this.isModuleViewed(mi)) statusText = '👁 Visto — falta el quiz';
      else if (unlocked) statusText = `${lessonsSeen} de ${mod.lessons.length} clases vistas`;

      // Progress ring calculations (circumference of circle with r=27)
      const circumference = 2 * Math.PI * 27;
      const dashOffset = circumference - (progress / 100) * circumference;

      const node = document.createElement('div');
      node.className = `skill-node skill-node--${side} ${stateClass}`;
      node.dataset.module = mi;

      node.innerHTML = `
        <div class="skill-node-connector"></div>
        <div class="skill-node-card btn-ripple">
          <div class="skill-node-circle">
            <span class="skill-node-icon">${mod.icon}</span>
            <svg class="skill-node-progress-ring" viewBox="0 0 62 62">
              <circle class="ring-bg" cx="31" cy="31" r="27"/>
              <circle class="ring-fill" cx="31" cy="31" r="27"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${isComplete ? 0 : dashOffset}"/>
            </svg>
            ${isComplete ? '<div class="skill-node-check">✓</div>' : ''}
            ${!unlocked ? '<div class="skill-node-lock">🔒</div>' : ''}
          </div>
          <div class="skill-node-info">
            <div class="skill-node-number">${this.UNIT_LABEL} ${mi + 1}</div>
            <div class="skill-node-title">${mod.title}</div>
            <div class="skill-node-status">${statusText}</div>
          </div>
        </div>
      `;

      // Click handler
      if (unlocked) {
        const card = node.querySelector('.skill-node-card');
        card.addEventListener('click', (e) => {
          this.createRipple(e, card);
          const firstIncompleteLessonIndex = mod.lessons.findIndex(l => !this.isLessonCompleted(l.id));
          if (firstIncompleteLessonIndex !== -1) {
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: firstIncompleteLessonIndex });
          } else if (mod.quiz && !this.isQuizCompleted(mod.quiz.id)) {
            this.navigateTo('quiz', { moduleIndex: mi });
          } else {
            this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: 0 });
          }
        });
      }

      // Dot on center path at node height
      const dot = document.createElement('div');
      let dotClass = 'skill-tree-dot';
      if (isComplete) dotClass += ' skill-tree-dot--completed';
      else if (unlocked) dotClass += ' skill-tree-dot--unlocked';
      dot.className = dotClass;

      tree.appendChild(node);
      tree.appendChild(dot);

      // Position dots relative to nodes after render
      requestAnimationFrame(() => {
        const nodeRect = node.getBoundingClientRect();
        const treeRect = tree.getBoundingClientRect();
        const nodeCenter = nodeRect.top - treeRect.top + nodeRect.height / 2;
        dot.style.top = `${nodeCenter}px`;
      });
    });

    // Certificate node if course is done
    if (this.isCourseDone()) {
      const certNode = document.createElement('div');
      const side = COURSE_DATA.modules.length % 2 === 0 ? 'left' : 'right';
      certNode.className = `skill-node skill-node--${side} skill-node--completed skill-node--cert`;
      certNode.innerHTML = `
        <div class="skill-node-connector" style="background:linear-gradient(90deg, #ffd700, #ff8c00);box-shadow:0 0 8px rgba(255,215,0,0.3);"></div>
        <div class="skill-node-card btn-ripple">
          <div class="skill-node-circle" style="border-color:#ffd700;background:rgba(255,215,0,0.08);box-shadow:0 0 15px rgba(255,215,0,0.15);">
            <span class="skill-node-icon">🎓</span>
          </div>
          <div class="skill-node-info">
            <div class="skill-node-number" style="color:#ffd700;">Completado</div>
            <div class="skill-node-title">Tu Certificado</div>
            <div class="skill-node-status" style="color:#ffd700;">Descargar certificado →</div>
          </div>
        </div>
      `;
      const certCard = certNode.querySelector('.skill-node-card');
      certCard.addEventListener('click', (e) => {
        this.createRipple(e, certCard);
        this.showCertificate();
      });

      const certDot = document.createElement('div');
      certDot.className = 'skill-tree-dot skill-tree-dot--completed';
      certDot.style.background = '#ffd700';
      certDot.style.borderColor = '#ffd700';
      certDot.style.boxShadow = '0 0 10px rgba(255,215,0,0.4)';

      tree.appendChild(certNode);
      tree.appendChild(certDot);

      requestAnimationFrame(() => {
        const nodeRect = certNode.getBoundingClientRect();
        const treeRect = tree.getBoundingClientRect();
        const nodeCenter = nodeRect.top - treeRect.top + nodeRect.height / 2;
        certDot.style.top = `${nodeCenter}px`;
      });
    }
  },

  // ---- Count-up Animation ----
  animateCountUp(elementId, targetValue) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const duration = 800;
    const startTime = performance.now();
    const startValue = 0;

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = targetValue;
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 400);
      }
    };

    requestAnimationFrame(update);
  },

  // ---- Ripple Effect ----
  createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  },

  // Extrae el ID de un archivo de Google Drive.
  // Acepta el ID suelto o el enlace completo copiado desde Drive:
  //   https://drive.google.com/file/d/ID/view?usp=sharing
  //   https://drive.google.com/open?id=ID
  parseDriveId(value) {
    if (!value) return '';
    const v = String(value).trim();
    if (!v || v === 'DRIVE_ID_PLACEHOLDER') return '';
    const m = v.match(/\/d\/([a-zA-Z0-9_-]{10,})/) || v.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
    if (m) return m[1];
    return /^[a-zA-Z0-9_-]{10,}$/.test(v) ? v : '';
  },

  // ---- Render Lesson ----
  renderLesson(moduleIndex, lessonIndex) {
    // Validate bounds
    const mod = COURSE_DATA.modules[moduleIndex];
    if (!mod || !mod.lessons[lessonIndex]) {
      this.navigateTo('dashboard');
      return;
    }

    this.state.currentModuleIndex = moduleIndex;
    this.state.currentLessonIndex = lessonIndex;

    const lesson = mod.lessons[lessonIndex];

    // Badge & title
    document.getElementById('lesson-badge').textContent = `${this.UNIT_LABEL} ${moduleIndex + 1} — Lección ${lessonIndex + 1}`;
    document.getElementById('lesson-title').textContent = lesson.title;
    document.getElementById('lesson-duration').innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      ${lesson.duration}
    `;

    // Video — always rebuild to avoid stale iframe references
    const videoContainer = document.getElementById('video-container');
    if (lesson.videoId && lesson.videoId !== 'VIDEO_ID_PLACEHOLDER') {
      const youtubeUrl = lesson.youtubeUrl || `https://www.youtube.com/watch?v=${lesson.videoId}`;
      if (lesson.noEmbed) {
        // Video doesn't allow embedding — show thumbnail with link to YouTube
        videoContainer.innerHTML = `
          <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="display:block;position:relative;padding-bottom:56.25%;background:#000;border-radius:12px;overflow:hidden;text-decoration:none;">
            <img src="https://img.youtube.com/vi/${lesson.videoId}/hqdefault.jpg" alt="${lesson.title}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.7;">
            <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
              <div style="width:68px;height:48px;background:red;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;">
                <div style="width:0;height:0;border-left:18px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:4px;"></div>
              </div>
              <span style="color:#fff;font-size:0.95rem;font-weight:600;text-shadow:0 1px 4px rgba(0,0,0,0.7);">Ver en YouTube</span>
            </div>
          </a>
        `;
      } else {
        videoContainer.innerHTML = `
          <div class="video-wrapper">
            <iframe src="https://www.youtube-nocookie.com/embed/${lesson.videoId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      }
    } else if (this.parseDriveId(lesson.driveId || lesson.driveUrl)) {
      // Grabación alojada en Google Drive
      const driveId = this.parseDriveId(lesson.driveId || lesson.driveUrl);
      videoContainer.innerHTML = `
        <div class="video-wrapper">
          <iframe src="https://drive.google.com/file/d/${driveId}/preview" frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>
        </div>
      `;
    } else if (COURSE_DATA.isLive) {
      // Curso en vivo: la grabación se publica después de cada sesión
      videoContainer.innerHTML = `
        <div class="video-wrapper" style="display:flex;align-items:center;justify-content:center;padding-bottom:0;height:300px;">
          <div style="text-align:center;color:var(--text-muted);padding:0 20px;">
            <div style="font-size:3rem;margin-bottom:12px;">🔴</div>
            <p style="color:var(--text-primary);font-weight:600;">Sesión en vivo</p>
            <p style="font-size:0.85rem;margin-top:6px;">La grabación de esta clase se cargará aquí una vez finalice la sesión.</p>
          </div>
        </div>
      `;
    } else {
      videoContainer.innerHTML = `
        <div class="video-wrapper" style="display:flex;align-items:center;justify-content:center;padding-bottom:0;height:300px;">
          <div style="text-align:center;color:var(--text-muted);">
            <div style="font-size:3rem;margin-bottom:12px;">▶</div>
            <p>Video pendiente de configurar</p>
            <p style="font-size:0.8rem;margin-top:4px;">Reemplaza VIDEO_ID_PLACEHOLDER en data.js con el ID de tu video de YouTube</p>
          </div>
        </div>
      `;
    }

    // Reading content - convert simple markdown-like text to HTML
    const readingHTML = this.formatReading(lesson.reading);
    document.getElementById('reading-content').innerHTML = readingHTML;

    // Resources
    const resourcesList = document.getElementById('resources-list');
    resourcesList.innerHTML = '';
    if (lesson.resources && lesson.resources.length > 0) {
      lesson.resources.forEach(res => {
        const iconMap = {
          notebook: { class: 'notebook', icon: '📓' },
          download: { class: 'download', icon: '⬇' },
          link: { class: 'link', icon: '🔗' },
          article: { class: 'article', icon: '📄' },
          github: { class: 'github', icon: '💻' },
        };
        const iconInfo = iconMap[res.type] || iconMap.link;

        const el = document.createElement('a');
        el.className = 'resource-item';
        el.href = res.url;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
        el.innerHTML = `
          <div class="resource-icon ${iconInfo.class}">${iconInfo.icon}</div>
          <div class="resource-info">
            <div class="resource-title">${res.title}</div>
            <div class="resource-type">${res.type}</div>
          </div>
          <span class="resource-arrow">→</span>
        `;
        resourcesList.appendChild(el);
      });
    } else {
      // La tarjeta de Materiales siempre está visible, así que necesita un texto por defecto
      resourcesList.innerHTML = '<p class="resources-empty">Sin materiales adicionales.</p>';
    }

    // Reset tabs to reading — solo si la vista usa pestañas.
    // En curso.html los Conceptos y los Recursos se muestran juntos, sin pestañas.
    const readingTab = document.querySelector('.lesson-tabs .tab[data-tab="reading"]');
    if (readingTab) {
      document.querySelectorAll('.lesson-tabs .tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      readingTab.classList.add('active');
      const readingPane = document.getElementById('tab-reading');
      if (readingPane) readingPane.classList.add('active');
    }

    // Render actions
    this.renderLessonActions();
  },

  renderLessonActions() {
    const mod = COURSE_DATA.modules[this.state.currentModuleIndex];
    const lesson = mod.lessons[this.state.currentLessonIndex];
    const isDone = this.isLessonCompleted(lesson.id);

    const completeBtn = document.getElementById('btn-complete-lesson');
    if (isDone) {
      completeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        Completada
      `;
      completeBtn.classList.add('completed-state');
      completeBtn.disabled = true;
    } else {
      completeBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        Marcar como completada
      `;
      completeBtn.classList.remove('completed-state');
      completeBtn.disabled = false;
    }

    // Next lesson button — capture current indices to avoid stale state reads
    const nextBtn = document.getElementById('btn-next-lesson');
    const mi = this.state.currentModuleIndex;
    const li = this.state.currentLessonIndex;
    const isLastLesson = li === mod.lessons.length - 1;

    // Always clear previous handler
    nextBtn.onclick = null;
    nextBtn.classList.add('hidden');

    const arrowSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>';

    if (isLastLesson) {
      if (mod.quiz && this.isQuizUnlocked(mi)) {
        // Quiz propio del módulo
        nextBtn.innerHTML = `Ir al Quiz ${arrowSvg}`;
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => this.navigateTo('quiz', { moduleIndex: mi });
      } else if (mi + 1 < COURSE_DATA.modules.length) {
        // Sin quiz de módulo: pasa al siguiente módulo
        if (isDone) {
          nextBtn.innerHTML = `Siguiente ${this.UNIT_LABEL.toLowerCase()} ${arrowSvg}`;
          nextBtn.classList.remove('hidden');
          nextBtn.onclick = () => this.navigateTo('lesson', { moduleIndex: mi + 1, lessonIndex: 0 });
        }
      }
    } else if (isDone) {
      // Only show next if current lesson is completed
      const nextLi = li + 1;
      if (nextLi < mod.lessons.length) {
        nextBtn.innerHTML = `
          Siguiente lección
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
        `;
        nextBtn.classList.remove('hidden');
        nextBtn.onclick = () => this.navigateTo('lesson', { moduleIndex: mi, lessonIndex: nextLi });
      }
    }
  },

  formatReading(text) {
    if (!text) return '';
    // Convert **bold** to <strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert lines starting with - to list items
    const lines = html.split('\n');
    let result = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        if (!inList) {
          result += '<ul>';
          inList = true;
        }
        result += `<li>${trimmed.substring(2)}</li>`;
      } else {
        if (inList) {
          result += '</ul>';
          inList = false;
        }
        if (trimmed === '') {
          // skip empty lines
        } else {
          result += `<p>${trimmed}</p>`;
        }
      }
    });

    if (inList) result += '</ul>';
    return result;
  },

  // ---- Navigation helpers ----
  goToNextModule() {
    const nextIndex = this.state.currentModuleIndex + 1;
    if (nextIndex < COURSE_DATA.modules.length) {
      if (this.isModuleUnlocked(nextIndex)) {
        this.navigateTo('lesson', { moduleIndex: nextIndex, lessonIndex: 0 });
      } else {
        this.navigateTo('dashboard');
      }
    } else {
      // Course complete
      this.navigateTo('dashboard');
    }
  },

  // ---- Certificate ----
  showCertificate() {
    document.getElementById('cert-modal').classList.remove('hidden');
    this.renderCertificate();
    this.renderCertName();
    this.showProCoursePromo();
  },

  // El certificado se expide con el nombre que el estudiante escribió,
  // así que se muestra para revisarlo antes de descargar.
  renderCertName() {
    const el = document.getElementById('cert-name-value');
    if (el) el.textContent = (this.state.username || '').trim() || 'Estudiante';
  },

  editCertName() {
    const actual = (this.state.username || '').trim();
    const nuevo = prompt('¿Cómo debe aparecer tu nombre en el certificado?', actual);
    if (nuevo === null) return;
    const limpio = nuevo.trim().slice(0, 60);
    if (!limpio) return;

    this.state.username = limpio;
    this.saveState();
    localStorage.setItem('tc_user_name', limpio);

    this.renderCertName();
    this.renderCertificate();
    this.renderSidebar();
    const dash = document.getElementById('dashboard-username');
    if (dash) dash.textContent = limpio;
    this.sendProgress('Nombre corregido', limpio);
    this.showToast('module', 'Nombre actualizado', 'Tu certificado se generará con el nuevo nombre.');
  },

  showProCoursePromo() {
    // Los cursos que ya son profesionales no muestran la promo de upgrade
    if (typeof COURSE_DATA !== 'undefined' && COURSE_DATA.hidePromo) return;
    const promo = document.getElementById('promo-modal');
    if (promo) promo.classList.remove('hidden');
  },

  renderCertificate() {
    const canvas = document.getElementById('cert-canvas');
    const ctx = canvas.getContext('2d');
    const draw = () => this._drawCertificate(ctx, canvas.width, canvas.height);

    if (this._certLogo && this._certLogo.complete && this._certLogo.naturalWidth > 0) {
      draw();
      return;
    }
    const img = new Image();
    img.onload = () => { this._certLogo = img; draw(); };
    img.onerror = () => { this._certLogo = null; draw(); };
    img.src = 'imagenes/logo.png';
  },

  _drawCertificate(ctx, w, h) {
    const FONT = "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif";

    ctx.clearRect(0, 0, w, h);

    // ---- Background gradient ----
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0a0d1a');
    bg.addColorStop(1, '#0e1226');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // ---- Subtle tech grid ----
    ctx.strokeStyle = 'rgba(196, 34, 50, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 50; x < w; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 50; y < h; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // ---- Soft corner glows ----
    const glow1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 480);
    glow1.addColorStop(0, 'rgba(196, 34, 50, 0.14)');
    glow1.addColorStop(1, 'rgba(196, 34, 50, 0)');
    ctx.fillStyle = glow1; ctx.fillRect(0, 0, 600, 600);
    const glow2 = ctx.createRadialGradient(w, h, 0, w, h, 480);
    glow2.addColorStop(0, 'rgba(107, 15, 24, 0.14)');
    glow2.addColorStop(1, 'rgba(107, 15, 24, 0)');
    ctx.fillStyle = glow2; ctx.fillRect(w - 600, h - 600, 600, 600);

    // ---- Gradient pen ----
    const accent = ctx.createLinearGradient(0, 0, w, h);
    accent.addColorStop(0, '#ff6b78');
    accent.addColorStop(1, '#c42232');

    // ---- Outer frame ----
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // ---- Tech corner brackets ----
    const br = 30;
    ctx.lineWidth = 3;
    ctx.strokeStyle = accent;
    ctx.beginPath(); ctx.moveTo(40, 40 + br); ctx.lineTo(40, 40); ctx.lineTo(40 + br, 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 40 - br, 40); ctx.lineTo(w - 40, 40); ctx.lineTo(w - 40, 40 + br); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, h - 40 - br); ctx.lineTo(40, h - 40); ctx.lineTo(40 + br, h - 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 40 - br, h - 40); ctx.lineTo(w - 40, h - 40); ctx.lineTo(w - 40, h - 40 - br); ctx.stroke();

    // ---- Header: logo (contains brand name) ----
    if (this._certLogo) {
      const maxLogoW = 440;
      const maxLogoH = 180;
      const natW = this._certLogo.naturalWidth || this._certLogo.width || maxLogoW;
      const natH = this._certLogo.naturalHeight || this._certLogo.height || maxLogoH;
      const scale = Math.min(maxLogoW / natW, maxLogoH / natH);
      const dw = natW * scale;
      const dh = natH * scale;
      const dx = (w - dw) / 2;
      const dy = 50 + (maxLogoH - dh) / 2;
      ctx.drawImage(this._certLogo, dx, dy, dw, dh);
    } else {
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px ' + FONT;
      ctx.textAlign = 'center';
      ctx.fillText('TRABAJO CIENTÍFICO', w / 2, 145);
    }

    // ---- Divider ----
    ctx.textBaseline = 'alphabetic';
    const dY = 220;
    const lineGrad = ctx.createLinearGradient(w / 2 - 280, 0, w / 2 + 280, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.5, '#ff6b78');
    lineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(w / 2 - 280, dY); ctx.lineTo(w / 2 + 280, dY); ctx.stroke();
    ctx.save();
    ctx.translate(w / 2, dY);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = accent;
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();

    // ---- "CERTIFICADO DE FORMACIÓN" ----
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '14px ' + FONT;
    ctx.textAlign = 'center';
    ctx.fillText('C E R T I F I C A D O    D E    F O R M A C I Ó N', w / 2, 257);

    // ---- "OTORGADO A" ----
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '13px ' + FONT;
    ctx.fillText('O T O R G A D O   A', w / 2, 298);

    // ---- Recipient name (big, gradient) ----
    const name = (this.state.username || '').trim() || 'Estudiante';
    const nameGrad = ctx.createLinearGradient(w / 2 - 260, 0, w / 2 + 260, 0);
    nameGrad.addColorStop(0, '#ff6b78');
    nameGrad.addColorStop(1, '#e04352');

    let nameSize = 52;
    ctx.font = 'bold ' + nameSize + 'px ' + FONT;
    while (ctx.measureText(name).width > w - 260 && nameSize > 30) {
      nameSize -= 2;
      ctx.font = 'bold ' + nameSize + 'px ' + FONT;
    }
    const nameY = 360;
    ctx.fillStyle = nameGrad;
    ctx.fillText(name, w / 2, nameY);

    const nameW = ctx.measureText(name).width;
    ctx.strokeStyle = nameGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - nameW / 2 - 30, nameY + 14);
    ctx.lineTo(w / 2 + nameW / 2 + 30, nameY + 14);
    ctx.stroke();

    // ---- "por completar..." ----
    ctx.fillStyle = '#a0a4b8';
    ctx.font = 'italic 18px ' + FONT;
    ctx.fillText('por completar satisfactoriamente el curso', w / 2, 432);

    // ---- COURSE TITLE (big, wrapped) ----
    const courseTitle = (typeof COURSE_DATA !== 'undefined' && COURSE_DATA.title) ? COURSE_DATA.title : 'Curso';
    let titleSize = 42;
    ctx.font = 'bold ' + titleSize + 'px ' + FONT;
    while (ctx.measureText(courseTitle).width > w - 240 && titleSize > 28) {
      titleSize -= 2;
      ctx.font = 'bold ' + titleSize + 'px ' + FONT;
    }
    ctx.fillStyle = '#ffffff';
    this._drawCenteredWrapped(ctx, courseTitle, w / 2, 495, w - 220, titleSize + 8);

    // ---- Hours badge ----
    const hours = (typeof COURSE_DATA !== 'undefined' && COURSE_DATA.hours) ? COURSE_DATA.hours : 9;
    const badgeText = hours + ' horas de formación';
    ctx.font = '600 16px ' + FONT;
    const badgeTextW = ctx.measureText(badgeText).width;
    const badgeW = badgeTextW + 70;
    const badgeH = 36;
    const badgeY = 560;
    const badgeX = (w - badgeW) / 2;
    ctx.fillStyle = 'rgba(196, 34, 50, 0.10)';
    ctx.strokeStyle = '#ff6b78';
    ctx.lineWidth = 1;
    this._roundRect(ctx, badgeX, badgeY - badgeH / 2, badgeW, badgeH, badgeH / 2);
    ctx.fill();
    ctx.stroke();
    // Clock icon
    ctx.strokeStyle = '#ff6b78';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(badgeX + 22, badgeY, 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(badgeX + 22, badgeY); ctx.lineTo(badgeX + 22, badgeY - 5);
    ctx.moveTo(badgeX + 22, badgeY); ctx.lineTo(badgeX + 26, badgeY);
    ctx.stroke();
    // Badge text
    ctx.fillStyle = '#ff6b78';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + 40, badgeY + 1);
    ctx.textBaseline = 'alphabetic';

    // ---- Bottom: two signatures (left & right) ----
    const sigY = 700;
    const leftCx = 240, rightCx = w - 240;
    const lineHalf = 120;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(leftCx - lineHalf, sigY); ctx.lineTo(leftCx + lineHalf, sigY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rightCx - lineHalf, sigY); ctx.lineTo(rightCx + lineHalf, sigY); ctx.stroke();

    ctx.textAlign = 'center';

    // Left signature — Oscar
    ctx.fillStyle = nameGrad;
    ctx.font = 'italic bold 28px "Segoe Script", "Brush Script MT", cursive';
    ctx.fillText('Oscar I. Vargas', leftCx, sigY - 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px ' + FONT;
    ctx.fillText('Oscar Ivan Vargas Pineda', leftCx, sigY + 22);
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '11px ' + FONT;
    ctx.fillText('CEO  ·  Trabajo Científico', leftCx, sigY + 40);

    // Right signature — Lali
    ctx.fillStyle = nameGrad;
    ctx.font = 'italic bold 28px "Segoe Script", "Brush Script MT", cursive';
    ctx.fillText('Lali V. Pedroza', rightCx, sigY - 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px ' + FONT;
    ctx.fillText('Lali Valentina Pedroza', rightCx, sigY + 22);
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '11px ' + FONT;
    ctx.fillText('Gestora Educativa  ·  Trabajo Científico', rightCx, sigY + 40);

    // ---- Center bottom: date + cert ID ----
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#a0a4b8';
    ctx.font = '11px ' + FONT;
    ctx.fillText('F E C H A   D E   E M I S I Ó N', w / 2, h - 90);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px ' + FONT;
    ctx.fillText(dateStr, w / 2, h - 72);

    ctx.fillStyle = 'rgba(255,255,255,0.32)';
    ctx.font = '10px ' + FONT;
    ctx.fillText('ID: ' + this._getCertId(), w / 2, h - 50);
  },

  _getCertId() {
    const name = (this.state.username || 'user').trim();
    const course = (typeof COURSE_DATA !== 'undefined' && COURSE_DATA.title) ? COURSE_DATA.title : 'course';
    const str = name + '|' + course;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'TC-' + Math.abs(hash).toString(36).toUpperCase().padStart(8, '0');
  },

  _roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  },

  _drawCenteredWrapped(ctx, text, cx, cy, maxWidth, lineHeight) {
    const words = text.split(' ');
    const lines = [];
    let line = '';
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);

    const startY = cy - ((lines.length - 1) * lineHeight) / 2;
    ctx.textAlign = 'center';
    lines.forEach((l, i) => ctx.fillText(l, cx, startY + i * lineHeight));
  },

  _baseFilename() {
    const user = (this.state.username || 'estudiante').replace(/\s+/g, '_');
    const course = (COURSE_DATA.title || 'curso').replace(/\s+/g, '_');
    return `Certificado_${user}_${course}`;
  },

  _renderHighRes(scale = 3) {
    const W = 1200, H = 800;
    const off = document.createElement('canvas');
    off.width = W * scale;
    off.height = H * scale;
    const ctx = off.getContext('2d');
    ctx.scale(scale, scale);
    this._drawCertificate(ctx, W, H);
    return off;
  },

  _doHighResRender(cb) {
    if (this._certLogo && this._certLogo.complete && this._certLogo.naturalWidth > 0) {
      cb(this._renderHighRes(3));
      return;
    }
    const img = new Image();
    img.onload = () => { this._certLogo = img; cb(this._renderHighRes(3)); };
    img.onerror = () => { this._certLogo = null; cb(this._renderHighRes(3)); };
    img.src = 'imagenes/logo.png';
  },

  downloadCertificatePNG() {
    this._doHighResRender((canvas) => {
      const link = document.createElement('a');
      link.download = this._baseFilename() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  },

  _loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.onload = () => resolve(window.jspdf.jsPDF);
      s.onerror = () => reject(new Error('No se pudo cargar jsPDF'));
      document.head.appendChild(s);
    });
  },

  downloadCertificatePDF() {
    const btn = document.getElementById('cert-download-pdf');
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Generando PDF...'; }
    this._loadJsPDF()
      .then((jsPDF) => {
        this._doHighResRender((canvas) => {
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [1200, 800] });
          pdf.addImage(imgData, 'JPEG', 0, 0, 1200, 800, undefined, 'FAST');
          pdf.save(this._baseFilename() + '.pdf');
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
        });
      })
      .catch((err) => {
        alert('No se pudo generar el PDF: ' + err.message);
        if (btn) { btn.disabled = false; btn.textContent = originalText; }
      });
  },

  // ============================================
  //  GAMIFICATION SYSTEM
  // ============================================

  // ============================================
  //  MOTIVATIONAL MESSAGES
  // ============================================
  showMotivationalMessage() {
    if (Math.random() < 0.3) {
      const msgs = this.MOTIVATIONAL_MESSAGES;
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setTimeout(() => {
        this.showToast('tip', msg, '');
      }, 1500);
    }
  },

  // ============================================
  //  MILESTONE 50%
  // ============================================
  checkMilestone50() {
    const progress = this.getGlobalProgress();
    if (progress === 50) {
      setTimeout(() => {
        this.showToast('achievement', '¡Medio camino!', 'Has completado el 50% del curso. ¡Sigue así!');
        if (typeof Confetti !== 'undefined') {
          Confetti.courseComplete();
        }
      }, 2000);
    }
  },

  // ---- Toast Notifications ----
  showToast(type, title, description) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    const iconMap = {
      module: '👁',
      achievement: '🎉',
      tip: '💡',
    };

    toast.innerHTML = `
      <span class="toast-icon">${iconMap[type] || '📣'}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${description || ''}</div>
      </div>
    `;

    container.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },
};

// ---- Boot ----
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    App.init();
    AI.init();
  });
} else {
  App.init();
  AI.init();
}
