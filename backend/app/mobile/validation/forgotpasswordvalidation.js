const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateForgotPassword(data) {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}