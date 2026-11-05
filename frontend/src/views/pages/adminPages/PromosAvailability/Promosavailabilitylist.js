import {
    CreatePromosRequest,
    DeletePromosRequest,
    EditPromosRequest,
    GetAllChainNameRequest,
    GetProjectNameRequest,
    GetAllPromosRequest,
    handleResetPromos,
    importPromoRequest,
    MultipalDeletePromosRequest,
    getSkuListByChainIdRequest
} from '../../../../redux/slice/AdminSlice/promosSlice';
import * as XLSX from 'xlsx';
import { getChainByProjectIdRequest } from '../../../../redux/slice/AdminSlice/storeSlice';
import { getProjectWiseZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { current } from '@reduxjs/toolkit';
import components from '../../primeReactComponentsIndex';
import { DeleteModal, ImportModal, ViewImageModal, SubHeader, sample_promo } from '../../../../indexMain';

const Promosavailabilitylist = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, useNavigate, Button, Column, DataTable, Dialog, FilterMatchMode, InputText, Image, MultiSelect, Paginator, Toast, Toolbar, classNames, InputTextarea, _default, Tag, Calendar, ReactDOMServer, Dropdown } = components;
    const scrollRef = useRef(null);
    const { isLoading, promosData, editedPromosData, chainData, projectListData, errors, successMessage, skuData } = useSelector((state) => state.promos);
    const { projectZoneList } = useSelector((state) => state.zone);
    const { chainList } = useSelector((store) => store.store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ filters, setFilters ] = useState(null);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ chainFilterValue, setChainFilterValue ] = useState('');
    const [ zoneFilterValue, setZoneFilterValue ] = useState('');
    const [ selectedPromos, setSelectedPromos ] = useState(null);
    const [ promosDeleteId, setPromosDeleteId ] = useState('');
    const [ deletePromosDialog, setDeletePromosDialog ] = useState(false);
    const [ multideletePromosDialog, setMuitiDeletePromosDialog ] = useState(false);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ isViewModalOpen, setIsViewModalOpen ] = useState(false);
    const [ image, setImage ] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [ first, setFirst ] = useState(0);
    var array = [];
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    let minDate = new Date();

    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);

    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllPromosRequest(`page=${event.page + 1}&filter_value=${searchFilterValue}&limit=${event.rows}`));
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
    const hideExcelDialog = () => {
        setModalExcel(false);
    };

    const [ values, setValues ] = useState({
        id: '',
        chain_id: '',
        promo_des: '',
        promo_image: '',
        promo_image_name: 'No Image Choosen',
        status: '',
        promoType: '',
        zone: '',
        sku: '',
        projectName: '',
        imageError: false,
        image_preview: null,
        isImageChange: false,
        date: null,
        project_id: ''
    });
    const statusTag = [
        { label: 'Active', value: '0' },
        { label: 'Inactive', value: '1' }
    ];
    const promosTag = [
        { label: 'Pack Promo', value: '0' },
        { label: 'Scan Promo', value: '1' }
    ];

    const handleResetFormData = () => {
        setValues({
            chain_id: '',
            promo_des: '',
            promo_image: '',
            promo_image_name: 'No Image Choosen',
            status: '',
            zone: '',
            imageError: false,
            isImageChange: false
        });
        setSubmitted(false);
    };
    const hideDialog = () => {
        setIsViewModalOpen(false)
        setMuitiDeletePromosDialog(false);
        setDeletePromosDialog(false);
        setIsModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
    };

    const handleSave = () => {
        new Promise((resolve) => {
            setSubmitted(true);
            resolve();
        }).then(() => {
            if (scrollRef.current) {
                console.log(scrollRef.current.props.className);
                const dialog = [ ...document.getElementsByClassName(scrollRef.current.props.className) ][ 0 ];
                if (dialog.classList.contains('create-promos-availibilty-dialog')) {
                    const dialogChildElement = [ ...dialog.children ];
                    console.log(dialogChildElement);
                    const scrollElement = dialogChildElement.reduce((acc, curr) => {
                        if (curr.classList.contains('p-dialog-content')) {
                            acc = curr;
                        }
                        return acc;
                    }, null);

                    if (scrollElement) {
                        scrollElement.scrollTop = scrollElement.scrollHeight;
                        console.log(scrollElement.scrollHeight);
                    }
                }
            }
        });

        setValues({
            ...values,
            imageError: true
        });

        Array.isArray(values?.zone) && values?.zone?.map((e) => array.push(e));

        const formData = new FormData();
        setSubmitted(true);
        formData.append('chain_id', values?.chain_id);
        formData.append('promo_des', values?.promo_des);
        formData.append('promo_image', values?.promo_image);
        formData.append('status', values?.status);
        formData.append('zone', `[${array}]`);
        formData.append('sku_id', values?.sku);
        formData.append('project_id', values?.projectName);
        formData.append('promo_type', values?.promoType);
        formData.append('start_date', new Date(values?.date?.[ 0 ]));
        formData.append('end_date', new Date(values?.date?.[ 1 ]));
        const { chain_id, promo_des, promo_image, status, sku, projectName, promoType, date } = values;
        array.length && chain_id && promo_des && promo_image && status && sku && projectName && promoType && date?.length === 2 && dispatch(CreatePromosRequest(formData));
        // setSubmitted(false);
    };
    const readExcel = (e) => {
        const file = e.files[ 0 ];
        // console.log(file);
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
            const promoArray = { promo_data: data };
            dispatch(importPromoRequest(promoArray));
        });
    };

    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
    };

    const handleEditSave = (e) => {
        setSubmitted(true);
        values?.zone?.map((e) => {
            array.push(e);
        });
        const formData = new FormData();
        setSubmitted(true);
        formData.append('chain_id', values.chain_id);
        formData.append('promo_des', values.promo_des);
        formData.append('promo_image', values.promo_image);
        formData.append('status', values.status);
        formData.append('zone', `[${array}]`);
        formData.append('project_id', values.projectName);
        formData.append('sku_id', values.sku);
        formData.append('promo_type', values.promoType);
        formData.append('start_date', new Date(values.date?.[ 0 ]));
        formData.append('end_date', new Date(values.date?.[ 1 ]));
        dispatch(EditPromosRequest(values.id, formData));
    };

    const handleEdit = (rowData) => {
        setIsEditModalOpen(true);
        dispatch(GetProjectNameRequest());
        dispatch(getChainByProjectIdRequest(rowData?.project_id));
        dispatch(getProjectWiseZoneLableRequest(rowData?.project_id));

        const dateArray = [];
        dateArray.push(new Date(rowData.start_date));
        dateArray.push(new Date(rowData.end_date));
        // console.log("here is date array", dateArray)
        // console.log(values)

        setValues({
            id: rowData.id,
            chain_id: rowData?.chain_id,
            promo_des: rowData.promo_des,
            promo_image: rowData.promo_image,
            status: rowData.status,
            zone: rowData.zone,
            sku: rowData.skuId?.id,
            promoType: rowData.promo_type,
            projectName: rowData?.project_id,
            image_preview: rowData?.promo_image,
            date: dateArray
        });
    };

    //ends here

    const confirmDeletePromos = (promoId) => {
        setPromosDeleteId(promoId?.id);
        setDeletePromosDialog(true);
    };

    const handleDeletePromos = () => {
        dispatch(DeletePromosRequest(promosDeleteId));
        setDeletePromosDialog(false);
    };
    const hideDeletePromosDialog = () => {
        setDeletePromosDialog(false);
    };
    const confirmDeleteSelected = () => {
        setMuitiDeletePromosDialog(true);
    };
    const deleteSelectedPromos = () => {
        let promos = promosData?.Promos.filter((val) => selectedPromos.includes(val));
        let ids = [];
        promos?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeletePromosRequest(formData));
        setSelectedPromos(null);
        setMuitiDeletePromosDialog(false);
        dispatch(handleResetPromos());
    };
    const handleClearFliter = () => {
        filterClearCallback();
        chainfilterClearCallback();
        zonefilterClearCallback();
    };
    const handleCreate = () => {
        dispatch(GetProjectNameRequest());
        setIsModalOpen(true);
        setSubmitted(false);
        handleResetFormData();
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={confirmDeleteSelected} disabled={selectedPromos?.length > 1 ? false : true} />
                    <Button label="Clear Filter" disabled={!searchFilterValue && !chainFilterValue && !zoneFilterValue} className="p-button-outlined ml-2  " onClick={() => handleClearFliter()} icon="pi pi-filter-slash"></Button>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Create Promos" icon="pi pi-plus" className="p-button-outlined p-button-success mr-2" onClick={() => handleCreate()} />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help" />

                {/* <Button label="Excel" icon="pi pi-plus" className="p-button-outlined p-button-success" onClick={() => dispatch(GetAllChainNameRequest()) && setIsModalOpen(true) && setSubmitted(false) && handleResetFormData()} /> */}
            </React.Fragment>
        );
    };
    const promosDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleSave(e)} />
        </>
    );
    const promoUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const chainBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.chain_name}</div>;
    };
    const zoneTemplete = (rowData) => {
        return (
            <div className="ml-2 capitalize">
                {/* {rowData.zone_name} */}
                <ol className="flex ">
                    {rowData?.zone_name?.map((item, index) => (
                        <li key={index} className="mx-3">
                            {item}
                        </li>
                    ))}
                </ol>
            </div>
        );
    };
    const promosdesBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.promo_des}</div>;
    };
    const projectNameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData?.project_name ? rowData?.project_name : 'N/A'}</div>;
    };
    const skuBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData?.skuId?.sku_no}</div>;
    };
    const ImageBodyTemplate = (rowData) => {
        return (
            <div className="ml-2">
                <Image src={`${rowData.promo_image}`} alt="Promo img" width="80px" height="40px" className="shadow-4" />
            </div>
        );
    };
    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <div className="actions flex justify-content-center capitalize">{rowData.status == '0' ? <Tag severity="success" value="Active"></Tag> : <Tag severity="danger" value="Inactive"></Tag>}</div>
            </>
        );
    };
    const typeBodyTemplate = (rowData) => {
        return (
            <>
                <div className="actions flex justify-content-center capitalize">{rowData.promo_type == '0' ? <Tag severity="Primary" value="Pack Promo"></Tag> : <Tag severity="success" value="Scan Promo"></Tag>}</div>
            </>
        );
    };

    const dateBodyTemplate = (rowData) => {
        return (
            <>
                <span className="ml-2 ">
                    {rowData.start_date} to {rowData.end_date}
                </span>
            </>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => handleEdit(rowData)} />
                <Button
                    icon="pi pi-image"
                    className="p-button-rounded p-button-text  p-button-help"
                    id="view-image-icons"
                    tooltip="View Image"
                    tooltipOptions={{ position: 'bottom' }}
                    onClick={() => {
                        setImage(rowData.promo_image);
                        setIsViewModalOpen(true);
                    }}
                />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeletePromos(rowData)} />
            </div>
        );
    };

    const deletePromosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeletePromosDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeletePromos} autoFocus />
        </>
    );

    const multideletePromosDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedPromos} autoFocus />
        </>
    );

    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const breadcrumbHome = {
        icon: 'pi pi-home',
        command: () => {
            navigate('/admin/dashboard');
        }
    };
    const breadcrumbItems = [
        {
            label: 'Promos Availability List',
            command: () => {
                navigate('/admin/promosavailabilitylist');
            }
        }
    ];
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column field="promo_des" header="Promos Description" body={promosdesBodyTemplate} headerStyle={{ width: '30%', minWidth: '6rem' }}></Column>
                    <Column field="zone" header="Zone" body={zoneTemplete} headerStyle={{ width: '20%', minWidth: '8rem' }}></Column>
                    <Column field="sku" header="SKU Name" body={skuBodyTemplate} headerStyle={{ width: '20%', minWidth: '6rem' }}></Column>
                </DataTable>
            </div>
        );
    };

    const filterApplyCallback = (options) => {
        dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const chainfilterApplyCallback = (options) => {
        dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${chainFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const zonefilterApplyCallback = (options) => {
        dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${zoneFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };

    const chainfilterClearCallback = (options) => {
        setChainFilterValue('');
        if (chainFilterValue !== '') {
            dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };

    const zonefilterClearCallback = (options) => {
        setZoneFilterValue('');
        if (zoneFilterValue !== '') {
            dispatch(GetAllPromosRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const chainfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => chainfilterClearCallback(options)} label="Clear" />;
    };
    const zonefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => zonefilterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const chainfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => chainfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const zonefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => zonefilterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const chainhandleFilter = (e) => {
        setChainFilterValue(e.target.value);
    };
    const zonehandleFilter = (e) => {
        setZoneFilterValue(e.target.value);
    };
    const chainFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={chainFilterValue} onChange={(e) => chainhandleFilter(e)} placeholder="Search Chain" />;
    };
    const projectNameFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Project" />;
    };
    const zoneFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={zoneFilterValue} onChange={(e) => zonehandleFilter(e)} placeholder="Search Zone" />;
    };

    const initFilters = () => {
        setFilters({
            chain_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
            zone: { value: null, matchMode: FilterMatchMode.CONTAINS },
            project_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        if (successMessage) {
            setModalExcel(false);
            setIsModalOpen(false);
            setIsEditModalOpen(false);
            setDeletePromosDialog(false);
            setMuitiDeletePromosDialog(false);
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(handleResetPromos());
            dispatch(GetAllPromosRequest(queryString));
        }
    }, [ queryString, successMessage ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllPromosRequest(queryString));
    }, [ dispatch, queryString ]);

    useEffect(() => {
        initFilters();
    }, []);

    useEffect(() => {
        // if (projectListData !== null) {
        //     dispatch(getChainByProjectIdRequest(values?.projectName));
        //     dispatch(getProjectWiseZoneLableRequest(values?.projectName))
        // }
        if (values.chain_id != '') {
            dispatch(getSkuListByChainIdRequest(values.chain_id));
        }
    }, [ projectListData, values.projectName, values.chain_id ]);
    return (
        <div className="promo-main-component">
            <SubHeader headerName={'Promos Availability List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card promolist-card">
                        <Toast ref={toast} />
                        {/* <Toolbar className="create-delete-btn" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                        <DataTable
                            ref={dt}
                            // loading={isLoading}
                            value={promosData?.Promos}
                            showGridlines
                            stripedRows
                            selection={selectedPromos}
                            onSelectionChange={(e) => setSelectedPromos(e.value)}
                            dataKey="id"
                            filters={filters}
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
                            <Column field="promo_image" header="Promos Image" body={ImageBodyTemplate} headerStyle={{ width: '20%', minWidth: '8rem' }}></Column>
                            {/* <Column field="promo_des" header="Promos Description " body={promosdesBodyTemplate} sortable headerStyle={{ width: '30%', minWidth: '6rem' }}></Column> */}

                            <Column
                                field="project_name"
                                sortable
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={projectNameFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="project_name"
                                header="Project Name"
                                body={projectNameBodyTemplate}
                                headerStyle={{ width: '20%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="chain_id"
                                sortable
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={chainFilterTemplate}
                                filterClear={chainfilterClearTemplate}
                                filterApply={chainfilterApplyTemplate}
                                filterField="chain_id"
                                header="Chain"
                                body={chainBodyTemplate}
                                headerStyle={{ width: '20%', minWidth: '8rem' }}
                            ></Column>

                            <Column field="date" sortable filterField="date" header="Date" body={dateBodyTemplate} headerStyle={{ width: '30%', minWidth: '13rem' }}></Column>

                            <Column field="promo" sortable header="Promo Type" body={typeBodyTemplate} headerStyle={{ width: '20%', minWidth: '6rem' }}></Column>
                            <Column field="status" sortable header="Status" body={statusBodyTemplate} headerStyle={{ width: '20%', minWidth: '6rem' }}></Column>
                            <Column header="Actions" headerStyle={{ width: '5%', minWidth: '9rem' }} className="promo-list-tbl action" body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={promosData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog
                            ref={scrollRef}
                            visible={isModalOpen}
                            style={{ width: '60vw' }}
                            header="Promos Availability Create"
                            modal
                            className="p-fluid usercreation create-promos-availibilty-dialog"
                            footer={promosDialogFooter}
                            onHide={hideDialog}
                        >
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Project"
                                        options={projectListData}
                                        onChange={(e) => setValues({ ...values, projectName: e.value }, dispatch(getProjectWiseZoneLableRequest(e.value)), dispatch(getChainByProjectIdRequest(e.value)))}
                                        value={values.projectName}
                                        // className='w-full'
                                        className={classNames({ 'p-invalid': submitted && !values.projectName })}
                                    />
                                    {submitted && !values.projectName && <small className="p-invalid error"> Project name is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Chain
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Chain"
                                        options={chainList}
                                        onChange={(e) => setValues({ ...values, chain_id: e.value })}
                                        value={values.chain_id}
                                        // className='w-full'
                                        className={classNames({ 'p-invalid': submitted && values.chain_id == '' })}
                                    />
                                    {submitted && values.chain_id == '' ? <small className="p-invalid error">Chain name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select SKU
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select SKU"
                                        options={skuData}
                                        value={values.sku}
                                        onChange={(e) => {
                                            setValues({ ...values, sku: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.sku })}
                                    />
                                    {submitted && !values.sku && <small className="p-invalid error"> SKU is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    {/* {console.log(projectZoneList, "here")} */}
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <MultiSelect
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        filter
                                        display="chip"
                                        maxSelectedLabels={4}
                                        showClear
                                        placeholder="Select Zone"
                                        disabled={values.chain_id == '' ? true : false}
                                        options={projectZoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && errors?.zone })}
                                    />
                                    {submitted && values.zone == '' ? <small className="p-invalid error">Zone is required</small> : null}
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
                                        value={values.status}
                                        onChange={(e) => {
                                            setValues({ ...values, status: e.value });
                                        }}
                                        className={classNames({ 'p-invalid errors': submitted && errors?.status })}
                                    />
                                    {submitted && values.status == '' ? <small className="p-invalid error">Status is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Type of Promo
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Type of Promo"
                                        options={promosTag}
                                        value={values.promoType}
                                        onChange={(e) => {
                                            setValues({ ...values, promoType: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.promoType })}
                                    />
                                    {submitted && !values.promoType && <small className="p-invalid error">Type of promo is required</small>}
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && !values.date })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        value={values.date}
                                        onChange={(e) => setValues({ ...values, date: e.value })}
                                        minDate={minDate}
                                    // maxDate={maxDate}
                                    ></Calendar>

                                    {submitted && !values.date && <small className="p-invalid error">Date is required</small>}
                                </div>
                                {/* <div className="field col-12 md:col-6 mb-1">
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
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="textarea" className="required">
                                        Promos Description
                                    </label>
                                    <InputTextarea
                                        id="textarea"
                                        placeholder="Enter Promos Description"
                                        rows="3"
                                        cols="10"
                                        autoResize
                                        value={values.promo_des}
                                        onChange={(e) => setValues({ ...values, promo_des: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !values.promo_des })}
                                    ></InputTextarea>
                                    {submitted && !values.promo_des && <small className="p-invalid error">Promos Description is required</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="image" className="required">
                                        Upload Image Here
                                    </label>
                                    <input
                                        type="file"
                                        id="imgfile"
                                        onChange={(e) => {
                                            setValues({ ...values, promo_image: e.target.files[ 0 ], promo_image_name: e.target.files[ 0 ].name, image_preview: URL.createObjectURL(e.target.files[ 0 ]) });

                                            setSubmitted(false);
                                        }}
                                        hidden
                                    />

                                    <div className="flex flex-row ">
                                        <div className="flex flex-column mr-4">
                                            <div className="cursor-pointer w-9rem border-round" style={{ backgroundColor: '#1565C0', color: 'white', padding: '10px 0px' }}>
                                                <label htmlFor="imgfile" className="flex justify-content-center align-items-center">
                                                    <i className="pi pi-upload mr-3"></i>
                                                    <span className=" cursor-pointer">Select Image</span>
                                                </label>
                                            </div>
                                            {submitted && values.image_preview == null ? <small className="p-invalid error">Image is required</small> : null}
                                            <span id="file-chosen" className="ml-0">
                                                {values.promo_image_name}
                                            </span>
                                        </div>
                                        <div className="flex flex-row ml-4">
                                            <Image src={values.image_preview} width="100" height="100" alt="Image" />
                                            {values.image_preview != null ? (
                                                <div className="flex justify-content-center align-items-center">
                                                    <Button
                                                        icon="pi pi-times"
                                                        className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                        onClick={() => {
                                                            setValues({ ...values, image_preview: null, promo_image_name: 'No Image Choosen', promo_image: '' });
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={isEditModalOpen} style={{ width: '60vw' }} header="Promos Availability Edit" modal className="p-fluid usercreation" footer={promoUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Project"
                                        options={projectListData}
                                        onChange={(e) => setValues({ ...values, projectName: e.value }, dispatch(getProjectWiseZoneLableRequest(e.value)), dispatch(getChainByProjectIdRequest(e.value)))}
                                        value={values.projectName}
                                        // className='w-full'
                                        className={classNames({ 'p-invalid': submitted && values.projectName == '' })}
                                    />
                                    {submitted && values.projectName == '' ? <small className="p-invalid error">Project name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Chain
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Chain"
                                        options={chainList}
                                        value={values.chain_id}
                                        onChange={(e) => {
                                            setValues({ ...values, chain_id: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.chain_id })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.chain_id}</small> : null}
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown">Select SKU</label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select SKU"
                                        options={skuData}
                                        value={values.sku}
                                        onChange={(e) => {
                                            setValues({ ...values, sku: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.sku == '' })}
                                    />
                                    {submitted && values.sku == '' ? <small className="p-invalid error">SKU is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown">Zone</label>
                                    {/* {console.log(values.zone)} */}
                                    <MultiSelect
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        display="chip"
                                        required
                                        filter
                                        maxSelectedLabels={3}
                                        showClear
                                        placeholder="Select Zone"
                                        options={projectZoneList}
                                        disabled={values.chain_id == '' ? true : false}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {submitted && values.zone == '' ? <small className="p-invalid error">Zone is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown">Status</label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Status"
                                        options={statusTag}
                                        value={values.status}
                                        onChange={(e) => {
                                            setValues({ ...values, status: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.status })}
                                    />
                                    {submitted && values.status == '' ? <small className="p-invalid error">Status is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown">Type of Promo</label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Type of Promo"
                                        options={promosTag}
                                        value={values.promoType}
                                        onChange={(e) => {
                                            setValues({ ...values, promoType: e.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.promoType == '' })}
                                    />
                                    {submitted && values.promoType == '' ? <small className="p-invalid error">Type of promo is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Select Date
                                    </label>
                                    <Calendar
                                        inputId="calendar"
                                        className={classNames({ 'p-invalid': submitted && values.start_date == '' })}
                                        dateFormat="dd/mm/yy"
                                        placeholder="dd/mm/yy - dd/mm/yy"
                                        selectionMode="range"
                                        showButtonBar
                                        value={values.date}
                                        onChange={(e) => setValues({ ...values, date: e.value })}
                                        minDate={minDate}
                                    // maxDate={maxDate}
                                    ></Calendar>

                                    {errors ? <small className="p-invalid error">{errors?.start_date}</small> : null}
                                    {errors ? <small className="p-invalid error">{errors?.end_date}</small> : null}
                                </div>
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="textarea" className="required">
                                        Promos Description
                                    </label>
                                    <InputTextarea
                                        id="textarea"
                                        placeholder="Enter Promos Description"
                                        rows="3"
                                        cols="30"
                                        autoResize
                                        value={values.promo_des}
                                        onChange={(e) => setValues({ ...values, promo_des: e.target.value })}
                                        className={classNames({ 'p-invalid': submitted && !values.promo_des })}
                                    ></InputTextarea>
                                    {errors ? <small className="p-invalid error">{errors?.promo_des}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="image" className="required">
                                        Upload Image Here
                                    </label>
                                    <input
                                        type="file"
                                        id="imgfile"
                                        onChange={(e) => {
                                            setValues({ ...values, promo_image: e.target.files[ 0 ], promo_image_name: e.target.files[ 0 ].name, image_preview: URL.createObjectURL(e.target.files[ 0 ]), isImageChange: true });
                                            setSubmitted(false);
                                        }}
                                        hidden
                                    />

                                    <div className="flex flex-row ">
                                        <div className="flex flex-column mr-4">
                                            <div className="cursor-pointer w-9rem border-round" style={{ backgroundColor: '#1565C0', color: 'white', padding: '10px 0px' }}>
                                                <label htmlFor="imgfile" className="flex justify-content-center align-items-center">
                                                    <i className="pi pi-upload mr-3"></i>
                                                    <span className="cursor-pointer">{values.promo_image == '' ? 'Select Image' : 'Update image'}</span>
                                                </label>
                                            </div>
                                            {submitted && values.promo_image == '' ? <small className="p-invalid error">Image is required</small> : null}
                                            <span id="file-chosen" className="ml-0 ">
                                                {values.promo_image_name}
                                            </span>
                                        </div>
                                        <div className="flex flex-row ">
                                            <Image
                                                src={values.isImageChange ? values.image_preview : values.promo_image}
                                                onChange={(e) => {
                                                    setValues({
                                                        ...values,
                                                        image_preview: URL.createObjectURL(e.target.files[ 0 ])
                                                    });
                                                }}
                                                width="100"
                                                height="100"
                                                alt="Promo image"
                                            />
                                            {values.promo_image != '' ? (
                                                <div className="flex justify-content-center align-items-center">
                                                    <Button
                                                        icon="pi pi-times"
                                                        className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                        onClick={() => {
                                                            setValues({ ...values, promo_image: '', promo_image_name: 'No Image Choosen', image_preview: '' });
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                            {/* <div>
                                                <Button icon="pi pi-trash" className="p-button-outlined p-button-danger ml-4" onClick={(e) => setValues({ ...values, promo_image: '', promo_image_name: 'No file choosen', image_preview: '' })} />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* new code end */}

                            {/* <div className="grid ml-1 mt-2 flex-row">
                                <div className="field mr-3 upload-promo">
                                    <label htmlFor="image">Upload Pic Here</label>
                                    <FileUpload
                                        name="demo[]"
                                        value={values.promo_image}
                                        onChange={(e) => {
                                            setValues({ ...values, promo_image: e.target.value });
                                        }}
                                        url="./upload.php"
                                        onUpload={onUpload}
                                        multiple
                                        accept="image/*"
                                        maxFileSize={1000000}
                                    />
                                </div>
                                <div className="field mr-3 userdropdown">
                                    <label htmlFor="dropdown">Status</label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="value"
                                        required
                                        placeholder="Select Status"
                                        options={statusTag}
                                        value={values.status}
                                        onChange={(e) => {
                                            setValues({ ...values, status: e.target.value });
                                        }}
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.status })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.status}</small> : null}
                                </div>
                            </div> */}
                        </Dialog>
                        <ImportModal modalopen={modalExcel} hideModal={hideExcelDialog} readExcel={readExcel} sampleExcel={sample_promo} />
                        <ViewImageModal modalopen={isViewModalOpen} hideModal={hideDialog} image={image} />
                        <DeleteModal isOpenDialog={deletePromosDialog} modalFooter={deletePromosDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete ?'} />
                        <DeleteModal isOpenDialog={multideletePromosDialog} modalFooter={multideletePromosDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete the selected Promos ?'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Promosavailabilitylist;
