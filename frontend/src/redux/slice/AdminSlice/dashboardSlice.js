import { createSlice } from '@reduxjs/toolkit';
import { GetAdminDashboardAPI, getProjectWiseDetailsApi } from '../../../service/api';
const initialState = {
    dashboardData: null,
    promoterData: null,
    errors: null,
};


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleAllGetDashboardData: (state, action) => {
            state.dashboardData = action.payload?.project;
            state.promoterData = action.payload?.details;
            state.isLoading = false;
        },
        handleSuccessPromoterData: (state, action) => {
            state.promoterData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetDashboardData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleResetStore: (state) => {
            state.isLoading = false;
            state.dashboardData = null;
            state.errors = null;
        },
    }
});

export const {
    setLoading,
    handleAllGetDashboardData,
    handleErrorAllGetDashboardData,
    handleResetStore,
    handleError,
    handleSuccessPromoterData
} = dashboardSlice.actions;
export default dashboardSlice.reducer;


export const GetAdminDashboardRequest = () => async (dispatch, getState) => {
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
        const { data } = await GetAdminDashboardAPI(config);
        const { statusCode, data: Data } = data;

        if (statusCode === 200) {
            dispatch(handleAllGetDashboardData(Data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetDashboardData(err));
    }
};
export const getProjectWiseDetailsRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await getProjectWiseDetailsApi(id, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccessPromoterData(data.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};
