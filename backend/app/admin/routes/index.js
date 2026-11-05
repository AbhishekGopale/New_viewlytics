const router = require("express").Router();
const userController = require("../controllers/user_controller")
const storeController = require("../controllers/store_controller")
const skuController = require("../controllers/sku_controller")
const skuCategoryController = require("../controllers/sku_categoryController")
const userAssignController = require("../controllers/storeuserAssign")
const chainController = require('../controllers/chain_controller.js')
const projectController = require('../controllers/project_controller')
const promoController = require('../controllers/promo_controller.js')
const dashboard = require("../controllers/dashboard_controller")
const zoneController = require("../controllers/zone_controller")
const taskController = require("../controllers/task_controller")
const targetController = require("../controllers/target_controller")
const subAdminController = require("../controllers/subadmin_controller")
const googleFormController = require("../controllers/googleForm_controller")
const clientController = require("../controllers/client_controller");
const broadcastingController = require('../controllers/broadcasting_cntroller');
const {
    ensureAuthenticateNPM, ensureAuthenticateMER_PRO_TL_ASM, ensureAuthenticateforW_A, ensureAuthenticateforW_A_Logout, ensureAuthenticateAdmin
} = require("../../../helper/guard");
const multer = require("multer");
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


// User Module
router.post('/user/create', ensureAuthenticateAdmin, userController.create);
router.get('/user/list', ensureAuthenticateAdmin, userController.getAll);
router.get('/user/get/:id', ensureAuthenticateAdmin, userController.getByID);
router.get('/user/filter/:role_name', ensureAuthenticateAdmin, userController.getUsersForFilter);
router.get('/user/user_id/listing', ensureAuthenticateAdmin, userController.getUsersIdListting);
router.get('/user/user_name/listing', ensureAuthenticateAdmin, userController.getUsersnameListting);
router.get('/user/name/listing', ensureAuthenticateAdmin, userController.getnameListting);
router.get('/user/role/:id', ensureAuthenticateAdmin, userController.getrole);
router.put('/user/update/:id', ensureAuthenticateAdmin, userController.updateUser)
router.delete('/user/delete/:id', ensureAuthenticateAdmin, userController.deleteUser)
router.post('/user/deletemany', ensureAuthenticateAdmin, userController.deletemany)
router.get('/user/tllist', ensureAuthenticateAdmin, userController.TlList)
router.get('/user/merlist', userController.mercList)
router.get('/user/promlist', ensureAuthenticateAdmin, userController.proList)
router.get('/user/asmlist', ensureAuthenticateAdmin, userController.asmList)
router.get('/user/talist', ensureAuthenticateAdmin, userController.taList)
router.get('/user/npmlist', ensureAuthenticateAdmin, userController.npmList)
router.get('/user/filterlist', ensureAuthenticateAdmin, userController.filterUserList)





// Profile Module
router.get('/profiles', ensureAuthenticateforW_A, userController.profile)
router.put('/profiles/update/:id', ensureAuthenticateforW_A, upload.single("image", "image"), userController.updateProfile)


// Auth Module
router.post('/login', userController.login);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/reset_password/:token', userController.resetPassword);
router.get('/logout', ensureAuthenticateforW_A_Logout, userController.logout)


// Store Module
router.post('/store/create', ensureAuthenticateAdmin, upload.single("image", "image"), storeController.createStore);
router.get('/store/list', ensureAuthenticateAdmin, storeController.getAll);
router.get('/store/get/:id', ensureAuthenticateAdmin, storeController.getByID);
router.delete('/store/delete/:id', ensureAuthenticateAdmin, storeController.deleteStore)
router.post('/store/deletemany', ensureAuthenticateAdmin, storeController.deletemany)
router.post('/store/update/:id', ensureAuthenticateAdmin, upload.single("image", "image"), storeController.updateStore)
router.get('/store/store_list', storeController.valueLabelSTorelist)
router.get('/store/store_dropdown/:id', ensureAuthenticateAdmin, storeController.dropdownSTorelist)
router.get('/store/storeonuser/:id', ensureAuthenticateAdmin, storeController.UserSTorelist)
router.get('/store/storeoncity/:city', ensureAuthenticateAdmin, storeController.CitySTorelist)


// Notification Module
router.post('/notificationstatus', ensureAuthenticateAdmin, userController.notifications_status)


// SKU module
router.post('/sku/create', ensureAuthenticateAdmin, skuController.createSKU)
router.get('/sku/list', ensureAuthenticateAdmin, skuController.getall)
router.delete('/sku/delete/:id', ensureAuthenticateAdmin, skuController.deleteSku)
router.get('/sku/get/:id', ensureAuthenticateAdmin, skuController.getByID);
router.post('/sku/update/:id', ensureAuthenticateAdmin, skuController.updateSku)
router.post('/sku/deletemany', ensureAuthenticateAdmin, skuController.deletemany)
router.get('/sku/valuelabelsku/:id', ensureAuthenticateAdmin, skuController.valueLabelSku)
router.get('/sku/skuonchain/:id', ensureAuthenticateAdmin, skuController.skuOnChain)
router.get('/sku/categoryonproject/:id', ensureAuthenticateAdmin, skuController.skuCategoryOnProject)


// SKU Category module
router.post('/skucategory/create', ensureAuthenticateAdmin, upload.single("image", "image"), skuCategoryController.create)
router.post('/skucategory/excel', ensureAuthenticateAdmin, skuCategoryController.excellBulkData)
router.get('/skucategory/list', ensureAuthenticateAdmin, skuCategoryController.getall)
router.post('/skucategory/update/:id', ensureAuthenticateAdmin, upload.single("image", "image"), skuCategoryController.updateSkuCategory)
router.delete('/skucategory/delete/:id', ensureAuthenticateAdmin, skuCategoryController.deleteSkuCategory)
router.post('/skucategory/deletemany', ensureAuthenticateAdmin, skuCategoryController.deletemany)

// dashboard Api
router.get('/dashboard', ensureAuthenticateAdmin, dashboard.getData)
router.get('/dashboard/projectwise/:id', ensureAuthenticateAdmin, dashboard.getProjectWiseData)


// User Assign Module
router.post('/userassign/create', ensureAuthenticateAdmin, userAssignController.userAssign)


// Chain Module
router.post('/chain/create', ensureAuthenticateAdmin, chainController.createChain)
router.get('/chain/list', ensureAuthenticateAdmin, chainController.getAll)
router.delete('/chain/delete/:id', ensureAuthenticateAdmin, chainController.deleteChain)
router.post('/chain/deletemany', ensureAuthenticateAdmin, chainController.deletemany)
router.post('/chain/update/:id', ensureAuthenticateAdmin, chainController.updateChain)
router.get('/chain/valuelabelChain', ensureAuthenticateAdmin, chainController.valueLabelChain)
router.get('/chain/chainonproject/:id', ensureAuthenticateAdmin, chainController.chainOnProject)


//project Module
router.post('/project/create', ensureAuthenticateAdmin, upload.single("image", "image"), projectController.createProject)
router.get('/project/list', ensureAuthenticateAdmin, projectController.getAll)
router.delete('/project/delete/:id', ensureAuthenticateAdmin, projectController.deleteProject)
router.post('/project/deletemany', ensureAuthenticateAdmin, projectController.deletemany)
router.get('/project/valuelabelProject', ensureAuthenticateAdmin, projectController.valueLabelProject)
router.post('/project/update/:id', ensureAuthenticateAdmin, upload.single("image", "image"), projectController.updateProject)
router.post('/project/excel', projectController.importExcel)
router.get('/project/zone/:id', ensureAuthenticateAdmin, projectController.zoneOnProject)
// router.get('subadmin/project', ensureAuthenticateAdmin, projectController.getAll)


// Promos Module
router.post('/promo/create', ensureAuthenticateAdmin, upload.single("promo_image", "promo_image"), promoController.createPromo)
router.post('/promo/excel', promoController.excellPromo)
router.get('/promo/list', ensureAuthenticateAdmin, promoController.getall)
router.delete('/promo/delete/:id', ensureAuthenticateAdmin, promoController.deletePromo)
router.post('/promo/deletemany', ensureAuthenticateAdmin, promoController.deletemany)
router.post('/promo/update/:id', ensureAuthenticateAdmin, upload.single("promo_image", "promo_image"), promoController.updatePromo)

// Zone Module
router.post('/create_zone', ensureAuthenticateAdmin, zoneController.createZone)
router.get('/get_zone', ensureAuthenticateAdmin, zoneController.getAllZone)
router.delete('/delete/:id', ensureAuthenticateAdmin, zoneController.deleteZone)
router.get('/get_all_zone', ensureAuthenticateAdmin, zoneController.getZoneList)
router.post('/zone/update/:id', ensureAuthenticateAdmin, zoneController.updateZone)
router.get('/zone/getstate/:id', zoneController.getStateOnZoneId)
router.get('/zone/getAllZoneVl', zoneController.getZoneValueLabel)

//Task Module
router.post('/task/create', ensureAuthenticateAdmin, taskController.createTask)
router.get('/task/list/:id', ensureAuthenticateAdmin, taskController.taskList)
router.post('/task/datebylist', ensureAuthenticateAdmin, taskController.dateByTaskList)
router.post('/task/deletemany', ensureAuthenticateAdmin, taskController.deleteManyTask)
router.delete('/task/delete/:id', ensureAuthenticateAdmin, taskController.deleteTask)
router.put('/task/update/:id', ensureAuthenticateAdmin, taskController.updateTask)
router.get('/task/gettask/:id', ensureAuthenticateAdmin, taskController.getTask)
router.post("/task/excel", ensureAuthenticateAdmin, taskController.importExcelTask)

//Target Module
router.post('/target/create', ensureAuthenticateAdmin, targetController.createTarget)
router.post('/target/update/:id', ensureAuthenticateAdmin, targetController.updateTarget)
router.get('/target/list', ensureAuthenticateAdmin, targetController.getall)
router.delete('/target/delete/:id', ensureAuthenticateAdmin, targetController.deleteTarget)
router.post('/target/deletemany', ensureAuthenticateAdmin, targetController.deleteMany)
router.get('/target/get/:id', ensureAuthenticateAdmin, targetController.get)
router.post('/target/excel', ensureAuthenticateAdmin, targetController.importExcel)

//Sub-admin Module
router.post('/subadmin/create', ensureAuthenticateAdmin, subAdminController.createSubAdmin)
router.get('/subadmin/getAll', ensureAuthenticateAdmin, subAdminController.getAll)
router.delete('/subadmin/delete/:id', ensureAuthenticateAdmin, subAdminController.deleteSubAdmin)
router.post('/subadmin/deletemany', ensureAuthenticateAdmin, subAdminController.deleteManySubAdmin)
router.post('/subadmin/update/:id', ensureAuthenticateAdmin, subAdminController.updateSubAdmin)
router.post('/subadmin/updatePermission', ensureAuthenticateAdmin, subAdminController.rolePermission)
router.get('/subadmin/get/:id', ensureAuthenticateAdmin, subAdminController.getById)
router.get('/subadmin/getallvl', ensureAuthenticateAdmin, subAdminController.getallValueLabel)
router.get("/subadmin/permission", ensureAuthenticateAdmin, subAdminController.modulePermissionVL)

//Client Module
router.post('/client/create', ensureAuthenticateAdmin, clientController.createClinet);
router.get('/client/list', ensureAuthenticateAdmin, clientController.getAll);
router.delete('/client/delete/:id', ensureAuthenticateAdmin, clientController.deleteClient);
router.post('/client/deletemany', ensureAuthenticateAdmin, clientController.deleteManyClient);
router.post('/client/update/:id', ensureAuthenticateAdmin, clientController.updateClient)
router.get('/client/get/:id', ensureAuthenticateAdmin, clientController.getByIdClient)
router.get('/client/npclist', ensureAuthenticateAdmin, clientController.ncplist)
router.get('/client/aselist', ensureAuthenticateAdmin, clientController.aselist)
router.get('/client/selist', ensureAuthenticateAdmin, clientController.seList)





//Google Form Module
router.post('/form/create', ensureAuthenticateAdmin, googleFormController.formCreate)
router.get('/form/list', ensureAuthenticateAdmin, googleFormController.formListing)
router.delete('/form/delete/:id', ensureAuthenticateAdmin, googleFormController.formDelete)
router.post('/form/deletemany', ensureAuthenticateAdmin, googleFormController.formDeleteMany)
router.patch('/form/update/:id', ensureAuthenticateAdmin, googleFormController.updateForm)
router.get('/form/useronproject/:id', ensureAuthenticateAdmin, googleFormController.userOnPoject);


//BroadCating Module
router.post('/broadcasting/userlist', ensureAuthenticateAdmin, broadcastingController.userlistOnprojectAndZone);
router.post('/broadcasting/create', ensureAuthenticateAdmin, broadcastingController.createBroadCasting);
router.get('/broadcasting/getall', ensureAuthenticateAdmin, broadcastingController.getAllCasting);
router.delete('/broadcasting/delete/:id', ensureAuthenticateAdmin, broadcastingController.deleteCasting);
router.post('/broadcasting/deletemany', ensureAuthenticateAdmin, broadcastingController.deleteManyCasting);

module.exports = router;
