import { handleResetState, resetPasswordRequest } from '../../../redux/slice/AdminSlice/authSlice';
import components from '../primeReactComponentsIndex';
import { loginlogo, bglogos } from '../../../indexMain';

const ResetPassword = () => {
    const { React, useEffect, useState, useRef, useParams, useNavigate, useDispatch, useSelector, Toast, Button, Password, classNames } = components;
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [ passwordType, setPasswordType ] = useState('password');
    const [ submitted, setSubmitted ] = useState(false);
    const [ errors, setErrors ] = useState({ emailError: '', passwordError: '' });
    const { successMessage, errorMessage, roleName, isLoading } = useSelector((state) => state.auth);
    const [ values, setValues ] = useState({
        password: '',
        confirmPassword: ''
    });
    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };
    const onSubmit = () => {
        dispatch(handleResetState());
        setSubmitted(true);
        const data = {
            password: values.password,
            comfirm_password: values.confirmPassword
        };
        dispatch(resetPasswordRequest(token, data));
    };
    useEffect(() => {
        if (successMessage != null) {
            navigate('/web/login');
        }
    }, [ successMessage ]);

    return (
        <div className="pages-body login-page flex flex-column">
            <Toast ref={toast} />
            <div className="loginpage">
                <div className="loginbg">
                    <div className="bglogo">
                        <img src={bglogos} alt="bg-logo" />
                    </div>
                </div>
                <div className="flex flex-column justify-content-center align-items-center ">
                    <div className="mb-6">
                        <img src={loginlogo} style={{ width: '230px' }} alt="login-logo" />
                    </div>
                    <div className="input-panel card shadow-3 flex flex-column px-3">
                        <h5 className="text-center">Reset Password</h5>
                        <div className="grid p-fluid mt-1">
                            <div className="field col-12 md:col-12 mb-1">
                                <label htmlFor="mobileno" className="required my-2">
                                    New Password
                                </label>
                                <span className="p-input-icon-left ">
                                    <i className="pi pi-user" />
                                    <Password
                                        // className="passwordInputField "
                                        onKeyUp={handleKeyPress}
                                        feedback={false}
                                        value={values.password}
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                        toggleMask
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.password })}
                                    />
                                </span>
                                {errorMessage ? <small className="error text-left">{errorMessage?.password}</small> : null}
                            </div>
                            <div className="field col-12 md:col-12 mb-1">
                                <label htmlFor="mobileno" className="required">
                                    Confirm New Password
                                </label>
                                <span className="p-input-icon-right">
                                    <i className="pi pi-lock ml-2 " />
                                    {passwordType === 'password' ? <i className="pi pi-eye-slash" onClick={togglePassword}></i> : <i className="pi pi-eye" onClick={togglePassword}></i>}
                                    <Password
                                        //  className="passwordInputField "
                                        feedback={false}
                                        value={values.confirmPassword}
                                        onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                                        toggleMask
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.comfirm_password })}
                                    />
                                </span>
                                {errorMessage ? <small className="error text-left">{errorMessage?.comfirm_password}</small> : null}
                            </div>
                            <div className="col-12">
                                <Button className="login-button px-3 mt-4" loading={isLoading} id="submit" onClick={() => onSubmit()} label="Submit"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
