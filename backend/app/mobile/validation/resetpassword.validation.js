const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateResetPasswordInput(data) {

    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password  is required";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm password  is required";
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = "Password is too short. It needs to be atleast 6 characters.";
    }

    if (data.password != data.confirmPassword) {
        errors.confirmPassword = "Confirm password is not match with password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}