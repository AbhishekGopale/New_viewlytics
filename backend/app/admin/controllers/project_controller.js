const { Sequelize } = require("../../../config/database");
const { commonResponse } = require("../../../helper");
const { DEFAULTERR, CHAIN_SUCCESS_CREATED, DELETE_CHAIN, DELETE_MULTIPLE_CHAIN, UPDATE_CHAIN } = require('../../../helper/resources/messages.json')
const { ValidationError, } = require('../../../helper/commonResponce');
const projectService = require('../services/project_services.js')
const updateProductModule = require('../validation/updateProject.validation.js')
const isEmpty = require("../../isEmpty");
const fs = require("fs");
const mime = require("mime");

exports.createProject = async (req, res, next) => {

    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var Image = req.file.filename

        // console.log(req.file, 'req.file')
        // console.log(req.body,"gigigi");
        // return;

        let createProject = await projectService.createProject(req.body, Image)
        if (createProject) commonResponse.success(res, 201, "Project Created Succesfully");
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            const errObj = {};
            for (const value of error.errors) {
                errObj[ value.path ] = value.message
            }
            console.log(errObj, ": --------->")
            return commonResponse.customErrorResponse(res, 422, DEFAULTERR, errObj);
        } else if (error instanceof Sequelize.AggregateError) {
            return commonResponse.customErrorResponse(res, 501, 'File is Invalid');
        }
        else {
            next(error);
            return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
        }
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

        console.log(req.user, ":req.user")




        const { page = 1, limit = 2 } = req.query;
        let order_column = req.query.order_column || "id";
        let sort_order = req.query.sort_order == "asc" ? "ASC" : "DESC";
        let sort_array = [ order_column, sort_order ];
        let filter_value = req.query.filter_value || "";

        var findALlProject
        if (req.user.role_id == 8) {
            findALlProject = await projectService.getAllProjectZoneWise(req.query, sort_array, filter_value, req.user);
        } else if (req.user.role_id == 1) {
            findALlProject = await projectService.getAllProject(req.query, sort_array, filter_value);
        }


        // console.log(findALlChain,"toto")
        if (findALlProject) {
            return commonResponse.success(res, 200, "Successfully Get All project!", {
                TotalCount: findALlProject.count,
                project: findALlProject.data
            });
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deleteProject = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.params.id
        const deleteProject = await projectService.deleteProject(id);

        if (deleteProject) {
            return commonResponse.success(res, 200, "Succesfully Deleted Project");
        }
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.deletemany = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.body.id
        const deleteChain = await projectService.deleteMany(id);

        if (deleteChain) {
            return commonResponse.success(res, 200, "MultiPle Project Deleetd Succesfully");
        }

    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}
exports.valueLabelProject = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var findALlProject = await projectService.getAllvalueProject();
        console.log(findALlProject, "finflcontol")
        var projectArr = []
        if (findALlProject) {
            for (let i = 0; i < findALlProject.length; i++) {
                var obj = {};
                obj[ "value" ] = findALlProject[ i ].id;
                obj[ "label" ] = findALlProject[ i ].project_name;

                projectArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Project!", {
            project: projectArr
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.updateProject = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        var id = req.params.id
        var Image;
        if (req.body.image) {
            var SpliteImage = req.body.image.split("http://localhost:5000/media/upload/")
            Image = SpliteImage[ 1 ]
        } else {
            Image = req.file.filename
        }

        const { errors, isValid } = updateProductModule(req.body);

        if (!isValid) {
            return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
        }
        const updateProject = await projectService.update(id, req.body, Image);
        if (updateProject) {
            return commonResponse.success(res, 200, "Project Updated Succesfully");
        }


    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}

exports.zoneOnProject = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.json({
                error: true,
                statusCode: 401,
                message: "Invalid login!",
                errors: "You are not a user,you can not able to action on this module!",
            });
        }
        let id = req.params.id;
        var findALlProject = await projectService.getAllZoneProject(id);
        // console.log(findALlProject);
        // console.log(id,"zoneOnProject")
        var projectArr = []
        if (findALlProject) {
            for (let i = 0; i < findALlProject.length; i++) {
                var obj = {};
                obj[ "value" ] = findALlProject[ i ].id;
                obj[ "label" ] = findALlProject[ i ].zone_name;

                projectArr.push(obj);
            }

        }
        return commonResponse.success(res, 200, "Successfully Get All Zone On Project!", {
            zone: projectArr
        });
    } catch (error) {
        next(error);
        return commonResponse.customErrorResponse(res, 501, DEFAULTERR);
    }
}


exports.importExcel = async (req, res, next) => {
    try {

        let createProject = await projectService.projectExcel(req.body.projects)
        if (createProject) {
            return commonResponse.success(res, 201, "Project Created Succesfully");
        }
    } catch (error) {
        console.log(error)
    }
}

// exports.subAdminProject = async()

