const merchandiserModel = require("../../admin/models/merchandiser_sos")
const promoterModel = require("../../admin/models/promoter_sos")
const sosModel = require("../../admin/models/sos_report")
const skuModel = require("../../admin/models/SKU");
const skuCategoryModel = require("../../admin/models/sku_category");

exports.merchandiserSosCreate = async (data) => {
    try{
        return await merchandiserModel.create(data, { raw: true });
    }catch(error){
        console.log(error)
    }
}
exports.promoterSosCreate = async (data) => {
    try{
        return await promoterModel.create(data, { raw: true });
    }catch(error){
        console.log(error)
    }
}
exports.createSos = async (data) => {
    try{
        return await sosModel.bulkCreate(data, { raw: true });
    }catch(error){
        console.log(error)
    }
};

exports.getSos  = async (reqBody) => {
    let getSos = await sosModel.findAll({
        where:{store_id:reqBody.store_id, date:reqBody.date},
        attributes:["id","store_id","date","category_id","brand_facing","compation_facing","sos_per"],
        nest:true,
        raw:true
    });
    let skus = await skuModel.findAll({
        where: { store_id: reqBody.store_id },
        attributes: ['id','sku_no','category','final_sku_name'],
        raw: true,
        nest: true
    });
    const allCategories = skus.map(item => item.category).flat();
        // console.log(allCategories,"allCategories");
        const uniqueArray = Array.from(new Set(allCategories));
        // console.log(uniqueArray,"uniqueArray");
        let categorys = await skuCategoryModel.findAll({
            where: { id: uniqueArray },
            attributes: ['category_name',"id","image"],
            raw: true,
            nest: true
        });
        let cityAddedData = getSos.map((value) => {
            const found = categorys.find((element) => {
                return element.id == value.category_id;
            });
            // console.log(found.id,"idd")
            value.category_name = found ? found.category_name : " "
            value.category_image = found ? found.image : " "
    
        });
        for (let index = 0; index < getSos.length; index++) {
            const element = getSos[ index ];
            element.category_image = `http://35.73.254.5//media/upload/${element.category_image}`
    
        }
    

    return getSos;
}