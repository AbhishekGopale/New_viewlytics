import _default from 'react-redux/es/components/connect';
import { CreateChainRequest, MultipalDeleteChainRequest, DeleteChainRequest, EditChainRequest, GetAllChainRequest, handleResetChain, chainCreateRequest } from '../../../../redux/slice/AdminSlice/chainSlice';
import * as XLSX from 'xlsx';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { getProjectWiseZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import { ImportModal, SubHeader, chain_sample_excel } from '../../../../indexMain';
import components from '../../primeReactComponentsIndex';

const Chainlist = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, Button, Column, DataTable, Dropdown, Dialog, FilterMatchMode, InputText, MultiSelect, Paginator, Toast, Toolbar, classNames } = components;
    const dispatch = useDispatch();
    const { projectZoneList } = useSelector((state) => state.zone);
    const [ filters, setFilters ] = useState(null);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ chainFilterValue, setChainFilterValue ] = useState('');
    const { isLoading, chainData, successMessage, errors } = useSelector((state) => state.chain);
    const { projectListData } = useSelector((state) => state.promos);
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ deletechainDialog, setDeletechainDialog ] = useState(false);
    const [ selectedChain, setSelectedChain ] = useState([]);
    const [ deleteChainsDialog, setDeleteChainsDialog ] = useState(false);
    const [ chainDeleteId, setChainDeleteId ] = useState('');
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ isErrors, setIsErorrs ] = useState({
        imageError: false,
        chainNameError: false
    });
    const toast = useRef(null);
    const dt = useRef(null);
    const [ rows, setRows ] = useState(10);

    const [ first, setFirst ] = useState(0);
    const tableData = {
        page: 1,
        limit: 10,
        filter_value: '',
        sort_order: 'desc',
        order_column: ''
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}&filter_value=${tableData.filter_value}&sort_order=${tableData.sort_order}&order_column=${tableData.order_column}`);

    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllChainRequest(`page=${event.page + 1}&limit=${event.rows}`));
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
        chain_name: '',
        projectName: '',
        projectNameLabel: '',
        zone: '',
        id: ''
    });

    const handleResetFormData = () => {
        setValues({
            chain_name: '',
            projectName: '',
            projectNameLabel: '',
            zone: ''
        });
    };
    const handleChainCreate = (e) => {
        setSubmitted(true);
        const chainData = {
            chainArray: [
                {
                    chain_name: values.chain_name,
                    project_name: values.projectNameLabel,
                    zone: values.zone
                }
            ]
        };

        const [ requiredArr ] = chainData?.chainArray;
        const { chain_name, project_name, zone } = requiredArr;
        chain_name && project_name && zone && dispatch(CreateChainRequest(chainData));
    };

    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
    };

    const confirmDeleteChain = (chainId) => {
        setChainDeleteId(chainId?.id);
        setDeletechainDialog(true);
    };

    const handleDeleteChain = () => {
        dispatch(DeleteChainRequest(chainDeleteId));
        setDeletechainDialog(false);
    };

    const hideDeleteChainDialog = () => {
        setDeletechainDialog(false);
    };
    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        setSubmitted(false);
        setIsErorrs(false);
        handleResetFormData();
    };

    const handleEditSave = () => {
        setSubmitted(true);
        const chainData = {
            chain_name: values.chain_name,
            project_id: values.projectName.toString(),
            zone: values.zone
        };
        dispatch(EditChainRequest(values.id, chainData));
    };

    const editChain = (values) => {
        dispatch(GetProjectNameRequest());
        setSubmitted(false);
        setValues({
            chain_name: values.chain_name,
            projectName: values.project_id,
            projectNameLabel: values.project_name,
            zone: values.zone,
            id: values.id
        });
        setIsEditModalOpen(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteChainsDialog(true);
    };
    const deleteSelectedChain = () => {
        let chain = chainData?.chain.filter((val) => selectedChain.includes(val));
        let ids = [];
        chain?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteChainRequest(formData));
        setSelectedChain(null);
        setDeleteChainsDialog(false);
        // dispatch(handleResetChain());
    };
    const hideMultiDeleteChainDialog = () => {
        setDeleteChainsDialog(false);
    };
    const hideExcelDialog = () => {
        setModalExcel(false);
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
            const chainList = { chainArray: data };
            dispatch(CreateChainRequest(chainList));
        });
    };

    const handleClearFliter = () => {
        filterClearCallback();
        chainfilterClearCallback();
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedChain?.length > 1 ? false : true} />
                    <Button label="Clear Filter" disabled={!searchFilterValue && !chainFilterValue} className="p-button-outlined ml-2  " onClick={() => handleClearFliter()} icon="pi pi-filter-slash"></Button>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Chain"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success mr-2"
                    onClick={() => {
                        setSubmitted(false);
                        setIsModalOpen(true);
                        handleResetFormData();
                        dispatch(GetProjectNameRequest());
                    }}
                />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help mr-2 " />
            </React.Fragment>
        );
    };
    const chainDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleChainCreate(e)} />
        </>
    );

    const chainUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteChainDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDeleteChainDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={handleDeleteChain} autoFocus />
        </>
    );

    const multideleteChainDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideMultiDeleteChainDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteSelectedChain} autoFocus />
        </>
    );

    const chainBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.chain_name}</div>;
    };
    const projectBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.project_name ? rowData.project_name : 'N/A'}</div>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => editChain(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteChain(rowData)} />
            </div>
        );
    };

    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const filterApplyCallback = (options) => {
        dispatch(GetAllChainRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const chainfilterApplyCallback = (options) => {
        dispatch(GetAllChainRequest(`page=${tableData.page}&filter_value=${chainFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllChainRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const chainfilterClearCallback = (options) => {
        setChainFilterValue('');
        if (chainFilterValue !== '') {
            dispatch(GetAllChainRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const chainfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => chainfilterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const chainfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => chainfilterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const handleChainFilter = (e) => {
        setChainFilterValue(e.target.value);
    };
    const projectnameFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Project Name" />;
    };
    const chainFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={chainFilterValue} onChange={(e) => handleChainFilter(e)} placeholder="Search Chain" />;
    };
    const zoneTemplete = (rowData) => {
        return (
            <div className=" capitalize">
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
    const initFilters = () => {
        setFilters({
            project_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            chain_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        initFilters();
    }, []);
    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(handleResetChain());
            setIsEditModalOpen(false);
            setModalExcel(false);
            setIsModalOpen(false);
            setModalExcel(false);
            handleResetFormData();
            dispatch(GetAllChainRequest(queryString));
        }
    }, [ successMessage, queryString ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllChainRequest(queryString));
    }, [ dispatch, queryString ]);
    useEffect(() => {
        if (values.projectName != '') {
            dispatch(getProjectWiseZoneLableRequest(values.projectName));
        }
    }, [ values.projectName ]);

    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Chain List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card chainlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={chainData?.chain}
                            showGridlines
                            stripedRows
                            filters={filters}
                            selection={selectedChain}
                            onSelectionChange={(e) => setSelectedChain(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column
                                field="project_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={projectnameFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="project_name"
                                header="Project Name"
                                body={projectBodyTemplate}
                                sortable
                                headerStyle={{ width: '30%' }}
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
                                filterField="chain_name"
                                header="Chain Name"
                                body={chainBodyTemplate}
                                sortable
                                headerStyle={{ width: '30%' }}
                            ></Column>
                            <Column field="zone_name" header="Zone Name" body={zoneTemplete} headerStyle={{ width: '10%', minWidth: '8rem' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '3%', minWidth: '6rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={chainData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={isModalOpen} style={{ width: '50vw' }} header="Create Chain" modal className="p-fluid usercreation" footer={chainDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
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
                                        onChange={(e) =>
                                            setValues(
                                                { ...values, projectName: e.value, projectNameLabel: e.originalEvent?.target?.ariaLabel }
                                                //  dispatch(getProjectWiseZoneLableRequest(e.value))
                                            )
                                        }
                                        value={values.projectName}
                                        className={classNames({ 'p-invalid': submitted && values.projectNameLabel == '' })}
                                    />
                                    {submitted && values.projectNameLabel == '' ? <small className="p-invalid error">Project name is required</small> : null}
                                    {/* {submitted && errors?.projectName ? <small className="p-invalid error">{errors?.projectName}</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Chain Name
                                    </label>
                                    <InputText
                                        id="chain_name"
                                        type="text"
                                        required
                                        placeholder="Enter Chain Name"
                                        value={values.chain_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, chain_name: e.target.value });
                                                setSubmitted(false);
                                                setIsErorrs({
                                                    ...errors,
                                                    chainNameError: false
                                                });
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.chain_name == '' })}
                                    />
                                    {submitted && values.chain_name == '' ? <small className="p-invalid error">Chain name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <MultiSelect
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        display="chip"
                                        maxSelectedLabels={3}
                                        showClear
                                        placeholder="Select Zone"
                                        options={projectZoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {submitted && values.zone == '' ? <small className="p-invalid error">Zone is required</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={isEditModalOpen} style={{ width: '50vw' }} header="Chain Edit" modal className="p-fluid usercreation" footer={chainUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
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
                                        onChange={(e) =>
                                            setValues(
                                                { ...values, projectName: e.value }
                                                // dispatch(getProjectWiseZoneLableRequest(e.value))
                                            )
                                        }
                                        value={values.projectName}
                                        className={classNames({ 'p-invalid': submitted && values.projectName == '' })}
                                    />
                                    {submitted && values.projectName == '' ? <small className="p-invalid error">Project name is required</small> : null}
                                    {submitted && errors?.projectName ? <small className="p-invalid error">{errors?.projectName}</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Chain Name
                                    </label>
                                    <InputText
                                        id="chain_name"
                                        type="text"
                                        required
                                        placeholder="Enter Chain Name"
                                        value={values.chain_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, chain_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.chain_name == '' })}
                                    />
                                    {submitted && values.chain_name == '' ? <small className="p-invalid error">Chain is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Zone
                                    </label>
                                    <MultiSelect
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        display="chip"
                                        maxSelectedLabels={3}
                                        showClear
                                        placeholder="Select Zone"
                                        options={projectZoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {submitted && values.zone == '' ? <small className="p-invalid error">Zone is required</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={deletechainDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteChainDialogFooter} onHide={setDeletechainDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete <b>{values.chain_name}</b>?
                                </span>
                            </div>
                        </Dialog>
                        <Dialog visible={deleteChainsDialog} style={{ width: '350px' }} header="Confirmation" modal footer={multideleteChainDialogFooter} onHide={hideMultiDeleteChainDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Chain?</span>
                            </div>
                        </Dialog>
                        <ImportModal modalopen={modalExcel} hideModal={hideExcelDialog} readExcel={readExcel} sampleExcel={chain_sample_excel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chainlist;
