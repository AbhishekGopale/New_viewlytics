import { createSlice } from '@reduxjs/toolkit';
import { CreateRolePermissionAPI, GetAllPermissionAPI, GetSubAdminNameAPI } from '../../../service/api';

const initialState = {
	isRoleLoading: false,
	SubAdminListData: [],

	errors: null,
	successMessage: ''
};

const rolePermissionSlice = createSlice({
	name: 'rolePermission',
	initialState,
	reducers: {
		setRoleLoading: (state) => {
			state.isRoleLoading = true;
		},
		handleGetSubAdminData: (state, action) => {
			state.SubAdminListData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},

		handleResetRole: (state) => {
			state.isRoleLoading = false;
			state.SubAdminListData = false;
			state.permissionData = false;
			state.createdPermissionData = false;
			state.successMessage = null;
			state.errors = null;
		},
		resetData: (state) => {
			state.successMessage = '';
			state.errors = '';
		}
	}
});

export const { setRoleLoading, handleGetSubAdminData, handleErrorAllGetSubAdminData, handleGetPermissionData, handleErrorAllGetPermissionData, handleCreatePermissionData, handleErrorCreatePermissionData, resetData, handleResetRole } =
	rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
export const GetBySubAdminNameRequest = () => async (dispatch, getState) => {
	dispatch(setRoleLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await GetSubAdminNameAPI(config);
		const { statusCode, data: subadminList } = data;

		if (statusCode === 200) {
			dispatch(handleGetSubAdminData(subadminList?.Sub_Admin));
		}
	} catch (err) {
		dispatch(handleErrorAllGetSubAdminData(err));
	}
};
