const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");
const Store = require("./store");


const  assetTraking= DB.define("assettrakings", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',// Primary Key User Table,

        }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Store,
            key: 'store_code',// Primary Key Store Table,
        }
    },
    category_id: {
        type:Sequelize.INTEGER,
        allowNull:true
    },
    asset_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    asset_id: {
        type:Sequelize.INTEGER,
        allowNull:true
    },
    implemented: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    image: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    reason: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    created_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },

}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

assetTraking.belongsTo(User, {
    foreignKey: 'user_id',  // In user table
    as: 'User'
})

assetTraking.belongsTo(Store, {
    foreignKey: 'store_id',  // In Store table
    as: 'Store'
})


module.exports = assetTraking;
