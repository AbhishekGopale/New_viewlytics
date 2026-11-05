const storeModel = require("../../admin/models/store");
let userModel = require("../../admin/models/user");
const mapModel = require("../../admin/models/map");
const moment = require("moment");

exports.findStore = async (id) => {
  try {
    const findUser = await userModel.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "role_name", "role_id"],
      raw: true,
      nest: true,
    });

    const conditions = {
      tl: { tl_id: findUser.id },
      npm: { npm_id: findUser.id },
      asm: { asm_id: findUser.id },
      ta: { ta_id: findUser.id },
    };

    const roleAttributes = {
      tl: [
        "id",
        "store_name",
        "promoter_id",
        "zone",
        "city",
        "state",
        "location",
        "tl_id",
      ],
      npm: [
        "id",
        "store_name",
        "promoter_id",
        "zone",
        "city",
        "state",
        "location",
        "tl_id",
        "npm_id",
      ],
      asm: [
        "id",
        "store_name",
        "promoter_id",
        "zone",
        "city",
        "state",
        "location",
        "tl_id",
        "npm_id",
        "asm_id",
      ],
      ta: [
        "id",
        "store_name",
        "promoter_id",
        "zone",
        "city",
        "state",
        "location",
        "asm_id",
        "npm_id",
        "tl_id",
        "ta_id",
      ],
    };

    const roleKey = findUser.role_name;
    const roleCondition = conditions[roleKey];
    const roleAttrs = roleAttributes[roleKey];

    const storeData = await storeModel.findAll({
      where: roleCondition,
      attributes: roleAttrs,
      raw: true,
      nest: true,
    });
    const currentDate = moment().format("YYYY-MM-DD");

    await Promise.all(
      storeData.map(async (storeItem) => {
        if (storeItem.promoter_id !== null) {
          const findMapId = await mapModel.findOne({
            where: {
              user_id: storeItem.promoter_id,
            },
            attributes: [
              "id",
              "user_name",
              "user_id",
              "battery",
              "date",
              "speed",
              "lat",
              "long",
              "imei_number",
            ],
            raw: true,
            nest: true,
          });

          if (findMapId !== null && findMapId.date === currentDate) {
            // Push data into storeData with matched ids
            storeItem.mapData = {
              id: findMapId.id,
              user_name: findMapId.user_name,
              user_id: findMapId.user_id,
              battery: findMapId.battery,
              date: findMapId.date,
              speed: findMapId.speed,
              lat: findMapId.lat,
              long: findMapId.long,
              imei_number: findMapId.imei_number,
            };
          }
        }
      })
    );

    return storeData;
  } catch (error) {
    throw error;
  }
};
