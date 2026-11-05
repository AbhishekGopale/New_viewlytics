const { Sequelize } = require('../../../config/database')
let validateLoginInput = require('../validation/validateAdminLogin')
const authServices = require("../services/user_service");
const { commonResponse } = require('../../../helper');
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR, USER_SUCCESS_CREATED, USER_UPDATED, DELETE_USER, PROFILE_UPDATED, DELETE_MULTIPLE_USER, LOGOUT } = require('../../../helper/resources/messages.json')
const validateForgotPassword = require("../../../app/mobile/validation/forgotpasswordvalidation");
const validateResetPassword = require("../validation/resetpassword.validation")
const validateUpdateProfile = require("../validation/updateprofile.validation")
const validateUpdateUser = require("../validation/updateUser.validation")
const validateCreateUser = require("../validation/createuser.validation")
const authMobileServices = require("../../mobile/services/auth.services");
const jwt = require('jsonwebtoken');
const { JWT_CONFIG, Image_path } = require("../../../config/application");
const isEmpty = require('../validation/isEmpty');
const { use } = require('../routes');
const User = require('../models/user');


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
		const { errors, isValid } = validateCreateUser(req.body);
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		} 
		const createUser = await authServices.createUser(req.body);
		if (createUser) {
			return commonResponse.success(res, 201, USER_SUCCESS_CREATED);
		}
	} catch (error) {
		console.log("---", error)
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

exports.login = async (req, res, next) => {
	try {
		const { errors, isValid } = validateLoginInput(req.body);

		console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}

		const User = await authServices.login(req.body);


		if (User) {
			let token
			console.log(User,"cont")
			if(User.role_id == 8){
				 token = "Bearer " + jwt.sign({
					id: User.id,
					email: User.email,
					role_name: User.role_name,
					role_id: User.role_id,
					mobile_No: User.mobile_no,
					first_name: User.first_name,
					 role_permission: User.role_permission == null ? [1, 2, 3] : User.role_permission,
					profile_image: User.profile_image ? `${Image_path.IMAGE_PATHS}/${User.profile_image}` : "",
					zone:User.zone
				},
					JWT_CONFIG.secretKey,
					{ expiresIn: JWT_CONFIG.expiresIn });
			}
			// else if(User.role_id == 9 || User.role_id == 10 ||  User.role_id == 11){
			// 	token = "Bearer " + jwt.sign({
			// 		id: User.id,
			// 		email: User.email,
			// 		role_name: User.role_name,
			// 		role_id: User.role_id,
			// 		mobile_No: User.mobile_no,
			// 		first_name: User.first_name,
			// 		project_id: User.project_id,
			// 		project_name: User.project_name
			// 	},
			// 		JWT_CONFIG.secretKey,
			// 		{ expiresIn: JWT_CONFIG.expiresIn });
			// }
			else{
				console.log(JWT_CONFIG.expiresIn,"JWT_CONFIG.expiresIn")
				await authServices.isLogin(User)
				 token = "Bearer " + jwt.sign({
					id: User.id,
					email: User.email,
					role_name: User.role_name,
					role_id: User.role_id,
					mobile_No: User.mobile_no,
					first_name: User.first_name,
					profile_image: User.profile_image ? `${Image_path.IMAGE_PATHS}/${User.profile_image}` : ""
				},
					JWT_CONFIG.secretKey,
					{ expiresIn:"20h" });
			}
			return commonResponse.success(res, 200, "Successfully Login", {
				token: token,
			});
		}
	} catch (error) {
		console.log('error ', error)
		if (error instanceof ValidationError) {
			return commonResponse.customErrorResponse(res, error.errorCode, DEFAULTERR, error.errorMessage);
		} else {
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

		console.log("first")
		const { page = 1, limit = 2 } = req.query;
		let order_column = req.query.order_column || "id";
		let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
		let sort_array = [ order_column, sort_order ];
		let filter_value = req.query.filter_value || "";
		console.log(req.query, sort_array, filter_value)

		// console.log(req.user, "-------->")
		var findAllUser
		if (req.user.role_id == 8) {
			findAllUser = await authServices.getZoneUser(req.query, sort_array, filter_value, req.user);
		} else if (req.user.role_id == 1) {
			findAllUser = await authServices.getUser(req.query, sort_array, filter_value);
		}

		// console.log(findAllUser)
		if (findAllUser) {
			return commonResponse.success(res, 200, "Successfully Get All User!", {
				TotalCount: findAllUser.count,
				User: findAllUser.data
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
		var findUser = await authServices.getUserByID(id);
		if (findUser) {
			return commonResponse.success(res, 200, "Successfully Get User!", {
				User: {
					id: findUser.GetUser.id,
					email: findUser.GetUser.email,
					first_name: findUser.GetUser.first_name,
					last_name: findUser.GetUser.last_name,
					mobile_no: findUser.GetUser.mobile_no,
					role_id: findUser.GetUser.role_id,
					role_name: findUser.GetUser.role_name,
					user_name: findUser.GetUser.user_name,
					user_id: findUser.GetUser.user_id,
					user_tl: findUser.FindUserRelationalData.user_tl,
					user_tl_name: findUser.FindUserRelationalData.UserTlId.first_name,
					user_asm: findUser.FindUserRelationalData.user_asm,
					user_asm_name: findUser.FindUserRelationalData.UserAsmId.first_name,
					user_npm: findUser.FindUserRelationalData.user_npm,
				}
			});
		} else {
			return commonResponse.customErrorResponse(res, 200, "Something went wrong!", "Id does not valid!");
		}
	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.updateUser = async (req, res, next) => {
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
		const { errors, isValid } = validateUpdateUser(req.body);

		// console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
		const updateUser = await authServices.updateUser(id, req.body);
		if (updateUser) {
			return commonResponse.success(res, 200, USER_UPDATED);
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

exports.deleteUser = async (req, res, next) => {
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
		const deleteUser = await authServices.deleteUser(id);

		if (deleteUser) {
			return commonResponse.success(res, 200, DELETE_USER);
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

		console.log(id, ":id")

		const deleteUser = await authServices.deleteMany(id);

		if (deleteUser) {
			return commonResponse.success(res, 200, DELETE_MULTIPLE_USER);
		}

	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		const { errors, isValid } = validateForgotPassword(req.body);
		if (!isValid || !isEmpty(errors)) {
			return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
		}

		const user = await authServices.forgotPassword(email);

		if (user) {
			return commonResponse.success(res, 200, "We have e-mailed your password reset link!", {
				resetpass_link: user
			})
		}


	} catch (error) {
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

exports.resetPassword = async (req, res, next) => {
	try {
		var token = req.params.token;
		const { errors, isValid } = validateResetPassword(req.body);
		if (!isValid || !isEmpty(errors)) {
			return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
		}

		const TokenVerify = await authServices.validToken(token, req.body)
		if (!TokenVerify) {
			return commonResponse.customErrorResponse(res, 422, "This password reset token is invalid");
		}
		if (TokenVerify) {
			return commonResponse.success(res, 200, "Your Password Reset Succsesfully")
		}





	} catch (error) {
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

exports.notifications_status = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var id = 1

		let { notifications_status } = req.body

		console.log(notifications_status, ":notifications_status")



		const User = await authServices.notificationStatus(id, notifications_status)
		if (User) {
			return commonResponse.success(res, 200, "Notification setting updated successfully.")
		}



	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.TlList = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getTL = await authServices.TLLIST()

		

		var allTls = [];
		if (getTL) {
			for (let i = 0; i < getTL.length; i++) {
				var obj = {};
				obj[ "value" ] = getTL[ i ].User.id;
				obj[ "label" ] = `${getTL[ i ].User.first_name} ${getTL[ i ].User.last_name}`;
				obj["asm"] = [{ value: getTL[i].UserAsmId.id, label: getTL[i].UserAsmId.first_name }]
				obj["ta"] = [{ value: getTL[i].UserTAId.id, label: getTL[i].UserTAId.first_name }]
				allTls.push(obj);
			}


			return commonResponse.success(res, 200, "Successfully Get All TL!", {
				TL: allTls
			});
		}

	} catch (error) {
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.mercList = async (req, res, next) => {
	try {
		// if (!req.user) {
		// 	return res.json({
		// 		error: true,
		// 		statusCode: 401,
		// 		message: "Invalid login!",
		// 		errors: "You are not a user,you can not able to action on this module!",
		// 	});
		// }
		var getmercList = await authServices.mercList()

		var allMer = [];
		if (allMer) {
			for (let i = 0; i < getmercList.length; i++) {
				var obj = {};
				obj[ "value" ] = getmercList[ i ].User.id;
				obj[ "label" ] = `${getmercList[ i ].User.first_name} ${getmercList[ i ].User.last_name}`;
				// obj["ta"] = [{ value: getTL[i].UserTAId.id, label: getTL[i].UserTAId.first_name }]
				obj[ "asm" ] = { value: getmercList[ i ].UserAsmId.id, label: getmercList[ i ].UserAsmId.first_name }
				obj[ "tl" ] = { value: getmercList[ i ].UserTlId.id, label: getmercList[ i ].UserTlId.first_name }
				allMer.push(obj);
			}


			return commonResponse.success(res, 200, "Successfully Get All Merchandiser!", {
				Merchandiser: allMer
			});
		}

	} catch (error) {
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}


exports.proList = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getproList = await authServices.proList()

		var allpromoter = [];
		if (allpromoter) {
			for (let i = 0; i < getproList.length; i++) {
				var obj = {};
				obj[ "value" ] = getproList[ i ].User.id;
				obj[ "label" ] = `${getproList[ i ].User.first_name} ${getproList[ i ].User.last_name}`;
				// obj["ta"] = [{ value: getTL[i].UserTAId.id, label: getTL[i].UserTAId.first_name }]
				obj[ "asm" ] = { value: getproList[ i ].UserAsmId.id, label: getproList[ i ].UserAsmId.first_name }
				obj[ "tl" ] = { value: getproList[ i ].UserTlId.id, label: getproList[ i ].UserTlId.first_name }
				allpromoter.push(obj);
			}


			return commonResponse.success(res, 200, "Successfully Get All Promoter!", {
				Promoter: allpromoter
			});
		}

	} catch (error) {
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}


exports.asmList = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getasmList = await authServices.asmList()

		console.log(getasmList, ":getasmList")

		var allASM = [];
		if (getasmList) {
			for (let i = 0; i < getasmList.length; i++) {
				var obj = {};
				obj[ "value" ] = getasmList[ i ].User.id;
				obj[ "label" ] = getasmList[ i ].User.first_name;
				allASM.push(obj);
			}

			return commonResponse.success(res, 200, "Successfully Get All Asm!", {
				Asm: allASM
			});

		}
	} catch (error) {
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.taList = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		console.log("talist","contrll")
		var gettaList = await authServices.taList()
		var allTa = [];
		if (gettaList) {
			for (let i = 0; i < gettaList.length; i++) {
				var obj = {};
				obj[ "value" ] = gettaList[ i ].User.id;
				obj[ "label" ] = gettaList[ i ].User.first_name;
				obj[ "npm" ] = { value: gettaList[ i ].UserNpmId.id, label: gettaList[ i ].UserNpmId.first_name }
				allTa.push(obj);
			}

			return commonResponse.success(res, 200, "Successfully Get All ta!", {
				ta: allTa
			});
		}	
	}catch(error){
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.npmList = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		var getnpmList = await authServices.npmList();
		console.log(getnpmList,"npmlists");
		var npmArr = []
        if (getnpmList) {
            for (let i = 0; i < getnpmList.length; i++) {
                var obj = {};
                obj[ "value" ] = getnpmList[ i ].id;
                obj[ "label" ] = getnpmList[ i ].first_name + " " + getnpmList[ i ].last_name;

                npmArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Npm!", {
            npm: npmArr
        });
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.getUsersForFilter = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		let get_role = req.params.role_name;

		let getRoleWiseUSers = await authServices.getRoleWiseUsersForFilter(get_role);
	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.getUsersIdListting = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		const getUsers = await authServices.getAllUser();
		console.log(getUsers,"get");
		var userArr = []
        if (getUsers) {
            for (let i = 0; i < getUsers.length; i++) {
                var obj = {};
                obj[ "value" ] = getUsers[ i ].id;
                obj[ "label" ] = getUsers[ i ].user_id;

                userArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All User Id!", {
            user: userArr
        });
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}
exports.getUsersnameListting = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		const getUsers = await authServices.getAllUser();
		console.log(getUsers,"get");
		var userArr = []
        if (getUsers) {
            for (let i = 0; i < getUsers.length; i++) {
                var obj = {};
                obj[ "value" ] = getUsers[ i ].id;
                obj[ "label" ] = getUsers[ i ].user_name;

                userArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All User Name!", {
            user: userArr
        });
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.getnameListting = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		const getUsers = await authServices.getAllUser();
		console.log(getUsers,"get");
		var userArr = []
        if (getUsers) {
            for (let i = 0; i < getUsers.length; i++) {
                // var obj = {};
				if(getUsers[i].first_name != "admin"){
					var obj = {};
					obj[ "value" ] = getUsers[ i ].id;
					obj[ "label" ] = getUsers[ i ].first_name + " " + getUsers[ i ].last_name;
					userArr.push(obj);
				}

                // userArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Name!", {
            user: userArr
        });
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.getrole = async (req,res,next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		let Id = req.params.id
		let getRole = await authServices.getRole(Id)
		return commonResponse.success(res, 200, "Successfully Get Role!", getRole);
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.profile = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		console.log(req.user,"profileuserereer")
		var userProfile
		var id = req.user.id
		if (req.user.role_id == 8) {
			userProfile = await authMobileServices.subAdminProfile(id);
		}else if (req.user.role_id == 9 || req.user.role_id == 10 || req.user.role_id == 11){
			userProfile = await authMobileServices.clientProfile(id);
		}else{
			userProfile = await authMobileServices.userProfile(id);
		}
		// var id = req.user.id
		// const userProfile = await authMobileServices.userProfile(id);

		// console.log(userProfile , ":userProfile")
		if (userProfile) {
			return commonResponse.success(res, 200, "user Profile fetch successfully !", {
				id: userProfile.id,
				email: userProfile.email,
				first_name: userProfile.first_name,
				profile_image: userProfile.profile_image ? `${Image_path.IMAGE_PATHS}/${userProfile.profile_image}` : "",
				last_name: userProfile.last_name,
				mobile_no: userProfile.mobile_no,
				role_id: userProfile.role_id,
				role_name: userProfile.role_name,
				gender: userProfile.gender,
				dob: userProfile.dob ? userProfile.dob.toString() : ""

			})
		}
	} catch (error) {
		if (error instanceof ValidationError) {
			return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
		}
		next(error);
	}
}

exports.updateProfile = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		const { errors, isValid } = validateUpdateProfile(req.body);

		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
		}


		var Image;
		if (req.body.image) {
			var SpliteImage = req.body.image.split('/')
			Image = SpliteImage[5]
		} else {
			Image = req.file ? req.file.filename : ""
		}

		const Id = req.params.id
		var updateProfile
		if (req.user.role_id == 8) {
			updateProfile = await authServices.updateSubAdminProfile(Id, Image, req.body);
		}else if (req.user.role_id == 9 || req.user.role_id == 10 || req.user.role_id == 11){
			updateProfile = await authServices.updateClientProfile(Id, Image, req.body);
		}else{
			updateProfile = await authServices.updateProfile(Id, Image, req.body);
		}
		if (updateProfile) {
			return commonResponse.success(res, 200, PROFILE_UPDATED);
		}
	} catch (error) {
		if (error instanceof ValidationError) {
			return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
		}
		next(error);
	}
}

exports.logout = async (req, res, next) => {
	try {

		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}

		var id = req.user.id;

		var UpdateLoginStatus = await authServices.logout(id)
		if (UpdateLoginStatus) {
			return commonResponse.success(res, 200, LOGOUT);
		}
	} catch (error) {

		if (error instanceof ValidationError) {
			return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
		}
		next(error);
	}
}

exports.filterUserList = async (req,res,  next) => {
	try{
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
		let filter_value = req.query.filter_value || "";
		console.log(filter_value,"filter")
		let userList = await authServices.getfilterUser(filter_value);
		var userArr = []
        if (userList) {
            for (let i = 0; i < userList.length; i++) {
                var obj = {};
                obj[ "value" ] = userList[ i ].id;
                obj[ "label" ] = userList[ i ].first_name + " " + userList[i].last_name;

                userArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Store!", {
            users: userArr
        });
	}catch(error){
		next(error);
		console.log(error, ":getTLs")
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}

exports.subadminGet = async (req, res, next) => {
	try {
		if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}

		console.log(req.user , ":req.user")
		const { page = 1, limit = 2 } = req.query;

		let order_column = req.query.order_column || "id";
		let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
		let sort_array = [order_column, sort_order];
		let filter_value = req.query.filter_value || "";
		console.log(req.query, sort_array, filter_value)

		// console.log(req.user, "-------->")
		var findAllUser = await authServices.getUser(req.query, sort_array, filter_value);
		// console.log(findAllUser)
		if (findAllUser) {
			return commonResponse.success(res, 200, "Successfully Get All User!", {
				TotalCount: findAllUser.count,
				User: findAllUser.data
			});
		}
	} catch (error) {
		next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
	}
}
