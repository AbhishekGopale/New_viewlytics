import { createSlice } from '@reduxjs/toolkit';
import { createBroadcastApi, deleteBroadcastApi, getBroadcastListApi, multipleDeleteBroadcastApi, projectWiseUserListApi } from '../../../service/api';

const initialState = {
    isLoading: false,
    broadcastList: null,
    deletedTargetData: null,
    editedTargetData: null,
    deletedMultiTargetData: null,
    userList: [],
    projectWiseUserList: [],
    successMessage: null,
    errors: null
};

const broadcastSlice = createSlice({
    name: 'broadcast',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleAllGetBroadcastData: (state, action) => {
            state.broadcastList = action.payload;
            state.isLoading = false;
        },
        handleSuccess: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
        },
        handleBroadcastList: (state, action) => {
            state.projectWiseUserList = action.payload;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },


        handleResetBroadcast: (state) => {
            state.isLoading = false;
            state.broadcastList = null;
            state.userassignStoreData = null;
            state.skuLabelData = null;
            state.errors = null;
            state.successMessage = null;
        }
    }
});

export const {
    setLoading,
    handleAllGetBroadcastData,
    handleGetStoreListByUserId,
    handleErrorAllGetTargetData,
    handleCreateTargetData,
    handleErrorCreateBroadCast,
    handleDeleteTargetData,
    handleSuccess,
    handleErrorDeleteBroadcast,
    handleMultipalDeleteTargetData,
    handleErrorMultipalDeleteTargetData,
    handleEditTargetData,
    handleErrorTargetData,
    handleAllGetUserassignStoreData,
    handleErrorAllGetUserassignStoreData,
    handleAllGetSkuLabelData,
    handleErrorAllGetSkuLabelData,
    handleResetBroadcast,
    handleError,
    handleBroadcastList,
    handleGetAllSkuListByStoreIdData,
    handleGetSkuListByStoreId
} = broadcastSlice.actions;
export default broadcastSlice.reducer;

export const getBroadcastListRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await getBroadcastListApi(config, queryStr);
        const { statusCode, data: list } = data;
        if (statusCode === 200) {
            dispatch(handleAllGetBroadcastData(list));
        }
    } catch (err) {
        dispatch(handleErrorAllGetTargetData(err));
    }
};
export const createBroadcastRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await createBroadcastApi(reqData, config);

        const { statusCode } = data;

        if (statusCode === 201) {
            console.log(data, 'data')
            dispatch(handleSuccess(data?.message));

        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleError(error.response.data.errors));
        } else {
            return dispatch(handleError(error.message));
        }
    }
};

export const getProjectWiseUserRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await projectWiseUserListApi(reqData, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleBroadcastList(data?.data));

        }
    } catch (error) {
        if (error) {
            return dispatch(handleError(error));
        }

    }
};

export const deleteBroadcastRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await deleteBroadcastApi(id, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data.message));
        }
    } catch (err) {
        dispatch(handleErrorDeleteBroadcast(err));
    }
};

export const multipalDeleteBroadcastRequest = (ids) => async (dispatch, getState) => {
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
        const { data } = await multipleDeleteBroadcastApi(ids, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data.message));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
