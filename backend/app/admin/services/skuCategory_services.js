const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../validation/isEmpty");
const skuCategoryRepo = require('../repository/skuCategory_repo.js');

exports.create = async (reqBody, Image) => {
    try {

        const createProjectObj = {
            project_id: reqBody.project_id,
            image: Image,
            category_name: reqBody.category_name
        }


        let createdSKUCategory = await skuCategoryRepo.createSKUCategory(createProjectObj);
        return createdSKUCategory

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.SkuCategoryExcel = async (projectId, CategoryData) => {
    try {
        console.log(CategoryData,"CategoryDataCategoryData")
        let validateData = CategoryData.map((value, index) => {
            var Images = value.image
            // console.log(Images.length, ";----------------------")
            // downloadImage(Images, `${index}-Projectimg.png`);

            return {
                project_id: projectId,
                category_name: 'category_name' ? value.category_name : null,
                image: 'image' ? `${index}-Category.png` : null,

            }
        })
        let createSkuCategory = await skuCategoryRepo.createSkuCategoryExcel(validateData)
        return createSkuCategory

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}




exports.getAllskuCategory = async (reqQuery, sort_array, filter_value) => {
    try {

        let getSkuCategory = await skuCategoryRepo.getAllSkuCategory(reqQuery, sort_array, filter_value)
        // console.log(getSkuCategory,"getsksusu")
        return getSkuCategory

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};

exports.getAllskuCategoryZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {

        let getSkuCategory = await skuCategoryRepo.getAllSkuCategoryZone(reqQuery, sort_array, filter_value, reqUser)
        // console.log(getSkuCategory,"getsksusu")
        return getSkuCategory

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};


exports.update = async (id, reqBody, Image) => {
    try {
        console.log(id, reqBody, "ser")
        await skuCategoryRepo.updateSkuCate(id, reqBody, Image)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};


exports.deleteSKUCategory = async (id) => {
    try {
        let deleteSkuCategory = await skuCategoryRepo.deleteSKUCategory(id)
        return deleteSkuCategory
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await skuCategoryRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}