/* ============================================
   CÓMO CARGAR LA GRABACIÓN DE CADA CLASE

   Opción A — YouTube (recomendada para grupos grandes):
     videoId: "dQw4w9WgXcQ"        // lo que va después de v= en la URL
     Sube el video como "Oculto / No listado".

   Opción B — Google Drive:
     driveId: "https://drive.google.com/file/d/1AbC.../view?usp=sharing"
     Puedes pegar el enlace completo o solo el ID; el sistema lo detecta.
     El archivo debe estar compartido como
     "Cualquier persona con el enlace · Lector", o el estudiante verá
     "Necesitas acceso". Ojo: Drive limita las reproducciones diarias de
     un mismo archivo, así que con muchos estudiantes puede bloquearse.

   Si una clase tiene las dos, manda YouTube.
   ============================================ */

const COURSE_DATA = {
  title: "Inteligencia Artificial para Investigación Científica",
  subtitle: "20 horas certificadas — formación en vivo con grabaciones disponibles en la plataforma",
  hours: 20,
  isLive: true,
  hidePromo: true,
  startDate: "2026-08-20",
  startLabel: "Inicia el jueves 20 de agosto de 2026",
  sessionsInfo: "7 sesiones en vivo: 6 de 3 horas y 1 de 2 horas",
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1",
      description: "Dos sesiones en vivo: una de 2 horas y una de 3 horas.",
      icon: "1️⃣",
      lessons: [
        {
          id: "les-1-1",
          title: "Clase 1 — Sesión en vivo (2 horas)",
          type: "video",
          duration: "2 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Primera sesión en vivo del curso. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 1 — Sesión en vivo (2 horas)**\n\nSesión de apertura del curso. El curso inicia el **jueves 20 de agosto de 2026**.\n\n**Cómo funciona esta clase:**\n- La sesión se dicta en vivo en el horario acordado con el grupo\n- La grabación se carga en este mismo espacio al finalizar\n- Los materiales se publican en la pestaña Recursos\n\n**Antes de la sesión:**\n- Ten creadas tus cuentas en las herramientas de IA que usaremos\n- Ten a la mano un tema o proyecto de investigación propio para aplicar lo visto\n- Verifica tu conexión y el audio de tu equipo\n\n**Al terminar el módulo:**\n- Presenta el quiz de 10 preguntas (20 minutos) sobre lo visto",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Material de la sesión", url: "#", type: "download" }
          ]
        },
        {
          id: "les-1-2",
          title: "Clase 2 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Segunda sesión en vivo del Módulo 1. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 2 — Sesión en vivo (3 horas)**\n\nSegunda sesión del Módulo 1.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- Aplica los ejercicios sobre tu propio tema de investigación\n- Guarda tus prompts y resultados para comparar avances\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Plantillas de la sesión", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Módulo 1",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Qué es una \"alucinación\" en el contexto de los modelos de lenguaje?",
            options: [
              "Un error de conexión con el servidor del modelo",
              "Una respuesta que suena coherente pero contiene información falsa o inventada",
              "Una respuesta que el modelo se niega a entregar",
              "Un aviso de contenido sensible"
            ],
            correct: 1,
            explanation: "Una alucinación es una salida fluida y convincente pero incorrecta o inventada. Por eso toda afirmación y referencia debe verificarse en la fuente original."
          },
          {
            question: "¿Qué hace principalmente un modelo de lenguaje al generar una respuesta?",
            options: [
              "Consulta en tiempo real una base de datos de artículos verificados",
              "Predice el texto más probable a partir de patrones aprendidos en su entrenamiento",
              "Razona con reglas lógicas programadas manualmente",
              "Copia literalmente fragmentos de una enciclopedia"
            ],
            correct: 1,
            explanation: "Genera texto prediciendo la continuación más probable según los patrones de su entrenamiento; no consulta una base de verdad salvo que se le conecte una."
          },
          {
            question: "¿Qué caracteriza a un prompt bien construido para tareas de investigación?",
            options: [
              "Ser lo más corto posible para no confundir al modelo",
              "Definir rol, contexto, tarea concreta, formato de salida y restricciones",
              "Incluir siempre el texto completo del artículo sin filtrar",
              "Escribirse siempre en inglés técnico"
            ],
            correct: 1,
            explanation: "Un prompt efectivo especifica quién responde, sobre qué contexto, qué tarea exacta debe hacer, en qué formato y con qué límites."
          },
          {
            question: "¿Qué significa que un modelo tenga una \"fecha de corte de conocimiento\"?",
            options: [
              "Que deja de funcionar después de esa fecha",
              "Que no conoce por sí mismo hechos posteriores a esa fecha",
              "Que solo responde preguntas sobre esa fecha",
              "Que borra las conversaciones anteriores a esa fecha"
            ],
            correct: 1,
            explanation: "El modelo fue entrenado con datos hasta cierta fecha; para hechos posteriores necesita que se le entregue la información como contexto."
          },
          {
            question: "¿Qué precaución es clave al trabajar con datos sensibles o personales en herramientas de IA en la nube?",
            options: [
              "Subirlos completos para obtener mejores resultados",
              "Anonimizar o no compartir datos identificables y revisar la política de privacidad del servicio",
              "Cambiar el nombre del archivo antes de subirlo",
              "Usar siempre la versión gratuita de la herramienta"
            ],
            correct: 1,
            explanation: "Los datos enviados a un servicio externo pueden almacenarse o procesarse fuera de tu control; hay que anonimizar y respetar el aval ético y la normativa de datos."
          },
          {
            question: "¿Cuál de estas tareas es un buen uso de la IA en investigación?",
            options: [
              "Decidir las conclusiones del estudio",
              "Resumir y organizar material que el investigador luego verifica",
              "Inventar datos que falten en el experimento",
              "Firmar el artículo como coautora"
            ],
            correct: 1,
            explanation: "La IA apoya tareas instrumentales (resumir, organizar, redactar borradores) siempre bajo verificación humana; no reemplaza el juicio científico."
          },
          {
            question: "¿Por qué conviene pedirle a la IA que indique de dónde salió una afirmación?",
            options: [
              "Porque así responde más rápido",
              "Porque permite rastrear y verificar la información en la fuente original",
              "Porque reduce el costo de la consulta",
              "Porque evita tener que leer el artículo"
            ],
            correct: 1,
            explanation: "Exigir la procedencia hace verificable la respuesta; aun así hay que comprobar que la fuente exista y diga lo que se afirma."
          },
          {
            question: "¿Qué es el sesgo en un sistema de IA?",
            options: [
              "Un error de programación que impide ejecutar el modelo",
              "Una desviación sistemática heredada de los datos o del diseño que favorece o perjudica a ciertos grupos o resultados",
              "La lentitud del modelo al responder",
              "El límite de caracteres de la respuesta"
            ],
            correct: 1,
            explanation: "El sesgo se hereda de los datos de entrenamiento y de las decisiones de diseño, y puede reproducir desigualdades o distorsionar resultados."
          },
          {
            question: "Si dos consultas idénticas a un modelo generativo producen respuestas distintas, esto se debe a que:",
            options: [
              "El modelo está dañado",
              "La generación tiene un componente aleatorio y no es determinista",
              "Se agotó la memoria del computador",
              "La pregunta estaba mal escrita"
            ],
            correct: 1,
            explanation: "La generación incluye aleatoriedad controlada por parámetros como la temperatura, por lo que la misma consulta puede dar salidas distintas."
          },
          {
            question: "¿Cuál es la responsabilidad del investigador al usar IA en su trabajo?",
            options: [
              "Ninguna, la asume el proveedor de la herramienta",
              "Verificar, validar y responder por todo el contenido que publica",
              "Solo declarar que usó IA, sin revisar el resultado",
              "Delegar la revisión a la propia herramienta"
            ],
            correct: 1,
            explanation: "La responsabilidad científica y ética es siempre del investigador que firma: la IA es una herramienta, no un autor ni un garante de validez."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Módulo 2",
      description: "Dos sesiones en vivo de 3 horas cada una.",
      icon: "2️⃣",
      lessons: [
        {
          id: "les-2-1",
          title: "Clase 3 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Primera sesión en vivo del Módulo 2. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 3 — Sesión en vivo (3 horas)**\n\nPrimera sesión del Módulo 2.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- Repasa la sesión anterior antes de conectarte\n- Prepara tus preguntas para el espacio de dudas",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Plantillas de la sesión", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-2",
          title: "Clase 4 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Segunda sesión en vivo del Módulo 2. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 4 — Sesión en vivo (3 horas)**\n\nSegunda sesión del Módulo 2.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- Ten listos los avances trabajados en la clase anterior\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Plantillas de la sesión", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Módulo 2",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "Al usar IA para apoyar una revisión de literatura, ¿cuál es el paso indispensable antes de citar una referencia sugerida?",
            options: [
              "Cambiar el formato de la cita a APA",
              "Verificar que la referencia exista realmente y leer la fuente original",
              "Pedirle al modelo que la resuma otra vez",
              "Traducir la referencia al español"
            ],
            correct: 1,
            explanation: "Los modelos pueden fabricar referencias plausibles con autores, títulos y DOI inexistentes. Siempre hay que comprobar la existencia y el contenido en la fuente."
          },
          {
            question: "¿Qué identifica de forma única y persistente a un artículo científico?",
            options: ["El ISBN", "El DOI", "El ORCID", "El ISSN"],
            correct: 1,
            explanation: "El DOI identifica de forma persistente un documento. El ORCID identifica autores, el ISSN publicaciones seriadas y el ISBN libros."
          },
          {
            question: "¿Qué es una búsqueda booleana en bases de datos científicas?",
            options: [
              "Una búsqueda que solo devuelve artículos de acceso abierto",
              "Una búsqueda que combina términos con operadores como AND, OR y NOT",
              "Una búsqueda ordenada por número de citas",
              "Una búsqueda hecha exclusivamente por inteligencia artificial"
            ],
            correct: 1,
            explanation: "Los operadores booleanos permiten combinar y excluir términos para acotar con precisión el conjunto de resultados."
          },
          {
            question: "¿Para qué sirve un enfoque RAG (generación aumentada por recuperación)?",
            options: [
              "Para entrenar un modelo de lenguaje desde cero",
              "Para que las respuestas se apoyen en documentos propios y verificables en lugar de solo la memoria del modelo",
              "Para traducir automáticamente artículos científicos",
              "Para aumentar la velocidad de escritura del modelo"
            ],
            correct: 1,
            explanation: "RAG recupera fragmentos de una base documental propia y los entrega como contexto al modelo, lo que reduce alucinaciones y permite rastrear la fuente."
          },
          {
            question: "¿Qué caracteriza a una revisión sistemática frente a una revisión narrativa?",
            options: [
              "Que es más corta",
              "Que sigue un protocolo explícito y reproducible de búsqueda, selección y análisis",
              "Que solo incluye artículos en inglés",
              "Que no requiere criterios de inclusión"
            ],
            correct: 1,
            explanation: "La revisión sistemática documenta su protocolo (criterios, bases, fechas, cribado) de modo que otro equipo pueda reproducirla."
          },
          {
            question: "¿Qué información conviene registrar para que una búsqueda de literatura sea reproducible?",
            options: [
              "Solo el número de artículos encontrados",
              "Las bases consultadas, la ecuación de búsqueda, la fecha y los criterios de inclusión y exclusión",
              "Únicamente el nombre del buscador usado",
              "El tiempo que tomó la búsqueda"
            ],
            correct: 1,
            explanation: "Sin bases, ecuación, fecha y criterios, la búsqueda no puede repetirse ni auditarse."
          },
          {
            question: "Si una herramienta de IA resume un artículo que no leíste, lo correcto es:",
            options: [
              "Citar el resumen tal cual, indicando que lo hizo la IA",
              "Leer y verificar el artículo original antes de citarlo",
              "Citar la herramienta de IA como fuente del hallazgo",
              "No citar nada y usar la información directamente"
            ],
            correct: 1,
            explanation: "Se cita lo que se leyó y verificó. El resumen de la IA es un apoyo de lectura, no una fuente citable del hallazgo."
          },
          {
            question: "¿Qué es la literatura gris?",
            options: [
              "Artículos retractados por mala conducta",
              "Documentos no publicados por editoriales comerciales, como tesis, informes técnicos y actas",
              "Artículos con más de veinte años de antigüedad",
              "Publicaciones sin ilustraciones"
            ],
            correct: 1,
            explanation: "La literatura gris (tesis, informes, actas, preprints institucionales) puede aportar evidencia valiosa que no aparece en las bases comerciales."
          },
          {
            question: "¿Qué es un preprint?",
            options: [
              "Un artículo ya revisado por pares y publicado",
              "Un manuscrito compartido públicamente antes de la revisión por pares",
              "Un resumen ejecutivo de un artículo",
              "Una versión traducida de un artículo"
            ],
            correct: 1,
            explanation: "El preprint difunde resultados con rapidez, pero aún no pasó revisión por pares: hay que leerlo con cautela e indicar su estado al citarlo."
          },
          {
            question: "¿Cuál es un riesgo de apoyarse únicamente en la IA para seleccionar la bibliografía?",
            options: [
              "Que la búsqueda tome demasiado tiempo",
              "Que se omitan trabajos relevantes y se introduzcan sesgos sin que el investigador lo note",
              "Que las citas queden en formato incorrecto",
              "Que se dupliquen los artículos encontrados"
            ],
            correct: 1,
            explanation: "El criterio de selección no es transparente ni exhaustivo: puede dejar fuera literatura clave y arrastrar sesgos del entrenamiento."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Módulo 3",
      description: "Dos sesiones en vivo de 3 horas cada una.",
      icon: "3️⃣",
      lessons: [
        {
          id: "les-3-1",
          title: "Clase 5 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Primera sesión en vivo del Módulo 3. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 5 — Sesión en vivo (3 horas)**\n\nPrimera sesión del Módulo 3.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- A partir de este módulo el trabajo se orienta a tu propio proyecto de investigación",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Plantillas de la sesión", url: "#", type: "download" }
          ]
        },
        {
          id: "les-3-2",
          title: "Clase 6 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Segunda sesión en vivo del Módulo 3. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 6 — Sesión en vivo (3 horas)**\n\nSegunda sesión del Módulo 3.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- Avanza en tu proyecto entre sesiones\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Plantillas de la sesión", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Módulo 3",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Cuál es una buena práctica al usar IA para generar código de análisis de datos?",
            options: [
              "Ejecutarlo directamente sin revisarlo, para ahorrar tiempo",
              "Revisar y probar el código, validando los resultados contra los datos reales",
              "Compartir siempre los datos confidenciales completos en el prompt",
              "Confiar en la IA para decidir las conclusiones del estudio"
            ],
            correct: 1,
            explanation: "La IA acelera la escritura de código, pero la validación es responsabilidad del investigador: hay que probarlo y contrastar los resultados."
          },
          {
            question: "En un análisis, ¿qué significa que un resultado sea estadísticamente significativo?",
            options: [
              "Que el hallazgo es importante en la práctica",
              "Que es poco probable observarlo si la hipótesis nula fuera cierta",
              "Que la muestra fue muy grande",
              "Que el estudio fue publicado en una revista indexada"
            ],
            correct: 1,
            explanation: "La significancia estadística habla de probabilidad bajo la hipótesis nula, no de relevancia práctica: son cosas distintas."
          },
          {
            question: "¿Por qué la correlación no implica causalidad?",
            options: [
              "Porque la correlación siempre está mal calculada",
              "Porque dos variables pueden variar juntas por azar o por una tercera variable que las explica",
              "Porque la causalidad solo existe en experimentos de laboratorio",
              "Porque la correlación solo aplica a variables categóricas"
            ],
            correct: 1,
            explanation: "Una asociación puede deberse al azar, a variables confusoras o a causalidad inversa; establecer causalidad requiere diseño adecuado."
          },
          {
            question: "¿Qué debe hacerse con los valores atípicos detectados en un conjunto de datos?",
            options: [
              "Eliminarlos siempre de forma automática",
              "Examinarlos, documentar la decisión y justificar si se conservan o se excluyen",
              "Reemplazarlos por la media sin dejar constancia",
              "Ignorarlos porque no afectan el análisis"
            ],
            correct: 1,
            explanation: "Un atípico puede ser un error de medición o un hallazgo real. La decisión debe ser examinada, justificada y documentada."
          },
          {
            question: "¿Qué es la reproducibilidad de un análisis?",
            options: [
              "Que otro equipo, con los mismos datos y código, obtenga los mismos resultados",
              "Que el artículo se publique en varias revistas",
              "Que el análisis se ejecute rápidamente",
              "Que los gráficos se vean iguales en cualquier pantalla"
            ],
            correct: 0,
            explanation: "Reproducibilidad es obtener los mismos resultados con los mismos datos y código; requiere documentar versiones, datos y procedimiento."
          },
          {
            question: "¿Qué elemento es indispensable para que un proyecto de análisis sea reproducible?",
            options: [
              "Usar siempre el mismo computador",
              "Documentar el código, las versiones de librerías y el origen de los datos",
              "Guardar los resultados únicamente como imágenes",
              "Trabajar sin control de versiones para evitar conflictos"
            ],
            correct: 1,
            explanation: "Hay que documentar el flujo completo: origen y versión de los datos, código versionado y dependencias con sus versiones."
          },
          {
            question: "¿Qué significa el principio FAIR aplicado a los datos de investigación?",
            options: [
              "Que los datos deben ser gratuitos siempre",
              "Que deben ser localizables, accesibles, interoperables y reutilizables",
              "Que deben publicarse solo en inglés",
              "Que deben recopilarse en menos de un año"
            ],
            correct: 1,
            explanation: "FAIR (Findable, Accessible, Interoperable, Reusable) orienta la gestión de datos para que otros puedan encontrarlos y reutilizarlos."
          },
          {
            question: "¿Qué es el p-hacking?",
            options: [
              "Un método estadístico avanzado y recomendado",
              "Probar múltiples análisis hasta encontrar un resultado significativo y reportar solo ese",
              "Un error de cálculo del valor p",
              "Un tipo de gráfico para valores p"
            ],
            correct: 1,
            explanation: "El p-hacking infla los falsos positivos porque explora muchas alternativas y reporta selectivamente; se previene preregistrando el análisis."
          },
          {
            question: "¿Qué precaución exige interpretar los resultados de un modelo predictivo aplicado a datos científicos?",
            options: [
              "Aceptar la predicción como conclusión definitiva",
              "Evaluar su desempeño en datos no vistos y examinar sus limitaciones y sesgos",
              "Usar siempre el modelo más complejo disponible",
              "Reportar solo la métrica más favorable"
            ],
            correct: 1,
            explanation: "Un modelo debe evaluarse fuera de su conjunto de entrenamiento y reportarse con sus limitaciones, supuestos y posibles sesgos."
          },
          {
            question: "¿Qué ventaja aporta documentar los prompts y las versiones de las herramientas de IA utilizadas?",
            options: [
              "Permite obtener siempre la misma respuesta palabra por palabra",
              "Aporta trazabilidad y favorece la reproducibilidad del trabajo",
              "Evita tener que citar las fuentes originales",
              "Reduce el costo de uso de la herramienta"
            ],
            correct: 1,
            explanation: "Aunque los modelos no son deterministas, registrar prompts, versiones y fechas hace el proceso trazable y auditable."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Módulo 4",
      description: "Sesión final en vivo de 3 horas y cierre del curso.",
      icon: "4️⃣",
      lessons: [
        {
          id: "les-4-1",
          title: "Clase 7 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Sesión de cierre del curso.",
          reading: "**Clase 7 — Sesión en vivo (3 horas)**\n\nSesión de cierre del curso.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con la integración de todo lo trabajado\n- La grabación se carga en este espacio al finalizar\n- Los recursos finales se publican en la pestaña Recursos\n\n**Después de esta clase:**\n- Presenta el quiz del módulo (10 preguntas, 20 minutos)\n- Al aprobar los 4 quizzes se genera tu certificado de 20 horas",
          resources: [
            { title: "Enlace a la sesión en vivo", url: "#", type: "link" },
            { title: "Material de cierre del curso", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Módulo 4",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Cuál es la práctica correcta frente al uso de IA en una publicación científica?",
            options: [
              "Ocultarlo, porque puede afectar la aceptación del artículo",
              "Declarar de forma transparente cómo se usó la herramienta, según la política de la revista",
              "Incluir a la IA como coautora del artículo",
              "Usarla solo si nadie más en el equipo lo sabe"
            ],
            correct: 1,
            explanation: "Las principales editoriales exigen declarar el uso de IA y no aceptan que sea coautora, porque no puede asumir responsabilidad sobre el contenido."
          },
          {
            question: "¿Por qué la IA no puede figurar como autora de un artículo científico?",
            options: [
              "Porque no sabe escribir en formato académico",
              "Porque no puede asumir responsabilidad ni rendir cuentas por el contenido",
              "Porque las revistas no tienen un campo para registrarla",
              "Porque no tiene ORCID"
            ],
            correct: 1,
            explanation: "La autoría implica responsabilidad y capacidad de responder por el trabajo, algo que un sistema automático no puede asumir."
          },
          {
            question: "¿Cuál es el uso más adecuado de la IA en la etapa de escritura de un artículo?",
            options: [
              "Generar el artículo completo y enviarlo sin revisión",
              "Apoyar la redacción, claridad y estructura de un texto cuyo contenido es del autor",
              "Inventar resultados que refuercen la hipótesis",
              "Reescribir textos de otros autores para evitar la detección de plagio"
            ],
            correct: 1,
            explanation: "La IA es útil como apoyo de redacción y estilo sobre contenido propio y verificado; fabricar resultados o encubrir plagio es mala conducta científica."
          },
          {
            question: "Usar IA para parafrasear el texto de otro autor sin citarlo constituye:",
            options: [
              "Una práctica aceptable de reescritura",
              "Plagio, porque se apropia de ideas ajenas sin dar crédito",
              "Una cita indirecta válida",
              "Un uso legítimo de datos públicos"
            ],
            correct: 1,
            explanation: "Cambiar las palabras no cambia el origen de la idea: sin atribución sigue siendo plagio."
          },
          {
            question: "¿Qué debe incluir una declaración de uso de IA en un manuscrito?",
            options: [
              "Solo el nombre de la herramienta",
              "Qué herramienta se usó, para qué tareas y con qué alcance",
              "El costo de la suscripción",
              "La cantidad de consultas realizadas"
            ],
            correct: 1,
            explanation: "La declaración debe permitir al lector entender qué parte del trabajo tuvo asistencia automatizada y en qué medida."
          },
          {
            question: "¿Qué principio ético exige informar a los participantes sobre el uso que se dará a sus datos?",
            options: [
              "El consentimiento informado",
              "La revisión por pares",
              "El acceso abierto",
              "La declaración de conflictos de interés"
            ],
            correct: 0,
            explanation: "El consentimiento informado garantiza que los participantes conozcan y acepten el uso previsto de sus datos, incluido su procesamiento automatizado."
          },
          {
            question: "¿Qué es un conflicto de interés en investigación?",
            options: [
              "Un desacuerdo entre coautores sobre el orden de firma",
              "Una circunstancia que puede influir indebidamente en el juicio profesional, como un vínculo financiero",
              "Una diferencia de resultados entre dos estudios",
              "Un retraso en la publicación del artículo"
            ],
            correct: 1,
            explanation: "El conflicto de interés debe declararse para que el lector pueda valorar posibles influencias sobre el diseño o la interpretación."
          },
          {
            question: "¿Qué tarea NO debería delegarse por completo a una IA en un proceso de investigación?",
            options: [
              "Sugerir mejoras de redacción en un borrador",
              "Decidir e interpretar las conclusiones científicas del estudio",
              "Ayudar a organizar referencias bibliográficas",
              "Generar código de apoyo para graficar resultados"
            ],
            correct: 1,
            explanation: "La interpretación y las conclusiones dependen del juicio experto y del contexto del estudio; delegarlas compromete la integridad científica."
          },
          {
            question: "Si un revisor recibe un manuscrito confidencial, ¿puede subirlo a una herramienta de IA pública para que lo resuma?",
            options: [
              "Sí, siempre que borre después la conversación",
              "No, porque rompe la confidencialidad del proceso de revisión por pares",
              "Sí, si el artículo ya está en preprint",
              "Sí, siempre que no lo cite"
            ],
            correct: 1,
            explanation: "El manuscrito en revisión es confidencial; subirlo a un servicio externo lo expone y vulnera el compromiso con la revista y los autores."
          },
          {
            question: "¿Cuál es el criterio final para publicar un resultado apoyado en IA?",
            options: [
              "Que la herramienta tenga buena reputación",
              "Que el investigador lo haya verificado y pueda responder por él",
              "Que la IA declare estar segura de la respuesta",
              "Que el texto no sea detectado como generado por IA"
            ],
            correct: 1,
            explanation: "Lo que se publica debe estar verificado por quien firma: la confianza recae en el investigador, no en la herramienta."
          }
        ]
      }
    }
  ]
};
