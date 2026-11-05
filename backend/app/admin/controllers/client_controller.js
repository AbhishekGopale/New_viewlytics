const { Sequelize } = require('../../../config/database')
let validateClientInput = require('../validation/createclient.validation')
let validateUpdateClient = require('../validation/updateClient.validation')
const clientServices = require("../services/client_services");
const { commonResponse } = require('../../../helper');
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR,CLIENT_CREATED ,CLIENT_DELETE, CLIENT_UPDATE} = require('../../../helper/resources/messages.json')


exports.createClinet = async  (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        const { errors, isValid } = validateClientInput(req.body);
		console.log(errors,isValid,"erorororor")
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		} 
		console.log(req.body,"controllereree")
        let createClient =  await clientServices.createClient(req.body)
		if (createClient) {
			return commonResponse.success(res, 201, CLIENT_CREATED);
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

exports.getAll = async (req,res,next) => {
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
		let sort_array = [ order_column, sort_order ];
		let filter_value = req.query.filter_value || "";
		console.log(req.query, sort_array, filter_value)

		// console.log(req.user, "-------->")
		var findAllClient = await clientServices.getClient(req.query, sort_array, filter_value);
		// console.log(findAllUser)
		if (findAllClient) {
			return commonResponse.success(res, 200, "Successfully Get All Client!", {
				totalCount: findAllClient.count,
				client: findAllClient.data
			});
		}

	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
};

exports.deleteClient = async (req,res,next) => {
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
		const deleteClient = await clientServices.deleteClient(id);

		if (deleteClient) {
			return commonResponse.success(res, 200, CLIENT_DELETE);
		}
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}
exports.deleteManyClient = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		let id = req.body.id
		const deleteClient = await clientServices.deleteClient(id);

		if (deleteClient) {
			return commonResponse.success(res, 200, CLIENT_DELETE);
		}
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
};

exports.updateClient = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var id = req.params.id
		const { errors, isValid } = validateUpdateClient(req.body);

		// console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
		const updateClient = await clientServices.updateClient(id, req.body);
		if (updateClient) {
			return commonResponse.success(res, 200, CLIENT_UPDATE);
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
}

exports.getByIdClient = async (req,res,next) => {
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
		let getClient = await clientServices.getClientById(id);
		console.log(getClient,"allla")
		if (getClient) {
			return commonResponse.success(res, 200, "Successfully Get User!", {
				User: {
					id: getClient.GetClient.id,
					email: getClient.GetClient.email,
					first_name: getClient.GetClient.first_name,
					last_name: getClient.GetClient.last_name,
					mobile_no: getClient.GetClient.mobile_no,
					role_id: getClient.GetClient.role_id,
					project_id:getClient.GetClient.project_id,
					project_name:getClient.GetClient.project_name,
					role_name: getClient.GetClient.role_name,
					user_name: getClient.GetClient.user_name,
					user_id: getClient.GetClient.user_id,
					user_npc: getClient.FindClientRelationalData.UserNcpId.id,
					user_npc_name: getClient.FindClientRelationalData.UserNcpId.first_name,
					user_ase: getClient.FindClientRelationalData.client_ase,
					user_ase_name: getClient.FindClientRelationalData.UserAseId.first_name,
				}
			});
		} else {
			return commonResponse.customErrorResponse(res, 200, "Something went wrong!", "Id does not valid!");
		}
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
};


exports.ncplist = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getncpList = await clientServices.ncpList()
		var allNcp = [];
		if (getncpList) {
			for (let i = 0; i < getncpList.length; i++) {
				var obj = {};
				obj[ "value" ] = getncpList[ i ].Client.id;
				obj[ "label" ] = getncpList[ i ].Client.first_name;
				allNcp.push(obj);
			}

			return commonResponse.success(res, 200, "Successfully Get All Ncp!", {
				ncp: allNcp
			});

		}
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
};

exports.aselist = async  (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getaseList = await clientServices.aseList()
		var allAse = [];
		if (getaseList) {
			for (let i = 0; i < getaseList.length; i++) {
				var obj = {};
				obj[ "value" ] = getaseList[ i ].Client.id;
				obj[ "label" ] = getaseList[ i ].Client.first_name;
				obj[ "npc" ] = { value: getaseList[ i ].UserNcpId.id, label: getaseList[ i ].UserNcpId.first_name }
				allAse.push(obj);
			}	

			return commonResponse.success(res, 200, "Successfully Get All Ase!", {
				ase: allAse
			});
		}	
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}


exports.seList = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getaseList = await clientServices.seList()
		var allAse = [];
		if (getaseList) {
			for (let i = 0; i < getaseList.length; i++) {
				var obj = {};
				obj["value"] = getaseList[i].Client.id;
				obj["label"] = getaseList[i].Client.first_name;
				obj["asm"] = { value: getaseList[i].UserAseId.id, label: getaseList[i].UserAseId.first_name }
				obj["npc"] = { value: getaseList[i].UserNcpId.id, label: getaseList[i].UserNcpId.first_name }
				allAse.push(obj);
			}

			return commonResponse.success(res, 200, "Successfully Get All SE!", {
				ase: allAse
			});
		}
	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}