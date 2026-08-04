const COURSE_DATA = {
  title: "Analizando con ArcGIS PRO",
  subtitle: "Analisis espacial profesional con la herramienta lider en sistemas de informacion geografica",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Introduccion a ArcGIS PRO",
      description: "Conoce los sistemas de informacion geografica, la interfaz de ArcGIS PRO y los fundamentos de coordenadas y proyecciones.",
      icon: "🗺️",
      lessons: [
        {
          id: "les-1-1",
          title: "Que son los SIG y ArcGIS PRO",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Introduccion a los Sistemas de Informacion Geografica y a ArcGIS PRO como herramienta profesional de analisis espacial.",
          reading: "Un Sistema de Informacion Geografica (SIG) es un conjunto de herramientas para capturar, almacenar, analizar y visualizar datos referenciados geograficamente. ArcGIS PRO es la aplicacion de escritorio de ultima generacion de Esri.\n\n**Que es un SIG:**\n- Sistema que integra hardware, software, datos y personas\n- Permite analizar patrones espaciales y relaciones geograficas\n- Utilizado en urbanismo, medio ambiente, logistica, salud publica y mas\n- Responde a preguntas como: donde, que hay cerca, como se distribuye\n\n**ArcGIS PRO vs ArcMap:**\n- ArcGIS PRO es la evolucion moderna de ArcMap\n- Interfaz basada en cintas (ribbon) similar a Office\n- Soporte nativo para 2D y 3D\n- Capacidad de trabajar con multiples mapas simultaneamente\n- Integracion con ArcGIS Online y la nube\n\n**Aplicaciones profesionales:**\n- Planificacion urbana y territorial\n- Gestion de recursos naturales\n- Analisis de riesgos y desastres\n- Logistica y optimizacion de rutas\n- Analisis de mercado y geomarketing",
          resources: [
            { title: "Sitio oficial de ArcGIS PRO", url: "https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview", type: "link" },
            { title: "Que es un SIG - Guia introductoria", url: "#", type: "article" }
          ]
        },
        {
          id: "les-1-2",
          title: "Interfaz y navegacion",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Recorre la interfaz de ArcGIS PRO: cintas de herramientas, paneles, tabla de contenidos y herramientas de navegacion.",
          reading: "ArcGIS PRO tiene una interfaz moderna y personalizable diseñada para maximizar la productividad en el trabajo con datos espaciales.\n\n**Elementos principales de la interfaz:**\n- Cinta de opciones (Ribbon): herramientas organizadas por pestañas contextuales\n- Panel de contenidos: lista de capas del mapa\n- Panel de catalogo: acceso a datos, herramientas y conexiones\n- Panel de geoprocesamiento: buscador de herramientas de analisis\n- Vista de mapa: canvas donde se visualizan los datos\n\n**Navegacion en el mapa:**\n- Zoom con la rueda del mouse\n- Pan (desplazar) con el boton central\n- Marcadores (Bookmarks) para ubicaciones frecuentes\n- Escala del mapa y coordenadas en la barra de estado\n\n**Organizacion del proyecto:**\n- Proyectos (.aprx): contienen mapas, datos y herramientas\n- Mapas: contenedores de capas 2D\n- Escenas: contenedores de capas 3D\n- Layouts: diseños de mapa para impresion\n- Tareas: flujos de trabajo guiados",
          resources: [
            { title: "Guia rapida de la interfaz", url: "https://pro.arcgis.com/en/pro-app/latest/get-started/", type: "link" },
            { title: "Atajos de teclado de ArcGIS PRO", url: "#", type: "download" },
            { title: "Video: Tour por la interfaz", url: "#", type: "link" }
          ]
        },
        {
          id: "les-1-3",
          title: "Sistemas de coordenadas y proyecciones",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Comprende los sistemas de coordenadas geograficas y proyectadas, datums y como elegir la proyeccion adecuada.",
          reading: "Los sistemas de coordenadas son fundamentales en los SIG porque definen como se representan las ubicaciones de la superficie terrestre en un mapa plano.\n\n**Sistemas de coordenadas geograficas:**\n- Basados en latitud y longitud (grados)\n- Datum: modelo matematico de la forma de la Tierra\n- WGS 1984: datum global mas utilizado (GPS)\n- Elipsoide: aproximacion matematica de la forma terrestre\n\n**Sistemas de coordenadas proyectadas:**\n- Transforman la esfera 3D a un plano 2D\n- Unidades en metros, pies u otras unidades lineales\n- UTM (Universal Transverse Mercator): zonas de 6 grados\n- Proyecciones conicas, cilindricas y planas\n\n**Distorsiones en proyecciones:**\n- Area: proyecciones equivalentes (Peters, Albers)\n- Forma: proyecciones conformes (Mercator, Lambert)\n- Distancia: proyecciones equidistantes\n- Direccion: proyecciones azimutales\n- Ninguna proyeccion preserva todas las propiedades\n\n**En ArcGIS PRO:**\n- Asignar sistema de coordenadas a capas\n- Proyectar datos de un sistema a otro\n- Proyeccion al vuelo: reproyeccion automatica para visualizacion",
          resources: [
            { title: "Guia de sistemas de coordenadas de Esri", url: "https://pro.arcgis.com/en/pro-app/latest/help/mapping/properties/coordinate-systems-and-projections.htm", type: "link" },
            { title: "Tabla de zonas UTM del mundo", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Modulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Que significa SIG?",
            options: [
              "Sistema de Integracion Global",
              "Sistema de Informacion Geografica",
              "Software de Imagenes Georreferenciadas",
              "Servicio de Infraestructura Geoespacial"
            ],
            correct: 1,
            explanation: "SIG significa Sistema de Informacion Geografica, un conjunto de herramientas para capturar, almacenar, analizar y visualizar datos geograficos."
          },
          {
            question: "¿Que datum es el mas utilizado a nivel global y es la base del GPS?",
            options: [
              "NAD 1927",
              "ED 1950",
              "WGS 1984",
              "SAD 1969"
            ],
            correct: 2,
            explanation: "WGS 1984 (World Geodetic System 1984) es el datum global mas utilizado y es la base del sistema GPS."
          },
          {
            question: "¿Que tipo de contenedor se usa en ArcGIS PRO para visualizar datos en 3D?",
            options: [
              "Mapa",
              "Layout",
              "Escena",
              "Catalogo"
            ],
            correct: 2,
            explanation: "Las Escenas en ArcGIS PRO son contenedores diseñados para visualizar y analizar datos espaciales en tres dimensiones."
          },
          {
            question: "¿Que propiedad preserva una proyeccion conforme?",
            options: [
              "Area",
              "Forma",
              "Distancia",
              "Todas las anteriores"
            ],
            correct: 1,
            explanation: "Las proyecciones conformes preservan las formas locales y los angulos, como la proyeccion de Mercator y la de Lambert."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Manejo de Datos Espaciales",
      description: "Aprende a trabajar con datos vectoriales, raster y geodatabases para gestionar informacion geografica profesionalmente.",
      icon: "📍",
      lessons: [
        {
          id: "les-2-1",
          title: "Datos vectoriales: puntos, lineas y poligonos",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Comprende el modelo de datos vectorial, sus geometrias y como crear, editar y gestionar features en ArcGIS PRO.",
          reading: "El modelo vectorial representa la realidad geografica mediante geometrias discretas: puntos, lineas y poligonos, cada uno con atributos asociados.\n\n**Tipos de geometria:**\n- Puntos: ubicaciones discretas (ciudades, pozos, estaciones)\n- Lineas (polylines): entidades lineales (rios, carreteras, tuberias)\n- Poligonos: areas cerradas (parcelas, lagos, paises)\n- Multipart features: geometrias con multiples partes\n\n**Formatos vectoriales comunes:**\n- Shapefile (.shp): formato clasico de Esri (multiples archivos)\n- File Geodatabase (.gdb): formato nativo de ArcGIS (recomendado)\n- GeoJSON: formato ligero basado en JSON\n- KML/KMZ: formato de Google Earth\n- GeoPackage (.gpkg): formato abierto OGC\n\n**Tabla de atributos:**\n- Cada feature tiene una fila en la tabla\n- Columnas con informacion descriptiva\n- Tipos de campo: texto, numerico, fecha, dominio\n- Consultas y seleccion por atributos\n\n**Edicion de features:**\n- Crear nuevas entidades con herramientas de dibujo\n- Editar vertices y formas existentes\n- Snapping: ajuste automatico a otras geometrias\n- Templates de edicion para flujos consistentes",
          resources: [
            { title: "Guia de datos vectoriales en ArcGIS PRO", url: "https://pro.arcgis.com/en/pro-app/latest/help/data/", type: "link" },
            { title: "Datos de practica vectoriales", url: "#", type: "download" },
            { title: "Tutorial de edicion de features", url: "#", type: "article" }
          ]
        },
        {
          id: "les-2-2",
          title: "Datos raster y modelos de elevacion",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Trabaja con datos raster, imagenes satelitales, modelos de elevacion digital y sus aplicaciones en analisis espacial.",
          reading: "El modelo raster representa la realidad mediante una cuadricula regular de celdas (pixeles), donde cada celda almacena un valor numerico.\n\n**Concepto de raster:**\n- Cuadricula de filas y columnas de celdas\n- Cada celda tiene un valor (elevacion, temperatura, reflectancia)\n- Resolucion espacial: tamaño de cada celda\n- Bandas: capas de informacion (RGB, infrarrojo)\n\n**Tipos de datos raster:**\n- Imagenes satelitales: Landsat, Sentinel, MODIS\n- Modelos Digitales de Elevacion (DEM/DTM/DSM)\n- Mapas de uso de suelo y cobertura\n- Datos climaticos y meteorologicos\n- Ortofotografias aereas\n\n**Modelos de elevacion:**\n- DEM (Digital Elevation Model): elevacion del terreno\n- DSM (Digital Surface Model): incluye edificios y vegetacion\n- DTM (Digital Terrain Model): terreno desnudo\n- Derivados: pendiente, orientacion, sombreado, cuenca visual\n\n**Operaciones raster basicas:**\n- Reclasificacion de valores\n- Algebra de mapas (Map Algebra)\n- Extraccion por mascara\n- Estadisticas zonales",
          resources: [
            { title: "Datos raster en ArcGIS PRO", url: "https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/", type: "link" },
            { title: "DEM de ejemplo para practica", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-3",
          title: "Gestion de geodatabases",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea y administra geodatabases para organizar, validar y compartir datos espaciales de forma profesional.",
          reading: "La geodatabase es el formato nativo de almacenamiento de datos espaciales en ArcGIS y ofrece capacidades avanzadas de gestion que los shapefiles no tienen.\n\n**Tipos de geodatabase:**\n- File Geodatabase (.gdb): almacenamiento local, hasta 1TB por tabla\n- Enterprise Geodatabase: multiusuario con SQL Server, PostgreSQL, Oracle\n- Mobile Geodatabase (.geodatabase): para ArcGIS Runtime\n\n**Ventajas sobre shapefiles:**\n- Sin limite de 2GB por archivo\n- Nombres de campo de hasta 64 caracteres\n- Soporte para dominios y subtipos\n- Topologia y reglas de integridad\n- Redes geometricas y datasets de red\n\n**Elementos de una geodatabase:**\n- Feature classes: capas vectoriales individuales\n- Feature datasets: agrupaciones tematicas con misma referencia espacial\n- Tablas: datos tabulares sin geometria\n- Raster datasets y mosaicos\n- Relationship classes: relaciones entre tablas\n\n**Buenas practicas:**\n- Nomenclatura consistente sin espacios ni caracteres especiales\n- Dominios para validar valores de atributos\n- Subtipos para categorizar features\n- Documentacion de metadatos",
          resources: [
            { title: "Guia de geodatabases de Esri", url: "https://pro.arcgis.com/en/pro-app/latest/help/data/geodatabases/", type: "link" },
            { title: "Plantilla de nomenclatura SIG", url: "#", type: "download" },
            { title: "Tutorial: crear una geodatabase", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Modulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tipo de geometria vectorial se usa para representar rios y carreteras?",
            options: [
              "Puntos",
              "Poligonos",
              "Lineas (polylines)",
              "Raster"
            ],
            correct: 2,
            explanation: "Las lineas (polylines) se utilizan para representar entidades lineales como rios, carreteras, tuberias y redes electricas."
          },
          {
            question: "¿Que es la resolucion espacial de un raster?",
            options: [
              "El numero total de pixeles de la imagen",
              "El tamaño de cada celda en unidades del terreno",
              "La cantidad de bandas espectrales",
              "El formato de compresion utilizado"
            ],
            correct: 1,
            explanation: "La resolucion espacial es el tamaño de cada celda (pixel) en unidades del terreno. Por ejemplo, un raster de 30m tiene celdas que cubren 30x30 metros."
          },
          {
            question: "¿Cual es la principal ventaja de una File Geodatabase sobre un shapefile?",
            options: [
              "Es compatible con Google Earth",
              "No requiere ArcGIS para abrirse",
              "Soporta dominios, topologia y no tiene limite de 2GB",
              "Es mas pequeña en tamaño de archivo"
            ],
            correct: 2,
            explanation: "Las File Geodatabases soportan funcionalidades avanzadas como dominios de validacion, topologia, subtipos y no tienen el limite de 2GB que afecta a los shapefiles."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Analisis Espacial",
      description: "Domina las herramientas de geoprocesamiento para realizar analisis de proximidad, superposicion e interpolacion.",
      icon: "🔍",
      lessons: [
        {
          id: "les-3-1",
          title: "Herramientas de geoprocesamiento",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conoce las herramientas fundamentales de geoprocesamiento: buffer, clip, dissolve, intersect y union.",
          reading: "El geoprocesamiento es el corazon del analisis SIG. ArcGIS PRO ofrece cientos de herramientas organizadas en cajas de herramientas tematicas.\n\n**Herramientas vectoriales fundamentales:**\n- Buffer: crear zonas de influencia alrededor de features\n- Clip: recortar datos por una mascara\n- Intersect: obtener la zona comun entre dos capas\n- Union: combinar geometrias de dos capas\n- Dissolve: fusionar features por un atributo comun\n- Erase: eliminar areas de una capa con otra\n\n**Herramientas de seleccion:**\n- Select by Attributes: seleccion por consulta SQL\n- Select by Location: seleccion por relacion espacial\n- Relaciones espaciales: intersecta, contiene, dentro de, cerca de\n\n**Panel de geoprocesamiento:**\n- Busqueda de herramientas por nombre\n- Parametros de entrada y salida\n- Entornos de procesamiento (extent, coordenadas, mascara)\n- Historial de herramientas ejecutadas\n\n**Buenas practicas:**\n- Verificar sistemas de coordenadas antes de analizar\n- Documentar cada paso del analisis\n- Usar nombres descriptivos para los resultados\n- Revisar los resultados visualmente en cada paso",
          resources: [
            { title: "Referencia de herramientas de ArcGIS PRO", url: "https://pro.arcgis.com/en/pro-app/latest/tool-reference/", type: "link" },
            { title: "Datos de practica para geoprocesamiento", url: "#", type: "download" },
            { title: "Guia rapida de herramientas comunes", url: "#", type: "article" }
          ]
        },
        {
          id: "les-3-2",
          title: "Analisis de proximidad y superposicion",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Realiza analisis de proximidad, distancias, areas de servicio y operaciones de superposicion para resolver problemas espaciales reales.",
          reading: "Los analisis de proximidad y superposicion responden preguntas como: que hay cerca, que areas se solapan y como se relacionan espacialmente distintas capas.\n\n**Analisis de proximidad:**\n- Near: distancia al feature mas cercano\n- Generate Near Table: distancias a multiples features\n- Point Distance: matriz de distancias entre puntos\n- Buffer con distancias multiples\n- Thiessen Polygons (Voronoi): areas de influencia\n\n**Analisis de superposicion:**\n- Spatial Join: unir atributos por ubicacion espacial\n- Identity: transferir atributos de una capa a otra\n- Symmetrical Difference: areas no comunes\n- Tabulate Intersection: cuantificar superposicion\n\n**Casos de uso practicos:**\n- Zonas de riesgo: areas a menos de X metros de un peligro\n- Cobertura de servicios: poblacion dentro de un radio de influencia\n- Conflictos de uso de suelo: superposicion de zonificaciones\n- Accesibilidad: distancia a servicios de salud, educacion\n\n**Network Analysis (opcional):**\n- Rutas optimas\n- Areas de servicio (isocronas)\n- Facility Location: ubicacion optima de instalaciones",
          resources: [
            { title: "Tutorial: analisis de proximidad", url: "#", type: "article" },
            { title: "Notebook: ejercicios de superposicion", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-3-3",
          title: "Interpolacion y analisis de superficies",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Genera superficies continuas a partir de datos puntuales usando tecnicas de interpolacion y analiza el terreno.",
          reading: "La interpolacion permite estimar valores en ubicaciones sin datos a partir de mediciones en puntos conocidos. Es fundamental en climatologia, geologia y estudios ambientales.\n\n**Metodos de interpolacion:**\n- IDW (Inverse Distance Weighted): pondera por distancia inversa\n- Kriging: metodo geoestadistico con analisis de variograma\n- Spline: ajusta una superficie suave minimizando curvatura\n- Natural Neighbor: basado en poligonos de Voronoi\n- Trend: ajusta una superficie polinomial global\n\n**Comparacion de metodos:**\n- IDW: rapido, no extrapola, puede generar ojos de buey\n- Kriging: mas preciso, estima error, requiere mas datos\n- Spline: suave, puede generar valores extremos artificiales\n\n**Analisis de superficies:**\n- Pendiente (Slope): inclinacion del terreno en grados o porcentaje\n- Orientacion (Aspect): direccion de la pendiente\n- Hillshade: sombreado del relieve para visualizacion\n- Curvatura: concavidad y convexidad del terreno\n- Cuenca visual (Viewshed): areas visibles desde un punto\n- Cuencas hidrograficas (Watershed): area de drenaje\n\n**Aplicaciones:**\n- Mapas de temperatura y precipitacion\n- Mapas de contaminacion de suelos\n- Analisis de aptitud del terreno\n- Estudios de riesgo de inundacion",
          resources: [
            { title: "Herramientas de interpolacion de ArcGIS", url: "https://pro.arcgis.com/en/pro-app/latest/tool-reference/spatial-analyst/", type: "link" },
            { title: "Datos puntuales para practica", url: "#", type: "download" },
            { title: "Guia de seleccion de metodo de interpolacion", url: "#", type: "article" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Modulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Que herramienta crea una zona de influencia a una distancia especifica alrededor de un feature?",
            options: [
              "Clip",
              "Buffer",
              "Intersect",
              "Dissolve"
            ],
            correct: 1,
            explanation: "Buffer crea poligonos a una distancia especificada alrededor de features de entrada, representando zonas de influencia o proximidad."
          },
          {
            question: "¿Que metodo de interpolacion es geoestadistico y estima el error de prediccion?",
            options: [
              "IDW",
              "Spline",
              "Kriging",
              "Natural Neighbor"
            ],
            correct: 2,
            explanation: "Kriging es un metodo geoestadistico que no solo interpola valores sino que tambien proporciona una estimacion del error en cada ubicacion predicha."
          },
          {
            question: "¿Que analisis de superficie calcula la inclinacion del terreno?",
            options: [
              "Aspect (orientacion)",
              "Slope (pendiente)",
              "Hillshade (sombreado)",
              "Viewshed (cuenca visual)"
            ],
            correct: 1,
            explanation: "Slope (pendiente) calcula la inclinacion del terreno en cada celda, expresada en grados o porcentaje, a partir de un modelo de elevacion."
          },
          {
            question: "¿Que herramienta une atributos de una capa a otra basandose en la ubicacion espacial?",
            options: [
              "Table Join",
              "Spatial Join",
              "Merge",
              "Append"
            ],
            correct: 1,
            explanation: "Spatial Join une los atributos de una capa a otra basandose en la relacion espacial entre sus features, como interseccion, proximidad o contencion."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Cartografia Profesional",
      description: "Diseña mapas profesionales con simbologia avanzada, layouts de calidad y multiples formatos de exportacion.",
      icon: "🎨",
      lessons: [
        {
          id: "les-4-1",
          title: "Simbologia y clasificacion de datos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica simbologia profesional a tus capas: simbolos unicos, categorias, graduados y representaciones proporcionales.",
          reading: "La simbologia es la forma en que se representan visualmente los datos en un mapa. Una buena simbologia hace que el mapa sea legible e informativo.\n\n**Tipos de simbologia:**\n- Simbolo unico: mismo simbolo para todos los features\n- Valores unicos: un color/simbolo por categoria\n- Graduado (colores): rangos de valores con colores escalonados\n- Graduado (simbolos): tamaño proporcional al valor\n- Densidad de puntos: puntos aleatorios proporcionales a la cantidad\n- Grafico (chart): graficos de torta o barras sobre cada feature\n\n**Metodos de clasificacion:**\n- Intervalos iguales: rangos del mismo tamaño\n- Cuantiles: misma cantidad de features por clase\n- Rupturas naturales (Jenks): minimiza varianza intra-clase\n- Desviacion estandar: basado en la distribucion estadistica\n- Manual: el usuario define los limites\n\n**Simbologia avanzada:**\n- Etiquetas (labels) con expresiones Arcade\n- Transparencia y efectos visuales\n- Simbolos SVG personalizados\n- Simbologia basada en multiples atributos\n- Representaciones dependientes de la escala",
          resources: [
            { title: "Guia de simbologia en ArcGIS PRO", url: "https://pro.arcgis.com/en/pro-app/latest/help/mapping/layer-properties/symbolize-feature-layers.htm", type: "link" },
            { title: "Libreria de simbolos cartograficos", url: "#", type: "download" }
          ]
        },
        {
          id: "les-4-2",
          title: "Diseno de mapas y layouts",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Diseña mapas profesionales con todos sus elementos: titulo, leyenda, escala, norte, grilla y elementos cartograficos.",
          reading: "Un layout es la composicion final del mapa para impresion o publicacion. Incluye el mapa y todos los elementos marginales necesarios para su interpretacion.\n\n**Elementos obligatorios de un mapa:**\n- Titulo: descriptivo y conciso\n- Leyenda: explicacion de la simbologia\n- Escala: grafica y/o numerica\n- Norte: flecha o indicador de orientacion\n- Fuente de datos: origen de la informacion\n- Sistema de coordenadas: referencia espacial\n- Fecha de elaboracion y autor\n\n**Elementos opcionales:**\n- Mapa de ubicacion (localizador)\n- Grilla de coordenadas (graticule/grid)\n- Texto descriptivo o notas\n- Logos institucionales\n- Graficos y tablas complementarias\n\n**Diseño del layout:**\n- Tamaños de pagina estandar: A4, A3, A1, A0\n- Margenes y espaciado consistentes\n- Jerarquia visual: el mapa como elemento principal\n- Equilibrio visual y distribucion de elementos\n- Uso de marcos (frames) para organizar\n\n**Series de mapas (Map Series):**\n- Generar multiples mapas automaticamente\n- Un mapa por cada feature de una capa indice\n- Ideal para atlas o mapas por municipio/region",
          resources: [
            { title: "Tutorial de layouts en ArcGIS PRO", url: "#", type: "article" },
            { title: "Plantillas de layout profesional", url: "#", type: "download" },
            { title: "Ejemplos de mapas bien diseñados", url: "#", type: "link" }
          ]
        },
        {
          id: "les-4-3",
          title: "Exportacion y formatos de salida",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Exporta tus mapas en diferentes formatos: PDF, PNG, TIFF, SVG y comparte a traves de ArcGIS Online.",
          reading: "La exportacion es el paso final que convierte tu diseño en un producto entregable. Elegir el formato correcto depende del uso final del mapa.\n\n**Formatos de exportacion:**\n- PDF: formato universal, ideal para impresion y distribucion digital\n- PNG: imagen raster con transparencia, ideal para presentaciones\n- TIFF/GeoTIFF: alta calidad para impresion profesional\n- SVG: formato vectorial escalable para edicion posterior\n- JPEG: compresion con perdida, para uso web\n- EMF: para insertar en documentos de Office\n\n**Configuracion de exportacion:**\n- Resolucion (DPI): 300 para impresion, 96-150 para pantalla\n- Calidad de imagen y compresion\n- Exportar capas en PDF para edicion\n- Georreferenciacion en formatos raster\n\n**Publicacion digital:**\n- ArcGIS Online: mapas web interactivos\n- Story Maps: narrativas geograficas\n- Web AppBuilder: aplicaciones web personalizadas\n- Compartir paquetes de mapas (.mpkx)\n\n**Flujo de entrega profesional:**\n1. Revisar el layout con la lista de verificacion\n2. Exportar en el formato requerido\n3. Verificar la calidad del archivo exportado\n4. Documentar los metadatos del mapa",
          resources: [
            { title: "Guia de exportacion en ArcGIS PRO", url: "#", type: "article" },
            { title: "Checklist de calidad cartografica", url: "#", type: "download" },
            { title: "ArcGIS Online", url: "https://www.arcgis.com/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Modulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Que metodo de clasificacion minimiza la varianza dentro de cada clase?",
            options: [
              "Intervalos iguales",
              "Cuantiles",
              "Rupturas naturales (Jenks)",
              "Desviacion estandar"
            ],
            correct: 2,
            explanation: "El metodo de rupturas naturales (Jenks) agrupa los datos minimizando la varianza dentro de cada clase y maximizando las diferencias entre clases."
          },
          {
            question: "¿Que elemento de un mapa explica el significado de los simbolos utilizados?",
            options: [
              "Titulo",
              "Escala",
              "Leyenda",
              "Grilla"
            ],
            correct: 2,
            explanation: "La leyenda es el elemento cartografico que explica el significado de cada simbolo, color y patron utilizado en el mapa."
          },
          {
            question: "¿Que resolucion (DPI) se recomienda para mapas destinados a impresion?",
            options: [
              "72 DPI",
              "96 DPI",
              "150 DPI",
              "300 DPI"
            ],
            correct: 3,
            explanation: "Para impresion profesional se recomienda una resolucion de 300 DPI, que garantiza nitidez y calidad en el producto impreso."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Automatizacion con ModelBuilder",
      description: "Automatiza flujos de geoprocesamiento con ModelBuilder para hacer tus analisis repetibles y eficientes.",
      icon: "⚙️",
      lessons: [
        {
          id: "les-5-1",
          title: "Introduccion a ModelBuilder",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conoce ModelBuilder, el entorno visual de ArcGIS PRO para crear flujos de geoprocesamiento automatizados.",
          reading: "ModelBuilder es un entorno de programacion visual que permite encadenar herramientas de geoprocesamiento en flujos de trabajo automatizados sin escribir codigo.\n\n**Que es ModelBuilder:**\n- Entorno de modelado visual tipo diagrama de flujo\n- Encadena herramientas de geoprocesamiento\n- La salida de una herramienta es la entrada de la siguiente\n- Los modelos se pueden guardar, compartir y reutilizar\n\n**Elementos de un modelo:**\n- Datos de entrada (ovalo azul): capas y tablas\n- Herramientas (rectangulo amarillo): operaciones de geoprocesamiento\n- Datos de salida (ovalo verde): resultados generados\n- Conectores: flechas que indican el flujo de datos\n- Variables: parametros modificables del modelo\n\n**Ventajas de ModelBuilder:**\n- Automatiza procesos repetitivos\n- Documenta visualmente el flujo de analisis\n- Facilita la reproducibilidad del analisis\n- Permite crear herramientas personalizadas\n- No requiere conocimientos de programacion\n\n**Creacion de un modelo basico:**\n1. Insertar > ModelBuilder para abrir el editor\n2. Arrastrar herramientas desde el panel de geoprocesamiento\n3. Conectar datos de entrada con herramientas\n4. Configurar parametros de cada herramienta\n5. Ejecutar el modelo completo",
          resources: [
            { title: "Introduccion a ModelBuilder de Esri", url: "https://pro.arcgis.com/en/pro-app/latest/help/analysis/geoprocessing/modelbuilder/", type: "link" },
            { title: "Tutorial paso a paso de ModelBuilder", url: "#", type: "article" }
          ]
        },
        {
          id: "les-5-2",
          title: "Creacion de flujos de geoprocesamiento",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Construye flujos de geoprocesamiento complejos con iteradores, condiciones y parametros dinamicos en ModelBuilder.",
          reading: "ModelBuilder permite crear flujos de trabajo sofisticados con logica condicional, iteraciones y parametros que los hacen flexibles y reutilizables.\n\n**Iteradores (loops):**\n- Iterate Feature Classes: procesar todas las capas de una geodatabase\n- Iterate Rows: procesar cada fila de una tabla\n- Iterate Files: procesar archivos de una carpeta\n- Iterate Field Values: ejecutar por cada valor unico de un campo\n- While: repetir hasta que se cumpla una condicion\n\n**Logica condicional:**\n- If/Then/Else: ejecutar herramientas condicionalmente\n- Calculate Value: evaluar expresiones Python\n- Collect Values: recopilar resultados de iteraciones\n\n**Parametros del modelo:**\n- Convertir datos de entrada en parametros del modelo\n- El usuario puede cambiar valores sin editar el modelo\n- Valores por defecto para parametros\n- Validacion de parametros de entrada\n\n**Buenas practicas:**\n- Nombrar todos los elementos descriptivamente\n- Usar variables intermedias con %inline variable%\n- Agregar etiquetas y documentacion al modelo\n- Validar el modelo antes de ejecutar\n- Usar entornos para controlar el procesamiento",
          resources: [
            { title: "Referencia de iteradores en ModelBuilder", url: "#", type: "article" },
            { title: "Modelo de ejemplo con iteradores", url: "#", type: "download" },
            { title: "Guia de parametros de modelo", url: "#", type: "link" }
          ]
        },
        {
          id: "les-5-3",
          title: "Proyecto final: Analisis territorial completo",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Desarrolla un proyecto completo de analisis territorial usando todas las herramientas aprendidas, desde los datos hasta el mapa final.",
          reading: "En este proyecto final integraremos todas las habilidades del curso en un analisis territorial profesional automatizado con ModelBuilder.\n\n**Descripcion del proyecto:**\n- Analisis de aptitud territorial para la ubicacion de una nueva infraestructura\n- Multiples criterios: proximidad a vias, pendiente, uso de suelo, areas protegidas\n- Modelo automatizado con ModelBuilder\n- Mapa final profesional con layout completo\n\n**Fases del proyecto:**\n1. Recopilacion y organizacion de datos en geodatabase\n2. Preparacion: reproyeccion, limpieza, estandarizacion\n3. Analisis de criterios individuales (buffer, pendiente, reclasificacion)\n4. Superposicion ponderada de criterios\n5. Generacion de mapa de aptitud final\n6. Diseño cartografico y exportacion\n\n**Modelo en ModelBuilder:**\n- Encadenar todos los pasos de analisis\n- Parametrizar los umbrales de decision\n- Documentar cada herramienta utilizada\n- Hacer el modelo reutilizable para otros territorios\n\n**Entregables:**\n- Geodatabase organizada con datos y resultados\n- Modelo de ModelBuilder documentado\n- Mapa de aptitud territorial en PDF de alta calidad\n- Memoria tecnica del analisis realizado",
          resources: [
            { title: "Datos del proyecto final", url: "#", type: "download" },
            { title: "Plantilla de memoria tecnica", url: "#", type: "article" },
            { title: "Repositorio con ejemplos de proyectos SIG", url: "#", type: "github" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz — Modulo 5",
        passingScore: 70,
        questions: [
          {
            question: "¿Que representa un rectangulo amarillo en ModelBuilder?",
            options: [
              "Datos de entrada",
              "Datos de salida",
              "Una herramienta de geoprocesamiento",
              "Una variable del modelo"
            ],
            correct: 2,
            explanation: "En ModelBuilder, los rectangulos amarillos representan herramientas de geoprocesamiento que realizan operaciones sobre los datos."
          },
          {
            question: "¿Que elemento de ModelBuilder permite procesar todas las capas de una geodatabase automaticamente?",
            options: [
              "Calculate Value",
              "Iterate Feature Classes",
              "Collect Values",
              "If/Then/Else"
            ],
            correct: 1,
            explanation: "Iterate Feature Classes es un iterador que ejecuta el modelo una vez por cada feature class encontrada en la geodatabase especificada."
          },
          {
            question: "¿Cual es la principal ventaja de automatizar un analisis con ModelBuilder?",
            options: [
              "Los mapas se ven mas bonitos",
              "Se pueden usar mas herramientas",
              "El analisis es reproducible, documentado y reutilizable",
              "Solo funciona con datos raster"
            ],
            correct: 2,
            explanation: "La principal ventaja de ModelBuilder es que documenta visualmente el flujo de analisis, haciendolo reproducible, reutilizable y facil de compartir con otros profesionales."
          }
        ]
      }
    }
  ]
};