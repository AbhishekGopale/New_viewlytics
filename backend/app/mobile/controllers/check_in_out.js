const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const checkInOutService = require("../services/check_in_out.services")
const { ValidationError } = require('../../../helper/commonResponce');
const validateMapDeatsilInput = require("../validation/map.validation");


module.exports = {
    
    checkIn: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
     
            let Id = req.user.id
            let image = req.file.filename
            // console.log(req.file,req.body,Id,"fileidididdi")
            // return;;
            if(!req.body.store_id){
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", {store_id:"Store_id is required"});
            }
            // return
            let checkIn = await checkInOutService.checkInOutCreate(Id,image,req.body);
            console.log(checkIn,"checkIn")
            if (checkIn) {
                return commonResponse.success(res, 201, "Check In sucesful",{checkIn});
            }
        }catch(error){
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },

    checkOut: async (req, res, next) => {
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
            console.log(Id,req.body)
            let checkOut =await  checkInOutService.checkInOut(Id,req.body);
            if (checkOut) {
                return commonResponse.success(res, 201, "checkOut sucesful",{checkOut});
            }
        }catch(error){
            next(error);    
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    checkInList: async (req,res,next)=>{
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            let Id = req.user.id
            console.log(Id)
            
                let storeList = await  checkInOutService.checkInList(Id);
                console.log(storeList,"istststsst");
                var storeArr = []
                if (storeList) {
                    for (let i = 0; i < storeList.length; i++) {
                        var obj = {};
                        obj[ "value" ] = storeList[ i ].id;
                        obj[ "label" ] = storeList[ i ].store_name;
                        obj["image"] = storeList[i].Image
                        obj["verified"] = storeList[i].verified,
                        obj["zone"] = storeList[i].zone_name,
                        obj["city"] = storeList[i].city,
                        obj["state"] = storeList[i].state,

                        storeArr.push(obj);
                    }

                }
                return commonResponse.success(res, 200, "Successfully Get All store od user!", {
                    store: storeArr
                });
            
            
        } catch (error) {
            next(error);    
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    },
    mapdetails: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            };
            const { errors, isValid } = validateMapDeatsilInput(req.body);

            if (!isValid) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }
            // console.log(req.user,"req,,sjsjsjsjjs")
            // console.log(req.body,"mpdetail")
            let mapdeatil = await checkInOutService.mapDetails(req.user,req.body);
            if(mapdeatil){
                return commonResponse.success(res, 201, "Map detail added succesfully");
            }else{
                return commonResponse.customErrorResponse(res, 404, "something went wrong","Data  Not Found");
            }
        }catch(error){
            next(error);    
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }
    }
    
}