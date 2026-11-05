const { DB, Sequelize } = require("../../../config/database");
const User = require('./user');

const shopperEngagement = DB.define("shopperengagements", {
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
    cust_approach_image:{
        type: Sequelize.STRING(200),
    },
    any_sample_image:{
        type: Sequelize.STRING(200),
    },
    other_image:{
        type: Sequelize.STRING(200),
    },
    cust_approach_image2:{
        type: Sequelize.STRING(200),
    },
    any_sample_image2:{
        type: Sequelize.STRING(200),
    },
    other_image2:{
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

module.exports = shopperEngagement;