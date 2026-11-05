import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { AdminLoginAPI, AdminProfileUpdateAPI, ForgotPasswordAPI, changePasswordApi, getProfileDetailsApi, resetPasswordApi, webLoginApi } from '../../../service/api';
// const accessToken = JSON.parse(localStorage.getItem('accessToken'));
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		isError: false,
		userData: null,
		forgotPassData: null,
		profileUpdateData: null,
		// token: null,
		token: JSON.parse(sessionStorage.getItem('accessToken')) ? JSON.parse(sessionStorage.getItem('accessToken')) : null,
		// roleName: null,
		roleName: JSON.parse(sessionStorage.getItem('roleName')),
		roleId: JSON.parse(sessionStorage.getItem('roleId')) ? JSON.parse(sessionStorage.getItem('roleId')) : null,
		// roleName: JSON.parse(sessionStorage.getItem('roleName')) ? JSON.parse(sessionStorage.getItem('roleName')) : null,
		// roleName: JSON.parse(localStorage.getItem('roleName')) ? JSON.parse(localStorage.getItem('roleName')) : null,
		// token: JSON.parse(localStorage.getItem('accessToken')) !=undefined? JSON.parse(localStorage.getItem('accessToken'))  : null,
		errorMessage: null,
		successMessage: null,
		successMessageNew: null,
		profileDetails: null,
		profileImage: '',
		userRole: ''
	},

	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleSuccessLogin: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload?.data;
			state.token = action.payload?.data?.token;
			state.successMessage = action.payload?.message;
			sessionStorage.setItem('accessToken', JSON.stringify(action.payload?.data?.token));
		},
		handleErrorLogin: (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMessage = action.payload;
		},
		handleSetRole: (state, action) => {
			state.isLoading = false;
			state.roleId = action.payload;
		},
		handleForgotPassword: (state, action) => {
			state.isLoading = false;
			state.successMessage = action.payload;
		},
		handleUpdateProfileDataSuccess: (state, action) => {
			state.isLoading = false;
			state.successMessage = action.payload;
		},
		handleErrorProfileData: (state, action) => {
			state.errorMessage = action.payload;
			state.isLoading = false;
		},
		handleResetState: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.errorMessage = null;
			state.successMessage = null;
			state.profileUpdateData = null;
		},
		handleSetProfileImage: (state, action) => {
			state.isLoading = false;
			state.profileImage = action.payload;
		},
		handleLogout: (state) => {
			state.userData = null;
			sessionStorage.removeItem('accessToken');
			sessionStorage.removeItem('roleName');
			sessionStorage.removeItem('roleId');
			state.token = null;
			state.roleName = null;
		},
		handleUserDetails: (state, action) => {
			state.isLoading = false;
			state.userData = action.payload;
			state.roleName = action.payload?.role_name;
			state.roleId = action.payload?.role_id;
			state.profileImage = action.payload?.profile_image;
			localStorage.setItem('roleId', JSON.stringify(action.payload?.role_id));
		},
		handleUserRole: (state, action) => {
			state.isLoading = false;
			state.roleName = action.payload;
		},
		handleProfileDetailsSuccess: (state, action) => {
			state.isLoading = false;
			state.profileDetails = action.payload;
		},
		handleProfileDetailsError: (state, action) => {
			state.isLoading = false;
			state.isError = action.payload;
		},
		handlePasswordSuccess: (state, action) => {
			state.isLoading = false;
			state.successMessage = action.payload;
		},
		handleResetPassword: (state, action) => {
			state.isLoading = false;
			state.successMessage = action.payload;
		},
		handleError: (state, action) => {
			state.isLoading = false;
			state.errorMessage = action.payload;
		}
	}
});

export const {
	setLoading,
	handleSuccessLogin,
	handleErrorLogin,
	handleSetRole,
	handleResetState,
	handleForgotPassword,
	handleLogout,
	handleUserDetails,
	handleUpdateProfileDataSuccess,
	handleErrorProfileData,
	handleProfileDetailsSuccess,
	handleProfileDetailsError,
	handlePasswordSuccess,
	handleError,
	handleSetProfileImage,
	handleUserRole,
	handleResetPassword
} = authSlice.actions;
export default authSlice.reducer;
export const LogoutRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
			}
		};
		const { data } = await AdminLoginAPI(userData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data));
			let decodeData = await jwtDecode(data.data.token);
			sessionStorage.setItem('roleName', JSON.stringify(decodeData?.role_name));
			sessionStorage.setItem('roleId', JSON.stringify(decodeData?.role_id));
			dispatch(handleUserDetails(decodeData));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};
export const webLoginRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
			}
		};
		const { data } = await webLoginApi(userData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data));
			let decodeData = await jwtDecode(data.data.token);
			sessionStorage.setItem('roleName', JSON.stringify(decodeData?.role_name));
			sessionStorage.setItem('roleId', JSON.stringify(decodeData?.role_id));
			dispatch(handleUserDetails(decodeData));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};
export const LoginRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await AdminLoginAPI(userData);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleSuccessLogin(data));
			console.log("login")
			let decodeData = await jwtDecode(data?.data?.token);
			dispatch(handleUserDetails(decodeData));
			sessionStorage.setItem('roleName', JSON.stringify(decodeData?.role_name));
			sessionStorage.setItem('roleId', JSON.stringify(decodeData?.role_id));
			dispatch(handleUserDetails(decodeData));
			console.log(decodeData, 'decodeData');
		}
	} catch (error) {
		console.log(error);
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const resetPasswordRequest = (token, reqData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await resetPasswordApi(token, reqData);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleResetPassword(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};
export const ForgotPasswordRequest = (userData) => async (dispatch) => {
	dispatch(setLoading());
	try {
		const { data } = await ForgotPasswordAPI(userData);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleForgotPassword(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorLogin(error.response.data.errors));
		} else {
			return dispatch(handleErrorLogin(error.message));
		}
	}
};

export const getProfileDetailsRequest = (token) => async (dispatch) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: token
			}
		};
		const { data } = await getProfileDetailsApi(config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleProfileDetailsSuccess(data?.data));
			dispatch(handleSetProfileImage(data.data?.profile_image));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleProfileDetailsError(error.response.data.errors));
		} else {
			return dispatch(handleProfileDetailsError(error.message));
		}
	}
};
export const changePasswordRequest = (userData, token) => async (dispatch) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: token
			}
		};
		const { data } = await changePasswordApi(userData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handlePasswordSuccess(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleError(error.response.data.errors));
		} else {
			return dispatch(handleError(error.message));
		}
	}
};
export const adminProfileUpdateRequest = (id, updatedData, token) => async (dispatch) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				Authorization: token
			}
		};
		const { data } = await AdminProfileUpdateAPI(id, updatedData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleUpdateProfileDataSuccess(data.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorProfileData(error.response.data.errors));
		} else {
			return dispatch(handleErrorProfileData(error.message));
		}
	}
};
