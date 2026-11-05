const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, ZONE_SUCCESS_CREATED, DELETE_ZONE, ZONE_UPDATE_CREATED,DELETE_MULTIPLE_CHAIN, UPDATE_CHAIN } = require('../../../helper/resources/messages.json')
const { ValidationError, } = require('../../../helper/commonResponce');
const isEmpty = require("../../isEmpty");
const zoneServices = require('../services/zone_services.js')
const zoneModule = require('../validation/zone.validation.js')
const zoneModel = require('../models/zone')
const stateModel = require('../../web/models/state')


exports.createZone = async (req, res, next) => {

    try {

        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        console.log(req.body, ":req.body")
        const { errors, isValid } = zoneModule(req.body);
        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        let createZone = await zoneServices.createZone(req.body)

        if (createZone) commonResponse.success(res, 201, ZONE_SUCCESS_CREATED);

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }

}

exports.getAllZone = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var findAllZone = await zoneServices.getAllZone()

        console.log(findAllZone, ":findAllZone")
        var zoneArr = []
        if (findAllZone) {
            for (let i = 0; i < findAllZone.length; i++) {
                var obj = {};
                obj["value"] = findAllZone[i].id;
                obj["label"] = findAllZone[i].zone_name;

                zoneArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Zone!", {
            Zone: zoneArr
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getZoneList = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        var findAllZone = await zoneModel.findAll({ attributes: ['id', 'zone_name'], raw: true, nest: true, })
        var findAllState = await stateModel.findAll({ attributes: ['id', 'state_name','zone'], raw: true, nest: true, })
        let totalCount = await zoneModel.count({})
        // console.log(findAllZone,"alal")
        // console.log(findAllState,"alalstae")
        let newData 
        let allStates = []
        let validateData = findAllZone.map((value) => {
            let newData = findAllState.map((element) => {
                if(value.id == element.zone){
                    // console.log("Print just zone",element.zone)
                    allStates.push(element)
                    value["states"] = allStates
                }
            })
            allStates = []
            // console.log(allStates,"valaioioi")
       })
       
        return commonResponse.success(res, 200, "Successfully Get All Zone!", {
            totalCount: totalCount,
            zone: findAllZone
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);

    }
}


exports.deleteZone = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        var id = req.params.id
        // process.exit()

        var deleteZone = await zoneServices.deleteZone(id)
        if (deleteZone) {
            return commonResponse.success(res, 200, DELETE_ZONE);
        }
    } catch (error) {

    }
}

exports.updateZone = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = zoneModule(req.body);
        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        var id = req.params.id;
        // console.log(req.body,"bodudu")
        // console.log(id,"iddd")
        let updateZone = await zoneServices.updateZone(id,req.body)

        if (updateZone) commonResponse.success(res, 200, ZONE_UPDATE_CREATED);
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getStateOnZoneId = async (req,res,next) => {
    try{

        let Id = req.params.id
        // console.log(Id,"ID")
        let getStates = await zoneServices.getStateByZone(Id)
        var stateArr = []
        if (getStates) {
            for (let i = 0; i < getStates.length; i++) {
                var obj = {};
                obj["value"] = getStates[i].id;
                obj["label"] = getStates[i].state_name;

                stateArr.push(obj);
            }

        }

        return commonResponse.success(res, 200, "Successfully Get All State Data!", {
            state: stateArr
        });
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getZoneValueLabel = async (req, res, next) => {
    try {

        var getAllZone = await zoneServices.getAllZone({})
        console.log(getAllZone, ";getAllZone")
        var zoneArr = []
        if (getAllZone) {
            for (let i = 0; i < getAllZone.length; i++) {
                var obj = {};
                obj["value"] = getAllZone[i].id;
                obj["label"] = getAllZone[i].zone_name;

                zoneArr.push(obj);
            }

        }

        return commonResponse.success(res, 200, "Successfully Get All Zone Data!", {
            Zone: zoneArr
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}