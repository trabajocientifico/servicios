// Organiza un nodo con la estructura de Open edX del ejemplo (aprobada con F2):
// Sección → Subsección (lección) → Unidad. Cada tema es una sección con tres lecciones:
//   Encuentro con el saber  · presentación del tema y lecturas con definiciones básicas
//   Reflexión con el saber  · recursos «Aprender» (películas, recorridos, tutoriales, exploraciones)
//   Evaluación              · recurso de la tercera ranura («Repaso» en F2, «Evaluar» en I2 e I3)
// Los textos salen del HTML privado; solo los rótulos de navegación son nuevos.

const TIPO = { film: 'Película', deck: 'Presentación animada', guide: 'Recorrido guiado', explore: 'Exploración', review: 'Repaso' };
const limpiarRanura = s => s.replace(/ · \d$/, '');

export function estructura(d, cfg) {
  const momento = (id, slot) => d.INSTR[id]?.que || TIPO[d.tipo(id, slot)] || limpiarRanura(d.SLOTS[slot]);
  const nombreEval = limpiarRanura(d.SLOTS[2]);
  const nodo = {
    codigo: cfg.codigo, clave: cfg.clave, categoria: cfg.categoria, etiqueta: cfg.etiqueta,
    titulo: d.VALUE.nombre.base, duracion: d.VALUE.duracion, secciones: []
  };

  const bienvenida = [{ codigo: 'B1.1', titulo: '¿Cómo recorrer este nodo?', icono: 'texto', momento: 'Orientación', plantilla: 'recorrido' }];
  if (d.BIENVENIDA) bienvenida.push({ codigo: 'B1.2', titulo: 'Comencemos', icono: 'video', momento: 'Animación · ' + d.BIENVENIDA.minutos, plantilla: 'bienvenida' });
  bienvenida.push({ codigo: `B1.${bienvenida.length + 1}`, titulo: 'Introducción al nodo', icono: 'texto', momento: 'Lectura', plantilla: 'introduccion' });
  nodo.secciones.push({ clave: 'B', titulo: 'Bienvenida', banner: 'Bienvenida',
    subsecciones: [{ titulo: `Bienvenida a ${d.VALUE.nombre.base.split(':')[0]}`, unidades: bienvenida }] });

  const previos = d.DIAG
    ? [{ codigo: 'CP1.1', titulo: 'Antes de empezar', icono: 'texto', momento: 'Activación', plantilla: 'antes' },
       { codigo: 'CP1.2', titulo: '¿Qué sabes ya?', icono: 'problema', momento: `Diagnóstico · ${d.DIAG.length} preguntas`, plantilla: 'diagnostico' }]
    : [{ codigo: 'CP1.1', titulo: 'Pregunta orientadora', icono: 'texto', momento: 'Activación', plantilla: 'pregunta' }];
  nodo.secciones.push({ clave: 'CP', titulo: 'Conocimientos previos', banner: 'Conocimientos previos',
    subsecciones: [{ titulo: 'Mi punto de partida', unidades: previos }] });

  d.TOPICS.forEach((t, ti) => {
    const n = t.number;
    const encuentro = [{ codigo: `T${n}.E1`, titulo: `Presentación del Tema ${n}`, icono: 'texto', momento: 'Lectura', plantilla: 'tema', tema: ti }];
    const reflexion = [], evaluacion = [];
    t.subtopics.forEach((s, si) => {
      const terminos = d.LECTURA[ti]?.terms.filter(x => x.s === si) ?? [];
      encuentro.push({
        codigo: `T${n}.E${encuentro.length + 1}`, titulo: `${n}.${s.number} · ${s.title}`,
        icono: terminos.length ? 'texto' : 'pendiente', momento: 'Lectura con definiciones básicas',
        plantilla: terminos.length ? 'conceptos' : 'pendiente', tema: ti, subtema: si,
        pendiente: terminos.length ? null : 'Lectura del subtema por incorporar'
      });
      const faltan = [];
      [0, 1].forEach(slot => {
        const id = s.resources[slot];
        if (!id) { faltan.push(slot); return; }
        const r = d.RESOURCES.find(x => x.id === id), tipo = d.tipo(id, slot);
        reflexion.push({ codigo: `T${n}.R${reflexion.length + 1}`, titulo: r.title, icono: tipo === 'film' || tipo === 'deck' ? 'video' : 'recurso',
          momento: momento(id, slot), plantilla: 'recurso', recurso: id, slot, tema: ti, subtema: si });
      });
      if (faltan.length) reflexion.push({ codigo: `T${n}.R${reflexion.length + 1}`, titulo: `${n}.${s.number} · Recursos para aprender`,
        icono: 'pendiente', momento: 'Por incorporar', plantilla: 'pendiente', tema: ti, subtema: si, ranuras: faltan,
        pendiente: faltan.length === 2 ? 'Recursos «Aprender» del subtema por incorporar' : 'Falta un recurso «Aprender» del subtema' });
      const ev = s.resources[2];
      if (ev) {
        const r = d.RESOURCES.find(x => x.id === ev);
        evaluacion.push({ codigo: `T${n}.V${evaluacion.length + 1}`, titulo: r.title, icono: 'problema', momento: momento(ev, 2),
          plantilla: 'recurso', recurso: ev, slot: 2, tema: ti, subtema: si });
      } else evaluacion.push({ codigo: `T${n}.V${evaluacion.length + 1}`, titulo: `${n}.${s.number} · ${nombreEval}`, icono: 'pendiente',
        momento: 'Por incorporar', plantilla: 'pendiente', tema: ti, subtema: si, ranuras: [2], pendiente: `${nombreEval} del subtema por incorporar` });
    });
    nodo.secciones.push({
      clave: 'S' + n, titulo: `S${n} · ${t.title}`, banner: 'Sección ' + n, tema: ti,
      subsecciones: [
        { titulo: 'Encuentro con el saber', unidades: encuentro },
        { titulo: 'Reflexión con el saber', unidades: reflexion },
        { titulo: `Evaluación (${evaluacion.length} ${cfg.palabraEval})`, nota: nombreEval, unidades: evaluacion }
      ]
    });
  });
  return nodo;
}
