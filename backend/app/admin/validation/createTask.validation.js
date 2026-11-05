const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validatetaskInput(data) {
    let errors = {};
    console.log("datata",data)
    data.task_name = !isEmpty(data.task_name) ? data.task_name : "";
    data.task_time = !isEmpty(data.task_time) ? data.task_time : "";
    data.task_description = !isEmpty(data.task_description) ? data.task_description : "";

    if (Validator.isEmpty(data.task_name)) {
        errors.task_name = "Task Name  is required";
    }
    if (Validator.isEmpty(data.task_time)) {
        errors.task_time = "Task Time is required";
    }
    if (Validator.isEmpty(data.task_description)) {
        errors.task_description = "Task Description  is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}