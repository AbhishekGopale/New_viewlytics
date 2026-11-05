import { createSlice } from '@reduxjs/toolkit';
import { CreateCategoryAPI, CreateCategoryExcelAPI, DeleteCategoryAPI, EditCategoryAPI, GetAllSkuCategoryAPI, GetSkuCategoryLabelAPI, MultipalDeleteCAtegoryAPI } from '../../../service/api';
const initialState = {
	isLoading: false,
	categoryData: null,
	createdCategoryData: null,
	createdCategoryExcelData: null,
	deletedCategoryData: null,
	editedCategoryData: null,
	deletedMultiCategoryData: null,
	categoryList: [],
	successMessage: null,
	errors: null,
};


const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetCategoryData: (state, action) => {
			state.categoryData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetCategoryData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateCategoryData: (state, action) => {
			state.createdCategoryData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateCategoryData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateCategoryExcelData: (state, action) => {
			state.createdCategoryExcelData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCreateCategoryExcelData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteCategoryData: (state, action) => {
			state.deletedCategoryData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteCategoryData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditCategoryData: (state, action) => {
			state.editedCategoryData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorCategoryData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteCategoryData: (state, action) => {
			state.deletedMultiCategoryData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteCategoryData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetCategoryLabelData: (state, action) => {
			state.categoryList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetCategoryLabelData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleResetCategory: (state) => {
			state.isLoading = false;
			state.categoryData = null;
			state.createdCategoryData = null;
			state.createdProjectExcelData = null;
			state.deletedCategoryData = null;
			state.editedCategoryData = null;
			state.deletedMultiCategoryData = null;
			state.categoryList = [];
			state.errors = null;
			state.successMessage = null;
		}
	}
});

export const {
	setLoading,
	handleAllGetCategoryData,
	handleErrorAllGetCategoryData,
	handleCreateCategoryExcelData,
	handleErrorCreateCategoryExcelData,
	handleCreateCategoryData,
	handleErrorCreateCategoryData,
	handleDeleteCategoryData,
	handleErrorDeleteCategoryData,
	handleEditCategoryData,
	handleErrorCategoryData,
	handleMultipalDeleteCategoryData,
	handleErrorMultipalDeleteCategoryData,
	handleAllGetCategoryLabelData,
	handleErrorAllGetCategoryLabelData,
	handleResetCategory
} = categorySlice.actions;
export default categorySlice.reducer;

export const GetAllCategoryRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllSkuCategoryAPI(config, queryStr);
		const { statusCode, data: Data } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetCategoryData(Data));
		}
	} catch (err) {
		dispatch(handleErrorAllGetCategoryData(err));
	}
};

export const CreateCategoryRequest = (reqData) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Content-Type': 'multipart/form-data',
				Authorization: getState()?.auth?.token,
			},
		};
		const { data } = await CreateCategoryAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateCategoryData(data.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateCategoryData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateCategoryData(error.message));
		}
	}
};
export const CreateCategoryExcelRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateCategoryExcelAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateCategoryExcelData(data?.message));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateCategoryExcelData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateCategoryExcelData(error.message));
		}
	}
};
export const DeleteCategoryRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteCategoryAPI(id, config);
		const { statusCode } = data;
		console.log(data, 'data');

		if (statusCode === 200) {
			dispatch(handleDeleteCategoryData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteCategoryData(err));
	}
};

export const EditCategoryRequest = (id, updatedData) => async (dispatch, getState) => {
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
		const { data } = await EditCategoryAPI(id, updatedData, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleEditCategoryData(data?.message));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCategoryData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCategoryData(error.message));
		}
	}
};

export const MultipalDeleteCategoryRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteCAtegoryAPI(MultiData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleMultipalDeleteCategoryData(data?.message));
		}
	} catch (err) {
		dispatch(handleMultipalDeleteCategoryData(err));
	}
};

export const GetAllCategoryLabelRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetSkuCategoryLabelAPI(config, id);
		const { statusCode, data: categoryData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetCategoryLabelData(categoryData?.category));
		}
	} catch (err) {
		dispatch(handleErrorAllGetCategoryLabelData(err));
	}
};