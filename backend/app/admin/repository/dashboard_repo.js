const UserModel = require('../models/user');
const leaveModel = require('../models/leave');
const ProjectModel = require('../models/project');
const StoreModel = require('../models/store');
const targetModel = require('../models/target');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { DB } = require('../../../config/database');

exports.getDashboard = async () => {
    let weekOffNumber = moment().weekday();
    let todayDate = moment().format('YYYY-MM-DD');

    let weekoffCount = await UserModel.count({
        col: 'w_off',
        where: { w_off: weekOffNumber.toString(), status: '0' }
    });

    let inactiveUsreCount = await UserModel.count({
        col: 'status',
        where: { status: '1' }
    });

    let activeUsserCount = await UserModel.count({
        where: { status: '0' }
    });

    let leaveCount = await leaveModel.count({
        where: { date: todayDate, leave_status: '1' },
        raw: true,
        nest: true
    });

    // Real dynamic check_in and check_out from checkinouts / user_checkins for today
    let checkInCount = 0;
    let checkOutCount = 0;
    try {
        const [cInOut] = await DB.query(`
            SELECT 
                COUNT(DISTINCT user_id) as check_in,
                COUNT(DISTINCT CASE WHEN check_out IS NOT NULL AND check_out != '' THEN user_id END) as check_out
            FROM checkinouts 
            WHERE date = ?
        `, { replacements: [todayDate] });
        if (cInOut && cInOut[0]) {
            checkInCount = Number(cInOut[0].check_in) || 0;
            checkOutCount = Number(cInOut[0].check_out) || 0;
        }
    } catch (e) {
        console.error('Error fetching dashboard checkin counts:', e.message);
    }

    let notLoginCount = Math.max(0, activeUsserCount - weekoffCount - leaveCount - checkInCount);

    let projectDetails = await ProjectModel.findAll({
        attributes: ['id', 'project_name', 'image'],
        where: { status: 0 },
        raw: true,
        nest: true
    });

    let storeDetails = await StoreModel.findAll({
        where: { status: 0 },
        raw: true,
        nest: true
    });

    projectDetails.forEach((value) => {
        value.store_id = [];
        value.image = value.image ? `https://idonneous.s3.ap-south-1.amazonaws.com/upload/${value.image}` : '';
        let storeCount = 0;
        storeDetails.forEach((element) => {
            if (element.project_id == value.id) {
                storeCount++;
                value.store_id.push(element.id);
            }
        });
        value.storeCountNumber = storeCount;
        value.storeCountNumbers = [];
        value.targetTypeSum = '';
    });

    return {
        project: projectDetails,
        details: {
            week_off: weekoffCount,
            inactiveuser: inactiveUsreCount,
            totalUser: activeUsserCount,
            leaves: leaveCount,
            check_in: checkInCount,
            check_out: checkOutCount,
            notLogin: notLoginCount
        }
    };
};

exports.getSubAdminDashboard = async (reqUser) => {
    let weekOffNumber = moment().weekday();
    let todayDate = moment().format('YYYY-MM-DD');

    let weekoffCount = await UserModel.count({
        col: 'w_off',
        where: { zone: reqUser.zone, w_off: weekOffNumber.toString(), status: '0' }
    });

    let inactiveUsreCount = await UserModel.count({
        col: 'status',
        where: { zone: reqUser.zone, status: '1' }
    });

    let activeUsserCount = await UserModel.count({
        where: { zone: reqUser.zone, status: '0' }
    });

    let allUser = await UserModel.findAll({
        where: { zone: reqUser.zone, status: '0' },
        attributes: ['id'],
        raw: true,
        nest: true
    });

    const arrayOfValues = allUser.map(obj => obj.id);

    let leaveCount = 0;
    if (arrayOfValues.length > 0) {
        leaveCount = await leaveModel.count({
            where: { user_id: arrayOfValues, date: todayDate, leave_status: '1' },
            raw: true,
            nest: true
        });
    }

    let checkInCount = 0;
    let checkOutCount = 0;
    if (arrayOfValues.length > 0) {
        try {
            const [cInOut] = await DB.query(`
                SELECT 
                    COUNT(DISTINCT user_id) as check_in,
                    COUNT(DISTINCT CASE WHEN check_out IS NOT NULL AND check_out != '' THEN user_id END) as check_out
                FROM checkinouts 
                WHERE date = ? AND user_id IN (?)
            `, { replacements: [todayDate, arrayOfValues] });
            if (cInOut && cInOut[0]) {
                checkInCount = Number(cInOut[0].check_in) || 0;
                checkOutCount = Number(cInOut[0].check_out) || 0;
            }
        } catch (e) {
            console.error('Error fetching subadmin checkin counts:', e.message);
        }
    }

    let notLoginCount = Math.max(0, activeUsserCount - weekoffCount - leaveCount - checkInCount);

    let projectDetails = await ProjectModel.findAll({
        attributes: ['id', 'project_name', 'image', 'zone'],
        where: { status: 0 },
        raw: true,
        nest: true
    });

    let storeDetails = await StoreModel.findAll({
        where: { zone: reqUser.zone, status: 0 },
        raw: true,
        nest: true
    });

    let getZoneProject = [];
    for (let index = 0; index < projectDetails.length; index++) {
        const element = projectDetails[index];
        let zone = element.zone;
        if (Array.isArray(zone) && zone.includes(reqUser.zone)) {
            getZoneProject.push(element);
        } else if (zone === reqUser.zone) {
            getZoneProject.push(element);
        }
    }

    getZoneProject.forEach((value) => {
        value.store_id = [];
        value.image = value.image ? `https://idonneous.s3.ap-south-1.amazonaws.com/upload/${value.image}` : '';
        let storeCount = 0;
        storeDetails.forEach((element) => {
            if (element.project_id == value.id) {
                storeCount++;
                value.store_id.push(element.id);
            }
        });
        value.storeCountNumber = storeCount;
        value.storeCountNumbers = [];
        value.targetTypeSum = '';
    });

    return {
        project: getZoneProject,
        details: {
            week_off: weekoffCount,
            inactiveuser: inactiveUsreCount,
            totalUser: activeUsserCount,
            leaves: leaveCount,
            check_in: checkInCount,
            check_out: checkOutCount,
            notLogin: notLoginCount
        }
    };
};
