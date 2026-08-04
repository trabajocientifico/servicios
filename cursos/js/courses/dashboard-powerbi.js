const COURSE_DATA = {
  title: "Dashboard con Power BI",
  subtitle: "Domina Power BI y crea dashboards profesionales para la toma de decisiones",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Introduccion a Power BI",
      description: "Conoce Power BI desde cero: que es, como funciona y como conectar tus primeras fuentes de datos.",
      icon: "📊",
      lessons: [
        {
          id: "les-1-1",
          title: "Que es Power BI y por que usarlo",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Descubre que es Power BI, sus componentes principales y por que es la herramienta lider en inteligencia de negocios.",
          reading: "Power BI es la plataforma de Business Intelligence de Microsoft que permite transformar datos en informacion visual e interactiva para la toma de decisiones.\n\n**Componentes de Power BI:**\n- Power BI Desktop: aplicacion de escritorio para crear reportes\n- Power BI Service: plataforma en la nube para compartir\n- Power BI Mobile: acceso desde dispositivos moviles\n- Power BI Embedded: integracion en aplicaciones propias\n\n**Ventajas de Power BI:**\n- Interfaz intuitiva de arrastrar y soltar\n- Conexion a cientos de fuentes de datos\n- Actualizacion automatica de datos\n- Colaboracion en tiempo real\n- Version gratuita con funcionalidades completas\n\n**Casos de uso empresarial:**\n- Reportes financieros y de ventas\n- Analisis de recursos humanos\n- Monitoreo de operaciones\n- KPIs ejecutivos en tiempo real",
          resources: [
            { title: "Descargar Power BI Desktop", url: "https://powerbi.microsoft.com/desktop/", type: "download" },
            { title: "Documentacion oficial de Power BI", url: "https://learn.microsoft.com/power-bi/", type: "link" }
          ]
        },
        {
          id: "les-1-2",
          title: "Interfaz y primeros pasos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Recorre la interfaz de Power BI Desktop, conoce sus paneles principales y crea tu primer reporte basico.",
          reading: "Power BI Desktop tiene una interfaz diseñada para ser intuitiva pero potente. Conocerla bien es fundamental para trabajar de forma eficiente.\n\n**Elementos de la interfaz:**\n- Cinta de opciones: herramientas organizadas por pestañas\n- Panel de visualizaciones: galeria de graficos disponibles\n- Panel de campos: lista de tablas y columnas\n- Panel de filtros: filtros a nivel de visual, pagina y reporte\n- Canvas: area de diseño donde colocas visualizaciones\n\n**Vistas principales:**\n- Vista de informe: diseño de dashboards\n- Vista de datos: explorar los datos en formato tabla\n- Vista de modelo: relaciones entre tablas\n\n**Primer reporte:**\n- Importar un archivo Excel o CSV\n- Arrastrar campos al canvas\n- Elegir una visualizacion\n- Agregar titulo y formato basico",
          resources: [
            { title: "Tutorial interactivo de Power BI", url: "https://learn.microsoft.com/power-bi/fundamentals/", type: "link" },
            { title: "Dataset de practica (Excel)", url: "#", type: "download" },
            { title: "Mapa de la interfaz de Power BI", url: "#", type: "article" }
          ]
        },
        {
          id: "les-1-3",
          title: "Conexion a fuentes de datos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a conectar Power BI con multiples fuentes de datos: Excel, CSV, bases de datos SQL, APIs y servicios en la nube.",
          reading: "Power BI puede conectarse a cientos de fuentes de datos diferentes, desde archivos locales hasta servicios en la nube y bases de datos empresariales.\n\n**Fuentes de datos comunes:**\n- Archivos: Excel, CSV, JSON, XML\n- Bases de datos: SQL Server, MySQL, PostgreSQL, Oracle\n- Servicios en la nube: Azure, Google Analytics, Salesforce\n- Servicios web: APIs REST, OData\n- Otros: SharePoint, carpetas de archivos\n\n**Modos de conexion:**\n- Importar: copia los datos a Power BI (mas rapido)\n- DirectQuery: consulta en tiempo real (datos siempre actuales)\n- Conexion en vivo: para modelos de Analysis Services\n\n**Buenas practicas:**\n- Seleccionar solo las columnas necesarias\n- Filtrar datos desde el origen cuando sea posible\n- Documentar las fuentes de datos utilizadas\n- Configurar la actualizacion programada",
          resources: [
            { title: "Lista completa de conectores", url: "https://learn.microsoft.com/power-bi/connect-data/", type: "link" },
            { title: "Guia de conexion a SQL Server", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Modulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es el componente de Power BI que se usa para crear reportes en el escritorio?",
            options: [
              "Power BI Service",
              "Power BI Mobile",
              "Power BI Desktop",
              "Power BI Embedded"
            ],
            correct: 2,
            explanation: "Power BI Desktop es la aplicacion de escritorio donde se crean y diseñan los reportes antes de publicarlos en el servicio en la nube."
          },
          {
            question: "¿Que modo de conexion permite ver datos siempre actualizados sin importarlos?",
            options: [
              "Importar",
              "DirectQuery",
              "Exportar",
              "Cache local"
            ],
            correct: 1,
            explanation: "DirectQuery consulta los datos directamente desde la fuente original cada vez que se interactua con el reporte, asegurando datos siempre actuales."
          },
          {
            question: "¿Que panel de Power BI muestra la galeria de graficos disponibles?",
            options: [
              "Panel de campos",
              "Panel de filtros",
              "Panel de visualizaciones",
              "Panel de formato"
            ],
            correct: 2,
            explanation: "El panel de visualizaciones contiene la galeria de todos los tipos de graficos y visualizaciones disponibles para usar en el reporte."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Modelado de Datos y DAX",
      description: "Construye modelos de datos robustos y aprende el lenguaje DAX para crear calculos avanzados.",
      icon: "🧮",
      lessons: [
        {
          id: "les-2-1",
          title: "Modelo de datos relacional",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Diseña un modelo de datos relacional en Power BI: tablas de hechos, dimensiones y relaciones.",
          reading: "Un modelo de datos bien diseñado es la base de cualquier dashboard eficiente. Power BI utiliza un modelo relacional similar al de bases de datos pero optimizado para analisis.\n\n**Conceptos fundamentales:**\n- Tablas de hechos: contienen medidas y transacciones (ventas, pedidos)\n- Tablas de dimensiones: contienen atributos descriptivos (productos, clientes, fechas)\n- Modelo estrella: una tabla de hechos central rodeada de dimensiones\n\n**Relaciones:**\n- Uno a muchos (1:N): la mas comun en Power BI\n- Cardinalidad y direccion del filtro cruzado\n- Relaciones activas vs inactivas\n- Tablas puente para relaciones muchos a muchos\n\n**Buenas practicas:**\n- Crear una tabla de calendario (calendario DAX)\n- Evitar relaciones bidireccionales innecesarias\n- Nombrar tablas y columnas de forma descriptiva\n- Ocultar columnas de clave foranea del reporte",
          resources: [
            { title: "Guia de modelado en Power BI", url: "https://learn.microsoft.com/power-bi/transform-model/", type: "link" },
            { title: "Plantilla de modelo estrella", url: "#", type: "download" },
            { title: "Ejercicio practico de modelado", url: "#", type: "article" }
          ]
        },
        {
          id: "les-2-2",
          title: "Formulas DAX esenciales",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Domina las formulas DAX fundamentales: SUM, AVERAGE, COUNT, CALCULATE, FILTER y mas.",
          reading: "DAX (Data Analysis Expressions) es el lenguaje de formulas de Power BI que permite crear calculos personalizados y medidas avanzadas.\n\n**Funciones de agregacion:**\n- SUM(), AVERAGE(), MIN(), MAX()\n- COUNT(), COUNTA(), DISTINCTCOUNT()\n- SUMX(), AVERAGEX() (iteradores)\n\n**Funciones de filtro:**\n- CALCULATE(): modifica el contexto de filtro\n- FILTER(): filtra tablas con condiciones\n- ALL(): elimina filtros\n- ALLEXCEPT(): mantiene filtros especificos\n- REMOVEFILTERS(): remueve filtros\n\n**Funciones de texto y fecha:**\n- FORMAT(), CONCATENATE(), LEFT(), RIGHT()\n- YEAR(), MONTH(), TODAY(), DATEDIFF()\n- DATEADD(), SAMEPERIODLASTYEAR()\n\n**Contexto de evaluacion:**\n- Contexto de fila: se evalua fila por fila\n- Contexto de filtro: filtros aplicados por el usuario\n- Transicion de contexto con CALCULATE()",
          resources: [
            { title: "Referencia completa de DAX", url: "https://learn.microsoft.com/dax/", type: "link" },
            { title: "Ejercicios de DAX", url: "#", type: "notebook" },
            { title: "Cheat Sheet de DAX", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-3",
          title: "Medidas calculadas y KPIs",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea medidas calculadas, columnas calculadas y KPIs profesionales con DAX para tus dashboards.",
          reading: "Las medidas calculadas son el corazon de los analisis en Power BI. A diferencia de las columnas calculadas, se evaluan en tiempo real segun el contexto.\n\n**Medidas vs Columnas calculadas:**\n- Medidas: se calculan dinamicamente segun filtros (mejor rendimiento)\n- Columnas calculadas: se calculan al cargar datos (almacenadas en memoria)\n- Regla general: prefiere medidas sobre columnas calculadas\n\n**KPIs esenciales:**\n- Ventas totales: SUM(Ventas[Monto])\n- Crecimiento porcentual: comparacion con periodo anterior\n- Margen de ganancia: (Ingresos - Costos) / Ingresos\n- Tasa de conversion: Conversiones / Total de oportunidades\n\n**Medidas de inteligencia temporal:**\n- Acumulado del año (YTD): TOTALYTD()\n- Mismo periodo año anterior: SAMEPERIODLASTYEAR()\n- Media movil: AVERAGEX() con DATESINPERIOD()\n- Variacion porcentual interanual",
          resources: [
            { title: "Notebook: Medidas y KPIs", url: "#", type: "notebook" },
            { title: "Plantilla de KPIs empresariales", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Modulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tipo de tabla contiene las transacciones y medidas en un modelo estrella?",
            options: [
              "Tabla de dimensiones",
              "Tabla de hechos",
              "Tabla de calendario",
              "Tabla auxiliar"
            ],
            correct: 1,
            explanation: "La tabla de hechos es la tabla central del modelo estrella y contiene las transacciones, medidas y metricas del negocio."
          },
          {
            question: "¿Que funcion DAX se usa para modificar el contexto de filtro?",
            options: [
              "SUM()",
              "FILTER()",
              "CALCULATE()",
              "ALL()"
            ],
            correct: 2,
            explanation: "CALCULATE() es la funcion DAX mas importante, ya que permite modificar el contexto de filtro en el que se evalua una expresion."
          },
          {
            question: "¿Cual es la diferencia principal entre una medida y una columna calculada?",
            options: [
              "Las medidas usan DAX y las columnas no",
              "Las columnas calculadas se evaluan al cargar datos, las medidas se calculan dinamicamente",
              "No hay diferencia, son lo mismo",
              "Las medidas solo funcionan con numeros"
            ],
            correct: 1,
            explanation: "Las columnas calculadas se computan al cargar los datos y se almacenan en memoria, mientras que las medidas se calculan dinamicamente segun los filtros aplicados."
          },
          {
            question: "¿Que funcion DAX calcula el acumulado del año hasta la fecha (YTD)?",
            options: [
              "SUMYTD()",
              "TOTALYTD()",
              "YEARTODATE()",
              "CUMULATIVE()"
            ],
            correct: 1,
            explanation: "TOTALYTD() calcula el valor acumulado desde el inicio del año hasta la fecha actual dentro del contexto del filtro."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Visualizaciones y Diseno",
      description: "Domina los tipos de visualizaciones de Power BI y aprende principios de diseño para dashboards efectivos.",
      icon: "🎨",
      lessons: [
        {
          id: "les-3-1",
          title: "Tipos de visualizaciones en Power BI",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Explora todos los tipos de visualizaciones disponibles en Power BI y aprende cuando usar cada una.",
          reading: "Power BI ofrece una amplia galeria de visualizaciones nativas y la posibilidad de importar visualizaciones personalizadas desde AppSource.\n\n**Visualizaciones basicas:**\n- Graficos de barras y columnas: comparaciones entre categorias\n- Graficos de lineas: tendencias en el tiempo\n- Graficos de areas: tendencias con volumen\n- Graficos circulares y de dona: proporciones del total\n\n**Visualizaciones avanzadas:**\n- Treemaps: jerarquias y proporciones\n- Graficos de embudo: procesos con etapas\n- Graficos de cascada: variaciones acumuladas\n- Diagramas de dispersion: relaciones entre variables\n- Mapas: datos geograficos\n\n**Visualizaciones especiales:**\n- Tarjetas (Cards): KPIs individuales\n- Tablas y matrices: datos detallados\n- Segmentadores (Slicers): filtros interactivos\n- Indicadores (Gauge): progreso hacia metas\n- Visualizaciones de AppSource: personalizadas por la comunidad",
          resources: [
            { title: "Galeria de visualizaciones de Power BI", url: "https://learn.microsoft.com/power-bi/visuals/", type: "link" },
            { title: "AppSource: visualizaciones personalizadas", url: "https://appsource.microsoft.com/", type: "link" },
            { title: "Guia: que grafico elegir", url: "#", type: "article" }
          ]
        },
        {
          id: "les-3-2",
          title: "Diseno de dashboards efectivos",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica principios de diseño visual para crear dashboards claros, atractivos y faciles de interpretar.",
          reading: "Un dashboard bien diseñado comunica informacion de manera inmediata. El diseño no es solo estetica, es funcionalidad.\n\n**Principios de diseño:**\n- Jerarquia visual: guiar la mirada del usuario\n- Regla del tercio: distribucion equilibrada de elementos\n- Menos es mas: eliminar elementos innecesarios\n- Consistencia: colores, fuentes y estilos uniformes\n\n**Layout recomendado:**\n- Fila superior: KPIs principales en tarjetas\n- Zona central: graficos principales\n- Zona inferior: tablas de detalle y filtros\n- Navegacion clara entre paginas del reporte\n\n**Paleta de colores:**\n- Maximo 5-7 colores en un dashboard\n- Colores corporativos como base\n- Usar temas de Power BI para consistencia\n- Contraste adecuado para legibilidad\n\n**Tipografia y texto:**\n- Titulos descriptivos y concisos\n- Subtitulos para contexto adicional\n- Tamaños jerarquicos: titulo > subtitulo > etiquetas",
          resources: [
            { title: "Plantillas de dashboards profesionales", url: "#", type: "download" },
            { title: "Guia de diseño de Power BI", url: "#", type: "article" }
          ]
        },
        {
          id: "les-3-3",
          title: "Interactividad y filtros dinamicos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura interacciones entre visualizaciones, filtros dinamicos, drill-down y tooltips personalizados.",
          reading: "La interactividad es lo que diferencia un dashboard de un reporte estatico. Power BI ofrece multiples mecanismos para que el usuario explore los datos.\n\n**Interacciones entre visualizaciones:**\n- Cross-filtering: un grafico filtra a los demas\n- Cross-highlighting: resalta datos relacionados\n- Editar interacciones: personalizar comportamiento\n- Desactivar interacciones entre visualizaciones especificas\n\n**Filtros dinamicos:**\n- Segmentadores (Slicers): fechas, categorias, rangos\n- Filtros de pagina y de reporte\n- Filtros avanzados con condiciones (Top N, Basico, Avanzado)\n- Marcadores (Bookmarks) para estados guardados\n\n**Navegacion avanzada:**\n- Drill-down: explorar jerarquias de datos\n- Drill-through: navegar a paginas de detalle\n- Tooltips personalizados: informacion adicional al hover\n- Botones de navegacion entre paginas",
          resources: [
            { title: "Tutorial de interactividad en Power BI", url: "#", type: "article" },
            { title: "Video: Drill-down y Drill-through", url: "#", type: "link" },
            { title: "Ejemplos de tooltips personalizados", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Modulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tipo de visualizacion es ideal para mostrar un KPI individual como el total de ventas?",
            options: [
              "Grafico de barras",
              "Tarjeta (Card)",
              "Grafico de lineas",
              "Tabla"
            ],
            correct: 1,
            explanation: "Las tarjetas (Cards) son ideales para mostrar un unico valor destacado como un KPI, ya que presentan el numero de forma prominente y clara."
          },
          {
            question: "¿Que tecnica permite navegar de un resumen a una pagina de detalle al hacer clic?",
            options: [
              "Cross-filtering",
              "Bookmark",
              "Drill-through",
              "Tooltip"
            ],
            correct: 2,
            explanation: "Drill-through permite al usuario hacer clic derecho en un dato para navegar a una pagina de detalle con informacion especifica de ese elemento."
          },
          {
            question: "¿Cuantos colores se recomiendan como maximo en un dashboard?",
            options: [
              "2-3 colores",
              "5-7 colores",
              "10-15 colores",
              "Sin limite"
            ],
            correct: 1,
            explanation: "Se recomienda usar entre 5 y 7 colores como maximo en un dashboard para mantener la claridad visual y evitar confundir al usuario."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Power Query y Transformacion",
      description: "Domina Power Query para extraer, transformar y cargar datos de cualquier fuente de forma automatizada.",
      icon: "🔄",
      lessons: [
        {
          id: "les-4-1",
          title: "Editor de Power Query",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conoce el editor de Power Query, su interfaz y las operaciones basicas de transformacion de datos.",
          reading: "Power Query es el motor ETL (Extract, Transform, Load) integrado en Power BI que permite preparar los datos antes de analizarlos.\n\n**Interfaz de Power Query:**\n- Panel de consultas: lista de tablas y transformaciones\n- Vista previa de datos: muestra las primeras filas\n- Pasos aplicados: historial de transformaciones\n- Barra de formulas: lenguaje M subyacente\n\n**Operaciones basicas:**\n- Seleccionar y eliminar columnas\n- Cambiar tipos de datos\n- Renombrar columnas y tablas\n- Reordenar columnas\n- Promover encabezados\n\n**Lenguaje M:**\n- Power Query usa el lenguaje M internamente\n- Cada paso genera una expresion M automaticamente\n- Se puede editar directamente en el editor avanzado\n- Funciones personalizadas para transformaciones complejas",
          resources: [
            { title: "Documentacion de Power Query", url: "https://learn.microsoft.com/power-query/", type: "link" },
            { title: "Ejercicio: primeras transformaciones", url: "#", type: "download" },
            { title: "Referencia del lenguaje M", url: "https://learn.microsoft.com/powerquery-m/", type: "link" }
          ]
        },
        {
          id: "les-4-2",
          title: "Transformaciones y limpieza de datos",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica transformaciones avanzadas: combinar tablas, pivotar datos, manejar errores y limpiar datos sucios.",
          reading: "La limpieza y transformacion de datos es donde se invierte la mayor parte del tiempo en cualquier proyecto de BI. Power Query hace este proceso visual y repetible.\n\n**Transformaciones de texto:**\n- Mayusculas, minusculas, titulo\n- Dividir columnas por delimitador o posicion\n- Extraer texto: primeros caracteres, patron\n- Reemplazar valores y errores\n\n**Combinar datos:**\n- Append (apilar): unir tablas con misma estructura\n- Merge (combinar): JOIN entre tablas por clave comun\n- Tipos de merge: Inner, Left, Right, Full, Anti\n- Combinar archivos de una carpeta\n\n**Transformaciones de forma:**\n- Pivotar columnas: de filas a columnas\n- Despivotar: de columnas a filas\n- Agrupar: agregar datos por categorias\n- Transponer: intercambiar filas y columnas\n\n**Manejo de errores:**\n- Reemplazar errores por valores predeterminados\n- Filtrar filas con errores\n- Try/Otherwise en lenguaje M",
          resources: [
            { title: "Dataset con datos sucios (practica)", url: "#", type: "download" },
            { title: "Guia de transformaciones comunes", url: "#", type: "article" }
          ]
        },
        {
          id: "les-4-3",
          title: "Automatizacion de flujos de datos",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura la actualizacion automatica de datos, parametros dinamicos y flujos de datos reutilizables.",
          reading: "La automatizacion es clave para que los dashboards se mantengan actualizados sin intervencion manual. Power BI ofrece varias herramientas para lograrlo.\n\n**Actualizacion programada:**\n- Configurar frecuencia de actualizacion en Power BI Service\n- Gateway de datos para fuentes locales\n- Hasta 8 actualizaciones diarias (Pro) o 48 (Premium)\n- Notificaciones de errores de actualizacion\n\n**Parametros en Power Query:**\n- Parametros de texto, numero y fecha\n- Cambiar rutas de archivos dinamicamente\n- Filtrar datos segun parametros del usuario\n- Parametros para conexiones a bases de datos\n\n**Dataflows (flujos de datos):**\n- Transformaciones compartidas entre multiples reportes\n- Almacenamiento en la nube de datos transformados\n- Reutilizacion de logica de limpieza\n- Reduccion de duplicacion de trabajo\n\n**Incremental refresh:**\n- Actualizar solo los datos nuevos o modificados\n- Mejora el rendimiento para grandes volumenes\n- Configuracion de periodos historicos y de actualizacion",
          resources: [
            { title: "Guia de Gateway de datos", url: "https://learn.microsoft.com/power-bi/connect-data/service-gateway-onprem", type: "link" },
            { title: "Tutorial de Dataflows", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Modulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Que operacion de Power Query permite unir dos tablas por una columna clave comun?",
            options: [
              "Append",
              "Merge",
              "Pivotar",
              "Transponer"
            ],
            correct: 1,
            explanation: "Merge (combinar) realiza un JOIN entre dos tablas basandose en una o mas columnas clave comunes, similar a un JOIN en SQL."
          },
          {
            question: "¿Que lenguaje utiliza Power Query internamente para las transformaciones?",
            options: [
              "DAX",
              "SQL",
              "Lenguaje M",
              "Python"
            ],
            correct: 2,
            explanation: "Power Query utiliza el lenguaje M (Power Query Formula Language) internamente. Cada paso de transformacion genera una expresion M automaticamente."
          },
          {
            question: "¿Para que se usa el Gateway de datos en Power BI?",
            options: [
              "Para diseñar visualizaciones mas bonitas",
              "Para conectar Power BI Service con fuentes de datos locales",
              "Para crear formulas DAX avanzadas",
              "Para exportar reportes a PDF"
            ],
            correct: 1,
            explanation: "El Gateway de datos actua como puente entre Power BI Service en la nube y las fuentes de datos locales de la organizacion, permitiendo la actualizacion automatica."
          },
          {
            question: "¿Que transformacion convierte columnas en filas?",
            options: [
              "Pivotar",
              "Despivotar",
              "Transponer",
              "Agrupar"
            ],
            correct: 1,
            explanation: "Despivotar convierte columnas en filas, transformando datos anchos en formato largo. Es el proceso inverso a pivotar."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Publicacion y Colaboracion",
      description: "Publica tus dashboards, comparte con tu equipo y desarrolla un proyecto final de dashboard ejecutivo.",
      icon: "🚀",
      lessons: [
        {
          id: "les-5-1",
          title: "Publicar en Power BI Service",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a publicar reportes desde Power BI Desktop al servicio en la nube y configurar espacios de trabajo.",
          reading: "Power BI Service es la plataforma en la nube donde se comparten y consumen los reportes creados en Desktop. Publicar es el paso que hace tus dashboards accesibles.\n\n**Proceso de publicacion:**\n1. Desde Power BI Desktop: Inicio > Publicar\n2. Seleccionar el espacio de trabajo destino\n3. Verificar que los datos se actualizan correctamente\n4. Configurar la actualizacion programada\n\n**Espacios de trabajo:**\n- Mi area de trabajo: espacio personal\n- Espacios compartidos: colaboracion en equipo\n- Roles: Administrador, Miembro, Colaborador, Visor\n- Organizacion de contenido en carpetas\n\n**Elementos en el servicio:**\n- Reportes: las visualizaciones creadas en Desktop\n- Conjuntos de datos: los modelos de datos publicados\n- Dashboards: paneles con pines de multiples reportes\n- Aplicaciones: paquetes de contenido distribuibles",
          resources: [
            { title: "Guia de Power BI Service", url: "https://learn.microsoft.com/power-bi/fundamentals/service-get-started", type: "link" },
            { title: "Tutorial de espacios de trabajo", url: "#", type: "article" }
          ]
        },
        {
          id: "les-5-2",
          title: "Compartir y colaborar en equipo",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura permisos, comparte reportes y crea aplicaciones para distribuir dashboards a toda la organizacion.",
          reading: "Power BI ofrece multiples formas de compartir contenido, cada una con diferentes niveles de control y acceso.\n\n**Metodos para compartir:**\n- Compartir directo: enviar enlace a usuarios especificos\n- Publicar en la web: enlace publico (sin autenticacion)\n- Aplicaciones: paquetes curados de reportes\n- Incrustar en Teams, SharePoint o sitios web\n\n**Seguridad y permisos:**\n- Row-Level Security (RLS): filtrar datos segun el usuario\n- Roles de seguridad definidos en Power BI Desktop\n- Permisos a nivel de espacio de trabajo\n- Certificacion de conjuntos de datos\n\n**Colaboracion en equipo:**\n- Comentarios en reportes\n- Alertas sobre datos (cuando un KPI supera un umbral)\n- Suscripciones por correo electronico\n- Integracion con Microsoft Teams\n- Co-edicion de reportes en el servicio",
          resources: [
            { title: "Guia de seguridad en Power BI", url: "#", type: "article" },
            { title: "Tutorial de Row-Level Security", url: "#", type: "link" },
            { title: "Plantilla de roles RLS", url: "#", type: "download" }
          ]
        },
        {
          id: "les-5-3",
          title: "Proyecto final: Dashboard ejecutivo",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Desarrolla un dashboard ejecutivo completo integrando todas las tecnicas aprendidas: modelado, DAX, diseño y publicacion.",
          reading: "En esta leccion final desarrollaremos un dashboard ejecutivo profesional que integra todas las habilidades del curso.\n\n**Alcance del proyecto:**\n- Dashboard de ventas ejecutivo con multiples paginas\n- Modelo de datos estrella con tablas de hechos y dimensiones\n- Medidas DAX para KPIs de negocio\n- Diseño profesional con paleta corporativa\n\n**Paginas del dashboard:**\n1. Resumen ejecutivo: KPIs principales y tendencias\n2. Analisis de ventas: por producto, region y canal\n3. Detalle de clientes: segmentacion y comportamiento\n4. Proyecciones: metas vs resultados actuales\n\n**Entregables:**\n- Archivo .pbix con el dashboard completo\n- Documentacion del modelo de datos\n- Manual de uso para usuarios finales\n- Publicacion en Power BI Service\n\n**Evaluacion:**\n- Calidad del modelo de datos\n- Complejidad y precision de las medidas DAX\n- Diseño visual y usabilidad\n- Interactividad y navegacion",
          resources: [
            { title: "Dataset del proyecto final", url: "#", type: "download" },
            { title: "Plantilla de documentacion", url: "#", type: "article" },
            { title: "Repositorio de ejemplos", url: "#", type: "github" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz — Modulo 5",
        passingScore: 70,
        questions: [
          {
            question: "¿Que elemento de Power BI Service permite crear paneles con pines de multiples reportes?",
            options: [
              "Reporte",
              "Conjunto de datos",
              "Dashboard",
              "Aplicacion"
            ],
            correct: 2,
            explanation: "Un Dashboard en Power BI Service es un panel que permite anclar (pinear) visualizaciones de diferentes reportes en una sola vista unificada."
          },
          {
            question: "¿Que funcion de seguridad filtra los datos segun el usuario que accede al reporte?",
            options: [
              "Column-Level Security",
              "Row-Level Security (RLS)",
              "Page-Level Security",
              "Report-Level Security"
            ],
            correct: 1,
            explanation: "Row-Level Security (RLS) permite definir filtros a nivel de fila para que cada usuario solo vea los datos que le corresponden segun su rol."
          },
          {
            question: "¿Cual es la forma recomendada de distribuir dashboards a toda una organizacion?",
            options: [
              "Enviar el archivo .pbix por correo",
              "Publicar en la web sin autenticacion",
              "Crear una aplicacion de Power BI",
              "Tomar capturas de pantalla"
            ],
            correct: 2,
            explanation: "Las aplicaciones de Power BI son paquetes curados de reportes y dashboards que se pueden distribuir de forma controlada a toda la organizacion con permisos adecuados."
          }
        ]
      }
    }
  ]
};