const { DB, Sequelize } = require("../../../config/database");

const Leave = DB.define("leaves", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,

    },
    leave_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    leave_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    reason_reject: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    reason: {
        type: Sequelize.STRING(200),
        allowNull: false,
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


module.exports = Leave;
