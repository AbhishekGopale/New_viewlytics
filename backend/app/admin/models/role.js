const { DB, Sequelize } = require("../../../config/database");

const Role = DB.define("roles", {
  role_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_name: {
    type: Sequelize.STRING(100),
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
},{ underscored: true })


module.exports = Role;
