const { DB, Sequelize } = require("../../../config/database");

const Role = require('../models/role');
const Zone = require('../models/zone');

const User = DB.define("users", {
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
  user_id: {
    type: Sequelize.STRING(100),
    allowNull: false,
    // validate: {
    //   notNull: {
    //     msg: "User Id is required"
    //   },
    //   isIn: {
    //     args: [[2, 3, 4, 5, 6, 7]],
    //     msg: "User Id is Invalid"
    //   }
    // }
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
        args: [[2, 3, 4, 5, 6, 7]],
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
        args: [['npm', 'asm', 'tl', 'promoter', 'merchandiser', 'ta']],
        msg: "Role Name is Invalid"
      }
    },
  },

  zone: {
    type: Sequelize.INTEGER,
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "city is required"
      },
    }
  },
  is_login: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  notification_status: {
    // field: 'created_at',
    type: Sequelize.INTEGER,
    defaultValue: "0",
  },
  profile_image: {
    type: Sequelize.STRING(100),
  },
  dob: {
    type: Sequelize.DATE,
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "state is required"
      },
    }
  },
  gender: {
    type: Sequelize.STRING(100),
  },
  w_off: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  reset_passtoken: {
    type: Sequelize.STRING(300)
  },

  token_expire: {
    type: Sequelize.DATE
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
}, { underscored: true, paranoid: false })

User.belongsTo(Role, {
  foreignKey: 'role_id'  // In user table
})
User.belongsTo(Zone, {
  foreignKey: 'zone',  // In zone table
  as: "zoneId" 
})

module.exports = User;
