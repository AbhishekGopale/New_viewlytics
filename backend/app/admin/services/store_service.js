const { Sequelize } = require('../../../config/database');
const storeRepo = require('../repository/store_repo');
const projectModel = require('../models/project');
const zoneModel = require('../models/zone');
const https = require('https');
const fs = require('fs');
const path = require('path');


exports.createStore = async (reqBody, Image) => {
	try {

console.log(reqBody,Image , "image;:::::::::::")

		let findProject = await projectModel.findAll({
			attributes: ['id', 'project_name', "image"], raw: true,
            nest: true,
        })

		let allZone = await zoneModel.findAll({
			attributes: ['id', 'zone_name'], raw: true,
            nest: true,
		})

		let validateData = reqBody.map((value,index) => {
			if(Image === undefined){

				var imageName = `store${index}.jpg`;
				var file = fs.createWriteStream(path.join(__dirname + `../../../../public/upload/${imageName}`));
				https.get(value.Image, response => {
					response.pipe(file);
				  
					file.on('finish', () => {
					  file.close();
					  console.log(`Image downloaded as ${imageName}`);
					});
				  }).on('error', err => {
					fs.unlink(imageName);
					console.error(`Error downloading image: ${err.message}`);
				  });
			}

			const project = findProject.find((elements) => {
                return elements.project_name == value.project_name
            });
			const zone = allZone.find((elements) => {
                return elements.zone_name == value.zone
            });
			
			return {
				store_code: 'store_code' ? value.store_code : null,
				chain: 'chain' ? value.chain : null,
				zone: zone ? zone.id : null,
				city: 'city' in  value ? value.city : null,
				state: 'state' ? value.state : null,
				store_name: 'store_name' ? value.store_name : null,
				location: 'location' ? value.location : null,
				project_id: project.id,
				project_name: project.project_name,
				Image: Image ? Image : imageName,
				// image_name: imageName
			}
		});

		console.log(validateData, ":location");
		// return;
		let Store = await storeRepo.createStoreInBulkOrSingle(validateData);

		return Store
	} catch (error) {
		console.log(error, "--------------------------------error-----------------------------------------")
		console.log('error  ', error instanceof Sequelize.AggregateError)
        throw error;
	}
}

exports.getAllStore = async (reqQuery,sort_array,filter_value) => {
	try {
		// console.log(reqQuery,sort_array,filter_value,"reqservicess")
		let getStore = await storeRepo.getAllStore(reqQuery,sort_array,filter_value)
		// console.log(getStore)
		return getStore

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}
exports.getAllStoreDropdown = async () => {
	try {
		// console.log(reqQuery,sort_array,filter_value,"reqservicess")
		let getStore = await storeRepo.getAllStoredropdown()
		// console.log(getStore)
		return getStore

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.getAllStoreUser = async (id) => {
	try{
		let getStore = await storeRepo.getAllUserStore(id)
		// console.log(getStore)
		return getStore
	}catch(error){
		console.log('error  ', error)
		throw error;
	}
}
exports.getAllStoreCity = async (city) => {
	try{
		let getStore = await storeRepo.getAllCityStore(city)
		// console.log(getStore)
		return getStore
	}catch(error){
		console.log('error  ', error)
		throw error;
	}
}
exports.getAllStoreDropdownbyid = async (reqQuery) => {
	try {
		// console.log(reqQuery,sort_array,filter_value,"reqservicess")
		console.log(reqQuery,"reqQuery")
		let getStore = await storeRepo.getAllStoredropdownbyId(reqQuery)
		// console.log(getStore)
		return getStore

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.getStoreByID = async (id) => {
	try {

		let GetStore = await storeRepo.getStoreByID(id)
		return GetStore

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.deleteStore = async (id) => {
	try {

		await storeRepo.deleteStore(id)
		return true

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.deleteMany = async (id) => {
	try {

		await storeRepo.deleteMany(id)
		return true

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.update = async (id, reqBody, Image) => {
	try {
		await storeRepo.updateStore(id, reqBody, Image)
		return true
	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

exports.citystateID = async (data) => {
	try {

		var City = await storeRepo.findCity(data)
		var State = await storeRepo.findState(data)

		return { City, State }

	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}


exports.getAllStoreZoneWise = async (reqQuery, sort_array, filter_value, reqUser) => {
	try {
		let getAllStoreZoneWise = await storeRepo.getAllStoreZoneWise(reqQuery, sort_array, filter_value, reqUser)
		return getAllStoreZoneWise
	} catch (error) {
		console.log('error  ', error)
		throw error;
	}
}

