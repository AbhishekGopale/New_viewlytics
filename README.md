# Viewlytics - Enterprise Analytics Platform

Welcome to the **New Viewlytics** repository. This repository organizes the production-ready code, the modular development source code, and historical legacy archives.

---

## 🌿 Repository Branch Architecture

This repository uses a **Multi-Branch Strategy** to maintain clean, isolated environments:

| Branch | Description | Primary Port | Source Folder |
| :--- | :--- | :--- | :--- |
| **`main`** *(Active)* | **Live AWS Production Build**: Full working production frontend & backend. Verified with updated branding, logo sizing, and login styling. | `3000` (Frontend)<br>`5000` (Backend) | `D:\Viewlytics_AWS_Production` |
| **`modular-dev`** | **Modular React Frontend**: Full modular unbundled source (`src/views`, `src/components`, SCSS) for development and refactoring. | `3002` (Frontend) | `D:\Viewlytics_AWS_Modular` |
| **`legacy-archive`** | **Legacy GitLab Archive**: Original codebase preserving git history and mobile application folders. | N/A | `D:\Viewlytics` |

---

## 🚀 Quick Start (Production - Port 3000)

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **MySQL Database**: AWS RDS MySQL instance

### 2. Backend Setup (Port 5000)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
node server.js
```
The backend will connect to MySQL and listen on port `5000`.

### 3. Frontend & Live Server (Port 3000)
```bash
# From project root
node live_server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser:
- **Login**: `http://localhost:3000/web/login`
- **Dashboard**: `http://localhost:3000/dashboard`
- **Attendance Analysis**: `http://localhost:3000/attendanceanalysis`

---

## 🎨 Recent Enhancements in this Build
- **Brand Identity**: High-resolution IDONNEOUS branding scaled and centered with zero clipping.
- **Header Logo (`#app-logo`)**: Proportional `2.35rem` height with `object-fit: contain` and safe margin headroom inside the topbar.
- **Footer Logo (`#footer-logo`)**: Cleanly sized `1.85rem` height inside the bottom bar.
- **Input Spacing**: Expanded separation (~22px clear whitespace) between the lock icon and password dots on the login page.
