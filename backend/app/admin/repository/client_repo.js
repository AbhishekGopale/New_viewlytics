let clientModel = require('../models/client')
let clientRelationalModel = require('../models/clientRelation');
let Role = require('../models/role');
const { Op } = require('sequelize')


exports.createClient = async (data) => {
    return await clientModel.create(data, { raw: true })
}

exports.createClientRelation = async (data) => {
    return await clientRelationalModel.create(data, { raw: true })
}


exports.getAllClient = async (reqQuery, sort_array, filter_value) => {
    let LIMIT = reqQuery.limit * 1;
	let SKIP = (reqQuery.page - 1) * reqQuery.limit;
	if (filter_value != "") {
		//   var regex = new RegExp(filter_value, "i");
		filter_value = {
			[Op.or]: [{ "role_name": { [Op.like]: `%${filter_value}%` } },{ "user_name": { [Op.like]: `%${filter_value}%` } },{ "user_id": { [Op.like]: `%${filter_value}%` } },{ "first_name": { [Op.like]: `%${filter_value}%` } },{ "last_name": { [Op.like]: `%${filter_value}%` } },{ "full_name": { [Op.like]: `%${filter_value}%` } },{ "project_name": { [Op.like]: `%${filter_value}%` } }],
		};
	} else {
		filter_value = {};
	}
	let getClient = await clientModel.findAll({
		where: filter_value,
		attributes: ['id', 'email', 'first_name','full_name' ,'project_name','project_id','last_name', 'user_name','user_id','mobile_no', 'role_id', 'role_name'], raw: true,
		nest: true,
		order: [sort_array],
		offset: SKIP,
		limit: LIMIT
	})
	let totalCount = await clientModel.count({})
    return { data: getClient, count: totalCount }
}

exports.deleteClient = async (id) => {
    var clientRelationData = await clientRelationalModel.destroy({
		where: { client_id: id }
	})

	let deletClient = await clientModel.destroy({
		where: { id: id }
	})

	return deletClient
}

exports.updateClient = async (id,createClientObj) => {
    // console.log(id,reqBody,"repro")

    const UpdateClient = await clientModel.update(
		createClientObj, { where: { id: id } })

	return UpdateClient
}
exports.updateClientRelation = async (id,createClientObj) => {
    console.log(id,createClientObj,"repro")

    const UpdateClient = await clientRelationalModel.update(
		createClientObj, { where: { client_id: id } })

	return UpdateClient
}

exports.getClientId = async (id) => {
	console.log(id,"iidirepo")
	let GetClient = await clientModel.findOne({
		where: { id: id },
		attributes: ['id', 'email', 'first_name', 'project_name','project_id','last_name','user_name','user_id' ,'mobile_no', 'role_id', 'role_name'],
		include: [{
			model: Role,
			attributes: ['role_id', 'role_name'],
		}],
		raw: true,
		nest: true
	},
	)


	let FindClientRelationalData = await clientRelationalModel.findOne({
		where: { client_id: id }, raw: true,
		include: [
			{
				model: clientModel,
				as: 'UserNcpId',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: clientModel,
				as: 'UserAseId',
				attributes: ['id', 'first_name', 'last_name']
			},],
		nest: true
	})



	return { GetClient, FindClientRelationalData }
}

exports.getncp = async () => {
	let Ncp = await clientRelationalModel.findAll({
		where: { client_role_id: 9, client_role_name: "npc" },
		attributes: [],
		include: [
			{
				model: clientModel,
				as: 'Client',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})

	console.log(Ncp, ":Ncp")

	return Ncp
}
exports.getase = async () => {
	let Ase = await clientRelationalModel.findAll({
		where: { client_role_id: 10, client_role_name: "ase" },
		attributes: [],
		include: [
			{
				model: clientModel,
				as: 'Client',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: clientModel,
				as: 'UserNcpId',
				attributes: ['id', 'first_name', 'last_name']
		    }],
		raw: true,
		nest: true
	})

	console.log(Ase, ":Ase")

	return Ase
}


exports.getSe = async () => {
	let Ase = await clientRelationalModel.findAll({
		where: { client_role_id: 11, client_role_name: "se" },
		attributes: [],
		include: [
			{
				model: clientModel,
				as: 'Client',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: clientModel,
				as: 'UserAseId',
				attributes: ['id', 'first_name', 'last_name']
			}, {
				model: clientModel,
				as: 'UserNcpId',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})

	console.log(Ase, ":Ase")

	return Ase
}