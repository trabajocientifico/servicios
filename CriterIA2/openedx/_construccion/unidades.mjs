// Genera el contenido de cada unidad en dos versiones:
//  · unidades/…/<código>.html  → lo que el técnico pega en un componente HTML de Studio (rutas /static/)
//  · curso.js                  → lo que usa el simulador (rutas archivos/)
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const A = '{{ARCHIVOS}}';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Estilos con prefijo cx- para no chocar con el tema de Open edX. Van dentro de cada componente.
const ESTILO = p => `<style>
.cx-unidad{color:#2E3233;font-size:1rem;line-height:1.65}
.cx-unidad *{box-sizing:border-box}
.cx-banner{position:relative;overflow:hidden;display:flex;align-items:center;min-height:150px;margin:0 0 26px;background:linear-gradient(100deg,${p.g1} 0%,${p.g2} 48%,${p.g3} 100%)}
.cx-banner .cx-ola{position:absolute;left:-6%;top:-55%;width:62%;height:210%;border-radius:50%;background:${p.ola};opacity:.75}
.cx-pill{position:relative;z-index:1;margin-left:7%;max-width:64%;padding:20px 46px 20px 40px;border-radius:80px;background:#00222D;color:#FFFCEA;box-shadow:12px 0 0 ${p.sombra}}
.cx-pill .cx-k{display:block;font-size:.72rem;font-weight:700;letter-spacing:.01em;margin-bottom:6px}
.cx-pill .cx-t{display:block;font-size:1.32rem;font-weight:700;line-height:1.2}
.cx-pill .cx-m{display:block;margin-top:6px;font-size:.66rem;color:${p.claro};font-weight:600}
.cx-deco{position:absolute;right:0;top:0;height:100%;width:44%;pointer-events:none}
.cx-emblema{position:absolute;right:46px;top:50%;transform:translateY(-50%);width:118px;height:118px;border-radius:50%;background:#FFFCEA;padding:10px;z-index:1}
.cx-emblema svg{width:100%;height:100%;display:block}
.cx-cat{position:absolute;right:10px;top:50%;transform:translateY(-50%) rotate(180deg);writing-mode:vertical-rl;z-index:1;padding:8px 4px;border-radius:7px;background:#00222D;color:${p.claro};font-size:.6rem;font-weight:700;letter-spacing:.04em}
.cx-sep{border:0;border-top:1px solid #DCD8C4;margin:0 0 22px}
.cx-unidad h3{font-size:1.45rem;font-weight:600;color:#1F2324;margin:1.3em 0 .45em;line-height:1.25}
.cx-unidad h3:first-of-type{margin-top:.2em}
.cx-unidad h4{font-size:1.08rem;font-weight:700;color:#02475B;margin:0 0 .3em}
.cx-unidad p{margin:0 0 .9em}
.cx-unidad ul,.cx-unidad ol{margin:0 0 1em;padding-left:1.4em}
.cx-unidad li{margin:.35em 0}
.cx-unidad a{color:#02475B;font-weight:600}
.cx-nota{display:flex;gap:16px;align-items:flex-start;margin:22px 0;padding:20px 24px;border-radius:26px;background:#FFF9E3;border:1px solid #EFE3B6}
.cx-nota .cx-i{flex:0 0 40px;height:40px;border-radius:50%;background:#02475B;color:#FFFCEA;display:flex;align-items:center;justify-content:center;font:700 1.1rem/1 Georgia,serif}
.cx-nota strong.cx-nt{display:block;margin-bottom:4px;color:#1F2324}
.cx-nota p:last-child{margin-bottom:0}
.cx-cita{margin:18px 0;padding:6px 0 6px 20px;border-left:5px solid ${p.acento};font-size:1.1rem;font-style:italic;color:#02475B}
.cx-terminos{display:grid;gap:14px;margin:12px 0 18px}
.cx-termino{padding:16px 20px;border-radius:18px;background:#FFFCEA;border:1px solid #DCD8C4;border-left:6px solid var(--cx-acento,${p.acento})}
.cx-termino p{margin:.3em 0 0}
.cx-etiqueta{display:inline-block;margin:0 0 10px;padding:3px 12px;border-radius:999px;background:#F8F3DA;color:#02475B;font-size:.8rem;font-weight:700}
.cx-recurso{margin:18px 0 8px;border-radius:20px;overflow:hidden;border:1px solid #DCD8C4;background:#F8F3DA}
.cx-marco{display:block;width:100%;height:720px;border:0;background:#F8F3DA}
.cx-marco.cx-video{height:auto;aspect-ratio:16/9}
.cx-abrir{display:flex;justify-content:flex-end;gap:12px;padding:10px 16px;background:#FFFCEA;border-top:1px solid #DCD8C4;font-size:.9rem}
.cx-descarga{display:flex;gap:16px;align-items:center;margin:22px 0;padding:16px 20px;border-radius:18px;border:1px solid #DCD8C4;background:#fff}
.cx-descarga .cx-pdf{flex:0 0 44px;height:52px;border-radius:8px;background:${p.pdf};color:#fff;display:flex;align-items:flex-end;justify-content:center;padding-bottom:7px;font-size:.7rem;font-weight:700}
.cx-descarga span{display:block;font-size:.85rem;color:#5A5E60}
.cx-pendiente{margin:18px 0;padding:26px;border:2px dashed #C9B97E;border-radius:22px;background:#FFFDF2;text-align:center}
.cx-pendiente strong{display:block;font-size:1.1rem;color:#7A5B00;margin-bottom:6px}
.cx-pendiente ul{text-align:left;max-width:560px;margin:12px auto 0}
.cx-unidad details{margin:16px 0;padding:12px 18px;border-radius:16px;background:#F8F3DA}
.cx-unidad summary{cursor:pointer;font-weight:700;color:#02475B}
.cx-avance{display:flex;margin:40px 0 0;background:#00222D;color:#FFFCEA;border-top:5px solid ${p.acento}}
.cx-av-izq{flex:1;min-width:0;padding:26px 30px 22px}
.cx-unidad .cx-av-t{margin:0 0 18px;font-weight:700;font-size:1rem;color:#FFFCEA}
.cx-unidad ol.cx-pasos{position:relative;display:flex;justify-content:space-between;list-style:none;margin:0;padding:0}
.cx-pasos::before{content:"";position:absolute;left:12px;right:12px;top:11px;height:2px;background:#5C6B70}
.cx-unidad .cx-paso{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;margin:0;font-size:.7rem;font-weight:700;color:#C9CED0}
.cx-paso i{display:block;width:16px;height:16px;margin-top:4px;border-radius:50%;border:2px solid #C9CED0;background:#00222D}
.cx-paso.ya i{background:#C9CED0}
.cx-paso.aqui{color:#FFFCEA}
.cx-paso.aqui i{width:24px;height:24px;margin-top:0;background:${p.trazo};border:3px solid #FFFCEA}
.cx-oculto{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.cx-av-der{flex:0 0 36%;display:flex;flex-direction:column;justify-content:center;gap:6px;margin:20px 0;padding:6px 24px;border-left:1px solid #3A5560}
.cx-av-k{font-size:.66rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${p.acento}}
.cx-av-n{font-size:1rem;font-weight:700;line-height:1.3}
.cx-av-l{font-size:.75rem;color:#C9CED0}
@media (max-width:640px){.cx-pill{max-width:78%;margin-left:5%;padding:16px 26px}.cx-emblema{display:none}.cx-marco{height:560px}
.cx-avance{flex-direction:column}.cx-av-der{margin:0 24px 20px;padding:14px 0 0;border-left:0;border-top:1px solid #3A5560}}
</style>`;

const deco = p => `<svg class="cx-deco" viewBox="0 0 300 150" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
<circle cx="250" cy="150" r="88" fill="#02475B"/><circle cx="118" cy="22" r="36" fill="#02475B"/><circle cx="178" cy="14" r="17" fill="none" stroke="${p.trazo}" stroke-width="2"/>
<circle cx="94" cy="98" r="10" fill="none" stroke="${p.trazo}" stroke-width="2"/><circle cx="214" cy="118" r="40" fill="none" stroke="${p.sombra}" stroke-width="1.5" opacity=".7"/></svg>`;

const nota = (titulo, cuerpo) => `<div class="cx-nota"><span class="cx-i" aria-hidden="true">i</span><div><strong class="cx-nt">${esc(titulo)}</strong>${cuerpo}</div></div>`;
const descarga = (archivo, titulo, detalle) => `<div class="cx-descarga"><span class="cx-pdf" aria-hidden="true">PDF</span><div><a href="${A}${archivo}" target="_blank" rel="noopener">${esc(titulo)}</a><span>${esc(detalle)}</span></div></div>`;
const marco = (url, titulo, video = false) => `<div class="cx-recurso"><iframe class="cx-marco${video ? ' cx-video' : ''}" src="${url}" title="${esc(titulo)}" allow="fullscreen; autoplay" allowfullscreen></iframe>
<div class="cx-abrir"><a href="${url}" target="_blank" rel="noopener">Abrir en una ventana nueva ↗</a></div></div>`;

export const archivoRecurso = (cfg, d, id) => d.TUTORIALES.includes(id) ? `tutorial-${cfg.clave}-${id}.html` : `visor-${cfg.clave}.html?recurso=${id}`;

function generador(cfg, d) {
  const p = cfg.paleta, acentos = d.ACENTOS;
  const ranura = slot => d.SLOTS[slot].replace(' · ', ' ');
  const duracion = () => d.VALUE.duracion.semanas ? `${esc(d.VALUE.duracion.horas)} en ${esc(d.VALUE.duracion.semanas)}` : `${esc(d.VALUE.duracion.horas)}${d.VALUE.duracion.nota ? ` (${esc(d.VALUE.duracion.nota.toLowerCase())})` : ''}`;
  const pdfTema = t => d.PDF_NOMBRES['t' + t.number] ? descarga(d.PDF_NOMBRES['t' + t.number], `Lectura conceptual del Tema ${t.number}`, `PDF · ${d.PDF_PAGINAS['t' + t.number]} páginas`) : '';
  const horas = h => h ? ` · ${h} h` : '';

  function banner(seccion, sub, u) {
    const emblema = seccion.tema !== undefined ? `<span class="cx-emblema">${d.Arte.emblem(seccion.tema)}</span>` : '';
    return `<div class="cx-banner"><span class="cx-ola" aria-hidden="true"></span>${deco(p)}${emblema}
<div class="cx-pill"><span class="cx-k">Nodo ${cfg.codigo} · ${esc(seccion.banner)}</span><span class="cx-t">${esc(u.titulo.replace(/^\d+\.\d+ · /, ''))}</span>
<span class="cx-m">${esc(u.momento)} · Lección: ${esc(sub.titulo.replace(/ \(.*\)$/, ''))}</span></div>
<span class="cx-cat" aria-hidden="true">${esc(cfg.categoria)}</span></div><hr class="cx-sep">`;
  }

  function cuerpo(u) {
    const t = u.tema !== undefined ? d.TOPICS[u.tema] : null;
    switch (u.plantilla) {
      case 'recorrido': {
        const tipos = new Set(['reading']);
        d.TOPICS.forEach(tt => tt.subtopics.forEach(s => s.resources.forEach((id, slot) => id && tipos.add(d.tipo(id, slot)))));
        return `<h3>El mapa del recorrido</h3>
<p>El nodo está organizado en secciones que conviene visitar en orden. Cada sección del menú «Esquema del nodo» es una parada del recorrido:</p>
<ul><li><strong>Bienvenida.</strong> De qué trata el nodo, cómo recorrerlo y qué lograrás.</li>
<li><strong>Conocimientos previos.</strong> ${d.DIAG ? `Tu punto de partida: ${d.DIAG.length} preguntas breves, sin nota.` : 'La pregunta orientadora que guía todo el nodo.'}</li>
${d.TOPICS.map(tt => `<li><strong>Sección ${tt.number}.</strong> ${esc(tt.title)}</li>`).join('\n')}</ul>
<h3>Tres lecciones en cada sección</h3>
<ul><li><strong>Encuentro con el saber.</strong> La presentación del tema y una lectura breve con las definiciones básicas de cada subtema.</li>
<li><strong>Reflexión con el saber.</strong> Los recursos para aprender: ${d.TUTORIALES.length ? 'películas, tutoriales con voz, infografías y actividades' : cfg.clave === 'f2' ? 'animaciones, recorridos guiados y exploraciones' : 'recorridos animados y actividades'} para ver los conceptos en funcionamiento.</li>
<li><strong>Evaluación.</strong> ${cfg.clave === 'f2' ? 'Un repaso con respuesta inmediata por cada subtema.' : 'Una actividad por subtema para comprobar lo aprendido, con explicación inmediata.'}</li></ul>
<h3>Tipos de recurso</h3>
<ul>${d.RESOURCE_TYPES.filter(x => tipos.has(x.id)).map(x => `<li>${esc(x.name)}</li>`).join('')}</ul>
${nota('Ten en cuenta', `<p>Las actividades ofrecen pistas y permiten volver a intentar. Cada recurso interactivo se abre dentro de su unidad; si la pantalla te queda pequeña, usa «Abrir en una ventana nueva».</p><p>Dedicación estimada: ${duracion()}.</p>`)}`;
      }
      case 'bienvenida':
        return `<h3>Bienvenida animada</h3><p>Mira de qué trata el nodo y cómo es el recorrido. Pulsa «Reproducir» para empezar.</p>
${marco(`${A}bienvenida-${cfg.clave}.html`, `Bienvenida animada: ${d.BIENVENIDA.titulo}`, true)}
<details><summary>Transcripción</summary>${d.BIENVENIDA.transcripcion.map(x => `<p>${esc(x)}</p>`).join('')}</details>`;
      case 'introduccion':
        return `<h3>${esc(d.WELCOME.titulo)}</h3>${d.WELCOME.texto.map(x => `<p>${esc(x)}</p>`).join('')}
<h3>¿Por qué este nodo?</h3><p>${esc(d.VALUE.porque.base)}</p><p class="cx-cita">${esc(d.VALUE.cita.base)}</p>
<h3>Lo que lograrás</h3><p>${esc(d.VALUE.objetivo.base)}</p>
<h4>Objetivos específicos</h4><ol>${d.VALUE.especificos.map(x => `<li>${esc(x.base)}</li>`).join('')}</ol>
${nota('Duración', `<p>${duracion()}.</p>`)}
${d.PDF_NOMBRES.base ? descarga(d.PDF_NOMBRES.base, 'Documento base del nodo', `PDF · ${d.PDF_PAGINAS.base} páginas`) : ''}`;
      case 'antes':
        return `<h3>¿Qué sabes ya?</h3>
<p>Cinco preguntas sencillas, una o dos por tema, para reconocer tu punto de partida. Toma unos tres minutos.</p>
<p>Si no sabes una respuesta, elige «No estoy seguro/a»: también es una respuesta válida.</p>
${nota('Ten en cuenta', '<p>No tiene nota ni afecta tu avance. Tus respuestas quedan registradas en la plataforma para que el equipo del curso conozca el punto de partida del grupo.</p>')}`;
      case 'diagnostico':
        return `<p>Responde cada pregunta y pulsa «Enviar». Al enviar verás si ya reconoces la idea o en qué tema la trabajarás.</p>`;
      case 'pregunta':
        return `<h3>La pregunta que guía el nodo</h3><p class="cx-cita">${esc(d.PREGUNTA)}</p>
<p>Todo el recorrido ayuda a responderla. Tenla presente en cada sección.</p>
${d.REFLEXION ? nota('Antes de empezar: piensa en tu experiencia', `<p>${esc(d.REFLEXION)}</p><p>Anota una idea para retomarla al terminar el nodo.</p>`) : ''}`;
      case 'tema':
        return `<h3>${esc(t.title)}</h3><p>${esc(d.LECTURA[u.tema].intro)}</p>
<h3>Subtemas</h3><ol>${t.subtopics.map(s => `<li>${t.number}.${s.number} · ${esc(s.title)}${horas(s.hours)}</li>`).join('')}</ol>
${t.hours ? nota('Dedicación', `<p>${t.hours} horas para este tema.</p>`) : ''}
${pdfTema(t)}`;
      case 'conceptos': {
        const s = t.subtopics[u.subtema];
        const terms = d.LECTURA[u.tema].terms.filter(x => x.s === u.subtema);
        return `<span class="cx-etiqueta">Subtema ${t.number}.${s.number}${horas(s.hours)}</span>${s.note ? `<p>${s.note}</p>` : ''}<h3>Conceptos clave</h3>
<div class="cx-terminos" style="--cx-acento:${acentos[u.tema]}">${terms.map(x => `<div class="cx-termino"><h4>${esc(x.t)}</h4>${x.d.map(y => `<p>${esc(y)}</p>`).join('')}</div>`).join('\n')}</div>
${pdfTema(t) ? `<p>Amplía estas definiciones en la lectura conceptual del Tema ${t.number}.</p>${pdfTema(t)}` : ''}`;
      }
      case 'recurso': {
        const r = d.RESOURCES.find(x => x.id === u.recurso), ins = d.INSTR[u.recurso], s = t.subtopics[u.subtema];
        return `<span class="cx-etiqueta">Subtema ${t.number}.${s.number} · ${ranura(u.slot)} · ${esc(u.momento)}</span>
<h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p>
${ins ? nota('Cómo usarlo', `<p>${esc(ins.txt)} ${esc(ins.como)}</p>`) : ''}
${marco(A + archivoRecurso(cfg, d, u.recurso), `${u.momento}: ${r.title}`)}`;
      }
      case 'pendiente': {
        const s = t?.subtopics[u.subtema];
        const props = (u.ranuras || []).map(slot => [slot, d.propuesta(u.tema, u.subtema, slot)]).filter(x => x[1]);
        return `${s ? `<span class="cx-etiqueta">Subtema ${t.number}.${s.number}</span><h3>${esc(s.title)}</h3>` : ''}
<div class="cx-pendiente"><strong>Pendiente · ${esc(u.pendiente)}</strong><p>Esta unidad reserva el lugar del contenido en la estructura del nodo. Se completará cuando el recurso esté listo.</p>
${props.length ? `<p><b>Propuesta del documento base:</b></p><ul>${props.map(([slot, x]) => `<li>${ranura(slot)}: ${esc(x)}</li>`).join('')}</ul>` : ''}</div>`;
      }
    }
    throw Error('Plantilla desconocida: ' + u.plantilla);
  }
  // Bloque final de la unidad: en qué punto de la lección va y con qué continúa.
  function avance(sub, i, sig, cambiaLeccion) {
    const n = sub.unidades.length, leccion = sub.titulo.replace(/ \(.*\)$/, '');
    const pasos = sub.unidades.map((x, k) => `<li class="cx-paso${k < i ? ' ya' : k === i ? ' aqui' : ''}"${k === i ? ' aria-current="step"' : ''}><i aria-hidden="true"></i><span>${k + 1}</span><span class="cx-oculto"> · ${esc(x.titulo)}</span></li>`).join('');
    const derecha = sig
      ? `<span class="cx-av-k">Continúe con</span><span class="cx-av-n">${esc(sig.u.titulo)}</span>${cambiaLeccion ? `<span class="cx-av-l">Lección: ${esc(sig.sub.titulo.replace(/ \(.*\)$/, ''))}</span>` : ''}`
      : `<span class="cx-av-k">Fin del nodo</span><span class="cx-av-n">Vuelva a Mi trayectoria para elegir otro nodo</span>`;
    return `<div class="cx-avance" role="group" aria-label="Avance en la lección">
<div class="cx-av-izq"><p class="cx-av-t">${esc(leccion)} · Unidad ${i + 1} de ${n}</p><ol class="cx-pasos">${pasos}</ol></div>
<div class="cx-av-der">${derecha}</div></div>`;
  }
  return { banner, cuerpo, avance, estilo: ESTILO(p) };
}

function problemaDiagnostico(d) {
  return d.DIAG.map(q => ({
    tema: q.tema, enunciado: q.q, opciones: [...q.ops, 'No estoy seguro/a'], correcta: q.ok, explicacion: q.exp,
    siOk: 'Ya lo reconoces.', siNo: `Lo verás en el Tema ${q.tema}.`
  }));
}

// Formato «Markdown» del editor sencillo de problemas de Studio.
function problemaMarkdown(preguntas) {
  return preguntas.map(q => `>>${q.enunciado}<<\n\n` +
    q.opciones.map((o, k) => `${k === q.correcta ? '(x)' : '( )'} ${o} {{${k === q.correcta ? q.siOk : q.siNo}}}`).join('\n') +
    `\n\n[explanation]\n${q.explicacion}\n[explanation]\n`).join('\n---\n\n');
}

export function escribirUnidades(nodo, d, cfg, salida, archivos) {
  const g = generador(cfg, d);
  const dirU = join(salida, 'unidades');
  const filas = [];
  const orden = nodo.secciones.flatMap(sec => sec.subsecciones.flatMap(sub => sub.unidades.map(u => ({ sec, sub, u }))));
  nodo.secciones.forEach((sec, si) => {
    const carpeta = `${String(si + 1).padStart(2, '0')}-${sec.clave}`;
    mkdirSync(join(dirU, carpeta), { recursive: true });
    sec.subsecciones.forEach(sub => sub.unidades.forEach((u, ui) => {
      const sig = orden[orden.findIndex(x => x.u === u) + 1];
      const pie = g.avance(sub, ui, sig, sig && sig.sub !== sub);
      u.archivo = `${carpeta}/${u.codigo}.html`;
      if (u.plantilla === 'diagnostico') {
        // Con un problema de Studio, el bloque de avance va en un tercer componente, después del problema.
        u.problema = { titulo: u.titulo, preguntas: problemaDiagnostico(d) };
        u.archivoProblema = `${carpeta}/${u.codigo}-problema.txt`;
        writeFileSync(join(dirU, u.archivoProblema), problemaMarkdown(u.problema.preguntas));
        u.archivoCierre = `${carpeta}/${u.codigo}-cierre.html`;
        const cierre = `<div class="cx-unidad">\n${g.estilo}\n${pie}\n</div>`;
        writeFileSync(join(dirU, u.archivoCierre), cierre);
        u.htmlCierre = cierre;
      }
      const html = `<div class="cx-unidad">\n${g.estilo}\n${g.banner(sec, sub, u)}\n${g.cuerpo(u)}\n${u.problema ? '' : pie}\n</div>`;
      writeFileSync(join(dirU, u.archivo), html.replaceAll(A, '/static/'));
      u.html = html.replaceAll(A, 'archivos/');
      filas.push({ sec, sub, u });
    }));
  });

  const curso = { ...nodo, generado: new Date().toISOString().slice(0, 10) };
  writeFileSync(join(salida, 'curso.js'), `// Generado por _construccion/construir.mjs ${cfg.clave}. No editar a mano.\nwindow.CURSO=` + JSON.stringify(curso) + ';\n');
  writeFileSync(join(salida, 'LEEME-tecnico.md'), guia(nodo, d, cfg, filas, archivos));
}

function guia(nodo, d, cfg, filas, archivos) {
  const tabla = filas.map(({ sec, sub, u }) => `| ${sec.titulo} | ${sub.titulo}${sub.nota ? ` *(tipo: ${sub.nota})*` : ''} | ${u.codigo} · ${u.titulo} | \`unidades/${u.archivo}\`${u.plantilla === 'pendiente' ? ' *(pendiente)*' : ''}${u.archivoProblema ? ` + problema \`unidades/${u.archivoProblema}\` + cierre \`unidades/${u.archivoCierre}\`` : ''} |`).join('\n');
  const usos = archivos.map(([f, uso, mb]) => `| \`${f}\` | ${uso} | ${mb} |`).join('\n');
  const visor = archivos.find(a => a[0].startsWith('visor-'));
  return `# ${nodo.etiqueta} · Carga en Open edX

Esta carpeta organiza el nodo **${nodo.titulo}** con la estructura de Open edX:
**Sección → Subsección → Unidad**. Ábrela en el navegador con \`index.html\` para ver la simulación.

> El material va **sin cifrar**. Comparte esta carpeta solo con el equipo del curso y no la subas a GitHub.

## 1. Subir los archivos

En Studio, **Contenido → Archivos** (*Files & Uploads*), sube todo lo que hay en \`archivos/\`:

| Archivo | Uso | Tamaño |
| --- | --- | --- |
${usos}

Si Studio rechaza algún archivo por tamaño (\`${visor[0]}\` pesa ${visor[2]}), el administrador debe ampliar el tamaño máximo de archivo del curso.

## 2. Crear la estructura y pegar las unidades

Para cada fila de la tabla: crea la sección, la subsección y la unidad con ese nombre. En la unidad agrega
**Componente → Texto (HTML)**, abre el **editor HTML** (no el visual) y pega el contenido completo del archivo indicado.
Las rutas \`/static/…\` apuntan a los archivos del paso 1; Studio las convierte solas.
${d.DIAG ? `
En la unidad **CP1.2** agrega además **Problema → Opción múltiple**, cambia al **editor avanzado/Markdown** y pega el archivo \`-problema.txt\`.
Después del problema agrega otro **Texto (HTML)** con el archivo \`-cierre.html\`: es el bloque de avance de la unidad.
Deja la subsección *Mi punto de partida* **sin calificar**.
` : ''}
En las subsecciones **Evaluación** usa el tipo de tarea *${limpiar(d.SLOTS[2])}* si el equipo decide calificarlas. Las actividades interactivas
no envían nota a la plataforma: para que cuenten, hay que cargarlas como paquete SCORM o reemplazarlas por problemas de Studio.

| Sección | Subsección | Unidad | Archivo |
| --- | --- | --- | --- |
${tabla}

## 3. Comprobar

Abre cada unidad en la vista previa del LMS: el encabezado, el texto y, en las unidades con recurso, el recurso abierto
directamente (no la portada del curso). Si aparece la portada, la plataforma eliminó el parámetro \`?recurso=\` de la dirección: avisa al equipo.

Las unidades marcadas *pendiente* reservan el lugar de contenido que aún no existe; pueden crearse vacías o dejarse para después.
`;
}
const limpiar = s => s.replace(/ · \d$/, '');
