const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");

const Task = DB.define("tasks", {
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
    store: {
        type: Sequelize.JSON,
        allowNull: true,
    },
    // place_group: {
    //     type: Sequelize.STRING(100),
    //     allowNull: true,
    // },
    // place_category: {
    //     type: Sequelize.STRING(100),
    //     allowNull: true,
    // },
    // place_name: {
    //     type: Sequelize.STRING(100),
    //     allowNull: false,
    // },
    task_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    form_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    task_time: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    task_description: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
    repeat:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    alert:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    share:{
        type: Sequelize.INTEGER,
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
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" });

module.exports = Task;