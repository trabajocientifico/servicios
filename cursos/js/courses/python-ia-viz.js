const COURSE_DATA = {
  title: "Python + IA para Visualizacion Inteligente",
  subtitle: "Crea visualizaciones impactantes potenciadas con inteligencia artificial",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Fundamentos de Visualizacion con Python",
      description: "Aprende los principios esenciales del diseño visual de datos y configura tu entorno de trabajo con Python y sus librerias de visualizacion.",
      icon: "🎨",
      lessons: [
        {
          id: "les-1-1",
          title: "Principios del diseno visual de datos",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conoce los fundamentos del diseño visual de datos: como elegir colores, formas y disposiciones para comunicar informacion de manera efectiva.",
          reading: "El diseño visual de datos es la disciplina que combina principios de diseño grafico con la representacion de informacion cuantitativa. Una buena visualizacion no solo muestra datos, sino que cuenta una historia clara y convincente.\n\n**Principios fundamentales:**\n- Claridad: cada elemento visual debe tener un proposito\n- Precision: los datos deben representarse de forma fiel\n- Eficiencia: transmitir el maximo de informacion con el minimo de elementos\n\n**Teoria del color en datos:**\n- Paletas secuenciales para datos continuos\n- Paletas divergentes para datos con punto medio\n- Paletas categoricas para variables discretas\n- Accesibilidad: considerar daltonismo y contraste",
          resources: [
            { title: "Principios de Edward Tufte", url: "#", type: "article" },
            { title: "Guia de paletas de colores para datos", url: "#", type: "link" }
          ]
        },
        {
          id: "les-1-2",
          title: "Matplotlib desde cero",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Domina Matplotlib, la libreria base de visualizacion en Python, creando graficos de lineas, barras, dispersion e histogramas.",
          reading: "Matplotlib es la libreria de visualizacion mas utilizada en Python y la base sobre la que se construyen muchas otras herramientas. Aprenderla es esencial para cualquier trabajo con datos.\n\n**Conceptos clave de Matplotlib:**\n- Figure y Axes: la estructura basica de un grafico\n- pyplot vs API orientada a objetos\n- Subplots: multiples graficos en una figura\n\n**Tipos de graficos basicos:**\n- plt.plot() para graficos de linea\n- plt.bar() para graficos de barras\n- plt.scatter() para diagramas de dispersion\n- plt.hist() para histogramas\n- plt.pie() para graficos circulares\n\n**Personalizacion:**\n- Titulos, etiquetas y leyendas\n- Colores, estilos de linea y marcadores\n- Ajuste de ejes y escalas",
          resources: [
            { title: "Documentacion oficial de Matplotlib", url: "https://matplotlib.org/stable/", type: "link" },
            { title: "Notebook: Matplotlib Basico", url: "#", type: "notebook" },
            { title: "Galeria de ejemplos Matplotlib", url: "https://matplotlib.org/stable/gallery/", type: "link" }
          ]
        },
        {
          id: "les-1-3",
          title: "Configuracion del entorno de visualizacion",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Instala y configura Python, Jupyter Notebook y las librerias necesarias para crear visualizaciones profesionales.",
          reading: "Un entorno bien configurado es la base para trabajar de forma eficiente con visualizaciones en Python. En esta leccion prepararemos todo lo necesario.\n\n**Instalacion del entorno:**\n- Python 3.10+ con Anaconda o pip\n- Jupyter Notebook / JupyterLab para trabajo interactivo\n- VS Code con extension de Python\n\n**Librerias esenciales:**\n- Matplotlib: visualizacion base\n- Seaborn: graficos estadisticos\n- Plotly: graficos interactivos\n- Pandas: manipulacion de datos\n- NumPy: operaciones numericas\n\n**Configuracion recomendada:**\n- Estilos por defecto personalizados con rcParams\n- Resolucion de figuras para exportacion\n- Integracion con Jupyter (%matplotlib inline)",
          resources: [
            { title: "Descargar Anaconda", url: "https://www.anaconda.com/download", type: "download" },
            { title: "Google Colab como alternativa", url: "https://colab.research.google.com/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Modulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es el principio fundamental de una buena visualizacion de datos?",
            options: [
              "Usar la mayor cantidad de colores posible",
              "Claridad: cada elemento visual debe tener un proposito",
              "Incluir todos los datos disponibles sin filtrar",
              "Usar siempre graficos en 3D para impactar"
            ],
            correct: 1,
            explanation: "La claridad es el principio fundamental: cada elemento en una visualizacion debe cumplir un proposito claro para comunicar la informacion de manera efectiva."
          },
          {
            question: "¿Cual es la estructura basica de un grafico en Matplotlib?",
            options: [
              "Canvas y Layers",
              "Chart y Series",
              "Figure y Axes",
              "Window y Panels"
            ],
            correct: 2,
            explanation: "En Matplotlib, Figure es el contenedor principal y Axes es el area donde se dibujan los graficos. Un Figure puede contener multiples Axes."
          },
          {
            question: "¿Que tipo de paleta de colores se recomienda para datos continuos?",
            options: [
              "Paleta categorica",
              "Paleta secuencial",
              "Paleta aleatoria",
              "Paleta monocromatica sin variacion"
            ],
            correct: 1,
            explanation: "Las paletas secuenciales van de un tono claro a uno oscuro y son ideales para representar datos continuos que van de menor a mayor valor."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Visualizacion Avanzada con Seaborn",
      description: "Domina Seaborn para crear graficos estadisticos elegantes y descubrir patrones ocultos en los datos.",
      icon: "📊",
      lessons: [
        {
          id: "les-2-1",
          title: "Graficos estadisticos con Seaborn",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a crear graficos estadisticos avanzados con Seaborn: boxplots, violin plots, swarm plots y mas.",
          reading: "Seaborn es una libreria de visualizacion estadistica construida sobre Matplotlib que facilita la creacion de graficos complejos con pocas lineas de codigo.\n\n**Graficos de distribucion:**\n- sns.histplot(): histogramas mejorados\n- sns.kdeplot(): estimacion de densidad\n- sns.boxplot(): diagramas de caja\n- sns.violinplot(): distribucion y densidad combinadas\n\n**Graficos de relacion:**\n- sns.scatterplot(): dispersion con variables adicionales\n- sns.lineplot(): tendencias con intervalos de confianza\n- sns.jointplot(): distribucion conjunta de dos variables\n\n**Graficos categoricos:**\n- sns.barplot(): barras con estimacion estadistica\n- sns.countplot(): frecuencia de categorias\n- sns.swarmplot(): puntos individuales sin superposicion",
          resources: [
            { title: "Documentacion de Seaborn", url: "https://seaborn.pydata.org/", type: "link" },
            { title: "Notebook: Seaborn Estadistico", url: "#", type: "notebook" },
            { title: "Dataset de ejemplo (CSV)", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-2",
          title: "Heatmaps y graficos de correlacion",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea heatmaps de correlacion, matrices de confusion y mapas de calor para revelar relaciones entre variables.",
          reading: "Los heatmaps son una de las visualizaciones mas poderosas para entender relaciones entre multiples variables de un vistazo.\n\n**Tipos de heatmaps:**\n- Matrices de correlacion: relaciones entre variables numericas\n- Matrices de confusion: evaluacion de modelos de clasificacion\n- Tablas de contingencia: relaciones entre variables categoricas\n- Mapas de calor temporales: patrones por hora, dia, mes\n\n**Creacion con Seaborn:**\n- sns.heatmap() con parametros de anotacion\n- Mapas de color (cmap): coolwarm, viridis, RdYlGn\n- Personalizacion de etiquetas y formato numerico\n\n**Interpretacion:**\n- Valores cercanos a 1 o -1 indican correlacion fuerte\n- Valores cercanos a 0 indican poca relacion lineal\n- Diferenciar correlacion de causalidad",
          resources: [
            { title: "Notebook: Heatmaps y Correlacion", url: "#", type: "notebook" },
            { title: "Guia de mapas de color en Python", url: "#", type: "article" }
          ]
        },
        {
          id: "les-2-3",
          title: "Personalizacion y estilos profesionales",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica estilos profesionales, temas personalizados y tecnicas de diseño para crear visualizaciones de calidad publicable.",
          reading: "Una visualizacion con estilo profesional comunica credibilidad y facilita la lectura. Seaborn y Matplotlib ofrecen amplias opciones de personalizacion.\n\n**Estilos predefinidos de Seaborn:**\n- darkgrid, whitegrid, dark, white, ticks\n- sns.set_theme() para configuracion global\n- sns.set_palette() para paletas personalizadas\n\n**Personalizacion avanzada:**\n- Fuentes tipograficas profesionales\n- Tamaño y proporcion de figuras\n- Anotaciones y marcas en graficos\n- Eliminacion de elementos innecesarios (chartjunk)\n\n**Exportacion profesional:**\n- Formatos vectoriales: SVG, PDF\n- Formatos raster: PNG con alta resolucion (dpi)\n- Figuras para publicaciones academicas\n- Figuras para presentaciones ejecutivas",
          resources: [
            { title: "Notebook: Estilos Profesionales", url: "#", type: "notebook" },
            { title: "Catalogo de paletas de Seaborn", url: "https://seaborn.pydata.org/tutorial/color_palettes.html", type: "link" },
            { title: "Plantilla de estilo personalizado", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Modulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tipo de grafico de Seaborn muestra la distribucion y densidad de datos simultaneamente?",
            options: [
              "Boxplot",
              "Barplot",
              "Violin plot",
              "Countplot"
            ],
            correct: 2,
            explanation: "El violin plot combina un boxplot con una estimacion de densidad kernel, mostrando tanto la distribucion como la densidad de los datos."
          },
          {
            question: "¿Que valor de correlacion indica una relacion lineal fuerte y positiva?",
            options: [
              "0",
              "-0.95",
              "0.50",
              "0.95"
            ],
            correct: 3,
            explanation: "Un valor de correlacion cercano a 1 (como 0.95) indica una relacion lineal fuerte y positiva entre dos variables."
          },
          {
            question: "¿Que formato de imagen es vectorial y escalable sin perdida de calidad?",
            options: [
              "PNG",
              "JPG",
              "SVG",
              "GIF"
            ],
            correct: 2,
            explanation: "SVG (Scalable Vector Graphics) es un formato vectorial que mantiene su calidad a cualquier escala, ideal para publicaciones profesionales."
          },
          {
            question: "¿Que funcion de Seaborn se usa para crear un heatmap?",
            options: [
              "sns.heatplot()",
              "sns.heatmap()",
              "sns.thermal()",
              "sns.colormap()"
            ],
            correct: 1,
            explanation: "sns.heatmap() es la funcion de Seaborn para crear mapas de calor, permitiendo visualizar matrices de datos con colores."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Graficos Interactivos con Plotly",
      description: "Crea visualizaciones interactivas y dashboards dinamicos con Plotly Express y Dash.",
      icon: "✨",
      lessons: [
        {
          id: "les-3-1",
          title: "Introduccion a Plotly Express",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Descubre Plotly Express, la forma mas rapida de crear graficos interactivos en Python con una sintaxis simple y elegante.",
          reading: "Plotly Express es una interfaz de alto nivel que permite crear graficos interactivos complejos con una sola linea de codigo. A diferencia de Matplotlib, los graficos de Plotly son interactivos por defecto.\n\n**Ventajas de Plotly Express:**\n- Interactividad nativa: zoom, hover, seleccion\n- Exportacion a HTML para compartir\n- Integracion con Pandas DataFrames\n- Amplia variedad de graficos disponibles\n\n**Graficos basicos:**\n- px.scatter(): dispersion interactiva\n- px.line(): lineas con animacion\n- px.bar(): barras con hover info\n- px.histogram(): histogramas interactivos\n- px.box(): boxplots con detalle al pasar el mouse\n\n**Personalizacion:**\n- Titulos, ejes y leyendas\n- Temas: plotly, plotly_white, plotly_dark\n- Animaciones con parametro animation_frame",
          resources: [
            { title: "Documentacion de Plotly Express", url: "https://plotly.com/python/plotly-express/", type: "link" },
            { title: "Notebook: Plotly Express Basico", url: "#", type: "notebook" },
            { title: "Galeria de graficos Plotly", url: "https://plotly.com/python/", type: "link" }
          ]
        },
        {
          id: "les-3-2",
          title: "Dashboards interactivos",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Construye dashboards interactivos completos combinando multiples graficos, filtros y controles con Dash y Plotly.",
          reading: "Un dashboard es una coleccion de visualizaciones interconectadas que permiten explorar datos de manera dinamica. Dash es el framework de Plotly para crear dashboards en Python.\n\n**Componentes de un dashboard:**\n- Graficos interactivos (dcc.Graph)\n- Filtros desplegables (dcc.Dropdown)\n- Sliders para rangos (dcc.Slider)\n- Tablas de datos (dash_table)\n- Indicadores KPI (go.Indicator)\n\n**Callbacks en Dash:**\n- Input: componentes que disparan actualizaciones\n- Output: componentes que se actualizan\n- Encadenamiento de callbacks\n- Callbacks con multiples entradas y salidas\n\n**Layout y diseño:**\n- Organizacion en filas y columnas con CSS\n- Dash Bootstrap Components para diseño responsivo\n- Temas y estilos personalizados",
          resources: [
            { title: "Documentacion de Dash", url: "https://dash.plotly.com/", type: "link" },
            { title: "Notebook: Dashboard con Dash", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-3-3",
          title: "Mapas y visualizaciones geograficas",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea mapas interactivos, coropleticos y de burbujas con Plotly para visualizar datos geograficos.",
          reading: "Las visualizaciones geograficas son fundamentales para datos con componente espacial. Plotly ofrece herramientas potentes para crear mapas interactivos.\n\n**Tipos de mapas en Plotly:**\n- Mapas coropleticos: colores por region (px.choropleth)\n- Mapas de burbujas: puntos con tamaño variable (px.scatter_geo)\n- Mapas de lineas: rutas y conexiones\n- Mapas con Mapbox: tiles detallados (px.scatter_mapbox)\n\n**Datos geograficos:**\n- Codigos ISO de paises y regiones\n- GeoJSON para geometrias personalizadas\n- Coordenadas de latitud y longitud\n\n**Interactividad en mapas:**\n- Zoom y desplazamiento\n- Hover con informacion detallada\n- Filtros y animaciones temporales\n- Seleccion de regiones",
          resources: [
            { title: "Notebook: Mapas Interactivos", url: "#", type: "notebook" },
            { title: "Plotly Maps Documentation", url: "https://plotly.com/python/maps/", type: "link" },
            { title: "Dataset geografico de ejemplo", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Modulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es la principal ventaja de Plotly frente a Matplotlib?",
            options: [
              "Es mas rapido para grandes volumenes de datos",
              "Los graficos son interactivos por defecto",
              "Tiene menos tipos de graficos disponibles",
              "Solo funciona en Jupyter Notebook"
            ],
            correct: 1,
            explanation: "La principal ventaja de Plotly es que sus graficos son interactivos por defecto, permitiendo zoom, hover y seleccion sin codigo adicional."
          },
          {
            question: "¿Que framework de Plotly se usa para crear dashboards en Python?",
            options: [
              "Flask",
              "Streamlit",
              "Dash",
              "Django"
            ],
            correct: 2,
            explanation: "Dash es el framework oficial de Plotly para crear dashboards y aplicaciones web interactivas con graficos en Python."
          },
          {
            question: "¿Que tipo de mapa colorea regiones segun un valor numerico?",
            options: [
              "Mapa de burbujas",
              "Mapa coropletico",
              "Mapa de calor",
              "Mapa de lineas"
            ],
            correct: 1,
            explanation: "Un mapa coropletico asigna colores a regiones geograficas (paises, estados, municipios) segun el valor de una variable numerica."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "IA Generativa para Visualizacion",
      description: "Utiliza inteligencia artificial generativa para automatizar la creacion de graficos, analisis visual y narrativa de datos.",
      icon: "🤖",
      lessons: [
        {
          id: "les-4-1",
          title: "Generacion de graficos con prompts de IA",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a usar modelos de IA generativa para crear graficos a partir de descripciones en lenguaje natural.",
          reading: "La IA generativa esta revolucionando la forma en que creamos visualizaciones. Ahora es posible describir un grafico en lenguaje natural y obtener el codigo o la imagen resultante.\n\n**Herramientas de IA para visualizacion:**\n- ChatGPT / GPT-4 para generar codigo de graficos\n- GitHub Copilot para autocompletar visualizaciones\n- Herramientas especializadas: Julius AI, ChatBA\n\n**Tecnicas de prompting para graficos:**\n- Describir los datos: tipo, dimensiones, formato\n- Especificar el tipo de grafico deseado\n- Indicar personalizaciones: colores, estilos, anotaciones\n- Iterar sobre el resultado para refinarlo\n\n**Flujo de trabajo con IA:**\n1. Cargar los datos en el contexto del modelo\n2. Describir la visualizacion deseada\n3. Revisar y ajustar el codigo generado\n4. Personalizar y refinar manualmente",
          resources: [
            { title: "Guia de prompts para visualizacion", url: "#", type: "article" },
            { title: "Notebook: Graficos con IA", url: "#", type: "notebook" },
            { title: "Catalogo de prompts efectivos", url: "#", type: "download" }
          ]
        },
        {
          id: "les-4-2",
          title: "Analisis visual automatizado con GPT",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conecta la API de OpenAI con Python para automatizar el analisis exploratorio visual de cualquier dataset.",
          reading: "La integracion de GPT con Python permite automatizar el proceso completo de analisis visual, desde la exploracion inicial hasta la generacion de insights.\n\n**Integracion con la API de OpenAI:**\n- Configuracion de la API key\n- Envio de datos y contexto al modelo\n- Recepcion e interpretacion de respuestas\n- Ejecucion del codigo generado de forma segura\n\n**Analisis automatizado:**\n- Generacion automatica de estadisticas descriptivas\n- Seleccion inteligente de graficos segun el tipo de datos\n- Deteccion automatica de patrones y anomalias\n- Sugerencias de visualizaciones adicionales\n\n**Pipeline de analisis con IA:**\n1. Cargar dataset con Pandas\n2. Enviar resumen de datos a GPT\n3. Recibir plan de visualizacion\n4. Ejecutar codigo generado\n5. Iterar con feedback",
          resources: [
            { title: "API de OpenAI para Python", url: "https://platform.openai.com/docs/", type: "link" },
            { title: "Notebook: Analisis Automatizado", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-4-3",
          title: "Narrativa de datos asistida por IA",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Usa IA para generar narrativas, titulos, descripciones y anotaciones automaticas que acompañen tus visualizaciones.",
          reading: "La narrativa de datos (data storytelling) es el arte de combinar datos, visualizaciones y texto para contar una historia convincente. La IA puede asistir en cada etapa.\n\n**Componentes del data storytelling:**\n- Contexto: por que importan los datos\n- Narrativa: la historia que cuentan los datos\n- Visualizaciones: la evidencia visual\n- Llamada a la accion: que hacer con los insights\n\n**IA para narrativa de datos:**\n- Generacion de titulos descriptivos y llamativos\n- Creacion de sumarios ejecutivos automaticos\n- Anotaciones inteligentes en graficos\n- Descripciones accesibles de visualizaciones (alt text)\n- Traducciones automaticas de reportes\n\n**Herramientas:**\n- GPT para generacion de texto narrativo\n- Modelos de vision para describir graficos existentes\n- Templates automatizados de reportes con Python",
          resources: [
            { title: "Notebook: Data Storytelling con IA", url: "#", type: "notebook" },
            { title: "Ejemplos de narrativa de datos", url: "#", type: "article" },
            { title: "Plantilla de reporte automatizado", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Modulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tecnica es esencial al usar IA para generar graficos?",
            options: [
              "Escribir el codigo completo antes de consultar la IA",
              "Describir claramente los datos, el tipo de grafico y las personalizaciones deseadas",
              "Usar solo modelos de IA de codigo abierto",
              "Evitar iterar sobre el resultado generado"
            ],
            correct: 1,
            explanation: "Un buen prompt para visualizacion debe describir los datos, el tipo de grafico deseado y las personalizaciones esperadas para obtener resultados precisos."
          },
          {
            question: "¿Cual es el primer paso para automatizar analisis visual con GPT?",
            options: [
              "Crear los graficos manualmente primero",
              "Cargar el dataset y enviar un resumen de los datos al modelo",
              "Instalar una interfaz grafica especial",
              "Convertir todos los datos a formato de imagen"
            ],
            correct: 1,
            explanation: "El primer paso es cargar el dataset con Pandas y enviar un resumen al modelo de IA para que pueda entender la estructura y sugerir visualizaciones apropiadas."
          },
          {
            question: "¿Que es el data storytelling?",
            options: [
              "Una tecnica para inventar datos ficticios",
              "El arte de combinar datos, visualizaciones y narrativa para contar una historia",
              "Un tipo de grafico interactivo",
              "Un formato de archivo para almacenar graficos"
            ],
            correct: 1,
            explanation: "El data storytelling combina datos, visualizaciones y texto narrativo para comunicar insights de forma clara y convincente a la audiencia."
          },
          {
            question: "¿Que funcion cumple la IA en la generacion de anotaciones para graficos?",
            options: [
              "Reemplaza completamente al analista de datos",
              "Genera automaticamente titulos, descripciones y notas relevantes para acompañar las visualizaciones",
              "Solo traduce etiquetas de ejes a otros idiomas",
              "Cambia los colores de los graficos automaticamente"
            ],
            correct: 1,
            explanation: "La IA asiste generando automaticamente titulos descriptivos, sumarios, anotaciones inteligentes y descripciones accesibles que enriquecen las visualizaciones."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Proyecto Final: Dashboard Inteligente",
      description: "Aplica todo lo aprendido para diseñar, desarrollar y publicar un dashboard interactivo potenciado con inteligencia artificial.",
      icon: "🚀",
      lessons: [
        {
          id: "les-5-1",
          title: "Diseno y planificacion del dashboard",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Define los objetivos, selecciona los datos y diseña la estructura de tu dashboard inteligente.",
          reading: "Un dashboard exitoso comienza con una planificacion solida. Antes de escribir codigo, debes definir que historia quieres contar con los datos.\n\n**Pasos de planificacion:**\n1. Definir la audiencia y sus necesidades\n2. Seleccionar las metricas clave (KPIs)\n3. Elegir las visualizaciones apropiadas\n4. Diseñar el layout y flujo de navegacion\n5. Identificar fuentes de datos necesarias\n\n**Wireframing del dashboard:**\n- Boceto en papel o herramienta digital\n- Jerarquia visual: lo mas importante arriba a la izquierda\n- Agrupacion logica de graficos relacionados\n- Espacio para filtros e interactividad\n\n**Seleccion de tecnologia:**\n- Plotly Dash para dashboards complejos\n- Streamlit para prototipos rapidos\n- Jupyter con widgets para exploracion",
          resources: [
            { title: "Plantilla de wireframe para dashboard", url: "#", type: "download" },
            { title: "Notebook: Planificacion del Proyecto", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-5-2",
          title: "Desarrollo e integracion con IA",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Desarrolla el dashboard paso a paso integrando graficos interactivos, analisis automatizado y narrativa generada por IA.",
          reading: "En esta leccion construiremos el dashboard completo, integrando todas las tecnicas aprendidas en el curso.\n\n**Desarrollo del dashboard:**\n- Carga y procesamiento de datos con Pandas\n- Creacion de graficos interactivos con Plotly\n- Layout con Dash y Bootstrap Components\n- Callbacks para interactividad\n\n**Integracion de IA:**\n- Modulo de analisis automatico al cargar datos\n- Generacion de insights en texto con GPT\n- Anotaciones inteligentes en graficos\n- Resumen ejecutivo automatizado\n\n**Pruebas y depuracion:**\n- Verificacion de callbacks y flujos de datos\n- Pruebas con diferentes datasets\n- Optimizacion de rendimiento\n- Manejo de errores y casos limite",
          resources: [
            { title: "Notebook: Desarrollo del Dashboard", url: "#", type: "notebook" },
            { title: "Repositorio GitHub del proyecto", url: "#", type: "github" },
            { title: "Dataset del proyecto final", url: "#", type: "download" }
          ]
        },
        {
          id: "les-5-3",
          title: "Publicacion y presentacion de resultados",
          type: "video",
          duration: "15 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Publica tu dashboard en la web y aprende a presentar tus resultados de forma profesional.",
          reading: "El paso final es publicar tu dashboard para que otros puedan acceder a el y presentar tu trabajo de manera profesional.\n\n**Opciones de despliegue:**\n- Render: despliegue gratuito con soporte para Dash\n- Heroku: plataforma clasica para apps Python\n- Streamlit Cloud: despliegue con un clic\n- PythonAnywhere: alternativa sencilla\n\n**Preparacion para presentar:**\n- Documentacion del proyecto (README)\n- Recorrido guiado por el dashboard\n- Explicacion de decisiones de diseño\n- Demostrar la funcionalidad de IA integrada\n\n**Portfolio profesional:**\n- Agregar el proyecto a tu GitHub\n- Incluir capturas y GIFs del dashboard\n- Escribir un articulo tecnico sobre el proceso\n- Compartir en LinkedIn y comunidades de datos",
          resources: [
            { title: "Guia de despliegue en Render", url: "https://render.com/docs", type: "link" },
            { title: "Notebook: Reporte Final", url: "#", type: "notebook" },
            { title: "Checklist de presentacion", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz — Modulo 5",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es el primer paso al diseñar un dashboard?",
            options: [
              "Elegir los colores y la tipografia",
              "Escribir el codigo en Python inmediatamente",
              "Definir la audiencia y las metricas clave (KPIs)",
              "Buscar plantillas en internet"
            ],
            correct: 2,
            explanation: "Antes de diseñar o programar, es fundamental definir quien usara el dashboard y cuales son las metricas clave que necesitan visualizar."
          },
          {
            question: "¿Que plataforma permite desplegar aplicaciones Dash de forma gratuita?",
            options: [
              "Microsoft Azure exclusivamente",
              "Render",
              "Solo funciona en local",
              "Adobe Creative Cloud"
            ],
            correct: 1,
            explanation: "Render es una plataforma que permite desplegar aplicaciones web, incluyendo dashboards de Dash, de forma gratuita con un plan basico."
          },
          {
            question: "¿Como se integra la IA en un dashboard inteligente?",
            options: [
              "Reemplazando todos los graficos por texto generado",
              "Generando insights automaticos, anotaciones inteligentes y resumenes con modelos de IA",
              "Usando solo imagenes generadas por DALL-E",
              "La IA no se puede integrar en dashboards"
            ],
            correct: 1,
            explanation: "La IA se integra generando analisis automaticos, anotaciones inteligentes en graficos y resumenes ejecutivos que complementan las visualizaciones interactivas."
          }
        ]
      }
    }
  ]
};