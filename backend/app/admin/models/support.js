const { DB, Sequelize } = require("../../../config/database");

// Query For Start store id with 1001
// ALTER TABLE stores AUTO_INCREMENT = 1001;

const Store = DB.define("supports", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
  form: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Form is required"
      },
      len: [2, 200],
    }
  },
  mail_status:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: "0"
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
},{ underscored: true, paranoid: true, deletedAt: "deleted_at" });


module.exports = Store;

