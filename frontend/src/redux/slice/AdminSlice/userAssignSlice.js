import { createSlice } from '@reduxjs/toolkit';
import { CreateUserAssignAPI, DeleteUserAssignAPI, EditUserAssignAPI, GetAllUserAssignAPI, GetUserAssignAPI, MultipalDeleteUserAssignAPI, getUserIdApi, getUserNameApi, DeleteStoreAPI, MultipalDeleteStoreAPI, EditStoreAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
	// userAssignData: null,
	createdUserAssignData: null,
	editedUserAssignData: null,
	getByIdUserAssignData: null,
	deletedUserAssignData: null,
	deletedMultiUserAssignData: null,
	userIdData: [],
	userNameData: [],
	successMessage: null,
	error: null
};

const userAssignSlice = createSlice({
	name: 'userAssign',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		// handleAllGetUserAssignData: (state, action) => {
		// 	state.userAssignData = action.payload;
		// 	state.isLoading = false;
		// },
		// handleErrorAllGetUserAssignData: (state, action) => {
		// 	state.error = action.payload;
		// 	state.isLoading = false;
		// },
		handleCreateUserAssignData: (state, action) => {
			state.createdUserAssignData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorCreateUserAssignData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleEditUserAssignData: (state, action) => {
			state.editedUserAssignData = action.payload;
			state.isLoading = false;
		},
		handleErrorUserAssignData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleGetUserAssignData: (state, action) => {
			state.getByIdUserAssignData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetUserAssignData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleDeleteUserAssignData: (state, action) => {
			state.deletedUserAssignData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteUserAssignData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteUserAssignData: (state, action) => {
			state.deletedMultiUserAssignData = action.payload;
			state.successMessage = action.payload;
			state.isLoading = false;
		},
		handleErrorMultipalDeleteUserAssignData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		handleUserIdData: (state, action) => {
			state.userIdData = action.payload;
			state.isLoading = false;
		},
		handleUserNameData: (state, action) => {
			state.userNameData = action.payload;
			state.isLoading = false;
		},
		handleErrorUserIdData: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},

		handleResetUserAssign: (state) => {
			state.isLoading = false;
			// state.userAssignData = null;
			state.createdUserAssignData = null;
			state.editedUserAssignData = null;
			state.getByIdUserAssignData = null;
			state.deletedUserAssignData = null;
			state.deletedMultiUserAssignData = null;
			state.userIdData = [];
			state.userNameData = [];
			state.error = null;
			state.successMessage = null;
		},
	}
});

export const {
	setLoading,
	// handleAllGetUserAssignData,
	// handleErrorAllGetUserAssignData,
	handleCreateUserAssignData,
	handleErrorCreateUserAssignData,
	handleEditUserAssignData,
	handleErrorUserAssignData,
	handleGetUserAssignData,
	handleErrorGetUserAssignData,
	handleDeleteUserAssignData,
	handleErrorDeleteUserAssignData,
	handleMultipalDeleteUserAssignData,
	handleErrorMultipalDeleteUserAssignData,
	handleResetUserAssign,
	handleUserIdData,
	handleErrorUserIdData,
	handleUserNameData
} = userAssignSlice.actions;
export default userAssignSlice.reducer;

// export const GetAllUserAssignRequest = () => async (dispatch) => {
// 	dispatch(setLoading());
// 	try {
// 		const config = {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Access-Control-Allow-Origin': '*',
// 				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// 				// Authorization: auth?.token,
// 			},
// 		};
// 		const { data } = await GetAllUserAssignAPI(config);
// 		const { statusCode, data: UserAssignData } = data;

// 		if (statusCode === 200) {
// 			dispatch(handleAllGetUserAssignData(UserAssignData));
// 		}
// 	} catch (err) {
// 		dispatch(handleErrorAllGetUserAssignData(err));
// 	}
// };

export const CreateUserAssignRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateUserAssignAPI(reqData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleCreateUserAssignData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateUserAssignData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateUserAssignData(error.message));
		}
	}
};

export const EditUserAssignRequest = (id, reqData) => async (dispatch, getState) => {
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
		const { data } = await EditStoreAPI(id, reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditUserAssignData(data.data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorUserAssignData(error.response.data.errors));
		} else {
			return dispatch(handleErrorUserAssignData(error.message));
		}
	}
};

export const GetUserAssignRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await GetUserAssignAPI(id, config);

		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleGetUserAssignData(data.data));
		}
	} catch (err) {
		dispatch(handleErrorGetUserAssignData(err));
	}
};

export const DeleteUserAssignRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteStoreAPI(id, config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleDeleteUserAssignData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorDeleteUserAssignData(err));
	}
};

export const MultipalDeleteUserAssignRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteStoreAPI(MultiData, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleMultipalDeleteUserAssignData(data?.message));
		}
	} catch (err) {
		dispatch(handleErrorMultipalDeleteUserAssignData(err));
	}
};
export const getUserIdRequest = () => async (dispatch, getState) => {
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
		const { data } = await getUserIdApi(config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleUserIdData(data?.data?.user));
		}
	} catch (err) {
		dispatch(handleErrorUserIdData(err));
	}
};
export const getUserNameRequest = () => async (dispatch, getState) => {
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
		const { data } = await getUserNameApi(config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleUserNameData(data?.data?.user));
		}
	} catch (err) {
		dispatch(handleErrorUserIdData(err));
	}
};
