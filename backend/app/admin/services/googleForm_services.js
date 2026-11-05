let formRepo = require('../repository/googleForm_repo')

exports.createForm = async (reqBody) => {
    try{
        let user_ids = reqBody.user_id,
        array_objects = [];
        user_ids.forEach(user_id => {
            const array_object = {
                "user_id": user_id,
                "project_id": reqBody.project_id,
                "project_name": reqBody.project_name,
                "url": reqBody.url,
                "title":reqBody.title,
                "form_status":"0",
                "status":reqBody.status,
                "start_date": reqBody.start_date,
                "end_date": reqBody.end_date
            };
            array_objects.push(array_object);
        });
        let createForm = await formRepo.createForm(array_objects);
        return createForm

    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};


exports.formListing = async (reqQuery,sort_array,filter_value) => {
    try{
        let getAllForm = await formRepo.getAllForm(reqQuery,sort_array,filter_value)
        console.log(getAllForm,"serls")
        return getAllForm
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteForm = async (id) => {
    try{
        let deleteForm = await formRepo.deleteForm(id);
        return deleteForm;
    }catch(error){
        console.log('error  ', error)
        throw error;
    
    }
};

exports.updateForm = async (id, reqBody) => {
    try{
        let updateForm = await formRepo.updateForm(id ,reqBody);
        return updateForm;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getUsers = async (id) => {
    try{
        let getUser = await formRepo.getUsers(id);
        return getUser
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}