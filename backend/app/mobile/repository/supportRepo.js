const supportModel = require("../../admin/models/support.js");

exports.supportRepo = async (data) => {
//   console.log(data, "repo");
  return await supportModel.create(data, { raw: true });
};
exports.getAllSupport = async () => {
  try {
    let getAllSupport = await supportModel.findAll({
      attributes: ["id", "form", "mail_status"],
      raw: true,
      nest: true,
    });

    return getAllSupport;
  } catch (error) {
    console.log(error);
  }
};
exports.deleteSupport = async (id) => {
  try {
    let deleteSupport = await supportModel.destroy({
      where: { id: id },
    });
    return deleteSupport
  } catch (error) {
    console.log(error, " -->error");
    throw error;
  }
};
