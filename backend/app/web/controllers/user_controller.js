const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR } = require('../../../helper/resources/messages.json')
let validateLoginInput = require('../validation/validateLogin')
const isEmpty = require("../../isEmpty");
const userService = require("../services/user_service");
const authServices = require("../../admin/services/user_service");
const jwt = require('jsonwebtoken');
const { JWT_CONFIG, Image_path } = require("../../../config/application");

exports.login = async (req, res, next) => {
	try {
		const { errors, isValid } = validateLoginInput(req.body);

		console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}

		const User = await userService.login(req.body);
        console.log(User,"userclient")

		if (User) {
			
				await authServices.isLogin(User)
				let token = "Bearer " + jwt.sign({
					id: User.id,
					email: User.email,
					role_name: User.role_name,
					role_id: User.role_id,
					mobile_No: User.mobile_no,
					first_name: User.first_name,
					profile_image: User.profile_image ? `${Image_path.IMAGE_PATHS}/${User.profile_image}` : ""
				},
					JWT_CONFIG.secretKey,
					{ expiresIn: JWT_CONFIG.expiresIn });
			
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