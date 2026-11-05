const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateCreateClient(data) {
    console.log(data)
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
    data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
    // data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
    // data.user_id = !isEmpty(data.user_id) ? data.user_id : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.mobile_no = !isEmpty(data.mobile_no) ? data.mobile_no : "";
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    // data.password = !isEmpty(data.password) ? data.password : "";
    // data.comfirm_password = !isEmpty(data.comfirm_password) ? data.comfirm_password : "";
    data.role_id = !isEmpty(data.role_id) ? data.role_id : "";
    data.role_name = !isEmpty(data.role_name) ? data.role_name : ""
    // data.zone = !isEmpty(data.zone) ? data.zone : "";


    console.log(data.mobile_no.toString(), '---------->mobile no ')



    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = "First Name is required!";
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = "Last Name is required!";
    }
    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id is required!";
    }
    // if (Validator.isEmpty(data.user_name)) {
    //     errors.user_name = "User Name is required!";
    // }
    // if (Validator.isEmpty(data.user_id)) {
    //     errors.user_id = "User Id is required!";
    // }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required!";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.mobile_no)) {
        errors.mobile_no = "Mobile Number is required!";
    }

    // if (Validator.isEmpty(data.password)) {
    //     errors.password = "Password is required!";
    // }
    if (Validator.isEmpty(data.role_id.toString())) {
        errors.role_id = "Role Id is required!";
    }
    if (Validator.isEmpty(data.role_name)) {
        errors.role_name = "Role Name is required!";
    }
    
    // if (Validator.isEmpty(data.comfirm_password)) {
    //     errors.comfirm_password = "Confirm Password is required!";
    // }
    // if (data.password != data.comfirm_password) {
    //     errors.comfirm_password = "Confirm password is not match with password";
    // }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}