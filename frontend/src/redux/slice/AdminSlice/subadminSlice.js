import { createSlice } from '@reduxjs/toolkit';
import { CreateRolePermissionAPI, CreateSubAdminAPI, DeleteSubAdminAPI, EditSubAdminAPI, GetAllPermissionAPI, GetAllSubAdminsAPI, GetSubAdminIdAPI, MultipalDeleteSubAdminAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
	subAdminData: null,
	createdSubAdminData: null,
	editedSubAdminData: null,
	deletedSubAdminData: null,
	deletedMultiSubAdminData: null,
	permissionData: null,
	createdPermissionData: null,
	permissionData: [],
	subAdminIdData: null,
	errors: null,
	successMessage: null
};

const subAdminSlice = createSlice({
	name: 'subAdmin',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetSubAdminData: (state, action) => {
			state.subAdminData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateSubAdminData: (state, action) => {
			state.createdSubAdminData = action.payload;
			state.successMessage = action.payload?.message;
			state.isLoading = false;
		},
		handleErrorCreateSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditSubAdminData: (state, action) => {
			state.editedSubAdminData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteSubAdminData: (state, action) => {
			state.successMessage = action.payload.message;
			state.deletedSubAdminData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteSubAdminData: (state, action) => {
			state.deletedMultiSubAdminData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorMultipalDeleteSubAdminData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreatePermissionData: (state, action) => {
			state.createdPermissionData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreatePermissionData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetPermissionData: (state, action) => {
			state.permissionData = action.payload;
			state.successMessage = action.payload?.message;
			state.isLoading = false;
		},
		handleErrorAllGetPermissionData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetSubAdminIdData: (state, action) => {
			state.subAdminIdData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetSubAdminIdData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleResetSubAdmin: (state) => {
			state.isLoading = false;
			state.subAdminData = null;
			state.createdSubAdminData = null;
			state.editedSubAdminData = null;
			state.deletedSubAdminData = null;
			state.deletedMultiSubAdminData = null;
			state.createdPermissionData = null;
			state.subAdminIdData = null;
			state.errors = null;
			state.permissionData = null;
			state.successMessage = null;
		},
		resetData: (state) => {
			state.successMessage = null;
			state.errors = '';
		}
	}
});

export const {
	setLoading,
	handleAllGetSubAdminData,
	handleErrorAllGetSubAdminData,
	handleCreateSubAdminData,
	handleErrorCreateSubAdminData,
	handleEditSubAdminData,
	handleErrorSubAdminData,
	handleDeleteSubAdminData,
	handleErrorDeleteSubAdminData,
	handleMultipalDeleteSubAdminData,
	handleErrorMultipalDeleteSubAdminData,
	handleCreatePermissionData,
	handleErrorCreatePermissionData,
	handleGetPermissionData,
	handleErrorAllGetPermissionData,
	handleGetSubAdminIdData,
	handleErrorGetSubAdminIdData,
	resetData,
	handleResetSubAdmin
} = subAdminSlice.actions;
export default subAdminSlice.reducer;

export const GetAllSubAdminRequest = (queryStr) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await GetAllSubAdminsAPI(config, queryStr);
		const { statusCode, data: SubAdminData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetSubAdminData(SubAdminData));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorAllGetSubAdminData(error));
		} else {
			dispatch(handleErrorAllGetSubAdminData(error.message));
		}
	}
};

export const CreateSubAdminRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await CreateSubAdminAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateSubAdminData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateSubAdminData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateSubAdminData(error.message));
		}
	}
};

export const EditSubAdminRequest = (id, reqData) => async (dispatch, getState) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				// 'Authorization': token,
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await EditSubAdminAPI(id, reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditSubAdminData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorSubAdminData(error.response.data.errors));
		} else {
			return dispatch(handleErrorSubAdminData(error.message));
		}
	}
};
export const DeleteSubAdminRequest = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await DeleteSubAdminAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteSubAdminData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorDeleteSubAdminData(error.response.data.errors));
		} else {
			dispatch(handleErrorDeleteSubAdminData(error.message));
		}
	}
};

export const MultipalDeleteSubAdminRequest = (MultiData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await MultipalDeleteSubAdminAPI(MultiData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteSubAdminData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorMultipalDeleteSubAdminData(error.response.data.errors));
		} else {
			return dispatch(handleErrorMultipalDeleteSubAdminData(error.message));
		}
	}
};
export const CreateRolePermissionRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await CreateRolePermissionAPI(reqData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleCreatePermissionData(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreatePermissionData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreatePermissionData(error.message));
		}
	}
};
export const GetAllPermissionRequest = () => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await GetAllPermissionAPI(config);
		const { statusCode, data: permissionList } = data;

		if (statusCode === 200) {
			dispatch(handleGetPermissionData(permissionList?.SubModulePermission));
		}
	} catch (err) {
		dispatch(handleErrorAllGetPermissionData(err));
	}
};
export const GetSubAdminByIdRequest = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token
			}
		};
		const { data } = await GetSubAdminIdAPI(id, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			console.log(data?.data?.role_permission, 'data');
			dispatch(handleGetSubAdminIdData(data?.data?.role_permission));
		}
	} catch (err) {
		dispatch(handleErrorGetSubAdminIdData(err));
	}
};
