// ** Reducers Imports

import auth from './AdminSlice/authSlice';
import user from './AdminSlice/userSlice';
import store from './AdminSlice/storeSlice';
import chain from './AdminSlice/chainSlice';
import sku from './AdminSlice/skuSlice';
import project from './AdminSlice/projectSlice';
import userAssign from './AdminSlice/userAssignSlice';
import promos from './AdminSlice/promosSlice';
import dashboard from './AdminSlice/dashboardSlice';
import zone from './AdminSlice/zoneSlice';
import plannertask from './AdminSlice/plannertaskSlice';
import target from './AdminSlice/targetSlice';
import subAdmin from './AdminSlice/subadminSlice';
import requestForm from './AdminSlice/onRequestFormSlice';
import client from './AdminSlice/clientSlice';
import category from './AdminSlice/categorySlice';
import broadcast from './AdminSlice/broadcastSlice';
import userDashboard from './UserSlice/userDashboardSlice';
import map from './UserSlice/mapSlice';
import merchandise from './UserSlice/merchandiseSlice';
import merchandiseImg from './UserSlice/merchandiseImgSlice';
import reports from './AdminSlice/reportSlice';
const rootReducer = {
    auth,
    user,
    project,
    store,
    chain,
    sku,
    userAssign,
    promos,
    dashboard,
    userDashboard,
    zone,
    plannertask,
    target,
    subAdmin,
    requestForm,
    client,
    map,
    category,
    broadcast,
    merchandise,
    merchandiseImg,
    reports
};

export default rootReducer;
