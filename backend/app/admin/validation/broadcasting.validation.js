const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateBroadCastingInput(data) {
    let errors = {};
    console.log("datata",data)
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    // data.zone_id = !isEmpty(data.zone_id) ? data.zone_id : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    

    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id  is required";
    }
    // if (Validator.isEmpty(data.zone_id)) {
    //     errors.zone_id = "Zone Id is required";
    // }
    
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description  is required";
    }
    
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}