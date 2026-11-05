const subAdminRepo = require('../repository/sub_admin_repo');
const authRepo = require('../repository/auth_repo')
const bcrypt = require("bcryptjs");

exports.createSubAdmin = async (reqBody) => {
    try{
        // console.log(reqBody,"servbod")
        var saltBecrypt = bcrypt.genSalt(10)
        const createUserObj = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            mobile_no: reqBody.mobile_no,
            full_name: reqBody.first_name + " " +reqBody.last_name,
            email: reqBody.email,
            role_id: "8",
            role_name: "sub_admin",
            user_name: reqBody.user_name,
            zone: reqBody.zone,
            status: reqBody.status
        }
        // let userRelationObj = {
        //     user_role_id: reqBody.role_id,
        //     user_role_name: reqBody.role_name,
        // }
        let saltGeneratedPassword = await saltBecrypt
        var HashPassword = await bcrypt.hash(reqBody.password, saltGeneratedPassword)

        createUserObj.password = HashPassword;

        const createSubAdmin = await subAdminRepo.createSubAdmin(createUserObj)
        // userRelationObj.user_id = createSubAdmin.id

        // let user_relation = await authRepo.createUserRelation(userRelationObj)
        return createSubAdmin
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
};

exports.getByIdSubAdmin = async (id) => {
    try {
        let getSubAdmin = subAdminRepo.getByIdSubAdmin(id)
        return getSubAdmin
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getSubAdmin = async (reqQuery, sort_array) => {
    try {
        let getSubAdmin = await subAdminRepo.getAllAdmin(reqQuery, sort_array)
        return getSubAdmin

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.deleteSubAdmin = async (id) => {
    try{
        const deleteSubAdmin = await subAdminRepo.deleteSubAdmin(id)
        return deleteSubAdmin
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.updateSubAdmin = async (id, reqBody) => {
    try{
        const updateSubAdmin = await subAdminRepo.updateSubAdmin(id, reqBody)
        return updateSubAdmin
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
    
}

exports.updateSubAdminRolePermission = async (reqBody) => {
    try {

        const updateRole = await subAdminRepo.updateSubAdminRole(reqBody)
        return updateRole
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.subadmin = async () => {
    try {
        const subAdmin = await subAdminRepo.subadmin()
        return subAdmin
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.SubModulePermission = async () => {
    try {
        const SubModulePermissions = await subAdminRepo.SubModulePermission()
        return SubModulePermissions
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}