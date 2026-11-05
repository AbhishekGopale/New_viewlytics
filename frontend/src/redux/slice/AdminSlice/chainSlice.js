import { createSlice } from '@reduxjs/toolkit';
import { CreateChainAPI, DeleteChainAPI, EditChainAPI, GetAllChainAPI, MultipalDeleteChainAPI, chainCreateApi, chainImageUploadAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
	chainData: null,
	createdChainData: null,
	deletedChainData: null,
	editedChainData: null,
	deletedMultiChainData: null,
	successMessage: null,
	errors: null,
};


const chainSlice = createSlice({
	name: 'chain',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetChainData: (state, action) => {
			state.chainData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetChainData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateChainData: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateChainData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteChainData: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteChainData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditChainData: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorChainData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteChainData: (state, action) => {
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteChainData: (state, action) => {
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
		handleResetChain: (state) => {
			state.isLoading = false;
			state.createdChainData = null;
			state.deletedChainData = null;
			state.editedChainData = null;
			state.deletedMultiChainData = null;
			state.errors = null;
			state.successMessage = null;
		}
	}
});

export const {
	setLoading,
	handleAllGetChainData,
	handleErrorAllGetChainData,
	handleCreateChainData,
	handleErrorCreateChainData,
	handleDeleteChainData,
	handleErrorDeleteChainData,
	handleEditChainData,
	handleErrorChainData,
	handleMultipalDeleteChainData,
	handleErrorMultipalDeleteChainData,
	handleUploadSuccess,
	handleUploadError,
	handleResetChain
} = chainSlice.actions;
export default chainSlice.reducer;

export const handleResetMessage = handleResetChain;
export const ImageUploadRequest = () => async () => {};

export const GetAllChainRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllChainAPI(config, queryStr);
		const { statusCode, data: chainData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetChainData(chainData));
		}
	} catch (err) {
		dispatch(handleErrorAllGetChainData(err));
	}
};

export const CreateChainRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateChainAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateChainData(data.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateChainData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateChainData(error.message));
		}
	}
};

export const DeleteChainRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteChainAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteChainData(data.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteChainData(err));
	}
};

export const EditChainRequest = (id, updatedChainData) => async (dispatch, getState) => {
	dispatch(setLoading());

	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				// 'Content-Type': 'multipart/form-data',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await EditChainAPI(id, updatedChainData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditChainData(data.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorChainData(error.response.data.errors));
		} else {
			return dispatch(handleErrorChainData(error.message));
		}
	}
};

export const MultipalDeleteChainRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteChainAPI(MultiData, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteChainData(data.message));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteChainData(err));
	}
};
export const chainCreateRequest = (chainData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				// 'Content-Type': 'multipart/form-data',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await chainCreateApi(chainData, config);

		const { statusCode } = data;
		if (statusCode === 201) {
			dispatch(handleUploadSuccess(data.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleUploadError(error.response.data.errors));
		} else {
			return dispatch(handleUploadError(error.message));
		}
	}
};
