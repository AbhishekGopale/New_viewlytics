const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdateClient(data) {
    console.log(data)
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
    // data.ta = !isEmpty(data.ta) ? data.ta : "";



    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name is required!";
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name is required!";
    }
    if (Validator.isEmpty(data.user_name)) {
        errors.user_name = "User Name is required!";
    }
    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id is required!";
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
    // if (Validator.isEmpty(data.ta)) {
    //     errors.ta = "Ta is required!";
    // }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}



