const analysisModel = require("../../admin/models/competition_analysis")


exports.analysisCreate = async (data) => {
    try {
        return await analysisModel.create(data, { raw: true });
    } catch (error) {
        console.log(error)
    }
}