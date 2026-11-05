import { createSlice } from '@reduxjs/toolkit';
import { CreateChainAPI, DeleteChainAPI, DeleteZoneAPI, EditChainAPI, GetAllChainAPI, GetAllListAPI, MultipalDeleteChainAPI, chainImageUploadAPI, createZoneAPI, deleteZoneAPI, getStateListAPI, updateZoneAPI, MultipalDeleteZoneAPI, GetZoneLableAPI, GetChainWiseZoneLableAPI, GetProjectWiseZoneLableAPI } from '../../../service/api';

const initialState = {
    isLoading: false,
    zoneData: [],
    stateDataList: [],
    zoneList:null,
    projectZoneList:null,
    createdChainData: null,
    deletedChainData: null,
    editedChainData: null,
    deletedMultiChainData: null,
    deletedMultiZoneData: null,
    successMessage: null,
    errors: null
};

const zoneSlice = createSlice({
    name: 'zone',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleGetAllZoneData: (state, action) => {
            state.zoneData = action.payload;
            state.isLoading = false;
        },
        handleGetAllStateData: (state, action) => {
            state.stateDataList = action.payload;
            state.isLoading = false;
        },
        handleSuccess: (state, action) => {
            state.isLoading = false;
            state.successMessage = action.payload;
        },
        handleError: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload;
        },
        handleMultipalDeleteZoneData: (state, action) => {
            state.deletedMultiZoneData = action.payload;
            state.isLoading = false;
        },
        handleErrorMultipalDeleteZoneData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleGetZoneData: (state, action) => {
			state.zoneList = action.payload;
			state.isLoading = false;
		},
		handleErrorGetZoneData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
        handleGetProjectWiseZoneData: (state, action) => {
			state.projectZoneList = action.payload;
			state.isLoading = false;
		},
		handleErrorGetProjectWiseZoneData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
        handleResetZoneData: (state) => {
            state.isLoading = false;
            state.errors = null;
            state.deletedMultiZoneData = null;
            state.zoneList= null;
            state.projectZoneList=null;
            state.successMessage = null;
        }
    }
});

export const { setLoading, handleGetAllZoneData, handleGetAllStateData, handleSuccess, handleError, handleResetZoneData, handleMultipalDeleteZoneData, handleErrorMultipalDeleteZoneData, handleGetZoneData,handleErrorGetZoneData, handleGetProjectWiseZoneData,handleErrorGetProjectWiseZoneData} = zoneSlice.actions;
export default zoneSlice.reducer;

export const GetAllZoneListRequest = (queryStr) => async (dispatch, getState) => {
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
        const { data } = await GetAllListAPI(config, queryStr);
        const { statusCode, data: Zone } = data;
        if (statusCode === 200) {
            dispatch(handleGetAllZoneData(Zone));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const deleteZoneRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await deleteZoneAPI(id, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleSuccess(data?.message));
        }
    } catch (err) {
        dispatch(handleError(err));
    }
};

export const zoneCreateRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await createZoneAPI(reqData, config);
        const { statusCode, message } = data;
        if (statusCode === 201) {
            dispatch(handleSuccess(message));
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleError(error.response.data.errors));
        } else {
            return dispatch(handleError(error.message));
        }
    }
};
export const stateListRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await getStateListAPI(id, config);
        const { statusCode } = data;
        if (statusCode === 200) {
            dispatch(handleGetAllStateData(data?.data?.state));
        }
    } catch (error) {
        return dispatch(handleError(error.message));
    }
};
export const zoneUpdateRequest = (id, queryStr) => async (dispatch, getState) => {
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
        const { data } = await updateZoneAPI(id, queryStr, config);
        const { statusCode } = data;
        if (statusCode === 200) {
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
export const MultipalDeleteZoneRequest = (MultiData) => async (dispatch, getState) => {
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
        const { data } = await MultipalDeleteZoneAPI(MultiData, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleMultipalDeleteZoneData(MultiData));
        }
    } catch (err) {
        dispatch(handleErrorMultipalDeleteZoneData(err));
    }
};
export const getZoneLableRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetZoneLableAPI(config);
		const { statusCode, data:zone } = data;
		if (statusCode === 200) {
			dispatch(handleGetZoneData(zone?.Zone));
		}
	} catch (err) {
		dispatch(handleErrorGetZoneData(err));
	}
};
export const getProjectWiseZoneLableRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetProjectWiseZoneLableAPI(id,config);
		const { statusCode, data:zone } = data;
		if (statusCode === 200) {
			dispatch(handleGetProjectWiseZoneData(zone?.zone));
		}
	} catch (err) {
		dispatch(handleErrorGetProjectWiseZoneData(err));
	}
};