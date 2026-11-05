const { DB, Sequelize } = require("../../../config/database");
const Chain = require('../models/chain');
const Project = require('../models/project');
const Sku = require('../models/SKU');
const Zone = require('../models/zone');

const Promos = DB.define("promos", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chain_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Chain,
            key: 'id',// Primary Key Chain Table,

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
    promo_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    start_date: {
        type: Sequelize.DATE,
    },
    end_date: {
        type: Sequelize.DATE,
    },
    sku_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Sku,
            key: 'id',// Primary Key Chain Table,

        }
    },
    store_id:{
        type:Sequelize.INTEGER
    },
    promo_des: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notNull: "Promos Description is required",
            len: {
                args: [1, 100],
                msg: "Promos Description is required"
            }
        },
    },

    promo_image: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    mobile_image: {
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    mobile_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    mobile_remark:{
        type: Sequelize.STRING(200),
        allowNull: true,
    },
    zone: {
        type: Sequelize.JSON,
        allowNull: true,
    },

    chain_name: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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


Promos.belongsTo(Chain, {
    foreignKey: 'chain_id',  // In Chain table
    as: 'ChainId'
})
Promos.belongsTo(Sku, {
    foreignKey: 'sku_id',  // In Sku table
    as: 'skuId'
})
// Promos.belongsTo(Zone, {
//     foreignKey: 'zone',  // In Zone table
//     as: 'zoneId'
// })

module.exports = Promos;