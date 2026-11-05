import { adminProfileUpdateRequest, changePasswordRequest, getProfileDetailsRequest } from '../../../redux/slice/AdminSlice/authSlice';
import components from '../primeReactComponentsIndex';
import { blankuser } from '../../../indexMain';

const Profile = () => {
    const { React, useState, useRef, useEffect, useNavigate, useDispatch, useSelector, Toast, Button, InputText, classNames, Calendar, Password, TabView, RadioButton, InputNumber, TabPanel } = components;
    const toast = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, profileDetails, roleName, successMessage, errorMessage } = useSelector((store) => store.auth);
    const [ submitted, setSubmitted ] = useState(false);
    const [ values, setValues ] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        currentPassword: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dob: '',
        image: '',
        imagePreview: '',
        isImageChange: false
    });

    const handleReset = () => {
        setValues({
            ...values,
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            mobile_no: '',
            currentPassword: '',
            password: '',
            confirmPassword: '',
            gender: 'male',
            dob: null,
            profileImage: '',
            isImageChange: false
        });
    };
    const handleUpdate = () => {
        setSubmitted(true);
        if (values.isImageChange) {
            let formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('mobile_no', values.mobile_no);
            formData.append('gender', values.gender);
            formData.append('dob', new Date(values.dob));
            formData.append('image', values.image);
            dispatch(adminProfileUpdateRequest(values.id, formData, token));
        } else {
            let formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('mobile_no', values.mobile_no);
            formData.append('gender', values.gender);
            formData.append('dob', new Date(values.dob));
            formData.append('image', values.imagePreview);
            dispatch(adminProfileUpdateRequest(values.id, formData, token));
        }
    };
    const handleCancel = () => {
        if (roleName == 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/dashboard');
        }
        handleReset();
    };
    const handleUpdatePassword = () => {
        setSubmitted(true);
        const userData = {
            current_password: values.currentPassword,
            password: values.password,
            confirmPassword: values.confirmPassword
        };
        dispatch(changePasswordRequest(userData, token));
    };
    useEffect(() => {
        dispatch(getProfileDetailsRequest(token));
    }, []);
    useEffect(() => {
        if (profileDetails != null) {
            setValues({
                ...values,
                id: profileDetails.id,
                first_name: profileDetails.first_name,
                last_name: profileDetails.last_name,
                email: profileDetails.email,
                mobile_no: profileDetails.mobile_no,
                gender: profileDetails.gender,
                imagePreview: profileDetails?.profile_image,
                dob: new Date(profileDetails.dob)
            });
        }
        if (successMessage != null) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: successMessage, life: 3000 });
            dispatch(getProfileDetailsRequest(token));
            if (roleName == 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
            handleReset();
        }
    }, [ profileDetails, successMessage ]);
    return (
        <div className="profile-main-component profile">
            <Toast ref={toast} />
            <div className="grid crud-demo p-3 ">
                <div className="card col-12">
                    <h5 className="profile p-3 mb-1">Account Settings</h5>
                    <TabView>
                        <TabPanel header="Account" leftIcon="pi pi-user mr-2" className="mx-2">
                            <div className="flex flex-column m-3">
                                <label htmlFor="profile ">Profile Image</label>
                                <div className="flex flex-row mt-2 ">
                                    <div className="profileimg">{values.imagePreview != '' ? <img src={values.imagePreview} /> : <img src={blankuser} />}</div>
                                    <div className="flex align-items-center justify-content-center mx-4">
                                        <input
                                            type="file"
                                            id="imgfile"
                                            hidden
                                            onChange={(e) => {
                                                setValues({
                                                    ...values,
                                                    image: e.target.files[ 0 ],
                                                    imagePreview: URL.createObjectURL(e.target.files[ 0 ]),
                                                    isImageChange: true
                                                });
                                            }}
                                        />
                                        <label htmlFor="imgfile" className="flex justify-content-center align-items-center mt-2 p-button ">
                                            <i className="pi pi-upload mr-3"></i>
                                            <span className="text-lg font-bold cursor-pointer ">Change image</span>
                                        </label>
                                    </div>
                                    <div className="flex align-items-center justify-content-center mt-2">
                                        <Button
                                            label="Remove"
                                            disabled={values.imagePreview == '' ? true : false}
                                            className="p-button-outlined p-button-danger"
                                            onClick={() =>
                                                setValues({
                                                    ...values,
                                                    imagePreview: ''
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className="ml-3">Allowed JPG, GIF or PNG. Max size of 800kB</p>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        First Name
                                    </label>
                                    <InputText
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        required
                                        type="text"
                                        value={values.first_name}
                                        onChange={(e) => setValues({ ...values, first_name: e.target.value })}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.first_name })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="lastname" className="required">
                                        Last Name
                                    </label>
                                    <InputText
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        value={values.last_name}
                                        onChange={(e) => setValues({ ...values, last_name: e.target.value })}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && errorMessage?.last_name })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.last_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="email" className="required">
                                        E-Mail ID
                                    </label>
                                    <InputText
                                        id="email"
                                        placeholder="Enter Email Id"
                                        type="email"
                                        value={values.email}
                                        autoFocus
                                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && errorMessage?.email })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.email}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="mobileno" className="required">
                                        Mobile Number
                                    </label>
                                    <InputNumber
                                        id="mobile_no"
                                        type="tel"
                                        useGrouping={false}
                                        maxLength={10}
                                        placeholder="Enter Mobile No"
                                        name="mobile_no"
                                        value={values.mobile_no}
                                        onValueChange={(e) => setValues({ ...values, mobile_no: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && errorMessage?.mobile_no })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="mobileno" className="required ">
                                        Birth Date
                                    </label>
                                    <Calendar showButtonBar dateFormat="dd/mm/yy" placeholder="dd/mm/yy" options={{ maxDate: 'today' }} value={values.dob} maxDate={new Date()} onChange={(e) => setValues({ ...values, dob: e.value })} />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.dob}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="gender">Gender</label>
                                    <div className="flex ml-2">
                                        <div className="flex align-items-center mr-3">
                                            <RadioButton inputId="male1" name="gender" value="male" onChange={(e) => setValues({ ...values, gender: e.value })} checked={values.gender === 'male'} />
                                            <label htmlFor="male1" className="ml-2">
                                                Male
                                            </label>
                                        </div>
                                        <div className="flex align-items-center">
                                            <RadioButton inputId="female1" name="gender" value="female" onChange={(e) => setValues({ ...values, gender: e.value })} checked={values.gender === 'female'} />
                                            <label htmlFor="female1" className="ml-2">
                                                Female
                                            </label>
                                        </div>
                                        {errorMessage ? <small className="p-invalid error">{errorMessage?.gender}</small> : null}
                                    </div>
                                </div>
                            </div>
                            <div className=" mr-3 mb-3 flex justify-content-end">
                                <Button label="Update" className="p-button-outlined p-button-success mr-2 " onClick={() => handleUpdate()} />
                                <Button label="Cancel" className="p-button-outlined  p-button-danger" onClick={() => handleCancel()} />
                            </div>
                        </TabPanel>
                        <TabPanel header="Security" leftIcon="pi pi-lock mr-2 ">
                            <div className="flex flex-column m-3">
                                <h5 className="profile">Change Password</h5>
                            </div>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="email" className="required">
                                        Current Password
                                    </label>

                                    <Password
                                        value={values.currentPassword}
                                        // className="passwordInputField "
                                        feedback={false}
                                        onChange={(e) => setValues({ ...values, currentPassword: e.target.value })}
                                        toggleMask
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.password })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.password}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="mobileno" className="required">
                                        New Password
                                    </label>
                                    <Password
                                        // className="passwordInputField "
                                        feedback={false}
                                        value={values.password}
                                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                                        toggleMask
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.current_password })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.current_password}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="mobileno" className="required">
                                        Retype New Password
                                    </label>
                                    <Password
                                        // className="passwordInputField "
                                        feedback={false}
                                        value={values.confirmPassword}
                                        onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                                        toggleMask
                                        className={classNames({ ' p-invalid': submitted && errorMessage?.confirmPassword })}
                                    />
                                    {errorMessage ? <small className="p-invalid error">{errorMessage?.confirmPassword}</small> : null}
                                </div>
                            </div>
                            <div className="mr-3 flex justify-content-end">
                                <Button label="Submit" className="p-button-outlined p-button-success mr-2" onClick={() => handleUpdatePassword()} />
                                <Button label="Cancel" className="p-button-outlined  p-button-danger" onClick={() => handleCancel()} />
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default Profile;
