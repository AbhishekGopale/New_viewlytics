const { ValidationError } = require("../../../helper/commonResponce");
const bcrypt = require("bcryptjs");
const authRepo = require('../repository/auth_repo');
const { USER_ROLES, TOKEN_CONFIG } = require('../../../config/application');
const isEmpty = require("../validation/isEmpty");
const crypto = require("crypto");
const UserRelation = require("../models/userRelation");
const User = require("../models/user");
const { Sequelize } = require('../../../config/database')
const City = require('../../web/models/citis');
const State = require('../../web/models/state');
const mail = require("../../../helper/mail");

exports.login = async (reqBody) => {
    try {
        let idArray = [1,8]
        let User
        if(reqBody.user_type == 8){
            User = await authRepo.findUserByEmailSubAdmin(reqBody.email)
        } 
        // else if( reqBody.user_type == 12){
        //     User = await authRepo.findUserByEmailClient(reqBody.email)
        // }
        else if (reqBody.user_type == 1) {
            User = await authRepo.findUserByEmail(reqBody.email)
        } else {
            throw new ValidationError(422, { email: 'You are not authorize to access this route!' }) 
        }
        // let User = await authRepo.findUserByEmail(reqBody.email)
        if (!User) {
            throw new ValidationError(422, { email: 'Email is Invalid' })
        }
        if(idArray.includes(User.role_id)){
            const isValid = await bcrypt.compare(reqBody.password, User.password)
             if (isValid) return User
             throw new ValidationError(422, { password: 'Password Not Valid' })
        }else{
            throw new ValidationError(422, { Role: "This user Can't Login in Admin" })
        }

        // const isValid = await bcrypt.compare(reqBody.password, User.password)
        // if (isValid) return User
        // throw new ValidationError(422, { password: 'Password Not Valid' })

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
};

exports.getRole = async (reqBody) => {
    try{
        // console.log(reqBody,"reeeeeq")
        let getRole = await authRepo.getRole(reqBody);
        return getRole
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.createUser = async (reqBody) => {
    try {
        // Validation
        // if (isEmpty(reqBody.user_npm)) throw new ValidationError(422, { user_npm: 'NPM is required' })

        var saltBecrypt = bcrypt.genSalt(10)
        console.log(reqBody, "body");
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
        // console.log(state,city,"city")
        // return
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        const createUserObj = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            mobile_no: reqBody.mobile_no,
            email: reqBody.email,
            role_id: reqBody.role_id,
            role_name: reqBody.role_name,
            user_name: reqBody.user_name,
            user_id: `ID${randomNumber}`,
            zone: reqBody.zone,
            city: city.city_name,
            state: state.state_name,
            w_off: reqBody.w_off,
            status: reqBody.status
        }

        let userRelationObj = {
            user_role_id: reqBody.role_id,
            user_role_name: reqBody.role_name,
        }

        console.log(userRelationObj, ":userRelationObj")

        if (reqBody.role_id == USER_ROLES['ta']) {
            if (isEmpty(reqBody.user_npm)) throw new ValidationError(422, { user_npm: 'NPM is required' });
            userRelationObj.user_npm = reqBody.user_npm;
            userRelationObj.user_npm = reqBody.user_npm;
        }
        else if (reqBody.role_id == USER_ROLES['asm']) {
            if (isEmpty(reqBody.user_ta)) throw new ValidationError(422, { user_ta: 'TA is required' });
            if (isEmpty(reqBody.user_npm)) throw new ValidationError(422, { user_npm: 'NPM is required' });
            userRelationObj.user_npm = reqBody.user_npm;
            userRelationObj.user_ta = reqBody.user_ta;

        } else if (reqBody.role_id == USER_ROLES[ 'tl' ]) {
            if (isEmpty(reqBody.user_asm)) throw new ValidationError(422, { user_asm: 'ASM is required' });
            if (isEmpty(reqBody.user_ta)) throw new ValidationError(422, { user_ta: 'TA is required' });
            if (isEmpty(reqBody.user_npm)) throw new ValidationError(422, { user_npm: 'NPM is required' });
            userRelationObj.user_asm = reqBody.user_asm;
            userRelationObj.user_npm = reqBody.user_npm;
            userRelationObj.user_ta = reqBody.user_ta;
        } else if (reqBody.role_id == USER_ROLES[ 'promoter' ] || reqBody.role_id == USER_ROLES[ 'merchandiser' ]){
            if (isEmpty(reqBody.user_tl)) throw new ValidationError(422, { user_tl: 'TL is required' });
            if (isEmpty(reqBody.user_asm)) throw new ValidationError(422, { user_asm: 'ASM is required' });
            if (isEmpty(reqBody.user_ta)) throw new ValidationError(422, { user_ta: 'TA is required' });
            if (isEmpty(reqBody.user_npm)) throw new ValidationError(422, { user_npm: 'NPM is required' });
            // if (isEmpty(reqBody.user_tl)) throw new ValidationError(422, { user_tl: 'TL is required' });
            userRelationObj.user_tl = reqBody.user_tl;
            userRelationObj.user_asm = reqBody.user_asm;
            userRelationObj.user_ta = reqBody.user_ta;
            userRelationObj.user_npm = reqBody.user_npm;
        }

        let saltGeneratedPassword = await saltBecrypt

        console.log(saltGeneratedPassword, ":err")
        var HashPassword = await bcrypt.hash(reqBody.password, saltGeneratedPassword)

        createUserObj.password = HashPassword;

        let createdUser = await authRepo.createUser(createUserObj);
        userRelationObj.user_id = createdUser.id

        let user_relation = await authRepo.createUserRelation(userRelationObj)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getUser = async (reqQuery, sort_array, filter_value) => {
    try {

        let GetUser = await authRepo.getAllUser(reqQuery, sort_array, filter_value)
        return GetUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.getAllUser = async () => {
    try {

        let GetUser = await authRepo.getAllUserId()
        return GetUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}



exports.getfilterUser = async (filter_value) => {
    try{
        let GetUser = await authRepo.getAllUserFilter(filter_value)
        return GetUser
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.getUserByID = async (id) => {
    try {

        let GetUser = await authRepo.getUserByID(id)
        return GetUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.updateUser = async (id, reqBody) => {
    try {

        await authRepo.updateUser(id, reqBody)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.updateProfile = async (id, image, reqBody) => {
    try {

        await authRepo.updateProfile(id, image, reqBody)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.updateClientProfile = async (id, image, reqBody) => {
    try {

        await authRepo.updateClientProfile(id, image, reqBody)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.updateSubAdminProfile = async (id, image, reqBody) => {
    try {

        await authRepo.updateSubAdminProfile(id, image, reqBody)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteUser = async (id) => {
    try {

        await authRepo.deleteUser(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await authRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.forgotPassword = async (email) => {
    try {

        const User = await authRepo.forgotPassword(email);
        if (!User) {
            throw new ValidationError(422, { email: 'Email is Invalid' })
        }

        var token = crypto.randomBytes(20).toString("hex");
        var link = TOKEN_CONFIG.resetpassword_local_url + token;
        const UpdateUser = await User.update(
            {
                reset_passtoken: token,
                token_expire: Date.now()
            }, { where: { email: email } }
        );
        let option = {
            email:email,
            link:link
        }

        await mail.send2(option)

        console.log(link, "link")

        return link
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.validToken = async (token, reqBody) => {
    try {
        // console.log(token,"authservi")
        const validToken = await authRepo.validToken(token, reqBody);
        console.log(validToken,"valdTokenne")
        if(!validToken){
            console.log("flassslslsl")
            throw new ValidationError(422, { token: 'Token is invalid' }) 
        }
        return validToken
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.notificationStatus = async (id, notifications_status) => {
    try {

        await authRepo.notification_status(id, notifications_status)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.TLLIST = async () => {
    try {

        var GetAllTL = await authRepo.TLList()
        return GetAllTL

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.mercList = async () => {
    try {
        var GetAllMercList = await authRepo.MercList()
        return GetAllMercList
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.proList = async () => {
    try {
        var GetAllproList = await authRepo.proList()
        return GetAllproList
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getRoleWiseUsersForFilter = async (role_name = 'tl') => {
    try {
        // let getData =  await authRepo.getUsersRelationForFilter(role_name);

        let getNpmId = 33

        if (role_name == 'promoter') {
            let result = await UserRelation.findAll({
                where: {
                    user_tl: {
                        [ Sequelize.Op.ne ]: null
                    },
                    user_asm: {
                        [ Sequelize.Op.ne ]: null
                    }
                },
                include: [ {
                    model: User,
                    as: 'UserTlId',
                    attributes: [ 'id', [ Sequelize.fn('concat', Sequelize.col('UserTlId.first_name'), ' ', Sequelize.col('UserTlId.last_name')), 'full_name' ] ]
                }, {
                    model: User,
                    as: 'UserAsmId',
                    attributes: [ 'id', [ Sequelize.fn('concat', Sequelize.col('UserAsmId.first_name'), ' ', Sequelize.col('UserAsmId.last_name')), 'asm_full_name' ] ]
                } ],
                nest: true,
                raw: true,
                attributes: [ 'user_tl', 'user_asm' ]
            })

            let getDropDownData = result.map(value => {
                return {
                    "label": value.UserTlId.full_name,
                    "value": value.UserTlId.id,
                    "parent_user_label": value.UserAsmId.asm_full_name,
                    "parent_user_value": value.UserAsmId.id
                }
            })

            return getDropDownData;
        } else if (role_name == 'tl') {
            let result = await UserRelation.findAll({
                where: {
                    user_asm: {
                        [ Sequelize.Op.ne ]: null
                    }
                },
                include: [ {
                    model: User,
                    as: 'UserAsmId',
                    attributes: [ 'id', [ Sequelize.fn('concat', Sequelize.col('UserAsmId.first_name'), ' ', Sequelize.col('UserAsmId.last_name')), 'asm_full_name' ] ]
                } ],
                nest: true,
                raw: true,
                attributes: [ 'user_asm' ]
            })
            let getDropDownData = result.map(value => {
                return {
                    "label": value.UserAsmId.asm_full_name,
                    "value": value.UserAsmId.id
                }
            });
            return getDropDownData;
        }
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.asmList = async () => {
    try {

        var GetAllasmList = await authRepo.ASMList()
        return GetAllasmList

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.taList = async () => {
    try{
        console.log("talistservi")
        var GetAlltaList = await authRepo.taList()
        return GetAlltaList
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}
exports.npmList = async () => {
    try{
        console.log("talistservi")
        var GetAllnpmList = await authRepo.npmList()
        return GetAllnpmList
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.isLogin = async (user) => {
    try {

        var updateIsLogin = await authRepo.updateIsLogin(user)
        return updateIsLogin

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.logout = async (id) => {
    try {

        var Logout = await authRepo.logout(id)
        return Logout

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getSubAdmin = async (reqQuery, sort_array, filter_value) => {
    try {

        let GetUser = await authRepo.getAllUser(reqQuery, sort_array, filter_value)
        return GetUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}


exports.getZoneUser = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {

        let getZoneUser = await authRepo.getZoneUser(reqQuery, sort_array, filter_value, reqUser)
        return getZoneUser

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}