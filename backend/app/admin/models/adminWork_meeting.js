const { DB, Sequelize } = require("../../../config/database");

const AdminWork_Meeting = DB.define("adminwork_meetings", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    work_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    report_detailed_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    meeting_start: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    meeting_end: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    total_hour: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    what_is_done: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },



}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

module.exports = AdminWork_Meeting;