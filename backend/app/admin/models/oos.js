const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");
const Store = require("./store");
const SKU = require("./SKU");


const oos = DB.define("oosreports", {


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
    oos_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    remark:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATE,
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


oos.belongsTo(User, {
    foreignKey: 'user_id',  // In user table
    as: 'User'
})


oos.belongsTo(SKU, {
    foreignKey: 'sku_id',  // In SKU table
    as: 'skuId'
})



module.exports = oos;