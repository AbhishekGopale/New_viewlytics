const { DB, Sequelize } = require("../../../config/database");

const broadCasting = DB.define("broadcastings", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: Sequelize.INTEGER,
    },
    zone_id: {
        type: Sequelize.JSON,
    },
    promoter_id: {
        type: Sequelize.JSON,
    },
    merchandiser_id: {
        type: Sequelize.JSON,
    },
    tl_id: {
        type: Sequelize.JSON,
    },
    description: {
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

module.exports = broadCasting;