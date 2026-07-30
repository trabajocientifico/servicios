/* ============================================
   TRABAJO CIENTÍFICO — Generador de Certificados
   Lógica JavaScript (CSV Fetch, Search, Canvas, PDF)
   ============================================ */

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSM1aQLOgJsvQ8KvTkG3bgbGDeUyS5zl2RdPeSs1GslsAZojdDac_EEO7_tqk5mbO67E13fmKORXUQ5/pub?output=csv';

class CertificateApp {
  constructor() {
    this.attendees = [];
    this.currentAttendee = null;
    this.logoImg = null;

    // Elementos DOM
    this.nameInput = document.getElementById('name-input');
    this.searchBtn = document.getElementById('btn-search');
    this.searchForm = document.getElementById('search-form');
    this.autocompleteList = document.getElementById('autocomplete-list');
    this.statusContainer = document.getElementById('status-container');
    this.certSection = document.getElementById('certificate-section');
    this.canvas = document.getElementById('cert-canvas');
    this.downloadPdfBtn = document.getElementById('btn-download-pdf');

    this.init();
  }

  async init() {
    this.bindEvents();
    await this.loadLogo();
    await this.fetchDatabase();
  }

  // --- Carga previa del logotipo de la organización ---
  loadLogo() {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.logoImg = img;
        resolve();
      };
      img.onerror = () => {
        this.logoImg = null;
        resolve();
      };
      img.src = 'imagenes/logo.png';
    });
  }

  // --- Descarga y parseo del CSV de Google Sheets ---
  async fetchDatabase() {
    this.showStatus('loading', 'Conectando con la base de datos de asistentes...');
    try {
      const response = await fetch(CSV_URL);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const csvText = await response.text();
      this.attendees = this.parseCSV(csvText);

      if (this.attendees.length === 0) {
        this.showStatus('error', 'No se encontraron registros en la base de datos.');
      } else {
        this.showStatus('success', `✓ Base de datos cargada correctamente (${this.attendees.length} asistentes registrados). Lista para buscar.`);
        setTimeout(() => this.hideStatus(), 4000);
      }
    } catch (err) {
      console.error('Error fetching database:', err);
      this.showStatus('error', 'No se pudo conectar con la base de datos de Google Sheets. Verifica tu conexión e intenta de nuevo.');
    }
  }

  // Parseador robusto de CSV
  parseCSV(text) {
    const lines = [];
    let field = '';
    let inQuotes = false;
    let row = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(field.trim());
        field = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(field.trim());
        if (row.some(f => f.length > 0)) lines.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
    if (field.length > 0 || row.length > 0) {
      row.push(field.trim());
      if (row.some(f => f.length > 0)) lines.push(row);
    }

    if (lines.length < 2) return [];

    // Buscar el índice de la columna "Nombre completo"
    const headers = lines[0].map(h => h.toLowerCase().trim());
    let nameColIdx = headers.findIndex(h => h.includes('nombre completo') || h.includes('nombre'));
    if (nameColIdx === -1) nameColIdx = 1; // Fallback a segunda columna

    const result = [];
    for (let r = 1; r < lines.length; r++) {
      const name = lines[r][nameColIdx];
      if (name && name.trim().length > 1) {
        // Limpiar espacios dobles o formato de nombre
        const cleanName = name.trim().replace(/\s+/g, ' ');
        if (!result.includes(cleanName)) {
          result.push(cleanName);
        }
      }
    }
    return result;
  }

  // --- Normalización de texto (sin tildes, minúsculas) ---
  normalize(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  // --- Event Listeners ---
  bindEvents() {
    // Buscar al presionar Submit o Enter
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSearch();
    });

    // Autocompletado en tiempo real al escribir
    this.nameInput.addEventListener('input', () => {
      this.handleAutocomplete();
    });

    // Ocultar autocompletado al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.searchForm.contains(e.target)) {
        this.closeAutocomplete();
      }
    });

    // Descarga PDF
    this.downloadPdfBtn.addEventListener('click', () => {
      this.downloadPDF();
    });
  }

  // --- Manejo de Autocompletado ---
  handleAutocomplete() {
    const query = this.normalize(this.nameInput.value);
    if (query.length < 2) {
      this.closeAutocomplete();
      return;
    }

    const matches = this.attendees
      .filter(name => this.normalize(name).includes(query))
      .slice(0, 6);

    if (matches.length === 0) {
      this.closeAutocomplete();
      return;
    }

    this.autocompleteList.innerHTML = matches
      .map(name => `<div class="autocomplete-item" data-name="${name}">${this.highlightMatch(name, query)}</div>`)
      .join('');

    this.autocompleteList.classList.add('active');

    // Asignar click a cada item
    const items = this.autocompleteList.querySelectorAll('.autocomplete-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const selectedName = item.getAttribute('data-name');
        this.nameInput.value = selectedName;
        this.closeAutocomplete();
        this.generateCertificate(selectedName);
      });
    });
  }

  highlightMatch(name, query) {
    // Resalta visualmente las coincidencias encontradas
    const normName = this.normalize(name);
    const startIdx = normName.indexOf(query);
    if (startIdx === -1) return name;
    
    // Extraer texto original preservando mayúsculas y tildes
    const matchedPart = name.substring(startIdx, startIdx + query.length);
    return name.replace(matchedPart, `<strong>${matchedPart}</strong>`);
  }

  closeAutocomplete() {
    this.autocompleteList.classList.remove('active');
    this.autocompleteList.innerHTML = '';
  }

  // --- Proceso de Búsqueda ---
  handleSearch() {
    this.closeAutocomplete();
    const query = this.nameInput.value.trim();

    if (!query) {
      this.showStatus('error', 'Por favor ingresa tu nombre completo para buscar.');
      this.certSection.classList.remove('active');
      return;
    }

    const normQuery = this.normalize(query);

    // Búsqueda exacta o parcial inteligente
    let match = this.attendees.find(name => this.normalize(name) === normQuery);

    if (!match) {
      // Intentar coincidencia parcial amplia (ej. ingresó nombre parcial)
      const partialMatches = this.attendees.filter(name => this.normalize(name).includes(normQuery));
      if (partialMatches.length === 1) {
        match = partialMatches[0];
      } else if (partialMatches.length > 1) {
        // Sugerir selecciones
        this.showStatus('error', `Se encontraron ${partialMatches.length} posibles coincidencias. Selecciona tu nombre de la lista de sugerencias mientras escribes.`);
        this.handleAutocomplete();
        this.certSection.classList.remove('active');
        return;
      }
    }

    if (match) {
      this.generateCertificate(match);
    } else {
      this.showStatus('error', `No encontramos a "${query}" en la lista de asistentes registrados. Verifica que esté bien escrito o prueba ingresando tus nombres y apellidos.`);
      this.certSection.classList.remove('active');
    }
  }

  // --- Generación del Certificado ---
  generateCertificate(name) {
    this.currentAttendee = name;
    this.showStatus('success', `✓ ¡Asistencia verificada para ${name}!`);
    this.certSection.classList.add('active');

    // Desplazar suavemente hasta el certificado
    setTimeout(() => {
      this.certSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Renderizar en Canvas
    this.renderCanvas(name);
  }

  // --- Renderizado 2D en Canvas ---
  renderCanvas(name) {
    const ctx = this.canvas.getContext('2d');
    const w = 1200;
    const h = 800;
    const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    ctx.clearRect(0, 0, w, h);

    // 1. Fondo degradado profesional
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0d1a');
    bgGrad.addColorStop(1, '#0e1226');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Rejilla tecnológica sutil
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 60; x < w; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 60; y < h; y += 60) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // 3. Resplandores ambientales en esquinas
    const glowCyan = ctx.createRadialGradient(0, 0, 0, 0, 0, 500);
    glowCyan.addColorStop(0, 'rgba(0, 212, 255, 0.14)');
    glowCyan.addColorStop(1, 'rgba(0, 212, 255, 0)');
    ctx.fillStyle = glowCyan; ctx.fillRect(0, 0, 600, 600);

    const glowPurple = ctx.createRadialGradient(w, h, 0, w, h, 500);
    glowPurple.addColorStop(0, 'rgba(123, 47, 247, 0.14)');
    glowPurple.addColorStop(1, 'rgba(123, 47, 247, 0)');
    ctx.fillStyle = glowPurple; ctx.fillRect(w - 600, h - 600, 600, 600);

    // 4. Marcadores y marco elegante
    const accentGrad = ctx.createLinearGradient(0, 0, w, h);
    accentGrad.addColorStop(0, '#00d4ff');
    accentGrad.addColorStop(1, '#7b2ff7');

    ctx.strokeStyle = accentGrad;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, 45, w - 90, h - 90);

    // Esquinas tecnológicas reforzadas
    const br = 30;
    ctx.lineWidth = 3;
    ctx.strokeStyle = accentGrad;
    ctx.beginPath(); ctx.moveTo(45, 45 + br); ctx.lineTo(45, 45); ctx.lineTo(45 + br, 45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 45 - br, 45); ctx.lineTo(w - 45, 45); ctx.lineTo(w - 45, 45 + br); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(45, h - 45 - br); ctx.lineTo(45, h - 45); ctx.lineTo(45 + br, h - 45); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w - 45 - br, h - 45); ctx.lineTo(w - 45, h - 45); ctx.lineTo(w - 45, h - 45 - br); ctx.stroke();

    // 5. Logotipo institucional
    if (this.logoImg) {
      const maxLogoW = 450;
      const maxLogoH = 135;
      const natW = this.logoImg.naturalWidth || maxLogoW;
      const natH = this.logoImg.naturalHeight || maxLogoH;
      const scale = Math.min(maxLogoW / natW, maxLogoH / natH);
      const dw = natW * scale;
      const dh = natH * scale;
      const dx = (w - dw) / 2;
      const dy = 55 + (maxLogoH - dh) / 2;
      ctx.drawImage(this.logoImg, dx, dy, dw, dh);
    } else {
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px ' + FONT;
      ctx.textAlign = 'center';
      ctx.fillText('TRABAJO CIENTÍFICO', w / 2, 120);
    }

    // 6. Línea divisora superior
    ctx.textBaseline = 'alphabetic';
    const dY = 200;
    const lineGrad = ctx.createLinearGradient(w / 2 - 280, 0, w / 2 + 280, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.5, '#00d4ff');
    lineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(w / 2 - 280, dY); ctx.lineTo(w / 2 + 280, dY); ctx.stroke();

    // Rombo decorativo central
    ctx.save();
    ctx.translate(w / 2, dY);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = accentGrad;
    ctx.fillRect(-4, -4, 8, 8);
    ctx.restore();

    // 7. Texto: CERTIFICADO DE ASISTENCIA
    ctx.fillStyle = '#e4e4e7';
    ctx.font = '600 15px ' + FONT;
    ctx.textAlign = 'center';
    ctx.fillText('C E R T I F I C A D O    D E    A S I S T E N C I A', w / 2, 238);

    // 8. Texto: OTORGADO A
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '600 13px ' + FONT;
    ctx.fillText('O T O R G A D O   A', w / 2, 280);

    // 9. Nombre del participante (color sólido, sin degradado)
    const nameGrad = ctx.createLinearGradient(w / 2 - 260, 0, w / 2 + 260, 0);
    nameGrad.addColorStop(0, '#00d4ff');
    nameGrad.addColorStop(1, '#7b2ff7');

    let nameSize = 48;
    ctx.font = '800 ' + nameSize + 'px ' + FONT;
    while (ctx.measureText(name).width > w - 240 && nameSize > 26) {
      nameSize -= 2;
      ctx.font = '800 ' + nameSize + 'px ' + FONT;
    }
    const nameY = 343;
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, w / 2, nameY);

    // Subrayado estilizado para el nombre
    const nameW = ctx.measureText(name).width;
    ctx.strokeStyle = nameGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - nameW / 2 - 25, nameY + 12);
    ctx.lineTo(w / 2 + nameW / 2 + 25, nameY + 12);
    ctx.stroke();

    // 10. Texto: por su participación activa en
    ctx.fillStyle = '#a0a4b8';
    ctx.font = 'italic 17px ' + FONT;
    ctx.fillText('por su asistencia al taller gratuito de', w / 2, 408);

    // 11. TÍTULO DEL TALLER
    const eventTitle = "AI para la Investigación Científica";
    let titleSize = 36;
    ctx.font = 'bold ' + titleSize + 'px ' + FONT;
    while (ctx.measureText(eventTitle).width > w - 220 && titleSize > 24) {
      titleSize -= 2;
      ctx.font = 'bold ' + titleSize + 'px ' + FONT;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillText(eventTitle, w / 2, 465);

    // 12. Insignia de Horas (Pill Container)
    const badgeText = '1 hora';
    ctx.font = '600 15px ' + FONT;
    const badgeTextW = ctx.measureText(badgeText).width;
    const badgeW = badgeTextW + 65;
    const badgeH = 34;
    const badgeY = 515;
    const badgeX = (w - badgeW) / 2;

    ctx.fillStyle = 'rgba(0, 212, 255, 0.10)';
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 1;
    this.roundRect(ctx, badgeX, badgeY - badgeH / 2, badgeW, badgeH, badgeH / 2);
    ctx.fill();
    ctx.stroke();

    // Icono Reloj en Badge
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(badgeX + 22, badgeY, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(badgeX + 22, badgeY); ctx.lineTo(badgeX + 22, badgeY - 4);
    ctx.moveTo(badgeX + 22, badgeY); ctx.lineTo(badgeX + 25, badgeY);
    ctx.stroke();

    // Texto de Badge
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(badgeText, badgeX + 38, badgeY + 1);
    ctx.textBaseline = 'alphabetic';

    // 12b. Fecha de realización del taller
    ctx.fillStyle = '#a0a4b8';
    ctx.font = 'italic 15px ' + FONT;
    ctx.textAlign = 'center';
    ctx.fillText('Taller realizado el 28 de julio de 2026', w / 2, 575);

    // 13. Firmas digitales al pie (Izquierda y Derecha)
    const sigY = 665;
    const leftCx = 260;
    const rightCx = w - 260;
    const lineHalf = 110;

    // Líneas de firma
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(leftCx - lineHalf, sigY); ctx.lineTo(leftCx + lineHalf, sigY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rightCx - lineHalf, sigY); ctx.lineTo(rightCx + lineHalf, sigY); ctx.stroke();

    ctx.textAlign = 'center';

    // Firma Izquierda — Oscar Ivan Vargas Pineda
    ctx.fillStyle = nameGrad;
    ctx.font = 'italic bold 26px "Segoe Script", "Brush Script MT", cursive';
    ctx.fillText('Oscar I. Vargas', leftCx, sigY - 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px ' + FONT;
    ctx.fillText('Oscar Ivan Vargas Pineda', leftCx, sigY + 22);
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '11px ' + FONT;
    ctx.fillText('CEO  ·  Trabajo Científico', leftCx, sigY + 38);

    // Firma Derecha — Lali Valentina Pedroza
    ctx.fillStyle = nameGrad;
    ctx.font = 'italic bold 26px "Segoe Script", "Brush Script MT", cursive';
    ctx.fillText('Lali V. Pedroza', rightCx, sigY - 8);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px ' + FONT;
    ctx.fillText('Lali Valentina Pedroza', rightCx, sigY + 22);
    ctx.fillStyle = '#8b8fa3';
    ctx.font = '11px ' + FONT;
    ctx.fillText('Gestora Educativa  ·  Trabajo Científico', rightCx, sigY + 38);

    // 14. Fecha de emisión al centro inferior
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    const issueDate = `Emitido el ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
    ctx.fillStyle = '#a0a4b8';
    ctx.font = '11px ' + FONT;
    ctx.fillText(issueDate.toUpperCase(), w / 2, h - 60);
  }

  // Utilidad de rectángulo redondeado
  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // --- Descarga como PDF ---
  async downloadPDF() {
    if (!this.currentAttendee) return;
    this.downloadPdfBtn.disabled = true;
    this.downloadPdfBtn.textContent = '⏳ Generando PDF...';

    try {
      // Cargar jsPDF si no estuviera disponible globalmente
      let jsPDFClass = window.jspdf ? window.jspdf.jsPDF : null;
      if (!jsPDFClass) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('No se pudo cargar la librería jsPDF'));
          document.head.appendChild(script);
        });
        jsPDFClass = window.jspdf.jsPDF;
      }

      // Convertir Canvas a Imagen JPEG de alta calidad
      const imgData = this.canvas.toDataURL('image/jpeg', 0.95);
      const pdf = new jsPDFClass({
        orientation: 'landscape',
        unit: 'pt',
        format: [1200, 800],
        // El PDF se abre sin contraseña, pero editarlo requiere la contraseña de propietario.
        encryption: {
          userPassword: '',
          ownerPassword: '0603',
          userPermissions: ['print', 'copy']
        }
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 1200, 800, undefined, 'FAST');

      const safeName = this.currentAttendee.replace(/\s+/g, '_');
      pdf.save(`Certificado_Asistencia_${safeName}_AI_Investigacion.pdf`);
    } catch (err) {
      console.error('Error al generar PDF:', err);
      alert('Ocurrió un error al generar el archivo PDF: ' + err.message);
    } finally {
      this.downloadPdfBtn.disabled = false;
      this.downloadPdfBtn.textContent = '📄 Descargar PDF';
    }
  }

  // --- Gestión de Mensajes de Estado ---
  showStatus(type, message) {
    this.statusContainer.style.display = 'block';
    let content = '';

    if (type === 'loading') {
      content = `
        <div class="status-msg status-loading">
          <div class="spinner"></div>
          <span>${message}</span>
        </div>`;
    } else if (type === 'error') {
      content = `
        <div class="status-msg status-error">
          <span>⚠️</span>
          <span>${message}</span>
        </div>`;
    } else if (type === 'success') {
      content = `
        <div class="status-msg status-success">
          <span>✅</span>
          <span>${message}</span>
        </div>`;
    }
    this.statusContainer.innerHTML = content;
  }

  hideStatus() {
    this.statusContainer.style.display = 'none';
    this.statusContainer.innerHTML = '';
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new CertificateApp();
});
