const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const inventoryServices = require('../services/inventory.services')
const { DEFAULTERR, MEETING_CREATE } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');


module.exports = {



    getSkuRange: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const getSku = await inventoryServices.getskurange(req.params.id)

            console.log(getSku, ":-------getSku")
            var skuArr = []
            if (getSku) {
                for (let i = 0; i < getSku.length; i++) {
                    var obj = {};
                    obj["value"] = getSku[i].id;
                    obj[ "label" ] = getSku[ i ].range;

                    skuArr.push(obj);
                }

            }
            return commonResponse.success(res, 200, "Successfully Get All Sku!", {
                range: skuArr
            });
        }catch(error){
            console.log(error)
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    getSkuName: async (req,res,next) =>{
        try{
            // if (!req.user) {
            //     return res.json({
            //         error: true,
            //         statusCode: 401,
            //         message: "Invalid login!",
            //         errors: "You are not a user,you can not able to action on this module!",
            //     });
            // }
            console.log(req.params)
            const getSku = await inventoryServices.getskuname(req.params.id)
            // let result = getSku.map(({ final_sku_name }) => final_sku_name)
            // console.log(result)
            if (getSku.length) {
                return commonResponse.success(res, 200, "Successfully Get All SkuName!",  getSku );
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Data  Not Found");
            }
        }catch(error){
            console.log(error)
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    openInventory: async(req,res,next) =>  {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            // console.log(req.user,"user")
            const Id = req.user.id
            const inventoryData = req.body.opening_inventory
            const remark = req.body.remark
            const openInventory = await inventoryServices.openInventory(inventoryData,remark, Id)
            if(openInventory){
                return commonResponse.success(res, 201, "Open Inventory Created succesfully");
            }
        }catch(error){
            console.log(error)
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    closingInventory: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const Id = req.user.id
            var closingInventory = await inventoryServices.closingInventory(req.body, Id)
            if (closingInventory) {
                return commonResponse.success(res, 201, "Closing Inventory Updated succesfully");
            }

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    getInventory: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            // console.log(req.body,"body")
            let user_id = req.user.id
            const getInventory = await inventoryServices.getInventory(user_id,req.body)
            // var inventoryArr = []
            // if (getInventory) {
            //     for (let i = 0; i < getInventory.length; i++) {
            //         var obj = {};
            //         obj[ "value" ] = getInventory[ i ].opning_inventory;
            //         obj[ "label" ] = getInventory[ i ].sku_full_name;

            //         inventoryArr.push(obj);
            //     }

            // }
            if(getInventory.length){
                return commonResponse.success(res, 200, "Successfully Get Inventory!", {
                    invertory: getInventory
                });
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Data  Not Found");
            }
            // return commonResponse.success(res, 200, "Successfully Get Inventory!", {
            //     invertory: getInventory
            // });
        }catch(error){
            console.log(error)
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    newInventory:async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const Id = req.user.id;
            let reqBody = req.body.new_inventory
            let remark = req.body.remark
            let newInventory = await inventoryServices.newInventory(Id,remark,reqBody);
            console.log(newInventory,"neinnsjsj")
            if (newInventory) {
                return commonResponse.success(res, 201, "New Inventory Updated succesfully");
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","New Inventory Not ceated");
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    dsr: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            const Id = req.user.id;
            const getdsr = await inventoryServices.getDsr(Id,req.body);
            if(getdsr.length){
                return commonResponse.success(res, 200, "Successfully Get dsr!", {
                    dsr: getdsr
                });
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Data  Not Found");
            }
        }catch(error){
            console.log(error)
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }
}
