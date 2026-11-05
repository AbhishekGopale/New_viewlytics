const { DB, Sequelize } = require("../../../config/database");
const User = require('../models/user');

const PromoterSos = DB.define("promotersos", {
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
    },
    store_name:{
        type: Sequelize.STRING(200),
    },
    open_inventory_id:{
        type: Sequelize.INTEGER,
    },
    open_inventory_name:{
        type: Sequelize.STRING(200),
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
},{ underscored: true, paranoid: true, deletedAt: "deleted_at" })

module.exports = PromoterSos;