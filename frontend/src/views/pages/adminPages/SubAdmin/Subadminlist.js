import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _default from 'react-redux/es/components/connect';
import components from '../../primeReactComponentsIndex';
import {
    CreateSubAdminRequest,
    DeleteSubAdminRequest,
    CreateRolePermissionRequest,
    GetAllPermissionRequest,
    resetData,
    GetAllSubAdminRequest,
    handleResetSubAdmin,
    MultipalDeleteSubAdminRequest,
    EditSubAdminRequest,
    GetSubAdminByIdRequest
} from '../../../../redux/slice/AdminSlice/subadminSlice';
import { getZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { DeleteModal } from '../../../../indexMain';
import SubHeader from '../../../components/SubHeader';

const Subadminlist = () => {
    const { Button, Column, DataTable, Dropdown, Tag, Dialog, InputNumber, PickList, InputText, Paginator, Toast, Toolbar, classNames } = components;
    const { isLoading, errors, successMessage, subAdminData, permissionData, createdPermissionData, subAdminIdData } = useSelector((state) => state.subAdmin);
    const { zoneList } = useSelector((state) => state.zone);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const [ passwordType, setPasswordType ] = useState('password');
    const [ conformpasswordType, setConformpasswordType ] = useState('password');
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const [ picklistSourceValue, setPicklistSourceValue ] = useState([ permissionData ]);
    const [ picklistTargetValue, setPicklistTargetValue ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ modal, setModal ] = useState({
        isModalOpen: false,
        isEditModalOpen: false,
        isViewDialogOpen: false,
        deleteAdminDialog: false,
        deleteAdminsDialog: false,
        isRoleModalOpen: false
    });
    const [ adminDeleteId, setadminDeleteId ] = useState('');
    const [ selectedAdmins, setSelectedAdmins ] = useState(null);
    const [ value, setValue ] = useState({
        id: '',
        first_name: '',
        last_name: '',
        user_name: '',
        email: '',
        mobile_no: '',
        zone: '',
        status: '0',
        password: '',
        comfirm_password: '',
        role_permission: '',
        project_name: ''
    });
    const handleReset = () => {
        setValue({
            id: '',
            first_name: '',
            last_name: '',
            user_name: '',
            email: '',
            mobile_no: '',
            zone: '',
            status: '0',
            password: '',
            comfirm_password: '',
            role_permission: '',
            project_name: ''
        });
    };
    const statusTag = [
        { label: 'Active', value: '0' },
        { label: 'Inactive', value: '1' }
    ];
    const tableData = {
        page: 1,
        limit: 10
    };

    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=&sort_order=desc&order_column=`);
    const handleQueryChange = (data) => {
        let queryStr = Object.keys(data)
            .map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(data[ key ]);
            })
            .join('&');
        setQueryString(queryStr);
    };
    const template = {
        layout: 'RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport',
        CurrentPageReport: (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            );
        }
    };
    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        dispatch(GetAllSubAdminRequest(`page=${event.page + 1}&limit=${event.rows}`));
    };

    const togglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            return;
        }
        setPasswordType('password');
    };
    const toggleConformPassword = () => {
        if (conformpasswordType === 'password') {
            setConformpasswordType('text');
            return;
        }
        setConformpasswordType('password');
    };
    const hideDialog = () => {
        setModal({
            ...modal,
            isModalOpen: false,
            isEditModalOpen: false,
            isViewDialogOpen: false,
            deleteAdminDialog: false,
            deleteAdminsDialog: false,
            isRoleModalOpen: false
        });
        setSubmitted(false);
        handleResetSubAdmin();
        handleReset();
    };
    const handleSave = () => {
        setSubmitted(true);
        const data = {
            first_name: value.first_name,
            last_name: value.last_name,
            user_name: value.user_name,
            status: value.status?.toString(),
            mobile_no: value.mobile_no?.toString(),
            email: value.email,
            password: value.password,
            comfirm_password: value.comfirm_password,
            zone: value.zone?.toString(),
            user_id: '8'
        };
        dispatch(CreateSubAdminRequest(data));
    };

    const hideEditDialog = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        setSubmitted(false);
    };

    const editSubAdmin = (rowData) => {
        dispatch(getZoneLableRequest());
        setValue({
            ...value,
            id: rowData.id,
            first_name: rowData.first_name,
            last_name: rowData.last_name,
            user_name: rowData.user_name,
            email: rowData.email,
            mobile_no: rowData.mobile_no,
            zone: rowData.zone,
            user_id: rowData.user_id,
            status: rowData.status
        });
        setModal({
            ...modal,
            isEditModalOpen: true
        });
    };
    const handleEditSave = () => {
        setSubmitted(true);
        const updatedData = {
            first_name: value.first_name,
            last_name: value.last_name,
            user_name: value.user_name,
            status: value.status?.toString(),
            mobile_no: value.mobile_no?.toString(),
            email: value.email,
            password: value.password,
            comfirm_password: value.comfirm_password,
            zone: value.zone,
            user_id: '8'
        };
        dispatch(EditSubAdminRequest(value.id, updatedData));
    };
    const hideDeleteAdminDialog = () => {
        hideDialog();
        handleResetSubAdmin();
    };
    const handleDeleteAdmin = () => {
        dispatch(DeleteSubAdminRequest(adminDeleteId));
        hideDialog();
    };
    const hideDeleteAdminsDialog = () => {
        setModal({
            ...modal,
            deleteAdminsDialog: false
        });
    };
    const confirmDeleteSelected = () => {
        setModal({
            ...modal,
            deleteAdminsDialog: true
        });
    };

    const deleteSelectedAdmins = () => {
        let subadminsData = subAdminData?.Sub_Admin.filter((val) => selectedAdmins.includes(val));
        let adminsId = [];
        subadminsData?.map((e) => {
            let id = e.id;
            adminsId.push(id);
        });
        const formData = {
            id: adminsId
        };
        dispatch(MultipalDeleteSubAdminRequest(formData));
        setModal({
            ...modal,
            deleteAdminsDialog: false
        });
        setSelectedAdmins(null);
    };
    const confirmDeleteAdmin = (adminId) => {
        setValue({
            ...value,
            first_name: adminId?.first_name
        });
        setadminDeleteId(adminId?.id);
        setModal({
            ...modal,
            deleteAdminDialog: true
        });
    };
    const viewAdmin = (rowData) => {
        setValue({
            ...value,
            first_name: rowData?.first_name,
            last_name: rowData?.last_name,
            user_name: rowData?.user_name,
            email: rowData?.email,
            mobile_no: rowData?.mobile_no,
            zone: rowData?.zoneId.zone_name,
            status: rowData?.status
        });
        setModal({
            ...modal,
            isViewDialogOpen: true
        });
    };
    const roleSubAdmin = (rowData) => {
        setValue({
            ...value,
            id: rowData?.id,
            role_permission: rowData?.role_permission
        });
        dispatch(GetSubAdminByIdRequest(rowData?.id));
        dispatch(GetAllPermissionRequest());
        setModal({
            ...modal,
            isRoleModalOpen: true
        });
    };
    const handleRoleSave = () => {
        setSubmitted(true);
        const permissionArray = picklistTargetValue.map((item) => item.value);
        const data = {
            user_id: value.id,
            role_permission: permissionArray
        };
        dispatch(CreateRolePermissionRequest(data));
    };
    useEffect(() => {
        if (successMessage != null) {
            setModal({
                ...modal,
                isModalOpen: false,
                isEditModalOpen: false,
                isRoleModalOpen: false
            });
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(handleResetSubAdmin());
            handleReset();
            dispatch(resetData());
            dispatch(GetAllSubAdminRequest(queryString));
        }
    }, [ successMessage, createdPermissionData ]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedAdmins?.length > 1 ? false : true} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Sub-Admin"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        dispatch(getZoneLableRequest());
                        setModal({
                            ...modal,
                            isModalOpen: true
                        });
                        setSubmitted(false);
                        handleReset();
                    }}
                />
            </React.Fragment>
        );
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editSubAdmin(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-text p-button-warning" id="eyes-icons" onClick={() => viewAdmin(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteAdmin(rowData)} />
            </div>
        );
    };
    const rolePermissionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip=" Permission" tooltipOptions={{ position: 'bottom' }} icon="pi pi-cog" id="edits-icons" className="p-button-rounded p-button-text p-button" onClick={() => roleSubAdmin(rowData)} />
            </div>
        );
    };
    const subadminDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" autoFocus disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleSave(e)} />
        </>
    );
    const subadminUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteAdminDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteAdminDialog} />
            <Button label="Yes" icon="pi pi-check" autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteAdmin} />
        </>
    );
    const deleteAdminsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteAdminsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedAdmins} autoFocus />
        </>
    );

    const roleDialogFooter = (
        <>
            <Button label="Save" icon="pi pi-check" autoFocus disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleRoleSave()} />
        </>
    );
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="email" header="Email" body={emailBodyTemplate} headerStyle={{ width: '18%', minWidth: '5rem' }}></Column>
                </DataTable>
            </div>
        );
    };

    const firstnameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">
                    {rowData.first_name} {rowData.last_name}
                </span>
            </>
        );
    };

    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">{rowData.user_name}</span>
            </>
        );
    };
    const emailBodyTemplate = (rowData) => {
        return <>{rowData.email !== '' ? <span>{rowData.email}</span> : 'N / A'}</>;
    };
    const mobilenoBodyTemplate = (rowData) => {
        return <>{rowData.mobile_no !== '' ? <span className="ml-2">{rowData.mobile_no}</span> : 'N / A'}</>;
    };
    const zoneBodyTemplate = (rowData) => {
        return <>{rowData.zone !== '' ? <span className="ml-2 capitalize ">{rowData.zoneId.zone_name}</span> : 'N / A'}</>;
    };
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <div className="actions flex justify-content-center capitalize">{rowData.status == '0' ? <Tag severity="success" value="Active"></Tag> : <Tag severity="danger" value="Inactive"></Tag>}</div>
            </>
        );
    };
    const handleOnChange = (e) => {
        setPicklistSourceValue(e.source);
        setPicklistTargetValue(e.target);
    };
    const itemTemplate = (item) => {
        return <div>{item?.label}</div>;
    };
    useEffect(() => {
        const modalStates = [ modal.isModalOpen, modal.isEditModalOpen, modal.deleteAdminsDialog, modal.isViewDialogOpen, modal.deleteAdminDialog ];
        document.body.classList.toggle(
            'body-no-scroll',
            modalStates.some((state) => state)
        );
        // handleQueryChange(tableData);
        // dispatch(GetAllSubAdminRequest(queryString));

    }, [ modal.isModalOpen, modal.isEditModalOpen, modal.deleteAdminsDialog, modal.isViewDialogOpen, modal.deleteAdminDialog, tableData, queryString, dispatch ]);

    useEffect(() => {
        dispatch(GetAllSubAdminRequest(queryString));
    }, []);
    useEffect(() => {
        if (permissionData != null) {
            setPicklistSourceValue(permissionData);
        }
        // if (subAdminData != null) {
        //     dispatch(GetAllSubAdminRequest());
        // }
        if (subAdminIdData != null) {
            const filteredArray = permissionData?.filter((item) => subAdminIdData?.includes(item.value));
            const filteredPermissionArray = permissionData?.filter((item) => !subAdminIdData?.includes(item.value));
            setPicklistSourceValue(filteredPermissionArray);
            setPicklistTargetValue(filteredArray);
        }
    }, [ permissionData, subAdminIdData ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Sub-Admin List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />

                        <DataTable
                            ref={dt}
                            value={subAdminData?.Sub_Admin}
                            showGridlines
                            stripedRows
                            selection={selectedAdmins}
                            onSelectionChange={(e) => setSelectedAdmins(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            rowExpansionTemplate={rowExpansionTemplate}
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column expander style={{ width: '2%' }} />
                            <Column field="first_name" header="Name" sortable body={firstnameBodyTemplate} headerStyle={{ width: '25%', minWidth: '6rem' }}></Column>
                            <Column field="user_name" header="User Name" sortable body={usernameBodyTemplate} headerStyle={{ width: '16%', minWidth: '5rem' }}></Column>
                            <Column field="mobileno" header="Mobile NO" sortable body={mobilenoBodyTemplate} headerStyle={{ width: '16%', minWidth: '5rem' }}></Column>
                            <Column field="zone" header="Zone" sortable body={zoneBodyTemplate} headerStyle={{ width: '12%', minWidth: '3rem' }}></Column>
                            <Column field="status" header="Status" sortable body={statusBodyTemplate} headerStyle={{ width: '12%', minWidth: '3rem' }}></Column>
                            <Column field="rolepermissipn" header="Permission" body={rolePermissionBodyTemplate} headerStyle={{ width: '12%', minWidth: '3rem' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>

                        <Paginator template={template} first={first} rows={rows} totalRecords={subAdminData?.totalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>

                        <Dialog visible={modal.isModalOpen} style={{ width: '70vw' }} header="Create Sub-Admin " modal className="p-fluid usercreation" footer={subadminDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        First Name
                                    </label>

                                    <InputText
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        required
                                        type="text"
                                        value={value.first_name}
                                        onChange={(e) => setValue({ ...value, first_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.first_name })}
                                    />

                                    {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname" className="required">
                                        Last Name
                                    </label>
                                    <InputText
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        value={value.last_name}
                                        onChange={(e) => setValue({ ...value, last_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.last_name })}
                                    />

                                    {submitted && errors?.last_name ? <small className="p-invalid error">{errors?.last_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="username" className="required">
                                        User Name
                                    </label>
                                    <InputText
                                        id="user_name"
                                        name="user_name"
                                        placeholder="Enter User Name"
                                        type="text"
                                        value={value.user_name}
                                        onChange={(e) => setValue({ ...value, user_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.user_name })}
                                    />

                                    {submitted && errors?.user_name ? <small className="p-invalid error">{errors?.user_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="email" className="required">
                                        E-Mail ID
                                    </label>
                                    <InputText
                                        id="email"
                                        placeholder="Enter Email Id"
                                        type="email"
                                        value={value.email}
                                        onChange={(e) => setValue({ ...value, email: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.email })}
                                    />

                                    {submitted && errors?.email ? <small className="p-invalid error">{errors?.email}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="mobileno" className="required">
                                        Mobile Number
                                    </label>
                                    <InputNumber
                                        id="mobile_no"
                                        type="tel"
                                        placeholder="Enter Mobile No"
                                        name="mobile_no"
                                        value={value.mobile_no}
                                        useGrouping={false}
                                        maxLength={10}
                                        onValueChange={(e) => setValue({ ...value, mobile_no: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.mobile_no })}
                                    />

                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        placeholder="Select Zone"
                                        options={zoneList}
                                        value={value?.zone}
                                        onChange={(e) => {
                                            setValue({ ...value, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.zone })}
                                    />
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Status
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Status"
                                        options={statusTag}
                                        value={value.status}
                                        onChange={(e) => {
                                            setValue({ ...value, status: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.status })}
                                    />
                                    {submitted && value.status == '' ? <small className="p-invalid error">{errors.status}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <span className="p-input-icon-right">
                                        {passwordType === 'password' ? <i className="pi pi-eye-slash pt-3" onClick={togglePassword}></i> : <i className="pi pi-eye pt-3" onClick={togglePassword}></i>}
                                        <label htmlFor="password" className="required">
                                            Password
                                        </label>
                                        <InputText
                                            id="password"
                                            type={passwordType}
                                            style={{ marginTop: '6px' }}
                                            placeholder="Enter Password"
                                            name="password"
                                            value={value.password}
                                            onChange={(e) => setValue({ ...value, password: e.target.value })}
                                            className={classNames({ 'p-invalid': submitted && !value.password })}
                                        />
                                    </span>

                                    {submitted && errors?.password ? <small className="p-invalid error">{errors?.password}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <span className="p-input-icon-right">
                                        {conformpasswordType === 'password' ? <i className="pi pi-eye-slash pt-3" onClick={toggleConformPassword}></i> : <i className="pi pi-eye pt-3" onClick={toggleConformPassword}></i>}
                                        <label htmlFor="confirmpass" className="required">
                                            Confirm Password
                                        </label>
                                        <InputText
                                            id="confirmpass"
                                            style={{ marginTop: '6px' }}
                                            type={conformpasswordType}
                                            placeholder="Enter Confirm Password"
                                            name="confirm_password"
                                            value={value.comfirm_password}
                                            onChange={(e) => setValue({ ...value, comfirm_password: e.target.value }, setSubmitted(false))}
                                            className={classNames({ 'p-invalid': submitted && !value.comfirm_password })}
                                        />
                                    </span>

                                    {submitted && errors?.comfirm_password ? <small className="p-invalid error">{errors?.comfirm_password}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isEditModalOpen} style={{ width: '70vw' }} header="Update Sub-Admin" modal className="p-fluid usercreation" footer={subadminUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        First Name
                                    </label>

                                    <InputText
                                        id="first_name"
                                        name="first_name"
                                        placeholder="Enter First Name"
                                        required
                                        type="text"
                                        value={value.first_name}
                                        onChange={(e) => setValue({ ...value, first_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.first_name })}
                                    />

                                    {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname" className="required">
                                        Last Name
                                    </label>
                                    <InputText
                                        id="last_name"
                                        name="last_name"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        value={value.last_name}
                                        onChange={(e) => setValue({ ...value, last_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.last_name })}
                                    />

                                    {submitted && errors?.last_name ? <small className="p-invalid error">{errors?.last_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="username" className="required">
                                        User Name
                                    </label>
                                    <InputText
                                        id="user_name"
                                        name="user_name"
                                        placeholder="Enter User Name"
                                        type="text"
                                        value={value.user_name}
                                        onChange={(e) => setValue({ ...value, user_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.user_name })}
                                    />

                                    {submitted && errors?.user_name ? <small className="p-invalid error">{errors?.user_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="email" className="required">
                                        E-Mail ID
                                    </label>
                                    <InputText
                                        id="email"
                                        placeholder="Enter Email Id"
                                        type="email"
                                        value={value.email}
                                        onChange={(e) => setValue({ ...value, email: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.email })}
                                    />

                                    {submitted && errors?.email ? <small className="p-invalid error">{errors?.email}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="mobileno" className="required">
                                        Mobile Number
                                    </label>
                                    <InputNumber
                                        id="mobile_no"
                                        type="tel"
                                        placeholder="Enter Mobile No"
                                        name="mobile_no"
                                        value={value.mobile_no}
                                        useGrouping={false}
                                        maxLength={10}
                                        onValueChange={(e) => setValue({ ...value, mobile_no: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.mobile_no })}
                                    />

                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        placeholder="Select Zone"
                                        options={zoneList}
                                        value={value?.zone}
                                        onChange={(e) => {
                                            setValue({ ...value, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.zone })}
                                    />
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Status
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Status"
                                        options={statusTag}
                                        value={value.status}
                                        onChange={(e) => {
                                            setValue({ ...value, status: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.status })}
                                    />
                                    {submitted && value.status == '' ? <small className="p-invalid error">{errors.status}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <span className="p-input-icon-right">
                                        {passwordType === 'password' ? <i className="pi pi-eye-slash pt-3" onClick={togglePassword}></i> : <i className="pi pi-eye pt-3" onClick={togglePassword}></i>}
                                        <label htmlFor="password" className="required">
                                            Password
                                        </label>
                                        <InputText
                                            id="password"
                                            type={passwordType}
                                            style={{ marginTop: '6px' }}
                                            placeholder="Enter Password"
                                            name="password"
                                            value={value.password}
                                            onChange={(e) => setValue({ ...value, password: e.target.value })}
                                            autoFocus
                                            className={classNames({ 'p-invalid': submitted && !value.password })}
                                        />
                                    </span>

                                    {submitted && errors?.password ? <small className="p-invalid error">{errors?.password}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <span className="p-input-icon-right">
                                        {conformpasswordType === 'password' ? <i className="pi pi-eye-slash pt-3" onClick={toggleConformPassword}></i> : <i className="pi pi-eye pt-3" onClick={toggleConformPassword}></i>}
                                        <label htmlFor="confirmpass" className="required">
                                            Confirm Password
                                        </label>
                                        <InputText
                                            id="confirmpass"
                                            style={{ marginTop: '6px' }}
                                            type={conformpasswordType}
                                            placeholder="Enter Confirm Password"
                                            name="confirm_password"
                                            value={value.confirmPassword}
                                            onChange={(e) => setValue({ ...value, confirmPassword: e.target.value }, setSubmitted(false))}
                                            autoFocus
                                            className={classNames({ 'p-invalid': submitted && !value.confirmPassword })}
                                        />
                                    </span>

                                    {submitted && errors?.comfirm_password ? <small className="p-invalid error">{errors?.comfirm_password}</small> : null}
                                </div> */}
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isViewDialogOpen} style={{ width: '70vw' }} header="Sub-Admin Details" modal className="p-fluid usercreation viewmodel" onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname">First Name</label>
                                    <InputText type="text" readOnly required value={value.first_name} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname">Last Name</label>
                                    <InputText id="lastname" readOnly required type="text" value={value.last_name} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname">User Name</label>
                                    <InputText id="username" readOnly required type="text" value={value.user_name} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="email">E-Mail ID</label>
                                    <InputText id="email" type="email" readOnly required value={value.email} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="mobileno">Mobile Number</label>
                                    <InputText id="mobileno" readOnly required type="tel" value={value.mobile_no} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Zone</label>
                                    <InputText id="dropdown" required readOnly optionLabel="label" optionValue="value" value={value.zone} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Status</label>
                                    <InputText id="dropdown" optionValue="value" optionLabel="label" required readOnly value={value.status == '0' ? 'Active' : 'Inactive'} />
                                </div>
                            </div>
                        </Dialog>
                        <DeleteModal isOpenDialog={modal.deleteAdminDialog} modalFooter={deleteAdminDialogFooter} hideModal={hideDialog} modalDescription={`Are you sure you want to delete ${value.first_name}?`} />
                        <DeleteModal isOpenDialog={modal.deleteAdminsDialog} modalFooter={deleteAdminsDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete the selected Sub-Admins?'} />

                        {/* <Dialog visible={modal.deleteAdminsDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteAdminsDialogFooter} onHide={hideDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Sub-Admins?</span>
                            </div>
                        </Dialog> */}
                        <Dialog visible={modal.isRoleModalOpen} style={{ width: '70vw' }} header="Permission" modal className="p-fluid usercreation" footer={roleDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1 rolepermision">
                                <div className=" field col-12  md:col-12">
                                    <div className="card">
                                        <h6>Select Access Permissions</h6>
                                        <PickList
                                            source={picklistSourceValue}
                                            target={picklistTargetValue}
                                            sourceHeader="Available"
                                            targetHeader="Selected"
                                            itemTemplate={itemTemplate}
                                            onChange={handleOnChange}
                                            sourceStyle={{ height: '200px' }}
                                            targetStyle={{ height: '200px' }}
                                        ></PickList>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Subadminlist;
