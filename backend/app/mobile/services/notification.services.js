const { commonResponse } = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const notificationModel = require("../../admin/models/notification")

exports.getAllNotification = async (id) => {
    try {


        const Notification = await notificationModel.findAll({
            where: { to_user_id: id },
            attributes: ['id', 'user_id', 'to_user_id', 'title', 'message', 'created_at']
        });

        return Notification

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}

exports.delete = async (id) => {
    try {


        const Notification = await notificationModel.destroy({
            where: { id: id },
        });

        return Notification

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}


exports.deleteMany = async (id) => {
    try {


        const Notification = await notificationModel.destroy({ where: {} });

        return Notification

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}