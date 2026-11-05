const { DB, Sequelize } = require("../../../config/database");

const Role = require('../models/role');
const User = require("./user");

const UserRelation = DB.define("user_relations", {
  user_relation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',// Primary Key Role Table,

    }
  },
  user_role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Role is required"
      },
      isIn: {
        args: [[2, 3, 4, 5, 6, 7]],
        msg: "Role is Invalid"
      }
    },
    references: {
      model: Role,
      key: 'role_id' // Primary Key Role Table
    }
  },
  user_role_name: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'tl',
    validate: {
      notNull: "Role Name is required",
      isIn: {
        args: [['npm', 'asm', 'tl', 'promoter', 'merchandiser', 'ta']],
        msg: "Role Name is Invalid"
      }
    },
  },
  user_tl: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id' // Primary Key Role Table
    }
  },
  user_asm: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id' // Primary Key Role Table
    }
  },
  user_npm: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
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
}, {
  underscored: true, paranoid: false

});

UserRelation.belongsTo(Role, {
  foreignKey: 'user_role_id',  // In user table
  as: 'UserRoleId'
})
UserRelation.belongsTo(User, {
  foreignKey: 'user_tl',  // In user table
  as: 'UserTlId'

})
UserRelation.belongsTo(User, {
  foreignKey: 'user_asm',  // In user table
  as: 'UserAsmId'

})
UserRelation.belongsTo(User, {
  foreignKey: 'user_ta',  // In user table
  as: 'UserTAId'
})
UserRelation.belongsTo(User, {
  foreignKey: 'user_npm',  // In user table
  as: 'UserNpmId'
})
UserRelation.belongsTo(User, {
  foreignKey: 'user_id',  // In user table
  as: 'User'
})


// UserRelation.sync({alter: true})


module.exports = UserRelation;
