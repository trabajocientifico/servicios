/* ============================================
   Preferencias de lectura — tema claro u oscuro
   Se carga en el <head> para aplicar la preferencia
   antes del primer pintado y evitar el parpadeo.
   La preferencia es global a toda la plataforma.
   ============================================ */

(function () {
  const KEY_THEME = 'tc_theme';
  const KEY_FONT_LEGACY = 'tc_font'; // el ajuste de tamaño de texto ya no existe
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

  // Limpia la preferencia antigua: sin botones, quien la tuviera guardada
  // se quedaría con el texto ampliado y sin forma de volver atrás.
  try { localStorage.removeItem(KEY_FONT_LEGACY); } catch (e) { /* modo privado */ }

  function getTheme() { return read(KEY_THEME, ['claro', 'oscuro'], 'oscuro'); }

  function applyToRoot() {
    if (getTheme() === 'claro') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');

    root.removeAttribute('data-font');
  }

  // Se aplica de inmediato (el <html> ya existe mientras se procesa el <head>)
  applyToRoot();

  function syncControls() {
    const theme = getTheme();

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

  function bind() {
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

  window.Prefs = { getTheme, setTheme };
})();
