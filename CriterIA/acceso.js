'use strict';
(() => {
  const $ = id => document.getElementById(id);
  const endpoint = document.querySelector('meta[name="f2-backend"]').content;
  const sessionKey = 'criteria-f2:sesion';
  const nodo = new URLSearchParams(location.search).get('nodo')?.toLowerCase();
  const seleccionado = habilitados.has(nodo) ? nodo : null;
  let cuenta = null, consultaMapa = 0;
  const tabKey = crypto.randomUUID();
  const mensajes = {
    CREDENCIALES:'Revisa el correo y la contraseña.',
    REGISTRO:'No se pudo crear la cuenta con ese correo. Si ya te registraste, inicia sesión.',
    NOMBRE:'Escribe tu nombre completo (hasta 150 caracteres).',
    INTENTOS:'Hubo varios intentos seguidos. Vuelve a intentarlo en 15 minutos.',
    CLAVE:'Usa una contraseña de al menos 10 caracteres.',
    SESION:'Tu sesión terminó. Vuelve a ingresar para continuar.',
    DATOS:'Revisa los datos e inténtalo de nuevo.',
    OCUPADO:'El servicio está ocupado. Inténtalo de nuevo en unos segundos.',
    SERVICIO:'No se pudo conectar con el curso. Revisa tu conexión y vuelve a intentarlo.',
    MATERIAL:'No se pudo abrir el material. Inténtalo de nuevo.'
  };
  let registro = false, actual = null, temporizador, caducidad;
  function error(codigo) { return Object.assign(new Error(mensajes[codigo]), {codigo}); }
  async function llamar(accion, datos, keepalive=false) {
    let salida;
    try {
      const res = await fetch(endpoint, {method:'POST', credentials:'omit', cache:'no-store', keepalive, signal:AbortSignal.timeout(35000),
        headers:{'Content-Type':'text/plain;charset=UTF-8'}, body:JSON.stringify({accion, ...datos})});
      if (!res.ok) throw Error();
      salida = await res.json();
    } catch (_) { throw error('SERVICIO'); }
    if (!salida.ok) throw error(Object.hasOwn(mensajes, salida.error) ? salida.error : 'SERVICIO');
    return salida;
  }
  function ocupado(valor) {
    for (const id of ['enviar','alternar','correo','clave']) $(id).disabled = valor;
    $('nombre').disabled = valor || !registro;
    $('cuenta').setAttribute('aria-busy', String(valor));
  }
  function modo(crear) {
    registro = crear;
    $('campo-nombre').hidden = !crear;
    $('nombre').disabled = !crear;
    $('nombre').required = crear;
    $('nombre').setCustomValidity('');
    if (!crear) $('nombre').value = '';
    $('modo').textContent = crear ? 'Crear una cuenta' : 'Iniciar sesión';
    $('enviar').textContent = crear ? 'Registrarme e ingresar' : 'Ingresar al programa';
    $('alternar').textContent = crear ? 'Ya tengo una cuenta' : 'Crear una cuenta';
    $('clave').autocomplete = crear ? 'new-password' : 'current-password';
    $('clave').minLength = crear ? 10 : 1;
    $('clave').value = '';
    $('regla').hidden = !crear;
    $('aviso').textContent = '';
  }
  function abrirFormulario(crear, mensaje='') {
    delete $('acceso').dataset.cargando;
    modo(crear);
    $('contexto').textContent = seleccionado ? 'Para abrir '+seleccionado.toUpperCase()+' · '+habilitados.get(seleccionado) : 'Una cuenta para los nodos del programa.';
    if (!$('acceso').open) $('acceso').showModal();
    $('aviso').textContent = mensaje;
    $(crear ? 'nombre' : 'correo').focus();
  }
  function sesionVisible(activa, nombre='') {
    $('enlace-mapa').textContent=activa?'Ver mi avance':'Explorar los nodos';
    if (!activa) for (const codigo of habilitados.keys()) mostrarAvance(codigo, null);
    document.querySelectorAll('[data-cuenta]').forEach(b=>b.hidden=activa);
    document.querySelector('.cabecera .salida').hidden=!activa;
    for (const etiqueta of document.querySelectorAll('[data-persona]')) {
      etiqueta.textContent = activa ? nombre : '';
      etiqueta.title = etiqueta.textContent;
      etiqueta.hidden = !activa || !nombre;
    }
    for (const boton of document.querySelectorAll('[data-completar]')) boton.hidden = !activa || !!nombre;
  }
  function recordar(s) {
    try {
      if (s) sessionStorage.setItem(sessionKey, JSON.stringify({token:s.token, vence:s.vence}));
      else sessionStorage.removeItem(sessionKey);
    } catch (_) {}
  }
  function cerrar(mensaje='') {
    actual = null; cuenta = null; sesionVisible(false);
    if ($('perfil').open) $('perfil').close();
    clearTimeout(temporizador); clearTimeout(caducidad);
    delete window.API_1484_11;
    $('material')?.remove();
    recordar(null);
    $('aula').hidden = true; $('entrada').hidden = false;
    ocupado(false); abrirFormulario(false,mensaje);
  }
  // Las colas son distintas por cuenta y pestaña. Cada confirmación borra solo su versión.
  function pendientes(s) {
    const lista = new Map();
    try {
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith(s.prefijo)) {
          const raw = localStorage.getItem(key);
          if (raw) lista.set(key, raw);
        }
      }
    } catch (_) {}
    if (s.memoria) lista.set(s.prefijo+tabKey, s.memoria);
    return lista;
  }
  function fusionar(base, parte) {
    for (const [id, b] of Object.entries(parte.avance.r)) {
      const a = base.avance.r[id];
      if (!a) { base.avance.r[id] = b.slice(); continue; }
      const fines = [a[2], b[2]].filter(Boolean);
      base.avance.r[id] = [Math.max(a[0],b[0]), Math.min(a[1],b[1]), fines.length ? Math.min(...fines) : 0];
    }
    if (parte.avance.loc && parte.marca >= base.marca) {
      base.marca = parte.marca; base.avance.loc = parte.avance.loc;
    }
    return base;
  }
  function combinar(lista, base={avance:{v:1,r:{},loc:null}, marca:0}) {
    for (const raw of lista.values()) fusionar(base, JSON.parse(raw));
    return base;
  }
  function pintarMapa(res) {
    for (const codigo of habilitados.keys()) {
      const base=res.nodos[codigo], recursos=base.recursos;
      const cola=pendientes({prefijo:'criteria-'+codigo+':pendiente:'+res.id+':'});
      const {avance}=combinar(cola, base);
      mostrarAvance(codigo,{
        total:recursos.length,
        finalizados:recursos.filter(id=>avance.r[id]?.[0]===2).length,
        iniciado:!!avance.loc || recursos.some(id=>avance.r[id])
      });
    }
  }
  async function refrescarMapa() {
    const sesion=cuenta;
    if (!sesion || seleccionado || document.hidden) return;
    const turno=++consultaMapa;
    try {
      const res=await llamar('abrir',{token:sesion.token,vista:'mapa'});
      if (cuenta===sesion && turno===consultaMapa) pintarMapa(res);
    } catch (e) {
      if (cuenta===sesion && e.codigo==='SESION') cerrar(e.message);
    }
  }
  function programar(ms=700) {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => sincronizar(actual), ms);
  }
  async function sincronizar(s, alSalir=false) {
    if (!s || actual !== s) return;
    if (s.enviando && !alSalir) return s.enviando;
    const lista = pendientes(s);
    if (!lista.size) return;
    const estado = combinar(lista);
    const tarea = (async () => {
      try {
        await llamar(nodo==='f2'?'guardar':'guardarNodo', {token:s.token,nodo,...estado}, alSalir);
        for (const [key,raw] of lista) {
          try { if (localStorage.getItem(key) === raw) localStorage.removeItem(key); } catch (_) {}
          if (key === s.prefijo+tabKey && s.memoria === raw) s.memoria = null;
        }
        if (actual === s) {
          s.reintento = 1500;
          $('guardado').textContent = pendientes(s).size ? 'Guardando avance…' : 'Avance guardado';
          if (pendientes(s).size && !alSalir) programar(100);
        }
      } catch (e) {
        if (actual !== s) return;
        if (e.codigo === 'SESION') { cerrar(e.message); return; }
        $('guardado').textContent = 'Avance pendiente. Se reintentará al conectar.';
        if (!alSalir) { programar(s.reintento); s.reintento = Math.min(s.reintento*2, 30000); }
      }
    })();
    s.enviando = tarea;
    try { await tarea; } finally { if (s.enviando === tarea) s.enviando = null; }
  }
  function conectarCurso(s, base) {
    const iniciado = base.avance.loc || Object.keys(base.avance.r).length;
    const campos = {'cmi.suspend_data':JSON.stringify(base.avance), 'cmi.entry':iniciado?'resume':'ab-initio'};
    // El curso original ya implementa SCORM 2004 y restaura sus recursos desde suspend_data.
    window.API_1484_11 = {
      Initialize:() => 'true', GetValue:k => campos[k] || '',
      SetValue(k,v) {
        if (actual !== s) return 'false';
        if (k === 'cmi.suspend_data' && v !== campos[k]) {
          const avance = JSON.parse(v);
          if (JSON.stringify(avance.loc) !== JSON.stringify(JSON.parse(campos[k]).loc))
            s.marca = Date.now();
          s.memoria = JSON.stringify({avance,marca:s.marca});
          try { localStorage.setItem(s.prefijo+tabKey, s.memoria); } catch (_) {}
          $('guardado').textContent = 'Guardando avance…';
          programar();
        }
        campos[k] = v; return 'true';
      },
      Commit() { if (s.memoria) programar(100); return 'true'; }, Terminate:() => 'true'
    };
  }
  async function abrir(res, desdeFormulario=false) {
    if (!seleccionado && !res.nodos) throw error('SERVICIO');
    cuenta = {token:res.token, vence:res.vence};
    recordar(cuenta);
    clearTimeout(caducidad);
    caducidad = setTimeout(()=>cerrar(mensajes.SESION), Math.max(0,cuenta.vence-Date.now()));
    sesionVisible(true,res.nombre);
    if (!seleccionado) {
      pintarMapa(res);
      if ($('acceso').open) $('acceso').close();
      $('clave').value='';
      if (desdeFormulario) irAlMapa();
      return;
    }
    if (nodo !== 'f2' && res.nodo !== nodo) {
      const datos = await llamar('abrirNodo',{token:cuenta.token,nodo});
      if (datos.nodo !== nodo) throw error('SERVICIO');
      res = {...res,...datos};
    }
    const s = {...cuenta, prefijo:'criteria-'+nodo+':pendiente:'+res.id+':', reintento:1500};
    let html;
    try {
      const respuesta = await fetch(nodo+'/curso.bin',{cache:'no-cache'});
      if (!respuesta.ok) throw Error();
      const bytes = new Uint8Array(await respuesta.arrayBuffer());
      const llave = await crypto.subtle.importKey('raw', Uint8Array.from(res.claveCurso.match(/../g), h=>parseInt(h,16)),
        'AES-GCM', false, ['decrypt']);
      html = new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.slice(0,12)},llave,bytes.slice(12)));
    } catch (_) { throw error('MATERIAL'); }
    if (s.vence <= Date.now()) throw error('SESION');
    actual = s;
    if ($('acceso').open) $('acceso').close();
    const base = combinar(pendientes(s), {avance:res.avance, marca:res.marca});
    s.marca = base.marca;
    conectarCurso(s, base);
    const iframe = document.createElement('iframe');
    iframe.id = 'material'; iframe.title = habilitados.get(nodo)+' · '+nodo.toUpperCase(); iframe.allow = 'fullscreen';
    $('aula').append(iframe); iframe.srcdoc = html;
    $('clave').value = ''; $('entrada').hidden = true; $('aula').hidden = false;
    $('guardado').textContent = pendientes(s).size ? 'Guardando avance…' : 'Sesión iniciada';
    $('salir').disabled = false;
    document.title=iframe.title+' · CriterIA';
    programar(100);
  }
  for (const boton of document.querySelectorAll('[data-cuenta]'))
    boton.addEventListener('click',()=>abrirFormulario(boton.dataset.cuenta==='registro'));
  for (const boton of document.querySelectorAll('[data-completar]')) boton.addEventListener('click',()=>{
    $('estado-perfil').textContent = '';
    $('nombre-perfil').value = '';
    $('perfil').showModal();
    $('nombre-perfil').focus();
  });
  $('perfil').querySelector('.cerrar').addEventListener('click',()=>$('perfil').close());
  $('form-perfil').addEventListener('submit', async e=>{
    e.preventDefault();
    const sesion = cuenta, guardar = e.submitter;
    if (!sesion || guardar.disabled) return;
    guardar.disabled = true;
    $('estado-perfil').textContent='Guardando…';
    try {
      const res = await llamar('completarNombre',{token:sesion.token, nombre:$('nombre-perfil').value});
      if (sesion !== cuenta) return;
      sesionVisible(true,res.nombre);
      $('perfil').close();
    } catch (err) {
      if (err.codigo === 'SESION') cerrar(err.message);
      else $('estado-perfil').textContent=err.message;
    } finally { guardar.disabled=false; }
  });
  const cancelarFormulario = () => {
    if ($('cuenta').getAttribute('aria-busy') === 'true') return;
    if (seleccionado) location.replace('./#nodos');
    else $('acceso').close();
  };
  $('acceso').querySelector('.cerrar').addEventListener('click',cancelarFormulario);
  $('acceso').addEventListener('cancel',e=>{e.preventDefault();cancelarFormulario()});
  $('acceso').addEventListener('click',e=>{
    if (e.target !== $('acceso')) return;
    const rect = e.target.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
      cancelarFormulario();
  });
  $('alternar').addEventListener('click', () => { modo(!registro); $(registro ? 'nombre' : 'correo').focus(); });
  $('nombre').addEventListener('input', () => $('nombre').setCustomValidity(''));
  $('cuenta').addEventListener('submit', async e => {
    e.preventDefault();
    const datos = {correo:$('correo').value.trim(), clave:$('clave').value};
    if (!seleccionado) datos.vista='mapa';
    if (registro) {
      datos.nombre = $('nombre').value.trim();
      if (!/\p{L}/u.test(datos.nombre)) {
        $('nombre').setCustomValidity(mensajes.NOMBRE);
        $('nombre').reportValidity();
        return;
      }
    }
    ocupado(true); $('aviso').textContent = seleccionado?'Abriendo tu curso…':'Recuperando tu mapa…';
    try { await abrir(await llamar(registro?'registro':'ingreso', datos), true); }
    catch (e) { $('aviso').textContent = e.message; }
    finally { ocupado(false); }
  });
  for (const boton of document.querySelectorAll('.salida')) boton.addEventListener('click', async () => {
    const s = actual || cuenta;
    if (!s) return;
    $('salir').disabled = true;
    boton.disabled = true;
    if (actual) {
      $('material').inert = true;
      await sincronizar(actual,true);
      if (actual !== s) return;
    }
    try { await llamar('salir', {token:s.token}); }
    catch (_) { /* La credencial local se descarta también sin conexión. */ }
    recordar(null); cuenta=null; actual=null; location.replace('./');
  });
  $('volver').addEventListener('click',async e=>{
    if(e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || !actual) return;
    e.preventDefault();
    const destino=e.currentTarget.href;
    await sincronizar(actual,true);
    location.assign(destino);
  });
  window.addEventListener('online', () => { if (actual) programar(0); else refrescarMapa(); });
  window.addEventListener('pagehide', () => sincronizar(actual, true));
  document.addEventListener('visibilitychange', () => { if (document.hidden) sincronizar(actual,true); else refrescarMapa(); });
  window.addEventListener('pageshow', e => { if (e.persisted) location.reload(); });
  async function iniciar() {
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)) {
      ocupado(true); $('aviso').textContent = 'El acceso al curso está pendiente de activación.'; return;
    }
    let anterior;
    try { anterior = JSON.parse(sessionStorage.getItem(sessionKey)); } catch (_) {}
    if (!anterior) {
      if (seleccionado) abrirFormulario(false);
      return;
    }
    if (!(anterior.vence > Date.now())) { cerrar(mensajes.SESION); return; }
    if (seleccionado) {
      $('acceso').dataset.cargando='true';
      $('modo').textContent='Abriendo '+nodo.toUpperCase();
      $('acceso').showModal();
    }
    ocupado(true); $('aviso').textContent = 'Recuperando tu avance…';
    try {
      const otroNodo = seleccionado && nodo !== 'f2';
      const respuesta = otroNodo ? await llamar('abrirNodo',{token:anterior.token,nodo})
        : await llamar('abrir',seleccionado?{token:anterior.token}:{token:anterior.token,vista:'mapa'});
      if (otroNodo && respuesta.nodo !== nodo) throw error('SERVICIO');
      await abrir({...anterior,...respuesta});
    }
    catch (e) { if (e.codigo === 'SESION') { recordar(null); sesionVisible(false); } abrirFormulario(false,e.message); }
    finally { ocupado(false); }
  }
  iniciar();
})();
