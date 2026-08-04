const COURSE_DATA = {
  title: "AgroClima con Python y RStudio",
  subtitle: "Analiza datos climáticos y agrícolas para la toma de decisiones",
  hours: 9,
  modules: [
    {
      id: "mod-1",
      title: "Clase 1: AgroClima en la nube con Python y R Studio",
      description: "Configura entornos en la nube (Google Colab y Posit Cloud), procesa shapefiles y extrae déficit hídrico de TerraClimate.",
      icon: "🌦️",
      lessons: [
        {
          id: "les-1-1",
          title: "Entornos en la nube, Shapefiles y TerraClimate",
          type: "video",
          duration: "60 min",
          videoId: "YUV5qFReZXE",
          description: "Aprende a montar tu entorno de trabajo en Google Colab y Posit Cloud, y a extraer déficit hídrico de TerraClimate sobre tu área de estudio.",
          reading: "**Conceptos Fundamentales — Clase 1**\n\n1. **Entornos en la nube:** Para iniciar sin instalar nada localmente se usan dos plataformas: **Google Colab** (para Python) y **Posit Cloud** (para R Studio). Ambas ejecutan código en servidores remotos y solo requieren un navegador.\n\n2. **Acceso a Google Colab:** Solo se necesita un **correo de Gmail**. Desde Google Drive se crea una carpeta para el proyecto y se conecta la aplicación de Google Colaboratory para crear el primer notebook.\n\n3. **IA integrada — Gemini en Colab:** Google Colab incluye por defecto a **Gemini**, que permite generar, transformar o explicar el código línea por línea, e incluso crear rutinas gráficas con instrucciones en lenguaje natural.\n\n4. **Shapefile como punto de partida:** El **archivo Shapefile (capa de polígonos)** define el área de interés. Sobre él se recortan las imágenes satelitales para procesar la información climática solo en la zona requerida.\n\n5. **Carpeta `input` obligatoria:** Para que los scripts del repositorio funcionen, el usuario debe crear una carpeta llamada exactamente `input` y subir allí los componentes del Shapefile descomprimidos.\n\n6. **Columna identificadora de polígonos:** Antes de correr el código, hay que conocer el **nombre exacto de la columna de atributos** que identifica cada polígono (por ejemplo `nombre`). El script lo pedirá para clasificar y separar resultados por polígono.\n\n7. **TerraClimate y variable `def`:** La fuente **TerraClimate** entrega datos climáticos históricos globales. La clase descarga automáticamente la variable **`def` (déficit hídrico)**, calculada a partir de un balance de agua.\n\n8. **Resolución espacial 4×4 km:** Los datos de TerraClimate vienen en cuadrículas de **4 × 4 km**, suficiente resolución para análisis zonales.\n\n9. **Salidas del script en carpeta `output`:** Al finalizar, el script deposita automáticamente: **(a)** un mapa espacial del área, **(b)** un gráfico de barras con la tendencia mensual, y **(c)** un archivo Excel con métricas y valores exportables por polígono.\n\n10. **Déficit hídrico = 0 ≠ error:** Cuando un mes muestra déficit hídrico cero no es una falla de medición: corresponde a meses de **superávit hídrico**, donde las lluvias son tan altas (hasta el 75% del volumen anual) que no hay déficit.",
          resources: [
            { title: "Repositorio GitHub — Curso AgroClima con RStudio y Python", url: "https://github.com/trabajocientifico/curso-agroclima-rstudio-python", type: "link" },
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-agroclima-rstudio-python/", type: "link" },
            { title: "Grabación de la Clase 1 (YouTube)", url: "https://www.youtube.com/watch?v=YUV5qFReZXE&t=1539s", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz Clase 1: AgroClima en la nube",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuáles son los entornos en la nube recomendados en la clase para iniciar el trabajo con Python y R Studio, respectivamente, sin necesidad de instalaciones locales?",
            options: [
              "Anaconda y Jupyter Notebook",
              "Google Colab y Posit Cloud",
              "AWS y Azure Machine Learning",
              "Spyder y R-Brain"
            ],
            correct: 1,
            explanation: "El instructor recomienda Google Colab como la mejor opción para Python y Posit Cloud como la principal alternativa en la nube para trabajar con la interfaz de R Studio."
          },
          {
            question: "¿Qué requisito inicial es necesario para acceder y crear un proyecto rápidamente en Google Colab?",
            options: [
              "Pagar una suscripción mensual en Google Workspace",
              "Instalar el entorno local de Python en el computador",
              "Tener un correo electrónico de Gmail",
              "Configurar una API de GitHub"
            ],
            correct: 2,
            explanation: "Para usar Google Colab se requiere una cuenta de Gmail, acceder a Google Drive, crear una carpeta para el proyecto y conectar desde allí la aplicación de Google Colaboratory."
          },
          {
            question: "¿Qué modelo de Inteligencia Artificial menciona el instructor que está integrado por defecto en Google Colab para generar, transformar o explicar el código?",
            options: [
              "ChatGPT",
              "Gemini",
              "Claude",
              "Copilot"
            ],
            correct: 1,
            explanation: "Google Colab incluye a Gemini integrado, que permite explicar funciones línea por línea o generar rutinas gráficas con instrucciones en lenguaje natural."
          },
          {
            question: "En el análisis espacial presentado, ¿qué tipo de archivo es considerado el punto de partida fundamental para determinar el área de interés y procesar la información climática?",
            options: [
              "Archivo Excel (.xlsx)",
              "Imagen satelital en formato Raster (.tif)",
              "Archivo Shapefile (archivo de polígonos)",
              "Base de datos de estaciones meteorológicas (.sql)"
            ],
            correct: 2,
            explanation: "El Shapefile (capa de polígonos) es el punto de arranque: define el área para recortar la información de las imágenes satelitales sobre la zona requerida."
          },
          {
            question: "¿Qué variable climática específica se descarga y se investiga utilizando los datos de la fuente TerraClimate en el ejercicio con R Studio?",
            options: [
              "Temperatura máxima (tmax)",
              "Velocidad media del viento (vs)",
              "Déficit hídrico (def)",
              "Evapotranspiración real estimada (aet)"
            ],
            correct: 2,
            explanation: "El script descarga automáticamente la variable 'def', que corresponde al déficit hídrico calculado a partir de un balance de agua."
          },
          {
            question: "¿Cuál es la resolución espacial de los datos de déficit hídrico extraídos de la plataforma TerraClimate mencionados en la sesión?",
            options: [
              "1 x 1 km",
              "4 x 4 km",
              "5 x 5 km",
              "10 x 10 km"
            ],
            correct: 1,
            explanation: "La información global terrestre de TerraClimate tiene una resolución espacial de cuadrículas de 4 × 4 km."
          },
          {
            question: "¿Cómo debe llamarse obligatoriamente la carpeta de trabajo en donde se deben almacenar los componentes del Shapefile para que el código de R Studio los encuentre?",
            options: [
              "datos_espaciales",
              "shape_files",
              "output",
              "input"
            ],
            correct: 3,
            explanation: "Es obligatorio crear una carpeta llamada exactamente 'input' para subir y descomprimir allí todos los archivos de la capa de polígonos."
          },
          {
            question: "Antes de ejecutar el código en R Studio, ¿qué información clave sobre el Shapefile debe conocer el usuario para garantizar que se generen los resultados para todos los sectores?",
            options: [
              "El peso total de la capa cartográfica.",
              "El nombre exacto de la columna que contiene la identificación de los polígonos.",
              "El nivel base de humedad de la zona delimitada.",
              "El conteo total de píxeles superpuestos en el mapa."
            ],
            correct: 1,
            explanation: "Es imprescindible conocer el nombre exacto de la columna de atributos del Shapefile (por ejemplo 'nombre'), porque el script la usa para clasificar y diferenciar la información de cada polígono."
          },
          {
            question: "Una vez concluido el procesamiento de datos del déficit hídrico, ¿qué tres productos deposita automáticamente el script en la carpeta de salida \"output\"?",
            options: [
              "Un panel interactivo HTML, un reporte en Word y una capa vectorial.",
              "Un archivo raster continuo, un reporte SQL y un diagrama 3D.",
              "Un gráfico de barras, un mapa zonal y un archivo de Excel.",
              "Un diagrama de cajas, un archivo KML de Google Earth y un documento PDF."
            ],
            correct: 2,
            explanation: "El sistema produce un mapa espacial del área, un gráfico de barras con la tendencia mensual y un Excel con las métricas y valores exportables para cada polígono."
          },
          {
            question: "De acuerdo con las aclaraciones entregadas a la clase, ¿por qué los análisis del área de estudio arrojan que el déficit hídrico es igual a cero durante algunos meses seguidos?",
            options: [
              "Porque la capa analizada no se sobrepone del todo con la órbita del satélite.",
              "Porque se asume que no hay evapotranspiración medible en esos meses del año.",
              "Porque en ciertas estaciones los datos fallan debido al bloqueo de las nubes a los sensores ópticos.",
              "Porque corresponden a meses de altísima precipitación, los cuales generan un superávit de agua total."
            ],
            correct: 3,
            explanation: "Los meses con déficit hídrico cero no son un error de medición: corresponden a épocas en que las lluvias son tan altas (hasta el 75% del volumen anual) que generan un estado absoluto de superávit hídrico."
          }
        ]
      }
    }
  ]
};
