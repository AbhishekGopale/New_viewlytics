import * as XLSX from 'xlsx';
import {
    CreateStoreRequest,
    DeleteStoreRequest,
    EditStoreRequest,
    GetAllCityRequest,
    GetAllStateRequest,
    GetAllStoreRequest,
    getChainByProjectIdRequest,
    handleResetStore,
    importExcelStoreRequest,
    MultipalDeleteStoreRequest
} from '../../../../redux/slice/AdminSlice/storeSlice';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { getProjectWiseZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import components from '../../primeReactComponentsIndex';
import { SubHeader, add_store_excel } from '../../../../indexMain';

const Storelist = () => {
    const { React, useEffect, useNavigate, useState, useRef, useDispatch, useSelector, FileUpload, Dropdown, InputNumber, Image, FilterMatchMode, Button, Column, DataTable, Dialog, InputText, Paginator, Toast, Toolbar, classNames } = components;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, storeData, stateData, cityData, successMessage, chainList, errors } = useSelector((state) => state.store);
    const { projectListData } = useSelector((state) => state.promos);
    const { projectZoneList } = useSelector((state) => state.zone);
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ storeDeleteId, setStoreDeleteId ] = useState('');
    const [ deleteStoreDialog, setDeleteStoreDialog ] = useState(false);
    const [ deleteStoresDialog, setDeleteStoresDialog ] = useState(false);
    const [ selectedStores, setSelectedStores ] = useState([]);
    const [ isViewDialogOpen, setIsViewDialogOpen ] = useState(false);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const [ viewImage, setViewImage ] = useState(false);

    const toast = useRef(null);
    const st = useRef(null);
    const [ filters, setFilters ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ chainFilterValue, setChainFilterValue ] = useState('');
    const [ storeFilterValue, setStoreFilterValue ] = useState('');
    const [ zoneFilterValue, setZoneFilterValue ] = useState('');
    const [ stateFilterValue, setStateFilterValue ] = useState('');
    const [ cityFilterValue, setCityFilterValue ] = useState('');

    const [ first, setFirst ] = useState(0);
    const [ image, setImage ] = useState('');
    const [ isErrors, setIsErorrs ] = useState({
        imageError: false
    });
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

        dispatch(GetAllStoreRequest(`page=${event.page + 1}&limit=${event.rows}`));
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

    const [ values, setValues ] = useState({
        id: '',
        chain: '',
        chainLabel: '',
        zone: '',
        zoneLabel: '',
        city: '',
        cityLabel: '',
        state: '',
        stateLabel: '',
        store_name: '',
        location: '',
        store_code: '',
        store_id: '',
        projectName: '',
        projectNameLabel: '',
        image: '',
        file: '',
        project_image_name: 'No Image Choosen',
        project_image: '',
        project_image_preview: null,
        isImageChange: false,
        id: ''
    });
    const handleResetFormData = () => {
        setValues({
            chain: '',
            zone: '',
            city: '',
            state: '',
            store_name: '',
            location: '',
            store_code: '',
            store_id: '',
            projectName: '',
            projectNameLabel: '',
            image: '',
            file: '',
            project_image_name: 'No Image Choosen',
            project_image: '',
            project_image_preview: null
        });
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
            const storeArray = { storeArray: data };
            dispatch(importExcelStoreRequest(storeArray));
        });
    };
    const editStore = (rowData) => {
        dispatch(GetAllStateRequest(rowData?.zone));
        dispatch(GetAllCityRequest(rowData?.state_id));
        dispatch(GetProjectNameRequest());
        setValues({
            ...values,
            id: rowData.id,
            chain: rowData.chain_id,
            chainLabel: rowData.chain,
            zone: rowData.zone,
            image: rowData.Image,
            zoneLabel: rowData.zone_name,
            city: rowData.city_id,
            state: rowData.state_id,
            store_name: rowData.store_name,
            location: rowData.location,
            store_code: rowData.store_code,
            stateLabel: rowData.state,
            cityLabel: rowData.city,
            projectName: rowData.project_id,
            projectNameLabel: rowData.project_name
        });
        setIsEditModalOpen(true);
    };

    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
    };
    const hideViewDialog = () => {
        setValues(values);
        setIsViewDialogOpen(false);
        handleResetFormData();
    };

    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
    };
    const hideExcelDialog = () => {
        setModalExcel(false);
    };

    const handleSave = (e) => {
        setSubmitted(true);
        setIsErorrs({
            ...errors,
            imageError: false
        });
        if (values.image == '') {
            setIsErorrs({
                ...errors,
                imageError: true
            });
        } else if (values.image == '') {
            setIsErorrs({
                ...errors,
                imageError: true
            });
        } else {
            const formData = new FormData();
            formData.append('store_code', values.store_code?.toString());
            formData.append('city', values.cityLabel);
            formData.append('state', values.stateLabel);
            formData.append('location', values.location);
            formData.append('store_name', values.store_name);
            // formData.append('chain', values.chainLabel);
            formData.append('chain', values.chain);
            formData.append('project_name', values.projectNameLabel);
            formData.append('image', values.image);
            formData.append('zone', values.zoneLabel);
            dispatch(CreateStoreRequest(formData));
            console.log(formData, 'formData');
        }
    };
    const handleEditSave = () => {
        setSubmitted(true);
        setIsErorrs({
            ...errors,
            imageError: false
        });
        if (values.isImageChange == true) {
            let formData = new FormData();
            formData.append('store_code', values.store_code?.toString());
            formData.append('city', values.cityLabel);
            formData.append('state', values.stateLabel);
            formData.append('location', values.location);
            formData.append('store_name', values.store_name);
            formData.append('chain', values.chainLabel);
            formData.append('project_name', values.projectNameLabel);
            formData.append('zone', values.zoneLabel);
            formData.append('image', values.store_image);
            formData.append('id', values.id);
            dispatch(EditStoreRequest(values.id, formData));
        } else if (values.image !== '') {
            const formData = new FormData();
            formData.append('store_code', values.store_code?.toString());
            formData.append('city', values.cityLabel);
            formData.append('state', values.stateLabel);
            formData.append('location', values.location);
            formData.append('store_name', values.store_name);
            formData.append('chain', values.chainLabel);
            formData.append('project_name', values.projectNameLabel);
            formData.append('zone', values.zoneLabel);
            formData.append('image', values.image);
            formData.append('id', values.id);
            dispatch(EditStoreRequest(values.id, formData));
        } else if (values.image == '') {
            if (values.store_image_preview == null) {
                setIsErorrs({
                    ...errors,
                    zoneError: false
                });
            }
        }
    };

    const confirmDeleteStore = (storeId) => {
        setStoreDeleteId(storeId?.id);
        setDeleteStoreDialog(true);
    };
    const hideDeleteStoresDialog = () => {
        setDeleteStoresDialog(false);
    };
    const confirmDeleteSelected = () => {
        setDeleteStoresDialog(true);
    };
    const handleDeleteStore = () => {
        dispatch(DeleteStoreRequest(storeDeleteId));
        setDeleteStoreDialog(false);
    };
    const hideDeleteStoreDialog = () => {
        setDeleteStoreDialog(false);
    };
    const viewDetailsDialog = (rowData) => {
        setValues(rowData);
        setIsViewDialogOpen(true);
    };

    const deleteSelectedStores = () => {
        let stores = storeData?.Store.filter((val) => selectedStores.includes(val));
        let ids = [];
        stores?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteStoreRequest(formData));
        setSelectedStores(null);
        setDeleteStoresDialog(false);
        dispatch(handleResetStore());
    };
    const handleClearFliter = () => {
        filterClearCallback();
        chainfilterClearCallback();
        storefilterClearCallback();
        zonefilterClearCallback();
        statefilterClearCallback();
        cityfilterClearCallback();
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedStores?.length > 1 ? false : true} />

                    <Button
                        label="Clear Filter"
                        className="p-button-outlined ml-2  "
                        disabled={!searchFilterValue && !chainFilterValue && !storeFilterValue && !stateFilterValue && !zoneFilterValue && !cityFilterValue}
                        onClick={() => handleClearFliter()}
                        icon="pi pi-filter-slash"
                    >
                        {' '}
                    </Button>
                </div>
            </React.Fragment>
        );
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Store"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success mr-2 "
                    onClick={() => {
                        setIsModalOpen(true);
                        dispatch(GetProjectNameRequest());
                    }}
                />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help" />
            </React.Fragment>
        );
    };
    const createStoreDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" autofocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleSave(e)} />
        </>
    );
    const storeBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.store_code}</div>;
    };
    const chainBodyTemplate = (rowData) => {
        // return <div className="ml-2 capitalize">{rowData.chain_name}</div>;
        return <div className="ml-2 capitalize">{rowData.chain_name == null || rowData.chain_name == '' || rowData.chain_name == ' ' ? 'N / A' : rowData.chain_name}</div>;
    };
    const zoneBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.zone_name}</div>;
    };
    const cityBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.city}</div>;
    };
    const stateBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.state}</div>;
    };
    const nameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.store_name}</div>;
    };
    const locationBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.location}</div>;
    };
    const projectNameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.project_name ? rowData.project_name : 'N/A'}</div>;
    };
    const imageBodyTemplate = (rowData) => {
        return (
            <div className="ml-2">
                <Image src={rowData.Image} alt="image" width="80px" height="40px" className="shadow-4" />
            </div>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text p-button-help" onClick={() => editStore(rowData)} />
                <Button
                    icon="pi pi-image"
                    className="p-button-rounded p-button-text  p-button-help"
                    id="view-image-icons"
                    tooltip="View Image"
                    tooltipOptions={{ position: 'bottom' }}
                    onClick={() => {
                        setViewImage(true);
                        setImage(rowData.Image);
                    }}
                />
                <Button tooltip="View" tooltipOptions={{ position: 'bottom' }} icon="pi pi-eye" className="p-button-rounded p-button-warning p-button-text" id="eyes-icons" onClick={() => viewDetailsDialog(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteStore(rowData)} />
            </div>
        );
    };

    // const header = (
    //     <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center ">
    //         <h5 className="m-0">Store List</h5>
    //         <span className="block mt-2 md:mt-0 p-input-icon-left data-table-search">
    //             <i className="pi pi-search" />
    //             <InputText className="search" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
    //         </span>
    //     </div>
    // );
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const storeUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteStoreDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteStoreDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteStore} autoFocus />
        </>
    );
    const deleteStoresDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDeleteStoresDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteSelectedStores} autoFocus />
        </>
    );
    // const handleFileUpload = async (event) => {
    //     let formData = new formData();
    //     const file = event.files[ 0 ];
    //     formData.append(file);
    //     console.log(file)
    //     dispatch(CreateStoreRequest(formData))
    // };
    const breadcrumbHome = {
        icon: 'pi pi-home',
        label: 'Home',
        command: () => {
            navigate('/admin/dashboard');
        }
    };
    const breadcrumbItems = [
        {
            label: 'Store List',
            command: () => {
                navigate('/admin/storelist');
            }
        }
    ];

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    <Column
                        // field="city"
                        // filter
                        // showFilterOperator={false}
                        // showAddButton={false}
                        // showFilterMatchModes={false}
                        // filterElement={cityFilterTemplate}
                        // filterClear={cityfilterClearTemplate}
                        // filterApply={cityfilterApplyTemplate}
                        // filterField="city"
                        header="City"
                        body={cityBodyTemplate}
                        // sortable
                        headerStyle={{ width: '10%', minWidth: '8rem' }}
                    ></Column>
                    <Column field="location" header="Address" body={locationBodyTemplate} headerStyle={{ width: '8%', minWidth: '10rem' }}></Column>
                </DataTable>
            </div>
        );
    };

    const filterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const chainfilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${chainFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const storefilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${storeFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const zonefilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${zoneFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const statefilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${stateFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };
    const cityfilterApplyCallback = (options) => {
        dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${cityFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const chainfilterClearCallback = (options) => {
        setChainFilterValue('');
        if (chainFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const storefilterClearCallback = (options) => {
        setStoreFilterValue('');
        if (storeFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const zonefilterClearCallback = (options) => {
        setZoneFilterValue('');
        if (zoneFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const statefilterClearCallback = (options) => {
        setStateFilterValue('');
        if (stateFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const cityfilterClearCallback = (options) => {
        setCityFilterValue('');
        if (cityFilterValue !== '') {
            dispatch(GetAllStoreRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const chainfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => chainfilterClearCallback(options)} label="Clear" />;
    };
    const storefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => storefilterClearCallback(options)} label="Clear" />;
    };
    const zonefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => zonefilterClearCallback(options)} label="Clear" />;
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
    const chainfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => chainfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const storefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => storefilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const zonefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => zonefilterApplyCallback(options)} severity="success" label="Apply" />;
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
    const chainhandleFilter = (e) => {
        setChainFilterValue(e.target.value);
    };
    const storehandleFilter = (e) => {
        setStoreFilterValue(e.target.value);
    };
    const zonehandleFilter = (e) => {
        setZoneFilterValue(e.target.value);
    };
    const statehandleFilter = (e) => {
        setStateFilterValue(e.target.value);
    };
    const cityhandleFilter = (e) => {
        setCityFilterValue(e.target.value);
    };
    const storeFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={storeFilterValue} onChange={(e) => storehandleFilter(e)} placeholder="Search Store" />;
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
    const stateFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={stateFilterValue} onChange={(e) => statehandleFilter(e)} placeholder="Search State" />;
    };
    const cityFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={cityFilterValue} onChange={(e) => cityhandleFilter(e)} placeholder="Search City" />;
    };

    const initFilters = () => {
        setFilters({
            store_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            chain: { value: null, matchMode: FilterMatchMode.CONTAINS },
            zone: { value: null, matchMode: FilterMatchMode.CONTAINS },
            state: { value: null, matchMode: FilterMatchMode.CONTAINS },
            city: { value: null, matchMode: FilterMatchMode.CONTAINS },
            project_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            setSubmitted(false);
            setIsModalOpen(false);
            setModalExcel(false);
            setIsEditModalOpen(false);
            setDeleteStoreDialog(false);
            setDeleteStoresDialog(false);
            handleResetFormData();
            dispatch(handleResetStore());
            dispatch(GetAllStoreRequest(queryString));
        }
    }, [ successMessage, queryString ]);

    useEffect(() => {
        if (values.zone != '') {
            dispatch(GetAllStateRequest(values.zone));
        }
        if (values.state != '') {
            dispatch(GetAllCityRequest(values.state));
        }
        if (values.projectName != '') {
            dispatch(getProjectWiseZoneLableRequest(values?.projectName));
            dispatch(getChainByProjectIdRequest(values?.projectName));
        }
    }, [ values.zone, values.state, values.projectName, queryString ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllStoreRequest(queryString));
    }, [ dispatch, queryString ]);

    // useEffect(() => {
    //     if (storeData?.length > 0) {
    //         return initFilters();
    //     }

    // }, [storeData]);
    useEffect(() => {
        initFilters();
    }, []);
    return (
        <div className="store-main-component ">
            <SubHeader headerName={'Store List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card storelist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={st}
                            // loading={isLoading}
                            filters={filters}
                            value={storeData?.Store}
                            stripedRows
                            showGridlines
                            selection={selectedStores}
                            onSelectionChange={(e) => setSelectedStores(e.value)}
                            selectionMode={'checkbox'}
                            dataKey="id"
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
                            <Column field="image" header="Image" body={imageBodyTemplate} headerStyle={{ width: '15%', mainWidth: '9rem' }}></Column>
                            <Column field="store_code" sortable header="Store Code" body={storeBodyTemplate} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                            <Column
                                field="project_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={projectNameFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="project_name"
                                header="Project Name"
                                sortable
                                body={projectNameBodyTemplate}
                                headerStyle={{ width: '15%', minWidth: '8rem' }}
                            ></Column>
                            <Column
                                field="chain_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={chainFilterTemplate}
                                filterClear={chainfilterClearTemplate}
                                filterApply={chainfilterApplyTemplate}
                                filterField="chain"
                                header="Chain"
                                sortable
                                body={chainBodyTemplate}
                                headerStyle={{ width: '10%', minWidth: '6rem' }}
                            ></Column>
                            <Column
                                field="store_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={storeFilterTemplate}
                                filterClear={storefilterClearTemplate}
                                filterApply={storefilterApplyTemplate}
                                filterField="store_name"
                                header="Store Name"
                                sortable
                                body={nameBodyTemplate}
                                headerStyle={{ width: '15%', minWidth: '8rem' }}
                            ></Column>

                            <Column
                                field="zone"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={zoneFilterTemplate}
                                filterClear={zonefilterClearTemplate}
                                filterApply={zonefilterApplyTemplate}
                                filterField="zone"
                                header="Zone"
                                body={zoneBodyTemplate}
                                sortable
                                headerStyle={{ width: '10%', minWidth: '6rem' }}
                            ></Column>
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
                                headerStyle={{ width: '12%', minWidth: '8rem' }}
                            ></Column>

                            {/* <Column field="location" header="Location" body={locationBodyTemplate} headerStyle={{ width: '8%', minWidth: '8rem' }}></Column>  */}
                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={storeData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={isModalOpen} style={{ width: '60vw' }} header="Create Store " modal className="p-fluid usercreation" footer={createStoreDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storecode" className="required">
                                        Store Code
                                    </label>
                                    <InputNumber
                                        required
                                        useGrouping={false}
                                        placeholder="Enter Store Code"
                                        value={values?.store_code}
                                        onValueChange={(e) => {
                                            setValues({ ...values, store_code: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.store_code })}
                                    />
                                    {submitted && !values.store_code && <small className="p-invalid error"> Store Code is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        required
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.projectName}
                                        onChange={(e) => {
                                            setValues({ ...values, projectName: e.target.value, projectNameLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.projectName })}
                                    />
                                    {submitted && !values.projectName && <small className="p-invalid error"> Project Name is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain" className="required">
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
                                        disabled={values.projectName == '' ? true : false}
                                        value={values?.chain}
                                        onChange={(e) => {
                                            setValues({ ...values, chain: e.target.value, chainLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.chain })}
                                    />
                                    {submitted && !values.chain && <small className="p-invalid error">Chain is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storename" className="required">
                                        Store Name
                                    </label>
                                    <InputText
                                        id="storename"
                                        type="text"
                                        placeholder="Enter Store Name"
                                        value={values.store_name}
                                        onChange={(e) => {
                                            setValues({ ...values, store_name: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.store_name })}
                                    />
                                    {/* {submitted && errors ? <small className="p-invalid error">{errors?.store_name}</small> : null} */}

                                    {submitted && !values.store_name && <small className="p-invalid error">Store Name is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="location" className="required">
                                        Location
                                    </label>
                                    <InputText
                                        id="location"
                                        placeholder="Enter Location"
                                        type="text"
                                        value={values.location}
                                        onChange={(e) => {
                                            setValues({ ...values, location: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.location })}
                                    />
                                    {submitted && !values.location && <small className="p-invalid error">Location is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        placeholder="Select Zone"
                                        disabled={values.chain == '' ? true : false}
                                        options={projectZoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value, zoneLabel: e.originalEvent.target.ariaLabel });
                                            dispatch(GetAllStateRequest(e.value));
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {submitted && !values.zone && <small className="p-invalid error">Zone is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
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
                                        disabled={values.zone == '' ? true : false}
                                        // disabled
                                        options={stateData}
                                        value={values.state}
                                        onChange={(e) => {
                                            setValues({ ...values, state: e.target.value, stateLabel: e.originalEvent.target.ariaLabel });
                                            dispatch(GetAllCityRequest(e.value));
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.state })}
                                    />
                                    {submitted && !values.state && <small className="p-invalid error">State is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
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
                                        disabled={values.state == '' ? true : false}
                                        options={cityData}
                                        value={values.city}
                                        onChange={(e) => {
                                            setValues({ ...values, city: e.target.value, cityLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.city })}
                                    />
                                    {submitted && !values.city && <small className="p-invalid error">City is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="image" className="required">
                                        Upload Image Here
                                    </label>
                                    <input
                                        type="file"
                                        id="imgfile"
                                        onChange={(e) => {
                                            setValues({
                                                ...values,
                                                store_image_name: e.target.files[ 0 ].name,
                                                store_image_preview: URL.createObjectURL(e.target.files[ 0 ]),
                                                image: e.target.files[ 0 ]
                                            });
                                            setSubmitted(false);
                                            setIsErorrs({
                                                ...errors,
                                                imageError: false,
                                                storeNameError: false
                                            });
                                        }}
                                        hidden
                                    />

                                    <div className="flex flex-row ">
                                        <div className="flex flex-column mr-4 ">
                                            <div className="cursor-pointer w-9rem border-round" style={{ backgroundColor: '#1565C0', color: 'white', padding: '10px 0px' }}>
                                                <label htmlFor="imgfile" className="flex justify-content-center align-items-center">
                                                    <i className="pi pi-upload mr-3"></i>
                                                    <span className="cursor-pointer ">Select Image</span>
                                                </label>
                                            </div>

                                            {isErrors?.imageError ? <small className="p-invalid error">Image is required</small> : null}
                                            <span id="file-chosen" className="ml-0 ">
                                                {values.store_image_name}
                                            </span>
                                        </div>
                                        <div className="flex flex-row">
                                            <Image src={values.store_image_preview ? values.store_image_preview : values.image} alt="Store Image" width="100" height="100" />
                                            {values.image != '' ? (
                                                <div className="flex justify-content-center align-items-center">
                                                    <Button
                                                        icon="pi pi-times"
                                                        className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                        onClick={() => setValues({ ...values, image: '', store_image_name: 'No Image Choosen', store_image: '', store_image_preview: '' })}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={isViewDialogOpen} style={{ width: '60vw' }} header="Store Details" modal className="p-fluid usercreation viewmodel" onHide={hideViewDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storecode">Store Code</label>
                                    <InputText id="storecode" readOnly required type="text" value={values.store_code} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storename">Project Name</label>
                                    <InputText id="storename" readOnly required type="text" value={values.project_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storename">Store Name</label>
                                    <InputText id="storename" readOnly required type="text" value={values.store_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain">Chain</label>
                                    <InputText id="chain" readOnly required type="text" value={values.chain} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="location">Location</label>
                                    <InputText id="location" readOnly required type="text" value={values.location} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="zone">Zone</label>
                                    <InputText id="zone" readOnly required type="text" value={values.zone_name} />
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="state">State</label>
                                    <InputText id="state" readOnly required type="text" value={values.state} />
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="city">City</label>
                                    <InputText id="city" readOnly required type="text" value={values.city} />
                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={isEditModalOpen} style={{ width: '60vw' }} header="Store Update" modal className="p-fluid usercreation" footer={storeUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storecode" className="required">
                                        Store Code
                                    </label>
                                    <InputNumber
                                        required
                                        useGrouping={false}
                                        placeholder="Enter Store Code"
                                        value={values?.store_code}
                                        onValueChange={(e) => {
                                            setValues({ ...values, store_code: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.store_code })}
                                    />
                                    {submitted && !values.store_code && <small className="p-invalid error"> Store Code is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain" className="required">
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
                                        value={values?.projectName}
                                        onChange={(e) => {
                                            setValues({ ...values, projectName: e.target.value, projectNameLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.projectName })}
                                    />
                                    {submitted && !values.projectName && <small className="p-invalid error"> Project Name is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain" className="required">
                                        Chain
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select Chain"
                                        disabled={values.projectName == '' ? true : false}
                                        options={chainList}
                                        value={values?.chain}
                                        onChange={(e) => {
                                            setValues({ ...values, chain: e.target.value, chainLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.chain })}
                                    />
                                    {submitted && !values.chain && <small className="p-invalid error">Chain is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="storename" className="required">
                                        Store Name
                                    </label>
                                    <InputText
                                        id="storename"
                                        type="text"
                                        value={values.store_name}
                                        placeholder="Enter Store Name"
                                        onChange={(e) => {
                                            setValues({ ...values, store_name: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.store_name })}
                                    />
                                    {submitted && !values.store_name && <small className="p-invalid error">Store Name is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="location" className="required">
                                        Location
                                    </label>
                                    <InputText
                                        id="location"
                                        type="text"
                                        placeholder="Enter Location"
                                        value={values.location}
                                        onChange={(e) => {
                                            setValues({ ...values, location: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.location })}
                                    />
                                    {submitted && !values.location && <small className="p-invalid error">Location is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        label="value"
                                        placeholder="Select Zone"
                                        required
                                        options={projectZoneList}
                                        value={values?.zone}
                                        disabled={values.chain == '' ? true : false}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value, zoneLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {submitted && !values.zone && <small className="p-invalid error">Zone is required.</small>}
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        State
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        placeholder="Select State"
                                        options={stateData}
                                        value={values.state}
                                        // value={values.stateLabel != '' ? values.stateLabel : values.state}
                                        onChange={(e) => {
                                            setValues({ ...values, state: e.target.value, stateLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.state })}
                                    />
                                    {submitted && !values.state && <small className="p-invalid error">State is required.</small>}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        City
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        optionLabel="label"
                                        optionValue="value"
                                        placeholder="Select City"
                                        required
                                        options={cityData}
                                        value={values.city}
                                        onChange={(e) => {
                                            setValues({ ...values, city: e.target.value, cityLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.city })}
                                    />
                                    {submitted && !values.city && <small className="p-invalid error">City is required.</small>}
                                    {/* </div> */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <div className="mb-2">
                                        <label htmlFor="image" className="required">
                                            Upload Image Here
                                        </label>
                                        <input
                                            type="file"
                                            id="imgfile"
                                            onChange={(e) => {
                                                setValues({ ...values, store_image: e.target.files[ 0 ], store_image_name: e.target.files[ 0 ].name, store_image_preview: URL.createObjectURL(e.target.files[ 0 ]), isImageChange: true });
                                                setSubmitted(false);
                                            }}
                                            hidden
                                        />
                                    </div>
                                    <div className="flex flex-row ">
                                        <div className="flex flex-column mr-4">
                                            <div className="cursor-pointer w-9rem border-round" style={{ backgroundColor: '#1565C0', color: 'white', padding: '10px 0px' }}>
                                                <label htmlFor="imgfile" className="flex justify-content-center align-items-center">
                                                    <i className="pi pi-upload mr-3"></i>
                                                    <span className="cursor-pointer">{values.image == '' ? 'Select Image' : 'Update image'}</span>
                                                </label>
                                            </div>
                                            {submitted && isErrors.imageError ? <small className="p-invalid error">Image is required</small> : null}
                                            <span id="file-chosen" className="ml-0 ">
                                                {values.store_image_name}
                                            </span>
                                        </div>
                                        <div className="flex flex-row ">
                                            <Image src={values.store_image_preview != null ? values.store_image_preview : values.image} alt="Store Image" width="100" height="100" />

                                            {values.store_image_name != 'No Image Choosen' ? (
                                                <div className="flex justify-content-center align-items-center">
                                                    <Button
                                                        icon="pi pi-times"
                                                        className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                        onClick={() => setValues({ ...values, image: '', store_image_preview: null, store_image_name: 'No Image Choosen' })}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={deleteStoreDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteStoreDialogFooter} onHide={setDeleteStoreDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete <b>{values.store_name}</b>?
                                </span>
                            </div>
                        </Dialog>

                        <Dialog visible={deleteStoresDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteStoresDialogFooter} onHide={hideDeleteStoresDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Srores?</span>
                            </div>
                        </Dialog>

                        <Dialog visible={modalExcel} style={{ width: '50vw' }} header="Import Excel" modal className="p-fluid usercreation " onHide={hideExcelDialog}>
                            <div md="12" sm="12" className="my-3">
                                <div className="mb-3 p-3" style={{ 'background-color': '#e0e0e0' }}>
                                    <h6 style={{ color: 'red' }}>NOTE *</h6>

                                    <p className="font-medium mb-5">Kindly download the sample excel file and import the excel data as per the excel file otherwise data will not import properly it might give you an error </p>
                                </div>
                                <div
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                >
                                    <span className="font-medium">
                                        <i className="pi pi-download mr-2 "></i>Download :{' '}
                                    </span>
                                    <a href={add_store_excel} style={{ textDecoration: 'underline' }}>
                                        sample.xlsx
                                    </a>
                                </div>
                                <FileUpload mode="basic" accept="file/*" name="demo[]" maxFileSize={1000000} label="Import" chooseLabel="Import Excel" className="m-2 inline-block" customUpload uploadHandler={readExcel} />
                                {/* <p style={{ left: '20px', marginTop: '2rem' }}>
                                    <b style={{ color: 'red' }}>NOTE *</b>
                                    <br></br>
                                </p> */}
                                {/* <p>
                                    <b style={{ justifyContent: 'center' }}>
                                        <ul>
                                            <li>Excel import </li>
                                        </ul>
                                    </b>
                                </p> */}
                            </div>
                        </Dialog>
                        <Dialog visible={viewImage} style={{ width: '50vw' }} header="View Image" modal onHide={() => setViewImage(false)}>
                            <div className="flex align-items-center justify-content-center m-5">
                                <Image src={image} alt="image" width="400px" height="400px" className="shadow-4" />
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Storelist;
