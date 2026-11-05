const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../../isEmpty");
const { DEFAULTERR } = require("../../../helper/resources/messages.json");
const competitionServices = require("../services/competition_analysis.services.js");
const competitionValidation = require("../../mobile/validation/competition.validation.js");

module.exports = {
  datasync: async (req, res, next) => {
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

      var id = req.user.id;
      console.log(req.body, req.files, "datata");
      // return;
      const { errors, isValid } = competitionValidation(req.body);
      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      var CreateCompAna = await competitionServices.createObjAnalysis(
        req.body,
        req.files,
        id
      );

      if (CreateCompAna) {
        return commonResponse.success(
          res,
          201,
          " Competition Analysis Created succesfully"
        );
      }
    } catch (error) {
      console.log(error, "---------error");
    }
  },
  activationList: async (req, res, next) => {
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
      let getActivation = [
        { label: "New Activation", value: "1" },
        { label: "New Launch", value: "2" },
        { label: "New Pack Promo", value: "3" },
        { label: "Scan Offer", value: "4" },
      ];
      if (getActivation) {
        return commonResponse.success(res, 200, "Get all Activation", getActivation);
      }
    } catch (error) {
      console.log(error, "---------error");
    }
  },
};
