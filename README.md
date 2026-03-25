# Trabajo Científico — Sitio Web de Servicios

Sitio web estático de **Trabajo Científico**, empresa colombiana de ciencia de datos con sede en Bogotá y Villavicencio. Presenta los servicios de consultoría, los programas de formación y el equipo, y sirve como punto de entrada para clientes y estudiantes.

🌐 **trabajocientifico.org**

---

## Estructura del proyecto

```
servicios/
├── index.html              # Página principal (single-page)
├── cursos/                 # Brochures HTML de cada programa
│   ├── excel-para-la-vida.html
│   ├── ia-productividad.html
│   ├── ia-cientifica.html
│   ├── python-ia-datos.html
│   ├── geoanalisis-arcgis-pro.html
│   └── dashboard-power-bi.html
└── images/
    ├── logo-trabajo-cientifico.png
    ├── equipo/             # Fotos del equipo (oscar-vargas.jpg, etc.)
    ├── experiencias/       # Galería de proyectos (experiencia-1.jpeg, ...)
    └── instituciones/      # Logos de entidades aliadas
```

---

## Tecnologías

| Herramienta | Uso |
|---|---|
| HTML5 + CSS (Tailwind CDN) | Estructura y estilos |
| Lucide Icons | Iconografía UI |
| Google Fonts (Montserrat + Inter) | Tipografía |
| JavaScript vanilla | Modales, navegación activa, KPI interactivos |

No requiere build, bundler ni dependencias instaladas. Se abre directamente en el navegador.

---

## Secciones de `index.html`

1. **Hero** — Presentación principal con CTA
2. **Servicios** — Consultoría, automatización y capacitación para empresas
3. **KPIs** — Indicadores clave (proyectos, países, estudiantes, herramientas, publicaciones) con modal de detalle
4. **Programas** — 6 cursos certificados con enlace al brochure y formulario de inscripción
5. **Equipo** — 3 integrantes con modal de perfil completo
6. **Experiencias** — Galería de proyectos realizados
7. **Instituciones** — Entidades con las que se ha trabajado
8. **YouTube** — Recursos gratuitos en el canal
9. **Footer / Contacto** — Redes sociales (LinkedIn, YouTube, GitHub, Instagram) y correo

---

## Programas de formación

Cada programa tiene 3 niveles de 12 horas cada uno (36 h en total), 100 % online con certificado digital.

| Programa | Brochure |
|---|---|
| Excel para la Vida | `cursos/excel-para-la-vida.html` |
| IA + Productividad | `cursos/ia-productividad.html` |
| IA Científica | `cursos/ia-cientifica.html` |
| Python + IA + Datos | `cursos/python-ia-datos.html` |
| GeoAnálisis con ArcGIS PRO | `cursos/geoanalisis-arcgis-pro.html` |
| Dashboard con Power BI | `cursos/dashboard-power-bi.html` |

Los brochures están diseñados para imprimirse como PDF desde el navegador (`Ctrl+P`).

---

## Equipo

| Nombre | Rol |
|---|---|
| Oscar Ivan Vargas Pineda, PhD | CEO & Científico de Datos |
| Lali Valentina Pedroza Amado | Educadora Gestora Académica |
| Héctor Manuel Ávila | Relacionamiento Estratégico |

---

## Imágenes requeridas

Para que se visualicen correctamente todas las secciones, las imágenes deben ubicarse así:

- **Equipo:** `images/equipo/oscar-vargas.jpg`, `lali-pedroza.jpg`, `hector-avila.jpg`
- **Experiencias:** `images/experiencias/experiencia-1.jpeg` … `experiencia-8.jpeg`
- **Instituciones:** `images/instituciones/[nombre-entidad].png`

---

## Contacto

- 📧 info@trabajocientifico.org
- 💼 [LinkedIn](https://www.linkedin.com/in/oscar-ivan-vargas-pineda-2aa543240/)
- ▶️ [YouTube @TCientifico](https://www.youtube.com/@TCientifico)
- 🐙 [GitHub](https://github.com/OscarIvaVP)
- 📸 [Instagram @trabajocientifico](https://www.instagram.com/trabajocientifico/)
