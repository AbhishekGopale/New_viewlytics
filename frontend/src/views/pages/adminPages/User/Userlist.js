import components from '../../primeReactComponentsIndex';
import * as XLSX from 'xlsx';
import {
    CreateUserRequest,
    DeleteUserRequest,
    EditUserRequest,
    GetAllUserRequest,
    handleResetUser,
    MultipalDeleteUserRequest,
    getAllAsmRequest,
    getAllTeamLeaderRequest,
    resetData,
    getUserRequest,
    getAllTaRequest,
    getAllNpmRequest
} from '../../../../redux/slice/AdminSlice/userSlice';
import { GetAllCityRequest, GetAllStateRequest } from '../../../../redux/slice/AdminSlice/storeSlice';
import { getZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import SubHeader from '../../../components/SubHeader';
import DeleteModal from '../../../components/DeleteModal';

const Userlist = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, Button, Column, DataTable, Dialog, InputText, InputNumber, Dropdown, Paginator, Toast, Tag, Toolbar, FilterMatchMode, classNames } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const { isLoading, userData, errors, asmList, npmList, successMessage, taList, teamLeaderList, getByIdUserData } = useSelector((state) => state.user);
    const { stateData, cityData } = useSelector((state) => state.store);
    const { zoneList } = useSelector((state) => state.zone);
    const [ passwordType, setPasswordType ] = useState('password');
    const [ conformpasswordType, setConformpasswordType ] = useState('password');
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ submitted, setSubmitted ] = useState(false);
    const [ userDeleteId, setuserDeleteId ] = useState('');
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ filters, setFilters ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ stateFilterValue, setStateFilterValue ] = useState('');
    const [ cityFilterValue, setCityFilterValue ] = useState('');
    const [ first, setFirst ] = useState(0);
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${rows}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);

    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllUserRequest(`page=${event.page + 1}&limit=${event.rows}`));
    };

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

    const [ value, setValue ] = useState({
        id: '',
        firstName: '',
        lastName: '',
        user_name: '',
        // user_id: '',
        email: '',
        mobileNumber: '',
        ta: '',
        zone: '',
        state: '',
        city: '',
        status: '0',
        password: '',
        confirmPassword: '',
        w_off: ''
    });

    const [ role, setRole ] = useState({
        role: '',
        roleLabel: '',
        promoter: '',
        promoterLabel: '',
        merchandiser: '',
        merchandiserLabel: '',
        teamLeader: '',
        asm: '',
        asmLabel: '',
        npm: '',
        storeCode: '',
        asmDdVal: '',
        city: '',
        ta: '',
        zone: '',
        state: ''
    });

    const [ error, setError ] = useState({
        roleError: '',
        teamLeaderError: '',
        asmError: '',
        npmError: '',
        merchandiser: '',
        storeCodeError: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        mobileNumberError: '',
        passwordError: '',
        confirmPasswordError: '',
        zone: '',
        city: '',
        ta: '',
        state: ''
    });
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ modal, setModal ] = useState({
        isModalOpen: false,
        isEditModalOpen: false,
        isViewDialogOpen: false,
        deleteUserDialog: false,
        deleteusersDialog: false
    });
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ isViewDialogOpen, setIsViewDialogOpen ] = useState(false);
    const [ deleteUserDialog, setDeleteUserDialog ] = useState(false);
    const [ deleteusersDialog, setDeleteusersDialog ] = useState(false);
    console.log(deleteusersDialog, 'deleteusersDialog');
    const rolevalue = [
        { label: 'NPM', value: '2' },
        { label: 'TA', value: '7' },
        { label: 'ASM', value: '3' },
        { label: 'TL', value: '4' },
        { label: 'Merchandiser', value: '5' },
        { label: 'Promoter', value: '6' }
    ];
    const statusTag = [
        { label: 'Active', value: '0' },
        { label: 'Inactive', value: '1' }
    ];
    const weekOffTag = [
        { label: 'Sunday', value: '0' },
        { label: 'Monday', value: '1' },
        { label: 'Tuesday ', value: '2' },
        { label: 'Wednesday', value: '3' },
        { label: 'Thursday', value: '4' },
        { label: 'Friday', value: '5' },
        { label: 'Saturday', value: '6' }
    ];
    const [ selectedProducts, setSelectedProducts ] = useState(null);
    const [ globalFilter, setGlobalFilter ] = useState(null);

    const handleReset = () => {
        setValue({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            mobileNumber: '',
            password: '',
            confirmPassword: '',
            zone: '',
            city: '',
            ta: '',
            state: ''
        });
        setRole({
            role: '',
            roleLabel: '',
            promoter: '',
            promoterLabel: '',
            merchandiser: '',
            merchandiserLabel: '',
            teamLeader: '',
            asm: '',
            asmLabel: '',
            npm: '',
            storeCode: '',
            zone: '',
            city: '',
            ta: '',
            state: ''
        });
        setError({
            roleError: '',
            teamLeaderError: '',
            asmError: '',
            npmError: '',
            merchandiser: '',
            storeCodeError: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            mobileNumberError: '',
            passwordError: '',
            confirmPasswordError: '',
            zone: '',
            city: '',
            ta: '',
            state: ''
        });
        setSubmitted(false);
        setModal({
            ...modal,
            isModalOpen: false,
            isEditModalOpen: false,
            isViewDialogOpen: false,
            deleteUserDialog: false,
            deleteusersDialog: false
        });
    };

    const hideDialog = () => {
        setError({
            ...error,
            confirmPasswordError: ''
        });
        handleReset();
        setIsModalOpen(false);
    };
    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        resetData();
        handleResetUser();
        handleReset();
    };
    const hideViewDialog = () => {
        setIsViewDialogOpen(false);
        handleReset();
    };
    const hideDeleteUserDialog = () => {
        handleReset();
        setDeleteUserDialog(false);
    };
    const handleDeleteUser = () => {
        dispatch(DeleteUserRequest(userDeleteId));
        setDeleteUserDialog(false);
    };
    const editUser = (rowData) => {
        dispatch(getZoneLableRequest());
        dispatch(GetAllStateRequest(rowData.zone));
        dispatch(GetAllCityRequest(rowData.state_id));
        console.log(rowData, 'rowData');
        setValue({
            ...value,
            id: rowData.id,
            firstName: rowData.first_name,
            lastName: rowData.last_name,
            email: rowData.email,
            mobile_no: rowData.mobile_no,
            zone: rowData.zone,
            state: rowData.state_id,
            city: rowData.city_id,
            ta: rowData.ta,
            zone: rowData?.zone,
            // user_id:rowData.user_id,
            user_name: rowData.user_name,
            status: rowData.status,
            w_off: rowData.w_off
        });
        if (rowData.role_id == 2) {
            setRole({
                ...role,
                role: '2',
                roleLabel: 'NPM'
            });
        }
        if (rowData.role_id == 3) {
            setRole({
                ...role,
                role: '3',
                roleLabel: 'ASM'
            });
        }
        if (rowData.role_id == 4) {
            setRole({
                ...role,
                role: '4',
                roleLabel: 'TL'
            });
        }
        if (rowData.role_id == 5) {
            setRole({
                ...role,
                role: '5',
                roleLabel: 'Merchandiser'
            });
        }
        if (rowData.role_id == 6) {
            setRole({
                ...role,
                role: '6',
                roleLabel: 'Promoter'
            });
        }
        if (rowData.role_id == 7) {
            setRole({
                ...role,
                role: '7',
                roleLabel: 'TA'
            });
        }

        setIsEditModalOpen(true);
    };
    const viewUser = (rowData) => {
        dispatch(getUserRequest(rowData.id));
        let dayName;
        switch (rowData?.w_off != '') {
            case rowData?.w_off == '0':
                dayName = 'Sunday';
                break;
            case rowData?.w_off == '1':
                dayName = 'Monday';
                break;
            case rowData?.w_off == '2':
                dayName = 'Tuesday';
                break;
            case rowData?.w_off == '3':
                dayName = 'Wednesday';
                break;
            case rowData?.w_off == '4':
                dayName = 'Thursday';
                break;
            case rowData?.w_off == '5':
                dayName = 'Friday';
                break;
            case rowData?.w_off == '6':
                dayName = 'Saturday';
        }
        setValue({
            ...value,
            firstName: rowData.first_name,
            lastName: rowData.last_name,
            email: rowData.email,
            mobile_no: rowData.mobile_no,
            ta: rowData.ta,
            zone: rowData?.zoneId?.zone_name,
            state: rowData.state,
            city: rowData.city,
            status: rowData.status,
            // user_id:rowData.user_id,
            user_name: rowData.user_name,
            w_off: dayName
        });

        setRole({
            ...role,
            role: rowData.role_name,
            teamLeader: rowData.teamLeader,
            asm: rowData.asm,
            ta: rowData.ta,
            npm: rowData.ta
        });
        setIsViewDialogOpen(true);
    };

    const confirmDeleteUser = (userId) => {
        setuserDeleteId(userId?.id);
        setDeleteUserDialog(true);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteusersDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteusersDialog(true);
    };

    const deleteSelectedUsers = () => {
        let usersData = userData?.User.filter((val) => selectedProducts.includes(val));
        let usersId = [];
        usersData?.map((e) => {
            let id = e.id;
            usersId.push(id);
        });
        const formData = {
            id: usersId
        };
        dispatch(MultipalDeleteUserRequest(formData));
        setDeleteusersDialog(false);
        setSelectedProducts(null);
    };
    const handleClearFliter = () => {
        filterClearCallback();
        statefilterClearCallback();
        cityfilterClearCallback();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedProducts?.length > 1 ? false : true} />
                    <Button label="Clear Filter" className="p-button-outlined ml-2 " onClick={() => handleClearFliter()} disabled={!searchFilterValue && !stateFilterValue && !cityFilterValue} icon="pi pi-filter-slash">
                    </Button>
                </div>
            </React.Fragment>
        );
    };
    const handleUserCreate = () => {
        dispatch(getAllNpmRequest());
        dispatch(getZoneLableRequest());
        setIsModalOpen(true);
        dispatch(resetData());
    };
    const hideDeleteDialog = () => {
        setDeleteUserDialog(false);
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="User Create " icon="pi pi-plus" className="p-button-outlined p-button-success mr-2 " onClick={() => handleUserCreate()} />
                {/* <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help" /> */}
            </React.Fragment>
        );
    };

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">{rowData.role_name}</span>
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">{rowData.name}</span>
            </>
        );
    };

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">E-mail ID</span>
                {rowData.email !== '' ? <span>{rowData.email}</span> : 'N / A'}
            </>
        );
    };

    const userIdBodyTemplate = (rowData) => {
        return <>{rowData.user_id !== '' ? <span className="ml-2 capitalize">{rowData.user_id}</span> : 'N / A'}</>;
    };
    const stateBodyTemplate = (rowData) => {
        return <>{rowData.state !== '' ? <span className="ml-2 capitalize">{rowData.state}</span> : 'N / A'}</>;
    };
    const zoneBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title capitalize">Zone</span>
                {rowData.zoneId?.zone_name !== '' ? <span>{rowData.zoneId?.zone_name}</span> : 'N / A'}
            </>
        );
    };
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <div className="actions flex justify-content-center capitalize">{rowData.status == '0' ? <Tag severity="success" value="Active"></Tag> : <Tag severity="danger" value="Inactive"></Tag>}</div>
            </>
        );
    };

    const weekoffBodyTemplate = (rowData) => {
        let day;
        switch (rowData?.w_off != '') {
            case rowData?.w_off == '0':
                day = 'Sunday';
                break;
            case rowData?.w_off == '1':
                day = 'Monday';
                break;
            case rowData?.w_off == '2':
                day = 'Tuesday';
                break;
            case rowData?.w_off == '3':
                day = 'Wednesday';
                break;
            case rowData?.w_off == '4':
                day = 'Thursday';
                break;
            case rowData?.w_off == '5':
                day = 'Friday';
                break;
            case rowData?.w_off == '6':
                day = 'Saturday';
        }
        return <>{rowData.w_off !== '' ? <span className="ml-2 capitalize">{day}</span> : 'N / A'}</>;
    };

    const cityBodyTemplate = (rowData) => {
        return <>{rowData.city !== '' ? <span className="ml-2 capitalize">{rowData.city}</span> : 'N / A'}</>;
    };

    const mobilenoBodyTemplate = (rowData) => {
        return <>{rowData.mobile_no !== '' ? <span>{rowData.mobile_no}</span> : 'N / A'}</>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editUser(rowData)} />
                <Button tooltip="View" tooltipOptions={{ position: 'bottom' }} icon="pi pi-eye" className="p-button-rounded p-button-warning p-button-text" id="eyes-icons" onClick={() => viewUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    };
    const hideCreateUserDialog = () => {
        setError({
            ...error,
            confirmPasswordError: ''
        });
        setIsModalOpen(false);
        handleReset();
    };
    const handleSave = () => {
        setError({ ...error, confirmPasswordError: '' });
        const data = {
            first_name: value.firstName,
            last_name: value.lastName,
            user_name: value.user_name,
            // user_id: value.user_id,
            status: value.status?.toString(),
            mobile_no: value.mobile_no,
            w_off: value.w_off?.toString(),
            email: value.email,
            password: value.password,
            comfirm_password: value.confirmPassword,
            ta: value.ta,
            zone: role.zone?.toString(),
            city: value.city?.toString(),
            state: value.state?.toString(),
            role_id: role.role?.toString(),
            role_name: role.roleLabel?.toLowerCase(),
            user_tl: role.teamLeader,
            user_ta: role.ta,
            user_asm: role.asm != '' ? role.asm?.toString() : role.asmDdVal?.toString(),
            user_npm: role.npm
        };
        setSubmitted(true);
        dispatch(CreateUserRequest(data));
        // if (value.password != '' && value.confirmPassword != '' && value.password == value.confirmPassword) {
        // } else if (value.password != value.confirmPassword) {
        //     setError({
        //         ...error,
        //         confirmPasswordError: 'Password and confirm password should match'
        //     });
        // }
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const userCreateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideCreateUserDialog} />
            <Button label="Save" type="submit" icon="pi pi-check" loading={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleSave()} autoFocus />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteUser} autoFocus />
        </>
    );
    const deleteusersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedUsers} autoFocus />
        </>
    );
    const handleCancel = () => {
        setIsViewDialogOpen(false);
        handleReset();
    };
    const handleUpdate = () => {
        dispatch(resetData());
        setSubmitted(true);
        const formData = {
            first_name: value.firstName,
            last_name: value.lastName,
            user_name: value.user_name,
            // user_id:value.user_id,
            mobile_no: value.mobile_no?.toString(),
            ta: value.ta,
            zone: value.zone,
            state: value.state.toString(),
            city: value.city.toString(),
            email: value.email,
            role_id: role.role,
            role_name: role.roleLabel?.toLowerCase(),
            status: value.status?.toString(),
            w_off: value.w_off?.toString()
        };
        dispatch(EditUserRequest(value.id, formData));
    };
    const handleUpdateCancel = () => {
        setIsEditModalOpen(false);
        handleResetUser();
        handleReset();
        setSubmitted(false);
    };
    const updateUserDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => handleUpdateCancel()} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleUpdate()} autoFocus />
        </>
    );

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="w_off" header="Week Off" body={weekoffBodyTemplate} headerStyle={{ width: '12%', minWidth: '4rem' }}></Column>
                    <Column field="e-mailid" header="E-mail ID" body={emailBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>
                    <Column field="mobileno" header="Mobile No" body={mobilenoBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
                </DataTable>
            </div>
        );
    };

    const filterApplyCallback = (options) => {
        dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${rows}`));
        options.filterApplyCallback();
    };
    const statefilterApplyCallback = (options) => {
        dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${stateFilterValue}&limit=${rows}`));
        options.filterApplyCallback();
    };
    const cityfilterApplyCallback = (options) => {
        dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${cityFilterValue}&limit=${rows}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${''}&limit=${rows}`));
        }
        options?.filterClearCallback();
    };
    const statefilterClearCallback = (options) => {
        setStateFilterValue('');
        if (stateFilterValue !== '') {
            dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${''}&limit=${rows}`));
        }
        options?.filterClearCallback();
    };
    const cityfilterClearCallback = (options) => {
        setCityFilterValue('');
        if (cityFilterValue !== '') {
            dispatch(GetAllUserRequest(`page=${tableData.page}&filter_value=${''}&limit=${rows}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const statefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => statefilterClearCallback(options)} label="Clear" />;
    };
    const cityfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => cityfilterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const statefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => statefilterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const cityfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => cityfilterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const statehandleFilter = (e) => {
        setStateFilterValue(e.target.value);
    };
    const cityhandleFilter = (e) => {
        setCityFilterValue(e.target.value);
    };
    const roleFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Role" />;
    };
    const stateFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={stateFilterValue} onChange={(e) => statehandleFilter(e)} placeholder="Search State" />;
    };
    const cityFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={cityFilterValue} onChange={(e) => cityhandleFilter(e)} placeholder="Search City" />;
    };

    const initFilters = () => {
        setFilters({
            role_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            city: { value: null, matchMode: FilterMatchMode.CONTAINS },
            state: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
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
    useEffect(() => {
        if (successMessage) {
            setIsModalOpen(false);
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            handleReset();
            handleResetUser();
            dispatch(resetData());
            setIsEditModalOpen(false);
            dispatch(GetAllUserRequest(`page=${tableData.page}&limit=${rows}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`));
        }
    }, [ successMessage, value.city, value.state, queryString ]);

    useEffect(() => {
        if (role.role === '6' || role.role === '5') {
            dispatch(getAllTeamLeaderRequest());
        }

        if (role.role === '4' || role.teamLeader !== '') {
            dispatch(getAllAsmRequest());
        }

        if (role.role === '3' || role.asm !== '') {
            dispatch(getAllTaRequest());
        }

        if (role.teamLeader !== '') {
            setIsDisabled(true);
        }
    }, [ role.role, role.teamLeader, role.asm, getByIdUserData ]);

    useEffect(() => {
        if (role.zone) {
            dispatch(GetAllStateRequest(role.zone));
        }
        if (role.state) {
            dispatch(GetAllCityRequest(role.state));
        }
    }, [ role.zone, role.state ]);

    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllUserRequest(`page=${tableData.page}&limit=${rows}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`));
    }, [ queryString ]);

    useEffect(() => {
        initFilters();
    }, []);

    return (
        <div className="user-main-component">
            <SubHeader headerName={'User List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card userlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            filters={filters}
                            value={userData?.User}
                            stripedRows
                            selection={selectedProducts}
                            onSelectionChange={(e) => setSelectedProducts(e.value)}
                            dataKey="id"
                            showGridlines
                            className="datatable-responsive listing"
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
                            <Column field="user_id" header="User Id" sortable body={userIdBodyTemplate} headerStyle={{ width: '18%', minWidth: '5rem' }}></Column>
                            <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ width: '22%', minWidth: '8rem' }}></Column>
                            <Column
                                field="role_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={roleFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="role_name"
                                header="Role"
                                sortable
                                body={roleBodyTemplate}
                                headerStyle={{ width: '12%', minWidth: '4rem' }}
                            ></Column>
                            <Column field="zone" header="Zone" sortable body={zoneBodyTemplate} headerStyle={{ width: '15%', minWidth: '5rem' }}></Column>
                            <Column
                                field="state"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={stateFilterTemplate}
                                filterClear={statefilterClearTemplate}
                                filterApply={statefilterApplyTemplate}
                                filterField="state"
                                header="State"
                                body={stateBodyTemplate}
                                sortable
                                headerStyle={{ width: '14%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="city"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                sortable
                                filterElement={cityFilterTemplate}
                                filterClear={cityfilterClearTemplate}
                                filterApply={cityfilterApplyTemplate}
                                filterField="city"
                                header="City"
                                body={cityBodyTemplate}
                                headerStyle={{ width: '20%', minWidth: '9rem' }}
                            ></Column>
                            <Column field="status" header="Status" sortable body={statusBodyTemplate} headerStyle={{ width: '15%', minWidth: '5rem' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={userData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={isModalOpen} style={{ width: '80vw' }} header="User Create" modal className="p-fluid" footer={userCreateDialogFooter} onHide={hideDialog}>
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
                                        value={value.firstName}
                                        onChange={(e) => setValue({ ...value, firstName: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.firstName })}
                                    />

                                    {errors ? <small className="p-invalid error">{errors.first_name}</small> : null}
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
                                        value={value.lastName}
                                        onChange={(e) => setValue({ ...value, lastName: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.lastName })}
                                    />

                                    {errors ? <small className="p-invalid error">{errors.last_name}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                        <label htmlFor="fullname" className="required">
                                        Full Name
                                    </label>
                                    <InputText
                                        id="username"
                                        name="username"
                                        placeholder="Enter Full Name"
                                        type="text"
                                        // value={value.lastName}
                                        // onChange={(e) => setValue({ ...value, lastName: e.target.value })}
                                        autoFocus
                                        // className={classNames({ 'p-invalid': submitted && !value.lastName })}
                                    />
                                  
                                    {errors ? <small className="p-invalid error">{errors.last_name}</small> : null}
                        </div> */}
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="username" className="required">
                                        User Name
                                    </label>
                                    <InputText
                                        id="username"
                                        name="username"
                                        placeholder="Enter User Name"
                                        type="text"
                                        value={value.user_name}
                                        onChange={(e) => setValue({ ...value, user_name: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.user_name })}
                                    />

                                    {errors ? <small className="p-invalid error">{errors.user_name}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="userid" className="required">
                                        User ID
                                    </label>
                                    <InputText
                                        id="username"
                                        name="username"
                                        placeholder="Enter User ID"
                                        type="text"
                                        value={value.user_id}
                                        onChange={(e) => setValue({ ...value, user_id: e.target.value })}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !value.user_id })}
                                    />

                                    {errors ? <small className="p-invalid error">{errors.user_id}</small> : null}
                                </div> */}
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
                                        className={classNames({ 'p-invalid': submitted && errors?.mobile_no })}
                                    />

                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Zone
                                    </label>
                                    <Dropdown value={role.zone} placeholder="Select Zone" required className={classNames({ 'p-invalid': submitted && errors?.zone })} options={zoneList} onChange={(e) => setRole({ ...role, zone: e.target.value })} />
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        State
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder="Select State"
                                        options={stateData}
                                        value={value.state}
                                        onChange={(e) => {
                                            setValue({ ...value, state: e.value });
                                            dispatch(GetAllCityRequest(e.value));
                                        }}
                                        className={classNames({ 'p-invalid': submitted && value.state == '' })}
                                    />

                                    {errors ? <small className="p-invalid error">{errors.state}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        City
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        filter
                                        required
                                        placeholder="Select City"
                                        disabled={value.state == '' ? true : false}
                                        options={cityData}
                                        value={value.city}
                                        onChange={(e) => {
                                            setValue({ ...value, city: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && errors?.city })}
                                    />
                                    {errors ? <small className="p-invalid error">{errors.city}</small> : null}
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
                                    <label htmlFor="dropdown" className="required">
                                        Week off
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Week off"
                                        options={weekOffTag}
                                        value={value.w_off}
                                        onChange={(e) => {
                                            setValue({ ...value, w_off: e.value, w_offLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.w_off })}
                                    />
                                    {errors ? <small className="p-invalid error">{errors.w_off}</small> : null}
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
                                            value={value.confirmPassword}
                                            onChange={(e) => setValue({ ...value, confirmPassword: e.target.value }, setSubmitted(false))}
                                            className={classNames({ 'p-invalid': submitted && !value.confirmPassword })}
                                        />
                                    </span>

                                    {submitted && errors?.comfirm_password ? <small className="p-invalid error">{errors?.comfirm_password}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        placeholder="Select Role"
                                        name="role_name"
                                        options={rolevalue}
                                        onChange={(e) => setRole({ ...role, role: e.target.value, roleLabel: e.originalEvent.target.ariaLabel })}
                                        value={role.role}
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        className={classNames({ 'p-invalid': submitted && errors?.role_name })}
                                    />

                                    {submitted && errors?.role_name ? <small className="p-invalid error">{errors?.role_name}</small> : null}
                                </div>
                                {role.role == '6' || role.role == '5' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Team Leader List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            filter
                                            name="promoter_name"
                                            placeholder="Select TL"
                                            options={teamLeaderList}
                                            onChange={(e) => setRole({ ...role, teamLeader: e.target.value })}
                                            value={role.teamLeader}
                                            optionLabel="label"
                                            className={classNames({ 'p-invalid': submitted && errors?.user_tl })}
                                        />
                                        {submitted && errors?.user_tl ? <small className="p-invalid error">{errors?.user_tl}</small> : null}
                                    </div>
                                ) : null}
                                {role.teamLeader != '' || role.role == '4' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            ASM List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            optionValue="value"
                                            optionLabel="label"
                                            filter
                                            placeholder="Select ASM"
                                            // disabled={isDisabled}
                                            name="asm"
                                            options={asmList}
                                            onChange={(e) => setRole({ ...role, asm: e.value, asmLabel: e.originalEvent.target.ariaLabel })}
                                            value={role.asm}
                                            className={classNames({ 'p-invalid': submitted && value.asm == '' })}
                                        />
                                        {submitted && errors?.user_asm ? <small className="p-invalid error">{errors?.user_asm}</small> : null}
                                    </div>
                                ) : null}
                                {role.teamLeader != '' || role.role == '3' || role.asmLabel != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            TA List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            name="promoter_name"
                                            filter
                                            placeholder="Select Ta"
                                            options={taList}
                                            onChange={(e) => setRole({ ...role, ta: e.target.value })}
                                            value={role.ta}
                                            optionLabel="label"
                                            className={classNames({ 'p-invalid': submitted && errors?.user_ta })}
                                        />
                                        {submitted && errors?.user_ta ? <small className="p-invalid error">{errors?.user_ta}</small> : null}
                                    </div>
                                ) : null}
                                {role.teamLeader != '' || role.role == '3' || role.role == '7' || role.asmLabel != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            NPM
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            placeholder="Select NPM"
                                            // disabled
                                            filter
                                            name="npm"
                                            options={npmList}
                                            onChange={(e) => setRole({ ...role, npm: e.target.value })}
                                            value={role.npm}
                                            optionValue="value"
                                            optionLabel="label"
                                            // className="p-invalid userfilled "
                                            className="userfilled "
                                        />
                                        {submitted && errors?.user_npm ? <small className="p-invalid error">{errors?.user_npm}</small> : null}
                                    </div>
                                ) : null}
                            </div>
                        </Dialog>
                        <Dialog visible={isEditModalOpen} style={{ width: '80vw' }} header="User Update" modal className="p-fluid usercreation" footer={updateUserDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        First Name
                                    </label>
                                    <InputText
                                        id="firstname"
                                        type="text"
                                        placeholder="Enter First Name"
                                        required
                                        value={value.firstName}
                                        onChange={(e) => setValue({ ...value, firstName: e.target.value }, setSubmitted(false))}
                                        className={classNames({ 'p-invalid': submitted && !value.firstName })}
                                    />
                                    {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname" className="required">
                                        Last Name
                                    </label>
                                    <InputText
                                        id="lastname"
                                        placeholder="Enter Last Name"
                                        type="text"
                                        value={value.lastName}
                                        required
                                        onChange={(e) => setValue({ ...value, lastName: e.target.value }, setSubmitted(false))}
                                        className={classNames({ 'p-invalid': submitted && !value.lastName })}
                                    />
                                    {submitted && errors?.last_name ? <small className="p-invalid error">{errors?.last_name}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="username" className="required">
                                        User Name
                                    </label>
                                    <InputText
                                        id="username"
                                        name="username"
                                        placeholder="Enter User Name"
                                        type="text"
                                        value={value.user_name}
                                        onChange={(e) => setValue({ ...value, user_name: e.target.value })}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !value.user_name })}
                                    />

                                    {submitted && errors?.user_name ? <small className="p-invalid error">{errors?.user_name}</small> : null}
                                </div> */}
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="userid" className="required">
                                        User ID
                                    </label>
                                    <InputText
                                        id="username"
                                        name="username"
                                        placeholder="Enter User ID"
                                        type="text"

                                        value={value.user_id}
                                        onChange={(e) => setValue({ ...value, user_id: e.target.value })}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !value.user_id })}
                                    />

                                    {submitted && errors?.user_id ? <small className="p-invalid error">{errors?.user_id}</small> : null}
                                </div> */}
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
                                        className={classNames({ 'p-invalid': submitted && errors?.mobile_no })}
                                    />

                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Zone
                                    </label>
                                    <Dropdown
                                        value={value.zone}
                                        placeholder="Select Zone"
                                        required
                                        className={classNames({ 'p-invalid': submitted && errors?.zone })}
                                        options={zoneList}
                                        onChange={(e) => setValue({ ...value, zone: e.target.value })}
                                    />
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        State
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select State"
                                        // disabled
                                        options={stateData}
                                        value={value.state}
                                        onChange={(e) => {
                                            setValue({ ...value, state: e.value });
                                            dispatch(GetAllCityRequest(e.value));
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !value.state })}
                                    />
                                    {submitted && error?.state ? <small className="p-invalid error">{errors.state}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        City
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        placeholder="Select City"
                                        disabled={value.state == '' ? true : false}
                                        options={cityData}
                                        value={value.city}
                                        onChange={(e) => {
                                            setValue({ ...value, city: e.target.value });
                                        }}
                                    />
                                    {submitted && error?.city ? <small className="p-invalid error">{errors.city}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Status
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        placeholder="Select status"
                                        optionLabel="label"
                                        optionValue="value"
                                        options={statusTag}
                                        value={value.status}
                                        onChange={(e) => {
                                            setValue({ ...value, status: e.target.value });
                                        }}
                                    // className="p-invalid userfilled"
                                    />
                                    {submitted && error?.status ? <small className="p-invalid error">{error?.status}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Week Off
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        placeholder="Select week Off"
                                        options={weekOffTag}
                                        optionValue="value"
                                        optionLabel="label"
                                        value={value.w_off}
                                        onChange={(e) => {
                                            setValue({ ...value, w_off: e.target.value });
                                        }}
                                    // className="p-invalid userfilled"
                                    />
                                    {submitted && error?.w_off ? <small className="p-invalid error">{error?.w_off}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        placeholder="Select Role"
                                        disabled
                                        options={rolevalue}
                                        optionValue="value"
                                        optionLabel="label"
                                        value={role.role}
                                        onChange={(e) => setRole({ ...role, role: e.target.value, roleLabel: e?.originalEvent?.target?.ariaLabel }, setSubmitted(false))}
                                    // className="p-invalid userfilled"
                                    />
                                    {submitted && error?.role ? <small className="p-invalid error">{error?.role}</small> : null}
                                </div>
                                {/* {role.role == '6' || role.role == '5' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Team Leader List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            filter
                                            name="promoter_name"
                                            placeholder="Select TL"
                                            options={teamLeaderList}
                                            onChange={(e) => setRole({ ...role, teamLeader: e.target.value })}
                                            value={role.teamLeader}
                                            optionLabel="label"
                                            className={classNames({ 'p-invalid': submitted && errors?.user_tl })}
                                        />
                                        {submitted && errors?.user_tl ? <small className="p-invalid error">{errors?.user_tl}</small> : null}
                                    </div>
                                ) : null}
                                {role.teamLeader != '' || role.role == '4' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            ASM List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            optionValue="value"
                                            optionLabel="label"
                                            filter
                                            placeholder="Select ASM"
                                            name="asm"
                                            options={asmList}
                                            onChange={(e) => setRole({ ...role, asm: e.value, asmLabel: e.originalEvent.target.ariaLabel })}
                                            value={role.asm}
                                            className={classNames({ 'p-invalid': submitted && value.asm == '' })}
                                        />
                                        {submitted && errors?.user_asm ? <small className="p-invalid error">{errors?.user_asm}</small> : null}

                                    </div>
                                ) : null}
                                {role.teamLeader != '' || role.role == '3' || role.asmLabel != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            TA List
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            name="promoter_name"
                                            filter
                                            placeholder="Select Ta"
                                            options={taList}
                                            onChange={(e) => setRole({ ...role, ta: e.target.value })}
                                            value={role.ta}
                                            optionLabel="label"
                                            className={classNames({ 'p-invalid': submitted && errors?.user_ta })}
                                        />
                                        {submitted && errors?.user_ta ? <small className="p-invalid error">{errors?.user_ta}</small> : null}

                                    </div>

                                ) : null}
                                {role.teamLeader != '' || role.role == '3' || role.role == '7' || role.asmLabel != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            NPM
                                        </label>
                                        <Dropdown
                                            id="dropdown"
                                            placeholder="Select NPM"
                                            name="npm"
                                            options={npmList}
                                            onChange={(e) => setRole({ ...role, npm: e.target.value })}
                                            value={role.npm}
                                            optionValue="value"
                                            optionLabel="label"
                                            className="p-invalid userfilled "
                                        />
                                        {submitted && errors?.user_npm ? <small className="p-invalid error">{errors?.user_npm}</small> : null}

                                    </div>
                                ) : null} */}
                            </div>

                            {/* <div className="field mr-3 userdropdown">
                                <label htmlFor="dropdown">Team Leader</label>
                                <Dropdown id="dropdown" options={teamLeaderValue} value={teamLeader} onChange={(e) => setTeamLeader(e.value)} optionLabel="name" className="p-invalid userfilled" />
                                {submitted && !teamLeader && <small className="p-invalid"> Team leader is required.</small>}
                            </div>
                            <div className="field mr-3 userdropdown">
                                <label htmlFor="dropdown">ASM</label>
                                <Dropdown id="dropdown" options={asmValue} value={asm} onChange={(e) => setAsm(e.value)} optionLabel="name" className="p-invalid userfilled" />
                                {submitted && !asm && <small className="p-invalid"> ASM is required.</small>}
                            </div>
                            <div className="field mr-1 userdropdown">
                                <label htmlFor="dropdown">NPM</label>
                                <Dropdown id="dropdown" options={npmValue} value={npm} onChange={(e) => setNpm(e.value)} optionLabel="name" className="p-invalid userfilled" />
                                {submitted && !npm && <small className="p-invalid"> NPM is required.</small>}
                            </div> */}
                        </Dialog>
                        <DeleteModal isOpenDialog={deleteUserDialog} modalFooter={deleteProductDialogFooter} hideModal={hideDeleteDialog} modalDescription={'Are you sure you want to delete ?'} />
                        <DeleteModal isOpenDialog={deleteusersDialog} modalFooter={deleteusersDialogFooter} hideModal={hideDeleteUsersDialog} modalDescription={'Are you sure you want to delete the selected Users?'} />
                        {/* <Dialog visible={deleteUserDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteProductDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete <b>{value.role_name}</b>?
                                </span>
                            </div>
                        </Dialog> */}

                        {/* <Dialog visible={deleteusersDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteusersDialogFooter} onHide={hideDeleteUsersDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Users?</span>
                            </div>
                        </Dialog> */}
                        <Dialog visible={isViewDialogOpen} style={{ width: '80vw' }} header="User Details" modal className="p-fluid usercreation viewmodel" onHide={hideViewDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="firstname">First Name</label>
                                    <InputText type="text" readOnly required value={value.firstName} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="lastname">Last Name</label>
                                    <InputText id="lastname" readOnly required type="text" value={value.lastName} />
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
                                    <label htmlFor="dropdown">State</label>
                                    <InputText id="dropdown" required readOnly optionLabel="label" optionValue="value" value={value.state} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">City</label>
                                    <InputText id="dropdown" optionValue="value" optionLabel="label" required readOnly value={value.city} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Status</label>
                                    <InputText id="dropdown" optionValue="value" optionLabel="label" required readOnly value={value.status == '0' ? 'Active' : 'Inactive'} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="role">Week off</label>
                                    <InputText type="text" readOnly required value={value.w_off} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="role">Role</label>
                                    <InputText type="text" readOnly required value={role.role} />
                                </div>
                                {role.teamLeader != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="teamLeader">Team Leader</label>
                                        <InputText type="text" readOnly required value={role.teamLeader} />
                                    </div>
                                ) : null}
                                {role.asm != null ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="asm">ASM</label>
                                        <InputText type="text" readOnly required value={role.asm} />
                                    </div>
                                ) : null}
                                {/* {role.ta != '' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="asm">TA</label>
                                        <InputText type="text" readOnly required value={role.ta} />
                                    </div>
                                ) : null} */}

                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="npm">NPM</label>
                                    <InputText type="text" readOnly required value="npm" />
                                </div> */}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userlist;
