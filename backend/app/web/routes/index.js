const router = require("express").Router();
const dashbaordController = require("../controllers/dashboard")
const attendanceController = require("../controllers/attendance.controller")
const sosController = require("../controllers/sos_controller")

const mapController = require('../controllers/map_controller')
const sidebarController = require("../controllers/sidebar")
const userController = require("../controllers/user_controller")
const ossController = require("../controllers/oss_controller.js")
const salesController = require("../controllers/sales_analysis.controller.js")
const merchadisingImageController = require("../controllers/merchandising.controller.js")
const executiveDashboardController = require("../controllers/executive_dashboard.controller.js")


const {
    ensureAuthenticateNPM, ensureAuthenticateWeb, ensureAuthenticateforW_A, ensureAuthenticateforW_A_Logout, ensureAuthenticateAdmin
} = require("../../../helper/guard");

// Web Dashboard Live Route
router.post('/dashboard', ensureAuthenticateWeb, dashbaordController.getLiveWebDashboard);
router.post('/dashboard_target', ensureAuthenticateWeb, dashbaordController.getDashboardTarget);
router.post('/dashboard_sos', ensureAuthenticateWeb, dashbaordController.getDashboardSos);
router.post('/dashboard_oss_v2', ensureAuthenticateWeb, dashbaordController.getDashboardOssV2);
router.get('/user/list', ensureAuthenticateWeb, dashbaordController.getUserList);
router.get('/report_counter', ensureAuthenticateWeb, dashbaordController.getReportCounters);
router.get('/activity_log_All', ensureAuthenticateWeb, dashbaordController.getActivityLogs);
router.post('/checkInOut_data', ensureAuthenticateWeb, dashbaordController.getCheckInOutData);
router.get('/report/prolist', ensureAuthenticateWeb, dashbaordController.getReportProlist);
router.get('/report/merlist', ensureAuthenticateWeb, dashbaordController.getReportMerlist);
router.post('/report/opening_inventory', ensureAuthenticateWeb, dashbaordController.getReportOpeningInventory);
router.post('/report/attendance_dump', ensureAuthenticateWeb, dashbaordController.getReportAttendanceDump);
router.post('/report/sos_dump', ensureAuthenticateWeb, dashbaordController.getReportSosDump);
router.post('/report/attendance_events', ensureAuthenticateWeb, dashbaordController.getAttendanceEvents);

// Sidebar Reports
router.post('/attendance-report', ensureAuthenticateWeb, dashbaordController.getReportAttendanceDump);
router.post('/report/attendance-report', ensureAuthenticateWeb, dashbaordController.getReportAttendanceDump);
router.post('/sos/report', ensureAuthenticateWeb, dashbaordController.getReportSosDump);
router.post('/report/oos', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/sales_analysis_report', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.get('/report/tl_list', ensureAuthenticateWeb, dashbaordController.getReportTlList);
router.get('/report/storeListing', ensureAuthenticateWeb, dashbaordController.getReportStoreListing);
router.post('/report/skuonstore', ensureAuthenticateWeb, dashbaordController.getReportSkuOnStore);
router.get('/sales_chainwise', ensureAuthenticateWeb, dashbaordController.getSalesChainWise);
router.post('/storeCityWise', ensureAuthenticateWeb, dashbaordController.getStoreCityWise);
router.post('/sos_list_v2', ensureAuthenticateWeb, dashbaordController.getDashboardSos);
router.post('/dashboard_oss', ensureAuthenticateWeb, dashbaordController.getDashboardOssV2);
router.get('/oss/sku/graph', ensureAuthenticateWeb, dashbaordController.getOssSkuGraph);
router.post('/report/dsr_report', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/closingInventory-data', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/new_inventory', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/market_intelligence', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/checkinout', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/assets_tracking', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/shopper_engagement', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/promos_reports', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/tl_report', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/competition_brand', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/home_leave', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/placevisit', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/export/order_request_form', ensureAuthenticateWeb, dashbaordController.exportGenericReport);
router.post('/report/checkindetails', ensureAuthenticateWeb, dashbaordController.exportGenericReport);


//login Module
router.post('/login', userController.login);


// Sidebar Module
router.get('/getall_data', sidebarController.getAllData)
router.get('/state', sidebarController.stateGet)
router.get('/getall_state', sidebarController.getAllState)
router.get('/getall_state/zonewise', sidebarController.getAllStateZone)
router.get('/city/:id', sidebarController.cityGet)
router.get('/tlist', sidebarController.getTl)
router.get('/chain/valuelabelChain', sidebarController.valueLabelChain)


// Attendance Dashboard Module 
router.get('/getlist', ensureAuthenticateWeb, dashbaordController.getAttendanceData)
router.get('/get_attendance_data', ensureAuthenticateWeb, attendanceController.getAttendanceData)
router.get('/get_attendance_data_chainWiseindetail', ensureAuthenticateWeb, attendanceController.getAttendanceDataChainWise)


// SOS Reports Data
router.get('/sos_list', ensureAuthenticateWeb, sosController.getAllSos)

// OSS Reports Data
router.get('/oss_list', ensureAuthenticateWeb, ossController.ossData)

// Sales Reports Data
router.get('/sales_data', ensureAuthenticateWeb, salesController.salesData)

// Merchandising Reports Data
router.get('/mercha_images', ensureAuthenticateWeb, merchadisingImageController.merImage)

// get map data
router.get('/map', ensureAuthenticateWeb, mapController.getMapData)





router.get('/getlistsos', ensureAuthenticateWeb, dashbaordController.getSOSData)
router.get('/getlistsales', ensureAuthenticateWeb, dashbaordController.salesAnalysis)
router.get('/getlistoos', ensureAuthenticateWeb, dashbaordController.outofstock)
router.get('/getdashboard/:id', ensureAuthenticateWeb, dashbaordController.getDashboard)
router.get('/map', ensureAuthenticateWeb, dashbaordController.getMap);

// Executive Dashboard Routes
router.get('/executive/attendance-summary', executiveDashboardController.getAttendanceSummary);
router.get('/executive/attendance-submissions', executiveDashboardController.getAttendanceSubmissions);
router.get('/executive/attendance-trend', executiveDashboardController.getAttendanceTrend);
router.get('/executive/filter-options', executiveDashboardController.getFilterOptions);

module.exports = router;