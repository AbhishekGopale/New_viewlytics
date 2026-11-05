import { createSlice } from '@reduxjs/toolkit';
import { GetAllSkuLabelAPI, GetAllUserassignStoreAPI, createClientApi, deleteClientApi, getAllAseListApi, getAllClientApi, getAllNpcListApi, getSkuListByStoreIdApi, getStoreByUserIdAPI, multipleDeleteClientApi, getClientDetailByIdApi, EditClientAPI, getAllSeListApi } from '../../../service/api';

const initialState = {
    isLoading: false,
    clientData: null,
    deletedTargetData: null,
    clientEditData: null,
    deletedMultiTargetData: null,
    userassignStoreData: null,
    skuLabelData: null,
    storeList: [],
    npcList: [],
    aseList: [],
    seList:[],
    clientDetail: null,
    successMessage: null,
    errors: null
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleGetAllClientData: (state, action) => {
            state.clientData = action.payload;
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
        handleGetClientDetailsById: (state, action) => {
            state.clientDetail = action.payload;
            state.isLoading = false;
        },
        handleAllGetNpcListData: (state, action) => {
            state.npcList = action.payload;
            state.isLoading = false;
        },
        handleAllGetAseListData: (state, action) => {
            state.aseList = action.payload;
            state.isLoading = false;
        },
        handleAllGetSeListData: (state, action) => {
            state.seList = action.payload?.ase;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleSuccess: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleEditClientData: (state, action) => {
            state.clientEditData = action.payload;
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleErrorClientData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },

        handleResetClient: (state) => {
            state.isLoading = false;
            state.clientDetail = null;
            state.deletedTargetData = null;
            state.clientEditData = null;
            state.deletedMultiTargetData = null;
            state.userassignStoreData = null;
            state.skuLabelData = null;
            state.successMessage = null;
            state.errors = null;
        },
        resetData: (state) => {
            state.successMessage = null;
            state.errors = ''
        }
    }
});

export const {
    setLoading,
    handleGetAllClientData,
    handleGetStoreListByUserId,
    handleErrorAllGetTargetData,
    handleCreateTargetData,
    handleErrorCreateTargetData,
    handleDeleteTargetData,
    handleErrorDeleteTargetData,
    handleMultipalDeleteTargetData,
    handleErrorMultipalDeleteTargetData,
    handleEditClientData,
    handleErrorClientData,
    handleAllGetUserassignStoreData,
    handleErrorAllGetUserassignStoreData,
    handleAllGetSkuLabelData,
    handleErrorAllGetSkuLabelData,
    handleResetClient,
    handleError,
    handleSuccess,
    handleAllGetNpcListData,
    handleGetSkuListByStoreId,
    handleGetClientDetailsById,
    handleAllGetAseListData,
    handleAllGetSeListData,
    resetData
} = clientSlice.actions;
export default clientSlice.reducer;

export const getAllClientListRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await getAllClientApi(config, queryStr);
        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleGetAllClientData(data?.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
export const createClientRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await createClientApi(reqData, config);

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
        const { data } = await deleteClientApi(id, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data.message));
        }
    } catch (err) {
        dispatch(handleError(err));
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
export const getClientDetailById = (id) => async (dispatch, getState) => {
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
        const { data } = await getClientDetailByIdApi(id, config);
        const { statusCode, data: clientDetails } = data;
        if (statusCode === 200) {
            dispatch(handleGetClientDetailsById(clientDetails.User));
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
export const clientUpdateRequest = (id, queryStr) => async (dispatch, getState) => {
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
        const { data } = await EditClientAPI(id, queryStr, config);
        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleEditClientData(data?.message));
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorClientData(error.response.data.errors));
        } else {
            return dispatch(handleErrorClientData(error.message));
        }
    }
};
export const multipleDeleteClientRequest = (ids) => async (dispatch, getState) => {
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
        const { data } = await multipleDeleteClientApi(ids, config);

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
export const getAllNpcListRequest = () => async (dispatch, getState) => {
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
        const { data } = await getAllNpcListApi(config);
        const { statusCode, data: ncp } = data;
        if (statusCode === 200) {
            dispatch(handleAllGetNpcListData(ncp.ncp));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
export const getAllAseListRequest = () => async (dispatch, getState) => {
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
        const { data } = await getAllAseListApi(config);
        const { statusCode, data: ase } = data;

        if (statusCode === 200) {
            dispatch(handleAllGetAseListData(ase.ase));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
export const getAllSeListRequest = () => async (dispatch, getState) => {
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
        const { data } = await getAllSeListApi(config);
        const { statusCode, data: se } = data;
        console.log(data,"data");

        if (statusCode === 200) {
            dispatch(handleAllGetSeListData(se));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};