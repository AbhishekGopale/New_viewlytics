const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validatepromotersosInput(data) {
    let errors = {};
    console.log(data)
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";
    data.open_inventory_id = !isEmpty(data.open_inventory_id) ? data.open_inventory_id : "";
    


    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "Store Id is required";
    }
    if (Validator.isEmpty(data.open_inventory_id)) {
        errors.open_inventory_id = "Open Inventory Id is required";
    }

   
    return {
        errors,
        isValid: isEmpty(errors),
    };
}