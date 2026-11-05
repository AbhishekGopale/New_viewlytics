const Store = require("../../admin/models/store")
const shopperRepo = require("../repository/shopper_engagement_repo")

exports.createShopperEngagement = async (Id, reqBody, reqFile) => {
    try{
        const filenamesWithKeys = Object.entries(reqFile).reduce((acc, [key, fileArray]) => {
            const filename = fileArray[0].filename;
            acc[key] = filename;
            return acc;
          }, {});
          let store = await Store.findOne({
            where:{id:reqBody.store_id},
            raw: true,
            nest: true,
        })
        console.log(store)
        console.log(Id, reqBody, reqFile, "serv")
        console.log(filenamesWithKeys)
        let shopperObject = {
            user_id: Id,
            store_id: reqBody.store_id,
            store_name: store.store_name,
            cust_approach_image: filenamesWithKeys.cust_approach_image,
            any_sample_image: filenamesWithKeys.any_sample_image,
            other_image: filenamesWithKeys.other_image,
            cust_approach_image2: filenamesWithKeys.cust_approach_image2,
            any_sample_image2: filenamesWithKeys.any_sample_image2,
            other_image2: filenamesWithKeys.other_image2
        }
        let createShopper = await shopperRepo.shopperCreate(shopperObject)
        return createShopper
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
};

exports.findByIdShopper = async (reqQuery) => {
    try{
        console.log(reqQuery,"ss")
        let getByIdShooper = await shopperRepo.getByIdShopper(reqQuery);
        return getByIdShooper;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.getAllShopper = async (reqQuery,sort_array,filter_value) => {
    try {

        let GetShopper = await shopperRepo.getAllShopper(reqQuery,sort_array,filter_value)
        return GetShopper

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}