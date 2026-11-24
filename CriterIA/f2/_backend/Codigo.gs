// Aplicación web independiente de F2. Solo doPost despacha operaciones de alumnos.
const TITULOS_F2 = [
  '¿Reglas o aprendizaje?', '¿Qué estoy usando realmente?', 'Del modelo a la experiencia',
  'Herramienta, sistema y modelo', 'Cuatro resultados de la IA', 'Sesgo algorítmico',
  'Dos filtros, la misma bandeja', '¿Regla, ejemplos o ambos?', '¿Qué forma tiene el resultado?',
  '¿Qué salida esperas?', 'Mapa de técnicas de Machine Learning', 'El viaje de una solicitud',
  'Por dentro del asistente', 'Cuatro maneras de ajustar un modelo', '¿Con qué ejemplos se evalúa?',
  '¿En qué etapa del ciclo?', '¿Qué señal orienta el ajuste?', 'Arma una respuesta, token a token',
  '¿Suena bien o es correcto?', 'Lo que el sistema no debió aprender'
];
const RECURSOS_F2 = TITULOS_F2.map((_, i) => 'r' + String(i + 1).padStart(2, '0'));
const COLUMNAS_F2 = ['Correo', 'Registro', 'Último ingreso', 'Última actividad', 'Finalizados', 'En curso',
  'Avance', 'Último punto', 'Identificador', 'Verificador', 'Marca de navegación', 'Ubicación interna']
  .concat(TITULOS_F2.flatMap(t => ['Inicio · ' + t, 'Fin · ' + t]));
const DURACION_F2 = 12 * 60 * 60 * 1000;
// Diagnóstico inicial de F2 (sin nota). El orden y la respuesta esperada deben coincidir con el banco DIAG_F2
// del curso (Documento_Base/recursos/CHATGPT/tmp/f2-diagnostico/agregar_diagnostico.py). La opción 3 (D) es
// «No estoy seguro/a». Las columnas van a la derecha de «Nombre completo» y nunca se sobrescriben.
const DIAGNOSTICO_F2 = [
  {etiqueta:'1 Tipos de sistema', tema:1, esperada:1},
  {etiqueta:'2 Usar o entrenar', tema:2, esperada:2},
  {etiqueta:'3 Verificar una respuesta', tema:2, esperada:1},
  {etiqueta:'4 Datos y contexto', tema:3, esperada:0},
  {etiqueta:'5 Datos personales', tema:4, esperada:2}
];
const COLUMNAS_DIAGNOSTICO_F2 = ['Diagnóstico · Fecha']
  .concat(DIAGNOSTICO_F2.map(q => 'Diagnóstico · ' + q.etiqueta), ['Diagnóstico · Reconoce (de 5)', 'Diagnóstico · Empezar por']);
const COL_DIAGNOSTICO_F2 = COLUMNAS_F2.length + 2;

function configurarF2() {
  const props = PropertiesService.getScriptProperties();
  return conBloqueo_(() => {
    const clave = props.getProperty('CLAVE_CURSO') ||
      (typeof CLAVE_INICIAL_F2 === 'string' ? CLAVE_INICIAL_F2 : '');
    if (!/^[0-9a-f]{64}$/.test(clave)) throw Error('Falta la clave del paquete privado de F2.');
    props.setProperty('CLAVE_CURSO', clave);
    if (!props.getProperty('PEPPER')) props.setProperty('PEPPER', aleatorio_());
    const id = props.getProperty('HOJA_F2');
    const libro = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.create('CriterIA F2 · Seguimiento');
    if (!id) props.setProperty('HOJA_F2', libro.getId());
    libro.setSpreadsheetTimeZone('America/Bogota');
    const avance = libro.getSheetByName('Avance') || libro.getSheets()[0].setName('Avance');
    if (!avance.getLastRow()) {
      if (avance.getMaxColumns() < COLUMNAS_F2.length)
        avance.insertColumnsAfter(avance.getMaxColumns(), COLUMNAS_F2.length - avance.getMaxColumns());
      cabecera_(avance, COLUMNAS_F2);
      avance.hideColumns(9, 4);
      avance.setColumnWidth(1, 210);
      avance.setColumnWidth(8, 250);
      avance.setColumnWidths(13, RECURSOS_F2.length * 2, 180);
      avance.getRange('G2:G').setNumberFormat('0%');
      avance.getRange('B2:D').setNumberFormat('yyyy-mm-dd hh:mm');
      avance.getRange(2, 13, avance.getMaxRows()-1, RECURSOS_F2.length*2).setNumberFormat('yyyy-mm-dd hh:mm');
    }
    // Se agrega al final para que los identificadores y las fechas conserven sus columnas.
    const colNombre = COLUMNAS_F2.length + 1;
    if (avance.getMaxColumns() < colNombre)
      avance.insertColumnsAfter(avance.getMaxColumns(), colNombre - avance.getMaxColumns());
    const cabeceraNombre = avance.getRange(1, colNombre);
    if (cabeceraNombre.isBlank()) {
      cabeceraNombre.setValue('Nombre completo').setBackground('#02475b').setFontColor('#ffffff').setFontWeight('bold');
      avance.setColumnWidth(colNombre, 260);
    } else if (cabeceraNombre.getValue() !== 'Nombre completo') {
      throw Error('La columna prevista para el nombre ya contiene otro encabezado.');
    }
    const sesiones = libro.getSheetByName('Sesiones') || libro.insertSheet('Sesiones');
    if (!sesiones.getLastRow()) cabecera_(sesiones, ['Huella', 'Identificador', 'Vence']);
    sesiones.hideSheet();
    console.log(libro.getUrl());
  });
}
function cabecera_(hoja, columnas) {
  hoja.getRange(1, 1, 1, columnas.length).setValues([columnas])
    .setBackground('#02475b').setFontColor('#ffffff').setFontWeight('bold').setWrap(true);
  hoja.setFrozenRows(1);
}
function conBloqueo_(fn) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(12000)) fallo_('OCUPADO');
  try { return fn(); } finally { try { SpreadsheetApp.flush(); } finally { lock.releaseLock(); } }
}
function fallo_(code) { const e = Error(code); e.publicCode = code; throw e; }
function aleatorio_() { return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''); }
function huella_(s) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s, Utilities.Charset.UTF_8)
    .map(b => (b & 255).toString(16).padStart(2, '0')).join('');
}
function respuesta_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() { return respuesta_({servicio: 'CriterIA', version: 6}); }
function doPost(e) {
  try {
    if (!e || !e.postData || e.postData.contents.length > 10000) fallo_('DATOS');
    let p;
    try { p = JSON.parse(e.postData.contents); } catch (_) { fallo_('DATOS'); }
    if (!p || !['registro','ingreso','abrir','guardar','abrirNodo','guardarNodo','completarNombre','salir'].includes(p.accion)) fallo_('DATOS');
    const props = PropertiesService.getScriptProperties();
    const libro = SpreadsheetApp.openById(props.getProperty('HOJA_F2'));
    const usuarios = libro.getSheetByName('Avance'), sesiones = libro.getSheetByName('Sesiones');
    if (p.accion === 'registro' || p.accion === 'ingreso')
      return respuesta_(Object.assign({ok:true}, autenticar_(p, usuarios, sesiones, props, libro)));
    const result = conBloqueo_(() => {
      const sesion = sesion_(sesiones, p.token);
      if (p.accion === 'salir') { sesiones.deleteRow(sesion.fila); return {}; }
      const fila = buscar_(usuarios, 9, sesion.id);
      if (!fila) fallo_('SESION');
      if (p.accion === 'completarNombre') {
        const celda = usuarios.getRange(fila, COLUMNAS_F2.length + 1);
        const nombre = celda.getDisplayValue() || validarNombre_(p.nombre);
        if (celda.isBlank()) celda.setValue("'" + nombre);
        for (const codigo of Object.keys(NODOS_INVESTIGACION)) {
          const hoja = libro.getSheetByName('Avance ' + codigo.toUpperCase());
          const filaNodo = hoja && buscar_(hoja, 9, sesion.id);
          if (filaNodo) hoja.getRange(filaNodo, 2).setValue("'" + nombre);
        }
        return {nombre};
      }
      if (p.accion === 'abrirNodo' || p.accion === 'guardarNodo') {
        const resultado = operarNodo_(p, libro, usuarios, fila, sesion.id, props);
        if (p.accion === 'abrirNodo') resultado.nombre = nombreCuenta_(usuarios, fila);
        return resultado;
      }
      if (p.accion === 'abrir') return abrirCuenta_(p, libro, usuarios, fila, props);
      const datos = usuarios.getRange(fila, 1, 1, COLUMNAS_F2.length).getValues()[0];
      guardar_(datos, p.avance, p.marca);
      usuarios.getRange(fila, 4, 1, datos.length - 3).setValues([datos.slice(3)]);
      guardarDiagnostico_(usuarios, fila, p.avance);
      return {};
    });
    return respuesta_(Object.assign({ok:true}, result));
  } catch (e) {
    if (!e.publicCode) console.error(e.name, String(e.message).slice(0,200));
    return respuesta_({ok:false, error:e.publicCode || 'SERVICIO'});
  }
}
function buscar_(hoja, columna, valor) {
  const n = hoja.getLastRow() - 1;
  if (!n) return 0;
  const c = hoja.getRange(2, columna, n, 1).createTextFinder(valor).matchEntireCell(true)
    .matchCase(true).useRegularExpression(false).findNext();
  return c ? c.getRow() : 0;
}
function limitar_(id) {
  const cache = CacheService.getScriptCache();
  const key = 'intentos-' + id, n = Number(cache.get(key) || 0);
  if (n >= 12) fallo_('INTENTOS');
  cache.put(key, String(n + 1), 900);
}
function nombreCuenta_(usuarios, fila) {
  return usuarios.getRange(fila, COLUMNAS_F2.length + 1).getDisplayValue();
}
function validarNombre_(valor) {
  const nombre = typeof valor === 'string' ? valor.trim().replace(/\s+/g, ' ') : '';
  if (nombre.length > 150 || !/\p{L}/u.test(nombre) || /[\x00-\x1f\x7f]/.test(nombre))
    fallo_('NOMBRE');
  return nombre;
}
function autenticar_(p, usuarios, sesiones, props, libro) {
  const correo = typeof p.correo === 'string' ? p.correo.trim().toLowerCase() : '';
  const nombre = p.accion === 'registro' ? validarNombre_(p.nombre) : '';
  if (correo.length > 254 || !/^[^@\s\x00-\x1f]+@[^@\s\x00-\x1f]+\.[^@\s\x00-\x1f]+$/.test(correo) ||
      typeof p.clave !== 'string' || p.clave.length > 256 || !p.clave.length) fallo_('DATOS');
  if (p.accion === 'registro' && p.clave.length < 10) fallo_('CLAVE');
  const id = huella_(correo);
  const verificador = conBloqueo_(() => {
    limitar_(id);
    const fila = buscar_(usuarios, 9, id);
    return fila ? usuarios.getRange(fila, 10).getValue() : '';
  });
  const prehash = Utilities.base64Encode(Utilities.computeHmacSha256Signature(p.clave, props.getProperty('PEPPER'), Utilities.Charset.UTF_8));
  let hash;
  if (p.accion === 'registro') {
    if (verificador) fallo_('REGISTRO');
    const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, aleatorio_(), Utilities.Charset.UTF_8);
    hash = bcrypt.hashSync(prehash, '$2b$10$' + bcrypt.encodeBase64(bytes.map(b => b & 255), 16));
  } else {
    const valido = bcrypt.compareSync(prehash, verificador || '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');
    if (!verificador || !valido) fallo_('CREDENCIALES');
  }
  return conBloqueo_(() => {
    let fila = buscar_(usuarios, 9, id);
    const ahora = new Date();
    if (p.accion === 'registro') {
      if (fila) fallo_('REGISTRO');
      // La comilla fuerza texto literal en Sheets, también en correos que empiezan por "=".
      const fechas = Array(RECURSOS_F2.length * 2).fill('');
      usuarios.appendRow(["'" + correo, ahora, ahora, ahora, 0, 0, 0, '', id, hash, 0, '', ...fechas, "'" + nombre]);
      fila = usuarios.getLastRow();
    } else {
      if (!fila) fallo_('CREDENCIALES');
      usuarios.getRange(fila, 3).setValue(ahora);
    }
    CacheService.getScriptCache().remove('intentos-' + id);
    const token = aleatorio_(), vence = Date.now() + DURACION_F2;
    // Las filas se agregan por vencimiento. Retira las vencidas al emitir otra sesión.
    const n = sesiones.getLastRow() - 1;
    if (n) {
      const fechas = sesiones.getRange(2, 3, n, 1).getValues();
      let caducas = 0;
      while (caducas < n && Number(fechas[caducas][0]) <= Date.now()) caducas++;
      if (caducas) sesiones.deleteRows(2, caducas);
    }
    sesiones.appendRow([huella_(token), id, new Date(vence)]);
    return {token, vence, ...abrirCuenta_(p, libro, usuarios, fila, props)};
  });
}
function sesion_(hoja, token) {
  if (typeof token !== 'string' || !/^[a-f\d]{64}$/.test(token)) fallo_('SESION');
  const fila = buscar_(hoja, 1, huella_(token));
  if (!fila) fallo_('SESION');
  const [id, vence] = hoja.getRange(fila, 2, 1, 2).getValues()[0];
  if (Number(vence) <= Date.now()) fallo_('SESION');
  return {fila, id};
}
function avanceGuardado_(datos, recursos) {
  const r = {};
  recursos.forEach((id, i) => {
    const inicio = datos[12+i*2], fin = datos[13+i*2];
    if (inicio) r[id] = [fin ? 2 : 1, Math.floor(Number(inicio)/1000), fin ? Math.floor(Number(fin)/1000) : 0];
  });
  return {marca:Number(datos[10]) || 0,
    avance:{v:1, r, loc:datos[11] ? JSON.parse(datos[11]) : null}};
}
function diagnosticoValido_(d) {
  return !!d && typeof d === 'object' && Number.isSafeInteger(d.t) && d.t > 0 && Array.isArray(d.a) &&
    d.a.length === DIAGNOSTICO_F2.length && d.a.every(x => Number.isInteger(x) && x >= 0 && x <= 3);
}
function celdasDiagnostico_(d, ahora) {
  const reconoce = d.a.filter((x, i) => x === DIAGNOSTICO_F2[i].esperada).length;
  const pendiente = DIAGNOSTICO_F2.find((q, i) => d.a[i] !== q.esperada);
  return [new Date(Math.min(ahora, d.t * 1000))]
    .concat(d.a.map((x, i) => 'ABCD'[x] + ' · ' +
      (x === 3 ? 'No está seguro/a' : x === DIAGNOSTICO_F2[i].esperada ? 'Reconoce' : 'Por reforzar')),
      [reconoce, pendiente ? 'Tema ' + pendiente.tema : 'Cualquier tema']);
}
function leerDiagnostico_(fila) {
  if (!fila[0]) return null;
  const d = {t: Math.floor(Number(fila[0]) / 1000),
    a: fila.slice(1, 1 + DIAGNOSTICO_F2.length).map(v => 'ABCD'.indexOf(String(v).charAt(0)))};
  return diagnosticoValido_(d) ? d : null;
}
function guardarDiagnostico_(hoja, fila, avance) {
  const d = avance && avance.d;
  if (!diagnosticoValido_(d)) return;
  const ancho = COLUMNAS_DIAGNOSTICO_F2.length, ultima = COL_DIAGNOSTICO_F2 + ancho - 1;
  if (hoja.getMaxColumns() < ultima) hoja.insertColumnsAfter(hoja.getMaxColumns(), ultima - hoja.getMaxColumns());
  const cabecera = hoja.getRange(1, COL_DIAGNOSTICO_F2, 1, ancho);
  const actual = cabecera.getDisplayValues()[0];
  if (actual.every(v => !v)) {
    cabecera.setValues([COLUMNAS_DIAGNOSTICO_F2]).setBackground('#02475b').setFontColor('#ffffff')
      .setFontWeight('bold').setWrap(true);
    hoja.getRange(2, COL_DIAGNOSTICO_F2, Math.max(1, hoja.getMaxRows() - 1), 1).setNumberFormat('yyyy-mm-dd hh:mm');
    hoja.setColumnWidths(COL_DIAGNOSTICO_F2, ancho, 170);
  } else if (actual[0] !== COLUMNAS_DIAGNOSTICO_F2[0]) {
    console.error('Las columnas previstas para el diagnóstico ya contienen otro encabezado.');
    return;
  }
  const celdas = hoja.getRange(fila, COL_DIAGNOSTICO_F2, 1, ancho);
  if (celdas.getValues()[0][0]) return;
  celdas.setValues([celdasDiagnostico_(d, Date.now())]);
}
function diagnosticoCuenta_(hoja, fila) {
  if (hoja.getMaxColumns() < COL_DIAGNOSTICO_F2 + DIAGNOSTICO_F2.length) return null;
  return leerDiagnostico_(hoja.getRange(fila, COL_DIAGNOSTICO_F2, 1, 1 + DIAGNOSTICO_F2.length).getValues()[0]);
}
function abrir_(datos, props, recursos = RECURSOS_F2) {
  return {id:datos[8], claveCurso:props.getProperty('CLAVE_CURSO'), ...avanceGuardado_(datos, recursos)};
}
function abrirCuenta_(p, libro, usuarios, fila, props) {
  const datos = usuarios.getRange(fila, 1, 1, COLUMNAS_F2.length).getValues()[0];
  const nombre = nombreCuenta_(usuarios, fila);
  if (p.vista !== 'mapa') {
    const res = {nombre, ...abrir_(datos, props)};
    const diagnostico = diagnosticoCuenta_(usuarios, fila);
    if (diagnostico) res.avance.d = diagnostico;
    return res;
  }
  const id = datos[8];
  const nodos = {f2:{recursos:RECURSOS_F2, ...avanceGuardado_(datos, RECURSOS_F2)}};
  for (const [codigo, config] of Object.entries(NODOS_INVESTIGACION)) {
    const recursos = Object.keys(config.titulos);
    const hoja = libro.getSheetByName('Avance ' + codigo.toUpperCase());
    const filaNodo = hoja && hoja.getLastRow() > 1 && buscar_(hoja, 9, id);
    const registro = filaNodo ? hoja.getRange(filaNodo, 1, 1, 12 + recursos.length*2).getValues()[0] : [];
    nodos[codigo] = {recursos, ...avanceGuardado_(registro, recursos)};
  }
  return {id, nombre, nodos};
}
function ubicacion_(loc, recursos, temas) {
  if (!loc) return null;
  if (recursos.includes(loc.r)) return {r:loc.r};
  if (loc.l === 'reflection' && recursos === RECURSOS_F2) return {l:'reflection'};
  if (['welcome','value','topics','subtopics','resources'].includes(loc.l) && Number.isInteger(loc.t) &&
      Number.isInteger(loc.s) && loc.t >= 0 && loc.t < temas.length && loc.s >= 0 && loc.s < temas[loc.t])
    return {l:loc.l, t:loc.t, s:loc.s};
  fallo_('DATOS');
}
function guardar_(datos, estado, marca, recursos = RECURSOS_F2, titulos = TITULOS_F2, temas = [3,3,4,2]) {
  if (!estado || estado.v !== 1 || !estado.r || typeof estado.r !== 'object' ||
      !Number.isSafeInteger(marca) || marca < 0) fallo_('DATOS');
  const loc = ubicacion_(estado.loc, recursos, temas), ahora = Date.now();
  let hechos = 0, curso = 0;
  recursos.forEach((id, i) => {
    const rec = estado.r[id], a = 12+i*2, b = a+1;
    if (rec) {
      if (!Array.isArray(rec) || ![1,2].includes(rec[0]) || !Number.isSafeInteger(rec[1]) || rec[1]<=0 ||
          (rec[0] === 2 && (!Number.isSafeInteger(rec[2]) || rec[2] < rec[1]))) fallo_('DATOS');
      const inicio = Math.min(ahora, rec[1]*1000);
      datos[a] = new Date(Math.min(Number(datos[a]) || inicio, inicio));
      if (rec[0] === 2) {
        const fin = Math.min(ahora, rec[2]*1000);
        datos[b] = new Date(Math.min(Number(datos[b]) || fin, fin));
      }
    }
    if (datos[b]) hechos++;
    else if (datos[a]) curso++;
  });
  const timestamp = Math.min(ahora, marca);
  if (loc && timestamp >= Number(datos[10])) {
    datos[10] = timestamp;
    datos[11] = JSON.stringify(loc);
    const secciones = {welcome:'Bienvenida', value:'Valor del nodo', topics:'Mapa de temas', reflection:'Confiar con criterio'};
    datos[7] = loc.r ? titulos[recursos.indexOf(loc.r)] : secciones[loc.l] || (loc.l === 'subtopics' ? 'Tema ' + (loc.t+1) : 'Subtema ' + (loc.t+1) + '.' + (loc.s+1));
  }
  datos[3] = new Date(ahora);
  datos[4] = hechos; datos[5] = curso; datos[6] = hechos/recursos.length;
}

const NODOS_INVESTIGACION = {
  "i2": {
    "temas": [
      3,
      4,
      3,
      2
    ],
    "titulos": {
      "r01": "Comparador de diseños",
      "r02": "La cadena de cuatro eslabones",
      "r03": "¿Tu método responde tu pregunta?",
      "r04": "Encuentra el eslabón roto"
    }
  },
  "i3": {
    "temas": [
      3,
      4,
      3,
      3
    ],
    "titulos": {
      "r01": "¿Quién responde por este párrafo?",
      "r02": "¿Qué puede apoyar la IA y qué solo quien firma?",
      "r03": "¿Quién responde?",
      "r04": "Lo que admiten las editoriales",
      "r05": "Admitido, condicionado o no permitido",
      "r06": "Revisión, imágenes y destino",
      "r07": "El semáforo de usos",
      "r08": "Ficha de producto",
      "r09": "¿Se puede subir?",
      "r10": "El taller · La IA como escritora",
      "r11": "Actividad práctica · La IA como escritora",
      "r12": "Revisa el borrador del agente",
      "r13": "El taller · La IA como copiloto",
      "r14": "Actividad práctica · La IA como asistente de escritura",
      "r15": "¿Acepto esta sugerencia?",
      "r16": "El taller · La IA como editora",
      "r17": "Actividad práctica · La IA como estructuradora",
      "r18": "Coteja lo que compuso",
      "r19": "Actividad práctica · Traducción con IA",
      "r20": "Actividad práctica · Verificación de 20 referencias con IA",
      "r21": "Actividad práctica · De referencias APA a Zotero y Mendeley"
    }
  }
};

function operarNodo_(p, libro, usuarios, filaUsuario, id, props) {
  if (typeof p.nodo !== 'string' || !Object.prototype.hasOwnProperty.call(NODOS_INVESTIGACION, p.nodo))
    fallo_('DATOS');
  const config = NODOS_INVESTIGACION[p.nodo];
  const recursos = Object.keys(config.titulos), titulos = Object.values(config.titulos);
  const nombreHoja = 'Avance ' + p.nodo.toUpperCase();
  const hoja = libro.getSheetByName(nombreHoja) || libro.insertSheet(nombreHoja);
  const ancho = 12 + recursos.length * 2;
  if (!hoja.getLastRow()) {
    if (hoja.getMaxColumns() < ancho) hoja.insertColumnsAfter(hoja.getMaxColumns(), ancho - hoja.getMaxColumns());
    cabecera_(hoja, ['Correo','Nombre completo','Primer acceso','Última actividad','Finalizados','En curso',
      'Avance','Último punto','Identificador','Nodo','Marca de navegación','Ubicación interna']
      .concat(titulos.flatMap(t => ['Inicio · ' + t, 'Fin · ' + t])));
    hoja.hideColumns(9,4);
    hoja.getRange('G2:G').setNumberFormat('0%');
    hoja.getRange('C2:D').setNumberFormat('yyyy-mm-dd hh:mm');
    hoja.setColumnWidths(1,2,210);
    hoja.setColumnWidth(8,250);
    hoja.setColumnWidths(13,ancho-12,180);
  }
  const fila = buscar_(hoja,9,id);
  let datos;
  if (fila) datos = hoja.getRange(fila,1,1,ancho).getValues()[0];
  else {
    const usuario = usuarios.getRange(filaUsuario,1,1,COLUMNAS_F2.length+1).getValues()[0];
    datos = ["'" + usuario[0], "'" + usuario[COLUMNAS_F2.length], new Date(), new Date(), 0, 0, 0,
      '', id, p.nodo.toUpperCase(), 0, '', ...Array(recursos.length*2).fill('')];
  }
  if (p.accion === 'guardarNodo') guardar_(datos,p.avance,p.marca,recursos,titulos,config.temas);
  if (!fila) hoja.appendRow(datos);
  else if (p.accion === 'guardarNodo') hoja.getRange(fila,4,1,ancho-3).setValues([datos.slice(3)]);
  return p.accion === 'abrirNodo' ? Object.assign({nodo:p.nodo}, abrir_(datos,props,recursos)) : {nodo:p.nodo};
}
