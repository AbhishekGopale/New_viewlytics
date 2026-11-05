import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import _default from 'react-redux/es/components/connect';
import { Paginator } from 'primereact/paginator';
import * as XLSX from 'xlsx';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import sample_target from '../../../../assets/excelFiles/sample_target.csv'
import { GetAllTargetListRequest, deleteTargetRequest, getSkuListByStoreId, getStoreByUserIdRequest, handleResetTarget, importTargetRequest, multipalDeleteTargetRequest, targetUpdateRequest } from '../../../../redux/slice/AdminSlice/targetSlice';
import { createTargetRequest } from '../../../../redux/slice/AdminSlice/targetSlice';
import { getUserIdRequest } from '../../../../redux/slice/AdminSlice/userAssignSlice';
import { Tag } from 'primereact/tag';
import { getAllUserNameRequest } from '../../../../redux/slice/AdminSlice/userSlice';
import ImportModal from '../../../components/ImportModal';
import SubHeader from '../../../components/SubHeader';
import { InputText } from 'primereact/inputtext';
import moment from 'moment'
const Target = () => {
    const { errors, targetData, storeList, skuList, successMessage, isLoading } = useSelector((state) => state.target);
    const { userIdData } = useSelector((state) => state.userAssign);
    const { getByUserNameData } = useSelector((state) => state.user);
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
    const [ data, setdata ] = useState([]);
    const [ submitted, setSubmitted ] = useState(false);
    const [ selectedTarget, setSelectedTarget ] = useState([]);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const [ modal, setModal ] = useState({
        isImportExcelModalOpen: false,
        isEditModalOpen: false,
        isDeleteModalOpen: false,
        isMultiDeleteModalOpen: false,
        isCreateTargetModalOpen: false,
        isViewModalOpen: false,

    });
    const [ values, setValues ] = useState({
        id: '',
        date: '',
        user_id: '',
        store_id: '',
        target_type: '0',
        target: '',
        sku_id: '',
        start_date: '',
        end_date: '',
        targetDeleteId: '',
        userName: ''
    });
    console.log(values, 'values')
    const handleReset = () => {
        setValues({
            user_id: '',
            store_id: '',
            target_type: '0',
            target: '',
            sku_id: '',
            start_date: '',
            end_date: '',
            targetDeleteId: '',
            userName: ''
        })
    };
    const [ filter, setFilter ] = useState({
        userNameFilterValue: '',
        store_idFilterValue: '',
        targetFilterValue: '',
        startDateFilterValue: '',
        endDateFilterValue: ''
    });
    // let today = new Date();
    // let month = today.getMonth();
    // let year = today.getFullYear();
    // let prevMonth = month === 0 ? 11 : month - 1;
    // let prevYear = prevMonth === 11 ? year - 1 : year;
    // let nextMonth = month === 11 ? 0 : month + 1;
    // let nextYear = nextMonth === 0 ? year + 1 : year;

    let minDate = new Date();

    // minDate.setMonth(prevMonth);
    // minDate.setFullYear(prevYear);

    // let maxDate = new Date();

    // maxDate.setMonth(nextMonth);
    // maxDate.setFullYear(nextYear);

    const targetOptions = [
        { label: 'Pieces', value: '0' },
        { label: 'Amount', value: '1' }
    ];
    const hideEditDialog = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        // resetData();
        // handleResetUser();
        // handleReset();
    };
    const handleUpdateCancel = () => {
        setModal({
            ...modal,
            isEditModalOpen: false
        });
        // handleResetUser();
        // handleReset();
    };
    const confirmDeleteSelected = () => {
        setModal({
            ...modal,
            isMultiDeleteModalOpen: true
        });
    };
    const viewTarget = (rowData) => {
        console.log(rowData?.start_date, "rowData")
        dispatch(getAllUserNameRequest(rowData.user_id));
        dispatch(getSkuListByStoreId(rowData.sku_id));
        const dateArray = [];
        // let formateDate = moment(rowData?.start_date).format('mm/dd/yyyy');
        var dateString = moment.unix().format("MM/DD/YYYY");

        console.log(dateString, 'dateString')
        dateArray.push(new Date(rowData?.start_date))
        dateArray.push(new Date(rowData?.end_date))
        console.log(dateArray, 'dateArray')
        setValues({
            ...values,
            id: rowData.id,
            user_id: rowData.User.id,
            store_id: rowData.store_id,
            target_type: rowData.target_type,
            target: rowData.target,
            sku_id: rowData.sku_id,
            date: dateArray
        });
        setModal({
            ...modal,
            isViewModalOpen: true
        });
    };
    const deleteTarget = (rowData) => {
        setValues({
            ...values,
            targetDeleteId: rowData?.id,
            userName: `${rowData?.User?.first_name}  ${rowData?.User?.last_name}`
        });
        setModal({
            ...modal,
            isDeleteModalOpen: true
        });
    };
    const hideModal = () => {
        setModal({ ...modal, isImportExcelModalOpen: false })
    }
    const handleUpdate = () => {
        setSubmitted(true)
        const data = {
            user_id: values.user_id?.toString(),
            store_id: values.store_id?.toString(),
            target_type: values.target_type,
            target: values.target?.toString(),
            sku_id: values.sku_id?.toString(),
            start_date: new Date(values?.date?.[ 0 ]),
            end_date: new Date(values?.date?.[ 1 ]),
        };
        dispatch(targetUpdateRequest(values.id, data));
    };
    const updateTargetDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => handleUpdateCancel()} />
            <Button
                label="Update"
                icon="pi pi-check"
                // disabled={isLoading}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={() => handleUpdate()}
            />
        </>
    );
    const handleDeleteTarget = () => {
        dispatch(deleteTargetRequest(values.targetDeleteId));
        setModal({
            ...modal,
            isDeleteModalOpen: false
        });
    };
    const handleMultiDeleteTarget = () => {
        let targetId = [];
        selectedTarget?.map((e) => {
            let id = e.id;
            targetId.push(id);
        });
        const data = {
            id: targetId
        };
        dispatch(multipalDeleteTargetRequest(data));
        setSelectedTarget([]);
        setModal({
            ...modal,
            isDeleteModalOpen: false
        });
    };

    const deleteTargetFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2"
                onClick={() => {
                    setModal({
                        ...modal,
                        isDeleteModalOpen: false
                    })
                    setSelectedTarget([])
                }}

            />
            <Button label="Yes" icon="pi pi-check"
                // disabled={isLoading}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={() => handleDeleteTarget()}
            />
        </>
    );
    const multideleteTargetDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2"
                onClick={() => setModal({
                    ...modal,
                    isMultiDeleteModalOpen: false
                })}

            />
            <Button label="Yes" icon="pi pi-check"
                // disabled={isLoading}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={() => handleMultiDeleteTarget()}
            />
        </>
    );
    const handleCreate = () => {
        setSubmitted(true);
        const data = {
            user_id: values.user_id?.toString(),
            store_id: values.store_id?.toString(),
            target_type: values.target_type,
            target: values.target?.toString(),
            sku_id: values.sku_id?.toString(),
            start_date: new Date(values?.date?.[ 0 ]),
            end_date: new Date(values?.date?.[ 1 ]),
        };

        dispatch(createTargetRequest(data));
    };
    const hideDialog = () => {

        setModal({
            ...modal,
            isCreateTargetModalOpen: false,
            isViewModalOpen: false
        });
        setSubmitted(false);
        handleReset()

    };
    const targetDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button
                label="Save"
                icon="pi pi-check"
                disabled={isLoading}
                className="p-button-outlined p-button-success mr-2 mb-2 "
                onClick={(e) => handleCreate(e)}
            />
        </>
    );
    const dateBodyTemplate = (rowData) => {
        return (
            <>

                <span className="ml-2">{rowData.start_date} to {rowData.end_date}</span>
            </>
        );
    };

    const projectBodyTemplate = (rowData) => {
        return (
            <div className='ml-2 capitalize '>
                {rowData.User.first_name} {rowData.User.last_name}
            </div>
        );
    };
    const storeBodyTemplate = (rowData) => {
        return (
            <>
                {rowData.store_id}
            </>

        );
    };
    const taregetTypeBodyTemplate = (rowData) => {
        return <>
            <div className="actions flex justify-content-center capitalize">{rowData.target_type == '0' ? <Tag severity="Primary" value="Pieces"></Tag> : <Tag severity="success" value="Amount"></Tag>}</div></>;
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedTarget?.length > 1 ? false : true} />

                    {/* <Button label="Clear Filter" className="p-button-outlined ml-2"
                        //  disabled={!searchFilterValue} onClick={() => filterClearCallback()}
                        icon="pi pi-filter-slash">

                    </Button> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Target"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setModal({ ...modal, isCreateTargetModalOpen: true });
                        handleReset()
                        dispatch(getAllUserNameRequest());

                    }}
                />
                <Button
                    icon="pi pi-plus"
                    onClick={() => setModal({ ...modal, isImportExcelModalOpen: true })}
                    label="Import Excel"
                    chooseLabel="Import Excel"
                    className="p-button-outlined p-button-help ml-2 "
                />
            </React.Fragment>
        );
    };
    // const filterClearCallback = (options) => {
    //     setFilter({
    //         userNameFilterValue: '',
    //         store_idFilterValue: '',
    //         targetFilterValue: '',
    //         startDateFilterValue: '',
    //         endDateFilterValue: ''
    //     });
    //     if (filter.userNameFilterValue !== '') {
    //         dispatch(GetAllTargetListRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
    //     }
    //     options?.filterClearCallback();
    // };

    const userNamefilterApplyCallback = (options) => {
        dispatch(GetAllTargetListRequest(`page=${tableData.page}&filter_value=${filter.userNameFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const userNameFilterApplyTemplate = (options) => {
        dispatch(GetAllTargetListRequest(`page=${tableData.page}&filter_value=${filter.userNameFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const readExcel = (e) => {
        const file = e.files[ 0 ];
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[ 0 ];

                const ws = wb.Sheets[ wsname ];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((data) => {
            const targetList = { "targetArray": data };
            dispatch(importTargetRequest(targetList));
        });
    };

    const editTarget = (rowData) => {
        setSubmitted(false)
        dispatch(getAllUserNameRequest(rowData.user_id));
        dispatch(getSkuListByStoreId(rowData.sku_id));
        const dateArray = [];
        dateArray.push(new Date(rowData.start_date))
        dateArray.push(new Date(rowData.end_date))
        console.log(dateArray, 'dateArray new')
        setValues({
            ...values,
            id: rowData.id,
            user_id: rowData.User.id,
            store_id: rowData.store_id,
            target_type: rowData.target_type,
            target: rowData.target,
            sku_id: rowData.sku_id,
            date: dateArray,
            // start_date: new Date(rowData.start_date),
            // end_date: new Date(rowData.end_date)
        });
        setModal({ ...modal, isEditModalOpen: true });
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editTarget(rowData)} />
                <Button tooltip="View" tooltipOptions={{ position: 'bottom' }} icon="pi pi-eye" id="eyes-icons" className="p-button-rounded p-button-warning p-button-text" onClick={() => viewTarget(rowData)} />
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

        // dispatch(GetAllProjectRequest(`page=${event.page + 1}&limit=${event.rows}`));
    };
    useEffect(() => {
        dispatch(GetAllTargetListRequest(queryString));
    }, []);
    useEffect(() => {
        if (successMessage != null) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(GetAllTargetListRequest(queryString));
            setModal({
                ...modal,
                isImportExcelModalOpen: false,
                isEditModalOpen: false,
                isDeleteModalOpen: false,
                isMultiDeleteModalOpen: false,
                isCreateTargetModalOpen: false
            })
            handleReset()
            setSubmitted(false);
            dispatch(handleResetTarget());
        }
        // if (values.store_id != '') {
        //     dispatch(getSkuListByStoreId(values.store_id))
        // }
    }, [ successMessage ]);
    useEffect(() => {
        if (values.user_id != '') {
            dispatch(getStoreByUserIdRequest(values.user_id));
        }
        if (values.store_id != '') {
            dispatch(getSkuListByStoreId(values.store_id));
        }

    }, [ values.user_id, values.store_id ]);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Target List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />

                        <DataTable
                            ref={dt}
                            // loading={isLoading}
                            value={targetData?.target}
                            showGridlines
                            stripedRows
                            // filters={filters}
                            selection={selectedTarget}
                            onSelectionChange={(e) => setSelectedTarget(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column className='ml-2' selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            {/* <Column field="image" sortable header="Image" body={imageBodyTemplate} headerStyle={{ width: '40%' }}></Column> */}
                            <Column
                                className='ml-2'
                                field="user_id"
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={userNameFilterTemplate}
                                // filterClear={userNameFilterClearTemplate}
                                // filterApply={userNameFilterApplyTemplate}
                                // filterField="user_id"
                                header="User Name"
                                body={projectBodyTemplate}
                                sortable
                                headerStyle={{ width: '20%' }}
                            ></Column>
                            <Column
                                field="store_id"
                                // className='ml-3'
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={storeIdFilterTemplate}
                                // filterClear={storeIdFilterClearTemplate}
                                // filterApply={userNamefilterApplyTemplate}
                                filterField="store_id"
                                header="Store Id"
                                body={storeBodyTemplate}
                                sortable
                                headerStyle={{ width: '10%' }}
                            ></Column>
                            <Column
                                field="target"
                                className='ml-2'
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={targetFilterTemplate}
                                // filterClear={targetFilterClearTemplate}
                                // filterApply={userNamefilterApplyTemplate}
                                filterField="target"
                                header="Target"
                                // body={projectBodyTemplate}
                                sortable
                                headerStyle={{ width: '15%' }}
                            ></Column>
                            <Column
                                field="start_date"
                                className='ml-2'
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={startDateFilterTemplate}
                                // filterClear={startDateFilterClearTemplate}
                                // filterApply={userNamefilterApplyTemplate}
                                filterField="start_date"
                                header="Date"
                                body={dateBodyTemplate}
                                sortable
                                headerStyle={{ width: '20%' }}
                            ></Column>
                            {/* <Column
                                field="end_date"
                                className='ml-2'
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={endDateFilterTemplate}
                                // filterClear={endDateFilterClearTemplate}
                                // filterApply={userNamefilterApplyTemplate}
                                filterField="end_date"
                                header="End Date"
                                // body={projectBodyTemplate}
                                sortable
                                headerStyle={{ width: '20%' }}
                            ></Column> */}
                            <Column
                                field="target_type"
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={endDateFilterTemplate}
                                // filterClear={endDateFilterClearTemplate}
                                // filterApply={userNamefilterApplyTemplate}
                                filterField="target_type"
                                header="Type Of Target"
                                body={taregetTypeBodyTemplate}
                                sortable
                                headerStyle={{ width: '14%' }}
                            ></Column>

                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>

                        <Paginator template={template} first={first} rows={rows} totalRecords={targetData?.totalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={modal.isCreateTargetModalOpen} style={{ width: '70vw' }} header="Create Target" modal className="p-fluid usercreation" footer={targetDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        options={getByUserNameData}
                                        placeholder="Select User"
                                        value={values.user_id}
                                        onChange={(e) => {
                                            setValues({ ...values, user_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.user_id == '' })}
                                    />

                                    {submitted && errors?.user_id ? <small className="p-invalid error">{errors?.user_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Store
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        disabled={values.user_id == '' ? true : false}
                                        filter
                                        placeholder="Select Store"
                                        options={storeList}
                                        value={values.store_id}
                                        onChange={(e) => {
                                            setValues({ ...values, store_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.store_id == '' })}
                                    />

                                    {submitted && errors?.store_id ? <small className="p-invalid error">{errors?.store_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select SKU
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        disabled={values.store_id == '' ? true : false}
                                        placeholder="Select SKU"
                                        options={skuList}
                                        value={values.sku_id}
                                        onChange={(e) => {
                                            setValues({ ...values, sku_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.sku_id == '' })}
                                    />
                                    {submitted && errors?.sku_id ? <small className="p-invalid error">{errors?.sku_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Type Of Target
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select Target"
                                        options={targetOptions}
                                        value={values.target_type}
                                        onChange={(e) => {
                                            setValues({ ...values, target_type: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.target_type == '' })}
                                    />
                                    {submitted && errors?.target_type ? <small className="p-invalid error">{errors?.target_type}</small> : null}
                                </div>
                                {values.target_type == '1' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="currency-india" className="required">
                                            Enter Amount
                                        </label>
                                        <InputNumber
                                            inputId="currency-india"
                                            type="text"
                                            required
                                            placeholder=" Enter Amount"
                                            value={values.target}
                                            useGrouping={false}
                                            mode="currency"
                                            currency="INR"
                                            currencyDisplay="code"
                                            locale="en-IN"
                                            onValueChange={(e) => {
                                                {
                                                    setValues({ ...values, target: e.target.value });
                                                }
                                            }}

                                            className={classNames({ 'p-invalid': submitted && values.target == null })}
                                        />
                                        {submitted && errors?.target ? <small className="p-invalid error">{errors?.target}</small> : null}
                                    </div>
                                ) : (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Enter Pieces
                                        </label>
                                        <InputNumber
                                            id="project_name"
                                            type="text"
                                            required
                                            placeholder="Enter Pieces"
                                            value={values.target}
                                            useGrouping={false}
                                            onValueChange={(e) => {
                                                setValues({ ...values, target: e.target.value });
                                            }}

                                            className={classNames({ 'p-invalid': submitted && values.target == null })}
                                        />
                                        {submitted && errors?.target ? <small className="p-invalid error">{errors?.target}</small> : null}

                                    </div>)}
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Start To End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && values.date == '' })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        value={values.date}
                                        onChange={(e) => setValues({ ...values, date: e.value })}
                                        minDate={minDate}
                                    // maxDate={maxDate}
                                    ></Calendar>

                                    {submitted && errors?.start_date ? <small className="p-invalid error">{errors?.start_date}</small> : null}
                                    {submitted && errors?.end_date ? <small className="p-invalid error">{errors?.end_date}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && values.end_date == '' })}
                                        placeholder="dd/mm/yy"
                                        value={values.end_date}
                                        onChange={(e) => setValues({ ...values, end_date: e.value })}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    ></Calendar>

                                    {errors ? <small className="p-invalid error">{errors.end_date}</small> : null}
                                </div> */}
                            </div>

                        </Dialog>
                        <Dialog visible={modal.isEditModalOpen} style={{ width: '70vw' }} header=" Edit Target" modal className="p-fluid usercreation" footer={updateTargetDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select User
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        options={getByUserNameData}
                                        placeholder="Select User"
                                        value={values.user_id}
                                        onChange={(e) => {
                                            setValues({ ...values, user_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.user_id == '' })}
                                    />

                                    {submitted && errors?.user_id ? <small className="p-invalid error">{errors?.user_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Store
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder="Select Store"
                                        options={storeList}
                                        value={values.store_id}
                                        onChange={(e) => {
                                            setValues({ ...values, store_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.store_id == '' })}
                                    />

                                    {submitted && errors?.store_id ? <small className="p-invalid error">{errors?.store_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select SKU
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        placeholder="Select SKU"
                                        options={skuList}
                                        value={values.sku_id}
                                        onChange={(e) => {
                                            setValues({ ...values, sku_id: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.sku_id == '' })}
                                    />

                                    {submitted && errors?.sku_id ? <small className="p-invalid error">{errors?.sku_id}</small> : null}
                                </div>
                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Type Of Target
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select Target"
                                        options={targetOptions}
                                        value={values.target_type}
                                        onChange={(e) => {
                                            setValues({ ...values, target_type: e.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && values.target_type == '' })}
                                    />
                                    {submitted && errors?.target_type ? <small className="p-invalid error">{errors?.target_type}</small> : null}
                                </div>
                                {values.target_type == '1' ? (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="currency-india" className="required">
                                            Enter Amount
                                        </label>
                                        <InputNumber
                                            inputId="currency-india"
                                            type="text"
                                            required
                                            placeholder=" Enter Amount"
                                            value={values.target}
                                            useGrouping={false}
                                            mode="currency"
                                            currency="INR"
                                            currencyDisplay="code"
                                            locale="en-IN"
                                            onValueChange={(e) => {
                                                {
                                                    setValues({ ...values, target: e.target.value });
                                                }
                                            }}

                                            className={classNames({ 'p-invalid': submitted && values.target == null })}
                                        />
                                        {submitted && errors?.target ? <small className="p-invalid error">{errors?.target}</small> : null}
                                    </div>
                                ) : (
                                    <div className="field col-12 md:col-4 mb-1">
                                        <label htmlFor="dropdown" className="required">
                                            Enter Pieces
                                        </label>
                                        <InputNumber
                                            id="project_name"
                                            type="text"
                                            required
                                            placeholder="Enter Pieces"
                                            value={values.target}
                                            useGrouping={false}
                                            onValueChange={(e) => {
                                                setValues({ ...values, target: e.target.value });
                                            }}

                                            className={classNames({ 'p-invalid': submitted && values.target == null })}
                                        />
                                        {submitted && errors?.target ? <small className="p-invalid error">{errors?.target}</small> : null}
                                    </div>
                                )}

                                <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Start To End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && values.date == '' })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        value={values.date}
                                        onChange={(e) => setValues({ ...values, date: e.value })}
                                        minDate={minDate}
                                    // maxDate={maxDate}
                                    ></Calendar>
                                    {submitted && errors ? <small className="p-invalid error">{errors?.end_date}</small> : null}
                                    {submitted && errors ? <small className="p-invalid error">{errors?.start_date}</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-4 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select End Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && values.end_date == '' })}
                                        placeholder="dd/mm/yy"
                                        value={values.end_date}
                                        onChange={(e) => setValues({ ...values, end_date: e.value })}
                                        minDate={minDate}
                                        // maxDate={maxDate}
                                    ></Calendar>

                                    {errors ? <small className="p-invalid error">{errors.end_date}</small> : null}
                                </div> */}
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isViewModalOpen} style={{ width: '60vw' }} header="Target Details" modal className="p-fluid usercreation viewmodel" onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="store_code">Store Name </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        disabled
                                        placeholder="Select Store"
                                        options={storeList}
                                        value={values.store_id}
                                    />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_id">SKU </label>
                                    <Dropdown
                                        id="dropdown"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        disabled
                                        placeholder="Select SKU"
                                        options={skuList}
                                        value={values.sku_id}
                                    />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="store_code">Type Of Target </label>
                                    <Dropdown
                                        id="dropdown"
                                        disabled
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select Target"
                                        options={targetOptions}
                                        value={values.target_type}
                                    />
                                </div>
                                {values.target_type == '1' ? (
                                    <div className="field col-12 md:col-6 mb-1">
                                        <label htmlFor="sku_no">Amount</label>
                                        <InputNumber
                                            inputId="currency-india"
                                            type="text"
                                            disabled
                                            required
                                            placeholder=" Enter Amount"
                                            value={values.target}
                                            useGrouping={false}
                                            mode="currency"
                                            currency="INR"
                                            currencyDisplay="code"
                                            locale="en-IN"
                                        />
                                    </div>
                                ) : (


                                    <div className="field col-12 md:col-6 mb-1">
                                        <label htmlFor="article_no">Pieces</label>
                                        <InputNumber
                                            id="project_name"
                                            type="text"
                                            required
                                            disabled
                                            placeholder="Enter Pieces"
                                            value={values.target}
                                            useGrouping={false}
                                        />
                                    </div>
                                )}
                                <div div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="varient_name">Start To End Date</label>
                                    <Calendar
                                        inputId="calendar"
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        disabled
                                        value={values.date}
                                    // maxDate={maxDate}
                                    ></Calendar>
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isDeleteModalOpen} style={{ width: '350px' }} header="Confirmation" modal footer={deleteTargetFooter} onHide={() => setModal({ ...modal, isDeleteModalOpen: false })}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete<br />
                                    <b>{values.userName}</b>?
                                </span>
                            </div>
                        </Dialog>
                        <Dialog visible={modal.isMultiDeleteModalOpen} style={{ width: '350px' }} header="Confirmation" modal footer={multideleteTargetDialogFooter} onHide={() => setModal({ ...modal, isMultiDeleteModalOpen: false })}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Task?</span>
                            </div>
                        </Dialog>
                        <ImportModal modalopen={modal.isImportExcelModalOpen} hideModal={hideModal} readExcel={readExcel} sampleExcel={sample_target} />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Target;
