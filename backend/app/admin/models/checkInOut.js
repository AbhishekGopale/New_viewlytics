const { DB, Sequelize } = require("../../../config/database");

const checkInOut = DB.define("checkinouts", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image:{
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    task_name: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    check_in_time:{
        type: Sequelize.TIME,
        allowNull: false,
    },
    pending:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    km: {
        type: Sequelize.INTEGER,
    },
    total_time:{
        type: Sequelize.STRING(100),
    },
    check_out_time:{
        type: Sequelize.TIME,
    },
    date:{
        type:Sequelize.DATE
    },
    task_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    store_name:{
        type: Sequelize.STRING(200),
    },
    check_out:{
        type: Sequelize.INTEGER,
        defaultValue: 0
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

module.exports = checkInOut;