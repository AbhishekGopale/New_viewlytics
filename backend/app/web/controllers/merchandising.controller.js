var merService = require("../services/merchandising_services.js")
const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");


module.exports = {
    merImage: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }


            var findAllImage = await merService.findImage(req.user.id);
            if (findAllImage) {
                return commonResponse.success(res, 200, "Successfully Get OSS Data", { paidUnpaid: findAllImage });
            }
            return commonResponse.success(res, 200, "Successfully Get OSS Data", { paidUnpaid: [] });
        } catch (error) {
            console.error('Error in merImage:', error);
            return commonResponse.customErrorResponse(res, 500, error.message || "Internal error in merchandising");
        }
    }
}