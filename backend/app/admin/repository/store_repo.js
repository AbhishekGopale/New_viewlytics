const Store = require("../models/store");
const zone = require('../models/zone')
const City = require("../../web/models/citis");
const State = require("../../web/models/state");
const Chain = require("../models/chain");
const projectModel = require("../models/project");
const zoneModel = require("../models/zone");
const { Op } = require('sequelize');
require("dotenv").config()
const {Image_path} = require('../../../config/application')




exports.createStoreInBulkOrSingle = async (data) => {
	console.log(data, ";---78787--")
	let store = await Store.bulkCreate(data, { validate: true, raw: true });
	return store;
}

exports.getAllStore = async (reqQuery, sort_array, filter_value) => {
	// console.log(reqQuery,sort_array,filter_value,"requestrepo")
	let LIMIT = reqQuery.limit * 1;
	let SKIP = (reqQuery.page - 1) * reqQuery.limit;
	if (filter_value != "") {
		//   var regex = new RegExp(filter_value, "i");
		filter_value = {
			[ Op.or ]: [ { "store_name": { [ Op.like ]: `%${filter_value}%` } }, { "project_name": { [ Op.like ]: `%${filter_value}%` } }, { "chain": { [ Op.like ]: `%${filter_value}%` } }, { "zone": { [ Op.like ]: `%${filter_value}%` } }, { "city": { [ Op.like ]: `%${filter_value}%` } }, { "state": { [ Op.like ]: `%${filter_value}%` } } ],
			status: 0
		};
	} else {
		filter_value = { status: 0 };
	}
	// console.log(filter_value,"filterer")
	let getStore = await Store.findAll({
		where: filter_value,
		attributes: ['id', 'store_code', 'user_id', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'ta', 'ta_id', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id', 'Image','client_npc','npc_id','client_asm','client_asm_id','client_se','se_id'], raw: true,
		nest: true,
		order: [ sort_array ],
		offset: SKIP,
		limit: LIMIT
	})
	let totalCount = await Store.count({ where: filter_value })
	let getCity = await City.findAll({
		raw: true,
		nest: true
	})
	let getZone = await zone.findAll({
		raw: true,
		nest: true
	})
	let getChain = await Chain.findAll({
		raw: true,
		nest: true
	})

	let getState = await State.findAll({
		raw: true,
		nest: true
	})
	let cityAddedData = getStore.map((value) => {
		const found = getCity.find((element) => {
			return element.city_name == value.city;
		});
		// console.log(found.id,"idd")
		value.city_id = found ? found.id : " "

	})
	let zoneAddedData = getStore.map((value) => {
		const found = getZone.find((element) => {
			return element.id == value.zone;
		});
		// console.log(found.id,"idd")
		value.zone_name = found ? found.zone_name : " "

	})
	let chainAddedData = getStore.map((value) => {
		const found = getChain.find((element) => {
			return element.id == value.chain;
		});
		console.log(found, ":found")
		value.chain_name = found ? found.chain_name : " "
	});


	let stateAddedData = getStore.map((value) => {
		const found = getState.find((element) => {
			return element.state_name == value.state;
		});
		// console.log(found.id,"idd")
		value.state_id = found ? found.id : " "

	})
	// console.log(Image_path.IMAGE_PATHS,"Image_path")
	let imagepath = Image_path.IMAGE_PATHS
	console.log(imagepath,"iamgepatshsh")
	for (let index = 0; index < getStore.length; index++) {
		const element = getStore[index];
		element.Image = `${Image_path.IMAGE_PATHS}/${element.Image}`

	}
	// console.log(getCity)
	// console.log(getStore,"alla")
	return { data: getStore, count: totalCount }
}
exports.getAllStoredropdown = async () => {
	let getStore = await Store.findAll({
		attributes: [ 'id', 'store_code', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ], raw: true,
		nest: true,
		// order:['created_at', "asc"],
	})
	return getStore
}
exports.getAllStoredropdownbyId = async (reqQuery) => {
	console.log(reqQuery, "repeo")
	let city = await City.findOne({
		where: { id: reqQuery.id },
		raw: true,
		nest: true,
	})
	// console.log(city,"ci")
	let getStore = await Store.findAll({
		where: { city: city.city_name },
		attributes: [ 'id', 'store_code', 'store_name', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ], raw: true,
		nest: true,
		// order:['store_code', ''],
	})
	return getStore
}

exports.getAllUserStore = async (id) => {
	console.log(id, "repeooe")
	let GetUser = await Store.findAll({
		where: { user_id: id },
		attributes: [ 'id', 'store_code', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ],
		raw: true,
		nest: true
	},
	)
	console.log(GetUser)
	return GetUser
}
exports.getAllCityStore = async (city) => {
	console.log(city, "repeooe")
	let GetUser = await Store.findAll({
		where: { city: city },
		attributes: [ 'id', 'store_code', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ],
		raw: true,
		nest: true
	},
	)
	console.log(GetUser)
	return GetUser
}

exports.getStoreByID = async (id) => {
	let GetUser = await Store.findOne({
		where: { store_code: id },
		attributes: [ 'id', 'store_code', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ],
		raw: true,
		nest: true
	},
	)


	return GetUser
}

exports.deleteStore = async (id) => {
	let deleteStore = await Store.destroy({
		where: { id: id }
	})

	return deleteStore
}

exports.deleteMany = async (id) => {
	let deletMultipleUser = await Store.destroy({
		where: { id: id }
	})

	return deletMultipleUser
}

exports.updateStore = async (id, reqBody, Image) => {
	console.log(reqBody, "boydyd");
	// return
	let getProject = await projectModel.findOne({
		where: { project_name: reqBody.project_name },
		attributes: [ 'id', 'project_name', "image" ], raw: true,
		nest: true,
	})
	let getZone = await zoneModel.findOne({
		where: { zone_name: reqBody.zone },
		attributes: [ 'id', 'zone_name' ], raw: true,
		nest: true,
	})
	console.log(reqBody)
	const UpdateUser = await Store.update(
		{
			store_code: reqBody.store_code,
			chain: reqBody.chain,
			zone: reqBody.zone,
			city: reqBody.city,
			state: reqBody.state,
			store_name: reqBody.store_name,
			location: reqBody.location,
			project_name: reqBody.project_name,
			project_id: getProject.id,
			zone: getZone.id
			, Image: Image
		}, { where: { id: id } })

	return UpdateUser
}

exports.multipleStoreFind = async (ids) => {
	const storeFind = await Store.findAll({
		where: { store_code: ids },
		attributes: [ 'id', 'store_code', 'store_name', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id' ],
		raw: true,
		nest: true
	})

	return storeFind
}


exports.updateStoreForUserAssign = async (reqBody, storeCode) => {
	console.log(reqBody, storeCode, "ASSIGNBUG")
	const updateStoreForUserAssign = await Store.update({
		promoter_id: reqBody.promoter_id,
		promoter: reqBody.promoter,
		merchandiser_id: reqBody.merchandiser_id,
		merchandiser: reqBody.merchandiser,
		tl_id: reqBody.tl_id,
		tl: reqBody.tl,
		asm_id: reqBody.asm_id,
		user_id: reqBody.user_id,
		asm: reqBody.asm,
		ta: reqBody.ta,
		ta_id: reqBody.ta_id,
		npm_id: "1",
		npm: "admin"
	}, {
		where: { id: storeCode }
	})

	return updateStoreForUserAssign
}

exports.findCity = async (data) => {
	console.log(data, ":data")
	var Find = await City.findOne({
		where: { city_name: data.city },
		attributes: [ 'id', "city_name" ],
		raw: true,
		nest: true
	})
	return Find
}

exports.findState = async (data) => {
	console.log(data, ":data")
	var Find = await State.findOne({
		where: { state_name: data.state }, attributes: [ 'id', "state_name" ], raw: true,
		nest: true
	})
	return Find
}



exports.getAllStoreZoneWise = async (reqQuery, sort_array, filter_value, reqUser) => {
	let LIMIT = reqQuery.limit * 1;
	let SKIP = (reqQuery.page - 1) * reqQuery.limit;
	if (filter_value != "") {
		//   var regex = new RegExp(filter_value, "i");
		filter_value = {
			[ Op.or ]: [ { "store_name": { [ Op.like ]: `%${filter_value}%` } }, { "project_name": { [ Op.like ]: `%${filter_value}%` } }, { "chain": { [ Op.like ]: `%${filter_value}%` } }, { "zone": { [ Op.like ]: `%${filter_value}%` } }, { "city": { [ Op.like ]: `%${filter_value}%` } }, { "state": { [ Op.like ]: `%${filter_value}%` } } ],
		};
	} else {
		filter_value = {};
	}
	// console.log(filter_value,"filterer")
	let getStore = await Store.findAll({
		where: { zone: reqUser.zone, status: 0 },
		attributes: ['id', 'store_code', 'store_name', 'project_name', 'project_id', 'chain', 'zone', 'city', 'state', 'location', 'promoter_id', 'promoter', 'merchandiser_id', 'merchandiser', 'ta', 'ta_id', 'tl_id', 'tl', 'asm_id', 'asm', 'npm', 'npm_id', 'Image'], raw: true,
		nest: true,
		order: [ sort_array ],
		offset: SKIP,
		limit: LIMIT
	})
	let totalCount = await Store.count({ where: { zone: reqUser.zone, status: 0 } })
	let getCity = await City.findAll({
		raw: true,
		nest: true
	})
	let getZone = await zone.findAll({
		raw: true,
		nest: true
	})
	let getChain = await Chain.findAll({
		raw: true,
		nest: true
	})
	let getState = await State.findAll({
		raw: true,
		nest: true
	})
	let cityAddedData = getStore.map((value) => {
		const found = getCity.find((element) => {
			return element.city_name == value.city;
		});
		// console.log(found.id,"idd")
		value.city_id = found ? found.id : " "

	})
	let chainAddedData = getStore.map((value) => {
		const found = getChain.find((element) => {
			return element.chain_name == value.chain;
		});
		// console.log(found.id,"idd")
		value.chain_id = found ? found.id : " "

	})
	let zoneAddedData = getStore.map((value) => {
		const found = getZone.find((element) => {
			return element.id == value.zone;
		});
		// console.log(found.id,"idd")
		value.zone_name = found ? found.zone_name : " "

	})
	let stateAddedData = getStore.map((value) => {
		const found = getState.find((element) => {
			return element.state_name == value.state;
		});
		// console.log(found.id,"idd")
		value.state_id = found ? found.id : " "

	})

	for (let index = 0; index < getStore.length; index++) {
		const element = getStore[index];
		element.Image = `${process.env.IMAGE_URL}/${element.Image}`

	}
	// console.log(getCity)
	// console.log(getStore,"alla")
	return { data: getStore, count: totalCount }
}
