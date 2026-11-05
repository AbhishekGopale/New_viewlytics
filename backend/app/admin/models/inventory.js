const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");
const Store = require("./store");
const SKU = require("./SKU");


const inventory = DB.define("inventorys", {


    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',// Primary Key Role Table,

        }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
    },
    sku_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: SKU,
            key: 'id',// Primary Key SKU Table,

        }
    },
    sku_no: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    category_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    sku_full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    opning_inventory: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    new_inventory:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    closing_inventory: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    dsr: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    remark:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    date: {
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
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })


inventory.belongsTo(User, {
    foreignKey: 'user_id',  // In user table
    as: 'User'
})


inventory.belongsTo(SKU, {
    foreignKey: 'sku_id',  // In SKU table
    as: 'skuId'
})



module.exports = inventory;