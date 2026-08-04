const COURSE_DATA = {
  title: "Automatizacion de Tareas con Python + IA",
  subtitle: "Automatiza procesos repetitivos combinando la potencia de Python con inteligencia artificial",
  hours: 12,
  modules: [
    {
      id: "mod-1",
      title: "Fundamentos de Automatizacion",
      description: "Configura tu entorno de desarrollo en Python y aprende a manipular archivos, carpetas y procesos del sistema operativo de forma automatizada.",
      icon: "🐍",
      lessons: [
        {
          id: "les-1-1",
          title: "Python para automatizacion: entorno y librerias",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Configura tu entorno de Python para automatizacion e instala las librerias esenciales que usaras a lo largo del curso.",
          reading: "**Preparando el entorno de automatizacion**\n\nPython es el lenguaje de programacion mas popular para automatizacion gracias a su sintaxis sencilla, su enorme ecosistema de librerias y su capacidad para interactuar con practicamente cualquier sistema.\n\n**Instalacion del entorno**\n\n- Descarga Python desde python.org (version 3.10 o superior recomendada).\n- Instala un editor de codigo como Visual Studio Code o PyCharm.\n- Configura un entorno virtual para cada proyecto:\n  - python -m venv mi_entorno\n  - mi_entorno\\Scripts\\activate (Windows) o source mi_entorno/bin/activate (Mac/Linux)\n- Instala librerias con pip: pip install nombre_libreria\n\n**Librerias esenciales para automatizacion**\n\n- **os y shutil:** Manipulacion de archivos y directorios del sistema.\n- **pathlib:** Manejo moderno y orientado a objetos de rutas de archivos.\n- **subprocess:** Ejecucion de comandos del sistema operativo desde Python.\n- **schedule:** Programacion de tareas periodicas.\n- **datetime:** Manejo de fechas y horas.\n- **logging:** Registro de actividades y errores de tus scripts.\n\n**Librerias para datos y reportes**\n\n- **openpyxl:** Lectura y escritura de archivos Excel (.xlsx).\n- **pandas:** Analisis y manipulacion de datos tabulares.\n- **python-docx:** Creacion y edicion de documentos Word.\n- **reportlab / fpdf2:** Generacion de archivos PDF.\n\n**Librerias para web y comunicacion**\n\n- **requests:** Realizar peticiones HTTP a APIs y paginas web.\n- **beautifulsoup4:** Extraccion de datos de paginas HTML (web scraping).\n- **selenium:** Automatizacion de navegadores web.\n- **smtplib:** Envio de correos electronicos.\n\n**Buenas practicas**\n\n- Siempre usa entornos virtuales para evitar conflictos entre librerias.\n- Crea un archivo requirements.txt con las dependencias: pip freeze > requirements.txt\n- Documenta tu codigo con docstrings y comentarios claros.\n- Usa control de versiones (Git) desde el inicio del proyecto.",
          resources: [
            { title: "Python.org - Descarga oficial", url: "https://www.python.org/downloads/", type: "link" },
            { title: "Visual Studio Code", url: "https://code.visualstudio.com/", type: "link" },
            { title: "Guia de entornos virtuales en Python", url: "#", type: "article" }
          ]
        },
        {
          id: "les-1-2",
          title: "Manipulacion de archivos y carpetas",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a crear, mover, copiar, renombrar y organizar archivos y carpetas automaticamente con Python.",
          reading: "**Automatizacion del sistema de archivos**\n\nUna de las tareas mas comunes en automatizacion es organizar archivos. Python ofrece multiples modulos para trabajar con el sistema de archivos de forma eficiente.\n\n**Modulo pathlib (recomendado)**\n\nPathlib proporciona una interfaz orientada a objetos para trabajar con rutas de archivos.\n\n- from pathlib import Path\n- ruta = Path(\"C:/Usuarios/Documentos\")\n- ruta.exists() - Verifica si existe.\n- ruta.is_file() - Verifica si es un archivo.\n- ruta.is_dir() - Verifica si es un directorio.\n- ruta.mkdir(parents=True, exist_ok=True) - Crea directorios.\n- ruta.glob(\"*.pdf\") - Busca archivos por patron.\n- ruta.stem - Nombre del archivo sin extension.\n- ruta.suffix - Extension del archivo.\n\n**Operaciones comunes con shutil**\n\n- **Copiar archivos:** shutil.copy2(origen, destino) — copia preservando metadatos.\n- **Mover archivos:** shutil.move(origen, destino)\n- **Copiar carpetas completas:** shutil.copytree(origen, destino)\n- **Eliminar carpetas:** shutil.rmtree(ruta) — CUIDADO: elimina sin enviar a la papelera.\n\n**Ejemplo practico: Organizador de descargas**\n\n- Lee todos los archivos de la carpeta de Descargas.\n- Clasifica por extension: imagenes (.jpg, .png), documentos (.pdf, .docx), videos (.mp4, .avi).\n- Mueve cada archivo a su carpeta correspondiente.\n- Registra las acciones en un archivo de log.\n\n**Manejo de errores**\n\n- Siempre usa bloques try/except al manipular archivos.\n- Verifica que los archivos existan antes de intentar moverlos o copiarlos.\n- Maneja el caso de archivos con el mismo nombre en el destino.\n- Usa logging en lugar de print para registrar actividades.\n\n**Automatizacion con fechas**\n\n- Organiza archivos por fecha de creacion o modificacion.\n- Crea carpetas con formato de fecha: 2026-03/\n- Usa os.path.getmtime() o Path.stat().st_mtime para obtener la fecha de modificacion.",
          resources: [
            { title: "Documentacion de pathlib", url: "https://docs.python.org/3/library/pathlib.html", type: "article" },
            { title: "Documentacion de shutil", url: "https://docs.python.org/3/library/shutil.html", type: "article" },
            { title: "Notebook: Organizador de archivos", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-1-3",
          title: "Automatizacion de tareas del sistema operativo",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Ejecuta comandos del sistema, programa tareas periodicas y crea scripts que interactuan con el sistema operativo.",
          reading: "**Interaccion con el sistema operativo**\n\nPython puede ejecutar comandos del sistema operativo, programar tareas y monitorear procesos, convirtiendose en una herramienta poderosa para administracion de sistemas.\n\n**Modulo subprocess**\n\n- Permite ejecutar comandos del sistema desde Python.\n- resultado = subprocess.run([\"comando\", \"argumento\"], capture_output=True, text=True)\n- resultado.stdout contiene la salida del comando.\n- resultado.returncode indica si el comando tuvo exito (0) o fallo.\n- Usa subprocess.run() en lugar de os.system() por seguridad y flexibilidad.\n\n**Programacion de tareas con schedule**\n\n- import schedule\n- schedule.every(10).minutes.do(mi_funcion)\n- schedule.every().day.at(\"09:00\").do(reporte_diario)\n- schedule.every().monday.do(backup_semanal)\n- Ejecuta el loop: while True: schedule.run_pending(); time.sleep(1)\n\n**Automatizacion con el Programador de tareas del SO**\n\n- En Windows: usa el Programador de tareas (Task Scheduler) para ejecutar scripts Python.\n- En Linux/Mac: usa crontab para programar ejecuciones.\n- Configura el script para que se ejecute al iniciar el sistema si es necesario.\n\n**Monitoreo del sistema**\n\n- **psutil:** Libreria para monitorear CPU, memoria, disco y red.\n  - psutil.cpu_percent() — Uso actual del CPU.\n  - psutil.virtual_memory() — Uso de memoria RAM.\n  - psutil.disk_usage('/') — Uso del disco.\n- Crea alertas automaticas cuando los recursos superen un umbral.\n\n**Ejemplo practico: Script de mantenimiento**\n\n- Limpia archivos temporales del sistema.\n- Verifica el espacio en disco y envia alerta si esta bajo.\n- Crea un backup de carpetas importantes.\n- Genera un reporte de las acciones realizadas.\n- Se ejecuta automaticamente cada dia a las 2:00 AM.\n\n**Seguridad y buenas practicas**\n\n- Nunca ejecutes comandos construidos a partir de input del usuario sin sanitizar.\n- Usa rutas absolutas en scripts que se ejecutan automaticamente.\n- Agrega manejo de errores robusto y logging detallado.\n- Prueba tus scripts en un entorno seguro antes de ponerlos en produccion.",
          resources: [
            { title: "Documentacion de subprocess", url: "https://docs.python.org/3/library/subprocess.html", type: "article" },
            { title: "Libreria schedule", url: "https://schedule.readthedocs.io/", type: "link" },
            { title: "Notebook: Automatizacion del sistema", url: "#", type: "notebook" }
          ]
        }
      ],
      quiz: {
        id: "quiz-1",
        title: "Quiz — Modulo 1",
        passingScore: 70,
        questions: [
          {
            question: "¿Cual es la ventaja principal de usar entornos virtuales en Python?",
            options: [
              "Hacen que el codigo se ejecute mas rapido",
              "Evitan conflictos entre librerias de diferentes proyectos",
              "Permiten ejecutar codigo en la nube",
              "Son necesarios para instalar Python"
            ],
            correct: 1,
            explanation: "Los entornos virtuales aislan las dependencias de cada proyecto, evitando que librerias de un proyecto interfieran con las de otro."
          },
          {
            question: "¿Que modulo se recomienda para trabajar con rutas de archivos de forma moderna en Python?",
            options: ["os.path", "pathlib", "shutil", "sys"],
            correct: 1,
            explanation: "pathlib proporciona una interfaz orientada a objetos mas intuitiva y moderna para trabajar con rutas de archivos, superando al modulo os.path en legibilidad."
          },
          {
            question: "¿Por que se recomienda usar subprocess.run() en lugar de os.system()?",
            options: [
              "Porque es mas rapido",
              "Porque es mas antiguo y estable",
              "Por mayor seguridad y flexibilidad en el manejo de la salida",
              "Porque funciona en mas sistemas operativos"
            ],
            correct: 2,
            explanation: "subprocess.run() ofrece mayor seguridad al evitar la inyeccion de comandos, y mayor flexibilidad al permitir capturar la salida, errores y codigo de retorno del comando."
          },
          {
            question: "¿Que hace la funcion shutil.rmtree()?",
            options: [
              "Crea un arbol de directorios",
              "Lista todos los archivos de un directorio",
              "Elimina un directorio y todo su contenido de forma permanente",
              "Mueve un directorio a otra ubicacion"
            ],
            correct: 2,
            explanation: "shutil.rmtree() elimina un directorio completo con todo su contenido de forma permanente, sin enviarlo a la papelera de reciclaje. Debe usarse con mucha precaucion."
          }
        ]
      }
    },
    {
      id: "mod-2",
      title: "Web Scraping y Datos Online",
      description: "Extrae datos de paginas web, automatiza interacciones con navegadores y consume APIs para obtener informacion de servicios en linea.",
      icon: "🌐",
      lessons: [
        {
          id: "les-2-1",
          title: "Web scraping con BeautifulSoup",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a extraer datos de paginas web usando BeautifulSoup para analizar HTML y obtener informacion estructurada.",
          reading: "**¿Que es web scraping?**\n\nWeb scraping es la tecnica de extraer datos de paginas web de forma automatizada. Python, con las librerias requests y BeautifulSoup, es una de las combinaciones mas populares para esta tarea.\n\n**Flujo basico de web scraping**\n\n- Enviar una peticion HTTP a la pagina web (requests.get(url)).\n- Recibir el HTML de respuesta.\n- Analizar el HTML con BeautifulSoup.\n- Extraer los datos deseados.\n- Almacenar los datos en el formato deseado (CSV, JSON, base de datos).\n\n**Uso de BeautifulSoup**\n\n- from bs4 import BeautifulSoup\n- soup = BeautifulSoup(html, 'html.parser')\n- **Buscar por etiqueta:** soup.find('h1') o soup.find_all('p')\n- **Buscar por clase CSS:** soup.find('div', class_='nombre-clase')\n- **Buscar por ID:** soup.find(id='mi-id')\n- **Selectores CSS:** soup.select('div.clase > p.sub-clase')\n- **Extraer texto:** elemento.get_text(strip=True)\n- **Extraer atributos:** elemento['href'], elemento['src']\n\n**Ejemplo practico: Extraer noticias**\n\n- Obtener titulares de un sitio de noticias.\n- Extraer el titulo, la fecha y el enlace de cada noticia.\n- Guardar los datos en un archivo CSV con pandas.\n- Programar la ejecucion diaria para monitorear noticias.\n\n**Manejo de paginacion**\n\n- Muchas paginas dividen el contenido en multiples paginas.\n- Identifica el patron de la URL: pagina1, pagina2, etc.\n- Usa un bucle for para iterar sobre todas las paginas.\n- Agrega pausas entre peticiones con time.sleep() para no sobrecargar el servidor.\n\n**Consideraciones legales y eticas**\n\n- Revisa el archivo robots.txt del sitio (sitio.com/robots.txt) para conocer las restricciones.\n- Respeta los terminos de servicio del sitio web.\n- No sobrecargues el servidor: agrega pausas entre peticiones.\n- Usa headers adecuados para identificar tu scraper.\n- Si el sitio ofrece una API, usala en lugar de hacer scraping.",
          resources: [
            { title: "Documentacion de BeautifulSoup", url: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", type: "article" },
            { title: "Documentacion de requests", url: "https://requests.readthedocs.io/", type: "article" },
            { title: "Notebook: Web scraping basico", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-2-2",
          title: "Automatizacion web con Selenium",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Automatiza interacciones con paginas web dinamicas usando Selenium para simular acciones de un usuario real.",
          reading: "**¿Cuando usar Selenium?**\n\nBeautifulSoup funciona con HTML estatico, pero muchas paginas modernas cargan contenido dinamicamente con JavaScript. Selenium controla un navegador real, permitiendo interactuar con paginas dinamicas.\n\n**Configuracion de Selenium**\n\n- pip install selenium\n- Descarga el WebDriver correspondiente a tu navegador (ChromeDriver, GeckoDriver).\n- Alternativa moderna: usa webdriver-manager para descarga automatica.\n  - pip install webdriver-manager\n  - from selenium.webdriver.chrome.service import Service\n  - from webdriver_manager.chrome import ChromeDriverManager\n\n**Operaciones basicas**\n\n- from selenium import webdriver\n- driver = webdriver.Chrome()\n- driver.get(\"https://ejemplo.com\") — Abre una URL.\n- driver.find_element(By.ID, \"mi-id\") — Busca un elemento.\n- driver.find_element(By.CSS_SELECTOR, \".clase\") — Busca por selector CSS.\n- elemento.click() — Hace clic en un elemento.\n- elemento.send_keys(\"texto\") — Escribe texto en un campo.\n- driver.quit() — Cierra el navegador.\n\n**Esperas inteligentes**\n\n- Las paginas dinamicas tardan en cargar. Usa esperas explicitas:\n  - from selenium.webdriver.support.ui import WebDriverWait\n  - from selenium.webdriver.support import expected_conditions as EC\n  - WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, \"elemento\")))\n- Evita time.sleep() fijo; las esperas explicitas son mas eficientes y confiables.\n\n**Modo headless**\n\n- Ejecuta el navegador sin interfaz grafica (ideal para servidores).\n- options = webdriver.ChromeOptions()\n- options.add_argument('--headless')\n- driver = webdriver.Chrome(options=options)\n\n**Ejemplo practico: Automatizar login y descarga**\n\n- Abrir la pagina de login.\n- Ingresar credenciales automaticamente.\n- Navegar al area de reportes.\n- Descargar el reporte del mes actual.\n- Cerrar el navegador.\n\n**Buenas practicas**\n\n- Siempre cierra el navegador al terminar (usa try/finally o context managers).\n- No almacenes credenciales en el codigo; usa variables de entorno.\n- Agrega manejo de excepciones para elementos que no se encuentren.\n- Toma capturas de pantalla en caso de error para facilitar la depuracion.",
          resources: [
            { title: "Documentacion de Selenium Python", url: "https://selenium-python.readthedocs.io/", type: "article" },
            { title: "WebDriver Manager", url: "https://pypi.org/project/webdriver-manager/", type: "link" },
            { title: "Notebook: Automatizacion web con Selenium", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-2-3",
          title: "APIs REST: consumir y automatizar servicios",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a consumir APIs REST para obtener datos de servicios en linea y automatizar integraciones entre plataformas.",
          reading: "**¿Que es una API REST?**\n\nUna API (Application Programming Interface) REST es una interfaz que permite a tu programa comunicarse con un servicio en linea de forma estructurada. Es la forma correcta y eficiente de obtener datos de servicios web.\n\n**Conceptos fundamentales**\n\n- **Endpoint:** La URL a la que envias la peticion (ej: api.ejemplo.com/usuarios).\n- **Metodos HTTP:**\n  - GET: Obtener datos.\n  - POST: Crear nuevos datos.\n  - PUT/PATCH: Actualizar datos existentes.\n  - DELETE: Eliminar datos.\n- **Headers:** Informacion adicional de la peticion (autenticacion, tipo de contenido).\n- **Body:** Datos enviados en peticiones POST/PUT (generalmente en formato JSON).\n- **Status codes:** 200 (exito), 201 (creado), 400 (error del cliente), 401 (no autorizado), 404 (no encontrado), 500 (error del servidor).\n\n**Consumir APIs con requests**\n\n- import requests\n- response = requests.get(\"https://api.ejemplo.com/datos\")\n- response.status_code — Codigo de estado.\n- response.json() — Convierte la respuesta JSON a diccionario Python.\n- requests.post(url, json={\"clave\": \"valor\"}) — Enviar datos.\n- requests.get(url, headers={\"Authorization\": \"Bearer TOKEN\"}) — Peticion autenticada.\n\n**Autenticacion en APIs**\n\n- **API Key:** Se incluye como parametro o header. La forma mas simple.\n- **OAuth 2.0:** Flujo de autenticacion mas seguro, comun en APIs de redes sociales.\n- **Bearer Token:** Token temporal que se envia en el header Authorization.\n- Nunca almacenes claves API en tu codigo fuente. Usa variables de entorno:\n  - import os\n  - api_key = os.environ.get(\"MI_API_KEY\")\n\n**Ejemplo practico: Dashboard del clima**\n\n- Consume la API de OpenWeatherMap para obtener datos meteorologicos.\n- Extrae temperatura, humedad y pronostico.\n- Guarda los datos en un CSV diariamente.\n- Genera un grafico de tendencias semanales.\n\n**Manejo de errores y limites**\n\n- Verifica el status code antes de procesar la respuesta.\n- Implementa reintentos con backoff exponencial para errores temporales.\n- Respeta los limites de tasa (rate limits) de la API.\n- Usa caching para evitar peticiones repetidas innecesarias.",
          resources: [
            { title: "Tutorial de APIs REST con Python", url: "#", type: "article" },
            { title: "OpenWeatherMap API", url: "https://openweathermap.org/api", type: "link" },
            { title: "Notebook: Consumir APIs REST", url: "#", type: "notebook" }
          ]
        }
      ],
      quiz: {
        id: "quiz-2",
        title: "Quiz — Modulo 2",
        passingScore: 70,
        questions: [
          {
            question: "¿Cuando deberias usar Selenium en lugar de BeautifulSoup para web scraping?",
            options: [
              "Cuando la pagina es muy grande",
              "Cuando la pagina carga contenido dinamicamente con JavaScript",
              "Cuando necesitas descargar archivos",
              "Cuando la pagina tiene muchas imagenes"
            ],
            correct: 1,
            explanation: "Selenium controla un navegador real que ejecuta JavaScript, lo que permite interactuar con paginas dinamicas donde el contenido se carga despues de la carga inicial del HTML."
          },
          {
            question: "¿Que metodo HTTP se usa para obtener datos de una API REST?",
            options: ["POST", "PUT", "GET", "DELETE"],
            correct: 2,
            explanation: "El metodo GET se utiliza para solicitar datos de un recurso especificado en la API. Es el metodo mas comun para lectura de datos."
          },
          {
            question: "¿Cual es la mejor practica para almacenar claves API en tus scripts de Python?",
            options: [
              "Escribirlas directamente en el codigo fuente",
              "Guardarlas en un comentario del codigo",
              "Usar variables de entorno del sistema operativo",
              "Almacenarlas en un archivo de texto sin cifrar"
            ],
            correct: 2,
            explanation: "Las variables de entorno mantienen las credenciales fuera del codigo fuente, evitando que se expongan accidentalmente al compartir el codigo o subirlo a repositorios."
          }
        ]
      }
    },
    {
      id: "mod-3",
      title: "Automatizacion de Reportes",
      description: "Genera reportes automaticamente en Excel, PDF y Word, y automatiza el envio de correos y notificaciones.",
      icon: "📄",
      lessons: [
        {
          id: "les-3-1",
          title: "Generacion automatica de reportes en Excel",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Automatiza la creacion de reportes en Excel con graficos, formatos profesionales y datos actualizados usando Python.",
          reading: "**Automatizacion de Excel con Python**\n\nPython puede crear, modificar y formatear archivos Excel de forma completamente automatizada, ideal para reportes periodicos que consumen mucho tiempo.\n\n**Libreria openpyxl**\n\nopenpyxl es la libreria mas completa para trabajar con archivos Excel (.xlsx) en Python.\n\n- from openpyxl import Workbook\n- wb = Workbook() — Crea un libro nuevo.\n- ws = wb.active — Obtiene la hoja activa.\n- ws['A1'] = 'Titulo' — Escribe en una celda.\n- ws.append([valor1, valor2, valor3]) — Agrega una fila completa.\n- wb.save('reporte.xlsx') — Guarda el archivo.\n\n**Formato profesional**\n\n- **Estilos de fuente:** Font(name='Calibri', size=12, bold=True, color='FFFFFF')\n- **Relleno de celdas:** PatternFill(start_color='4472C4', fill_type='solid')\n- **Bordes:** Border(left=Side(style='thin'), right=Side(style='thin'))\n- **Alineacion:** Alignment(horizontal='center', vertical='center')\n- **Formato de numeros:** ws['B2'].number_format = '#,##0.00'\n\n**Graficos automatizados**\n\n- openpyxl soporta graficos de barras, lineas, circular y mas.\n- from openpyxl.chart import BarChart, Reference\n- chart = BarChart()\n- data = Reference(ws, min_col=2, min_row=1, max_row=10)\n- chart.add_data(data, titles_from_data=True)\n- ws.add_chart(chart, 'E1')\n\n**Alternativa con pandas y xlsxwriter**\n\n- pandas puede exportar DataFrames directamente a Excel con formato.\n- df.to_excel('reporte.xlsx', sheet_name='Datos', index=False)\n- Con xlsxwriter tienes control total sobre el formato:\n  - writer = pd.ExcelWriter('reporte.xlsx', engine='xlsxwriter')\n  - workbook = writer.book\n  - formato = workbook.add_format({'bold': True, 'bg_color': '#4472C4'})\n\n**Ejemplo practico: Reporte mensual de ventas**\n\n- Lee datos de una base de datos o CSV.\n- Calcula metricas: totales, promedios, crecimiento.\n- Crea multiples hojas: resumen, detalle por region, graficos.\n- Aplica formato profesional con colores corporativos.\n- Guarda con nombre dinamico: reporte_ventas_marzo_2026.xlsx.",
          resources: [
            { title: "Documentacion de openpyxl", url: "https://openpyxl.readthedocs.io/", type: "article" },
            { title: "Documentacion de xlsxwriter", url: "https://xlsxwriter.readthedocs.io/", type: "article" },
            { title: "Notebook: Reportes en Excel", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-3-2",
          title: "Automatizacion de PDFs y documentos Word",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Genera documentos PDF y Word automatizados con plantillas, datos dinamicos y formato profesional.",
          reading: "**Generacion automatica de documentos Word**\n\nLa libreria python-docx permite crear y modificar documentos Word programaticamente, ideal para contratos, informes y certificados.\n\n**Uso basico de python-docx**\n\n- from docx import Document\n- doc = Document() — Crea un documento nuevo.\n- doc.add_heading('Titulo', level=1) — Agrega un encabezado.\n- doc.add_paragraph('Texto del parrafo.') — Agrega un parrafo.\n- doc.add_table(rows=3, cols=3) — Agrega una tabla.\n- doc.add_picture('grafico.png', width=Inches(5)) — Inserta una imagen.\n- doc.save('informe.docx') — Guarda el documento.\n\n**Trabajar con plantillas**\n\n- Crea una plantilla en Word con marcadores de posicion: {{NOMBRE}}, {{FECHA}}.\n- Usa python-docx para reemplazar los marcadores con datos reales.\n- Alternativa: usa la libreria docxtpl que facilita el uso de plantillas Jinja2 en Word.\n  - from docxtpl import DocxTemplate\n  - doc = DocxTemplate(\"plantilla.docx\")\n  - doc.render({\"nombre\": \"Juan\", \"fecha\": \"2026-03-07\"})\n  - doc.save(\"documento_final.docx\")\n\n**Generacion de PDFs**\n\n- **fpdf2:** Libreria ligera para crear PDFs desde cero.\n  - from fpdf import FPDF\n  - pdf = FPDF()\n  - pdf.add_page()\n  - pdf.set_font('Helvetica', 'B', 16)\n  - pdf.cell(200, 10, 'Mi Reporte', align='C')\n  - pdf.output('reporte.pdf')\n\n- **reportlab:** Libreria mas potente para PDFs complejos con graficos y tablas.\n- **weasyprint:** Convierte HTML/CSS a PDF (ideal si ya tienes una plantilla web).\n- **pdfkit:** Usa wkhtmltopdf para convertir HTML a PDF.\n\n**Manipulacion de PDFs existentes**\n\n- **PyPDF2:** Combinar, dividir, rotar y extraer texto de PDFs.\n  - from PyPDF2 import PdfMerger\n  - merger = PdfMerger()\n  - merger.append('archivo1.pdf')\n  - merger.append('archivo2.pdf')\n  - merger.write('combinado.pdf')\n\n**Ejemplo practico: Generador de certificados**\n\n- Lee una lista de participantes desde un CSV.\n- Usa una plantilla de Word con marcadores.\n- Genera un documento personalizado para cada participante.\n- Convierte a PDF automaticamente.\n- Organiza los archivos en carpetas por fecha.",
          resources: [
            { title: "Documentacion de python-docx", url: "https://python-docx.readthedocs.io/", type: "article" },
            { title: "Documentacion de fpdf2", url: "https://py-pdf.github.io/fpdf2/", type: "article" },
            { title: "Notebook: Generacion de documentos", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-3-3",
          title: "Envio automatizado de correos y notificaciones",
          type: "video",
          duration: "20 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Automatiza el envio de correos electronicos con archivos adjuntos y notificaciones a traves de diferentes canales.",
          reading: "**Envio de correos con Python**\n\nPython incluye librerias nativas para enviar correos electronicos, y existen librerias adicionales que simplifican el proceso.\n\n**Usando smtplib (nativo)**\n\n- import smtplib\n- from email.mime.multipart import MIMEMultipart\n- from email.mime.text import MIMEText\n- from email.mime.base import MIMEBase\n- Configura el servidor SMTP (Gmail, Outlook, etc.).\n- Crea el mensaje con formato HTML o texto plano.\n- Adjunta archivos si es necesario.\n- Envia y cierra la conexion.\n\n**Configuracion para Gmail**\n\n- Servidor: smtp.gmail.com, Puerto: 587\n- Requiere una \"contrasena de aplicacion\" (no tu contrasena normal).\n- Activa la verificacion en dos pasos en tu cuenta de Google.\n- Genera una contrasena de aplicacion en la configuracion de seguridad.\n\n**Envio masivo responsable**\n\n- Lee destinatarios de un CSV o base de datos.\n- Personaliza cada correo con el nombre del destinatario.\n- Agrega pausas entre envios para evitar ser marcado como spam.\n- Implementa un registro de correos enviados exitosamente y fallidos.\n- Respeta las leyes de comunicaciones electronicas (ley anti-spam).\n\n**Adjuntar archivos**\n\n- Puedes adjuntar Excel, PDF, imagenes o cualquier tipo de archivo.\n- with open('reporte.pdf', 'rb') as f:\n    adjunto = MIMEBase('application', 'octet-stream')\n    adjunto.set_payload(f.read())\n- Codifica en base64 y agrega al mensaje.\n\n**Notificaciones por otros canales**\n\n- **Telegram Bot API:** Envia mensajes a un chat o grupo de Telegram.\n  - Crea un bot con BotFather.\n  - Usa requests para enviar mensajes: requests.post(url, json={\"chat_id\": id, \"text\": mensaje})\n- **Slack Webhooks:** Envia notificaciones a canales de Slack.\n- **WhatsApp (Twilio):** Envio programatico de mensajes de WhatsApp.\n- **Discord Webhooks:** Notificaciones a canales de Discord.\n\n**Ejemplo practico: Sistema de alertas**\n\n- Monitorea una condicion (precio de producto, espacio en disco, etc.).\n- Cuando se cumple la condicion, envia una alerta por correo y Telegram.\n- Incluye un reporte adjunto con los detalles.\n- Registra todas las alertas en un log.",
          resources: [
            { title: "Documentacion de smtplib", url: "https://docs.python.org/3/library/smtplib.html", type: "article" },
            { title: "Telegram Bot API", url: "https://core.telegram.org/bots/api", type: "link" },
            { title: "Notebook: Envio automatizado de correos", url: "#", type: "notebook" }
          ]
        }
      ],
      quiz: {
        id: "quiz-3",
        title: "Quiz — Modulo 3",
        passingScore: 70,
        questions: [
          {
            question: "¿Que libreria de Python se usa para crear y modificar archivos Excel (.xlsx)?",
            options: ["pandas", "openpyxl", "csv", "xlrd"],
            correct: 1,
            explanation: "openpyxl es la libreria mas completa para crear, modificar y formatear archivos Excel (.xlsx) en Python, incluyendo soporte para graficos, estilos y formulas."
          },
          {
            question: "¿Que libreria facilita el uso de plantillas Jinja2 en documentos Word?",
            options: ["python-docx", "docxtpl", "fpdf2", "reportlab"],
            correct: 1,
            explanation: "docxtpl combina python-docx con el motor de plantillas Jinja2, permitiendo crear documentos Word dinamicos a partir de plantillas con marcadores como {{variable}}."
          },
          {
            question: "¿Que se necesita para enviar correos desde Python usando Gmail?",
            options: [
              "Solo el correo y la contrasena normal",
              "Una contrasena de aplicacion generada en la configuracion de seguridad de Google",
              "Un servidor propio de correo",
              "Una licencia de Google Workspace"
            ],
            correct: 1,
            explanation: "Gmail requiere una contrasena de aplicacion especifica (no la contrasena normal) para permitir el acceso desde aplicaciones de terceros como scripts de Python."
          }
        ]
      }
    },
    {
      id: "mod-4",
      title: "Chatbots y Asistentes con IA",
      description: "Crea chatbots inteligentes y asistentes personalizados integrando Python con APIs de inteligencia artificial.",
      icon: "🤖",
      lessons: [
        {
          id: "les-4-1",
          title: "Creacion de chatbots con Python",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende los fundamentos de la creacion de chatbots y construye tu primer bot conversacional con Python.",
          reading: "**Fundamentos de chatbots**\n\nUn chatbot es un programa que simula una conversacion con usuarios humanos. Los chatbots modernos utilizan procesamiento de lenguaje natural (NLP) para entender y responder de forma inteligente.\n\n**Tipos de chatbots**\n\n- **Basados en reglas:** Responden segun patrones y reglas predefinidas. Son predecibles pero limitados.\n- **Basados en IA:** Utilizan modelos de lenguaje para generar respuestas dinamicas y contextualmente relevantes.\n- **Hibridos:** Combinan reglas para flujos conocidos con IA para consultas abiertas.\n\n**Arquitectura basica de un chatbot**\n\n- **Interfaz de usuario:** Donde el usuario escribe su mensaje (terminal, web, Telegram, etc.).\n- **Procesamiento de entrada:** Analiza y entiende la intencion del usuario.\n- **Logica de negocio:** Decide que accion tomar o que respuesta dar.\n- **Generacion de respuesta:** Construye la respuesta para el usuario.\n- **Memoria/Contexto:** Mantiene el historial de la conversacion.\n\n**Chatbot basico con Python**\n\n- Crea un diccionario de intenciones y respuestas.\n- Usa coincidencia de patrones para identificar la intencion del usuario.\n- Implementa un bucle de conversacion.\n- Agrega manejo de contexto para conversaciones mas naturales.\n\n**Mejorando el chatbot**\n\n- Usa expresiones regulares (re) para patrones mas flexibles.\n- Implementa fuzzy matching con la libreria fuzzywuzzy para tolerar errores de escritura.\n- Agrega una base de conocimiento que el bot pueda consultar.\n- Implementa un fallback para cuando el bot no entiende la pregunta.\n\n**Frameworks para chatbots**\n\n- **Rasa:** Framework de codigo abierto para chatbots con NLU integrado.\n- **ChatterBot:** Libreria simple para crear chatbots con aprendizaje automatico.\n- **Botpress:** Plataforma visual para diseno de chatbots.\n\n**Despliegue del chatbot**\n\n- **Telegram:** Usa python-telegram-bot para crear bots de Telegram.\n- **Discord:** Usa discord.py para bots de Discord.\n- **Web:** Usa Flask o FastAPI para crear una API del chatbot.\n- **WhatsApp:** Usa Twilio para integrar con WhatsApp Business.",
          resources: [
            { title: "python-telegram-bot", url: "https://python-telegram-bot.readthedocs.io/", type: "link" },
            { title: "Rasa - Framework para chatbots", url: "https://rasa.com/", type: "link" },
            { title: "Notebook: Tu primer chatbot", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-4-2",
          title: "Integracion con APIs de IA (OpenAI, Gemini)",
          type: "video",
          duration: "30 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Conecta tus aplicaciones Python con APIs de modelos de lenguaje como OpenAI GPT y Google Gemini para crear soluciones inteligentes.",
          reading: "**APIs de modelos de lenguaje**\n\nLos modelos de lenguaje grandes (LLMs) como GPT de OpenAI, Claude de Anthropic y Gemini de Google ofrecen APIs que permiten integrar inteligencia artificial avanzada en tus aplicaciones Python.\n\n**OpenAI API**\n\n- pip install openai\n- from openai import OpenAI\n- client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])\n- response = client.chat.completions.create(\n    model=\"gpt-4\",\n    messages=[{\"role\": \"user\", \"content\": \"Tu pregunta\"}]\n  )\n- respuesta = response.choices[0].message.content\n\n**Google Gemini API**\n\n- pip install google-generativeai\n- import google.generativeai as genai\n- genai.configure(api_key=os.environ['GEMINI_API_KEY'])\n- model = genai.GenerativeModel('gemini-pro')\n- response = model.generate_content(\"Tu pregunta\")\n- respuesta = response.text\n\n**Anthropic Claude API**\n\n- pip install anthropic\n- from anthropic import Anthropic\n- client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])\n- message = client.messages.create(\n    model=\"claude-sonnet-4-20250514\",\n    max_tokens=1024,\n    messages=[{\"role\": \"user\", \"content\": \"Tu pregunta\"}]\n  )\n\n**Conceptos clave para trabajar con LLMs**\n\n- **Prompt engineering:** El arte de disenar instrucciones claras y especificas para obtener mejores respuestas.\n- **System prompt:** Instrucciones iniciales que definen el comportamiento del modelo.\n- **Temperatura:** Controla la creatividad (0 = determinista, 1 = mas creativo).\n- **Tokens:** Las unidades de texto que procesa el modelo. Mas tokens = mas costo.\n- **Contexto:** La cantidad de texto que el modelo puede \"recordar\" en una conversacion.\n\n**Gestion de costos**\n\n- Los modelos cobran por tokens de entrada y salida.\n- Usa modelos mas pequenos para tareas simples.\n- Implementa caching para evitar llamadas repetidas con el mismo input.\n- Establece limites de uso diarios o mensuales.\n- Monitorea el gasto en el dashboard de cada proveedor.\n\n**Manejo de errores**\n\n- Implementa reintentos con backoff exponencial para errores temporales.\n- Maneja errores de limite de tasa (rate limit) con pausas.\n- Ten un plan de respaldo si la API no esta disponible.",
          resources: [
            { title: "OpenAI API Documentation", url: "https://platform.openai.com/docs/", type: "article" },
            { title: "Google Gemini API", url: "https://ai.google.dev/", type: "link" },
            { title: "Notebook: Integracion con APIs de IA", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-4-3",
          title: "Asistentes inteligentes personalizados",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Construye asistentes de IA personalizados que pueden acceder a tus datos y realizar acciones especificas segun tus necesidades.",
          reading: "**De chatbot a asistente inteligente**\n\nUn asistente inteligente va mas alla de un chatbot: puede acceder a datos externos, ejecutar acciones, mantener memoria a largo plazo y adaptarse a las necesidades especificas del usuario.\n\n**Componentes de un asistente inteligente**\n\n- **Motor de IA:** El modelo de lenguaje que procesa y genera texto.\n- **Herramientas (Tools/Functions):** Funciones que el asistente puede invocar para realizar acciones.\n- **Base de conocimiento:** Documentos y datos que el asistente puede consultar.\n- **Memoria:** Historial de conversaciones y preferencias del usuario.\n- **Interfaz:** Canal de comunicacion con el usuario.\n\n**Function Calling (Llamada a funciones)**\n\n- Las APIs modernas permiten definir funciones que el modelo puede invocar.\n- Define la funcion con nombre, descripcion y parametros.\n- El modelo decide cuando llamar a una funcion basandose en la conversacion.\n- Tu codigo ejecuta la funcion y devuelve el resultado al modelo.\n- El modelo usa el resultado para formular la respuesta final.\n\n**Ejemplo: Asistente de finanzas personales**\n\n- Funciones disponibles: consultar_saldo(), agregar_gasto(), ver_gastos_mes(), generar_reporte()\n- El usuario dice: \"¿Cuanto gaste este mes en comida?\"\n- El modelo llama a ver_gastos_mes(categoria=\"comida\").\n- Tu codigo consulta la base de datos y devuelve el resultado.\n- El modelo responde: \"Este mes has gastado $450 en comida, un 15% mas que el mes anterior.\"\n\n**RAG (Retrieval-Augmented Generation)**\n\n- Tecnica que permite al asistente consultar documentos relevantes antes de responder.\n- Divide tus documentos en fragmentos y crea embeddings (representaciones vectoriales).\n- Cuando el usuario hace una pregunta, busca los fragmentos mas relevantes.\n- Incluye los fragmentos en el contexto del modelo para obtener respuestas fundamentadas.\n- Librerias utiles: langchain, llama_index, chromadb.\n\n**Memoria persistente**\n\n- Guarda el historial de conversaciones en una base de datos.\n- Resume conversaciones largas para mantener el contexto sin exceder limites de tokens.\n- Almacena preferencias del usuario para personalizar respuestas futuras.\n\n**Consideraciones de despliegue**\n\n- Usa FastAPI para crear una API robusta para tu asistente.\n- Implementa autenticacion para proteger el acceso.\n- Monitorea el rendimiento y los costos en tiempo real.\n- Agrega logging detallado para depuracion y mejora continua.",
          resources: [
            { title: "LangChain Documentation", url: "https://python.langchain.com/", type: "link" },
            { title: "ChromaDB - Base de datos vectorial", url: "https://www.trychroma.com/", type: "link" },
            { title: "Notebook: Asistente con RAG", url: "#", type: "notebook" }
          ]
        }
      ],
      quiz: {
        id: "quiz-4",
        title: "Quiz — Modulo 4",
        passingScore: 70,
        questions: [
          {
            question: "¿Que es 'prompt engineering' en el contexto de modelos de lenguaje?",
            options: [
              "El proceso de entrenar el modelo desde cero",
              "El arte de disenar instrucciones claras para obtener mejores respuestas del modelo",
              "La configuracion del servidor donde se ejecuta el modelo",
              "La optimizacion del rendimiento del hardware"
            ],
            correct: 1,
            explanation: "Prompt engineering es la practica de disenar instrucciones (prompts) claras y especificas que guian al modelo de lenguaje para generar respuestas mas precisas y utiles."
          },
          {
            question: "¿Que es RAG (Retrieval-Augmented Generation)?",
            options: [
              "Un tipo de modelo de lenguaje",
              "Una tecnica para entrenar chatbots con reglas",
              "Una tecnica que consulta documentos relevantes antes de generar una respuesta",
              "Un framework para crear interfaces de usuario"
            ],
            correct: 2,
            explanation: "RAG es una tecnica que mejora las respuestas del modelo consultando primero una base de conocimiento con documentos relevantes, y luego incluyendo esa informacion en el contexto para generar respuestas mas precisas y fundamentadas."
          },
          {
            question: "¿Que parametro controla la creatividad de las respuestas de un modelo de lenguaje?",
            options: ["max_tokens", "temperature", "top_k", "model"],
            correct: 1,
            explanation: "El parametro temperature controla la aleatoriedad de las respuestas. Un valor cercano a 0 produce respuestas mas deterministas y conservadoras, mientras que valores cercanos a 1 generan respuestas mas creativas y variadas."
          },
          {
            question: "¿Cual es la principal ventaja de usar 'Function Calling' en un asistente de IA?",
            options: [
              "Hace que el modelo sea mas rapido",
              "Reduce el costo de la API",
              "Permite al modelo ejecutar acciones reales como consultar bases de datos o enviar correos",
              "Mejora la gramatica de las respuestas"
            ],
            correct: 2,
            explanation: "Function Calling permite al modelo de lenguaje invocar funciones definidas por el desarrollador, lo que le permite realizar acciones concretas como consultar datos, enviar notificaciones o interactuar con otros sistemas."
          }
        ]
      }
    },
    {
      id: "mod-5",
      title: "Proyecto: Pipeline de Automatizacion",
      description: "Disena, desarrolla y despliega un pipeline de automatizacion completo que integre todas las habilidades del curso.",
      icon: "🚀",
      lessons: [
        {
          id: "les-5-1",
          title: "Diseno del flujo de automatizacion",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a disenar un flujo de automatizacion eficiente identificando procesos repetitivos y planificando la solucion.",
          reading: "**Diseno de un pipeline de automatizacion**\n\nUn pipeline de automatizacion es una secuencia de pasos automatizados que transforman datos de entrada en resultados utiles. Disenar bien el pipeline antes de programar es crucial para el exito del proyecto.\n\n**Identificacion de procesos automatizables**\n\n- Haz una lista de todas las tareas repetitivas que realizas semanalmente.\n- Evalua cada tarea con estos criterios:\n  - **Frecuencia:** ¿Con que frecuencia se realiza? (diaria, semanal, mensual)\n  - **Tiempo:** ¿Cuanto tiempo toma manualmente?\n  - **Complejidad:** ¿Que tan compleja es la tarea?\n  - **Impacto de errores:** ¿Que pasa si se comete un error?\n- Prioriza las tareas que son frecuentes, consumen mucho tiempo y son propensas a errores.\n\n**Componentes de un pipeline**\n\n- **Fuentes de datos (Input):** Archivos locales, bases de datos, APIs, correos electronicos, paginas web.\n- **Procesamiento (Transform):** Limpieza, transformacion, analisis, generacion con IA.\n- **Salidas (Output):** Reportes, correos, notificaciones, archivos, dashboards.\n- **Orquestacion:** Programacion, dependencias entre pasos, manejo de errores.\n- **Monitoreo:** Logs, alertas, metricas de rendimiento.\n\n**Diagramas de flujo**\n\n- Usa herramientas como draw.io, Mermaid o Excalidraw para diagramar tu pipeline.\n- Define claramente las entradas y salidas de cada paso.\n- Identifica los puntos de fallo y planifica como manejarlos.\n- Incluye pasos de validacion entre etapas criticas.\n\n**Ejemplo de pipeline: Reporte automatico de competencia**\n\n- Paso 1: Scraping de precios de la competencia (BeautifulSoup/Selenium).\n- Paso 2: Limpieza y normalizacion de datos (pandas).\n- Paso 3: Analisis comparativo con IA (OpenAI API).\n- Paso 4: Generacion de reporte en Excel (openpyxl).\n- Paso 5: Envio del reporte por correo (smtplib).\n- Paso 6: Notificacion en Telegram si hay cambios significativos.\n\n**Principios de diseno**\n\n- **Modularidad:** Cada paso debe ser una funcion o modulo independiente.\n- **Idempotencia:** Ejecutar el mismo paso varias veces debe producir el mismo resultado.\n- **Tolerancia a fallos:** El pipeline debe manejar errores graciosamente.\n- **Configurabilidad:** Usa archivos de configuracion en lugar de valores hardcodeados.\n- **Trazabilidad:** Registra cada accion para poder auditar el proceso.",
          resources: [
            { title: "draw.io - Diagramas de flujo", url: "https://app.diagrams.net/", type: "link" },
            { title: "Guia de diseno de pipelines", url: "#", type: "article" },
            { title: "Plantilla de documentacion de pipeline", url: "#", type: "download" }
          ]
        },
        {
          id: "les-5-2",
          title: "Desarrollo del pipeline completo",
          type: "video",
          duration: "35 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Desarrolla paso a paso un pipeline de automatizacion completo integrando web scraping, analisis con IA y generacion de reportes.",
          reading: "**Desarrollo del pipeline paso a paso**\n\nEn esta leccion construiras un pipeline completo de automatizacion que integra todas las habilidades aprendidas en el curso.\n\n**Estructura del proyecto**\n\n- mi_pipeline/\n  - config/\n    - settings.py (configuracion general)\n    - .env (credenciales - NO subir a Git)\n  - src/\n    - scraper.py (extraccion de datos)\n    - processor.py (procesamiento y analisis)\n    - reporter.py (generacion de reportes)\n    - notifier.py (envio de notificaciones)\n    - ai_analyzer.py (analisis con IA)\n  - data/\n    - raw/ (datos crudos)\n    - processed/ (datos procesados)\n    - reports/ (reportes generados)\n  - logs/ (archivos de log)\n  - main.py (orquestador principal)\n  - requirements.txt\n\n**Paso 1: Modulo de extraccion (scraper.py)**\n\n- Define funciones para cada fuente de datos.\n- Implementa reintentos automaticos para peticiones fallidas.\n- Guarda los datos crudos con timestamp en la carpeta raw/.\n- Registra cada extraccion en el log.\n\n**Paso 2: Modulo de procesamiento (processor.py)**\n\n- Limpia los datos: elimina duplicados, normaliza formatos, maneja valores nulos.\n- Transforma los datos segun las necesidades del analisis.\n- Calcula metricas y estadisticas clave.\n- Guarda los datos procesados en la carpeta processed/.\n\n**Paso 3: Modulo de IA (ai_analyzer.py)**\n\n- Conecta con la API de OpenAI o Gemini.\n- Envia los datos procesados para obtener insights.\n- Implementa prompts especificos para el tipo de analisis.\n- Maneja errores de la API y tiene un plan de respaldo.\n\n**Paso 4: Modulo de reportes (reporter.py)**\n\n- Genera reportes en Excel con multiples hojas y graficos.\n- Opcionalmente genera un PDF con resumen ejecutivo.\n- Incluye los insights generados por la IA.\n- Nombra los archivos con fecha y version.\n\n**Paso 5: Modulo de notificaciones (notifier.py)**\n\n- Envia el reporte por correo a los destinatarios.\n- Envia un resumen por Telegram.\n- Notifica errores criticos al administrador.\n\n**Paso 6: Orquestador (main.py)**\n\n- Coordina la ejecucion secuencial de todos los modulos.\n- Maneja errores globales con try/except.\n- Registra el tiempo de ejecucion total.\n- Puede programarse con schedule o el programador de tareas del SO.",
          resources: [
            { title: "Ejemplo de proyecto en GitHub", url: "#", type: "link" },
            { title: "Codigo fuente del pipeline", url: "#", type: "download" },
            { title: "Notebook: Desarrollo del pipeline", url: "#", type: "notebook" }
          ]
        },
        {
          id: "les-5-3",
          title: "Despliegue y monitoreo del sistema",
          type: "video",
          duration: "25 min",
          videoId: "VIDEO_ID_PLACEHOLDER",
          description: "Aprende a desplegar tu pipeline en produccion y a monitorearlo para asegurar que funcione de forma continua y confiable.",
          reading: "**Despliegue del pipeline**\n\nUna vez que tu pipeline funciona correctamente en tu maquina local, el siguiente paso es desplegarlo para que se ejecute automaticamente de forma confiable.\n\n**Opciones de despliegue**\n\n- **Maquina local con programador de tareas:**\n  - Windows: Task Scheduler para ejecutar el script en horarios especificos.\n  - Linux/Mac: Crontab para programar ejecuciones.\n  - Ventaja: Sin costo adicional. Desventaja: Depende de que la maquina este encendida.\n\n- **Servidor en la nube:**\n  - AWS EC2, Google Compute Engine, Azure VM.\n  - Siempre disponible y con mayor potencia.\n  - Requiere configuracion y tiene costo mensual.\n\n- **Servicios serverless:**\n  - AWS Lambda, Google Cloud Functions, Azure Functions.\n  - Solo pagas por el tiempo de ejecucion.\n  - Ideal para pipelines que se ejecutan periodicamente.\n\n- **Plataformas especializadas:**\n  - GitHub Actions: Ideal para pipelines ligeros ejecutados por eventos.\n  - PythonAnywhere: Plataforma simple para scripts Python en la nube.\n\n**Monitoreo del pipeline**\n\n- **Logging estructurado:**\n  - Usa el modulo logging con diferentes niveles: DEBUG, INFO, WARNING, ERROR, CRITICAL.\n  - Configura rotacion de archivos de log para evitar que crezcan indefinidamente.\n  - Incluye timestamps, nombre del modulo y nivel en cada entrada.\n\n- **Alertas automaticas:**\n  - Envia una notificacion cuando el pipeline falla.\n  - Envia un resumen diario de ejecuciones exitosas y fallidas.\n  - Configura alertas para ejecuciones que toman mas tiempo del esperado.\n\n- **Dashboard de monitoreo:**\n  - Crea un dashboard simple con Flask que muestre el estado del pipeline.\n  - Registra metricas: tiempo de ejecucion, datos procesados, errores.\n  - Grafica tendencias para detectar degradacion de rendimiento.\n\n**Mantenimiento continuo**\n\n- Revisa los logs periodicamente para detectar advertencias.\n- Actualiza las dependencias de forma controlada (usa requirements.txt con versiones fijas).\n- Prueba el pipeline despues de cada actualizacion.\n- Documenta los cambios en un archivo de changelog.\n- Ten un plan de recuperacion ante desastres.\n\n**Criterios de evaluacion del proyecto final**\n\n- Pipeline funcional que integre al menos 3 modulos del curso.\n- Manejo robusto de errores con logging.\n- Documentacion clara del flujo y la configuracion.\n- Despliegue funcional (local o en la nube).\n- Presentacion del proyecto con demostracion en vivo.",
          resources: [
            { title: "PythonAnywhere", url: "https://www.pythonanywhere.com/", type: "link" },
            { title: "GitHub Actions para Python", url: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-python", type: "article" },
            { title: "Checklist de despliegue", url: "#", type: "download" }
          ]
        }
      ],
      quiz: {
        id: "quiz-5",
        title: "Quiz — Modulo 5",
        passingScore: 70,
        questions: [
          {
            question: "¿Que principio de diseno establece que ejecutar el mismo paso varias veces debe producir el mismo resultado?",
            options: ["Modularidad", "Tolerancia a fallos", "Idempotencia", "Configurabilidad"],
            correct: 2,
            explanation: "La idempotencia asegura que si un paso del pipeline se ejecuta multiples veces (por ejemplo, debido a un reintento), el resultado sera consistente y no se duplicaran datos ni acciones."
          },
          {
            question: "¿Cual es la ventaja principal de usar servicios serverless para desplegar un pipeline?",
            options: [
              "Son mas rapidos que cualquier servidor",
              "No requieren ninguna configuracion",
              "Solo pagas por el tiempo de ejecucion real",
              "Pueden ejecutar cualquier lenguaje de programacion"
            ],
            correct: 2,
            explanation: "Los servicios serverless como AWS Lambda cobran solo por el tiempo de ejecucion efectivo, lo que los hace muy economicos para pipelines que se ejecutan periodicamente y no necesitan un servidor corriendo 24/7."
          },
          {
            question: "¿Que se debe incluir en cada entrada de log para que sea util?",
            options: [
              "Solo el mensaje de error",
              "Timestamp, nombre del modulo y nivel de severidad",
              "Solo la fecha",
              "El codigo fuente completo de la funcion"
            ],
            correct: 1,
            explanation: "Un log util incluye el timestamp (cuando ocurrio), el nombre del modulo (donde ocurrio) y el nivel de severidad (que tan critico es), ademas del mensaje descriptivo."
          },
          {
            question: "¿Por que se recomienda usar versiones fijas en requirements.txt?",
            options: [
              "Para que el archivo sea mas pequeno",
              "Para que pip funcione mas rapido",
              "Para garantizar que el entorno sea reproducible y evitar errores por actualizaciones inesperadas",
              "Porque Python lo exige"
            ],
            correct: 2,
            explanation: "Las versiones fijas garantizan que todos los desarrolladores y el entorno de produccion usen exactamente las mismas versiones de las librerias, evitando errores causados por actualizaciones incompatibles."
          }
        ]
      }
    }
  ]
};