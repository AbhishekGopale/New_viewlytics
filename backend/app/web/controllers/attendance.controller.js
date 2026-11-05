const {
    commonResponse,
    commonFunctions,
    customErrorResponse,
} = require("../../../helper");

const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../../isEmpty");
const attendanceSevice = require("../services/attendance_services.js")
const { DEFAULTERR } = require("../../../helper/resources/messages.json");


module.exports = {
    getAttendanceData: async (req, res, next) => {
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

            var chianWiseData = await attendanceSevice.getChain(userId)
            // console.log(chianWiseData, ":chianWiseData")
            if (chianWiseData) commonResponse.success(res, 200, "Successfully Get Attendance Report", { attendanceChain: chianWiseData });

        } catch (error) {
            console.log(error, ":---error")
        }
    },

    getAttendanceDataChainWise: async (req, res, next) => {
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

            var chianWiseData = await attendanceSevice.getChainWiseAllData(userId)
            if (chianWiseData) commonResponse.success(res, 200, "Attendance Report", { attendanceChain: chianWiseData });

        } catch (error) {
            console.log(error, "error")
        }
    }
}