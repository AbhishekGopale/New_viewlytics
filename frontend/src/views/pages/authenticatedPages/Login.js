import { LoginRequest, handleResetState, handleSetRole } from '../../../redux/slice/AdminSlice/authSlice';
import { loginlogo, bglogos } from '../../../indexMain';
import components from '../primeReactComponentsIndex';

const Login = () => {
    const { React, useEffect, useState, useRef, Link, useNavigate, useDispatch, useSelector, Toast, Button, InputText, classNames, Dropdown } = components;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [ passwordType, setPasswordType ] = useState('password');
    const [ submitted, setSubmitted ] = useState(false);
    const { errorMessage, roleName, isLoading } = useSelector((state) => state.auth);
    const [ values, setValues ] = useState({
        email: '',
        password: '',
        user_type: '1'
    });
    const roleTag = [
        { label: 'Admin', value: '1' },
        { label: 'Sub-Admin', value: '8' }
    ];
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
        dispatch(LoginRequest(values));
    };
    useEffect(() => {
        if (values.user_type != '') {
            dispatch(handleSetRole(values.user_type));
        }
        if (roleName != null && roleName == 'admin') {
            navigate('/admin/dashboard');
        } else if (roleName != null && roleName != 'admin') {
            navigate('/dashboard');
        }
    }, [ values.user_type, roleName, errorMessage ]);

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
                        <img src={loginlogo} style={{ width: '260px' }} alt="login-logo" />
                    </div>
                    <div className="input-panel card shadow-3  flex flex-column px-3">
                        <h5 className="text-center">Sign In</h5>
                        <div className="grid p-fluid mt-1">
                            <div className="field col-12 md:col-12 mb-1">
                                <Dropdown
                                    id="dropdown"
                                    required
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Select Role"
                                    options={roleTag}
                                    value={values.user_type}
                                    onChange={(e) => {
                                        setValues({ ...values, user_type: e.value });
                                    }}
                                    autoFocus
                                    className={classNames({ 'p-invalid': submitted && values.user_type == '' })}
                                />
                            </div>
                            <div className="field col-12 md:col-12 mb-1">
                                <span className="p-input-icon-left ">
                                    <i className="pi pi-user" />
                                    <InputText
                                        type="email"
                                        value={values.email}
                                        autoFocus
                                        placeholder="Username or email"
                                        onChange={(e) => {
                                            setValues({ ...values, email: e.target.value });
                                            setSubmitted(false);
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && errorMessage?.email })}
                                    />
                                </span>
                                {errorMessage ? <small className="error text-left">{errorMessage?.email}</small> : null}
                            </div>
                            <div className="field col-12 md:col-12 mb-1">
                                <span className="p-input-icon-right">
                                    <i className="pi pi-lock ml-2 " />
                                    {passwordType === 'password' ? <i className="pi pi-eye-slash" onClick={togglePassword}></i> : <i className="pi pi-eye" onClick={togglePassword}></i>}
                                    <InputText
                                        type={passwordType}
                                        value={values.password}
                                        style={{ paddingLeft: '34px' }}
                                        placeholder="Password"
                                        onKeyUp={handleKeyPress}
                                        onChange={(e) => {
                                            setValues({ ...values, password: e.target.value });
                                            setSubmitted(false);
                                        }}
                                        required
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.password })}
                                    />
                                </span>
                                {errorMessage ? <small className="error text-left">{errorMessage?.password}</small> : null}
                            </div>
                            <div className="mt-2 ml-auto">
                                <Link to="/forgotpassword" style={{ color: '#1565C0' }}>
                                    <span className="align-middle link-text">Forgot password?</span>
                                </Link>
                            </div>
                            <div className="col-12">
                                <Button className="login-button px-3 mt-4" loading={isLoading} id="submit" onClick={() => onSubmit()} label="Sign In"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
