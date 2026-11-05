const { commonResponse } = require("../../../helper");
const comAnalysisRepo = require("../repository/comAnalysisRepo.js");

exports.createObjAnalysis = async (reqBody, reqFile,Id) => {

    try {
        const filenamesWithKeys = Object.entries(reqFile).reduce((acc, [key, fileArray]) => {
            const filename = fileArray[0].filename;
            acc[key] = filename;
            return acc;
          }, {});
        var CreateObj = {
            user_id: Id,
            store_id: reqBody.store_id,
            activation_type: reqBody.activation_type,
            category: reqBody.category,
            compation_name: reqBody.compation_name,
            compation_description: reqBody.compation_description,
            activation_pic: filenamesWithKeys.activation_pic,
            activation_pic_2: filenamesWithKeys.activation_pic_2,
        }


        var createAnalysis = await comAnalysisRepo.analysisCreate(CreateObj)
        return createAnalysis

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }

}