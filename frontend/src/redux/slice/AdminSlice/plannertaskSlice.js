import { createSlice } from '@reduxjs/toolkit';
import { CreateTaskAPI, DeleteTaskAPI, EditTaskAPI, GetAllTaskListAPI, GetDateByTaskListAPI, MultipalDeleteTaskAPI } from '../../../service/api';

const initialState = {
    isLoading: false,
    taskDate: null,
    taskListdata: [],
    dateByTaskdata: null,
    createTaskdata: null,
    deletedTaskData: null,
    deletedMultiTaskData: null,
    userName: null,
    role: null,
    searchUser_id: null,
    editedTaskData: null,
    errors: null,
    successMessage: null,
};


const plannertaskSlice = createSlice({
    name: 'plannertask',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        handleSetUserDetails: (state, action) => {
            console.log(action.payload, 'pa')
            state.userName = action.payload?.name;
            state.role = action.payload?.role;
            state.isLoading = false;
        },
        handleSetSearchUserId: (state, action) => {
            state.searchUser_id = action.payload;
            state.isLoading = false;
        },
        handleSetData: (state, action) => {
            state.taskDate = action.payload;
            state.isLoading = false;
        },
        handleAllGetTaskData: (state, action) => {
            state.taskListdata = action.payload;
            state.isLoading = false;
        },
        handleErrorAllGetTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleGetDateByTaskData: (state, action) => {
            state.dateByTaskdata = action.payload;
            state.isLoading = false;
        },
        handleErrorGetDateByTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleCreateTaskData: (state, action) => {
            state.createTaskdata = action.payload;
            state.successMessage = action.payload?.message
            state.isLoading = false;
        },
        handleErrorCreateTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleDeleteTaskData: (state, action) => {
            state.successMessage = action.payload;
            state.isLoading = false;
            state.deletedTaskData = action.payload;
        },
        handleErrorDeleteTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleMultipalDeleteTaskData: (state, action) => {
            state.successMessage = action.payload;
            state.deletedMultiTaskData = action.payload;
            state.isLoading = false;
        },
        handleErrorMultipalDeleteTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleEditTaskData: (state, action) => {
            state.successMessage = action.payload;
            state.editedTaskData = action.payload;
            state.isLoading = false;
        },
        handleErrorTaskData: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        handleResetPlannerTask: (state) => {
            state.isLoading = false;
            state.taskListdata = null;
            state.createTaskdata = null;
            state.deletedTaskData = null;
            state.errors = null;
            state.deletedMultiTaskData = null;
            state.editedTaskData = null;
            state.successMessage = '';
        }

    }
});

export const {
    setLoading,
    handleAllGetTaskData,
    handleErrorAllGetTaskData,
    handleGetDateByTaskData,
    handleErrorGetDateByTaskData,
    handleCreateTaskData,
    handleErrorCreateTaskData,
    handleSetUserId,
    handleSetSearchUserId,
    handleDeleteTaskData,
    handleErrorDeleteTaskData,
    handleMultipalDeleteTaskData,
    handleErrorMultipalDeleteTaskData,
    handleEditTaskData,
    handleErrorTaskData,
    handleSetUserDetails,
    handleResetPlannerTask,
    handleSetData
} = plannertaskSlice.actions;
export default plannertaskSlice.reducer;

export const GetAllTaskListRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await GetAllTaskListAPI(config, id);
        const { statusCode, data: taskData } = data;

        if (statusCode === 200) {
            dispatch(handleAllGetTaskData(taskData));
        }
    } catch (err) {
        dispatch(handleErrorAllGetTaskData(err));
    }
};
export const GetDateByTaskListRequest = (taskData) => async (dispatch, getState) => {
    dispatch(setLoading());
    dispatch(handleSetData(taskData?.date));

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                Authorization: getState()?.auth?.token,
            },
        };
        const { data } = await GetDateByTaskListAPI(taskData, config);
        const { statusCode, data: dateByData } = data;

        if (statusCode === 200) {
            dispatch(handleGetDateByTaskData(dateByData));
        }
    } catch (err) {
        dispatch(handleErrorGetDateByTaskData(err));
    }
};
export const CreateTaskRequest = (reqData) => async (dispatch, getState) => {
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
        const { data } = await CreateTaskAPI(reqData, config);

        const { statusCode } = data;

        if (statusCode === 201) {
            dispatch(handleCreateTaskData(data));

        }
    } catch (error) {
        if (error.response && error.response.data.errors) {

            return dispatch(handleErrorCreateTaskData(error.response.data.errors));

        } else {
            return dispatch(handleErrorCreateTaskData(error.message));
        }
    }
};
export const DeleteTaskRequest = (id) => async (dispatch, getState) => {
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
        const { data } = await DeleteTaskAPI(id, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleDeleteTaskData(data.message));
        }
    } catch (err) {
        dispatch(handleErrorDeleteTaskData(err));
    }
};
export const MultipalDeleteTaskRequest = (MultiData) => async (dispatch, getState) => {
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
        const { data } = await MultipalDeleteTaskAPI(MultiData, config);

        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleMultipalDeleteTaskData(MultiData));
        }
    } catch (err) {
        dispatch(handleErrorMultipalDeleteTaskData(err));
    }
};
export const EditTaskRequest = (id, updatedStoreData) => async (dispatch, getState) => {
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
        const { data } = await EditTaskAPI(id, updatedStoreData, config);
        const { statusCode } = data;

        if (statusCode === 200) {
            dispatch(handleEditTaskData(data.data));
        }
    } catch (error) {
        if (error.response && error.response.data.errors) {
            return dispatch(handleErrorTaskData(error.response.data.errors));
        } else {
            return dispatch(handleErrorTaskData(error.message));
        }
    }
};

