const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validatefielldVisitInput(data) {
    // console.log(data)
    let errors = {};

    data.uniform_status = !isEmpty(data.uniform_status) ? data.uniform_status : "";
    data.wheth_sos_status = !isEmpty(data.wheth_sos_status) ? data.wheth_sos_status : "";
    data.wheth_pog_status = !isEmpty(data.wheth_pog_status) ? data.wheth_pog_status : "";
    data.wheth_paid_status = !isEmpty(data.wheth_paid_status) ? data.wheth_paid_status : "";
    data.courtesy_status = !isEmpty(data.courtesy_status) ? data.courtesy_status : "";
    data.online_app_status = !isEmpty(data.online_app_status) ? data.online_app_status : "";
    data.staff_status = !isEmpty(data.staff_status) ? data.staff_status : "";
    data.store_id = !isEmpty(data.store_id) ? data.store_id : "";


    if (Validator.isEmpty(data.uniform_status)) {
        errors.uniform_status = "Uniform Status is required";
    }

    if (Validator.isEmpty(data.wheth_sos_status)) {
        errors.wheth_sos_status = "Wheather sos status is required";
    }

    if (Validator.isEmpty(data.wheth_pog_status)) {
        errors.wheth_pog_status = "Wheather pog status  is required";
    }
    if (Validator.isEmpty(data.wheth_paid_status)) {
        errors.wheth_paid_status = "Wheather paid status  is required";
    }
    if (Validator.isEmpty(data.courtesy_status)) {
        errors.courtesy_status = "courtesy status  is required";
    }
    if (Validator.isEmpty(data.online_app_status)) {
        errors.online_app_status = "Online app status  is required";
    }
    if (Validator.isEmpty(data.staff_status)) {
        errors.staff_status = "staff status  is required";
    }

    if (Validator.isEmpty(data.store_id)) {
        errors.store_id = "store id is required";
    }




    return {
        errors,
        isValid: isEmpty(errors),
    };
};