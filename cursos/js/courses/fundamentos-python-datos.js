const COURSE_DATA = {
  title: "Fundamentos Python en Datos",
  subtitle: "Domina las bases de la programación para el análisis de datos científico",
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1: Sintaxis y Lógica",
      description: "Aprende a comunicarte con Python y a estructurar programas lógicos.",
      icon: "🐍",
      lessons: [
        {
          id: "les-1-1",
          title: "Variables y Tipos de Datos",
          type: "video",
          duration: "45 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Entiende cómo Python almacena información en memoria.",
          reading: "**Contenido Técnico: Variables**\n\nEn Python, una variable es un contenedor para almacenar valores de datos. A diferencia de otros lenguajes, no necesitas declarar el tipo de variable.\n\n**Tipos principales:**\n- `int`: Números enteros.\n- `float`: Números decimales.\n- `str`: Cadenas de texto.\n- `bool`: Valores lógicos (True/False).",
          resources: [{ title: "Cheat Sheet Python", url: "#", type: "download" }]
        },
        {
          id: "les-1-2",
          title: "Estructuras de Control (If/Else)",
          type: "video",
          duration: "45 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Toma decisiones basadas en datos.",
          reading: "**Lógica de Programación**\n\nLa sentencia `if` permite ejecutar código solo si se cumple una condición específica. Es la base de cualquier algoritmo de decisión.",
          resources: []
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz: Bases de Python",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué tipo de dato es 3.14?",
            options: ["int", "str", "float", "bool"],
            correct: 2,
            explanation: "Los números con decimales en Python se denominan float."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Módulo 2: Manipulación de Colecciones",
      description: "Trabaja con grandes volúmenes de datos usando listas y diccionarios.",
      icon: "📊",
      lessons: [
        {
          id: "les-2-1",
          title: "Listas y Diccionarios",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Organiza tus datos eficientemente.",
          reading: "**Estructuras de Datos**\n\nLas listas nos permiten guardar múltiples elementos en una sola variable. Los diccionarios nos permiten asociar una 'clave' con un 'valor'.",
          resources: []
        }
      ],
      quiz: { id: "q2", title: "Quiz: Colecciones", passingScore: 70, questions: [] }
    },
    {
      id: "mod-3",
      title: "Módulo 3: Introducción a Pandas",
      description: "Tu primer paso hacia el análisis de datos profesional.",
      icon: "📈",
      lessons: [
        {
          id: "les-3-1",
          title: "DataFrames con Pandas",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Carga y explora tablas de datos.",
          reading: "**Pandas para Científicos**\n\nPandas es la librería estándar para manejar tablas (DataFrames). Aprenderás a usar `pd.read_csv()` para cargar tus primeros conjuntos de datos.",
          resources: []
        }
      ],
      quiz: { id: "q3", title: "Quiz: Pandas", passingScore: 70, questions: [] }
    }
  ]
};
