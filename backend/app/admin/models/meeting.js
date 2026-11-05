const { DB, Sequelize } = require("../../../config/database");

const Meeting = DB.define("meetings", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    meeting_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    meeting_agenda: {
        type: Sequelize.STRING(300),
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
    meeting_minutes: {
        type: Sequelize.STRING(300),
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

module.exports = Meeting;