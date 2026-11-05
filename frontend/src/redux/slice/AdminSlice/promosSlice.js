import { createSlice } from '@reduxjs/toolkit';
import { CreatePromosAPI, DeletePromosAPI, EditPromosAPI, GetAllChainSelectAPI, GetAllProjectSelectAPI, GetAllPromosAPI, MultipalDeletePromosAPI, importPromoApi, skuListByChainIdApi } from '../../../service/api';

const initialState = {
	isLoading: false,
	promosData: null,
	createdPromosData: null,
	editedPromosData: null,
	deletedPromosData: null,
	deletedMultiPromosData: null,
	chainData: null,
	skuData: [],
	projectListData: [],
	successMessage: null,
	errors: null,
};


const promosSlice = createSlice({
	name: 'promos',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetPromosData: (state, action) => {
			state.promosData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetPromosData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreatePromosData: (state, action) => {
			state.successMessage = action?.payload?.message;
			state.createdPromosData = action.payload;
			state.isLoading = false;
		},
		handleErrorCreatePromosData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditPromosData: (state, action) => {
			state.editedPromosData = action.payload;
			state.successMessage = action?.payload?.message;
			state.isLoading = false;
		},
		handleErrorPromosData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeletePromosData: (state, action) => {
			state.deletedPromosData = action.payload;
			state.successMessage = action?.payload;
			state.isLoading = false;
		},
		handleErrorDeletePromosData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeletePromosData: (state, action) => {
			state.deletedMultiPromosData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeletePromosData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetChainsData: (state, action) => {
			state.chainData = action.payload;
			state.isLoading = false;
		},
		handleGetSkuData: (state, action) => {
			state.skuData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetChainsData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleError: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetProjectData: (state, action) => {
			state.projectListData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetProjectNameData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handlePromoExcelUploadSuccess: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handlePromoExcelUploadError: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},

		handleResetPromos: (state) => {
			state.isLoading = false;
			state.createdPromosData = null;
			state.editedPromosData = null;
			state.deletedPromosData = null;
			state.deletedMultiPromosData = null;
			state.chainData = null;
			state.errors = null;
			state.successMessage = null;
		},
	}
});

export const {
	setLoading,
	handleAllGetPromosData,
	handleErrorAllGetPromosData,
	handleCreatePromosData,
	handleErrorCreatePromosData,
	handleEditPromosData,
	handleErrorPromosData,
	handleDeletePromosData,
	handleErrorDeletePromosData,
	handleMultipalDeletePromosData,
	handleErrorMultipalDeletePromosData,
	handleAllGetChainsData,
	handleErrorAllGetChainsData,
	handleResetPromos,
	handlePromoExcelUploadSuccess,
	handlePromoExcelUploadError,
	handleGetProjectData,
	handleErrorAllGetProjectNameData,
	handleGetSkuData,
	handleError
} = promosSlice.actions;
export default promosSlice.reducer;

export const GetAllPromosRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllPromosAPI(config, queryStr);
		const { statusCode, data: PromosData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetPromosData(PromosData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetPromosData(err));
	}
};

export const CreatePromosRequest = (reqData) => async (dispatch, getState) => {

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

		const { data } = await CreatePromosAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreatePromosData(data));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreatePromosData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreatePromosData(error.message));
		}
	}
};


export const getSkuListByChainIdRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await skuListByChainIdApi(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetSkuData(data.data?.sku));
		}
	} catch (error) {
		if (error) {
			return dispatch(handleError(error.message));
		}
	}
};
export const EditPromosRequest = (id, reqData) => async (dispatch, getState) => {
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
		const { data } = await EditPromosAPI(id, reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditPromosData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorPromosData(error.response.data.errors));
		} else {
			return dispatch(handleErrorPromosData(error.message));
		}
	}
};


export const DeletePromosRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeletePromosAPI(id, config);
		const { statusCode } = data;


		if (statusCode === 200) {
			dispatch(handleDeletePromosData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorDeletePromosData(err));
	}
};

export const MultipalDeletePromosRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeletePromosAPI(MultiData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleMultipalDeletePromosData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeletePromosData(err));
	}
};
export const GetAllChainNameRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllChainSelectAPI(config);
		const { statusCode, data: ChainData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetChainsData(ChainData?.Chain));
		}
	} catch (err) {
		dispatch(handleErrorAllGetChainsData(err));
	}
};
export const GetProjectNameRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllProjectSelectAPI(config);
		const { statusCode, data: projectList } = data;

		if (statusCode === 200) {
			dispatch(handleGetProjectData(projectList.project));
		}
	} catch (err) {
		dispatch(handleErrorAllGetProjectNameData(err));
	}
};
export const importPromoRequest = (promoList) => async (dispatch, getState) => {
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
		const { data } = await importPromoApi(promoList, config);
		const { statusCode, message } = data;

		if (statusCode == 201) {
			dispatch(handlePromoExcelUploadSuccess(message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handlePromoExcelUploadError(error.response.data.errors));
		} else {
			return dispatch(handlePromoExcelUploadError(error.message));
		}
	}
};
