const { Sequelize, DB } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const dashboardServices = require("../services/dashboard_services");
const {
  DEFAULTERR,
  SKU_SUCCESS_CREATED,
  DELETE_SKU,
  UPDATE_SKU,
  DELETE_MULTIPLE_SKU,
} = require("../../../helper/resources/messages.json");
const userModel = require("../models/user");
const { use } = require("../routes");
const moment = require("moment");

exports.getData = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({
        error: true,
        statusCode: 401,
        message: "Invalid login!",
        errors: "You are not a user,you can not able to action on this module!",
      });
    }
    console.log(req.user.id, "req.usererer");
    var findDashboard;
    if (req.user.role_id == 8) {
      findDashboard = await dashboardServices.getSubAdminDashboard(req.user);
    } else if (req.user.role_id == 1) {
      findDashboard = await dashboardServices.getDashboard();
    }

    if (findDashboard) {
      return commonResponse.success(
        res,
        200,
        "Successfully Get All Data!",
        findDashboard
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
    return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
  }
};

exports.getProjectWiseData = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.json({
        error: true,
        statusCode: 401,
        message: "Invalid login!",
        errors: "You are not a user,you can not able to action on this module!",
      });
    }

    const projectId = req.params.id;
    const todayDate = moment().format("YYYY-MM-DD");
    const weekOffNumber = moment().weekday().toString();

    const [stores] = await DB.query(
      `SELECT DISTINCT promoter_id, merchandiser_id, tl_id 
       FROM stores 
       WHERE project_id = ? AND status = 0`,
      { replacements: [projectId] }
    );

    const userIds = new Set();
    stores.forEach((s) => {
      if (s.promoter_id) userIds.add(s.promoter_id);
      if (s.merchandiser_id) userIds.add(s.merchandiser_id);
      if (s.tl_id) userIds.add(s.tl_id);
    });

    const userArray = Array.from(userIds).filter(Boolean);

    let totalUser = 0;
    let inactiveUser = 0;
    let weekOffCount = 0;
    let leaveCount = 0;
    let checkInCount = 0;
    let checkOutCount = 0;

    if (userArray.length > 0) {
      const [users] = await DB.query(
        `SELECT id, status, w_off FROM users WHERE id IN (?)`,
        { replacements: [userArray] }
      );
      users.forEach((u) => {
        if (u.status === "0") {
          totalUser++;
          if (u.w_off === weekOffNumber) weekOffCount++;
        } else if (u.status === "1") {
          inactiveUser++;
        }
      });

      const [leaves] = await DB.query(
        `SELECT COUNT(*) as cnt FROM leaves WHERE user_id IN (?) AND date = ? AND leave_status = '1'`,
        { replacements: [userArray, todayDate] }
      );
      if (leaves && leaves[0]) leaveCount = Number(leaves[0].cnt) || 0;

      const [cInOut] = await DB.query(
        `SELECT 
            COUNT(DISTINCT user_id) as check_in,
            COUNT(DISTINCT CASE WHEN check_out IS NOT NULL AND check_out != '' THEN user_id END) as check_out
         FROM checkinouts 
         WHERE date = ? AND user_id IN (?)`,
        { replacements: [todayDate, userArray] }
      );
      if (cInOut && cInOut[0]) {
        checkInCount = Number(cInOut[0].check_in) || 0;
        checkOutCount = Number(cInOut[0].check_out) || 0;
      }
    }

    const notLoginCount = Math.max(
      0,
      totalUser - weekOffCount - leaveCount - checkInCount
    );

    const projectWiseDeshboard = {
      totalUser: totalUser,
      week_off: weekOffCount,
      inactiveuser: inactiveUser,
      leaves: leaveCount,
      check_in: checkInCount,
      check_out: checkOutCount,
      notLogin: notLoginCount,
    };

    return commonResponse.success(
      res,
      200,
      "Successfully Get All Project Wise Dashboard!",
      projectWiseDeshboard
    );
  } catch (error) {
    console.log(error);
    next(error);
    return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
  }
};
