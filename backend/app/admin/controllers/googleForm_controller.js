const { Sequelize } = require('../../../config/database')
const FormServices = require("../services/googleForm_services");
let validateform = require('../validation/createForm.validation')
const { commonResponse } = require('../../../helper');
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR,FORM_CREATED ,FORM_DELETE, FORM_UPDATE} = require('../../../helper/resources/messages.json')

exports.formCreate = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        // console.log(req.body,"controller")
		const { errors, isValid } = validateform(req.body);

		// console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
        let createForm = await FormServices.createForm(req.body);
        if (createForm) {
			return commonResponse.success(res, 201, FORM_CREATED);
		}
    }catch(error){
        if (error instanceof Sequelize.ValidationError) {
			const errObj = {};
			for (const value of error.errors) {
				errObj[ value.path ] = value.message
			}
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
		} else if (error instanceof ValidationError) {
			return commonResponse.customErrorResponse(res, error.errorCode, DEFAULTERR, error.errorMessage);
		} else {
			next(error);
			return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
		}
    }
};

exports.formListing = async(req,res,next) => {
    try{
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
        let formListing = await FormServices.formListing(req.query,sort_array,filter_value);
        console.log(formListing,"list")
        if (formListing) {
            return commonResponse.success(res, 200, "Successfully Get All Form!", {
                totalcount: formListing.count,
				form: formListing.data
            });
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.formDelete = async (req,res,next) => {
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
        let deleteForm = await FormServices.deleteForm(id);
		if (deleteForm) {
			return commonResponse.success(res, 200, FORM_DELETE);
		}
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}
exports.formDeleteMany = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        let id = req.body.id;
        let deleteForm = await FormServices.deleteForm(id);
		if (deleteForm) {
			return commonResponse.success(res, 200, FORM_DELETE);
		}
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.updateForm = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		const { errors, isValid } = validateform(req.body);

		// console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
		let id = req.params.id
		let updateForm = await FormServices.updateForm(id, req.body);
		if (updateForm) {
			return commonResponse.success(res, 200, FORM_UPDATE);
		}
	}catch(error){
		next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
};

exports.userOnPoject = async (req,res,next) => {
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
		let getUsers = await FormServices.getUsers(id);
		console.log(getUsers,"all")
		var userArr = []
        if (getUsers) {
            for (let i = 0; i < getUsers.length; i++) {
                var obj = {};
                obj[ "value" ] = getUsers[ i ].user_id;
                obj[ "label" ] = getUsers[ i ].first_name +" "+ getUsers[ i ].last_name;

                userArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Users!", {
            users: userArr
        });
	}catch(error){
		next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}