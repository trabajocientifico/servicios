# Fundamentos · Nodo F2 · Carga en Open edX

Esta carpeta organiza el nodo **Sistemas que aprenden: una mirada por dentro de la IA** con la estructura de Open edX:
**Sección → Subsección → Unidad**. Ábrela en el navegador con `index.html` para ver la simulación.

> El material va **sin cifrar**. Comparte esta carpeta solo con el equipo del curso y no la subas a GitHub.

## 1. Subir los archivos

En Studio, **Contenido → Archivos** (*Files & Uploads*), sube todo lo que hay en `archivos/`:

| Archivo | Uso | Tamaño |
| --- | --- | --- |
| `visor-f2.html` | Recursos interactivos y películas. Cada unidad abre uno con `?recurso=rXX`. | 13,7 MB |
| `bienvenida-f2.html` | Animación de bienvenida (unidad B1.2). | 4,7 MB |
| `F2_Documento_base.pdf` | Documento base del nodo (PDF). | 1,4 MB |
| `F2_Tema1_lectura_conceptual.pdf` | Lectura conceptual del Tema 1 (PDF). | 0,9 MB |
| `F2_Tema2_lectura_conceptual.pdf` | Lectura conceptual del Tema 2 (PDF). | 1,1 MB |
| `F2_Tema3_lectura_conceptual.pdf` | Lectura conceptual del Tema 3 (PDF). | 1,0 MB |
| `F2_Tema4_lectura_conceptual.pdf` | Lectura conceptual del Tema 4 (PDF). | 0,9 MB |

Si Studio rechaza algún archivo por tamaño (`visor-f2.html` pesa 13,7 MB), el administrador debe ampliar el tamaño máximo de archivo del curso.

## 2. Crear la estructura y pegar las unidades

Para cada fila de la tabla: crea la sección, la subsección y la unidad con ese nombre. En la unidad agrega
**Componente → Texto (HTML)**, abre el **editor HTML** (no el visual) y pega el contenido completo del archivo indicado.
Las rutas `/static/…` apuntan a los archivos del paso 1; Studio las convierte solas.

En la unidad **CP1.2** agrega además **Problema → Opción múltiple**, cambia al **editor avanzado/Markdown** y pega el archivo `-problema.txt`.
Después del problema agrega otro **Texto (HTML)** con el archivo `-cierre.html`: es el bloque de avance de la unidad.
Deja la subsección *Mi punto de partida* **sin calificar**.

En las subsecciones **Evaluación** usa el tipo de tarea *Repaso* si el equipo decide calificarlas. Las actividades interactivas
no envían nota a la plataforma: para que cuenten, hay que cargarlas como paquete SCORM o reemplazarlas por problemas de Studio.

| Sección | Subsección | Unidad | Archivo |
| --- | --- | --- | --- |
| Bienvenida | Bienvenida a Sistemas que aprenden | B1.1 · ¿Cómo recorrer este nodo? | `unidades/01-B/B1.1.html` |
| Bienvenida | Bienvenida a Sistemas que aprenden | B1.2 · Comencemos | `unidades/01-B/B1.2.html` |
| Bienvenida | Bienvenida a Sistemas que aprenden | B1.3 · Introducción al nodo | `unidades/01-B/B1.3.html` |
| Conocimientos previos | Mi punto de partida | CP1.1 · Antes de empezar | `unidades/02-CP/CP1.1.html` |
| Conocimientos previos | Mi punto de partida | CP1.2 · ¿Qué sabes ya? | `unidades/02-CP/CP1.2.html` + problema `unidades/02-CP/CP1.2-problema.txt` + cierre `unidades/02-CP/CP1.2-cierre.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Encuentro con el saber | T1.E1 · Presentación del Tema 1 | `unidades/03-S1/T1.E1.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Encuentro con el saber | T1.E2 · 1.1 · Herramienta, sistema y modelo | `unidades/03-S1/T1.E2.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Encuentro con el saber | T1.E3 · 1.2 · Enfoque simbólico (basado en reglas) y Enfoque basado en datos (aprendizaje automático) | `unidades/03-S1/T1.E3.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Encuentro con el saber | T1.E4 · 1.3 · Predecir o clasificar, recomendar y generar | `unidades/03-S1/T1.E4.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R1 · Herramienta, sistema y modelo | `unidades/03-S1/T1.R1.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R2 · Del modelo a la experiencia | `unidades/03-S1/T1.R2.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R3 · ¿Reglas o aprendizaje? | `unidades/03-S1/T1.R3.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R4 · Dos filtros, la misma bandeja | `unidades/03-S1/T1.R4.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R5 · Cuatro resultados de la IA | `unidades/03-S1/T1.R5.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Reflexión con el saber | T1.R6 · ¿Qué forma tiene el resultado? | `unidades/03-S1/T1.R6.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Evaluación (3 repasos) *(tipo: Repaso)* | T1.V1 · ¿Qué estoy usando realmente? | `unidades/03-S1/T1.V1.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Evaluación (3 repasos) *(tipo: Repaso)* | T1.V2 · ¿Regla, ejemplos o ambos? | `unidades/03-S1/T1.V2.html` |
| S1 · Sistemas de IA: ¿Qué hacen y en qué se diferencian? | Evaluación (3 repasos) *(tipo: Repaso)* | T1.V3 · ¿Qué salida esperas? | `unidades/03-S1/T1.V3.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Encuentro con el saber | T2.E1 · Presentación del Tema 2 | `unidades/04-S2/T2.E1.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Encuentro con el saber | T2.E2 · 2.1 · El ciclo de vida de un modelo: datos, entrenamiento, evaluación y despliegue | `unidades/04-S2/T2.E2.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Encuentro con el saber | T2.E3 · 2.2 · Tipos de aprendizaje: supervisado, no supervisado y por refuerzo | `unidades/04-S2/T2.E3.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Encuentro con el saber | T2.E4 · 2.3 · ¿Qué es un modelo de lenguaje y cómo genera texto? | `unidades/04-S2/T2.E4.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R1 · El viaje de una solicitud | `unidades/04-S2/T2.R1.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R2 · ¿Con qué ejemplos se evalúa? | `unidades/04-S2/T2.R2.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R3 · Cuatro maneras de ajustar un modelo | `unidades/04-S2/T2.R3.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R4 · Mapa de técnicas de Machine Learning | `unidades/04-S2/T2.R4.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R5 · Por dentro del asistente | `unidades/04-S2/T2.R5.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Reflexión con el saber | T2.R6 · Arma una respuesta, token a token | `unidades/04-S2/T2.R6.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Evaluación (3 repasos) *(tipo: Repaso)* | T2.V1 · ¿En qué etapa del ciclo? | `unidades/04-S2/T2.V1.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Evaluación (3 repasos) *(tipo: Repaso)* | T2.V2 · ¿Qué señal orienta el ajuste? | `unidades/04-S2/T2.V2.html` |
| S2 · ¿Cómo aprende un sistema: del dato al resultado? | Evaluación (3 repasos) *(tipo: Repaso)* | T2.V3 · ¿Suena bien o es correcto? | `unidades/04-S2/T2.V3.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Encuentro con el saber | T3.E1 · Presentación del Tema 3 | `unidades/05-S3/T3.E1.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Encuentro con el saber | T3.E2 · 3.1 · El papel de los datos: calidad, representatividad, etiquetado y tipos de sesgo | `unidades/05-S3/T3.E2.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Encuentro con el saber | T3.E3 · 3.2 · Más allá del dato: ¿Quiénes lo generan? | `unidades/05-S3/T3.E3.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Encuentro con el saber | T3.E4 · 3.3 · Métricas y límites: sobreajuste, generalización y alucinación | `unidades/05-S3/T3.E4.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Encuentro con el saber | T3.E5 · 3.4 · ¿Por qué “más datos” no siempre significa “mejor modelo”? | `unidades/05-S3/T3.E5.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Reflexión con el saber | T3.R1 · Sesgo algorítmico | `unidades/05-S3/T3.R1.html` |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Reflexión con el saber | T3.R2 · 3.1 · Recursos para aprender | `unidades/05-S3/T3.R2.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Reflexión con el saber | T3.R3 · 3.2 · Recursos para aprender | `unidades/05-S3/T3.R3.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Reflexión con el saber | T3.R4 · 3.3 · Recursos para aprender | `unidades/05-S3/T3.R4.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Reflexión con el saber | T3.R5 · 3.4 · Recursos para aprender | `unidades/05-S3/T3.R5.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Evaluación (4 repasos) *(tipo: Repaso)* | T3.V1 · 3.1 · Repaso | `unidades/05-S3/T3.V1.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Evaluación (4 repasos) *(tipo: Repaso)* | T3.V2 · 3.2 · Repaso | `unidades/05-S3/T3.V2.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Evaluación (4 repasos) *(tipo: Repaso)* | T3.V3 · 3.3 · Repaso | `unidades/05-S3/T3.V3.html` *(pendiente)* |
| S3 · ¿De qué dependen la calidad y la confiabilidad de los resultados? | Evaluación (4 repasos) *(tipo: Repaso)* | T3.V4 · 3.4 · Repaso | `unidades/05-S3/T3.V4.html` *(pendiente)* |
| S4 · Confiar con criterio: seguridad y protección de los datos | Encuentro con el saber | T4.E1 · Presentación del Tema 4 | `unidades/06-S4/T4.E1.html` |
| S4 · Confiar con criterio: seguridad y protección de los datos | Encuentro con el saber | T4.E2 · 4.1 · Integridad de los datos a lo largo del ciclo de vida: cuando el sistema aprende o lee lo que no debe | `unidades/06-S4/T4.E2.html` |
| S4 · Confiar con criterio: seguridad y protección de los datos | Encuentro con el saber | T4.E3 · 4.2 · Confidencialidad y protección de los datos en el uso | `unidades/06-S4/T4.E3.html` |
| S4 · Confiar con criterio: seguridad y protección de los datos | Reflexión con el saber | T4.R1 · Lo que el sistema no debió aprender | `unidades/06-S4/T4.R1.html` |
| S4 · Confiar con criterio: seguridad y protección de los datos | Reflexión con el saber | T4.R2 · 4.1 · Recursos para aprender | `unidades/06-S4/T4.R2.html` *(pendiente)* |
| S4 · Confiar con criterio: seguridad y protección de los datos | Reflexión con el saber | T4.R3 · 4.2 · Recursos para aprender | `unidades/06-S4/T4.R3.html` *(pendiente)* |
| S4 · Confiar con criterio: seguridad y protección de los datos | Evaluación (2 repasos) *(tipo: Repaso)* | T4.V1 · 4.1 · Repaso | `unidades/06-S4/T4.V1.html` *(pendiente)* |
| S4 · Confiar con criterio: seguridad y protección de los datos | Evaluación (2 repasos) *(tipo: Repaso)* | T4.V2 · 4.2 · Repaso | `unidades/06-S4/T4.V2.html` *(pendiente)* |

## 3. Comprobar

Abre cada unidad en la vista previa del LMS: el encabezado, el texto y, en las unidades con recurso, el recurso abierto
directamente (no la portada del curso). Si aparece la portada, la plataforma eliminó el parámetro `?recurso=` de la dirección: avisa al equipo.

Las unidades marcadas *pendiente* reservan el lugar de contenido que aún no existe; pueden crearse vacías o dejarse para después.
