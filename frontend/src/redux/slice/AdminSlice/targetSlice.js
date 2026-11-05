import { createSlice } from '@reduxjs/toolkit';
import { CreateTargetAPI, DeleteTargetAPI, EditTargetAPI, GetAllCategoryAPI, GetAllSkuLabelAPI, GetAllTargetAPI, GetAllUserassignStoreAPI, MultipalDeleteTargetAPI, getSkuListByStoreIdApi, getStoreByUserIdAPI, importTargetApi, multipalDeleteTargetAPI } from '../../../service/api';

const initialState = {
    isLoading: false,
    targetData: null,
    deletedTargetData: null,
    editedTargetData: null,
    deletedMultiTargetData: null,
    userassignStoreData: null,
    skuLabelData: null,
    storeList: [],
    skuList: [],
    successMessage: null,
    errors: null
};

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleAllGetTargetData: (state, action) => {
            state.targetData = action.payload;
            state.isLoading = false;
        },
        handleGetStoreListByUserId: (state, action) => {
            state.storeList = action.payload;
            state.isLoading = false;
        },
        handleGetSkuListByStoreId: (state, action) => {
            state.skuList = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetTargetData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleCreateTargetData: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleErrorCreateTargetData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleDeleteTargetData: (state, action) => {
            state.deletedTargetData = action.payload;
            state.isLoading = false;
        },
        handleErrorDeleteTargetData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleEditTargetData: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleErrorTargetData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleMultipalDeleteTargetData: (state, action) => {
            state.deletedMultiTargetData = action.payload;
            state.isLoading = false;
        },
        handleErrorMultipalDeleteTargetData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetUserassignStoreData: (state, action) => {
            state.userassignStoreData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetUserassignStoreData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetSkuLabelData: (state, action) => {
            state.skuLabelData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetSkuLabelData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleGetAllSkuListByStoreIdData: (state, action) => {
            state.skuList = action.payload;
            state.isLoading = false;
        },
        handleSuccess: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },


        handleResetTarget: (state) => {
            state.isLoading = false;
            state.targetData = null;
            // state.createdTargetData = null;
            state.deletedTargetData = null;
            state.editedTargetData = null;
            state.deletedMultiTargetData = null;
            state.userassignStoreData = null;
            state.skuLabelData = null;
            state.errors = null;
            state.successMessage = null;
        }
    }
});

export const {
    setLoading,
    handleAllGetTargetData,
    handleGetStoreListByUserId,
    handleErrorAllGetTargetData,
    handleCreateTargetData,
    handleErrorCreateTargetData,
    handleDeleteTargetData,
    handleSuccess,
    handleErrorDeleteTargetData,
    handleMultipalDeleteTargetData,
    handleErrorMultipalDeleteTargetData,
    handleEditTargetData,
    handleErrorTargetData,
    handleAllGetUserassignStoreData,
    handleErrorAllGetUserassignStoreData,
    handleAllGetSkuLabelData,
    handleErrorAllGetSkuLabelData,
    handleResetTarget,
    handleError,
    handleGetAllSkuListByStoreIdData,
    handleGetSkuListByStoreId
} = targetSlice.actions;
export default targetSlice.reducer;

export const GetAllTargetListRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await GetAllTargetAPI(config, queryStr);
        const { statusCode, data: target } = data;
        if (statusCode === 200) {
            dispatch(handleAllGetTargetData(target));
        }
    } catch (err) {
        dispatch(handleErrorAllGetTargetData(err));
    }
};
export const createTargetRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await CreateTargetAPI(reqData, config);

        const { statusCode } = data;

        if (statusCode === 201) {
            dispatch(handleCreateTargetData(data.message));

        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorCreateTargetData(error.response.data.errors));
        } else {
            return dispatch(handleErrorCreateTargetData(error.message));
        }
    }
};

export const deleteTargetRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await DeleteTargetAPI(id, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data.message));
        }
    } catch (err) {
        dispatch(handleErrorDeleteTargetData(err));
    }
};
export const getStoreByUserIdRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await getStoreByUserIdAPI(id, config);
        const { statusCode, data: StoreList } = data;
        if (statusCode === 200) {
            dispatch(handleGetStoreListByUserId(StoreList?.Store));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
export const getSkuListByStoreId = (id) => async (dispatch, getState) => {
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
        const { data } = await getSkuListByStoreIdApi(id, config);
        const { statusCode, data: skuList } = data;
        if (statusCode === 200) {
            dispatch(handleGetSkuListByStoreId(skuList?.sku));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const targetUpdateRequest = (id, queryStr) => async (dispatch, getState) => {
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
        const { data } = await EditTargetAPI(id, queryStr, config);
        const { statusCode } = data;
        if (statusCode === 200) {
            console.log(data.message)
            dispatch(handleEditTargetData(data.message));
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorTargetData(error.response.data.errors));
        } else {
            return dispatch(handleErrorTargetData(error.message));
        }
    }
};
export const multipalDeleteTargetRequest = (ids) => async (dispatch, getState) => {
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
        const { data } = await multipalDeleteTargetAPI(ids, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data.message));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
export const GetAllUserassigStoreRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await GetAllUserassignStoreAPI(config, queryStr);
        const { statusCode, data: Store } = data;
        if (statusCode === 200) {
            dispatch(handleAllGetUserassignStoreData(Store));
        }
    } catch (err) {
        dispatch(handleErrorAllGetUserassignStoreData(err));
    }
};

export const GetAllSkuLabelRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await GetAllSkuLabelAPI(config, queryStr);
        const { statusCode, data: sku } = data;
        if (statusCode === 200) {
            dispatch(handleAllGetSkuLabelData(sku));
        }
    } catch (err) {
        dispatch(handleErrorAllGetSkuLabelData(err));
    }
};
export const importTargetRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await importTargetApi(reqData, config);

        const { statusCode } = data;

        if (statusCode === 201) {
            dispatch(handleSuccess(data.message));

        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleError(error.response.data.errors));
        } else {
            return dispatch(handleError(error.message));
        }
    }
};