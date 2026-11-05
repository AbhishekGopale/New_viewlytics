const { commonResponse } = require("../../../helper");
const fieldVisitRepo = require("../repository/field_visit_repo");
const moment = require("moment")

exports.createFieldvisit = async (Id, reqBody, reqFile) => {
    try{
        // console.log(Id,reqBody,reqFile,"sevice")
        // console.log(reqFile.uniform_image)
        let todayDate = moment().format("YYYY-MM-DD")
        const filenamesWithKeys = Object.entries(reqFile).reduce((acc, [key, fileArray]) => {
            const filename = fileArray[0].filename;
            acc[key] = filename;
            return acc;
          }, {});
        //   console.log(filenamesWithKeys)
        let fieldObject = {
            user_id:Id,
            store_id:reqBody.store_id,
            date:todayDate,
            uniform_status:reqBody.uniform_status,
            uniform_image: filenamesWithKeys.uniform_image,
            uniform_reason: reqBody.uniform_reason,
            wheth_sos_status:reqBody.wheth_sos_status,
            wheth_sos_image: filenamesWithKeys.wheth_sos_image,
            wheth_sos_reason: reqBody.wheth_sos_reason,
            wheth_pog_status:reqBody.wheth_pog_status,
            wheth_pog_image: filenamesWithKeys.wheth_pog_image,
            wheth_pog_reason: reqBody.wheth_pog_reason,
            wheth_paid_status:reqBody.wheth_paid_status,
            wheth_paid_image: filenamesWithKeys.wheth_paid_image,
            wheth_paid_reason: reqBody.wheth_paid_reason,
            courtesy_status:reqBody.courtesy_status,
            courtesy_image: filenamesWithKeys.courtesy_image,
            courtesy_reason: reqBody.courtesy_reason,
            online_app_status:reqBody.online_app_status,
            online_app_image: filenamesWithKeys.online_app_image,
            online_app_reason: reqBody.online_app_reason,
            staff_status:reqBody.staff_status,
            staff_image: filenamesWithKeys.staff_image,
            staff_reason: reqBody.staff_reason,

        }
        // console.log(fieldObject);
        // return;
        let createFeild = await fieldVisitRepo.feildVisitCreate(fieldObject)
        return createFeild
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}