const { DB, Sequelize } = require("../../../config/database");

const subAdminRole = DB.define("subadmin_module_roles", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    module_name: {
        type: Sequelize.STRING(100),
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
}, { underscored: true })


module.exports = subAdminRole;
