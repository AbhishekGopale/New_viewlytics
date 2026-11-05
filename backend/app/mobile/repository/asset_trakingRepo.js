const assetModel = require("../../admin/models/asset_traking")
const skuModel = require("../../admin/models/SKU")
const skuCategoryModel = require("../../admin/models/sku_category")

exports.findCategorys = async (store_id,user_id) => {
    console.log(store_id,user_id,"repooooo");
    let skus = await skuModel.findAll({
        where: { store_id: store_id },
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
        for (let index = 0; index < categorys.length; index++) {
            const element = categorys[ index ];
            element.image = `http://35.73.254.5//media/upload/${element.image}`
    
        }
    // console.log(categorys,"categoryscategorys");

    return categorys;
}

exports.createAsset = async  (data) => {
    return await assetModel.create(data, { raw: true });
}