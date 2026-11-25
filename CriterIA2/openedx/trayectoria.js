'use strict';
(() => {
const R = window.RED;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const leer = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const POR_NODO = Object.fromEntries(R.nodos.map(n => [n.codigo, n]));
const CAT = Object.fromEntries(R.categorias.map(c => [c.id, c]));
const CLAVE_TRAYECTO = 'ox-sim-trayectoria';

// Trayectoria inicial: los nodos que ya se pueden abrir.
let trayecto = leer(CLAVE_TRAYECTO, null);
if (!Array.isArray(trayecto)) trayecto = R.nodos.filter(n => n.disponible).map(n => n.codigo);
trayecto = trayecto.filter(c => POR_NODO[c]?.disponible);

// Estado de un nodo según las unidades vistas en su simulación (mismo navegador).
function estado(n) {
  if (!n.disponible) return { tipo: 'pronto', texto: 'Próximamente' };
  const vistas = new Set(leer(`ox-sim-${n.clave}-vistas`, []));
  const hechas = n.unidades.filter(u => vistas.has(u)).length, pct = Math.round(100 * hechas / n.unidades.length);
  if (!hechas) return { tipo: 'nuevo', texto: 'Sin iniciar', pct };
  if (hechas === n.unidades.length) return { tipo: 'fin', texto: 'Finalizado', pct };
  return { tipo: 'curso', texto: 'En progreso', pct };
}
const destino = n => `${n.clave}/index.html#/u/${encodeURIComponent(leer(`ox-sim-${n.clave}-ultima`, n.primera))}`;
const CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-9"/></svg>';
function circulo(n, e) {
  return `<span class="tr-circulo"><span class="tr-cod">${e.tipo === 'fin' ? CHECK : esc(n.codigo)}</span>${e.tipo === 'curso' ? '<span class="tr-medio" aria-hidden="true"></span>' : ''}</span>`;
}

// ---------- Mi trayectoria ----------
function pintarTrayecto() {
  const items = trayecto.map(c => POR_NODO[c]);
  const arco = `<li class="tr-arco" aria-hidden="true"><svg viewBox="0 0 170 60"><path d="M8 52 C 50 4, 120 4, 160 30"/><path class="tr-punta" d="M150 18 l12 13 -16 4z"/></svg></li>`;
  $('trayecto').innerHTML = items.map((n, i) => {
    const e = estado(n);
    return `${i ? arco : ''}<li><a class="tr-item tr-${e.tipo}" href="${destino(n)}" aria-label="${esc(n.codigo)} · ${esc(n.nombre)}. ${e.texto}${e.pct ? ', ' + e.pct + ' %' : ''}">
      ${circulo(n, e)}<span class="tr-chip">${e.texto}${e.tipo === 'curso' ? ` · ${e.pct} %` : ''}</span><span class="tr-nombre">${esc(n.nombre)}</span></a></li>`;
  }).join('') + `${items.length ? arco : ''}<li><a class="tr-item tr-mas" href="#red"><span class="tr-circulo"><span>+</span></span><span class="tr-nombre"><strong>Agregar nodo</strong></span></a></li>`;
}

// ---------- Red de nodos ----------
let filtro = 'todos';
function pintarFiltros() {
  const cuenta = id => R.nodos.filter(n => n.cat === id).length;
  const chip = (id, nombre, n, extra = '') => `<button type="button" class="tr-filtro ${extra}" data-filtro="${id}" aria-pressed="${filtro === id}">${esc(nombre)} <span>${n}</span></button>`;
  $('filtros').innerHTML = chip('recomendados', 'Recomendados para usted', 0, 'apagado') +
    R.categorias.map(c => chip(c.id, c.nombre, cuenta(c.id), R.nodos.some(n => n.cat === c.id && n.disponible) ? '' : 'apagado')).join('') +
    chip('todos', 'Todos', R.nodos.length, 'todos');
}
function pintarRed() {
  const L = $('lienzo'), svg = $('conexiones');
  L.style.setProperty('--alto', R.alto);
  svg.setAttribute('viewBox', `0 0 1000 ${R.alto}`);
  const ns = 'http://www.w3.org/2000/svg';
  svg.innerHTML = `<defs><marker id="flecha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="#A7AEB3"/></marker></defs>`;
  for (const [a, b] of R.tramos) {
    const p = POR_NODO[a], q = POR_NODO[b], dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, r = 62;
    const x1 = p.x + ux * r, y1 = p.y + uy * r, x2 = q.x - ux * r, y2 = q.y - uy * r, k = Math.min(70, d * .14), f = n => n.toFixed(1);
    const path = document.createElementNS(ns, 'path');
    if (a[0] === b[0]) {
      const cx = (x1 + x2) / 2 - uy * k, cy = (y1 + y2) / 2 + ux * k;
      path.setAttribute('d', `M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`);
    } else {
      // Conexión entre categorías: sale vertical y llega vertical (se ve al pasar sobre un nodo).
      const s = Math.sign(q.y - p.y) || 1, ya = p.y + s * r, yb = q.y - s * r, m = (yb - ya) * .55;
      path.setAttribute('d', `M${f(p.x)} ${f(ya)} C${f(p.x)} ${f(ya + m)} ${f(q.x)} ${f(yb - m)} ${f(q.x)} ${f(yb)}`);
    }
    path.setAttribute('class', a[0] === b[0] ? 'tramo' : 'tramo puente');
    path.dataset.a = a; path.dataset.b = b;
    path.setAttribute('marker-start', 'url(#flecha)'); path.setAttribute('marker-end', 'url(#flecha)');
    svg.append(path);
  }
  L.querySelectorAll('.tr-nodo').forEach(x => x.remove());
  for (const n of R.nodos) {
    const e = estado(n), b = document.createElement('button');
    b.type = 'button'; b.className = `tr-nodo tr-${e.tipo}${trayecto.includes(n.codigo) ? ' en-trayecto' : ''}`; b.dataset.codigo = n.codigo; b.dataset.cat = n.cat;
    b.style.left = (n.x / 10) + '%'; b.style.top = (n.y / R.alto * 100) + '%';
    b.setAttribute('aria-label', `${n.codigo} · ${n.nombre}. ${CAT[n.cat].nombre}. ${e.texto}`);
    b.innerHTML = `${circulo(n, e)}<span class="tr-chip">${e.texto}</span><span class="tr-nombre">${esc(n.nombre)}</span>`;
    L.append(b);
  }
  aplicarFiltro();
}
function resaltar(codigo) {
  $('lienzo').querySelectorAll('path.tramo').forEach(p => p.classList.toggle('resaltado', !!codigo && (p.dataset.a === codigo || p.dataset.b === codigo)));
}
['pointerover', 'focusin'].forEach(ev => $('lienzo').addEventListener(ev, e => resaltar(e.target.closest('.tr-nodo')?.dataset.codigo)));
$('lienzo').addEventListener('pointerleave', () => resaltar(null));
function aplicarFiltro() {
  const L = $('lienzo');
  L.querySelectorAll('.tr-nodo').forEach(b => b.classList.toggle('atenuado', filtro !== 'todos' && b.dataset.cat !== filtro));
  L.querySelectorAll('path.tramo').forEach(p => p.classList.toggle('atenuado', filtro !== 'todos' && !(p.dataset.a[0] === filtro && p.dataset.b[0] === filtro)));
  document.querySelectorAll('.tr-filtro').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filtro === filtro)));
}

// ---------- Ficha del nodo ----------
function ficha(codigo) {
  const n = POR_NODO[codigo], e = estado(n), c = CAT[n.cat], dentro = trayecto.includes(codigo);
  $('ficha-cuerpo').innerHTML = `<p class="tr-ficha-cat" style="--cat:${c.color}">${esc(c.nombre)} · Nodo ${esc(n.codigo)}</p>
   <h2 id="ficha-titulo">${esc(n.nombre)}</h2>
   ${n.disponible
      ? `<p><span class="tr-chip tr-${e.tipo}">${e.texto}${e.pct ? ` · ${e.pct} %` : ''}</span> ${n.unidades.length} unidades organizadas para Open edX.</p>
         <div class="tr-acciones"><button type="button" class="ox-boton" data-iniciar="${n.codigo}">${e.tipo === 'nuevo' ? 'Iniciar nodo' : e.tipo === 'fin' ? 'Repasar el nodo' : 'Continuar con el nodo'}</button>
         ${dentro ? `<button type="button" class="ox-boton sec" data-quitar="${n.codigo}">Quitar de mi trayectoria</button>` : `<button type="button" class="ox-boton sec" data-agregar="${n.codigo}">Agregar a mi trayectoria</button>`}
         <button type="button" class="tr-enlace" data-cerrar>Cerrar</button></div>`
      : `<p>Este nodo estará disponible próximamente.</p><div class="tr-acciones"><button type="button" class="ox-boton" data-cerrar>Cerrar</button></div>`}`;
  $('ficha').showModal();
}
function cambiarTrayecto(lista) { trayecto = lista; guardar(CLAVE_TRAYECTO, trayecto); pintarTrayecto(); pintarRed(); }

document.addEventListener('click', ev => {
  const t = ev.target.closest('button,a'); if (!t) return;
  if (t.dataset.filtro) { if (t.classList.contains('apagado') && t.dataset.filtro === 'recomendados') return; filtro = t.dataset.filtro; aplicarFiltro(); }
  else if (t.classList.contains('tr-nodo')) ficha(t.dataset.codigo);
  else if (t.dataset.iniciar) {
    const c = t.dataset.iniciar; if (!trayecto.includes(c)) cambiarTrayecto([...trayecto, c]);
    location.href = destino(POR_NODO[c]);
  }
  else if (t.dataset.agregar) { cambiarTrayecto([...trayecto, t.dataset.agregar]); $('ficha').close(); }
  else if (t.dataset.quitar) { cambiarTrayecto(trayecto.filter(c => c !== t.dataset.quitar)); $('ficha').close(); }
  else if (t.dataset.cerrar !== undefined) t.closest('dialog').close();
  else if (t.dataset.abrir) $(t.dataset.abrir).showModal();
  else if (t.dataset.vista) {
    document.querySelectorAll('[data-vista]').forEach(b => b.setAttribute('aria-pressed', String(b === t)));
    $('lienzo').classList.toggle('cuadricula', t.dataset.vista === 'cuadricula');
  }
});
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));
// Al volver desde un nodo con «Atrás», el estado puede haber cambiado.
addEventListener('pageshow', () => { pintarTrayecto(); pintarRed(); });

pintarFiltros(); pintarTrayecto(); pintarRed();
})();
