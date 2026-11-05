const sku = require("../../admin/models/SKU");
const skuModel = require("../../admin/models/SKU")
const inventoryModel = require("../../admin/models/inventory");
const skuCategoryModel = require("../../admin/models/sku_category")
const moment = require('moment')


exports.getSkuRange = async (storeCode) => {
    try{
        // console.log(storeCode,"repo")
        let skus = await skuModel.findAll({
            where: { store_code: storeCode },
            attributes: ['id', 'sku_no', 'store_code', 'range'],
            raw: true,
            nest: true
        });
        return skus
    }catch(error){
        console.log(error)
    }
}

exports.getSkuName = async (id) => {
    try{

        let skus = await skuModel.findAll({
            where: { store_id: id },
            attributes: ['id','sku_no','category','final_sku_name'],
            raw: true,
            nest: true
        });
        // console.log(skus,"skusssssss")
        const allCategories = skus.map(item => item.category).flat();
        // console.log(allCategories,"allCategories");
        const uniqueArray = Array.from(new Set(allCategories));
        // console.log(uniqueArray,"uniqueArray");
        let categorys = await skuCategoryModel.findAll({
            where: { id: uniqueArray },
            // attributes: ['sku_no'],
            raw: true,
            nest: true
        });
        // console.log(skus,"skusskusskusskus");
        let finalData = categorys.map(category => {
            return {
              category_name: category.category_name,
              id: category.id,
              image: category.image,
              sku: skus.filter(sku => sku.category.includes(category.id))
            };
          });
          console.log(finalData,"finaldtatata");
          let array2 = finalData.map(category => ({
            category_name: category.category_name,
            image:`http://35.73.254.5//media/upload/${category.image}`,
            id: category.id,
            sku: category.sku.map(sku => ({
              value: sku.id,
              label: sku.final_sku_name
            }))
          }));
          console.log(array2,"array2array2");
        //   return;
          return array2;
          
        // console.log(categorys,"categorycategory");
        // let skuAddedData = skus.map((value) => {
        //     let categryData = value.category;
        //     let loopCategory = categryData.map((element) => {
        //         console.log(element,"elemenetsss")
        //     })
            // console.log(value,"vlaue")
        // })


        // console.log(skus,"allsku")
    }catch(error){
        console.log(error)
    }
}

exports.createInventory = async(data) => {
    try{
        let inventory = await inventoryModel.bulkCreate(data, { validate: true, raw: true })
        return inventory;
    }catch(error){
        console.log(error)
    }
}

exports.closingInventory = async (reqqBody,remark,Id,date) => {
    try{
        console.log(reqqBody,date,Id,"dtatata")
        let update  = reqqBody.map(async (element) => {
            console.log(element,"element");
            let finddsr = await inventoryModel.findOne({
                where:{id:element.id,user_id:Id,sku_id:element.sku_id,date:date},
                raw:true,
                nest:true
            });
            let findSku = await skuModel.findOne({
                where:{id:element.sku_id},
                raw:true,
                nest:true
            });
            console.log(findSku,"findsku")
            console.log(finddsr,"findddssdr")
            let totaldsr = finddsr.opning_inventory + finddsr.new_inventory;
            let Dsr = totaldsr - element.closing_inventory
            let total = Dsr * findSku.mrp;
            console.log(total,"totaalala");
            // return;
            let updateInventory = await inventoryModel.update({
                closing_inventory:element.closing_inventory,
                dsr:Dsr,
                remark:remark,
                total:total
            },{where:{id:element.id,user_id:Id,sku_id:element.sku_id,date:date}})
        });
        return update

    }catch(error){
        console.log(error)
    }
}
exports.newInventory = async (reqqBody,Id,date,remark) => {
    try{
        console.log(reqqBody,date,Id,remark,"dtatata")
        let update  = reqqBody.map(async (element) => {
            let updateInventory = await inventoryModel.update({
                new_inventory:element.new_inventory,
                remark:remark
            },{where:{id:element.id,user_id:Id,sku_id:element.sku_id,date:date}})
        });
        return update

    }catch(error){
        console.log(error)
    }
}


exports.findInventory = async (data) => {
    try {

        var DataIso = moment(data.date).format()
        let findInventory = await inventoryModel.findAll({
            where: { date: DataIso },
            attributes: ['id', 'sku_id', 'opning_inventory'],
            raw: true,
            nest: true
        })

        return findInventory
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.updateInventory = async (data) => {
    try {

        console.log(data, ":data")



        var updateClosingInve = data.map((index) => {

            var DSR = (index.opening_inventory - index.closing_inventory)
            return inventoryModel.update(
                { closing_inventory: index.closing_inventory, dsr: DSR },
                { where: { sku_id: index.sku_id } }
            )
        })

        return updateClosingInve

    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.createClosingInventory = async (data) => {
    try {

        var createClosingInv = await inventoryModel.bulkCreate(data, { validate: true, raw: true })
        return createClosingInv

    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.getInventory = async (user_id,reqBody) => {
    try{
        console.log(user_id,reqBody,"repoe")
        // return;
        var DataIso = moment(reqBody.date).format();
        console.log(DataIso,"DateIso")
        let inventorys = await inventoryModel.findAll({
            where: {user_id:user_id ,store_id: reqBody.store_id , date:reqBody.date},
            attributes: ['id', 'sku_id', 'opning_inventory', 'store_id','sku_full_name','date','category_id'],
            raw: true,
            nest: true
        });
        console.log(inventorys,"inventoryss")
        const allCategories = inventorys.map(item => item.category_id).flat();
        // console.log(allCategories,"allCategories");
        const uniqueArray = Array.from(new Set(allCategories));
        // console.log(uniqueArray,"uniquququ")
        // console.log(inventorys,"ssss");
        let categorys = await skuCategoryModel.findAll({
            where: { id: uniqueArray },
            // attributes: ['sku_no'],
            raw: true,
            nest: true
        });
        // console.log(categorys,"cateyooooo");
        // console.log(inventorys,"inventorysinventorys");
        let finalData = categorys.map(category => {
            return {
              category_name: category.category_name,
              id: category.id,
              image: category.image,
              inventory: inventorys.filter(inven => inven.category_id == category.id),
            };
          });
          let array2 = finalData.map(category => ({
            category_name: category.category_name,
            id: category.id,
            image:`http://35.73.254.5//media/upload/${category.image}`,
            sku: category.inventory.map(sku => ({
              value: sku.id,
              label: sku.sku_full_name,
              sku_id:sku.sku_id,
              open_inventory: sku.opning_inventory
            }))
          }));
          console.log(array2,"array2array2array2");
        // return;
        return array2;
    }catch(error){
        console.log(error)
    }
}
exports.getDsr = async (user_id,reqBody) => {
    try{
        console.log(user_id,reqBody,"repoe")
        // return;
        var DataIso = moment(reqBody.date).format()
        let inventorys = await inventoryModel.findAll({
            where: {user_id:user_id ,store_id: reqBody.store_id , date:reqBody.date},
            attributes: ['id', 'sku_id', 'opning_inventory', 'store_id','dsr','sku_full_name','date','category_id'],
            raw: true,
            nest: true
        });
        const allCategories = inventorys.map(item => item.category_id).flat();
        // console.log(allCategories,"allCategories");
        const uniqueArray = Array.from(new Set(allCategories));
        // console.log(uniqueArray,"uniquququ")
        // console.log(inventorys,"ssss");
        let categorys = await skuCategoryModel.findAll({
            where: { id: uniqueArray },
            // attributes: ['sku_no'],
            raw: true,
            nest: true
        });
        // console.log(categorys,"cateyooooo");
        // console.log(inventorys,"inventorysinventorys");
        let finalData = categorys.map(category => {
            return {
              category_name: category.category_name,
              id: category.id,
              image: category.image,
              inventory: inventorys.filter(inven => inven.category_id == category.id),
            };
          });
          let array2 = finalData.map(category => ({
            category_name: category.category_name,
            id: category.id,
            image:`http://35.73.254.5//media/upload/${category.image}`,
            sku: category.inventory.map(sku => ({
              value: sku.id,
              label: sku.sku_full_name,
              sku_id:sku.sku_id,
              dsr: sku.dsr
            }))
          }));
          console.log(array2,"array2array2array2");
        // return;
        return array2;
    }catch(error){
        console.log(error)
    }
}