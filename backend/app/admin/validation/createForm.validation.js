const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateFormInput(data) {
    let errors = {};
    console.log("datata",data)
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    data.project_name = !isEmpty(data.project_name) ? data.project_name : "";
    data.url = !isEmpty(data.url) ? data.url : "";
    data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
    data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
    data.title = !isEmpty(data.title) ? data.title : "";
    data.status = !isEmpty(data.status) ? data.status : "";

    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id  is required";
    }
    if (Validator.isEmpty(data.project_name)) {
        errors.project_name = "Project Name is required";
    }
    if (Validator.isEmpty(data.url)) {
        errors.url = "Url  is required";
    }
    if (Validator.isEmpty(data.start_date)) {
        errors.start_date = "Start Date  is required";
    }
    if (Validator.isEmpty(data.end_date)) {
        errors.end_date = "End Date is required";
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is required";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}