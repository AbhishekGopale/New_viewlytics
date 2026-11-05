const { DB, Sequelize } = require("../../../config/database");

const notification = DB.define("notifications", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    to_user_id: {
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.STRING(100),
    },
    message: {
        type: Sequelize.STRING(100),
    },

    created_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },
    created_by: {
        type: Sequelize.STRING(100),
    },
    updated_by: {
        type: Sequelize.STRING(100),
    },
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

module.exports = notification;
