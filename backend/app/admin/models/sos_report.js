const { DB, Sequelize } = require("../../../config/database");

const SOS = DB.define("sosreports", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    store_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    date: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    brand_facing: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    compation_facing: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sos_per: {
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
    },



}, { underscored: true, paranoid: false, deletedAt: "deleted_at" })

module.exports = SOS;