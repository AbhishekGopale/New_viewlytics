const router = require("express").Router();
const authentication = require("../controllers/auth/signin")
const notification = require("../controllers/notification")
const leave = require("../controllers/leave")
const Dashboard = require("../controllers/dashboard")
const Salary = require("../controllers/salary")
const Support = require("../controllers/support")
const Attendance = require("../controllers/attendance.js")
const ChekInOut = require("../controllers/check_in_out")
const Meeting = require("../controllers/meeting")
const FieldVisit = require("../controllers/field_visit")
const Sos = require("../controllers/sos.js")
const ShopperEngagement = require("../controllers/shopper_engagement.js")
const Competitionanalysis = require("../controllers/competition_analysis")
const asetTraking = require("../controllers/asset_traking")
const Inventory = require("../controllers/inventory")
const {
    ensureAuthenticateNPM, ensureAuthenticateMER_PRO_TL_ASM,ensureAuthenticateMerchendiser, ensureAuthenticateTL, ensureAuthenticateMER_PRO_TL_ASM_NPM_Admin
} = require("../../../helper/guard");
const multer = require("multer");
const shopperEngagement = require("../../admin/models/shopper_engagement");
const assetTraking = require("../../admin/models/asset_traking");
var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, "public/upload");
    },
    filename: function filename(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".png");
    },
    
});
var upload = multer({
    storage: storage,
});


// Auth Module
router.post('/login', authentication.signin);
router.post('/forgotpassword', authentication.forgotPassword);
router.post('/resetPassword/:token', authentication.resetPassword)
router.post('/sendotp', authentication.sendOtp);
router.post('/resendotp', authentication.resendOtp);
router.get('/profile', ensureAuthenticateMER_PRO_TL_ASM, authentication.profile)
router.post('/profileresetpass', ensureAuthenticateMER_PRO_TL_ASM_NPM_Admin, authentication.resetPasswordProfile)
router.get('/removeaccount', ensureAuthenticateMER_PRO_TL_ASM, authentication.removeACC)
router.get('/logout', ensureAuthenticateMER_PRO_TL_ASM, authentication.Logout);
router.post('/profile/update', ensureAuthenticateMER_PRO_TL_ASM, upload.single("image", "image"), authentication.updateProfile)



// Notification Module
router.get('/notification', ensureAuthenticateMER_PRO_TL_ASM, notification.getAllNotification);
router.delete('/delete/:id', ensureAuthenticateMER_PRO_TL_ASM, notification.delete);
router.post('/deletemany', ensureAuthenticateMER_PRO_TL_ASM, notification.deleteMany);


// Leave Module
router.post('/leave/create', ensureAuthenticateMER_PRO_TL_ASM, leave.create);
router.get('/leave/get', ensureAuthenticateMER_PRO_TL_ASM, leave.getAll);
router.put('/leave/update/:id', ensureAuthenticateMER_PRO_TL_ASM, leave.updateLeave);
router.delete('/leave/delete/:id', ensureAuthenticateMER_PRO_TL_ASM, leave.deleteLeave);


// DashBoard Module
router.get('/dashboard', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.dashboard);
router.get('/dashboard/count', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.countDashboard);
router.get('/dashboard/formcount', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.formCount);
router.get('/dashboard/promotertl', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.promoterDashboard);
router.get('/dashboard/merchandiser', ensureAuthenticateMerchendiser, Dashboard.merchandiserDashboard);
router.post('/store/filter',ensureAuthenticateMER_PRO_TL_ASM , Dashboard.filterStore )
router.get('/target/achieve',ensureAuthenticateMER_PRO_TL_ASM , Dashboard.targetAchieve )
router.get('/promos/promoList/:id',ensureAuthenticateMER_PRO_TL_ASM,Dashboard.getPromoList)
// router.get('/target/achieve',ensureAuthenticateTL , Dashboard.targetAchieve );
router.get('/storedetail/:id', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.storeDetail);
router .post('/store/verified/:id', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.verifiedStore)
router.post("/promo/update/:id", ensureAuthenticateMER_PRO_TL_ASM,upload.single("image", "image"), Dashboard.updatePromo)
router.post("/oos/create", ensureAuthenticateMER_PRO_TL_ASM, Dashboard.createOos)


// Salary Module
router.post('/salary', ensureAuthenticateMER_PRO_TL_ASM  ,Salary.getSalarySlip)


//Support Module
router.post('/support/create', ensureAuthenticateMER_PRO_TL_ASM ,  Support.createForm)
router.get('/support/get', ensureAuthenticateMER_PRO_TL_ASM, Support.getAll);
router.delete('/support/delete/:id', ensureAuthenticateMER_PRO_TL_ASM, Support.deleteSupport);


//Attendance Module
router.post('/attendance/list',ensureAuthenticateMER_PRO_TL_ASM, Attendance.getMonthlyAttendance)
router.post('/attendance/create', ensureAuthenticateMER_PRO_TL_ASM, Attendance.postAttendance)
router.get('/attendance/dashboard',ensureAuthenticateTL, Attendance.dashboardAttendance );
router.get('/attendance/total', ensureAuthenticateTL, Attendance.totalpromoter);
router.get('/attendance/present' ,ensureAuthenticateTL, Attendance.presentData);
router.get('/attendance/absent' ,ensureAuthenticateTL, Attendance.absentData);
router.get('/attendance/weekoff' ,ensureAuthenticateTL, Attendance.weekoffData);
router.get('/attendance/onleave' ,ensureAuthenticateTL, Attendance.OnleaveData);
router.get('/attendance/requestleave' ,ensureAuthenticateTL, Attendance.requestleave);
router.post('/attendance/leaveupdate/:id', ensureAuthenticateTL, Attendance.leaveUpdatee)


//Check In Out Module
router.post('/checkin', ensureAuthenticateMER_PRO_TL_ASM,upload.single("image", "image"),  ChekInOut.checkIn)
router.post('/checkout/:id', ensureAuthenticateMER_PRO_TL_ASM,  ChekInOut.checkOut)
router.get('/checkin/storelist',ensureAuthenticateMER_PRO_TL_ASM, ChekInOut.checkInList);
router.post('/map/detail', ensureAuthenticateMER_PRO_TL_ASM, ChekInOut.mapdetails);


// Meeting Module
router.post('/meeting', ensureAuthenticateTL, Meeting.meetingSedual)
router.post('/adminWork_meeting', ensureAuthenticateTL, Meeting.adminWork)
router.post('/fieldvisit/create', ensureAuthenticateTL, upload.fields([{ name: "uniform_image" }, { name: "wheth_sos_image" }, { name: "wheth_pog_image" }, { name: "wheth_paid_image" }, { name: "courtesy_image" }, { name: "online_app_image" }, { name: "staff_image" }]), FieldVisit.createFieldVisit);
router.get('/fieldvisit/listing', ensureAuthenticateTL, FieldVisit.getListing)


//Sos Module
router.post('/merchandiser/sos',ensureAuthenticateMER_PRO_TL_ASM, Sos.createMerchandiserSos)
router.post('/promoter/sos',ensureAuthenticateMER_PRO_TL_ASM, Sos.createPromoterSos);
router.post('/sos/create', ensureAuthenticateMER_PRO_TL_ASM, Sos.createSos);
router.post('/sos/get', ensureAuthenticateMER_PRO_TL_ASM, Sos.getSos)


//Google Module
router.post('/google_form', ensureAuthenticateMER_PRO_TL_ASM, Support.form)


//Shopper Engagement Module
router.post('/shopengagement/create', ensureAuthenticateMER_PRO_TL_ASM , upload.fields([{name:"cust_approach_image"},{name:"any_sample_image"},{name:"other_image"},{name:"cust_approach_image2"},{name:"any_sample_image2"},{name:"other_image2"}]) ,ShopperEngagement.createShooperEngagement)
router.get('/shopengagement/get/:id', ensureAuthenticateMER_PRO_TL_ASM, ShopperEngagement.getByIdShopperEngagement)
router.get('/shopengagement/list', ensureAuthenticateMER_PRO_TL_ASM, ShopperEngagement.getAllShopperEngagement)


// CompetitionAnalysis Module
router.post('/com_analysis',ensureAuthenticateMER_PRO_TL_ASM,upload.fields([{name:"activation_pic"},{name:"activation_pic_2"}]), Competitionanalysis.datasync);
router.get('/activation/list', ensureAuthenticateMER_PRO_TL_ASM,Competitionanalysis.activationList)


//Inventory Module
router.get('/inventory/skurange/:id', ensureAuthenticateMER_PRO_TL_ASM, Inventory.getSkuRange)
router.get('/inventory/skuname/:id', Inventory.getSkuName)
router.post('/inventory/open', ensureAuthenticateMER_PRO_TL_ASM, Inventory.openInventory)
router.post('/inventory/closing', ensureAuthenticateMER_PRO_TL_ASM, Inventory.closingInventory)
router.post('/inventory/getinventory', ensureAuthenticateMER_PRO_TL_ASM, Inventory.getInventory);
router.post('/inventory/newinventory', ensureAuthenticateMER_PRO_TL_ASM, Inventory.newInventory);
router.post('/inventory/dsr', ensureAuthenticateMER_PRO_TL_ASM, Inventory.dsr);


//Form Update Module
router.patch('/form/update/:id', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.updateForm)
router.get('/form/check', ensureAuthenticateMER_PRO_TL_ASM, Dashboard.checkForm)

//Asset Traking Module
router.get('/asset/category/:id', ensureAuthenticateMER_PRO_TL_ASM ,asetTraking.getCategory);
router.get('/asset/assetlisting', ensureAuthenticateMER_PRO_TL_ASM ,asetTraking.getAssets);
router.post('/asset/create', ensureAuthenticateMER_PRO_TL_ASM,upload.single("image", "image"), asetTraking.createAsset);



module.exports = router;


