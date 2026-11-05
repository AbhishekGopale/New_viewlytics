const { commonResponse } = require("../../../helper");
const inventoryRepo = require("../repository/inventory_repo");
const skuModel = require("../../admin/models/SKU");
const moment = require("moment");

exports.getskurange = async (storeCode) => {
    try{
        // console.log(storeCode)
        const getSku = await inventoryRepo.getSkuRange(storeCode)
        return getSku;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
};

exports.getskuname = async (store_id) => {
    try{
        // console.log(skuNo,"ser")

        // const getSkuNo = await inventoryRepo.getSkuNo(id)

        const getSku = await inventoryRepo.getSkuName(store_id)
        return getSku;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.openInventory = async (inventoryData, remarks,Id) => {
    try{
        // console.log(inventoryData, remark,Id,"inventoryData, remark,Id");
        // return;
        let skus = await skuModel.findAll({
            raw: true,
		   nest: true
        })
        // console.log(skus,"skus")
        // console.log(inventoryData,"ser")
        let validateData = inventoryData.map((value) => {
            const sku = skus.find((element) => {
                return element.id == value.sku_id 
            });
            return {
                user_id:Id,
                store_id:'store_code' ? value.store_id : null,
                sku_id: sku ? sku.id : null,
                sku_no: sku ? sku.sku_no : null,
                category_id: 'category_id' ? value.category_id : null,
                sku_full_name: 'sku_full_name' ? sku.final_sku_name : null,
                opning_inventory: 'opening_inventory' ? value.opening_inventory : null,
                new_inventory: 0,
                date: 'date' ? value.date : null,
                remark: remarks ? remarks : null
            }
            
        })
        // console.log(validateData,"vlaissss");
        // return;
        const getinventory = await inventoryRepo.createInventory(validateData)
        return getinventory;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.closingInventory = async (reqBody, Id) => {
    try {
        let todayDate = moment().format("YYYY-MM-DD")
        // console.log(reqBody,Id,todayDate,"closingsss");
        let closinginventory = await inventoryRepo.closingInventory(reqBody.closing_inventory,reqBody.remark,Id,todayDate)
        return true;

        // var closingInve = reqBody.closing_inventory

        // var findInventory = await inventoryRepo.findInventory(reqBody)

        // var updateDataArray = []
        // var CreateDataArray = []

        // for (let index = 0; index < closingInve.length; index++) {
        //     const element = closingInve[index];
        //     const findUpdateInv = findInventory.find((Inventory) => {
        //         return element.sku_id == Inventory.sku_id
        //     })

        //     element.opening_inventory = findUpdateInv.opning_inventory
        //     if (findUpdateInv) {
        //         updateDataArray.push(element)
        //     } else {
        //         CreateDataArray.push(element)
        //     }
        // }
        // var updateInventory = await inventoryRepo.updateInventory(updateDataArray)

        // let skus = await skuModel.findAll({
        //     raw: true,
        //     nest: true
        // })

        // let validateData = CreateDataArray.map((value) => {
        //     const sku = skus.find((element) => {
        //         return element.id == value.sku_id
        //     });
        //     return {
        //         user_id: Id,
        //         store_id: 'store_code' ? value.store_code : null,
        //         sku_id: sku ? sku.id : null,
        //         sku_no: 'sku_no' ? sku.sku_no : null,
        //         range: sku ? sku.range : null,
        //         sku_full_name: 'sku_full_name' ? value.sku_full_name : null,
        //         opening_inventory: 0,
        //         closing_inventory: 0,
        //         dsr: 0,
        //         date: 'date' ? reqBody.date : null
        //     }

        // })
        // var createInventory = await inventoryRepo.createClosingInventory(validateData)


        // return { updateInventory, createInventory }





    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
};

exports.newInventory = async (Id,remark,reqBody) => {
    try{
        console.log(Id,reqBody,remark,"bodyddudhd");
        let todayDate = moment().format("YYYY-MM-DD")
        // console.log(reqBody,Id,todayDate,"closingsss");
        let closinginventory = await inventoryRepo.newInventory(reqBody,Id,todayDate,remark)
        return true;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.getInventory = async (user_id,reqBody) => {
    try{
        // console.log(reqBody,"reqBody")
        let inventory = await inventoryRepo.getInventory(user_id,reqBody)
        return inventory
        // console.log(inventory,"reponserv")
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.getDsr = async (user_id,reqBody) => {
    try{
        // console.log(reqBody,"reqBody")
        let dsr = await inventoryRepo.getDsr(user_id,reqBody)
        return dsr
        // console.log(inventory,"reponserv")
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}