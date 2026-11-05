# Viewlytics - Modular Frontend Development (`modular-dev`)

This branch contains the **Modular React Frontend** codebase for Viewlytics, extracted and organized into maintainable React components, SCSS styles, Redux state, and routes.

---

## 🌿 Branch Info
- **Branch**: `modular-dev`
- **Source**: `D:\Viewlytics_AWS_Modular`
- **Default Port**: `3002` (via `live_server.js` or React dev server)
- **API Proxy**: Proxies `/api` requests to backend on port `5000`

---

## 📁 Directory Structure
```
frontend/
├── build/                # Compiled production build
├── public/               # Static HTML & assets
├── src/
│   ├── assets/           # SCSS, images, themes
│   ├── components/       # Reusable UI components
│   ├── layout/           # App topbar, menu, footer
│   ├── redux/            # State management slices & store
│   ├── services/         # API service helpers
│   ├── views/            # Screen views & dashboards
│   ├── App.js            # Main application router
│   └── index.js          # React DOM entry point
└── package.json
live_server.js            # Express proxy & static server
```

---

## 🚀 Running the Modular App

### Option A: Using the Live Proxy Server (Port 3002)
```bash
node live_server.js
```
Visit: [http://localhost:3002](http://localhost:3002)

### Option B: Development Mode with Hot Reload
```bash
cd frontend
npm install
npm start
```

### Building the Modular Frontend
```bash
cd frontend
npm run build
```
The build outputs to `frontend/build`, which is automatically served by `live_server.js`.
