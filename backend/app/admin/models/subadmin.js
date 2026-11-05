const { DB, Sequelize } = require("../../../config/database");

const Role = require('../models/role')
const Zone = require('../models/zone')
const rolePermission = require('../models/subAdmin_rolePermission_module')

const Subadmin = DB.define("subadmins", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Email is required"
      },
      len: [ 5, 100 ],
      isEmail: {
        msg: "Email field is not valid"
      }
    }
  },
  first_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "First Name is required"
      },
      len: {
        args: [ 2, 100 ],
        msg: "First Name is Invalid"
      }
    }
  },
  last_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Last Name is required"
      },
      len: {
        args: [ 2, 100 ],
        msg: "Last Name is Invalid"
      }
    }
  },
  full_name: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  user_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "user Name is required"
      },
      len: {
        args: [ 2, 100 ],
        msg: "User Name is Invalid"
      }
    }
  },
  password: {
    type: Sequelize.STRING(200),
    allowNull: false,
    validate: {
      customValidator(value) {
        if (!value.length || value.length < 8) {
          throw new Error("Password must grater than 7 character");
        }
      }
    }
  },
  mobile_no: {
    type: Sequelize.CHAR(12),
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Mobile No  is required"
      },
      len: {
        args: [ 10, 13 ],
        msg: "Mobile No is Invalid"
      },

    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Role is required"
      },
      isIn: {
        args: [[2, 3, 4, 5, 6, 7,8]],
        msg: "Role is Invalid"
      }
    },
    references: {
      model: Role,
      key: 'role_id' // Primary Key Role Table
    }

  },
  role_name: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: 'tl',
    validate: {
      notNull: "Role Name is required",
      isIn: {
        args: [['sub_admin']],
        msg: "Role Name is Invalid"
      }
    },
  },

  role_permission: {
    type: Sequelize.JSON,
    allowNull: true,
    references: {
      model: rolePermission,
      key: 'id',// Primary Key rolePermission Table,
    }
  },

  zone: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  gender: {
    type: Sequelize.STRING(100),
  },
  profile_image: {
    type: Sequelize.STRING(100),
  },
  dob: {
    type: Sequelize.DATE,
  },
  created_at: {
    // field: 'created_at',
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
  updated_at: {
    // field: 'updated_at',
    type: Sequelize.DATE,
    defaultValue: Date.now,
  },
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

Subadmin.belongsTo(Role, {
  foreignKey: 'role_id'  // In Role table
})
Subadmin.belongsTo(Zone, {
  foreignKey: 'zone' , // In Zone table
  as: "zoneId" 
})

Subadmin.belongsTo(rolePermission, {
  foreignKey: 'id',
  as: "rolePermission" // In Role Permission table
})


module.exports = Subadmin;
