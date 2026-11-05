import { createSlice } from '@reduxjs/toolkit';
import { CreateStoreAPI, DeleteStoreAPI, EditStoreAPI, GetAllCityAPI, GetAllStateAPI, GetAllStateApiList, GetAllStoreAPI, GetStoreAPI, MultipalDeleteStoreAPI, getChainByProjectIdApi, getStateListAPI, getUserRoleByNameAPI, getUserRoleByNameApi } from '../../../service/api';
const initialState = {
	storeData: null,
	createdStoreData: null,
	editedStoreData: null,
	getByIdStoreData: null,
	deletedStoreData: null,
	deletedMultiStoreData: null,
	userRole: null,
	chainList: [],
	stateData: null,
	cityData: null,
	errors: null,
	successMessage: null,
};


const storeSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetStoreData: (state, action) => {
			state.storeData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateStoreData: (state, action) => {
			state.createdStoreData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditStoreData: (state, action) => {
			state.editedStoreData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetStoreData: (state, action) => {
			state.getByIdStoreData = action.payload;
			state.isLoading = false;
		},
		handleGetChainData: (state, action) => {
			state.chainList = action.payload;
			state.isLoading = false;
		},
		handleErrorGetStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteStoreData: (state, action) => {
			state.deletedStoreData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteStoreData: (state, action) => {
			state.deletedMultiStoreData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteStoreData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleError: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetStateData: (state, action) => {
			state.stateData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetStateData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetCityData: (state, action) => {
			state.cityData = action.payload;
			state.isLoading = false;
		},
		handleGetUserRole: (state, action) => {
			state.userRole = action.payload;
			state.isLoading = false;
		},
		handleErrorgetUserRoleByName: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetCityData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},

		handleResetStore: (state) => {
			state.isLoading = false;
			// state.storeData = null;
			state.createdStoreData = null;
			state.editedStoreData = null;
			state.getByIdStoreData = null;
			state.deletedStoreData = null;
			state.deletedMultiStoreData = null;
			state.stateData = null;
			state.successMessage = null;
			state.cityData = null;
			state.errors = null;
			state.userRole = null;
		},
	}
});

export const {
	setLoading,
	handleAllGetStoreData,
	handleErrorAllGetStoreData,
	handleCreateStoreData,
	handleErrorCreateStoreData,
	handleEditStoreData,
	handleErrorStoreData,
	handleGetStoreData,
	handleGetChainData,
	handleError,
	handleErrorGetStoreData,
	handleDeleteStoreData,
	handleErrorDeleteStoreData,
	handleMultipalDeleteStoreData,
	handleErrorMultipalDeleteStoreData,
	handleAllGetStateData,
	handleErrorAllGetStateData,
	handleAllGetCityData,
	handleErrorgetUserRoleByName,
	handleGetUserRole,
	handleErrorAllGetCityData,
	handleResetStore,
} = storeSlice.actions;
export default storeSlice.reducer;

export const GetAllStoreRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllStoreAPI(config, queryStr);
		const { statusCode, data: StoreData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetStoreData(StoreData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetStoreData(err));
	}
};

export const CreateStoreRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await CreateStoreAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateStoreData(data?.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateStoreData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateStoreData(error.message));
		}
	}
};
export const importExcelStoreRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateStoreAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateStoreData(data?.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateStoreData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateStoreData(error.message));
		}
	}
};


export const EditStoreRequest = (id, updatedStoreData) => async (dispatch, getState) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await EditStoreAPI(id, updatedStoreData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleEditStoreData(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorStoreData(error.response.data.errors));
		} else {
			return dispatch(handleErrorStoreData(error.message));
		}
	}
};

export const GetStoreRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetStoreAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetStoreData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetStoreData(err));
	}
};
export const getChainByProjectIdRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await getChainByProjectIdApi(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetChainData(data.data?.chain));
		}
	} catch (err) {
		dispatch(handleError(err));
	}
};

export const DeleteStoreRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteStoreAPI(id, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleDeleteStoreData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteStoreData(err));
	}
};

export const MultipalDeleteStoreRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteStoreAPI(MultiData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteStoreData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteStoreData(err));
	}
};

export const GetAllStateRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await getStateListAPI(queryStr, config);
		const { statusCode } = data;
		if (statusCode == 200) {
			dispatch(handleAllGetStateData(data?.data?.state));
		}
	} catch (err) {
		dispatch(handleErrorAllGetStateData(err));
	}
};
export const GetAllStateRequestList = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllStateApiList(queryStr, config);
		const { statusCode } = data;
		if (statusCode == 200) {
			dispatch(handleAllGetStateData(data?.data?.State));
		}
	} catch (err) {
		dispatch(handleErrorAllGetStateData(err));
	}
};
export const GetUserRoleByNameRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await getUserRoleByNameApi(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetUserRole(data.data));
		}
	} catch (err) {
		dispatch(handleErrorgetUserRoleByName(err));
	}
};
export const GetAllCityRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetAllCityAPI(id);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetCityData(data?.data?.City));
		}
	} catch (err) {
		dispatch(handleErrorAllGetCityData(err));
	}
};
