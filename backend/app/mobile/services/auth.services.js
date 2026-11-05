
const { ValidationError } = require("../../../helper/commonResponce");
const bcrypt = require("bcryptjs");
const authRepo = require('../repository/auth_repo');
const crypto = require("crypto");
const { TOKEN_CONFIG } = require("../../../config/application");
const userModel = require("../../admin/models/user")
const clientModel = require("../../admin/models/client")
const subAdminModel = require("../../admin/models/subadmin")

exports.login = async (reqBody) => {
    try {
        // console.log(reqBody)
        let User = await authRepo.findUserByEmail(reqBody.email)

        if (!User) {
            throw new ValidationError(422, { email: 'Email is Invalid' })
        }

        const isValid = await bcrypt.compare(reqBody.password, User.password)
        if (isValid) return User
        throw new ValidationError(422, { password: 'Password Not Valid' })

    } catch (error) {
        console.log('error  ',error)
        throw error;
    }
};

exports.updateProfile = async (id, image) => {
    try{
        console.log(id,image,"repeoeoe")
        const UpdateUser = await userModel.update(
            {
                profile_image: image
            }, { where: { id: id } })
    
        return UpdateUser
    }catch(error){
        console.log(error, " -->error")
        throw error;
    }
}

exports.findUser = async (email) => {
    try {

        console.log(email, "email")
        const User = await userModel.findOne({
            where: { email: email },
        });

        if (!User) {
            throw new ValidationError(422, { email: 'Email is Invalid' })
        }

        var token = crypto.randomBytes(20).toString("hex");
        var link = TOKEN_CONFIG.resetpassword_local_url + token;

        return link
    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
};

exports.findMobile = async (mobile) => {
    try {
        console.log(mobile, ":mobile")
        let find_user = await userModel.findOne({ where: { mobile_no: mobile }, attributes: ["mobile_no"] });

        if (!find_user) {
            throw new ValidationError(422, { email: 'Mobile Number is not register' })
        }

        let otp = 1234;
        return otp

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}

exports.resendOTP = async (mobile) => {
    try {
        let find_user = await userModel.findOne({ where: { mobile_no: mobile }, attributes: ["mobile_no"] });

        if (!find_user) {
            throw new ValidationError(422, { email: 'Mobile Number is not register' })
        }

        let otp = 1234;
        return otp

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}

exports.userProfile = async (id) => {
        try {

            let find_user = await userModel.findOne({ where: { id: id }, attributes: ['id', 'email', 'first_name', 'last_name', 'mobile_no', 'role_id', 'role_name', 'gender','dob','profile_image'] ,  raw: true,
            nest: true});
            if (!find_user) {
                throw new ValidationError(422, { id: 'Id does not valid!' })
            }
            return find_user

        } catch (error) {
            console.log(error, " -->error")
            throw error;
        }
}
exports.clientProfile = async (id) => {
        try {

            let find_user = await clientModel.findOne({ where: { id: id }, attributes: ['id', 'email', 'first_name', 'last_name', 'mobile_no', 'role_id', 'role_name', 'gender','dob','profile_image'] ,  raw: true,
            nest: true});
            if (!find_user) {
                throw new ValidationError(422, { id: 'Id does not valid!' })
            }
            return find_user

        } catch (error) {
            console.log(error, " -->error")
            throw error;
        }
}
exports.subAdminProfile = async (id) => {
        try {

            let find_user = await subAdminModel.findOne({ where: { id: id }, attributes: ['id', 'email', 'first_name', 'last_name', 'mobile_no', 'role_id', 'role_name','gender','dob','profile_image'] ,  raw: true,
            nest: true});
            if (!find_user) {
                throw new ValidationError(422, { id: 'Id does not valid!' })
            }
            return find_user

        } catch (error) {
            console.log(error, " -->error")
            throw error;
        }
}

exports.changePassword = async (id, reqBody) => {
    try {

        var verifyUser = await userModel.findOne({
            where: { id: id },
            attributes: ['password'],
            raw: true,
            nest: true
        })

        const isValid = await bcrypt.compare(reqBody.current_password, verifyUser.password)

        console.log(isValid, ":isValid")

        if (isValid) {
            var saltBecrypt = await bcrypt.genSalt(10)

            console.log(saltBecrypt, ":err")
            var HashPassword = await bcrypt.hash(reqBody.password, saltBecrypt)

            console.log(HashPassword, ":hash")
            let updatePassword = await userModel.update({
                password: HashPassword
            },
                {
                    where: { id: id }
                })

            return updatePassword
        } else {
            throw new ValidationError(422, { password: 'Current Password Not Valid' })
        }



    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}

exports.removeACC = async (id) => {
    try {

        var deleteUserFunc = await userModel.destroy({ where: { id: id } })

        return deleteUserFunc

    } catch (error) {
        console.log(error, " -->error")
        throw error;
    }
}