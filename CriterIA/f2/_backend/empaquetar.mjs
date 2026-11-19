// Uso: node empaquetar.mjs <HTML original fuera del sitio> <carpeta privada fuera del sitio>
import { readFileSync, writeFileSync, mkdirSync, existsSync, realpathSync } from 'node:fs';
import { join, relative, resolve, dirname, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

const [origen, destino] = process.argv.slice(2);
if (!origen || !destino) throw Error('Indica la ruta del HTML original y la carpeta privada.');
const backend = dirname(fileURLToPath(import.meta.url));
const sitio = resolve(backend, '../../..');
mkdirSync(destino, { recursive: true });
for (const ruta of [origen, destino]) {
  const desdeSitio = relative(realpathSync(sitio), realpathSync(ruta));
  if (!(isAbsolute(desdeSitio) || desdeSitio === '..' || desdeSitio.startsWith('..' + sep)))
    throw Error('El original y la clave deben estar fuera del sitio público.');
}
const html = readFileSync(origen);
if (!html.includes('function CriteriaAvance(')) throw Error('El archivo debe ser el curso F2.');
const clavePath = join(destino, 'clave-f2.txt');
const paquete = join(backend, '../curso.bin');
if (existsSync(paquete) && !existsSync(clavePath))
  throw Error('Ya existe un curso publicado. Indica la carpeta que contiene su clave-f2.txt original.');
if (!existsSync(clavePath)) writeFileSync(clavePath, randomBytes(32).toString('hex'), {flag:'wx', mode:0o600});
const clave = readFileSync(clavePath, 'utf8').trim();
if (!/^[a-f0-9]{64}$/.test(clave)) throw Error('La clave de F2 tiene un formato incorrecto.');
const llave = Buffer.from(clave, 'hex');
let anterior;
if (existsSync(paquete)) {
  const bytes = readFileSync(paquete);
  try {
    const aes = createDecipheriv('aes-256-gcm', llave, bytes.subarray(0,12));
    aes.setAuthTag(bytes.subarray(-16));
    anterior = Buffer.concat([aes.update(bytes.subarray(12,-16)), aes.final()]);
  } catch {
    throw Error('La clave no abre el paquete actual. Verifica la clave y el archivo curso.bin de la versión publicada.');
  }
}
const codigo = readFileSync(join(backend, 'Codigo.gs'), 'utf8');
const bcrypt = readFileSync(join(backend, 'Bcrypt.gs'), 'utf8');
writeFileSync(join(destino, 'Instalar-F2.txt'), [codigo, "const CLAVE_INICIAL_F2 = '" + clave + "';", bcrypt].join('\n'), {mode:0o600});
if (!anterior?.equals(html)) {
  const iv = randomBytes(12);
  const aes = createCipheriv('aes-256-gcm', llave, iv);
  const cifrado = Buffer.concat([iv, aes.update(html), aes.final(), aes.getAuthTag()]);
  writeFileSync(paquete, cifrado);
}
