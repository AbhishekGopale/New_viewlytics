const Validator = require("validator"); 66
const isEmpty = require("../../isEmpty");


module.exports = function validateUpdateStore(data) {



    let errors = {};
    data.store_code = !isEmpty(data.store_code) ? data.store_code : "";
    data.varient_name = !isEmpty(data.varient_name) ? data.varient_name : "";
    data.sku_grammage = !isEmpty(data.sku_grammage) ? data.sku_grammage : "";
    // data.unit = !isEmpty(data.unit) ? data.unit : "";
    // data.final_sku_name = !isEmpty(data.final_sku_name) ? data.final_sku_name : "";
    data.mrp = !isEmpty(data.mrp) ? data.mrp : "";



    if (Validator.isEmpty(data.store_code.toString())) {
        errors.store_code = "Store code  is required";
    }

    // if()

    if (Validator.isEmpty(data.varient_name)) {
        errors.varient_name = "Varient Name  is required";
    }

    if (Validator.isEmpty(data.sku_grammage.toString())) {
        errors.sku_grammage = "Sku grammage  is required";
    }

    // if (Validator.isEmpty(data.unit)) {
    //     errors.unit = "Unit  is required";
    // }

    if (Validator.isEmpty(data.mrp.toString())) {
        errors.mrp = "Mrp  is required";
    }

    // if (Validator.isEmpty(data.final_sku_name)) {
    //     errors.final_sku_name = "Final Sku Name  is required";
    // }




    return {
        errors,
        isValid: isEmpty(errors)
    };
}