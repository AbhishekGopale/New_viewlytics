const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const attendanceModel = require("../../admin/models/attendance")
const attendanceService = require("../services/attendance.services.js")
const { ValidationError } = require('../../../helper/commonResponce');

module.exports = {


    getMonthlyAttendance: async (req, res, next) => {
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
  
            const Attedance = await attendanceService.getAttendance(Id, req.body);
            if (Attedance) {
                return commonResponse.success(res, 200, "SuccessFully get all Attedance!", Attedance)
            }
        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    postAttendance: async (req,res, next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let Id = req.user.id
            const Attedance = await attendanceService.postAttendance(Id, req.body);
            if (Attedance) {
                return commonResponse.success(res, 200, "SuccessFully Attendance Done")
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    dashboardAttendance: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            };
            const user_id = req.user.id;
            // console.log(user_id,"usredfdgd");
            let detailAttendance  = await attendanceService.detailAttendance(user_id)
            if(detailAttendance){
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All Data!",
                    detailAttendance
                  );
            }else{
                return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
            }
     

        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    totalpromoter:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let promoterData = await attendanceService.totalPromoterData(id);
            console.log(promoterData,"proprttytu");
            for (let index = 0; index < promoterData.length; index++) {
                const element = promoterData[ index ];
                element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
        
            }
            if(promoterData){
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All Total Promoter!",
                    promoterData
                  );
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    presentData:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let presentData = await attendanceService.totalPresentData(id);

            if(presentData.length){
                for (let index = 0; index < presentData.length; index++) {
                    const element = presentData[ index ];
                    element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
            
                }
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All Present!",
                    presentData
                  );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Prsent User  Not Found");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    absentData:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let absentData = await attendanceService.totalAbsentData(id);
            if(absentData.length){
                for (let index = 0; index < absentData.length; index++) {
                    const element = absentData[ index ];
                    element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
            
                }
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All Abset!",
                    absentData
                  );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Absent User  Not Found");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    weekoffData:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let weekOffData = await attendanceService.weekOffData(id);
            if(weekOffData.length){
                for (let index = 0; index < weekOffData.length; index++) {
                    const element = weekOffData[ index ];
                    element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
            
                }
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All WeekOff!",
                    weekOffData
                  );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Week Off User  Not Found");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    OnleaveData:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let onleaveData = await attendanceService.onleaveData(id);
            if(onleaveData.length){
                for (let index = 0; index < onleaveData.length; index++) {
                    const element = onleaveData[ index ];
                    element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
            
                }
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All onleave!",
                    onleaveData
                  );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","leave User  Not Found");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    requestleave:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let id = req.user.id;
            let leaverequestData = await attendanceService.onleaveRequestData(id);
            // console.log(leaverequestData,"reques")
            if(leaverequestData.length){
                for (let index = 0; index < leaverequestData.length; index++) {
                    const element = leaverequestData[ index ];
                    element.profile_image = `http://35.73.254.5//media/upload/${element.profile_image}`
            
                }
                return commonResponse.success(
                    res,
                    200,
                    "Successfully Get All Request leave!",
                    leaverequestData
                  );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","leave Request Not Found");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    leaveUpdatee:async (req,res,next) => {
        try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id;
        const updateLeave = await attendanceService.updateLeave(id,req.body);
        if (updateLeave) {
            return commonResponse.success(res, 201, "leave Updateed Succesfully");
        }

        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
        
    }


}