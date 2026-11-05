const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateUpdatePromo(data) {

    let errors = {};
    data.promo_des = !isEmpty(data.promo_des) ? data.promo_des : "";
    data.project_id = !isEmpty(data.project_id) ? data.project_id : "";
    data.chain_id = !isEmpty(data.chain_id) ? data.chain_id : "";
    data.promo_type = !isEmpty(data.promo_type) ? data.promo_type : "";
    data.start_date = !isEmpty(data.start_date) ? data.start_date : "";
    data.end_date = !isEmpty(data.end_date) ? data.end_date : "";
    data.sku_id = !isEmpty(data.sku_id) ? data.sku_id : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.zone = !isEmpty(data.zone) ? data.zone : "";



    if (Validator.isEmpty(data.promo_des)) {
        errors.promo_des = "Promo Description is required!";
    }
    if (Validator.isEmpty(data.project_id)) {
        errors.project_id = "Project Id is required!";
    }
    if (Validator.isEmpty(data.chain_id)) {
        errors.chain_id = "Chain Id is required!";
    }
    if (Validator.isEmpty(data.promo_type)) {
        errors.promo_type = "Promo Type is required!";
    }
    if (Validator.isEmpty(data.start_date)) {
        errors.start_date = "Start Date is required!";
    }
    if (Validator.isEmpty(data.end_date)) {
        errors.end_date = "End Date is required!";
    }
    if (Validator.isEmpty(data.sku_id)) {
        errors.sku_id = "Sku  is required!";
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "Status is required!";
    }
    if (Validator.isEmpty(data.zone)) {
        errors.zone = "Zone is required!";
    }



    return {
        errors,
        isValid: isEmpty(errors)
    };
}