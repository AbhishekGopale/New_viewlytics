import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api/v1';

const getHeaders = (getState) => ({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: getState()?.auth?.token || '',
        latitude: '23.0225',
        longitude: '72.5714'
    }
});

const initialState = {
    isLoading: false,
    loading: false,
    reports: null,
    reportStoreData: [],
    reportSkuData: [],
    attendanceReports: [],
    inventoryData: [],
    sosPromoterData: [],
    sosMerchandiserData: [],
    placeVisit: [],
    inventorydata: [],
    sosReports: '',
    drsReports: [],
    salesReports: [],
    amountdata: [],
    piecesdata: [],
    openingReports: [],
    orderReports: [],
    newReports: [],
    closingReports: [],
    marketIntelligence: [],
    marketIntelligenceData: [],
    TLReport: [],
    userCheckReports: [],
    assetsTracking: [],
    checkinActivity: [],
    userShopperEngagReports: [],
    tlData: [],
    promoreport: [],
    competitionBrand: [],
    homeLeave: [],
    errors: null,
    successMessage: null,
    errorMessage: null
};

const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleProlistSuccess: (state, action) => {
            state.sosPromoterData = action.payload;
            state.isLoading = false;
        },
        handleMerlistSuccess: (state, action) => {
            state.sosMerchandiserData = action.payload;
            state.isLoading = false;
        },
        handleOpeningReportSuccess: (state, action) => {
            state.openingReports = action.payload?.data || action.payload;
            state.successMessage = action.payload?.message || 'Report Exported Successfully';
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.errorMessage = action.payload;
            state.isLoading = false;
        },
        handleResetState: (state) => {
            state.successMessage = null;
            state.errorMessage = null;
            state.isLoading = false;
        }
    }
});

export const {
    setLoading,
    handleProlistSuccess,
    handleMerlistSuccess,
    handleOpeningReportSuccess,
    handleError,
    handleResetState
} = reportSlice.actions;

export default reportSlice.reducer;

// Action creators
export const getPromoterUserForReportsRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/report/prolist`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleProlistSuccess(res.data?.data || []));
        }
    } catch (err) {
        dispatch(handleError(err.response?.data?.message || err.message));
    }
};

export const getMerchandiserUserForReportsRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/report/merlist`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleMerlistSuccess(res.data?.data || []));
        }
    } catch (err) {
        dispatch(handleError(err.response?.data?.message || err.message));
    }
};

export const GetOpeningInventoryReportRequest = (body) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.post(`${BASE_URL}/web/report/opening_inventory`, body, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleOpeningReportSuccess(res.data));
        }
    } catch (err) {
        dispatch(handleError(err.response?.data?.message || err.message));
    }
};
