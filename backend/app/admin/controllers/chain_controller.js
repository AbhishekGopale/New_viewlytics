const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, CHAIN_SUCCESS_CREATED, DELETE_CHAIN, DELETE_MULTIPLE_CHAIN, UPDATE_CHAIN } = require('../../../helper/resources/messages.json')
const { ValidationError, } = require('../../../helper/commonResponce');
const chainService = require('../services/chain_services.js')
const updateChainModule = require('../validation/updateChain.validation.js')
const isEmpty = require("../../isEmpty");
const fs = require("fs");
const mime = require("mime");

exports.createChain = async (req, res, next) => {

    try {
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        var BodyData = req.body.chainArray
        let createChain = await chainService.createChain(BodyData)
        if (createChain) commonResponse.success(res, 201, CHAIN_SUCCESS_CREATED);
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

},

exports.getAll = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module                                                           !",
            });
        }
        // console.log(req.user,"requsre")
        const { page = 1, limit = 2 } = req.query;
		let order_column = req.query.order_column || "id";
        let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
		let sort_array = [order_column, sort_order];
		let filter_value = req.query.filter_value || "";
        
        // var findALlChain = await chainService.getAllChain(req.query,sort_array,filter_value);
        // console.log(req.query, sort_array, filter_value,"(req.query, sort_array, filter_value")

        var findALlChain
        if (req.user.role_id == 8) {
            console.log("nonamdin")
            findALlChain = await chainService.getAllChainZoneWise(req.query, sort_array, filter_value, req.user);
        } else if (req.user.role_id == 1) {
            console.log("dinnnn")
            findALlChain = await chainService.getAllChain(req.query, sort_array, filter_value);
        }

        if (findALlChain) {
            return commonResponse.success(res, 200, "Successfully Get All Chain!", {
                TotalCount: findALlChain.count,
				chain: findALlChain.data
            });
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteChain = async (req, res, next) => {
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
        const deleteChain = await chainService.deleteChain(id);

        if (deleteChain) {
            return commonResponse.success(res, 200, DELETE_CHAIN);
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
        const deleteChain = await chainService.deleteMany(id);

        if (deleteChain) {
            return commonResponse.success(res, 200, DELETE_MULTIPLE_CHAIN);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.updateChain = async (req, res, next) => {
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
        // var Image;
        // if (req.body.image) {
        //     var SpliteImage = req.body.image.split("http://localhost:5000/media/upload/")
        //     Image = SpliteImage[1]
        // } else {
        //     Image = req.file.filename
        // }

        const { errors, isValid } = updateChainModule(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        const updateChain = await chainService.update(id, req.body);
        if (updateChain) {
            return commonResponse.success(res, 200, UPDATE_CHAIN);
        }


    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.valueLabelChain = async (req, res, next) => {
    try {
        if (!req.user) {
			return res.json({
				error: true,
				statusCode: 401,
				message: "Invalid login!",
				errors: "You are not a user,you can not able to action on this module!",
			});
		}
        var findALlChain = await chainService.getAllvalueChain();
        var chainArr = []
        if (findALlChain) {
            for (let i = 0; i < findALlChain.length; i++) {
                var obj = {};
                obj[ "value" ] = findALlChain[ i ].id;
                obj[ "label" ] = findALlChain[ i ].chain_name;

                chainArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Chain!", {
            Chain: chainArr
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.chainOnProject = async (req,res,next) => {
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
        let getchain = await chainService.getChainOnProject(id);
        var chainArr = []
        if (getchain) {
            for (let i = 0; i < getchain.length; i++) {
                var obj = {};
                obj[ "value" ] = getchain[ i ].id;
                obj[ "label" ] = getchain[ i ].chain_name;

                chainArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Chain!", {
            chain: chainArr
        });
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}