let taskModel = require('../models/task');
const moment = require('moment');
const { Op } = require('sequelize')

exports.createTask = async (reqBody) => {
    return await taskModel.create(reqBody, { raw: true })
    // console.log(reqBody,"bodydyrepo")
};

exports.craeteBulkTask = async (data) => {
    let tasks = await taskModel.bulkCreate(data, { validate: true, raw: true })
    return tasks;
}
exports.updateTask = async (id, reqBody) => {
    console.log(id,reqBody ,"reporo");
    const UpdateTask = await taskModel.update(
        {
          user_id: reqBody.user_id,
          place_name: reqBody.place_name,
          task_name: reqBody.task_name,
          form_name: reqBody.form_name,
          task_time: reqBody.task_time,
          task_description: reqBody.task_description,
          repeat: reqBody.repeat,
          alert: reqBody.alert,
          share: reqBody.share,
        },
        { where: { id: id } }
      );
    
      return UpdateTask;
}

exports.getTasks = async (Id) => {
    // console.log(Id,"userrepooeo")
    const todayDate = moment().format("YYYY-MM-DD")
    // console.log(todayDate)
    let getTasks = await taskModel.findAll({
        where:{ user_id:Id, task_time:{[Op.gte]:todayDate} },
        attributes: ['id', 'user_id',"task_name","form_name","task_time","task_description","store"], raw: true,
        nest: true,
    })
    // console.log(getTasks,"getTask")
    return getTasks;
    console.log(getTasks,"getTask")
};
exports.getTasksById = async (Id) => {
    let getTasks = await taskModel.findOne({
        where:{ id:Id },
        attributes: ['id', 'user_id',"task_name","form_name","task_time","task_description","store"], raw: true,
        nest: true,
    })
    // console.log(getTasks,"getTask")
    return getTasks;
};

exports.getTaskByDate = async (reqBody) => {
    var date = reqBody.date

    console.log(date, "repoeoe")

    let getTasks = await taskModel.findAll({
        where:{ user_id:reqBody.user_id , task_time:reqBody.date},
        attributes: ['id', 'user_id',"task_name","form_name","task_time","task_description","store"], raw: true,
        nest: true,
    })
    return getTasks;
}

exports.deleteTask = async (id) =>{
    let deleteTask = await taskModel.destroy({
        where: { id: id }
    })
    // console.log(deleteTask,"dekelek")
    return deleteTask
}