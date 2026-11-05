const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const dashboardServices = require("../services/dashboard.services");
const isEmpty = require("../../isEmpty");
const { DEFAULTERR ,FORM_UPDATE, PROMO_UPDATE} = require("../../../helper/resources/messages.json");
module.exports = {
  dashboard: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      console.log(req.user, ":----------------dashboard");
      var Target = [50, 55, 35, 80, 99, 43, 55, 62, 55, 42, 52, 44];

      var Achieved = [25, 33, 29, 61, 88, 22, 33, 44, 33, 33, 42, 33];

      var Legend = ["Target", "Achieved"];

      var Attendance = [23, 21, 23, 28, 26, 15, 19, 25, 25, 26, 14, 18];

      var attendanceSummery = [
        {
          present: 20,
          "W/off": 5,
          Absent: 2,
        },
      ];

      return commonResponse.success(res, 200, "Successfully Get All Data!", {
        Target: Target,
        Achieved: Achieved,
        Legend: Legend,
        Attendance: Attendance,
        AttendanceSummery: attendanceSummery,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  countDashboard: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      };
      // console.log(req.user.id,"dashbordcount");
      let countDashboard  = await dashboardServices.countDashboard(req.user);
      console.log(countDashboard,"countcontroll")
      if(countDashboard){
        return commonResponse.success(res, 200, "Successfully Get All Status Of Dashbord!", countDashboard);
      }
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  formCount: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      };
      const formCount = await dashboardServices.formCount(req.user);
      console.log(formCount);
      // if(formCount){
        return commonResponse.success(res, 200, "Remaning form Count!", {count:formCount});
      // }
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  promoterDashboard: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let user_id = req.user.id;
      let promoterDashboard = await dashboardServices.promoterDashboard(user_id);
      if(promoterDashboard){
        return commonResponse.success(res, 200, "Successfully Get All Data!", promoterDashboard);
      }
      console.log(promoterDashboard,"pooioivvcg")
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  merchandiserDashboard: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      };
      // console.log(req.user,"merchdeshbordd");
      let user_id = req.user.id;
      let merDashboard = await dashboardServices.merDashboard(user_id);
      if(merDashboard){
        return commonResponse.success(res, 200, "Successfully Get Merch Dashboard!", merDashboard);
      }
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  filterStore: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      // console.log(req.body,"filterstoree")
      const stores = await dashboardServices.filterStore(req.body);
      var storeArr = [];
      if (stores) {
        for (let i = 0; i < stores.length; i++) {
          var obj = {};
          obj["value"] = stores[i].store_code;
          obj["label"] = stores[i].store_name;

          storeArr.push(obj);
        }
      }
      return commonResponse.success(res, 200, "Successfully Get All Store!", {
        store: storeArr,
      });
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  targetAchieve: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      console.log(req.user,"targetachieveveev");
      let targetAchieve  = await dashboardServices.targetAchieve(req.user)
      // console.log(targetData);
      if(targetAchieve){
        return commonResponse.success(
            res,
            200,
            "Successfully Get Target Achieve!",
            targetAchieve
          );
      }
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  storeDetail: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let store_id = req.params.id;
      console.log(store_id,"store_iidididid")
      let storeDetail =  await dashboardServices.storeDetail(store_id);
      // console.log(storeDetail,"controllerstore")
      if(storeDetail){
        return commonResponse.success(res, 200, "Successfully Get store Detail!", {
          storeDetail
        });
      }
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  verifiedStore: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let store_id = req.params.id;
      // console.log(store_id,"verfiesstoree")
      let verifiedStore = await dashboardServices.verifiedStore(store_id, req.body);
      if (verifiedStore) {
        return commonResponse.success(res, 200, "Store verified succesfully");
      }

    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
  updatePromo: async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let promoId = req.params.id;
      let fileName = req.file.filename
      // console.log(req.file,"filelelele")
      // console.log(req.body,"bodydydydyd")
      let updatePromo = await dashboardServices.updatePromo(promoId,fileName,req.body);
      // console.log(updatePromo,"updatepromocontroll")
      if (updatePromo) {
        return commonResponse.success(res, 200, PROMO_UPDATE);
      }
    }catch(error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  createOos:async (req,res,next) => {
    try{
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      const Id = req.user.id
      const oos = req.body.oos
      const remark = req.body.remark;
      let createOos  = await dashboardServices.createOos(Id,oos,remark);
      if(createOos){
        return commonResponse.success(res, 201, "Oos Created succesfully");
    }
    }catch (error){
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  updateForm: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let id = req.params.id;
      let updateForm = await dashboardServices.updateForm(id, req.body);
      if (updateForm) {
        return commonResponse.success(res, 200, FORM_UPDATE);
      }
    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  checkForm: async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
              error: true,
              statusCode: 401,
              message: "Invalid login!",
              errors:
                "You are not a user,you can not able to action on this module!",
            });
          }
          let user_id = req.user.id;
          console.log(user_id,"userudud")
          let updateForm = await dashboardServices.checkForm(user_id);
          if(updateForm){
            return commonResponse.success(res, 200, "Successfully Get Form!", updateForm);
          }
          else{
            return commonResponse.success(res, 404, "Form Not Found", updateForm);
          }
    }catch (error){
        console.log(error);
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  getPromoList : async(req,res,next)=>{
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a user,you can not able to action on this module!",
        });
      }
      let Id = req.params.id;
      // console.log(Id);
       
      let promoList = await dashboardServices.getPromoList(Id)
      // console.log(promoList)

      
      return commonResponse.success(res, 200, "Successfully Get All Promo Details!", {
          promo : promoList
      });

    } catch (error) {
      console.log(error);
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
     }
    
  }
}
