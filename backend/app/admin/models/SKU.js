const { DB, Sequelize } = require("../../../config/database");
const Chain = require('../models/chain');
const Project = require('../models/project');
const Store = require('./store')

const sku = DB.define("skus", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sku_no: {
        type: Sequelize.STRING,
        allowNull: true,
        // references: {
        //     model: Store,
        //     key: 'store_id' // Primary Key Role Table
        // },

    },
    article_no: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    store_id: {
        type: Sequelize.INTEGER ,
        allowNull: false,
        references: {
            model: Store,
            key: 'id' // Primary Key Role Table
        },
        validate: {
            notNull: {
                msg: "Store code is required"
            },
            len: {
                args: [1, 100],
                msg: "Store code is Invalid"
            }
        }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    // chain: {
    //     type: Sequelize.STRING(100),
    //     // allowNull: false,
    //     // validate: {
    //     //   notNull: {
    //     //     msg: "Chain is required"
    //     //   },
    //     //   len: [2, 255],
    //     // }
    //   },
    varient_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Varient Name is required"
            },
            len: {
                args: [1, 100],
                msg: "Varient Name is Invalid"
            }
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
    sku_grammage: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // validate: {
        //     notNull: {
        //         msg: "Sku Grammage is required"
        //     },
        //     len: {
        //         args: [1, 100],
        //         msg: "Sku Grammage is Invalid"
        //     }
        // }
    },
    unit: {
        type: Sequelize.STRING(100),
        allowNull: true,
        // validate: {
        //     notNull: {
        //         msg: "Unit is required"
        //     },
        //     len: {
        //         args: [1, 100],
        //         msg: "Unit is Invalid"
        //     }
        // }
    },
    final_sku_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    mrp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "MRP is required"
            },
            len: {
                args: [1, 100],
                msg: "MRP is Invalid"
            }
        }
    },

    chain_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Chain,
            key: 'id',// Primary Key Chain Table,

        }
    },
    chain_name: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    zone: {
        type: Sequelize.INTEGER,
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
}, { underscored: true, paranoid: true, deletedAt: "deleted_at" });

sku.belongsTo(Store, {
    foreignKey: 'store_id',  // In Store table
    as: 'StoreId'  // In Store table
})

module.exports = sku;
