# Viewlytics — Zero-Loss Upgrade & Action Plan

## 1. Core Principle & Objective

> [!IMPORTANT]
> **The Golden Rule**: The existing cloud-deployed application functionality must remain **100% intact**. 
> - **Nothing from the original application is removed, replaced, or altered.**
> - **The Executive Dashboard is strictly an addition**, coexisting seamlessly alongside the original Dashboard and all original Reports.
> - **`D:\Viewlytics_Cloud_Clean`** remains the read-only golden reference.
> - **`viewlytics mobile app`** is strictly off-limits (zero modifications).
> - All work is performed strictly within **`D:\Viewlytics`** (Frontend & Backend only).

---

## 2. Role-by-Role Comparison Matrix (Previous Chart & Target State)

This table defines the exact navigation and feature mapping across all user roles, comparing the **Live Cloud Production (`viewlytics.in`)** baseline against the **Upgraded `D:\Viewlytics`**:

| Role / User Type | Live Cloud Production (`viewlytics.in`) | Upgraded Target State (`D:\Viewlytics`) | Exact Delta / Impact |
| :--- | :--- | :--- | :--- |
| **NPM & ASM (`role_id: 2, 3`)** | • **Dashboard** (5 sub-items):<br>&nbsp;&nbsp;1. Attendance Analysis<br>&nbsp;&nbsp;2. Share of Shelf<br>&nbsp;&nbsp;3. OOS Analysis<br>&nbsp;&nbsp;4. Sales Analysis<br>&nbsp;&nbsp;5. Merchandising<br>• **NO Map module**<br>• **Reports** (19 original reports) | • **Dashboard** (5 original sub-items intact)<br>• **Executive Dashboard** *(NEW)*<br>• **NO Map module**<br>• **Reports** (19 original reports intact) | ✅ **100% Original Preserved** + Executive Dashboard added cleanly as a distinct link. |
| **Team Leader (`role_id: 4`)** | • **Dashboard** (5 original sub-items)<br>• **Map module** (`/map`)<br>• **Reports** (19 original reports) | • **Dashboard** (5 original sub-items intact)<br>• **Executive Dashboard** *(NEW)*<br>• **Map module** (`/map` intact)<br>• **Reports** (19 original reports intact) | ✅ **100% Original Preserved** + Executive Dashboard added. Map retained. |
| **Client Roles (`role_id: 9, 10, 11`)** | • **Dashboard** (`/client/dashboard`)<br>• **Map module** (`/map`)<br>• **Reports** (19 original reports) | • **Dashboard** (`/client/dashboard` intact)<br>• **Executive Dashboard** *(NEW)*<br>• **Map module** (`/map` intact)<br>• **Reports** (19 original reports intact) | ✅ **100% Original Preserved** + Executive Dashboard added. All 19 reports restored. |
| **Admin (`role_id: 1`)** | • **Dashboard** (`/admin/dashboard`)<br>• **Projects, Chain, Stores, Store Assign**<br>• **Master SKU, Target, Planner**<br>• **Promos Availability, Settings, Users** | • **Dashboard** (`/admin/dashboard` intact)<br>• **Executive Dashboard** (`/admin/executive-dashboard` *(NEW)*)<br>• **Projects, Chain, Stores, Store Assign**<br>• **Master SKU, Target, Planner**<br>• **Promos Availability, Settings, Users** | ✅ **100% Original Preserved** + Executive Dashboard added. Fixed syntax double-comma. |
| **Sub-Admin (`role_id: 8`)** | • Dynamic menu based on `role_permission` (`subAdminMenu`) | • Dynamic menu based on `role_permission` (`subAdminMenu` intact) | ✅ **100% Original Preserved**. |

---

## 3. Detailed Footprint Breakdown in `D:\Viewlytics`

To ensure transparency, every file affected in `D:\Viewlytics` is classified into three distinct categories:

### Category 1: Untouched Original Code (0 Changes)
- **Original Dashboard Views**: `DashboardUi.js`, `WebDashboard.js`.
- **Original Report Views**: `AttendanceAnalysis.js`, `OssReport.js`, `ShairOfShell.js`, `SalesAnalysis.js`, `Merchandise.js`.
- **Mobile Application**: Entire `viewlytics mobile app/` directory remains completely untouched.
- **Database Schema**: 0 table alterations, 0 migrations. Strictly read-only queries.

### Category 2: Purely New Modular Additions (The New Feature)
- **Frontend**: `frontend/src/views/pages/userPages/ExecutiveDashboard.js`
  - 4 KPI metric cards (Attendance %, Today Check-in, Total Active, Not Logged In).
  - Breakdown cards for Promoters and Team Leaders.
  - Interactive filter dialog (Zone, State, City, Chain, TL).
  - Scoped data table with pagination and Excel/CSV export.
- **Backend**: `backend/app/web/controllers/executive_dashboard.controller.js`
  - User-hierarchy scoping engine (`role_id: 2` NPM, `3` ASM, `4` TL, `7` TA, `9-11` Client).
  - Computes scoped attendance summary, daily submissions list, and dynamic filter dropdown options.

### Category 3: Minimal Wiring & Build Compatibility Fixes
- **Backend Routing**: `backend/app/web/routes/index.js`
  - Adds 3 lines to mount:
    - `/api/v1/web/executive/attendance-summary`
    - `/api/v1/web/executive/attendance-submissions`
    - `/api/v1/web/executive/filter-options`
- **Frontend Routing & Menu**: `frontend/src/App.js`
  - Registers routes `/executive-dashboard` and `/admin/executive-dashboard`.
  - Places "Executive Dashboard" link alongside the original Dashboard in the menu.
  - Mounts `/client/dashboard` route.
- **Webpack Compatibility Fixes (Solving the 13 Build Errors)**:
  - `frontend/src/redux/slice/AdminSlice/chainSlice.js`: Exports `ImageUploadRequest` and `handleResetMessage`.
  - `frontend/src/service/api.js`: Exports missing aliases (`chainImageUploadAPI`, `getUserRoleByNameAPI`, `MultipalDeleteTargetAPI`, etc.).
  - `frontend/src/index.js`: Resolves store export so `react-scripts` compiles with 0 errors.

---

## 4. Phased Execution Roadmap

1. **Phase 1: Pre-Execution Safety Snapshot**: Confirm Git status and verify backup branch.
2. **Phase 2: Backend Verification & RDS Connection**: Start backend on port `5000` and confirm live RDS connectivity.
3. **Phase 3: Frontend Menu & Route Precision**: Ensure exact role menus match production with Executive Dashboard added.
4. **Phase 4: Webpack Compilation & Zero-Error Build**: Start frontend on port `3000` with 0 compilation errors.
5. **Phase 5: Multi-Role Live Runtime Verification**: Test live logins, original dashboards, original reports, and the Executive Dashboard.
6. **Phase 6: Final Sign-Off**: Review diffs and create clean Git commit.

---

## 5. Verification Checklist

- [ ] `D:\Viewlytics_Cloud_Clean` has 0 changes (clean reference intact).
- [ ] `viewlytics mobile app/` has 0 changes (mobile codebase untouched).
- [ ] Backend runs on port `5000` and connects to AWS RDS with HTTP 200 OK.
- [ ] Frontend compiles with 0 errors and runs on port `3000`.
- [ ] Original Dashboard opens and functions normally.
- [ ] Original Reports section is fully intact with all 19 reports.
- [ ] Executive Dashboard opens independently and displays scoped live data.
- [ ] All user roles (Admin, NPM, ASM, TL, Client) have accurate menus.
