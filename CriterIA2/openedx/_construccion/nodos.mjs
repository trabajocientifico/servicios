// Configuración de cada nodo: dónde está su HTML privado y cómo se ve su encabezado.
import { datosF2, datosInvestigacion } from './extraer.mjs';

// Paletas de categoría del sistema CriterIA V1 (rosa: Comprensión/Fundamentos; coral: Investigación formativa).
const ROSA = { g1: '#F7B3D8', g2: '#E98AC0', g3: '#D45C9F', ola: '#EE9CCB', sombra: '#C95A98', claro: '#F7B3D8', trazo: '#B64F8C', acento: '#E28DC1', pdf: '#B64F8C' };
const CORAL = { g1: '#FFC2B9', g2: '#FF9488', g3: '#FF5E52', ola: '#FFA79D', sombra: '#D9443A', claro: '#FFC2B9', trazo: '#B83A30', acento: '#FF796F', pdf: '#B83A30' };

export const NODOS = {
  f2: { codigo: 'F2', clave: 'f2', categoria: 'Fundamentos', etiqueta: 'Fundamentos · Nodo F2', origen: 'F2/Sistemas-que-aprenden.html',
    paleta: ROSA, datos: datosF2, palabraEval: 'repasos', quitar: ['pdf-f2-base', 'pdf-f2-t1', 'pdf-f2-t2', 'pdf-f2-t3', 'pdf-f2-t4', 'bienvenida-source'] },
  i2: { codigo: 'I2', clave: 'i2', categoria: 'Investigación', etiqueta: 'Investigación · Nodo I2', origen: 'I2/curso.html',
    paleta: CORAL, datos: datosInvestigacion, palabraEval: 'actividades', quitar: ['bienvenida-source'] },
  i3: { codigo: 'I3', clave: 'i3', categoria: 'Investigación', etiqueta: 'Investigación · Nodo I3', origen: 'I3/curso.html',
    paleta: CORAL, datos: datosInvestigacion, palabraEval: 'actividades', quitar: ['bienvenida-source', 'tutorial-r11', 'tutorial-r14', 'tutorial-r17', 'tutorial-r19', 'tutorial-r20', 'tutorial-r21'] }
};

// Red de los 16 nodos para la pantalla «Mi trayectoria». Nombres y categorías como aparecen en la plataforma;
// conexiones tomadas de CriterIA/mapa.js. x, y: posición en un lienzo de 1000 × 1720.
export const RED = {
  categorias: [
    { id: 'C', nombre: 'Comprensión Crítica', color: '#B64F8C' },
    { id: 'F', nombre: 'Fundamentación analítica', color: '#6E3CFA' },
    { id: 'A', nombre: 'Aplicación Pedagógica', color: '#00566F' },
    { id: 'I', nombre: 'Investigación formativa', color: '#B83A30' },
    { id: 'D', nombre: 'Desarrollo técnico', color: '#630AE1' }
  ],
  alto: 1720,
  nodos: [
    ['C2', 'IA y transformación de la enseñanza y el aprendizaje', 330, 100],
    ['C1', 'Interacción crítica con IA generativa', 670, 100],
    ['C4', 'Gobernanza, datos y marco normativo de la IA', 330, 380],
    ['C3', 'La IA como entramado territorial: materia, trabajo, datos y poder', 670, 380],
    ['F1', '¿A qué nos referimos cuando hablamos de IA?: historias, conceptos y límites', 250, 680],
    ['F2', 'Sistemas que aprenden: una mirada por dentro de la IA', 500, 680],
    ['F3', 'Pensamiento computacional', 750, 680],
    ['A1', 'Diseño curricular de una asignatura con apoyo de IA', 190, 980],
    ['A2', 'Diseño de actividades de aprendizaje con IA', 400, 1020],
    ['A3', 'Evaluación de los aprendizajes en contextos de IA', 610, 980],
    ['A4', 'Integridad académica en el aula con el uso de IA', 820, 1020],
    ['I1', 'Formulación de la investigación con IA: del problema a las fuentes', 290, 1270],
    ['I2', 'Método, datos y análisis con IA', 500, 1310],
    ['I3', 'Escritura, citación y comunicación de la investigación con integridad', 710, 1270],
    ['D1', 'Fundamentos de programación para construir con IA', 400, 1560],
    ['D2', 'Construir soluciones sobre modelos de IA existentes', 600, 1560]
  ].map(([codigo, nombre, x, y]) => ({ codigo, nombre, x, y, cat: codigo[0] })),
  tramos: [
    ['F1', 'F2'], ['F2', 'F3'],
    ['C4', 'C1'], ['C4', 'C2'], ['C1', 'C3'], ['C2', 'C3'], ['C4', 'C3'], ['C1', 'C2'],
    ['A1', 'A2'], ['A2', 'A3'], ['A3', 'A4'],
    ['I1', 'I2'], ['I2', 'I3'], ['D1', 'D2'],
    ['F1', 'C4'], ['F3', 'A1'], ['C3', 'I2'], ['A4', 'D2'], ['I3', 'D1']
  ]
};
