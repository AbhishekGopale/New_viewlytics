const userModel = require("../../admin/models/user");


exports.findUserByEmail = async (email) => {
	let user = await userModel.findOne({
		where: { email:email },
		attributes: ['id', 'email', 'mobile_no', 'role_id', 'role_name', 'password'],
		// include: [{
		// 	model: Role,
		// 	attributes: ['role_id', 'role_name'],
		// }],
		raw: true,
		nest: true
	});
	// console.log(user,"useer")

	return user;
}