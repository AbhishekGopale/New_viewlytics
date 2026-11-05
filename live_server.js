const express = require('./backend/node_modules/express');
const http = require('http');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

// Proxy /api requests to backend on port 5000
app.use('/api', (req, res) => {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api' + req.url,
    method: req.method,
    headers: { ...req.headers }
  };
  delete options.headers.host;

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('API Proxy Error:', err.message);
    if (!res.headersSent) {
      res.status(502).json({ statusCode: 502, message: 'Backend unreachable on port 5000' });
    }
  });

  req.pipe(proxyReq);
});

// Serve static assets from frontend
app.use(express.static(FRONTEND_DIR));

// SPA catch-all: send index.html for all client-side routes (/dashboard, /attendance, /executive-dashboard, etc.)
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🚀 Viewlytics Authentic AWS Production Frontend`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  API Proxy: http://localhost:${PORT}/api -> http://localhost:5000/api`);
  console.log(`  Root: ${FRONTEND_DIR}`);
  console.log(`====================================================`);
});
