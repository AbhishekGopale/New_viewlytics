import axios from 'axios';
const BASE_URL_API = process.env.REACT_APP_BASE_URL;

const getHeader = () => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*'
		}
	};
	return config;
};

export const AdminLoginAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/admin/login`, reqData, getHeader());
};
export const webLoginApi = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/web/login`, reqData, getHeader());
};

export const resetPasswordApi = async (token, reqData) => {
	return await axios.post(`${BASE_URL_API}/admin/reset_password/${token}`, reqData, getHeader());
};
export const ForgotPasswordAPI = async (reqData) => {
	return await axios.post(`${BASE_URL_API}/admin/forgotpassword`, reqData, getHeader());
};

export const GetAdminDashboardAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/dashboard`, config);
};
export const getProjectWiseDetailsApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/dashboard/projectwise/${id}`, config);
};

export const getProfileDetailsApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/profiles`, config);
};
export const changePasswordApi = async (userData, config) => {
	return await axios.post(`${BASE_URL_API}/app/profileresetpass`, userData, config);
};
export const AdminProfileUpdateAPI = async (id, updatedData, config) => {
	return await axios.put(`${BASE_URL_API}/admin/profiles/update/${id}`, updatedData, config);
};

//User API
export const GetAllUsersAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/user/list?${queryStr}`, config);
};
export const CreateUserAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/user/create`, createdData, config);
};
export const EditUserAPI = async (id, updatedData, config) => {
	return await axios.put(`${BASE_URL_API}/admin/user/update/${id}`, updatedData, config);
};
export const getUserAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/get/${id}`, config);
};
export const getNpmApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/npmlist`, config);
};
export const DeleteUserAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/user/delete/${id}`, config);
};
export const MultipalDeleteUserAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/user/deletemany`, deletedData, config);
};
export const GetAllPromoterAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/promlist`, config);
};
export const GetStoreListAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/store/store_list`, config);
};
export const GetAllMerchandiserAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/merlist`, config);
};
export const GetAllTeamleaderAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/tllist`, config);
};
export const GetAllAsmAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/asmlist`, config);
};
export const getAllUserNameApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/name/listing`, config);
};
export const GetAllTaApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/talist`, config);
};
export const GetAllStoreByIdAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/store/store_dropdown/${id}`, config);
};
//Store API
export const GetAllStoreAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/store/list?${queryStr}`, config);
};
export const GetAllStateAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/state`, config);
};
export const getUserRoleByNameApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/role/${id}`, config);
};
export const getChainByProjectIdApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/chain/chainonproject/${id}`, config);
};
export const GetAllCityAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/web/city/${id}`, config);
};
export const CreateStoreAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/store/create`, createdData, config);
};
export const EditStoreAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/store/update/${id}`, updatedData, config);
};
export const GetStoreAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/store/get/${id}`, config);
};
export const DeleteStoreAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/store/delete/${id}`, config);
};
export const MultipalDeleteStoreAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/store/deletemany`, deletedData, config);
};

//SKU API
export const GetAllSKUsAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/sku/list?${queryStr}`, config);
};
export const CreateSKUAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/sku/create`, createdData, config);
};
export const EditSKUAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/sku/update/${id}`, updatedData, config);
};
export const GetSKUAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/store/get/${id}`, config);
};
export const DeleteSKUAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/sku/delete/${id}`, config);
};
export const MultipalDeleteSKUAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/sku/deletemany`, deletedData, config);
};

//User Assign API
export const CreateUserAssignAPI = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/userassign/create`, reqData, config);
};
export const EditUserAssignAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/userassign/update/${id}`, updatedData, config);
};
export const GetUserAssignAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/userassign/get/${id}`, config);
};
export const DeleteUserAssignAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/userassign/delete/${id}`, config);
};
export const MultipalDeleteUserAssignAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/userassign/deletemany`, deletedData, config);
};
export const getUserIdApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/user/user_id/listing`, config);
};
export const getUserNameApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin//user/user_name/listing`, config);
};

//Promos API
export const GetAllPromosAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/promo/list?${queryStr}`, config);
};
export const CreatePromosAPI = async (createdData, config) => {
	console.log(createdData, 'createdData');
	return await axios.post(`${BASE_URL_API}/admin/promo/create`, createdData, config);
};
export const EditPromosAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/promo/update/${id}`, updatedData, config);
};
export const skuListByChainIdApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/sku/skuonchain/${id}`, config);
};
export const DeletePromosAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/promo/delete/${id}`, config);
};
export const MultipalDeletePromosAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/promo/deletemany`, deletedData, config);
};
export const GetAllChainSelectAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/chain/valuelabelChain`, config);
};
export const GetAllProjectSelectAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/project/valuelabelProject`, config);
};
export const importPromoApi = async (promoList, config) => {
	return await axios.post(`${BASE_URL_API}/admin/promo/excel`, promoList, config);
};

//Chain API
export const GetAllChainAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/chain/list?${queryStr}`, config);
};
export const CreateChainAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/chain/create`, createdData, config);
};
export const DeleteChainAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/chain/delete/${id}`, config);
};
export const EditChainAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/chain/update/${id}`, updatedData, config);
};
export const MultipalDeleteChainAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/chain/deletemany`, deletedData, config);
};
export const chainCreateApi = async (data, config) => {
	return await axios.post(`${BASE_URL_API}/admin/chain/create`, data, config);
};

//Project API
export const GetAllProjectAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/project/list?${queryStr}`, config);
};
export const CreateProjectAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/project/create`, createdData, config);
};
export const CreateProjectExcelAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/project/excel`, createdData, config);
};
export const DeleteProjectAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/project/delete/${id}`, config);
};
export const EditProjectAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/project/update/${id}`, updatedData, config);
};
export const MultipalDeleteProjectAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/project/deletemany`, deletedData, config);
};
export const projectImageUploadAPI = async (image, config) => {
	return await axios.post(`${BASE_URL_API}/admin/project/create`, image, config);
};

// zone API
export const createZoneAPI = async (values, config) => {
	return await axios.post(`${BASE_URL_API}/admin/create_zone`, values, config);
};
export const deleteZoneAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/delete/${id}`, config);
};
export const GetAllListAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/get_all_zone`, config);
};
export const getStateListAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/zone/getstate/${id}`, config);
};
export const GetAllStateApiList = async (queryStr, config) => {
	return await axios.get(`${BASE_URL_API}/web/state?zone=${queryStr}`, config);
};
export const updateZoneAPI = async (id, queryStr, config) => {
	return await axios.post(`${BASE_URL_API}/admin/zone/update/${id}`, queryStr, config);
};
export const GetZoneLableAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/zone/getAllZoneVl`, config);
};
export const GetProjectWiseZoneLableAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/project/zone/${id}`, config);
};
export const MultipalDeleteZoneAPI = async (deletedData, config) => {
	// return await axios.post(`${BASE_URL_API}/admin/chain/deletemany`, deletedData, config);
};

// Web API
export const GetDashboardDetailsAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/web/getdashboard/${id}`, config);
};

export const GetAttendanceAnalysisDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/getlist`, config);
};
export const getAttendanceReportDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/get_attendance_data_chainWiseindetail`, config);
};

export const GetSalesAnalysisDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/getlistsales`, config);
};
export const getSalesChainWiseSummaryDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/sales_data`, config);
};
export const getOssApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/oss_list`, config);
};

export const GetOutOfStockDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/getlistoos`, config);
};
export const GetShairOfShellDataApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/getlistsos`, config);
};
export const getSosListApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/sos_list`, config);
};
export const GetAllChainLabelAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/chain/valuelabelChain`, config);
};
export const GetAllTLLabelApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/tlist`, config);
};
export const getMerchandiseImagesApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/mercha_images`, config);
};
//Planner Task API
export const GetAllTaskListAPI = async (config, id) => {
	return await axios.get(`${BASE_URL_API}/admin/task/list/${id}`, config);
};

export const GetDateByTaskListAPI = async (taskData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/task/datebylist`, taskData, config);
};

export const CreateTaskAPI = async (values, config) => {
	return await axios.post(`${BASE_URL_API}/admin/task/create`, values, config);
};
export const MultipalDeleteTaskAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/task/deletemany`, deletedData, config);
};
export const DeleteTaskAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/task/delete/${id}`, config);
};
export const EditTaskAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/task/update/${id}`, updatedData, config);
};

// Target API
export const GetAllTargetAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/target/list?${queryStr}`, config);
};
export const CreateTargetAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/target/create`, createdData, config);
};
export const importTargetApi = async (reqData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/task/excel`, reqData, config);
};
export const EditTargetAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/target/update/${id}`, updatedData, config);
};
export const DeleteTargetAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/target/delete/${id}`, config);
};
export const getStoreByUserIdAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/store/storeonuser/${id}`, config);
};
export const getSkuListByStoreIdApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/sku/valuelabelsku/${id}`, config);
};
export const getClientDetailByIdApi = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/client/get/${id}`, config);
};
export const multipalDeleteTargetAPI = async (id, config) => {
	return await axios.post(`${BASE_URL_API}/admin/target/deletemany`, id, config);
};
export const GetAllUserassignStoreAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/target/list`, config);
};
export const GetAllCategoryAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/target/list`, config);
};
export const GetAllSkuLabelAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/sku/valuelabelsku`, config);
};

// Client Api
export const getAllClientApi = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/client/list?${queryStr}`, config);
};
export const createClientApi = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/client/create`, createdData, config);
};
export const deleteClientApi = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/client/delete/${id}`, config);
};
export const multipleDeleteClientApi = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/client/deleteMany`, deletedData, config);
};
export const getAllNpcListApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/client/npclist`, config);
};
export const getAllAseListApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/client/aselist`, config);
};
export const getAllSeListApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/client/selist`, config);
};
export const EditClientAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/client/update/${id}`, updatedData, config);
};

//Sub Admin API
export const GetAllSubAdminsAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/subadmin/getAll?${queryStr}`, config);
};

export const CreateSubAdminAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subadmin/create`, createdData, config);
};
export const EditSubAdminAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subadmin/update/${id}`, updatedData, config);
};
export const DeleteSubAdminAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/subadmin/delete/${id}`, config);
};
export const MultipalDeleteSubAdminAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subadmin/deletemany`, deletedData, config);
};
//On Request Form API
export const GetAllFromsAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/form/list?${queryStr}`, config);
};

export const CreateFormAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/form/create`, createdData, config);
};
export const EditFormAPI = async (id, updatedData, config) => {
	return await axios.patch(`${BASE_URL_API}/admin/form/update/${id}`, updatedData, config);
};
export const DeleteFormAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/form/delete/${id}`, config);
};
export const MultipalDeleteFormAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/form/deletemany`, deletedData, config);
};
export const GetAllProjectByUserAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/form/useronproject/${id}`, config);
};
// RolePermission API
export const GetSubAdminNameAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/subadmin/getallvl`, config);
};
export const CreateRolePermissionAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/subadmin/updatePermission`, createdData, config);
};
export const GetAllPermissionAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/subadmin/permission`, config);
};
export const GetSubAdminIdAPI = async (id, config) => {
	return await axios.get(`${BASE_URL_API}/admin/subadmin/get/${id}`, config);
};

//Map API
export const GetMapDetailsAPI = async (config) => {
	return await axios.get(`${BASE_URL_API}/web/map`, config);
};

//Category API
export const GetAllSkuCategoryAPI = async (config, queryStr) => {
	return await axios.get(`${BASE_URL_API}/admin/skucategory/list?${queryStr}`, config);
};
export const GetSkuCategoryLabelAPI = async (config, id) => {
	return await axios.get(`${BASE_URL_API}/admin/sku/categoryonproject/${id}`, config);
};

export const CreateCategoryAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/skucategory/create`, createdData, config);
};
export const CreateCategoryExcelAPI = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/skucategory/excel`, createdData, config);
};
export const DeleteCategoryAPI = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/skucategory/delete/${id}`, config);
};
export const EditCategoryAPI = async (id, updatedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/skucategory/update/${id}`, updatedData, config);
};
export const MultipalDeleteCAtegoryAPI = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/skucategory/deletemany`, deletedData, config);
};

// Broadcast Api

export const getBroadcastListApi = async (config) => {
	return await axios.get(`${BASE_URL_API}/admin/broadcasting/getall`, config);
};
export const createBroadcastApi = async (createdData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/broadcasting/create`, createdData, config);
};
export const projectWiseUserListApi = async (data, config) => {
	return await axios.post(`${BASE_URL_API}/admin/broadcasting/userlist`, data, config);
};
export const deleteBroadcastApi = async (id, config) => {
	return await axios.delete(`${BASE_URL_API}/admin/broadcasting/delete/${id}`, config);
};
export const multipleDeleteBroadcastApi = async (deletedData, config) => {
	return await axios.post(`${BASE_URL_API}/admin/broadcasting/deletemany`, deletedData, config);
};

// Aliases for casing and naming compatibility across Redux slices
export const chainImageUploadAPI = projectImageUploadAPI;
export const getUserRoleByNameAPI = getUserRoleByNameApi;
export const MultipalDeleteTargetAPI = multipalDeleteTargetAPI;
export const GetAllUserAssignAPI = GetUserAssignAPI;
export const GetAllTlApi = GetAllTLLabelApi;
export const GetUserAPI = getUserAPI;
export const DeleteZoneAPI = deleteZoneAPI;
export const GetChainWiseZoneLableAPI = GetZoneLableAPI;
export const getDashboardDetailsApi = GetDashboardDetailsAPI;

