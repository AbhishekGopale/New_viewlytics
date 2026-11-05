import _default from 'react-redux/es/components/connect';
import { getProjectWiseZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { createBroadcastRequest, deleteBroadcastRequest, getBroadcastListRequest, getProjectWiseUserRequest, handleResetBroadcast, multipalDeleteBroadcastRequest } from '../../../../redux/slice/AdminSlice/broadcastSlice';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { DeleteModal, SubHeader } from '../../../../indexMain';
import components from '../../primeReactComponentsIndex';
const BroadcastList = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, Button, Column, DataTable, Dialog, Dropdown, Paginator, InputTextarea, MultiSelect, Toast, Toolbar, classNames } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const { projectListData } = useSelector((state) => state.promos);
    const { projectZoneList } = useSelector((state) => state.zone);
    const { broadcastList, projectWiseUserList, successMessage, errors, isLoading } = useSelector((state) => state.broadcast);
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);
    const [ submitted, setSubmitted ] = useState(false);
    const [ selectedBroadcast, setSelectedBroadcast ] = useState([]);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const [ modal, setModal ] = useState({
        isDeleteModalOpen: false,
        isMultiDeleteModalOpen: false,
        isCreateBroadcastModalOpen: false
    });
    const [ values, setValues ] = useState({
        id: '',
        project_id: '',
        zone: '',
        chain: '',
        broadcast_description: '',
        promoter: '',
        merchandiser: '',
        tl: '',
        broadcastDeleteId: ''
    });
    const handleReset = () => {
        setValues({
            id: '',
            project_id: '',
            zone: '',
            chain: '',
            broadcast_description: '',
            promoter: '',
            merchandiser: '',
            tl: '',
            broadcastDeleteId: ''
        });
    };
    const hideDialog = () => {
        setModal({
            ...modal,
            isDeleteModalOpen: false,
            isMultiDeleteModalOpen: false,
            isCreateBroadcastModalOpen: false
        });
        setSubmitted(false);
        handleReset();
    };
    const confirmDeleteSelected = () => {
        setModal({
            ...modal,
            isMultiDeleteModalOpen: true
        });
    };
    const deleteTarget = (rowData) => {
        setValues({
            ...values,
            broadcastDeleteId: rowData?.id
        });
        setModal({
            ...modal,
            isDeleteModalOpen: true
        });
    };
    const handleDeleteBroadcast = () => {
        dispatch(deleteBroadcastRequest(values.broadcastDeleteId));
        hideDialog();
    };
    const handleMultiDeleteBroadcast = () => {
        let broadcastId = [];
        selectedBroadcast?.map((e) => {
            let id = e.id;
            broadcastId.push(id);
        });
        const data = {
            id: broadcastId
        };
        dispatch(multipalDeleteBroadcastRequest(data));
        setSelectedBroadcast([]);
        hideDialog();
    };

    const deleteBroadcastFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-outlined p-button-danger mr-2 mb-2"
                onClick={() => {
                    hideDialog();
                }}
            />
            <Button label="Yes" icon="pi pi-check" autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleDeleteBroadcast()} />
        </>
    );
    const multideleteTargetDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => hideDialog()} />
            <Button label="Yes" icon="pi pi-check" autoFocus className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleMultiDeleteBroadcast()} />
        </>
    );
    const handleCreate = () => {
        setSubmitted(true);
        const data = {
            project_id: values.project_id?.toString(),
            zone_id: values.zone,
            description: values?.broadcast_description,
            promoter_id: values?.promoter,
            merchandiser_id: values?.merchandiser,
            tl_id: values?.tl
        };
        dispatch(createBroadcastRequest(data));
    };

    const broadcastDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleCreate(e)} autoFocus />
        </>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedBroadcast?.length > 1 ? false : true} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Broadcast"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setModal({ ...modal, isCreateBroadcastModalOpen: true });
                        handleReset();
                        dispatch(GetProjectNameRequest());
                    }}
                />
            </React.Fragment>
        );
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const zoneBodyTemplete = (rowData) => {
        return (
            <div className=" capitalize">
                <ol className="flex ">
                    {rowData?.zone_name?.map(
                        (item, index) =>
                            item && (
                                <li key={index} className="mx-3">
                                    {item}
                                </li>
                            )
                    )}
                </ol>
            </div>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => deleteTarget(rowData)} />
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
        dispatch(getBroadcastListRequest(`page=${event.page + 1}&limit=${event.rows}`));
    };
    useEffect(() => {
        dispatch(getBroadcastListRequest());
    }, []);
    useEffect(() => {
        if (successMessage != null) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(getBroadcastListRequest(queryString));
            hideDialog();
            dispatch(handleResetBroadcast());
        }
        if (values.project_id != '') {
            dispatch(getProjectWiseZoneLableRequest(values.project_id));
        }
        if (values.project_id != '' && values.zone != '') {
            const data = {
                project_id: values?.project_id,
                zone: values?.zone
            };
            dispatch(getProjectWiseUserRequest(data));
        }
    }, [ successMessage, values.project_id, values.zone ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Broadcast List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={broadcastList?.broadCasting}
                            showGridlines
                            stripedRows
                            selection={selectedBroadcast}
                            onSelectionChange={(e) => setSelectedBroadcast(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column className="ml-2" selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column className="ml-2" field="project_name" header="Project Name" sortable headerStyle={{ width: '9%' }}></Column>
                            <Column field="zone_name" className="ml-2" header="Zone" body={zoneBodyTemplete} sortable headerStyle={{ width: '10%' }}></Column>
                            <Column field="description" className="ml-2" header="Description" headerStyle={{ width: '25%' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '3%', minWidth: '3rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={broadcastList?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={modal.isCreateBroadcastModalOpen} style={{ width: '70vw' }} header="Create Broadcast" modal className="p-fluid usercreation" footer={broadcastDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Project
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        options={projectListData}
                                        placeholder="Select Project"
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
                                        Select Zone
                                    </label>
                                    <MultiSelect

                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        placeholder="Select Zone"
                                        options={projectZoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({
                                                ...values, zone: e.target.value
                                                // , zoneLabel: e.originalEvent.target.ariaLabel 
                                            });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />

                                    {submitted && errors?.zone_id ? <small className="p-invalid error">{errors?.zone_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Select Promoter</label>
                                    <MultiSelect value={values.promoter} filter placeholder="Select Promoter" required options={projectWiseUserList?.promoter} onChange={(e) => setValues({ ...values, promoter: e.target.value })} />
                                    {submitted && errors?.promoter_id ? <small className="p-invalid error">{errors?.promoter_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Select Merchandiser</label>
                                    <MultiSelect
                                        value={values.merchandiser}
                                        filter
                                        placeholder="Select Merchandiser"
                                        required
                                        options={projectWiseUserList?.merchandiser}
                                        onChange={(e) => setValues({ ...values, merchandiser: e.target.value, merchandiserLabel: e.originalEvent.target.ariaLabel })}
                                    />
                                    {submitted && errors?.merchandiser_id ? <small className="p-invalid error">{errors?.merchandiser_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown">Select Team Leader</label>
                                    <MultiSelect value={values.tl} filter placeholder="Select TL" required options={projectWiseUserList?.tl} onChange={(e) => setValues({ ...values, tl: e.target.value })} />
                                    {submitted && errors?.tl_id ? <small className="p-invalid error">{errors?.tl_id}</small> : null}
                                </div>
                                <div className="field col-12 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Enter Description
                                    </label>
                                    <InputTextarea
                                        id="description"
                                        type="text"
                                        autoResize
                                        required
                                        placeholder="Enter description"
                                        value={values.broadcast_description}
                                        onChange={(e) => {
                                            setValues({ ...values, broadcast_description: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.broadcast_description == '' })}
                                    />
                                    {submitted && errors?.description ? <small className="p-invalid error">{errors?.description}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <DeleteModal isOpenDialog={modal.isDeleteModalOpen} modalFooter={deleteBroadcastFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete this broadcast?'} />
                        <DeleteModal isOpenDialog={modal.isMultiDeleteModalOpen} modalFooter={multideleteTargetDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete the selected Boradcast? ?'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BroadcastList;
