const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const feildService = require("../services/field_visit.services");
const feildVisitValidation = require("../../mobile/validation/fieldvisit.validation");
const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../../isEmpty");

module.exports = {
  createFieldVisit: async (req, res, next) => {
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

      let Id = req.user.id;
      const { errors, isValid } = feildVisitValidation(req.body);
      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      let createFieldVist = await feildService.createFieldvisit(
        Id,
        req.body,
        req.files
      );
      if (createFieldVist) {
        return commonResponse.success(
          res,
          201,
          "Field visit Created succesfully"
        );
      }
    } catch (error) {
      console.log(error);
      next(error);
      if (error instanceof ValidationError) {
        return commonResponse.customErrorResponse(
          res,
          error.errorCode,
          "Something went wrong",
          error.errorMessage
        );
      }
    }
  },
  getListing: async (req, res, next) => {
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

      const data = [
        {
          "value": 1,
          "label": "Promoter in Uniform & proper grooming",
        },
        {
            "value": 2,
            "label": "Whether SOS maintained in the category as aligned",
        },
        {
            "value": 3,
            "label": "Whether POG maintained in the category as aligned",
        },
        {
            "value": 4,
            "label": "Whether Paid Assets maintained in the category aligned",
        },
        {
            "value": 5,
            "label": "Is there any courtesy visibility in the store",
        },
        {
            "value": 6,
            "label": "Whether KPI/Online App maintained by the promoter",
        },
        {
            "value": 7,
            "label": "Have you meet with any store staff during your visit?",
        },
      ];
      return commonResponse.success(res, 200, "Successfully Get Feild Visit Listing", data);

    } catch (error) {
      console.log(error);
      next(error);
      if (error instanceof ValidationError) {
        return commonResponse.customErrorResponse(
          res,
          error.errorCode,
          "Something went wrong",
          error.errorMessage
        );
      }
    }
  },
};
