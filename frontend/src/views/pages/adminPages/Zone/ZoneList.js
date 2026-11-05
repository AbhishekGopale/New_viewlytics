import components from '../../primeReactComponentsIndex';
// import _default from 'react-redux/es/components/connect';
import { GetAllZoneListRequest, deleteZoneRequest, zoneCreateRequest, stateListRequest, zoneUpdateRequest, handleResetZoneData } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { GetAllStateRequest, GetAllStateRequestList } from '../../../../redux/slice/AdminSlice/storeSlice';
import { DeleteModal, SubHeader } from '../../../../indexMain';
const ZoneList = () => {
    const { React, useEffect, useState, useRef, useDispatch, useSelector, Button, Column, DataTable, Dialog, InputText, MultiSelect, Paginator, Toast, Toolbar, classNames } = components;
    const toast = useRef(null);
    const dt = useRef(null);
    const dispatch = useDispatch();
    const { zoneData, successMessage, errors, isLoading } = useSelector((state) => state.zone);
    const { stateData } = useSelector((state) => state.store);
    const [ submitted, setSubmitted ] = useState(false);
    const [ modal, setModal ] = useState({
        isModalOpen: false,
        isEditModalOpen: false,
        isViewDialogOpen: false,
        deleteZoneDialog: false
    });

    const [ selectedZone, setSelectedZone ] = useState([]);
    const [ zoneDeleteId, setZoneDeleteId ] = useState('');
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        // dispatch(GetAllChainRequest(`page=${event.page + 1}&limit=${event.rows}`));
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
    const [ values, setValues ] = useState({
        updateZoneId: '',
        zone_name: '',
        state: ''
    });
    console.log(stateData, 'stateData')
    const handleResetFormData = () => {
        setValues({
            updateZoneId: '',
            zone_name: '',
            state: ''
        });
    };

    const handleZoneCreate = () => {
        setSubmitted(true);
        if (values.zone_name && values.state) {

            let reqData = {
                zone_name: values.zone_name,
                state: values.state
            };
            dispatch(zoneCreateRequest(reqData));
        }
    };

    const hideDialog = () => {
        setModal({
            ...modal,
            isModalOpen: false,
            isEditModalOpen: false,
            isViewDialogOpen: false,
            deleteZoneDialog: false
        });
        setSubmitted(false);
        handleResetFormData();
    };

    const confirmDeleteZone = (rowData) => {
        setZoneDeleteId(rowData?.id);
        setValues({
            ...values,
            zone_name: rowData.zone_name
        });
        setModal({
            ...modal,
            deleteZoneDialog: true
        });
    };

    const handleDeleteZone = () => {
        dispatch(deleteZoneRequest(zoneDeleteId));
        hideDialog();
    };

    const hideEditDialog = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        setSubmitted(false);
        handleResetFormData();
    };
    const handleEditSave = () => {
        setSubmitted(true);
        const data = {
            zone_name: values.zone_name,
            state: values.state
        };
        dispatch(zoneUpdateRequest(values.updateZoneId, data));
    };

    const editZone = (rowData) => {
        dispatch(stateListRequest(rowData.id));
        setSubmitted(false);
        let statesId = [];
        rowData?.states?.map((e) => statesId?.push(e.id));
        setValues({
            updateZoneId: rowData?.id,
            zone_name: rowData?.zone_name,
            state: statesId
        });
        setModal({
            ...modal,
            isEditModalOpen: true
        });
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Zone"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setSubmitted(false);
                        setModal({
                            ...modal,
                            isModalOpen: true
                        });
                        handleResetFormData();
                        dispatch(GetAllStateRequest());
                    }}
                />
            </React.Fragment>
        );
    };
    const createZoneDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" autoFocus loading={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={() => handleZoneCreate()} />
        </>
    );

    const zoneUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" autoFocus loading={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => handleEditSave()} />
        </>
    );
    const deleteZoneDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDialog} />
            <Button label="Yes" icon="pi pi-check" loading={isLoading} className="p-button-outlined p-button-success" onClick={handleDeleteZone} autoFocus />
        </>
    );

    const zoneBodyTemplate = (rowData) => {
        return <div className="  ml-2 capitalize">{rowData.zone_name ? rowData.zone_name : 'N/A'}</div>;
    };

    const statesBodyTemplate = (rowData) => {
        return (
            <div className="ml-2 capitalize flex align-items-center gap-3 ">
                {rowData.states
                    ? rowData.states.map((states, i) => (
                        <li key={states.id} className="list-none">
                            {i + 1}.{states.state_name}
                        </li>
                    ))
                    : 'N/A'}
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editZone(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteZone(rowData)} />
            </div>
        );
    };

    const header = <Toolbar className="create-delete-btn" end={rightToolbarTemplate}></Toolbar>;
    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(GetAllZoneListRequest());
            hideDialog();
            handleResetFormData();
            dispatch(handleResetZoneData());
        }
        handleResetFormData();
        dispatch(GetAllZoneListRequest());
    }, [ successMessage ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Zone List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card chainlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={zoneData?.zone}
                            showGridlines
                            stripedRows
                            dataKey="id"
                            selection={selectedZone}
                            onSelectionChange={(e) => setSelectedZone(e.value)}
                            className="datatable-responsive"
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '20rem' }}
                        >
                            <Column field="zone_name" showFilterOperator={false} header="Zone Name" body={zoneBodyTemplate} sortable headerStyle={{ width: '20%' }}></Column>
                            <Column field="zone_name" showFilterOperator={false} header="State Name" body={statesBodyTemplate} sortable headerStyle={{ width: '70%' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '10%', minWidth: '6rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={zoneData?.totalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50 ]}></Paginator>
                        <Dialog visible={modal.isModalOpen} style={{ width: '775px' }} header="Create Zone" modal className="p-fluid usercreation" footer={createZoneDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Zone Name
                                    </label>
                                    <InputText
                                        type="text"
                                        required
                                        placeholder="Enter Zone Name"
                                        value={values.zone_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, zone_name: e.target.value });
                                                setSubmitted(false);
                                                dispatch(GetAllStateRequestList(values.zone_name));
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && errors?.zone_name })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.zone_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Select State
                                    </label>
                                    <MultiSelect
                                        value={values.state}
                                        filter
                                        display="chip"
                                        onChange={(e) => setValues({ ...values, state: e.value })}
                                        options={stateData}
                                        optionLabel="label"
                                        maxSelectedLabels={2}
                                        placeholder="Select State"
                                        className={classNames({ 'p-invalid': submitted && values.state == '' })}
                                    />
                                    {submitted && values.state == '' ? <small className="p-invalid error">State is required</small> : null}
                                    {submitted && errors ? <small className="p-invalid error">{errors?.state}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isEditModalOpen} style={{ width: '775px' }} header="Zone Edit" modal className="p-fluid usercreation" footer={zoneUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Zone Name
                                    </label>
                                    <InputText
                                        type="text"
                                        required
                                        placeholder="Enter Zone Name"
                                        value={values.zone_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, zone_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.zone_name == '' })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.zone_name}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label className="required">State Name</label>
                                    <MultiSelect
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        display="chip"
                                        maxSelectedLabels={2}
                                        filter
                                        required
                                        placeholder="Select State"
                                        options={stateData}
                                        onChange={(e) => setValues({ ...values, state: e.value })}
                                        value={values.state}
                                        className={classNames({ 'p-invalid': submitted && values.state == '' })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.state}</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <DeleteModal isOpenDialog={modal.deleteZoneDialog} modalFooter={deleteZoneDialogFooter} hideModal={hideDialog} modalDescription={`Are you sure you want to delete ${values.zone_name}?`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZoneList;
