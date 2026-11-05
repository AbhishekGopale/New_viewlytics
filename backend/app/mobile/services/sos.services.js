const Store = require("../../admin/models/store")
const User = require("../../admin/models/user")
const sosRepo = require("../repository/sosRepo");
const moment = require("moment");

exports.createMerchandiserSos = async (Id,reqBody) => {
    try{
        let store = await Store.findOne({
            where:{store_code:reqBody.store_id},
            raw: true,
            nest: true,
        })
        let sosOject = {
            user_id:Id,
            store_id:store.store_code,
            store_name:store.store_name,
            brand_cat_1: reqBody.brand_cat_1,
            com_facing_1: reqBody.com_facing_1,
            brand_1_sos: reqBody.brand_1_sos,
            brand_cat_2: reqBody.brand_cat_2,
            com_facing_2: reqBody.com_facing_2,
            brand_2_sos: reqBody.brand_2_sos
        }
        // console.log(sosOject,"storee")
        let createSos = await sosRepo.merchandiserSosCreate(sosOject)
        return createSos
    }catch(error){
        console.log(error)
    }
}
exports.createPromoterSos = async (Id,reqBody) => {
    try{
        let store = await Store.findOne({
            where:{store_code:reqBody.store_id},
            raw: true,
            nest: true,
        })
        let user = await User.findOne({
            where:{id:reqBody.open_inventory_id},
            raw: true,
            nest: true,
        })
        let userName = user.first_name + " " + user.last_name;
        let sosOject = {
            user_id:Id,
            store_id:store.store_code,
            store_name:store.store_name,
            open_inventory_id: user.id,
            open_inventory_name: userName
        }
        // console.log(sosOject,"storee")
        let createSos = await sosRepo.promoterSosCreate(sosOject)
        return createSos
    }catch(error){
        console.log(error)
    }
}
exports.createSos= async (user_id,reqBody) => {
    try{
        let todayDate = moment().format("YYYY-MM-DD")
        console.log(user_id,reqBody,todayDate,"reqbodydyddyydy");
        let createObj = reqBody.map((data) => {
            return{
                user_id:user_id,
                date:todayDate,
                store_id:data.store_id,
                category_id:data.category_id,
                brand_facing:data.brand_facing,
                compation_facing:data.compation_facing,
                sos_per:data.sos_per
            }
        });
        console.log(createObj);
        let createSos2 = await sosRepo.createSos(createObj);
        return createSos2;
    }catch(error){
        console.log(error)
    }
}

exports.getSos = async (reqBody) => {
    try{
        let getSoss = await sosRepo.getSos(reqBody);
        return getSoss;
    }catch(error){
        console.log(error)
    }
}