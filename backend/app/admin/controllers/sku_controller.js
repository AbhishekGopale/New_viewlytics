const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const skuService = require('../services/sku_services')
const { DEFAULTERR, SKU_SUCCESS_CREATED, DELETE_SKU, UPDATE_SKU, DELETE_MULTIPLE_SKU } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');
const validateSkuInput = require('../validation/createSku.validation')
const updateSkuValidation = require("../validation/updateSkuValidation.js");

exports.createSKU = async (req, res, next) => {
    try {
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}

        var SkuData = req.body.skuList
        const createSku = await skuService.createSku(SkuData)
        if (createSku) {
            return commonResponse.success(res, 201, SKU_SUCCESS_CREATED);
        }
    } catch (error) {
        console.log(error, ":error")
        if (error instanceof Sequelize.ValidationError) {
            const errObj = {};
            for (const value of error.errors) {
                errObj[value.path] = value.message
            }
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
        } else if (error instanceof ValidationError) {
            return commonResponse.customErrorResponse(res, error.errorCode, DEFAULTERR, error.errorMessage);
        } else {
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
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

        var findALlSKU
        if (req.user.role_id == 8) {
            findALlSKU = await skuService.getAllskuZone(req.query, sort_array, filter_value, req.user);
        } else if (req.user.role_id == 1) {
            findALlSKU = await skuService.getAllsku(req.query, sort_array, filter_value);
        }

        // console.log(findALlSKU,"final")
        if (findALlSKU) {
            return commonResponse.success(res, 200, "Successfully Get All SKU!", {
                TotalCount: findALlSKU.count,
				SKU: findALlSKU.data
            });
        }
    } catch (error) {
        console.log(error)
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.valueLabelSku = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        let id = req.params.id
        var findALlSKU = await skuService.getvalueLabelSku(id);
        // console.log(findALlSKU,"valueee")
        var SKUArr = []
        if (findALlSKU) {
            for (let i = 0; i < findALlSKU.length; i++) {
                var obj = {};
                obj[ "value" ] = findALlSKU[ i ].id;
                obj[ "label" ] = findALlSKU[ i ].sku_no;

                SKUArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Sku!", {
            sku: SKUArr
        });
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.skuOnChain = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        var chainId = req.params.id
        var findALlSKU = await skuService.getChainSku(chainId);
        var SKUArr = []
        if (findALlSKU) {
            for (let i = 0; i < findALlSKU.length; i++) {
                var obj = {};
                obj[ "value" ] = findALlSKU[ i ].id;
                obj[ "label" ] = findALlSKU[ i ].sku_no;

                SKUArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Sku!", {
            sku: SKUArr
        }); 
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteSku = async (req, res, next) => {
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
        const deleteSku = await skuService.deleteSKU(id);

        if (deleteSku) {
            return commonResponse.success(res, 200, DELETE_SKU);
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getByID = async (req, res, next) => {
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
        var findSku = await skuService.getSkuByID(id);
        if (findSku) {
            return commonResponse.success(res, 200, "Successfully Get Sku!", {
                Sku: findSku
            });
        } else {
            return commonResponse.customErrorResponse(res, 200, "Something went wrong!", "Id does not valid!");
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.updateSku = async (req, res, next) => {
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

        const { errors, isValid } = updateSkuValidation(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        const updateSku = await skuService.update(id, req.body);
        if (updateSku) {
            return commonResponse.success(res, 200, UPDATE_SKU);
        }



    } catch (error) {
        console.log(error,"erer")
        if (error instanceof Sequelize.ValidationError) {
            const errObj = {};
            for (const value of error.errors) {
                errObj[value.path] = value.message
            }
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
        } else {
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
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


        const deleteSku = await skuService.deleteMany(id);

        if (deleteSku) {
            return commonResponse.success(res, 200, DELETE_MULTIPLE_SKU);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.skuCategoryOnProject = async  (req,res,next) =>{
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        let id = req.params.id;
        console.log(id);
        const caategorys = await skuService.categoryOnProject(id);
        var categoryArr = []
        if (caategorys) {
            for (let i = 0; i < caategorys.length; i++) {
                var obj = {};
                obj[ "value" ] = caategorys[ i ].id;
                obj[ "label" ] = caategorys[ i ].category_name;

                categoryArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Category!", {
            category: categoryArr
        });
        // console.log(caategorys,"caategoryscaategorys")
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

