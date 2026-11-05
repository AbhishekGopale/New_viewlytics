import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || '/api/v1';

const getHeaders = (getState) => ({
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: getState()?.auth?.token || '',
        latitude: '23.0225',
        longitude: '72.5714',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }
});

const initialState = {
    isLoading: false,
    isPDFCreateLoading: false,
    categoryImgData: [],
    paidImgData: [],
    unPaidImgData: [],
    marketImgData: [],
    shopperImgData: [],
    visibilityImgData: [],
    promoImgData: [],
    facingImagesData: [],
    cityWiseStoreData: [],
    storewisemerchandiseData: null,
    errors: null,
    errorMessage: null,
    successMessage: null
};

const merchandiseImgSlice = createSlice({
    name: 'merchandiseImg',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setPDFCreateLoading: (state, action) => {
            state.isPDFCreateLoading = true;
            state.successMessage = action.payload?.message;
        },
        setFalseLoading: (state) => {
            state.isPDFCreateLoading = false;
        },
        handleCategoryImgData: (state, action) => {
            state.isLoading = false;
            state.categoryImgData = action.payload?.data;
        },
        handlePromoImgData: (state, action) => {
            state.isLoading = false;
            state.promoImgData = action.payload?.data;
        },
        handlePaidImgData: (state, action) => {
            state.isLoading = false;
            state.paidImgData = action.payload?.data;
        },
        handleUnpaidImgData: (state, action) => {
            state.isLoading = false;
            state.unPaidImgData = action.payload?.data;
        },
        handleMarketImgData: (state, action) => {
            state.isLoading = false;
            state.marketImgData = action.payload?.data;
        },
        handleShopperImgData: (state, action) => {
            state.isLoading = false;
            state.shopperImgData = action.payload?.data;
        },
        handleVisibilityImgData: (state, action) => {
            state.isLoading = false;
            state.visibilityImgData = action.payload?.data;
        },
        handleStoreWiseMerchandiserData: (state, action) => {
            state.isLoading = false;
            state.storewisemerchandiseData = action.payload;
        },
        handleFacingImagesData: (state, action) => {
            state.isLoading = false;
            state.facingImagesData = action.payload;
        },
        handleStoreData: (state, action) => {
            state.isLoading = false;
            state.cityWiseStoreData = action.payload;
        },
        handleErrorStoreWiseMerchandiser: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
            state.errorMessage = action.payload;
        },
        handleError: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
            state.shopperImgData = null;
            state.categoryImgData = null;
            state.paidImgData = null;
            state.unPaidImgData = null;
            state.marketImgData = null;
            state.promoImgData = null;
            state.cityWiseStoreData = null;
            state.facingImagesData = null;
        },
        handleReseterror: (state) => {
            state.errors = null;
            state.errorMessage = null;
        },
        handleClearImgData: (state) => {
            state.categoryImgData = [];
            state.paidImgData = [];
            state.unPaidImgData = [];
            state.marketImgData = [];
            state.shopperImgData = [];
            state.visibilityImgData = [];
            state.promoImgData = [];
            state.facingImagesData = [];
            state.cityWiseStoreData = [];
        }
    }
});

export const {
    setLoading,
    setFalseLoading,
    setPDFCreateLoading,
    handleCategoryImgData,
    handleMarketImgData,
    handlePromoImgData,
    handleShopperImgData,
    handleVisibilityImgData,
    handleStoreWiseMerchandiserData,
    handleErrorStoreWiseMerchandiser,
    handleFacingImagesData,
    handleStoreData,
    handlePaidImgData,
    handleUnpaidImgData,
    handleReseterror,
    handleClearImgData,
    handleError
} = merchandiseImgSlice.actions;

export default merchandiseImgSlice.reducer;

const downloadBlob = (data, filename) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
};

export const getCategoryImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/category/imageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleCategoryImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getPaidImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/paid/imageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handlePaidImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getUnpaidImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/asset/unpaidimageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleUnpaidImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getMarketImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/market/imageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleMarketImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getShopperImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/shopper/imageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleShopperImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getPromoImgDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/promo/imageV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handlePromoImgData(data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getFacingImagesDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/user/checkin_imagesV2`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleFacingImagesData(data?.data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.message || err.message));
    }
};

export const getStoreDataRequest = (params) => async (dispatch, getState) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`${BASE_URL}/web/storeCityWise`, params, getHeaders(getState));
        if (data?.statusCode === 200) {
            dispatch(handleStoreData(data?.data));
        }
    } catch (err) {
        dispatch(handleError(err?.response?.data?.errors || err.message));
    }
};

export const getImageExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/exportPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'selfieimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getCategoryExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/categoryPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'categoryimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getPaidAssetExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/paidAssetPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'paidimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getUnpaidAssetExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/unpaidAssetPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'unpaidimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getMarketExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/marketIntelliPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'marketimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getShopperExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/shopperPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'shopperimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};

export const getPromoExportPdfRequest = (params) => async (dispatch, getState) => {
    dispatch(setPDFCreateLoading({ message: 'Generating PDF...' }));
    try {
        const res = await axios.post(`${BASE_URL}/web/promoPdf`, params, {
            ...getHeaders(getState),
            responseType: 'blob'
        });
        downloadBlob(res.data, 'promoimages.pdf');
        dispatch(setFalseLoading());
    } catch (err) {
        console.error('PDF error:', err);
        dispatch(setFalseLoading());
    }
};
