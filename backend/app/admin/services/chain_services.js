const { Sequelize } = require('../../../config/database');
const chainRepo = require('../repository/chain_repo.js');
const projectModel = require('../models/project');
const zoneModel = require('../models/zone');

exports.createChain = async (reqBody) => {
    try {
        console.log(reqBody,"ss")
        let getProject = await projectModel.findAll({
            // where: { id: reqBody.project_id },
            attributes: ['id', 'project_name', "image", "zone"], raw: true,
            nest: true,
        })
        var getAllZone = await zoneModel.findAll({
            attributes: ['id', 'zone_name'], raw: true,
            nest: true,
        })
        let validateData = reqBody.map((value) => {
            

            const project = getProject.find((element) => {
                return element.project_name == value.project_name;
            });
            var zoneArr = []

            console.log(typeof value.zone , ": value.zone ")
            var zone;
            if (typeof value.zone == 'string') {
               
                zone = JSON.parse(value.zone)
                zone.map((zone) => {
                    getAllZone.find((element) => {
                        if (element.zone_name == zone) zoneArr.push(element.id);
                    });
                });

                return {
                    chain_name: "chain_name" ? value.chain_name : null,
                    project_id: project ? project.id : null,
                    project_name: project ? project.project_name : null,
                    zone: 'zone' ? zoneArr : null,
                }
            }else{
                console.log("condition tr")
              
                return {
                    chain_name: "chain_name" ? value.chain_name : null,
                    project_id: project ? project.id : null,
                    project_name: project ? project.project_name : null,
                    zone: 'zone' ? value.zone : null,
                }
            }
            

       

        })
        // console.log(validateData);
        // return;
        // const createChainObj = {
        //     chain_name: reqBody.chain_name,
        //     // image: Image ? Image :" ",
        //     project_id: reqBody.project_id,
        //     project_name: getProject.project_name
        // }

        let createrChain = await chainRepo.createChain(validateData)
        return createrChain

    } catch (error) {
        console.log(error, "--------------------------------error-----------------------------------------")
        console.log('error  ', error instanceof Sequelize.AggregateError)
        throw error;
    }
}

exports.getAllChain = async (reqQuery,sort_array,filter_value) => {
    try {
        // console.log(reqQuery,sort_array,filter_value,"reqQuery,sort_array,filter_value")
        let getChain = await chainRepo.getAllChain(reqQuery,sort_array,filter_value)
        return getChain
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.getAllvalueChain = async () => {
    try {
        let getChain = await chainRepo.getAllvalueChain()
        return getChain
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.getChainOnProject = async (id) => {
    try {
        let getChain = await chainRepo.getChainOnProject(id)
        return getChain
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteChain = async (id) => {
    try {

        await chainRepo.deleteChain(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.update = async (id, reqBody) => {
    try {
        await chainRepo.updateChain(id, reqBody)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await chainRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getAllChainZoneWise = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let getZoneWiseChain = await chainRepo.getAllChainZone(reqQuery, sort_array, filter_value, reqUser)
        return getZoneWiseChain
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}