const { DB, Sequelize } = require("../../../config/database");

const Role = require('../models/role');
const Client = require("./client");

const clientRelation = DB.define("client_relations", {
  client_relation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',// Primary Key Role Table,

    }
  },
  client_role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Role is required"
      },
      isIn: {
        args: [[9,10,11]],
        msg: "Role is Invalid"
      }
    },
    references: {
      model: Role,
      key: 'role_id' // Primary Key Role Table
    }
  },
  client_role_name: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'npc',
    validate: {
      notNull: "Role Name is required",
      isIn: {
        args: [['npc','cl_asm','se']],
        msg: "Role Name is Invalid"
      }
    },
  },
  client_npc: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Client,
      key: 'id' // Primary Key Role Table
    }
  },
  client_ase: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Client,
      key: 'id' // Primary Key Role Table
    }
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
  updated_at: {
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
},{ underscored: true, paranoid: true, deletedAt: "deleted_at" });

clientRelation.belongsTo(Client, {
  foreignKey: 'client_id',  // In Client table
  as: 'Client'
})
clientRelation.belongsTo(Client, {
  foreignKey: 'client_npc',  // In Client table
  as: 'UserNcpId'
})
clientRelation.belongsTo(Client, {
  foreignKey: 'client_ase',  // In Client table
  as: 'UserAseId'
})
clientRelation.belongsTo(Role, {
  foreignKey: 'client_role_id',  // In Role table
  as: 'UserRoleId'
})


// UserRelation.sync({alter: true})


module.exports = clientRelation;
