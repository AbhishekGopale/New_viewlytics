import { createSlice } from '@reduxjs/toolkit';
import { GetMapDetailsAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
    mapData:null,
	errors: null,
	successMessage: ''
};


const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		handleAllGetMapData: (state, action) => {
			state.mapData = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetMapData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleError: (state, action) => {
			state.isLoading = false;
			state.mapData = null;
			state.errors = action.payload;
		},
	}
});

export const {
	setLoading,
    handleAllGetMapData,
    handleErrorAllGetMapData,
	handleError
} = mapSlice.actions;
export default mapSlice.reducer;

export const GetMapDetailsRequest = (id) => async (dispatch, getState) => {

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
		const { data } = await GetMapDetailsAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetMapData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorAllGetMapData(err));

	}
};

