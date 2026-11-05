const { Sequelize } = require("../../../config/database");
const mapRepo = require("../repository/map_repo");
const storeModel = require("../../admin/models/store");

exports.findMapData = async (id) => {
  try {
    var FindStores = await mapRepo.findStore(id);
    // directly return the value here
    return FindStores;
  } catch (error) {
    throw error;
  }
};
