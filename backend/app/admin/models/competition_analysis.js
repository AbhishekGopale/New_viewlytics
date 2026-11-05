const { DB, Sequelize } = require("../../../config/database");
const User = require("./user");
const Store = require("./store");


const CompetitionAnalysis = DB.define("competitionanalysises", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',// Primary Key User Table,

        }
    },
    store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Store,
            key: 'store_code',// Primary Key Store Table,
        }
    },
    activation_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    compation_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    compation_description: {
        type: Sequelize.STRING(300),
        allowNull: true
    },
    activation_pic: {
        type: Sequelize.STRING(300),
        allowNull: true
    },
    activation_pic_2: {
        type: Sequelize.STRING(300),
        allowNull: true
    },

    created_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },
    updated_at: {
        type: Sequelize.DATE,
        default: Date.now,
    },

}, { underscored: true, paranoid: true, deletedAt: "deleted_at" })

CompetitionAnalysis.belongsTo(User, {
    foreignKey: 'user_id',  // In user table
    as: 'User'
})

CompetitionAnalysis.belongsTo(Store, {
    foreignKey: 'store_id',  // In Store table
    as: 'Store'
})


module.exports = CompetitionAnalysis;
