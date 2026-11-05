import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import _default from 'react-redux/es/components/connect';
import * as XLSX from 'xlsx';
import { CreateSkuRequest, DeleteSkuRequest, EditSkuRequest, GetAllSkuRequest, handleResetSku, MultipalDeleteSkuRequest } from '../../../../redux/slice/AdminSlice/skuSlice';
import { getAllStoreLabelRequest } from '../../../../redux/slice/AdminSlice/userSlice';
import sku_excel from '../../../../assets/excelFiles/sku_excel.xlsx';
import { BreadCrumb } from 'primereact/breadcrumb';
import { GetAllChainNameRequest, GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import { FilterMatchMode } from 'primereact/api';
import { Paginator } from 'primereact/paginator';
import { getChainByProjectIdRequest } from '../../../../redux/slice/AdminSlice/storeSlice';
import { GetAllCategoryLabelRequest } from '../../../../redux/slice/AdminSlice/categorySlice';
import { MultiSelect } from 'primereact/multiselect';
import ImportModal from '../../../components/ImportModal';
import SubHeader from '../../../components/SubHeader';

const SKUlist = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { chainData, projectListData } = useSelector((state) => state.promos);
    const { storeList } = useSelector((state) => state.user);
    const { chainList } = useSelector((state) => state.store);
    const { categoryList } = useSelector((state) => state.category);
    const { isLoading, skuData, successMessage, errors } = useSelector((state) => state.sku);
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ isViewModalOpen, setIsViewModalOpen ] = useState(false);
    const [ deleteskuDialog, setDeleteskuDialog ] = useState(false);
    const [ deleteskusDialog, setDeleteskusDialog ] = useState(false);
    const [ selectedSku, setSelectedSku ] = useState([]);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ skuDeleteId, setSkuDeleteId ] = useState('');
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ expandedRows, setExpandedRows ] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [ filters, setFilters ] = useState(null);
    const [ rows, setRows ] = useState(10);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ projectFilterValue, setProjectFilterValue ] = useState('');
    const [ chainFilterValue, setChainFilterValue ] = useState('');
    const [ storeFilterValue, setStoreFilterValue ] = useState('');
    const [ variantFilterValue, setVariantFilterValue ] = useState('');
    const [ skugmFilterValue, setSkugmFilterValue ] = useState('');
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

        dispatch(GetAllSkuRequest(`page=${event.page + 1}&limit=${event.rows}`));
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
        sku_no: '',
        category: '',
        varient_name: '',
        sku_grammage: '',
        unit: '',
        projectName: '',
        projectNameLabel: '',
        final_sku_name: '',
        mrp: '',
        store_code: '',
        storeLabel: '',
        chainLabel: '',
        chain_name: '',
        article_no: ''
    });
    // console.log(values, 'values');
    const handleResetFormData = () => {
        setValues({
            id: '',
            sku_no: '',
            range: '',
            varient_name: '',
            sku_grammage: '',
            unit: '',
            final_sku_name: '',
            mrp: '',
            store_code: '',
            chain_name: '',
            article_no: ''
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
            const skuList = { skuList: data };
            dispatch(CreateSkuRequest(skuList));
        });
    };

    const hideExcelDialog = () => {
        setModalExcel(false);
    };
    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
    };

    const handleSave = async (e) => {
        setSubmitted(true);
        const createdSkuData = {
            skuList: [
                {
                    sku_no: values.sku_no,
                    category: values.category,
                    varient_name: values.varient_name,
                    mrp: values.mrp,
                    store_id: values.store_code,
                    chain_id: values.chain_name,
                    project_id: values.projectName,
                    article_no: values.article_no
                }
            ]
        };

        const [ requireFields ] = createdSkuData.skuList;
        const { category, varient_name, mrp, store_id, chain_id, project_id } = requireFields;

        category && varient_name && mrp && store_id && chain_id && project_id && dispatch(CreateSkuRequest(createdSkuData));
        // if (values.sku_no !== '' && values.range !== '' && values.varient_name !== '' && values.sku_grammage !== '' && values.unit !== '' && values.mrp !== '' && values.store_code !== '' && values.chain_name !== '' && values.project_name !== '') {
        // dispatch(CreateSkuRequest(createdSkuData));
        // }

        // if (category && varient_name && mrp && store_id && chain_id && project_id) {
        //     dispatch(CreateSkuRequest(createdSkuData));
        // }
    };

    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
    };

    const handleEditSave = async (e) => {
        dispatch(handleResetSku);
        e.preventDefault();
        setSubmitted(true);
        const updatedSKUData = {
            sku_no: values.sku_no,
            category: values.category,
            varient_name: values.varient_name,
            sku_grammage: values.sku_grammage.toString(),
            unit: values.unit,
            mrp: values.mrp.toString(),
            store_code: values.store_code,
            chain_name: values.chainLabel,
            project_name: values.projectNameLabel,
            article_no: values.article_no
        };
        dispatch(EditSkuRequest(values.id, updatedSKUData));
        // setSubmitted(false);
    };
    const editSKU = (rowData) => {
        // console.log(rowData, 'rowData');
        setValues({
            id: rowData.id,
            sku_no: rowData.sku_no,
            category: rowData.category_id,
            varient_name: rowData.varient_name,
            sku_grammage: rowData.sku_grammage,
            unit: rowData.unit,
            mrp: rowData.mrp,
            store_code: rowData.store_id,
            storeLabel: rowData.store_code,
            chain_name: rowData.chain_id,
            chainLabel: rowData.chain_name,
            projectName: rowData.project_id,
            projectNameLabel: rowData.project_name,
            article_no: rowData.article_no
        });
        setIsEditModalOpen(true);
    };

    const viewSKU = (values) => {
        setValues(values);
        setIsViewModalOpen(true);
    };

    const hideViewDialog = () => {
        setIsViewModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
    };

    const confirmDeleteSKU = (skuId) => {
        setSkuDeleteId(skuId?.id);
        setDeleteskuDialog(true);
    };

    const handleDeleteSku = () => {
        dispatch(DeleteSkuRequest(skuDeleteId));
        setDeleteskuDialog(false);
    };

    const hideDeleteSkuDialog = () => {
        setDeleteskuDialog(false);
    };

    const confirmDeleteSelected = () => {
        setDeleteskusDialog(true);
    };

    const deleteSelectedStores = () => {
        let skus = skuData?.SKU.filter((val) => selectedSku.includes(val));
        let ids = [];
        skus?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteSkuRequest(formData));
        setSelectedSku(null);
        setDeleteskusDialog(false);
        dispatch(handleResetSku());
    };
    const handleClearFliter = () => {
        filterClearCallback();
        projectfilterClearCallback();
        chainfilterClearCallback();
        storefilterClearCallback();
        variantfilterClearCallback();
        skugmfilterClearCallback();
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedSku?.length > 1 ? false : true} />
                    <Button
                        label="Clear Filter"
                        disabled={!searchFilterValue && !projectFilterValue && !chainFilterValue && !storeFilterValue && !variantFilterValue && !skugmFilterValue}
                        className="p-button-outlined ml-2 "
                        onClick={() => handleClearFliter()}
                        icon="pi pi-filter-slash"
                    >
                    </Button>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create SKU"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success mr-2 "
                    onClick={() => {
                        setSubmitted(false);
                        setIsModalOpen(true);
                        handleResetFormData();
                        // dispatch(getChainByProjectIdRequest());
                        dispatch(GetAllCategoryLabelRequest());
                        dispatch(getAllStoreLabelRequest());
                        dispatch(GetProjectNameRequest());
                    }}
                />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help mr-2 " />
                {/* <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} /> */}
            </React.Fragment>
        );
    };
    const skuDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button
                label="Save"
                icon="pi pi-check"
                disabled={values.mrp == '' ? true : false}
                className="p-button-outlined p-button-success mr-2 mb-2"
                onClick={(e) => {
                    handleSave(e);
                }}
            />
        </>
    );
    const skuUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );

    const skuViewDialogFooter = <>{/* <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideViewDialog} /> */}</>;

    const deleteSkuDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteSkuDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteSku} autoFocus />
        </>
    );
    const deleteSkusDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={setDeleteskusDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={deleteSelectedStores} autoFocus />
        </>
    );

    const rangeBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData?.category ? rowData?.category : 'N/A'}</div>;
    };
    const skunoBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.sku_no}</div>;
    };
    const articalnoBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.article_no}</div>;
    };
    const variantnameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.varient_name}</div>;
    };
    const codeBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData?.store_name != ' ' ? rowData.store_name : 'N/A'}</div>;
    };
    const finalskunameBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.final_sku_name}</div>;
    };
    const mrpBodyTemplate = (rowData) => {
        return <div className="capitalize">{rowData.mrp}</div>;
    };
    const projectNameBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData?.project_name ? rowData.project_name : 'N/A'}</div>;
    };

    const chainBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.chain_name ? rowData.chain_name : 'N/A'}</div>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button
                    tooltip="Edit"
                    tooltipOptions={{ position: 'bottom' }}
                    icon="pi pi-pencil"
                    id="edits-icons"
                    className="p-button-rounded p-button-text  p-button-help"
                    onClick={() => {
                        editSKU(rowData);
                        dispatch(handleResetSku);
                        dispatch(getAllStoreLabelRequest());
                        // dispatch(getChainByProjectIdRequest());
                        dispatch(GetProjectNameRequest());
                    }}
                />
                <Button tooltip="View" tooltipOptions={{ position: 'bottom' }} icon="pi pi-eye" className="p-button-rounded p-button-warning p-button-text" id="eyes-icons" onClick={() => viewSKU(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteSKU(rowData)} />
            </div>
        );
    };

    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3 expandtable">
                <DataTable value={[ data ]} className="datatable-responsive row_expand_show_title" scroll="scroll">
                    {/* <Column field="store_code"   header="SKU Grammage" body={codeBodyTemplate} headerStyle={{ width: '8%' }}></Column> */}
                    <Column field="final_sku_name" header="Final SKU Name" body={finalskunameBodyTemplate} headerStyle={{ width: '12%' }}></Column>
                    <Column field="mrp" header="MRP" body={mrpBodyTemplate} headerStyle={{ width: '8%' }}></Column>
                    <Column field="sku_no" header="SKU No." body={skunoBodyTemplate} headerStyle={{ width: '8%' }}></Column>
                    <Column field="artical_no" header="Artical No" body={articalnoBodyTemplate} headerStyle={{ width: '8%' }}></Column>
                    {/* <Column field="mrp" header="MRP" body={mrpBodyTemplate} headerStyle={{ width: '5%' }}></Column> */}
                    {/* <Column field="project_name" header="Project Name" body={projectNameBodyTemplate} headerStyle={{ width: '5%' }}></Column> */}
                </DataTable>
            </div>
        );
    };
    const filterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const projectfilterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${projectFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const chainfilterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${chainFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const storefilterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${storeFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const variantfilterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${variantFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };
    const skugmfilterApplyCallback = (options) => {
        dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${skugmFilterValue}&limit=${tableData.limit}`));
        options?.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        if (searchFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const projectfilterClearCallback = (options) => {
        setProjectFilterValue('');
        if (projectFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const chainfilterClearCallback = (options) => {
        setChainFilterValue('');
        if (chainFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const storefilterClearCallback = (options) => {
        setStoreFilterValue('');
        if (storeFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const variantfilterClearCallback = (options) => {
        setVariantFilterValue('');
        if (variantFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const skugmfilterClearCallback = (options) => {
        setSkugmFilterValue('');
        if (skugmFilterValue !== '') {
            dispatch(GetAllSkuRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
        }
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };
    const projectfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => projectfilterClearCallback(options)} label="Clear" />;
    };
    const chainfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => chainfilterClearCallback(options)} label="Clear" />;
    };
    const storefilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => storefilterClearCallback(options)} label="Clear" />;
    };
    const variantfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => variantfilterClearCallback(options)} label="Clear" />;
    };
    const skugmfilterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => skugmfilterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const projectfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => projectfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const chainfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => chainfilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const storefilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => storefilterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const variantfilterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => variantfilterApplyCallback(options)} severity="success" label="Apply" />;
    };

    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const projecthandleFilter = (e) => {
        setProjectFilterValue(e.target.value);
    };
    const storehandleFilter = (e) => {
        setStoreFilterValue(e.target.value);
    };
    const chainhandleFilter = (e) => {
        setChainFilterValue(e.target.value);
    };
    const varianthandleFilter = (e) => {
        setVariantFilterValue(e.target.value);
    };
    const skugmhandleFilter = (e) => {
        setSkugmFilterValue(e.target.value);
    };
    const projectNameFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={projectFilterValue} onChange={(e) => projecthandleFilter(e)} placeholder="Search Project" />;
    };
    const varientFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={variantFilterValue} onChange={(e) => varianthandleFilter(e)} placeholder="Search Variant" />;
    };
    const chainFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={chainFilterValue} onChange={(e) => chainhandleFilter(e)} placeholder="Search Chain" />;
    };
    const rangeFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Category" />;
    };
    const storeNameFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={storeFilterValue} onChange={(e) => storehandleFilter(e)} placeholder="Search Store Name" />;
    };
    const skugramFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={skugmFilterValue} onChange={(e) => skugmhandleFilter(e)} placeholder="Search SKU Gm" />;
    };

    const initFilters = () => {
        setFilters({
            varient_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            chain_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            range: { value: null, matchMode: FilterMatchMode.CONTAINS },
            sku_grammage: { value: null, matchMode: FilterMatchMode.CONTAINS },
            project_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            store_code: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        if (successMessage) {
            setIsModalOpen(false);
            setModalExcel(false);
            setSubmitted(false);
            setIsEditModalOpen(false);
            setDeleteskuDialog(false);
            setDeleteskusDialog(false);
            dispatch(handleResetSku());
            handleResetFormData();
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(GetAllSkuRequest(queryString));
        }
    }, [ queryString, successMessage ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllSkuRequest(queryString));
    }, [ dispatch, queryString ]);
    useEffect(() => {
        if (values.projectName != '') {
            dispatch(getChainByProjectIdRequest(values?.projectName));
            dispatch(GetAllCategoryLabelRequest(values?.projectName));
        }
    }, [ values.projectName ]);

    useEffect(() => {
        initFilters();
    }, []);
    // useEffect(() => {
    //     if (successMessage) {
    //         toast.current.show({ severity: 'success', summary: successMessage, life: 3000 });
    //     };
    //     setIsModalOpen(false);
    //     dispatch(GetAllSkuRequest());

    // }, [ successMessage ]);
    return (
        <div className="sku-main-component">
            <SubHeader headerName={'SKU List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card skulist-card">
                        <Toast ref={toast} />
                        {/* <Toolbar className="create-delete-btn" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

                        <DataTable
                            ref={dt}
                            // loading={isLoading}
                            filters={filters}
                            value={skuData?.SKU}
                            selection={selectedSku}
                            showGridlines
                            stripedRows
                            onSelectionChange={(e) => setSelectedSku(e.value)}
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
                            <Column
                                field="category"
                                // filter
                                sortable
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={rangeFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="category"
                                header="Category"
                                body={rangeBodyTemplate}
                                headerStyle={{ width: '5%' }}
                            ></Column>

                            <Column
                                field="project_name"
                                filter
                                sortable
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={projectNameFilterTemplate}
                                filterClear={projectfilterClearTemplate}
                                filterApply={projectfilterApplyTemplate}
                                filterField="project_name"
                                header="Project Name"
                                body={projectNameBodyTemplate}
                                headerStyle={{ width: '6%', minWidth: '10rem' }}
                            ></Column>
                            <Column
                                field="chain_name"
                                filter
                                sortable
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={chainFilterTemplate}
                                filterClear={chainfilterClearTemplate}
                                filterApply={chainfilterApplyTemplate}
                                filterField="chain_name"
                                header="Chain"
                                body={chainBodyTemplate}
                                headerStyle={{ width: '4%', minWidth: '4rem' }}
                            ></Column>
                            <Column
                                field="store_code"
                                header="Store Name"
                                body={codeBodyTemplate}
                                headerStyle={{ width: '10%', minWidth: '8rem' }}
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                sortable
                                showFilterMatchModes={false}
                                filterElement={storeNameFilterTemplate}
                                filterClear={storefilterClearTemplate}
                                filterApply={storefilterApplyTemplate}
                            ></Column>
                            <Column
                                field="varient_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={varientFilterTemplate}
                                filterClear={variantfilterClearTemplate}
                                filterApply={variantfilterApplyTemplate}
                                filterField="varient_name"
                                header="Variant Name"
                                body={variantnameBodyTemplate}
                                sortable
                                headerStyle={{ width: '15%', minWidth: '8rem' }}
                            ></Column>

                            {/* <Column
                                field="final_sku_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={skunameFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="final_sku_name"
                                header="SKU Name"
                                sortable
                                body={finalskunameBodyTemplate}
                                headerStyle={{ width: '20%' }}
                            ></Column> */}
                            {/* <Column
                                field="sku_grammage"
                                filter
                                sortable
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={skugramFilterTemplate}
                                filterClear={skugmfilterClearTemplate}
                                filterApply={skugmfilterApplyTemplate}
                                filterField="sku_grammage"
                                header="SKU Grammage"
                                body={skugramamgeBodyTemplate}
                                headerStyle={{ width: '5%' }}
                            ></Column> */}
                            {/* <Column
                                field="mrp"
                                header="MRP"
                                body={mrpBodyTemplate}
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={mrpFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="mrp"
                                // sortable
                                headerStyle={{ width: '5%' }}
                            ></Column> */}
                            {/* <Column field="store_code" header="Store Code" body={codeBodyTemplate} headerStyle={{ width: '8%' }}></Column> */}

                            {/* <Column field="unit" header="Unit" body={unitBodyTemplate} headerStyle={{ width: '5%' }}></Column>
                            <Column field="mrp" header="MRP" body={mrpBodyTemplate} headerStyle={{ width: '5%' }}></Column> */}
                            <Column header="Actions" headerStyle={{ width: '5%', minWidth: '9rem' }} className="action" body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={skuData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>

                        <Dialog visible={isModalOpen} style={{ width: '60vw' }} header="Create SKU " modal className="p-fluid usercreation" footer={skuDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        label="value"
                                        required
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.projectName}
                                        onChange={(e) => {
                                            setValues({ ...values, projectName: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && values.projectName == undefined })}
                                    />
                                    {submitted && values.projectName == undefined ? <small className="p-invalid error"> Project Name is required</small> : null}
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Chain
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        required
                                        placeholder="Select Chain"
                                        options={chainList}
                                        onChange={(e) => setValues({ ...values, chain_name: e.target.value })}
                                        value={values.chain_name}
                                        // className='w-full'
                                        className={classNames({ 'p-invalid': submitted && values.chain_name == '' })}

                                    // className={classNames({ 'p-invalid': submitted })}
                                    />
                                    {submitted && values.chain_name == '' ? <small className="p-invalid error">Chain name is required</small> : null}
                                </div>

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Store Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        label="value"
                                        required
                                        placeholder="Select Store"
                                        options={storeList}
                                        value={values?.store_code}
                                        onChange={(e) => {
                                            setValues({ ...values, store_code: e.target.value, storeLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.store_code })}
                                    />
                                    {submitted && values.store_code == '' ? <small className="p-invalid error">Store Name is required</small> : null}
                                </div>
                                {/* <div className="grid ml-1 mt-2 flex-row"> */}
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no">SKU No</label>
                                    <InputText
                                        id="sku_no"
                                        type="text"
                                        placeholder="Enter SKU No"
                                        value={values.sku_no}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, sku_no: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                    // className={classNames({ 'p-invalid': submitted && !values.sku_no })}
                                    />
                                    {/* {submitted && values.sku_no == '' ? <small className="p-invalid error">SKU No is required</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no">Article No</label>
                                    <InputText
                                        id="article_no"
                                        type="text"
                                        placeholder="Enter Article No"
                                        value={values.article_no}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, article_no: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                    // className={classNames({ 'p-invalid': submitted && !values.article_no })}
                                    />
                                    {/* {submitted && !values.article_no ? <small className="p-invalid error">SKU no is required</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="varient_name" className="required">
                                        Variant Name
                                    </label>
                                    <InputText
                                        id="varient_name"
                                        type="text"
                                        placeholder="Enter Varient Name"
                                        value={values.varient_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, varient_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.varient_name })}
                                    />
                                    {submitted && values.varient_name == '' ? <small className="p-invalid error">Varient Name is required</small> : null}
                                </div>
                                {/* <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_grammage" className="required">
                                        SKU Grammage
                                    </label>
                                    <InputNumber
                                        id="sku_grammage"
                                        placeholder="Enter SKU Grammage"
                                        value={values.sku_grammage}
                                        maxLength={6}
                                        useGrouping={false}
                                        onValueChange={(e) => {
                                            {
                                                setValues({ ...values, sku_grammage: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.sku_grammage })}
                                    />
                                    {submitted && values.sku_grammage == '' ? <small className="p-invalid error">SKU Grammage is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="unit" className="required">
                                        Unit
                                    </label>
                                    <InputText
                                        id="unit"
                                        keyfilter="alpha"
                                        // type="text"
                                        placeholder="Enter Unit"
                                        value={values.unit}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, unit: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.unit })}
                                    />
                                    {submitted && values.unit == '' ? <small className="p-invalid error">Unit is required</small> : null}
                                </div> */}

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Category
                                    </label>

                                    <Dropdown
                                        id="dropdown"
                                        optionLabel="label"
                                        optionValue="value"
                                        required
                                        value={values.category}
                                        filter
                                        onChange={(e) => setValues({ ...values, category: e.value })}
                                        options={categoryList}
                                        placeholder="Select Category"
                                        className={classNames({ 'p-invalid': submitted && !values.category })}
                                    />
                                    {submitted && !values.category ? <small className="p-invalid error"> Category is required</small> : null}
                                    {/* <InputText
                                        id="range"
                                        type="text"
                                        placeholder="Enter Category"
                                        value={values.category}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, category: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required

                                        className={classNames({ 'p-invalid': submitted && !values.range })}
                                    /> */}
                                    {/* {submitted && values.range == '' ? <small className="p-invalid error">Range is required</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="mrp" className="required">
                                        MRP
                                    </label>
                                    <InputNumber
                                        id="mrp"
                                        placeholder="Enter MRP"
                                        useGrouping={false}
                                        value={values.mrp}
                                        onValueChange={(e) => {
                                            setValues({ ...values, mrp: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.mrp })}
                                    />
                                    {submitted && !values.mrp ? <small className="p-invalid error">MRP is required</small> : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={isEditModalOpen} style={{ width: '60vw' }} header="Update SKU " modal className="p-fluid usercreation" footer={skuUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        filter
                                        optionLabel="label"
                                        required
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.projectName}
                                        onChange={(e) => {
                                            setValues({ ...values, projectName: e.target.value, projectNameLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.projectName })}
                                    />
                                    {submitted && values.projectName == '' ? <small className="p-invalid error"> Project Name is required</small> : null}
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
                                        onChange={(e) => setValues({ ...values, chain_name: e.target.value, chainLabel: e.originalEvent.target.ariaLabel })}
                                        value={values.chain_name}
                                        className={classNames({ 'p-invalid': submitted && !values.chain_name })}
                                    />
                                    {submitted && values.chain_name == '' ? <small className="p-invalid error">Chain name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Store Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        filter
                                        label="value"
                                        required
                                        placeholder="Select Store"
                                        options={storeList}
                                        value={values?.store_code}
                                        onChange={(e) => {
                                            setValues({ ...values, store_code: e.target.value, storeLabel: e.originalEvent.target.ariaLabel });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.store_code })}
                                    />
                                    {submitted && values.store_code == '' ? <small className="p-invalid error">Store Name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        SKU No
                                    </label>
                                    <InputText
                                        id="sku_no"
                                        type="text"
                                        placeholder="Enter SKU No"
                                        value={values.sku_no}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, sku_no: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                    // className={classNames({ 'p-invalid': submitted && !values.sku_no })}
                                    />
                                    {/* {submitted && !values.sku_no ? <small className="p-invalid error">SKU no is required</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no" className="required">
                                        Article No
                                    </label>
                                    <InputText
                                        id="article_no"
                                        type="text"
                                        placeholder="Enter Article No"
                                        value={values.article_no}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, article_no: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                    // className={classNames({ 'p-invalid': submitted && !values.article_no })}
                                    />
                                    {/* {submitted && !values.article_no ? <small className="p-invalid error">SKU no is required</small> : null} */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="varient_name" className="required">
                                        Variant Name
                                    </label>
                                    <InputText
                                        id="varient_name"
                                        type="text"
                                        placeholder="Enter Varient Name"
                                        value={values.varient_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, varient_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.varient_name })}
                                    />
                                    {submitted && !values.varient_name ? <small className="p-invalid error">Varient Name is required</small> : null}
                                </div>

                                {/* <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_grammage" className="required">
                                        SKU Grammage
                                    </label>
                                    <InputNumber
                                        id="sku_grammage"
                                        maxLength={6}
                                        useGrouping={false}
                                        placeholder="Enter SKU Grammage"
                                        value={values.sku_grammage}
                                        onValueChange={(e) => {
                                            {
                                                setValues({ ...values, sku_grammage: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.sku_grammage })}
                                    />
                                    {submitted && values.sku_grammage == '' ? <small className="p-invalid error">SKU grammage is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="unit" className="required">
                                        Unit
                                    </label>
                                    <InputText
                                        id="unit"
                                        keyfilter="alpha"
                                        // type="text"
                                        placeholder="Enter Unit"
                                        value={values.unit}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, unit: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        autoFocus
                                        className={classNames({ 'p-invalid': submitted && !values.unit })}
                                    />
                                    {submitted && values.unit == '' ? <small className="p-invalid error">Unit is required</small> : null}
                                </div> */}
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="range" className="required">
                                        Category
                                    </label>
                                    <Dropdown
                                        value={values.category}
                                        filter
                                        onChange={(e) => setValues({ ...values, category: e.value })}
                                        options={categoryList}
                                        optionValue="value"
                                        optionLabel="label"
                                        placeholder="Select Category"
                                        className={classNames({ 'p-invalid': submitted && values.category == '' })}
                                    />
                                    {submitted && !values.category ? <small className="p-invalid error"> Category is required</small> : null}
                                    {/* <InputText
                                        id="range"
                                        type="text"
                                        placeholder="Enter Category"
                                        value={values.category}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, category: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.range })}
                                    /> */}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="mrp" className="required">
                                        MRP
                                    </label>
                                    <InputNumber
                                        id="mrp"
                                        // type="number"
                                        // type="tel"
                                        useGrouping={false}
                                        placeholder="Enter MRP"
                                        value={values.mrp}
                                        onValueChange={(e) => {
                                            setValues({ ...values, mrp: e.target.value });
                                        }}
                                        required
                                        className={classNames({ 'p-invalid': submitted && !values.mrp })}
                                    />
                                    {submitted && errors ? <small className="p-invalid error">{errors?.mrp}</small> : null}
                                </div>
                            </div>
                        </Dialog>

                        <Dialog visible={isViewModalOpen} style={{ width: '60vw' }} header="SKU Details" modal className="p-fluid usercreation viewmodel" footer={skuViewDialogFooter} onHide={hideViewDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="store_code">Project Name </label>
                                    <InputText id="store_code" readOnly required type="text" value={values.project_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="chain_name">Chain </label>
                                    <InputText id="chain_name" readOnly required type="text" value={values.chain_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="store_code">Store Name </label>
                                    <InputText id="store_code" readOnly required type="text" value={values.store_name} />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_no">SKU No</label>
                                    <InputText id="sku_no" readOnly required type="text" value={values.sku_no} autoFocus />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="article_no">Article No</label>
                                    <InputText id="article_no" type="text" value={values.article_no} readOnly required autoFocus />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="varient_name">Variant Name</label>
                                    <InputText id="varient_name" readOnly required type="text" value={values.varient_name} />
                                </div>

                                {/* <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="sku_grammage">SKU Grammage</label>
                                    <InputText id="sku_grammage" readOnly required type="number" value={values.sku_grammage} autoFocus />
                                </div>*/}

                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="range">Category</label>
                                    <InputText id="range" type="text" value={values.category} readOnly required />
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="mrp">MRP</label>
                                    <InputText id="mrp" type="number" value={values.mrp} readOnly required />
                                </div>
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="final_sku_name">Final SKU Name</label>
                                    <InputText id="final_sku_name" type="text" value={values.final_sku_name} readOnly required />
                                </div>
                            </div>
                            {/* <div className=" col-12 field mr-3 userdropdown finalsku"> */}
                        </Dialog>

                        <Dialog visible={deleteskuDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteSkuDialogFooter} onHide={setDeleteskuDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete <b>{values.varient_name}</b>?
                                </span>
                            </div>
                        </Dialog>
                        <Dialog visible={deleteskusDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteSkusDialogFooter} onHide={setDeleteskusDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Skus?</span>
                            </div>
                        </Dialog>
                        <ImportModal modalopen={modalExcel} hideModal={hideExcelDialog} readExcel={readExcel} sampleExcel={sku_excel} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SKUlist;
