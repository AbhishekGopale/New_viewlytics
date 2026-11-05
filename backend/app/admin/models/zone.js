const { DB, Sequelize } = require("../../../config/database");

const Zone = DB.define("zones", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    zone_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    created_at: {
        // field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        // field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
}, { underscored: true, paranoid: false, deletedAt: "deleted_at" })

module.exports = Zone;