# Investigación · Nodo I3 · Carga en Open edX

Esta carpeta organiza el nodo **Escritura, citación y comunicación con integridad** con la estructura de Open edX:
**Sección → Subsección → Unidad**. Ábrela en el navegador con `index.html` para ver la simulación.

> El material va **sin cifrar**. Comparte esta carpeta solo con el equipo del curso y no la subas a GitHub.

## 1. Subir los archivos

En Studio, **Contenido → Archivos** (*Files & Uploads*), sube todo lo que hay en `archivos/`:

| Archivo | Uso | Tamaño |
| --- | --- | --- |
| `visor-i3.html` | Recursos interactivos y películas. Cada unidad abre uno con `?recurso=rXX`. | 4,8 MB |
| `bienvenida-i3.html` | Animación de bienvenida (unidad B1.2). | 4,9 MB |
| `tutorial-i3-r11.html` | Tutorial con voz: Actividad práctica · La IA como escritora. | 4,5 MB |
| `tutorial-i3-r14.html` | Tutorial con voz: Actividad práctica · La IA como asistente de escritura. | 4,8 MB |
| `tutorial-i3-r17.html` | Tutorial con voz: Actividad práctica · La IA como estructuradora. | 4,8 MB |
| `tutorial-i3-r19.html` | Tutorial con voz: Actividad práctica · Traducción con IA. | 4,1 MB |
| `tutorial-i3-r20.html` | Tutorial con voz: Actividad práctica · Verificación de 20 referencias con IA. | 6,0 MB |
| `tutorial-i3-r21.html` | Tutorial con voz: Actividad práctica · De referencias APA a Zotero y Mendeley. | 5,4 MB |

Si Studio rechaza algún archivo por tamaño (`visor-i3.html` pesa 4,8 MB), el administrador debe ampliar el tamaño máximo de archivo del curso.

## 2. Crear la estructura y pegar las unidades

Para cada fila de la tabla: crea la sección, la subsección y la unidad con ese nombre. En la unidad agrega
**Componente → Texto (HTML)**, abre el **editor HTML** (no el visual) y pega el contenido completo del archivo indicado.
Las rutas `/static/…` apuntan a los archivos del paso 1; Studio las convierte solas.

En las subsecciones **Evaluación** usa el tipo de tarea *Evaluar* si el equipo decide calificarlas. Las actividades interactivas
no envían nota a la plataforma: para que cuenten, hay que cargarlas como paquete SCORM o reemplazarlas por problemas de Studio.

| Sección | Subsección | Unidad | Archivo |
| --- | --- | --- | --- |
| Bienvenida | Bienvenida a Escritura, citación y comunicación con integridad | B1.1 · ¿Cómo recorrer este nodo? | `unidades/01-B/B1.1.html` |
| Bienvenida | Bienvenida a Escritura, citación y comunicación con integridad | B1.2 · Comencemos | `unidades/01-B/B1.2.html` |
| Bienvenida | Bienvenida a Escritura, citación y comunicación con integridad | B1.3 · Introducción al nodo | `unidades/01-B/B1.3.html` |
| Conocimientos previos | Mi punto de partida | CP1.1 · Pregunta orientadora | `unidades/02-CP/CP1.1.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Encuentro con el saber | T1.E1 · Presentación del Tema 1 | `unidades/03-S1/T1.E1.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Encuentro con el saber | T1.E2 · 1.1 · Autoría y responsabilidad: por qué la IA no puede ser autora | `unidades/03-S1/T1.E2.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Encuentro con el saber | T1.E3 · 1.2 · Qué permiten y qué no las editoriales: texto, imágenes, datos y revisión por pares | `unidades/03-S1/T1.E3.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Encuentro con el saber | T1.E4 · 1.3 · Del destino a la decisión: elegir el uso pertinente y cuidar la información | `unidades/03-S1/T1.E4.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R1 · ¿Quién responde por este párrafo? | `unidades/03-S1/T1.R1.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R2 · ¿Qué puede apoyar la IA y qué solo quien firma? | `unidades/03-S1/T1.R2.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R3 · Lo que admiten las editoriales | `unidades/03-S1/T1.R3.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R4 · Admitido, condicionado o no permitido | `unidades/03-S1/T1.R4.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R5 · El semáforo de usos | `unidades/03-S1/T1.R5.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Reflexión con el saber | T1.R6 · Ficha de producto | `unidades/03-S1/T1.R6.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V1 · ¿Quién responde? | `unidades/03-S1/T1.V1.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V2 · Revisión, imágenes y destino | `unidades/03-S1/T1.V2.html` |
| S1 · Autoría, responsabilidad y uso de la IA en la escritura | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V3 · ¿Se puede subir? | `unidades/03-S1/T1.V3.html` |
| S2 · Escribir con asistencia de herramientas de IA | Encuentro con el saber | T2.E1 · Presentación del Tema 2 | `unidades/04-S2/T2.E1.html` |
| S2 · Escribir con asistencia de herramientas de IA | Encuentro con el saber | T2.E2 · 2.1 · La IA como escritora: delegación total al agente | `unidades/04-S2/T2.E2.html` |
| S2 · Escribir con asistencia de herramientas de IA | Encuentro con el saber | T2.E3 · 2.2 · La IA como copiloto: escritura acompañada por un asistente académico | `unidades/04-S2/T2.E3.html` |
| S2 · Escribir con asistencia de herramientas de IA | Encuentro con el saber | T2.E4 · 2.3 · La IA como editora: estructurar y componer el documento | `unidades/04-S2/T2.E4.html` |
| S2 · Escribir con asistencia de herramientas de IA | Encuentro con el saber | T2.E5 · 2.4 · Contraste de la propuesta con los resultados y las fuentes | `unidades/04-S2/T2.E5.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R1 · El taller · La IA como escritora | `unidades/04-S2/T2.R1.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R2 · Actividad práctica · La IA como escritora | `unidades/04-S2/T2.R2.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R3 · El taller · La IA como copiloto | `unidades/04-S2/T2.R3.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R4 · Actividad práctica · La IA como asistente de escritura | `unidades/04-S2/T2.R4.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R5 · El taller · La IA como editora | `unidades/04-S2/T2.R5.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R6 · Actividad práctica · La IA como estructuradora | `unidades/04-S2/T2.R6.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R7 · Actividad práctica · Traducción con IA | `unidades/04-S2/T2.R7.html` |
| S2 · Escribir con asistencia de herramientas de IA | Reflexión con el saber | T2.R8 · 2.4 · Recursos para aprender | `unidades/04-S2/T2.R8.html` *(pendiente)* |
| S2 · Escribir con asistencia de herramientas de IA | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V1 · Revisa el borrador del agente | `unidades/04-S2/T2.V1.html` |
| S2 · Escribir con asistencia de herramientas de IA | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V2 · ¿Acepto esta sugerencia? | `unidades/04-S2/T2.V2.html` |
| S2 · Escribir con asistencia de herramientas de IA | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V3 · Coteja lo que compuso | `unidades/04-S2/T2.V3.html` |
| S2 · Escribir con asistencia de herramientas de IA | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V4 · 2.4 · Evaluar | `unidades/04-S2/T2.V4.html` *(pendiente)* |
| S3 · Fuentes, transparencia y trazabilidad | Encuentro con el saber | T3.E1 · Presentación del Tema 3 | `unidades/05-S3/T3.E1.html` |
| S3 · Fuentes, transparencia y trazabilidad | Encuentro con el saber | T3.E2 · 3.1 · Verificación de referencias (existencia y exactitud), citación y gestor bibliográfico | `unidades/05-S3/T3.E2.html` |
| S3 · Fuentes, transparencia y trazabilidad | Encuentro con el saber | T3.E3 · 3.2 · Declaración del aporte de IA y de la intervención humana | `unidades/05-S3/T3.E3.html` |
| S3 · Fuentes, transparencia y trazabilidad | Encuentro con el saber | T3.E4 · 3.3 · Registro de versiones y decisiones que permita revisar el proceso | `unidades/05-S3/T3.E4.html` |
| S3 · Fuentes, transparencia y trazabilidad | Reflexión con el saber | T3.R1 · Actividad práctica · Verificación de 20 referencias con IA | `unidades/05-S3/T3.R1.html` |
| S3 · Fuentes, transparencia y trazabilidad | Reflexión con el saber | T3.R2 · Actividad práctica · De referencias APA a Zotero y Mendeley | `unidades/05-S3/T3.R2.html` |
| S3 · Fuentes, transparencia y trazabilidad | Reflexión con el saber | T3.R3 · 3.2 · Recursos para aprender | `unidades/05-S3/T3.R3.html` *(pendiente)* |
| S3 · Fuentes, transparencia y trazabilidad | Reflexión con el saber | T3.R4 · 3.3 · Recursos para aprender | `unidades/05-S3/T3.R4.html` *(pendiente)* |
| S3 · Fuentes, transparencia y trazabilidad | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V1 · 3.1 · Evaluar | `unidades/05-S3/T3.V1.html` *(pendiente)* |
| S3 · Fuentes, transparencia y trazabilidad | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V2 · 3.2 · Evaluar | `unidades/05-S3/T3.V2.html` *(pendiente)* |
| S3 · Fuentes, transparencia y trazabilidad | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V3 · 3.3 · Evaluar | `unidades/05-S3/T3.V3.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Encuentro con el saber | T4.E1 · Presentación del Tema 4 | `unidades/06-S4/T4.E1.html` |
| S4 · Comunicación de la investigación para otras audiencias | Encuentro con el saber | T4.E2 · 4.1 · Audiencia, contexto, lenguaje claro y accesibilidad | `unidades/06-S4/T4.E2.html` |
| S4 · Comunicación de la investigación para otras audiencias | Encuentro con el saber | T4.E3 · 4.2 · Adaptación de resultados conservando respaldo, límites y atribución | `unidades/06-S4/T4.E3.html` |
| S4 · Comunicación de la investigación para otras audiencias | Encuentro con el saber | T4.E4 · 4.3 · Retroalimentación entre pares sobre claridad, accesibilidad e integridad, y ajuste de la pieza | `unidades/06-S4/T4.E4.html` |
| S4 · Comunicación de la investigación para otras audiencias | Reflexión con el saber | T4.R1 · 4.1 · Recursos para aprender | `unidades/06-S4/T4.R1.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Reflexión con el saber | T4.R2 · 4.2 · Recursos para aprender | `unidades/06-S4/T4.R2.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Reflexión con el saber | T4.R3 · 4.3 · Recursos para aprender | `unidades/06-S4/T4.R3.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Evaluación (3 actividades) *(tipo: Evaluar)* | T4.V1 · 4.1 · Evaluar | `unidades/06-S4/T4.V1.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Evaluación (3 actividades) *(tipo: Evaluar)* | T4.V2 · 4.2 · Evaluar | `unidades/06-S4/T4.V2.html` *(pendiente)* |
| S4 · Comunicación de la investigación para otras audiencias | Evaluación (3 actividades) *(tipo: Evaluar)* | T4.V3 · 4.3 · Evaluar | `unidades/06-S4/T4.V3.html` *(pendiente)* |

## 3. Comprobar

Abre cada unidad en la vista previa del LMS: el encabezado, el texto y, en las unidades con recurso, el recurso abierto
directamente (no la portada del curso). Si aparece la portada, la plataforma eliminó el parámetro `?recurso=` de la dirección: avisa al equipo.

Las unidades marcadas *pendiente* reservan el lugar de contenido que aún no existe; pueden crearse vacías o dejarse para después.
