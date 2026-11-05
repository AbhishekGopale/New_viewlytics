const {
  commonResponse,
  commonFunctions,
  customErrorResponse,
} = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const mapServices = require("../services/map_services");

module.exports = {
  getMapData: async (req, res, next) => {
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

      var userId = req.user.id;
      var findMapData = await mapServices.findMapData(userId);

      if (findMapData)
        commonResponse.success(res, 200, "Successfully Get Map Data", {
          map_data: findMapData,
        });
    } catch (error) {
      console.log(error, ":---error");
    }
  },
};
