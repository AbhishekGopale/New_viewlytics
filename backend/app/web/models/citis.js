const { DB, Sequelize } = require("../../../config/database");

const Citi = DB.define("cities", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    state_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },



}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

module.exports = Citi;