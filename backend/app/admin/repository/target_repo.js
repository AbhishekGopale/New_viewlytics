let targetModel = require("../models/target");
let User = require("../models/user");
let skuModel = require("../models/SKU");
const moment = require("moment");
const { Op } = require("sequelize");
const Stores = require('../models/store')

exports.createTarget = async (reqBody) => {
  return await targetModel.create(reqBody, { raw: true });
  // console.log(reqBody,"bodydyrepo")
};
exports.bulkCreateTarget = async (data) => {
  let target = await targetModel.bulkCreate(data, { validate: true, raw: true })
  return target;
};

exports.updateTarget = async (id, reqBody) => {
  // console.log(id, reqBody,"nuyygygy")
  const UpdateTarget = await targetModel.update(
    {
      user_id: reqBody.user_id,
      store_id: reqBody.store_id,
      target_type: reqBody.target_type,
      target: reqBody.target,
      sku_id: reqBody.sku_id,
      start_date: reqBody.start_date,
      end_date: reqBody.end_date,
    },
    { where: { id: id } }
  );

  return UpdateTarget;
};

exports.getAllTarget = async (reqQuery, sort_array, filter_value) => {
  try {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
      //   var regex = new RegExp(filter_value, "i");
      filter_value = {
        [Op.or]: [{ target: { [Op.like]: `%${filter_value}%` } }],
      };
    } else {
      filter_value = {};
    }
    // console.log(filter_value)
    let getAllTarget = await targetModel.findAll({
      where: filter_value,
      attributes: [
        "id",
        "user_id",
        "store_id",
        "target_type",
        "target",
        "sku_id",
        "start_date",
        "end_date",
      ],
      include: [
        {
          model: User,
          as: "User",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: skuModel,
          as: "SKU",
          attributes: ["id", "sku_no", "final_sku_name"],
        },
      ],
      raw: true,
      nest: true,
      order: [sort_array],
      offset: SKIP,
      limit: LIMIT,
    }); 

    let StoresData = await Stores.findAll({
      raw: true,
      nest: true,
    })
    console.log(getAllTarget,"getAllllll")
    let totalCount = await targetModel.count({});
    let chainData = getAllTarget.map((value) => {
      const found = StoresData.find((element) => {
        return element.id == value.store_id;
      });
      console.log(found, "idd")
      // value.store_id = found ? found.store_name : ""
      value.store_name = found ? found.store_name : ""
    })
    for (let index = 0; index < getAllTarget.length; index++) {
      const element = getAllTarget[index];

      element.start_date = element.start_date.slice(0, 10).split('-').reverse().join('-')
      element.end_date = element.end_date.slice(0, 10).split('-').reverse().join('-')
    }

    return { data: getAllTarget, count: totalCount };
  } catch (error) {
    console.log(error);
  }
};

exports.get = async (id) => {
  let targetData = await targetModel.findOne({
    where: { id: id },
    attributes: ['id', 'user_id', 'sku_id', 'target', 'target_type', 'start_date', 'end_date'], raw: true,
    nest: true,
  });
  console.log(targetData, "datat");
  return targetData;
};

exports.deleteTarget = async (id) => {
  console.log(id, "repo");
  let deleteTarget = await targetModel.destroy({
    where: { id: id },
  });
  return deleteTarget;
};
exports.deleteMany = async (id) => {
  console.log(id, "repo");
  let deleteMany = await targetModel.destroy({
    where: { id: id },
  });
  return deleteMany;
};

