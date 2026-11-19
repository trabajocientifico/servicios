# Administración de Fundamentos F2

La página pública presenta el registro y la entrada. Apps Script valida la cuenta, devuelve el avance individual y entrega la clave que abre `curso.bin`. El paquete contiene el HTML original completo. El curso usa su interfaz SCORM 2004 para informar las fechas, los recursos y el punto de reanudación.

## Consultar el seguimiento

En la cuenta propietaria, abre **CriterIA F2 · Seguimiento** y selecciona **Avance**. Cada fila corresponde a un correo. Las columnas siguientes muestran el registro, el último ingreso, la última actividad, los recursos finalizados y en curso, el porcentaje y el último punto visitado. Hacia la derecha están las fechas de inicio y fin de los 20 recursos disponibles. La columna BA, **Nombre completo**, recoge el nombre declarado en los nuevos registros.

Mantén la hoja y el proyecto de Apps Script con acceso restringido. El registro se abre desde la página del curso. La hoja conserva verificadores bcrypt y huellas de sesión. Las sesiones duran 12 horas y el cierre de sesión conectado las revoca. El avance anónimo que existiera antes del registro sigue perteneciendo al navegador en que se generó.

## Actualizar el material

En el equipo donde se instaló F2, edita el archivo privado `%LOCALAPPDATA%\CriterIA\F2\Sistemas-que-aprenden.html`. En esa carpeta se guarda también `clave-f2.txt`. Conserva una copia privada de ambos archivos. El `index.html` público contiene el formulario de acceso.

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

## Instalar el backend

El empaquetador también prepara `Instalar-F2.txt` en la carpeta privada. Contiene el servidor, bcryptjs 3.0.3 y la clave del material. Guarda ese archivo solo en ubicaciones privadas.

1. En un proyecto independiente de Google Apps Script, pega el contenido de ese archivo en el editor y guarda.
2. Ejecuta `configurarF2` y autoriza el acceso a Hojas de cálculo. El registro de ejecución muestra el enlace de la hoja. Volver a ejecutar esta función reutiliza la misma hoja del proyecto.
3. Implementa una aplicación web que se ejecute como la persona propietaria y permita acceso a **Cualquier usuario**. Copia la URL terminada en `/exec` en la etiqueta `meta` de nombre `f2-backend` de la página de entrada.
4. Para actualizar un backend existente, edita su implementación y elige una versión nueva para conservar la URL y las cuentas.

El despliegue usa las cuotas de una cuenta gratuita de Google. [Cuotas de Apps Script](https://developers.google.com/apps-script/guides/services/quotas)
