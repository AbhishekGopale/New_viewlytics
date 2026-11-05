const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const ossServices = require("../services/oss_services.js")


module.exports = {

    ossData: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var userId = req.user.id

            var findOssData = await ossServices.findOSSData(userId)

            console.log(findOssData, "::::::::::::::")
            if (findOssData) commonResponse.success(res, 200, "Successfully Get OSS Data", { oss_data: findOssData });


        } catch (error) {
            console.log(error, ":---error")
        }
    }

}