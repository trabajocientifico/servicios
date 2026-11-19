# Administración de CriterIA

La portada `/CriterIA/` contiene el mapa, el registro y el ingreso común. Los enlaces de F2, I2 e I3 llevan al nodo elegido. Apps Script valida la cuenta, devuelve el avance del nodo y entrega la clave para abrir su paquete `curso.bin`. Cada curso comunica las fechas, los recursos y el punto de reanudación mediante SCORM 2004.

## Consultar el seguimiento

En la cuenta propietaria, abre **CriterIA F2 · Seguimiento** y selecciona **Avance**. Cada fila corresponde a un correo. Las columnas siguientes muestran el registro, el último ingreso, la última actividad, los recursos finalizados y en curso, el porcentaje y el último punto visitado. Hacia la derecha están las fechas de inicio y fin de los 20 recursos disponibles. La columna BA, **Nombre completo**, recoge el nombre declarado en los nuevos registros.

Mantén la hoja y el proyecto de Apps Script con acceso restringido. El registro se abre desde la página del curso. La hoja conserva verificadores bcrypt y huellas de sesión. Las sesiones duran 12 horas y el cierre de sesión conectado las revoca. El avance anónimo que existiera antes del registro sigue perteneciendo al navegador en que se generó.

Las pestañas **Avance I2** y **Avance I3** se crean al primer ingreso a cada nodo. Relacionan el correo y el nombre de la cuenta con los recursos del nodo. Una misma persona puede tener porcentajes y ubicaciones distintos en cada pestaña.

## Actualizar el material

En el equipo donde se instaló F2, edita el archivo privado `%LOCALAPPDATA%\CriterIA\F2\Sistemas-que-aprenden.html`. En esa carpeta se guarda también `clave-f2.txt`, compartida por los tres nodos. Conserva una copia privada de la clave y de los originales. Los archivos editables de Investigación son `%LOCALAPPDATA%\CriterIA\I2\curso.html` y `%LOCALAPPDATA%\CriterIA\I3\curso.html`.

Desde la raíz del repositorio, abre PowerShell y ejecuta estos comandos con Node.js y Git instalados.

```powershell
$privadoF2 = Join-Path $env:LOCALAPPDATA 'CriterIA\F2'
node .\CriterIA\f2\_backend\empaquetar.mjs (Join-Path $privadoF2 'Sistemas-que-aprenden.html') $privadoF2
if ($LASTEXITCODE -ne 0) { throw 'Corrige el error del empaquetado antes de publicar.' }
git add -- CriterIA/f2/curso.bin
git commit -m "Actualiza el material de F2" -- CriterIA/f2/curso.bin
git push origin main
```

El empaquetador comprueba que la clave abre el paquete actual. GitHub Pages publica el nuevo material en el mismo enlace. Las cuentas y los avances siguen en la hoja de Google. Para cambios de texto, imágenes o diseño, conserva el seguimiento SCORM y los identificadores de las actividades (`r01` a `r20`). Si agregas, retiras o reasignas actividades, adapta también el catálogo, las columnas y el cálculo del porcentaje antes de publicar. Conserva la correspondencia de cada identificador histórico con su actividad.

Para actualizar uno de los nodos de Investigación, indica su código al empaquetar y publica el `curso.bin` de esa carpeta. Por ejemplo, para I2:

```powershell
$privado = Join-Path $env:LOCALAPPDATA 'CriterIA'
node .\CriterIA\f2\_backend\empaquetar.mjs (Join-Path $privado 'I2/curso.html') (Join-Path $privado 'F2') i2
```

El mapa público usa los títulos y grupos de `CriterIA/mapa.js`. Los recursos que cuentan para el avance de Investigación están en `NODOS_INVESTIGACION` de `Codigo.gs`. Antes de cambiar ese catálogo, conserva el orden de las columnas históricas y amplía la hoja existente para los recursos añadidos.

## Instalar el backend

El empaquetador también prepara `Instalar-F2.txt` en la carpeta privada. Contiene el servidor, bcryptjs 3.0.3 y la clave del material. Guarda ese archivo solo en ubicaciones privadas.

1. En un proyecto independiente de Google Apps Script, pega el contenido de ese archivo en el editor y guarda.
2. Ejecuta `configurarF2` y autoriza el acceso a Hojas de cálculo. El registro de ejecución muestra el enlace de la hoja. Volver a ejecutar esta función reutiliza la misma hoja del proyecto.
3. Implementa una aplicación web que se ejecute como la persona propietaria y permita acceso a **Cualquier usuario**. Copia la URL terminada en `/exec` en la etiqueta `meta` de nombre `f2-backend` de la página de entrada.
4. Para actualizar un backend existente, edita su implementación y elige una versión nueva para conservar la URL y las cuentas.

El despliegue usa las cuotas de una cuenta gratuita de Google. [Cuotas de Apps Script](https://developers.google.com/apps-script/guides/services/quotas)
