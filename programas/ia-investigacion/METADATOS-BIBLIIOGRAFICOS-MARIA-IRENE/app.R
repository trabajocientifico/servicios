# =============================================================================
# TRABAJO CIENTIFICO — APLICACION BIBLIOMETRICA
#
# Desarrollado por Oscar Ivan Vargas Pineda
#
# App Shiny con dos pestañas:
#   1. Consolidar: subir WoS + Scopus, detectar duplicados, descargar consolidado
#   2. Analizar: subir consolidado, filtrar, generar 13 figuras, descargar ZIP
#
# Uso:
#   - Abrir este archivo (app.R) en RStudio
#   - Click en "Run App" (arriba a la derecha del editor)
#   - O desde consola: shiny::runApp("app.R")
#
# Requiere:
#   install.packages(c("shiny", "shinydashboard", "shinyjs", "DT", "bslib",
#                      "bibliometrix", "ggplot2", "dplyr", "wordcloud", "zip"))
# =============================================================================

# --- Instalacion automatica de dependencias -----------------------------------
# required_pkgs: sin estos la app no arranca.
# optional_pkgs: solo mejoran alguna figura; si faltan, se degrada con elegancia.
#   - webshot2/callr: convierten el Sankey (Fig 13) de HTML a PNG
#   - openxlsx: exporta la lista de articulos a Excel (.xlsx). Es opcional a
#     proposito: si no se puede instalar, la app arranca igual y solo se oculta
#     esa opcion de descarga; los formatos bibliograficos no dependen de el.
required_pkgs <- c("shiny", "shinydashboard", "shinyjs", "DT", "bslib",
                   "bibliometrix", "ggplot2", "dplyr", "wordcloud", "zip",
                   "htmlwidgets", "maps", "scales", "networkD3")
optional_pkgs <- c("webshot2", "callr", "openxlsx")

instalados  <- rownames(installed.packages())
missing_pkgs <- setdiff(c(required_pkgs, optional_pkgs), instalados)
if (length(missing_pkgs) > 0) {
  message("Instalando paquetes faltantes: ", paste(missing_pkgs, collapse = ", "))
  tryCatch(
    install.packages(missing_pkgs, repos = "https://cran.rstudio.com/"),
    error = function(e) message("Fallo la instalacion automatica: ", e$message))
}

# Si tras el intento sigue faltando algo obligatorio, avisar AHORA y no dejar que
# la app arranque a medias (el sintoma aparecia mucho despues, al generar figuras)
faltan_criticos <- setdiff(required_pkgs, rownames(installed.packages()))
if (length(faltan_criticos) > 0) {
  stop("No se pudieron instalar estos paquetes obligatorios: ",
       paste(faltan_criticos, collapse = ", "),
       "\nInstalalos a mano con:\n  install.packages(c(",
       paste(sprintf('"%s"', faltan_criticos), collapse = ", "), "))",
       call. = FALSE)
}

suppressPackageStartupMessages({
  library(shiny)
  library(shinydashboard)
  library(shinyjs)
  library(DT)
  library(bslib)
  library(bibliometrix)
  library(ggplot2)
  library(dplyr)
  library(wordcloud)
  library(zip)
})

# openxlsx no se carga con library(): se usa con el prefijo openxlsx:: y solo si
# esta disponible. Se comprueba una vez aqui para que la UI sepa si puede
# ofrecer la exportacion a Excel.
EXCEL_OK <- requireNamespace("openxlsx", quietly = TRUE)

# Permitir archivos grandes (hasta 100 MB)
options(shiny.maxRequestSize = 100 * 1024^2)

# =============================================================================
# PALETA Y TEMA (consistente con los scripts originales)
# =============================================================================
BG  <- "white"
PAL <- c("#2C3E6B","#C0392B","#27AE60","#E67E22","#8E44AD",
         "#16A085","#2980B9","#F39C12","#D35400","#1ABC9C",
         "#7F8C8D","#2ECC71","#E74C3C","#9B59B6","#F1C40F")

# Tamano base de la tipografia de las figuras. Es una variable global y no un
# argumento porque theme_paper() se llama en 8 figuras y varias le suman un
# theme() propio despues (ejes en blanco del mapa, leyenda a la derecha...):
# volver a sumar un tema completo para cambiar el tamano borraria esos ajustes.
# El modo publicacion la baja a 9 antes de generar y la restaura al terminar.
FIG_BASE_SIZE <- 12

theme_paper <- function(base_size = FIG_BASE_SIZE) {
  theme_minimal(base_size = base_size, base_family = "sans") +
    theme(
      plot.title    = element_text(face="bold", size=base_size+2,
                                   color="#2C3E6B", hjust=0.5, margin=margin(b=8)),
      plot.subtitle = element_text(size=base_size-1, color="#555555",
                                   hjust=0.5, margin=margin(b=12)),
      plot.caption  = element_text(size=base_size-3, color="#888888",
                                   hjust=1, face="italic"),
      axis.title    = element_text(face="bold", color="#2C3E6B", size=base_size-1),
      axis.text     = element_text(color="#333333", size=base_size-2),
      panel.grid.major = element_line(color="#E8E8E8", linewidth=0.4),
      panel.grid.minor = element_blank(),
      panel.border  = element_rect(color="#CCCCCC", fill=NA, linewidth=0.5),
      legend.title  = element_text(face="bold", size=base_size-1),
      legend.text   = element_text(size=base_size-2),
      legend.position = "bottom",
      plot.background = element_rect(fill=BG, color=NA),
      plot.margin   = margin(15,15,15,15)
    )
}

# Colocar la leyenda dentro del panel. Pasar coordenadas a legend.position esta
# obsoleto desde ggplot2 3.5, que separo el sitio (legend.position = "inside")
# de las coordenadas (legend.position.inside). Se elige segun la version
# instalada para no romper equipos con una anterior.
leyenda_dentro <- function(x, y) {
  if (utils::packageVersion("ggplot2") >= "3.5.0")
    theme(legend.position = "inside", legend.position.inside = c(x, y))
  else
    theme(legend.position = c(x, y))
}

# Las figuras de red y el wordcloud dibujan sobre un dispositivo abierto a mano
# (no son ggplot, asi que ggsave no sirve). Si el codigo de dibujo falla a
# mitad, un dev.off() suelto nunca se ejecuta: el dispositivo queda abierto, el
# archivo se queda a 0 bytes con el handle bloqueado (en Windows ni siquiera se
# puede borrar despues) y las figuras siguientes heredan el dispositivo
# colgado. on.exit() garantiza el cierre.
#
# Las medidas se dan siempre en pixeles + resolucion, aunque el dispositivo sea
# vectorial, para que la llamada no cambie segun el formato: los dispositivos
# que miden en pulgadas reciben pixeles/res.
#
# semilla: networkPlot(type = "fruchterman") coloca los nodos con un layout de
# inicializacion aleatoria. Al pedir el mismo grafico en PNG y en PDF se dibuja
# dos veces, y sin fijar la semilla antes de cada dispositivo saldrian DOS
# REDES DISTINTAS en la misma figura. NA la desactiva.
dev_seguro <- function(path, expr, formato = "png",
                       width = 3000, height = 3000, res = 300, semilla = 42) {
  ok <- FALSE
  switch(formato,
    png  = grDevices::png(path, width = width, height = height, res = res, bg = BG),
    tiff = grDevices::tiff(path, width = width, height = height, res = res,
                           bg = BG, compression = "lzw"),
    pdf  = grDevices::cairo_pdf(path, width = width / res, height = height / res,
                                bg = BG),
    svg  = grDevices::svg(path, width = width / res, height = height / res, bg = BG),
    stop("Formato de figura no soportado: ", formato)
  )
  on.exit({
    if (dev.cur() > 1) dev.off()
    # Si el dibujo fallo, el dispositivo ya escribio un archivo en blanco o a
    # medias: se borra para que no acabe en el ZIP haciendose pasar por figura
    if (!ok) unlink(path)
  }, add = TRUE)
  if (!is.na(semilla)) set.seed(semilla)
  force(expr)
  ok <- TRUE
  invisible(path)
}

# Se conserva con su nombre y su firma original: es la que usan las figuras de
# red y el wordcloud cuando solo hace falta el PNG.
png_seguro <- function(path, expr, width = 3000, height = 3000, res = 300) {
  dev_seguro(path, expr, formato = "png",
             width = width, height = height, res = res)
}

# networkPlot() de bibliometrix falla con un error incomprensible ("argumento
# tiene longitud cero") cuando la red no tiene ninguna arista: al colorear por
# comunidad indexa un atributo que nunca se asigno. Y el caso ocurre de verdad
# -por ejemplo, si metaTagExtraction() solo logra sacar un pais por registro, la
# red de paises se queda con todo el peso en la diagonal y cero colaboraciones-.
# Comprobarlo antes permite explicarle al estudiante que le falta, en vez de
# soltarle el error interno del paquete.
# Devuelve NULL si la red es dibujable, o el motivo si no lo es.
diagnostico_red <- function(NetMatrix, n) {
  if (is.null(NetMatrix) || nrow(NetMatrix) < 2)
    return("la red tiene menos de 2 nodos")
  m <- as.matrix(NetMatrix)
  idx <- order(diag(m), decreasing = TRUE)[seq_len(min(n, nrow(m)))]
  sub <- m[idx, idx, drop = FALSE]
  diag(sub) <- 0
  if (sum(sub, na.rm = TRUE) == 0)
    return(sprintf("no hay ninguna colaboracion entre los %d nodos principales (red sin aristas)",
                   length(idx)))
  NULL
}

# Convierte el HTML del Sankey (Fig 13) a PNG SIN poder colgar la app.
# webshot2/chromote deben correr en un proceso R aparte: dentro del observer de
# Shiny compiten por el mismo bucle de eventos y pueden bloquearse para siempre.
# callr impone ademas un timeout duro, asi que un Chrome ausente o bloqueado por
# el antivirus se traduce en un mensaje en el log, no en un cuelgue.
# Devuelve TRUE si genero el PNG, o un string con el motivo del fallo.
sankey_a_png <- function(html_path, png_path, timeout = 90) {
  if (!requireNamespace("callr", quietly = TRUE))    return("falta el paquete 'callr'")
  if (!requireNamespace("webshot2", quietly = TRUE)) return("falta el paquete 'webshot2'")
  chrome <- tryCatch(chromote::find_chrome(), error = function(e) NULL)
  if (is.null(chrome) || !nzchar(chrome))            return("no se encontro Chrome/Chromium")

  res <- tryCatch({
    callr::r(
      function(html, png) {
        webshot2::webshot(html, png, vwidth = 1800, vheight = 1350, zoom = 2)
        invisible(NULL)
      },
      args = list(html = normalizePath(html_path, winslash = "/"),
                  png  = normalizePath(png_path, winslash = "/", mustWork = FALSE)),
      timeout = timeout)
    TRUE
  }, error = function(e) {
    if (inherits(e, "system_command_timeout_error"))
      return(sprintf("Chrome no respondio en %ds", timeout))
    # callr envuelve el fallo real: su mensaje propio es solo "in callr
    # subprocess.", el motivo util esta en $parent
    if (!is.null(e$parent)) conditionMessage(e$parent) else conditionMessage(e)
  })

  if (isTRUE(res) && !file.exists(png_path)) return("webshot2 no escribio el archivo")
  res
}

# =============================================================================
# TEXTOS DE LAS FIGURAS (i18n: "es" / "en")
#
# Todo el texto que aparece DENTRO de las 13 figuras (titulos, subtitulos,
# ejes, leyendas, captions) vive aqui. La interfaz de la app sigue siempre
# en espanol; esto solo afecta a los PNG generados.
#
# Las claves que llevan numeros son plantillas sprintf(), asi el orden de los
# valores puede cambiar entre idiomas sin tocar el codigo de la figura.
# =============================================================================
FIG_TXT <- list(

  en = list(
    caption    = "Source: WoS + Scopus | Bibliometric analysis",
    # El pie real se construye con esta plantilla: la fuente depende del modo de
    # operacion (la clave "caption" de arriba daba WoS + Scopus incluso cuando
    # se habia analizado una sola base) y lleva la fecha de generacion.
    caption_tpl = "Source: %s | Bibliometric analysis · %s",
    fuente_wos     = "Web of Science",
    fuente_scopus  = "Scopus",
    fuente_ambos   = "Web of Science + Scopus",
    fuente_archivo = "user-supplied consolidated file",
    nota_incompleto = "%d excluded: incomplete year at the time of retrieval",
    pie_fig    = "Figure %d.",
    pie_cab    = "FIGURE CAPTIONS\nGenerated %s\n\nPaste each caption below its figure. The journal typesets it;\nthat is why the text is no longer inside the image.\n",
    year       = "Year",
    articles   = "Articles",

    f01_title  = "Annual Scientific Production",
    f01_sub    = "n = %d documents · %d–%d",
    f01_y      = "Number of Articles",

    f02_title  = "Global Scientific Production by Country",
    f02_sub    = "Corresponding author affiliation",

    f03_title  = "Author Keywords Frequency",

    f04_title  = "Author Keywords Trend Over Time",
    f04_sub    = "Top emerging keywords by period · min. frequency = 5",
    f04_y      = "Term",
    f04_leg    = "Term frequency",

    f05_title  = "Author Collaboration Network (Top 25)",
    f06_title  = "University Collaboration Network (Top 20)",

    f07_title  = "Lotka's Law — Author Productivity",
    f07_sub    = "Observed vs. theoretical distribution of scientific output",
    f07_x      = "Number of articles",
    f07_y      = "Proportion of authors",
    f07_serie  = "Lotka's Law",

    f08a_title = "Bradford's Law — Core Journals",
    f08a_sub   = "Zone 1: %d · Zone 2: %d–%d · Zone 3: rest",
    f08a_x     = "Number of Articles",
    f08a_fill  = "Bradford Zone",
    f08_z1     = "Zone 1 (Core)",
    f08_z2     = "Zone 2",
    f08_z3     = "Zone 3 (Periphery)",

    f08b_title = "Bradford's Law — Cumulative Production",
    f08b_sub   = "Cumulative % of articles by log(journal rank)",
    f08b_x     = "log10(Journal Rank)",
    f08b_y     = "Cumulative Articles (%)",

    f09_title  = "Thematic Map",
    f09_sub    = "Author keywords clustered by centrality and density",
    f09_x      = "Relevance degree (Centrality)",
    f09_y      = "Development degree (Density)",
    f09_q1     = "Motor Themes",
    f09_q2     = "Niche Themes",
    f09_q3     = "Emerging or Declining Themes",
    f09_q4     = "Basic Themes",

    f10_title  = "Keyword Co-occurrence Network",
    f11_title  = "International Collaboration Network",

    f12_title  = "Author Scientific Production Over Time",
    f12_sub    = "Top 15 most productive authors"
  ),

  es = list(
    caption    = "Fuente: WoS + Scopus | Análisis bibliométrico",
    caption_tpl = "Fuente: %s | Análisis bibliométrico · %s",
    fuente_wos     = "Web of Science",
    fuente_scopus  = "Scopus",
    fuente_ambos   = "Web of Science + Scopus",
    fuente_archivo = "archivo consolidado aportado por el usuario",
    nota_incompleto = "%d excluido: año incompleto en el momento de la descarga",
    pie_fig    = "Figura %d.",
    pie_cab    = "PIES DE FIGURA\nGenerado el %s\n\nPega cada pie debajo de su figura. La revista lo compone ella;\npor eso el texto ya no va dentro de la imagen.\n",
    year       = "Año",
    articles   = "Artículos",

    f01_title  = "Producción científica anual",
    f01_sub    = "n = %d documentos · %d–%d",
    f01_y      = "Número de artículos",

    f02_title  = "Producción científica global por país",
    f02_sub    = "Afiliación del autor de correspondencia",

    f03_title  = "Frecuencia de palabras clave de autor",

    f04_title  = "Evolución temporal de las palabras clave",
    f04_sub    = "Palabras clave emergentes por período · frecuencia mínima = 5",
    f04_y      = "Término",
    f04_leg    = "Frecuencia del término",

    f05_title  = "Red de colaboración entre autores (Top 25)",
    f06_title  = "Red de colaboración entre instituciones (Top 20)",

    f07_title  = "Ley de Lotka — Productividad de autores",
    f07_sub    = "Distribución observada frente a la teórica de la producción científica",
    f07_x      = "Número de artículos",
    f07_y      = "Proporción de autores",
    f07_serie  = "Ley de Lotka",

    f08a_title = "Ley de Bradford — Revistas núcleo",
    f08a_sub   = "Zona 1: %d · Zona 2: %d–%d · Zona 3: resto",
    f08a_x     = "Número de artículos",
    f08a_fill  = "Zona de Bradford",
    f08_z1     = "Zona 1 (Núcleo)",
    f08_z2     = "Zona 2",
    f08_z3     = "Zona 3 (Periferia)",

    f08b_title = "Ley de Bradford — Producción acumulada",
    f08b_sub   = "% acumulado de artículos según log(rango de la revista)",
    f08b_x     = "log10(Rango de la revista)",
    f08b_y     = "Artículos acumulados (%)",

    f09_title  = "Mapa temático",
    f09_sub    = "Palabras clave de autor agrupadas por centralidad y densidad",
    f09_x      = "Grado de relevancia (Centralidad)",
    f09_y      = "Grado de desarrollo (Densidad)",
    f09_q1     = "Temas motores",
    f09_q2     = "Temas nicho",
    # Salto de linea a proposito: la etiqueta va en la esquina del cuadrante y
    # en una sola linea se sale del panel (igual hace bibliometrix en ingles)
    f09_q3     = "Temas emergentes\no en declive",
    f09_q4     = "Temas básicos",

    f10_title  = "Red de co-ocurrencia de palabras clave",
    f11_title  = "Red de colaboración internacional",

    f12_title  = "Producción científica de autores en el tiempo",
    f12_sub    = "Los 15 autores más productivos"
  )
)

# Devuelve el texto de `key` en el idioma `lang`. Si falta la clave cae al
# ingles, de modo que una clave nueva sin traducir nunca rompe una figura.
tr <- function(key, lang = "es", ...) {
  if (is.null(lang) || !(lang %in% names(FIG_TXT))) lang <- "es"
  s <- FIG_TXT[[lang]][[key]]
  if (is.null(s)) s <- FIG_TXT[["en"]][[key]]
  if (is.null(s)) return(key)
  args <- list(...)
  if (length(args) > 0) s <- do.call(sprintf, c(list(s), args))
  s
}

# Traduce las 4 etiquetas de cuadrante que bibliometrix incrusta en el ggplot
# de thematicMap(). Viven en layers[[i]]$aes_params$label de una capa GeomText
# y llegan "sucias": una trae un salto de linea interno ("Emerging or\nDeclining
# Themes") y otras un espacio final, asi que la comparacion se hace sobre una
# version normalizada. Parche best-effort: si una version futura de bibliometrix
# cambia esa estructura, se devuelve el plot intacto (cuadrantes en ingles) y la
# figura se genera igual.
translate_thematic_quadrants <- function(p, lang) {
  if (identical(lang, "en")) return(p)

  normalizar <- function(x) trimws(gsub("\\s+", " ", x))
  mapa <- c("Motor Themes"                 = tr("f09_q1", lang),
            "Niche Themes"                 = tr("f09_q2", lang),
            "Emerging or Declining Themes" = tr("f09_q3", lang),
            "Basic Themes"                 = tr("f09_q4", lang))

  traducir <- function(x) {
    if (!is.character(x) || length(x) == 0) return(x)
    k <- normalizar(x)
    hit <- k %in% names(mapa)
    if (any(hit)) x[hit] <- unname(mapa[k[hit]])
    x
  }

  tryCatch({
    for (i in seq_along(p$layers)) {
      lay <- p$layers[[i]]

      if (!is.null(lay$aes_params$label)) {
        p$layers[[i]]$aes_params$label <- traducir(lay$aes_params$label)
      }

      d <- lay$data
      if (is.data.frame(d) && nrow(d) > 0) {
        for (col in names(d)) {
          if (is.character(d[[col]])) d[[col]] <- traducir(d[[col]])
        }
        p$layers[[i]]$data <- d
      }
    }
    p
  }, error = function(e) p)
}

# =============================================================================
# ENTIDADES HTML EN LOS EXPORTS DE WOS
#
# Algunos registros de WoS llegan con las vocales acentuadas escritas como
# entidades HTML y ADEMAS partidas con espacios por su propio ajuste de linea:
#
#   DE ... Percep & ccedil;& otilde;es; Dimens & otilde;es
#
# No es un fallo de esta app -esta asi en el .txt que descarga WoS- pero el
# destrozo es real: bibliometrix parte el campo DE por ";" y de ahi salen
# "palabras clave" como "& ccedil;&" u "otilde;es", que acaban dibujadas como
# nodos en la red de co-ocurrencia y en el wordcloud, y que ademas inflan el
# recuento de terminos. Se decodifican al leer, con y sin los espacios.
# =============================================================================
# Letras acentuadas. Van SIEMPRE dentro de una palabra, asi que se absorbe
# tambien el espacio que WoS deja delante: "Tapaj & oacute;s" -> "Tapajós", no
# "Tapaj ós".
ENTIDADES_LETRA <- c(
  agrave="à", aacute="á", acirc="â", atilde="ã", auml="ä", aring="å", aelig="æ",
  ccedil="ç", egrave="è", eacute="é", ecirc="ê", euml="ë",
  igrave="ì", iacute="í", icirc="î", iuml="ï", ntilde="ñ",
  ograve="ò", oacute="ó", ocirc="ô", otilde="õ", ouml="ö", oslash="ø",
  ugrave="ù", uacute="ú", ucirc="û", uuml="ü", yacute="ý", yuml="ÿ",
  Agrave="À", Aacute="Á", Acirc="Â", Atilde="Ã", Auml="Ä", Aring="Å", AElig="Æ",
  Ccedil="Ç", Egrave="È", Eacute="É", Ecirc="Ê", Euml="Ë",
  Igrave="Ì", Iacute="Í", Icirc="Î", Iuml="Ï", Ntilde="Ñ",
  Ograve="Ò", Oacute="Ó", Ocirc="Ô", Otilde="Õ", Ouml="Ö", Oslash="Ø",
  Ugrave="Ù", Uacute="Ú", Ucirc="Û", Uuml="Ü", szlig="ß"
)

# Simbolos: aqui el espacio de delante suele ser legitimo ("Arts &amp; Humanities"
# debe quedar como "Arts & Humanities"), asi que no se toca.
ENTIDADES_SIMBOLO <- c(
  nbsp=" ", quot="\"", apos="'", lt="<", gt=">",
  deg="°", middot="·", ndash="–", mdash="—", hellip="…",
  lsquo="'", rsquo="'", ldquo="\"", rdquo="\""
)

decodificar_entidades <- function(x) {
  if (is.null(x) || length(x) == 0) return(x)
  s <- as.character(x)
  # Solo se toca lo que lleva "&": evita recorrer las 200.000 lineas de
  # referencias citadas de un corpus grande sin ninguna necesidad
  hit <- !is.na(s) & grepl("&", s, fixed = TRUE)
  if (!any(hit)) return(x)
  v <- s[hit]

  for (nombre in names(ENTIDADES_LETRA)) {
    # \\s* por los dos lados: cubre "&oacute;", "& oacute;" y el caso en que el
    # salto de linea de continuacion cae justo en medio de la entidad
    v <- gsub(paste0("\\s*&\\s*", nombre, ";"), ENTIDADES_LETRA[[nombre]], v, perl = TRUE)
    # Y la forma en MAYUSCULAS ("&OTILDE;"): bibliometrix pasa a mayusculas los
    # campos DE e ID al convertir el corpus, asi que en la pestana 2 las
    # entidades llegan gritadas y no casarian con el nombre tal cual
    v <- gsub(paste0("\\s*&\\s*", toupper(nombre), ";"),
              toupper(ENTIDADES_LETRA[[nombre]]), v, perl = TRUE)
  }
  for (nombre in names(ENTIDADES_SIMBOLO)) {
    # (?i): el simbolo es el mismo en mayusculas o minusculas ("&AMP;" que
    # devuelve bibliometrix y "&amp;" del archivo original son el mismo "&")
    v <- gsub(paste0("(?i)&\\s*", nombre, ";"), ENTIDADES_SIMBOLO[[nombre]], v, perl = TRUE)
  }

  # Entidades numericas (&#243; decimal y &#xF3; hexadecimal)
  num <- grepl("&\\s*#", v, perl = TRUE)
  if (any(num)) {
    sustituir <- function(txt, patron, base) {
      encontrados <- unique(unlist(regmatches(txt, gregexpr(patron, txt, perl = TRUE))))
      for (tok in encontrados) {
        cod <- strtoi(gsub("[^0-9A-Fa-f]", "", sub("^&\\s*#\\s*[xX]?", "", tok)), base)
        if (!is.na(cod) && cod > 0) txt <- gsub(tok, intToUtf8(cod), txt, fixed = TRUE)
      }
      txt
    }
    v[num] <- sustituir(v[num], "&\\s*#\\s*[xX][0-9A-Fa-f]{2,5};", 16L)
    v[num] <- sustituir(v[num], "&\\s*#\\s*[0-9]{2,5};", 10L)
  }
  # El "&" literal va el ultimo: si se sustituyera antes, un "&amp;oacute;"
  # quedaria como "&oacute;" y se volveria a decodificar por accidente
  v <- gsub("(?i)&\\s*amp;", "&", v, perl = TRUE)

  s[hit] <- v
  s
}

# =============================================================================
# MAPA MUNDIAL: NOMBRES DE PAIS
#
# El mapa une la produccion por pais con map_data("world") comparando el nombre
# en minusculas. WoS y Scopus escriben varios paises de forma distinta a como
# los llama el paquete 'maps', y una union fallida no da error: el pais cae en
# na.value, exactamente el mismo gris que "sin produccion". Es decir, un pais
# con articulos se publicaria como si no tuviera ninguno.
#
# Este diccionario cubre las discrepancias habituales; ademas normalizar_paises()
# devuelve los nombres que NO casaron para poder sacarlos por el log, porque lo
# que no se puede permitir es que desaparezcan en silencio.
# =============================================================================
PAIS_MAP <- c(
  "usa"                        = "usa",
  "united states"              = "usa",
  "united states of america"   = "usa",
  "u.s.a."                     = "usa",
  "united kingdom"             = "uk",
  "england"                    = "uk",
  "scotland"                   = "uk",
  "wales"                      = "uk",
  "north ireland"              = "uk",
  "northern ireland"           = "uk",
  "russian federation"         = "russia",
  "korea"                      = "south korea",
  "republic of korea"          = "south korea",
  "korea, republic of"         = "south korea",
  "south korea"                = "south korea",
  "north korea"                = "north korea",
  "czech republic"             = "czech republic",
  "czechia"                    = "czech republic",
  "slovak republic"            = "slovakia",
  "viet nam"                   = "vietnam",
  "iran (islamic republic of)" = "iran",
  "islamic republic of iran"   = "iran",
  "syrian arab republic"       = "syria",
  "lao pdr"                    = "laos",
  "brunei darussalam"          = "brunei",
  "cote d'ivoire"              = "ivory coast",
  "cote divoire"               = "ivory coast",
  "côte d'ivoire"              = "ivory coast",
  "congo, dem. rep."           = "democratic republic of the congo",
  "dem rep congo"              = "democratic republic of the congo",
  "dr congo"                   = "democratic republic of the congo",
  "peoples r china"            = "china",
  "people's republic of china" = "china",
  "china"                      = "china",
  "hong kong"                  = "china",
  "macau"                      = "china",
  "taiwan"                     = "taiwan",
  "tanzania, united republic of" = "tanzania",
  "united republic of tanzania"  = "tanzania",
  "bolivia (plurinational state of)" = "bolivia",
  "venezuela (bolivarian republic of)" = "venezuela",
  "moldova, republic of"       = "moldova",
  "republic of moldova"        = "moldova",
  "macedonia"                  = "north macedonia",
  "macedonia, the former yugoslav republic of" = "north macedonia",
  "bosnia"                     = "bosnia and herzegovina",
  "bosnia & herzegovina"       = "bosnia and herzegovina",
  "congo"                      = "republic of congo",
  "republic of the congo"      = "republic of congo",
  "faroe"                      = "faroe islands",
  "turkiye"                    = "turkey",
  "türkiye"                    = "turkey",
  "vaticano"                   = "vatican",
  "holy see"                   = "vatican",
  "vatican city"               = "vatican",
  "trinidad and tobago"        = "trinidad",
  "antigua and barbuda"        = "antigua",
  "saint kitts and nevis"      = "saint kitts",
  "cabo verde"                 = "cape verde",
  "myanmar (burma)"            = "myanmar",
  "burma"                      = "myanmar",
  "swaziland"                  = "swaziland",
  "eswatini"                   = "swaziland",
  "timor-leste"                = "timor-leste",
  "east timor"                 = "timor-leste",
  "u arab emirates"            = "united arab emirates",
  "papua n guinea"             = "papua new guinea",
  "dominican rep"              = "dominican republic",
  "equat guinea"               = "equatorial guinea",
  "fed rep ger"                = "germany",
  "west germany"               = "germany",
  "byelarus"                   = "belarus"
)

# Devuelve la tabla de paises con los nombres ya traducidos a los de 'maps' y
# la lista de los que siguen sin correspondencia.
normalizar_paises <- function(country_prod, regiones_mapa) {
  crudo <- tolower(trimws(as.character(country_prod$Country)))
  hit   <- crudo %in% names(PAIS_MAP)
  crudo[hit] <- unname(PAIS_MAP[crudo[hit]])
  country_prod$Country <- crudo

  # Varios nombres distintos pueden apuntar al mismo pais del mapa (England y
  # Scotland -> uk): sin agregar, left_join se quedaria solo con una fila
  country_prod <- stats::aggregate(list(Articles = country_prod$Articles),
                                   by = list(Country = country_prod$Country),
                                   FUN = sum)

  list(datos = country_prod,
       sin_mapa = sort(unique(country_prod$Country[!(country_prod$Country %in% regiones_mapa)])))
}

# =============================================================================
# FUNCIONES DEL SCRIPT 1 (PARSER SCOPUS -> WOS)
# =============================================================================

parse_scopus_records <- function(filepath) {
  lines <- readLines(filepath, encoding = "UTF-8", warn = FALSE)
  if (length(lines) > 0) {
    lines[1] <- sub("^\uFEFF", "", lines[1])
  }

  records <- list()
  current_record <- list()
  current_field <- NULL
  in_record <- FALSE
  header_passed <- FALSE

  interrupt_labels <- c(
    "AUTHOR KEYWORDS:", "INDEX KEYWORDS:", "FUNDING",
    "REFERENCES:", "CORRESPONDENCE", "PUBLISHER:",
    "ISSN:", "ISBN:", "CODEN:", "LANGUAGE OF",
    "ABBREVIATED", "DOCUMENT TYPE:", "PUBLICATION STAGE:",
    "OPEN ACCESS:", "PUBMED ID:", "MANUFACTURERS:", "TRADENAMES:",
    "SOURCE:"
  )

  funding_interrupt <- c(
    "REFERENCES:", "CORRESPONDENCE", "PUBLISHER:",
    "ISSN:", "ISBN:", "FUNDING DETAILS:", "FUNDING TEXT",
    "SOURCE:"
  )

  i <- 1
  while (i <= length(lines)) {
    line <- lines[i]

    if (!header_passed) {
      if (grepl("^Scopus", line) || grepl("^EXPORT DATE:", line) || trimws(line) == "") {
        i <- i + 1
        next
      } else {
        header_passed <- TRUE
      }
    }

    stripped <- trimws(line)

    if (!in_record) {
      if (stripped == "") { i <- i + 1; next }
      in_record <- TRUE
      current_record <- list()
      current_field <- "AU_SHORT"
      current_record[["AU_SHORT"]] <- stripped
      i <- i + 1; next
    }

    if (startsWith(line, "AUTHOR FULL NAMES:")) {
      current_field <- "AUTHOR_FULL_NAMES"
      current_record[[current_field]] <- trimws(sub("^AUTHOR FULL NAMES:", "", line))
    } else if (startsWith(line, "DOI:")) {
      current_field <- "DOI"
      current_record[[current_field]] <- trimws(sub("^DOI:", "", line))
    } else if (startsWith(line, "https://www.scopus.com/")) {
      current_record[["SCOPUS_URL"]] <- stripped
      current_field <- "SCOPUS_URL"
    } else if (startsWith(line, "AFFILIATIONS:")) {
      current_field <- "AFFILIATIONS"
      current_record[[current_field]] <- trimws(sub("^AFFILIATIONS:", "", line))
    } else if (startsWith(line, "ABSTRACT:")) {
      current_field <- "ABSTRACT"
      current_record[[current_field]] <- trimws(sub("^ABSTRACT:", "", line))
    } else if (startsWith(line, "AUTHOR KEYWORDS:")) {
      current_field <- "AUTHOR_KEYWORDS"
      current_record[[current_field]] <- trimws(sub("^AUTHOR KEYWORDS:", "", line))
    } else if (startsWith(line, "INDEX KEYWORDS:")) {
      current_field <- "INDEX_KEYWORDS"
      current_record[[current_field]] <- trimws(sub("^INDEX KEYWORDS:", "", line))
    } else if (startsWith(line, "FUNDING DETAILS:")) {
      current_field <- "FUNDING_DETAILS"
      val <- trimws(sub("^FUNDING DETAILS:", "", line))
      if (!is.null(current_record[["FUNDING_DETAILS"]])) {
        current_record[["FUNDING_DETAILS"]] <- paste0(current_record[["FUNDING_DETAILS"]], "; ", val)
      } else {
        current_record[["FUNDING_DETAILS"]] <- val
      }
    } else if (grepl("^FUNDING TEXT", line)) {
      current_field <- "FUNDING_TEXT"
      val <- trimws(sub("^FUNDING TEXT \\d+:\\s*", "", line))
      if (!is.null(current_record[["FUNDING_TEXT"]])) {
        current_record[["FUNDING_TEXT"]] <- paste0(current_record[["FUNDING_TEXT"]], " ", val)
      } else {
        current_record[["FUNDING_TEXT"]] <- val
      }
    } else if (startsWith(line, "REFERENCES:")) {
      current_field <- "REFERENCES"
      current_record[[current_field]] <- trimws(sub("^REFERENCES:", "", line))
    } else if (startsWith(line, "CORRESPONDENCE ADDRESS:")) {
      current_field <- "CORRESPONDENCE"
      current_record[[current_field]] <- trimws(sub("^CORRESPONDENCE ADDRESS:", "", line))
    } else if (startsWith(line, "PUBLISHER:")) {
      current_field <- "PUBLISHER"
      current_record[[current_field]] <- trimws(sub("^PUBLISHER:", "", line))
    } else if (startsWith(line, "ISSN:")) {
      current_field <- "ISSN"
      current_record[[current_field]] <- trimws(sub("^ISSN:", "", line))
    } else if (startsWith(line, "ISBN:")) {
      current_field <- "ISBN"
      current_record[[current_field]] <- trimws(sub("^ISBN:", "", line))
    } else if (startsWith(line, "CODEN:")) {
      current_field <- "CODEN"
      current_record[[current_field]] <- trimws(sub("^CODEN:", "", line))
    } else if (startsWith(line, "LANGUAGE OF ORIGINAL DOCUMENT:")) {
      current_field <- "LANGUAGE"
      current_record[[current_field]] <- trimws(sub("^LANGUAGE OF ORIGINAL DOCUMENT:", "", line))
    } else if (startsWith(line, "ABBREVIATED SOURCE TITLE:")) {
      current_field <- "ABBREV_SOURCE"
      current_record[[current_field]] <- trimws(sub("^ABBREVIATED SOURCE TITLE:", "", line))
    } else if (startsWith(line, "DOCUMENT TYPE:")) {
      current_field <- "DOCUMENT_TYPE"
      current_record[[current_field]] <- trimws(sub("^DOCUMENT TYPE:", "", line))
    } else if (startsWith(line, "PUBLICATION STAGE:")) {
      current_field <- "PUB_STAGE"
      current_record[[current_field]] <- trimws(sub("^PUBLICATION STAGE:", "", line))
    } else if (startsWith(line, "PUBMED ID:")) {
      current_field <- "PUBMED_ID"
      current_record[[current_field]] <- trimws(sub("^PUBMED ID:", "", line))
    } else if (startsWith(line, "MANUFACTURERS:")) {
      current_field <- "MANUFACTURERS"
      current_record[[current_field]] <- trimws(sub("^MANUFACTURERS:", "", line))
    } else if (startsWith(line, "TRADENAMES:")) {
      current_field <- "TRADENAMES"
      current_record[[current_field]] <- trimws(sub("^TRADENAMES:", "", line))
    } else if (startsWith(line, "OPEN ACCESS:")) {
      current_field <- "OPEN_ACCESS"
      current_record[[current_field]] <- trimws(sub("^OPEN ACCESS:", "", line))
    } else if (startsWith(line, "SOURCE:")) {
      current_record[["SOURCE"]] <- trimws(sub("^SOURCE:", "", line))
      records <- c(records, list(current_record))
      current_record <- list()
      in_record <- FALSE
      current_field <- NULL
    } else if (grepl("^\\d{8,}(;\\s*\\d{8,})*\\s*$", stripped)) {
      current_record[["AUTHOR_IDS"]] <- stripped
      current_field <- "AUTHOR_IDS"
    } else if (grepl("^\\(\\d{4}\\)\\s", stripped)) {
      current_record[["JOURNAL_REF"]] <- stripped
      current_field <- "JOURNAL_REF"
    } else if (!is.null(current_field) && current_field == "AU_SHORT" && is.null(current_record[["TITLE"]])) {
      if (!grepl("^\\(", stripped) && stripped != "") {
        current_record[["TITLE"]] <- stripped
        current_field <- "TITLE"
      }
    } else if (!is.null(current_field) && current_field == "AUTHOR_FULL_NAMES" && is.null(current_record[["TITLE"]])) {
      if (grepl("^\\d{8,}", stripped)) {
        current_record[["AUTHOR_IDS"]] <- stripped
        current_field <- "AUTHOR_IDS"
      } else if (stripped != "" && !grepl("^\\(", stripped)) {
        current_record[["TITLE"]] <- stripped
        current_field <- "TITLE"
      }
    } else if (!is.null(current_field) && current_field == "AUTHOR_IDS" && is.null(current_record[["TITLE"]])) {
      if (stripped != "" && !grepl("^\\(", stripped)) {
        current_record[["TITLE"]] <- stripped
        current_field <- "TITLE"
      }
    } else if (!is.null(current_field) && current_field == "TITLE" && is.null(current_record[["JOURNAL_REF"]])) {
      if (grepl("^\\(\\d{4}\\)\\s", stripped)) {
        current_record[["JOURNAL_REF"]] <- stripped
        current_field <- "JOURNAL_REF"
      } else if (stripped != "") {
        current_record[["TITLE"]] <- paste(current_record[["TITLE"]], stripped)
      }
    } else if (!is.null(current_field) && current_field == "REFERENCES" && stripped != "") {
      current_record[["REFERENCES"]] <- paste(current_record[["REFERENCES"]], stripped)
    } else if (!is.null(current_field) && current_field == "ABSTRACT" &&
               !any(sapply(interrupt_labels, function(lbl) startsWith(stripped, lbl))) &&
               stripped != "") {
      current_record[["ABSTRACT"]] <- paste(current_record[["ABSTRACT"]], stripped)
    } else if (!is.null(current_field) && current_field == "FUNDING_TEXT" &&
               !any(sapply(funding_interrupt, function(lbl) startsWith(stripped, lbl))) &&
               stripped != "") {
      current_record[["FUNDING_TEXT"]] <- paste(current_record[["FUNDING_TEXT"]], stripped)
    }
    i <- i + 1
  }

  if (in_record && length(current_record) > 0) {
    records <- c(records, list(current_record))
  }
  return(records)
}

parse_journal_ref <- function(ref_line) {
  result <- list()
  m <- regmatches(ref_line, regexec("^\\((\\d{4})\\)\\s*(.*)", ref_line))[[1]]
  if (length(m) < 3) return(result)
  result[["PY"]] <- m[2]
  rest <- m[3]
  rest <- sub(",?\\s*Cited \\d+ times\\.?\\s*$", "", rest)
  rest <- sub(",\\s*$", "", trimws(rest))

  m1 <- regmatches(rest, regexec(
    "^(.+?),\\s*(\\d+)\\s*\\(([^)]+)\\)\\s*,\\s*(?:pp\\.\\s*(\\d+)\\s*-\\s*(\\d+)|art\\.\\s*no\\.\\s*(\\S+))",
    rest, perl = TRUE))[[1]]
  if (length(m1) >= 4 && m1[1] != "") {
    result[["SO"]] <- trimws(m1[2]); result[["VL"]] <- m1[3]; result[["IS"]] <- m1[4]
    if (!is.na(m1[5]) && m1[5] != "" && !is.na(m1[6]) && m1[6] != "") {
      result[["BP"]] <- m1[5]; result[["EP"]] <- m1[6]
    } else if (length(m1) >= 7 && !is.na(m1[7]) && m1[7] != "") {
      result[["AR"]] <- m1[7]
    }
    return(result)
  }

  m2 <- regmatches(rest, regexec(
    "^(.+?),\\s*(\\d+)\\s*,\\s*(?:pp\\.\\s*(\\d+)\\s*-\\s*(\\d+)|art\\.\\s*no\\.\\s*(\\S+))",
    rest, perl = TRUE))[[1]]
  if (length(m2) >= 3 && m2[1] != "") {
    result[["SO"]] <- trimws(m2[2]); result[["VL"]] <- m2[3]
    if (!is.na(m2[4]) && m2[4] != "" && !is.na(m2[5]) && m2[5] != "") {
      result[["BP"]] <- m2[4]; result[["EP"]] <- m2[5]
    } else if (length(m2) >= 6 && !is.na(m2[6]) && m2[6] != "") {
      result[["AR"]] <- m2[6]
    }
    return(result)
  }

  m3 <- regmatches(rest, regexec("^(.+?),\\s*(\\d+)\\s*\\(([^)]+)\\)\\s*$", rest))[[1]]
  if (length(m3) >= 4 && m3[1] != "") {
    result[["SO"]] <- trimws(m3[2]); result[["VL"]] <- m3[3]; result[["IS"]] <- m3[4]
    return(result)
  }

  m4 <- regmatches(rest, regexec("^(.+?),\\s*(\\d+)\\s*$", rest))[[1]]
  if (length(m4) >= 3 && m4[1] != "") {
    result[["SO"]] <- trimws(m4[2]); result[["VL"]] <- m4[3]
    return(result)
  }

  result[["SO"]] <- trimws(strsplit(rest, ",")[[1]][1])
  return(result)
}

parse_authors_short <- function(au_line) {
  parts <- strsplit(au_line, ";\\s*")[[1]]
  if (length(parts) > 1) return(trimws(parts[parts != ""]))
  tokens <- trimws(strsplit(au_line, ",")[[1]])
  authors <- character(0)
  i <- 1
  while (i <= length(tokens)) {
    if (i + 1 <= length(tokens)) {
      next_t <- trimws(tokens[i + 1])
      if (grepl("^[A-Z]\\.?[A-Z]?\\.?[A-Z]?\\.?\\s*$", next_t)) {
        authors <- c(authors, paste0(trimws(tokens[i]), ", ", next_t))
        i <- i + 2; next
      }
    }
    authors <- c(authors, trimws(tokens[i])); i <- i + 1
  }
  return(authors)
}

parse_authors_full <- function(af_line) {
  parts <- strsplit(af_line, ";\\s*")[[1]]
  authors <- character(0)
  for (p in parts) {
    name <- sub("\\s*\\(\\d+\\)\\s*$", "", trimws(p))
    if (name != "") authors <- c(authors, name)
  }
  return(authors)
}

# Nueva version robusta de convert_references (con anclaje en el año)
convert_references <- function(ref_text) {
  if (is.null(ref_text) || ref_text == "") return(character(0))
  refs <- strsplit(ref_text, ";\\s*\\n?")[[1]]
  cr_lines <- character(0)
  AUTHOR_TOKEN_RE <- "^[A-Z][a-zA-Z\\'\\-]+(?:\\s+[A-Z][a-zA-Z\\'\\-]+)*\\s+[A-Z]\\.(?:[A-Z]\\.)*(?:[A-Z]\\.)?$"
  INITIAL_RE <- "^[A-Z]\\.(?:[A-Z]\\.)*(?:[A-Z]\\.)?$"

  for (ref in refs) {
    ref <- trimws(ref); if (ref == "") next

    year_matches <- gregexpr("\\((\\d{4})\\)", ref, perl = TRUE)[[1]]
    year <- ""; ref_no_year <- ref
    if (year_matches[1] > 0) {
      last_pos <- year_matches[length(year_matches)]
      year <- substr(ref, last_pos + 1, last_pos + 4)
      ref_no_year <- trimws(substr(ref, 1, last_pos - 1))
      ref_no_year <- sub(",\\s*$", "", ref_no_year)
    }

    page <- ""; ref_no_pp <- ref_no_year
    pp_m <- regmatches(ref_no_year, regexec("pp\\.\\s*(\\d+)\\s*(?:-\\s*(\\d+))?", ref_no_year, perl = TRUE))[[1]]
    if (length(pp_m) >= 2 && pp_m[1] != "") {
      page <- pp_m[2]
      pp_start <- regexpr("pp\\.\\s*\\d+(?:\\s*-\\s*\\d+)?", ref_no_year, perl = TRUE)
      if (pp_start > 0) {
        ref_no_pp <- trimws(substr(ref_no_year, 1, pp_start - 1))
        ref_no_pp <- sub(",\\s*$", "", ref_no_pp)
      }
    }

    art_start <- regexpr("art\\.\\s*no\\.\\s*\\S+", ref_no_pp, perl = TRUE)
    if (art_start > 0) {
      ref_no_pp <- trimws(substr(ref_no_pp, 1, art_start - 1))
      ref_no_pp <- sub(",\\s*$", "", ref_no_pp)
    }

    tokens <- trimws(strsplit(ref_no_pp, ",\\s*")[[1]])
    tokens <- tokens[tokens != ""]

    volume <- ""; issue <- ""; vol_idx <- NA
    if (length(tokens) > 0) {
      for (idx in length(tokens):1) {
        if (grepl("^\\d+$", tokens[idx])) {
          if (idx > 1 && grepl("^\\d+$", tokens[idx - 1])) {
            volume <- tokens[idx - 1]; issue <- tokens[idx]; vol_idx <- idx - 1
          } else {
            volume <- tokens[idx]; vol_idx <- idx
          }
          break
        }
      }
    }

    journal <- ""
    if (!is.na(vol_idx) && vol_idx > 1) journal <- tokens[vol_idx - 1]

    first_author <- if (length(tokens) > 0) tokens[1] else ""
    if (first_author != "" && !grepl(AUTHOR_TOKEN_RE, first_author, perl = TRUE)) {
      if (length(tokens) >= 2 && grepl(INITIAL_RE, tokens[2], perl = TRUE)) {
        first_author <- paste0(tokens[1], ", ", tokens[2])
      }
    }

    if (first_author != "" && year != "") {
      cr <- paste0(first_author, ", ", year)
      if (journal != "") cr <- paste0(cr, ", ", toupper(journal))
      if (volume  != "") cr <- paste0(cr, ", V", volume)
      if (page    != "") cr <- paste0(cr, ", P", page)
      cr_lines <- c(cr_lines, cr)
    } else if (first_author != "") {
      cr_lines <- c(cr_lines, first_author)
    } else if (ref != "") {
      cr_lines <- c(cr_lines, substr(ref, 1, 100))
    }
  }
  return(cr_lines)
}

format_wos_field <- function(tag, value) {
  if (is.null(value) || (length(value) == 1 && value == "")) return("")
  lines <- character(0)
  if (length(value) > 1) {
    for (j in seq_along(value)) {
      if (j == 1) lines <- c(lines, paste0(tag, " ", value[j]))
      else        lines <- c(lines, paste0("   ", value[j]))
    }
  } else {
    lines <- c(lines, paste0(tag, " ", value))
  }
  return(paste(lines, collapse = "\n"))
}

record_to_wos <- function(rec) {
  output_lines <- c("PT J")

  if (!is.null(rec[["AU_SHORT"]])) {
    authors_short <- parse_authors_short(rec[["AU_SHORT"]])
    if (length(authors_short) > 0) output_lines <- c(output_lines, format_wos_field("AU", authors_short))
  }
  if (!is.null(rec[["AUTHOR_FULL_NAMES"]])) {
    authors_full <- parse_authors_full(rec[["AUTHOR_FULL_NAMES"]])
    if (length(authors_full) > 0) output_lines <- c(output_lines, format_wos_field("AF", authors_full))
  }
  if (!is.null(rec[["TITLE"]])) output_lines <- c(output_lines, format_wos_field("TI", rec[["TITLE"]]))

  journal_info <- list()
  if (!is.null(rec[["JOURNAL_REF"]])) {
    journal_info <- parse_journal_ref(rec[["JOURNAL_REF"]])
    if (!is.null(journal_info[["SO"]])) output_lines <- c(output_lines, format_wos_field("SO", journal_info[["SO"]]))
  }
  if (!is.null(rec[["LANGUAGE"]])) output_lines <- c(output_lines, format_wos_field("LA", rec[["LANGUAGE"]]))
  if (!is.null(rec[["DOCUMENT_TYPE"]])) output_lines <- c(output_lines, format_wos_field("DT", rec[["DOCUMENT_TYPE"]]))
  if (!is.null(rec[["AUTHOR_KEYWORDS"]])) output_lines <- c(output_lines, format_wos_field("DE", rec[["AUTHOR_KEYWORDS"]]))
  if (!is.null(rec[["INDEX_KEYWORDS"]])) output_lines <- c(output_lines, format_wos_field("ID", rec[["INDEX_KEYWORDS"]]))
  if (!is.null(rec[["ABSTRACT"]])) output_lines <- c(output_lines, format_wos_field("AB", rec[["ABSTRACT"]]))
  if (!is.null(rec[["AFFILIATIONS"]])) output_lines <- c(output_lines, format_wos_field("C1", rec[["AFFILIATIONS"]]))
  if (!is.null(rec[["CORRESPONDENCE"]])) output_lines <- c(output_lines, format_wos_field("RP", rec[["CORRESPONDENCE"]]))
  if (!is.null(rec[["CORRESPONDENCE"]])) {
    email_m <- regmatches(rec[["CORRESPONDENCE"]], regexec("email:\\s*(\\S+)", rec[["CORRESPONDENCE"]]))[[1]]
    if (length(email_m) >= 2) output_lines <- c(output_lines, format_wos_field("EM", email_m[2]))
  }
  if (!is.null(rec[["FUNDING_DETAILS"]])) output_lines <- c(output_lines, format_wos_field("FU", rec[["FUNDING_DETAILS"]]))
  if (!is.null(rec[["FUNDING_TEXT"]])) output_lines <- c(output_lines, format_wos_field("FX", rec[["FUNDING_TEXT"]]))

  cr_lines <- character(0)
  if (!is.null(rec[["REFERENCES"]])) {
    cr_lines <- convert_references(rec[["REFERENCES"]])
    if (length(cr_lines) > 0) output_lines <- c(output_lines, format_wos_field("CR", cr_lines))
  }
  if (!is.null(rec[["REFERENCES"]])) {
    output_lines <- c(output_lines, format_wos_field("NR", as.character(length(cr_lines))))
  }
  if (!is.null(rec[["PUBLISHER"]])) output_lines <- c(output_lines, format_wos_field("PU", rec[["PUBLISHER"]]))
  if (!is.null(rec[["ISSN"]]))      output_lines <- c(output_lines, format_wos_field("SN", rec[["ISSN"]]))
  if (!is.null(rec[["ISBN"]]))      output_lines <- c(output_lines, format_wos_field("BN", rec[["ISBN"]]))
  if (!is.null(rec[["ABBREV_SOURCE"]])) {
    output_lines <- c(output_lines, format_wos_field("J9", rec[["ABBREV_SOURCE"]]))
    output_lines <- c(output_lines, format_wos_field("JI", rec[["ABBREV_SOURCE"]]))
  }
  if (!is.null(journal_info[["PY"]])) output_lines <- c(output_lines, format_wos_field("PY", journal_info[["PY"]]))
  if (!is.null(journal_info[["VL"]])) output_lines <- c(output_lines, format_wos_field("VL", journal_info[["VL"]]))
  if (!is.null(journal_info[["IS"]])) output_lines <- c(output_lines, format_wos_field("IS", journal_info[["IS"]]))
  if (!is.null(journal_info[["BP"]])) output_lines <- c(output_lines, format_wos_field("BP", journal_info[["BP"]]))
  if (!is.null(journal_info[["EP"]])) output_lines <- c(output_lines, format_wos_field("EP", journal_info[["EP"]]))
  if (!is.null(journal_info[["AR"]])) output_lines <- c(output_lines, format_wos_field("AR", journal_info[["AR"]]))
  if (!is.null(rec[["DOI"]]))         output_lines <- c(output_lines, format_wos_field("DI", rec[["DOI"]]))

  if (!is.null(journal_info[["BP"]]) && !is.null(journal_info[["EP"]])) {
    bp <- suppressWarnings(as.integer(journal_info[["BP"]]))
    ep <- suppressWarnings(as.integer(journal_info[["EP"]]))
    if (!is.na(bp) && !is.na(ep)) output_lines <- c(output_lines, format_wos_field("PG", as.character(ep - bp + 1)))
  }
  if (!is.null(rec[["PUBMED_ID"]]))   output_lines <- c(output_lines, format_wos_field("PM", rec[["PUBMED_ID"]]))
  if (!is.null(rec[["OPEN_ACCESS"]])) output_lines <- c(output_lines, format_wos_field("OA", tolower(rec[["OPEN_ACCESS"]])))

  # UT con fix para URL nuevo y fallback a DOI
  scopus_id <- NULL
  if (!is.null(rec[["SCOPUS_URL"]])) {
    url <- rec[["SCOPUS_URL"]]
    eid_m <- regmatches(url, regexec("eid=(2-s2\\.0-\\d+)", url))[[1]]
    if (length(eid_m) >= 2) {
      scopus_id <- eid_m[2]
    } else {
      new_m <- regmatches(url, regexec("/pages/publications/(\\d+)", url))[[1]]
      if (length(new_m) >= 2) scopus_id <- paste0("2-s2.0-", new_m[2])
    }
  }
  if (!is.null(scopus_id)) {
    output_lines <- c(output_lines, format_wos_field("UT", paste0("SCOPUS:", scopus_id)))
  } else if (!is.null(rec[["DOI"]]) && rec[["DOI"]] != "") {
    doi_id <- substr(gsub("[^A-Za-z0-9]", "", rec[["DOI"]]), 1, 30)
    output_lines <- c(output_lines, format_wos_field("UT", paste0("SCOPUS:DOI-", doi_id)))
  }

  output_lines <- c(output_lines, "ER")
  output_lines <- output_lines[output_lines != ""]
  return(paste(output_lines, collapse = "\n"))
}

convert_scopus_to_wos_file <- function(input_path, output_path, progress_callback = NULL) {
  records <- parse_scopus_records(input_path)
  con <- file(output_path, open = "wb")
  writeBin(charToRaw("\xEF\xBB\xBF"), con)
  writeBin(charToRaw("FN Converted from Scopus to WoS Format\n"), con)
  writeBin(charToRaw("VR 1.0\n"), con)
  n <- length(records)
  for (i in seq_along(records)) {
    wos_text <- record_to_wos(records[[i]])
    writeBin(charToRaw(paste0(wos_text, "\n")), con)
    if (!is.null(progress_callback) && i %% 20 == 0) {
      progress_callback(i / n, sprintf("Convirtiendo registro %d / %d", i, n))
    }
  }
  writeBin(charToRaw("EF\n"), con)
  close(con)
  return(n)
}

# =============================================================================
# FUNCIONES DEL SCRIPT 2 (CONSOLIDAR WOS + SCOPUS)
# =============================================================================

string_similarity <- function(a, b) {
  if (a == "" && b == "") return(1.0)
  if (a == "" || b == "") return(0.0)
  d <- adist(a, b)[1, 1]
  max_len <- max(nchar(a), nchar(b))
  return(1 - d / max_len)
}

parse_wos_records <- function(filepath) {
  lines <- readLines(filepath, encoding = "UTF-8", warn = FALSE)
  if (length(lines) > 0) lines[1] <- sub("^\uFEFF", "", lines[1])

  records <- list()
  current <- list()
  current_tag <- NULL

  for (line in lines) {
    line <- sub("\\r$", "", line)
    if (startsWith(line, "FN ") || startsWith(line, "VR ") || startsWith(line, "EF")) next

    if (nchar(line) >= 3 && substr(line, 3, 3) == " " &&
        grepl("^[A-Z][A-Z0-9]$", substr(line, 1, 2))) {
      tag <- substr(line, 1, 2); value <- substr(line, 4, nchar(line))
      if (tag == "PT") {
        if (length(current) > 0) records <- c(records, list(current))
        current <- list(PT = value); current_tag <- "PT"
      } else if (tag == "ER") {
        if (length(current) > 0) records <- c(records, list(current))
        current <- list(); current_tag <- NULL
      } else {
        if (!is.null(current[[tag]])) current[[tag]] <- paste0(current[[tag]], "\n", value)
        else current[[tag]] <- value
        current_tag <- tag
      }
    } else if (startsWith(line, "   ") && !is.null(current_tag) && length(current) > 0) {
      current[[current_tag]] <- paste0(current[[current_tag]], "\n", substr(line, 4, nchar(line)))
    }
  }
  if (length(current) > 0) records <- c(records, list(current))

  # Las entidades HTML se decodifican con el campo YA reunido, nunca linea a
  # linea: WoS parte "&otilde;" justo por el salto de continuacion
  # ("...Percep & ccedil;&" / "   otilde;es"), asi que mirando una sola linea no
  # hay nada que reconocer.
  records <- lapply(records, function(rec) lapply(rec, decodificar_entidades))
  return(records)
}

normalize_doi <- function(doi) {
  if (is.null(doi) || doi == "") return(NA_character_)
  doi <- trimws(tolower(doi))
  doi <- sub("^https?://(dx\\.)?doi\\.org/", "", doi)
  return(doi)
}

normalize_title <- function(title) {
  if (is.null(title) || title == "") return("")
  t <- gsub("\\s+", " ", title); t <- tolower(t)
  t <- iconv(t, to = "ASCII//TRANSLIT")
  if (is.na(t)) t <- tolower(gsub("\\s+", " ", title))
  t <- gsub("[^\\w\\s]", " ", t, perl = TRUE)
  t <- gsub("\\s+", " ", trimws(t))
  return(t)
}

reformat_scopus_cr <- function(cr_text) {
  if (is.null(cr_text) || cr_text == "") return(cr_text)
  lines <- strsplit(cr_text, "\n")[[1]]
  reformatted <- character(0)
  for (line in lines) {
    line <- trimws(line); if (line == "") next
    v_match <- regexpr(",\\s*(V\\d+)", line, perl = TRUE)
    if (v_match > 0) {
      before_v <- substr(line, 1, v_match - 1)
      from_v <- substr(line, v_match, nchar(line))
      parts <- trimws(strsplit(before_v, ",")[[1]])
      year_idx <- NULL; year_val <- NULL
      for (idx in seq_along(parts)) {
        if (grepl("^\\d{4}$", trimws(parts[idx]))) {
          year_val <- trimws(parts[idx]); year_idx <- idx; break
        }
      }
      if (!is.null(year_idx)) {
        author <- trimws(paste(parts[1:(year_idx - 1)], collapse = ", "))
        after_year <- if (year_idx < length(parts)) parts[(year_idx + 1):length(parts)] else character(0)
        journal <- if (length(after_year) > 0) trimws(after_year[length(after_year)]) else NULL
        from_v_clean <- trimws(sub("^,\\s*", "", from_v))
        if (author != "" && !is.null(journal) && journal != "") {
          new_cr <- paste0(author, ", ", year_val, ", ", journal, ", ", from_v_clean)
        } else if (author != "") {
          new_cr <- paste0(author, ", ", year_val, ", ", from_v_clean)
        } else { new_cr <- line }
        reformatted <- c(reformatted, new_cr)
      } else { reformatted <- c(reformatted, line) }
    } else { reformatted <- c(reformatted, line) }
  }
  return(paste(reformatted, collapse = "\n"))
}

is_scopus_record <- function(rec) {
  ut <- rec[["UT"]]; if (is.null(ut)) return(FALSE)
  return(grepl("SCOPUS:", ut))
}

record_to_wos_text <- function(rec) {
  lines <- paste0("PT ", ifelse(is.null(rec[["PT"]]), "J", rec[["PT"]]))
  field_order <- c("AU","AF","TI","SO","LA","DT","DE","ID","AB","C1","C3","RP","EM",
                   "RI","OI","FU","FX","CR","NR","TC","Z9","U1","U2","PU","PI","PA",
                   "SN","EI","BN","J9","JI","PD","PY","VL","IS","SI","BP","EP","AR",
                   "DI","EA","PG","PM","WC","WE","SC","GA","UT","OA","HC","HP","DA")
  written <- c("PT")
  for (tag in field_order) {
    if (!is.null(rec[[tag]])) {
      value <- rec[[tag]]
      if (tag == "CR" && is_scopus_record(rec)) value <- reformat_scopus_cr(value)
      value_lines <- strsplit(value, "\n")[[1]]
      lines <- c(lines, paste0(tag, " ", value_lines[1]))
      if (length(value_lines) > 1) {
        for (vl in value_lines[2:length(value_lines)]) lines <- c(lines, paste0("   ", vl))
      }
      written <- c(written, tag)
    }
  }
  for (tag in names(rec)) {
    if (!(tag %in% written)) {
      value <- rec[[tag]]
      value_lines <- strsplit(value, "\n")[[1]]
      lines <- c(lines, paste0(tag, " ", value_lines[1]))
      if (length(value_lines) > 1) {
        for (vl in value_lines[2:length(value_lines)]) lines <- c(lines, paste0("   ", vl))
      }
    }
  }
  lines <- c(lines, "ER")
  return(paste(lines, collapse = "\n"))
}

merge_records <- function(wos_records, scopus_records, threshold = 0.85,
                          priority = "wos", progress_callback = NULL) {
  wos_by_doi <- list()
  for (rec in wos_records) {
    doi <- normalize_doi(rec[["DI"]])
    if (!is.na(doi) && doi != "") wos_by_doi[[doi]] <- rec
  }
  wos_titles <- lapply(wos_records, function(rec) {
    list(title = normalize_title(rec[["TI"]]), rec = rec)
  })

  merged <- wos_records
  duplicates <- list()
  added_from_scopus <- 0; skipped_doi <- 0; skipped_title <- 0
  n <- length(scopus_records)

  for (idx in seq_along(scopus_records)) {
    s_rec <- scopus_records[[idx]]
    s_doi <- normalize_doi(s_rec[["DI"]])
    is_dup <- FALSE

    if (!is.na(s_doi) && s_doi != "" && !is.null(wos_by_doi[[s_doi]])) {
      duplicates <- c(duplicates, list(list(
        wos = wos_by_doi[[s_doi]], scopus = s_rec, match_type = "DOI", score = 1.0)))
      skipped_doi <- skipped_doi + 1; is_dup <- TRUE
    }

    if (!is_dup) {
      s_title <- normalize_title(s_rec[["TI"]])
      if (s_title != "") {
        best_score <- 0; best_match <- NULL
        for (wt in wos_titles) {
          if (wt$title == "") next
          len_ratio <- nchar(s_title) / max(nchar(wt$title), 1)
          if (len_ratio < 0.7 || len_ratio > 1.4) next
          score <- string_similarity(s_title, wt$title)
          if (score > best_score) { best_score <- score; best_match <- wt$rec }
        }
        if (best_score >= threshold) {
          duplicates <- c(duplicates, list(list(
            wos = best_match, scopus = s_rec, match_type = "TITLE", score = best_score)))
          skipped_title <- skipped_title + 1; is_dup <- TRUE
        }
      }
    }

    if (!is_dup) {
      merged <- c(merged, list(s_rec)); added_from_scopus <- added_from_scopus + 1
    }

    if (!is.null(progress_callback) && idx %% 20 == 0) {
      progress_callback(idx / n, sprintf("Comparando registro %d / %d", idx, n))
    }
  }

  stats <- list(wos_total=length(wos_records), scopus_total=length(scopus_records),
                duplicates_doi=skipped_doi, duplicates_title=skipped_title,
                added_from_scopus=added_from_scopus, merged_total=length(merged),
                priority=priority)
  return(list(merged=merged, duplicates=duplicates, stats=stats))
}

write_merged_file <- function(merged, output_path) {
  con <- file(output_path, open = "wb")
  writeBin(charToRaw("\xEF\xBB\xBF"), con)
  writeBin(charToRaw("FN Clarivate Analytics Web of Science\n"), con)
  writeBin(charToRaw("VR 1.0\n"), con)
  for (rec in merged) {
    wos_text <- record_to_wos_text(rec)
    writeBin(charToRaw(paste0(wos_text, "\n\n")), con)
  }
  writeBin(charToRaw("EF\n"), con)
  close(con)
}

# =============================================================================
# EXPORTACION A OTROS FORMATOS (RIS / BIBTEX)
#
# Los registros consolidados son listas con nombre por etiqueta WoS de 2
# letras; los valores multi-linea usan "\n" como separador (ver
# parse_wos_records() y record_to_wos_text()).
#
# Aviso metodologico: el RIS no tiene campo para las referencias citadas, asi
# que ese formato no permite co-citacion ni acoplamiento bibliografico. El
# BibTeX si las lleva (campo "references", que bibliometrix mapea a CR).
# =============================================================================

# Primer valor de una etiqueta (o NA si no existe)
extract_field <- function(rec, tag) {
  v <- rec[[tag]]
  if (is.null(v)) return(NA_character_)
  strsplit(v, "\n")[[1]][1]
}

# Todos los valores de una etiqueta, uno por linea original
rec_lines <- function(rec, tag) {
  v <- rec[[tag]]
  if (is.null(v) || is.na(v) || v == "") return(character(0))
  out <- trimws(strsplit(v, "\n")[[1]])
  out[out != ""]
}

# Valor completo colapsado en una sola linea (para AB, C1, TI largos...)
rec_flat <- function(rec, tag) {
  l <- rec_lines(rec, tag)
  if (length(l) == 0) return(NA_character_)
  trimws(gsub("\\s+", " ", paste(l, collapse = " ")))
}

# Palabras clave: la etiqueta puede venir partida en varias lineas y ademas
# separada por ";" dentro de cada una.
rec_keywords <- function(rec, tag) {
  v <- rec_flat(rec, tag)
  if (is.na(v)) return(character(0))
  kw <- trimws(strsplit(v, ";")[[1]])
  kw[kw != ""]
}

has_val <- function(x) !is.null(x) && length(x) == 1 && !is.na(x) && nzchar(trimws(x))

# --- RIS ---------------------------------------------------------------------

ris_type <- function(dt) {
  if (!has_val(dt)) return("GEN")
  d <- tolower(dt)
  if (grepl("review|article", d))          return("JOUR")
  if (grepl("proceedings|conference", d))  return("CONF")
  if (grepl("book chapter|chapter", d))    return("CHAP")
  if (grepl("book", d))                    return("BOOK")
  "GEN"
}

# Una linea RIS: etiqueta de 2 caracteres + 2 espacios + "-" + 1 espacio.
# Ese formato exacto es lo que esperan VOSviewer, Zotero y Mendeley.
ris_line <- function(tag, value) {
  if (!has_val(value)) return(character(0))
  paste0(sprintf("%-2s", tag), "  - ", trimws(gsub("[\r\n]+", " ", value)))
}

record_to_ris <- function(rec) {
  L <- character(0)
  add <- function(tag, value) L <<- c(L, ris_line(tag, value))

  L <- c(L, paste0("TY  - ", ris_type(extract_field(rec, "DT"))))

  autores <- rec_lines(rec, "AF")
  if (length(autores) == 0) autores <- rec_lines(rec, "AU")
  for (a in autores) add("AU", a)

  add("TI", rec_flat(rec, "TI"))

  revista <- rec_flat(rec, "SO")
  add("JO", revista)   # JO y T2: distintos lectores prefieren una u otra
  add("T2", revista)
  add("J2", rec_flat(rec, "J9"))

  add("PY", extract_field(rec, "PY"))
  add("VL", extract_field(rec, "VL"))
  add("IS", extract_field(rec, "IS"))
  add("SP", extract_field(rec, "BP"))
  add("EP", extract_field(rec, "EP"))
  if (!has_val(extract_field(rec, "BP"))) add("SP", extract_field(rec, "AR"))

  add("AB", rec_flat(rec, "AB"))

  kw <- rec_keywords(rec, "DE")
  if (length(kw) == 0) kw <- rec_keywords(rec, "ID")
  for (k in kw) add("KW", k)

  add("AD", rec_flat(rec, "C1"))
  add("PB", rec_flat(rec, "PU"))
  add("LA", extract_field(rec, "LA"))

  sn <- extract_field(rec, "SN")
  if (!has_val(sn)) sn <- extract_field(rec, "EI")
  add("SN", sn)

  doi <- extract_field(rec, "DI")
  if (has_val(doi)) {
    add("DO", doi)
    add("UR", paste0("https://doi.org/", sub("^https?://(dx\\.)?doi\\.org/", "", doi)))
  }

  tc <- extract_field(rec, "TC")
  if (has_val(tc)) add("N1", paste0("Cited By: ", tc))

  # ER cierra el registro; la linea en blanco posterior la anade el escritor
  c(L, "ER  - ")
}

write_ris_file <- function(merged, output_path) {
  con <- file(output_path, open = "wb")
  on.exit(close(con), add = TRUE)
  # BOM UTF-8: ayuda a VOSviewer y a Excel en Windows a detectar la codificacion
  writeBin(charToRaw("\xEF\xBB\xBF"), con)
  for (rec in merged) {
    txt <- paste0(paste(record_to_ris(rec), collapse = "\n"), "\n\n")
    writeBin(charToRaw(enc2utf8(txt)), con)
  }
  invisible(length(merged))
}

# --- BibTeX ------------------------------------------------------------------

bibtex_type <- function(dt) {
  if (!has_val(dt)) return("MISC")
  d <- tolower(dt)
  if (grepl("review|article", d))          return("ARTICLE")
  if (grepl("proceedings|conference", d))  return("INPROCEEDINGS")
  if (grepl("book chapter|chapter", d))    return("INCOLLECTION")
  if (grepl("book", d))                    return("BOOK")
  "MISC"
}

# Escapa solo lo que rompe a un PARSER de BibTeX: la barra invertida, las
# llaves (descuadran el registro) y el "%" (inicia un comentario).
#
# "& _ $ # ~ ^" se dejan tal cual a proposito. Escaparlos seria lo correcto
# para compilar con LaTeX, pero los exports reales de Scopus tampoco lo hacen
# y el lector de bibliometrix quita las llaves sin des-escapar nada: un
# "Ciencia & Tecnologia" escapado acabaria mostrandose como "Ciencia \& …"
# en biblioshiny. Se prioriza que el texto llegue limpio a las herramientas
# bibliometricas, que es para lo que se exporta.
bib_escape <- function(x) {
  if (!has_val(x)) return("")
  s <- trimws(gsub("[\r\n]+", " ", x))
  s <- gsub("\\\\", " ", s)        # barra invertida suelta: fuera
  s <- gsub("[{}]", "", s)         # llaves: descuadran el registro
  s <- gsub("%", "\\\\%", s)       # "%" sin escapar comenta el resto de linea
  trimws(gsub("\\s+", " ", s))
}

make_bib_key <- function(rec, idx, used) {
  autores <- rec_lines(rec, "AF")
  if (length(autores) == 0) autores <- rec_lines(rec, "AU")
  apellido <- ""
  if (length(autores) > 0) {
    apellido <- trimws(strsplit(autores[1], ",")[[1]][1])
    apellido <- iconv(apellido, to = "ASCII//TRANSLIT")
    if (is.na(apellido)) apellido <- ""
    apellido <- tolower(gsub("[^A-Za-z0-9]", "", apellido))
  }
  anio <- extract_field(rec, "PY"); if (!has_val(anio)) anio <- ""

  palabra <- ""
  ti <- rec_flat(rec, "TI")
  if (has_val(ti)) {
    palabra <- iconv(strsplit(ti, "\\s+")[[1]][1], to = "ASCII//TRANSLIT")
    if (is.na(palabra)) palabra <- ""
    palabra <- tolower(gsub("[^A-Za-z0-9]", "", palabra))
  }

  base <- paste0(apellido, anio, palabra)
  if (!nzchar(base)) base <- sprintf("ref%04d", idx)

  key <- base
  if (key %in% used) {
    for (suf in c(letters, paste0(letters, letters))) {
      if (!(paste0(base, suf) %in% used)) { key <- paste0(base, suf); break }
    }
  }
  key
}

record_to_bibtex <- function(rec, key) {
  campos <- list()
  add <- function(nombre, valor) {
    if (has_val(valor)) campos[[nombre]] <<- bib_escape(valor)
  }

  autores <- rec_lines(rec, "AF")
  if (length(autores) == 0) autores <- rec_lines(rec, "AU")
  if (length(autores) > 0) add("author", paste(autores, collapse = " and "))

  ti <- rec_flat(rec, "TI")
  # Dobles llaves: preservan las mayusculas del titulo al formatear con BibTeX
  if (has_val(ti)) campos[["title"]] <- paste0("{", bib_escape(ti), "}")

  add("year",      extract_field(rec, "PY"))
  add("journal",   rec_flat(rec, "SO"))
  add("volume",    extract_field(rec, "VL"))
  add("number",    extract_field(rec, "IS"))

  bp <- extract_field(rec, "BP"); ep <- extract_field(rec, "EP")
  if (has_val(bp) && has_val(ep))      add("pages", paste0(bp, "--", ep))
  else if (has_val(bp))                add("pages", bp)
  else                                 add("art_number", extract_field(rec, "AR"))

  add("doi",             extract_field(rec, "DI"))
  sn <- extract_field(rec, "SN"); if (!has_val(sn)) sn <- extract_field(rec, "EI")
  add("issn",            sn)
  add("isbn",            extract_field(rec, "BN"))
  add("abstract",        rec_flat(rec, "AB"))
  add("author_keywords", paste(rec_keywords(rec, "DE"), collapse = "; "))
  add("keywords",        paste(rec_keywords(rec, "ID"), collapse = "; "))
  add("affiliations",    rec_flat(rec, "C1"))
  add("publisher",       rec_flat(rec, "PU"))
  add("language",        extract_field(rec, "LA"))
  add("document_type",   extract_field(rec, "DT"))
  # "abbrev_source_title" y no "journal_abbrev": es el nombre que espera la
  # tabla bibtag de bibliometrix para mapearlo a JI
  add("abbrev_source_title", rec_flat(rec, "J9"))
  add("correspondence_address", rec_flat(rec, "RP"))
  add("pubmed_id",       extract_field(rec, "PM"))

  # A diferencia de RIS, BibTeX si puede transportar las referencias citadas:
  # bibliometrix mapea "references" -> CR, con lo que el .bib sirve para
  # co-citacion y acoplamiento bibliografico dentro de biblioshiny.
  refs <- rec_lines(rec, "CR")
  if (length(refs) > 0) add("references", paste(refs, collapse = "; "))

  tc <- extract_field(rec, "TC")
  if (has_val(tc)) add("note", paste0("cited By ", tc))

  # Sin sangria: el parser de bibliometrix toma la etiqueta con substr() desde
  # el inicio de la linea, asi que unos espacios delante rompen el mapeo.
  cuerpo <- paste0(names(campos), " = {", unlist(campos), "}", collapse = ",\n")
  paste0("@", bibtex_type(extract_field(rec, "DT")), "{", key, ",\n",
         cuerpo, "\n}")
}

write_bibtex_file <- function(merged, output_path) {
  con <- file(output_path, open = "wb")
  on.exit(close(con), add = TRUE)
  # Sin BOM a proposito: algunas cadenas LaTeX (bibtex8) no lo digieren
  used <- character(0)
  for (i in seq_along(merged)) {
    key <- make_bib_key(merged[[i]], i, used)
    used <- c(used, key)
    txt <- paste0(record_to_bibtex(merged[[i]], key), "\n\n")
    writeBin(charToRaw(enc2utf8(txt)), con)
  }
  invisible(length(merged))
}

# =============================================================================
# EXPORTACION A EXCEL (lista de articulos para el cribado)
#
# A diferencia de .txt / .ris / .bib, esto NO es un formato bibliografico: es la
# tabla que se usa para leer el corpus a mano —una fila por articulo con
# titulo, DOI, resumen y palabras clave— y decidir que entra en la revision.
# Lee los registros con las mismas ayudas que RIS y BibTeX
# (extract_field / rec_lines / rec_flat / rec_keywords), asi que sale de los
# mismos datos y respeta los filtros de la pestana 1.
# =============================================================================

# Limite duro de Excel: 32.767 caracteres por celda. Ningun abstract normal se
# acerca, pero un registro con el resumen y las referencias pegados si puede
# pasarse, y Excel entonces se niega a abrir el archivo entero. Se recorta.
EXCEL_MAX_CHARS <- 32767

excel_celda <- function(x) {
  if (!has_val(x)) return("")
  s <- trimws(x)
  if (nchar(s) > EXCEL_MAX_CHARS) s <- paste0(substr(s, 1, EXCEL_MAX_CHARS - 3), "...")
  s
}

# Columnas de la lista. Se declaran aqui (y no dentro del escritor) porque los
# anchos, el ajuste de texto y la columna del hipervinculo se posicionan por
# indice: si cambia el orden, cambia todo en un solo sitio.
EXCEL_COLS <- data.frame(
  nombre = c("Nº", "Título", "DOI", "Enlace DOI", "Autores", "Año", "Revista",
             "Tipo de documento", "Idioma", "Palabras clave", "Resumen",
             "ID (WoS/Scopus)"),
  ancho  = c(5, 70, 34, 40, 40, 7, 40, 20, 10, 45, 100, 24),
  ajusta = c(FALSE, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE,
             TRUE, TRUE, FALSE),
  stringsAsFactors = FALSE
)

records_to_df <- function(merged) {
  campo <- function(tag) vapply(merged, function(r) excel_celda(rec_flat(r, tag)),
                                character(1))
  primero <- function(tag) vapply(merged, function(r) excel_celda(extract_field(r, tag)),
                                  character(1))

  # AF (nombre completo) es mas legible que AU (abreviado) para una lista que se
  # lee a mano; AU queda de reserva porque no todos los registros traen AF.
  autores <- vapply(merged, function(r) {
    a <- rec_lines(r, "AF")
    if (length(a) == 0) a <- rec_lines(r, "AU")
    excel_celda(paste(a, collapse = "; "))
  }, character(1))

  # DE son las palabras clave del autor; ID las de la base. Si no hay DE se usan
  # las ID antes que dejar la celda vacia.
  claves <- vapply(merged, function(r) {
    k <- rec_keywords(r, "DE")
    if (length(k) == 0) k <- rec_keywords(r, "ID")
    excel_celda(paste(k, collapse = "; "))
  }, character(1))

  doi <- primero("DI")
  # Algunos registros ya traen el DOI como URL completa: se normaliza para no
  # acabar con un enlace tipo https://doi.org/https://doi.org/10.xxxx
  enlace <- ifelse(nzchar(doi),
                   paste0("https://doi.org/",
                          sub("^https?://(dx\\.)?doi\\.org/", "", doi)),
                   NA_character_)

  df <- data.frame(
    seq_along(merged), campo("TI"), doi, enlace, autores, primero("PY"),
    campo("SO"), primero("DT"), primero("LA"), claves, campo("AB"), primero("UT"),
    stringsAsFactors = FALSE
  )
  names(df) <- EXCEL_COLS$nombre
  df
}

write_excel_file <- function(merged, output_path) {
  if (!requireNamespace("openxlsx", quietly = TRUE)) {
    stop("Falta el paquete 'openxlsx', necesario para exportar a Excel.\n",
         "Instalalo desde la consola de R con:\n  install.packages(\"openxlsx\")",
         call. = FALSE)
  }

  df <- records_to_df(merged)
  n  <- nrow(df)

  # class "hyperlink" hace que openxlsx escriba la celda como enlace clicable.
  # Los NA (registros sin DOI) se quedan como celda vacia, no como enlace roto.
  class(df[["Enlace DOI"]]) <- "hyperlink"

  wb <- openxlsx::createWorkbook()
  openxlsx::addWorksheet(wb, "Artículos")

  estilo_cabecera <- openxlsx::createStyle(
    fgFill = "#2C3E6B", fontColour = "white", textDecoration = "bold",
    halign = "center", valign = "center", wrapText = TRUE,
    border = "TopBottomLeftRight", borderColour = "#1a2548")

  openxlsx::writeData(wb, 1, df, headerStyle = estilo_cabecera, withFilter = TRUE)

  openxlsx::setColWidths(wb, 1, cols = seq_len(ncol(df)), widths = EXCEL_COLS$ancho)
  openxlsx::freezePane(wb, 1, firstActiveRow = 2, firstActiveCol = 2)

  if (n > 0) {
    filas <- 2:(n + 1)
    # stack = TRUE: los estilos se suman al del hipervinculo en vez de borrarlo
    openxlsx::addStyle(wb, 1, openxlsx::createStyle(valign = "top"),
                       rows = filas, cols = seq_len(ncol(df)),
                       gridExpand = TRUE, stack = TRUE)
    cols_ajuste <- which(EXCEL_COLS$ajusta)
    openxlsx::addStyle(wb, 1, openxlsx::createStyle(wrapText = TRUE, valign = "top"),
                       rows = filas, cols = cols_ajuste,
                       gridExpand = TRUE, stack = TRUE)
    # Altura fija: con el texto ajustado y sin fijarla, Excel auto-expande cada
    # fila a la altura del resumen y la tabla deja de poderse recorrer.
    openxlsx::setRowHeights(wb, 1, rows = filas, heights = 45)
  }

  openxlsx::saveWorkbook(wb, output_path, overwrite = TRUE)
  invisible(n)
}

# =============================================================================
# GUIA DE FIGURAS
#
# Que es cada figura y para que sirve. Se guarda como datos y no como HTML
# escrito a mano para que la misma lista pueda volcarse tal cual a un archivo
# de texto dentro del ZIP el dia que haga falta.
#
# Los nombres de archivo tienen que coincidir EXACTAMENTE con los que escribe
# el generador (las llamadas a guardar_fig / guardar_fig_base): una guia que
# nombra mal un archivo es peor que no tener guia.
#
# El orden es el mismo en el que se generan, agrupado por bloque tematico.
# =============================================================================
GUIA_FIGURAS <- list(
  list(
    bloque = "Producción y evolución temporal",
    figuras = list(
      list(n = "1", archivo = "fig01_annual_production", campo = "PY",
           titulo = "Producción científica anual",
           params = "barras por año, curva de suavizado y conteo sobre cada barra",
           objetivo = paste(
             "Delimita el período real de la literatura y demuestra si el campo crece.",
             "Es la figura que sostiene la frase \"el interés por este tema ha aumentado",
             "en la última década\": sin ella, esa afirmación es solo una impresión.")),

      list(n = "4", archivo = "fig04_trend_topics", campo = "DE",
           titulo = "Evolución temporal de las palabras clave",
           params = "términos con 5 apariciones o más, 5 términos por año",
           objetivo = paste(
             "Dibuja para cada término su año mediano y el rango de años en que se usó,",
             "lo que permite separar los temas emergentes de los que están en declive.",
             "Es la base para argumentar hacia dónde se mueve el campo y qué vocabulario",
             "ha quedado obsoleto.")),

      list(n = "12", archivo = "fig12_author_production", campo = "AU",
           titulo = "Producción de autores en el tiempo",
           params = "los 15 autores más productivos; el tamaño del punto es la producción de ese año",
           objetivo = paste(
             "Muestra la trayectoria de los autores clave y, sobre todo, si siguen activos.",
             "Un autor muy citado que dejó de publicar hace diez años no pesa lo mismo",
             "que uno que publica ahora."))
    )
  ),

  list(
    bloque = "Fuentes y leyes bibliométricas",
    figuras = list(
      list(n = "7", archivo = "fig07_lotka_law", campo = "AU",
           titulo = "Ley de Lotka — Productividad de autores",
           params = "autores con 10 artículos o menos; se anotan los parámetros beta y C del ajuste",
           objetivo = paste(
             "Contrasta si el corpus cumple la ley de Lotka: muchos autores con un solo",
             "artículo y muy pocos con muchos. Mide la concentración de la autoría; un beta",
             "cercano a 2 indica un campo con dinámica normal, y una desviación grande",
             "sugiere un campo fragmentado o dominado por unos pocos grupos.")),

      list(n = "8a", archivo = "fig08a_bradford_journals", campo = "SO",
           titulo = "Ley de Bradford — Revistas núcleo",
           params = "las 30 revistas principales, coloreadas por zona (cada zona reúne un tercio de los artículos)",
           objetivo = paste(
             "Identifica el núcleo de revistas del tema. Sirve para dos cosas en el artículo:",
             "decir dónde se publica esta literatura y decidir dónde enviar tu propio trabajo.")),

      list(n = "8b", archivo = "fig08b_bradford_curve", campo = "SO",
           titulo = "Ley de Bradford — Producción acumulada",
           params = "porcentaje acumulado frente al logaritmo del rango, con las dos líneas de corte",
           objetivo = paste(
             "Es la comprobación visual clásica: si la curva tiene la forma esperada hay un",
             "núcleo real de revistas; si sale casi recta, la literatura está dispersa y",
             "conviene revisar si la búsqueda fue exhaustiva."))
    )
  ),

  list(
    bloque = "Geografía y colaboración",
    figuras = list(
      list(n = "2", archivo = "fig02_world_map", campo = "C1 (país del autor de correspondencia)",
           titulo = "Producción científica global por país",
           params = "escala de raíz cuadrada, para que un país dominante no aplaste al resto",
           objetivo = paste(
             "Muestra dónde se produce el conocimiento y evidencia el sesgo geográfico del",
             "campo. Los países cuyo nombre no case con el mapa se avisan en el registro",
             "del proceso, nunca se pintan en gris en silencio.")),

      list(n = "5", archivo = "fig05_coauthorship_authors", campo = "AU",
           titulo = "Red de colaboración entre autores",
           params = "25 autores; el tamaño del nodo es su conexión y el color agrupa comunidades",
           objetivo = paste(
             "Revela los colegios invisibles: qué grupos de investigación existen y si",
             "trabajan aislados unos de otros.")),

      list(n = "6", archivo = "fig06_coauthorship_institutions", campo = "C1",
           titulo = "Red de colaboración entre instituciones",
           params = "20 instituciones",
           objetivo = paste(
             "Lo mismo a nivel de universidades y centros: quién lidera el tema y con quién",
             "colabora. Útil para identificar socios o dónde buscar financiación.")),

      list(n = "11", archivo = "fig11_country_collaboration", campo = "C1 / AU_CO",
           titulo = "Red de colaboración internacional",
           params = "20 países, disposición circular",
           objetivo = paste(
             "Mide si la investigación es cooperativa o nacional. Necesita artículos firmados",
             "desde dos países o más: si cada registro trae un solo país, la app lo explica",
             "en el registro en vez de dibujar una red vacía."))
    )
  ),

  list(
    bloque = "Estructura conceptual",
    figuras = list(
      list(n = "3", archivo = "fig03_wordcloud", campo = "DE",
           titulo = "Frecuencia de palabras clave",
           params = "80 términos, mínimo 2 apariciones",
           objetivo = paste(
             "Un vistazo rápido al vocabulario dominante. Con franqueza, es la figura más",
             "débil del conjunto: no codifica magnitudes comparables. Vale para una",
             "presentación o el anexo, no como figura numerada de un artículo.")),

      list(n = "9", archivo = "fig09_thematic_map", campo = "DE",
           titulo = "Mapa temático",
           params = "250 términos, mínimo 3 apariciones; ejes de centralidad y densidad",
           objetivo = paste(
             "Sitúa los temas en cuatro cuadrantes —motores, nicho, básicos y emergentes o",
             "en declive—. Es la figura más importante para la discusión: un tema básico y",
             "poco desarrollado es exactamente el hueco que justifica una investigación.")),

      list(n = "10", archivo = "fig10_keyword_cooccurrence", campo = "DE",
           titulo = "Red de co-ocurrencia de palabras clave",
           params = "30 términos; los colores son los clústeres temáticos",
           objetivo = paste(
             "Muestra la estructura conceptual del campo: qué conceptos se investigan siempre",
             "juntos y cuáles no se han cruzado nunca. Los pares que faltan también son un",
             "hallazgo.")),

      list(n = "13", archivo = "fig13_sankey.html", campo = "AU_CO, AU, DE",
           titulo = "Diagrama Sankey de tres campos",
           params = "15 elementos por columna; se entrega como HTML interactivo",
           objetivo = paste(
             "Conecta de un vistazo quién investiga qué y desde dónde. Al ser interactivo es",
             "excelente para explorar y para una defensa oral, pero como figura estática de",
             "artículo resulta difícil de leer."))
    )
  )
)

# Convierte GUIA_FIGURAS en un bloque desplegable. Se usa <details>/<summary>,
# que es HTML nativo: no depende de la version de Bootstrap que acabe
# resolviendo bs_theme() ni anade JavaScript.
guia_figuras_ui <- function() {
  bloques <- lapply(GUIA_FIGURAS, function(b) {
    entradas <- lapply(b$figuras, function(f) {
      div(class = "guia-fig",
          div(class = "guia-fig-cab",
              tags$strong(sprintf("Figura %s. %s", f$n, f$titulo))),
          div(class = "guia-fig-meta",
              tags$code(f$archivo), " · campo ", tags$code(f$campo),
              " · ", f$params),
          div(class = "guia-fig-obj", f$objetivo))
    })
    div(class = "guia-bloque", h4(class = "guia-bloque-tit", b$bloque), entradas)
  })

  tags$details(
    class = "guia-figuras",
    tags$summary("¿Qué muestra cada figura y para qué sirve?"),
    div(class = "guia-cuerpo",
        p(class = "guia-intro",
          "13 figuras numeradas (14 archivos: la 8 va en dos paneles y la 13 es un ",
          "HTML interactivo). Entre paréntesis, el campo del corpus del que depende ",
          "cada una: si ese campo llega vacío desde WoS o Scopus, la figura no se ",
          "puede generar y el registro del proceso lo indica."),
        bloques,
        p(class = "guia-cierre",
          tags$strong("Si tuvieras que elegir solo cinco para un artículo"),
          " (lo habitual son 4–6): la 1 para el crecimiento, la 8a para las revistas ",
          "núcleo, la 2 o la 11 para la geografía, la 10 para la estructura conceptual ",
          "y la 9 para la discusión. El resto va a material suplementario."))
  )
}

# =============================================================================
# UI
# =============================================================================

# La lista en Excel solo se ofrece si openxlsx esta disponible: mas vale no
# mostrar la opcion que mostrarla y que falle al pulsar Descargar.
formato_choices <- c("WoS plaintext (.txt)" = "txt",
                     "RIS (.ris)"           = "ris",
                     "BibTeX (.bib)"        = "bib")
if (EXCEL_OK) formato_choices <- c(formato_choices, "Lista Excel (.xlsx)" = "xlsx")

ui <- tagList(
  useShinyjs(),
  tags$head(
    tags$title("Trabajo Científico — Análisis Bibliométrico"),
    tags$style(HTML("
      body { font-family: 'Inter', -apple-system, sans-serif; }
      .navbar-default { background-color: #2C3E6B !important; border: none; }
      .navbar-default .navbar-brand { color: white !important; font-weight: bold; font-size: 20px; }
      .navbar-default .navbar-nav > li > a { color: white !important; }
      .navbar-default .navbar-nav > .active > a {
        background-color: #1a2548 !important; color: white !important;
      }
      .well { background-color: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; }
      .btn-primary { background-color: #2C3E6B; border-color: #2C3E6B; }
      .btn-primary:hover { background-color: #1a2548; border-color: #1a2548; }
      .btn-success { background-color: #27AE60; border-color: #27AE60; }
      .btn-success:hover { background-color: #1e8449; border-color: #1e8449; }
      .stat-box {
        background: white; padding: 15px; border-left: 4px solid #2C3E6B;
        border-radius: 4px; margin-bottom: 10px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      }
      .stat-label { font-size: 12px; color: #777; text-transform: uppercase; font-weight: 600; }
      .stat-value { font-size: 28px; font-weight: bold; color: #2C3E6B; }
      .section-title {
        color: #2C3E6B; font-weight: bold; margin-top: 20px;
        border-bottom: 2px solid #2C3E6B; padding-bottom: 8px;
      }
      .progress-bar { background-color: #2C3E6B !important; }
      #consolidar_btn, #analizar_btn { font-size: 16px; padding: 12px 30px; }

      /* Guia de figuras (pestaña 2) */
      .guia-figuras {
        border: 1px solid #e5e7eb; border-radius: 8px; background: #f8f9fa;
        padding: 10px 16px; margin-bottom: 18px;
      }
      .guia-figuras > summary {
        cursor: pointer; font-weight: 600; color: #2C3E6B; font-size: 15px;
        list-style-position: outside; padding: 2px 0;
      }
      .guia-figuras > summary:hover { color: #1a2548; }
      .guia-cuerpo { padding-top: 10px; }
      .guia-intro, .guia-cierre { font-size: 13px; color: #555; margin-bottom: 14px; }
      .guia-cierre { margin-top: 6px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
      .guia-bloque-tit {
        color: #2C3E6B; font-size: 14px; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.4px;
        margin: 16px 0 8px; padding-bottom: 4px; border-bottom: 1px solid #d9dee5;
      }
      .guia-fig { margin: 0 0 12px 4px; }
      .guia-fig-cab { color: #2C3E6B; font-size: 14px; }
      .guia-fig-meta { font-size: 12px; color: #777; margin: 2px 0 3px; }
      .guia-fig-meta code {
        background: #eef1f6; color: #2C3E6B; padding: 1px 5px;
        border-radius: 3px; font-size: 11px;
      }
      .guia-fig-obj { font-size: 13px; color: #444; line-height: 1.5; }
    "))
  ),

  navbarPage(
    title = "Trabajo Científico · Bibliometría",
    id = "main_tabs",
    theme = bslib::bs_theme(bootswatch = "flatly"),

    # --- PESTAÑA 1: CARGAR + CONSOLIDAR + FILTRAR + EXPORTAR -------------------
    tabPanel("1. Preparar Corpus", value = "tab_consolidar",
      fluidRow(
        column(4,
          wellPanel(
            h3(class = "section-title", "Modo de operación"),

            radioButtons("modo_uso", NULL,
                         choices = c(
                           "Solo WoS"        = "solo_wos",
                           "Solo Scopus"     = "solo_scopus",
                           "WoS + Scopus (consolidar)" = "ambos"
                         ),
                         selected = "ambos"),

            helpText(
              tags$strong("Solo WoS:"),  " parsea el archivo WoS y aplica filtros.", tags$br(),
              tags$strong("Solo Scopus:"), " convierte Scopus al formato WoS y aplica filtros.", tags$br(),
              tags$strong("WoS + Scopus:"), " consolida ambas bases eliminando duplicados."
            ),

            hr(),
            h3(class = "section-title", "Archivos de entrada"),

            conditionalPanel(
              "input.modo_uso == 'solo_wos' || input.modo_uso == 'ambos'",
              fileInput("wos_file", "Archivo WoS (.txt)",
                        accept = c(".txt"), buttonLabel = "Seleccionar...",
                        placeholder = "Ningún archivo")
            ),

            conditionalPanel(
              "input.modo_uso == 'solo_scopus' || input.modo_uso == 'ambos'",
              fileInput("scopus_file", "Archivo Scopus (.txt)",
                        accept = c(".txt"), buttonLabel = "Seleccionar...",
                        placeholder = "Ningún archivo")
            ),

            conditionalPanel(
              "input.modo_uso == 'ambos'",
              hr(),
              h3(class = "section-title", "Parámetros de consolidación"),

              sliderInput("sim_threshold",
                          "Umbral similitud de título:",
                          min = 0.70, max = 1.00, value = 0.85, step = 0.05),
              helpText("Registros con títulos más similares que este umbral",
                       "se consideran duplicados."),

              radioButtons("priority", "Prioridad en duplicados:",
                           choices = c("Conservar WoS" = "wos",
                                       "Conservar Scopus" = "scopus"),
                           selected = "wos")
            ),

            hr(),
            actionButton("consolidar_btn", "Procesar",
                         class = "btn-primary btn-block",
                         icon = icon("cogs")),

            # --- FILTROS (aparecen después de consolidar) --------------------
            conditionalPanel(
              "output.consolidar_ready",
              hr(),
              h3(class = "section-title", "Filtros metodológicos"),
              helpText("Los filtros se aplican al conjunto consolidado ANTES de escribir el archivo .txt. ",
                       "Esto garantiza consistencia entre el archivo exportado y las figuras del paso 2."),

              checkboxGroupInput("filtro_dt", "Tipo de documento:",
                                 choices = NULL, selected = NULL),
              checkboxGroupInput("filtro_la", "Idioma:",
                                 choices = NULL, selected = NULL),
              checkboxInput("filtro_oa", "Solo Open Access", value = FALSE),
              uiOutput("filtro_py_ui")
            )
          )
        ),

        column(8,
          # Panel inicial cuando no se ha procesado nada
          conditionalPanel(
            "!output.consolidar_ready",
            div(style = "text-align: center; padding: 60px 20px; color: #999;",
                icon("upload", class = "fa-4x"),
                uiOutput("upload_message"))
          ),

          # Panel principal - aparece después de procesar
          conditionalPanel(
            "output.consolidar_ready",

            h3(class = "section-title", textOutput("summary_title", inline = TRUE)),

            fluidRow(
              conditionalPanel(
                "input.modo_uso == 'solo_wos' || input.modo_uso == 'ambos'",
                column(3, div(class = "stat-box",
                              div(class = "stat-label", "Registros WoS"),
                              div(class = "stat-value", textOutput("stat_wos", inline = TRUE))))
              ),
              conditionalPanel(
                "input.modo_uso == 'solo_scopus' || input.modo_uso == 'ambos'",
                column(3, div(class = "stat-box",
                              div(class = "stat-label", "Registros Scopus"),
                              div(class = "stat-value", textOutput("stat_scopus", inline = TRUE))))
              ),
              conditionalPanel(
                "input.modo_uso == 'ambos'",
                column(3, div(class = "stat-box",
                              div(class = "stat-label", "Duplicados eliminados"),
                              div(class = "stat-value", textOutput("stat_dup", inline = TRUE))))
              ),
              column(3, div(class = "stat-box",
                            div(class = "stat-label", "Total"),
                            div(class = "stat-value", textOutput("stat_total", inline = TRUE))))
            ),

            # --- CONTADOR EN VIVO TRAS FILTROS ------------------------------
            h3(class = "section-title", "Tras aplicar filtros"),

            fluidRow(
              column(3, div(class = "stat-box", style = "border-left-color: #27AE60;",
                            div(class = "stat-label", "Registros finales"),
                            div(class = "stat-value", textOutput("stat_filtered_n", inline = TRUE)))),
              column(3, div(class = "stat-box", style = "border-left-color: #27AE60;",
                            div(class = "stat-label", "Período"),
                            div(class = "stat-value", textOutput("stat_filtered_period", inline = TRUE)))),
              column(3, div(class = "stat-box", style = "border-left-color: #27AE60;",
                            div(class = "stat-label", "Autores únicos"),
                            div(class = "stat-value", textOutput("stat_filtered_au", inline = TRUE)))),
              column(3, div(class = "stat-box", style = "border-left-color: #27AE60;",
                            div(class = "stat-label", "Revistas"),
                            div(class = "stat-value", textOutput("stat_filtered_so", inline = TRUE))))
            ),

            helpText(textOutput("filter_summary_text")),

            # --- TABS INFERIORES: duplicados / vista previa ------------------
            tabsetPanel(
              id = "bottom_tabs",
              tabPanel("Vista previa del filtrado",
                       br(),
                       DT::dataTableOutput("preview_filtered_table"))
              # La tab "Duplicados detectados" solo aparece en modo 'ambos'
              # - se inserta dinámicamente desde el server con insertTab()
            ),

            br(),
            fluidRow(
              column(6,
                radioButtons("formato_export", "Formato de exportación:",
                             choices = formato_choices,
                             selected = "txt", inline = TRUE),
                helpText(HTML(
                  "<b>.txt</b> — VOSviewer, bibliometrix, CiteSpace. Formato recomendado:
                   es el corpus completo, con las referencias citadas (CR).<br>
                   <b>.ris</b> — VOSviewer, Zotero, Mendeley, EndNote. El formato RIS no
                   tiene campo para referencias citadas, así que no permite co-citación
                   ni acoplamiento bibliográfico.<br>
                   <b>.bib</b> — bibliometrix/biblioshiny, Zotero, LaTeX. Sí conserva las
                   referencias citadas, pero VOSviewer no lee BibTeX.")),
                if (EXCEL_OK) helpText(HTML(
                  "<b>.xlsx</b> — la lista para leer y cribar en Excel: una fila por
                   artículo con título, DOI (celda vacía si el registro no lo trae),
                   enlace clicable, autores, año, revista, idioma, palabras clave y
                   resumen. Respeta los filtros aplicados. No es un formato
                   bibliográfico: no lo leen VOSviewer ni bibliometrix.")),
                downloadButton("download_consolidado", "Descargar corpus consolidado",
                               class = "btn-success btn-block")),
              column(6,
                actionButton("ir_a_analizar", "Continuar a Análisis →",
                             class = "btn-primary btn-block",
                             icon = icon("chart-bar")))
            )
          )
        )
      )
    ),

    # --- PESTAÑA 2: GENERAR FIGURAS (sin filtros) ------------------------------
    tabPanel("2. Análisis Bibliométrico", value = "tab_analizar",
      fluidRow(
        column(4,
          wellPanel(
            h3(class = "section-title", "Archivo consolidado"),

            radioButtons("origen_consolidado",
                         "Fuente del archivo:",
                         choices = c("Usar el archivo del paso 1" = "paso1",
                                     "Subir un archivo ya existente" = "subir"),
                         selected = "paso1"),

            conditionalPanel(
              "input.origen_consolidado == 'subir'",
              fileInput("consolidado_file", "Archivo .txt (formato WoS plaintext)",
                        accept = c(".txt"))
            ),

            hr(),
            helpText("Los filtros se aplican en el paso 1. ",
                     "Aquí solo se generan las 13 figuras sobre el conjunto ",
                     "ya procesado y filtrado."),

            hr(),
            h3(class = "section-title", "Idioma de las figuras"),

            radioButtons("idioma_figuras", NULL,
                         choices = c("Español" = "es", "English" = "en"),
                         selected = "es", inline = TRUE),
            helpText("Afecta a los títulos, subtítulos, ejes, leyendas y notas al pie ",
                     "que aparecen dentro de las 13 figuras. Los nombres de los ",
                     "archivos PNG no cambian."),

            hr(),
            h3(class = "section-title", "Preparación para publicación"),

            checkboxInput("modo_pub",
                          "Figuras listas para enviar a una revista",
                          value = FALSE),
            helpText(HTML(
              "Dibuja cada figura a <b>183 mm</b> —el ancho de página completo de la
               mayoría de revistas—, con la tipografía a un tamaño que siga siendo
               legible tras la reducción, y saca el título y la fuente fuera de la
               imagen (la revista compone el pie). Los textos no se pierden: van a
               'pies_de_figura.txt' dentro del ZIP, listos para pegar.")),
            helpText(HTML(
              "De cada figura obtienes <b>un PDF y un PNG a 300 dpi</b>. El PDF es
               vectorial —no pierde calidad a ningún tamaño y es el que piden
               Elsevier, Springer y Wiley— y es el que se envía a la revista; el PNG
               es la copia cómoda para Word y presentaciones.")),

            checkboxInput("excluir_anio",
                          "Excluir el año en curso (incompleto)",
                          value = TRUE),
            helpText("El último año de una búsqueda siempre está a medias: la caída ",
                     "final de la figura 1 es un artefacto de la fecha de descarga, ",
                     "no una tendencia. Al excluirlo, tampoco entra en el suavizado."),

            hr(),
            checkboxInput("sankey_png",
                          "Intentar también el Sankey en PNG (requiere Chrome)",
                          value = FALSE),
            helpText("La figura 13 se entrega siempre como HTML interactivo. ",
                     "El PNG es opcional: se calcula en un proceso aparte con ",
                     "límite de tiempo, así que si Chrome falla el análisis ",
                     "continúa igual."),

            hr(),
            actionButton("analizar_btn", "Generar análisis (13 figuras)",
                         class = "btn-primary btn-block",
                         icon = icon("chart-line")),

            br(),
            actionButton("diag_btn", "Verificar mi instalación",
                         class = "btn-default btn-block",
                         icon = icon("stethoscope")),
            helpText("Si el análisis falla o se queda colgado, pulsa aquí y ",
                     "envía el texto que aparece a la derecha.")
          )
        ),

        column(8,
          # Fuera de los conditionalPanel a proposito: se ve al entrar en la
          # pestana, sigue accesible despues de generar y, plegada, ocupa una linea
          guia_figuras_ui(),

          conditionalPanel(
            "!output.analizar_ready",
            div(style = "text-align: center; padding: 60px 20px; color: #999;",
                icon("chart-bar", class = "fa-4x"),
                h3("Click en 'Generar análisis' para producir las 13 figuras",
                   style = "margin-top: 20px;"),
                p("Se generarán 13 figuras bibliométricas en PNG",
                  style = "margin-top: 15px;"))
          ),

          conditionalPanel(
            "output.preview_ready",

            h3(class = "section-title", "Vista previa del dataset"),

            fluidRow(
              column(3, div(class = "stat-box",
                            div(class = "stat-label", "Registros"),
                            div(class = "stat-value", textOutput("prev_n", inline = TRUE)))),
              column(3, div(class = "stat-box",
                            div(class = "stat-label", "Período"),
                            div(class = "stat-value", textOutput("prev_period", inline = TRUE)))),
              column(3, div(class = "stat-box",
                            div(class = "stat-label", "Autores únicos"),
                            div(class = "stat-value", textOutput("prev_autores", inline = TRUE)))),
              column(3, div(class = "stat-box",
                            div(class = "stat-label", "Revistas"),
                            div(class = "stat-value", textOutput("prev_so", inline = TRUE))))
            ),

            DT::dataTableOutput("preview_table")
          ),

          # El log vive FUERA de analizar_ready: antes solo aparecia si el
          # proceso terminaba entero, asi que un fallo a mitad no dejaba ni una
          # pista en pantalla. Ahora se ve en cuanto hay algo que contar.
          conditionalPanel(
            "output.hay_log",
            h3(class = "section-title", "Registro del proceso"),
            verbatimTextOutput("log_analisis")
          ),

          conditionalPanel(
            "output.analizar_ready",
            br(),
            h4(textOutput("resumen_figuras", inline = TRUE),
               style = "color:#2C3E6B; font-weight:bold;"),
            downloadButton("download_zip", "Descargar ZIP con las figuras generadas",
                           class = "btn-success btn-block",
                           style = "font-size: 16px; padding: 14px;")
          )
        )
      )
    )
  ),

  # Pie discreto, comun a las dos pestanas
  tags$footer(
    style = "text-align:center; padding:18px 0 26px; color:#9aa0a6;
             font-size:12px; letter-spacing:0.3px;",
    HTML("Trabajo Científico · Bibliometría &nbsp;—&nbsp;
          Desarrollado por <strong style='color:#7c8794;'>Oscar Ivan Vargas Pineda</strong>")
  )
)

# =============================================================================
# SERVER
# =============================================================================

server <- function(input, output, session) {

  # Directorio temporal de trabajo (persiste durante la sesión)
  tmp_dir <- tempfile("bibapp_")
  dir.create(tmp_dir, recursive = TRUE, showWarnings = FALSE)
  fig_dir <- file.path(tmp_dir, "figuras")
  dir.create(fig_dir, recursive = TRUE, showWarnings = FALSE)

  # Cuenta figuras reales: sin pandoc, el Sankey deja una carpeta de librerias
  # junto al HTML que no debe contarse como una figura mas
  n_figuras <- function() {
    f <- list.files(fig_dir, full.names = TRUE)
    f <- f[basename(f) != "pies_de_figura.txt"]   # es texto, no una figura
    sum(!dir.exists(f))
  }

  # Estado reactivo
  consolidar_result <- reactiveVal(NULL)
  consolidado_path  <- reactiveVal(NULL)
  M_data            <- reactiveVal(NULL)
  analizar_done     <- reactiveVal(FALSE)
  log_text          <- reactiveVal("")
  # Idioma con el que se generaron realmente las figuras que hay en fig_dir.
  # No se lee input$idioma_figuras al descargar: si el usuario mueve el radio
  # despues de generar, el nombre del ZIP mentiria sobre su contenido.
  fig_lang          <- reactiveVal("es")
  # Igual que fig_lang: refleja si las figuras que hay en disco se generaron en
  # modo publicacion, para que el nombre del ZIP no mienta si el usuario mueve
  # la casilla despues de generarlas.
  fig_pub           <- reactiveVal(FALSE)

  # --- Pestaña 1: Procesar (soporta los 3 modos) ---------------------------
  observeEvent(input$consolidar_btn, {
    modo <- input$modo_uso

    # Validaciones según modo
    if (modo == "solo_wos") {
      req(input$wos_file)
    } else if (modo == "solo_scopus") {
      req(input$scopus_file)
    } else {
      req(input$wos_file, input$scopus_file)
    }

    withProgress(message = "Procesando archivos...", value = 0, {

      wos_records <- list()
      scopus_records <- list()

      # --- Parsear WoS si aplica ----------------------------------------------
      if (modo %in% c("solo_wos", "ambos")) {
        setProgress(value = 0.05, detail = "Leyendo archivo WoS...")
        wos_records <- parse_wos_records(input$wos_file$datapath)
      }

      # --- Parsear + convertir Scopus si aplica -------------------------------
      if (modo %in% c("solo_scopus", "ambos")) {
        setProgress(value = 0.25, detail = "Convirtiendo Scopus a formato WoS...")
        scopus_wos_path <- file.path(tmp_dir, "scopus_formato_wos.txt")
        convert_scopus_to_wos_file(
          input$scopus_file$datapath, scopus_wos_path,
          progress_callback = function(p, msg) {
            setProgress(value = 0.25 + p * 0.25, detail = msg)
          }
        )
        setProgress(value = 0.55, detail = "Leyendo Scopus convertido...")
        scopus_records <- parse_wos_records(scopus_wos_path)
      }

      # --- Construir el resultado según modo ----------------------------------
      if (modo == "solo_wos") {
        # Sin consolidación: usamos los registros WoS tal cual
        result <- list(
          merged = wos_records,
          duplicates = list(),
          stats = list(
            wos_total = length(wos_records),
            scopus_total = 0L,
            duplicates_doi = 0L,
            duplicates_title = 0L,
            added_from_scopus = 0L,
            merged_total = length(wos_records),
            priority = NA,
            modo = modo
          )
        )
      } else if (modo == "solo_scopus") {
        # Sin consolidación: usamos los registros Scopus ya convertidos
        result <- list(
          merged = scopus_records,
          duplicates = list(),
          stats = list(
            wos_total = 0L,
            scopus_total = length(scopus_records),
            duplicates_doi = 0L,
            duplicates_title = 0L,
            added_from_scopus = length(scopus_records),
            merged_total = length(scopus_records),
            priority = NA,
            modo = modo
          )
        )
      } else {
        # Modo "ambos": consolidación con desduplicación
        setProgress(value = 0.60, detail = "Detectando duplicados...")
        result <- merge_records(
          wos_records, scopus_records,
          threshold = input$sim_threshold, priority = input$priority,
          progress_callback = function(p, msg) {
            setProgress(value = 0.60 + p * 0.30, detail = msg)
          }
        )
        result$stats$modo <- modo
      }

      # NO escribimos el .txt todavía - se hace al descargar, con filtros aplicados.
      consolidar_result(result)

      setProgress(value = 1.0, detail = "¡Listo!")
    })

    # Notificación adaptada al modo
    msg_modo <- switch(modo,
      "solo_wos"    = sprintf("Archivo WoS procesado: %d registros. Aplica filtros y descarga el .txt.", result$stats$merged_total),
      "solo_scopus" = sprintf("Archivo Scopus convertido: %d registros. Aplica filtros y descarga el .txt.", result$stats$merged_total),
      "ambos"       = sprintf("Consolidación completa: %d registros únicos. Aplica filtros y descarga el .txt.", result$stats$merged_total)
    )
    showNotification(msg_modo, type = "message", duration = 6)
  })

  # Mensaje de carga inicial dinámico según modo seleccionado
  output$upload_message <- renderUI({
    modo <- input$modo_uso
    if (is.null(modo)) modo <- "ambos"
    msg <- switch(modo,
      "solo_wos"    = list(
        h3("Sube tu archivo WoS y haz click en Procesar", style = "margin-top: 20px;"),
        p("El aplicativo parseará los registros y te dejará aplicar filtros antes de exportar.", style = "margin-top: 15px;")
      ),
      "solo_scopus" = list(
        h3("Sube tu archivo Scopus y haz click en Procesar", style = "margin-top: 20px;"),
        p("El aplicativo convertirá los registros al formato WoS plaintext y te dejará aplicar filtros antes de exportar.", style = "margin-top: 15px;")
      ),
      "ambos"       = list(
        h3("Sube los dos archivos y haz click en Procesar", style = "margin-top: 20px;"),
        p("El aplicativo detectará duplicados por DOI y similitud de título, luego aplicarás filtros y descargarás el consolidado.", style = "margin-top: 15px;")
      )
    )
    tagList(msg)
  })

  # Título del resumen adaptado al modo
  output$summary_title <- renderText({
    modo <- input$modo_uso
    if (is.null(modo)) return("Resumen")
    switch(modo,
      "solo_wos"    = "Resumen del corpus WoS",
      "solo_scopus" = "Resumen del corpus Scopus",
      "ambos"       = "Resumen de consolidación"
    )
  })

  output$consolidar_ready <- reactive(!is.null(consolidar_result()))
  outputOptions(output, "consolidar_ready", suspendWhenHidden = FALSE)

  output$stat_wos    <- renderText(consolidar_result()$stats$wos_total)
  output$stat_scopus <- renderText(consolidar_result()$stats$scopus_total)
  output$stat_dup    <- renderText({
    s <- consolidar_result()$stats
    s$duplicates_doi + s$duplicates_title
  })
  output$stat_total  <- renderText(consolidar_result()$stats$merged_total)

  # --- Tabla de duplicados (sobre todo el consolidado, sin filtros) ---------
  # Se renderiza solo si hay duplicados reales (modo "ambos")
  output$dup_table <- DT::renderDataTable({
    req(consolidar_result())
    dups <- consolidar_result()$duplicates
    if (length(dups) == 0) {
      return(data.frame(Mensaje = "No se detectaron duplicados"))
    }
    df <- do.call(rbind, lapply(seq_along(dups), function(i) {
      d <- dups[[i]]
      data.frame(
        `#` = i,
        Match = d$match_type,
        Similitud = sprintf("%.2f%%", d$score * 100),
        DOI = ifelse(!is.null(d$wos[["DI"]]), d$wos[["DI"]],
                     ifelse(!is.null(d$scopus[["DI"]]), d$scopus[["DI"]], "-")),
        `Título WoS`    = substr(gsub("\\s+", " ", ifelse(is.null(d$wos[["TI"]]), "-", d$wos[["TI"]])), 1, 80),
        `Título Scopus` = substr(gsub("\\s+", " ", ifelse(is.null(d$scopus[["TI"]]), "-", d$scopus[["TI"]])), 1, 80),
        check.names = FALSE, stringsAsFactors = FALSE
      )
    }))
    DT::datatable(df, options = list(pageLength = 10, scrollX = TRUE),
                  rownames = FALSE, class = "stripe hover compact")
  })

  # --- Gestión dinámica de la tab "Duplicados" ------------------------------
  # Solo aparece cuando hay datos procesados EN MODO "ambos".
  # En modos "solo_wos" o "solo_scopus" la tab se retira porque no tiene sentido.
  dup_tab_inserted <- reactiveVal(FALSE)

  observe({
    res <- consolidar_result()
    modo <- input$modo_uso
    if (is.null(modo)) return()

    if (!is.null(res) && modo == "ambos" && !dup_tab_inserted()) {
      insertTab(
        inputId = "bottom_tabs",
        tabPanel("Duplicados detectados",
                 br(),
                 helpText("La tabla muestra todos los duplicados detectados al consolidar, ",
                          "sin tener en cuenta los filtros aplicados posteriormente."),
                 DT::dataTableOutput("dup_table")),
        target = "Vista previa del filtrado",
        position = "after"
      )
      dup_tab_inserted(TRUE)
    } else if ((modo != "ambos" || is.null(res)) && dup_tab_inserted()) {
      removeTab(inputId = "bottom_tabs", target = "Duplicados detectados")
      dup_tab_inserted(FALSE)
    }
  })

  # Reset de la app cuando el usuario cambia el modo tras haber procesado algo
  observeEvent(input$modo_uso, {
    if (!is.null(consolidar_result())) {
      consolidar_result(NULL)
      showNotification("Modo cambiado. Vuelve a subir los archivos y presiona Procesar.",
                       type = "warning", duration = 5)
    }
  }, ignoreInit = TRUE)

  # ==========================================================================
  # FILTROS EN LA PESTAÑA 1 (aplicados a los registros consolidados)
  # ==========================================================================

  # Nota: extract_field() (primer valor de una etiqueta WoS del registro) está
  # definida a nivel global, junto a los exportadores RIS/BibTeX que la comparten.

  # Opciones dinámicas para checkboxes a partir de los registros consolidados
  observe({
    res <- consolidar_result()
    req(res)
    merged <- res$merged

    dt_values <- sapply(merged, extract_field, tag = "DT")
    dt_options <- sort(unique(dt_values[!is.na(dt_values) & dt_values != ""]))
    updateCheckboxGroupInput(session, "filtro_dt",
                             choices = dt_options, selected = dt_options)

    la_values <- sapply(merged, extract_field, tag = "LA")
    la_options <- sort(unique(la_values[!is.na(la_values) & la_values != ""]))
    updateCheckboxGroupInput(session, "filtro_la",
                             choices = la_options, selected = la_options)

    py_values <- suppressWarnings(as.integer(sapply(merged, extract_field, tag = "PY")))
    py_valid  <- py_values[!is.na(py_values) & py_values > 1900 & py_values < 2100]
    if (length(py_valid) > 0) {
      min_y <- min(py_valid); max_y <- max(py_valid)
      output$filtro_py_ui <- renderUI({
        sliderInput("filtro_py", "Rango de años:",
                    min = min_y, max = max_y, value = c(min_y, max_y),
                    step = 1, sep = "")
      })
    }
  })

  # Registros filtrados (reactivo) - mantiene la estructura de lista de registros
  filtered_records <- reactive({
    res <- consolidar_result()
    req(res)
    merged <- res$merged

    keep <- rep(TRUE, length(merged))

    # Filtro por tipo de documento
    if (!is.null(input$filtro_dt) && length(input$filtro_dt) > 0) {
      dt_values <- sapply(merged, extract_field, tag = "DT")
      keep <- keep & (dt_values %in% input$filtro_dt)
    }

    # Filtro por idioma
    if (!is.null(input$filtro_la) && length(input$filtro_la) > 0) {
      la_values <- sapply(merged, extract_field, tag = "LA")
      keep <- keep & (la_values %in% input$filtro_la)
    }

    # Filtro por Open Access
    if (isTRUE(input$filtro_oa)) {
      oa_values <- sapply(merged, extract_field, tag = "OA")
      keep <- keep & (!is.na(oa_values) & oa_values != "")
    }

    # Filtro por rango de años
    if (!is.null(input$filtro_py)) {
      py_values <- suppressWarnings(as.integer(sapply(merged, extract_field, tag = "PY")))
      keep <- keep & !is.na(py_values) &
              py_values >= input$filtro_py[1] &
              py_values <= input$filtro_py[2]
    }

    merged[keep]
  })

  # Estadísticas del conjunto filtrado
  output$stat_filtered_n <- renderText({
    fr <- filtered_records()
    if (is.null(fr)) return("-")
    format(length(fr), big.mark = ".", decimal.mark = ",")
  })

  output$stat_filtered_period <- renderText({
    fr <- filtered_records()
    if (is.null(fr) || length(fr) == 0) return("-")
    py <- suppressWarnings(as.integer(sapply(fr, extract_field, tag = "PY")))
    py <- py[!is.na(py) & py > 1900 & py < 2100]
    if (length(py) == 0) return("-")
    sprintf("%d–%d", min(py), max(py))
  })

  output$stat_filtered_au <- renderText({
    fr <- filtered_records()
    if (is.null(fr) || length(fr) == 0) return("-")
    au_all <- unlist(lapply(fr, function(r) {
      if (is.null(r[["AU"]])) return(character(0))
      trimws(strsplit(r[["AU"]], "\n")[[1]])
    }))
    format(length(unique(au_all)), big.mark = ".", decimal.mark = ",")
  })

  output$stat_filtered_so <- renderText({
    fr <- filtered_records()
    if (is.null(fr) || length(fr) == 0) return("-")
    so_all <- sapply(fr, extract_field, tag = "SO")
    so_all <- so_all[!is.na(so_all) & so_all != ""]
    format(length(unique(so_all)), big.mark = ".", decimal.mark = ",")
  })

  output$filter_summary_text <- renderText({
    res <- consolidar_result()
    fr <- filtered_records()
    if (is.null(res) || is.null(fr)) return("")
    total <- length(res$merged)
    filt <- length(fr)
    excl <- total - filt
    if (excl == 0) {
      "Sin filtros aplicados: el archivo descargado contendrá los registros consolidados completos."
    } else {
      sprintf("Se excluirán %d de %d registros al aplicar los filtros (quedan %d = %.1f%%).",
              excl, total, filt, 100 * filt / total)
    }
  })

  # Vista previa del conjunto filtrado (tabla)
  output$preview_filtered_table <- DT::renderDataTable({
    fr <- filtered_records()
    req(fr, length(fr) > 0)
    df <- data.frame(
      `#` = seq_along(fr),
      AU  = sapply(fr, function(r) substr(extract_field(r, "AU"), 1, 40)),
      TI  = sapply(fr, function(r) substr(extract_field(r, "TI"), 1, 80)),
      SO  = sapply(fr, function(r) substr(extract_field(r, "SO"), 1, 50)),
      PY  = sapply(fr, extract_field, tag = "PY"),
      DT  = sapply(fr, extract_field, tag = "DT"),
      LA  = sapply(fr, extract_field, tag = "LA"),
      DI  = sapply(fr, extract_field, tag = "DI"),
      check.names = FALSE, stringsAsFactors = FALSE
    )
    # Reemplazar NAs por guiones
    for (col in names(df)) df[[col]][is.na(df[[col]])] <- "-"
    DT::datatable(df, options = list(pageLength = 10, scrollX = TRUE),
                  rownames = FALSE, class = "stripe hover compact")
  })

  # Escribir el archivo filtrado (reactivo - se regenera cuando cambian los filtros)
  filtered_txt_path <- reactive({
    fr <- filtered_records()
    req(fr, length(fr) > 0)
    out_path <- file.path(tmp_dir, "consolidado.txt")
    write_merged_file(fr, out_path)
    out_path
  })

  # Mantener la compatibilidad con el reactiveVal original que apunta al path
  observe({
    path <- tryCatch(filtered_txt_path(), error = function(e) NULL)
    if (!is.null(path)) consolidado_path(path)
  })

  # Ruta del archivo a descargar segun el formato elegido. El .txt se reutiliza
  # tal cual (es el mismo que alimenta la pestana 2); RIS, BibTeX y la lista de
  # Excel se escriben aparte a partir de los mismos registros filtrados.
  export_file_path <- reactive({
    fmt <- input$formato_export
    if (is.null(fmt) || fmt == "txt") return(filtered_txt_path())

    fr <- filtered_records()
    req(fr, length(fr) > 0)
    out_path <- file.path(tmp_dir, paste0("consolidado.", fmt))

    withProgress(message = sprintf("Generando archivo .%s...", fmt), value = 0.5, {
      if (fmt == "ris")       write_ris_file(fr, out_path)
      else if (fmt == "xlsx") write_excel_file(fr, out_path)
      else                    write_bibtex_file(fr, out_path)
    })
    out_path
  })

  output$download_consolidado <- downloadHandler(
    filename = function() {
      fmt <- input$formato_export
      if (is.null(fmt)) fmt <- "txt"
      paste0("consolidado.", fmt)
    },
    content  = function(file) {
      file.copy(export_file_path(), file, overwrite = TRUE)
    }
  )

  observeEvent(input$ir_a_analizar, {
    updateTabsetPanel(session, "main_tabs", selected = "tab_analizar")
  })

  # --- Pestaña 2: Analizar (sin filtros) -----------------------------------

  # Cargar M cuando haya consolidado disponible
  M_raw <- reactive({
    path <- NULL
    if (input$origen_consolidado == "paso1") {
      req(consolidado_path())
      path <- consolidado_path()
    } else {
      req(input$consolidado_file)
      path <- input$consolidado_file$datapath
    }

    withProgress(message = "Cargando archivo...", value = 0, {
      setProgress(value = 0.3, detail = "Parseando con bibliometrix...")
      M <- convert2df(path, dbsource = "wos", format = "plaintext")
      setProgress(value = 0.8, detail = "Procesando campos...")
      # Tambien aqui, y no solo en el parser del paso 1: a esta pestana se le
      # puede subir un consolidado antiguo que todavia arrastre las entidades
      # HTML de WoS. Si no se limpian, "&ccedil;&otilde;es" acaba dibujado como
      # un nodo mas en la red de palabras clave.
      for (col in names(M)) {
        if (is.character(M[[col]])) M[[col]] <- decodificar_entidades(M[[col]])
      }
      if ("PY" %in% names(M)) M$PY <- as.integer(M$PY)
      if ("TC" %in% names(M)) M$TC <- as.integer(M$TC)
      if ("NR" %in% names(M)) M$NR <- as.integer(M$NR)
      if (!"AU_CO" %in% names(M)) M <- metaTagExtraction(M, Field = "AU_CO", sep = ";")
      setProgress(value = 1.0, detail = "Listo")
      return(M)
    })
  })

  # Alias: en esta versión ya NO hay filtros en la pestaña 2 - el archivo
  # que llega desde el paso 1 ya viene filtrado. Conservamos el nombre
  # M_filtered para no alterar el bloque de generación de figuras que sigue.
  M_filtered <- reactive({
    M_raw()
  })

  output$preview_ready <- reactive({
    !is.null(M_filtered()) && nrow(M_filtered()) > 0
  })
  outputOptions(output, "preview_ready", suspendWhenHidden = FALSE)

  output$prev_n      <- renderText(nrow(M_filtered()))
  output$prev_period <- renderText({
    py <- M_filtered()$PY; py <- py[!is.na(py)]
    if (length(py) == 0) return("-")
    sprintf("%d–%d", min(py), max(py))
  })
  output$prev_autores <- renderText({
    M <- M_filtered()
    au_all <- unlist(strsplit(M$AU[!is.na(M$AU)], ";\\s*"))
    length(unique(trimws(au_all)))
  })
  output$prev_so <- renderText({
    length(unique(M_filtered()$SO[!is.na(M_filtered()$SO)]))
  })

  output$preview_table <- DT::renderDataTable({
    M <- M_filtered()
    req(M)
    cols <- intersect(c("AU", "TI", "SO", "PY", "DT", "LA", "TC", "DI"), names(M))
    df <- M[, cols, drop = FALSE]
    if ("TI" %in% colnames(df)) df$TI <- substr(df$TI, 1, 80)
    if ("AU" %in% colnames(df)) df$AU <- substr(df$AU, 1, 40)
    DT::datatable(df, options = list(pageLength = 5, scrollX = TRUE),
                  rownames = FALSE, class = "stripe hover compact")
  })

  # --- Generar las 13 figuras ---------------------------------------------
  observeEvent(input$analizar_btn, {
    M <- M_filtered()
    req(M, nrow(M) > 0)

    # Idioma de los textos que van DENTRO de las figuras (no de la interfaz)
    lang <- if (is.null(input$idioma_figuras)) "es" else input$idioma_figuras
    L <- function(key, ...) tr(key, lang, ...)
    fig_lang(lang)

    # --- Modo publicacion --------------------------------------------------
    pub <- isTRUE(input$modo_pub)
    fig_pub(pub)

    # Ancho fijo: 183 mm = 7.2 in, el ancho de pagina completo de la mayoria de
    # revistas. No es configurable a proposito: es el unico que deja respirar al
    # mapa, a las cuatro redes y al mapa tematico, y elegir una columna estrecha
    # no encoge la letra -que debe seguir siendo legible- sino el sitio para
    # dibujar, con lo que las etiquetas se pisan.
    ANCHO_PUB_MM <- 183
    ancho_in <- if (!pub) NA_real_ else ANCHO_PUB_MM / 25.4

    # Salida fija: PDF vectorial (el que se envia a la revista) + PNG (la copia
    # para Word y presentaciones). dev_seguro() y guardar_fig() siguen sabiendo
    # escribir TIFF y SVG por si alguna revista los exige algun dia.
    formatos <- if (!pub) "png" else c("pdf", "png")
    # 300 dpi en los dos modos: quien manda la calidad es el PDF, que al ser
    # vectorial no tiene resolucion; subir el PNG solo engordaria el ZIP.
    dpi_fig <- 300

    # La tipografia es lo primero que se pierde al reducir una figura de 12 in a
    # la anchura de una columna. Se baja el tamano base y se restaura al salir
    # del observer, pase lo que pase.
    # base 10 -> ejes a 8 pt y titulos de eje a 9 pt. Como la figura se dibuja
    # ya al ancho final de la revista, esos puntos son los que se imprimen:
    # Elsevier exige 7 pt minimo y Springer 8 pt, asi que cumple los dos.
    base_size_previo <- FIG_BASE_SIZE
    FIG_BASE_SIZE <<- if (pub) 10 else 12
    on.exit(FIG_BASE_SIZE <<- base_size_previo, add = TRUE)

    # Pie real: hasta ahora decia "WoS + Scopus" siempre, incluso analizando una
    # sola base o un archivo subido a mano.
    modo_actual <- if (is.null(input$modo_uso)) "ambos" else input$modo_uso
    fuente <- if (!identical(input$origen_consolidado, "paso1")) {
      L("fuente_archivo")
    } else switch(modo_actual,
      solo_wos    = L("fuente_wos"),
      solo_scopus = L("fuente_scopus"),
      L("fuente_ambos"))
    fecha_txt <- format(Sys.Date(), "%d/%m/%Y")
    cap <- L("caption_tpl", fuente, fecha_txt)

    # Limpiar carpeta de figuras
    unlink(list.files(fig_dir, full.names = TRUE), recursive = TRUE)
    log_accum <- character(0)
    pies <- character(0)
    n_pie <- 0
    analizar_done(FALSE)

    # Pase lo que pase (error no capturado, figura que revienta), si quedo al
    # menos una figura en disco hay que publicar el log y habilitar la descarga:
    # antes, un fallo en la ultima figura dejaba huerfanas las 12 anteriores,
    # sin log y sin boton, con aspecto de "no se genero nada".
    on.exit({
      log_text(paste(log_accum, collapse = "\n"))
      if (n_figuras() > 0) analizar_done(TRUE)
    }, add = TRUE)

    withProgress(message = "Generando 13 figuras...", value = 0, {

      # setProgress() SI viaja al navegador durante el bloqueo del observer; el
      # reactiveVal del log, en cambio, no se refresca hasta que este termina.
      # Por eso la ultima linea del log se duplica en el 'detail' de la barra.
      append_log <- function(msg) {
        log_accum <<- c(log_accum, msg)
        log_text(paste(log_accum, collapse = "\n"))
        setProgress(detail = msg)
      }

      # --- Guardado de figuras ------------------------------------------------
      #
      # Un solo sitio para: quitar el texto incrustado en modo publicacion,
      # reescalar al ancho de columna conservando la proporcion de cada figura,
      # escribir todos los formatos pedidos y anotar el pie.
      #
      # 'nombre' llega sin extension; en modo normal se comporta exactamente
      # igual que el ggsave() de antes (un PNG de 300 dpi del mismo tamano).

      # Anota el pie de una figura y devuelve el numero que le toca
      registrar_pie <- function(titulo, subtitulo = NULL, nota = NULL) {
        n_pie <<- n_pie + 1
        partes <- c(titulo, subtitulo, nota, cap)
        partes <- partes[!vapply(partes, function(x) is.null(x) || !nzchar(x), logical(1))]
        # El salto de linea del cuadrante del mapa tematico no debe partir el pie
        partes <- gsub("\\s*\n\\s*", " ", partes)
        pies <<- c(pies, paste(L("pie_fig", n_pie), paste(partes, collapse = ". ")))
        n_pie
      }

      # Proporcion original -> mismo aspecto al ancho de la revista
      dims_fig <- function(w, h) {
        if (!pub) return(c(w, h))
        c(ancho_in, h * ancho_in / w)
      }

      guardar_fig <- function(nombre, plot, width, height,
                              titulo = NULL, subtitulo = NULL, nota = NULL) {
        d <- dims_fig(width, height)
        if (pub) {
          # El titulo, el subtitulo y la fuente salen de la imagen y pasan al
          # archivo de pies: es como los quieren las revistas, que componen
          # ellas el pie debajo de la figura.
          plot <- plot + labs(title = NULL, subtitle = NULL, caption = NULL)
        }
        for (f in formatos) {
          destino <- file.path(fig_dir, paste0(nombre, ".", f))
          if (identical(f, "pdf")) {
            # cairo_pdf y no el pdf() clasico: incrusta las tipografias y
            # escribe bien las tildes y la beta de la ley de Lotka
            ggsave(destino, plot, width = d[1], height = d[2],
                   device = grDevices::cairo_pdf, bg = BG)
          } else if (identical(f, "tiff")) {
            ggsave(destino, plot, width = d[1], height = d[2], dpi = dpi_fig,
                   bg = BG, device = grDevices::tiff, compression = "lzw")
          } else if (identical(f, "svg")) {
            ggsave(destino, plot, width = d[1], height = d[2], bg = BG)
          } else {
            ggsave(destino, plot, width = d[1], height = d[2], dpi = dpi_fig, bg = BG)
          }
        }
        if (!is.null(titulo)) registrar_pie(titulo, subtitulo, nota)
        invisible(TRUE)
      }

      # Version para las figuras que no son ggplot (redes y wordcloud): se
      # dibujan sobre un dispositivo abierto a mano, asi que hay que repetir el
      # dibujo una vez por formato. dev_seguro() fija la semilla antes de cada
      # dispositivo para que la red del PDF y la del PNG sean la misma.
      #
      # 'dibujo' es una FUNCION sin argumentos, no una expresion: una expresion
      # pasada como promesa se evalua una sola vez y se queda cacheada, asi que
      # el segundo formato saldria en blanco.
      guardar_fig_base <- function(nombre, dibujo, width = 3000, height = 3000,
                                   titulo = NULL, subtitulo = NULL) {
        px <- if (!pub) c(width, height) else round(dims_fig(width, height) * dpi_fig)
        for (f in formatos) {
          dev_seguro(file.path(fig_dir, paste0(nombre, ".", f)), dibujo(), formato = f,
                     width = px[1], height = px[2], res = dpi_fig)
        }
        if (!is.null(titulo)) registrar_pie(titulo, subtitulo)
        invisible(TRUE)
      }

      # FIG 01
      setProgress(value = 1/13, detail = "Fig 01: Producción anual...")
      tryCatch({
        prod_anual <- as.data.frame(table(M$PY))
        names(prod_anual) <- c("Year", "Articles")
        prod_anual$Year <- as.integer(as.character(prod_anual$Year))
        prod_anual <- prod_anual[!is.na(prod_anual$Year), ]

        # El ultimo ano de cualquier busqueda esta a medias: su barra cae y el
        # suavizado LOESS interpreta esa caida como una tendencia real, con su
        # banda de confianza incluida. Es un artefacto de la fecha de descarga.
        nota01 <- NULL
        anio_actual <- as.integer(format(Sys.Date(), "%Y"))
        ultimo <- max(prod_anual$Year)
        if (isTRUE(input$excluir_anio) && ultimo >= anio_actual && nrow(prod_anual) > 1) {
          prod_anual <- prod_anual[prod_anual$Year < ultimo, ]
          nota01 <- L("nota_incompleto", ultimo)
          append_log(sprintf("Fig 01 - Año %d excluido por incompleto", ultimo))
        }

        p01 <- ggplot(prod_anual, aes(x = Year, y = Articles)) +
          geom_col(fill = "#2C3E6B", alpha = 0.85, width = 0.7) +
          geom_smooth(aes(group = 1), method = "loess", se = TRUE,
                      color = "#C0392B", fill = "#C0392B", alpha = 0.15,
                      linewidth = 1.2, span = 0.6, formula = y ~ x) +
          geom_text(aes(label = Articles), vjust = -0.5, size = 3,
                    color = "#333333", fontface = "bold") +
          scale_y_continuous(expand = expansion(mult = c(0, 0.15))) +
          labs(title = L("f01_title"),
               subtitle = L("f01_sub", nrow(M),
                            min(prod_anual$Year), max(prod_anual$Year)),
               x = L("year"), y = L("f01_y"),
               caption = if (is.null(nota01)) cap else paste(nota01, "|", cap)) +
          theme_paper()
        guardar_fig("fig01_annual_production", p01, 12, 6,
                    titulo = L("f01_title"),
                    subtitulo = L("f01_sub", nrow(M),
                                  min(prod_anual$Year), max(prod_anual$Year)),
                    nota = nota01)
        append_log("Fig 01 - Producción anual: OK")
      }, error = function(e) append_log(paste("Fig 01 - Error:", e$message)))

      # FIG 02 - Mapa mundial
      setProgress(value = 2/13, detail = "Fig 02: Mapa mundial...")
      tryCatch({
        res <- biblioAnalysis(M, sep = ";")
        if (is.data.frame(res$Countries)) {
          country_prod <- res$Countries
          names(country_prod) <- c("Country", "Articles")
          country_prod$Country <- tolower(trimws(as.character(country_prod$Country)))
        } else {
          country_prod <- data.frame(
            Country = tolower(trimws(names(res$Countries))),
            Articles = as.integer(res$Countries))
        }
        world <- map_data("world")
        world$region <- tolower(world$region)

        # Se traducen los nombres a los que usa 'maps' y, sobre todo, se avisa
        # de los que no casan: sin esto, un pais con articulos cuyo nombre no
        # coincide se pinta del mismo gris que uno sin produccion y el error se
        # publica sin que nadie lo note.
        norm <- normalizar_paises(country_prod, unique(world$region))
        country_prod <- norm$datos
        if (length(norm$sin_mapa) > 0) {
          append_log(paste0("Fig 02 - AVISO: sin correspondencia en el mapa (",
                            "quedan en gris, no se dibujan): ",
                            paste(norm$sin_mapa, collapse = ", ")))
        }

        map_data_plot <- dplyr::left_join(world, country_prod, by = c("region" = "Country"))

        # transform= sustituye a trans=, obsoleto desde ggplot2 3.5
        escala_raiz <- if (utils::packageVersion("ggplot2") >= "3.5.0")
          scale_fill_gradientn(colors = c("#EEF2FF","#93A8D8","#2C3E6B"),
                               na.value = "#F0F0F0", name = L("articles"),
                               transform = "sqrt")
        else
          scale_fill_gradientn(colors = c("#EEF2FF","#93A8D8","#2C3E6B"),
                               na.value = "#F0F0F0", name = L("articles"),
                               trans = "sqrt")

        p02 <- ggplot(map_data_plot, aes(x = long, y = lat, group = group, fill = Articles)) +
          geom_polygon(color = "white", linewidth = 0.2) +
          escala_raiz +
          coord_fixed(1.3, xlim = c(-170,180), ylim = c(-55,85)) +
          labs(title = L("f02_title"),
               subtitle = L("f02_sub"),
               caption = cap) +
          theme_paper() +
          theme(axis.title = element_blank(), axis.text = element_blank(),
                panel.grid = element_blank(), panel.border = element_blank())
        guardar_fig("fig02_world_map", p02, 14, 7,
                    titulo = L("f02_title"), subtitulo = L("f02_sub"))
        append_log("Fig 02 - Mapa mundial: OK")
      }, error = function(e) append_log(paste("Fig 02 - Error:", e$message)))

      # FIG 03 - Wordcloud
      setProgress(value = 3/13, detail = "Fig 03: Wordcloud...")
      tryCatch({
        kw_raw <- paste(M$DE[!is.na(M$DE)], collapse = ";")
        kw_list <- tolower(trimws(unlist(strsplit(kw_raw, ";"))))
        kw_list <- kw_list[nchar(kw_list) > 2 & kw_list != "na"]
        kw_freq <- as.data.frame(table(kw_list), stringsAsFactors = FALSE)
        names(kw_freq) <- c("word", "freq")
        kw_freq <- kw_freq[order(-kw_freq$freq), ]
        kw_freq <- head(kw_freq[kw_freq$freq >= 2, ], 80)
        # Rampa secuencial azul en vez de la de azul-verde-rojo: el rojo y el
        # verde juntos no los distingue ~8% de los lectores varones y en
        # impresion a escala de grises se confunden entre si. Aqui el color solo
        # refuerza la frecuencia, asi que una sola tonalidad la codifica mejor.
        pal_wc <- colorRampPalette(c("#93A8D8","#2980B9","#2C3E6B"))(8)

        guardar_fig_base("fig03_wordcloud", function() {
          par(mar = c(2,2,3,2), bg = BG); set.seed(42)
          wordcloud(words = kw_freq$word, freq = kw_freq$freq, min.freq = 2,
                    max.words = 80, random.order = FALSE, rot.per = 0.25,
                    colors = pal_wc, scale = c(4, 0.4))
          if (!pub) title(L("f03_title"), cex.main = 1.5, col.main = "#2C3E6B")
        }, height = 2400, titulo = L("f03_title"))
        append_log("Fig 03 - Wordcloud: OK")
      }, error = function(e) append_log(paste("Fig 03 - Error:", e$message)))

      # FIG 04 - Trend topics
      setProgress(value = 4/13, detail = "Fig 04: Trend topics...")
      tryCatch({
        py_valid <- M$PY[!is.na(M$PY)]
        timespan <- c(min(py_valid), max(py_valid))
        trend <- fieldByYear(M, field = "DE", timespan = timespan,
                             min.freq = 5, n.items = 5, graph = FALSE)
        # OJO: fieldByYear() usa coord_flip(), asi que labs(x=) nombra el eje
        # vertical (los terminos) y labs(y=) el horizontal (los anos)
        p04 <- trend$graph +
          labs(title = L("f04_title"),
               subtitle = L("f04_sub"),
               x = L("f04_y"), y = L("year"),
               caption = cap) +
          # El titulo de la leyenda viene del scale_size() interno de
          # bibliometrix, que gana a labs(): hay que sobrescribirlo por guides()
          guides(size = guide_legend(title = L("f04_leg"))) +
          theme_paper() + theme(legend.position = "right")
        guardar_fig("fig04_trend_topics", p04, 14, 7,
                    titulo = L("f04_title"), subtitulo = L("f04_sub"))
        append_log("Fig 04 - Trend topics: OK")
      }, error = function(e) append_log(paste("Fig 04 - Error:", e$message)))

      # FIG 05 - Co-autoria autores
      setProgress(value = 5/13, detail = "Fig 05: Red co-autoría autores...")
      tryCatch({
        Net_AU <- biblioNetwork(M, analysis = "collaboration",
                                network = "authors", sep = ";")
        problema <- diagnostico_red(Net_AU, 25)
        if (!is.null(problema)) stop(problema, ". Revisa el campo AU del consolidado")
        guardar_fig_base("fig05_coauthorship_authors", function() {
          networkPlot(Net_AU, n = 25, Title = if (pub) "" else L("f05_title"),
                      type = "fruchterman", size = TRUE, edgesize = 3, labelsize = 0.8)
        }, titulo = L("f05_title"))
        append_log("Fig 05 - Red co-autoría autores: OK")
      }, error = function(e) append_log(paste("Fig 05 - Error:", e$message)))

      # FIG 06 - Co-autoria instituciones
      setProgress(value = 6/13, detail = "Fig 06: Red co-autoría instituciones...")
      tryCatch({
        Net_UN <- biblioNetwork(M, analysis = "collaboration",
                                network = "universities", sep = ";")
        problema <- diagnostico_red(Net_UN, 20)
        if (!is.null(problema)) stop(problema, ". Revisa el campo C1/AU_UN del consolidado")
        guardar_fig_base("fig06_coauthorship_institutions", function() {
          networkPlot(Net_UN, n = 20, Title = if (pub) "" else L("f06_title"),
                      type = "fruchterman", size = TRUE, edgesize = 3, labelsize = 0.7)
        }, titulo = L("f06_title"))
        append_log("Fig 06 - Red co-autoría instituciones: OK")
      }, error = function(e) append_log(paste("Fig 06 - Error:", e$message)))

      # FIG 07 - Ley de Lotka
      setProgress(value = 7/13, detail = "Fig 07: Ley de Lotka...")
      tryCatch({
        res <- biblioAnalysis(M, sep = ";")
        au_prod <- as.data.frame(table(res$Authors))
        names(au_prod) <- c("Author", "n_articles")
        lotka_obs <- as.data.frame(table(au_prod$n_articles))
        names(lotka_obs) <- c("n_articles", "n_authors")
        lotka_obs$n_articles <- as.integer(as.character(lotka_obs$n_articles))
        lotka_obs$prop_obs <- lotka_obs$n_authors / sum(lotka_obs$n_authors)

        fit <- lm(log(prop_obs) ~ log(n_articles),
                  data = lotka_obs[lotka_obs$n_articles <= 10, ])
        beta <- -coef(fit)[2]; C <- exp(coef(fit)[1])

        lotka_obs$prop_teo <- C / (lotka_obs$n_articles ^ beta)
        lotka_obs$prop_teo <- lotka_obs$prop_teo / sum(lotka_obs$prop_teo)
        lotka_plot <- lotka_obs[lotka_obs$n_articles <= 10, ]

        # La etiqueta de la serie hace de valor de datos y de clave de escala:
        # se calcula una sola vez para que ambas coincidan en cualquier idioma
        serie_lotka <- L("f07_serie")

        p07 <- ggplot(lotka_plot, aes(x = n_articles)) +
          geom_col(aes(y = prop_obs), fill="#2C3E6B", alpha=0.8, width=0.6) +
          geom_line(aes(y = prop_teo, color=serie_lotka),
                    linewidth=1.3, linetype="dashed") +
          geom_point(aes(y = prop_teo, color=serie_lotka), size=3) +
          scale_color_manual(name="", values=setNames("#C0392B", serie_lotka)) +
          scale_x_continuous(breaks = 1:10) +
          scale_y_continuous(labels = scales::percent_format(accuracy=1)) +
          annotate("text", x = max(lotka_plot$n_articles)*0.65,
                   y = max(lotka_plot$prop_obs)*0.85,
                   label = sprintf("β = %.2f\nC = %.4f", beta, C),
                   hjust = 0, size = 4, color="#333333", fontface="italic") +
          labs(title = L("f07_title"),
               subtitle = L("f07_sub"),
               x = L("f07_x"), y = L("f07_y"),
               caption = cap) +
          theme_paper() + leyenda_dentro(0.8, 0.8)
        guardar_fig("fig07_lotka_law", p07, 10, 6,
                    titulo = L("f07_title"), subtitulo = L("f07_sub"))
        append_log("Fig 07 - Ley de Lotka: OK")
      }, error = function(e) append_log(paste("Fig 07 - Error:", e$message)))

      # FIG 08 - Ley de Bradford (2 gráficos)
      setProgress(value = 8/13, detail = "Fig 08: Ley de Bradford...")
      tryCatch({
        so_freq <- as.data.frame(table(M$SO), stringsAsFactors = FALSE)
        names(so_freq) <- c("Journal", "Articles")
        so_freq <- so_freq[order(-so_freq$Articles), ]
        so_freq$rank <- seq_len(nrow(so_freq))
        so_freq$cum_art <- cumsum(so_freq$Articles)
        so_freq$cum_pct <- so_freq$cum_art / sum(so_freq$Articles)
        so_freq$log_rank <- log10(so_freq$rank)
        total_art <- sum(so_freq$Articles)
        zone_cut1 <- so_freq$rank[which(so_freq$cum_art >= total_art/3)[1]]
        zone_cut2 <- so_freq$rank[which(so_freq$cum_art >= 2*total_art/3)[1]]
        # Igual que en Lotka: las 3 zonas son a la vez valores de la columna
        # Zone y claves de scale_fill_manual, asi que se traducen juntas
        zonas <- c(L("f08_z1"), L("f08_z2"), L("f08_z3"))
        so_freq$Zone <- dplyr::case_when(
          so_freq$rank <= zone_cut1 ~ zonas[1],
          so_freq$rank <= zone_cut2 ~ zonas[2],
          TRUE ~ zonas[3])

        top30 <- head(so_freq, 30)
        top30$Journal <- factor(top30$Journal, levels = rev(top30$Journal))

        p08a <- ggplot(top30, aes(x = Articles, y = Journal, fill = Zone)) +
          geom_col(alpha = 0.85) +
          scale_fill_manual(values = setNames(
            c("#2C3E6B", "#2980B9", "#93A8D8"), zonas)) +
          scale_x_continuous(expand = expansion(mult = c(0, 0.1))) +
          labs(title = L("f08a_title"),
               subtitle = L("f08a_sub", zone_cut1, zone_cut1 + 1, zone_cut2),
               x = L("f08a_x"), y = NULL, fill = L("f08a_fill"),
               caption = cap) +
          theme_paper()
        guardar_fig("fig08a_bradford_journals", p08a, 10, 10,
                    titulo = L("f08a_title"),
                    subtitulo = L("f08a_sub", zone_cut1, zone_cut1 + 1, zone_cut2))

        p08b <- ggplot(so_freq, aes(x = log_rank, y = cum_pct)) +
          geom_line(color="#2C3E6B", linewidth=1.2) +
          geom_vline(xintercept = log10(zone_cut1), color="#C0392B",
                     linetype="dashed", linewidth=0.8) +
          geom_vline(xintercept = log10(zone_cut2), color="#E67E22",
                     linetype="dashed", linewidth=0.8) +
          scale_y_continuous(labels = scales::percent_format()) +
          labs(title = L("f08b_title"),
               subtitle = L("f08b_sub"),
               x = L("f08b_x"), y = L("f08b_y"),
               caption = cap) +
          theme_paper()
        guardar_fig("fig08b_bradford_curve", p08b, 10, 6,
                    titulo = L("f08b_title"), subtitulo = L("f08b_sub"))
        append_log("Fig 08 - Ley de Bradford: OK")
      }, error = function(e) append_log(paste("Fig 08 - Error:", e$message)))

      # FIG 09 - Mapa temático
      setProgress(value = 9/13, detail = "Fig 09: Mapa temático...")
      tryCatch({
        Map <- thematicMap(M, field = "DE", n = 250, minfreq = 3)
        # thematicMap() devuelve un ggplot ya montado por bibliometrix. El
        # titulo y los ejes se sobrescriben aqui; las 4 etiquetas de cuadrante
        # van incrustadas en capas geom_text y se parchean aparte (best-effort:
        # si bibliometrix cambia su estructura interna, quedan en ingles).
        p09 <- translate_thematic_quadrants(Map$map, lang) +
          labs(title = L("f09_title"),
               subtitle = L("f09_sub"),
               x = L("f09_x"), y = L("f09_y"),
               caption = cap)
        guardar_fig("fig09_thematic_map", p09, 10, 8,
                    titulo = L("f09_title"), subtitulo = L("f09_sub"))
        append_log("Fig 09 - Mapa temático: OK")
      }, error = function(e) append_log(paste("Fig 09 - Error:", e$message)))

      # FIG 10 - Keyword co-occurrence
      setProgress(value = 10/13, detail = "Fig 10: Co-ocurrencia keywords...")
      tryCatch({
        Net_KW <- biblioNetwork(M, analysis = "co-occurrences",
                                network = "author_keywords", sep = ";")
        problema <- diagnostico_red(Net_KW, 30)
        if (!is.null(problema)) stop(problema, ". Revisa el campo DE del consolidado")
        guardar_fig_base("fig10_keyword_cooccurrence", function() {
          networkPlot(Net_KW, n = 30, Title = if (pub) "" else L("f10_title"),
                      type = "fruchterman", size = TRUE, edgesize = 5, labelsize = 1)
        }, titulo = L("f10_title"))
        append_log("Fig 10 - Co-ocurrencia keywords: OK")
      }, error = function(e) append_log(paste("Fig 10 - Error:", e$message)))

      # FIG 11 - Country collaboration
      setProgress(value = 11/13, detail = "Fig 11: Colaboración países...")
      tryCatch({
        Net_CO <- biblioNetwork(M, analysis = "collaboration",
                                network = "countries", sep = ";")
        problema <- diagnostico_red(Net_CO, 20)
        if (!is.null(problema))
          stop(problema, ". En este consolidado cada registro tiene un solo pais ",
               "(AU_CO), asi que no hay colaboracion internacional que dibujar: ",
               "suele deberse a que el campo C1 de afiliaciones llego incompleto ",
               "desde Scopus/WoS")
        guardar_fig_base("fig11_country_collaboration", function() {
          networkPlot(Net_CO, n = 20, Title = if (pub) "" else L("f11_title"),
                      type = "circle", size = TRUE, edgesize = 5, labelsize = 1)
        }, titulo = L("f11_title"))
        append_log("Fig 11 - Colaboración países: OK")
      }, error = function(e) append_log(paste("Fig 11 - Error:", e$message)))

      # FIG 12 - Author production over time
      setProgress(value = 12/13, detail = "Fig 12: Producción autores...")
      tryCatch({
        apot <- authorProdOverTime(M, k = 15, graph = FALSE)
        # Color unico en vez de la rampa de 15 tonos: era decorativa
        # (guide = "none", el eje Y ya dice quien es cada autor) y quince
        # colores no se distinguen ni en pantalla ni impresos en gris.
        # 'size' va en el geom_point y no en el aes() general: heredado por la
        # linea, ggplot avisa de que aplicar 'size' a una linea esta obsoleto
        p12 <- ggplot(apot$dfAU, aes(x = year, y = Author)) +
          geom_line(aes(group = Author), linewidth = 0.3, color = "#7F8C8D", alpha = 0.4) +
          geom_point(aes(size = freq), alpha = 0.75, shape = 16, color = "#2C3E6B") +
          scale_size_continuous(name = L("articles"), range = c(2, 12)) +
          scale_x_continuous(breaks = scales::pretty_breaks(n = 8)) +
          labs(title = L("f12_title"),
               subtitle = L("f12_sub"),
               x = L("year"), y = NULL,
               caption = cap) +
          theme_paper() + theme(legend.position = "right")
        guardar_fig("fig12_author_production", p12, 12, 7,
                    titulo = L("f12_title"), subtitulo = L("f12_sub"))
        append_log("Fig 12 - Producción autores: OK")
      }, error = function(e) append_log(paste("Fig 12 - Error:", e$message)))

      # FIG 13 - Sankey three fields
      #
      # OJO: aqui estaba el cuelgue que bloqueaba la app entera. webshot2 usa
      # chromote, que lanza Chrome headless y bombea su propio bucle de eventos
      # 'later'; llamado de forma sincrona desde dentro de un observer de Shiny
      # -que ya esta bombeando ese mismo bucle- se queda esperando para siempre.
      # Un antivirus que bloquee el puerto de depuracion de Chrome da el mismo
      # resultado. Y tryCatch no rescata de un cuelgue, solo de un error.
      #
      # Solucion: el HTML interactivo se genera SIEMPRE (no depende de Chrome y
      # es mejor entregable), y el PNG es opcional y se calcula en un proceso R
      # aparte con timeout duro, para que nada pueda congelar la sesion.
      setProgress(value = 13/13, detail = "Fig 13: Sankey...")
      tryCatch({
        sankey <- threeFieldsPlot(M, fields = c("AU_CO","AU","DE"), n = c(15,15,15))
        out_html <- file.path(fig_dir, "fig13_sankey.html")

        # selfcontained = TRUE necesita pandoc (viene con RStudio, no con R puro)
        hay_pandoc <- requireNamespace("rmarkdown", quietly = TRUE) &&
                      rmarkdown::pandoc_available()
        htmlwidgets::saveWidget(sankey, out_html, selfcontained = hay_pandoc)
        if (hay_pandoc) {
          # El HTML ya lleva todo dentro: saveWidget deja igualmente la carpeta
          # de librerias, que solo ensuciaria el ZIP
          unlink(file.path(fig_dir, "fig13_sankey_files"), recursive = TRUE)
        } else {
          append_log(paste0("Fig 13 - Sankey: HTML generado sin empaquetar (falta pandoc); ",
                            "conserva la carpeta 'fig13_sankey_files' junto al HTML"))
        }

        if (isTRUE(input$sankey_png)) {
          png_ok <- sankey_a_png(out_html, file.path(fig_dir, "fig13_sankey.png"))
          append_log(if (isTRUE(png_ok)) "Fig 13 - Sankey: OK (HTML + PNG)"
                     else paste("Fig 13 - Sankey: OK (solo HTML). PNG no generado:", png_ok))
        } else {
          append_log("Fig 13 - Sankey: OK (HTML interactivo)")
        }
        registrar_pie("Sankey (AU_CO - AU - DE)")
      }, error = function(e) append_log(paste("Fig 13 - Error:", e$message)))

      # Los pies solo se escriben en modo publicacion: es donde el texto ha
      # salido de las imagenes y hace falta recuperarlo. Se numeran en el orden
      # en que se generaron las figuras, saltando las que fallaron.
      if (pub && length(pies) > 0) {
        con <- file(file.path(fig_dir, "pies_de_figura.txt"), open = "wb")
        txt <- paste0(L("pie_cab", format(Sys.time(), "%d/%m/%Y %H:%M")), "\n",
                      paste(pies, collapse = "\n\n"), "\n")
        writeBin(charToRaw("\xEF\xBB\xBF"), con)   # BOM: tildes correctas en Word
        writeBin(charToRaw(enc2utf8(txt)), con)
        close(con)
        append_log(sprintf("pies_de_figura.txt: %d pies escritos", length(pies)))
      }

      append_log(sprintf("\n=== Análisis completo: %d archivos en %s ===",
                         n_figuras(), fig_dir))
    })

    n_ok <- n_figuras()
    showNotification(sprintf("Análisis terminado: %d archivos. Descarga el ZIP.", n_ok),
                     type = if (n_ok > 0) "message" else "warning", duration = 5)
  })

  output$analizar_ready <- reactive(analizar_done())
  outputOptions(output, "analizar_ready", suspendWhenHidden = FALSE)

  output$hay_log <- reactive(nzchar(log_text()))
  outputOptions(output, "hay_log", suspendWhenHidden = FALSE)

  output$log_analisis <- renderText(log_text())

  # list.files() no es reactivo: log_text() actua de disparador, ya que cambia
  # en cada figura y al terminar el bloque
  output$resumen_figuras <- renderText({
    log_text()
    n <- n_figuras()
    sprintf("%d de 14 archivos generados (las 13 figuras, con Bradford en dos partes)", n)
  })

  # --- Diagnóstico del equipo ----------------------------------------------
  # Con un aula entera de portátiles distintos, la mayor parte de los fallos son
  # de entorno (paquete que no se instaló, falta pandoc, no hay Chrome). Esto
  # los hace visibles sin tener que sentarse delante de cada máquina.
  observeEvent(input$diag_btn, {
    faltan_req <- setdiff(required_pkgs, rownames(installed.packages()))
    faltan_opt <- setdiff(optional_pkgs, rownames(installed.packages()))
    chrome <- tryCatch(chromote::find_chrome(), error = function(e) NULL)
    pandoc <- requireNamespace("rmarkdown", quietly = TRUE) &&
              rmarkdown::pandoc_available()

    diag <- c(
      "=== DIAGNÓSTICO DEL EQUIPO ===",
      paste("R:              ", R.version.string),
      paste("Sistema:        ", Sys.info()[["sysname"]], Sys.info()[["release"]]),
      paste("bibliometrix:   ", as.character(utils::packageVersion("bibliometrix"))),
      paste("ggplot2:        ", as.character(utils::packageVersion("ggplot2"))),
      "",
      paste("Paquetes obligatorios que faltan:",
            if (length(faltan_req) == 0) "ninguno" else paste(faltan_req, collapse = ", ")),
      paste("Paquetes opcionales que faltan:  ",
            if (length(faltan_opt) == 0) "ninguno" else paste(faltan_opt, collapse = ", ")),
      "",
      paste("pandoc (Sankey autocontenido):", if (pandoc) "OK" else "NO DISPONIBLE"),
      paste("Chrome (PNG del Sankey):      ",
            if (is.null(chrome) || !nzchar(chrome)) "NO ENCONTRADO" else chrome),
      "",
      paste("Carpeta de figuras:", fig_dir),
      # Un nombre de usuario de Windows con tildes o eñes rompe algunas rutas
      # temporales y produce fallos difíciles de interpretar
      paste("Ruta sin caracteres especiales:",
            if (grepl("^[ -~]*$", fig_dir)) "OK" else "ATENCIÓN: contiene tildes/eñes"),
      paste("Se puede escribir en ella:",
            if (file.access(fig_dir, mode = 2) == 0) "OK" else "NO"),
      paste("Archivos actuales:", n_figuras()),
      "",
      if (length(faltan_req) > 0)
        paste0("ACCIÓN: install.packages(c(",
               paste(sprintf('"%s"', faltan_req), collapse = ", "), "))")
      else "Todo lo obligatorio está instalado."
    )
    log_text(paste(diag, collapse = "\n"))
  })

  # Download ZIP
  output$download_zip <- downloadHandler(
    filename = function() sprintf("figuras_%s%s_%s.zip", fig_lang(),
                                  if (fig_pub()) "_pub" else "",
                                  format(Sys.time(), "%Y%m%d_%H%M")),
    content = function(file) {
      files <- list.files(fig_dir, full.names = TRUE)
      if (length(files) == 0) stop("No hay figuras para descargar")
      # Crear ZIP con una carpeta "figuras/" dentro
      old_wd <- getwd(); setwd(dirname(fig_dir))
      on.exit(setwd(old_wd))
      zip::zip(zipfile = file, files = "figuras")
    }
  )

  # Limpieza al cerrar la sesion
  session$onSessionEnded(function() {
    unlink(tmp_dir, recursive = TRUE)
  })
}

# =============================================================================
# LANZAR LA APP
# =============================================================================

shinyApp(ui, server)
