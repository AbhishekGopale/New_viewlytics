let subAdminModel = require("../models/subadmin");
let zoneModel = require("../models/zone");
let permissionModel = require("../models/subAdmin_rolePermission_module");
let projectModel = require("../models/project")

const moment = require("moment");
const { Op } = require("sequelize");

exports.createSubAdmin = async (reqBody) => {
    return await subAdminModel.create(reqBody, { raw: true })
},

    exports.getAllAdmin = async (reqQuery, sort_array) => {
        let LIMIT = reqQuery.limit * 1;
        let SKIP = (reqQuery.page - 1) * reqQuery.limit;

        let getSubAdmin = await subAdminModel.findAll({
            attributes: ['id', 'email', 'first_name', 'last_name', 'full_name', 'user_name', 'mobile_no', 'role_id', 'role_name', 'zone', 'status'], raw: true,
            nest: true,
            include: [
                {
                    model: zoneModel,
                    as: 'zoneId',
                    attributes: ['id', 'zone_name']
                }],
            order: [sort_array],
            offset: SKIP,
            limit: LIMIT
        })

        return getSubAdmin;
}

exports.deleteSubAdmin = async (id) => {
    let deleteSubAdmin = await subAdminModel.destroy({
        where: { id: id }
    })

    return deleteSubAdmin
}

exports.updateSubAdmin = async (id, reqBody) => {
    // console.log(id, reqBody,"repeo")
    const UpdateUser = await subAdminModel.update(
		{
			first_name: reqBody.first_name,
			last_name: reqBody.last_name,
			mobile_no: reqBody.mobile_no,
			email: reqBody.email,
			user_name:reqBody.user_name,
			zone: reqBody.zone,
			status: reqBody.status

		}, { where: { id: id } })

	return UpdateUser
} 

exports.updateSubAdminRole = async (data) => {

    const updateSubAdminRole = await subAdminModel.update({
        role_permission: data.role_permission
    }, {
        where: { id: data.user_id }
    })

    return updateSubAdminRole
}

exports.subadmin = async () => {
    const AdminData = await subAdminModel.findAll({
        attributes: ['id', 'first_name'],
        raw: true,
        nest: true
    })
    return AdminData
}

exports.SubModulePermission = async () => {
    const AdminData = await permissionModel.findAll({
        attributes: ['id', 'module_name'],
        raw: true,
        nest: true
    })
    return AdminData
}

exports.getByIdSubAdmin = async (id) => {


    // var projectFind = await projectModel.findAll({ where: { sub_admin: id }, raw: true, nest: true })


    const subAdmin = await subAdminModel.findOne({
        where: { id: id },
        // attributes: ['id', 'email', 'first_name', 'last_name', 'full_name', 'user_name', 'mobile_no', 'role_id', 'role_name', 'zone', 'status', 'role_permission'],
        attributes: ['role_permission'],
        raw: true,
        nest: true,

    })

    return { subAdmin }
}