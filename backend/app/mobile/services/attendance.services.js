const { commonResponse } = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const attendanceRepo = require("../repository/attendanceRepo.js");
const CheckInModel = require("../../admin/models/checkInOut");
const moment = require('moment')


exports.getAttendance = async (Id, reqBody) => {
    try {
        var getAttendance = await attendanceRepo.getAttendance(Id,reqBody)

        return getAttendance


    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
};

exports.postAttendance = async (Id, reqBody) => {
    try{
        console.log(reqBody)
        let checkInData = await CheckInModel.findAll({
            where:{user_id:Id,date:reqBody.date,check_out:"1"},
            attributes: ['id', 'user_id', 'total_time'],
            raw: true,
            nest: true
        })
        let totalTime = checkInData.reduce((n,item) => n + item.total_time, 0)
        let createAttendanceObj
        if(totalTime > 9){
            createAttendanceObj = {
                user_id: Id,
                date:reqBody.date,
                total_hour: totalTime,
                day_status:"0",
                time_status:"1"
            }
        }else{
            createAttendanceObj = {
                user_id: Id,
                date:reqBody.date,
                total_hour: totalTime,
                day_status:"0",
                time_status:"0"
            }
        }
        var postAttendance = await attendanceRepo.createAttendance(createAttendanceObj)

        return postAttendance

    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.detailAttendance = async (user_id) => {
    try{
        // console.log(user_id);
        let detailAttendnce = await attendanceRepo.detailAttendance(user_id);
        // console.log(detailAttendnce,"service finallalala")
        return detailAttendnce;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.totalPromoterData = async  (id) => {
    try{
        let totalPromoter  = await attendanceRepo.totalPromoter(id);
        return totalPromoter;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.totalPresentData = async  (id) => {
    try{
        let totalPresent = await attendanceRepo.presentData(id);
        return totalPresent;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.totalAbsentData = async  (id) => {
    try{
        let totalAbsent = await attendanceRepo.absentData(id);
        return totalAbsent;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.weekOffData = async  (id) => {
    try{
        let weekOffData = await attendanceRepo.weekOffData(id);
        return weekOffData;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.onleaveData = async  (id) => {
    try{
        let onleaveData = await attendanceRepo.onleaveData(id);
        return onleaveData;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}
exports.onleaveRequestData = async  (id) => {
    try{
        let onleaveRequestData = await attendanceRepo.onleaveRequestData(id);
        return onleaveRequestData;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.updateLeave = async (id,reqBody) => {
    try{
        console.log(id,reqBody,"reqbodydydydydy")
        let updateLeave = await attendanceRepo.updateLeave(id,reqBody);
        return updateLeave;
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}