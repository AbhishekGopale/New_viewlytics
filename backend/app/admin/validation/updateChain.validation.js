const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdateStore(data) {

    let errors = {};
    data.chain_name = !isEmpty(data.chain_name) ? data.chain_name : "";
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";



    if (Validator.isEmpty(data.chain_name)) {
        errors.chain_name = "Chain Name is required!";
    }
    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id is required!";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}