# Viewlytics Project Conversation & Development History

This document consolidates all context, architectural decisions, and progress from the previous development sessions so that any active session has full continuity.

---

## 1. Quick Navigation Links
- **Previous Full Conversation**: [Open Conversation e5c9f38e](conversation://e5c9f38e-4dc2-4a9f-9375-b8cad9f52f8f)
- **Previous Session (Brain / Storage)**: [Open Conversation 13c4cd58](conversation://13c4cd58-00d9-4b14-abdc-9ad17862e4ec)
- **Reference Clean Cloud Codebase**: [`D:\Viewlytics_Cloud_Clean`](file:///D:/Viewlytics_Cloud_Clean)
- **Active Local Codebase**: [`D:\Viewlytics`](file:///D:/Viewlytics)

---

## 2. Key Milestones & Context from Previous Conversation

### A. Mobile App Updates
- **Native Share & Visit Proof**:
  - Implemented offscreen rendering and bitmap generation for share cards.
  - Native Android share intent integration in `NativeShareModule.java`.
  - Android build configurations, ProGuard rules, and release keystore setup.
- **Check-In & Home Screen Enhancements**:
  - Store check-in flows, attendance verification, and today's activity screens.

---

### B. Cloud Baseline vs. Local Codebase Audit
A byte-level inspection of the production bundle (`https://viewlytics.in/static/js/main.3fddaafb.js`) revealed key discrepancies in the local navigation:

1. **Missing 19 Reports on Local**:
   - Live production has 19 active reports:
     1. Attendance (`/attendance`)
     2. Share Of Shelf (`/shair-of-shelf`)
     3. Out Of Stock (`/out-of-stock`)
     4. Sales Analysis (`/sales-analysis`)
     5. DSR (`/dsr-report`)
     6. Opening Inventory (`/opening-inventory`)
     7. Closing Inventory (`/closing-inventory`)
     8. New Inventory (`/new-inventory`)
     9. Market Intelligence (`/market-intelligence`)
     10. Checkin-Checkout (`/user-checkinfo`)
     11. Assets Tracking (`/assets-tracking`)
     12. Shopper Engagement (`/shopper-engagement`)
     13. Promo (`/promo-report`)
     14. TL Report (`/tl-report`)
     15. Competition Brand (`/competition_brand`)
     16. Home Leave (`/homeleave-report`)
     17. Place Visit (`/placevisit-report`)
     18. Order Request (`/order-request`)
     19. Checkin Activity (`/checkin-activity`)
   - Local had reduced this to only 1 report (Attendance).

2. **Dashboard Sub-Items**:
   - Production has an expandable Dashboard menu with 5 sub-items:
     - Attendance Analysis (`/attendanceanalysis`)
     - Share of Shelf (`/shareofshelf`)
     - OOS Analysis (`/oos-analysis`)
     - Sales Analysis (`/salesanalysis`)
     - Merchandising (`/merchandising`)

3. **Unwanted Map Module**:
   - Live production did NOT include Map in the default NPM menu.
   - Local code had injected `{ label: 'Map', to: '/map' }`.

---

### C. Executive Dashboard Implementation (Isolated Modular Pattern)
To satisfy the requirement that **no existing dashboard or report code is modified** and **no database schema changes are made**:

1. **Backend Controller**:
   - Path: [`backend/app/web/controllers/executive_dashboard.controller.js`](file:///D:/Viewlytics/backend/app/web/controllers/executive_dashboard.controller.js)
   - Scope hierarchy rules based on `role_id`:
     - `role_id: 2` (NPM / IDO NPM) -> full universe
     - `role_id: 3` (ASM) -> scoped to ASM users/zones
     - `role_id: 4` (TL) -> scoped to Team Leader's merchandisers
     - `role_id: 7` (TA) -> scoped to TA territory
     - `role_id: 9-11` (Client roles) -> scoped to client projects
   - Metrics calculated (strictly `SELECT` read-only):
     - Attendance %
     - Today Check-Ins
     - Total Active Users
     - Not Login Count
     - Promoter vs Team Leader Breakdown
     - Status submission list with pagination and search

2. **Backend Routes**:
   - Mounted in [`backend/app/web/routes/index.js`](file:///D:/Viewlytics/backend/app/web/routes/index.js):
     - `GET /api/v1/web/executive/attendance-summary`
     - `GET /api/v1/web/executive/attendance-submissions`
     - `GET /api/v1/web/executive/filter-options`

3. **Frontend Component**:
   - Path: [`frontend/src/views/pages/userPages/ExecutiveDashboard.js`](file:///D:/Viewlytics/frontend/src/views/pages/userPages/ExecutiveDashboard.js)
   - Features:
     - 4 KPI metric cards (Attendance %, Today Check-in, Total Active, Not Logged In)
     - Breakdown cards for Promoters and Team Leaders
     - Interactive filter bar (State, City, Chain, Store, Date)
     - Full data table with user hierarchy scoping, status badges, and CSV export
   - Routed in [`frontend/src/App.js`](file:///D:/Viewlytics/frontend/src/App.js):
     - User routes: `/executive-dashboard` and `/dashboard2`
     - Admin route: `/admin/executive-dashboard`

---

### D. Clean Reference Baseline
- Pristine cloud repo extracted into [`D:\Viewlytics_Cloud_Clean`](file:///D:/Viewlytics_Cloud_Clean) on branch `feature/executive-dashboard-cloud-clean`.
- Verified running on:
  - Backend: Port 5000 (`http://localhost:5000`)
  - Frontend: Port 3000 (`http://localhost:3000/executive-dashboard`)
