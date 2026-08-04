/* ============================================
   AI Assistant (Gemini)
   ============================================ */

// API URL: same origin (backend serves frontend)
const API_URL = window.location.origin;

const AI = {
  // DOM Elements
  fab: null,
  modal: null,
  closeBtn: null,
  overlay: null,
  form: null,
  input: null,
  messagesContainer: null,
  submitBtn: null,
  suggestionsContainer: null,

  // State
  isOpen: false,
  isThinking: false,
  isFullscreen: false,
  isLightTheme: false,
  _lastCodeBlocks: [],
  _chatHistory: [], // { sender, text }

  // Default suggestions per context
  SUGGESTIONS: {
    dashboard: [
      'De que trata este curso?',
      'Por donde empiezo a aprender?',
      'Que herramientas necesito?',
      'Dame consejos para este curso',
    ],
    lesson: [
      'Explicame este tema con un ejemplo',
      'Dame un codigo de ejemplo',
      'No entiendo, puedes simplificarlo?',
      'Que errores comunes debo evitar?',
    ],
  },

  // ---- Init ----
  init() {
    this.fab = document.getElementById('ai-fab');
    this.modal = document.getElementById('ai-chat-modal');
    this.closeBtn = document.getElementById('ai-chat-close');
    this.overlay = document.getElementById('ai-chat-overlay');
    this.form = document.getElementById('ai-chat-form');
    this.input = document.getElementById('ai-chat-input');
    this.messagesContainer = document.getElementById('ai-chat-messages');
    this.submitBtn = document.getElementById('ai-chat-submit');
    this.suggestionsContainer = document.getElementById('chat-suggestions');

    if (!this.fab) return;

    this.loadThemePreference();
    this.bindEvents();
    this.addMessage('ai', 'Hola! Soy tu asistente de IA. Preguntame cualquier duda que tengas sobre la leccion actual.');
    this.renderSuggestions();
  },

  // ---- Event Binding ----
  bindEvents() {
    this.fab.addEventListener('click', () => this.toggleChat(true));
    this.closeBtn.addEventListener('click', () => this.toggleChat(false));
    this.overlay.addEventListener('click', () => this.toggleChat(false));
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });

    // Theme toggle
    const themeBtn = document.getElementById('ai-chat-theme');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    // Export
    const exportBtn = document.getElementById('ai-chat-export');
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportConversation());

    // Fullscreen
    const fsBtn = document.getElementById('ai-chat-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    // Resize handle
    this.initResize();
  },

  // ---- Toggle Chat ----
  toggleChat(show) {
    this.isOpen = show;
    if (show) {
      this.modal.classList.remove('hidden');
      this.overlay.classList.remove('hidden');
      this.fab.classList.add('hidden');
      this.input.focus();
      this.renderSuggestions();
    } else {
      this.modal.classList.add('hidden');
      this.overlay.classList.add('hidden');
      this.fab.classList.remove('hidden');
    }
  },

  // ---- Send Message ----
  sendMessage(text) {
    const question = text || this.input.value.trim();
    if (!question || this.isThinking) return;

    this.addMessage('user', question);
    this._chatHistory.push({ sender: 'user', text: question });
    this.input.value = '';
    this.input.focus();
    this.hideSuggestions();

    this.setThinking(true);
    this.getAIResponse(question);
  },

  // ---- Add Message ----
  addMessage(sender, text, isHTML = false) {
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    if (isHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }
    messageEl.appendChild(bubble);

    this.messagesContainer.appendChild(messageEl);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return bubble;
  },

  // ---- Typewriter Effect ----
  typewriterEffect(htmlContent, callback) {
    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message ai';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    messageEl.appendChild(bubble);
    this.messagesContainer.appendChild(messageEl);

    // Parse HTML into a temporary element to get nodes
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;

    // For code blocks and complex HTML, we add node by node
    const nodes = Array.from(temp.childNodes);
    let nodeIndex = 0;

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    bubble.appendChild(cursor);

    const addNextNode = () => {
      if (nodeIndex >= nodes.length) {
        cursor.remove();
        if (callback) callback();
        return;
      }

      const node = nodes[nodeIndex];
      nodeIndex++;

      if (node.nodeType === Node.TEXT_NODE) {
        // Type text character by character
        const text = node.textContent;
        let charIndex = 0;
        const textNode = document.createTextNode('');
        bubble.insertBefore(textNode, cursor);

        const typeChar = () => {
          if (charIndex < text.length) {
            textNode.textContent += text[charIndex];
            charIndex++;
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            setTimeout(typeChar, 12);
          } else {
            addNextNode();
          }
        };
        typeChar();
      } else if (node.nodeName === 'PRE' || node.nodeName === 'DIV' && node.classList.contains('code-block-header')) {
        // Insert code blocks instantly
        bubble.insertBefore(node.cloneNode(true), cursor);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        setTimeout(addNextNode, 50);
      } else {
        // For p, ul, strong, etc. - type inner text within the element
        const el = document.createElement(node.nodeName);
        // Copy attributes
        if (node.attributes) {
          for (const attr of node.attributes) {
            el.setAttribute(attr.name, attr.value);
          }
        }
        bubble.insertBefore(el, cursor);

        const innerHTML = node.innerHTML;
        // If it contains child elements (like <strong>, <code>), insert directly
        if (node.children && node.children.length > 0) {
          el.innerHTML = '';
          const innerText = node.textContent;
          let iChar = 0;
          const typeInner = () => {
            if (iChar < innerText.length) {
              // Gradually reveal by setting innerHTML up to a ratio
              const ratio = (iChar + 1) / innerText.length;
              el.innerHTML = innerHTML.substring(0, Math.ceil(innerHTML.length * ratio));
              iChar += 2;
              this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
              setTimeout(typeInner, 10);
            } else {
              el.innerHTML = innerHTML;
              addNextNode();
            }
          };
          typeInner();
        } else {
          // Plain text inside element
          const plainText = node.textContent;
          let pChar = 0;
          const typePlain = () => {
            if (pChar < plainText.length) {
              el.textContent += plainText[pChar];
              pChar++;
              this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
              setTimeout(typePlain, 12);
            } else {
              addNextNode();
            }
          };
          typePlain();
        }
      }
    };

    addNextNode();
  },

  // ---- Thinking Indicator ----
  setThinking(isThinking) {
    this.isThinking = isThinking;
    this.submitBtn.disabled = isThinking;
    this.input.disabled = isThinking;

    const typingIndicator = document.getElementById('typing-indicator');
    if (isThinking && !typingIndicator) {
      const indicator = document.createElement('div');
      indicator.id = 'typing-indicator';
      indicator.className = 'chat-message ai';
      indicator.innerHTML = `
        <div class="chat-bubble">
          <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
        </div>
      `;
      this.messagesContainer.appendChild(indicator);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    } else if (!isThinking && typingIndicator) {
      typingIndicator.remove();
    }
  },

  // ---- Gemini API Call ----
  async getAIResponse(question) {
    const lessonContext = this.getLessonContext();
    const prompt = `
      Contexto: El usuario esta en el curso "${COURSE_DATA.title}" - ${COURSE_DATA.subtitle}.
      Actualmente esta viendo la leccion: "${lessonContext}".

      Pregunta del usuario: "${question}"

      Por favor, responde a la pregunta del usuario de forma clara y concisa, como un tutor amigable.
      Si la pregunta no esta relacionada con el tema del curso, amablemente indicalo.
      Cuando incluyas codigo, usa bloques con triple backtick y el nombre del lenguaje.
      Utiliza formato markdown (negritas con **, listas con -, codigo inline con backticks).
    `;

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      const data = await response.json();
      const formattedResponse = this.formatAIResponse(data.response);

      this.setThinking(false);
      this._chatHistory.push({ sender: 'ai', text: data.response });

      // Typewriter effect
      this.typewriterEffect(formattedResponse, () => {
        this.renderSuggestions();
      });

    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      this.setThinking(false);
      this.addMessage('ai', 'Lo siento, no pude conectarme con el asistente de IA. Asegurate de que el servidor backend este funcionando. (Inicialo con node backend/server.js)');
      this.renderSuggestions();
    }
  },

  // ---- Format AI Response ----
  formatAIResponse(text) {
    const codeBlocks = [];
    let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const index = codeBlocks.length;
      codeBlocks.push(code.trim());
      return `__CODEBLOCK_${index}__`;
    });

    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    const lines = html.split('\n');
    let result = '';
    let inList = false;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) { result += '<ul>'; inList = true; }
        result += `<li>${trimmed.substring(2)}</li>`;
      } else {
        if (inList) { result += '</ul>'; inList = false; }
        if (trimmed) result += `<p>${trimmed}</p>`;
      }
    });
    if (inList) result += '</ul>';

    codeBlocks.forEach((code, i) => {
      const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const langMatch = text.match(new RegExp('```(\\w+)\\n'));
      const lang = langMatch ? langMatch[1] : 'codigo';
      const header = `<div class="code-block-header"><span>${lang}</span><button class="copy-code-btn" onclick="AI.copyCode(${i})">Copiar</button></div>`;
      result = result.replace(
        new RegExp(`(<p>)?__CODEBLOCK_${i}__(<\\/p>)?`),
        `${header}<pre><code>${escapedCode}</code></pre>`
      );
    });

    this._lastCodeBlocks = codeBlocks;

    if (!result.includes('<p>') && !result.includes('<ul>') && !result.includes('<pre>')) {
      result = `<p>${result}</p>`;
    }
    return result;
  },

  // ---- Copy Code ----
  copyCode(index) {
    if (this._lastCodeBlocks && this._lastCodeBlocks[index] !== undefined) {
      navigator.clipboard.writeText(this._lastCodeBlocks[index]).then(() => {
        const btns = document.querySelectorAll('.copy-code-btn');
        btns.forEach(btn => {
          if (btn.getAttribute('onclick') === `AI.copyCode(${index})`) {
            const original = btn.textContent;
            btn.textContent = 'Copiado!';
            setTimeout(() => btn.textContent = original, 2000);
          }
        });
      });
    }
  },

  // ---- Quick Suggestions ----
  renderSuggestions() {
    if (!this.suggestionsContainer) return;
    const context = (typeof App !== 'undefined' && App.state.currentView === 'lesson') ? 'lesson' : 'dashboard';
    const suggestions = this.SUGGESTIONS[context];

    this.suggestionsContainer.innerHTML = '';
    suggestions.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'chat-suggestion-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => this.sendMessage(text));
      this.suggestionsContainer.appendChild(btn);
    });
  },

  hideSuggestions() {
    if (this.suggestionsContainer) this.suggestionsContainer.innerHTML = '';
  },

  // ---- Resize Chat ----
  initResize() {
    const handle = document.getElementById('chat-resize-handle');
    if (!handle) return;

    let startY, startHeight;

    const onMouseMove = (e) => {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = startY - clientY;
      const newHeight = Math.min(Math.max(startHeight + delta, 300), window.innerHeight - 20);
      this.modal.style.height = newHeight + 'px';
      this.modal.style.maxHeight = newHeight + 'px';
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
      document.body.style.userSelect = '';
    };

    const onMouseDown = (e) => {
      if (this.isFullscreen) return;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      startHeight = this.modal.offsetHeight;
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
    };

    handle.addEventListener('mousedown', onMouseDown);
    handle.addEventListener('touchstart', onMouseDown);
  },

  // ---- Fullscreen ----
  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.modal.classList.toggle('chat-fullscreen', this.isFullscreen);

    const btn = document.getElementById('ai-chat-fullscreen');
    if (btn) {
      btn.innerHTML = this.isFullscreen
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>';
    }

    if (!this.isFullscreen) {
      this.modal.style.height = '';
      this.modal.style.maxHeight = '';
    }
  },

  // ---- Theme Toggle ----
  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    this.modal.classList.toggle('chat-light', this.isLightTheme);
    localStorage.setItem('ai_chat_theme', this.isLightTheme ? 'light' : 'dark');

    const btn = document.getElementById('ai-chat-theme');
    if (btn) {
      btn.innerHTML = this.isLightTheme
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  },

  loadThemePreference() {
    const saved = localStorage.getItem('ai_chat_theme');
    if (saved === 'light') {
      this.isLightTheme = true;
      this.modal.classList.add('chat-light');
    }
  },

  // ---- Export Conversation ----
  exportConversation() {
    if (this._chatHistory.length === 0) return;

    let content = `=== Conversacion con Asistente IA - ${COURSE_DATA.title} ===\n`;
    content += `Fecha: ${new Date().toLocaleString('es-ES')}\n`;
    content += '='.repeat(50) + '\n\n';

    this._chatHistory.forEach(msg => {
      const label = msg.sender === 'user' ? 'Tu' : 'IA';
      content += `[${label}]:\n${msg.text}\n\n`;
    });

    content += '='.repeat(50) + '\n';
    content += `Exportado desde Trabajo Científico - ${COURSE_DATA.title}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-ia-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // ---- Lesson Context ----
  getLessonContext() {
    if (typeof App !== 'undefined' && App.state.currentView === 'lesson') {
      try {
        const mod = COURSE_DATA.modules[App.state.currentModuleIndex];
        const lesson = mod.lessons[App.state.currentLessonIndex];
        return lesson.title;
      } catch (e) {
        return "una leccion del curso";
      }
    }
    return "el dashboard o una vista general";
  }
};
