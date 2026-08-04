const COURSE_DATA = {
  title: "Excel para la Vida",
  subtitle: "Domina Excel desde lo basico hasta lo avanzado para potenciar tu productividad diaria",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Fundamentos de Excel",
      description: "Aprende a moverte con soltura por la interfaz de Excel, conoce los tipos de datos y domina los atajos que te ahorraran horas de trabajo.",
      icon: "📗",
      lessons: [
        {
          id: "les-1-1",
          title: "Interfaz y navegacion en Excel",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conoce cada elemento de la interfaz de Excel y aprende a navegar eficientemente entre hojas, libros y cintas de opciones.",
          reading: "**Introduccion a la interfaz de Excel**\n\nExcel es una de las herramientas mas utilizadas en el mundo profesional y personal. Su interfaz esta disenada para facilitar el manejo de grandes cantidades de datos de forma organizada.\n\n**Elementos principales de la interfaz**\n\n- **Cinta de opciones (Ribbon):** Contiene todas las herramientas agrupadas en pestanas como Inicio, Insertar, Formulas, Datos, Revisar y Vista.\n- **Barra de formulas:** Muestra el contenido de la celda activa y permite editar formulas directamente.\n- **Hoja de calculo:** El area principal donde se organizan los datos en filas y columnas.\n- **Barra de estado:** Ubicada en la parte inferior, muestra informacion como promedios, sumas y conteos de celdas seleccionadas.\n\n**Navegacion eficiente**\n\n- Usa **Ctrl + Inicio** para ir a la celda A1 rapidamente.\n- Usa **Ctrl + Fin** para saltar a la ultima celda con datos.\n- Usa **Ctrl + Av Pag / Re Pag** para moverte entre hojas del libro.\n- Haz clic derecho en las flechas de navegacion de hojas para ver una lista completa de todas las hojas disponibles.\n\nDominar la navegacion es el primer paso para ser productivo en Excel. Cuanto menos tiempo pases buscando herramientas, mas tiempo tendras para analizar datos.",
          resources: [
            { title: "Guia oficial de Microsoft Excel", url: "https://support.microsoft.com/es-es/excel", type: "article" },
            { title: "Mapa de la interfaz de Excel", url: "#", type: "article" },
            { title: "Hoja de referencia rapida", url: "#", type: "download" }
          ]
        },
        {
          id: "les-1-2",
          title: "Tipos de datos y formato de celdas",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Comprende los diferentes tipos de datos que maneja Excel y aprende a dar formato profesional a tus celdas y rangos.",
          reading: "**Tipos de datos en Excel**\n\nExcel reconoce automaticamente varios tipos de datos, pero es fundamental entender como funcionan para evitar errores en calculos y presentaciones.\n\n**Principales tipos de datos**\n\n- **Numeros:** Valores numericos que pueden usarse en operaciones matematicas. Excel los alinea a la derecha por defecto.\n- **Texto (cadenas):** Cualquier dato alfanumerico. Se alinea a la izquierda por defecto.\n- **Fechas y horas:** Excel almacena las fechas como numeros seriales, lo que permite realizar calculos temporales.\n- **Valores logicos:** TRUE (VERDADERO) y FALSE (FALSO), utilizados en formulas condicionales.\n- **Formulas:** Expresiones que comienzan con el signo igual (=) y realizan calculos.\n\n**Formato de celdas**\n\n- Accede al formato de celdas con **Ctrl + 1**.\n- En la pestana **Numero** puedes elegir entre formatos como moneda, porcentaje, fecha, hora y personalizado.\n- En la pestana **Alineacion** controlas la orientacion del texto, el ajuste de texto y la combinacion de celdas.\n- En la pestana **Fuente** cambias el tipo de letra, tamano, color y estilo.\n- En la pestana **Bordes** agregas lineas alrededor de las celdas para mejorar la presentacion.\n\n**Consejo importante:** Nunca mezcles texto y numeros en una misma columna si planeas hacer calculos. Excel tratara toda la columna como texto y tus formulas no funcionaran correctamente.",
          resources: [
            { title: "Tipos de datos en Excel - Microsoft", url: "https://support.microsoft.com/es-es/office/tipos-de-datos", type: "article" },
            { title: "Plantilla de practica de formatos", url: "#", type: "download" },
            { title: "Video complementario: Formato personalizado", url: "#", type: "link" }
          ]
        },
        {
          id: "les-1-3",
          title: "Operaciones basicas y atajos esenciales",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Domina las operaciones fundamentales de Excel y los atajos de teclado que multiplicaran tu velocidad de trabajo.",
          reading: "**Operaciones basicas en Excel**\n\nAntes de adentrarte en formulas complejas, es esencial dominar las operaciones fundamentales que usaras a diario.\n\n**Operaciones aritmeticas basicas**\n\n- **Suma:** =A1+B1 o =SUMA(A1:A10)\n- **Resta:** =A1-B1\n- **Multiplicacion:** =A1*B1\n- **Division:** =A1/B1\n- **Porcentaje:** =A1*20% o =A1*0.20\n\n**Atajos esenciales que debes memorizar**\n\n- **Ctrl + C / Ctrl + V:** Copiar y pegar.\n- **Ctrl + Z / Ctrl + Y:** Deshacer y rehacer.\n- **Ctrl + S:** Guardar el archivo.\n- **Ctrl + N:** Negrita.\n- **Ctrl + Shift + L:** Activar o desactivar filtros.\n- **Alt + =:** Autosuma de un rango seleccionado.\n- **F2:** Editar la celda activa.\n- **F4:** Repetir la ultima accion o alternar referencias absolutas y relativas en formulas.\n- **Ctrl + D:** Copiar el contenido de la celda superior hacia abajo.\n\n**Seleccion rapida de rangos**\n\n- **Ctrl + Shift + Flecha:** Selecciona desde la celda activa hasta el final de los datos en esa direccion.\n- **Ctrl + Shift + Inicio:** Selecciona desde la celda activa hasta A1.\n- **Ctrl + Espacio:** Selecciona toda la columna.\n- **Shift + Espacio:** Selecciona toda la fila.\n\nPracticar estos atajos durante una semana hara que se conviertan en habitos automaticos, ahorrando minutos que se acumulan en horas a lo largo del tiempo.",
          resources: [
            { title: "Lista completa de atajos de Excel", url: "https://support.microsoft.com/es-es/office/atajos-de-teclado-en-excel", type: "article" },
            { title: "Ejercicios de operaciones basicas", url: "#", type: "download" },
            { title: "Poster de atajos imprimible", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Modulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es el atajo de teclado para ir rapidamente a la celda A1?",
            options: ["Ctrl + A", "Ctrl + Inicio", "Alt + Inicio", "Ctrl + 1"],
            correct: 1,
            explanation: "Ctrl + Inicio te lleva directamente a la celda A1 desde cualquier posicion en la hoja de calculo."
          },
          {
            question: "¿Como almacena Excel las fechas internamente?",
            options: ["Como texto formateado", "Como numeros seriales", "Como codigo binario", "Como formato XML"],
            correct: 1,
            explanation: "Excel almacena las fechas como numeros seriales, donde cada numero entero representa un dia. Esto permite realizar calculos aritmeticos con fechas."
          },
          {
            question: "¿Que atajo se usa para activar o desactivar los filtros en Excel?",
            options: ["Ctrl + F", "Ctrl + Shift + F", "Ctrl + Shift + L", "Alt + F"],
            correct: 2,
            explanation: "Ctrl + Shift + L activa o desactiva los filtros automaticos en la tabla o rango de datos seleccionado."
          },
          {
            question: "¿Que sucede si mezclas texto y numeros en una misma columna y luego intentas sumar esa columna?",
            options: ["Excel suma solo los numeros automaticamente", "Excel convierte el texto en ceros", "Excel puede generar errores o ignorar las celdas con texto", "Excel muestra un mensaje de advertencia y no permite la suma"],
            correct: 2,
            explanation: "Cuando una columna tiene texto mezclado con numeros, funciones como SUMA ignoran las celdas de texto, lo que puede producir resultados inesperados o incompletos."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Formulas y Funciones",
      description: "Domina las funciones mas poderosas de Excel, desde logicas y de busqueda hasta funciones anidadas con manejo de errores.",
      icon: "🔢",
      lessons: [
        {
          id: "les-2-1",
          title: "Funciones logicas y de busqueda (SI, BUSCARV)",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a usar las funciones SI y BUSCARV para tomar decisiones automaticas y buscar datos en grandes tablas.",
          reading: "**Funciones logicas: la base de la toma de decisiones**\n\nLas funciones logicas permiten que Excel tome decisiones basadas en condiciones que tu defines.\n\n**La funcion SI (IF)**\n\nSintaxis: =SI(condicion, valor_si_verdadero, valor_si_falso)\n\n- Ejemplo: =SI(A1>=60, \"Aprobado\", \"Reprobado\")\n- Puedes anidar hasta 64 funciones SI, aunque se recomienda usar SI.CONJUNTO para mas de 3 condiciones.\n\n**SI.CONJUNTO (IFS)**\n\nSintaxis: =SI.CONJUNTO(condicion1, valor1, condicion2, valor2, ...)\n\n- Ejemplo: =SI.CONJUNTO(A1>=90, \"Excelente\", A1>=70, \"Bueno\", A1>=60, \"Aprobado\", VERDADERO, \"Reprobado\")\n\n**Funcion BUSCARV (VLOOKUP)**\n\nSintaxis: =BUSCARV(valor_buscado, tabla, columna_resultado, [coincidencia])\n\n- **valor_buscado:** El dato que quieres encontrar.\n- **tabla:** El rango donde buscar (la primera columna debe contener los valores de busqueda).\n- **columna_resultado:** El numero de columna del resultado.\n- **coincidencia:** FALSO para busqueda exacta, VERDADERO para aproximada.\n\n- Ejemplo: =BUSCARV(D2, A:C, 3, FALSO) busca el valor de D2 en la columna A y devuelve el valor de la columna C.\n\n**Limitaciones de BUSCARV**\n\n- Solo busca de izquierda a derecha.\n- Si se insertan columnas, la formula puede romperse.\n- Alternativa moderna: usar BUSCARX (XLOOKUP) que busca en cualquier direccion.",
          resources: [
            { title: "Funcion SI - Microsoft", url: "https://support.microsoft.com/es-es/office/funcion-si", type: "article" },
            { title: "Guia completa de BUSCARV", url: "#", type: "article" },
            { title: "Ejercicio practico: SI y BUSCARV", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-2",
          title: "Funciones de texto y fecha",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Manipula cadenas de texto y realiza calculos con fechas usando las funciones especializadas de Excel.",
          reading: "**Funciones de texto**\n\nExcel ofrece un conjunto robusto de funciones para manipular y transformar texto.\n\n**Funciones mas utilizadas**\n\n- **CONCATENAR o CONCAT:** Une varias cadenas de texto. Ejemplo: =CONCAT(A1, \" \", B1)\n- **IZQUIERDA / DERECHA / EXTRAE:** Extraen partes de un texto.\n  - =IZQUIERDA(A1, 3) devuelve los primeros 3 caracteres.\n  - =DERECHA(A1, 4) devuelve los ultimos 4 caracteres.\n  - =EXTRAE(A1, 2, 5) extrae 5 caracteres desde la posicion 2.\n- **MAYUSC / MINUSC / NOMPROPIO:** Cambian las mayusculas y minusculas.\n- **LARGO:** Devuelve la cantidad de caracteres de un texto.\n- **SUSTITUIR:** Reemplaza un texto especifico por otro. Ejemplo: =SUSTITUIR(A1, \"viejo\", \"nuevo\")\n- **ESPACIOS:** Elimina los espacios extra de un texto.\n\n**Funciones de fecha**\n\nTrabajar con fechas es esencial para reportes, cronogramas y analisis temporales.\n\n- **HOY():** Devuelve la fecha actual (se actualiza automaticamente).\n- **AHORA():** Devuelve la fecha y hora actuales.\n- **AÑO / MES / DIA:** Extraen componentes de una fecha.\n  - =AÑO(A1) devuelve el ano de la fecha en A1.\n- **DIAS:** Calcula la diferencia en dias entre dos fechas. Ejemplo: =DIAS(B1, A1)\n- **SIFECHA (DATEDIF):** Calcula la diferencia en anos, meses o dias.\n  - =SIFECHA(A1, B1, \"Y\") devuelve la diferencia en anos.\n  - =SIFECHA(A1, B1, \"M\") devuelve la diferencia en meses.\n- **DIA.LAB:** Calcula una fecha futura o pasada excluyendo fines de semana y festivos.\n\n**Consejo:** Combina funciones de texto y fecha para crear etiquetas dinamicas, como: =CONCAT(\"Reporte de \", TEXTO(HOY(), \"MMMM AAAA\"))",
          resources: [
            { title: "Funciones de texto en Excel", url: "https://support.microsoft.com/es-es/office/funciones-de-texto", type: "article" },
            { title: "Funciones de fecha y hora", url: "#", type: "article" },
            { title: "Archivo de practica: Texto y fechas", url: "#", type: "download" }
          ]
        },
        {
          id: "les-2-3",
          title: "Funciones anidadas y manejo de errores",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Combina multiples funciones en formulas avanzadas y aprende a manejar errores para crear hojas de calculo robustas.",
          reading: "**Funciones anidadas**\n\nUna funcion anidada es una funcion dentro de otra funcion. Esto permite construir formulas poderosas que resuelven problemas complejos en una sola celda.\n\n**Ejemplo de anidacion**\n\n- =SI(ESERROR(BUSCARV(A1, Tabla, 2, FALSO)), \"No encontrado\", BUSCARV(A1, Tabla, 2, FALSO))\n- Esta formula busca un valor y, si genera error, muestra \"No encontrado\".\n\n**Buenas practicas para funciones anidadas**\n\n- Construye la formula desde adentro hacia afuera.\n- Usa colores de parentesis para verificar que estan balanceados.\n- Divide formulas muy complejas en celdas auxiliares para facilitar la depuracion.\n- Usa nombres de rango para hacer las formulas mas legibles.\n\n**Manejo de errores**\n\nLos errores mas comunes en Excel y como manejarlos:\n\n- **#DIV/0!:** Division entre cero. Solucion: =SI(B1=0, 0, A1/B1)\n- **#N/A:** Valor no encontrado en busquedas. Solucion: =SI.ND(BUSCARV(...), \"No encontrado\")\n- **#VALOR!:** Tipo de dato incorrecto en una operacion.\n- **#REF!:** Referencia a una celda eliminada.\n- **#NOMBRE?:** Nombre de funcion mal escrito o no reconocido.\n- **#NUM!:** Numero invalido en la formula.\n\n**Funciones de control de errores**\n\n- **ESERROR:** Devuelve VERDADERO si hay cualquier error.\n- **SI.ERROR (IFERROR):** Si la formula da error, devuelve un valor alternativo. Ejemplo: =SI.ERROR(A1/B1, 0)\n- **SI.ND (IFNA):** Especifica para errores #N/A.\n- **TIPO.DE.ERROR:** Devuelve un numero que identifica el tipo de error.\n\nUsar funciones de manejo de errores es una marca de profesionalismo en Excel. Tus hojas de calculo seran mas robustas y faciles de mantener.",
          resources: [
            { title: "Funciones anidadas en Excel", url: "#", type: "article" },
            { title: "Guia de errores en Excel - Microsoft", url: "https://support.microsoft.com/es-es/office/detectar-errores-en-formulas", type: "article" },
            { title: "Ejercicio: Formulas complejas con errores", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Modulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es la sintaxis correcta de la funcion BUSCARV?",
            options: [
              "=BUSCARV(tabla, valor, columna, coincidencia)",
              "=BUSCARV(valor_buscado, tabla, columna_resultado, coincidencia)",
              "=BUSCARV(columna, tabla, valor, coincidencia)",
              "=BUSCARV(valor, columna, tabla, coincidencia)"
            ],
            correct: 1,
            explanation: "La sintaxis correcta es =BUSCARV(valor_buscado, tabla, columna_resultado, coincidencia). El valor buscado siempre va primero, seguido de la tabla donde buscar."
          },
          {
            question: "¿Que funcion usarias para evitar que se muestre un error #N/A en una busqueda?",
            options: ["SI.ERROR", "ESERROR", "SI.ND", "TIPO.DE.ERROR"],
            correct: 2,
            explanation: "SI.ND (IFNA) esta disenada especificamente para manejar errores #N/A, que son los mas comunes en funciones de busqueda como BUSCARV."
          },
          {
            question: "¿Que funcion devuelve la fecha actual y se actualiza automaticamente?",
            options: ["FECHA()", "AHORA()", "HOY()", "DIA()"],
            correct: 2,
            explanation: "HOY() devuelve la fecha actual sin hora y se actualiza automaticamente cada vez que se recalcula la hoja."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Tablas Dinamicas y Graficos",
      description: "Transforma datos crudos en informacion visual y dinamica con tablas dinamicas, segmentadores y graficos profesionales.",
      icon: "📊",
      lessons: [
        {
          id: "les-3-1",
          title: "Crear y configurar tablas dinamicas",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a crear tablas dinamicas desde cero para resumir y analizar grandes volumenes de datos en segundos.",
          reading: "**¿Que es una tabla dinamica?**\n\nUna tabla dinamica es una herramienta que permite resumir, analizar, explorar y presentar datos de manera interactiva. Es una de las funcionalidades mas poderosas de Excel.\n\n**Crear una tabla dinamica**\n\n- Selecciona tus datos (asegurate de que tengan encabezados).\n- Ve a **Insertar > Tabla dinamica**.\n- Elige si deseas colocarla en una hoja nueva o existente.\n- Arrastra campos a las areas: Filas, Columnas, Valores y Filtros.\n\n**Requisitos de los datos**\n\n- Los datos deben tener encabezados unicos en cada columna.\n- No debe haber filas ni columnas completamente vacias dentro del rango.\n- Los datos deben ser consistentes (no mezclar tipos de datos en una columna).\n- Se recomienda convertir el rango en una Tabla de Excel (Ctrl + T) antes de crear la tabla dinamica.\n\n**Configuracion de campos de valor**\n\n- Por defecto, los campos numericos se resumen con SUMA y los de texto con CUENTA.\n- Puedes cambiar el tipo de resumen: clic derecho en el campo > **Configuracion de campo de valor**.\n- Opciones disponibles: Suma, Cuenta, Promedio, Max, Min, Producto, entre otros.\n- En la pestana **Mostrar valores como** puedes mostrar porcentajes, diferencias, acumulados, etc.\n\n**Actualizar la tabla dinamica**\n\n- Clic derecho > **Actualizar** o usa **Alt + F5**.\n- Si los datos fuente cambian de tamano, usa **Cambiar origen de datos** para actualizar el rango.",
          resources: [
            { title: "Crear una tabla dinamica - Microsoft", url: "https://support.microsoft.com/es-es/office/crear-una-tabla-dinamica", type: "article" },
            { title: "Datos de practica para tablas dinamicas", url: "#", type: "download" },
            { title: "Video: Tablas dinamicas avanzadas", url: "#", type: "link" }
          ]
        },
        {
          id: "les-3-2",
          title: "Segmentadores y lineas de tiempo",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Agrega controles visuales e interactivos a tus tablas dinamicas para filtrar datos de forma rapida y elegante.",
          reading: "**Segmentadores (Slicers)**\n\nLos segmentadores son botones visuales que permiten filtrar datos en tablas dinamicas de forma interactiva y visual.\n\n**Como insertar un segmentador**\n\n- Selecciona tu tabla dinamica.\n- Ve a **Insertar > Segmentacion de datos** (o desde la pestana Analizar de tabla dinamica).\n- Selecciona los campos por los que deseas filtrar.\n- Aparecera un panel flotante con botones para cada valor unico del campo.\n\n**Configuracion de segmentadores**\n\n- Puedes seleccionar multiples valores manteniendo **Ctrl** presionado.\n- Cambia el numero de columnas del segmentador para una mejor visualizacion.\n- Personaliza colores y estilos desde la pestana **Opciones de segmentacion**.\n- Un mismo segmentador puede controlar multiples tablas dinamicas (clic derecho > Conexiones de informe).\n\n**Lineas de tiempo (Timeline)**\n\nLas lineas de tiempo son controles especificos para filtrar por periodos de tiempo.\n\n- Solo funcionan con campos de fecha.\n- Ve a **Insertar > Escala de tiempo**.\n- Permiten filtrar por dias, meses, trimestres o anos.\n- Son ideales para dashboards y reportes interactivos.\n\n**Buenas practicas para dashboards**\n\n- Coloca los segmentadores en la parte superior o lateral del dashboard.\n- Usa colores consistentes que coincidan con el diseno general.\n- Conecta todos los segmentadores a todas las tablas dinamicas y graficos del dashboard.\n- Agrega un boton para limpiar todos los filtros simultaneamente.",
          resources: [
            { title: "Segmentadores en Excel - Microsoft", url: "https://support.microsoft.com/es-es/office/usar-segmentaciones", type: "article" },
            { title: "Plantilla de dashboard interactivo", url: "#", type: "download" },
            { title: "Tutorial: Lineas de tiempo", url: "#", type: "link" }
          ]
        },
        {
          id: "les-3-3",
          title: "Graficos profesionales y dinamicos",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Crea graficos visualmente atractivos y conectalos a tablas dinamicas para que se actualicen automaticamente.",
          reading: "**Tipos de graficos y cuando usarlos**\n\nElegir el grafico correcto es crucial para comunicar datos de manera efectiva.\n\n**Graficos mas comunes**\n\n- **Barras/Columnas:** Comparar categorias. Usa columnas para pocas categorias y barras horizontales para muchas.\n- **Lineas:** Mostrar tendencias a lo largo del tiempo.\n- **Circular (Pastel):** Mostrar proporciones de un todo. Usa solo con 5-7 categorias maximo.\n- **Area:** Similar a lineas, pero enfatiza el volumen total.\n- **Disperso (XY):** Mostrar la relacion entre dos variables numericas.\n- **Combinado:** Mezcla dos tipos de graficos con ejes secundarios.\n\n**Crear un grafico dinamico**\n\n- Selecciona tu tabla dinamica.\n- Ve a **Insertar > Grafico dinamico**.\n- El grafico se actualizara automaticamente cuando cambien los filtros de la tabla dinamica.\n- Los segmentadores tambien afectan al grafico dinamico si estan conectados.\n\n**Diseno profesional de graficos**\n\n- Elimina elementos innecesarios: fondos, cuadriculas excesivas, efectos 3D.\n- Usa una paleta de colores limitada y coherente.\n- Agrega etiquetas de datos solo cuando aporten claridad.\n- El titulo debe ser descriptivo: \"Ventas por region - Q1 2026\" es mejor que \"Grafico 1\".\n- Usa formato de numero en los ejes (miles con K, millones con M).\n\n**Graficos sparkline**\n\n- Son mini graficos dentro de una celda.\n- Ve a **Insertar > Minigraficos**.\n- Ideales para mostrar tendencias rapidas junto a los datos en una tabla.",
          resources: [
            { title: "Tipos de graficos en Excel", url: "https://support.microsoft.com/es-es/office/tipos-de-graficos-disponibles", type: "article" },
            { title: "Guia de diseno de graficos", url: "#", type: "article" },
            { title: "Plantilla de graficos profesionales", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Modulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Que requisito deben cumplir los datos antes de crear una tabla dinamica?",
            options: [
              "Deben estar ordenados alfabeticamente",
              "Deben tener encabezados unicos en cada columna",
              "Deben estar en formato de texto",
              "Deben tener al menos 1000 filas"
            ],
            correct: 1,
            explanation: "Los datos deben tener encabezados unicos en cada columna para que la tabla dinamica pueda identificar correctamente cada campo."
          },
          {
            question: "¿Que herramienta permite filtrar una tabla dinamica por periodos de tiempo de forma visual?",
            options: ["Segmentador", "Filtro avanzado", "Linea de tiempo", "Formato condicional"],
            correct: 2,
            explanation: "Las lineas de tiempo (Timeline) son controles disenados especificamente para filtrar datos por periodos de tiempo (dias, meses, trimestres, anos)."
          },
          {
            question: "¿Cual es la mejor practica al disenar graficos profesionales?",
            options: [
              "Usar efectos 3D para mayor impacto visual",
              "Agregar tantas etiquetas como sea posible",
              "Eliminar elementos innecesarios y usar una paleta de colores limitada",
              "Usar fondos con colores brillantes"
            ],
            correct: 2,
            explanation: "Un grafico profesional debe ser limpio y claro. Eliminar elementos innecesarios y usar colores coherentes ayuda a comunicar la informacion de forma efectiva."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Analisis de Datos",
      description: "Utiliza herramientas avanzadas de analisis como formato condicional, validacion de datos y Solver para tomar mejores decisiones.",
      icon: "🔍",
      lessons: [
        {
          id: "les-4-1",
          title: "Formato condicional avanzado",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica formato condicional avanzado para resaltar patrones, tendencias y valores criticos en tus datos automaticamente.",
          reading: "**Formato condicional: mas alla de lo basico**\n\nEl formato condicional cambia automaticamente la apariencia de las celdas basandose en reglas que tu defines. Es una herramienta visual poderosa para el analisis de datos.\n\n**Tipos de reglas predefinidas**\n\n- **Resaltar reglas de celdas:** Mayor que, menor que, entre, igual a, texto que contiene, fechas, duplicados.\n- **Reglas superiores e inferiores:** Los 10 mejores, el 10% inferior, por encima del promedio, etc.\n- **Barras de datos:** Barras horizontales dentro de las celdas que representan el valor relativo.\n- **Escalas de color:** Gradientes de colores que muestran la distribucion de valores.\n- **Conjuntos de iconos:** Flechas, semaforos, estrellas que indican el rendimiento.\n\n**Reglas personalizadas con formulas**\n\n- Selecciona **Nueva regla > Utilizar una formula**.\n- Ejemplo: =Y($B2>1000, $C2=\"Pendiente\") resalta filas donde el monto es mayor a 1000 Y el estado es Pendiente.\n- Usa referencias mixtas ($ en la columna, no en la fila) para que la regla se aplique a toda la fila.\n\n**Administrar reglas de formato condicional**\n\n- Ve a **Inicio > Formato condicional > Administrar reglas**.\n- Puedes reordenar las reglas (la prioridad importa).\n- Activa **Detener si es verdadero** cuando quieras que solo se aplique la primera regla que se cumpla.\n\n**Consejos practicos**\n\n- No abuses del formato condicional: demasiados colores confunden en lugar de aclarar.\n- Usa semaforos (verde, amarillo, rojo) para KPIs.\n- Las barras de datos son excelentes para comparaciones rapidas dentro de tablas.",
          resources: [
            { title: "Formato condicional - Microsoft", url: "https://support.microsoft.com/es-es/office/formato-condicional", type: "article" },
            { title: "Plantilla con ejemplos de formato condicional", url: "#", type: "download" },
            { title: "Video: Formulas en formato condicional", url: "#", type: "link" }
          ]
        },
        {
          id: "les-4-2",
          title: "Validacion de datos y listas desplegables",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Controla la entrada de datos con validaciones y listas desplegables para evitar errores y mantener la consistencia.",
          reading: "**Validacion de datos**\n\nLa validacion de datos limita el tipo de informacion que se puede ingresar en una celda, previniendo errores desde el origen.\n\n**Como configurar la validacion**\n\n- Selecciona las celdas donde aplicar la validacion.\n- Ve a **Datos > Validacion de datos**.\n- En la pestana **Configuracion**, elige el criterio.\n\n**Tipos de validacion disponibles**\n\n- **Numero entero:** Solo permite numeros enteros dentro de un rango.\n- **Decimal:** Permite numeros con decimales dentro de un rango.\n- **Lista:** Crea una lista desplegable con opciones predefinidas.\n- **Fecha:** Solo permite fechas dentro de un rango.\n- **Hora:** Solo permite horas dentro de un rango.\n- **Longitud de texto:** Limita la cantidad de caracteres.\n- **Personalizada:** Usa una formula para definir la validacion.\n\n**Crear listas desplegables**\n\n- En Validacion de datos, selecciona **Lista**.\n- En **Origen**, escribe los valores separados por comas: Alto, Medio, Bajo.\n- O referencia un rango: =$H$1:$H$5.\n- Para listas dependientes (cascada), usa INDIRECTO con rangos nombrados.\n\n**Mensajes y alertas**\n\n- Pestana **Mensaje de entrada:** Muestra una nota cuando el usuario selecciona la celda.\n- Pestana **Mensaje de error:** Define que pasa cuando se ingresa un dato invalido.\n  - **Detener:** No permite el dato invalido.\n  - **Advertencia:** Permite el dato pero muestra advertencia.\n  - **Informacion:** Solo muestra un mensaje informativo.\n\n**Consejo:** Combina validacion de datos con formato condicional para crear formularios profesionales y a prueba de errores.",
          resources: [
            { title: "Validacion de datos - Microsoft", url: "https://support.microsoft.com/es-es/office/validacion-de-datos", type: "article" },
            { title: "Tutorial: Listas desplegables dependientes", url: "#", type: "article" },
            { title: "Plantilla de formulario con validacion", url: "#", type: "download" }
          ]
        },
        {
          id: "les-4-3",
          title: "Solver y analisis de escenarios",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Resuelve problemas de optimizacion con Solver y explora multiples escenarios para la toma de decisiones estrategicas.",
          reading: "**Solver: optimizacion en Excel**\n\nSolver es un complemento de Excel que encuentra el valor optimo de una celda objetivo cambiando los valores de otras celdas, sujeto a restricciones.\n\n**Activar Solver**\n\n- Ve a **Archivo > Opciones > Complementos**.\n- En la parte inferior, selecciona **Complementos de Excel** y haz clic en **Ir**.\n- Marca **Solver** y acepta.\n- Ahora aparecera en la pestana **Datos > Solver**.\n\n**Configurar un problema en Solver**\n\n- **Celda objetivo:** La celda que quieres optimizar (maximizar, minimizar o igualar a un valor).\n- **Celdas variables:** Las celdas que Solver puede modificar para alcanzar el objetivo.\n- **Restricciones:** Condiciones que deben cumplirse (presupuesto maximo, cantidades minimas, etc.).\n\n**Ejemplo practico:** Maximizar las ganancias de una empresa ajustando las cantidades de produccion de 3 productos, sin exceder el presupuesto ni la capacidad de produccion.\n\n**Analisis de escenarios**\n\nEl Administrador de escenarios permite guardar diferentes conjuntos de valores y comparar resultados.\n\n- Ve a **Datos > Analisis de hipotesis > Administrador de escenarios**.\n- Crea escenarios como \"Optimista\", \"Pesimista\" y \"Realista\".\n- Genera un informe de resumen para comparar todos los escenarios en una tabla.\n\n**Tablas de datos (una y dos variables)**\n\n- **Una variable:** Muestra como cambia un resultado al variar un input.\n- **Dos variables:** Muestra como cambia un resultado al variar dos inputs simultaneamente.\n- Ve a **Datos > Analisis de hipotesis > Tabla de datos**.\n\n**Buscar objetivo (Goal Seek)**\n\n- Herramienta mas sencilla que Solver para encontrar un valor especifico.\n- Ve a **Datos > Analisis de hipotesis > Buscar objetivo**.\n- Ejemplo: ¿Cuantas unidades debo vender para alcanzar $100,000 de ganancia?",
          resources: [
            { title: "Usar Solver en Excel - Microsoft", url: "https://support.microsoft.com/es-es/office/usar-solver", type: "article" },
            { title: "Guia de analisis de escenarios", url: "#", type: "article" },
            { title: "Ejercicio practico: Optimizacion con Solver", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Modulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Que tipo de referencia debes usar en formulas de formato condicional para que la regla se aplique a toda la fila?",
            options: [
              "Referencia absoluta en columna y fila",
              "Referencia relativa en ambas",
              "Referencia mixta: absoluta en columna, relativa en fila",
              "Referencia mixta: relativa en columna, absoluta en fila"
            ],
            correct: 2,
            explanation: "Se usa referencia mixta con $ en la columna (absoluta) y sin $ en la fila (relativa), por ejemplo $B2, para que la regla evalue la misma columna pero se desplace fila por fila."
          },
          {
            question: "¿Que tipo de mensaje de error en validacion de datos NO permite ingresar el dato invalido?",
            options: ["Informacion", "Advertencia", "Detener", "Alerta"],
            correct: 2,
            explanation: "El tipo 'Detener' impide completamente que el usuario ingrese un dato que no cumpla con la validacion establecida."
          },
          {
            question: "¿Cual es la diferencia principal entre Solver y Buscar objetivo?",
            options: [
              "Buscar objetivo es mas rapido que Solver",
              "Solver puede manejar multiples variables y restricciones, Buscar objetivo solo una variable",
              "Buscar objetivo es un complemento y Solver viene integrado",
              "No hay diferencia, son la misma herramienta"
            ],
            correct: 1,
            explanation: "Solver es una herramienta mas avanzada que puede optimizar con multiples celdas variables y restricciones, mientras que Buscar objetivo solo ajusta una celda para alcanzar un valor especifico."
          },
          {
            question: "¿Como se crean listas desplegables dependientes (en cascada) en Excel?",
            options: [
              "Con la funcion BUSCARV en validacion",
              "Con la funcion INDIRECTO combinada con rangos nombrados",
              "Con formato condicional",
              "Con macros exclusivamente"
            ],
            correct: 1,
            explanation: "Las listas dependientes se crean usando la funcion INDIRECTO dentro de la validacion de datos, referenciando rangos nombrados que cambian segun la seleccion de la primera lista."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Automatizacion con Macros",
      description: "Automatiza tareas repetitivas con macros y VBA para llevar tu productividad en Excel al siguiente nivel.",
      icon: "⚙️",
      lessons: [
        {
          id: "les-5-1",
          title: "Introduccion a macros y VBA",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Descubre el poder de las macros y el lenguaje VBA para automatizar cualquier tarea repetitiva en Excel.",
          reading: "**¿Que son las macros?**\n\nUna macro es una secuencia de instrucciones que automatiza tareas repetitivas en Excel. Detras de cada macro hay codigo VBA (Visual Basic for Applications).\n\n**¿Por que aprender macros?**\n\n- Eliminan tareas manuales repetitivas.\n- Reducen errores humanos.\n- Ahorran horas de trabajo cada semana.\n- Permiten crear herramientas personalizadas.\n\n**Habilitar la pestana Desarrollador**\n\n- Ve a **Archivo > Opciones > Personalizar cinta de opciones**.\n- Marca la casilla **Desarrollador** y acepta.\n- Ahora tendras acceso a herramientas de macros, VBA y controles de formulario.\n\n**El Editor de VBA**\n\n- Accede con **Alt + F11**.\n- Componentes principales:\n  - **Explorador de proyectos:** Muestra todos los libros abiertos y sus modulos.\n  - **Ventana de propiedades:** Muestra las propiedades del objeto seleccionado.\n  - **Ventana de codigo:** Donde escribes y editas el codigo VBA.\n  - **Ventana Inmediato:** Para ejecutar instrucciones rapidas y depurar (Ctrl + G).\n\n**Tu primera macro en VBA**\n\n- En el Editor de VBA, inserta un nuevo modulo: **Insertar > Modulo**.\n- Escribe:\n  Sub MiPrimeraMacro()\n      MsgBox \"¡Hola! Esta es mi primera macro.\"\n  End Sub\n- Ejecuta con **F5** o desde la ventana de macros (Alt + F8).\n\n**Formatos de archivo**\n\n- Las macros solo se guardan en archivos **.xlsm** (libro habilitado para macros).\n- Si guardas como .xlsx, perderas las macros.\n- Tambien puedes usar **.xlsb** (formato binario) que soporta macros y es mas liviano.",
          resources: [
            { title: "Introduccion a VBA - Microsoft", url: "https://docs.microsoft.com/es-es/office/vba/library-reference/concepts/getting-started-with-vba-in-office", type: "article" },
            { title: "Guia rapida de VBA para principiantes", url: "#", type: "article" },
            { title: "Archivo de practica: Primeras macros", url: "#", type: "download" }
          ]
        },
        {
          id: "les-5-2",
          title: "Grabacion y edicion de macros",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a grabar macros sin escribir codigo y luego a editarlas en VBA para personalizarlas a tus necesidades.",
          reading: "**Grabar una macro**\n\nLa grabadora de macros convierte tus acciones en Excel en codigo VBA automaticamente. Es la forma mas facil de empezar.\n\n**Pasos para grabar una macro**\n\n- Ve a **Desarrollador > Grabar macro** (o usa el boton en la barra de estado).\n- Asigna un nombre (sin espacios), un atajo de teclado opcional y una descripcion.\n- Elige donde guardarla: este libro, libro nuevo o libro personal de macros.\n- Realiza las acciones que deseas automatizar.\n- Haz clic en **Detener grabacion**.\n\n**Consejos para una buena grabacion**\n\n- Planifica los pasos antes de grabar.\n- Usa el teclado en lugar del raton cuando sea posible (genera codigo mas limpio).\n- Evita acciones innecesarias como desplazarte o seleccionar celdas sin proposito.\n- Graba en pequenas partes y luego combina el codigo.\n\n**Editar macros grabadas**\n\n- Ve a **Desarrollador > Macros > selecciona la macro > Editar**.\n- El codigo grabado suele ser mas largo de lo necesario. Puedes:\n  - Eliminar lineas de seleccion innecesarias (.Select y Selection.).\n  - Agregar variables para hacer el codigo mas flexible.\n  - Incluir bucles (For, Do While) para repetir acciones.\n  - Agregar condicionales (If...Then...Else) para tomar decisiones.\n\n**Ejemplo de optimizacion:**\n\nCodigo grabado:\n  Range(\"A1\").Select\n  Selection.Font.Bold = True\n\nCodigo optimizado:\n  Range(\"A1\").Font.Bold = True\n\n**Asignar macros a botones**\n\n- Ve a **Desarrollador > Insertar > Boton (control de formulario)**.\n- Dibuja el boton en la hoja.\n- Asigna la macro deseada.\n- Cambia el texto del boton para que sea descriptivo.",
          resources: [
            { title: "Grabar una macro - Microsoft", url: "https://support.microsoft.com/es-es/office/grabar-una-macro", type: "article" },
            { title: "Ejercicio: Graba y edita tu macro", url: "#", type: "download" },
            { title: "Referencia rapida de VBA", url: "#", type: "article" }
          ]
        },
        {
          id: "les-5-3",
          title: "Proyecto final: Sistema automatizado en Excel",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aplica todo lo aprendido para construir un sistema completo y automatizado en Excel con formularios, macros y dashboards.",
          reading: "**Proyecto final: Sistema de gestion automatizado**\n\nEn este proyecto integrador vas a construir un sistema completo que combine todas las habilidades del curso.\n\n**Descripcion del proyecto**\n\nCrearas un sistema de gestion de inventario con las siguientes caracteristicas:\n\n- Formulario de entrada de datos con validacion.\n- Base de datos con formato automatico.\n- Dashboard con tablas dinamicas y graficos.\n- Macros para automatizar reportes.\n\n**Fase 1: Estructura de datos**\n\n- Crea una tabla de productos con columnas: ID, Nombre, Categoria, Stock, Precio, Proveedor.\n- Aplica validacion de datos en cada columna.\n- Usa formato condicional para resaltar stock bajo (rojo) y stock alto (verde).\n- Define nombres de rango para facilitar las formulas.\n\n**Fase 2: Formulas y calculos**\n\n- Usa BUSCARV para consultar informacion de productos.\n- Crea formulas con SI y SI.ERROR para clasificaciones automaticas.\n- Calcula totales, promedios y estadisticas con SUMAR.SI y CONTAR.SI.\n- Implementa funciones de fecha para calcular antiguedad del inventario.\n\n**Fase 3: Dashboard**\n\n- Crea tablas dinamicas que resuman ventas por categoria, proveedor y periodo.\n- Agrega graficos dinamicos conectados.\n- Inserta segmentadores y lineas de tiempo.\n- Disena un layout profesional y limpio.\n\n**Fase 4: Automatizacion con macros**\n\n- Macro para agregar nuevos productos al inventario.\n- Macro para generar un reporte mensual automaticamente.\n- Macro para enviar alertas de stock bajo.\n- Boton de actualizacion general del dashboard.\n\n**Criterios de evaluacion**\n\n- Funcionalidad completa y sin errores.\n- Uso correcto de validacion y formato condicional.\n- Dashboard claro e interactivo.\n- Macros funcionales y con manejo de errores.\n- Presentacion profesional del archivo final.",
          resources: [
            { title: "Plantilla base del proyecto final", url: "#", type: "download" },
            { title: "Guia paso a paso del proyecto", url: "#", type: "article" },
            { title: "Rubrica de evaluacion", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz — Modulo 5",
        passingScore: 70,
        questions: [
          {
            question: "¿En que formato de archivo debes guardar un libro de Excel para conservar las macros?",
            options: [".xlsx", ".xlsm", ".csv", ".xls"],
            correct: 1,
            explanation: "El formato .xlsm (libro habilitado para macros) es el formato correcto para guardar archivos que contienen macros. El formato .xlsx no soporta macros."
          },
          {
            question: "¿Cual es el atajo de teclado para abrir el Editor de VBA?",
            options: ["Ctrl + F11", "Alt + F11", "F11", "Ctrl + Alt + V"],
            correct: 1,
            explanation: "Alt + F11 abre directamente el Editor de Visual Basic for Applications donde puedes escribir y editar codigo de macros."
          },
          {
            question: "¿Que se recomienda hacer al grabar una macro para obtener codigo mas limpio?",
            options: [
              "Usar el raton para todas las acciones",
              "Grabar la macro completa de una sola vez",
              "Usar el teclado en lugar del raton cuando sea posible",
              "No planificar los pasos para que sea mas natural"
            ],
            correct: 2,
            explanation: "Usar el teclado genera codigo VBA mas limpio y eficiente que las acciones con el raton, que suelen incluir selecciones innecesarias."
          },
          {
            question: "¿Que linea de codigo es la version optimizada de Range(\"A1\").Select seguido de Selection.Font.Bold = True?",
            options: [
              "Cells(1,1).Select.Bold = True",
              "Range(\"A1\").Font.Bold = True",
              "ActiveCell.Font.Bold = True",
              "Bold Range(\"A1\") = True"
            ],
            correct: 1,
            explanation: "Range(\"A1\").Font.Bold = True aplica el formato directamente sin necesidad de seleccionar la celda primero, lo cual es mas eficiente."
          }
        ]
      }
    }
  ]
};