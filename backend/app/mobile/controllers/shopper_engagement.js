const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const shopperService = require("../services/shopper_engagement.services.js");
const createShooperengaValidation = require("../../mobile/validation/createshopperengagement.validation")
const { ValidationError } = require('../../../helper/commonResponce');
const isEmpty = require("../../isEmpty");

module.exports = {
    createShooperEngagement: async (req, res, next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const { errors, isValid } = createShooperengaValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            let Id = req.user.id
            console.log(req.body,"body")
            console.log(req.files)
            let createShopper = await shopperService.createShopperEngagement(Id,req.body, req.files)
            if(createShopper){
                return commonResponse.success(res, 201, "Shopper Engagement Created succesfully");
            }
        }catch (error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    getByIdShopperEngagement: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let findShopper = await shopperService.findByIdShopper(req.params)
            if (findShopper) {
                return commonResponse.success(res, 200, "Shopper Engagement fetch successfully !", {
                    findShopper
                })
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    getAllShopperEngagement: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const { page = 1, limit = 2 } = req.query;
            let order_column = req.query.order_column || "store_name";
            let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
            let sort_array = [order_column, sort_order];
            let filter_value = req.query.filter_value || "";
            console.log(req.query,sort_array,filter_value)
            let getAllShopper = await shopperService.getAllShopper(req.query,sort_array,filter_value);
            if (getAllShopper) {
                return commonResponse.success(res, 200, "Successfully Get All User!", {
                    TotalCount: getAllShopper.count,
                    data: getAllShopper.data
                });
            }
        }catch(error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }
}