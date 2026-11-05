const userModel = require("../models/user");
const subAdminModel = require("../models/subadmin");
const clientModel = require("../models/client");
const Role = require("../models/role");
const zoneModel = require("../models/zone");
const User = require("../models/user");
const State = require("../../web/models/state");
const City = require("../../web/models/citis");
const UserRelation = require("../models/userRelation");
const { Op } = require('sequelize')
const moment = require('moment')
const bcrypt = require('bcryptjs')

exports.findUserByEmail = async (email) => {
	let user = await userModel.findOne({
		where: { email: email },
		attributes: ['id', 'email', 'mobile_no', 'role_id', 'role_name', 'password', 'first_name', 'profile_image'],
		include: [{
			model: Role,
			attributes: ['role_id', 'role_name'],
		}],

		raw: true,
		nest: true
	});
	return user;
}
exports.findUserByEmailSubAdmin = async (email) => {
	let user = await subAdminModel.findOne({
		where: { email: email },
		attributes: ['id', 'email', 'mobile_no', 'role_id', 'role_name', 'password','role_permission', 'first_name','zone',"profile_image"],
		include: [{
			model: Role,
			attributes: ['role_id', 'role_name'],
		}],

		raw: true,
		nest: true
	});
	// console.log(user,"subadmin")
	return user;
}
exports.findUserByEmailClient = async (email) => {
	let user = await clientModel.findOne({
		where: { email: email },
		attributes: ['id', 'email', 'mobile_no', 'role_id', 'role_name', 'password', 'first_name','project_id','project_name'],
		include: [{
			model: Role,
			attributes: ['role_id', 'role_name'],
		}],

		raw: true,
		nest: true
	});
	// console.log(user,"subadmin")
	return user;
}

exports.getRole = async (Id) => {
	// console.log(reqBody,"poopopo")
	let getRole = await User.findOne({
		where:{id:Id},
		attributes:["id","user_name","role_name","first_name","last_name"],
		raw: true ,
		nest: true
	})
	return getRole
}

exports.createUser = async (data) => {
	return await User.create(data, { raw: true })
}

exports.createUserRelation = async (data) => {
	return await UserRelation.create(data, { raw: true })
}

exports.getAllUser = async (reqQuery, sort_array, filter_value) => {
	let LIMIT = reqQuery.limit * 1;
	let SKIP = (reqQuery.page - 1) * reqQuery.limit;
	if (filter_value != "") {
		//   var regex = new RegExp(filter_value, "i");
		filter_value = {
			[Op.or]: [{ "role_name": { [Op.like]: `%${filter_value}%` } }, { "state": { [Op.like]: `%${filter_value}%` } }, { "zone": { [Op.like]: `%${filter_value}%` } }, { "city": { [Op.like]: `%${filter_value}%` } },{ "user_name": { [Op.like]: `%${filter_value}%` } },{ "user_id": { [Op.like]: `%${filter_value}%` } }],
		};
	} else {
		filter_value = {};
	}
	let getUsers = await User.findAll({
		where: filter_value,
		attributes: ['id', 'email', 'first_name', 'last_name', 'user_name','user_id','mobile_no', 'role_id', 'role_name', 'zone', 'city', 'state', 'w_off','status'], raw: true,
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
	});
	const getUser = getUsers.filter(user => user.role_id !== 1);
	let totalCount = await User.count({})
	let getCity = await City.findAll({
		raw: true,
		nest: true
	})
	let getState = await State.findAll({
		raw: true,
		nest: true
	})
	let cityAddedData = getUser.map((value) => {
		const found = getCity.find((element) => {
			return element.city_name == value.city;
		});
		// console.log(found.id,"idd")
		value.city_id = found ? found.id : " "

	})
	let stateAddedData = getUser.map((value) => {
		const found = getState.find((element) => {
			return element.state_name == value.state;
		});
		// console.log(found.id,"idd")
		value.state_id = found ? found.id : " "

	})
	let nameChange = getUser.map((value) => {
		value.name = value.first_name + " " + value.last_name
	})
	console.log(getUser)
	// console.log(getStore,"alla")
	return { data: getUser, count: totalCount }
}

exports.getAllUserId = async () => {
	try{
		let getUser = await User.findAll({
			attributes: ['id','user_name','user_id','first_name','last_name'], raw: true,
			nest: true,
		})
		getUser.shift();
		return getUser
	}catch(error){
		console.log(error)
	}
}

exports.getAllUserFilter = async (filter_value) => {
	if (filter_value != "") {
	//   var regex = new RegExp(filter_value, "i");
		filter_value = {
		[Op.or]: [{ "first_name":{ [Op.like]: `%${filter_value}%` } },{ "last_name":{ [Op.like]: `%${filter_value}%` } }],
		};
	} else {
		filter_value = {};
	}
	let getUser = await User.findAll({
		where:filter_value,
		attributes: ['id', 'email', 'first_name', 'last_name'], raw: true,
		nest: true,
	})
	return getUser;
}

exports.getUserByID = async (id) => {

	console.log(id)
	let GetUser = await User.findOne({
		where: { id: id },
		attributes: ['id', 'email', 'first_name', 'last_name','user_name','user_id' ,'mobile_no', 'role_id', 'role_name', 'zone', 'city'],
		include: [{
			model: Role,
			attributes: ['role_id', 'role_name'],
		}],
		raw: true,
		nest: true
	},
	)


	let FindUserRelationalData = await UserRelation.findOne({
		where: { user_id: id }, raw: true,
		include: [
			{
				model: User,
				as: 'UserAsmId',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'UserTlId',
				attributes: ['id', 'first_name', 'last_name']
			},],
		nest: true
	})



	return { GetUser, FindUserRelationalData }
}



exports.updateUser = async (id, reqBody) => {
	// console.log(id)
	// console.log(reqBody, '-reqBody------')
	// return;
	let city = await City.findOne({
		where: { id: reqBody.city },
		raw: true,
		nest: true
	})
	let state = await State.findOne({
		where: { id: reqBody.state },
		raw: true,
		nest: true
	})
	// console.log(city,state)
	// return;
	const UpdateUser = await User.update(
		{
			first_name: reqBody.first_name,
			last_name: reqBody.last_name,
			mobile_no: reqBody.mobile_no,
			email: reqBody.email,
			role_id: reqBody.role_id,
			role_name: reqBody.role_name,
			user_name:reqBody.user_name,
			zone: reqBody.zone,
			city: city.city_name,
			state: state.state_name,
			w_off: reqBody.w_off,
			status: reqBody.status

		}, { where: { id: id } })

	return UpdateUser
}

exports.updateProfile = async (id, image, reqBody) => {
	const UpdateUser = await User.update(
		{
			first_name: reqBody.first_name,
			last_name: reqBody.last_name,
			mobile_no: reqBody.mobile_no,
			email: reqBody.email,
			dob: reqBody.dob,
			gender: reqBody.gender,
			profile_image: image
		}, { where: { id: id } })

	return UpdateUser
}
exports.updateSubAdminProfile = async (id, image, reqBody) => {
	const UpdateUser = await subAdminModel.update(
		{
			first_name: reqBody.first_name,
			last_name: reqBody.last_name,
			mobile_no: reqBody.mobile_no,
			email: reqBody.email,
			dob: reqBody.dob,
			gender: reqBody.gender,
			profile_image: image
		}, { where: { id: id } })

	return UpdateUser
}
exports.updateClientProfile = async (id, image, reqBody) => {
	const UpdateUser = await clientModel.update(
		{
			first_name: reqBody.first_name,
			last_name: reqBody.last_name,
			mobile_no: reqBody.mobile_no,
			email: reqBody.email,
			dob: reqBody.dob,
			gender: reqBody.gender,
			profile_image: image
		}, { where: { id: id } })

	return UpdateUser
}

exports.deleteUser = async (id) => {


	var userRelationData = await UserRelation.destroy({
		where: { user_id: id }
	})

	let deletUser = await User.destroy({
		where: { id: id }
	})

	return deletUser
}

exports.deleteMany = async (id) => {
	var userRelationData = await UserRelation.destroy({
		where: { user_id: id }
	})
	let deletMultipleUser = await User.destroy({
		where: { id: id }
	})

	return deletMultipleUser
}

exports.forgotPassword = async (email) => {
	let forgotPass = await User.findOne({
		where: { email: email },
	});

	return forgotPass
}

exports.validToken = async (token, reqBody) => {
	try {
		// console.log(moment().format('YYYY-MM-DD'))
		todayDate = moment().format('YYYY-MM-DD')
		// console.log(token,"token")
		// console.log(reqBody.password)
		const userData = await User.findOne({
			where: { reset_passtoken: token },
			raw: true,
			nest: true
		})
		console.log(userData)
		if (userData == null) {
			console.log("false")
			return false
		}


		var saltBecrypt = bcrypt.genSalt(10)
		let saltGeneratedPassword = await saltBecrypt
		let hashPassword = await bcrypt.hash(reqBody.password, saltGeneratedPassword)
		// console.log(hashPassword,"uiiui")
		const UpdatePassword = await User.update(
			{
				password: hashPassword,
				reset_passtoken: ""

			}, { where: { id: userData.id } }
		)
		return UpdatePassword
	} catch (error) {
		console.log(error)
	}
}

exports.notification_status = async (id, notifications_status) => {

	var Notification = notifications_status === "false" ? "1" : "0"

	let UpdateStatus = await User.update({
		notification_status: Notification
	},
		{ where: { id: id } })

	return UpdateStatus
}

exports.ASMList = async () => {
	let ASM = await UserRelation.findAll({
		where: { user_role_id: 3, user_role_name: "asm" },
		attributes: [],
		include: [
			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})

	console.log(ASM, ":ASM")

	return ASM
}

exports.taList = async () => {
	let ta = await UserRelation.findAll({
		where: { user_role_id: 7, user_role_name: "ta" },
		attributes: [],
		include: [
			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'UserNpmId',
				attributes: ['id', 'first_name', 'last_name']
		    }
	    ],
		raw: true,
		nest: true
	})

	console.log(ta, ":ta")

	return ta
};


exports.npmList = async () => {
	let npm = await  User.findAll({
		where:{role_id:"2"},
		attributes: ['id', 'first_name','last_name'],
		raw: true,
		nest: true
	})
	console.log(npm,"npmm")
	return npm;
}

exports.TLList = async () => {
	let Tl = await UserRelation.findAll({
		where: { user_role_id: 4, user_role_name: "tl" },
		attributes: [],
		include: [{
			model: User,
			as: 'UserTAId',
			attributes: ['id', 'first_name', 'last_name']
		},
			{
				model: User,
			as: 'UserAsmId',
			attributes: ['id', 'first_name', 'last_name']
		},
			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})



	return Tl
}

exports.MercList = async () => {
	let Merchandiser = await UserRelation.findAll({
		where: { user_role_id: 5, user_role_name: "merchandiser" },
		attributes: [],
		include: [
			{
				model: User,
				as: 'UserTAId',
				attributes: ['id', 'first_name', 'last_name']
			}, {
				model: User,
			as: 'UserAsmId',
			attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'UserTlId',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})


	return Merchandiser
}



exports.proList = async () => {
	let Promoter = await UserRelation.findAll({
		where: { user_role_id: 6, user_role_name: "promoter" },
		attributes: [],
		include: [
			{
			model: User,
				as: 'UserTAId',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'UserAsmId',
				attributes: ['id', 'first_name', 'last_name']
			},
			{
				model: User,
				as: 'UserTlId',
				attributes: ['id', 'first_name', 'last_name']
			},

			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name']
			}],
		raw: true,
		nest: true
	})


	return Promoter
}

exports.updateIsLogin = async (user) => {
	var UpdateLoginStatus = await userModel.update(
		{ is_login: "1" }, {
		where: { id: user.id },
	})
	console.log(UpdateLoginStatus, "--->user0")
	return UpdateLoginStatus
}

exports.logout = async (id) => {
	var Logout = await userModel.update(
		{ is_login: "0" }, {
		where: { id: id },
	})

	return Logout
}

exports.getZoneUser = async (reqQuery, sort_array, filter_value, reqUser) => {
	if (filter_value != "") {
		//   var regex = new RegExp(filter_value, "i");
		filter_value = {
			[Op.or]: [{ "first_name": { [Op.like]: `%${filter_value}%` } }, { "last_name": { [Op.like]: `%${filter_value}%` } }],
		};
	} else {
		filter_value = {};
	}
	let LIMIT = reqQuery.limit * 1;
	let SKIP = (reqQuery.page - 1) * reqQuery.limit;
	console.log(reqUser.zone, ":reqUser.zone")
	let getUser = await User.findAll({
		where: { zone: reqUser.zone },
		attributes: ['id', 'email', 'first_name', 'last_name', 'user_name', 'user_id', 'mobile_no', 'role_id', 'role_name', 'zone', 'city', 'state', 'w_off', 'status'], raw: true,
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
	let totalCount = await User.count({})
	let getCity = await City.findAll({
		raw: true,
		nest: true
	})
	let getState = await State.findAll({
		raw: true,
		nest: true
	})
	let cityAddedData = getUser.map((value) => {
		const found = getCity.find((element) => {
			return element.city_name == value.city;
		});
		// console.log(found.id,"idd")
		value.city_id = found ? found.id : " "

	})
	let stateAddedData = getUser.map((value) => {
		const found = getState.find((element) => {
			return element.state_name == value.state;
		});
		// console.log(found.id,"idd")
		value.state_id = found ? found.id : " "

	})
	let nameChange = getUser.map((value) => {
		value.name = value.first_name + " " + value.last_name
	})
	console.log(getUser)
	// console.log(getStore,"alla")
	return { data: getUser, count: totalCount }
}








// exports.getUsersRelationForFilter = async (role_name) => {
// 	var result = await UserRelation.findAll({
// 		include: [{
// 			model: User,
// 			attributes: ['id','role_id','role_name']
// 		}],
// 		attributes: ['user_tl','user_asm','user_npm'],
// 		raw: true,
// 		nest: true
// 	});

// 	return result;
// }
