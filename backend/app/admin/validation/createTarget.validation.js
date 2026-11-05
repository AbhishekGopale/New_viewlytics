const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validatetargetInput(data) {
    let errors = {};
    console.log("datata",data)
    data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";
    data.target_type = !isEmpty(data.target_type) ? data.target_type : "";
    data.target = !isEmpty(data.target) ? data.target : "";
    data.sku_id = !isEmpty(data.sku_id) ? data.sku_id : "";
    data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
    data.end_date = !isEmpty(data.end_date) ? data.end_date : "";

    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User Id  is required";
    }
    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id is required";
    }
    if (Validator.isEmpty(data.target_type)) {
        errors.target_type = "Target type  is required";
    }
    if (Validator.isEmpty(data.target)) {
        errors.target = "Target  is required";
    }
    if (Validator.isEmpty(data.sku_id)) {
        errors.sku_id = "sku id  is required";
    }
    if (Validator.isEmpty(data.start_date)) {
        errors.start_date = "Start Date is required";
    }
    if (Validator.isEmpty(data.end_date)) {
        errors.end_date = "End Date is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}