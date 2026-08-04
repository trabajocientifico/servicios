const COURSE_DATA = {
  title: "Bibliometrix en Rstudio",
  subtitle: "Domina el mapeo científico y análisis de redes de investigación",
  hours: 9,
  modules: [
    {
      id: "mod-1",
      title: "Clase 1: Introducción a Bibliometrix y preparación de bases",
      description: "Conoce Bibliometrix, RStudio Cloud y el aplicativo Bibliomerge para unificar WOS y Scopus.",
      icon: "📚",
      lessons: [
        {
          id: "les-1-1",
          title: "Entorno RStudio y consolidación con Bibliomerge",
          type: "video",
          duration: "45 min",
          videoId: "1npDXc_JPz8",
          description: "Exporta registros desde WOS y Scopus, y consolida la base con Bibliomerge en RStudio Cloud.",
          reading: "**Conceptos Fundamentales — Clase 1**\n\n1. **Bibliometrix:** Paquete construido fundamentalmente en el lenguaje **R**, orientado al análisis bibliométrico cuantitativo. Permite procesar metadatos provenientes de bases científicas y generar indicadores de producción e impacto.\n\n2. **Exportación correcta de registros:**\n   - **Web of Science (WOS):** los registros deben exportarse como **archivo de texto plano (Plain text file, .txt)** para que el flujo funcione correctamente.\n   - **Scopus:** se debe seleccionar el formato **BibTeX (.bib)** al descargar la información.\n\n3. **RStudio Cloud (Posit Cloud):** Plataforma en línea que permite trabajar con R sin instalar el entorno de programación en el computador local. Ideal para sesiones formativas y para garantizar que todos los participantes trabajen sobre el mismo entorno.\n\n4. **Interfaz de RStudio (4 cuadrantes):**\n   - Superior izquierdo: editor de scripts.\n   - Inferior izquierdo: **consola/terminal**, donde se ve la ejecución de los comandos, errores y resultados del código procesado.\n   - Superior derecho: Environment (objetos creados, datos cargados, historial).\n   - **Inferior derecho:** archivos cargados, paquetes, ayuda y **visualizaciones/gráficas (Plots)** generadas por el código.\n\n5. **Bibliomerge:** Aplicativo cuya función exclusiva es **unificar y concatenar las bases de WOS y Scopus eliminando documentos duplicados**. Al abrir su script por primera vez en RStudio, el sistema advierte que se deben **instalar las dependencias o paquetes requeridos** antes de correr el código.\n\n6. **Reducción de duplicados:** Si por ejemplo se descargan 249 documentos de Scopus y 288 de WOS, el resultado consolidado suele ser menor (ej. 340), porque el algoritmo identifica y elimina los registros duplicados presentes en ambas bases.\n\n7. **IA integrada:** Las nuevas versiones de Bibliometrix incorporan **Gemini** mediante una API gratuita, lo que permite apoyar el análisis con inteligencia artificial.",
          resources: [
            { title: "Repositorio GitHub — curso Bibliometrix RStudio", url: "https://github.com/trabajocientifico/curso-bibliometrix-rstudio", type: "link" },
            { title: "Código concatenar WOS - Scopus (Bibliomerge)", url: "https://drive.google.com/file/d/1lxFYyBYlbV3SRtSEEOczaezN-SDqMkm5/view?usp=sharing", type: "download" },
            { title: "Código Bibliometrix", url: "https://drive.google.com/file/d/1ivw_RninVqMrQgOxxgnu4OwxnOn9SkMA/view?usp=sharing", type: "download" },
            { title: "Resultados", url: "https://drive.google.com/drive/folders/1legwDNJdAUG96HNBdluWaSJPBWirojuA?usp=sharing", type: "download" },
            { title: "Presentación Sesión 1", url: "https://drive.google.com/file/d/1M6fgceKOsWpEQzUQVka-f7zZdDoawVJY/view?usp=sharing", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz Clase 1: Bibliometrix, RStudio y Bibliomerge",
        passingScore: 70,
        questions: [
          {
            question: "¿En qué lenguaje de programación está construido fundamentalmente el software Bibliometrix?",
            options: ["Python", "Java", "R", "C++"],
            correct: 2,
            explanation: "Bibliometrix está construido fundamentalmente en el lenguaje R."
          },
          {
            question: "Para que el proceso de integración funcione correctamente, ¿en qué formato específico se deben exportar los registros bibliográficos desde Web of Science (WOS)?",
            options: ["Formato BibTeX (.bib)", "Archivo de texto plano o \"Plain text file\" (.txt)", "Archivo CSV separado por comas", "Documento de Excel (.xlsx)"],
            correct: 1,
            explanation: "Los registros de WOS se deben exportar como archivo de texto plano (.txt) para que la integración funcione correctamente."
          },
          {
            question: "¿Qué formato de exportación indica el instructor que se debe seleccionar al descargar la información directamente desde Scopus?",
            options: ["BibTeX", "Texto plano (Plain text file)", "Archivo RIS", "Documento PDF"],
            correct: 0,
            explanation: "Desde Scopus se debe seleccionar el formato BibTeX al descargar los registros."
          },
          {
            question: "¿Cuál es el propósito y la principal ventaja de utilizar la plataforma R Studio Cloud (Posit Cloud) para este ejercicio?",
            options: [
              "Descargar automáticamente metadatos sin necesidad de suscripción a WOS.",
              "Evitar hacer la instalación del entorno de programación en el computador local.",
              "Generar los gráficos más rápido que un servidor local.",
              "Traducir automáticamente los artículos del inglés al español."
            ],
            correct: 1,
            explanation: "RStudio Cloud (Posit Cloud) permite trabajar sin tener que instalar el entorno de programación en el computador local."
          },
          {
            question: "En la interfaz gráfica de RStudio, ¿cuál es la función de la ventana inferior conocida como consola o terminal?",
            options: [
              "Redactar el script de código inicial.",
              "Visualizar la ejecución correcta (o errores) de los comandos y los resultados del código procesado.",
              "Mostrar el historial de objetos creados y datos cargados.",
              "Desplegar las visualizaciones gráficas finales."
            ],
            correct: 1,
            explanation: "La consola muestra la ejecución, los errores y los resultados del código procesado."
          },
          {
            question: "Durante la clase se menciona un aplicativo llamado Bibliomerge. ¿Cuál es su función exclusiva?",
            options: [
              "Exportar las tablas de resultados a Excel.",
              "Unificar y concatenar las bases de datos de WOS y Scopus, eliminando documentos duplicados.",
              "Descargar artículos en texto completo de acceso abierto (Open Access).",
              "Conectar RStudio con Google Scholar."
            ],
            correct: 1,
            explanation: "Bibliomerge se encarga exclusivamente de unificar las bases de WOS y Scopus eliminando documentos duplicados."
          },
          {
            question: "Cuando se abre por primera vez el script del aplicativo Bibliomerge en RStudio, ¿qué advertencia genera el sistema que el usuario debe resolver antes de correr el código?",
            options: [
              "Cargar los archivos en formato CSV.",
              "Crear una cuenta de GitHub.",
              "Instalar las dependencias o paquetes requeridos por el script.",
              "Reiniciar la sesión de RStudio Cloud."
            ],
            correct: 2,
            explanation: "RStudio advierte que se deben instalar las dependencias o paquetes requeridos por el script antes de ejecutarlo."
          },
          {
            question: "Según el instructor, ¿qué herramienta de Inteligencia Artificial se ha integrado recientemente a las nuevas versiones de Bibliometrix mediante una API gratuita?",
            options: ["ChatGPT", "Claude", "Gemini", "Copilot"],
            correct: 2,
            explanation: "Las nuevas versiones de Bibliometrix integran Gemini a través de una API gratuita."
          },
          {
            question: "Si un investigador descarga 249 documentos de Scopus y 288 de WOS, la consolidación final en Bibliomerge arroja un total menor (ej. 340). ¿A qué se debe esto?",
            options: [
              "El aplicativo solo procesa los primeros 100 documentos de cada base.",
              "El algoritmo identifica y elimina los registros duplicados que existen en ambas bases de datos.",
              "Se excluyen automáticamente los artículos que no están en idioma inglés.",
              "Ocurre un error de pérdida de metadatos al usar archivos .txt."
            ],
            correct: 1,
            explanation: "La diferencia se debe a que el algoritmo identifica y elimina los registros duplicados presentes en ambas bases."
          },
          {
            question: "¿En qué sección específica de RStudio se pueden visualizar los archivos cargados (datos) y las visualizaciones/gráficas (Plots) generadas por el código?",
            options: [
              "En el cuadrante superior izquierdo (Editor de código).",
              "En el cuadrante inferior izquierdo (Consola).",
              "En el cuadrante superior derecho (Environment).",
              "En el cuadrante inferior derecho."
            ],
            correct: 3,
            explanation: "Los archivos cargados y las visualizaciones (Plots) se muestran en el cuadrante inferior derecho de RStudio."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Clase 2: Scripts de análisis, Tree of Science y SciSpace",
      description: "Ejecuta los scripts de R para transformar, consolidar y analizar las bases; conoce Tree of Science, SciSpace y CiteSpace.",
      icon: "🌳",
      lessons: [
        {
          id: "les-2-1",
          title: "Flujo de scripts y herramientas de apoyo a la revisión",
          type: "video",
          duration: "60 min",
          videoId: "GAVM1ytltYs",
          description: "Aplica los tres scripts del flujo, descubre Tree of Science y la IA SciSpace para revisión de literatura.",
          reading: "**Conceptos Fundamentales — Clase 2**\n\n1. **Primer script (transformación):** Su objetivo principal es **transformar la estructura de datos que tiene Scopus para adaptarla exactamente al formato de WOS**, de modo que ambas bases puedan integrarse posteriormente.\n\n2. **Límite de descarga en WOS:** Al exportar desde Web of Science, el límite inicial de registros que se pueden descargar simultáneamente es de **500 documentos**.\n\n3. **GitHub:** Plataforma definida en la clase como una **red social de programadores para alojar y compartir repositorios de proyectos**. Allí se alojan los scripts de R utilizados en el curso (repositorio: `https://github.com/trabajocientifico/curso-bibliometrix-rstudio`).\n\n4. **Segundo script (consolidación):** Procesa los archivos de la carpeta *input* y **consolida los archivos de Scopus y WOS, identificando y eliminando los documentos duplicados** con base en el DOI y el título.\n\n5. **Tercer script (análisis):** Al ejecutarse exitosamente, **extrae métricas descriptivas de la base consolidada y genera distintos gráficos de visualización**, como el mapa global de colaboración y la nube de palabras.\n\n6. **Tree of Science (Colombia):** Plataforma algorítmica desarrollada en Colombia que **identifica y estructura la línea de investigación** agrupando la literatura en clústeres como **raíces, tronco y ramas**. Dentro de su metodología, los artículos catalogados como **\"hojas\"** representan las **investigaciones y temas emergentes** que se desprenden de la línea base.\n\n7. **SciSpace (Sace):** Herramienta de IA favorita del instructor para apoyar la construcción de documentos de revisión de literatura y enfoques de metaanálisis. Permite **agregar filtros precisos**, como el **rango temporal (ej. últimos 5 años)** y exigir documentos de **acceso abierto (Open Access)**.\n\n8. **CiteSpace:** Software de origen **chino**, muy usado en artículos de ese país para el análisis de flujos y colaboración internacional (espacialidad y temporalidad).",
          resources: [
            { title: "Repositorio GitHub — curso Bibliometrix RStudio", url: "https://github.com/trabajocientifico/curso-bibliometrix-rstudio", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "q2",
        title: "Quiz Clase 2: Scripts, Tree of Science y SciSpace",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuál es el objetivo principal del primer script de R utilizado durante el flujo de trabajo de esta sesión?",
            options: [
              "Unir de forma inmediata ambas bases de datos.",
              "Transformar la estructura de datos que tiene Scopus para adaptarla exactamente al formato de WOS.",
              "Generar los 14 gráficos de análisis bibliométrico.",
              "Importar las gráficas directamente a un documento de Word."
            ],
            correct: 1,
            explanation: "El primer script transforma la estructura de Scopus para adaptarla al formato de WOS."
          },
          {
            question: "Al momento de realizar la búsqueda y descarga en la plataforma Web of Science (WOS), ¿cuál es el límite inicial de registros que se pueden exportar simultáneamente, según lo mostrado en el video?",
            options: ["250 documentos.", "500 documentos.", "777 documentos.", "1000 documentos."],
            correct: 1,
            explanation: "El límite inicial mostrado es de 500 documentos por descarga."
          },
          {
            question: "Para compartir los códigos de R (scripts), el instructor utiliza un repositorio alojado en GitHub. ¿Cómo define él esta plataforma para explicar su utilidad?",
            options: [
              "Un motor de búsqueda de literatura científica.",
              "Un software exclusivo para análisis estadístico.",
              "Una red social de programadores para alojar y compartir repositorios de proyectos.",
              "Una base de datos indexada superior a Web of Science."
            ],
            correct: 2,
            explanation: "El instructor define GitHub como una red social de programadores para alojar y compartir repositorios de proyectos."
          },
          {
            question: "¿Qué acción específica ejecuta el segundo script al procesar los archivos de la carpeta \"input\"?",
            options: [
              "Traduce los metadatos al idioma inglés.",
              "Genera un resumen ejecutivo de los \"abstracts\".",
              "Consolida los archivos de Scopus y WOS, identificando y eliminando los documentos duplicados basándose en el DOI y el título.",
              "Extrae únicamente los documentos etiquetados como Open Access."
            ],
            correct: 2,
            explanation: "El segundo script consolida Scopus y WOS eliminando los duplicados con base en el DOI y el título."
          },
          {
            question: "¿Cuál es el resultado final tras correr de manera exitosa el tercer script presentado en la clase?",
            options: [
              "Extrae métricas descriptivas de la base consolidada y genera diferentes gráficos de visualización (como mapa global y nube de palabras).",
              "Crea la carpeta \"output\" y exporta un documento consolidado en texto plano.",
              "Transforma el archivo .bib de Scopus en un archivo CSV.",
              "Carga el entorno de Python en RStudio Cloud."
            ],
            correct: 0,
            explanation: "El tercer script extrae métricas descriptivas y genera gráficos como el mapa global y la nube de palabras."
          },
          {
            question: "El instructor recomienda una plataforma llamada Tree of Science desarrollada en Colombia. ¿Para qué sirve esta herramienta algorítmica?",
            options: [
              "Para generar gráficos de barras sobre la cantidad de publicaciones por año.",
              "Para unificar formatos de citación APA y Vancouver.",
              "Para identificar y estructurar la línea de investigación agrupando la literatura en clústeres como raíces, tronco y ramas.",
              "Para calcular el índice H de los investigadores."
            ],
            correct: 2,
            explanation: "Tree of Science agrupa la literatura en clústeres tipo raíces, tronco y ramas para estructurar la línea de investigación."
          },
          {
            question: "Dentro de la metodología del algoritmo Tree of Science, ¿qué representan específicamente los artículos catalogados como \"hojas\"?",
            options: [
              "Las investigaciones base y pioneras sobre el tema.",
              "Los artículos metodológicos descartados por el sistema.",
              "Los trabajos publicados exclusivamente en el último año calendario.",
              "Las investigaciones y temas emergentes que se desprenden de la línea base."
            ],
            correct: 3,
            explanation: "Las \"hojas\" representan las investigaciones y temas emergentes que se desprenden de la línea base."
          },
          {
            question: "¿Qué herramienta de Inteligencia Artificial (IA) menciona el instructor como su favorita para ayudar en la construcción de documentos de revisión de literatura y enfoques de metaanálisis?",
            options: ["ChatGPT-4", "Tree of Science", "SciSpace (Sace)", "Biblioshiny"],
            correct: 2,
            explanation: "El instructor menciona a SciSpace (Sace) como su IA favorita para revisión de literatura y metaanálisis."
          },
          {
            question: "Al utilizar la herramienta SciSpace para resolver dudas sobre un tema (ej. contaminación de ríos), ¿qué funcionalidad permite controlar y refinar el soporte bibliográfico de la respuesta generada?",
            options: [
              "La posibilidad de exportar a Excel únicamente en su versión de pago.",
              "La opción de agregar filtros precisos, como el rango temporal (ej. últimos 5 años) y exigir documentos de acceso abierto (Open Access).",
              "Su capacidad para borrar automáticamente artículos sin el DOI.",
              "Su integración nativa con la consola de RStudio."
            ],
            correct: 1,
            explanation: "SciSpace permite agregar filtros precisos como rango temporal y acceso abierto (Open Access)."
          },
          {
            question: "Durante la sesión, al hablar de análisis de flujos y colaboración internacional entre países (espacialidad y temporalidad), se menciona un software de origen chino frecuentemente usado en artículos de este país. ¿Cuál es su nombre?",
            options: ["VOSviewer", "Bibliometrix Core", "Posit Cloud", "CiteSpace"],
            correct: 3,
            explanation: "El software de origen chino mencionado es CiteSpace."
          }
        ]
      }
    }
  ]
};
