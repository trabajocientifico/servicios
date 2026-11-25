// Uso: node empaquetar-scorm.mjs <HTML original fuera del sitio> <carpeta privada fuera del sitio> [f2|i2|i3]
// Genera CriterIA-<NODO>-scorm.zip (SCORM 2004 4th ed.) para cargarlo en Open edX con la SCORM XBlock.
import { readFileSync, writeFileSync, mkdirSync, realpathSync } from 'node:fs';
import { join, relative, resolve, dirname, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync, crc32 } from 'node:zlib';

const [origen, destino, nodo = 'f2'] = process.argv.slice(2);
if (!['f2','i2','i3'].includes(nodo)) throw Error('Nodo desconocido.');
if (!origen || !destino) throw Error('Indica la ruta del HTML original y la carpeta privada.');
const backend = dirname(fileURLToPath(import.meta.url));
const sitio = resolve(backend, '../../..');
mkdirSync(destino, { recursive: true });
// El paquete lleva el material sin cifrar: nunca debe quedar dentro del sitio público.
for (const ruta of [origen, destino]) {
  const desdeSitio = relative(realpathSync(sitio), realpathSync(ruta));
  if (!(isAbsolute(desdeSitio) || desdeSitio === '..' || desdeSitio.startsWith('..' + sep)))
    throw Error('El original y el paquete deben estar fuera del sitio público.');
}
const html = readFileSync(origen);
if (!html.includes('function CriteriaAvance(') || !html.includes('criteria-' + nodo + '-avance'))
  throw Error('El HTML debe incluir el seguimiento del nodo indicado.');

const codigo = nodo.toUpperCase();
const mapa = readFileSync(join(backend, '../../mapa.js'), 'utf8');
const titulo = mapa.match(new RegExp("\\['" + codigo + "','([^']+)'\\]"))?.[1];
if (!titulo) throw Error('No se encontró el título de ' + codigo + ' en mapa.js.');
const xml = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const nombre = xml(codigo + ' · ' + titulo);

const manifiesto = `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="criteria-${nodo}" version="1"
  xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
  xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
  xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
  xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
  </metadata>
  <organizations default="criteria-${nodo}-org">
    <organization identifier="criteria-${nodo}-org">
      <title>${nombre}</title>
      <item identifier="criteria-${nodo}-item" identifierref="criteria-${nodo}-sco">
        <title>${nombre}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="criteria-${nodo}-sco" type="webcontent" adlcp:scormType="sco" href="index.html">
      <file href="index.html"/>
    </resource>
  </resources>
</manifest>
`;

// Zip mínimo (deflate, sin dependencias). Los nombres son ASCII y los tamaños caben en 32 bits.
function zip(archivos) {
  const locales = [], centrales = [];
  let desplazamiento = 0;
  for (const [ruta, datos] of archivos) {
    const nombreZip = Buffer.from(ruta), comprimido = deflateRawSync(datos, { level: 9 }), crc = crc32(datos);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(8, 8);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(comprimido.length, 18); local.writeUInt32LE(datos.length, 22);
    local.writeUInt16LE(nombreZip.length, 26);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(8, 10);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(comprimido.length, 20); central.writeUInt32LE(datos.length, 24);
    central.writeUInt16LE(nombreZip.length, 28); central.writeUInt32LE(desplazamiento, 42);
    locales.push(local, nombreZip, comprimido);
    centrales.push(central, nombreZip);
    desplazamiento += 30 + nombreZip.length + comprimido.length;
  }
  const directorio = Buffer.concat(centrales), fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0); fin.writeUInt16LE(archivos.length, 8); fin.writeUInt16LE(archivos.length, 10);
  fin.writeUInt32LE(directorio.length, 12); fin.writeUInt32LE(desplazamiento, 16);
  return Buffer.concat([...locales, directorio, fin]);
}

const paquete = join(destino, 'CriterIA-' + codigo + '-scorm.zip');
const bytes = zip([['imsmanifest.xml', Buffer.from(manifiesto)], ['index.html', html]]);
writeFileSync(paquete, bytes, { mode: 0o600 });
console.log(paquete + ' · ' + (bytes.length / 1048576).toFixed(1) + ' MB');
