const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const storeService = require('../services/store_service')
const { DEFAULTERR, USER_SUCCESS_CREATED, USER_UPDATED, DELETE_STORE, DELETE_MULTIPLE_STORE, UPDATE_STORE } = require('../../../helper/resources/messages.json')
const updateStoreValidation = require("../validation/updateStoreValidation.js")


exports.createStore = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
		console.log(req.body,"body");
		if (req.file) {
			var Image = req.file.filename
		}
		storeArray = []
		var BodyData;
		if (req.file) {
			storeArray.push(req.body)
			 BodyData = storeArray
			var Image = req.file.filename
			console.log(Image, ":Image")
		}else {
			BodyData = req.body.storeArray
		}
		// var BodyData = storeArray;
		console.log(BodyData,"BodyDatatat")
		let createStore = await storeService.createStore(BodyData, Image)
		console.log('createStore--', createStore)
		if (createStore) commonResponse.success(res, 201, "Store Succesfully Created");
	} catch (error) {
		if (error instanceof Sequelize.ValidationError) {
			const errObj = {};
			for (const value of error.errors) {
				errObj[ value.path ] = value.message
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

exports.getAll = async (req, res, next) => {
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
		// console.log(req.query,sort_array,filter_value)

		console.log(req.user,"checksudmain")
		var findALlStore;
		if (req.user.role_id == 8) {
			findALlStore = await storeService.getAllStoreZoneWise(req.query, sort_array, filter_value, req.user);
		} else if (req.user.role_id == 1) {
			findALlStore = await storeService.getAllStore(req.query, sort_array, filter_value);
		}

		console.log(findALlStore, "allst")
		if (findALlStore) {
			return commonResponse.success(res, 200, "Successfully Get All Store!", {
				TotalCount: findALlStore.count,
				Store: findALlStore.data
			});
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
		var findStore = await storeService.getStoreByID(id);
		var FindstateandcityId = await storeService.citystateID(findStore)
		console.log(FindstateandcityId, "FindstateandcityId")
		if (findStore) {
			findStore.city_id = FindstateandcityId.City.id
			findStore.state_id = FindstateandcityId.State.id


			return commonResponse.success(res, 200, "Successfully Get Store!", {
				Store: findStore, 
			});
		} else {
			return commonResponse.customErrorResponse(res, 200, "Something went wrong!", "Id does not valid!");
		}
	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.deleteStore = async (req, res, next) => {
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
		const deleteUser = await storeService.deleteStore(id);

		if (deleteUser) {
			return commonResponse.success(res, 200, DELETE_STORE);
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


		const deleteStore = await storeService.deleteMany(id);

		if (deleteStore) {
			return commonResponse.success(res, 200, DELETE_MULTIPLE_STORE);
		}
		return commonResponse.success(res, 200, "Successfully Get All Asm!", {
			Asm: allASM
		});

	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}


exports.updateStore = async (req, res, next) => {
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

		console.log(req.body, "req.body")
		var Image;
		if (req.body.image) {
			var SpliteImage = req.body.image.split("http://localhost:5000/media/upload/")
			Image = SpliteImage[1]
		} else {
			Image = req.file.filename
		}
		const { errors, isValid } = updateStoreValidation(req.body);

		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
		}
		const updateStore = await storeService.update(id, req.body, Image);
		if (updateStore) {
			return commonResponse.success(res, 200, UPDATE_STORE);
		}



	} catch (error) {

		console.log(error, ":error")
		if (error instanceof Sequelize.ValidationError) {
			const errObj = {};
			for (const value of error.errors) {
				errObj[ value.path ] = value.message
			}
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
		} else {
			next(error);
			return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
		}
	}
}


exports.valueLabelSTorelist = async (req, res, next) => {
	try {
		// if (!req.user) {
		// 	return res.json({
		// 		error: true,
		// 		statusCode: 401,
		// 		message: "Invalid login!",
		// 		errors: "You are not a user,you can not able to action on this module!",
		// 	});
		// }
		var FindData = await storeService.getAllStoreDropdown();

		var StoreArr = []
		if (FindData) {
			for (let i = 0; i < FindData.length; i++) {
				var obj = {};
				obj[ "value" ] = FindData[ i ].id;
				obj[ "label" ] = FindData[ i ].store_name;

				StoreArr.push(obj);
			}

		}
		return commonResponse.success(res, 200, "Successfully Get All Store!", {
			Store: StoreArr
		});

	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}
exports.dropdownSTorelist = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		console.log(req.params,"params")
		// return;
		var FindData = await storeService.getAllStoreDropdownbyid(req.params);

		var StoreArr = []
		if (FindData) {
			for (let i = 0; i < FindData.length; i++) {
				var obj = {};
				obj[ "value" ] = FindData[ i ].store_code;
				obj[ "label" ] = FindData[ i ].store_name;

				StoreArr.push(obj);
			}

		}
		return commonResponse.success(res, 200, "Successfully Get All Store!", {
			Store: StoreArr
		});

	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.UserSTorelist = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
		let id = req.params.id
		var FindData = await storeService.getAllStoreUser(id);
		console.log(FindData,"ifnfnfn")
		var StoreArr = []
		if (FindData) {
			for (let i = 0; i < FindData.length; i++) {
				var obj = {};
				obj[ "value" ] = FindData[ i ].id;
				obj[ "label" ] = FindData[ i ].store_name;

				StoreArr.push(obj);
			}

		}
		return commonResponse.success(res, 200, "Successfully Get All Store!", {
			Store: StoreArr
		});
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}
exports.CitySTorelist = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
		let city = req.params.city
		var FindData = await storeService.getAllStoreCity(city);
		console.log(FindData,"ifnfnfn")
		var StoreArr = []
		if (FindData) {
			for (let i = 0; i < FindData.length; i++) {
				var obj = {};
				obj[ "value" ] = FindData[ i ].id;
				obj[ "label" ] = FindData[ i ].store_name;

				StoreArr.push(obj);
			}

		}
		return commonResponse.success(res, 200, "Successfully Get All Store!", {
			Store: StoreArr
		});
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}