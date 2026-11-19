const grupos = [
  {nombre:'Fundamentos', nodos:[
    ['F1','Fundamentos e historia de la inteligencia artificial'],
    ['F2','Sistemas que aprenden: una mirada por dentro de la IA'],
    ['F3','Pensamiento computacional']]},
  {nombre:'Comprensión', nodos:[
    ['C1','Interacción crítica con IA generativa'],
    ['C2','IA y transformación de la enseñanza y el aprendizaje'],
    ['C3','IA, territorio y sostenibilidad: la dimensión sociopolítica'],
    ['C4','Gobernanza, datos y marco normativo de la IA']]},
  {nombre:'Aplicación', nodos:[
    ['A1','Diseño curricular de una asignatura con apoyo de IA'],
    ['A2','Diseño de actividades de aprendizaje con IA'],
    ['A3','Evaluación de los aprendizajes en contextos de IA'],
    ['A4','Integridad académica en el aula con el uso de IA']]},
  {nombre:'Investigación', nodos:[
    ['I1','Formulación de la investigación con IA: del problema a las fuentes'],
    ['I2','Método, datos y análisis con IA'],
    ['I3','Escritura, citación y comunicación de la investigación con integridad']]},
  {nombre:'Desarrollo', nodos:[
    ['D1','Fundamentos de programación para construir con IA'],
    ['D2','Construir soluciones sobre modelos de IA existentes']]}
];
const habilitados = new Map([
  ['f2','Sistemas que aprenden'], ['i2','Método, datos y análisis con IA'],
  ['i3','Escritura, citación y comunicación con integridad']
]);
const lista = document.querySelector('#lista-nodos');
const filtros = document.querySelector('#filtros');
const dibujo = document.querySelector('#conexiones');
const fichas = new Map();
const tramos = [
  ['F1','F2'], ['F2','F3'],
  ['C4','C1'], ['C4','C2'], ['C1','C3'], ['C2','C3'], ['C4','C3'], ['C1','C2'],
  ['A1','A2'], ['A2','A3'], ['A3','A4'],
  ['I1','I2'], ['I2','I3'], ['D1','D2'],
  ['F1','C4'], ['F3','A1'], ['C3','I2'], ['A4','D2'], ['I3','D1']
];
function crear(tag,clase,texto) {
  const elemento=document.createElement(tag);
  elemento.className=clase;
  if (texto) elemento.textContent=texto;
  return elemento;
}
for (const grupo of grupos) {
  const bloque=crear('section','grupo');
  bloque.dataset.grupo=grupo.nombre;
  bloque.append(crear('h3','grupo-titulo',grupo.nombre));
  const nodos=crear('ul','constelacion');
  for (const [codigo,nombre] of grupo.nodos) {
    const id=codigo.toLowerCase(), activo=habilitados.has(id);
    const ficha=crear(activo?'a':'div','nodo'+(activo?' disponible':''));
    ficha.dataset.codigo=codigo;
    if (activo) ficha.href='?nodo='+id;
    const insignia=crear('span','codigo',codigo);
    ficha.append(insignia,crear('span','nombre-nodo',nombre),
      crear('span','solo-lectura',activo?'Abrir curso':'En construcción'));
    fichas.set(codigo,insignia);
    const item=crear('li',''); item.append(ficha); nodos.append(item);
    if (activo) {
      ficha.addEventListener('pointerenter',()=>iluminar(codigo));
      ficha.addEventListener('pointerleave',()=>iluminar(document.activeElement?.dataset.codigo));
      ficha.addEventListener('focus',()=>iluminar(codigo));
      ficha.addEventListener('blur',()=>iluminar(null));
    }
  }
  bloque.append(nodos); lista.append(bloque);
}

const ns='http://www.w3.org/2000/svg';
const rutasAnimadas=new Set(['F1-F2','I2-I3']);
const caminos=tramos.map(([desde,hasta])=>{
  const linea=document.createElementNS(ns,'path');
  const puente=desde[0]!==hasta[0];
  linea.setAttribute('class',puente?'puente':'tramo');
  dibujo.append(linea);
  let pulso;
  if (rutasAnimadas.has(desde+'-'+hasta)) {
    pulso=document.createElementNS(ns,'path');
    pulso.setAttribute('class','pulso');
    pulso.setAttribute('pathLength','100');
    dibujo.append(pulso);
  }
  return {desde,hasta,linea,puente,pulso};
});
function iluminar(codigo) {
  for (const {desde,hasta,linea} of caminos)
    linea.classList.toggle('resaltado',desde===codigo || hasta===codigo);
}
function dibujar() {
  const area=lista.getBoundingClientRect();
  if (!area.width || !area.height) return;
  dibujo.setAttribute('viewBox','0 0 '+area.width+' '+area.height);
  const puntos=new Map();
  for (const [id,ficha] of fichas) {
    const r=ficha.getBoundingClientRect();
    if (r.width) puntos.set(id,{x:r.left+r.width/2-area.left, y:r.top+r.height/2-area.top});
  }
  for (const {desde,hasta,linea,puente,pulso} of caminos) {
    const a=puntos.get(desde), b=puntos.get(hasta);
    if (!a || !b) {linea.removeAttribute('d'); pulso?.removeAttribute('d'); continue;}
    const dx=b.x-a.x, dy=b.y-a.y;
    let p1,p2;
    if (Math.abs(dy)<70) {
      const arco=Math.min(Math.abs(dx)*.1,24);
      p1=[a.x+dx*.35,a.y-arco]; p2=[a.x+dx*.65,b.y-arco];
    } else if (Math.abs(dx)<60) {
      const curva=(a.x<area.width/2?-1:1)*Math.min(70,area.width*.1);
      p1=[a.x+curva,a.y+dy*.33]; p2=[b.x+curva,b.y-dy*.25];
    } else if (puente) {
      p1=[a.x,a.y+dy*.55]; p2=[b.x,b.y-dy*.55];
    } else {
      p1=[a.x+dx*.46,a.y]; p2=[b.x-dx*.46,b.y];
    }
    const recorrido=`M ${a.x} ${a.y} C ${p1.join(' ')} ${p2.join(' ')} ${b.x} ${b.y}`;
    linea.setAttribute('d',recorrido);
    pulso?.setAttribute('d',recorrido);
  }
}
new ResizeObserver(dibujar).observe(lista);
document.fonts.ready.then(dibujar);
for (const nombre of ['Todos',...grupos.map(g=>g.nombre)]) {
  const boton=crear('button','filtro',nombre); boton.type='button';
  boton.setAttribute('aria-pressed',String(nombre==='Todos'));
  boton.addEventListener('click',()=>{
    for (const b of filtros.children) b.setAttribute('aria-pressed',String(b===boton));
    for (const grupo of lista.querySelectorAll('.grupo')) grupo.hidden=nombre!=='Todos' && grupo.dataset.grupo!==nombre;
    lista.classList.toggle('filtrado',nombre!=='Todos');
    document.querySelector('#conteo').textContent=lista.querySelectorAll('.grupo:not([hidden]) li').length+' nodos';
    dibujar();
  });
  filtros.append(boton);
}
dibujar();

const pausar=document.querySelector('#pausar');
const reducir=matchMedia('(prefers-reduced-motion: reduce)');
function movimiento(pausa) {
  document.body.classList.toggle('quieto',pausa);
  pausar.setAttribute('aria-pressed',String(pausa));
  pausar.textContent=pausa?'▶':'Ⅱ';
  pausar.setAttribute('aria-label',pausa?'Activar animación':'Pausar animación');
  pausar.title=pausar.getAttribute('aria-label');
}
movimiento(reducir.matches);
reducir.addEventListener('change',e=>movimiento(e.matches));
pausar.addEventListener('click',()=>movimiento(!document.body.classList.contains('quieto')));

