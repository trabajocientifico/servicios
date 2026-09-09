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
      description: "Tres sesiones en vivo: una de 2 horas y dos de 3 horas.",
      icon: "1️⃣",
      lessons: [
        {
          id: "les-1-1",
          title: "Clase 1 — Sesión en vivo (2 horas)",
          type: "video",
          duration: "2 horas",
          videoId: "fE5GFWVBaqg",
          description: "Fundamentos y ética de la IA, diferencia entre modelos y agentes, búsqueda profunda e ingeniería de prompts.",
          reading: "**Clase 1 — Fundamentos, ética y agentes de IA (2 horas)**\n\n**Fundamentos y ética**\n\nLos modelos de lenguaje operan mediante cálculos de tokens y probabilidades, no mediante razonamiento real. Se enfatizó la importancia de mantener la responsabilidad humana y ética en la investigación, señalando que las herramientas antiplagio actuales no son fiables.\n\n**Diferencia entre modelos y agentes**\n\nMientras los modelos solo procesan información y entregan respuestas, los agentes poseen autonomía para planificar, ejecutar soluciones, verificar resultados y realizar procesos de retroalimentación.\n\n**Búsqueda profunda**\n\nSe destacó el uso de las funciones de búsqueda profunda (acceso a la web) como estrategia principal para automatizar la recopilación de información académica, congresos y eventos verificables, minimizando errores.\n\n**Ingeniería de prompts**\n\nPara optimizar las respuestas es necesario estructurar las solicitudes definiendo claramente el rol del experto, el contexto, la tarea, el formato de salida y los límites.\n\n**Gestión de proyectos**\n\nSe diferenciaron las capacidades entre plataformas: el uso de «Gems» en Gemini para agentes de tareas repetitivas y «Proyectos» en ChatGPT para consolidar archivos y contextos específicos de una investigación.\n\n**Selección de herramientas**\n\nNo existe una IA «mejor» universal: la elección entre Claude, GPT o Gemini debe basarse en un equilibrio técnico entre costos, complejidad de la tarea, velocidad y necesidades específicas de cada usuario.\n\n**Al terminar el módulo:**\n- Presenta el quiz de 10 preguntas (20 minutos) sobre lo visto",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-ia-para-investigacion-cientifica/", type: "link" }
          ]
        },
        {
          id: "les-1-2",
          title: "Clase 2 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "ID1A6C_tws8",
          description: "Instalación paso a paso del entorno de trabajo: Python, Node.js, Antigravity, Codex y Claude Code.",
          reading: "**Clase 2 — Instalación del entorno de trabajo (3 horas)**\n\nSesión práctica dedicada a dejar el computador de cada participante listo para trabajar con agentes de IA. Se acompañó la descarga e instalación de cada herramienta, verificando en cada paso que quedara funcionando.\n\n**Python**\n\nDescarga e instalación del intérprete de Python, con la advertencia de marcar la opción para agregarlo al PATH durante la instalación. Se comprobó la instalación desde la terminal y se explicó para qué se usará dentro del curso.\n\n**Node.js**\n\nInstalación de Node.js y de su gestor de paquetes npm, requisito previo para varias de las herramientas de agentes que se usan más adelante. Se verificó la versión instalada desde la terminal.\n\n**Antigravity**\n\nDescarga e instalación del entorno de Google, creación de la cuenta y primer recorrido por la interfaz.\n\n**Codex**\n\nInstalación de Codex y vinculación con la cuenta de OpenAI, revisando cómo se lanza y cómo se le entregan tareas.\n\n**Claude Code**\n\nInstalación de Claude Code desde la terminal (apoyada en Node.js), inicio de sesión y primera ejecución para confirmar que responde correctamente.\n\n**Recomendaciones:**\n- Si una instalación falla, repite el paso con la grabación en pausa antes de continuar con la siguiente herramienta\n- Anota los usuarios y correos con los que creaste cada cuenta\n- Deja las herramientas instaladas antes de la Clase 3: a partir de allí se trabaja con ellas\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-ia-para-investigacion-cientifica/", type: "link" },
            { title: "Materiales de la clase (Google Drive)", url: "https://drive.google.com/drive/folders/1dhXdHYZyBwwuqgnuvp9XEwdzmJH6QiOM?usp=sharing", type: "download" }
          ]
        },
        {
          id: "les-1-3",
          title: "Clase 3 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "rewgdZbG2Bk",
          description: "Proceso lógico de la investigación, definición de problemas y objetivos, optimización de prompts y uso de Gemini Notebook con fuentes verificadas.",
          reading: "**Clase 3 — Proceso lógico de la investigación y Gemini Notebook (3 horas)**\n\n**Proceso lógico**\n\nEs fundamental seguir una estructura paso a paso (línea de investigación, árbol de problemas, preguntas y objetivos) evitando delegar la autonomía investigativa completamente a la inteligencia artificial.\n\n**Definición de problemas**\n\nLa investigación científica busca generar conocimiento verificable; por ello, es necesario transformar temas generales en problemas de investigación concretos y relevantes.\n\n**Objetivos claros**\n\nLos objetivos de investigación responden al «por qué» (la finalidad del estudio) y deben distinguirse claramente de las actividades operativas o tareas metodológicas.\n\n**Gestión de sesiones**\n\nPara evitar bloqueos del sistema o pérdida de precisión, se recomienda crear chats independientes para cada consulta técnica o prompt específico dentro del proyecto.\n\n**Estructura de prompts**\n\nPara obtener resultados efectivos, los prompts deben seguir una estructura clara: definir el rol de la IA, proveer contexto específico, detallar la tarea a realizar y especificar el formato de salida deseado.\n\n**Naturaleza estocástica**\n\nSe debe tener presente que los modelos de IA son probabilísticos, no determinísticos; esto significa que los resultados variarán naturalmente entre diferentes usuarios aunque usen el mismo prompt.\n\n**Gemini Notebook: fuentes verificadas**\n\nGemini Notebook se establece como la herramienta principal para investigación, ya que reduce significativamente el riesgo de alucinaciones al limitar sus respuestas exclusivamente a las fuentes cargadas por el usuario.\n\n**Gemini Notebook: funcionalidades**\n\nLa herramienta permite integrar diversos formatos (PDF, enlaces, videos) y utilizar la «búsqueda profunda» para encontrar datos, métricas y estadísticas que soporten la investigación con información verificable.\n\n**Supervisión crítica**\n\nLa responsabilidad final reside en el investigador; se debe revisar de manera consciente el contenido generado por la IA para asegurar que sea coherente, ético y alineado con los intereses propios.\n\n**Verificación**\n\nEs esencial validar todas las referencias bibliográficas y cifras generadas automáticamente, evitando aceptar ciegamente la información proporcionada por el modelo.\n\n**Recomendaciones:**\n- Define tu línea de investigación y tu árbol de problemas antes de la siguiente sesión\n- Carga en Gemini Notebook solo fuentes que hayas revisado\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-ia-para-investigacion-cientifica/", type: "link" }
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
          title: "Clase 4 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "sPIy2cvEErI",
          description: "Marco teórico y estado del arte, método Tree of Science, herramientas de búsqueda y mapeo de literatura, sistemas de indexación y preparación de metadatos en R y RStudio.",
          reading: "**Clase 4 — Marco teórico, estado del arte y mapeo de la literatura (3 horas)**\n\n**Marco teórico y estado del arte**\n\nEl marco teórico es el lente conceptual con el que se observa el problema, mientras que el estado del arte reúne los antecedentes que permiten identificar vacíos de conocimiento. La lectura crítica no se delega a la IA: el criterio y la responsabilidad ética son del investigador.\n\n**Construcción del marco teórico**\n\nSe estructura a partir de 3 a 5 categorías temáticas que ordenan la discusión conceptual del proyecto.\n\n**Tree of Science (ToS)**\n\nMétodo que aplica algoritmos sobre redes de citación para organizar la literatura en raíces (obras base), tronco (cuerpo estructural del campo) y hojas (temas emergentes y perspectivas actuales).\n\n**Herramientas de búsqueda y mapeo**\n\n- **ResearchGate:** red social académica para contactar autores y acceder a artículos.\n- **Google Scholar y Semantic Scholar:** motores para explorar literatura científica y bases de datos bibliográficas.\n- **Connected Papers y Litmaps:** visualización de redes de citación y de la evolución temporal de un tema de investigación.\n\n**Sistemas de indexación y métricas**\n\nSe diferencian Publindex (Colombia), JCR (Clarivate / Web of Science) y Scopus / SJR (Elsevier), y cómo cada sistema clasifica las revistas científicas y aporta al análisis bibliométrico.\n\n**Procesamiento técnico en R y RStudio**\n\nR y RStudio se usan para consolidar los metadatos exportados desde Scopus y Web of Science. Un corpus de 100 a 500 documentos es el rango adecuado para optimizar el análisis de redes de citación.\n\n**Estrategias de búsqueda**\n\nConstrucción de ecuaciones de búsqueda eficaces con operadores booleanos y exportación de registros completos (metadatos) en formatos compatibles con el análisis posterior.\n\n**Valor académico de la revisión**\n\nLos artículos de revisión tienen el mismo peso y valor académico que los experimentales, y son una opción prestigiosa para proyectos de investigación.\n\n**Recomendaciones:**\n- Instala R y RStudio con los instaladores compartidos antes de la práctica\n- Define tus 3 a 5 categorías temáticas y arma tu ecuación de búsqueda\n- Exporta registros completos desde Scopus y Web of Science (100 a 500 documentos)\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-ia-para-investigacion-cientifica/", type: "link" },
            { title: "Instaladores R y RStudio (Google Drive)", url: "https://drive.google.com/drive/folders/1Cd-21wg1BKRfW50gL6t6NPmJHj-giou7?usp=sharing", type: "download" }
          ]
        },
        {
          id: "les-2-2",
          title: "Clase 5 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "CPMdpkTbNH0",
          description: "Análisis bibliométrico con R y RStudio, aplicativo Bibliometría Flow, tipos de artículos de revisión, Tree of Science y automatización del análisis con IA en Google Colab.",
          reading: "**Clase 5 — Análisis bibliométrico con R y automatización con IA (3 horas)**\n\n**Configuración técnica**\n\nInstalación secuencial de R y RStudio y configuración del directorio de trabajo para ejecutar el aplicativo «Bibliometría Flow», diseñado para consolidar y procesar datos bibliográficos.\n\n**Gestión del corpus**\n\nOptimización de las ecuaciones de búsqueda para obtener conjuntos de datos manejables, entre 100 y 500 registros, y uso de inteligencia artificial para consolidar los metadatos exportados en archivos de texto plano (TXT).\n\n**Tipos de artículos de revisión**\n\n- **Revisión sistemática:** enfocada en la evidencia disponible sobre una pregunta concreta.\n- **Revisión bibliométrica:** análisis cuantitativo de la estructura y la dinámica de un campo.\n- **Metaanálisis:** síntesis estadística de los resultados de estudios previos.\n\n**Herramientas bibliométricas**\n\nFuncionamiento del algoritmo de «Bibliometría Flow» para eliminar duplicados, realizar limpiezas de datos y generar las figuras bibliométricas estándar: producción temporal, redes de colaboración, mapas temáticos y demás visualizaciones del campo.\n\n**Calidad y formatos de salida**\n\nLas figuras deben generarse en alta resolución (300 dpi) y en formatos vectoriales (PDF) para cumplir los requisitos de las revistas de alto impacto. Igual de importante es documentar rigurosamente el proceso de filtrado de artículos.\n\n**Tree of Science (ToS)**\n\nPlataforma con respaldo científico que selecciona los artículos relevantes mediante análisis de redes de citación, como alternativa validada a la búsqueda y el cribado manual.\n\n**Automatización con IA**\n\nGoogle Colab permite automatizar el análisis de datos con comandos en lenguaje natural, generando visualizaciones de forma iterativa y asegurando la trazabilidad de todo el proceso analítico.\n\n**Interpretación crítica**\n\nLas herramientas entregan métricas y visualizaciones, pero la interpretación conceptual y teórica de los resultados es responsabilidad indelegable del investigador.\n\n**Recomendaciones:**\n- Deja instalados R y RStudio y configura el directorio de trabajo antes de ejecutar Bibliometría Flow\n- Ajusta tu ecuación de búsqueda hasta obtener un corpus de 100 a 500 registros\n- Exporta las figuras a 300 dpi y en PDF desde el primer intento\n- Documenta cada paso del filtrado de artículos para poder reportarlo\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-ia-para-investigacion-cientifica/", type: "link" },
            { title: "Instaladores R y RStudio (Google Drive)", url: "https://drive.google.com/drive/folders/1Cd-21wg1BKRfW50gL6t6NPmJHj-giou7?usp=sharing", type: "download" }
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
      description: "Una sesión en vivo de 3 horas.",
      icon: "3️⃣",
      lessons: [
        {
          id: "les-3-2",
          title: "Clase 6 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Sesión en vivo del Módulo 3. La grabación queda disponible en esta misma clase.",
          reading: "**Clase 6 — Sesión en vivo (3 horas)**\n\nSesión única del Módulo 3.\n\n**Cómo funciona esta clase:**\n- Sesión en vivo de 3 horas con trabajo práctico guiado\n- La grabación se carga en este espacio al finalizar\n- Los recursos y plantillas se publican en la pestaña Recursos\n\n**Recomendaciones:**\n- A partir de este módulo el trabajo se orienta a tu propio proyecto de investigación\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
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
