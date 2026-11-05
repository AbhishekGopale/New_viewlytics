const { commonResponse } = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const assetRepo = require("../repository/asset_trakingRepo");
const CheckInModel = require("../../admin/models/checkInOut");
const moment = require('moment')

exports.findCategory = async (store_id,user_id) => {
    try{
        console.log(store_id,user_id,"servicee");
        let categorys = await assetRepo.findCategorys(store_id,user_id);
        return categorys;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
};

exports.createAsset = async (user_id,image,reqBody) => {
    try{
        console.log(user_id,image,reqBody,"consoleellelelel")
        let createObj = {
            user_id:user_id,
            store_id:reqBody.store_id,
            category_id:reqBody.category_id,
            asset_type:reqBody.asset_type,
            asset_id:reqBody.asset_id,
            implemented:reqBody.implemented,
            reason:reqBody.reason ? reqBody.reason : "",
            image:image ? image : "",
        }
        console.log(createObj,"obj")
        let createAsset = await assetRepo.createAsset(createObj);
        return createAsset;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}