const { Sequelize } = require('../../../config/database');
const broadCastingRepo = require('../repository/broadcasting_repo');

exports.userList = async (reqBody) => {
    try{
        // console.log(reqBody,"servicesssreqBodydddd");
        let userList = await broadCastingRepo.userList(reqBody);
        // console.log(userList,"serlistststs")
        return userList
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.createBroadCasting = async  (reqBody) => {
    try{
        console.log(reqBody,"reqBodyreqBody")
        // return;
        let createBroad  = await broadCastingRepo.createBroad(reqBody);
        return createBroad;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getAllCasting = async () => {
    try{
        let allCating = await broadCastingRepo.getAllList();
        return allCating
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.deleteCasting = async (id) => {
    try{
        console.log(id,"paraamiddd")
        let deleteCasting = await broadCastingRepo.deleteCasting(id)
        return deleteCasting;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}