const { DB, Sequelize } = require("../../../config/database");
const Project = require('../models/project')
const Zone = require("./zone")
const zoneModel = require("../models/zone")
const chain = DB.define("chains", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chain_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Chain Name is required"
            },
            len:
            {
                args: [2, 100],
                msg: "chain name is required!"
            }
        }
    },
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Project,
            key: 'id',// Primary Key Chain Table,

        }
    },
    project_name: {
        type: Sequelize.STRING(100),
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


module.exports = chain;