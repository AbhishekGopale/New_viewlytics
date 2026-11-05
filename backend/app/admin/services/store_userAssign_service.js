const { ValidationError } = require("../../../helper/commonResponce");
const isEmpty = require("../validation/isEmpty");
const userAssignRepo = require('../repository/user_assign_repo.js');
const storeRepo = require('../repository/store_repo')
const userRepo = require('../repository/auth_repo')
const Validator = require("validator");



exports.storeUserAssign = async (reqBody) => {
    try {

        var StoreArray = reqBody.store_code
        let userAssign = await storeRepo.updateStoreForUserAssign(reqBody, StoreArray);
        return userAssign
    } catch (error) {
        console.log(error, "--------------------------------error-----------------------------------------")
        // console.log('error  ', error instanceof Sequelize.AggregateError)
        throw error;
    }
}

exports.deleteuserAssign = async (id) => {
    try {
        let deleteuserAssign = await userAssignRepo.deleteuserAssign(id)
        return deleteuserAssign
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await userAssignRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getUserAssignBYID = async (id) => {
    try {

        let GetUser = await userAssignRepo.getUserByID(id)
        return GetUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


