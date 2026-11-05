const Validator = require("validator");
const isEmpty = require("../../isEmpty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.meeting_type = !isEmpty(data.meeting_type) ? data.meeting_type : "";
    data.meeting_agenda = !isEmpty(data.meeting_agenda) ? data.meeting_agenda : "";
    data.meeting_start = !isEmpty(data.meeting_start) ? data.meeting_start : "";
    data.meeting_end = !isEmpty(data.meeting_end) ? data.meeting_end : "";
    data.total_hour = !isEmpty(data.total_hour) ? data.total_hour : "";
    data.meeting_minutes = !isEmpty(data.meeting_minutes) ? data.meeting_minutes : "";





    if (Validator.isEmpty(data.meeting_type)) {
        errors.meeting_type = "Meeting Type is required";
    }

    if (Validator.isEmpty(data.meeting_agenda)) {
        errors.meeting_agenda = "Meeting Agenda is required";
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
    if (Validator.isEmpty(data.meeting_minutes)) {
        errors.meeting_minutes = "Meeting Minutes Time is required";
    }




    return {
        errors,
        isValid: isEmpty(errors),
    };
};
