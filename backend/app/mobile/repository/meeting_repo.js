const meetingModel = require("../../../app/admin/models/meeting");
const adminmeetingModel = require("../../../app/admin/models/adminWork_meeting");

const { Op } = require('sequelize')

exports.meeting = async (data) => {
    return await meetingModel.create(data, { raw: true })
}

exports.adminmeetingo = async (data) => {
    return await adminmeetingModel.create(data, { raw: true })
}
