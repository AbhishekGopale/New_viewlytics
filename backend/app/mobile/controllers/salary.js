const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const salaryService = require("../services/salary.services.js")
const { ValidationError } = require('../../../helper/commonResponce');

module.exports = {

    getSalarySlip: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id
            
            // var FindSalaryData = await salaryService.findSalary(id,req.body)
            // if(FindSalaryData.length){
                return commonResponse.success(res, 200, "SuccessFully Mail sent to your Mail Id")
            // }else{
            //     return commonResponse.customErrorResponse(res, 404, "Something went wrong!", "Salary Not Found");
            // }   

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }

}