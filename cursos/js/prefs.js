/* ============================================
   Preferencias de lectura — tema y tamaño de texto
   Se carga en el <head> para aplicar las preferencias
   antes del primer pintado y evitar el parpadeo.
   Las preferencias son globales a toda la plataforma.
   ============================================ */

(function () {
  const KEY_THEME = 'tc_theme';
  const KEY_FONT = 'tc_font';
  const FONTS = ['normal', 'grande', 'extra'];
  const FONT_LABEL = { normal: 'Normal', grande: 'Grande', extra: 'Muy grande' };
  const root = document.documentElement;

  function read(key, valid, fallback) {
    try {
      const v = localStorage.getItem(key);
      return valid.includes(v) ? v : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* modo privado */ }
  }

  function getTheme() { return read(KEY_THEME, ['claro', 'oscuro'], 'oscuro'); }
  function getFont() { return read(KEY_FONT, FONTS, 'normal'); }

  function applyToRoot() {
    const theme = getTheme();
    const font = getFont();

    if (theme === 'claro') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');

    if (font === 'normal') root.removeAttribute('data-font');
    else root.setAttribute('data-font', font);
  }

  // Se aplica de inmediato (el <html> ya existe mientras se procesa el <head>)
  applyToRoot();

  function syncControls() {
    const theme = getTheme();
    const font = getFont();

    document.querySelectorAll('[data-pref-font]').forEach(btn => {
      const active = btn.getAttribute('data-pref-font') === font;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    document.querySelectorAll('[data-pref-theme]').forEach(btn => {
      // El botón anuncia a qué tema cambia, no en cuál está
      const irA = theme === 'claro' ? 'oscuro' : 'claro';
      btn.setAttribute('aria-label', `Cambiar a tema ${irA}`);
      btn.setAttribute('title', `Cambiar a tema ${irA}`);
      const icon = btn.querySelector('[data-pref-theme-icon]');
      const text = btn.querySelector('[data-pref-theme-text]');
      if (icon) icon.textContent = theme === 'claro' ? '☀️' : '🌙';
      if (text) text.textContent = theme === 'claro' ? 'Tema claro' : 'Tema oscuro';
    });
  }

  function setTheme(value) {
    save(KEY_THEME, value);
    applyToRoot();
    syncControls();
  }

  function setFont(value) {
    if (!FONTS.includes(value)) return;
    save(KEY_FONT, value);
    applyToRoot();
    syncControls();
  }

  function bind() {
    document.querySelectorAll('[data-pref-font]').forEach(btn => {
      btn.addEventListener('click', () => setFont(btn.getAttribute('data-pref-font')));
    });
    document.querySelectorAll('[data-pref-theme]').forEach(btn => {
      btn.addEventListener('click', () => setTheme(getTheme() === 'claro' ? 'oscuro' : 'claro'));
    });
    syncControls();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  window.Prefs = { getTheme, getFont, setTheme, setFont, FONT_LABEL };
})();
