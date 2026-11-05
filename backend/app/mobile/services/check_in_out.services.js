const { commonResponse } = require("../../../helper");
const { ValidationError } = require("../../../helper/commonResponce");
const checkInOutRepo = require("../repository/check_in_out");
const CheckModel = require("../../admin/models/checkInOut");
const storeModel = require('../../admin/models/store');
const zoneModel = require('../../admin/models/zone');
const attendanceModel = require('../../admin/models/attendance')
const moment = require("moment")

exports.checkInOutCreate = async (Id,image, reqBody) => {
    try {
        console.log(Id,image,reqBody,"bodyddy")
        let todayDate = moment().format("YYYY-MM-DD")
        let stores = await storeModel.findOne({
            where:{id:reqBody.store_id},
            raw:true,
            nest:true
        });
        // console.log(stores);
        // return;
        const createCheckObj = {
            user_id:Id,
            store_id:reqBody.store_id,
            image:image,
            task_name:reqBody.task_name,
            priority: reqBody.priority,
            check_in_time:moment().format("hh:mm:ss a"),
            pending: reqBody.pending,
            km: reqBody.km,
            total_time:reqBody.total_time,
            check_out_time:reqBody.check_out_time,
            date:todayDate,
            task_status:reqBody.task_status,
            store_name:stores.store_name,
            check_out:reqBody.check_out
        }
        console.log("createCheckObj",createCheckObj)
        var CreateCheckIn = await checkInOutRepo.checkInOutCreate(createCheckObj);
        let findAttendance = await attendanceModel.findOne({
            where:{user_id:Id, date:todayDate},
            raw:true,
            nest:true
        });
        console.log(findAttendance,"datatatdindd")
        if(!findAttendance){
            console.log("attendanceNOtFound");
            // return;
            let attendance = await attendanceModel.create({
                user_id:Id,
                date:todayDate,
                day_status:"0",
                total_hour:"0",
                time_status:"1"
            })
        }
        // let attendance = await attendanceModel.create({
        //     user_id:Id,
        //     date:todayDate,
        //     day_status:"0",
        //     total_hour:"0",
        //     time_status:"1"
        // })
        return CreateCheckIn

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}

exports.checkInOut = async(Id, reqBody) => {
    try{
        console.log(Id,reqBody,"service")
        let checkInData = await CheckModel.findOne({
            where: { id:Id },
            // attributes: ['id','check_in_time'],
            raw: true,
            nest: true
        });
        console.log(checkInData,"chekcDatata")
        let check_in_time = moment(checkInData.check_in_time, "hh:mm:ss a");
        let check_out_time = moment(reqBody.check_out_time ? reqBody.check_out_time : moment().format("hh:mm:ss a"), "hh:mm:ss a")
        let total_hours = check_out_time.diff(check_in_time, 'hours')
        let checkOutObject = {
            total_time:total_hours,
            check_out_time:reqBody.check_out_time ? reqBody.check_out_time : moment().format("hh:mm:ss a"),
            task_status:"1",
            pending:"1",
            check_out:"1"
        }
        console.log(checkOutObject);
        if(total_hours > 5){
            let updateAttendance = await attendanceModel.update({
                total_hour:total_hours,
                time_status: "1",
            },{ where: { user_id: checkInData.user_id, date: checkInData.date  } })
        }else{
            console.log("lessthan")
            let updateAttendance = await attendanceModel.update({
                total_hour:total_hours,
                day_status: "1",
                time_status: "0",
            },{ where: { user_id: checkInData.user_id, date: checkInData.date  } })
        }
        // return
        var CreateCheckOut = await checkInOutRepo.checkInOut(Id,checkOutObject)
        return CreateCheckOut

    }catch (error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.checkInList = async (Id) => {
    try {
        let stores = await storeModel.findAll({
            where:{user_id:Id},
            attributes:["id","store_code","store_name","Image","verified","zone","city","state"],
            raw:true,
            nest:true
        });
        console.log(stores, "serviceee");
        let getZone = await zoneModel.findAll({
            raw: true,
            nest: true
        });
        let zoneAddedData = stores.map((value) => {
            const found = getZone.find((element) => {
                return element.id == value.zone;
            });
            // console.log(found.id,"idd")
            value.zone_name = found ? found.zone_name : " "
    
        })
        for (let index = 0; index < stores.length; index++) {
            const element = stores[ index ];
            element.Image = `http://35.73.254.5/media/upload/${element.Image}`
    
        }
        return stores
        
    } catch (error) {
        console.log(error, " -->error")
        throw error;
    
    }

}

exports.mapDetails = async (user,reqBody) => {
    try{
        var CurrentDate = moment().format("YYYY-MM-DD");
        let currentTime = moment().format("HH:mm:ss")
        console.log(user,reqBody,CurrentDate,currentTime,"servicesss")
        let findMap = await checkInOutRepo.findMap(user,reqBody,CurrentDate);
        console.log(findMap);
        if(findMap){
            let updateeObj ={
                user_id:findMap.user_id,
                user_name:findMap.user_name,
                role:findMap.role,
                store_id:findMap.store_id,
                battery:reqBody.battery,
                check_in:"0",
                check_out:"1",
                lat:reqBody.lat,
                long:reqBody.long,
                date:CurrentDate,
                time:currentTime,
                imei_number:reqBody.imei_number,
                speed:reqBody.speed
            };
            console.log(updateeObj,"updateeObjupdateeObj")
            let updateMap = await checkInOutRepo.updateMap(updateeObj,findMap);
            return updateMap;
        }else{
            let obj = {
                user_id:user.id,
                user_name:user.user_name,
                role:user.role_name,
                store_id:reqBody.store_id,
                battery:reqBody.battery,
                check_in:"1",
                check_out:"0",
                lat:reqBody.lat,
                long:reqBody.long,
                date:CurrentDate,
                time:currentTime,
                imei_number:reqBody.imei_number,
                speed:reqBody.speed
            };
            console.log(obj,"objj")
            let createMap = await checkInOutRepo.createMap(obj);
            return createMap;
        }
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}