const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateSkuInput(data) {
    let errors = {};

    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    data.category_name = !isEmpty(data.category_name) ? data.category_name : "";


    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Name is required";
    }
    if (Validator.isEmpty(data.category_name)) {
        errors.category_name = "Category Name is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}