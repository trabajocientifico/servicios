'use strict';
(() => {
const C = window.CURSO;
const vista = document.getElementById('vista');
document.getElementById('miga-nodo').textContent = `${C.codigo} · ${C.titulo}`;
const CLAVE = 'ox-sim-' + C.codigo.toLowerCase();
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Estado guardado en el navegador (solo para la simulación)
const leer = (k, d) => { try { return JSON.parse(localStorage.getItem(CLAVE + '-' + k)) ?? d; } catch { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(CLAVE + '-' + k, JSON.stringify(v)); } catch {} };
const vistas = new Set(leer('vistas', []));
const marcas = new Set(leer('marcas', []));

// Lista plana de unidades en orden
const TODAS = [];
C.secciones.forEach((sec, si) => sec.subsecciones.forEach((sub, bi) => sub.unidades.forEach(u => TODAS.push({ sec, si, sub, bi, u }))));
const buscar = cod => TODAS.findIndex(x => x.u.codigo === cod);
const hechaSub = sub => sub.unidades.every(u => vistas.has(u.codigo));
const hechaSec = sec => sec.subsecciones.every(hechaSub);
const pendientes = TODAS.filter(x => x.u.plantilla === 'pendiente').length;

const ICONO = {
  check: '<svg viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.6l4.6-5"/></svg>',
  libro: '<svg viewBox="0 0 24 24"><path d="M5 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5zM8 3v18M18 17H8"/></svg>',
  problema: '<svg viewBox="0 0 24 24"><path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6"/><path d="M18 3l3 3-9 9H9v-3z"/></svg>',
  der: '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
  izq: '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  abajo: '<svg viewBox="0 0 24 24"><path d="m5 9 7 7 7-7"/></svg>',
  flechaIzq: '<svg viewBox="0 0 24 24"><path d="M20 12H4m6-6-6 6 6 6"/></svg>',
  flechaDer: '<svg viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M3 6h12M3 12h9M3 18h12M21 8l-4 4 4 4"/></svg>',
  marca: '<svg viewBox="0 0 20 22"><path d="M4 2h12v18l-6-4-6 4z"/></svg>',
  brujula: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>'
};
const check = hecho => `<span class="ox-check ${hecho ? 'hecho' : 'vacio'}" aria-label="${hecho ? 'Completado' : 'Sin completar'}" role="img">${ICONO.check}</span>`;
const iconoUnidad = u => u.icono === 'problema' ? ICONO.problema : ICONO.libro;

function marcarPestana(tab) {
  document.querySelectorAll('.ox-pestanas a').forEach(a => a.toggleAttribute('aria-current', a.dataset.tab === tab));
  if (tab) document.querySelector(`.ox-pestanas a[data-tab="${tab}"]`)?.setAttribute('aria-current', 'page');
}

// ---------- Pestaña Nodo: portada con el esquema ----------
function inicio() {
  marcarPestana('nodo');
  const ultima = leer('ultima', TODAS[0].u.codigo);
  const abiertas = leer('abiertas', null);
  vista.innerHTML = `<div class="ox-inicio">
  <h1>${esc(C.titulo)}</h1>
  <div>
   ${pendientes ? `<section class="ox-aviso"><div><h2>¡Pronto habrá más contenido!</h2><p>Este nodo tendrá más contenido en una fecha futura. Presta atención a las actualizaciones por correo electrónico o vuelve a consultar este nodo para ver las novedades.</p></div>
   <a class="ox-boton" href="#/u/B1.3">Ver el programa del nodo</a></section>` : ''}
  </div>
  <aside class="ox-herr"><h2>Herramientas del nodo</h2><ul>
   <li>${ICONO.marca.replace('<svg', '<svg fill="currentColor"')}<a href="#/progreso">Marcadores (${marcas.size})</a></li>
   <li>${ICONO.brujula}<button type="button" data-ir="${TODAS[0].u.codigo}">Iniciar recorrido</button></li></ul></aside>
  <div class="ox-retoma"><strong>Retoma por donde quedaste</strong><a href="#/u/${esc(ultima)}">Continuar con el nodo</a></div>
  <div class="ox-esquema">
   <div class="ox-esquema-acciones"><button class="ox-boton sec" type="button" id="expandir">Expandir todo</button></div>
   ${C.secciones.map((sec, si) => `<section class="ox-sec" ${abiertas && !abiertas.includes(si) ? 'data-cerrada' : ''} data-sec="${si}">
    <button type="button" aria-expanded="${!(abiertas && !abiertas.includes(si))}">${check(hechaSec(sec))}<span>${esc(sec.titulo)}</span><span class="ox-menos" aria-hidden="true">${abiertas && !abiertas.includes(si) ? '+' : '–'}</span></button>
    <ul class="ox-subs">${sec.subsecciones.map(sub => `<li><a href="#/u/${sub.unidades[0].codigo}">${check(hechaSub(sub))}<span>${esc(sub.titulo)}${sub.nota ? `<small>${esc(sub.nota)}</small>` : ''}</span></a></li>`).join('')}</ul>
   </section>`).join('')}
  </div></div>`;
  const estado = () => guardar('abiertas', [...vista.querySelectorAll('.ox-sec:not([data-cerrada])')].map(s => +s.dataset.sec));
  vista.querySelectorAll('.ox-sec>button').forEach(b => b.addEventListener('click', () => {
    const s = b.parentElement, cerrada = s.toggleAttribute('data-cerrada');
    b.setAttribute('aria-expanded', String(!cerrada)); b.querySelector('.ox-menos').textContent = cerrada ? '+' : '–'; estado();
  }));
  const exp = document.getElementById('expandir');
  const rotular = () => { exp.textContent = vista.querySelector('.ox-sec[data-cerrada]') ? 'Expandir todo' : 'Contraer todo'; };
  exp.addEventListener('click', () => {
    const abrir = !!vista.querySelector('.ox-sec[data-cerrada]');
    vista.querySelectorAll('.ox-sec').forEach(s => { s.toggleAttribute('data-cerrada', !abrir); s.querySelector('button').setAttribute('aria-expanded', String(abrir)); s.querySelector('.ox-menos').textContent = abrir ? '–' : '+'; });
    estado(); rotular();
  });
  rotular();
}

// ---------- Vista de unidad ----------
let panelSeccion = null, panelOculto = false, subAbiertas = new Set();
function panel(pos) {
  if (panelOculto) return `<aside class="ox-panel"><div class="ox-panel-cab"><button type="button" data-panel="mostrar" aria-label="Mostrar el esquema del nodo">${ICONO.menu}</button><h2>Esquema</h2></div></aside>`;
  if (panelSeccion === null) {
    return `<aside class="ox-panel" aria-label="Esquema del nodo"><div class="ox-panel-cab"><h2>Esquema del nodo</h2><button type="button" data-panel="ocultar" aria-label="Ocultar el esquema">${ICONO.menu}</button></div>
    <ul class="ox-panel-lista ox-nivel1">${C.secciones.map((sec, si) => `<li><button class="ox-fila" type="button" data-seccion="${si}">${check(hechaSec(sec))}<span>${esc(sec.titulo)}</span>${ICONO.der.replace('<svg', '<svg class="ox-flecha"')}</button></li>`).join('')}</ul></aside>`;
  }
  const sec = C.secciones[panelSeccion];
  return `<aside class="ox-panel" aria-label="Esquema del nodo"><div class="ox-panel-cab"><button type="button" class="ox-volver" data-seccion="arriba">${ICONO.izq}<span>${esc(sec.titulo)}</span></button><button type="button" data-panel="ocultar" aria-label="Ocultar el esquema">${ICONO.menu}</button></div>
  <ul class="ox-panel-lista">${sec.subsecciones.map((sub, bi) => {
    const clave = panelSeccion + '-' + bi, abierta = subAbiertas.has(clave);
    return `<li class="ox-sub"><button type="button" data-sub="${clave}" aria-expanded="${abierta}">${check(hechaSub(sub))}<span>${esc(sub.titulo)}${sub.nota ? `<small>${esc(sub.nota)}</small>` : ''}</span>${ICONO.abajo.replace('<svg', '<svg class="ox-flecha"')}</button>
    ${abierta ? `<ul class="ox-unis">${sub.unidades.map(u => `<li><a href="#/u/${u.codigo}" ${u.codigo === pos.u.codigo ? 'aria-current="page"' : ''}>${iconoUnidad(u)}<span>${esc(u.codigo)} · ${esc(u.titulo)}</span>${u.plantilla === 'pendiente' ? '<span class="ox-pend">Pendiente</span>' : ''}</a></li>`).join('')}</ul>` : ''}</li>`;
  }).join('')}</ul></aside>`;
}

function unidad(cod) {
  const i = buscar(cod);
  if (i < 0) return inicio();
  marcarPestana('nodo');
  const pos = TODAS[i], u = pos.u;
  vistas.add(u.codigo); guardar('vistas', [...vistas]); guardar('ultima', u.codigo);
  panelSeccion = pos.si; subAbiertas.add(pos.si + '-' + pos.bi);
  const ant = TODAS[i - 1], sig = TODAS[i + 1];
  const pintar = () => {
    vista.innerHTML = `<div class="ox-curso">${panel(pos)}
    <article class="ox-unidad" aria-labelledby="titulo-unidad">
     <div class="ox-unidad-cab"><h1 id="titulo-unidad">${esc(u.codigo)} · ${esc(u.titulo)}</h1>
      <div class="ox-flechas"><button type="button" data-ir="${ant?.u.codigo ?? ''}" ${ant ? '' : 'disabled'} aria-label="Unidad anterior">${ICONO.flechaIzq}</button><button type="button" data-ir="${sig?.u.codigo ?? ''}" ${sig ? '' : 'disabled'} aria-label="Unidad siguiente">${ICONO.flechaDer}</button></div></div>
     <button type="button" class="ox-marcar" aria-pressed="${marcas.has(u.codigo)}">${ICONO.marca}${marcas.has(u.codigo) ? 'Página marcada' : 'Marcar esta página'}</button>
     <div class="ox-componente">${u.html}</div>
     ${u.problema ? `<div class="ox-componente">${problema(u)}</div>` : ''}
     <div class="ox-pie">${ant ? `<button class="ox-boton sec" type="button" data-ir="${ant.u.codigo}">← Anterior</button>` : '<span></span>'}${sig ? `<button class="ox-boton" type="button" data-ir="${sig.u.codigo}">Siguiente →</button>` : ''}</div>
    </article></div>`;
    activarProblema(u);
  };
  pintar();
  vista.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.seccion !== undefined) { panelSeccion = b.dataset.seccion === 'arriba' ? null : +b.dataset.seccion; actualizarPanel(pos); }
    else if (b.dataset.sub) { subAbiertas.has(b.dataset.sub) ? subAbiertas.delete(b.dataset.sub) : subAbiertas.add(b.dataset.sub); actualizarPanel(pos); }
    else if (b.dataset.panel) { panelOculto = b.dataset.panel === 'ocultar'; actualizarPanel(pos); }
    else if (b.classList.contains('ox-marcar')) {
      marcas.has(u.codigo) ? marcas.delete(u.codigo) : marcas.add(u.codigo); guardar('marcas', [...marcas]);
      b.setAttribute('aria-pressed', marcas.has(u.codigo)); b.lastChild.textContent = marcas.has(u.codigo) ? 'Página marcada' : 'Marcar esta página';
    }
  };
  window.scrollTo(0, 0);
}
function actualizarPanel(pos) {
  const viejo = vista.querySelector('.ox-panel'); const t = document.createElement('div'); t.innerHTML = panel(pos); viejo.replaceWith(t.firstElementChild);
}

// Componente «Problema» (opción múltiple), con la apariencia sencilla de Open edX
function problema(u) {
  const r = leer('resp-' + u.codigo, null);
  return `<section class="ox-problema" data-problema="${u.codigo}"><h2>${esc(u.problema.titulo)} <small style="font-size:14px;font-weight:400;color:#5C6062">(sin calificar)</small></h2>
  ${u.problema.preguntas.map((p, qi) => `<div class="ox-pregunta"><fieldset><legend>${qi + 1}. ${esc(p.enunciado)}</legend>
   ${p.opciones.map((o, k) => `<label><input type="radio" name="q${qi}" value="${k}" ${r && r[qi] === k ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('')}</fieldset><div class="ox-retro" hidden></div></div>`).join('')}
  <div class="ox-envio"><button class="ox-boton" type="button" data-enviar>Enviar</button><span class="ox-puntaje" role="status"></span></div></section>`;
}
function activarProblema(u) {
  const s = vista.querySelector('[data-problema]'); if (!s) return;
  const corregir = resp => {
    let n = 0;
    u.problema.preguntas.forEach((p, qi) => {
      const caja = s.querySelectorAll('.ox-pregunta')[qi], sel = resp[qi], ok = sel === p.correcta; if (ok) n++;
      caja.querySelectorAll('label').forEach((l, k) => { l.classList.toggle('ok', k === sel && ok); l.classList.toggle('mal', k === sel && !ok); });
      const retro = caja.querySelector('.ox-retro');
      if (sel === undefined || sel === null) { retro.hidden = true; return; }
      retro.hidden = false; retro.classList.toggle('mal', !ok);
      retro.innerHTML = `<p><strong>${ok ? 'Correcto' : 'Incorrecto'}:</strong> ${esc(ok ? p.siOk : p.siNo)}</p><p><strong>Explicación:</strong> ${esc(p.explicacion)}</p>`;
    });
    s.querySelector('.ox-puntaje').textContent = `${n} de ${u.problema.preguntas.length} ideas reconocidas · respuestas guardadas en esta simulación`;
  };
  const previa = leer('resp-' + u.codigo, null); if (previa) corregir(previa);
  s.querySelector('[data-enviar]').addEventListener('click', () => {
    const resp = u.problema.preguntas.map((_, qi) => { const x = s.querySelector(`input[name=q${qi}]:checked`); return x ? +x.value : null; });
    if (resp.some(x => x === null)) { s.querySelector('.ox-puntaje').textContent = 'Responde todas las preguntas antes de enviar.'; return; }
    guardar('resp-' + u.codigo, resp); corregir(resp);
  });
}

// ---------- Otras pestañas ----------
function progreso() {
  marcarPestana('progreso');
  const total = TODAS.length, hechas = TODAS.filter(x => vistas.has(x.u.codigo)).length, pct = Math.round(hechas / total * 100);
  vista.innerHTML = `<div class="ox-pagina"><h1>Tu progreso</h1><p class="ox-lead">En la simulación, una unidad cuenta como vista al abrirla. En Open edX el avance lo calcula la plataforma.</p>
  <p><strong>${hechas} de ${total} unidades vistas (${pct} %)</strong></p><div class="ox-barra" role="img" aria-label="${pct} %"><span style="width:${pct}%"></span></div>
  ${marcas.size ? `<h2 style="margin-top:28px">Marcadores</h2><ul>${[...marcas].map(c => { const x = TODAS[buscar(c)]; return x ? `<li><a href="#/u/${c}">${esc(c)} · ${esc(x.u.titulo)}</a></li>` : ''; }).join('')}</ul>` : ''}
  <table class="ox-tabla"><thead><tr><th>Sección</th><th>Subsección</th><th>Unidades vistas</th></tr></thead><tbody>
  ${C.secciones.map(sec => sec.subsecciones.map((sub, bi) => `<tr>${bi === 0 ? `<td rowspan="${sec.subsecciones.length}">${esc(sec.titulo)}</td>` : ''}<td><a href="#/u/${sub.unidades[0].codigo}">${esc(sub.titulo)}</a></td><td>${sub.unidades.filter(u => vistas.has(u.codigo)).length} de ${sub.unidades.length}</td></tr>`).join('')).join('')}
  </tbody></table><p style="margin-top:20px"><button class="ox-boton sec" type="button" id="reiniciar">Reiniciar la simulación</button></p></div>`;
  document.getElementById('reiniciar').onclick = () => { Object.keys(localStorage).filter(k => k.startsWith(CLAVE)).forEach(k => localStorage.removeItem(k)); location.hash = '#/'; location.reload(); };
}
function fechas() {
  marcarPestana('fechas');
  vista.innerHTML = `<div class="ox-pagina"><h1>Fechas importantes</h1><p class="ox-lead">Dedicación estimada del nodo: ${esc(C.duracion.horas)}${C.duracion.semanas ? ' en ' + esc(C.duracion.semanas) : ''}${C.duracion.nota ? ' (' + esc(C.duracion.nota.toLowerCase()) + ')' : ''}. Las fechas las define el equipo al programar la cohorte en Studio.</p>
  <table class="ox-tabla"><thead><tr><th>Semana sugerida</th><th>Secciones</th></tr></thead><tbody>
  ${C.secciones.filter(s => s.tema !== undefined).map((s, i) => `<tr><td>Semana ${i + 1}</td><td>${i === 0 ? 'Bienvenida · Conocimientos previos · ' : ''}${esc(s.titulo)}</td></tr>`).join('')}</tbody></table>
  <p class="ox-lead" style="margin-top:14px">Distribución de referencia para la simulación: una sección por semana.</p></div>`;
}
function discusion() {
  marcarPestana('discusion');
  vista.innerHTML = `<div class="ox-pagina"><h1>Discusión</h1><div class="ox-vacio">El foro del nodo se activa en la plataforma. La simulación no incluye discusiones.</div></div>`;
}
function recursos() {
  marcarPestana('recursos');
  const pdf = new Set();
  TODAS.forEach(x => (x.u.html.match(/archivos\/[^"]+\.pdf/g) || []).forEach(p => pdf.add(p)));
  vista.innerHTML = `<div class="ox-pagina"><h1>Recursos</h1><p class="ox-lead">Documentos del nodo para descargar.</p>
  ${pdf.size ? '' : '<div class="ox-vacio">Este nodo todavía no tiene documentos para descargar.</div>'}
  <ul class="ox-archivos">${[...pdf].map(p => `<li><span class="ox-check hecho" aria-hidden="true">${ICONO.check}</span><a href="${p}" target="_blank" rel="noopener">${esc(p.replace('archivos/', '').replace(/_/g, ' ').replace('.pdf', ''))}</a><span>PDF</span></li>`).join('')}</ul></div>`;
}

// ---------- Rutas ----------
function ruta() {
  const h = location.hash.replace(/^#/, '');
  vista.onclick = null;
  const m = h.match(/^\/u\/(.+)$/);
  if (m) unidad(decodeURIComponent(m[1]));
  else if (h === '/progreso') progreso();
  else if (h === '/fechas') fechas();
  else if (h === '/discusion') discusion();
  else if (h === '/recursos') recursos();
  else inicio();
  document.title = (document.querySelector('#vista h1')?.textContent || 'Nodo') + ' · ' + C.etiqueta + ' · Simulación Open edX';
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-ir]'); if (b && b.dataset.ir) location.hash = '#/u/' + b.dataset.ir;
});
addEventListener('hashchange', () => { ruta(); vista.focus({ preventScroll: true }); });
ruta();
})();
