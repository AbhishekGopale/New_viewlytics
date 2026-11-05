const { Sequelize } = require('../../../config/database');
const zoneRepo = require('../repository/zone_repo.js');


exports.createZone = async (reqBody) => {
    try {

        const createZoneObj = {
            zone_name: reqBody.zone_name,
        }

        let createZone = await zoneRepo.createZone(createZoneObj, reqBody)
        return createZone

    } catch (error) {
        console.log(error, "--------------------------------error-----------------------------------------")
        console.log('error  ', error instanceof Sequelize.AggregateError)
        throw error;
    }
}

exports.getAllZone = async () => {
    try {
        let getZone = await zoneRepo.getZone()
        return getZone


    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteZone = async (data) => {
    try {

        return await zoneRepo.deleteZone(data)

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.updateZone = async (id, reqBody) => {
    try {

        // console.log(id,reqBody,"sevice")
        let updateZone = await  zoneRepo.updateZone(id,reqBody)
        return updateZone;

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getStateByZone = async (id) => {
    try{
        // console.log(id,"iddd")
        let getstates = await zoneRepo.getStateOnZone(id);
        return getstates;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}