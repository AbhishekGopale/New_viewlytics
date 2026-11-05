const taskRepo = require('../repository/task_repo');
let storeModel = require("../models/store")
let userModel = require("../models/user")

exports.createTask = async (reqBody) => {
    try{
        // console.log(reqBody,"servbod");
        // return;
        const createTask = await taskRepo.createTask(reqBody)
        return createTask
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.createBulkTask = async (reqBody) => {
    try{
        // console.log(reqBody,"servicesss");
        let stores = await storeModel.findAll({
            attributes:["id","store_code","store_name"],
            raw:true,
            nest:true
        });
        let users = await userModel.findAll({
            attributes:["id","user_id"],
            raw:true,
            nest:true
        });
        console.log(users,"users")
        let validateData = reqBody.map((value, index) => {
            // console.log(value,"valueeeeee")
            const user = users.find((element) => {
                return element.user_id == value.user_id;
            });
            var storeArr = [];
            let storeCode = value.store
            storeCode.map((store) => {
                stores.find((element) => {
                    if (element.store_code == store) storeArr.push(element.id);
                });
            });
            return {
                user_id: user ? user.id : null,
                store: 'zone' ? storeArr : null,
                task_name: 'task_name' ? value.task_name : null,
                form_name: 'task_name' ? value.form_name : null,
                task_time: 'task_time' ? value.task_time : null,
                task_description: 'task_description' ? value.task_description : null,
                repeat: 'repeat' ? value.repeat : null,
                alert: 'alert' ? value.alert : null,
                share: 'share' ? value.share : null,

            }
        });
        // console.log(validateData,"valjsihdjhsdjsd");
        // return;
        let craeteTask = await taskRepo.craeteBulkTask(validateData);
        return craeteTask
        // console.log(validateData,"validateDatavalidateData")
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}
exports.updateTask = async (id, reqBody) => {
    try{
        console.log(id,reqBody,"idid")
        const updateTask = await taskRepo.updateTask(id, reqBody)
        return updateTask
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getTasks = async (Id) => {
    try{
        console.log(Id,"Idser")
        const getTasks = await taskRepo.getTasks(Id);
        return getTasks
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};
exports.getTaskById = async (Id) => {
    try{
        console.log(Id,"Idser")
        const getTasks = await taskRepo.getTasksById(Id);
        return getTasks
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getTasksByDate = async (reqBody) => {
    try{
        // console.log(reqBody,"reqBoysy")
        const getTask = await taskRepo.getTaskByDate(reqBody)
        return getTask
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteTask = async (id) => {
    try{
        // console.log(id,"ser")
        let deleteTask = await taskRepo.deleteTask(id);
        return deleteTask;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}