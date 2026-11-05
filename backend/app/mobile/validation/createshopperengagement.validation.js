const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateShopperEngagementInput(data) {

    let errors = {};
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";

    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id  is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
}