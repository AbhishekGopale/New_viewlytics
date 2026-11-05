const promoModel = require("../models/promo");
const Sku = require("../models/SKU");
const Zone = require("../models/zone");
const { Op }= require('sequelize')
var moment = require('moment')
exports.createPromo = async (data) => {
    return await promoModel.create(data, { raw: true })
}


exports.bulkcreatePromo = async (data) => {
    let promo = await promoModel.bulkCreate(data, { validate: true, raw: true })
    return promo;
}

exports.getAllPromo = async (reqQuery,sort_array,filter_value) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
        //   var regex = new RegExp(filter_value, "i");
        filter_value = {
            [Op.or]: [{ "zone":{ [Op.like]: `%${filter_value}%` } },{ "project_name":{ [Op.like]: `%${filter_value}%` } }, { "chain_name":{ [Op.like]: `%${filter_value}%` } }],
        };
        } else {
        filter_value = {};
        }
        // console.log(filter_value)
        let getAllPromo = await promoModel.findAll({
            where:filter_value,
            attributes: ['id', 'chain_id','project_id', 'project_name','promo_des', 'promo_type','promo_image', 'status', 'zone', 'chain_name',"start_date","end_date"], raw: true,
            nest: true,
            include: [
                {
                    model: Sku,
                    as: 'skuId',
                    attributes: ['id', 'sku_no', 'final_sku_name', 'varient_name']
                }],
            order:[sort_array],
            offset: SKIP,
            limit : LIMIT
        })
        // console.log(getAllPromo)
        let zones = await Zone.findAll({
            raw: true,
            nest: true,
        })

        let cityAddedData = getAllPromo.map((value) => {

            var zoneArray = []
            if (Array.isArray(value.zone)) {

                var ZoneMap = value.zone.map((data) => {
                    const found = zones.find((element) => {
                        return element.id == data;
                    });

                    zoneArray.push(found.zone_name)
                    console.log(found.zone_name, "idd")
                    value.zone_name = zoneArray
                })

            } else {
                const found = zones.find((element) => {
                    return element.id == value.zone;
                });

                value.zone_name = found ? found.zone_name : ""
            }


            console.log(value.zone, ":zone_name")
        })



        for (let index = 0; index < getAllPromo.length; index++) {
            const element = getAllPromo[index];
            element.promo_image = `http://35.73.254.5//media/upload/${element.promo_image}`

            element.start_date = element.start_date.slice(0, 10).split('-').reverse().join('-')
            element.end_date = element.end_date.slice(0, 10).split('-').reverse().join('-')



        }
        let totalCount = await promoModel.count({})

        return {data:getAllPromo , count:totalCount}
    } catch (error) {
        console.log(error)
    }

}

exports.deletePromo = async (id) => {
    let deletePromo = await promoModel.destroy({
        where: { id: id }
    })

    return deletePromo
}

exports.deleteMany = async (id) => {
    let deletePromo = await promoModel.destroy({
        where: { id: id }
    })

    return deletePromo
}

exports.UpdatePromo = async (id, reqBody, Image, chainNameFine, getProject) => {
    let arrayzone = JSON.parse(reqBody.zone);


    const UpdatePromo = await promoModel.update(
        {
            chain_id: reqBody.chain_id,
            promo_des: reqBody.promo_des,
            promo_image: Image,
            zone: arrayzone,
            promo_type: reqBody.promo_type,
            start_date: reqBody.start_date,
            end_date: reqBody.end_date,
            sku_id: reqBody.sku_id,
            chain_name: chainNameFine.chain_name,
            status: reqBody.status,
            project_id: getProject.id,
            project_name: getProject.project_name,
            sub_admin: getProject.sub_admin
        }, { where: { id: id } })

    return UpdatePromo
}




exports.getAllPromoZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
            //   var regex = new RegExp(filter_value, "i");
            filter_value = {
                [Op.or]: [{ "zone": { [Op.like]: `%${filter_value}%` } }, { "project_name": { [Op.like]: `%${filter_value}%` } }, { "chain_name": { [Op.like]: `%${filter_value}%` } }],
            };
        } else {
            filter_value = {};
        }
        // console.log(filter_value)
        let getAllPromo = await promoModel.findAll({
            where: { zone: reqUser.zone },
            attributes: ['id', 'chain_id', 'project_id', 'project_name', 'promo_des', 'promo_image', 'status', 'zone', 'chain_name'], raw: true,
            nest: true,
            include: [
                {
                    model: Sku,
                    as: 'skuId',
                    attributes: ['id', 'sku_no', 'final_sku_name', 'varient_name']
                }],
            order: [sort_array],
            offset: SKIP,
            limit: LIMIT
        })
        // console.log(getAllPromo)
        let zones = await Zone.findAll({
            raw: true,
            nest: true,
        })

        let promoData = getAllPromo.map((value) => {
            const found = zones.find((element) => {
                return element.id == value.zone;
            });
            // console.log(found.id,"idd")
            value.zone_name = found ? found.zone_name : ""

        })
        for (let index = 0; index < getAllPromo.length; index++) {
            const element = getAllPromo[index];
            element.promo_image = `http://35.73.254.5//media/upload/${element.promo_image}`

        }
        let totalCount = await promoModel.count({})

        return { data: getAllPromo, count: totalCount }
    } catch (error) {
        console.log(error)
    }

}