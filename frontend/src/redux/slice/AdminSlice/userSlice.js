import { createSlice } from '@reduxjs/toolkit';
import { CreateUserAPI, DeleteUserAPI, EditUserAPI, GetAllAsmAPI, GetAllMerchandiserAPI, GetAllPromoterAPI, GetAllStoreByIdAPI, GetAllTaApi, GetAllTeamleaderAPI, GetAllTlApi, GetAllUsersAPI, GetStoreListAPI, GetUserAPI, MultipalDeleteUserAPI, getAllUserNameApi, getNpmApi, getUserAPI } from '../../../service/api';

const initialState = {
	isLoading: false,
	isAddModalShow: false,
	isEditModalShow: false,
	isUserCardOpen: false,
	userData: null,
	createdUserData: null,
	editedUserData: null,
	getByIdUserData: [],
	getByUserNameData: [],
	deletedUserData: null,
	deletedMultiUserData: null,
	merchandiserList: [],
	taList: [],
	promoterList: [],
	teamLeaderList: [],
	asmList: [],
	npmList: [],
	storeList: [],
	errors: null,
	successMessage: ''
};


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		toggleAddModal: (state, action) => {
			state.isAddModalShow = action.payload;
		},
		toggleEditModal: (state, action) => {
			state.isEditModalShow = action.payload;
		},
		toggleUserCard: (state, action) => {
			state.isUserCardOpen = action.payload;
		},
		handleAllGetUserData: (state, action) => {
			state.userData = action.payload;
			state.isLoading = false;
		},
		handleAllGetAllNpmList: (state, action) => {
			state.npmList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleCreateUserData: (state, action) => {
			state.createdUserData = action.payload;
			state.successMessage = action.payload?.message
			state.isLoading = false;
		},
		handleErrorCreateUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleEditUserData: (state, action) => {
			state.editedUserData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleGetUserData: (state, action) => {
			state.getByIdUserData = action.payload;
			state.isLoading = false;
		},
		handleGetUserNameData: (state, action) => {
			state.getByUserNameData = action.payload;
			state.isLoading = false;
		},
		handleErrorGetUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleDeleteUserData: (state, action) => {
			state.successMessage = action.payload.message;
			state.deletedUserData = action.payload;
			state.isLoading = false;
		},
		handleErrorDeleteUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleMultipalDeleteUserData: (state, action) => {
			state.deletedMultiUserData = action.payload;
			state.isLoading = false;
			state.successMessage = action.payload.message;
		},
		handleErrorMultipalDeleteUserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetMerchandiserData: (state, action) => {
			state.merchandiserList = action.payload;
			state.isLoading = false;
		},
		handleAllGetStoreListData: (state, action) => {
			state.storeList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetMerchandiserData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetPromoterData: (state, action) => {
			state.promoterList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetPromoterData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetTeamleaderData: (state, action) => {
			state.teamLeaderList = action.payload;
			state.isLoading = false;
		},
		handleAllGetTaData: (state, action) => {
			state.taList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetTaData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleErrorAllUserNameData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleAllGetAsmData: (state, action) => {
			state.asmList = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetTeamleaderData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetAsmData: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleErrorAllGetStoreList: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},
		handleError: (state, action) => {
			state.errors = action.payload;
			state.isLoading = false;
		},

		handleResetUser: (state) => {
			state.isLoading = false;
			state.userData = null;
			state.createdUserData = null;
			state.editedUserData = null;
			state.getByIdUserData = null;
			state.deletedUserData = null;
			state.deletedMultiUserData = null;
			state.merchandiserList = null;
			state.promoterData = null;
			state.teamleaderData = null;
			state.successMessage = null;
			state.errors = null;
		},
		resetData: (state) => {
			state.successMessage = '';
			state.errors = ''
		}
	}
});

export const {
	setLoading,
	toggleAddModal,
	toggleEditModal,
	toggleUserCard,
	handleAllGetUserData,
	handleErrorAllGetUserData,
	handleCreateUserData,
	handleErrorCreateUserData,
	handleEditUserData,
	handleErrorUserData,
	handleGetUserData,
	handleErrorGetUserData,
	handleDeleteUserData,
	handleErrorDeleteUserData,
	handleMultipalDeleteUserData,
	handleErrorMultipalDeleteUserData,
	handleAllGetMerchandiserData,
	handleErrorAllGetMerchandiserData,
	handleAllGetPromoterData,
	handleErrorAllGetPromoterData,
	handleAllGetTeamleaderData,
	handleAllGetStoreListData,
	handleErrorAllGetTeamleaderData,
	handleResetUser,
	handleAllGetAsmData,
	handleErrorAllGetAsmData,
	handleErrorAllGetStoreList,
	handleAllGetTaData,
	handleErrorAllGetTaData,
	handleGetUserNameData,
	handleErrorAllUserNameData,
	resetData,
	handleAllGetAllNpmList,
	handleError
} = userSlice.actions;
export default userSlice.reducer;

export const GetAllUserRequest = (queryStr) => async (dispatch, getState) => {
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
		const { data } = await GetAllUsersAPI(config, queryStr);
		const { statusCode, data: UserData } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetUserData(UserData));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorAllGetUserData(error));
		} else {
			dispatch(handleErrorAllGetUserData(error.message));
		}
	}
};

export const CreateUserRequest = (reqData) => async (dispatch, getState) => {
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
		const { data } = await CreateUserAPI(reqData, config);

		const { statusCode } = data;

		if (statusCode === 201) {
			dispatch(handleCreateUserData(data));

		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorCreateUserData(error.response.data.errors));
		} else {
			return dispatch(handleErrorCreateUserData(error.message));
		}
	}
};


export const EditUserRequest = (id, reqData) => async (dispatch, getState) => {
	dispatch(setLoading());


	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				// 'Authorization': token,
				'Authorization': getState()?.auth?.token,
			},
		};
		const { data } = await EditUserAPI(id, reqData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleEditUserData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			return dispatch(handleErrorUserData(error.response.data.errors));
		} else {
			return dispatch(handleErrorUserData(error.message));
		}
	}
};

export const getAllNpmRequest = () => async (dispatch, getState) => {
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
		const { data } = await getNpmApi(config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetAllNpmList(data.data.npm));
		}
	} catch (error) {
		return dispatch(handleError(error.message));
	}
};
export const getUserRequest = (id, token) => async (dispatch, getState) => {
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
		const { data } = await getUserAPI(id, config);

		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleGetUserData(data.data.User));
		}
	} catch (error) {
		return dispatch(handleErrorGetUserData(error.message));
	}
};

export const DeleteUserRequest = (id) => async (dispatch, getState) => {
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
		const { data } = await DeleteUserAPI(id, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleDeleteUserData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorDeleteUserData(error.response.data.errors));
		} else {
			dispatch(handleErrorDeleteUserData(error.message));
		}
	}
};

export const MultipalDeleteUserRequest = (MultiData) => async (dispatch, getState) => {
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
		const { data } = await MultipalDeleteUserAPI(MultiData, config);
		const { statusCode } = data;

		if (statusCode === 200) {
			dispatch(handleMultipalDeleteUserData(data));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorMultipalDeleteUserData(error.response.data.errors));
		} else {
			return dispatch(handleErrorMultipalDeleteUserData(error.message));
		}
	}
};

export const getAllMerchandiserRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllMerchandiserAPI(config);
		const { statusCode, data: MerchandiserData } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetMerchandiserData(MerchandiserData?.Merchandiser));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorAllGetMerchandiserData(error.response.data.errors));
		} else {
			dispatch(handleErrorAllGetMerchandiserData(error.message));
		}
	}
};

export const getAllPromoterRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllPromoterAPI(config);
		const { statusCode, data: promoterList } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetPromoterData(promoterList?.Promoter));
		}
	} catch (error) {
		if (error.response && error.response.data.errors) {
			dispatch(handleErrorAllGetPromoterData(error.response.data.errors));
		} else {
			dispatch(handleErrorAllGetPromoterData(error.message));
		}
	}
};
export const getAllStoreLabelRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetStoreListAPI(config);
		const { statusCode, data: Store } = data;

		if (statusCode === 200) {
			dispatch(handleAllGetStoreListData(Store.Store));
		}
	} catch (error) {
		dispatch(handleErrorAllGetStoreList(error));
	}
};

export const getAllTeamLeaderRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllTeamleaderAPI(config);
		const { statusCode, data: TLList } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetTeamleaderData(TLList.TL));
		}
	} catch (err) {
		dispatch(handleErrorAllGetTeamleaderData(err));
	}
};

export const getAllUserNameRequest = () => async (dispatch, getState) => {
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
		const { data } = await getAllUserNameApi(config);
		const { statusCode } = data;
		if (statusCode === 200) {
			dispatch(handleGetUserNameData(data.data.user));
		}
	} catch (err) {
		dispatch(handleErrorAllUserNameData(err));
	}
};
export const getAllTaRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllTaApi(config);
		const { statusCode } = data;
		if (statusCode === 200) {

			// console.log("here i am")
			// console.log(data.data.ta)
			dispatch(handleAllGetTaData(data.data.ta));
		}
	} catch (err) {
		dispatch(handleErrorAllGetTaData(err));
	}
};
export const getAllAsmRequest = () => async (dispatch, getState) => {
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
		const { data } = await GetAllAsmAPI(config);
		const { statusCode, data: Asm } = data;
		if (statusCode === 200) {
			dispatch(handleAllGetAsmData(Asm.Asm));
		}
	} catch (err) {
		dispatch(handleErrorAllGetAsmData(err));
	}
};
export const getAllStoreByIdRequest = (id, token) => async (dispatch, getState) => {
	dispatch(setLoading());
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
				'Authorization': token,
			},
		};
		const { data } = await GetAllStoreByIdAPI(id, config);
		// const { statusCode, data: Asm } = data;

		// if (statusCode === 200) {
		// dispatch(handleAllGetAsmData(Asm.Asm));
		// }
	} catch (err) {
		// dispatch(handleErrorAllGetAsmData(err));
	}
};