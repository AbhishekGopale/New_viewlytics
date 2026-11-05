const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validatesosInput(data) {
    let errors = {};
    console.log(data)
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    


    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id is required";
    }
    if (Validator.isEmpty(data.date)) {
        errors.date = "Date is required";
    }

   
    return {
        errors,
        isValid: isEmpty(errors),
    };
}