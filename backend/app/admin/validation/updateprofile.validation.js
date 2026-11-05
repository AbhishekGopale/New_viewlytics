const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdateProfile(data) {
    console.log(data)
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
    data.dob = !isEmpty(data.dob) ? data.dob : "";
    data.gender = !isEmpty(data.gender) ? data.gender : "";



    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name is required!";
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name is required!";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.mobile_no)) {
        errors.mobile_no = "Mobile Number is required!";
    }
    if (Validator.isEmpty(data.dob)) {
        errors.dob = "Dob is required!";
    }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = "Gender is required!";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}



