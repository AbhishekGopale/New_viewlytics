const { DB, Sequelize } = require("../../../config/database");
const Project = require('../models/project')
const Role = require('../models/role')

const client = DB.define("clients", {

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
    project_name:{
      type:Sequelize.STRING(100),
      allowNull: false,
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
        type: Sequelize.STRING(100),
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
            args: [[9,10,11]],
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
        defaultValue: 'ncp',
        validate: {
          notNull: "Role Name is required",
          isIn: {
            args: [['npc','cl_asm','se']],
            msg: "Role Name is Invalid"
          }
        },
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
        type: Sequelize.DATE,
        defaultValue: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

client.belongsTo(Role, {
  foreignKey: 'role_id'  // In user table
})

module.exports = client;