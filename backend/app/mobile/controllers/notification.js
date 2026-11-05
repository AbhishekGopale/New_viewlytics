const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const notificationModel = require("../../admin/models/notification")
const notificationService = require("../services/notification.services")


module.exports = {

    getAllNotification: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var id = req.user.id;

            console.log(id, ":notification")

            let getNotiFication = await notificationService.getAllNotification(id);
            if (getNotiFication) {
                return commonResponse.success(res, 200, "Get all notification by userid!", {
                    notification: getNotiFication
                })
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    delete: async (req, res, next) => {
        try {

            var id = req.params.id;
            let deleteNotification = await notificationService.delete(id);
            if (deleteNotification) {
                return commonResponse.success(res, 200, "delete Notification by id!", "SucessFully delete")
            }
        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    deleteMany: async (req, res, next) => {
        try {

            var id = req.body.id;
            console.log(id, ":id")
            let deleteNotification = await notificationService.deleteMany(id);
            if (deleteNotification) {
                return commonResponse.success(res, 200, "delete Notification by id!", "SucessFully delete")
            }
        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }

}