import components from '../../primeReactComponentsIndex';
import _default from 'react-redux/es/components/connect';
import {
    clientUpdateRequest,
    createClientRequest,
    deleteTargetRequest,
    getAllAseListRequest,
    getAllClientListRequest,
    getAllNpcListRequest,
    getClientDetailById,
    handleResetClient,
    multipleDeleteClientRequest
} from '../../../../redux/slice/AdminSlice/clientSlice';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { resetData } from '../../../../redux/slice/AdminSlice/subadminSlice';
import { DeleteModal } from '../../../../indexMain';
import SubHeader from '../../../components/SubHeader';
const ClientList = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, Button, Column, DataTable, Dialog, InputText, InputNumber, Dropdown, Paginator, Toast, Toolbar, classNames } = components;
    const { errors, clientData, isLoading, npcList, aseList, clientDetail, successMessage } = useSelector((state) => state.client);
    const { projectListData } = useSelector((state) => state.promos);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);
    const [ submitted, setSubmitted ] = useState(false);
    const [ selectedClient, setSelectedClient ] = useState([]);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const [ modal, setModal ] = useState({
        isImportExcelModalOpen: false,
        isEditModalOpen: false,
        isViewModalOpen: false,
        isDeleteModalOpen: false,
        isMultiDeleteModalOpen: false,
        isCreateClientModalOpen: false
    });
    const [ values, setValues ] = useState({
        id: '',
        user_id: '',
        store_id: '',
        target_type: '0',
        target: '',
        sku_id: '',
        start_date: '',
        end_date: '',
        user_name: '',
        clientDeleteId: '',
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        project_id: '',
        projectName: '',
        role_id: '',
        role_name: '',
        se: '',
        user_ase_name: '',
        ase: '',
        npc: '',
        user_npc_name: ''
    });
    console.log(values, 'values')
    const handleResetState = () => {
        setValues({
            ...values,
            id: '',
            user_id: '',
            store_id: '',
            target_type: '0',
            target: '',
            sku_id: '',
            start_date: '',
            end_date: '',
            user_name: '',
            clientDeleteId: '',
            first_name: '',
            last_name: '',
            email: '',
            mobile_no: '',
            project_id: '',
            project_name: '',
            role_id: '',
            role_name: '',
            se: '',
            user_ase_name: '',
            ase: '',
            npc: '',
            user_npc_name: ''
        });
    };

    const roleOptions = [
        { label: 'NPC', value: 9 },
        { label: 'CL_ASM', value: 10 },
        { label: 'SE', value: 11 }
    ];
    const handleUpdateCancel = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        setSubmitted(false);
        handleResetState();
        dispatch(handleResetClient());
    };
    const confirmDeleteSelected = () => {
        setModal({
            ...modal,
            isMultiDeleteModalOpen: true
        });
    };
    const deleteClient = (rowData) => {
        setValues({
            ...values,
            clientDeleteId: rowData?.id,
            user_name: rowData?.full_name
        });
        setModal({
            ...modal,
            isDeleteModalOpen: true
        });
    };
    const handleUpdate = () => {
        setSubmitted(true);
        const data = {
            id: values.id,
            user_id: values.user_id?.toString(),
            first_name: values.first_name,
            last_name: values.last_name,
            project_id: values.project_id?.toString(),
            user_name: `${values.first_name}${values.last_name}`,
            email: values.email,
            mobile_no: values.mobile_no?.toString(),
            role_id: values.role_id,
            role_name: values.role_name?.toLowerCase(),
            client_npc: values.npc,
            client_ase: values.ase
        };
        dispatch(clientUpdateRequest(values.id, data));
    };
    const updateClientDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => handleUpdateCancel()} />
            <Button label="Update" icon="pi pi-check" autoFocus disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleUpdate()} />
        </>
    );
    const handleDeleteClient = () => {
        dispatch(deleteTargetRequest(values.clientDeleteId));
        setModal({
            ...modal,
            isDeleteModalOpen: false
        });
    };
    const handleMultiDeleteClient = () => {
        let clientId = [];
        selectedClient?.map((e) => {
            let id = e.id;
            clientId.push(id);
        });
        const data = {
            id: clientId
        };
        dispatch(multipleDeleteClientRequest(data));
        setSelectedClient([]);
        setModal({
            ...modal,
            isDeleteModalOpen: false
        });
    };

    const deleteClientFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-outlined p-button-danger mr-2 mb-2"
                onClick={() => {
                    setModal({
                        ...modal,
                        isDeleteModalOpen: false
                    });
                    setSelectedClient([]);
                }}
            />
            <Button label="Yes" icon="pi pi-check" autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleDeleteClient()} />
        </>
    );
    const multideleteTargetDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-outlined p-button-danger mr-2 mb-2"
                onClick={() =>
                    setModal({
                        ...modal,
                        isMultiDeleteModalOpen: false
                    })
                }
            />
            <Button label="Yes" icon="pi pi-check" autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleMultiDeleteClient()} />
        </>
    );
    const handleCreate = () => {
        setSubmitted(true);
        const data = {
            user_id: values.user_id?.toString(),
            first_name: values.first_name,
            last_name: values.last_name,
            project_id: values.project_id?.toString(),
            project_name: values.projectName?.toString(),
            user_name: `${values.first_name}${values.last_name}`,
            email: values.email,
            mobile_no: values.mobile_no?.toString(),
            role_id: values.role_id,
            role_name: values.role_name?.toLowerCase(),
            client_npc: values.npc,
            client_asm: values.ase
        };

        dispatch(createClientRequest(data));
    };
    const hideDialog = () => {
        setModal({
            ...modal,
            isImportExcelModalOpen: false,
            isEditModalOpen: false,
            isViewModalOpen: false,
            isDeleteModalOpen: false,
            isMultiDeleteModalOpen: false,
            isCreateClientModalOpen: false
        });

        setSubmitted(false);
        handleResetState();
    };
    const createClientDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleCreate(e)} />
        </>
    );
    const clientNameBodyTemplate = (rowData) => {
        return (
            <div>
                <span className="capitalize ml-2">{rowData.full_name}</span>
            </div>
        );
    };
    const roleBodyTemplate = (rowData) => {
        return (
            <div>
                <span className="uppercase ml-2">{rowData.role_name}</span>
            </div>
        );
    };
    const projectNameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.project_name ? rowData.project_name : 'N/A'}</div>;
    };
    const emailBodyTemplate = (rowData) => {
        return <div>{rowData.email ? rowData.email : 'N/A'}</div>;
    };
    const mobilebodyTemplate = (rowData) => {
        return <div className="ml-2">{rowData.mobile_no ? rowData.mobile_no : 'N/A'}</div>;
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedClient?.length > 1 ? false : true} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Client"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setModal({ ...modal, isCreateClientModalOpen: true });
                        handleResetState();
                        dispatch(GetProjectNameRequest());
                    }}
                />
            </React.Fragment>
        );
    };
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="email" header="Email" body={emailBodyTemplate} headerStyle={{ width: '20%' }}></Column>
                </DataTable>
            </div>
        );
    };
    const editClient = (rowData) => {
        console.log(rowData, 'rowData')
        dispatch(getClientDetailById(rowData.id));
        dispatch(getAllAseListRequest());
        dispatch(getAllNpcListRequest());
        dispatch(GetProjectNameRequest());
        setModal({ ...modal, isEditModalOpen: true });
    };
    const hideViewDialog = () => {
        setModal({ ...modal, isViewModalOpen: false });
        handleResetState();
        dispatch(handleResetClient());
    };
    const viewClient = (rowData) => {
        dispatch(getClientDetailById(rowData?.id));
        setValues({
            ...values,
            target_type: '0',
            user_name: rowData?.user_name,
            first_name: rowData?.first_name,
            last_name: rowData?.last_name,
            email: rowData?.email,
            mobile_no: rowData?.mobile_no,
            role_name: rowData?.role_name
        });
        setModal({ ...modal, isViewModalOpen: true });
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editClient(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-text mr-2 mb-2 p-button" id="eyes-icons" tooltip="View" tooltipOptions={{ position: 'bottom' }} onClick={() => viewClient(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => deleteClient(rowData)} />
            </div>
        );
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
        dispatch(getAllClientListRequest(`page=${event.page + 1}&limit=${event.rows}`));
    };
    useEffect(() => {
        dispatch(getAllClientListRequest(queryString));
    }, []);
    useEffect(() => {
        if (successMessage != null) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(getAllClientListRequest(queryString));
            dispatch(resetData());
            setModal({
                ...modal,
                isCreateClientModalOpen: false,
                isDeleteModalOpen: false,
                isMultiDeleteModalOpen: false,
                isEditModalOpen: false
            });
            handleResetState();
            setSubmitted(false);
            dispatch(handleResetClient());
        }
    }, [ successMessage ]);
    useEffect(() => {
        if (clientDetail != null) {
            const { role_id, first_name, last_name, project_id, project_name, email, mobile_no, se, user_ase, user_ase_name, user_npc, user_npc_name } = clientDetail;

            let updatedValues = {
                ...values,
                id: clientDetail.id,
                user_id: clientDetail.user_id,
                first_name,
                last_name,
                project_id,
                project_name,
                email,
                mobile_no,
                se,
                ase: user_ase,
                user_ase_name,
                npc: user_npc,
                user_npc_name
            };

            switch (role_id) {
                case 9:
                    updatedValues.role_id = 9;
                    updatedValues.role_name = 'NPC';
                    break;
                case 10:
                    updatedValues.role_id = 10;
                    updatedValues.role_name = 'CL_ASM';
                    dispatch(getAllNpcListRequest());
                    break;
                case 11:
                    updatedValues.role_id = 11;
                    updatedValues.role_name = 'SE';
                    dispatch(getAllNpcListRequest());
                    break;
                default:
                    break;
            }

            setValues(updatedValues);
        }
    }, [ clientDetail, dispatch ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Client List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={clientData?.client}
                            showGridlines
                            stripedRows
                            selection={selectedClient}
                            onSelectionChange={(e) => setSelectedClient(e.value)}
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
                            <Column header="Client Name" body={clientNameBodyTemplate} sortable headerStyle={{ width: '20%' }}></Column>
                            <Column field="project_name" header="Project Name" body={projectNameBodyTemplate} sortable headerStyle={{ width: '20%' }}></Column>
                            <Column field="role_name" header="Role Name" body={roleBodyTemplate} sortable headerStyle={{ width: '13%' }}></Column>
                            <Column field="mobile_no" header="Mobile No" body={mobilebodyTemplate} sortable headerStyle={{ width: '13%' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '3%', minWidth: '6rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>

                        <Paginator template={template} first={first} rows={rows} totalRecords={clientData?.totalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={modal.isCreateClientModalOpen} style={{ width: '70vw' }} header="Create Client" modal className="p-fluid usercreation" footer={createClientDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter First Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder=" Enter First Name"
                                        value={values.first_name}
                                        onChange={(e) => {
                                            setValues({ ...values, first_name: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.first_name == '' })}
                                    />

                                    {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter Last Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder="  Enter Last Name"
                                        value={values.last_name}
                                        onChange={(e) => {
                                            setValues({ ...values, last_name: e.target.value, user_name: `${values.first_name}${values.last_name}` });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.last_name == '' })}
                                    />

                                    {submitted && errors?.last_name ? <small className="p-invalid error">{errors?.last_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter Email Id
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder=" Enter Email Id"
                                        value={values.email}
                                        onChange={(e) => {
                                            setValues({ ...values, email: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.email == '' })}
                                    />

                                    {submitted && errors?.email ? <small className="p-invalid error">{errors?.email}</small> : null}
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="currency-india" className="required">
                                        Enter Mobile Number
                                    </label>
                                    <InputNumber
                                        id="mobileNo"
                                        type="tel"
                                        useGrouping={false}
                                        maxLength={10}
                                        placeholder="Enter Mobile Number"
                                        value={values.mobile_no}
                                        onValueChange={(e) => {
                                            {
                                                setValues({ ...values, mobile_no: e.target.value });
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.mobile_no == null })}
                                    />
                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Project Name"
                                        options={projectListData}
                                        value={values.project_id}
                                        onChange={(e) => {
                                            setValues({ ...values, project_id: e.value, projectName: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.project_id == '' })}
                                    />
                                    {submitted && errors?.project_id ? <small className="p-invalid error">{errors?.project_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Role"
                                        options={roleOptions}
                                        value={values.role_id}
                                        onChange={(e) => {
                                            setValues({ ...values, role_id: e.value, role_name: e.originalEvent.target.ariaLabel });
                                            dispatch(getAllAseListRequest());
                                            dispatch(getAllNpcListRequest());
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.role_id == '' })}
                                    />

                                    {submitted && errors?.role_id ? <small className="p-invalid error">{errors?.role_id}</small> : null}
                                </div>
                                {values.role_id == '11' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={values.ase}
                                                onChange={(e) => {
                                                    setValues({ ...values, ase: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.ase == '' })}
                                            />

                                            {submitted && errors?.client_asm ? <small className="p-invalid error">{errors?.client_asm}</small> : null}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={values.npc}
                                                onChange={(e) => {
                                                    setValues({ ...values, npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.npc == '' })}
                                            />

                                            {submitted && errors?.client_npc ? <small className="p-invalid error">{errors?.client_npc}</small> : null}
                                        </div>
                                    </>
                                ) : null}
                                {values.role_id == '10' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={values.npc}
                                                onChange={(e) => {
                                                    setValues({ ...values, npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.npc == '' })}
                                            />

                                            {submitted && errors?.client_npc ? <small className="p-invalid error">{errors?.client_npc}</small> : null}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isEditModalOpen} style={{ width: '70vw' }} header=" Edit Client" modal className="p-fluid usercreation" footer={updateClientDialogFooter} onHide={handleUpdateCancel}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter First Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder=" Enter First Name"
                                        value={values.first_name}
                                        onChange={(e) => {
                                            setValues({ ...values, first_name: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.first_name == '' })}
                                    />

                                    {submitted && errors?.first_name ? <small className="p-invalid error">{errors?.first_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter Last Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder="  Enter Last Name"
                                        value={values.last_name}
                                        onChange={(e) => {
                                            setValues({ ...values, last_name: e.target.value, user_name: `${values.first_name}${values.last_name}` });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.last_name == '' })}
                                    />

                                    {submitted && errors?.last_name ? <small className="p-invalid error">{errors?.last_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter Email Id
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        placeholder=" Enter Email Id"
                                        value={values.email}
                                        onChange={(e) => {
                                            setValues({ ...values, email: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.email == '' })}
                                    />

                                    {submitted && errors?.email ? <small className="p-invalid error">{errors?.email}</small> : null}
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="currency-india" className="required">
                                        Enter Mobile Number
                                    </label>
                                    <InputNumber
                                        id="mobileNo"
                                        type="tel"
                                        useGrouping={false}
                                        maxLength={10}
                                        placeholder="Enter Mobile Number"
                                        value={values.mobile_no}
                                        onValueChange={(e) => {
                                            {
                                                setValues({ ...values, mobile_no: e.target.value });
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.mobile_no == null })}
                                    />
                                    {submitted && errors?.mobile_no ? <small className="p-invalid error">{errors?.mobile_no}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Project Name"
                                        options={projectListData}
                                        value={values.project_id}
                                        onChange={(e) => {
                                            setValues({ ...values, project_id: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.project_id == '' })}
                                    />
                                    {submitted && errors?.project_id ? <small className="p-invalid error">{errors?.project_id}</small> : null}
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Role
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder=" Select Role"
                                        options={roleOptions}
                                        value={values.role_id}
                                        onChange={(e) => {
                                            setValues({ ...values, role_id: e.value, role_name: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.role_id == '' })}
                                    />

                                    {submitted && errors?.role_id ? <small className="p-invalid error">{errors?.role_id}</small> : null}
                                </div>
                                {values.role_id == '11' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select ASM
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select ASM"
                                                options={aseList}
                                                value={values.ase}
                                                onChange={(e) => {
                                                    setValues({ ...values, ase: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.ase == '' })}
                                            />

                                            {submitted && errors?.ase ? <small className="p-invalid error">{errors?.ase}</small> : null}
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={values?.npc}
                                                onChange={(e) => {
                                                    setValues({ ...values, npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.npc == '' })}
                                            />

                                            {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null}
                                        </div>
                                    </>
                                ) : null}
                                {values.role_id == '10' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown" className="required">
                                                Select NPC
                                            </label>
                                            <Dropdown
                                                id="dropdown"
                                                required
                                                optionLabel="label"
                                                optionValue="value"
                                                filter
                                                placeholder="Select NPC"
                                                options={npcList}
                                                value={values?.npc}
                                                onChange={(e) => {
                                                    setValues({ ...values, npc: e.value });
                                                }}
                                                className={classNames({ 'p-invalid': submitted && values.npc == '' })}
                                            />
                                            {submitted && errors?.npc ? <small className="p-invalid error">{errors?.npc}</small> : null}
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </Dialog>
                        <DeleteModal isOpenDialog={modal.isDeleteModalOpen} modalFooter={deleteClientFooter} hideModal={hideDialog} modalDescription={`Are you sure you want to delete ${values?.user_name}?`} />
                        <DeleteModal isOpenDialog={modal.isMultiDeleteModalOpen} modalFooter={multideleteTargetDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete the selected Client?'} />
                        <Dialog visible={modal.isViewModalOpen} style={{ width: '80vw' }} header="Client Details" modal className="p-fluid usercreation viewmodel" onHide={hideViewDialog}>
                            <div className="grid p-fluid mt-1 mb-2">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">First Name</label>
                                    <InputText id="project_name" type="text" value={values.first_name} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Last Name</label>
                                    <InputText id="project_name" type="text" value={values.last_name} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Email Id</label>
                                    <InputText id="project_name" type="text" value={values.email} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="currency-india">Mobile Number</label>
                                    <InputNumber id="mobileNo" type="tel" useGrouping={false} maxLength={10} value={values.mobile_no} />
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Project Name</label>
                                    <InputText type="text" value={values.project_name} />
                                </div>

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Role</label>
                                    <InputText type="text" value={values.role_name} />
                                </div>
                                {values.role_id == '11' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown">ASM</label>
                                            <InputText type="text" value={values.user_ase_name} />
                                        </div>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown">NPC</label>
                                            <InputText type="text" value={values?.user_npc_name} />
                                        </div>
                                    </>
                                ) : null}
                                {values.role_id == '10' ? (
                                    <>
                                        <div className="field col-12 md:col-4 mb-1">
                                            <label htmlFor="dropdown">NPC</label>
                                            <InputText type="text" value={values?.user_npc_name} />
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientList;
