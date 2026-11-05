const SkuCateModel = require("../models/sku_category");
const ProjectModel = require("../models/project");


exports.createSKUCategory = async (data) => {
    return await SkuCateModel.create(data, { raw: true })
}

exports.createSkuCategoryExcel = async (data) => {
    let SkuCategory = await SkuCateModel.bulkCreate(data, { validate: true, raw: true })
    return SkuCategory;
}



exports.getAllSkuCategory = async (reqQuery, sort_array, filter_value) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
            filter_value = {
                [Op.or]: [{ "final_sku_name": { [Op.like]: `%${filter_value}%` } }, { "project_name": { [Op.like]: `%${filter_value}%` } }, { "varient_name": { [Op.like]: `%${filter_value}%` } }, { "category": { [Op.like]: `%${filter_value}%` } }, { "sku_grammage": { [Op.like]: `%${filter_value}%` } }, { "chain_name": { [Op.like]: `%${filter_value}%` } }, { "mrp": { [Op.like]: `%${filter_value}%` } }],
            };
        } else {
            filter_value = {};
        }

        let getSKUCategory = await SkuCateModel.findAll({
            where: filter_value,
            attributes: ['id', 'project_id', 'category_name', 'image'], raw: true,
            nest: true,
            order: [sort_array],
            offset: SKIP,
            limit: LIMIT
        })

        let totalCount = await SkuCateModel.count({})

        let Project = await ProjectModel.findAll({
            raw: true,
            nest: true
        })
        let chainData = getSKUCategory.map((value) => {
            const found = Project.find((element) => {
                return element.id == value.project_id;
            });

            value.project_name = found ? found.project_name : ""

        })
        for (let index = 0; index < getSKUCategory.length; index++) {
            const element = getSKUCategory[index];
            element.image = `http://35.73.254.5/media/upload/${element.image}`

        }
        return { data: getSKUCategory, count: totalCount }
    } catch (error) {
        console.log(error)
    }

};


exports.getAllSkuCategoryZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;
        if (filter_value != "") {
            filter_value = {
                [Op.or]: [{ "final_sku_name": { [Op.like]: `%${filter_value}%` } }],
            };
        } else {
            filter_value = {};
        }
        let getProject = await ProjectModel.findAll({
            attributes: ['id', 'project_name', "zone"], raw: true,
            nest: true,
        })


        var getZoneProject = []

        for (let index = 0; index < getProject.length; index++) {
            const element = getProject[index];

            var zone = element.zone

            const found = zone.find((value) => {
                if (value === reqUser.zone) {
                    getZoneProject.push(element.id)
                }
            });
        }



        let getSKUCategory = await SkuCateModel.findAll({
            where: { project_id: getZoneProject },
            attributes: ['id', 'project_id', 'category_name', 'image'], raw: true,
            nest: true,
            order: [sort_array],
            offset: SKIP,
            limit: LIMIT
        })

        let totalCount = await SkuCateModel.count({ where: { project_id: getZoneProject } })

        let Project = await ProjectModel.findAll({
            raw: true,
            nest: true
        })
        let chainData = getSKUCategory.map((value) => {
            const found = Project.find((element) => {
                return element.id == value.project_id;
            });

            value.project_id = found ? found.project_name : ""

        })




        return { data: getSKUCategory, count: totalCount }
    } catch (error) {
        console.log(error)
    }
}

exports.updateSkuCate = async (id, reqBody, Image) => {

    const UpdateUser = await SkuCateModel.update(
        {
            project_id: reqBody.project_id,
            category_name: reqBody.category_name,
            Image: Image
            // sub_admin: getProject.sub_admin
        }, { where: { id: id } })

    return UpdateUser
}

exports.deleteSKUCategory = async (id) => {
    let deleteSKUCategory = await SkuCateModel.destroy({
        where: { id: id }
    })

    return deleteSKUCategory
}

exports.deleteMany = async (id) => {
    let deleteSkuCategory = await SkuCateModel.destroy({
        where: { id: id }
    })

    return deleteSkuCategory
}

