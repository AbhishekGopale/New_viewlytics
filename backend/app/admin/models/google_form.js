const { DB, Sequelize } = require("../../../config/database");
const Project = require('../models/project')
const User = require('../models/user')

const googleForm = DB.define("googleforms", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Project,
            key: 'id',// Primary Key Chain Table,

        }
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',// Primary Key Role Table,
    
        }
      },
    project_name: {
        type: Sequelize.STRING(100),
    },
    url: {
        type: Sequelize.STRING(400),
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    start_date: {
        type: Sequelize.DATE,
    },
    end_date: {
        type: Sequelize.DATE,
    },
    form_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },



}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })
googleForm.belongsTo(User, {
    foreignKey: 'user_id',  // In Client table
    as: 'User'
  })
module.exports = googleForm;