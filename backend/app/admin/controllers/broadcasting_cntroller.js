const { Sequelize } = require('../../../config/database')
let validateClientInput = require('../validation/createclient.validation')
let validateBroadCasting = require('../validation/broadcasting.validation')
const broadCastingServices = require("../services/broadCasting_services");
const { commonResponse } = require('../../../helper');
const { ValidationError } = require('../../../helper/commonResponce');
const { DEFAULTERR,BROADCASTING_CREATED ,BROADCASTING_DELETE, BROADCASTING_LISTING,BROADCASTING_USER_LISTING} = require('../../../helper/resources/messages.json');


exports.userlistOnprojectAndZone = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
        // console.log(req.body,"controllerreqbodyddd");
        let userList = await broadCastingServices.userList(req.body);
        // console.log(userList,"opopopo");
        var promoArr = []
        var merArr = []
        var tlArr = []
        if (userList) {
            for (let i = 0; i < userList.length; i++) {
                // var obj = {};
                if(userList[ i ].promoter_id){
                    var obj = {};
                    obj[ "value" ] = userList[ i ].promoter_id;
                    obj[ "label" ] = userList[ i ].promoter;
                    promoArr.push(obj);
                }
                if(userList[ i ].merchandiser_id){
                    var obj2 = {};
                    obj2[ "value" ] = userList[ i ].merchandiser_id;
                    obj2[ "label" ] = userList[ i ].merchandiser;
                    merArr.push(obj2);
                }
                if(userList[ i ].tl_id){
                    var obj3 = {};
                    obj3[ "value" ] = userList[ i ].tl_id;
                    obj3[ "label" ] = userList[ i ].tl;
                    tlArr.push(obj3);
                }

                // promoArr.push(obj);
            }

        }
        const key = "value";
        const arrayUniqueTl = [...new Map(tlArr.map(item =>
            [item[key], item])).values()];
        const arrayUniquePromoter = [...new Map(promoArr.map(item =>
            [item[key], item])).values()];
        const arrayUniqueMer = [...new Map(merArr.map(item =>
            [item[key], item])).values()];
        return commonResponse.success(res, 200, BROADCASTING_USER_LISTING, {
            promoter: arrayUniquePromoter,
            merchandiser: arrayUniqueMer,
            tl: arrayUniqueTl,

        });
    }catch(error){
        next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.createBroadCasting = async  (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
        const { errors, isValid } = validateBroadCasting(req.body);

		// console.log('--------------')
		if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
        console.log(req.body,"createee")
        let createCasting = await broadCastingServices.createBroadCasting(req.body);
        if(createCasting){
            commonResponse.success(res, 201, BROADCASTING_CREATED);
        }
    }catch(error){
        next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.getAllCasting = async (req,res,next) =>  {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
        console.log("getalla")
        const getAllCasting = await broadCastingServices.getAllCasting();
        if (getAllCasting) {
            return commonResponse.success(res, 200, BROADCASTING_LISTING, {
                TotalCount: getAllCasting.count,
				broadCasting: getAllCasting.data
            });
        }
    }catch(error){
        next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.deleteCasting = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
        let id = req.params.id;
        let deleteCasting = await broadCastingServices.deleteCasting(id);
        if (deleteCasting) {
            return commonResponse.success(res, 200, BROADCASTING_DELETE);
        }
    }catch(error){
        next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}
exports.deleteManyCasting = async (req,res,next) => {
    try{
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		};
        let id = req.body.id;
        let deleteCasting = await broadCastingServices.deleteCasting(id);
        if (deleteCasting) {
            return commonResponse.success(res, 200, BROADCASTING_DELETE);
        }
    }catch(error){
        next(error);
		return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}