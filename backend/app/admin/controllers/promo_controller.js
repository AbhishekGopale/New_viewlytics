const promoService = require('../services/promo_services')
const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR, PROMO_SUCCESS_CREATED, DELETE_PROMO, DELETE_MULTIPLE_PROMO, UPDATE_PROMO } = require('../../../helper/resources/messages.json')
const updatePromoValidation = require("../validation/updatePromoValidation.js");


exports.createPromo = async (req, res, next) => {
    try {
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        const { errors, isValid } = updatePromoValidation(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        var Image = req.file.filename
        console.log(req.body)
        let createPromo = await promoService.createPromo(req.body, Image)
        if (createPromo) {
            return commonResponse.success(res, 201, PROMO_SUCCESS_CREATED);
        }
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            const errObj = {};
            for (const value of error.errors) {
                errObj[value.path] = value.message
            }
            console.log(errObj, ": --------->")
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
        } else if (error instanceof Sequelize.AggregateError) {
            return commonResponse.customErrorResponse(res, 501, 'File is Invalid');
        }
        else {
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
    }
}

exports.excellPromo = async (req, res, next) => {

    try {


        // console.log(req.body.promo_data, ":req.body")

        let createPromo = await promoService.excellPromo(req.body.promo_data)
        if (createPromo) {
            return commonResponse.success(res, 201, PROMO_SUCCESS_CREATED, createPromo);
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
        var findPromo;

        if (req.user.role_id == 8) {
            findPromo = await promoService.getAllPromoZone(req.query, sort_array, filter_value, req.user);
        } else if (req.user.role_id == 1) {
            findPromo = await promoService.getAllPromo(req.query, sort_array, filter_value);
        }

        // console.log(findPromo)
        if (findPromo) {
            return commonResponse.success(res, 200, "Successfully Get All Promo!", {
                TotalCount: findPromo.count,
				Promos: findPromo.data
            });
        }
    } catch (error) {
        console.log(error)
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deletePromo = async (req, res, next) => {
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
        const deletePromo = await promoService.deletePromo(id);

        if (deletePromo) {
            return commonResponse.success(res, 200, DELETE_PROMO);
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


        const deletePromo = await promoService.deleteMany(id);

        if (deletePromo) {
            return commonResponse.success(res, 200, DELETE_MULTIPLE_PROMO);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.updatePromo = async (req, res, next) => {
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
        var Image;
        if (req.body.promo_image) {
            var SpliteImage = req.body.promo_image.split("http://localhost:5000/media/upload/")
            Image = SpliteImage[1]
        } else {
            Image = req.file.filename
        }

        const { errors, isValid } = updatePromoValidation(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        const updatePromo = await promoService.update(id, req.body, Image);
        if (updatePromo) {
            return commonResponse.success(res, 200, UPDATE_PROMO);
        }



    } catch (error) {
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







