const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

// CORS — allow same-origin (frontend served from this server) and local dev
app.use(cors());
app.use(express.json());

// Serve frontend static files from the project root (exclude backend folder)
const frontendPath = path.resolve(__dirname, '..');
app.use('/css', express.static(path.join(frontendPath, 'css')));
app.use('/js', express.static(path.join(frontendPath, 'js')));
app.use(express.static(frontendPath, {
  index: 'index.html',
  dotfiles: 'ignore',
}));

// ---- Rate Limiting (sin dependencias extra) ----
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX = 15; // 15 peticiones por minuto por IP

function rateLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.ip;
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, start: now };
    return next();
  }

  if (now - rateLimit[ip].start > RATE_LIMIT_WINDOW) {
    rateLimit[ip] = { count: 1, start: now };
    return next();
  }

  rateLimit[ip].count++;
  if (rateLimit[ip].count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' });
  }
  next();
}

// Clean up rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const ip in rateLimit) {
    if (now - rateLimit[ip].start > RATE_LIMIT_WINDOW) delete rateLimit[ip];
  }
}, 5 * 60 * 1000);

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: La variable de entorno GEMINI_API_KEY no esta definida.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);

// Health check endpoint (para que Render pueda verificar que el server esta vivo)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Endpoint for chat
app.post('/api/chat', rateLimiter, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El campo "prompt" es requerido.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error("Error al contactar la API de Gemini:", error.message);
    res.status(500).json({ error: 'Hubo un error al procesar tu solicitud.' });
  }
});

// Fallback: serve index.html for any non-API route (SPA support)
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Frontend: http://localhost:${port}`);
  console.log(`API:      http://localhost:${port}/api/chat`);
});
