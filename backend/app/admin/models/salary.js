const { DB, Sequelize } = require("../../../config/database");
const User = require('../models/user');

const SALARY = DB.define("salarys", {
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
    Amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    month: {
        type: Sequelize.INTEGER,
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


module.exports = SALARY;



