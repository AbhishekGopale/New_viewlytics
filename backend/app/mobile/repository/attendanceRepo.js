const attendanceModel = require("../../admin/models/attendance");
const userRelationModel = require("../../admin/models/userRelation");
const userModel = require("../../admin/models/user");
const leaveModel = require("../../admin/models/leave");
const targetModel =  require("../../admin/models/target")
const moment = require("moment");
const { Op, Sequelize } = require('sequelize');
const { all } = require("../routes");
const User = require("../../admin/models/user");

exports.getAttendance = async (id,reqBody) => {
    try {

        console.log("-------> called", id,reqBody);
        let start_date = moment([reqBody.year, reqBody.month - 1]).format("YYYY-MM-DD");
        let end_date = moment(start_date).endOf('month').format("YYYY-MM-DD");
        
          let userWeekOff = await userModel.findOne({
            where:{id:id},
            raw:true,
            nest:true
          });
          console.log(typeof userWeekOff.w_off)
          var weekoffNumber = Number(userWeekOff.w_off)
          function getAllTuesdaysInMonth(year, month) {
            const dates = [];
            const currentDate = new Date(year, month - 1, 1); // Note: Months are zero-based (January is 0)
            
            while (currentDate.getMonth() === month - 1) {
              if (currentDate.getDay() === weekoffNumber) { // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on
                dates.push(new Date(currentDate));
              }
              currentDate.setDate(currentDate.getDate() + 1);
            }
          
            return dates;
          }
          
          // Example usage:
          const year = 2023;
          const month = 7; // July (Note: Months are one-based, i.e., January is 1)
          const tuesdaysInMonth = getAllTuesdaysInMonth(year, month);
          console.log(tuesdaysInMonth,"tuesdaysInMonthtuesdaysInMonth")
          
          // Format the dates as strings for display
          const weekOffDates = tuesdaysInMonth.map(date => date.toISOString().slice(0, 10));
          console.log(weekOffDates)

          
        // console.log(start_date,end_date,dayOfWeek,"monnhtg")
        var getAllAttendance = await attendanceModel.findAll({
            where: { user_id: id ,date:{[Op.between]:[start_date,end_date]}, time_status:"1"},
            attributes: ['id', 'date', 'day_status', 'time_status'],
            raw: true,
            nest: true
        });
        const presentDates = [...new Set(getAllAttendance.map(item => item.date))];
        let getleaveAttendance = await leaveModel.findAll({
            where:{user_id: id, date:{[Op.between]:[start_date,end_date]}},
            attributes: ['date'],
            raw: true,
            nest: true
        });
        const leavesDates = [...new Set(getleaveAttendance.map(item => item.date))];
        
         console.log(leavesDates);
        // console.log(presentDates,"popopopop")

        return ({present:presentDates, leaves:leavesDates,w_off:weekOffDates})
    } catch (eerr) {
        console.log(eerr)
    }

};

exports.createAttendance = async (data) => {
    try{
        return await attendanceModel.create(data, { raw: true });
    }catch(error) {
        console.log(error)
    }
}

exports.detailAttendance = async (user_id) => {
    try{
        let todayDate = moment().format("YYYY-MM-DD");
        let weekOffNumber = moment().weekday()
        // console.log(weekOffNumber)
        let totaluser = await userRelationModel.count({
            where:{user_tl:user_id}
        });
        let allUser = await userRelationModel.findAll({
            where:{user_tl:user_id},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name']
                }],
                raw:true,
                nest:true
        })
        const userIdArray = allUser.map(item => item.user_id);
         

     

        let presentData = await attendanceModel.count({
            where:{user_id:userIdArray,date:{[Op.eq]:todayDate}}
        });
        console.log(presentData,"presentData")
        // console.log(todayDate,"todaydtaeeee")
        // console.log(presentData,"prserntststs")
        let week_offCount = await userModel.count({
            where:{id:userIdArray,w_off:weekOffNumber}
        })
        let leaveCount = await leaveModel.count({
            where:{user_id:userIdArray, date:todayDate}
        })
        let remamingData = presentData + week_offCount + leaveCount
        let absentCount = totaluser - remamingData
        // console.log(userIdArray,presentData,week_offCount,leaveCount,remamingData,absentCount);
        // console.log(totaluser,allUser,"yuoptyt")
        return({totalUserCont:totaluser, presentCount:presentData, weekOffCount:week_offCount,  absentCount:absentCount, leaveCount:leaveCount, })
    }catch(error){
        console.log(error)
    }
}

exports.totalPromoter = async (id) => {
    try{
        console.log(id,"repooopopo");
        let todayDate = moment().format("YYYY-MM-DD");
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id,user_role_id:"6"},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name','role_name','profile_image']
                }],
                raw:true,
                nest:true
        });
        const userData = allUser.map(item => item.User);
        const userIdArray = allUser.map(item => item.user_id);
        let targetData  = await targetModel.findAll({
            where:{user_id:userIdArray,start_date:{[Op.lte]:todayDate}, end_date:{[Op.gte]:todayDate}},
            attributes:["id","target","target_type","user_id"],
            raw:true,
            nest:true

        });
        let cityAddedData = userData.map((value) => {
            const found = targetData.find((element) => {
                return element.user_id == value.id;
            });
            // console.log(found.id,"idd")
            value.taget = found ? found.target : ""
            value.achieved = found ? found.achieved  ? found.achieved : "": ""
        })
        console.log(userData);
        console.log(targetData,"targetee");
        // console.log(userIdArray);
        // console.log(cityAddedData,"cityAddedDatacityAddedDatacityAddedData")
        return userData;
    }catch(error){
        console.log(error)
    }
}

exports.presentData = async (id) => {
    try{
        let todayDate = moment().format("YYYY-MM-DD");
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name',"role_name","profile_image"]
                }],
                raw:true,
                nest:true
        });
        const userData = allUser.map(item => item.User);
        const userIdArray = allUser.map(item => item.user_id);
        let presentData = await attendanceModel.findAll({
            where:{user_id:userIdArray,date:todayDate},
            raw:true,
            nest:true
        });
        const results = userData.filter(({ id: id1 }) => presentData.some(({ user_id: id2 }) => id2 === id1));
        // console.log(results,"allUserallUserallUser")
        return results
    }catch(error){
        console.log(error)
    }
}
exports.absentData = async (id) => {
    try{
        let weekOffNumber = moment().weekday()
        let todayDate = moment().format("YYYY-MM-DD");
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name',"role_name","profile_image","w_off"]
                }],
                raw:true,
                nest:true
        });
        const userData = allUser.map(item => item.User);
        const userIdArray = allUser.map(item => item.user_id);
        let presentData = await attendanceModel.findAll({
            where:{user_id:userIdArray,date:todayDate},
            raw:true,
            nest:true
        });
        const results1 = userData.filter(({ id: id1 }) => !presentData.some(({ user_id: id2 }) => id2 === id1));
        let onleavedata = await leaveModel.findAll({
            where:{user_id:userIdArray, date:todayDate},
            raw:true,
            nest:true
        });
        const results2 = results1.filter(({ id: id1 }) => !onleavedata.some(({ user_id: id2 }) => id2 === id1));
        let weekOffData = await userModel.findAll({
            where:{id:userIdArray, w_off:weekOffNumber},
            raw:true,
            nest:true
        });
        const results3 = results2.filter(({ id: id1 }) => !weekOffData.some(({ id: id2 }) => id2 === id1));

        // console.log(results3,"allUserallUserallUser")
        return results3
    }catch(error){
        console.log(error)
    }
}

exports.weekOffData = async (id) => {
    try{
        let weekOffNumber = moment().weekday()
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    where:{w_off:weekOffNumber},
                    attributes: ['id', 'first_name', 'last_name',"role_name","profile_image","w_off"]
                }],
                raw:true,
                nest:true
        });
        const userData = allUser.map(item => item.User);
        console.log(userData);
        return userData;
    }catch(error){
        console.log(error)
    }
}

exports.onleaveData = async (id) => {
    try{
        let todayDate = moment().format("YYYY-MM-DD");
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id},
            include: [
                {   
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name',"role_name","profile_image"]
                }],
                raw:true,
                nest:true
        });
        console.log(todayDate,"todayDate");
        console.log(allUser,"adlluser")
        const userData = allUser.map(item => item.User);
        console.log(userData,"userData");
        const userIdArray = allUser.map(item => item.user_id);
        console.log(userIdArray,"userIdArray")
        let leaveCount = await leaveModel.findAll({
            where:{user_id:userIdArray, date:todayDate, leave_status:"1"},
            raw:true,
            nest:true
        });
        console.log(leaveCount,"leavecountt");
        const results = userData.filter(({ id: id1 }) => leaveCount.some(({ user_id: id2 }) => id2 === id1));
        console.log(results,"result")
        return results;
    }catch(error){
        console.log(error)
    }
}
exports.onleaveRequestData = async (id) => {
    try{
        let todayDate = moment().format("YYYY-MM-DD");
        let allUser = await userRelationModel.findAll({
            where:{user_tl:id},
            include: [
                {
                    model: userModel,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name',"role_name","profile_image"]
                }],
                raw:true,
                nest:true
        });
        const userData = allUser.map(item => item.User);
        const userIdArray = allUser.map(item => item.user_id);
        let leaveCount = await leaveModel.findAll({
            where:{user_id:userIdArray, date:todayDate, leave_status:"0"},
            attributes:["id","user_id","leave_type","leave_status","date","reason"],
            raw:true,
            nest:true
        });
        let cityAddedData = leaveCount.map((value) => {
            const found = userData.find((element) => {
                return element.id == value.user_id;
            });
            // console.log(found.id,"idd")
            value.first_name = found ? found.first_name : ""
            value.last_name = found ? found.last_name : ""
            value.profile_image = found ? found.profile_image : ""
            value.role_name = found ? found.role_name : ""
        })
        // console.log(leaveCount,"leavcount")
        return leaveCount;
    }catch(error){
        console.log(error)
    }
};

exports.updateLeave = async (id,reqBody) => {
    try{
        const updateLeave = await leaveModel.update(
            {
                leave_status: reqBody.leave_status,
                reason_reject: reqBody.reason_reject,
            },
            { where: { id: id } }
        );
        return updateLeave;
    }catch(error){
        console.log(error)
    }
}


