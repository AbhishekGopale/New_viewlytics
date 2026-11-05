const { DB, Sequelize } = require("../../../config/database");

const Map = DB.define("maps", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    user_name: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    store_id: {
        type: Sequelize.INTEGER,
    },
    battery: {
        type: Sequelize.INTEGER,
    },
    check_in: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    check_out: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    lat: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    long: {
        type: Sequelize.STRING(300),
        allowNull: false,
    },
    time:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    imei_number: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    speed: {
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



}, { underscored: true, paranoid: true, deletedAt: "deleted_at" });

module.exports = Map;