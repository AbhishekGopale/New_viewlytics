let userModel = require('../../admin/models/user')
let Role = require('../../admin/models/role')
let ClientModel = require('../../admin/models/client')

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
    console.log(user,"ususus")
    if(!user){
        let user = await ClientModel.findOne({
            where: { email: email },
            attributes: ['id', 'email', 'mobile_no', 'role_id', 'role_name', 'password', 'first_name'],
            include: [{
                model: Role,
                attributes: ['role_id', 'role_name'],
            }],
    
            raw: true,
            nest: true
        });
        return user;
    }
	return user;
}