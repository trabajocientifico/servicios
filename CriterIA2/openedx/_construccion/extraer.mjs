// Lee el HTML privado de un nodo y devuelve sus datos pedagógicos y sus medios embebidos.
// No modifica el original.
import { readFileSync } from 'node:fs';

export function leerOriginal(ruta) {
  return readFileSync(ruta, 'utf8');
}

// Texto de un <script type="application/octet-stream" id="..."> (base64).
export function bloqueBase64(html, id) {
  const ini = html.indexOf(`<script type="application/octet-stream" id="${id}">`);
  if (ini < 0) return null;
  const desde = html.indexOf('>', ini) + 1;
  const hasta = html.indexOf('</script>', desde);
  return { ini, fin: hasta + '</script>'.length, b64: html.slice(desde, hasta).trim() };
}

// Recorta «const NOMBRE = …» hasta el cierre de nivel superior (corchete/llave balanceados).
export function recortarConst(html, nombre) {
  const re = new RegExp(`(?:^|\\n)(?:const|let) ${nombre}\\s*=\\s*`);
  const m = re.exec(html);
  if (!m) throw Error('No encontré ' + nombre);
  let i = m.index + m[0].length;
  const abre = html[i];
  if (abre === '`' || abre === "'" || abre === '"') { const f = html.indexOf(abre, i + 1); return html.slice(i, f + 1); }
  if (abre !== '[' && abre !== '{') throw Error(nombre + ' no es literal');
  let nivel = 0, cad = null;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (cad) { if (c === '\\') { j++; continue; } if (c === cad) cad = null; continue; }
    if (c === '"' || c === "'" || c === '`') { cad = c; continue; }
    if (c === '[' || c === '{') nivel++;
    else if (c === ']' || c === '}') { nivel--; if (nivel === 0) return html.slice(i, j + 1); }
  }
  throw Error('Sin cierre: ' + nombre);
}

function bienvenidaCfg(html) {
  const ini = html.indexOf('<script type="application/json" id="bienvenida-cfg">');
  if (ini < 0) return null;
  return JSON.parse(html.slice(html.indexOf('>', ini) + 1, html.indexOf('</script>', ini)));
}
function recortarIIFE(html, inicio, cierre) {
  const ia = html.indexOf(inicio);
  if (ia < 0) throw Error('No encontré ' + inicio);
  const fa = html.indexOf('})();', cierre ? html.indexOf(cierre, ia) : ia) + 5;
  return html.slice(ia, fa);
}

// Todos los nodos se devuelven con la misma forma, para que estructura y unidades no dependan del nodo:
// TOPICS, RESOURCES (con desc), LECTURA, VALUE, WELCOME (texto: párrafos), INSTR, RESOURCE_TYPES, SLOTS,
// Arte.emblem(i), tipo(id, slot), propuesta(ti, si, slot), PDF_NOMBRES, PDF_PAGINAS, DIAG, PREGUNTA, REFLEXION,
// BIENVENIDA, TUTORIALES.
export function datosF2(html) {
  const nombres = ['RESOURCES', 'TOPICS', 'LECTURA', 'VALUE', 'WELCOME', 'INSTR', 'DIAG_F2', 'FILMS', 'SLOTS',
    'RESOURCE_TYPES', 'PDF_PAGINAS'];
  const codigo = nombres.map(n => `const ${n}=${recortarConst(html, n)};`).join('\n');
  const nombresPdf = /PDF_NOMBRES=(\{[^}]*\})/.exec(html)[1];
  const arte = recortarIIFE(html, 'const FoundationArt=(()=>{');
  const d = new Function(`${codigo}\nconst PDF_NOMBRES=${nombresPdf};\n${arte}\nreturn {${nombres.join(',')},PDF_NOMBRES,FoundationArt};`)();
  return {
    ...d, DIAG: d.DIAG_F2, Arte: d.FoundationArt, BIENVENIDA: bienvenidaCfg(html), TUTORIALES: [],
    PREGUNTA: null, REFLEXION: null,
    tipo(id, slot) {
      const r = d.RESOURCES.find(x => x.id === id);
      if (d.FILMS[id]) return d.FILMS[id].label ? 'deck' : 'film';
      if (slot === 2) return 'review';
      return r?.kind === 'Exploración' ? 'explore' : 'guide';
    },
    propuesta: () => null
  };
}

export function datosInvestigacion(html) {
  const nombres = ['TOPICS', 'RESOURCES', 'LECTURA', 'VALUE', 'WELCOME', 'INSTR', 'RESOURCE_TYPES', 'ANEXO', 'SLOTS', 'QUESTION'];
  const filmHow = /const FILM_HOW=('[^']*');/.exec(html)?.[1] ?? "''";
  const films = /const FILMS=(new Set\([^;]*\));/.exec(html)[1];
  const tipoSrc = /function resourceType\(id,slot\)\{[^\n]*\}/.exec(html)[0];
  const codigo = `const FILM_HOW=${filmHow};const FILMS=${films};\n` + nombres.map(n => `const ${n}=${recortarConst(html, n)};`).join('\n');
  const arte = recortarIIFE(html, 'const ResearchArt=(()=>{', 'return {get,emblem,cover,keys}');
  const d = new Function(`${codigo}\n${tipoSrc}\n${arte}\nreturn {${nombres.join(',')},FILMS,resourceType,ResearchArt};`)();
  const reflexion = /for="initial-reflection">([^<]*)</.exec(html)?.[1] ?? null;
  const tutoriales = [...html.matchAll(/<script type="application\/octet-stream" id="tutorial-(r\d\d)">/g)].map(m => m[1]);
  return {
    TOPICS: d.TOPICS, LECTURA: d.LECTURA, VALUE: d.VALUE, INSTR: d.INSTR, RESOURCE_TYPES: d.RESOURCE_TYPES, SLOTS: d.SLOTS,
    RESOURCES: d.RESOURCES.map(r => ({ ...r, desc: r.description })),
    WELCOME: { ...d.WELCOME, texto: d.WELCOME.texto.map(p => Array.isArray(p) ? p.join(' ') : p) },
    Arte: d.ResearchArt, FILMS: d.FILMS, PDF_NOMBRES: {}, PDF_PAGINAS: {}, DIAG: null,
    PREGUNTA: d.QUESTION, REFLEXION: reflexion, BIENVENIDA: bienvenidaCfg(html), TUTORIALES: tutoriales,
    tipo: (id, slot) => d.resourceType(id, slot),
    // Recurso que el documento base propone para una ranura vacía.
    propuesta(ti, si, slot) {
      const p = d.ANEXO[`${ti + 1}.${si + 1}`];
      if (!p) return null;
      if (typeof p[0] === 'string') return p[slot] || null;
      const x = p.find(y => y.s === slot);
      return x ? x.t + (x.d ? ': ' + x.d : '') : null;
    }
  };
}
