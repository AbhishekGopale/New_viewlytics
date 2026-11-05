const storeModel = require("../../admin/models/store");
const formModel = require("../../admin/models/google_form");
const zoneModel = require("../../admin/models/zone");
const promoModel = require("../../admin/models/promo");
const attendanceModel = require("../../admin/models/attendance");
const userModel = require("../../admin/models/user");
const leaaveModel = require("../../admin/models/leave");
const targetModel = require("../../admin/models/target");
const inventoryModel = require("../../admin/models/inventory")
const skuModel = require("../../admin/models/SKU")
const checkInModel = require("../../admin/models/checkInOut");
const shopperModel = require("../../admin/models/shopper_engagement");
const assetTrakingModel = require("../../admin/models/asset_traking");
const sosModel = require("../../admin/models/sos_report");
const oosModel = require("../../admin/models/oos");
const competitionModel = require("../../admin/models/competition_analysis")
const taskModel = require("../../admin/models/task")
const moment = require("moment");
const { Op } = require("sequelize");
var Sequelize = require("sequelize");
const { DB, sequelize } = require("../../../config/database");
const { raw } = require("body-parser");

exports.findStore = async (reqBody) => {
  try {
    // console.log(reqBody,"bosy")
    let stores = await storeModel.findAll({
      where: {
        zone: reqBody.zone,
        state: reqBody.state,
        city: reqBody.city,
        chain: reqBody.chain_name,
      },
      attributes: ["store_code", "store_name"],
      raw: true,
      nest: true,
    });
    // console.log(stores)
    return stores;
  } catch (error) {
    console.log(error);
  }
};
exports.storeDetail = async (store_id) => {
  try {
    console.log(store_id, "repopoid");
    let store = await storeModel.findOne({
      where: { id: store_id },
      attributes: [
        "id",
        "store_code",
        "store_name",
        "Image",
        "location",
        "state",
        "city",
        "zone",
        "tl",
      ],
      raw: true,
      nest: true,
    });
    store.Image = `http://35.73.254.5/media/upload/${store.Image}`
    let zoneName = await zoneModel.findOne({
      where: { id: store.zone },
      raw: true,
      nest: true,
    });
    store.zone_name = zoneName.zone_name;
    // console.log(zoneName,"zonenene")
    // console.log(store,"repodata");
    return store;
  } catch (error) {
    console.log(error);
  }
};

exports.countDashbord = async (reqUser) =>  {
  console.log(reqUser,"repoopopop");
  let todaytDate = moment().format("YYYY-MM-DD");
  console.log(todaytDate,"todayDate");
  let checkInStatus = await checkInModel.findOne({
    where:{user_id:reqUser.id, date:todaytDate,check_out:"0"},
    raw:true,
    nest:true
  });
  let storeCount = await storeModel.count({
    where:{user_id:reqUser.id}
  });

  let obj = {
    
  }
  console.log(checkInStatus,"ststst");
  if(checkInStatus){
    if(reqUser.role_id == "6"){
      console.log("promoter")
      obj.checkInStatus =  0,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 10
    } else if(reqUser.role_id == "5"){
      obj.checkInStatus =  0,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 8
    }else if(reqUser.role_id == "4"){
      console.log("tltl")
      obj.checkInStatus =  0,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 0
    }
  }else{
    console.log("elseee")
    if(reqUser.role_id == "6"){
      console.log("promoter")
      obj.checkInStatus =  1,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 10
    } else if(reqUser.role_id == "5"){
      console.log("elsemerch")
      obj.checkInStatus =  1,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 8
    }else if(reqUser.role_id == "4"){
      console.log("tltl")
      obj.checkInStatus =  1,
      obj.place = storeCount ? storeCount : 0,
      obj.foem = 0
    }
  }
  return obj
}
exports.countForm = async (reqUser) => {
  let todayDate = moment().format("YYYY-MM-DD")
  // let todaytimeStamp = moment().format("YYYY-MM-DD")
  let remainingForm  = 0;
  const openInventory = await inventoryModel.findOne({
    where:{user_id:reqUser.id,date:todayDate}
  });
  // console.log(openInventory);
  if(!openInventory){
    remainingForm++
  };
  let shooperData = await shopperModel.findOne({
    where:{user_id:reqUser.id,created_at:Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), '=', todayDate)}
  })
  if(!shooperData){
    remainingForm++
  };
  let assetTrakingData = await assetTrakingModel.findOne({
    where:{user_id:reqUser.id,created_at:Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), '=', todayDate)}
  })
  if(!assetTrakingData){
    remainingForm++
  };
  let sosData = await sosModel.findOne({
    where:{user_id:reqUser.id,date:todayDate}
  })
  if(!sosData){
    remainingForm++
  };
  const newinventory = await inventoryModel.findOne({
    where:{user_id:reqUser.id, date:todayDate,new_inventory:0}
  });
  console.log(newinventory,"newinvemtortryrry");
  if(newinventory){
    remainingForm++
  }
  const closeiventory = await inventoryModel.findOne({
    where:{user_id:reqUser.id, date:todayDate,closing_inventory:0}
  });
   console.log(closeiventory,"closeiventory");
  if(closeiventory){
    remainingForm++
  }
  const dsr = await inventoryModel.findOne({
    where:{user_id:reqUser.id, date:todayDate,dsr:null}
  });
  //  console.log(dsr,"dsr");
  if(dsr){
    remainingForm++
  }
  let analysisData = await competitionModel.findOne({
    where:{user_id:reqUser.id,created_at:Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), '=', todayDate)}
  });
  if(!analysisData){
    remainingForm++
  };
  // return
  // console.log(sosData,"sos")
  // console.log(assetTrakingData,"assetraking")
  // console.log(shooperData,"shooperData")
  // console.log(remainingForm,"counting");
  return remainingForm;
}

exports.createOos = async (data) => {
  let oos = await oosModel.bulkCreate(data, { validate: true, raw: true })
        return oos;
}

exports.promoerDashboard = async (user_id) => {
  // console.log(user_id,"repororoop");
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  console.log(startOfMonth, endOfMonth, "date");
  let presentData = await attendanceModel.count({
    where: {
      user_id: user_id,
      date: { [Op.between]: [startOfMonth, endOfMonth] },
      time_status:"1"
    },
  });
  let weekoffDayData = await userModel.findOne({
    where: { id: user_id },
    raw: true,
    nest: true,
  });
  let DateNummber = parseInt(weekoffDayData.w_off);
  // console.log(DateNummber,"DateNummber")
  let weekOffDay = moment().day(weekoffDayData.w_off).format("dddd");
  function countMondaysInMonth(year, month) {
    month = month - 1;
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // The last day of the month

    let count = 0;
    let currentDay = firstDayOfMonth;
    // console.log(currentDay)
    while (currentDay <= lastDayOfMonth) {
      if (currentDay.getDay() === DateNummber) {
        // Monday is represented by 1 (Sunday is 0, Monday is 1, and so on)
        count++;
      }
      currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
    }

    return count;
  }
  let weekOffCount = countMondaysInMonth(
    moment().format("YYYY"),
    moment().format("MM")
  );
  // const leaves = await leaaveModel.findAll({
  //     attributes: [
  //       [
  //         Sequelize.literal('DATEDIFF(`to`, `from`) + 1'),
  //         'total_days'
  //       ]
  //     ],
  //     where: {
  //       user_id: user_id,
  //       [Op.and]: [
  //         Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('from')), 7)
  //       ]

  //     }
  //   });
  const leaveCount = await leaaveModel.count({
    where: {
      user_id: user_id,
      leave_status: "1",
      date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });
  // console.log(leaveCount,"leavcounttt")
  let totalData = presentData + weekOffCount + leaveCount;
  // console.log(totalData,moment().daysInMonth(),"totolal")
  let absentCount = moment().daysInMonth() - totalData;
  // console.log(presentData,weekOffCount,leaveCount,absentCount,"presentData");
  const currentDate = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  let totalAttendance = await attendanceModel.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("date")), "month"],
      [Sequelize.fn("YEAR", Sequelize.col("date")), "year"],
      [Sequelize.fn("COUNT", Sequelize.col("day_status")), "totalAttendances"],
    ],
    where: {
        user_id: user_id,
        time_status:"1",
      date: {
        [Op.gte]: twelveMonthsAgo,
        [Op.lte]: currentDate,
      },
    },
    group: [
        Sequelize.fn("MONTH", Sequelize.col("date")),
        Sequelize.fn("YEAR", Sequelize.col("date")),
    ],
    order: [
      [Sequelize.fn("YEAR", Sequelize.col("date")), "ASC"],
      [Sequelize.fn("MONTH", Sequelize.col("date")), "ASC"],
    ],
  });
  const extractedData = totalAttendance.map((attendance) => {
    return {
      month: attendance.dataValues.month,
      year: attendance.dataValues.year,
      totalAttendances: attendance.dataValues.totalAttendances,
    };
  });
  let startYearDate = moment().startOf('year').format("YYYY-MM-DD");
  let endYearDate = moment().endOf('year').format("YYYY-MM-DD");
  console.log(startYearDate,endYearDate)
  let targetDetail = await targetModel.findAll({
    attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('start_date')), 'start_month'],
        [Sequelize.fn('YEAR', Sequelize.col('start_date')), 'start_year'],
        [Sequelize.fn('MONTH', Sequelize.col('end_date')), 'end_month'],
        [Sequelize.fn('YEAR', Sequelize.col('end_date')), 'end_year'],
        [Sequelize.fn('SUM', Sequelize.col('target')), 'target'],
        // other attributes you want to fetch...
      ],
      where: {
        user_id,user_id,
        start_date: {
          [Op.gte]: startYearDate,
        },
        end_date: {
          [Op.lte]: endYearDate,
        },
      },
      group: [
        Sequelize.fn('MONTH', Sequelize.col('start_date')),
        Sequelize.fn('YEAR', Sequelize.col('start_date')),
      ],
      order: [
        [Sequelize.fn('YEAR', Sequelize.col('start_date')), 'ASC'],
        [Sequelize.fn('MONTH', Sequelize.col('start_date')), 'ASC'],
      ],
  });
  const targetDatas = targetDetail.map((target) => {
    return {
      month: target.dataValues.start_month,
      year: target.dataValues.start_year,
      target: target.dataValues.target,
    };
  });
  let achievedDeatil = await inventoryModel.findAll({
    where:{user_id:user_id,date:{[Op.between]:[startYearDate,endYearDate]}},
    include: [
        {
            model: skuModel,
            as: 'skuId',
            attributes: ['id', 'mrp']
        }],
    raw:true,
    nest:true
  });
  const groupedData = achievedDeatil.reduce((result, item) => {
    const date = new Date(item.date);
    const month = date.getMonth() + 1; // Adding 1 because getMonth() returns 0 for January, 1 for February, and so on
  
    if (!result[month]) {
      result[month] = [];
    }
  
    result[month].push(item);
    return result;
  }, {});
  const result = {};
Object.keys(groupedData).forEach((month) => {
  result[month] = groupedData[month].map((item) => ({
    ...item,
    dsrMultiplied: item.dsr * item.skuId.mrp,
  }));
});
const finalAchieved = Object.keys(result).map((month) => ({
  month: Number(month),
  totalDsrMultiplied: result[month].reduce((sum, item) => sum + item.dsrMultiplied, 0),
}));

// console.log(result);

console.log(finalAchieved,"22222");

//   console.log(groupedData,"totalAttendancetotalAttendancetotalAttendance");
  
//   console.log(result,"result")
//   console.log(targetDatas,"targetDatas");
  return {
    presentCount: presentData,
    weekoffCount: weekOffCount,
    leaveCount: leaveCount,
    absentCount: absentCount,
    attendance:extractedData,
    target:targetDatas,
    achieved:finalAchieved
  };
};

exports.merDashboard = async (user_id) => {
  console.log(user_id,"reororpo")
  let startWeek = moment().startOf("week").format("YYYY-MM-DD");
  let endWeek = moment().endOf("week").format("YYYY-MM-DD");
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  console.log(startOfMonth, endOfMonth,startWeek,endWeek,"date");
  let presentData = await attendanceModel.count({
    where: {
      user_id: user_id,
      date: { [Op.between]: [startOfMonth, endOfMonth] },
      time_status:"1"
    },
  });
  let weekoffDayData = await userModel.findOne({
    where: { id: user_id },
    raw: true,
    nest: true,
  });
  let DateNummber = parseInt(weekoffDayData.w_off);
  // console.log(DateNummber,"DateNummber")
  let weekOffDay = moment().day(weekoffDayData.w_off).format("dddd");
  function countMondaysInMonth(year, month) {
    month = month - 1;
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0); // The last day of the month

    let count = 0;
    let currentDay = firstDayOfMonth;
    // console.log(currentDay)
    while (currentDay <= lastDayOfMonth) {
      if (currentDay.getDay() === DateNummber) {
        // Monday is represented by 1 (Sunday is 0, Monday is 1, and so on)
        count++;
      }
      currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
    }

    return count;
  }
  let weekOffCount = countMondaysInMonth(
    moment().format("YYYY"),
    moment().format("MM")
  );
  const leaveCount = await leaaveModel.count({
    where: {
      user_id: user_id,
      leave_status: "1",
      date: { [Op.between]: [startOfMonth, endOfMonth] },
    },
  });
  // console.log(leaveCount,"leavcounttt")
  let totalData = presentData + weekOffCount + leaveCount;
  // console.log(totalData,moment().daysInMonth(),"totolal")
  let absentCount = moment().daysInMonth() - totalData;
  const currentDate = new Date();
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  let totalAttendance = await attendanceModel.findAll({
    attributes: [
      [Sequelize.fn("MONTH", Sequelize.col("date")), "month"],
      [Sequelize.fn("YEAR", Sequelize.col("date")), "year"],
      [Sequelize.fn("COUNT", Sequelize.col("day_status")), "totalAttendances"],
    ],
    where: {
        user_id: user_id,
        time_status:"1",
      date: {
        [Op.gte]: twelveMonthsAgo,
        [Op.lte]: currentDate,
      },
    },
    group: [
        Sequelize.fn("MONTH", Sequelize.col("date")),
        Sequelize.fn("YEAR", Sequelize.col("date")),
    ],
    order: [
      [Sequelize.fn("YEAR", Sequelize.col("date")), "ASC"],
      [Sequelize.fn("MONTH", Sequelize.col("date")), "ASC"],
    ],
  });
  const extractedData = totalAttendance.map((attendance) => {
    return {
      month: attendance.dataValues.month,
      year: attendance.dataValues.year,
      totalAttendances: attendance.dataValues.totalAttendances,
    };
  });

  let taskStore = await taskModel.findAll({
    where:{user_id:user_id,task_time: { [Op.between]: [startWeek, endWeek] }},
    attributes:["id","user_id","task_time","store"],
    raw:true,
    nest:true,
  });
  const storeCountByDate = {};
  taskStore.forEach((item) => {
    const taskDate = item.task_time;
    const storeCount = item.store.length;
  
    if (storeCountByDate[taskDate]) {
      storeCountByDate[taskDate] += storeCount;
    } else {
      storeCountByDate[taskDate] = storeCount;
    }
  });

  let storevsisted  = await checkInModel.findAll({
    where:{user_id:user_id,date: { [Op.between]: [startWeek, endWeek] }},
    attributes:["id","user_id","date","store_id"],
    raw:true,
    nest:true
  });
  function getDateWiseCount(data) {
    const countByDate = data.reduce((result, item) => {
      const { date } = item;
      if (result[date]) {
        result[date]++;
      } else {
        result[date] = 1;
      }
      return result;
    }, {});
  
    return countByDate;
  }
  
  // Usage
  const visitedCount = getDateWiseCount(storevsisted);
  // console.log(dateWiseCount);
  
  // console.log(visitedCount)
  // console.log(storeCountByDate);
  let mergedData = { ...visitedCount, ...storeCountByDate };
  // console.log(mergedData,"mergegdtdt")
  function convertToDesiredFormat(data) {
    // console.log(data,"data")
    const dates = Object.keys(data);
    // console.log(dates,"datesss")
    const result = dates.map((date) => ({
      [date.split('-').join('-')]: {
        pjp: storeCountByDate[date] || 0,
        visited: visitedCount[date] || 0,
        planned: storeCountByDate[date] || 0,
        unplanned: storeCountByDate[date] < visitedCount[date] ? visitedCount[date] - storeCountByDate[date] : 0,
        comliance: visitedCount[date] * 100 /storeCountByDate[date]
      }
    }));
    // console.log(result,"result")
    return result;
  }
  let finalpjp = convertToDesiredFormat(mergedData);
// console.log(finalpjp,"finalpjp");

  
  // console.log(presentData,weekOffCount,absentCount,leaveCount,extractedData,"merfdashbord")
  return {
    presentCount: presentData,
    weekoffCount: weekOffCount,
    leaveCount: leaveCount,
    absentCount: absentCount,
    attendance:extractedData,
    pjp:finalpjp
  };
}

exports.targetAchieve = async (user_id) => {
  let startWeek = moment().startOf("week").format("YYYY-MM-DD");
  let endWeek = moment().endOf("week").format("YYYY-MM-DD");
  let startMonth = moment().startOf("month").format("YYYY-MM-DD");
  let endMonth = moment().endOf("month").format("YYYY-MM-DD");
  let quaterStart = moment().startOf('quarter').format("YYYY-MM-DD");
  let quaterEnd = moment().endOf('quarter').format("YYYY-MM-DD");
  console.log(quaterStart,quaterEnd,"weekleyy");
  let weeklyTarget = await targetModel.findAll({
    attributes:[
      [Sequelize.fn('SUM', Sequelize.col('target')), 'target'],
    ],
      where: {
        user_id,user_id,
        [Op.or]: [{
          start_date: {
              [Op.between]: [startWeek, endWeek]
          }
      }, {
        end_date: {
              [Op.between]: [startWeek, endWeek]
          }
      }]
      },
  });
  let monthTarget = await targetModel.findAll({
    attributes:[
      [Sequelize.fn('SUM', Sequelize.col('target')), 'target'],
    ],
      where: {
        user_id,user_id,
        [Op.or]: [{
          start_date: {
              [Op.between]: [startMonth, endMonth]
          }
      }, {
        end_date: {
              [Op.between]: [startMonth, endMonth]
          }
      }]
      },
  });
  let quartarget = await targetModel.findAll({
    attributes:[
      [Sequelize.fn('SUM', Sequelize.col('target')), 'target'],
    ],
      where: {
        user_id,user_id,
        [Op.or]: [{
          start_date: {
              [Op.between]: [quaterStart, quaterEnd]
          }
      }, {
        end_date: {
              [Op.between]: [quaterStart, quaterEnd]
          }
      }]
      },
  });
  let weelyTargetData = weeklyTarget.map(item => item.dataValues.target);
  let weeklyFinalData = weelyTargetData.join("")
  let monthTargetData = monthTarget.map(item => item.dataValues.target);
  let monthFinalData = monthTargetData.join("")
  let quarterTargetData = quartarget.map(item => item.dataValues.target);
  let quaterFinalData = quarterTargetData.join("")
  let quaterAchieved = await inventoryModel.findAll({
    where:{user_id:user_id,date:{[Op.between]:[quaterStart,quaterEnd]}},
    include: [
        {
            model: skuModel,
            as: 'skuId',
            attributes: ['id', 'mrp']
        }],
    raw:true,
    nest:true
  });
  const finalquarterValues = quaterAchieved
  .filter((entry) => entry.dsr !== null)
  .map((entry) => entry.skuId.mrp * entry.dsr);
  const quarterAchieved = finalquarterValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let monthlysAchieved = await inventoryModel.findAll({
    where:{user_id:user_id,date:{[Op.between]:[startMonth,endMonth]}},
    include: [
        {
            model: skuModel,
            as: 'skuId',
            attributes: ['id', 'mrp']
        }],
    raw:true,
    nest:true
  });
  const finalmonthlyValues = monthlysAchieved
  .filter((entry) => entry.dsr !== null)
  .map((entry) => entry.skuId.mrp * entry.dsr);
  const monthlyAchieved = finalmonthlyValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let weeklysAchieved = await inventoryModel.findAll({
    where:{user_id:user_id,date:{[Op.between]:[startWeek,endWeek]}},
    include: [
        {
            model: skuModel,
            as: 'skuId',
            attributes: ['id', 'mrp']
        }],
    raw:true,
    nest:true
  });
  const finalweeklyValues = weeklysAchieved
  .filter((entry) => entry.dsr !== null)
  .map((entry) => entry.skuId.mrp * entry.dsr);
  const weekAchieved = finalweeklyValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log(weekAchieved,"weekachevd")
  // console.log(weeklyFinalData,monthFinalData,quaterFinalData,"iouyttyttyytt");
  return({weeklyTarget:weeklyFinalData, monthlyTarget:monthFinalData, quarterTarget:quaterFinalData,quarterAchieved:quarterAchieved, monthlyAchieved:monthlyAchieved,weekAchieved:weekAchieved})
}

exports.updateForm = async (id, reqBody) => {
  console.log(id, reqBody);
  const UpdateForm = await formModel.update(reqBody, { where: { id: id } });

  return UpdateForm;
};

exports.verifiedStore = async (store_id, reqBody) => {
  // console.log(store_id,reqBody,"repoopo")
  let updateStore = await storeModel.update({
    verified: reqBody.verified,
    lat:reqBody.lat,
    long:reqBody.long
  },{where:{id:store_id}});
  return updateStore;
}

exports.updatePromo = async (promoId, image, reqBody) => {
  const updatePromo = await promoModel.update(
    {
      mobile_image: image,
      mobile_status: reqBody.mobile_status,
      mobile_remark: reqBody.mobile_remark,
    },
    { where: { id: promoId } }
  );
  return updatePromo;
};
exports.checkForm = async (user_id) => {
  console.log(user_id, "user_idrepo");
  let todaytDate = moment().format("YYYY-MM-DD");
  console.log(todaytDate);
  const getForm = await formModel.findOne({
    where: {
      user_id: user_id,
      form_status: "0",
      status: "0",
      [Op.and]: [
        { start_date: { [Op.lte]: todaytDate } },
        { end_date: { [Op.gte]: todaytDate } },
      ],
    },
    attributes: [
      "id",
      "user_id",
      "project_id",
      "project_name",
      "title",
      "url",
      "form_status",
    ],
    raw: true,
    nest: true,
  });
  // console.log(getForm,"formdataill")
  return getForm;
};
