import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';
import './assets/scss/style.scss'
import { Provider } from 'react-redux';
import { store } from './redux/storeConfig/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                {/* <PersistGate loading={null} persistor={persister}> */}
                <AppWrapper />
                {/* </PersistGate> */}
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
