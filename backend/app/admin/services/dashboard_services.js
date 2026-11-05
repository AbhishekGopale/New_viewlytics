const dashboardRepo = require('../repository/dashboard_repo')

exports.getDashboard = async () => {
    try{
        const getData = await dashboardRepo.getDashboard();
        // console.log(getData,"srer")
        return getData
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}
exports.getSubAdminDashboard = async (reqUser) => {
    try{
        const getData = await dashboardRepo.getSubAdminDashboard(reqUser);
        // console.log(getData,"srer")
        return getData
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}