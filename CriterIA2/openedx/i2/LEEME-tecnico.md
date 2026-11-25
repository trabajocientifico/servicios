# Investigación · Nodo I2 · Carga en Open edX

Esta carpeta organiza el nodo **Método, datos y análisis con IA** con la estructura de Open edX:
**Sección → Subsección → Unidad**. Ábrela en el navegador con `index.html` para ver la simulación.

> El material va **sin cifrar**. Comparte esta carpeta solo con el equipo del curso y no la subas a GitHub.

## 1. Subir los archivos

En Studio, **Contenido → Archivos** (*Files & Uploads*), sube todo lo que hay en `archivos/`:

| Archivo | Uso | Tamaño |
| --- | --- | --- |
| `visor-i2.html` | Recursos interactivos y películas. Cada unidad abre uno con `?recurso=rXX`. | 0,9 MB |

Si Studio rechaza algún archivo por tamaño (`visor-i2.html` pesa 0,9 MB), el administrador debe ampliar el tamaño máximo de archivo del curso.

## 2. Crear la estructura y pegar las unidades

Para cada fila de la tabla: crea la sección, la subsección y la unidad con ese nombre. En la unidad agrega
**Componente → Texto (HTML)**, abre el **editor HTML** (no el visual) y pega el contenido completo del archivo indicado.
Las rutas `/static/…` apuntan a los archivos del paso 1; Studio las convierte solas.

En las subsecciones **Evaluación** usa el tipo de tarea *Evaluar* si el equipo decide calificarlas. Las actividades interactivas
no envían nota a la plataforma: para que cuenten, hay que cargarlas como paquete SCORM o reemplazarlas por problemas de Studio.

| Sección | Subsección | Unidad | Archivo |
| --- | --- | --- | --- |
| Bienvenida | Bienvenida a Método, datos y análisis con IA | B1.1 · ¿Cómo recorrer este nodo? | `unidades/01-B/B1.1.html` |
| Bienvenida | Bienvenida a Método, datos y análisis con IA | B1.2 · Introducción al nodo | `unidades/01-B/B1.2.html` |
| Conocimientos previos | Mi punto de partida | CP1.1 · Pregunta orientadora | `unidades/02-CP/CP1.1.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Encuentro con el saber | T1.E1 · Presentación del Tema 1 | `unidades/03-S1/T1.E1.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Encuentro con el saber | T1.E2 · 1.1 · De la pregunta al plan de análisis | `unidades/03-S1/T1.E2.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Encuentro con el saber | T1.E3 · 1.2 · Lo que la IA aporta y lo que arriesga en el diseño | `unidades/03-S1/T1.E3.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Encuentro con el saber | T1.E4 · 1.3 · Tareas delegables y protocolo breve | `unidades/03-S1/T1.E4.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Reflexión con el saber | T1.R1 · La cadena de cuatro eslabones | `unidades/03-S1/T1.R1.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Reflexión con el saber | T1.R2 · ¿Tu método responde tu pregunta? | `unidades/03-S1/T1.R2.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Reflexión con el saber | T1.R3 · Comparador de diseños | `unidades/03-S1/T1.R3.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Reflexión con el saber | T1.R4 · 1.2 · Recursos para aprender | `unidades/03-S1/T1.R4.html` *(pendiente)* |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Reflexión con el saber | T1.R5 · 1.3 · Recursos para aprender | `unidades/03-S1/T1.R5.html` *(pendiente)* |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V1 · Encuentra el eslabón roto | `unidades/03-S1/T1.V1.html` |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V2 · 1.2 · Evaluar | `unidades/03-S1/T1.V2.html` *(pendiente)* |
| S1 · La IA en el diseño metodológico: alcances y riesgos | Evaluación (3 actividades) *(tipo: Evaluar)* | T1.V3 · 1.3 · Evaluar | `unidades/03-S1/T1.V3.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Encuentro con el saber | T2.E1 · Presentación del Tema 2 | `unidades/04-S2/T2.E1.html` |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Encuentro con el saber | T2.E2 · 2.1 · Antes de analizar: preparar y cuidar el material | `unidades/04-S2/T2.E2.html` |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Encuentro con el saber | T2.E3 · 2.2 · Flujo verificable: consigna, ejecución y comprobación | `unidades/04-S2/T2.E3.html` |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Encuentro con el saber | T2.E4 · 2.3 · Exploración y análisis cuantitativo | `unidades/04-S2/T2.E4.html` |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Encuentro con el saber | T2.E5 · 2.4 · Transcripción y codificación cualitativa | `unidades/04-S2/T2.E5.html` |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Reflexión con el saber | T2.R1 · 2.1 · Recursos para aprender | `unidades/04-S2/T2.R1.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Reflexión con el saber | T2.R2 · 2.2 · Recursos para aprender | `unidades/04-S2/T2.R2.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Reflexión con el saber | T2.R3 · 2.3 · Recursos para aprender | `unidades/04-S2/T2.R3.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Reflexión con el saber | T2.R4 · 2.4 · Recursos para aprender | `unidades/04-S2/T2.R4.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V1 · 2.1 · Evaluar | `unidades/04-S2/T2.V1.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V2 · 2.2 · Evaluar | `unidades/04-S2/T2.V2.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V3 · 2.3 · Evaluar | `unidades/04-S2/T2.V3.html` *(pendiente)* |
| S2 · Análisis de datos asistido: cuantitativo y cualitativo | Evaluación (4 actividades) *(tipo: Evaluar)* | T2.V4 · 2.4 · Evaluar | `unidades/04-S2/T2.V4.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Encuentro con el saber | T3.E1 · Presentación del Tema 3 | `unidades/05-S3/T3.E1.html` |
| S3 · Hallazgo, error o sesgo: contraste y límites | Encuentro con el saber | T3.E2 · 3.1 · Tres contrastes: fuente, método y disciplina | `unidades/05-S3/T3.E2.html` |
| S3 · Hallazgo, error o sesgo: contraste y límites | Encuentro con el saber | T3.E3 · 3.2 · Límites estadísticos: lo que los números permiten afirmar | `unidades/05-S3/T3.E3.html` |
| S3 · Hallazgo, error o sesgo: contraste y límites | Encuentro con el saber | T3.E4 · 3.3 · Límites epistemológicos: lo que un modelo puede saber | `unidades/05-S3/T3.E4.html` |
| S3 · Hallazgo, error o sesgo: contraste y límites | Reflexión con el saber | T3.R1 · 3.1 · Recursos para aprender | `unidades/05-S3/T3.R1.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Reflexión con el saber | T3.R2 · 3.2 · Recursos para aprender | `unidades/05-S3/T3.R2.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Reflexión con el saber | T3.R3 · 3.3 · Recursos para aprender | `unidades/05-S3/T3.R3.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V1 · 3.1 · Evaluar | `unidades/05-S3/T3.V1.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V2 · 3.2 · Evaluar | `unidades/05-S3/T3.V2.html` *(pendiente)* |
| S3 · Hallazgo, error o sesgo: contraste y límites | Evaluación (3 actividades) *(tipo: Evaluar)* | T3.V3 · 3.3 · Evaluar | `unidades/05-S3/T3.V3.html` *(pendiente)* |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Encuentro con el saber | T4.E1 · Presentación del Tema 4 | `unidades/06-S4/T4.E1.html` |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Encuentro con el saber | T4.E2 · 4.1 · Reproducibilidad y trazabilidad según estándares internacionales | `unidades/06-S4/T4.E2.html` |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Encuentro con el saber | T4.E3 · 4.2 · Documentación del rol de la IA en el método: el expediente | `unidades/06-S4/T4.E3.html` |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Reflexión con el saber | T4.R1 · 4.1 · Recursos para aprender | `unidades/06-S4/T4.R1.html` *(pendiente)* |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Reflexión con el saber | T4.R2 · 4.2 · Recursos para aprender | `unidades/06-S4/T4.R2.html` *(pendiente)* |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Evaluación (2 actividades) *(tipo: Evaluar)* | T4.V1 · 4.1 · Evaluar | `unidades/06-S4/T4.V1.html` *(pendiente)* |
| S4 · Reproducibilidad, trazabilidad y documentación del rol de la IA | Evaluación (2 actividades) *(tipo: Evaluar)* | T4.V2 · 4.2 · Evaluar | `unidades/06-S4/T4.V2.html` *(pendiente)* |

## 3. Comprobar

Abre cada unidad en la vista previa del LMS: el encabezado, el texto y, en las unidades con recurso, el recurso abierto
directamente (no la portada del curso). Si aparece la portada, la plataforma eliminó el parámetro `?recurso=` de la dirección: avisa al equipo.

Las unidades marcadas *pendiente* reservan el lugar de contenido que aún no existe; pueden crearse vacías o dejarse para después.
