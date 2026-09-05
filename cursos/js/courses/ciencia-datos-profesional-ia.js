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
  title: "Ciencia de Datos Profesional con Python + IA",
  subtitle: "20 horas certificadas — formación en vivo con grabaciones disponibles en la plataforma",
  hours: 20,
  isLive: true,
  hidePromo: true,
  startDate: "2026-08-07",
  startLabel: "Inicia el viernes 7 de agosto de 2026",
  sessionsInfo: "7 sesiones en vivo de 3 horas cada una",
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1 — Fundamentos de programación en Python",
      description: "Tres sesiones en vivo de 3 horas.",
      icon: "🐍",
      lessons: [
        {
          id: "les-1-1",
          title: "Clase 1 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "-wzKTE-RvHg",
          description: "Presentación del curso, fundamentos de la IA y montaje del entorno de trabajo.",
          reading: "**Clase 1 — Presentación del curso y entorno de trabajo (3 horas)**\n\n**Objetivo del curso**\n\nIntegrar inteligencia artificial con Python para automatizar flujos de trabajo de datos, priorizando entornos profesionales locales (como VS Code) sobre soluciones en la nube para mejorar la productividad.\n\n**Estructura del programa**\n\nEl curso se organiza en cuatro módulos que cubren fundamentos de Python e IA, limpieza y estructuración de datos, visualización (gráficos estáticos e interactivos) y desarrollo de aplicaciones web (dashboards).\n\n**Fundamentos técnicos**\n\nSe aclaró que la IA no «piensa», sino que opera mediante cálculos probabilísticos y tokenización. Comprender esta teoría es esencial para escribir prompts efectivos y optimizar resultados.\n\n**Metodología**\n\nEl enfoque pedagógico busca que los estudiantes entiendan la lógica y la sintaxis de programación necesarias para interactuar con agentes de IA, con el fin de consolidar 5 o 6 proyectos en un repositorio profesional al finalizar.\n\n**Herramientas clave**\n\nSe definió la instalación de un entorno de trabajo local que incluye Python, Node.js, Visual Studio Code y agentes de IA como Freebuf y Cloud Code.",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Archivos instaladores (Python, Anaconda, VS Code)", url: "https://drive.google.com/drive/folders/1JHDuCD5D26_dEHGY3Ib5fZaJ8-Vz-DJK?usp=sharing", type: "download" }
          ]
        },
        {
          id: "les-1-2",
          title: "Clase 2 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "bFrl1qcmUF4",
          description: "Qué es la ciencia de datos, variables, tipos de datos, operadores y manejo de texto.",
          reading: "**Clase 2 — Ciencia de datos y bases de Python (3 horas)**\n\n**Definición de ciencia de datos**\n\nSe describió como una disciplina interdisciplinaria que combina sistemas de computación, matemáticas/estadística y conocimiento del negocio, enfatizando la importancia de limpiar y procesar los datos.\n\n**Algoritmos y código**\n\nSe diferenció el algoritmo (la lógica y los pasos estructurados) del código (la traducción de esa lógica a un lenguaje de programación).\n\n**Entorno de trabajo**\n\nSe introdujo Google Colab como herramienta en la nube y se establecieron buenas prácticas de codificación, como el uso de comentarios y las convenciones de nomenclatura para archivos y variables.\n\n**Variables y tipos de datos**\n\nSe explicó la declaración de variables y los tipos fundamentales: enteros (`int`), decimales (`float`), cadenas (`string`) y booleanos (`bool`).\n\n**Interacción y visualización**\n\nSe revisó el uso de la función `print` (incluyendo las F-strings para dar formato) y de `input` para hacer los programas interactivos.\n\n**Operadores**\n\nSe detallaron los operadores aritméticos, de comparación (`==`), lógicos (`and`, `or`) y de asignación para manipular datos de manera eficiente.\n\n**Manipulación de texto**\n\nSe enseñaron métodos esenciales para limpiar y procesar cadenas, como `strip()`, `split()`, `lower()`, `upper()` y `len()`.",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Archivos instaladores (Python, Anaconda, VS Code)", url: "https://drive.google.com/drive/folders/1JHDuCD5D26_dEHGY3Ib5fZaJ8-Vz-DJK?usp=sharing", type: "download" }
          ]
        },
        {
          id: "les-1-3",
          title: "Clase 3 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "Lp6gojXu0jI",
          description: "Estructuras de datos, control de flujo, funciones, librerías y ejercicio práctico en Colab.",
          reading: "**Clase 3 — Estructuras de datos, control de flujo y librerías (3 horas)**\n\n**Fundamentos y estructuras de datos**\n\nSe profundizó en cómo almacenar y gestionar múltiples valores mediante listas (flexibles y ordenables), tuplas (inmutables), diccionarios (pares clave-valor) y conjuntos (valores únicos).\n\n**Controles de flujo**\n\nSe explicaron los condicionales (`if`, `elif`, `else`) como reglas lógicas para dirigir la ejecución del código, y el uso de bucles (`for` para iterar sobre secuencias, `while` para condiciones lógicas).\n\n**Programación y gestión**\n\n- **Funciones:** creación de bloques de código reutilizables mediante `def` y `return`.\n- **Manejo de errores:** uso de `try` y `except` para gestionar excepciones y evitar interrupciones en la ejecución.\n- **Librerías:** introducción al uso de librerías externas (como Pandas, NumPy, Matplotlib y Seaborn) y diferencia entre instalarlas (`pip install`) e importarlas (`import ... as ...`).\n\n**Análisis práctico**\n\nSe realizó un ejercicio cargando un archivo de «ventas empresas» en Google Colab para practicar el filtrado de datos, la identificación de variables y el uso de bucles para extraer subconjuntos específicos (por ejemplo, por región). El archivo está disponible para descargar en la pestaña Recursos.",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Documento de trabajo de la clase (descargar)", url: "https://docs.google.com/spreadsheets/d/1D-rR5RVLnKIFmEYjvJxIuV12F0I7RSgt/edit?usp=sharing&ouid=101573209953602387656&rtpof=true&sd=true", type: "download" },
            { title: "Archivos instaladores (Python, Anaconda, VS Code)", url: "https://drive.google.com/drive/folders/1JHDuCD5D26_dEHGY3Ib5fZaJ8-Vz-DJK?usp=sharing", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Módulo 1: Fundamentos de Python",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Cuál de estas estructuras de datos de Python es INMUTABLE?",
            options: ["Lista", "Diccionario", "Tupla", "Conjunto (set)"],
            correct: 2,
            explanation: "La tupla es inmutable: una vez creada no se pueden agregar, quitar ni cambiar sus elementos. Listas, diccionarios y conjuntos sí son mutables."
          },
          {
            question: "¿Qué resultado produce `type(3 / 2)` en Python 3?",
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error de tipo"],
            correct: 1,
            explanation: "En Python 3 el operador `/` siempre devuelve un float: 3 / 2 da 1.5. Para división entera se usa `//`."
          },
          {
            question: "¿Cómo se accede al valor asociado a la clave 'edad' en el diccionario `persona`?",
            options: ["persona(edad)", "persona['edad']", "persona.edad()", "persona{edad}"],
            correct: 1,
            explanation: "Los diccionarios se acceden con corchetes y la clave: `persona['edad']`. También existe `persona.get('edad')`, que no falla si la clave no existe."
          },
          {
            question: "¿Qué imprime este código?\n\n```\nfor i in range(3):\n    print(i)\n```",
            options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
            correct: 1,
            explanation: "`range(3)` genera 0, 1 y 2: empieza en 0 y excluye el límite superior."
          },
          {
            question: "¿Para qué sirve la palabra clave `def` en Python?",
            options: [
              "Para definir una variable",
              "Para definir una función",
              "Para eliminar un objeto",
              "Para importar una librería"
            ],
            correct: 1,
            explanation: "`def` define una función. Para eliminar objetos se usa `del` y para importar librerías, `import`."
          },
          {
            question: "¿Qué hace el bloque `try / except`?",
            options: [
              "Repite un bloque de código un número fijo de veces",
              "Captura y maneja errores para que el programa no se detenga",
              "Define una clase nueva",
              "Comenta varias líneas de código"
            ],
            correct: 1,
            explanation: "`try / except` intenta ejecutar un bloque y, si ocurre una excepción, la captura para manejarla en vez de interrumpir el programa."
          },
          {
            question: "¿Cuál es el resultado de la comprensión de lista `[x * 2 for x in [1, 2, 3]]`?",
            options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "[2, 3, 4]"],
            correct: 1,
            explanation: "La comprensión recorre cada elemento y lo multiplica por 2, produciendo [2, 4, 6]."
          },
          {
            question: "En Python, ¿qué delimita un bloque de código dentro de un `if` o un `for`?",
            options: ["Las llaves { }", "El punto y coma ;", "La indentación", "Los paréntesis ( )"],
            correct: 2,
            explanation: "Python usa la indentación (sangría) para delimitar bloques; no utiliza llaves como otros lenguajes."
          },
          {
            question: "¿Cuál es la forma correcta de importar solo la función `mean` de la librería `statistics`?",
            options: [
              "import mean from statistics",
              "from statistics import mean",
              "import statistics.mean()",
              "include statistics.mean"
            ],
            correct: 1,
            explanation: "La sintaxis correcta es `from statistics import mean`. Con `import statistics` se usaría `statistics.mean()`."
          },
          {
            question: "¿Qué diferencia hay entre `=` y `==` en Python?",
            options: [
              "No hay diferencia, son equivalentes",
              "`=` asigna un valor y `==` compara si dos valores son iguales",
              "`=` compara y `==` asigna",
              "`==` solo se usa con texto"
            ],
            correct: 1,
            explanation: "`=` es el operador de asignación y `==` el de comparación, que devuelve True o False."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Módulo 2 — Análisis de datos con Python",
      description: "Estadística descriptiva, métricas y manejo de distintos formatos de datos. Dos sesiones de 3 horas.",
      icon: "📊",
      lessons: [
        {
          id: "les-2-1",
          title: "Clase 4 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "pNoIT04txJ4",
          description: "Fundamentos de procesamiento de datos: Pandas, gestión de librerías y entornos, GeoPandas y configuración de VS Code con agentes de IA.",
          reading: "**Clase 4 — Fundamentos de procesamiento de datos (3 horas)**\n\n**Fundamentos de procesamiento de datos**\n\nUso de Pandas para gestionar datos mediante DataFrames, lo que facilita la carga y manipulación de archivos como Excel, CSV y SQL. Se insistió en la importancia de utilizar rutas relativas en lugar de absolutas para asegurar la portabilidad de los proyectos de desarrollo.\n\n**Gestión de librerías y entornos**\n\n- Instalación de librerías mediante `pip install` y su importación en los scripts con `import`.\n- Uso de Anaconda para la creación de entornos separados, que permiten gestionar dependencias y evitar conflictos entre versiones.\n- Revisión de librerías clave: NumPy (operaciones numéricas), Matplotlib y Seaborn (visualización), Plotly (gráficos interactivos), Streamlit (aplicaciones web) y Scikit-learn (aprendizaje automático).\n\n**Análisis y visualización geoespacial**\n\nIntroducción a los archivos Shapefile (`.shp`) para datos espaciales y uso de la librería GeoPandas para su procesamiento y el análisis de polígonos.\n\n**Configuración e integración de IA**\n\n- Adopción de Visual Studio Code como entorno profesional para ciencia de datos, integrando agentes de inteligencia artificial para optimizar la generación de código.\n- Verificación de la instalación de las herramientas base (Python, Node, npm y el propio VS Code), además de la configuración de agentes como Claude Code, Codex y Antigravity.\n- Discusión sobre privacidad y seguridad al utilizar modelos externos para el análisis de datos y la generación de dashboards interactivos.",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Materiales de la clase (descargar)", url: "https://drive.google.com/drive/folders/1HH4BF-Ho9vi_X-rj4r2jrltSH3ZsmdbR?usp=sharing", type: "download" },
            { title: "Archivos instaladores (Python, Anaconda, VS Code)", url: "https://drive.google.com/drive/folders/1JHDuCD5D26_dEHGY3Ib5fZaJ8-Vz-DJK?usp=sharing", type: "download" }
          ]
        },
        {
          id: "les-2-2",
          title: "Clase 5 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "QbWvtzodCYs",
          description: "Gestión de datos inteligentes: automatización con agentes de IA, Pandas y GeoPandas, organización de archivos y scripts autónomos en Python.",
          reading: "**Clase 5 — Gestión de datos inteligentes (3 horas)**\n\nEsta clase, centrada en el Módulo 2: Gestión de datos inteligentes, se enfoca en la automatización de procesos técnicos mediante la integración de Python e Inteligencia Artificial.\n\n**Automatización de flujos de trabajo**\n\nUso de agentes de Inteligencia Artificial para delegar tareas de codificación, permitiendo que la IA planifique y ejecute procesos sin intervención manual constante.\n\n**Gestión y manipulación de datos**\n\nImplementación de librerías como Pandas y GeoPandas para la carga, filtrado, limpieza y análisis estadístico de diversas estructuras de datos (Excel, CSV, texto y datos geoespaciales).\n\n**Organización y control de archivos**\n\nAutomatización de tareas de mantenimiento documental, incluyendo el renombrado masivo, la organización jerárquica de archivos por tipo y búsquedas avanzadas en grandes volúmenes de datos.\n\n**Programación autónoma**\n\nGeneración de scripts en Python reutilizables, permitiendo que los procesos automatizados funcionen de manera independiente, superando la dependencia de la interfaz interactiva de la IA y optimizando el consumo de recursos.\n\n**Seguridad y permisos**\n\nConfiguración de protocolos de acceso y seguridad (cifrado de documentos PDF) para controlar las modificaciones que la IA puede realizar sobre los archivos del proyecto.\n\n**Procesamiento técnico avanzado**\n\nAplicación práctica de estas herramientas en tareas complejas, tales como la consolidación de múltiples reportes mensuales en archivos únicos, transformación de coordenadas geográficas (UTM) y la generación automatizada de documentos técnicos o propuestas de inversión.",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Materiales de la clase (descargar)", url: "https://drive.google.com/drive/folders/1YUoB72eFmh53T4w3xdPaPJ2K-M6A5ywb?usp=sharing", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Módulo 2: Análisis de datos con Python",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Cuál es la estructura de pandas diseñada para datos tabulares de dos dimensiones?",
            options: ["Series", "DataFrame", "Array", "Index"],
            correct: 1,
            explanation: "El DataFrame tiene filas y columnas (dos dimensiones). La Series es unidimensional, como una sola columna."
          },
          {
            question: "¿Qué método de pandas entrega un resumen estadístico (conteo, media, desviación, cuartiles) de las columnas numéricas?",
            options: ["df.info()", "df.head()", "df.describe()", "df.shape"],
            correct: 2,
            explanation: "`describe()` devuelve el resumen estadístico. `info()` muestra tipos y nulos, `head()` las primeras filas y `shape` las dimensiones."
          },
          {
            question: "¿Qué medida de tendencia central es MENOS sensible a los valores extremos?",
            options: ["La media", "La mediana", "La suma", "El rango"],
            correct: 1,
            explanation: "La mediana es el valor central y no se ve arrastrada por valores extremos, a diferencia de la media."
          },
          {
            question: "¿Qué función se usa para leer un archivo de Excel en pandas?",
            options: ["pd.read_csv()", "pd.read_excel()", "pd.open_xlsx()", "pd.load_excel()"],
            correct: 1,
            explanation: "`pd.read_excel()` lee archivos .xlsx y .xls. `pd.read_csv()` es para archivos de texto delimitado."
          },
          {
            question: "¿Qué hace `df.groupby('ciudad')['ventas'].mean()`?",
            options: [
              "Ordena las ventas de mayor a menor",
              "Calcula el promedio de ventas por cada ciudad",
              "Elimina las filas duplicadas por ciudad",
              "Cuenta cuántas ciudades hay"
            ],
            correct: 1,
            explanation: "Agrupa las filas por ciudad y calcula la media de la columna ventas dentro de cada grupo."
          },
          {
            question: "¿Qué representa la desviación estándar de una variable?",
            options: [
              "El valor más frecuente",
              "Qué tan dispersos están los datos respecto a la media",
              "La diferencia entre el máximo y el mínimo",
              "El número total de registros"
            ],
            correct: 1,
            explanation: "La desviación estándar mide la dispersión promedio de los datos alrededor de la media. El rango es máximo menos mínimo y la moda es el valor más frecuente."
          },
          {
            question: "Un shapefile (.shp) se usa para almacenar:",
            options: [
              "Datos tabulares sin ubicación",
              "Datos geográficos vectoriales (puntos, líneas y polígonos)",
              "Imágenes satelitales comprimidas",
              "Modelos de machine learning entrenados"
            ],
            correct: 1,
            explanation: "El shapefile guarda geometrías vectoriales con sus atributos. En Python se trabaja con GeoPandas, que lo carga como GeoDataFrame."
          },
          {
            question: "¿Cuál es la principal ventaja del formato JSON para intercambiar datos?",
            options: [
              "Solo permite datos numéricos",
              "Maneja estructuras anidadas y es legible tanto por humanos como por máquinas",
              "Comprime los datos automáticamente",
              "Únicamente lo pueden leer bases de datos"
            ],
            correct: 1,
            explanation: "JSON representa estructuras jerárquicas (objetos y listas anidadas) en texto legible, por eso es el estándar en APIs web."
          },
          {
            question: "En pandas, ¿qué método usarías para detectar valores faltantes en un DataFrame?",
            options: ["df.isnull().sum()", "df.drop()", "df.sort_values()", "df.rename()"],
            correct: 0,
            explanation: "`isnull()` marca los valores nulos y `.sum()` los cuenta por columna. `dropna()` los elimina y `fillna()` los rellena."
          },
          {
            question: "¿Qué operación combina dos DataFrames usando una columna en común, como un JOIN de SQL?",
            options: ["pd.concat()", "pd.merge()", "df.append()", "df.pivot()"],
            correct: 1,
            explanation: "`pd.merge()` une por una o más columnas llave. `concat()` apila DataFrames y `pivot()` reorganiza filas en columnas."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Módulo 3 — Visualización gráfica y dashboards",
      description: "Gráficos estadísticos, buenas prácticas visuales y tableros. Una sesión de 3 horas.",
      icon: "📈",
      lessons: [
        {
          id: "les-3-1",
          title: "Clase 6 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "meoCiPgivLs",
          description: "Limpieza automatizada de datos, reportes por ciudad y categoría, y visualización con Matplotlib, Seaborn y Plotly apoyada en IA.",
          reading: "**Clase 6 — Limpieza, reportes y visualización gráfica (3 horas)**\n\n**Limpieza de datos automatizada**\n\nSe implementó un proceso de seis pasos mediante Python para normalizar datos, incluyendo la eliminación de duplicados, la corrección de tipos de datos, el tratamiento de valores nulos y el filtrado de errores, enfatizando siempre la validación humana sobre la automatización.\n\n**Gestión eficiente de reportes**\n\nSe demostró la creación de reportes automatizados divididos por ciudades y categorías, optimizando la generación de archivos para flujos de trabajo recurrentes.\n\n**Visualización inteligente con Python**\n\nSe profundizó en el uso de bibliotecas clave como Matplotlib, Seaborn y Plotly, aprendiendo a crear desde gráficos básicos (barras, líneas, histogramas) hasta visualizaciones avanzadas como diagramas de Sankey, mapas de calor, gráficos de radar y gráficos de violín.\n\n**Optimización del diseño visual**\n\nSe discutieron mejores prácticas para la presentación de gráficos, tales como el uso de alta resolución (300 DPI), la eliminación de elementos decorativos innecesarios (grillas o marcos excesivos) y la personalización de estilos para mejorar la claridad y el impacto profesional.\n\n**Entornos de desarrollo**\n\nSe compararon herramientas de ejecución, destacando a Visual Studio Code como la opción más robusta y eficiente para flujos de trabajo de ciencia de datos, superando en fluidez a otras opciones de prototipado.\n\n**Uso avanzado de IA**\n\nSe exploró la integración de IA para generar gráficos complejos a partir de imágenes de referencia, la creación de subplots para análisis integrales y la capacidad de iterar sobre el diseño de los gráficos mediante prompts directos.\n\n**Próximos pasos clave**\n\nDescargar los archivos específicos de las diapositivas de los módulos 2 y 3, ejecutar los scripts de limpieza y de análisis descriptivo, y comenzar a explorar la creación de dashboards para la próxima sesión.\n\n**Recomendaciones:**\n- Al terminar el módulo presenta el quiz de 10 preguntas (20 minutos)",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Módulo 3: Visualización y dashboards",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Qué gráfico es el más adecuado para mostrar la relación entre DOS variables numéricas?",
            options: ["Gráfico de torta", "Diagrama de dispersión", "Gráfico de barras apiladas", "Mapa de calor de correlación"],
            correct: 1,
            explanation: "El diagrama de dispersión (scatter plot) ubica cada observación según sus dos variables numéricas y revela la relación entre ellas."
          },
          {
            question: "¿Qué gráfico usarías para comparar una métrica entre varias categorías?",
            options: ["Gráfico de barras", "Histograma", "Gráfico de líneas", "Diagrama de caja"],
            correct: 0,
            explanation: "El gráfico de barras compara magnitudes entre categorías. El histograma muestra la distribución de una variable numérica."
          },
          {
            question: "¿Qué muestra un histograma?",
            options: [
              "La evolución de una variable en el tiempo",
              "La distribución de frecuencias de una variable numérica",
              "La proporción de cada categoría sobre el total",
              "La correlación entre dos variables"
            ],
            correct: 1,
            explanation: "El histograma agrupa los valores en intervalos y muestra cuántas observaciones caen en cada uno, revelando la forma de la distribución."
          },
          {
            question: "¿Cuál es la mejor opción para mostrar la evolución de una variable a lo largo del tiempo?",
            options: ["Gráfico de torta", "Gráfico de líneas", "Diagrama de dispersión", "Gráfico de barras horizontales"],
            correct: 1,
            explanation: "El gráfico de líneas conecta los puntos en orden temporal y hace visible la tendencia."
          },
          {
            question: "¿Por qué se recomienda evitar los gráficos de torta con muchas categorías?",
            options: [
              "Porque no se pueden hacer en Python",
              "Porque el ojo humano compara ángulos con dificultad y las diferencias pequeñas se vuelven ilegibles",
              "Porque siempre requieren datos negativos",
              "Porque no admiten colores"
            ],
            correct: 1,
            explanation: "Comparar ángulos es menos preciso que comparar longitudes; con muchas categorías, una barra ordenada comunica mejor."
          },
          {
            question: "¿Qué problema genera truncar el eje Y de un gráfico de barras (que no empiece en cero)?",
            options: [
              "Ninguno, es la práctica recomendada",
              "Exagera visualmente las diferencias y puede inducir a error",
              "Impide poner leyendas",
              "Obliga a usar escala logarítmica"
            ],
            correct: 1,
            explanation: "En barras la longitud codifica la magnitud; cortar el eje distorsiona esa proporción y engaña al lector."
          },
          {
            question: "¿Qué información resume un diagrama de caja (boxplot)?",
            options: [
              "La media y la moda únicamente",
              "Mediana, cuartiles, rango y valores atípicos",
              "La correlación entre dos variables",
              "La frecuencia acumulada"
            ],
            correct: 1,
            explanation: "El boxplot muestra la mediana, el rango intercuartílico, los bigotes y los puntos atípicos de la distribución."
          },
          {
            question: "¿Qué característica define principalmente a un buen dashboard?",
            options: [
              "Incluir la mayor cantidad posible de gráficos",
              "Responder preguntas clave de forma clara, con los indicadores más importantes visibles de entrada",
              "Usar la mayor variedad posible de colores",
              "Mostrar siempre las tablas completas de datos"
            ],
            correct: 1,
            explanation: "Un dashboard es una herramienta de decisión: prioriza lo esencial y lo hace legible de un vistazo, no acumula gráficos."
          },
          {
            question: "¿Qué es un KPI en el contexto de un tablero de datos?",
            options: [
              "Un tipo de gráfico interactivo",
              "Un indicador clave que mide el desempeño frente a un objetivo",
              "Un formato de archivo de datos",
              "Una librería de visualización de Python"
            ],
            correct: 1,
            explanation: "KPI (Key Performance Indicator) es una métrica seleccionada por su relevancia para evaluar el cumplimiento de un objetivo."
          },
          {
            question: "¿Cuál de estas librerías de Python permite crear gráficos INTERACTIVOS para la web?",
            options: ["Matplotlib", "Plotly", "NumPy", "Scikit-learn"],
            correct: 1,
            explanation: "Plotly genera gráficos interactivos con zoom y tooltips. Matplotlib produce gráficos estáticos; NumPy y Scikit-learn no son de visualización."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Módulo 4 — Aplicaciones web de datos con Streamlit y GitHub Pages",
      description: "Publicación de tu proyecto de datos en la web. Sesión final de 3 horas.",
      icon: "🚀",
      lessons: [
        {
          id: "les-4-1",
          title: "Clase 7 — Sesión en vivo (3 horas)",
          type: "video",
          duration: "3 horas",
          videoId: "8HADJUmED_M",
          description: "Sesión de cierre: publicación de aplicaciones web con GitHub Pages y Streamlit, planificación previa con IA y versionamiento profesional.",
          reading: "**Clase 7 — Aplicaciones web de datos y cierre del curso (3 horas)**\n\n**Cierre del ciclo**\n\nSe concluyó el séptimo y último encuentro del curso, completando 21 horas de instrucción. La plataforma de aprendizaje permanecerá disponible hasta febrero del próximo año.\n\n**Rutas de despliegue web**\n\nSe presentaron dos metodologías para crear y publicar aplicaciones web: GitHub Pages, con HTML, JavaScript y CSS para interfaces gráficas; y Streamlit, framework basado en Python, ideal para crear aplicaciones de datos y cuadros de mando interactivos de forma rápida.\n\n**Proyectos desarrollados**\n\nConvertidor de unidades: aplicación para convertir grados Celsius, Fahrenheit y Kelvin, con un diseño enfocado en la intuición y la facilidad de uso.\n\nAnálisis de datos: herramienta para realizar regresiones lineales (simples o múltiples) cargando archivos CSV o Excel, capaz de mostrar métricas (RMSE, MAE), generar gráficos de residuos y exportar informes en PDF.\n\n**Estrategia de desarrollo**\n\nSe enfatizó la importancia de realizar una etapa de planificación previa a la ejecución del código con la IA; esto ayuda a optimizar el consumo de tokens, reducir costos y mejorar la estructura del proyecto.\n\n**Gestión y versionamiento**\n\nSe reforzó el uso de GitHub como repositorio profesional y gestor de versiones, explicando procesos como la configuración de «Pages» para hacer públicos los aplicativos y la iteración continua de archivos (como el README).\n\n**Próximos pasos**\n\nSe anunció un taller sobre fundamentos de Python programado para el 7 de octubre y la continuidad del grupo de WhatsApp para soporte y seguimiento.\n\n**Después de esta clase:**\n- Presenta el quiz del módulo (10 preguntas, 20 minutos)\n- Al aprobar los 4 quizzes se genera tu certificado de 20 horas",
          resources: [
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-profesional-ciencia-de-datos/", type: "link" },
            { title: "Documentación de Streamlit", url: "https://docs.streamlit.io/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Módulo 4: Streamlit y GitHub Pages",
        passingScore: 70,
        timeLimit: 20,
        questions: [
          {
            question: "¿Qué es Streamlit?",
            options: [
              "Una base de datos para proyectos de ciencia de datos",
              "Una librería de Python para crear aplicaciones web de datos sin escribir HTML ni JavaScript",
              "Un editor de código como VS Code",
              "Un servicio de almacenamiento en la nube"
            ],
            correct: 1,
            explanation: "Streamlit convierte scripts de Python en aplicaciones web interactivas, sin necesidad de programar el frontend."
          },
          {
            question: "¿Con qué comando se ejecuta localmente una aplicación de Streamlit?",
            options: ["python app.py", "streamlit run app.py", "pip install app.py", "streamlit start"],
            correct: 1,
            explanation: "El comando es `streamlit run app.py`, que levanta un servidor local y abre la app en el navegador."
          },
          {
            question: "¿Qué ocurre en Streamlit cada vez que el usuario interactúa con un widget?",
            options: [
              "Solo se actualiza ese widget",
              "El script se vuelve a ejecutar completo de arriba a abajo",
              "La aplicación se reinicia y pierde la conexión",
              "Se recarga la página manualmente"
            ],
            correct: 1,
            explanation: "Streamlit re-ejecuta todo el script en cada interacción. Por eso se usan la caché y `session_state` para no repetir trabajo costoso."
          },
          {
            question: "¿Para qué sirve el decorador `@st.cache_data`?",
            options: [
              "Para ocultar datos sensibles",
              "Para guardar en caché el resultado de una función y no recalcularlo en cada ejecución",
              "Para exportar los datos a Excel",
              "Para conectar la app con una base de datos"
            ],
            correct: 1,
            explanation: "Guarda el resultado de funciones costosas (como cargar un dataset) y lo reutiliza mientras no cambien sus parámetros."
          },
          {
            question: "¿Qué es un repositorio en Git?",
            options: [
              "Una carpeta de proyecto con el historial completo de cambios versionado",
              "Un tipo de gráfico interactivo",
              "Una base de datos relacional",
              "Un formato de archivo comprimido"
            ],
            correct: 0,
            explanation: "El repositorio contiene los archivos del proyecto y todo su historial de versiones, lo que permite volver atrás y colaborar."
          },
          {
            question: "¿Cuál es el orden correcto para subir cambios locales a GitHub?",
            options: [
              "git push → git commit → git add",
              "git add → git commit → git push",
              "git commit → git add → git push",
              "git clone → git push → git add"
            ],
            correct: 1,
            explanation: "Primero se preparan los cambios (`add`), luego se confirman con un mensaje (`commit`) y finalmente se envían al remoto (`push`)."
          },
          {
            question: "¿Qué tipo de contenido puede publicar GitHub Pages?",
            options: [
              "Sitios estáticos (HTML, CSS y JavaScript)",
              "Aplicaciones con servidor y base de datos",
              "Únicamente notebooks de Jupyter",
              "Solo archivos PDF"
            ],
            correct: 0,
            explanation: "GitHub Pages sirve sitios estáticos. Una app de Streamlit necesita ejecutar Python, por eso va en Streamlit Community Cloud u otro servicio con servidor."
          },
          {
            question: "¿Para qué sirve el archivo `requirements.txt` al desplegar una aplicación?",
            options: [
              "Para describir el proyecto a los usuarios",
              "Para declarar las librerías y versiones que la aplicación necesita instalar",
              "Para guardar las credenciales de acceso",
              "Para configurar el color de la interfaz"
            ],
            correct: 1,
            explanation: "El servicio de despliegue lee `requirements.txt` e instala esas dependencias para reproducir tu entorno."
          },
          {
            question: "¿Cuál es la práctica correcta con las contraseñas y claves de API en un repositorio público?",
            options: [
              "Escribirlas directamente en el código para que no se pierdan",
              "Guardarlas fuera del repositorio, como variables de entorno o secretos del servicio",
              "Publicarlas en el archivo README",
              "Subirlas en un archivo de texto dentro del repositorio"
            ],
            correct: 1,
            explanation: "Las credenciales nunca se suben al repositorio: se manejan como variables de entorno o secretos, y se excluyen con `.gitignore`."
          },
          {
            question: "¿Qué función de Streamlit muestra un DataFrame como tabla interactiva en la aplicación?",
            options: ["st.print()", "st.dataframe()", "st.table_view()", "st.show()"],
            correct: 1,
            explanation: "`st.dataframe()` muestra la tabla con scroll y ordenamiento. `st.table()` la muestra estática."
          }
        ]
      }
    }
  ]
};
