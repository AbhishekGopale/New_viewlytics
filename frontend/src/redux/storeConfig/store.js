import rootReducer from '../slice/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: rootReducer,
    middleware: [ thunk ]
    // (getDefaultMiddleware) => {
    //     return getDefaultMiddleware({
    //         serializableCheck: false,
    //     });
    // },
});
export const persister = null;
export default store;




















// import { createStore, combineReducers } from 'redux';
// import authReducer from '../slice/AdminSlice/authSlice'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';


// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: [ 'auth' ],
// };

// const rootReducer = combineReducers({
//     auth: authReducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// let store = createStore(persistedReducer, window.devToolsExtension && window.devToolsExtension());
// let persister = persistStore(store);

// export { store, persister };

