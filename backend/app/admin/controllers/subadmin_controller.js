const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, SUB_ADMIN_SUCCESS_CREATED, DELETE_SUBADMIN, UPDATE_SUBADMIN, UPDATE_SUBADMIN_ROLE } = require('../../../helper/resources/messages.json')
const { ValidationError } = require('../../../helper/commonResponce');
const subAdminServices = require('../services/sub_admin_services');
const createSubAdminValidation = require("../validation/createsubadmin.validation");
const updateSubAdminValidation = require("../validation/updateSubAdmin.validation");
const subAdminRolePermission = require("../models/subAdmin_rolePermission_module");
const subAdminModel = require("../models/subadmin");

exports.createSubAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = createSubAdminValidation(req.body);
        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
        }
        let createSubAdmin = await subAdminServices.createSubAdmin(req.body)
        if (createSubAdmin) commonResponse.success(res, 201, SUB_ADMIN_SUCCESS_CREATED);
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        const { page = 1, limit = 2 } = req.query;
        let order_column = req.query.order_column || "id";
        let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
        let sort_array = [order_column, sort_order];

        var findAllSubAdmin = await subAdminServices.getSubAdmin(req.query, sort_array);

        var count = await subAdminModel.findAll({})

        return commonResponse.success(res, 200, "Successfully Get All Admin!", {
            totalCount: count.length,
            Sub_Admin: findAllSubAdmin
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}


exports.deleteSubAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id
        let deleteSubAdmin = await subAdminServices.deleteSubAdmin(id)
        if (deleteSubAdmin) {
            return commonResponse.success(res, 200, DELETE_SUBADMIN);
        }
    } catch (error) {

    }
};

exports.deleteManySubAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.body.id
        let deleteSubAdmin = await subAdminServices.deleteSubAdmin(id)
        if (deleteSubAdmin) {
            return commonResponse.success(res, 200, DELETE_SUBADMIN);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
};

exports.updateSubAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        const { errors, isValid } = updateSubAdminValidation(req.body);
        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errors);
        }
        let id = req.params.id
        let updateSubAdmin = await subAdminServices.updateSubAdmin(id, req.body)
        if (updateSubAdmin) {
            return commonResponse.success(res, 200, UPDATE_SUBADMIN);
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.rolePermission = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        let updateRolePermission = await subAdminServices.updateSubAdminRolePermission(req.body)
        if (updateRolePermission) {
            return commonResponse.success(res, 200, UPDATE_SUBADMIN_ROLE);
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.getById = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id
        let getSubAdmin = await subAdminServices.getByIdSubAdmin(id);
        // console.log(getSubAdmin,"getsubb")
        // var Project = getSubAdmin.projectFind
        var subAdmin = getSubAdmin.subAdmin

        // var projectArr = []
        // var projectIdArr = []

        // if (Project) {
        //     for (let i = 0; i < Project.length; i++) {
        //         var obj = {};
        //         obj["value"] = Project[i].id;
        //         obj["label"] = Project[i].project_name;

        //         projectArr.push(obj);
        //         projectIdArr.push(Project[i].id);

        //     }

        // }
        if (getSubAdmin) {
            return commonResponse.success(res, 200, "Successfully Get Sub Admin Role!", subAdmin);
        } else {
            return commonResponse.customErrorResponse(res, 501, "Something went wrong!", "Sub admin can not find!");
        }


    } catch (error) {
        console.log(error, ":error")
    }
}

exports.getallValueLabel = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        let getSubAdmin = await subAdminServices.subadmin();
        var subAdminArr = []
        if (getSubAdmin) {
            for (let i = 0; i < getSubAdmin.length; i++) {
                var obj = {};
                obj["value"] = getSubAdmin[i].id;
                obj["label"] = getSubAdmin[i].first_name;

                subAdminArr.push(obj);
            }

        }

        if (getSubAdmin) {
            return commonResponse.success(res, 200, "Successfully Get All Admin!", {
                Sub_Admin: subAdminArr
            });
        }

    } catch (error) {
        console.log(error, ":error")
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.modulePermissionVL = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }

        let SubModulePermission = await subAdminServices.SubModulePermission();

        var modulePermission = []
        if (SubModulePermission) {
            for (let i = 0; i < SubModulePermission.length; i++) {
                var obj = {};
                obj["value"] = SubModulePermission[i].id;
                obj["label"] = SubModulePermission[i].module_name;

                modulePermission.push(obj);
            }

        }




        if (SubModulePermission) {
            return commonResponse.success(res, 200, "Successfully Get All Admin Module!", {
                SubModulePermission: modulePermission
            });
        }
    } catch (error) {
        console.log(error, ":error")
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}