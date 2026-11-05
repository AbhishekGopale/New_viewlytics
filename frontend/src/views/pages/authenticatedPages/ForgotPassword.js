import { ForgotPasswordRequest, handleResetState } from '../../../redux/slice/AdminSlice/authSlice';
import { loginlogo, bglogos } from '../../../indexMain';

import components from '../primeReactComponentsIndex';
const ForgetPassword = () => {
    const { React, useEffect, useRef, useState, useDispatch, useNavigate, useSelector, Toast, Button, InputText, classNames } = components;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [ email, setEmail ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const { errorMessage, successMessage } = useSelector((state) => state.auth);

    const handleSave = (e) => {
        setSubmitted(true);
        dispatch(ForgotPasswordRequest({ email: email }));
        dispatch(handleResetState());
    };

    const goBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        if (successMessage !== null) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: successMessage, life: 7000 });
            setEmail('');
        }
        return () => {
            dispatch(handleResetState());
        };
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
                        <img src={loginlogo} style={{ width: '260px' }} alt="login-logo" />
                    </div>
                    <div className="input-panel card shadow-3 flex flex-column px-3">
                        <h5 className="text-center">
                            Forgot Password?
                            <i class="pi pi-lock ml-2" style={{ fontSize: '1.3rem' }} />
                        </h5>
                        <p style={{ color: '#6e6767' }}>Enter your email and we'll send you instructions to reset your password</p>
                        <div className="grid p-fluid mt-1">
                            <div className="field col-12 md:col-12 mb-1">
                                <span className="p-input-icon-left ">
                                    <i className="pi pi-envelope text-xl" />
                                    <InputText type="text" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus className={classNames({ 'p-invalid': submitted && errorMessage?.email })} />
                                </span>
                                {errorMessage && errorMessage.email !== '' ? <small className="error text-left">{errorMessage.email}</small> : null}
                            </div>
                            <div className="col-12">
                                <Button className="login-button  px-3 border-round-3xl mt-6" onClick={(e) => handleSave(e)} label="Send reset link"></Button>
                            </div>
                            <div className="text-center mt-2">
                                <Button style={{ all: 'unset', color: '#1565C0' }} onClick={goBack}>
                                    <i className=" pi pi-angle-left" />
                                    <span className="align-middle link-text">Back to login</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
