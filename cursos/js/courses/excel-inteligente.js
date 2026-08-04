const COURSE_DATA = {
  title: "Excel Inteligente",
  subtitle: "Domina las funciones avanzadas de Excel potenciadas con Inteligencia Artificial",
  hours: 9,
  modules: [
    {
      id: "mod-1",
      title: "Clase 1: Excel + IA en Acción — Retos prácticos",
      description: "Resuelve 5 retos reales (limpieza de nombres, bonos, búsquedas, fechas, sumas con criterios) generando fórmulas con Gemini, ChatGPT y Claude.",
      icon: "📊",
      lessons: [
        {
          id: "les-1-1",
          title: "Excel + IA: del lenguaje natural a la fórmula",
          type: "video",
          duration: "60 min",
          videoId: "HVrd_3ri1aI",
          description: "Aprende a pedirle a la IA fórmulas listas para Excel y resuelve 5 retos prácticos de la vida real.",
          reading: "**Conceptos Fundamentales — Clase 1**\n\n1. **Objetivo del curso:** Comunicarse con la IA (Gemini, ChatGPT, Claude) en **lenguaje natural** para que genere en segundos las **fórmulas lógicas** necesarias para resolver problemas de manejo de información en Excel.\n\n2. **Reto 1 — Limpieza de nombres con NOMPROPIO:** Se extrae el primer nombre y el último apellido y se obliga a que la **primera letra de cada palabra esté en mayúscula** (formato nombre propio), usando la función `NOMPROPIO` combinada con extracción de texto.\n\n3. **Configuración regional — coma vs punto y coma:** Al copiar una fórmula generada por la IA, hay que verificar que el **separador de argumentos** coincida con tu Excel: en algunas configuraciones es **coma (`,`)** y en otras **punto y coma (`;`)**. Si no se ajusta, la fórmula arroja error.\n\n4. **Pegar valores para fijar resultados:** Una vez aplicada una fórmula, para conservar solo el **resultado como texto fijo** (sin la fórmula), se selecciona la información, se copia y se usa **Pegar Valores** (clic derecho).\n\n5. **Reto 2 — Bonos condicionales:** Para ventas iguales o superiores a **$5,000** el bono es del **10%** sobre las ventas. Se construye con `SI`/`SI.CONJUNTO` solicitando a la IA la fórmula a partir de las reglas de negocio.\n\n6. **Reto 3 — BUSCARV / BUSCARX:** Para encontrar una característica en otra tabla a partir de un código, se usa **BUSCARV** (clásico) o **BUSCARX** (moderno, más flexible y bidireccional).\n\n7. **Reto 4 — Fechas con Texto en columnas:** Cuando Excel no reconoce un texto como fecha (queda alineado a la izquierda), se usa la herramienta **Datos → Texto en columnas** y se especifica el formato **Día, Mes y Año** para forzar el reconocimiento.\n\n8. **Reto 4 — Multas escalonadas:** Para facturas vencidas entre **1 y 30 días** la multa es **$15**; si supera los 30 días, **$50**. Se resuelve con condicionales anidadas o `SI.CONJUNTO`.\n\n9. **Reto 5 — Sumas con múltiples criterios:** Se calcula el gasto en categoría \"tecnología\" pagado exclusivamente con \"tarjeta de crédito\" usando **`SUMAR.SI.CONJUNTO`**, que filtra por dos condiciones simultáneas.\n\n10. **Complemento Claude para Excel:** Al instalar **Claude como complemento dentro de Excel** (versión paga), la IA accede directamente a la hoja, aplica formatos profesionales y ejecuta cálculos sin que el usuario tenga que copiar/pegar fórmulas — a diferencia del chat en navegador, donde la fórmula se traslada manualmente.",
          resources: [
            { title: "Repositorio GitHub — Curso Excel Inteligente", url: "https://github.com/trabajocientifico/curso-excel-inteligente", type: "link" },
            { title: "Presentación de la clase (web)", url: "https://trabajocientifico.github.io/curso-excel-inteligente/", type: "link" },
            { title: "Grabación de la Clase 1 (YouTube)", url: "https://www.youtube.com/watch?v=HVrd_3ri1aI&t=2683s", type: "link" }
          ]
        }
      ],
      quiz: {
        id: "q1",
        title: "Quiz Clase 1: Excel + IA en Acción",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuál es el objetivo principal de este curso de \"Excel Inteligente\"?",
            options: [
              "Aprender matemáticas avanzadas para el área de contabilidad.",
              "Utilizar inteligencia artificial (como Gemini o Claude) para generar fórmulas lógicas complejas a partir de instrucciones en lenguaje natural.",
              "Enseñar a programar macros y códigos en Visual Basic de forma manual.",
              "Crear presentaciones interactivas en PowerPoint desde Excel."
            ],
            correct: 1,
            explanation: "El propósito es comunicarse con la IA indicando qué se necesita, para que esta genere en segundos la fórmula lógica que resuelve la problemática de manejo de información en Excel."
          },
          {
            question: "En el Reto 1 (limpieza de nombres), ¿qué condición de formato se solicitó para el primer nombre y el último apellido extraídos?",
            options: [
              "Que todo el texto estuviera en letras minúsculas.",
              "Que el texto estuviera separado por una coma.",
              "Que la primera letra de cada palabra extraída estuviera en mayúscula (como un nombre propio).",
              "Que se escribieran en letras mayúsculas sostenidas."
            ],
            correct: 2,
            explanation: "El desafío exigía extraer el primer nombre y el último apellido asegurando que la primera letra estuviera en mayúscula, usando fórmulas como NOMPROPIO."
          },
          {
            question: "Cuando copiamos una fórmula generada por la IA (como ChatGPT o Gemini) hacia nuestro Excel, ¿qué detalle de configuración regional es fundamental verificar para que no arroje error?",
            options: [
              "Que el color de la celda sea el mismo.",
              "Que la separación de los elementos de la fórmula utilice el carácter correcto (coma o punto y coma, dependiendo de cómo esté configurado el Excel).",
              "Que la fuente esté en Arial o Calibri.",
              "Que la celda esté combinada."
            ],
            correct: 1,
            explanation: "El Excel de cada usuario puede separar los argumentos con coma o con punto y coma; hay que ajustar la fórmula de la IA según la configuración local."
          },
          {
            question: "Una vez que se aplica una fórmula para transformar o extraer un texto, ¿cuál es el paso recomendado para convertir el resultado de la fórmula en un texto fijo que no se altere?",
            options: [
              "Ocultar la columna de la fórmula.",
              "Seleccionar la información, copiarla y elegir la opción de \"Pegar Valores\".",
              "Guardar el archivo en formato PDF.",
              "Presionar la tecla \"Suprimir\"."
            ],
            correct: 1,
            explanation: "Para quitar la fórmula y mantener solo el resultado, se selecciona lo extraído, se copia y se usa clic derecho → Pegar Valores."
          },
          {
            question: "En el Reto 2 (cálculo de bonos), ¿cuál era la regla asignada para un vendedor que lograba ventas iguales o superiores a $5,000?",
            options: [
              "No recibía ningún bono.",
              "Recibía un bono del 5% sobre sus ventas.",
              "Recibía un bono del 10% sobre sus ventas.",
              "Recibía un bono fijo de $50."
            ],
            correct: 2,
            explanation: "Las condiciones establecían que para ventas de $5,000 o más, el bono sería del 10%."
          },
          {
            question: "En el Reto 3, se buscaba información en un catálogo usando un código de producto. ¿Qué fórmula tradicional de Excel mencionó el instructor (y sugirió la IA) para cumplir este objetivo?",
            options: [
              "BUSCARX o BUSCARV.",
              "SUMAR.SI.CONJUNTO.",
              "CONTAR.BLANCO.",
              "CONCATENAR."
            ],
            correct: 0,
            explanation: "Para encontrar una característica en otra tabla a partir de un código se usa BUSCARV o, de manera más sofisticada, BUSCARX."
          },
          {
            question: "En el Reto 4 (inteligencia temporal), ¿qué herramienta de Excel sugiere utilizar el instructor cuando el sistema no reconoce un texto como formato de fecha (por ejemplo, cuando el texto queda alineado a la izquierda)?",
            options: [
              "La función de traducción automática.",
              "La herramienta \"Texto en columnas\" desde la pestaña de Datos para forzar el formato a Día, Mes y Año.",
              "La brocha de \"Copiar formato\".",
              "Hacer doble clic en el borde derecho de la celda."
            ],
            correct: 1,
            explanation: "Para garantizar que Excel interprete correctamente la fecha, se selecciona la columna y se usa la opción Datos → Texto en columnas, especificando el formato de día, mes y año."
          },
          {
            question: "De acuerdo con el Reto 4 sobre multas por facturas vencidas, ¿cuál es la penalización correspondiente para una factura que tiene entre 1 y 30 días de vencimiento?",
            options: [
              "$0.",
              "$15.",
              "$30.",
              "$50."
            ],
            correct: 1,
            explanation: "Si el vencimiento está entre 1 y 30 días la multa es de $15, mientras que si supera los 30 días es de $50."
          },
          {
            question: "En el Reto 5 (el \"jefe preguntón\"), ¿qué información específica se deseaba calcular realizando un resumen de múltiples criterios?",
            options: [
              "El número total de empleados en el departamento de tecnología.",
              "La cantidad de dinero gastado en la categoría \"tecnología\", pero que fue pagado exclusivamente con \"tarjeta de crédito\".",
              "El promedio de gastos pagados con efectivo.",
              "Los bonos totales entregados en el mes de marzo."
            ],
            correct: 1,
            explanation: "El reto consistía en sumar el monto de la tabla de gastos solo si se cumplían dos condiciones a la vez: categoría \"tecnología\" y método de pago \"tarjeta de crédito\"."
          },
          {
            question: "¿Cuál es la ventaja principal del complemento de IA \"Claude\" cuando se instala e integra directamente dentro de Excel, a diferencia de usar el chat en el navegador?",
            options: [
              "Es completamente gratuito para todos los niveles de usuario.",
              "Permite que la IA acceda a la hoja de cálculo, aplique formatos profesionales y realice cálculos automáticamente sin que el usuario tenga que copiar y pegar fórmulas o tocar las celdas.",
              "Traduce automáticamente cualquier base de datos a múltiples idiomas.",
              "Funciona sin conexión a internet en computadoras antiguas."
            ],
            correct: 1,
            explanation: "Con el complemento (versión paga), Claude entra directamente a la hoja, razona, aplica formatos profesionales y hace cálculos complejos sin que el usuario tenga que mover las manos de Excel."
          }
        ]
      }
    }
  ]
};
