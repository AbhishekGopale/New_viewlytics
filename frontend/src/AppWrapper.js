import React, { useEffect } from 'react';
import { Route, Routes, useLocation, } from 'react-router-dom';
import App from './App';
import AuthRoute from './routes/AuthRoute';
import { Error, WebLogin, Login, ForgotPassword, ResetPassword } from './indexMain';

const AppWrapper = (props) => {
    let location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [ location ]);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/web/login" element={<WebLogin />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {/* <Route path="/admin/profile" element={<Profile/>}/> */}
            <Route path="/error" element={<Error />} />
            <Route
                path="*"
                element={
                    <AuthRoute>
                        <App />
                    </AuthRoute>
                }
            />
        </Routes>
    );
};

export default AppWrapper;
