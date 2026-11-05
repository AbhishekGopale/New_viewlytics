const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const attendanceModel = require("../../admin/models/attendance")
const assetService = require("../services/asset_traking.services")
const { ValidationError } = require('../../../helper/commonResponce');

module.exports = {
    getCategory : async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            };
            console.log(req.user.id,req.params.id,"conosleiddd");
            let store_id = req.params.id;
            let user_id = req.user.id
            let categorys = await assetService.findCategory(store_id,user_id);
            console.log(categorys,"allcategiry")
            if(categorys.length){
                return commonResponse.success(res, 200, "SuccessFully get all Attedance!", categorys)
            }else{
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", "category not Found")
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    getAssets : async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            };
            let dataObje = [
                {
                    value:1,label:"EndCap"
                },
                {
                    value:2,label:"Counter Top"
                },
                {
                    value:3,label:"FSU"
                },
                {
                    value:4,label:"FSU- Rodent Proof"
                },
                {
                    value:5,label:"Clip Strips"
                },
                {
                    value:6,label:"Pillar Branding"
                },
                {
                    value:7,label:"Side Kick"
                },
            ];
            return commonResponse.success(res, 200, "SuccessFully get all Attedance!", dataObje)

        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    createAsset: async (req,res,next) =>{
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            };
            let user_id = req.user.id;
            let image = req.file ? req.file.filename : ""
            console.log(user_id,req.body,req.file,"booododododod");
            let ceateAsset = await assetService.createAsset(user_id,image,req.body);
            if(ceateAsset){
                return commonResponse.success(res, 200, "SuccessFully Asset Track")
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }
}