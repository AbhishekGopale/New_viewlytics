const MeetingRepo = require("../repository/meeting_repo.js");


exports.sedualTime = async (reqBody, id) => {
    try {

        const createMeetingObj = {
            user_id: id,
            meeting_type: reqBody.meeting_type,
            meeting_agenda: reqBody.meeting_agenda,
            meeting_start: reqBody.meeting_start,
            meeting_end: reqBody.meeting_end,
            total_hour: reqBody.total_hour,
            meeting_minutes: reqBody.meeting_minutes,
        }

        let meeting = await MeetingRepo.meeting(createMeetingObj);
        return meeting
    } catch (eerr) {
        console.log(eerr)
    }

};


exports.adminsedualTime = async (reqBody, id) => {
    try {

        const createMeetingObj = {
            user_id: id,
            work_type: reqBody.work_type,
            report_detailed_name: reqBody.report_detailed_name,
            meeting_start: reqBody.meeting_start,
            total_hour: reqBody.total_hour,
            meeting_end: reqBody.meeting_end,
            what_is_done: reqBody.what_is_done
        }

        let meeting = await MeetingRepo.adminmeetingo(createMeetingObj);
        return meeting
    } catch (eerr) {
        console.log(eerr)
    }

};