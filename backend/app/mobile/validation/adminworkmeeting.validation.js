const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.work_type = !isEmpty(data.work_type) ? data.work_type : "";
    data.report_detailed_name = !isEmpty(data.report_detailed_name) ? data.report_detailed_name : "";
    data.meeting_start = !isEmpty(data.meeting_start) ? data.meeting_start : "";
    data.meeting_end = !isEmpty(data.meeting_end) ? data.meeting_end : "";
    data.total_hour = !isEmpty(data.total_hour) ? data.total_hour : "";
    data.what_is_done = !isEmpty(data.what_is_done) ? data.what_is_done : "";





    if (Validator.isEmpty(data.work_type)) {
        errors.work_type = "Work Type is required";
    }

    if (Validator.isEmpty(data.report_detailed_name)) {
        errors.report_detailed_name = "Report Deatiled Name is required";
    }

    if (Validator.isEmpty(data.meeting_start)) {
        errors.meeting_start = "Start Time is required";
    }

    if (Validator.isEmpty(data.meeting_end)) {
        errors.meeting_end = "Meeting End Time is required";
    }
    if (Validator.isEmpty(data.total_hour)) {
        errors.total_hour = "Total Hours Time is required";
    }
    if (Validator.isEmpty(data.what_is_done)) {
        errors.what_is_done =  "What is done required";
    }




    return {
        errors,
        isValid: isEmpty(errors),
    };
};
