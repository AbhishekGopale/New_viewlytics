const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const sosService = require("../services/sos.services.js")
const merchandiserSosValidation = require("../../mobile/validation/merchandisersos.validation")
const promoterSosValidation = require("../../mobile/validation/promotersos.validation")
const sosValidation = require("../../mobile/validation/sos.validation")
const { ValidationError } = require('../../../helper/commonResponce');
const isEmpty = require("../../isEmpty");

module.exports = {

    createMerchandiserSos: async (req, res, next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const { errors, isValid } = merchandiserSosValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            Id =  req.user.id
            // console.log(req.body)
            const createsos = await sosService.createMerchandiserSos(Id,req.body)
            if(createsos){
                return commonResponse.success(res, 201, "Merchandiser Sos Created succesfully");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    createPromoterSos: async (req, res, next) =>{
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            Id =  req.user.id
            const { errors, isValid } = promoterSosValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            let createSos = await sosService.createPromoterSos(Id,req.body)
            if(createSos){
                return commonResponse.success(res, 201, "Promoter Sos Created succesfully");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    createSos: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let user_id = req.user.id;
            let storeBody = req.body.sos
            let createSos = await sosService.createSos(user_id,storeBody);
            console.log(createSos);
            if(createSos){
                return commonResponse.success(res, 201, "Sos Created succesfully");
            }

        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    getSos: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const { errors, isValid } = sosValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            let getSos = await sosService.getSos(req.body);
            if(getSos.length){
                return commonResponse.success(res, 200, "SuccessFully get sos", getSos)
            }else{
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", "sos not Found")
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }
}