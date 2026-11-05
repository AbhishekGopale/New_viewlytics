const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validatemerchandisersosInput(data) {
    let errors = {};
    console.log(data)
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";
    data.brand_cat_1 = !isEmpty(data.brand_cat_1) ? data.brand_cat_1 : "";
    data.com_facing_1 = !isEmpty(data.com_facing_1) ? data.com_facing_1 : "";
    data.brand_1_sos = !isEmpty(data.brand_1_sos) ? data.brand_1_sos : "";
    data.brand_cat_2 = !isEmpty(data.brand_cat_2) ? data.brand_cat_2 : "";
    data.com_facing_2 = !isEmpty(data.com_facing_2) ? data.com_facing_2 : "";
    data.brand_2_sos = !isEmpty(data.brand_2_sos) ? data.brand_2_sos : "";


    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id is required";
    }
    if (Validator.isEmpty(data.brand_cat_1)) {
        errors.brand_cat_1 = "Brand cat 1 is required";
    }

    if (Validator.isEmpty(data.com_facing_1)) {
        errors.com_facing_1 = "Com facing 1 is required";
    }
    if (Validator.isEmpty(data.brand_1_sos)) {
        errors.brand_1_sos = "Brand 1 sos is required";
    }
    if (Validator.isEmpty(data.brand_cat_2)) {
        errors.brand_cat_2 = "Brand cat 2 is required";
    }
    if (Validator.isEmpty(data.com_facing_2)) {
        errors.com_facing_2 = "Com Facing 2 is required";
    }
    if (Validator.isEmpty(data.brand_2_sos)) {
        errors.brand_2_sos = "Brand 2 sos is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}