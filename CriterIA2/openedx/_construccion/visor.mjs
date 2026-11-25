// Convierte el HTML privado del nodo en un «visor» que abre UN recurso por dirección:
//   visor-f2.html?recurso=r04   (F2 acepta también visor-f2.html#r04)
// Sin ?recurso= funciona como el curso completo. Se quitan los medios que en Open edX van como archivos
// propios (PDF, bienvenida animada, tutoriales con voz).
import { bloqueBase64 } from './extraer.mjs';

const ESTILO = (extra = '') => `
<style id="ox-embebido-estilo">
html.ox-embebido #home,html.ox-embebido #map,html.ox-embebido #cinema-home,html.ox-embebido #cinema-back,html.ox-embebido .credit,
html.ox-embebido .resource-location,html.ox-embebido .bv-portada,html.ox-embebido .bv-card${extra}{display:none!important}
html.ox-embebido.ox-una-escena #previous,html.ox-embebido.ox-una-escena #next{display:none!important}
.ox-aviso{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:9999;max-width:min(560px,92vw);padding:14px 22px;border-radius:999px;
 background:#02475B;color:#FFFCEA;font:600 16px/1.4 'Ancizar Sans',system-ui,sans-serif;box-shadow:0 10px 30px #00222D40;text-align:center}
</style>`;
const AVISO = `let aviso=null;
 function avisar(){if(aviso)return;aviso=document.createElement('div');aviso.className='ox-aviso';aviso.setAttribute('role','status');
  aviso.textContent='Recurso terminado. Continúa con la siguiente unidad del nodo.';document.body.append(aviso);setTimeout(()=>{aviso.remove();aviso=null},4500)}`;
const ABRIR = `const abrir=()=>{try{openResource(id)}catch(e){console.error('[ox-embebido]',e)}};
 if(document.readyState==='complete')setTimeout(abrir,60);else addEventListener('load',()=>setTimeout(abrir,60));`;

// F2: los recursos son escenas del curso o películas en un iframe propio.
const PARCHE_F2 = `
<!-- ox-embebido: un recurso por unidad de Open edX -->${ESTILO(',html.ox-embebido #f2-indice-abrir')}
<script id="ox-embebido">
(()=>{
 const m=(location.hash||'').match(/^#(r\\d\\d)\\b/)||(location.search||'').match(/[?&]recurso=(r\\d\\d)/);
 if(!m)return;
 const id=m[1],r=RESOURCES.find(x=>x.id===id);if(!r)return;
 const raiz=document.documentElement;raiz.classList.add('ox-embebido');
 if(r.scene>=0&&r.scene===r.end)raiz.classList.add('ox-una-escena');
 ${AVISO}
 const irOriginal=go;
 go=function(i){if(r.scene<0||i<r.scene||i>r.end){avisar();return}return irOriginal(i)};
 const cerrarOriginal=closeCinema;
 closeCinema=function(volver=true){if(volver){avisar();return}return cerrarOriginal(false)};
 const abrirOriginal=openResource;let abierto=false;
 openResource=function(otro){if(abierto&&otro!==id){avisar();return}abierto=true;return abrirOriginal(otro)};
 addEventListener('hashchange',()=>location.reload());
 ${ABRIR}
})();
</script>
`;

// I2 e I3: los recursos viven en un iframe compartido (#cinema). «Volver» y «Portada» quedan anulados.
const PARCHE_INV = `
<!-- ox-embebido: un recurso por unidad de Open edX -->${ESTILO(',html.ox-embebido #indice-abrir,html.ox-embebido [id$="-indice-abrir"]')}
<script id="ox-embebido">
(()=>{
 const m=(location.search||'').match(/[?&]recurso=(r\\d\\d)/);
 if(!m)return;
 const id=m[1];if(!RESOURCES.find(x=>x.id===id))return;
 document.documentElement.classList.add('ox-embebido');
 ${AVISO}
 const abrirOriginal=openResource;let abierto=false;
 openResource=function(otro){if(abierto&&otro!==id){avisar();return}abierto=true;return abrirOriginal(otro)};
 const previoOriginal=previous;previous=function(){if(abierto){avisar();return}return previoOriginal()};
 const portadaOriginal=home;home=function(){if(abierto){avisar();return}return portadaOriginal()};
 ${ABRIR}
})();
</script>
`;

export function construirVisor(html, nodo) {
  let salida = html;
  const quitar = new Set(nodo.quitar);
  for (const m of html.matchAll(/<script type="application\/octet-stream" id="(tutorial-r\d\d)">/g)) quitar.add(m[1]);
  for (const id of quitar) {
    const b = bloqueBase64(salida, id);
    if (!b) continue;
    salida = salida.slice(0, b.ini) + `<script type="application/octet-stream" id="${id}"></script>` + salida.slice(b.fin);
  }
  const fin = salida.lastIndexOf('</body>');
  return salida.slice(0, fin) + (nodo.clave === 'f2' ? PARCHE_F2 : PARCHE_INV) + salida.slice(fin);
}
