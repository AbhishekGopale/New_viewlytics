const { DB, Sequelize } = require("../../../config/database");

const State = DB.define("states", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    state_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    zone: {
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

module.exports = State;