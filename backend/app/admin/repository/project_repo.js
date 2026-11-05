const path = require("path");
const projectModel = require("../models/project");
const chain = require("../models/chain");
const Zone = require("../models/zone");
const { Op } = require('sequelize')
const { DB, Sequelize } = require("../../../config/database");
exports.createProject = async (data) => {
    return await projectModel.create(data, { raw: true })
}

exports.getAllProject = async (reqQuery, sort_array, filter_value) => {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
        //   var regex = new RegExp(filter_value, "i");
        filter_value = {
            [ Op.or ]: [ { "project_name": { [ Op.like ]: `%${filter_value}%` } } ],
        };
    } else {
        filter_value = {};
    }
    let getChain = await projectModel.findAll({
        where: filter_value,
        attributes: [ 'id', 'project_name', "image", "zone" ], raw: true,
        nest: true,

        order: [ sort_array ],
        offset: SKIP,
        limit: LIMIT

    })
    let zones = await Zone.findAll({
        raw: true,
        nest: true,
    })
    // console.log(zones)

    let chainData = getChain.map((value) => {
        const zoneIds = Array.isArray(value.zone) ? value.zone : [ value.zone ];
        const zoneNames = zoneIds.map((zoneId) => {
            const found = zones.find((element) => element.id === zoneId);
            return found ? found.zone_name : '';
        });
        value.zone_name = zoneNames
        return value;
    });
    // console.log(chainData, "chain data");




    for (let index = 0; index < getChain.length; index++) {
        const element = getChain[ index ];
        // element.image = `http://35.73.254.5/media/upload/${element.image}`
        element.image = `http://localhost:5000/media/upload/${element.image}`

    }
    let totalCount = await projectModel.count({})
    // console.log(totalCount)
    // console.log(getStore,"alla")
    return { data: getChain, count: totalCount }

    // return getChain
}

exports.deleteProject = async (id) => {
    let deleteChain = await projectModel.destroy({
        where: { id: id }
    })

    return deleteChain
}

exports.deleteMany = async (id) => {
    let deleteChain = await projectModel.destroy({
        where: { id: id }
    })

    return deleteChain
}

exports.getAllvalueProject = async () => {

    let getProject = await projectModel.findAll({
        attributes: [ 'id', 'project_name', "image", "zone" ], raw: true,
        nest: true,
    })
    console.log(getProject, "repo")

    for (let index = 0; index < getProject.length; index++) {
        const element = getProject[ index ];
        element.image = `http://35.73.254.5/media/upload/${element.image}`

    }
    return getProject

    // return getChain
};

exports.getAllZoneProject = async (id) => {
    console.log(id, "repoee");
    let projectDetail = await projectModel.findOne({
        where: { id: id },
        attributes: [ 'id', 'project_name', "image", "zone" ],
        raw: true,
        nest: true
    });

    console.log(projectDetail, ":projectDetail")
    let zoneDetails = await Zone.findAll({
        where: { id: projectDetail.zone },
        raw: true,
        nest: true
    })
    return zoneDetails;
}

exports.updateProject = async (id, reqBody, Image) => {
    const updateProject = await projectModel.update(
        {
            project_name: reqBody.project_name,
            image: Image,
            zone: JSON.parse(reqBody.zone)
        }, { where: { id: id } })

    return updateProject
}

exports.getAllProjectZoneWise = async (reqQuery, sort_array, filter_value, reqUser) => {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
        //   var regex = new RegExp(filter_value, "i");
        filter_value = {
            [ Op.or ]: [ { "project_name": { [ Op.like ]: `%${filter_value}%` } } ],
        };
    } else {
        filter_value = {};
    }

    console.log(reqUser.zone, "reqUser.zone")


    let getChain = await projectModel.findAll({
        where: filter_value,
        attributes: [ 'id', 'project_name', "image", "zone" ], raw: true,
        nest: true,
        order: [ sort_array ],
        offset: SKIP,
        limit: LIMIT

    })
    let zones = await Zone.findAll({
        raw: true,
        nest: true,
    })
    // console.log(zones)

    let chainData = getChain.map((value) => {
        const zoneIds = Array.isArray(value.zone) ? value.zone : [ value.zone ];
        const zoneNames = zoneIds.map((zoneId) => {
            const found = zones.find((element) => element.id === zoneId);
            return found ? found.zone_name : '';
        });
        value.zone_name = zoneNames
        return value;
    });
    console.log(chainData, "chain data");


    var getZoneProject = []

    for (let index = 0; index < getChain.length; index++) {
        const element = getChain[ index ];

        var zone = element.zone

        const found = zone.find((value) => {
            if (value === reqUser.zone) {
                getZoneProject.push(element)
            }
        });
    }

    for (let index = 0; index < getZoneProject.length; index++) {
        const element = getZoneProject[ index ];
        element.image = `http://35.73.254.5/media/upload/${element.image}`

    }
    let totalCount = await projectModel.count({})

    return { data: getZoneProject, count: totalCount }

}


exports.createProjectExcel = async (data) => {
    // return await chainModel.create(data, { raw: true })
    let Project = await projectModel.bulkCreate(data, { validate: true, raw: true })
    return Project;
}

