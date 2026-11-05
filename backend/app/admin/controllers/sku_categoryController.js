const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const skuCategoryService = require("../services/skuCategory_services.js")
const { DEFAULTERR, SKU_SUCCESS_CREATED, DELETE_SKU, UPDATE_SKU, DELETE_MULTIPLE_SKU } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');
const validateSkuCategoryInput = require('../validation/createSkuCategory.validation.js')


exports.create = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        const { errors, isValid } = validateSkuCategoryInput(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        var Image = req.file.filename
        console.log(Image, ":Image")

        const createSku = await skuCategoryService.create(req.body, Image)
        if (createSku) {
            return commonResponse.success(res, 201, SKU_SUCCESS_CREATED);
        }
    } catch (error) {

        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);

    }
}

exports.excellBulkData = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        console.log(req.body, ";----------")

        let createSkuCategory = await skuCategoryService.SkuCategoryExcel(req.body.project_id, req.body.category)
        if (createSkuCategory) {
            return commonResponse.success(res, 201, "Sku Category Created Succesfully");
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }

}

exports.getall = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { page = 1, limit = 2 } = req.query;
        let order_column = req.query.order_column || "id";
        let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
        let sort_array = [order_column, sort_order];
        let filter_value = req.query.filter_value || "";

        var findAllSkuCategory
        if (req.user.role_id == 8) {
            findAllSkuCategory = await skuCategoryService.getAllskuCategoryZone(req.query, sort_array, filter_value, req.user);
        } else if (req.user.role_id == 1) {
            findAllSkuCategory = await skuCategoryService.getAllskuCategory(req.query, sort_array, filter_value);
        }

        if (findAllSkuCategory) {
            return commonResponse.success(res, 200, "Successfully Get All SKU Category!", {
                TotalCount: findAllSkuCategory.count,
                SKU: findAllSkuCategory.data
            });
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.updateSkuCategory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.params.id
        console.log(id, ":id")
        const { errors, isValid } = validateSkuCategoryInput(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        var Image = req.file.filename
        const updateSkuCategory = await skuCategoryService.update(id, req.body, Image);
        if (updateSkuCategory) {
            return commonResponse.success(res, 200, UPDATE_SKU);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}


exports.deleteSkuCategory = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.params.id
        const deleteSkuCategory = await skuCategoryService.deleteSKUCategory(id);

        if (deleteSkuCategory) {
            return commonResponse.success(res, 200, DELETE_SKU);
        }



    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}


exports.deletemany = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        var id = req.body.id
        const deleteSkuCategory = await skuCategoryService.deleteMany(id);

        if (deleteSkuCategory) {
            return commonResponse.success(res, 200, DELETE_MULTIPLE_SKU);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};
