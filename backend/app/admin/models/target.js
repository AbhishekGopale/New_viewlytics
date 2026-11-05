const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");
const Sku = require("./SKU");
const Store = require("./store");

const Target = DB.define("targets", {

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
        // references: {
        //     model: User,
        //     key: 'id',// Primary Key Role Table,
        // }
    },
    target_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    target: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    total_target: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sku_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Sku,
            key: 'id',// Primary Key Role Table,
        }
    },
    start_date: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    end_date: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
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

Target.belongsTo(User, {
    foreignKey: 'user_id',  // In user table
    as: 'User'
})

Target.belongsTo(Sku, {
    foreignKey: 'sku_id',  // In Sku table
    as: 'SKU'

})

module.exports = Target;
