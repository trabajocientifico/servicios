const COURSE_DATA = {
  title: "Python + IA en GeoInformación",
  subtitle: "Potencia el análisis espacial con algoritmos de Inteligencia Artificial",
  hours: 9,
  modules: [
    {
      id: "mod-1",
      title: "Clase 1: Datos espaciales con Python y Geopandas",
      description: "Vectores, ráster y operaciones espaciales (clip y dissolve) con apoyo de IA.",
      icon: "🌍",
      lessons: [
        {
          id: "les-1-1",
          title: "Vectores, Raster, Geopandas y operaciones espaciales",
          type: "video",
          duration: "60 min",
          videoId: "W4xLiyNfzgA",
          description: "Diferencias entre vectores y raster, carga de Shapefiles con Geopandas y operaciones clip y dissolve.",
          reading: "**Conceptos Fundamentales — Clase 1**\n\n1. **Vectores:** Archivos que representan el mundo espacialmente a través de **polígonos, puntos o líneas**. Conocidos como archivos *shape* (extensión **`.shp`**). Un shapefile NO es un archivo único: es una colección (`.shp`, `.shx`, `.dbf`, `.prj`, etc.) que debe permanecer junta en la misma carpeta.\n\n2. **Raster:** Archivos formados por **toda una manta de píxeles conectados** que representan una variable continua en el espacio (precipitación, temperatura, NDVI, imágenes satelitales). Su extensión característica es **`.tif`**.\n\n3. **Google Colab:** Entorno de Google que facilita entrar al mundo de Python porque **evita instalaciones locales** y trae **muchas librerías preinstaladas**. En Colab se distinguen visualmente las celdas: la **celda de código** muestra un **ícono de \"play\"** que permite ejecutarla; la celda de texto no lo tiene.\n\n4. **Geopandas:** Librería principal para procesamiento geoespacial en Python. Se importa con `import geopandas as gpd` y permite leer, manipular y visualizar capas vectoriales.\n\n5. **Cargar un shapefile:** Para que Python pueda llamar y visualizar una capa vectorial tradicional, se debe cargar el archivo que termina en **`.shp`** (el resto de archivos auxiliares deben estar en la misma carpeta).\n\n6. **Exploración de datos:** `.head()` aplicado a un GeoDataFrame (por ejemplo `departamentos.head()`) muestra el encabezado o las **primeras 5 filas** del marco de datos geográfico.\n\n7. **Operaciones espaciales clave (con apoyo de IA):**\n   - **Clip (corte espacial):** Filtra geometrías que se encuentran dentro de un área dada. Ejemplo: filtrar las estaciones del IDEAM que pertenecen únicamente al departamento del Meta.\n   - **Dissolve (disolver / fusionar):** Combina varios polígonos en uno solo. Ejemplo: fusionar Arauca, Vichada, Meta y Casanare para crear el polígono \"Orinoquía\".",
          resources: [
            { title: "Repositorio GitHub — curso Python + IA en GeoInformación", url: "https://github.com/trabajocientifico/curso-python-IA-geoinformacion", type: "link" },
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-python-IA-geoinformacion/", type: "link" },
            { title: "Enlace de capas (DANE)", url: "https://www.dane.gov.co/files/geoportal-provisional/", type: "link" },
            { title: "Capa Shape utilizada", url: "https://drive.google.com/file/d/1MJi3rb03Zni2WttCn_t3R_w5ghdF3W5v/view?usp=sharing", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz Clase 1: Vectores, Raster y Geopandas",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué tipo de archivos se conocen como \"vectores\" en el contexto de la geoinformación?",
            options: [
              "Archivos que muestran imágenes formadas por píxeles continuos.",
              "Archivos que representan variables climáticas invisibles.",
              "Archivos que representan el mundo espacialmente a través de polígonos, puntos o líneas, conocidos como archivos shape (.shp).",
              "Documentos de texto con código Python."
            ],
            correct: 2,
            explanation: "Los vectores representan el mundo espacial mediante polígonos, puntos o líneas en archivos shape (.shp)."
          },
          {
            question: "A diferencia de los vectores, ¿cómo se estructuran los archivos Raster?",
            options: [
              "Por geometrías exactas que delimitan fronteras.",
              "Por conjuntos de datos tabulares sin coordenadas.",
              "Por toda una manta de píxeles conectados que representan una variable continua en el espacio, como la precipitación o la temperatura.",
              "A través de algoritmos de inteligencia artificial exclusivamente."
            ],
            correct: 2,
            explanation: "Los raster son una manta de píxeles conectados que representan variables continuas como precipitación o temperatura."
          },
          {
            question: "¿Qué extensión de archivo es característica de los archivos Raster según la clase?",
            options: [".shp", ".tif", ".csv", ".jpg"],
            correct: 1,
            explanation: "La extensión característica de los archivos raster es .tif."
          },
          {
            question: "¿Cuál es una de las principales ventajas de usar Google Colab para procesar geoinformación con Python?",
            options: [
              "Que es un software licenciado comercial muy económico.",
              "Que facilita entrar al tema de Python porque evita instalaciones locales; muchas librerías ya vienen preinstaladas en su entorno.",
              "Que no requiere conectarse a Google Drive en ningún momento.",
              "Que funciona exclusivamente sin internet."
            ],
            correct: 1,
            explanation: "Colab evita instalaciones locales y trae muchas librerías preinstaladas."
          },
          {
            question: "¿Qué librería se importa en Python utilizando comúnmente el alias gpd para realizar procesamiento geoespacial?",
            options: ["Cloud Code", "Pandas", "Geopandas", "Gemini"],
            correct: 2,
            explanation: "Geopandas se importa habitualmente con el alias gpd."
          },
          {
            question: "Para que un entorno en Python pueda llamar, trabajar y visualizar una capa espacial tradicional, ¿cuál de los archivos específicos de la colección geométrica se debe cargar mediante la ruta?",
            options: [
              "El archivo .prj",
              "El archivo raster",
              "El archivo que termina en .shp (archivo shape)",
              "La carpeta comprimida .zip"
            ],
            correct: 2,
            explanation: "Se debe cargar el archivo .shp (con sus archivos auxiliares en la misma carpeta)."
          },
          {
            question: "¿Qué comando se utiliza en el código (aplicado a la variable departamentos) para visualizar el encabezado o las primeras 5 filas de un marco de datos geográfico?",
            options: [".plot()", ".columns", ".head()", ".print()"],
            correct: 2,
            explanation: "El método .head() muestra por defecto las primeras 5 filas del GeoDataFrame."
          },
          {
            question: "¿Cómo se diferencia visualmente una celda de código ejecutable de una celda de texto en Google Colab?",
            options: [
              "La celda de texto tiene un marco rojo.",
              "La celda de código presenta un icono de \"play\" o ejecución, indicando que el código puede correrse.",
              "Las celdas de código solo aparecen en la parte inferior.",
              "No hay diferencia visual, Python las detecta automáticamente."
            ],
            correct: 1,
            explanation: "La celda de código muestra un ícono de \"play\" que permite ejecutarla."
          },
          {
            question: "Al utilizar puntos de estaciones meteorológicas del IDEAM sobre el departamento del Meta, ¿qué tipo de procedimiento espacial específico se pide a la IA que realice para filtrar las estaciones que solo pertenecen a ese departamento?",
            options: [
              "Un buffer o área de influencia.",
              "Un clip o corte espacial.",
              "Un dissolve o fusión.",
              "Una proyección de coordenadas."
            ],
            correct: 1,
            explanation: "Para filtrar entidades dentro de un área se usa un clip (corte espacial)."
          },
          {
            question: "¿Qué herramienta o proceso se utiliza para fusionar los polígonos de los departamentos de Arauca, Vichada, Meta y Casanare y convertirlos en un solo polígono llamado \"Orinoquía\"?",
            options: [
              "Rasterizar",
              "Disolver (dissolve)",
              "Cortar (clip)",
              "Extraer píxeles"
            ],
            correct: 1,
            explanation: "El proceso para fusionar varios polígonos en uno solo es dissolve (disolver)."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Clase 2: Tipos de datos, Shapefiles y exportación con Geopandas",
      description: "Fundamentos de Python aplicados al SIG: tipos de datos, listas, comentarios y exportación de capas.",
      icon: "🛰️",
      lessons: [
        {
          id: "les-2-1",
          title: "Python aplicado al SIG: tipos, listas, comentarios y exportación",
          type: "video",
          duration: "60 min",
          videoId: "mfDLgaaD44Y",
          description: "Tipos de datos, listas, comentarios, manejo de shapefiles y exportación con .to_file().",
          reading: "**Conceptos Fundamentales — Clase 2**\n\n1. **Acceso a Google Colab:** Lo único que se necesita \"sí o sí\" para trabajar con Colab es **una cuenta de correo Gmail** (o anclada a los servidores de Google).\n\n2. **Tipos de datos en Python:**\n   - **Float (decimal):** valores con punto decimal, por ejemplo `4.1420`.\n   - **Int:** números enteros.\n   - **String:** cadenas de texto entre comillas.\n   - **Booleano:** `True` / `False`.\n\n3. **Tipos de geometría vectorial:**\n   - **Vector punto:** estaciones, ciudades, eventos.\n   - **Vector línea:** ríos, vías, redes (lo más adecuado para representar el flujo o curso de un río).\n   - **Polígono:** departamentos, municipios, lotes.\n   - **Raster:** imágenes continuas como una **imagen satelital**.\n\n4. **Listas en Python:** Los elementos se acceden por **índice empezando en 0** (el primer elemento es el índice `0`).\n\n5. **Comentarios:** Una línea que empieza con el símbolo **`#` (numeral)** se considera comentario y no se ejecuta como código.\n\n6. **Shapefiles desde un .zip:** Un Shapefile es **una colección de varios archivos** (`.shp`, `.shx`, `.prj`, `.dbf`, etc.) que deben estar **agrupados en la misma carpeta** después de extraer el `.zip` para poder leerlos correctamente.\n\n7. **Visualización con Geopandas:** Para graficar el mapa de una capa cargada se usa el método **`.plot()`**.\n\n8. **Inspección rápida:** El atributo **`.shape`** devuelve un resumen con el número total de **filas y columnas** del marco de datos, sin listar toda la información.\n\n9. **Exportar capa procesada:** Para guardar una nueva capa (por ejemplo el filtro del departamento del Meta) se usa **`.to_file(\"ruta/archivo.shp\")`**, indicando dentro del paréntesis la ruta y el nombre terminado en `.shp`.",
          resources: [
            { title: "Repositorio GitHub — curso Python + IA en GeoInformación", url: "https://github.com/trabajocientifico/curso-python-IA-geoinformacion", type: "link" },
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-python-IA-geoinformacion/", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "q2",
        title: "Quiz Clase 2: Python, Shapefiles y exportación",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué es lo único que se necesita \"sí o sí\" para tener acceso y trabajar con el entorno de programación Google Colab?",
            options: [
              "Conocimientos avanzados en R Studio.",
              "Pagar una licencia comercial.",
              "Tener acceso a un correo electrónico de Gmail o anclado a sus servidores.",
              "Descargar e instalar un software de 10 GB."
            ],
            correct: 2,
            explanation: "Solo se necesita una cuenta de Gmail (o anclada a servidores de Google) para usar Colab."
          },
          {
            question: "¿Qué tipo de dato numérico asigna Python a un valor decimal como 4.1420?",
            options: [
              "Entero (int)",
              "Cadena de texto (string)",
              "Booleano (bool)",
              "Decimal (float)"
            ],
            correct: 3,
            explanation: "Los valores con punto decimal son de tipo float en Python."
          },
          {
            question: "Dentro de un Sistema de Información Geográfica, ¿qué tipo de figura geométrica vectorial representa mejor el flujo o curso de un río?",
            options: [
              "Vector punto",
              "Raster",
              "Polígono",
              "Vector línea"
            ],
            correct: 3,
            explanation: "Un río se representa mejor como una geometría tipo línea."
          },
          {
            question: "Si creas una lista en Python con los nombres de varios departamentos, ¿cuál es el número de índice que se le asigna al primer elemento de esa lista?",
            options: [
              "1",
              "0 (cero)",
              "-1",
              "Depende de la longitud de la lista."
            ],
            correct: 1,
            explanation: "En Python las listas se indexan empezando en 0."
          },
          {
            question: "En el contexto de los tipos de datos espaciales, ¿cómo se clasifica una imagen satelital?",
            options: [
              "Como un archivo de texto plano",
              "Como un Raster",
              "Como un Vector tipo polígono",
              "Como un dato tabular"
            ],
            correct: 1,
            explanation: "Una imagen satelital es un dato tipo raster."
          },
          {
            question: "¿Qué símbolo gramatical se utiliza en Python para indicar que una línea es un comentario y evitar que el sistema la ejecute como código?",
            options: [
              "Un asterisco (*)",
              "Una barra diagonal (/)",
              "Un símbolo de numeral (#)",
              "Un signo de exclamación (!)"
            ],
            correct: 2,
            explanation: "El símbolo # marca el inicio de un comentario en Python."
          },
          {
            question: "¿Qué particularidad tienen los archivos \"Shapefile\" (.shp) cuando se extraen de un archivo comprimido (.zip) para poder leerlos correctamente?",
            options: [
              "Se convierten inmediatamente en un formato raster.",
              "Son una colección de varios archivos (como .shx, .prj, etc.) que deben estar agrupados en la misma carpeta para funcionar.",
              "Se pueden leer subiendo únicamente el archivo .shp e ignorando los demás.",
              "Requieren una clave de encriptación proporcionada por Google."
            ],
            correct: 1,
            explanation: "Un Shapefile es una colección de archivos que deben permanecer juntos en la misma carpeta."
          },
          {
            question: "Una vez que se ha cargado una base de datos espacial utilizando Geopandas, ¿qué método o comando se utiliza para graficar visualmente el mapa de los polígonos?",
            options: [
              ".show_map()",
              ".plot()",
              ".print()",
              ".view()"
            ],
            correct: 1,
            explanation: "El método .plot() genera la visualización del GeoDataFrame."
          },
          {
            question: "¿Qué comando rápido se usa para que Python muestre exclusivamente el resumen del número total de filas y columnas de un marco de datos sin listar toda la información?",
            options: [
              ".columns",
              ".size",
              ".head",
              ".shape"
            ],
            correct: 3,
            explanation: "El atributo .shape devuelve una tupla con (filas, columnas)."
          },
          {
            question: "Al finalizar el procesamiento de una capa vectorial (como el filtro del departamento del Meta), ¿qué función se emplea para exportar y guardar esa nueva información en un archivo dentro de nuestra carpeta conectada?",
            options: [
              ".save_as()",
              ".export_shape()",
              ".to_file() indicando dentro del paréntesis la ruta y el nombre deseado terminado en .shp",
              ".download()"
            ],
            correct: 2,
            explanation: "El método .to_file('ruta/archivo.shp') exporta el GeoDataFrame a un nuevo shapefile."
          }
        ]
      }
    }
  ]
};
