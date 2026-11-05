const { DB, Sequelize } = require("../../../config/database");
const User = require('../models/user');

const MerchandiserSos = DB.define("merchandisersos", {
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
    brand_cat_1:{
        type: Sequelize.INTEGER,
    },
    com_facing_1:{
        type: Sequelize.INTEGER,
    },
    brand_1_sos:{
        type:Sequelize.INTEGER,
    },
    brand_cat_2:{
        type: Sequelize.INTEGER,
    },
    com_facing_2:{
        type: Sequelize.INTEGER,
    },
    brand_2_sos:{
        type:Sequelize.INTEGER,
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

module.exports = MerchandiserSos;