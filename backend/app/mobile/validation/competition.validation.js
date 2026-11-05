const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validatefielldVisitInput(data) {
    // console.log(data)
    let errors = {};

    data.activation_type = !isEmpty(data.activation_type) ? data.activation_type : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.compation_name = !isEmpty(data.compation_name) ? data.compation_name : "";
    data.compation_description = !isEmpty(data.compation_description) ? data.compation_description : "";



    if (Validator.isEmpty(data.activation_type)) {
        errors.activation_type = "Activation Type is required";
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = "Category is required";
    }

    if (Validator.isEmpty(data.compation_name)) {
        errors.compation_name = "Compation Name is required";
    }

    if (Validator.isEmpty(data.compation_description)) {
        errors.compation_description = "Description is required";
    }


    return {
        errors,
        isValid: isEmpty(errors),
    };
};