const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdateStore(data) {
    let errors = {};
    data.zone_name = !isEmpty(data.zone_name) ? data.zone_name : "";

    if (Validator.isEmpty(data.zone_name)) {
        errors.zone_name = "Zone Name is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}