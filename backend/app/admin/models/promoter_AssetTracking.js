const { DB, Sequelize } = require("../../../config/database");


const promoter_AssetTraking = DB.define("skus", {



}, { underscored: true, paranoid: true, deletedAt: "deleted_at" });

module.exports = promoter_AssetTraking;
