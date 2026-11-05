const targetRepo = require('../repository/target_repo')
let userModel = require('../models/user')
let storeModel = require('../models/store')
let skuModel = require('../models/SKU')

exports.createTarget = async (reqBody) => {
    try{
        console.log(reqBody,"servbod");
        let skuDetail = await skuModel.findOne({
            where:{id:reqBody.sku_id},
            raw:true,
            nest:true,
        });
        let obj = {
            user_id: reqBody.user_id,
            store_id:reqBody.store_id,
            target_type:reqBody.target_type,
            target:reqBody.target,
            sku_id:reqBody.sku_id,
            start_date: reqBody.start_date,
            end_date:reqBody.end_date,
            total_target: reqBody.target_type == 0 ? reqBody.target * skuDetail.mrp : reqBody.target
        }
        // console.log(obj,"skudetaill")
        // return;
        const createTarget = await targetRepo.createTarget(obj)
        return createTarget
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};


exports.getTargetCreate = async (reqBody) => {
    try{
        let users = await userModel.findAll({
            attributes: ['id', 'user_id', "user_name"], raw: true,
            nest: true,
        })
        let stores = await storeModel.findAll({
            attributes: ['id', 'store_code', "store_name"], raw: true,
            nest: true,
        })
        let skus = await skuModel.findAll({
            attributes: ['id', 'sku_no',], raw: true,
            nest: true,
        })
        let validateData = reqBody.map((value) => {

            const user = users.find((element) => {
                return element.user_id == value.user_id;
            });
            const store = stores.find((element) => {
                return element.store_code == value.store_code;
            });
            const sku = skus.find((element) => {
                return element.sku_no == value.sku_no;
            });
            let startDate = value.start_date;
            let endDate = value.end_date;

            return {
                user_id: user ? user.id : null,
                store_id: store ? store.id : null,
                target_type: 'target_type' ? value.target_type : null,
                target: 'pieces' ? value.pieces : null,
                start_date : 'start_date' ? ExcelDateToJSDate(startDate) : null,
                end_date: 'end_date' ? ExcelDateToJSDate(endDate) : nulll,
                sku_id: sku ? sku.id : null
            }

        })
        const createTarget = await targetRepo.bulkCreateTarget(validateData)
        return createTarget
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.updateTarget = async (id,reqBody) => {
    try{
        // console.log(id ,reqBody,"servbod")
        const updateTarget = await targetRepo.updateTarget(id, reqBody)
        return updateTarget
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getAllTarget = async (reqQuery,sort_array,filter_value) => {
    try{
        let getAllTarget = await targetRepo.getAllTarget(reqQuery,sort_array,filter_value)
        return getAllTarget
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.get = async (id) => {
    try {
        const get = await targetRepo.get(id)
        return get
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteTarget = async (id) => {
    try {
        // console.log(id,"serv");
        const deleteTarget = await targetRepo.deleteTarget(id)
        return deleteTarget

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.deleteMany = async (id) => {
    try {
        console.log(id, "serv");
        const deleteMany = await targetRepo.deleteTarget(id)
        return deleteMany

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

function ExcelDateToJSDate(date) {
    return new Date(Math.round((date - 25569) * 86400 * 1000));
}
