const { ValidationError } = require("../../../helper/commonResponce");
const chainRepo = require("../../admin/repository/chain_repo")
const sideRepo = require("../repository/sidebar_repo")
const { commonResponse } = require('../../../helper');
const citiModel = require("../models/citis")
const stateModel = require("../models/state")
const zoneModel = require("../../admin/models/zone")
const authRepo = require('../../admin/repository/auth_repo');
const { Op }= require('sequelize')


exports.chainName = async (reqBody) => {
    try {

        var ChainNameFind = await chainRepo.getAllChain()
        return ChainNameFind

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }

}


exports.citiFind = async (id) => {
    try {

        var citiFind = await citiModel.findAll({
            where: { state_id: id },
            attributes: ['id', 'city_name'],
            raw: true,
            nest: true
        })
        return citiFind

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.stateFind = async (Zone) => {
    try {
        // console.log(Zone,"zoznns")
        var stateFind;
        if (Zone) {
            // console.log("iff")
            Zone = Zone.replace(/[0-9]/g, '');
            // console.log(Zone,"Zonnnnn")
            filter_value = {
                [Op.or]: [{ "zone_name":{ [Op.like]: `%${Zone}%` } }],
                };
            let zoneId = await zoneModel.findOne({
                where:filter_value,
                raw: true,
                nest: true
            })
            // console.log(zoneId,"idid")
            stateFind = await stateModel.findAll({
                // where: { zone: zoneId.id },
                attributes: ['id', 'state_name'],
                raw: true,
                nest: true
            })

        } else {
            // console.log("esee")
            stateFind = await stateModel.findAll({
                attributes: ['id', 'state_name'],
                raw: true,
                nest: true
            })

        }
        return stateFind
        console.log(Zone, ":Zone")

        console.log(new RegExp(Zone, "i"), ": new Re")



    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.stateFindZonewise = async (Zone) => {
    try {
        // console.log(Zone,"zoznns")
        var stateFind;
        if (Zone) {
            // console.log("iff")
            Zone = Zone.replace(/[0-9]/g, '');
            // console.log(Zone,"Zonnnnn")
            filter_value = {
                [Op.or]: [{ "zone_name": { [Op.like]: `%${Zone}%` } }],
            };
            let zoneId = await zoneModel.findOne({
                where: filter_value,
                raw: true,
                nest: true
            })
            // console.log(zoneId,"idid")
            stateFind = await stateModel.findAll({
                // where: { zone: '0' },
                attributes: ['id', 'state_name'],
                raw: true,
                nest: true
            })

        } else {
            // console.log("esee")
            stateFind = await stateModel.findAll({
                where: { zone: '0' },
                attributes: ['id', 'state_name'],
                raw: true,
                nest: true
            })

        }
        return stateFind

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.tlList = async () => {
    try {

        var GetAllTL = await authRepo.TLList()
        return GetAllTL

    } catch (error){
        console.log('error  ', error)
        throw error;
    }
}

exports.getAllvalueChain = async () =>{
    try{
        let getChain = await chainRepo.getAllvalueChain()
        return getChain
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

// exports.stateFind = async (Zone) => {
//     try {
//         console.log("getall")
//         var findALLState = await stateModel.findAll({
//             raw: true,
//             nest: true
//         })

//         return findALLState


//     } catch (error) {
//         console.log('error  ', error)
//         throw error;
//     }
// }