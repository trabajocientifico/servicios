// ============================================================
// TRABAJO CIENTÍFICO — Seguimiento de estudiantes
// Google Apps Script para Google Sheets
// ============================================================
//
// QUÉ HACE
//   · Crea UNA HOJA POR CURSO dentro del mismo archivo.
//   · Escribe UNA FILA POR ESTUDIANTE (identificado por su correo).
//     La fila se actualiza sola; no se acumulan filas repetidas.
//   · Permite que el estudiante retome el curso desde otro equipo.
//
// CÓMO INSTALARLO (5 minutos)
//   1. Crea una hoja de cálculo nueva en Google Sheets.
//      No hace falta preparar nada: las hojas y los títulos
//      se crean solos con el primer estudiante.
//   2. Menú Extensiones → Apps Script.
//   3. Borra el código de ejemplo y pega ESTE archivo completo.
//   4. Guarda con Ctrl+S.
//   5. Botón azul "Implementar" → "Nueva implementación"
//        · Tipo: Aplicación web
//        · Ejecutar como: Yo
//        · Quién tiene acceso: CUALQUIER PERSONA   ← imprescindible
//      Autoriza los permisos que pida Google.
//   6. Copia la URL que termina en /exec y pégala en
//      js/config.js, en APPS_SCRIPT_URL.
//
// SI LUEGO EDITAS ESTE CÓDIGO
//   Guardar NO basta. Hay que ir a Implementar →
//   Administrar implementaciones → ✏️ Editar →
//   Versión: "Nueva versión" → Implementar.
//   Así la URL se mantiene y los cambios sí toman efecto.
// ============================================================


// Nombre de la hoja para cada curso.
// La clave es el identificador que usa la plataforma (el ?curso= de la URL).
// Un curso que no esté aquí crea su hoja usando su identificador.
var HOJAS_POR_CURSO = {
  'ciencia-datos-profesional-ia': 'Ciencia de Datos',
  'ia-investigacion-cientifica': 'IA Investigación'
};

// Poner en true para registrar ÚNICAMENTE los cursos de la lista de arriba.
// En false, cualquier otro curso de la plataforma crea su propia hoja.
var SOLO_CURSOS_LISTADOS = false;

var CABECERA = [
  'Nombre',              // A
  'Correo',              // B
  'Progreso %',          // C
  'Módulos vistos',      // D
  'Clases vistas',       // E
  'Quizzes aprobados',   // F
  'Estado',              // G
  'Última acción',       // H
  'Primer ingreso',      // I
  'Última actividad',    // J
  '_clases',             // K  (uso interno: se puede ocultar)
  '_quizzes'             // L  (uso interno: se puede ocultar)
];

var COL = {
  nombre: 1, correo: 2, progreso: 3, modulos: 4, clases: 5, quizzes: 6,
  estado: 7, accion: 8, ingreso: 9, actividad: 10, jsonClases: 11, jsonQuizzes: 12
};


// ------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------
function nombreHoja(cursoId, cursoTitulo) {
  if (HOJAS_POR_CURSO[cursoId]) return HOJAS_POR_CURSO[cursoId];
  if (SOLO_CURSOS_LISTADOS) return null;
  return String(cursoId || cursoTitulo || 'Sin curso').substring(0, 90);
}

function obtenerHoja(cursoId, cursoTitulo) {
  var nombre = nombreHoja(cursoId, cursoTitulo);
  if (!nombre) return null;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(nombre);

  if (!hoja) {
    hoja = ss.insertSheet(nombre);
    hoja.appendRow(CABECERA);
    hoja.getRange(1, 1, 1, CABECERA.length)
        .setFontWeight('bold')
        .setBackground('#0b0d17')
        .setFontColor('#ffffff');
    hoja.setFrozenRows(1);
    hoja.setColumnWidth(COL.nombre, 220);
    hoja.setColumnWidth(COL.correo, 240);
    hoja.setColumnWidth(COL.accion, 300);
    hoja.hideColumns(COL.jsonClases, 2);   // las columnas técnicas no estorban
  }
  return hoja;
}

function ahora() {
  return Utilities.formatDate(new Date(), 'America/Bogota', 'yyyy-MM-dd HH:mm');
}

function normalizarCorreo(correo) {
  return String(correo || '').trim().toLowerCase();
}

// Busca la fila del estudiante por correo. Devuelve -1 si no existe.
function buscarFila(hoja, correo) {
  var ultima = hoja.getLastRow();
  if (ultima < 2) return -1;
  var correos = hoja.getRange(2, COL.correo, ultima - 1, 1).getValues();
  for (var i = 0; i < correos.length; i++) {
    if (normalizarCorreo(correos[i][0]) === correo) return i + 2;
  }
  return -1;
}

// Crea la fila del estudiante si aún no existe y devuelve su número
function asegurarFila(hoja, correo, nombre) {
  var fila = buscarFila(hoja, correo);
  if (fila > 0) {
    if (nombre) hoja.getRange(fila, COL.nombre).setValue(nombre);
    return fila;
  }
  hoja.appendRow([nombre || '', correo, 0, '', '', '', 'Inscrito', '', ahora(), ahora(), '[]', '[]']);
  return hoja.getLastRow();
}

function parsearLista(valor) {
  try {
    var lista = JSON.parse(valor || '[]');
    return Array.isArray(lista) ? lista : [];
  } catch (err) {
    return [];
  }
}

function respuesta(datos, callback) {
  var json = JSON.stringify(datos);
  if (callback) {   // JSONP: evita bloqueos de CORS al leer desde el navegador
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}


// ------------------------------------------------------------
// ESCRITURA
// ------------------------------------------------------------
function doPost(e) {
  // Evita que dos estudiantes escribiendo a la vez se pisen la fila
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return respuesta({ status: 'error', message: 'ocupado' });
  }

  try {
    var data = JSON.parse(e.postData.contents);

    if (data.tipo === 'estado') {
      guardarEstado(data);
    } else if (data.tipo === 'avance') {
      registrarAvance(data);
    } else {
      registrarIngreso(data);
    }
    return respuesta({ status: 'ok' });

  } catch (error) {
    return respuesta({ status: 'error', message: error.toString() });

  } finally {
    lock.releaseLock();
  }
}

// El estudiante entró con su clave por primera vez
function registrarIngreso(data) {
  var hoja = obtenerHoja(data.cursoId || data.curso, data.curso);
  if (!hoja) return;
  var correo = normalizarCorreo(data.correo);
  if (!correo) return;

  var fila = asegurarFila(hoja, correo, data.nombre);
  hoja.getRange(fila, COL.actividad).setValue(data.fecha || ahora());
}

// Cada clase vista o quiz aprobado deja constancia de la última acción
function registrarAvance(data) {
  var hoja = obtenerHoja(data.cursoId || data.curso, data.curso);
  if (!hoja) return;
  var correo = normalizarCorreo(data.correo);
  if (!correo) return;

  var fila = asegurarFila(hoja, correo, data.nombre);
  var texto = data.evento || '';
  if (data.detalle) texto += ' — ' + data.detalle;
  if (data.puntaje !== undefined && data.puntaje !== '') texto += ' (' + data.puntaje + '%)';

  hoja.getRange(fila, COL.accion).setValue(texto);
  hoja.getRange(fila, COL.actividad).setValue(data.fecha || ahora());
}

// Foto completa del avance: es lo que permite retomar desde otro equipo
function guardarEstado(data) {
  var hoja = obtenerHoja(data.cursoId || data.curso, data.curso);
  if (!hoja) return;
  var correo = normalizarCorreo(data.correo);
  if (!correo) return;

  var fila = asegurarFila(hoja, correo, data.nombre);
  var progreso = Number(data.progreso) || 0;

  hoja.getRange(fila, COL.progreso).setValue(progreso);
  hoja.getRange(fila, COL.modulos).setValue(data.modulosVistos || '');
  hoja.getRange(fila, COL.clases).setValue(data.clasesVistas || '');
  hoja.getRange(fila, COL.quizzes).setValue(data.quizzesAprobados || '');
  hoja.getRange(fila, COL.estado).setValue(progreso >= 100 ? 'Completado' : 'En curso');
  hoja.getRange(fila, COL.actividad).setValue(data.fecha || ahora());
  hoja.getRange(fila, COL.jsonClases).setValue(JSON.stringify(data.clases || []));
  hoja.getRange(fila, COL.jsonQuizzes).setValue(JSON.stringify(data.quizzes || []));
}


// ------------------------------------------------------------
// LECTURA — devuelve el avance de un estudiante en un curso
// .../exec?accion=estado&correo=ana@correo.com&curso=ciencia-datos-profesional-ia
// ------------------------------------------------------------
function doGet(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  var callback = p.callback || '';

  try {
    if (p.accion !== 'estado') {
      return respuesta({ status: 'ok', message: 'El servicio está activo' }, callback);
    }

    var correo = normalizarCorreo(p.correo);
    var curso = String(p.curso || '');
    if (!correo || !curso) {
      return respuesta({ status: 'error', message: 'Faltan correo o curso' }, callback);
    }

    var nombre = nombreHoja(curso, '');
    var hoja = nombre ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre) : null;
    if (!hoja) return respuesta({ status: 'ok', encontrado: false }, callback);

    var fila = buscarFila(hoja, correo);
    if (fila < 0) return respuesta({ status: 'ok', encontrado: false }, callback);

    var f = hoja.getRange(fila, 1, 1, CABECERA.length).getValues()[0];
    return respuesta({
      status: 'ok',
      encontrado: true,
      nombre: f[COL.nombre - 1],
      clases: parsearLista(f[COL.jsonClases - 1]),
      quizzes: parsearLista(f[COL.jsonQuizzes - 1]),
      progreso: f[COL.progreso - 1],
      actualizado: f[COL.actividad - 1]
    }, callback);

  } catch (error) {
    return respuesta({ status: 'error', message: error.toString() }, callback);
  }
}
