import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import _default from 'react-redux/es/components/connect';
import { Image } from 'primereact/image';
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import * as XLSX from 'xlsx';
import { MultiSelect } from 'primereact/multiselect';
import project_sample_excel from '../../../../assets/excelFiles/project_sample_excel.xlsx'
import { CreateCategoryRequest, CreateCategoryExcelRequest, DeleteCategoryRequest, EditCategoryRequest, GetAllCategoryRequest, handleResetCategory, MultipalDeleteCategoryRequest } from '../../../../redux/slice/AdminSlice/categorySlice';
import { Dropdown } from 'primereact/dropdown';
import { GetProjectNameRequest } from '../../../../redux/slice/AdminSlice/promosSlice';
import SubHeader from '../../../components/SubHeader';
const SKUCategorylist = () => {
    const { projectListData } = useSelector((state) => state.promos);
    const { isLoading, categoryData, successMessage, errors } = useSelector((state) => state.category);
    const { zoneList } = useSelector((state) => state.zone);
    const dispatch = useDispatch();
    const [ filters, setFilters ] = useState(null);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ deletecategoryDialog, setDeletecategoryDialog ] = useState(false);
    const [ selectedCategory, setSelectedCategory ] = useState([]);
    const [ deleteProjectsDialog, setDeleteCategorysDialog ] = useState(false);
    const [ categoryDeleteId, setCategoryDeleteId ] = useState('');
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ viewImage, setViewImage ] = useState(false);
    const [ image, setImage ] = useState('');
    var array = [];
    const [ isErrors, setIsErorrs ] = useState({
        imageError: false,
        categoryNameError: false,
        // zoneError:false
    });
    const toast = useRef(null);
    const dt = useRef(null);
    const [ rows, setRows ] = useState(10);
    const [ first, setFirst ] = useState(0);
    const tableData = {
        page: 1,
        limit: 10,
    };
    const [ queryString, setQueryString ] = useState(`page=${tableData.page}&limit=${tableData.limit}`);
    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllCategoryRequest(`page=${event.page + 1}&limit=${event.rows}`));
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
        category_name: '',
        project_id: '',
        image: '',
        file: '',
        category_image_name: 'No Image Choosen',
        category_image: '',
        category_image_preview: null,
        isImageChange: false,
        id: ''
    });

    const handleResetFormData = () => {
        setValues({
            category_name: '',
            image: '',
            project_id: '',
            file: '',
            category_image_name: 'No Image Choosen',
            category_image: '',
            category_image_preview: null
        });
    };
    const handleSave = (e) => {
        setSubmitted(true);
        setIsErorrs({
            ...errors,
            imageError: false,
            projectError: false,
            categoryNameError: false
        });
        if (values.image == '' && values.category_name == '') {
            setIsErorrs({
                ...errors,
                imageError: true,
                projectError: true,
                categoryNameError: true
            });
        } else if (values.image == '') {
            setIsErorrs({
                ...errors,
                imageError: true
            });
        } else if (values.category_name == '') {
            setIsErorrs({
                ...errors,
                categoryNameError: true,
                projectError: true
            });
        } else {
            const formData = new FormData();
            formData.append('category_name', values.category_name);
            formData.append('image', values.image);
            formData.append('project_id', values.project_id);
            dispatch(CreateCategoryRequest(formData));
        }
    };

    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
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

            const excelData = {

                'category': data,
                "project_id": values.project_id?.toString()
            }
            console.log(excelData, 'excelData');
            dispatch(CreateCategoryExcelRequest(excelData));
        });
    };
    const confirmDeleteCategory = (categoryId) => {
        setCategoryDeleteId(categoryId?.id);
        setDeletecategoryDialog(true);
    };

    const handleDeleteCategory = () => {
        dispatch(DeleteCategoryRequest(categoryDeleteId));
        setDeletecategoryDialog(false);
    };

    const hideDeleteCategoryDialog = () => {
        setDeletecategoryDialog(false);
    };
    const hideEditDialog = () => {
        setIsEditModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
    };

    const handleEditSave = () => {
        setSubmitted(true);
        setIsErorrs({
            ...errors,
            categoryNameError: false,
            imageError: false,
            projectError: false
        });
        if (values.category_name == '') {
            setIsErorrs({
                ...errors,
                categoryNameError: true,
                projectError: true,
                imageError: false
            });
        } else if (values.isImageChange == true) {
            let formData = new FormData();
            formData.append('category_name', values.category_name);
            formData.append('image', values.category_image);
            formData.append('project_id', values.project_id);
            formData.append('id', values.id);
            dispatch(EditCategoryRequest(values.id, formData));
        } else if (values.image !== '') {
            const formData = new FormData();
            formData.append('category_name', values.category_name);
            formData.append('image', values.image);
            formData.append('project_id', values.project_id);
            formData.append('id', values.id);
            dispatch(EditCategoryRequest(values.id, formData));
        } else if (values.image == '') {
            if (values.category_image_preview == null) {
                setIsErorrs({
                    ...errors,
                    categoryNameError: false,
                    projectError: false,
                    imageError: true
                });
            }
        }
    };

    const editCategory = (rowData) => {
        dispatch(GetProjectNameRequest())
        setSubmitted(false);
        setValues({
            category_name: rowData.category_name,
            image: rowData.image,
            project_id: rowData?.project_id,
            id: rowData.id
        });
        setIsEditModalOpen(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteCategorysDialog(true);
    };
    const deleteSelectedCategory = () => {
        let category = categoryData?.SKU?.filter((val) => selectedCategory.includes(val));
        let ids = [];
        category?.map((e) => {
            let id = e.id;
            ids.push(id);
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteCategoryRequest(formData));
        setSelectedCategory(null);
        setDeleteCategorysDialog(false);
        dispatch(handleResetCategory());
    };
    const hideMultiDeleteCategoryDialog = () => {
        setDeleteCategorysDialog(false);
    };
    const handleExcel = () => {
        setModalExcel(true)
        dispatch(GetProjectNameRequest())
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedCategory?.length > 1 ? false : true} />

                    {/* <Button label="Clear Filter" className="p-button-outlined ml-2" disabled={!searchFilterValue} onClick={() => filterClearCallback()} icon="pi pi-filter-slash">
                        {' '}
                    </Button> */}
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Category"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success mr-2"
                    onClick={() => {
                        setIsModalOpen(true);
                        handleResetFormData();
                        dispatch(GetProjectNameRequest())
                    }}
                />
                <Button icon="pi pi-plus" onClick={() => handleExcel()} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help mr-2 " />
            </React.Fragment>
        );
    };
    const categoryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleSave(e)} />
        </>
    );
    const categoryUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" disabled={isLoading} className="p-button-outlined  p-button-success" onClick={handleDeleteCategory} autoFocus />
        </>
    );

    const multideleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" onClick={hideMultiDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteSelectedCategory} autoFocus />
        </>
    );
    const imageBodyTemplate = (rowData) => {
        return (
            <div className='ml-2'>
                <Image src={rowData.image} alt="image" width="80px" height="40px" className="shadow-4" />
            </div>
        );
    };
    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="ml-2 capitalize">
                    {rowData.category_name}
                </span>
            </>
        );
    };
    const projectBodyTemplate = (rowData) => {
        return (
            <>
                <span className="ml-2 capitalize">
                    {rowData.project_name}
                </span>
            </>
        );
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button tooltip="Edit" tooltipOptions={{ position: 'bottom' }} icon="pi pi-pencil" id="edits-icons" className="p-button-rounded p-button-text  p-button-help" onClick={() => {
                    editCategory(rowData)
                }} />
                <Button icon="pi pi-image" className="p-button-rounded p-button-text  p-button-help" id="view-image-icons" tooltip="View Image" tooltipOptions={{ position: 'bottom' }} onClick={() => {
                    setViewImage(true)
                    setImage(rowData.image)
                }
                } />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteCategory(rowData)} />
            </div>
        );
    };

    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const categoryFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Category" />;
    };
    const filterApplyCallback = (options) => {
        dispatch(GetAllCategoryRequest(`page=${tableData.page}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        dispatch(GetAllCategoryRequest(`page=${tableData.page}&limit=${tableData.limit}`));
        options?.filterClearCallback();
    };
    const filterClearTemplate = (options) => {
        return <Button type="button" className="p-button-outlined p-button-danger" icon="pi pi-times" onClick={() => filterClearCallback(options)} label="Clear" />;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" className="p-button-outlined" icon="pi pi-check" onClick={() => filterApplyCallback(options)} severity="success" label="Apply" />;
    };
    const handleFilter = (e) => {
        setSearchFilterValue(e.target.value);
    };
    const initFilters = () => {
        setFilters({
            category_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        if (successMessage) {
            setModalExcel(false);
            setIsEditModalOpen(false);
            setDeletecategoryDialog(false);
            setDeleteCategorysDialog(false);
            setIsModalOpen(false);
            handleResetFormData();
            dispatch(handleResetCategory());
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(GetAllCategoryRequest(queryString));

        }

    }, [ successMessage, queryString ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllCategoryRequest(queryString));
    }, [ queryString ]);
    useEffect(() => {
        initFilters();
    }, []);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Category List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            // loading={isLoading}
                            value={categoryData?.SKU}
                            showGridlines
                            stripedRows
                            filters={filters}
                            selection={selectedCategory}
                            onSelectionChange={(e) => setSelectedCategory(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column field="image" sortable header="Image" body={imageBodyTemplate} headerStyle={{ width: '40%' }}></Column>
                            <Column field="project_id" header="Project Name" sortable body={projectBodyTemplate} headerStyle={{ width: '30%', minWidth: '9rem' }}></Column>
                            <Column
                                field="category_name"
                                // filter
                                // showFilterOperator={false}
                                // showAddButton={false}
                                // showFilterMatchModes={false}
                                // filterElement={categoryFilterTemplate}
                                // filterClear={filterClearTemplate}
                                // filterApply={filterApplyTemplate}
                                filterField="category_name"
                                header="Category Name"
                                body={categoryBodyTemplate}
                                sortable
                                headerStyle={{ width: '30%' }}
                            ></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>

                        {/* <Paginator template={template} first={first} rows={rows} totalRecords={categoryData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator> */}
                        <Dialog visible={isModalOpen} style={{ width: '50vw' }} header="Category Create" modal className="p-fluid usercreation" footer={categoryDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Category Name
                                    </label>
                                    <InputText
                                        id="category_name"
                                        type="text"
                                        required
                                        placeholder="Enter Category Name"
                                        value={values.category_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, category_name: e.target.value });
                                                setSubmitted(false);
                                                setIsErorrs({
                                                    ...errors,
                                                    imageError: false,
                                                    categoryNameError: false
                                                });
                                            }
                                        }}

                                        className={classNames({ 'p-invalid': submitted && isErrors.imageError })}
                                    />
                                    {isErrors?.categoryNameError ? <small className="p-invalid error">Category name is required</small> : null}
                                    {submitted && errors ? <small className="p-invalid error">{errors?.category_name}</small> : null}

                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.project_id}
                                        onChange={(e) => {
                                            setValues({ ...values, project_id: e.target.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && !values.project_id })}
                                    />
                                    {isErrors?.projectError ? <small className="p-invalid error">Project name is required</small> : null}
                                    {submitted && errors?.project_id ? <small className="p-invalid error">{errors?.project_id}</small> : null}
                                </div>
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
                                            category_image_name: e.target.files[ 0 ].name,
                                            category_image_preview: URL.createObjectURL(e.target.files[ 0 ]),
                                            image: e.target.files[ 0 ]
                                        });
                                        setSubmitted(false);
                                        setIsErorrs({
                                            ...errors,
                                            imageError: false,
                                            categoryNameError: false
                                        });
                                    }}
                                    hidden
                                />
                            </div>
                            <div className="flex flex-row ">
                                <div className="flex flex-column mr-4 -mt-3">

                                    <div className="cursor-pointer w-9rem border-round" style={{ backgroundColor: '#1565C0', color: 'white', padding: '10px 0px' }}>
                                        <label htmlFor="imgfile" className="flex justify-content-center align-items-center">
                                            <i className="pi pi-upload mr-3"></i>
                                            <span className="cursor-pointer ">Select Image</span>
                                        </label>
                                    </div>

                                    {isErrors?.imageError ? <small className="p-invalid error">Image is required</small> : null}
                                    <span id="file-chosen" className="ml-0 ">
                                        {values.category_image_name}
                                    </span>
                                </div>
                                <div className="flex flex-row ml-4">
                                    <Image src={values.category_image_preview ? values.category_image_preview : values.image} alt="Project Image" width="100" height="100" />
                                    {values.image != '' ? (
                                        <div className="flex justify-content-center align-items-center">
                                            <Button
                                                icon="pi pi-times"
                                                className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                onClick={() => setValues({ ...values, image: '', category_image_name: 'No Image Choosen', category_image: '', category_image_preview: '' })}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                        </Dialog>

                        <Dialog visible={isEditModalOpen} style={{ width: '50vw' }} header="Category Edit" modal className="p-fluid usercreation" footer={categoryUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Category Name
                                    </label>
                                    <InputText
                                        id="category_name"
                                        type="text"
                                        required
                                        placeholder="Enter Category Name"
                                        value={values.category_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, category_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}

                                        className={classNames({ 'p-invalid': submitted && !values.category_name })}
                                    />
                                    {submitted && isErrors.categoryNameError ? <small className="p-invalid error">Category name is required</small> : null}
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.project_id}
                                        onChange={(e) => {
                                            setValues({ ...values, project_id: e.target.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && !values.project_id })}
                                    />
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.project_id}</small> : null}
                                </div>
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
                                            setValues({ ...values, category_image: e.target.files[ 0 ], category_image_name: e.target.files[ 0 ].name, category_image_preview: URL.createObjectURL(e.target.files[ 0 ]), isImageChange: true });
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
                                            {values.category_image_name}

                                        </span>
                                    </div>
                                    <div className="flex flex-row ">
                                        <Image src={values.category_image_preview != null ? values.category_image_preview : values.image} alt="Category Image" width="100" height="100" />

                                        {values.category_image_name != 'No Image Choosen' ? (
                                            <div className="flex justify-content-center align-items-center">
                                                <Button
                                                    icon="pi pi-times"
                                                    className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                    onClick={() => setValues({ ...values, image: '', category_image_preview: null, category_image_name: 'No Image Choosen' })}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={viewImage} style={{ width: '50vw' }} header="View Image" modal onHide={() => setViewImage(false)}>
                            <div className="flex align-items-center justify-content-center m-5">
                                <Image src={image} alt="image" width="400px" height="400px" className="shadow-4" />

                            </div>
                        </Dialog>
                        <Dialog visible={deletecategoryDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteCategoryDialogFooter} onHide={setDeletecategoryDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>
                                    Are you sure you want to delete <b>{values.category_name}</b>?
                                </span>
                            </div>
                        </Dialog>
                        <Dialog visible={deleteProjectsDialog} style={{ width: '350px' }} header="Confirmation" modal footer={multideleteCategoryDialogFooter} onHide={hideMultiDeleteCategoryDialog}>
                            <div className="flex align-items-center justify-content-center mt-1">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                                <span>Are you sure you want to delete the selected Categories?</span>
                            </div>
                        </Dialog>
                        <Dialog visible={modalExcel} style={{ width: '50vw' }} header="Import Excel" modal className="p-fluid usercreation" onHide={hideExcelDialog}>
                            <div md="12" sm="12" className='my-3'>
                                <div className="mb-3 p-3" style={{ 'background-color': '#e0e0e0' }}>
                                    <h6 style={{ color: 'red' }}>NOTE *</h6>

                                    <p className="font-medium mb-5">Kindly download the sample excel file and import the excel data as per the excel file otherwise data will not import properly it might give you an error </p>
                                </div>
                                <div
                                    style={{
                                        marginBottom: '1rem'
                                    }}
                                >
                                    <strong>Download : </strong>
                                    <a href={project_sample_excel} style={{ textDecoration: 'underline' }}>
                                        sample.xlsx
                                    </a>
                                </div>
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="dropdown" className="required">
                                        Project Name
                                    </label>
                                    <Dropdown
                                        id="dropdown"
                                        optionValue="value"
                                        optionLabel="label"
                                        required
                                        filter
                                        placeholder="Select Project"
                                        options={projectListData}
                                        value={values?.project_id}
                                        onChange={(e) => {
                                            setValues({ ...values, project_id: e.target.value });
                                        }}

                                        className={classNames({ 'p-invalid': submitted && !values.project_id })}
                                    />
                                    {submitted && errors?.project_id ? <small className="p-invalid error">{errors?.project_id}</small> : null}
                                </div>
                                <FileUpload mode="basic" disabled={values.project_id == '' ? true : false} accept="file/*" name="demo[]" maxFileSize={1000000} label="Import" chooseLabel="Import Excel" className="m-2 inline-block" customUpload uploadHandler={readExcel} />

                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SKUCategorylist;
