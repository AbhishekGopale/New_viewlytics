import { createSlice } from '@reduxjs/toolkit';
import { CreateSKUAPI, DeleteSKUAPI, EditSKUAPI, GetAllSKUsAPI, GetSKUAPI, MultipalDeleteSKUAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
	skuData: null,
	createdSkuData: null,
	editedSkuData: null,
	getByIdSkuData: null,
	deletedSkuData: null,
	deletedMultiSkuData: null,
	errors: null,
	successMessage: null,
};


const skuSlice = createSlice({
	name: 'sku',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetSkuData: (state, action) => {
			state.skuData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateSkuData: (state, action) => {
			state.createdSkuData = action.payload;
			state.isLoading = false;
			state.successMessage = action?.payload?.message;
		},
		handleErrorCreateSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditSkuData: (state, action) => {
			state.editedSkuData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetSkuData: (state, action) => {
			state.getByIdSkuData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteSkuData: (state, action) => {
			state.deletedSkuData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteSkuData: (state, action) => {
			state.deletedMultiSkuData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteSkuData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},

		handleResetSku: (state) => {
			state.isLoading = false;
			state.userData = null;
			state.createdSkuData = null;
			state.editedSkuData = null;
			state.getByIdSkuData = null;
			state.deletedSkuData = null;
			state.deletedMultiSkuData = null;
			state.successMessage=null;
			state.errors = null;
		},
	}
});

export const {
	setLoading,
	handleAllGetSkuData,
	handleErrorAllGetSkuData,
	handleCreateSkuData,
	handleErrorCreateSkuData,
	handleEditSkuData,
	handleErrorSkuData,
	handleGetSkuData,
	handleErrorGetSkuData,
	handleDeleteSkuData,
	handleErrorDeleteSkuData,
	handleMultipalDeleteSkuData,
	handleErrorMultipalDeleteSkuData,
	handleResetSku,
} = skuSlice.actions;
export default skuSlice.reducer;

export const GetAllSkuRequest = (queryStr) => async (dispatch,getState) => {
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
		const { data } = await GetAllSKUsAPI(config,queryStr);
		const { statusCode, data: SkuData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetSkuData(SkuData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetSkuData(err));
	}
};

export const CreateSkuRequest = (reqData,token) => async (dispatch, getState) => {
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
		const { data } = await CreateSKUAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateSkuData(data));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateSkuData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateSkuData(error.message));
		}
	}
};


export const EditSkuRequest = (id, reqData,token) => async (dispatch,getState) => {
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
		const { data } = await EditSKUAPI(id, reqData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleEditSkuData(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorSkuData(error.response.data.errors));
		} else {
			return dispatch(handleErrorSkuData(error.message));
		}
	}
};

export const GetSkuRequest = (id,token) => async (dispatch, getState) => {
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
		const { data } = await GetSKUAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetSkuData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetSkuData(err));
	}
};

export const DeleteSkuRequest = (id,token) => async (dispatch, getState) => {
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
		const { data } = await DeleteSKUAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteSkuData(data.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteSkuData(err));
	}
};

export const MultipalDeleteSkuRequest = (MultiData,token) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteSKUAPI(MultiData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleMultipalDeleteSkuData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteSkuData(err));
	}
};
