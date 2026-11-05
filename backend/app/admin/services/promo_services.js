const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../validation/isEmpty");
const promoRepo = require('../repository/promo_repo.js');
const chainRepo = require('../repository/chain_repo');
const projectModel = require('../models/project')
const skuModel = require('../models/SKU')
const chainModel = require('../models/chain');
const zoneModel = require('../models/zone');
const storeModel = require('../models/store')


exports.createPromo = async (reqBody, Image) => {
    try {

        var chainNameFine = await chainRepo.getById(reqBody.chain_id)
        let getProject = await projectModel.findOne({
            where: { id: reqBody.project_id },
            attributes: [ 'id', 'project_name', "image" ], raw: true,
            nest: true,
        })
        let getstore = await skuModel.findOne({
            where: { id: reqBody.sku_id },
            attributes: [ 'id', 'store_id', "sku_no" ], raw: true,
            nest: true,
        })


        console.log(getstore, "getstore")
        let arrayzone = JSON.parse(reqBody.zone);
        console.log(arrayzone,"arayaxozns")

        const createPromoObj = {
            chain_id: reqBody.chain_id,
            promo_des: reqBody.promo_des,
            promo_image: Image,
            zone: arrayzone,
            chain_name: chainNameFine.chain_name,
            status: reqBody.status,
            promo_type: reqBody.promo_type,
            start_date: reqBody.start_date,
            end_date: reqBody.end_date,
            sku_id: reqBody.sku_id,
            project_id: getProject.id,
            store_id: getstore.store_id,
            project_name: getProject.project_name,
            sub_admin: getProject.sub_admin
        }

        console.log(createPromoObj, "--------------createSkuObj---------------");
        // return;

        let createdPromo = await promoRepo.createPromo(createPromoObj);
        return createdPromo

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.excellPromo = async (reqBody) => {
    try {

        // var FindChain = await chainRepo.getAllChain()
        let FindChain = await chainModel.findAll({
            attributes: [ 'id', 'chain_name' ], raw: true,
            nest: true,
        })
        var getAllZone = await zoneModel.findAll({
            attributes: [ 'id', 'zone_name' ], raw: true,
            nest: true,
        })
        let getProject = await projectModel.findAll({
            attributes: [ 'id', 'project_name', "image" ], raw: true,
            nest: true,
        })
        let getSku = await skuModel.findAll({
            attributes: [ 'id', 'sku_no', "project_name", "store_id", "chain_name", "category" ], raw: true,
            nest: true,
        })
        // console.log(reqBody)
        // console.log(getProject, "FindChain")

        let validateData = reqBody.map((value) => {

            const found = FindChain.find((element) => {
                return element.chain_name == value.chain_name;
            });
            const project = getProject.find((element) => {
                return element.project_name == value.project_name
            })
            const skudata = getSku.find((element) => {
                return element.sku_no == value.sku_no && element.chain_name == value.chain_name && element.project_name == value.project_name
            })
            var zoneArr = []
            var zone = JSON.parse(value.zone)

            zone.map((zone) => {
                getAllZone.find((element) => {
                    if (element.zone_name == zone) zoneArr.push(element.id);
                });
            });
            let startDate = value.start_date;
            let endDate = value.end_date;
            console.log(ExcelDateToJSDate(startDate), ":startDate")


            return {
                chain_id: found ? found.id : null,
                project_id: found ? project.id : null,
                promo_des: 'promo_des' ? value.promo_des : null,
                promo_image: 'promo_image' ? value.promo_image : null,
                zone: 'zone' ? zoneArr : null,
                chain_name: 'chain_name' ? value.chain_name : null,
                project_name: 'chain_name' ? value.project_name : null,
                status: 'status' ? value.status : null,
                promo_type: 'promo_type' ? value.promo_type : null,
                start_date: 'start_date' ? ExcelDateToJSDate(startDate) : null,
                end_date: 'end_date' ? ExcelDateToJSDate(endDate) : null,
                sku_id: skudata ? skudata.id : null,
                store_id: skudata ? skudata.store_id : null,
            }

        });
        console.log(validateData, "validatedatata")
        let createdPromo = await promoRepo.bulkcreatePromo(validateData);
        return createdPromo

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getAllPromo = async (reqQuery, sort_array, filter_value) => {
    try {

        let getAllPromo = await promoRepo.getAllPromo(reqQuery, sort_array, filter_value)
        return getAllPromo

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deletePromo = async (id) => {
    try {
        let deletePromo = await promoRepo.deletePromo(id)
        return deletePromo
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await promoRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.update = async (id, reqBody, Image) => {
    try {
        let getProject = await projectModel.findOne({
            where: { id: reqBody.project_id },
            attributes: [ 'id', 'project_name', "image" ], raw: true,
            nest: true,
        })
        var chainNameFine = await chainRepo.getById(reqBody.chain_id)
        await promoRepo.UpdatePromo(id, reqBody, Image, chainNameFine, getProject)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.getAllPromoZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let getAllPromoZone = await promoRepo.getAllPromoZone(reqQuery, sort_array, filter_value, reqUser)
        return getAllPromoZone
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
}