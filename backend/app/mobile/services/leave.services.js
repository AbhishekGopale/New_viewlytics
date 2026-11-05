const moment = require("moment");
const { commonResponse } = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const LeaveModel = require("../../admin/models/leave");
const leave = require("../controllers/leave");
// const moment = require("moment");

exports.createLeave = async (user_id, reqBody) => {
  try {
    console.log(user_id);
    console.log(reqBody, "bodydydyd");
    const fromDate = moment(reqBody.from);
    const toDate = moment(reqBody.to);

    const dateArray = [];
    let currentDate = fromDate.clone();

    while (currentDate.isSameOrBefore(toDate, "day")) {
      dateArray.push({
        user_id:user_id,
        leave_type: reqBody.leave_type,
        leave_status: "0",
        date: currentDate.format("YYYY-MM-DD"),
        reason: reqBody.reason,
      });

      currentDate.add(1, "day");
    };
    console.log(dateArray)
    // return;
    // const createLeaveObj = {
    //   user_id: user_id,
    //   leave_status: "0",
    //   leave_type: reqBody.leave_type,
    //   from: reqBody.from,
    //   to: reqBody.to,
    //   reason: reqBody.reason,
    // };

    var createLeave = await LeaveModel.bulkCreate(dateArray, { raw: true });

    return createLeave;
  } catch (error) {
    console.log(error, " -->error");
    throw error;
  }
};

exports.getLeave = async (userid) => {
  try {
    const getLeave = await LeaveModel.findAll({
      where: {
        user_id: userid,
      },
      attributes: [
        "id",
        "user_id",
        "leave_type",
        "leave_status",
        "reason_reject",
        "date",
        "reason",
        "created_at",
      ],
    });

    return getLeave;
  } catch (error) {
    console.log(error, " -->error");
    throw error;
  }
};

exports.updateLeave = async (id, reqBody, user_id) => {
  try {
    const updateLeave = await LeaveModel.update(
      {
        user_id: user_id,
        leave_type: reqBody.leave_type,
        from: reqBody.from,
        to: reqBody.to,
        reason: reqBody.reason,
      },
      { where: { id: id } }
    );

    return updateLeave;
  } catch (error) {
    console.log(error, " -->error");
    throw error;
  }
};

exports.deleteLeave = async (id) => {
  try {
    let deleteLeave = await LeaveModel.destroy({
      where: { id: id },
    });

    return deleteLeave;
  } catch (error) {
    console.log(error, " -->error");
    throw error;
  }
};
