const { commonResponse } = require("../../../helper");
const Promos = require("../../admin/models/promo");
const skuModel = require("../../admin/models/SKU");
const dashboardRepo = require("../repository/dashboardRepo");


exports.filterStore = async (reqBody) => {
    try{
        // console.log(reqBody,"bodyd")
        let findStore = await dashboardRepo.findStore(reqBody)
        // console.log(findStore,"fins")
        return findStore
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.targetAchieve = async (reqUser) => {
    try{
        let user_id = reqUser.id
        let targetAchieve = await dashboardRepo.targetAchieve(user_id);
        return targetAchieve
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.promoterDashboard = async (user_id) => {
    try{
        // console.log(user_id,"bodyd")
        let promoterDash = await dashboardRepo.promoerDashboard(user_id)
        // console.log(findStore,"fins")
        return promoterDash
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.merDashboard = async (user_id) => {
    try{
        // console.log(user_id,"bodyd")
        let merchDashboard = await dashboardRepo.merDashboard(user_id)
        // console.log(findStore,"fins")
        return merchDashboard
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.countDashboard = async (reqUser) => {
    try{
        // console.log(reqUser,"reqUsrereerer")
        let countDashboard = await dashboardRepo.countDashbord(reqUser);
        return countDashboard;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.formCount = async (reqUser) => {
    try{
        console.log(reqUser,"reqUsrereerer")
        let countForm = await dashboardRepo.countForm(reqUser);
        return countForm;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.storeDetail = async (store_id) => {
    try{
        let storeData = await dashboardRepo.storeDetail(store_id)
        // console.log(store_id,"serviceeee")
        return storeData;
    }catch(error){
        console.log(error,"-->error")
        throw error;
    }
}

exports.updateForm = async (id, reqBody) => {
    try{
        let updateForm = await dashboardRepo.updateForm(id ,reqBody);
        return updateForm;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.updatePromo = async (promoId, image, reqBody) => {
    try{
        // console.log(promoId, image, reqBody,"promoId, image, reqBody")
        let updatePromo = await dashboardRepo.updatePromo(promoId, image, reqBody);
        return updatePromo;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}
exports.verifiedStore = async (store_id, reqBody) => {
    try{
        let verifieedStore = await dashboardRepo.verifiedStore(store_id,reqBody);
        return verifieedStore;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.checkForm = async (user_id) => {
    try{
        console.log(user_id,"inserevice")
        let checkForm = await dashboardRepo.checkForm(user_id);
        return checkForm;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.getPromoList = async (Id)=>{
    try {
        let promos = await Promos.findAll({
            where:{store_id:Id},
            attributes:["id","project_name","start_date","end_date","sku_id","promo_des","promo_type","promo_image","status"],
            raw:true,
            nest:true
        });
        for (let index = 0; index < promos.length; index++) {
            const element = promos[ index ];
            element.promo_image = `http://35.73.254.5/media/upload/${element.promo_image}`
    
        }
        return promos
        
    } catch (error) {
        console.log(error, " -->error")
        throw error;
    
    }

}

exports.createOos = async (Id,oos,remark) => {
    try{
        console.log(Id,oos,remark,"Id,oos,remarkId,oos,remark");
        let skus = await skuModel.findAll({
            raw: true,
		   nest: true
        });
        let validateData = oos.map((value) => {
            const sku = skus.find((element) => {
                return element.id == value.sku_id 
            });
            return {
                user_id:Id,
                store_id:'store_code' ? value.store_id : null,
                sku_id: sku ? sku.id : null,
                sku_no: sku ? sku.sku_no : null,
                category_id: 'category_id' ? value.category_id : null,
                sku_full_name: 'sku_full_name' ? sku.final_sku_name : null,
                oos_status: 'oos_status' ? value.oos_status : null,
                date: 'date' ? value.date : null,
                remark: remark ? remark : null
            }
            
        });
        console.log(validateData,"vlaidatataatat")
        let createOos = await dashboardRepo.createOos(validateData);
        return createOos;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}