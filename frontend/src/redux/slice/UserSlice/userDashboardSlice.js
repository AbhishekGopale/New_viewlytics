import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    GetAllChainLabelAPI,
    GetAllTLLabelApi,
    GetAttendanceAnalysisDataApi,
    getAttendanceReportDataApi,
    getOssApi,
    GetOutOfStockDataApi,
    GetSalesAnalysisDataApi,
    getSalesChainWiseSummaryDataApi,
    GetShairOfShellDataApi,
    getSosListApi
} from '../../../service/api';

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
    chain: [],
    city: [],
    state: [],
    chainData: null,
    tlData: null,
    dashboardData: null,
    attendanceAnalysisData: null,
    attendanceData: [],
    attendanceData2: [],
    reportCounter: [],
    activity: [],
    salesAnalysisData: [],
    salesAnalysisGraphData: [],
    chainSummaryData: [],
    shairofshellData: null,
    shairofshellchineData: [],
    outofstockData: [],
    outofstockGraphData: [],
    ossData: [],
    sosData: [],
    ossUserData: [],
    categoryData: [],
    ossUserViewData: null,
    attendanceUserViewData: '',
    sosUserViewData: null,
    salesUserViewData: null,
    dashboardUserViewData: null,
    dashboardOssData: [],
    dashboardSosData: [],
    checkoutdata: [],
    inactivedata: [],
    skuWiseCountOfStoreData: [],
    mapdata: [],
    leavedata: [],
    userdata: [],
    categoryWiseSosData: null,
    promoterData: null,
    merchandiserData: null,
    promoterData2: null,
    merchandiserData2: null,
    tlDashboardData: null,
    errors: null,
    targetData: null,
    successMessage: ''
};

const userSlice = createSlice({
    name: 'userDashboard',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleAllGetDashboardData: (state, action) => {
            state.dashboardData = action.payload;
            state.promoterData = action.payload?.PromotorObj || action.payload;
            state.merchandiserData = action.payload?.MerchandiserObj || action.payload;
            state.tlDashboardData = action.payload?.TlObj || action.payload;
            state.isLoading = false;
        },
        handleGetDashboardTargetData: (state, action) => {
            state.targetData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetDashboardData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetAttendanceAnalysisData: (state, action) => {
            state.attendanceAnalysisData = action.payload;
            state.isLoading = false;
        },
        handleAttendanceReportData: (state, action) => {
            state.attendanceData = action.payload?.attendanceChain?.[0]?.ChainWise || action.payload;
            state.promoterData2 = action.payload?.attendanceChain?.[0]?.dashboard?.promoter_id || null;
            state.merchandiserData2 = action.payload?.attendanceChain?.[0]?.dashboard?.merchandiser_id || null;
            state.isLoading = false;
        },
        handleErrorAllGetAttendanceAnalysisData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetSalesAnalysisData: (state, action) => {
            state.salesAnalysisData = action.payload?.chainwise_data || action.payload;
            state.salesAnalysisGraphData = action.payload?.chainWiseSummery || [];
            state.isLoading = false;
        },
        handleErrorAllGetSalesAnalysisData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetOutOfStockData: (state, action) => {
            state.outofstockData = action.payload;
            state.outofstockGraphData = action.payload?.countCompOOSStore || [];
            state.ossData = action.payload;
            state.isLoading = false;
        },
        handleAllGetOutOfStockUserData: (state, action) => {
            state.ossUserData = action.payload;
            state.isLoading = false;
        },
        handleAllGetOutOfStockUserViewData: (state, action) => {
            state.ossUserViewData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetOutOfStockData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetDashboardUserViewData: (state, action) => {
            state.dashboardUserViewData = action.payload;
            if (Array.isArray(action.payload) && action.payload[0]?.activeUsers) {
                state.checkoutdata = [];
                state.mapdata = [];
                state.leavedata = [];
                state.userdata = [];
                action.payload[0].activeUsers.forEach((userItem) => {
                    if (userItem.checkInOut) state.checkoutdata.push(...userItem.checkInOut);
                    if (userItem.map) state.mapdata.push(...userItem.map);
                    if (userItem.leave) state.leavedata.push(...userItem.leave);
                    if (userItem.user) state.userdata.push(...userItem.user);
                });
                state.inactivedata = action.payload[0]?.inactiveUsers || [];
            }
            state.isLoading = false;
        },
        handleErrorAllGetDashboardUserViewData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetShairOfShellData: (state, action) => {
            state.shairofshellData = action.payload;
            state.shairofshellchineData = action.payload?.sosChianWise || [];
            state.isLoading = false;
        },
        handleSosData: (state, action) => {
            state.sosData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetShairOfShellData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetChainsLabelData: (state, action) => {
            state.chainData = action.payload;
            state.isLoading = false;
        },
        handleGetAllSalesChainWiseSummaryData: (state, action) => {
            state.chainSummaryData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetChainsLabelData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleAllGetTLLabelData: (state, action) => {
            state.tlData = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetTLLabelData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleGetAllDashboardOssData: (state, action) => {
            state.dashboardOssData = action.payload;
            state.isLoading = false;
        },
        handleGetSOSDashboardData: (state, action) => {
            state.dashboardSosData = action.payload;
            state.isLoading = false;
        },
        handleAllGetCategoryData: (state, action) => {
            state.categoryData = action.payload;
            state.isLoading = false;
        },
        handleAllGetReportCounterData: (state, action) => {
            state.reportCounter = action.payload;
            state.isLoading = false;
        },
        handleAllGetActivityData: (state, action) => {
            state.activity = action.payload;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.isLoading = false;
            state.attendanceAnalysisData = null;
            state.chainData = null;
            state.tlData = null;
            state.salesAnalysisData = null;
            state.outofstockData = null;
            state.shairofshellData = null;
            state.shairofshellchineData = null;
            state.errors = action.payload;
        },
        handleReset: (state) => {
            state.attendanceUserViewData = '';
            state.ossUserViewData = null;
            state.sosUserViewData = null;
            state.salesUserViewData = null;
            state.dashboardUserViewData = null;
            state.dashboardOssData = null;
            state.dashboardSosData = null;
            state.mapdata = [];
            state.activity = [];
            state.reportCounter = [];
            state.checkoutdata = [];
            state.inactivedata = null;
            state.leavedata = [];
            state.userdata = [];
            state.categoryData = [];
            state.categoryWiseSosData = null;
        }
    }
});

export const {
    setLoading,
    handleAllGetDashboardData,
    handleGetDashboardTargetData,
    handleSosData,
    handleErrorAllGetDashboardData,
    handleAllGetAttendanceAnalysisData,
    handleErrorAllGetAttendanceAnalysisData,
    handleAllGetSalesAnalysisData,
    handleErrorAllGetSalesAnalysisData,
    handleAllGetOutOfStockData,
    handleAllGetOutOfStockUserData,
    handleAllGetOutOfStockUserViewData,
    handleErrorAllGetOutOfStockData,
    handleAllGetShairOfShellData,
    handleErrorAllGetShairOfShellData,
    handleAllGetChainsLabelData,
    handleErrorAllGetChainsLabelData,
    handleAllGetTLLabelData,
    handleErrorAllGetTLLabelData,
    handleAttendanceReportData,
    handleGetAllSalesChainWiseSummaryData,
    handleGetAllDashboardOssData,
    handleGetSOSDashboardData,
    handleAllGetCategoryData,
    handleAllGetReportCounterData,
    handleAllGetActivityData,
    handleAllGetDashboardUserViewData,
    handleErrorAllGetDashboardUserViewData,
    handleError,
    handleReset
} = userSlice.actions;

export default userSlice.reducer;

// Thunk action creators
export const handleResetState = () => (dispatch) => {
    dispatch(handleReset());
};

export const GetDashboardDetails = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const body = typeof params === 'object' ? params : { role_id: params };
        const res = await axios.post(`${BASE_URL}/web/dashboard`, body, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleAllGetDashboardData(res.data?.data?.data || res.data?.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetDashboardData(err));
    }
};

export const GetDashboardTargetDataRequest = (body) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.post(`${BASE_URL}/web/dashboard_target`, body, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleGetDashboardTargetData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetDashboardData(err));
    }
};

export const GetDashboardSosDataRequest = (body) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.post(`${BASE_URL}/web/dashboard_sos`, body, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleGetSOSDashboardData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetDashboardData(err));
    }
};

export const GetDashboardOssV2Request = (body) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.post(`${BASE_URL}/web/dashboard_oss_v2`, body, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleGetAllDashboardOssData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetDashboardData(err));
    }
};

export const GetDashboardUserListRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/user/list`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleAllGetOutOfStockUserData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetDashboardReportCounterRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/report_counter`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleAllGetReportCounterData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetDashboardActivityLogAllRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/activity_log_All`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleAllGetActivityData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetAttendanceDataChainWiseInDetailRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const res = await axios.get(`${BASE_URL}/web/get_attendance_data_chainWiseindetail`, getHeaders(getState));
        if (res.data?.statusCode === 200 || res.status === 200) {
            dispatch(handleAttendanceReportData(res.data?.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetAttendanceAnalysisDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetAttendanceAnalysisDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetAttendanceAnalysisData(data.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetAttendanceAnalysisData(err));
    }
};

export const getAttendanceReportRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await getAttendanceReportDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAttendanceReportData(data.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const getSalesChainWiseSummaryDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await getSalesChainWiseSummaryDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleGetAllSalesChainWiseSummaryData(data.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetSalesAnalysisDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetSalesAnalysisDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetSalesAnalysisData(data.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetSalesAnalysisData(err));
    }
};

export const getOSSDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await getOssApi(config);
        if (data.statusCode === 200) {
            // handle
        }
    } catch (err) {
        // error
    }
};

export const GetOutOFStockDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetOutOfStockDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetOutOfStockData(data.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetOutOfStockData(err));
    }
};

export const GetShairOfShellDataRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetShairOfShellDataApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetShairOfShellData(data.data));
        }
    } catch (err) {
        dispatch(handleErrorAllGetShairOfShellData(err));
    }
};

export const getSosListRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await getSosListApi(config);
        if (data.statusCode === 200) {
            dispatch(handleSosData(data.data));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const GetAllChainNameForWebRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetAllChainLabelAPI(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetChainsLabelData(data.data?.Chain));
        }
    } catch (err) {
        dispatch(handleErrorAllGetChainsLabelData(err));
    }
};

export const GetAllTLNameForWebRequest = () => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const config = getHeaders(getState);
        const { data } = await GetAllTLLabelApi(config);
        if (data.statusCode === 200) {
            dispatch(handleAllGetTLLabelData(data.data?.TL));
        }
    } catch (err) {
        dispatch(handleErrorAllGetTLLabelData(err));
    }
};
