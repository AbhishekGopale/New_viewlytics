const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const sosServices = require("../services/sos_services")



module.exports = {

    getAllSos: async (req, res, next) => {

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

            // console.log(userId, ":userId")

            var findSOSData = await sosServices.finddata(userId)

            if (findSOSData) commonResponse.success(res, 200, "Successfully Get SOS Data", { sos_data: findSOSData });


        } catch (error) {
            console.log(error, ":---error")
        }


        
    }

}