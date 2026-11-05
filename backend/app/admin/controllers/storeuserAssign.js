const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const storeuserService = require('../services/store_userAssign_service.js')
const { DEFAULTERR, USER_ASSIGN_SUCCESSFULLY, DELETE_USERASSIGN, DELETE_MULTIPLE_USERASSIGN } = require('../../../helper/resources/messages.json')
const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../validation/isEmpty");
exports.userAssign = async (req, res, next) => {
    try {
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        let userAssign = await storeuserService.storeUserAssign(req.body)
        if (userAssign) commonResponse.success(res, 200, USER_ASSIGN_SUCCESSFULLY);

    } catch (error) {
        if (error instanceof ValidationError) {
            return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
        }
        next(error);
    }
}

// exports.deleteuserAssign = async (req, res, nextd) => {
//     try {
//         var id = req.params.id
//         const deleteuserAssign = await storeuserService.deleteuserAssign(id);

//         if (deleteuserAssign) {
//             return commonResponse.success(res, 200, DELETE_USERASSIGN);
//         }
//     } catch (error) {
//         next(error);
//         return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
//     }
// }

// exports.deletemany = async (req, res, next) => {
//     try {

//         var id = req.body.id
//         const deleteuserAssign = await storeuserService.deleteMany(id);

//         if (deleteuserAssign) {
//             return commonResponse.success(res, 200, DELETE_MULTIPLE_USERASSIGN);
//         }

//     } catch (error) {
//         next(error);
//         return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
//     }
// }

// exports.getByID = async (req, res, next) => {
//     try {
//         var id = req.params.id
//         var findUser = await storeuserService.getUserAssignBYID(id);
//         if (findUser) {
//             return commonResponse.success(res, 200, "Successfully Get User!", {
//                 User: findUser
//             });
//         } else {
//             return commonResponse.customErrorResponse(res, 200, "Something went wrong!", "Id does not valid!");
//         }

//     } catch (error) {
//         next(error);
//         return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
//     }
// }
