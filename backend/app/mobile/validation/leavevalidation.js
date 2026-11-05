const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.leave_type = !isEmpty(data.leave_type) ? data.leave_type : "";
    data.from = !isEmpty(data.from) ? data.from : "";
    data.to = !isEmpty(data.to) ? data.to : "";
    data.reason = !isEmpty(data.reason) ? data.reason : "";





    if (Validator.isEmpty(data.leave_type)) {
        errors.leave_type = "Leave Type is required";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "From Date is required";
    }

    if (Validator.isEmpty(data.to)) {
        errors.to = "To Date is required";
    }

    if (Validator.isEmpty(data.reason)) {
        errors.reason = "Reason is required";
    }




    return {
        errors,
        isValid: isEmpty(errors),
    };
};
