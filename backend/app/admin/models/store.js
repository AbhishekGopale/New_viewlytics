const { DB, Sequelize } = require("../../../config/database");
const Project = require('../models/project')
const User = require('./user')


// Query For Start store id with 1001
// ALTER TABLE stores AUTO_INCREMENT = 1001;

const Store = DB.define("stores", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_code: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  store_name: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Store is required"
      },
      len: [2, 200],
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,

  },
  promoter: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  promoter_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  merchandiser: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  merchandiser_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  tl: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  tl_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  ta: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  ta_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  asm: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  asm_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  npm: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  npm_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  client_npc: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  npc_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  client_asm: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  client_asm_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  client_se: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  se_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  chain: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Chain is required"
      },
      len: [2, 255],
    }
  },
  project_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
        model: Project,
        key: 'id',// Primary Key Chain Table,

    }
    
  },
  project_name: {
      type: Sequelize.STRING(100),
  },
  Image: {
    type: Sequelize.STRING(100),
  },
  zone: {
    type: Sequelize.INTEGER,
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "City is required"
      },
      len: [2, 100],
    }
  },
  state: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "State is required"
      },
      len: [2, 100],
    }
  },

  location: {
    type: Sequelize.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Location is required"
      },
      len: [2, 200],
    }
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  verified: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  lat: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  long: {
    type: Sequelize.STRING(100),
    allowNull: true,
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

// Store.belongsTo(User, {
//   foreignKey: 'user_id'  // In user table
// })


Store.belongsTo(Project, {
  foreignKey: 'project_id'  // In user table
})

module.exports = Store;

