const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../validation/isEmpty");
const skuRepo = require('../repository/sku_repo');
const chainRepo = require('../repository/chain_repo');
let Store = require("../models/store")
let projectModel = require("../models/project")


exports.createSku = async (reqBody) => {
    try {
        console.log(reqBody,"bdydy")
        var FindChain = await chainRepo.getAllvalueChain()
        let stores = await Store.findAll({
            raw: true,
		   nest: true
        })
        let findProject = await projectModel.findAll({
            attributes: ['id', 'project_name', "image"], raw: true,
            nest: true,
        })
        // console.log(stores,"store")
        let validateData = reqBody.map((value) => {

            const found = FindChain.find((element) => {
                return element.id == value.chain_id;
            });
            const store = stores.find((elements) => {
                console.log(elements, ":elements", value, "value")
                return elements.id == value.store_id
            });
            const project = findProject.find((elements) => {
                console.log(elements, ":elements")
                return elements.id == value.project_id
            });

            console.log(found,"founffggf")
            return {
                store_id: store ? store.id : null,
                sku_no: 'sku_no' ? value.sku_no : null,
                category: 'category' ? value.category : null,
                chain_name: found ? found.chain_name : null,
                varient_name: 'varient_name' ? value.varient_name : null,
                sku_grammage: 'sku_grammage' ? value.sku_grammage : null,
                unit: 'unit' ? value.unit : null,
                final_sku_name: 'final_sku_name' ? `${value.sku_no}, ${value.varient_name} -- ${value.sku_grammage} ${value.category}` : null,
                mrp: 'mrp' ? value.mrp : null,
                chain_id: found ? found.id : null,
                project_id: project.id,
                project_name: project.project_name,
                article_no: 'article_no' ? value.article_no : null,
                zone: store.zone
            }
        });


        console.log(validateData,"validateData");
        // return;
        let createdSKU = await skuRepo.createSKU(validateData);
        return createdSKU

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getAllsku = async (reqQuery,sort_array,filter_value) => {
    try {

        let getSku = await skuRepo.getAllSku(reqQuery,sort_array,filter_value)
        // console.log(getSku,"getsksusu")
        return getSku

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};
exports.getvalueLabelSku = async (id) => {
    try {

        let getSku = await skuRepo.getValueLabelSku(id)
        // console.log(getSku,"getsksusu")
        return getSku

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};
exports.getChainSku = async (chanId) => {
    try {

        let getSku = await skuRepo.getValueLabelChainSku(chanId)
        // console.log(getSku,"getsksusu")
        return getSku

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};



exports.deleteSKU = async (id) => {
    try {
        let deleteSku = await skuRepo.deleteSku(id)
        return deleteSku
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await skuRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getSkuByID = async (id) => {
    try {

        let GetSku = await skuRepo.getSkuByID(id)
        return GetSku

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.update = async (id, reqBody) => {
    try {
        console.log(id,reqBody,"ser")
        await skuRepo.updateSku(id, reqBody)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};

exports.categoryOnProject = async ( id) =>  {
    try{
        let categorys = await skuRepo.getcategory(id)
        return categorys
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}


exports.getAllskuZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let getZoneWiseSKU = await skuRepo.getAllSkuZone(reqQuery, sort_array, filter_value, reqUser)
        return getZoneWiseSKU
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
