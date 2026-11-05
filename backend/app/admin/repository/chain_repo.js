const path = require("path");
const chainModel = require("../models/chain");
const chain = require("../models/chain");
const projectModel = require("../models/project");
const { Op }= require('sequelize')
const Zone = require("../models/zone")
exports.createChain = async (data) => {
    // return await chainModel.create(data, { raw: true })
    let chain = await chainModel.bulkCreate(data, { validate: true, raw: true })
    return chain;
}

exports.getById = async (id) => {
    let GetByIdChain = await chainModel.findOne({
        where: { id: id },
        attributes: ['id', 'chain_name', "image", 'zone'], raw: true,
        nest: true,
    })

    return GetByIdChain;
}

exports.getAllChain = async (reqQuery,sort_array,filter_value) => {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
    //   var regex = new RegExp(filter_value, "i");
      filter_value = {
        [Op.or]: [{ "chain_name":{ [Op.like]: `%${filter_value}%` } },{ "project_name":{ [Op.like]: `%${filter_value}%` } }],
        status: 0
      };
    } else {
      filter_value = { status: 0 };
    }
    let getChain = await chainModel.findAll({
        where:filter_value,
        attributes: ['id', 'chain_name', 'project_id', 'project_name', 'zone'], raw: true,
        nest: true,
        order:[sort_array],
		offset: SKIP,
		limit : LIMIT
        
    })
    let zones = await Zone.findAll({
        raw: true,
        nest: true,
    })
    // console.log(zones)

    let chainData = getChain.map((value) => {
        const zoneIds = Array.isArray(value.zone) ? value.zone : [value.zone];
        const zoneNames = zoneIds.map((zoneId) => {
          const found = zones.find((element) => element.id === zoneId);
          return found ? found.zone_name : '';
        });
        value.zone_name = zoneNames
        return value;
      });
      console.log(chainData, "chain data");
      

    // for (let index = 0; index < getChain.length; index++) {
    //     const element = getChain[index];
    //     element.image = `http://localhost:5000/media/upload/${element.image}`

    // }
    let totalCount = await chainModel.count({ where: filter_value })
	// console.log(totalCount)
	// console.log(getStore,"alla")
	return {data:getChain , count:totalCount}

    // return getChain
}
exports.getAllvalueChain = async () => {
    
    let getChain = await chainModel.findAll({
        attributes: ['id', 'chain_name'], raw: true,
        nest: true,
    })


    // for (let index = 0; index < getChain.length; index++) {
    //     const element = getChain[index];
    //     element.image = `http://localhost:5000/media/upload/${element.image}`

    // }
	return getChain

    // return getChain
}

exports.getChainOnProject = async (id) => {
    let getchain = await chainModel.findAll ({
        where:{project_id:id},
        attributes: ['id', 'chain_name'], raw: true,
        nest: true,
    });
    return getchain
}

exports.deleteChain = async (id) => {
    let deleteChain = await chainModel.destroy({
        where: { id: id }
    })

    return deleteChain
}


exports.updateChain = async (id, reqBody) => {
    let getProject = await projectModel.findOne({
        where: { id: reqBody.project_id },
        attributes: ['id', 'project_name', "image", "zone"], raw: true,
        nest: true,
    })
    const updateChain = await chainModel.update(
        {
            chain_name: reqBody.chain_name,
            // image: Image,
            project_id:reqBody.project_id,
            project_name: getProject.project_name,
            zone: reqBody.zone
        }, { where: { id: id } })

    return updateChain
}

exports.deleteMany = async (id) => {
    let deleteChain = await chainModel.destroy({
        where: { id: id }
    })

    return deleteChain
}

exports.getAllChainZone = async (reqQuery, sort_array, filter_value, reqUser) => {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
        //   var regex = new RegExp(filter_value, "i");
        filter_value = {
            [Op.or]: [{ "chain_name": { [Op.like]: `%${filter_value}%` } }, { "project_name": { [Op.like]: `%${filter_value}%` } }],
        };
    } else {
        filter_value = {};
    }
    console.log(reqUser.zone, ":---------------")
    let getChain = await chainModel.findAll({
        where: filter_value,
        attributes: ['id', 'chain_name', 'project_id', 'project_name', 'zone'], raw: true,
        nest: true,
        order: [sort_array],
        offset: SKIP,
        limit: LIMIT

    })
    let zones = await Zone.findAll({
        raw: true,
        nest: true,
    })
    // console.log(zones)

    let chainData = getChain.map((value) => {
        const zoneIds = Array.isArray(value.zone) ? value.zone : [value.zone];
        const zoneNames = zoneIds.map((zoneId) => {
          const found = zones.find((element) => element.id === zoneId);
          return found ? found.zone_name : '';
        });
        value.zone_name = zoneNames
        return value;
      });
      console.log(chainData, "chain data");
      

    var getChainZone = []
    for (let index = 0; index < getChain.length; index++) {
        const element = getChain[index];

        var zone = element.zone

        const found = zone.find((value) => {
            if (value === reqUser.zone) {
                getChainZone.push(element)
            }
        });
    }

    console.log(getChainZone, ":getChainZone")

    return { data: getChainZone, count: getChain.length }
}
