    const { DB, Sequelize } = require("../../../config/database");

const attendance = DB.define("attendances", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    total_hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    day_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    time_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    }
}, { underscored: true, paranoid: false, deletedAt: "deleted_at" })

module.exports = attendance;