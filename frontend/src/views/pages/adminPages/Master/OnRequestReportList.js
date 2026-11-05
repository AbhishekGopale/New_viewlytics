import React, { useEffect, useRef, useState } from 'react';
import components from '../../primeReactComponentsIndex';
import { useDispatch, useSelector } from 'react-redux';
import { CreateFormRequest, DeleteFormRequest, EditFormRequest, GetAllFormRequest, GetProjectByUserNameRequest, handleResetForm, MultipalDeleteFormRequest, resetData } from '../../../../redux/slice/AdminSlice/onRequestFormSlice';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { DeleteModal } from '../../../../indexMain';
import SubHeader from '../../../components/SubHeader';
const OnRequestReportList = () => {
    const { Button, Calendar, Column, DataTable, Dialog, Dropdown, InputText, MultiSelect, Paginator, Tag, Toast, Toolbar, classNames } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const [ submitted, setSubmitted ] = useState(false);
    const [ modal, setModal ] = useState({
        isCreateModalOpen: false,
        isEditModalOpen: false,
        isViewDialogOpen: false,
        deleteFormDialog: false,
        deleteFormsDialog: false,
        formDeleteId: false,
        selectedForms: false
    });
    const [ formDeleteId, setFormDeleteId ] = useState('');
    const [ selectedForms, setSelectedForms ] = useState(null);
    const [ value, setValue ] = useState({
        id: '',
        user_id: '',
        project_name: '',
        project_id: '',
        url: '',
        start_date: '',
        end_date: '',
        title: '',
        status: '0',
        date: '',
        isCopy: false
    });
    console.log(value, 'isCopy')
    const { projectListData } = useSelector((state) => state.promos);
    const { formData, errors, successMessage, isLoading, projectByUserListData } = useSelector((state) => state.requestForm);
    const tableData = {
        page: 1,
        limit: 10,
        sort_order: 'desc'
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&sort_order=${tableData.sort_order}`);

    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        dispatch(GetAllFormRequest(`page=${event.page + 1}&limit=${event.rows}`));
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

    const handleReset = () => {
        setValue({
            user_id: '',
            project_name: '',
            project_id: '',
            url: '',
            start_date: '',
            end_date: '',
            title: '',
            status: '0',
            date: '',
            isCopy: false
        });
    };

    const statusTag = [
        { label: 'Active', value: '0' },
        { label: 'Inactive', value: '1' }
    ];

    let minDate = new Date();

    const hideDialog = () => {
        setModal({
            ...modal,
            isCreateModalOpen: false,
            deleteFormDialog: false,
            deleteFormsDialog: false
        });
        setSubmitted(false);
        handleReset();
    };

    const handleSave = () => {
        setSubmitted(true);
        const data = {
            user_id: value.user_id,
            title: value.title,
            project_name: value.project_name,
            project_id: value.project_id.toString(),
            url: value.url,
            start_date: new Date(value?.date?.[ 0 ]),
            end_date: new Date(value?.date?.[ 1 ]),
            status: value.status?.toString()
        };
        dispatch(CreateFormRequest(data));
    };
    const hideEditDialog = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        setSubmitted(false);
    };

    const editForm = (rowData) => {
        dispatch(GetProjectNameRequest());
        const dateArray = [];
        dateArray.push(new Date(rowData.start_date));
        dateArray.push(new Date(rowData.end_date));
        setValue({
            ...value,
            id: rowData.id,
            user_id: rowData?.user_id,
            project_name: rowData.project_name,
            project_id: rowData.project_id,
            title: rowData.title,
            url: rowData.url,
            status: rowData.status,
            date: dateArray,
            isCopy: false
        });
        setModal({
            ...modal,
            isEditModalOpen: true
        });
    };

    const handleEditSave = () => {
        setSubmitted(true);
        const updatedData = {
            user_id: value.user_id?.toString(),
            project_name: value.project_name,
            project_id: value.project_id?.toString(),
            title: value.title,
            url: value.url,
            start_date: new Date(value?.date?.[ 0 ]),
            end_date: new Date(value?.date?.[ 1 ]),
            status: value.status?.toString()
        };
        dispatch(EditFormRequest(value.id, updatedData));
    };
    const hideViewDialog = () => {
        setModal({
            ...modal,
            isViewDialogOpen: false
        });
        setValue({ ...value, isCopy: false });
        handleResetForm();
    };

    const viewForm = (rowData) => {
        const dateArray = [];
        dateArray.push(new Date(rowData.start_date));
        dateArray.push(new Date(rowData.end_date));
        setValue({
            ...value,
            id: rowData.id,
            user_id: rowData?.User?.first_name + ' ' + rowData?.User?.last_name,
            project_name: rowData.project_name,
            project_id: rowData.project_id,
            title: rowData.title,
            url: rowData.url,
            status: rowData.status,
            date: dateArray,
            isCopy: false
        });
        setModal({
            ...modal,
            isViewDialogOpen: true
        });
    };
    const hideDeleteFormDialog = () => {
        setModal({
            ...modal,
            deleteFormDialog: false
        });
        handleResetForm();
    };
    const handleDeleteForm = () => {
        dispatch(DeleteFormRequest(formDeleteId));
        setModal({
            ...modal,
            deleteFormDialog: false
        });
    };
    const confirmDeleteForm = (formId) => {
        setFormDeleteId(formId?.id);
        setModal({
            ...modal,
            deleteFormDialog: true
        });
    };
    const hideDeleteFormsDialog = () => {
        setModal({
            ...modal,
            deleteFormsDialog: false
        });
    };
    const deleteSelectedForms = () => {
        let formsData = formData?.form.filter((val) => selectedForms.includes(val));
        let formId = [];
        formsData?.map((e) => {
            let id = e.id;
            formId.push(id);
        });
        formsData = {
            id: formId
        };
        dispatch(MultipalDeleteFormRequest(formsData));
        setModal({
            ...modal,
            deleteFormsDialog: false
        });
        setSelectedForms(null);
    };
    const confirmDeleteSelected = () => {
        setModal({
            ...modal,
            deleteFormsDialog: true
        });
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="url" header="URL" body={urlBodyTemplate} headerStyle={{ width: '18%', minWidth: '5rem' }}></Column>
                </DataTable>
            </div>
        );
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedForms?.length > 1 ? false : true} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Request Report "
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setModal({
                            ...modal,
                            isCreateModalOpen: true
                        });
                        setSubmitted(false);
                        dispatch(GetProjectNameRequest());
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
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editForm(rowData)} />
                <Button icon="pi pi-eye" className="p-button-rounded p-button-text p-button-warning" id="eyes-icons" tooltip="View" tooltipOptions={{ position: 'bottom' }} onClick={() => viewForm(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteForm(rowData)} />
            </div>
        );
    };
    const formDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" autoFocus onClick={(e) => handleSave(e)} />
        </>
    );
    const formUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" autoFocus onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteFormDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteFormDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteForm} autoFocus />
        </>
    );
    const deleteFormsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteFormsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedForms} autoFocus />
        </>
    );

    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">
                    {rowData.User?.first_name} {rowData.User?.last_name}
                </span>
            </>
        );
    };
    const projectBodyTemplate = (rowData) => {
        return (
            <>
                <span className="capitalize ml-2">{rowData.project_name}</span>
            </>
        );
    };

    const urlBodyTemplate = (rowData) => {
        return <>{rowData.url !== '' ? <span>{rowData.url}</span> : 'N / A'}</>;
    };
    const titlenameBodyTemplate = (rowData) => {
        return <>{rowData.title !== '' ? <span className="capitalize ml-2 ">{rowData.title}</span> : 'N / A'}</>;
    };
    const dateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="ml-2">
                    {rowData.start_date} to {rowData.end_date}
                </span>
            </>
        );
    };
    const handleCopy = () => {
        setValue({ ...value, isCopy: true });
        navigator.clipboard.writeText(value.url);
    };
    const statusBodyTemplate = (rowData) => {
        return <div className="actions flex justify-content-center capitalize">{rowData.status == '0' ? <Tag severity="success" value="Active"></Tag> : <Tag className="mr-2" severity="danger" value="Inactive"></Tag>}</div>;
    };
    useEffect(() => {
        if (successMessage) {
            setModal({
                ...modal,
                isCreateModalOpen: false,
                isEditModalOpen: false,
                deleteFormDialog: false,
                deleteFormsDialog: false
            });
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(handleResetForm());
            handleReset();
            dispatch(resetData());
            dispatch(GetAllFormRequest(queryString));
        }
    }, [ successMessage ]);
    useEffect(() => {
        if (value.project_id != '') {
            dispatch(GetProjectByUserNameRequest(value.project_id));
        }
    }, [ value.project_id ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllFormRequest(queryString));
    }, [ dispatch ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'On Request Report List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={formData?.form}
                            showGridlines
                            stripedRows
                            selection={selectedForms}
                            onSelectionChange={(e) => setSelectedForms(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
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
                            <Column field="title" header="Title" sortable body={titlenameBodyTemplate} headerStyle={{ width: '14%', minWidth: '5rem' }}></Column>
                            <Column field="user" header="Name" sortable body={usernameBodyTemplate} headerStyle={{ width: '14%', minWidth: '5rem' }}></Column>
                            <Column field="project" header="Project" sortable body={projectBodyTemplate} headerStyle={{ width: '14%', minWidth: '5rem' }}></Column>
                            <Column field="date" header="Date" sortable body={dateBodyTemplate} headerStyle={{ width: '17%', minWidth: '5rem' }}></Column>
                            <Column field="status" header="Status" sortable body={statusBodyTemplate} headerStyle={{ width: '6%', minWidth: '4rem' }}></Column>
                            <Column header="Actions" headerStyle={{ width: '5%', minWidth: '9rem' }} className="action" body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={formData?.totalcount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={modal.isCreateModalOpen} style={{ width: '60vw' }} header="Create Request Report " modal className="p-fluid usercreation" footer={formDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="url" className="required">
                                        Form Title
                                    </label>
                                    <InputText
                                        id="title"
                                        placeholder="Enter Form Title"
                                        type="text"
                                        value={value.title}
                                        onChange={(e) => setValue({ ...value, title: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.title })}
                                    />
                                    {submitted && errors?.title ? <small className="p-invalid error">{errors?.title}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Project "
                                        options={projectListData}
                                        onChange={(e) => {
                                            setValue({ ...value, project_id: e.value, project_name: e.originalEvent.target.ariaLabel });
                                        }}
                                        value={value.project_id}
                                        className={classNames({ 'p-invalid': submitted && value.project_name === '' })}
                                    />
                                    {submitted && errors?.project_name ? <small className="p-invalid error">{errors?.project_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="user" className="required">
                                        User Name
                                    </label>
                                    <MultiSelect
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        display="chip"
                                        maxSelectedLabels={3}
                                        disabled={value.project_id == '' ? true : false}
                                        required
                                        placeholder="Select User Name"
                                        options={projectByUserListData}
                                        onChange={(e) => setValue({ ...value, user_id: e.value })}
                                        value={value.user_id}
                                        className={classNames({ 'p-invalid': submitted && value.user_id == '' })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.user_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
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
                                    {submitted && errors?.status ? <small className="p-invalid error">{errors?.status}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Start To End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && value.date == '' })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        value={value.date}
                                        onChange={(e) => setValue({ ...value, date: e.value })}
                                        minDate={minDate}
                                    ></Calendar>
                                    {submitted && errors ? <small className="p-invalid error">{errors?.start_date}</small> : null}
                                    {submitted && errors ? <small className="p-invalid error">{errors?.end_date}</small> : null}
                                </div>
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="url" className="required">
                                        Form URL
                                    </label>
                                    <InputText id="url" placeholder="Enter Form URL" type="url" value={value.url} onChange={(e) => setValue({ ...value, url: e.target.value })} className={classNames({ 'p-invalid': submitted && !value.url })} />
                                    {submitted && errors?.url ? <small className="p-invalid error">{errors?.url}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isEditModalOpen} style={{ width: '60vw' }} header="Update Request Report" modal className="p-fluid usercreation" footer={formUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="url" className="required">
                                        Form Title
                                    </label>
                                    <InputText
                                        id="title"
                                        placeholder="Enter Form Title"
                                        type="text"
                                        value={value.title}
                                        onChange={(e) => setValue({ ...value, title: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !value.title })}
                                    />
                                    {submitted && errors?.title ? <small className="p-invalid error">{errors?.title}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Project "
                                        options={projectListData}
                                        onChange={(e) => {
                                            setValue({ ...value, project_id: e.value, project_name: e.originalEvent.target.ariaLabel });
                                        }}
                                        value={value.project_id}
                                        className={classNames({ 'p-invalid': submitted && value.project_name == '' })}
                                    />
                                    {submitted && errors?.project_name ? <small className="p-invalid error">{errors?.project_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="user" className="required">
                                        User Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select User Name"
                                        options={projectByUserListData}
                                        onChange={(e) => setValue({ ...value, user_id: e.value })}
                                        value={value.user_id}
                                        className={classNames({ 'p-invalid': submitted && value.user_id == '' })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.user_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
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
                                    {submitted && errors?.status ? <small className="p-invalid error">{errors?.status}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Start To End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && value.date == '' })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        value={value.date}
                                        showButtonBar
                                        onChange={(e) => setValue({ ...value, date: e.value })}
                                        minDate={minDate}
                                    ></Calendar>
                                    {submitted && errors ? <small className="p-invalid error">{errors?.start_date}</small> : null}
                                </div>
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="url" className="required">
                                        Form URL
                                    </label>
                                    <InputText id="url" placeholder="Enter Form URL" type="url" value={value.url} onChange={(e) => setValue({ ...value, url: e.target.value })} className={classNames({ 'p-invalid': submitted && !value.url })} />
                                    {submitted && errors?.url ? <small className="p-invalid error">{errors?.url}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isViewDialogOpen} style={{ width: '60vw' }} header="Request Report Details" modal className="p-fluid usercreation viewmodel " onHide={hideViewDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="title">Form Title</label>
                                    <InputText type="text" readOnly required value={value.title} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project">Project Name</label>
                                    <InputText id="project" readOnly required type="text" value={value.project_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="username">User Name</label>
                                    <InputText id="username" readOnly required type="text" value={value.user_id} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="status">Status</label>
                                    <InputText id="status" optionValue="value" optionLabel="label" required readOnly value={value.status == '0' ? 'Active' : 'Inactive'} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="startdate"> Start To End Date</label>
                                    <Calendar id="startdate" type="email" selectionMode="range" disabled readOnly required value={value.date} />
                                </div>
                                <div className="field col-10 md:col-10 mb-1">
                                    <label htmlFor="enddate">URL</label>
                                    <InputText id="email" type="email" readOnly required value={value.url} />
                                </div>
                                <div className="field col-6 md:col-2 mb-1">
                                    {value.isCopy == false ? (
                                        <Button icon="pi pi-copy" className="p-button-rounded p-button-text p-button-help mt-4" id="eyes-icons" tooltip="Copy" tooltipOptions={{ position: 'bottom' }} onClick={() => handleCopy()} />
                                    ) : (
                                        <Button
                                            icon="pi pi-check"
                                            className="p-button-rounded p-button-text p-button-success mt-4"
                                            id="eyes-icons"
                                            tooltip="Copied"
                                            tooltipOptions={{ position: 'bottom' }}
                                            onClick={() => setValue({ ...value, isCopy: false })}
                                        />
                                    )}
                                </div>
                            </div>
                        </Dialog>
                        <DeleteModal isOpenDialog={modal.deleteFormDialog} modalFooter={deleteFormDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete?'} />
                        <DeleteModal isOpenDialog={modal.deleteFormsDialog} modalFooter={deleteFormsDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete?'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnRequestReportList;
