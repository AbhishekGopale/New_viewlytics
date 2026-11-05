const { DB, Sequelize } = require("../../../config/database");

const FieldVisit = DB.define("fieldvisits", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
              msg: "Store Id is required"
            },
        }
    },
    date:{
        type:Sequelize.DATE
    },
    uniform_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    uniform_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Uniform Image  is required"
        //     },
        // }
    },
    uniform_reason: {
        type: Sequelize.STRING(200),
    },
    wheth_sos_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        
    },
    wheth_sos_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Whwather sos Image  is required"
        //     },
        // }
    },
    wheth_sos_reason: {
        type: Sequelize.STRING(200),
    },
    wheth_pog_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    wheth_pog_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Wheather pog Image  is required"
        //     },
        // }
    },
    wheth_pog_reason: {
        type: Sequelize.STRING(200),
    },
    wheth_paid_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    wheth_paid_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Wheather paid Image  is required"
        //     },
        // }
    },
    wheth_paid_reason: {
        type: Sequelize.STRING(200),
    },
    courtesy_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    courtesy_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Country Image  is required"
        //     },
        // }
    },
    courtesy_reason: {
        type: Sequelize.STRING(200),
    },
    online_app_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    online_app_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Online app Image  is required"
        //     },
        // }
    },
    online_app_reason: {
        type: Sequelize.STRING(200),
    },
    staff_status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    staff_image:{
        type: Sequelize.STRING(200),
        allowNull: true,
        // validate: {
        //     notNull: {
        //       msg: "Staff Image  is required"
        //     },
        // }
    },
    staff_reason: {
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
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })
module.exports = FieldVisit;