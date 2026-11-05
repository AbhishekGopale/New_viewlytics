const CheckModel = require("../../admin/models/checkInOut");
const mapModel = require("../../admin/models/map")


exports.checkInOutCreate = async (data) => {
    try{
        return await CheckModel.create(data, { raw: true });
    }catch(error){
        console.log(error)
    }
}

exports.checkInOut = async (Id, data) => {
    try{
        console.log(Id,data,"repoo")
        const UpdateCheckIn = await CheckModel.update(
            data, { where: { id: Id } })
    
        return UpdateCheckIn
    }catch(error){
        console.log(error)
    }
}

exports.findMap = async (user,reqBody,date) => {
    try{
        console.log(user,reqBody,date,"repoososo");
        let map = await mapModel.findOne({
            where:{user_id:user.id,store_id:reqBody.store_id, date:date},
            raw:true,
            nest:true
        });
        console.log(map,"mappppp------------------");
        return map;
    }catch(error){
        console.log(error)
    }
}
exports.createMap = async (data) => {
    try{
        console.log(data,"dyauysaydad")
        let mapcreate = await mapModel.create(data, { raw: true });
        console.log(mapcreate,"mappppp");
        return mapcreate;
    }catch(error){
        console.log(error)
    }
}
exports.updateMap = async (data,findMap) => {
    try{
        console.log(data,"dyauysaydad")
        let mapUpdate = mapModel.update(
            data, { where: { id: findMap.id } })
        return mapUpdate;
    }catch(error){
        console.log(error)
    }
}