
const supportRepo = require('../repository/supportRepo.js')
const supportModel = require('../../admin/models/support.js')

exports.createSupprt = async (reqBody) => {
    try {
        // console.log(reqBody)
        const createSupportObj = {
            form: reqBody.form,
            mail_status: reqBody.mail_status,
        }
        var CreateSupport = await supportRepo.supportRepo(createSupportObj)
        return CreateSupport
    } catch (error) {
            console.log(error, " -->error")
        throw error;
    }
};

exports.getsupport = async (userid) => {
    try {

        let getAllSupport = await supportRepo.getAllSupport()
        return getAllSupport


    } catch (error) {
        console.log(error, "-->error")
        throw error;
    }
}

exports.deleteSupport = async (id) => {
    try {

        let deleteSupport = await supportRepo.deleteSupport(id)

        return deleteSupport

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}