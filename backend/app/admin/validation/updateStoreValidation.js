const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateUpdateStore(data) {

    let errors = {};
    data.chain = !isEmpty(data.chain) ? data.chain : "";
    data.zone = !isEmpty(data.zone) ? data.zone : "";
    data.city = !isEmpty(data.city) ? data.city : "";
    data.state = !isEmpty(data.state) ? data.state : "";
    data.store_name = !isEmpty(data.store_name) ? data.store_name : "";
    data.project_name = !isEmpty(data.project_name) ? data.project_name : "";



    if (Validator.isEmpty(data.chain)) {
        errors.chain = "Chain  is required";
    }

    if (Validator.isEmpty(data.zone)) {
        errors.zone = "Zone  is required";
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = "City  is required";
    }

    if (Validator.isEmpty(data.state)) {
        errors.state = "State  is required";
    }

    if (Validator.isEmpty(data.store_name)) {
        errors.store_name = "Store Name  is required";
    }
    if (Validator.isEmpty(data.project_name)) {
        errors.project_name = "Project Name  is required";
    }




    return {
        errors,
        isValid: isEmpty(errors)
    };
}