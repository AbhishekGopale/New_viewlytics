const { DB, Sequelize } = require("../../../config/database");

const Zone = require("./zone")

const project = DB.define("projects", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Project Name is required"
            },
            len:
            {
                args: [2, 100],
                msg: "Project name is required!"
            }
        }
    },

    zone: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING(100),
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

module.exports = project;