const Validator = require("validator");
const isEmpty = require("../../isEmpty");


module.exports = function validateLoginInput(data) {
    let errors = {};

    data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

    if (!Validator.isLength(data.mobile, {
        min: 9,
        max: 15
    })
    ) {
        errors.mobile = "Mobile Number is invalid";
    }

    if (!Validator.isNumeric(data.mobile, { no_symbols: false })) {
        errors.mobile = "Mobile Number is invalid";
    }


    if (Validator.isEmpty(data.mobile)) {
        errors.mobile = "Mobile Number is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
