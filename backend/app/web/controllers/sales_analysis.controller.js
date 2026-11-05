const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const salesService = require("../services/sales_services")

module.exports = {
    salesData: async (req, res, next) => {
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
            var findSalesData = await salesService.salesAnaData(userId)

            // console.log(findSalesData, ":findSalesData")
            if (findSalesData) commonResponse.success(res, 200, "Successfully Get OSS Data", { oss_data: findSalesData });
            // console.log(userId, "::::::::::::")

        } catch (error) {
            console.log(error, "::::::::")
        }
    }
}