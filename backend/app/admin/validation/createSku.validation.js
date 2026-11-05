const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateSkuInput(data) {
    let errors = {};
    // console.log("datata",data)
    // data.sku_no = !isEmpty(data.sku_no) ? data.sku_no : "";
    data.store_code = !isEmpty(data.store_code) ? data.store_code : "";
    data.range = !isEmpty(data.range) ? data.range : "";
    data.varient_name = !isEmpty(data.varient_name) ? data.varient_name : "";
    data.sku_grammage = !isEmpty(data.sku_grammage) ? data.sku_grammage : "";
    data.unit = !isEmpty(data.unit) ? data.unit : "";
    data.final_sku_name = !isEmpty(data.final_sku_name) ? data.final_sku_name : "";
    data.mrp = !isEmpty(data.mrp) ? data.mrp : "";

    // if (Validator.isEmpty(data.sku_no)) {
    //     errors.sku_no = "Sku No  is required";
    // }
    if (Validator.isEmpty(data.store_code)) {
        errors.store_code = "Store Code  is required";
    }
    if (Validator.isEmpty(data.range)) {
        errors.range = "Range  is required";
    }
    if (Validator.isEmpty(data.varient_name)) {
        errors.varient_name = "Varient Name  is required";
    }
    if (Validator.isEmpty(data.sku_grammage)) {
        errors.sku_grammage = "Sku Grammage  is required";
    }
    if (Validator.isEmpty(data.unit)) {
        errors.unit = "Unit  is required";
    }
    if (Validator.isEmpty(data.final_sku_name)) {
        errors.final_sku_name = "Final Sku Name is required";
    }
    if (Validator.isEmpty(data.mrp)) {
        errors.mrp = "Mrp is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}