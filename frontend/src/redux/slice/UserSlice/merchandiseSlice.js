import { createSlice } from '@reduxjs/toolkit';
import { getMerchandiseImagesApi } from '../../../service/api';
const initialState = {
    isLoading: false,
    images: [],
    errors: null,
    successMessage: ''
};


const mapSlice = createSlice({
    name: 'merchandise',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleImagesData: (state, action) => {
            state.images = action.payload;
            state.isLoading = false;
        },
        handleError: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        
    }
});

export const {
    setLoading,
    handleImagesData,
    handleError
} = mapSlice.actions;
export default mapSlice.reducer;

export const getMerchndiseImagesRequest = () => async (dispatch, getState) => {

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
        const { data } = await getMerchandiseImagesApi(config);
        const { statusCode } = data;

        if (statusCode === 200) {
            console.log(data?.data, 'data')
            dispatch(handleImagesData(data?.data?.paidUnpaid));
        }
    } catch (err) {
        dispatch(handleError(err));

    }
};

