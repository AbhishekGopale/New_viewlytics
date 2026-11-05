const zoneModel = require("../models/zone");
const stateModel = require("../../web/models/state");
const { stateFind } = require("../../web/services/sidebar.service");

exports.createZone = async (data, bodyDaya) => {
    let Zonecreate = await zoneModel.create(data, { raw: true, nest: true })

    var id = Zonecreate.dataValues

    await stateModel.update({ zone: Zonecreate.dataValues.id }, { where: { id: bodyDaya.state } })
    console.log(Zonecreate.dataValues, ":updateState")

    return Zonecreate;
}

exports.getZone = async () => {
    var findZone = await zoneModel.findAll({ raw: true, nest: true })
    return findZone;
}

exports.deleteZone = async (id) => {

    await stateModel.update({ zone: "0" }, { where: { zone: id } })

    return await zoneModel.destroy({ where: { id: id } })
}

exports.updateZone = async (id, reqBody) => {
    try{
        // console.log(id, reqBody,"repo")
        const UpdateZone = await zoneModel.update(
            {
                zone_name: reqBody.zone_name
    
            }, { where: { id: id } })
        await stateModel.update({ zone: id }, { where: { id: reqBody.state } })
        return UpdateZone;
    }catch(error){
        console.log(error,"error")
    }
}

exports.getStateOnZone = async(id) => {
    try{
        // console.log(id,"repoe")
        let stateFind = await stateModel.findAll({
            where: { zone: id },
            attributes: ['id', 'state_name'],
            raw: true,
            nest: true
        })
        return stateFind;
    }catch(error){
        console.log(error)
    }
}