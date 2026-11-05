const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateForgotChagePasswordInput(data) {

    let errors = {};
    data.password = !isEmpty(data.password) ? data.password : "";
    data.comfirm_password = !isEmpty(data.comfirm_password) ? data.comfirm_password : "";

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password  is required";
    }

    if (Validator.isEmpty(data.comfirm_password)) {
        errors.comfirm_password = "Confirm password  is required";
    }

    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = "Password is too short. It needs to be atleast 6 characters.";
    }

    if (data.password != data.comfirm_password) {
        errors.comfirm_password = "Confirm password is not match with password";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}