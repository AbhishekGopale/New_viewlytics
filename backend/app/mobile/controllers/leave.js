const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const leaveModel = require("../../admin/models/leave")
const leaveService = require("../services/leave.services")
const LeaveValidation = require("../../mobile/validation/leavevalidation.js")
const { ValidationError } = require('../../../helper/commonResponce');
const isEmpty = require("../../isEmpty");
const { UPDATE_LEAVE, DELETE_LEAVE } = require('../../../helper/resources/messages.json')



module.exports = {

    create: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let user_id = req.user.id
            const { errors, isValid } = LeaveValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            const createLeave = await leaveService.createLeave(user_id,req.body);
            if (createLeave) {
                return commonResponse.success(res, 200, "SuccessFully created Leave!", {
                    Leave: createLeave
                })
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    getAll: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var user_id = req.user.id

            var getLeave = await leaveService.getLeave(user_id)

            if (getLeave) {
                return commonResponse.success(res, 200, "Get all Leaves by userid!", {
                    Leaves: getLeave
                })
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },


    updateLeave: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            var id = req.params.id
            let user_id = req.user.id

            console.log(id, ":id")
            const { errors, isValid } = LeaveValidation(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            const updateLeave = await leaveService.updateLeave(id, req.body,user_id)
            if (updateLeave) {
                return commonResponse.success(res, 201, UPDATE_LEAVE);
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    deleteLeave: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            var id = req.params.id
            const deleteLeave = await leaveService.deleteLeave(id);

            if (deleteLeave) {
                return commonResponse.success(res, 201, DELETE_LEAVE);
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }



}