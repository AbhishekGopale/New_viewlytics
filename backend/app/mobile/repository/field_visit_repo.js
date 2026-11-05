const FieldModel = require("../../admin/models/fieldVisit")

exports.feildVisitCreate = async (data) => {
    try{
        return await FieldModel.create(data, { raw: true });
    }catch(error){
        console.log(error)
    }
}