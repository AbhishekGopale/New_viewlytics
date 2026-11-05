const { commonResponse, commonFunctions, customErrorResponse } = require("../../../helper");
const { ValidationError } = require('../../../helper/commonResponce');
const isEmpty = require("../../isEmpty");
const sidebarService = require("../services/sidebar.service.js")

module.exports = {

    getAllData: async (req, res, next) => {

        try {

            var ChainNames = await sidebarService.chainName()
            var chainArr = []
            if (ChainNames) {
                for (let i = 0; i < ChainNames.length; i++) {
                    var obj = {};
                    obj["value"] = ChainNames[i].id;
                    obj["label"] = ChainNames[i].chain_name;

                    chainArr.push(obj);
                }

            }




            var stateFind = await sidebarService.stateFind()
            var stateArr = []
            if (stateFind) {
                for (let i = 0; i < stateFind.length; i++) {
                    var obj = {};
                    obj["value"] = stateFind[i].id;
                    obj["label"] = stateFind[i].state_name;

                    stateArr.push(obj);
                }

            }


            return commonResponse.success(res, 200, "Successfully Get All Data!", {
                Chain: chainArr,
                State: stateArr
            });

        } catch (error) {
            next(error);
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
        }

    },

    stateGet: async (req, res, next) => {
        try {

            // console.log(req.query.zone, ":south")
            var stateFind = await sidebarService.stateFind(req.query.zone)
            var stateArr = []
            if (stateFind) {
                for (let i = 0; i < stateFind.length; i++) {
                    var obj = {};
                    obj["value"] = stateFind[i].id;
                    obj["label"] = stateFind[i].state_name;

                    stateArr.push(obj);
                }

            }

            return commonResponse.success(res, 200, "Successfully Get All State Data!", {
                State: stateArr
            });
        } catch (error) {

        }
    },

    cityGet: async (req, res, next) => {
        try {

            var id = req.params.id

            var cityFind = await sidebarService.citiFind(id)
            var chainCity = []
            if (cityFind) {
                for (let i = 0; i < cityFind.length; i++) {
                    var obj = {};
                    obj["value"] = cityFind[i].id;
                    obj["label"] = cityFind[i].city_name;

                    chainCity.push(obj);
                }

            }


            return commonResponse.success(res, 200, "Successfully Get All State Data!", {
                City: chainCity
            });
        } catch (error) {

        }
    },
    getTl: async (req,res,next) => {
        try{
            var getTL = await sidebarService.tlList()

		var allTls = [];
		if (getTL) {
			for (let i = 0; i < getTL.length; i++) {
				var obj = {};
				obj["value"] = getTL[i].User.id;
				obj["label"] = `${getTL[i].User.first_name} ${getTL[i].User.last_name}`;
				// obj["asm"] = [{ value: getTL[i].UserAsmId.id, label: getTL[i].UserAsmId.first_name }]
				allTls.push(obj);
			}


			return commonResponse.success(res, 200, "Successfully Get All TL!", {
				TL: allTls
			});
		}
        }catch(error){
            console.log(error)
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
    },
    valueLabelChain: async (req,res,next) => {
        try{
            var findALlChain = await sidebarService.getAllvalueChain();
            var chainArr = []
            if (findALlChain) {
                for (let i = 0; i < findALlChain.length; i++) {
                    var obj = {};
                    obj[ "value" ] = findALlChain[ i ].id;
                    obj[ "label" ] = findALlChain[ i ].chain_name;

                    chainArr.push(obj);
                }

            }
            return commonResponse.success(res, 200, "Successfully Get All Store!", {
                Chain: chainArr
            });

        }catch(error){
            console.log(error)
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
    },

    getAllState: async (req, res, next) => {
        try {
            var stateFind = await sidebarService.stateFind()
            var stateArr = []
            if (stateFind) {
                for (let i = 0; i < stateFind.length; i++) {
                    var obj = {};
                    obj["value"] = stateFind[i].id;
                    obj["label"] = stateFind[i].state_name;

                    stateArr.push(obj);
                }
            }

            return commonResponse.success(res, 200, "Successfully Get All State Data!", {
                State: stateArr
            });
        } catch (error) {

        }
    },

    getAllStateZone: async (req, res, next) => {
        try {
            var stateFind = await sidebarService.stateFindZonewise()
            var stateArr = []
            if (stateFind) {
                for (let i = 0; i < stateFind.length; i++) {
                    var obj = {};
                    obj["value"] = stateFind[i].id;
                    obj["label"] = stateFind[i].state_name;

                    stateArr.push(obj);
                }
            }

            return commonResponse.success(res, 200, "Successfully Get All State Data!", {
                State: stateArr
            });
        } catch (error) {
            console.log(error, ":error");
    }
    },

}
