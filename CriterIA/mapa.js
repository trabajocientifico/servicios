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
const crear = (tag,clase,texto) => {
  const e=document.createElement(tag); e.className=clase;
  if(texto) e.textContent=texto;
  return e;
};
for (const grupo of grupos) {
  const bloque=crear('section','grupo');
  bloque.dataset.grupo=grupo.nombre;
  const encabezado=crear('h3','grupo-titulo',grupo.nombre);
  bloque.append(encabezado);
  const filas=crear('ul','nodos');
  for (const [codigo,nombre] of grupo.nodos) {
    const id=codigo.toLowerCase(), abierto=habilitados.has(id);
    const fila=crear('li','');
    const ficha=crear(abierto?'a':'div','nodo'+(abierto?' disponible':''));
    if(abierto) ficha.href='?nodo='+id;
    ficha.append(crear('span','codigo',codigo),crear('span','nombre-nodo',nombre),crear('span','estado',abierto?'Abrir nodo ↗':'En construcción'));
    fila.append(ficha); filas.append(fila);
  }
  bloque.append(filas);lista.append(bloque);
}
for(const nombre of ['Todos',...grupos.map(g=>g.nombre)]) {
  const boton=crear('button','filtro',nombre); boton.type='button';
  boton.setAttribute('aria-pressed', String(nombre==='Todos'));
  boton.addEventListener('click',()=>{
    for(const b of filtros.children) b.setAttribute('aria-pressed',String(b===boton));
    for(const grupo of lista.children) grupo.hidden=nombre!=='Todos' && grupo.dataset.grupo!==nombre;
    const cuenta=lista.querySelectorAll('section:not([hidden]) li').length;
    document.querySelector('#conteo').textContent=cuenta+' nodos';
  });
  filtros.append(boton);
}
const muestra=document.querySelector('#muestra');
const elegir=id=>{
  muestra.dataset.nodo=id;
  for(const b of muestra.querySelectorAll('button[data-id]')) b.setAttribute('aria-pressed',String(b.dataset.id===id));
  const portada=document.querySelector('#arte');
  portada.src='assets/'+id+'.webp';
  document.querySelector('#categoria').textContent=id==='f2'?'Fundamentos':'Investigación';
  const enlace=document.querySelector('#destacado');
  enlace.href='?nodo='+id; enlace.textContent=habilitados.get(id);
  enlace.setAttribute('aria-label','Abrir '+id.toUpperCase()+' · '+habilitados.get(id));
};
for(const b of muestra.querySelectorAll('button[data-id]')) b.addEventListener('click',()=>elegir(b.dataset.id));
const pausar=document.querySelector('#pausar');
function movimiento(pausa){
  document.body.classList.toggle('quieto',pausa);
  pausar.setAttribute('aria-pressed',String(pausa)); pausar.textContent=pausa?'▶':'Ⅱ';
  pausar.setAttribute('aria-label',pausa?'Activar animación':'Pausar animación');
  pausar.title=pausar.getAttribute('aria-label');
}
const reducir=matchMedia('(prefers-reduced-motion: reduce)');
movimiento(reducir.matches);
reducir.addEventListener('change',e=>movimiento(e.matches));
pausar.addEventListener('click',()=>movimiento(!document.body.classList.contains('quieto')));

