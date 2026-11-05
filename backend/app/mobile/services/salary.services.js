

const salaryRepo = require('../repository/salaryRepo.js')

exports.findSalary = async (reqBody) => {
    try {
        var FindSalary = await salaryRepo.findSalary(reqBody)
        return FindSalary
    } catch (error) {
        +
            console.log(error, " -->error")
        throw error;
    }
}