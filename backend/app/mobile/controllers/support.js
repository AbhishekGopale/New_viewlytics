const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const { DEFAULTERR, SUPPORT_SUCCESS_CREATED , DELETE_SUPPORT} = require('../../../helper/resources/messages.json')
const supportService = require("../services/support.services.js")
const { ValidationError } = require('../../../helper/commonResponce');


module.exports = {
    createForm: async (req, res, next) => {
        try {
            var CreateSuport = await supportService.createSupprt(req.body)
            if (CreateSuport) {
                return commonResponse.success(res, 201, SUPPORT_SUCCESS_CREATED);
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
            var getSupport = await supportService.getsupport()

            if (getSupport) {
                return commonResponse.success(res, 200, "Get all Support", {
                    Support: getSupport
                })
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    deleteSupport: async (req, res, next) => {
        try {

            var id = req.params.id
            const deleteSupport = await supportService.deleteSupport(id);

            if (deleteSupport) {
                return commonResponse.success(res, 201, DELETE_SUPPORT);
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    form: async (req, res, next) => {
        try {

            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            let Id = req.user.id

            return commonResponse.success(res, 200, "SuccessFully Get form link!", {
                Link: `https://docs.google.com/forms/d/1ckTYhmHPJ0bSDDtacnal3GLLeNxRLfmPeO5cqEJKrzE/edit`
            })

        } catch (error) {

        }
    }
}