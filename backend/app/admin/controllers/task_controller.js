const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, ZONE_SUCCESS_CREATED, DELETE_ZONE, ZONE_UPDATE_CREATED,DELETE_MULTIPLE_CHAIN, UPDATE_CHAIN } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');
const validatetaskInput = require('../validation/createTask.validation')
const taskServices = require('../services/task_services')
const moment = require('moment')

exports.createTask = async (req,res, next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        // console.log(req.body,"req.body")
        const { errors, isValid } = validatetaskInput(req.body);
        if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
        const createTask = await taskServices.createTask(req.body)
        if (createTask) commonResponse.success(res, 201, "Task Created Succesfully");
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.importExcelTask = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let reqBody = req.body.taskArray;
        let createBulkTask = await taskServices.createBulkTask(reqBody);
        if (createBulkTask) commonResponse.success(res, 201, "Task Excel Imported Succesfully");

    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.taskList = async (req,res,next) =>{
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let Id = req.params.id
        // console.log(Id,"Idd")
        const getTasks = await taskServices.getTasks(Id);
        var taskArr = []
        if (getTasks) {
            for (let i = 0; i < getTasks.length; i++) {
                var obj = {};
                obj[ "title" ] = getTasks[ i ].task_description;
                obj[ "date" ] = getTasks[ i ].task_time;

                taskArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All task!", taskArr);
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.dateByTaskList = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        // console.log(req.body,"bodydy")
        const getTasks = await taskServices.getTasksByDate(req.body);
        return commonResponse.success(res, 200, "Successfully Get All Task!", {
            tasks: getTasks
        });
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteTask = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.params.id
        let deleteUser = await taskServices.deleteTask(id)
        if (deleteUser) {
            return commonResponse.success(res, 200, "Task successfully Delete");
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}
exports.updateTask = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = validatetaskInput(req.body);
        if (!isValid) {
			return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
		}
        var id = req.params.id
        let updateUser = await taskServices.updateTask(id, req.body)
        if (updateUser) {
            return commonResponse.success(res, 200, "Task successfully Updated");
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getTask = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id
        let getTask = await taskServices.getTaskById(id)  
        console.log(getTask)
        if (getTask) {
            return commonResponse.success(res, 200, "Successfully Get Task!", getTask);
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}
exports.deleteManyTask = async (req,res,next) => {
    try{
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.body.id
        let deleteUser = await taskServices.deleteTask(id)
        if (deleteUser) {
            return commonResponse.success(res, 200, "Task successfully Delete");
        }
    }catch(error){
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}