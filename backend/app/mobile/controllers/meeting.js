const {
  DEFAULTERR,
  MEETING_CREATE,
  ADMIN_WORK_CREATE,
} = require("../../../helper/resources/messages.json");
const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const meetingServices = require("../services/meeting.services.js");
const meetingValidation = require("../../mobile/validation/meeting.validation");
const adminmeetingValidation = require("../../mobile/validation/adminworkmeeting.validation");

module.exports = {
  meetingSedual: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a Team Leader,you can not able to action on this module!",
        });
      }
      let Id = req.user.id;
      const { errors, isValid } = meetingValidation(req.body);
      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      const meeting = await meetingServices.sedualTime(req.body, Id);
      if (meeting) {
        return commonResponse.success(res, 201, MEETING_CREATE);
      }
    } catch (error) {
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },

  adminWork: async (req, res, next) => {
    try {
      if (!req.user) {
        return res.json({
          error: true,
          statusCode: 401,
          message: "Invalid login!",
          errors:
            "You are not a Team Leader,you can not able to action on this module!",
        });
      }
      let Id = req.user.id;
      const { errors, isValid } = adminmeetingValidation(req.body);
      if (!isValid || !isEmpty(errors)) {
        return commonResponse.customErrorResponse(
          res,
          422,
          "Something went wrong",
          errors
        );
      }
      const meeting = await meetingServices.adminsedualTime(req.body, Id);
      if (meeting) {
        return commonResponse.success(res, 201, ADMIN_WORK_CREATE);
      }
    } catch (error) {
      next(error);
      return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
  },
};
