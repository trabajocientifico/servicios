const COURSE_DATA = {
  title: "Visualización Gráfica con Python + IA",
  subtitle: "Crea visualizaciones científicas potentes y dashboards inteligentes con Python e IA",
  hours: 9,
  modules: [
    {
      id: "mod-1",
      title: "Módulo 1: Fundamentos de Visualización",
      description: "Principios de diseño visual y primeras gráficas con Matplotlib y Seaborn.",
      icon: "🎨",
      lessons: [
        {
          id: "les-1-1",
          title: "Matplotlib y Seaborn",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a construir gráficas profesionales con las bibliotecas estándar de Python.",
          reading: "**Conceptos Fundamentales**\n\n1. **Matplotlib:** Biblioteca base de visualización en Python. Permite crear gráficos estáticos altamente personalizables (líneas, barras, dispersión, histogramas) controlando cada elemento (ejes, leyendas, anotaciones).\n\n2. **Seaborn:** Capa construida sobre Matplotlib que simplifica la creación de visualizaciones estadísticas (boxplots, violinplots, heatmaps, pairplots). Trabaja directamente con DataFrames de Pandas.\n\n3. **Principios de diseño visual:** Maximizar la relación dato/tinta, elegir el tipo de gráfico adecuado al mensaje, usar paletas de color accesibles y evitar la sobrecarga visual son las claves para que un gráfico comunique con claridad.",
          resources: []
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz: Fundamentos de Visualización",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué biblioteca es la base de la visualización en Python?",
            options: ["Matplotlib", "Pandas", "NumPy", "TensorFlow"],
            correct: 0,
            explanation: "Matplotlib es la biblioteca fundamental sobre la que se construyen muchas otras como Seaborn y Pandas plot."
          },
          {
            question: "¿Cuál es la función principal para crear una figura en Matplotlib?",
            options: ["plt.figure()", "plt.show()", "plt.draw()", "plt.run()"],
            correct: 0,
            explanation: "plt.figure() crea un nuevo objeto Figure que actúa como lienzo de la visualización."
          },
          {
            question: "¿Qué ventaja ofrece Seaborn sobre Matplotlib?",
            options: ["Es más rápido", "Sintaxis más simple para gráficos estadísticos y mejor integración con DataFrames", "Solo soporta gráficos 3D", "No usa colores"],
            correct: 1,
            explanation: "Seaborn simplifica gráficos estadísticos comunes y trabaja directamente con DataFrames de Pandas."
          },
          {
            question: "¿Qué tipo de gráfico es ideal para mostrar la distribución de una variable continua?",
            options: ["Gráfico de pastel", "Histograma o boxplot", "Diagrama de Venn", "Gráfico de barras horizontal"],
            correct: 1,
            explanation: "Histogramas y boxplots muestran cómo se distribuye una variable continua, sus valores típicos y dispersión."
          },
          {
            question: "¿Qué función de Seaborn crea un mapa de calor?",
            options: ["sns.heatmap()", "sns.boxplot()", "sns.lineplot()", "sns.barplot()"],
            correct: 0,
            explanation: "sns.heatmap() visualiza matrices (como correlaciones) usando intensidad de color."
          },
          {
            question: "¿Qué representa un boxplot?",
            options: ["La media solamente", "Los cuartiles, mediana, valores atípicos y rango de los datos", "Solo el máximo y mínimo", "El número de observaciones"],
            correct: 1,
            explanation: "El boxplot resume la distribución mostrando Q1, mediana, Q3, bigotes y outliers."
          },
          {
            question: "¿Qué función combina varios subplots en una sola figura?",
            options: ["plt.subplots()", "plt.merge()", "plt.combine()", "plt.add()"],
            correct: 0,
            explanation: "plt.subplots() devuelve una figura con un grid de ejes (axes) listos para dibujar."
          },
          {
            question: "¿Qué buena práctica mejora la accesibilidad de un gráfico?",
            options: ["Usar muchos colores brillantes", "Elegir paletas accesibles para daltonismo y añadir etiquetas claras", "Quitar todos los textos", "Usar tipografía decorativa"],
            correct: 1,
            explanation: "Paletas como viridis o cividis son perceptualmente uniformes y accesibles para personas con daltonismo."
          },
          {
            question: "¿Qué es el principio de 'data-ink ratio' de Tufte?",
            options: ["Usar más tinta para decoración", "Maximizar la tinta dedicada a los datos y minimizar la decorativa", "Imprimir en color", "Usar solo blanco y negro"],
            correct: 1,
            explanation: "Tufte propone que la mayor parte de la tinta de un gráfico debe representar datos, no adornos."
          },
          {
            question: "¿Qué función guarda una figura como imagen en Matplotlib?",
            options: ["plt.savefig('archivo.png')", "plt.export()", "plt.write()", "plt.download()"],
            correct: 0,
            explanation: "plt.savefig() exporta la figura a formatos como PNG, PDF, SVG y JPG."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Módulo 2: Visualización Interactiva",
      description: "Crea gráficos interactivos con Plotly y Bokeh para explorar datos dinámicamente.",
      icon: "📊",
      lessons: [
        {
          id: "les-2-1",
          title: "Plotly y Dashboards",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Construye visualizaciones interactivas y dashboards web con Plotly y Dash.",
          reading: "**Conceptos Fundamentales**\n\n1. **Plotly Express:** API de alto nivel de Plotly que permite crear gráficos interactivos con una sola línea de código. Soporta zoom, hover con tooltips, filtrado y animaciones, y exporta a HTML autocontenido.\n\n2. **Dash:** Framework de Plotly para construir aplicaciones web analíticas en Python puro, sin escribir JavaScript ni HTML manual. Cada componente reactivo se conecta a callbacks que actualizan los gráficos en tiempo real.\n\n3. **Bokeh y Streamlit:** Bokeh es otra biblioteca de visualización interactiva orientada a navegadores. Streamlit complementa el ecosistema permitiendo crear apps de datos rápidas con muy poco código, ideales para prototipos y demos.",
          resources: []
        }
      ],
      quiz: {
        id: "q2",
        title: "Quiz: Visualización Interactiva",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué biblioteca de Python es popular para gráficos interactivos basados en navegador?",
            options: ["Plotly", "NumPy", "Scikit-learn", "OpenCV"],
            correct: 0,
            explanation: "Plotly genera gráficos interactivos exportables como HTML autocontenido."
          },
          {
            question: "¿Qué es Plotly Express?",
            options: ["Una versión paga", "Una API de alto nivel para crear gráficos con una línea de código", "Un editor de imágenes", "Una base de datos"],
            correct: 1,
            explanation: "Plotly Express simplifica la creación de gráficos interactivos comunes con sintaxis concisa."
          },
          {
            question: "¿Qué framework permite construir dashboards web en Python puro?",
            options: ["Dash", "Excel", "Word", "Photoshop"],
            correct: 0,
            explanation: "Dash de Plotly permite crear apps web analíticas sin necesidad de JavaScript."
          },
          {
            question: "¿Qué ventaja ofrece un gráfico interactivo sobre uno estático?",
            options: ["Pesa menos", "Permite zoom, hover, filtrado y exploración dinámica", "Es más rápido de crear", "Solo funciona offline"],
            correct: 1,
            explanation: "La interactividad permite que el usuario explore los datos a diferentes niveles de detalle."
          },
          {
            question: "¿Qué función de Plotly Express crea un gráfico de dispersión?",
            options: ["px.scatter()", "px.bar()", "px.line()", "px.box()"],
            correct: 0,
            explanation: "px.scatter() crea diagramas de dispersión con interactividad incorporada."
          },
          {
            question: "¿Qué es Streamlit?",
            options: ["Una base de datos", "Un framework de Python para construir apps de datos rápidas con muy poco código", "Un editor de video", "Un sistema operativo"],
            correct: 1,
            explanation: "Streamlit permite crear apps web interactivas en pocas líneas de Python."
          },
          {
            question: "¿Qué hace un callback en Dash?",
            options: ["Llama por teléfono", "Conecta inputs (controles) con outputs (gráficos) para reactividad en tiempo real", "Imprime el archivo", "Borra los datos"],
            correct: 1,
            explanation: "Los callbacks definen cómo cambian los gráficos cuando el usuario modifica los controles."
          },
          {
            question: "¿Qué formato exporta Plotly por defecto?",
            options: ["PDF", "HTML interactivo", "DOCX", "ZIP"],
            correct: 1,
            explanation: "Plotly genera HTML autocontenido que se puede abrir en cualquier navegador moderno."
          },
          {
            question: "¿Qué tipo de gráfico permite mostrar relaciones entre tres variables numéricas?",
            options: ["Gráfico de pastel", "Gráfico de dispersión 3D o de burbujas", "Gráfico de líneas simples", "Histograma"],
            correct: 1,
            explanation: "Los gráficos 3D y de burbujas (donde el tamaño es la 3ª variable) muestran relaciones triples."
          },
          {
            question: "¿Qué biblioteca de Python compite con Plotly en visualización interactiva?",
            options: ["Bokeh", "PyTest", "Flask", "SciPy"],
            correct: 0,
            explanation: "Bokeh es otra opción robusta para visualización interactiva orientada a navegadores."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Módulo 3: IA Aplicada a la Visualización",
      description: "Usa la IA para generar gráficos automáticos y narrativas de datos.",
      icon: "🤖",
      lessons: [
        {
          id: "les-3-1",
          title: "IA Generativa para Gráficas",
          type: "video",
          duration: "60 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprovecha LLMs y herramientas de IA para automatizar visualizaciones y storytelling.",
          reading: "**Conceptos Fundamentales**\n\n1. **Visualización asistida por LLMs:** Modelos como Gemini, GPT y Claude pueden generar código de Matplotlib/Plotly a partir de descripciones en lenguaje natural ('haz un boxplot por región del NDVI'), acelerando el prototipado y reduciendo errores comunes.\n\n2. **Storytelling con datos:** Combina visualización + IA para producir narrativas automáticas: la IA describe los hallazgos clave (tendencias, outliers, correlaciones) en texto, complementando los gráficos con contexto interpretable.\n\n3. **Herramientas low-code y AutoEDA:** Bibliotecas como ydata-profiling, Sweetviz y AutoViz generan reportes exploratorios completos automáticamente. PandasAI integra LLMs directamente sobre DataFrames para responder preguntas con gráficos generados al vuelo.",
          resources: []
        }
      ],
      quiz: {
        id: "q3",
        title: "Quiz: IA y Visualización",
        passingScore: 70,
        questions: [
          {
            question: "¿Qué pueden hacer los LLMs (modelos de lenguaje grandes) en visualización?",
            options: ["Solo dibujar a mano", "Generar código Matplotlib/Plotly a partir de descripciones en lenguaje natural", "Imprimir gráficos en papel", "Reemplazar el navegador"],
            correct: 1,
            explanation: "Los LLMs traducen instrucciones humanas a código funcional de visualización."
          },
          {
            question: "¿Qué es PandasAI?",
            options: ["Un panda animado", "Una biblioteca que conecta LLMs con DataFrames para análisis y gráficos en lenguaje natural", "Un editor de imágenes", "Un sistema operativo"],
            correct: 1,
            explanation: "PandasAI permite preguntarle a un DataFrame en español y obtener respuestas y gráficos."
          },
          {
            question: "¿Qué hace ydata-profiling?",
            options: ["Genera reportes exploratorios automáticos a partir de un DataFrame", "Edita videos", "Envía correos", "Compone música"],
            correct: 0,
            explanation: "ydata-profiling crea reportes HTML completos con estadísticas, distribuciones y correlaciones."
          },
          {
            question: "¿Qué es el storytelling con datos?",
            options: ["Inventar historias", "Comunicar hallazgos a través de visualizaciones y narrativa coherente", "Vender productos", "Cantar canciones"],
            correct: 1,
            explanation: "Storytelling con datos integra gráficos, texto y contexto para guiar al lector hacia insights claros."
          },
          {
            question: "¿Qué buena práctica se recomienda al usar IA para generar gráficos?",
            options: ["Confiar 100% sin revisar", "Verificar que la IA usó los datos correctos y validar el resultado antes de publicar", "Borrar siempre el código", "No documentar"],
            correct: 1,
            explanation: "La IA puede alucinar; siempre valida visualmente y verifica los datos usados."
          },
          {
            question: "¿Qué biblioteca complementa Sweetviz para análisis exploratorio automático?",
            options: ["AutoViz", "OpenCV", "PyTorch", "Flask"],
            correct: 0,
            explanation: "AutoViz genera múltiples visualizaciones automáticamente a partir de un DataFrame."
          },
          {
            question: "¿Qué prompt es más útil para que un LLM genere un buen gráfico?",
            options: ["'haz un gráfico'", "'crea un boxplot del NDVI por región usando seaborn, paleta viridis y título descriptivo'", "'algo bonito'", "'dibuja'"],
            correct: 1,
            explanation: "Los prompts específicos (tipo de gráfico, variable, paleta, título) producen resultados mejores."
          },
          {
            question: "¿Qué herramienta crea apps de datos en pocas líneas integrando LLMs?",
            options: ["Streamlit + LangChain", "Excel", "PowerPoint", "Word"],
            correct: 0,
            explanation: "Streamlit con LangChain permite construir apps con interfaz conversacional y visualizaciones dinámicas."
          },
          {
            question: "¿Qué riesgo tiene confiar ciegamente en gráficos generados por IA?",
            options: ["Ninguno", "Alucinaciones, escalas erróneas o malinterpretación de los datos", "Que sean demasiado bonitos", "Consumen poco tiempo"],
            correct: 1,
            explanation: "La IA puede generar gráficos visualmente correctos pero con errores conceptuales o numéricos."
          },
          {
            question: "¿Qué papel cumple la visualización en un flujo de datos con IA?",
            options: ["Es opcional y decorativa", "Es esencial para auditar resultados, comunicar hallazgos y validar modelos", "Solo sirve para presentar al jefe", "Reemplaza al modelo"],
            correct: 1,
            explanation: "La visualización es clave para detectar errores, comunicar y entender los modelos de IA."
          }
        ]
      }
    }
  ]
};
