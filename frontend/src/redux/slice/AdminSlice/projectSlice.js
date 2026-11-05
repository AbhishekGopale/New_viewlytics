import { createSlice } from '@reduxjs/toolkit';
import { CreateProjectAPI, CreateProjectExcelAPI, DeleteProjectAPI, EditProjectAPI, GetAllProjectAPI, MultipalDeleteProjectAPI, projectImageUploadAPI } from '../../../service/api';


const initialState = {
	isLoading: false,
	projectData: null,
	createdProjectData: null,
	createdProjectExcelData: null,
	deletedProjectData: null,
	editedProjectData: null,
	deletedMultiProjectData: null,
	successMessage: null,
	errors: null,
};


const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetProjectData: (state, action) => {
			state.projectData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetProjectData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateProjectData: (state, action) => {
			state.createdProjectData = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateProjectData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateProjectExcelData: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateProjectExcelData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteProjectData: (state, action) => {
			state.deletedProjectData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteProjectData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditProjectData: (state, action) => {
			state.editedProjectData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorProjectData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteProjectData: (state, action) => {
			state.deletedMultiProjectData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteProjectData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleUploadSuccess: (state, action) => {
			state.isLoading = false;
			state.successMessage = action.payload;
		},
		handleUploadError: (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		handleResetProject: (state) => {
			state.isLoading = false;
			state.projectData = null;
			state.createdProjectData = null;
			state.createdProjectExcelData = null;
			state.deletedProjectData = null;
			state.editedProjectData = null;
			state.deletedMultiProjectData = null;
			state.errors = null;
			state.successMessage = null;
		}
	}
});

export const {
	setLoading,
	handleAllGetProjectData,
	handleErrorAllGetProjectData,
	handleCreateProjectExcelData,
	handleErrorCreateProjectExcelData,
	handleCreateProjectData,
	handleErrorCreateProjectData,
	handleDeleteProjectData,
	handleErrorDeleteProjectData,
	handleEditProjectData,
	handleErrorProjectData,
	handleMultipalDeleteProjectData,
	handleErrorMultipalDeleteProjectData,
	handleUploadSuccess,
	handleUploadError,
	handleResetProject
} = projectSlice.actions;
export default projectSlice.reducer;

export const GetAllProjectRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllProjectAPI(config, queryStr);
		const { statusCode, data: Data } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetProjectData(Data));
		}
	} catch (err) {
		dispatch(handleErrorAllGetProjectData(err));
	}
};

export const CreateProjectRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateProjectAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateProjectData(data));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateProjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateProjectData(error.message));
		}
	}
};
export const CreateProjectExcelRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateProjectExcelAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateProjectExcelData(data?.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateProjectExcelData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateProjectExcelData(error.message));
		}
	}
};
export const DeleteProjectRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteProjectAPI(id, config);
		const { statusCode } = data;
		console.log(data,'data');

		if (statusCode === 200) {
			dispatch(handleDeleteProjectData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteProjectData(err));
	}
};

export const EditProjectRequest = (id, updatedData) => async (dispatch, getState) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await EditProjectAPI(id, updatedData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleEditProjectData(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorProjectData(error.response.data.errors));
		} else {
			return dispatch(handleErrorProjectData(error.message));
		}
	}
};

export const MultipalDeleteProjectRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteProjectAPI(MultiData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleMultipalDeleteProjectData(data?.message));
		}
	} catch (err) {
		dispatch(handleMultipalDeleteProjectData(err));
	}
};
export const ProjectImageUploadRequest = (image) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await projectImageUploadAPI(image, config);

		const { statusCode, message } = data;
		if (statusCode === 201) {
			dispatch(handleUploadSuccess(message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleUploadError(error));
		} else {
			return dispatch(handleUploadError(error));
		}
	}
};

