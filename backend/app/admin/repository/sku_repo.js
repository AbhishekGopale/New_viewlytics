const skuModel = require("../models/SKU");
const categoryModel = require('../models/sku_category')
const Store = require("../models/store");
const Chain = require("../models/chain");
const projectModel = require("../models/project");
const ZoneModel = require("../models/zone");
const { Op } = require('sequelize');
const { getAll } = require("../controllers/user_controller");


exports.createSKU = async (data) => {
    let sku = await skuModel.bulkCreate(data, { validate: true, raw: true })
    return sku;
}

exports.getAllSku = async (reqQuery, sort_array, filter_value) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
        //   var regex = new RegExp(filter_value, "i");
        filter_value = {
            [Op.or]: [{ "final_sku_name":{ [Op.like]: `%${filter_value}%` } },{ "project_name":{ [Op.like]: `%${filter_value}%` } } ,{ "varient_name":{ [Op.like]: `%${filter_value}%` } }, { "category":{ [Op.like]: `%${filter_value}%` } },{ "sku_grammage":{ [Op.like]: `%${filter_value}%` } },{ "chain_name":{ [Op.like]: `%${filter_value}%` } },{ "mrp":{ [Op.like]: `%${filter_value}%` } }],
        };
        } else {
            filter_value = {};
        }
        console.log(filter_value, "valye")
        let getSKU = await skuModel.findAll({
            where:filter_value,
            attributes: ['id', 'sku_no', 'store_id', 'category', 'project_id', 'project_name', 'chain_name', 'varient_name', 'sku_grammage', 'unit', 'final_sku_name', 'mrp', 'article_no'], raw: true,
            nest: true,
            order: [ sort_array ],
            offset: SKIP,
            limit: LIMIT
        })
        let totalCount = await skuModel.count({})
        // console.log(getSKU)
        let stores = await Store.findAll({
            raw: true,
            nest: true
        })
        let chains = await Chain.findAll({
            raw: true,
            nest: true
        })
        let Categorys = await categoryModel.findAll({
            raw: true,
            nest: true
        })
        let storeData = getSKU.map((value) => {
            const found = stores.find((element) => {
                return element.id == value.store_id;
            });
            // console.log(found.id,"idd")
            value.store_name = found ? found.store_name : " "
            value.store_id = found ? found.id : ""

        })
        let chainData = getSKU.map((value) => {
            const found = chains.find((element) => {
                return element.chain_name == value.chain_name;
            });
            // console.log(found.id,"idd")
            value.chain_id = found ? found.id : ""

        })


        let categoryData = getSKU.map((value) => {
            console.log(value, ";value")
            const found = Categorys.find((element) => {
                return element.id == value.category;
            });
            value.category = found ? found.category_name : ""
            value.category_id = found ? found.id : ""

        })

        // console.log(getSKU)
        for (let index = 0; index < getSKU.length; index++) {
            const element = getSKU[index];
            element.promo_image = `${process.env.IMAGE_URL}/${element.promo_image}`

        }

        return { data: getSKU, count: totalCount }
    } catch (error) {
        console.log(error)
    }

};

exports.getValueLabelSku = async(id) => {
    let getSKU = await skuModel.findAll({
        where:{store_id:id},
        attributes: ['id', 'sku_no', 'category', 'project_id', 'project_name', 'chain_name', 'varient_name', 'sku_grammage', 'unit', 'final_sku_name', 'mrp', 'article_no'], raw: true,
        nest: true,
    })
    return getSKU
}
exports.getValueLabelChainSku = async(id) => {
    let getSKU = await skuModel.findAll({
        where:{chain_id:id},
        attributes: ['id', 'sku_no', 'category','project_id','project_name', 'chain_name' ,'varient_name', 'sku_grammage', 'unit', 'final_sku_name', 'mrp'], raw: true,
        nest: true,
    })
    return getSKU
}

exports.deleteSku = async (id) => {
    let deleteSku = await skuModel.destroy({
        where: { id: id }
    })

    return deleteSku
}

exports.deleteMany = async (id) => {
    let deleteSku = await skuModel.destroy({
        where: { id: id }
    })

    return deleteSku
}

exports.getSkuByID = async (id) => {
    let GetSku = await skuModel.findOne({
        where: { id: id },
        attributes: ['id', 'store_code', 'project_name', 'project_id', 'category', 'chain_name', 'sku_no', 'varient_name', 'sku_grammage', 'unit', 'final_sku_name', 'mrp', 'article_no'],
        raw: true,
        nest: true
    },
    )
    return GetSku
}

exports.updateSku = async (id, reqBody) => {
    // console.log(id,reqBody,"repo")
    let getProject = await projectModel.findOne({
        where: { project_name: reqBody.project_name },
        attributes: ['id', 'project_name', "image"], raw: true,
        nest: true,
    })
    // console.log(getProject)
    let findChain = await Chain.findOne({
        where: { chain_name: reqBody.chain_name },
        attributes: [ 'id', 'chain_name', "image" ], raw: true,
        nest: true,
    })

    let stores = await Store.findOne({
        where: { id: reqBody.store_code },
        raw: true,
        nest: true
    })
    // let zones = await ZoneModel.findOne({
    //     where: { id: reqBody.zone },
    //     raw: true,
    //     nest: true
    // })
    console.log(stores.zone, "-------------------------------------------------")
    const final_sku_name = `${reqBody.sku_no}, ${reqBody.varient_name} -- ${reqBody.sku_grammage} ${reqBody.unit}`
    // console.log(final_sku_name,"final_sku_name")
    const UpdateSku = await skuModel.update(
        {
            store_code: reqBody.store_code,
            category: reqBody.category,
            chain_name: reqBody.chain_name,
            chain_id: findChain.id,
            project_name: reqBody.project_name,
            project_id: getProject.id,
            sku_no: reqBody.sku_no,
            varient_name: reqBody.varient_name,
            sku_grammage: reqBody.sku_grammage,
            unit: reqBody.unit,
            final_sku_name: final_sku_name,
            mrp: reqBody.mrp,
            zone: stores.zone,
            article_no: reqBody.article_no
        }, { where: { id: id } })

    return UpdateSku
};

exports.getcategory = async (id) => {
    let getAllCategory = await categoryModel.findAll({
        where:{project_id:id},
        raw:true,
        nest:true,
    });
    return getAllCategory;
}

exports.getAllSkuZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
            //   var regex = new RegExp(filter_value, "i");
            filter_value = {
                [Op.or]: [{ "final_sku_name": { [Op.like]: `%${filter_value}%` } }, { "project_name": { [Op.like]: `%${filter_value}%` } }, { "varient_name": { [Op.like]: `%${filter_value}%` } }, { "category": { [Op.like]: `%${filter_value}%` } }, { "sku_grammage": { [Op.like]: `%${filter_value}%` } }, { "chain_name": { [Op.like]: `%${filter_value}%` } }, { "mrp": { [Op.like]: `%${filter_value}%` } }],
            };
        } else {
            filter_value = {};
        }
        console.log(filter_value, "valye")
        let getSKU = await skuModel.findAll({
            where: { zone: reqUser.zone },
            attributes: ['id', 'sku_no', 'store_id', 'category', 'project_id', 'project_name', 'chain_name', 'varient_name', 'sku_grammage', 'unit', 'final_sku_name', 'mrp', 'article_no'], raw: true,
            nest: true,
            order: [sort_array],
            offset: SKIP,
            limit: LIMIT
        })
        let totalCount = await skuModel.count({})
        // console.log(getSKU)
        let stores = await Store.findAll({
            raw: true,
            nest: true
        })
        let chains = await Chain.findAll({
            raw: true,
            nest: true
        })
        let storeData = getSKU.map((value) => {
            const found = stores.find((element) => {
                return element.id == value.store_id;
            });
            // console.log(found.id,"idd")
            value.store_name = found ? found.store_name : " "
            value.store_id = found ? found.id : ""

        })
        let chainData = getSKU.map((value) => {
            const found = chains.find((element) => {
                return element.chain_name == value.chain_name;
            });
            // console.log(found.id,"idd")
            value.chain_id = found ? found.id : ""

        })

        // console.log(getSKU)
        for (let index = 0; index < getSKU.length; index++) {
            const element = getSKU[index];
            element.promo_image = `${process.env.IMAGE_URL}/${element.promo_image}`

        }

        return { data: getSKU, count: totalCount }
    } catch (error) {
        console.log(error)
    }
}