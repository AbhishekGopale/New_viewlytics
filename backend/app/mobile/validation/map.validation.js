const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateMapDeatilInput(data) {
    console.log(data,"ddtdtdt")
    let errors = {};

    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";
    data.battery = !isEmpty(data.battery) ? data.battery : "";
    data.lat = !isEmpty(data.lat) ? data.lat : "";
    data.long = !isEmpty(data.long) ? data.long : "";
    data.imei_number = !isEmpty(data.imei_number) ? data.imei_number : "";
    data.speed = !isEmpty(data.speed) ? data.speed : "";


    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id is required";
    }

    if (Validator.isEmpty(data.battery)) {
        errors.battery = "Battery  is required";
    }

    if (Validator.isEmpty(data.lat)) {
        errors.lat = "latitude is required";
    }
    if (Validator.isEmpty(data.long)) {
        errors.long = "longitude is required";
    }
    if (Validator.isEmpty(data.imei_number)) {
        errors.imei_number = "imei_number is required";
    }
    if (Validator.isEmpty(data.speed)) {
        errors.speed = "speed is required";
    }




    return {
        errors,
        isValid: isEmpty(errors),
    };
};
