const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, TARGET_SUCCESS_CREATED, TARGET_SUCCESS_UPDATE, TARGET_ALL_GET, TARGET_SUCCESS_DELETED } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');
const targetServices = require('../services/target_services');
const createTargetValidation = require("../validation/createTarget.validation");

exports.createTarget = async (req,res, next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = createTargetValidation(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        let createTarget = await targetServices.createTarget(req.body)
        if (createTarget) commonResponse.success(res, 201, TARGET_SUCCESS_CREATED);
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.updateTarget = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = createTargetValidation(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        let id = req.params.id
        // console.log(id, req.body,"updpdpdpd")
        let updateTarget = await targetServices.updateTarget(id,req.body)
        if (updateTarget) commonResponse.success(res, 200, TARGET_SUCCESS_UPDATE);
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};


exports.getall = async(req, res, next) => {
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
		let order_column = req.query.order_column || "id";
		let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
		let sort_array = [order_column, sort_order];
		let filter_value = req.query.filter_value || "";
        var findTarget= await targetServices.getAllTarget(req.query,sort_array,filter_value);
        // console.log(findTarget)
        if (findTarget) {
            return commonResponse.success(res, 200, TARGET_ALL_GET, {
                totalCount: findTarget.count,
				target: findTarget.data
            });
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.get = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id
        let get = await targetServices.get(id)
        if (get) {
            return commonResponse.success(res, 200, "Successfully Get Target!", get);
        }

    } catch (error) {

    }
}

exports.importExcel = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            })
        }
        var BodyData = req.body.targetArray
        var createTarget= await targetServices.getTargetCreate(BodyData);
        if (createTarget) commonResponse.success(res, 201, TARGET_SUCCESS_CREATED);
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteTarget = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            })
        }
        let id = req.params.id;
        console.log(id, "iddd")
        let deleteTarget = await targetServices.deleteTarget(id)
        if (deleteTarget) commonResponse.success(res, 200, TARGET_SUCCESS_DELETED)
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteMany = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            })
        }
        let id = req.body.id
        let deleteMany = await targetServices.deleteMany(id)
        if (deleteMany) commonResponse.success(res, 200, TARGET_SUCCESS_DELETED)

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
