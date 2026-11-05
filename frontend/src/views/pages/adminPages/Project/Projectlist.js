import _default from 'react-redux/es/components/connect';
import * as XLSX from 'xlsx';
import { CreateProjectExcelRequest, DeleteProjectRequest, EditProjectRequest, GetAllProjectRequest, handleResetProject, MultipalDeleteProjectRequest, ProjectImageUploadRequest } from '../../../../redux/slice/AdminSlice/projectSlice';
import { getZoneLableRequest } from '../../../../redux/slice/AdminSlice/zoneSlice';
import components from '../../primeReactComponentsIndex';
import { DeleteModal, ImportModal, ViewImageModal, SubHeader, project_sample_excel } from '../../../../indexMain';
const Projectlist = () => {
    const { React, useState, useEffect, useRef, useDispatch, useSelector, Button, Column, DataTable, Dialog, FilterMatchMode, InputText, Image, MultiSelect, Paginator, Toast, Toolbar, classNames } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);
    const dt = useRef(null);
    const { zoneList } = useSelector((state) => state.zone);
    const [ filters, setFilters ] = useState(null);
    const [ searchFilterValue, setSearchFilterValue ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const [ modalExcel, setModalExcel ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);
    const [ deleteprojectDialog, setDeleteprojectDialog ] = useState(false);
    const [ selectedProject, setSelectedProject ] = useState([]);
    const [ deleteProjectsDialog, setDeleteProjectsDialog ] = useState(false);
    const [ projectDeleteId, setProjectDeleteId ] = useState('');
    const [ globalFilter, setGlobalFilter ] = useState(null);
    const [ viewImage, setViewImage ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ isErrors, setIsErorrs ] = useState({
        imageError: false,
        projectNameError: false,
        zoneError: false
    });
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
    const { isLoading, projectData, successMessage, errors } = useSelector((state) => state.project);
    var array = [];
    const handlePageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);

        dispatch(GetAllProjectRequest(`page=${event.page + 1}&limit=${event.rows}`));
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
        project_name: '',
        zone: [],
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
            project_name: '',
            image: '',
            zone: '',
            file: '',
            project_image_name: 'No Image Choosen',
            project_image: '',
            project_image_preview: null
        });
    };

    const handleImageUpload = (e) => {
        setSubmitted(true);
        setIsErorrs({
            ...errors,
            imageError: false,
            zoneError: false,
            projectNameError: false
        });
        if (values.image == '' && values.project_name == '') {
            setIsErorrs({
                ...errors,
                imageError: true,
                zoneError: true,
                projectNameError: true
            });
        } else if (values.image == '') {
            setIsErorrs({
                ...errors,
                imageError: true
            });
        } else if (values.project_name == '') {
            setIsErorrs({
                ...errors,
                projectNameError: true,
                zoneError: true
            });
        } else {
            values.zone.map((e) => {
                array.push(e);
            });
            const formData = new FormData();
            formData.append('project_name', values.project_name);
            formData.append('image', values.image);
            formData.append('zone', `[${array}]`);
            dispatch(ProjectImageUploadRequest(formData));
        }
    };

    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
        handleResetFormData();
        setIsErorrs(false);
        setViewImage(false);
        setModalExcel(false);
        setDeleteProjectsDialog(false);
        setDeleteprojectDialog(false);
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
            const projects = { projects: data };
            dispatch(CreateProjectExcelRequest(projects));
        });
    };
    const confirmDeleteProject = (projectId) => {
        setProjectDeleteId(projectId?.id);
        setDeleteprojectDialog(true);
        setValues({
            project_name: projectId?.project_name
        });
    };

    const handleDeleteProject = () => {
        dispatch(DeleteProjectRequest(projectDeleteId));
        setDeleteprojectDialog(false);
    };

    const hideDeleteProjectDialog = () => {
        setDeleteprojectDialog(false);
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
            projectNameError: false,
            imageError: false,
            zoneError: false
        });
        if (values.project_name == '') {
            setIsErorrs({
                ...errors,
                projectNameError: true,
                zoneError: true,
                imageError: false
            });
        } else if (values.isImageChange == true) {
            values.zone.map((e) => {
                array.push(e);
            });
            let formData = new FormData();
            formData.append('project_name', values.project_name);
            formData.append('image', values.project_image);
            formData.append('zone', `[${array}]`);
            formData.append('id', values.id);
            dispatch(EditProjectRequest(values.id, formData));
        } else if (values.image !== '') {
            values.zone.map((e) => {
                array.push(e);
            });
            const formData = new FormData();
            formData.append('project_name', values.project_name);
            formData.append('image', values.image);
            formData.append('zone', `[${array}]`);
            formData.append('id', values.id);
            dispatch(EditProjectRequest(values.id, formData));
        } else if (values.image == '') {
            if (values.project_image_preview == null) {
                setIsErorrs({
                    ...errors,
                    projectNameError: false,
                    zoneError: false,
                    imageError: true
                });
            }
        }
    };

    const editProject = (rowData) => {
        dispatch(getZoneLableRequest());
        setSubmitted(false);
        setValues({
            project_name: rowData.project_name,
            image: rowData.image,
            zone: rowData?.zone,
            id: rowData.id
        });
        setIsEditModalOpen(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteProjectsDialog(true);
    };
    const deleteSelectedProject = () => {
        let project = projectData?.project.filter((val) => selectedProject.includes(val));
        let ids = [];
        project?.map((e) => {
            let id = e.id;
            ids.push(id);
            return;
        });
        const formData = {
            id: ids
        };
        dispatch(MultipalDeleteProjectRequest(formData));
        setSelectedProject(null);
        setDeleteProjectsDialog(false);
        dispatch(handleResetProject());
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Delete" icon="pi pi-trash" className="p-button-outlined p-button-danger " onClick={confirmDeleteSelected} disabled={selectedProject?.length > 1 ? false : true} />

                    <Button label="Clear Filter" className="p-button-outlined ml-2" disabled={!searchFilterValue} onClick={() => filterClearCallback()} icon="pi pi-filter-slash"></Button>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create Project"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success mr-2"
                    onClick={() => {
                        setIsModalOpen(true);
                        handleResetFormData();
                        dispatch(getZoneLableRequest());
                    }}
                />
                <Button icon="pi pi-plus" onClick={() => setModalExcel(!modalExcel)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined p-button-help mr-2 " />
            </React.Fragment>
        );
    };
    const projectDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleImageUpload(e)} />
        </>
    );

    const imageBodyTemplate = (rowData) => {
        return (
            <div className="ml-2">
                <Image src={rowData.image} alt="image" width="80px" height="40px" className="shadow-4" />
            </div>
        );
    };
    const projectUpdateDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideEditDialog} />
            <Button label="Update" autoFocus icon="pi pi-check" disabled={isLoading} className="p-button-outlined p-button-success mr-2 mb-2" onClick={(e) => handleEditSave(e)} />
        </>
    );
    const deleteProjectDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" autoFocus onClick={hideDeleteProjectDialog} />
            <Button label="Yes" icon="pi pi-check" disabled={isLoading} className="p-button-outlined  p-button-success" onClick={handleDeleteProject} />
        </>
    );

    const multideleteProjectDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger" autoFocus onClick={hideDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success" onClick={deleteSelectedProject} />
        </>
    );

    const projectBodyTemplate = (rowData) => {
        return (
            <>
                <span className="ml-2 capitalize">{rowData.project_name}</span>
            </>
        );
    };
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
                <Button
                    tooltip="Edit"
                    tooltipOptions={{ position: 'bottom' }}
                    icon="pi pi-pencil"
                    id="edits-icons"
                    className="p-button-rounded p-button-text  p-button-help"
                    onClick={() => {
                        editProject(rowData);
                    }}
                />
                <Button
                    icon="pi pi-image"
                    className="p-button-rounded p-button-text  p-button-help"
                    id="view-image-icons"
                    tooltip="View Image"
                    tooltipOptions={{ position: 'bottom' }}
                    onClick={() => {
                        setViewImage(true);
                        setImage(rowData.image);
                    }}
                />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteProject(rowData)} />
            </div>
        );
    };

    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const projectFilterTemplate = () => {
        return <InputText type="search" className="w-15rem" value={searchFilterValue} onChange={(e) => handleFilter(e)} placeholder="Search Project" />;
    };
    const filterApplyCallback = (options) => {
        dispatch(GetAllProjectRequest(`page=${tableData.page}&filter_value=${searchFilterValue}&limit=${tableData.limit}`));
        options.filterApplyCallback();
    };

    const filterClearCallback = (options) => {
        setSearchFilterValue('');
        dispatch(GetAllProjectRequest(`page=${tableData.page}&filter_value=${''}&limit=${tableData.limit}`));
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
            project_name: { value: null, matchMode: FilterMatchMode.CONTAINS }
        });
        setGlobalFilter('');
    };
    useEffect(() => {
        if (successMessage) {
            setModalExcel(false);
            setIsEditModalOpen(false);
            setDeleteprojectDialog(false);
            setDeleteProjectsDialog(false);
            handleResetProject();
            setIsModalOpen(false);
            handleResetFormData();
            dispatch(handleResetProject());
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(GetAllProjectRequest(queryString));
        }
    }, [ successMessage, queryString ]);
    useEffect(() => {
        handleQueryChange(tableData);
    }, [ tableData ]);
    useEffect(() => {
        dispatch(GetAllProjectRequest(queryString));
    }, [ queryString ]);
    useEffect(() => {
        initFilters();
    }, []);
    return (
        <div className="chain-main-component">
            <SubHeader headerName={'Project List'} />
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card projectlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            ref={dt}
                            value={projectData?.project}
                            showGridlines
                            stripedRows
                            filters={filters}
                            selection={selectedProject}
                            onSelectionChange={(e) => setSelectedProject(e.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            globalFilter={globalFilter}
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>
                            <Column field="image" header="Image" body={imageBodyTemplate} headerStyle={{ width: '30%' }}></Column>
                            <Column
                                field="project_name"
                                filter
                                showFilterOperator={false}
                                showAddButton={false}
                                showFilterMatchModes={false}
                                filterElement={projectFilterTemplate}
                                filterClear={filterClearTemplate}
                                filterApply={filterApplyTemplate}
                                filterField="project_name"
                                header="Project Name"
                                body={projectBodyTemplate}
                                sortable
                                headerStyle={{ width: '30%' }}
                            ></Column>
                            <Column field="zone_name" header="Zone Name" body={zoneBodyTemplete} headerStyle={{ width: '18%', minWidth: '5rem' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '5%', minWidth: '9rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                        <Paginator template={template} first={first} rows={rows} totalRecords={projectData?.TotalCount} onPageChange={handlePageChange} rowsPerPageOptions={[ 10, 25, 50, 100, 500 ]}></Paginator>
                        <Dialog visible={isModalOpen} style={{ width: '50vw' }} header="Project Create" modal className="p-fluid usercreation" footer={projectDialogFooter} onHide={hideDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Project Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        required
                                        placeholder="Enter Project Name"
                                        value={values.project_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, project_name: e.target.value });
                                                setSubmitted(false);
                                                setIsErorrs({
                                                    ...errors,
                                                    imageError: false,
                                                    projectNameError: false
                                                });
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && isErrors.imageError })}
                                    />
                                    {isErrors?.projectNameError ? <small className="p-invalid error">Project name is required</small> : null}
                                    {submitted && errors ? <small className="p-invalid error">{errors?.project_name}</small> : null}
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
                                        display="chip"
                                        filter
                                        maxSelectedLabels={3}
                                        showClear
                                        placeholder="Select Zone"
                                        options={zoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {isErrors?.projectNameError ? <small className="p-invalid error">Zone is required</small> : null}
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
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
                                            project_image_name: e.target.files[ 0 ].name,
                                            project_image_preview: URL.createObjectURL(e.target.files[ 0 ]),
                                            image: e.target.files[ 0 ]
                                        });
                                        setSubmitted(false);
                                        setIsErorrs({
                                            ...errors,
                                            imageError: false,
                                            projectNameError: false
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
                                        {values.project_image_name}
                                    </span>
                                </div>
                                <div className="flex flex-row ml-4">
                                    <Image src={values.project_image_preview ? values.project_image_preview : values.image} alt="Project Image" width="100" height="100" />
                                    {values.image != '' ? (
                                        <div className="flex justify-content-center align-items-center">
                                            <Button
                                                icon="pi pi-times"
                                                className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                onClick={() => setValues({ ...values, image: '', project_image_name: 'No Image Choosen', project_image: '', project_image_preview: '' })}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </Dialog>
                        <Dialog visible={isEditModalOpen} style={{ width: '50vw' }} header="Project Edit" modal className="p-fluid usercreation" footer={projectUpdateDialogFooter} onHide={hideEditDialog}>
                            <div className="grid p-fluid mt-1">
                                <div className="field col-12 md:col-6 mb-1">
                                    <label htmlFor="project" className="required">
                                        Project Name
                                    </label>
                                    <InputText
                                        id="project_name"
                                        type="text"
                                        required
                                        placeholder="Enter Chain Name"
                                        value={values.project_name}
                                        onChange={(e) => {
                                            {
                                                setValues({ ...values, project_name: e.target.value });
                                                setSubmitted(false);
                                            }
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.project_name })}
                                    />
                                    {submitted && isErrors.projectNameError ? <small className="p-invalid error">Project name is required</small> : null}
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
                                        display="chip"
                                        filter
                                        maxSelectedLabels={3}
                                        showClear
                                        placeholder="Select Zone"
                                        options={zoneList}
                                        value={values?.zone}
                                        onChange={(e) => {
                                            setValues({ ...values, zone: e.target.value });
                                        }}
                                        className={classNames({ 'p-invalid': submitted && !values.zone })}
                                    />
                                    {isErrors?.projectNameError ? <small className="p-invalid error">Zone is required</small> : null}
                                    {submitted && errors?.zone ? <small className="p-invalid error">{errors?.zone}</small> : null}
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
                                            setValues({ ...values, project_image: e.target.files[ 0 ], project_image_name: e.target.files[ 0 ].name, project_image_preview: URL.createObjectURL(e.target.files[ 0 ]), isImageChange: true });
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
                                            {values.project_image_name}
                                        </span>
                                    </div>
                                    <div className="flex flex-row ">
                                        <Image src={values.project_image_preview != null ? values.project_image_preview : values.image} alt="Chain Image" width="100" height="100" />

                                        {values.project_image_name != 'No Image Choosen' ? (
                                            <div className="flex justify-content-center align-items-center">
                                                <Button
                                                    icon="pi pi-times"
                                                    className="p-button-rounded p-button-danger p-button-text mr-2 mb-2 ml-4"
                                                    onClick={() => setValues({ ...values, image: '', project_image_preview: null, project_image_name: 'No Image Choosen' })}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </Dialog>
                        <ViewImageModal modalopen={viewImage} hideModal={hideDialog} image={image} />
                        <DeleteModal isOpenDialog={deleteprojectDialog} modalFooter={deleteProjectDialogFooter} hideModal={hideDialog} modalDescription={`Are you sure you want to delete ${values.project_name}?`} />
                        <DeleteModal isOpenDialog={deleteProjectsDialog} modalFooter={multideleteProjectDialogFooter} hideModal={hideDialog} modalDescription={'Are you sure you want to delete the selected Projects?'} />
                        <ImportModal modalopen={modalExcel} hideModal={hideDialog} readExcel={readExcel} sampleExcel={project_sample_excel} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projectlist;
