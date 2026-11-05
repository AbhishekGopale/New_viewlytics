const authServices = require("../../services/auth.services");
const { commonResponse, commonFunctions, customErrorResponse } = require("../../../../helper");
const userModel = require("../../../admin/models/user")
const validateLoginInput = require("../../validation/loginvalidation");
const validateForgotPassword = require("../../validation/forgotpasswordvalidation.js");
const validateResetPassword = require("../../validation/resetpassword.validation");
const validatChangePassword = require("../../validation/changepassword.validation.js");
const adminAuthServices = require('../../../admin/services/user_service')
const validateOTP = require("../../validation/sendOTP.js");
const isEmpty = require("../../../isEmpty");
const bcrypt = require("bcryptjs");
const { ValidationError } = require("../../../../helper/commonResponce");
const jwt = require('jsonwebtoken');
const { JWT_CONFIG } = require("../../../../config/application");

module.exports = {

    signin: async (req, res, next) => {
        try {
            console.log("111")
            const { errors, isValid } = validateLoginInput(req.body);

            if (!isValid) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            const User = await authServices.login(req.body);

            // console.log(User, ":User")
            if (User.role_id === 1 || User.role_id === 2 || User.role_id === 3) {
                return commonResponse.customErrorResponse(res, 500, "This User can't Login In Mobile");
            }

            if (User) {
                const token = "Bearer " + jwt.sign({
                    id: User.id,
                    email: User.email,
                    role_name: User.role_name,
                    role_id: User.role_id,
                    mobile_No: User.mobile_no
                },
                    JWT_CONFIG.secretKey,
                    { expiresIn: JWT_CONFIG.AppexpiresIn });
                return commonResponse.success(res, 200, "Successfully Login", {
                    id: User.id,
                    email: User.email,
                    role_name: User.role_name,
                    role_id: User.role_id,
                    mobile_No: User.mobile_no,
                    token: token,
                });
            }
        } catch (error) {
            console.log('error------> ', error)
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
            return commonResponse.customErrorResponse(res, 501, "Something went wrong");
        }

    },

    forgotPassword: async (req, res, next) => {
        try {

            const { email } = req.body;
            const { errors, isValid } = validateForgotPassword(req.body);

            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            const user = await authServices.findUser(email);

            if (user) {
                return commonResponse.success(res, 200, "We have e-mailed your password reset link!", {
                    resetpass_link: user
                })
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    resetPassword: async (req, res, next) => {
        try {

            var token = req.params.token;
            const { errors, isValid } = validateResetPassword(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            console.log(req.body, ":req.body")


        } catch (error) {
            console.log(error, "--> Catch error");
            return next(error);
        }
    },

    sendOtp: async (req, res, next) => {
        try {

            const { mobile } = req.body;
            const { errors, isValid } = validateOTP(req.body);

            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            const user = await authServices.findMobile(mobile);
            if (user) {
                return commonResponse.success(res, 200, "OTP send successfully !", {
                    mobile: mobile,
                    otp_code: user,
                })
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    resendOtp: async (req, res, next) => {
        try {
            const { mobile } = req.body;
            const { errors, isValid } = validateOTP(req.body);

            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            const user = await authServices.resendOTP(mobile);
            if (user) {
                return commonResponse.success(res, 200, "OTP resend successfully !", {
                    mobile: mobile,
                    otp_code: user,
                })
            }

        } catch (error) {
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    profile: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var id = req.user.id
            const userProfile = await authServices.userProfile(id);

            var firstName = userProfile.first_name
            const FirstNameUC = firstName.charAt(0).toUpperCase() + firstName.slice(1);

            var lastname = userProfile.last_name
            const LastNameUC = lastname.charAt(0).toUpperCase() + lastname.slice(1);
            if (userProfile) {
                return commonResponse.success(res, 200, "user Profile fetch successfully !", {
                    userProfile: {
                        id: userProfile.id,
                        email: userProfile.email,
                        first_name: FirstNameUC,
                        last_name: LastNameUC,
                        mobile_no: userProfile.mobile_no,
                        role_id: userProfile.role_id,
                        role_name: userProfile.role_name,
                        gender: userProfile.gender,
                        dob: userProfile.dob,
                        profile_image: userProfile.profile_image ? `http://35.73.254.5//media/upload/${userProfile.profile_image}` : null
                    }
                })
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    updateProfile: async (req,res,next) => {
        try{
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
            console.log(req.user,"req.userere")
            console.log(req.file,"fiflflflf")
            let Id = req.user.id
            let imageName = req.file.filename
            let updateProfile = await authServices.updateProfile(Id, imageName);
            if (updateProfile) {
                return commonResponse.success(res, 200, "Profile Updated Succesfully");
            }
        }catch(error){
            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    resetPasswordProfile: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var id = req.user.id
            let { current_password, new_password, confirm_password } = req.body;

            console.log(req.body, 'req.body')
            var { errors, isValid } = validatChangePassword(req.body);
            if (!isValid || !isEmpty(errors)) {
                return commonResponse.customErrorResponse(res, 422, "Something went wrong", errors);
            }

            var changePassword = await authServices.changePassword(id, req.body)
            console.log(changePassword)
            if (changePassword) {
                return commonResponse.success(res, 200, "Password successfully changed!", {
                    changePassword
                })
            }

        } catch (error) {

            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    removeACC: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }

            var id = req.user.id

            var removeAccount = await authServices.removeACC(id)
            if (removeAccount) {
                return commonResponse.success(res, 200, "User Delete !", "user account deleted successfully")
            }
        } catch (error) {

            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    },

    Logout: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.json({
                    error: true,
                    statusCode: 401,
                    message: "Invalid login!",
                    errors: "You are not a user,you can not able to action on this module!",
                });
            }
    
            var id = req.user.id;
    
            var UpdateLoginStatus = await adminAuthServices.logout(id)
            if (UpdateLoginStatus) {
                return commonResponse.success(res, 200, "Logout Successfully!");
            }
        } catch (error) {

            if (error instanceof ValidationError) {
                return commonResponse.customErrorResponse(res, error.errorCode, "Something went wrong", error.errorMessage);
            }
            next(error);
        }
    }


}
