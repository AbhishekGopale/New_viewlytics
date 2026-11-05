import { createSlice } from '@reduxjs/toolkit';
import {GetAllFromsAPI, CreateFormAPI, DeleteFormAPI, EditFormAPI, MultipalDeleteFormAPI, GetAllProjectByUserAPI} from '../../../service/api';

const initialState = {
	isLoading: false,
	formData: null,
	createdFormData: null,
	editedFormData: null,
	deletedFormData: null,
	deletedMultiFormData: null,
	projectByUserListData:[],
	errors: null,
	successMessage: ''
};

const requestFormSlice = createSlice({
	name: 'requestForm',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetFormData: (state, action) => {
			state.formData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetFormData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateFormData: (state, action) => {
			state.createdFormData = action.payload;
			state.successMessage = action.payload?.message
			state.isLoading = false;
		},
		handleErrorCreateFormData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditFormData: (state, action) => {
			state.editedFormData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorFormData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteFormData: (state, action) => {
			state.successMessage = action.payload.message;
			state.deletedFormData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteFormData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteFormData: (state, action) => {
			state.deletedMultiFormData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorMultipalDeleteFormData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetProjectByUserData: (state, action) => {
			state.projectByUserListData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetProjectByUserNameData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleResetForm: (state) => {
			state.isLoading = false;
			state.formData = null;
			state.createdFormData = null;
			state.editedFormData = null;
			state.deletedFormData = null;
			state.deletedMultiFormData = null;
			state.projectByUserListData =null;
			state.errors = null;
			state.successMessage = null;
		},
		resetData: (state) => {
			state.successMessage = '';
			state.errors = ''
		}
	}
});

export const {
	setLoading,
	handleAllGetFormData,
	handleErrorAllGetFormData,
	handleCreateFormData,
	handleErrorCreateFormData,
	handleEditFormData,
	handleErrorFormData,
	handleDeleteFormData,
	handleErrorDeleteFormData,
	handleMultipalDeleteFormData,
	handleErrorMultipalDeleteFormData,
	handleGetProjectByUserData,
	handleErrorAllGetProjectByUserNameData,
	resetData,
	handleResetForm
} = requestFormSlice.actions;
export default requestFormSlice.reducer;

export const GetAllFormRequest = (queryStr) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await GetAllFromsAPI(config, queryStr);
		const { statusCode , data:formdata } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetFormData(formdata));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorAllGetFormData(error));
		} else {
			dispatch(handleErrorAllGetFormData(error.message));
		}
	}
};

export const CreateFormRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await CreateFormAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateFormData(data));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateFormData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateFormData(error.message));
		}
	}
};


export const EditFormRequest = (id, reqData) => async (dispatch, getState) => {
	dispatch(setLoading());


	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				// 'Authorization': token,
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await EditFormAPI(id, reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditFormData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorFormData(error.response.data.errors));
		} else {
			return dispatch(handleErrorFormData(error.message));
		}
	}
};
export const DeleteFormRequest = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await DeleteFormAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteFormData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorDeleteFormData(error.response.data.errors));
		} else {
			dispatch(handleErrorDeleteFormData(error.message));
		}
	}
};

export const MultipalDeleteFormRequest = (MultiData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await MultipalDeleteFormAPI(MultiData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteFormData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorMultipalDeleteFormData(error.response.data.errors));
		} else {
			return dispatch(handleErrorMultipalDeleteFormData(error.message));
		}
	}
};
export const GetProjectByUserNameRequest = (id) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await GetAllProjectByUserAPI(id, config);
		const { statusCode, data: userList } = data;

		if (statusCode === 200) {
			dispatch(handleGetProjectByUserData(userList.users));
		}
	} catch (err) {
		dispatch(handleErrorAllGetProjectByUserNameData(err));
	}
};
