const { DB, Sequelize } = require("../../../config/database");
const Project = require('../models/project');

const sku_category = DB.define("sku_categories", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Project,
            key: 'id' // Primary Key Project Table
        },
    },
    category_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    image: {
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
}, { underscored: true, paranoid: false, deletedAt: "deleted_at" })

sku_category.belongsTo(Project, {
    foreignKey: 'project_id',  // In Project table
    as: 'ProjectID'  // In Project table
})

module.exports = sku_category;