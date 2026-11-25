// Construye la versión Open edX de uno o varios nodos a partir de sus HTML privados.
// Uso:  node "<ruta>\openedx\_construccion\construir.mjs" [f2|i2|i3|todos]   (por defecto: todos)
// Lee los originales de %LOCALAPPDATA%\CriterIA\<NODO>\… (ver nodos.mjs) y escribe openedx\<nodo>\.
import { writeFileSync, readFileSync, mkdirSync, rmSync, copyFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { leerOriginal, bloqueBase64 } from './extraer.mjs';
import { construirVisor } from './visor.mjs';
import { estructura } from './estructura.mjs';
import { escribirUnidades } from './unidades.mjs';
import { NODOS, RED } from './nodos.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const privado = join(process.env.LOCALAPPDATA, 'CriterIA');
const pedido = (process.argv[2] || 'todos').toLowerCase();
const lista = pedido === 'todos' ? Object.keys(NODOS) : [pedido];

// La bienvenida venía sin controles (los ponía el curso). Suelta, recupera «Reproducir» y suma «Pausar».
const CONTROLES_BV = `<style>#controles{display:flex!important}#btnExportar{display:none!important}</style>
<script>(()=>{const v=document.getElementById('voz'),c=document.getElementById('controles');if(!v||!c)return;
const p=document.createElement('button');p.type='button';p.className='sec';p.textContent='Pausar';p.hidden=true;c.append(p);
p.addEventListener('click',()=>{if(v.paused)v.play();else v.pause()});
v.addEventListener('play',()=>{p.hidden=false;p.textContent='Pausar'});v.addEventListener('pause',()=>{if(!v.ended)p.textContent='Reanudar'});
v.addEventListener('ended',()=>{p.hidden=true});})();</script>`;
const insertarAntesDeBody = (html, extra) => { const f = html.lastIndexOf('</body>'); return html.slice(0, f) + extra + html.slice(f); };
const mb = ruta => (statSync(ruta).size / 1e6).toFixed(1).replace('.', ',') + ' MB';

function construir(clave) {
  const cfg = NODOS[clave];
  if (!cfg) throw Error('Nodo desconocido: ' + clave + '. Usa f2, i2, i3 o todos.');
  const html = leerOriginal(join(privado, cfg.origen));
  if (!html.includes(`criteria-${clave}-avance`)) throw Error(`El archivo de ${cfg.codigo} no parece ser su HTML privado.`);
  const d = cfg.datos(html);
  d.ACENTOS = JSON.parse(/const INTRO_ACCENTS=(\[[^\]]*\])/.exec(html)[1].replace(/'/g, '"'));

  const salida = join(aqui, '..', clave), archivos = join(salida, 'archivos');
  // Se vacían las carpetas generadas (no la raíz, que puede estar abierta en un servidor local).
  for (const sub of ['unidades', 'archivos']) rmSync(join(salida, sub), { recursive: true, force: true });
  mkdirSync(archivos, { recursive: true });
  const usos = [];
  const escribir = (nombre, contenido, uso) => { writeFileSync(join(archivos, nombre), contenido); usos.push([nombre, uso, mb(join(archivos, nombre))]); };

  // 1. Archivos para «Files & Uploads» de Studio.
  escribir(`visor-${clave}.html`, construirVisor(html, cfg), 'Recursos interactivos y películas. Cada unidad abre uno con `?recurso=rXX`.');
  const bv = bloqueBase64(html, 'bienvenida-source');
  if (bv) escribir(`bienvenida-${clave}.html`, insertarAntesDeBody(Buffer.from(bv.b64, 'base64').toString('utf8'), CONTROLES_BV), 'Animación de bienvenida (unidad B1.2).');
  for (const id of d.TUTORIALES) {
    const t = bloqueBase64(html, 'tutorial-' + id);
    escribir(`tutorial-${clave}-${id}.html`, Buffer.from(t.b64, 'base64'), `Tutorial con voz: ${d.RESOURCES.find(r => r.id === id).title}.`);
  }
  for (const [k, nombre] of Object.entries(d.PDF_NOMBRES)) {
    const b = bloqueBase64(html, `pdf-${clave}-${k}`);
    if (b) escribir(nombre, Buffer.from(b.b64, 'base64'), k === 'base' ? 'Documento base del nodo (PDF).' : `Lectura conceptual del Tema ${k.slice(1)} (PDF).`);
  }

  // 2. Estructura del curso y unidades.
  const curso = estructura(d, cfg);
  escribirUnidades(curso, d, cfg, salida, usos);

  // 3. Simulador: plantilla común + logos y fuentes.
  for (const f of ['index.html', 'simulador.css', 'trayectoria.css', 'simulador.js']) copyFileSync(join(aqui, 'simulador', f), join(salida, f));
  const assets = join(aqui, '..', '..', 'assets');
  mkdirSync(join(salida, 'marca'), { recursive: true });
  for (const f of ['universidad-nacional.png', 'ancizar-400.woff2', 'ancizar-600.woff2', 'ancizar-700.woff2'])
    copyFileSync(join(assets, f), join(salida, 'marca', f));
  const n = curso.secciones.flatMap(s => s.subsecciones.flatMap(b => b.unidades));
  console.log(`${cfg.codigo}: ${n.length} unidades (${n.filter(u => u.plantilla === 'pendiente').length} pendientes) → ${salida}`);
  return { cfg, curso, unidades: n.length };
}

const hechos = lista.map(construir);

// Portada «Mi trayectoria»: red de los 16 nodos; se abren los que ya están construidos.
const raiz = join(aqui, '..');
const red = { ...RED, nodos: RED.nodos.map(n => {
  const clave = n.codigo.toLowerCase(), cfg = NODOS[clave], archivo = join(raiz, clave, 'curso.js');
  if (!cfg || !existsSync(archivo)) return { ...n, disponible: false };
  const txt = readFileSync(archivo, 'utf8'), c = JSON.parse(txt.slice(txt.indexOf('=') + 1, txt.lastIndexOf(';')));
  const unidades = c.secciones.flatMap(s => s.subsecciones.flatMap(b => b.unidades.map(u => u.codigo)));
  return { ...n, disponible: true, clave, unidades, primera: unidades[0] };
}) };
writeFileSync(join(raiz, 'red.js'), `// Generado por _construccion/construir.mjs. No editar a mano.\nwindow.RED=${JSON.stringify(red)};\n`);
for (const f of ['simulador.css', 'trayectoria.css', 'trayectoria.js']) copyFileSync(join(aqui, 'simulador', f), join(raiz, f));
copyFileSync(join(aqui, 'simulador', 'trayectoria.html'), join(raiz, 'index.html'));
mkdirSync(join(raiz, 'marca'), { recursive: true });
for (const f of ['universidad-nacional.png', 'ancizar-400.woff2', 'ancizar-600.woff2', 'ancizar-700.woff2'])
  copyFileSync(join(aqui, '..', '..', 'assets', f), join(raiz, 'marca', f));
console.log('Listo:', hechos.map(h => h.cfg.codigo).join(', '));
