const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdateProject(data) {

    let errors = {};
    data.project_name = !isEmpty(data.project_name) ? data.project_name : "";



    if (Validator.isEmpty(data.project_name)) {
        errors.project_name = "Project Name is required!";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}