const { DB, Sequelize } = require("../../../config/database");

const UserAssign = DB.define("userassigns", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "User Id is required"
            },
            len: {
                args: [1, 100],
                msg: "User Id is Invalid"
            }
        }
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    user_role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    store_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    select_state: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    zone: {
        type: Sequelize.STRING,
        allowNull: true,
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
module.exports = UserAssign;