
let userRepo = require('../repository/user_repo');
const bcrypt = require("bcryptjs");
const { ValidationError } = require("../../../helper/commonResponce");

exports.login = async (reqBody) => {
    try {
        let idArray = [2,3,4,7,9,10,11]
        console.log(reqBody,"serviceslogin")
         let User = await userRepo.findUserByEmail(reqBody.email)
         if (!User) {
            throw new ValidationError(422, { email: 'Email is Invalid' })
        }
        if(idArray.includes(User.role_id) ){
            const isValid = await bcrypt.compare(reqBody.password, User.password)
            if (isValid) return User
            throw new ValidationError(422, { password: 'Password Not Valid' })
        }else{
            throw new ValidationError(422, { Role: "This user Can't Login in Web" })
        }

        // const isValid = await bcrypt.compare(reqBody.password, User.password)
        // if (isValid) return User
        // throw new ValidationError(422, { password: 'Password Not Valid' })

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};