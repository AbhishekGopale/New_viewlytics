import { CreateTaskRequest, DeleteTaskRequest, GetDateByTaskListRequest, handleResetPlannerTask, MultipalDeleteTaskRequest } from '../../../../../redux/slice/AdminSlice/plannertaskSlice';
import { getAllStoreLabelRequest } from '../../../../../redux/slice/AdminSlice/userSlice';
import components from '../../../primeReactComponentsIndex';

const Tasklist = () => {
    const { React, useEffect, useState, useRef, moment, useNavigate, useDispatch, useSelector, Button, Column, DataTable, Dialog, RadioButton, InputTextarea, Calendar, InputText, MultiSelect, Toast, Toolbar, classNames } = components;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);
    const { dateByTaskdata, taskDate, errors, successMessage, searchUser_id } = useSelector((state) => state.plannertask);
    const [ showCancelDialog, setShowCancelDialog ] = useState(false);
    const [ values, setValues ] = useState({
        user_id: '',
        isRepeat: { key: '0' },
        isAlert: { key: '0' },
        isShair: { key: '0' },
        storeId: [],
        task_name: '',
        form_name: '',
        task_time: '',
        task_description: ''
    });
    const formattedDate = moment(taskDate)?.format('DD-MM-YYYY');
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedTask, SetSelectedTask ] = useState([]);
    const [ deleteTaskDialog, setDeleteTaskDialog ] = useState(false);
    const [ taskDeleteId, setTaskDeleteId ] = useState('');
    const { storeList } = useSelector((store) => store.user);
    const handleReset = () => {
        setIsModalOpen(false);
        setShowCancelDialog(false);
        setShowCancelDialog(false);
        setValues({
            ...values,
            user_id: '',
            isRepeat: { key: '0' },
            isAlert: { key: '0' },
            isShair: { key: '0' },
            storeId: [],
            task_name: '',
            form_name: '',
            task_time: '',
            task_description: ''
        });
    };
    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
        handleReset();
    };
    const handleSubmit = () => {
        setSubmitted(true);
        const createdData = {
            user_id: searchUser_id,
            store: values.storeId,
            repeat: values.isRepeat?.key,
            alert: values.isAlert?.key,
            share: values.isShair?.key,
            task_name: values.task_name,
            form_name: values.form_name,
            task_time: values.task_time,
            task_description: values.task_description
        };

        dispatch(CreateTaskRequest(createdData));
    };
    const confirmDeleteSelected = () => {
        setShowCancelDialog(true);
    };
    const deleteSelectedTasks = () => {
        let tasksData = dateByTaskdata?.tasks.filter((val) => selectedTask?.includes(val));
        let tasksId = [];
        tasksData?.map((e) => {
            let id = e.id;
            tasksId.push(id);
        });
        const formData = {
            id: tasksId
        };
        dispatch(MultipalDeleteTaskRequest(formData));
        setShowCancelDialog(false);
        SetSelectedTask(null);
    };
    const confirmDeleteTask = (taskId) => {
        setTaskDeleteId(taskId?.id);
        setDeleteTaskDialog(true);
    };
    const handleDeleteTask = () => {
        dispatch(DeleteTaskRequest(taskDeleteId));
        setDeleteTaskDialog(false);
    };

    const hideDeleteTaskDialog = () => {
        setDeleteTaskDialog(false);
    };
    const handleBack = () => {
        navigate('/admin/task');
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-0">
                    <Button label="Back" onClick={() => handleBack()} icon="pi pi-chevron-left" className="p-button-outlined p-button " />
                    <Button label="Delete" icon="pi pi-trash" disabled={selectedTask?.length >= 2 ? false : true} className="p-button-outlined p-button-danger mx-3" onClick={() => confirmDeleteSelected()} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Create"
                    icon="pi pi-plus"
                    className="p-button-outlined p-button-success"
                    onClick={() => {
                        setSubmitted(false);
                        setIsModalOpen(true);
                    }}
                />
            </React.Fragment>
        );
    };

    const taskDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2 " onClick={(e) => handleSubmit(e)} />
        </>
    );
    const deleteTaskDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={hideDeleteTaskDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={handleDeleteTask} autoFocus />
        </>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions flex justify-content-center">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-text  p-button-danger" id="delete-icons" tooltip="Delete" tooltipOptions={{ position: 'bottom' }} onClick={() => confirmDeleteTask(rowData)} />
            </div>
        );
    };
    const header = <Toolbar className="create-delete-btn" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>;
    const formBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.form_name}</div>;
    };
    const taskBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.task_name}</div>;
    };
    const tasktimeBodyTemplate = (rowData) => {
        const formattedDate = moment(rowData?.task_time)?.format('DD-MM-YYYY');
        return <div className="ml-2">{formattedDate}</div>;
    };
    const taskDecBodyTemplate = (rowData) => {
        return <div className="ml-2 capitalize">{rowData.task_description}</div>;
    };
    const cancelDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-outlined p-button-danger mr-2 mb-2" onClick={() => setShowCancelDialog(false)} />
            <Button label="Yes" icon="pi pi-check" className="p-button-outlined p-button-success mr-2 mb-2" onClick={() => deleteSelectedTasks()} autoFocus />
            {/* <Button label="Cancel for All" icon="pi pi-times" className="p-button-outlined p-button-success mr-2 mb-2" onClick={"deleteSelectedUsers"} /> */}
        </>
    );
    const repeat = [
        { name: 'Yes', key: '1' },
        { name: 'No', key: '0' }
    ];
    const alert = [
        { name: 'Yes', key: '1' },
        { name: 'No', key: '0' }
    ];
    const shair = [
        { name: 'Yes', key: '1' },
        { name: 'No', key: '0' }
    ];

    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
            dispatch(handleResetPlannerTask());
            handleReset();
            const data = {
                user_id: searchUser_id,
                date: taskDate
            };
            dispatch(GetDateByTaskListRequest(data));
        }
    }, [ successMessage ]);
    useEffect(() => {
        if (isModalOpen) {
            dispatch(getAllStoreLabelRequest());
        }
    }, [ isModalOpen ]);
    return (
        <div className="chain-main-component">
            <div className="col-12">
                <div className="chainlist-card mb-1 flex justify-content-between">
                    <h5 className="flex justify-content-center align-items-center mb-0 title">
                        {formattedDate} | {dateByTaskdata?.tasks?.length} Task
                    </h5>
                </div>
            </div>
            <div className="grid crud-demo ml-0 mr-0">
                <div className="col-12">
                    <div className="card chainlist-card">
                        <Toast ref={toast} />
                        <DataTable
                            value={dateByTaskdata?.tasks}
                            showGridlines
                            stripedRows
                            selection={selectedTask}
                            onSelectionChange={(e) => SetSelectedTask(e?.value)}
                            dataKey="id"
                            className="datatable-responsive"
                            emptyMessage="No record found."
                            header={header}
                            scroll="scroll"
                            tableStyle={{ minWidth: '60rem' }}
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '1%' }}></Column>

                            <Column field="form_name" header="Form Name" body={formBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '8rem' }}></Column>
                            <Column field="task_name" header="Task Name" body={taskBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '8rem' }}></Column>
                            <Column field="task_time" header="Task Date" body={tasktimeBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '8rem' }}></Column>
                            <Column field="task_description" header="Task Description" body={taskDecBodyTemplate} sortable headerStyle={{ width: '15%', minWidth: '8rem' }}></Column>
                            <Column header="Actions" className="action" headerStyle={{ width: '3%', minWidth: '6rem' }} body={actionBodyTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
            </div>
            <Dialog visible={isModalOpen} style={{ width: '80vw' }} header="Create Task" modal className="p-fluid " footer={taskDialogFooter} onHide={hideDialog}>
                <div className="grid p-fluid mt-1">
                    <div className="field col-12 md:col-4 mb-1">
                        <label htmlFor="place_group" className="required">
                            Repeat
                        </label>
                        <div className="flex flex-row  ">
                            {repeat.map((e) => {
                                return (
                                    <div key={e.key} className="flex align-items-center">
                                        <RadioButton className="flex  " inputId={e.key} name="e" value={e} onChange={(e) => setValues({ ...values, isRepeat: e.value })} checked={values.isRepeat.key === e.key} />
                                        <label htmlFor={e.key} className="mx-3">
                                            {e.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        {submitted && errors?.place_group ? <small className="p-invalid error">{errors?.place_group}</small> : null}
                    </div>
                    <div className="field col-12 md:col-4 mb-1">
                        <label htmlFor="place_category" className="required">
                            Alert
                        </label>
                        <div className="flex flex-row  ">
                            {alert.map((i) => {
                                return (
                                    <div key={i.key} className="flex align-items-center">
                                        <RadioButton className="flex  " inputId={i.key} name="i" value={i} onChange={(e) => setValues({ ...values, isAlert: e.value })} checked={values.isAlert.key === i.key} />
                                        <label htmlFor={i.key} className="mx-3">
                                            {i.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        {submitted && errors?.place_category ? <small className="p-invalid error">{errors?.place_category}</small> : null}
                    </div>
                    <div className="field col-12 md:col-4 mb-1">
                        <label htmlFor="place_name" className="required">
                            Shair
                        </label>
                        <div className="flex flex-row  ">
                            {shair.map((i) => {
                                return (
                                    <div key={i.key} className="flex align-items-center">
                                        <RadioButton className="flex  " inputId={i.key} name="i" value={i} onChange={(e) => setValues({ ...values, isShair: e.value })} checked={values.isShair.key === i.key} />
                                        <label htmlFor={i.key} className="mx-3">
                                            {i.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        {submitted && errors?.place_name ? <small className="p-invalid error">{errors?.place_name}</small> : null}
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="place_name" className="required">
                            Select Store
                        </label>
                        <MultiSelect
                            value={values.storeId}
                            filter
                            showClear
                            onChange={(e) => setValues({ ...values, storeId: e.value })}
                            options={storeList}
                            optionLabel="label"
                            maxSelectedLabels={3}
                            placeholder="Select Store Name"
                            className="addstoreselect"
                        />
                        {submitted && errors?.storeId ? <small className="p-invalid error">{errors?.storeId}</small> : null}
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="task_name" className="required">
                            Task Name
                        </label>
                        <InputText
                            id="task_name"
                            type="text"
                            placeholder="Enter Task Name"
                            value={values.task_name}
                            onChange={(e) => {
                                setValues({ ...values, task_name: e.target.value });
                            }}
                            required
                            className={classNames({ 'p-invalid': submitted && !values.task_name })}
                        />
                        {submitted && errors?.task_name ? <small className="p-invalid error">{errors?.task_name}</small> : null}
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="form_name" className="required">
                            Form Name
                        </label>
                        <InputText
                            id="formname"
                            type="text"
                            placeholder="Enter Form Name"
                            value={values.form_name}
                            onChange={(e) => {
                                setValues({ ...values, form_name: e.target.value });
                            }}
                            required
                            className={classNames({ 'p-invalid': submitted && !values.form_name })}
                        />
                        {submitted && errors?.form_name ? <small className="p-invalid error">{errors?.form_name}</small> : null}
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Task Date
                        </label>
                        <Calendar
                            inputId="calendar"
                            className={classNames({ 'p-invalid': submitted && values.task_time == '' })}
                            dateFormat="dd/mm/yy"
                            placeholder="dd/mm/yy"
                            showButtonBar
                            required
                            value={values.task_time}
                            onChange={(e) => {
                                setValues({ ...values, task_time: e.value });
                            }}
                        />

                        {submitted && errors?.task_time ? <small className="p-invalid error">{errors?.task_time}</small> : null}
                    </div>

                    <div className="field col-12 md:col-12 mb-1">
                        <label htmlFor="task_name" className="required">
                            Task Description
                        </label>
                        <InputTextarea
                            id="task_description"
                            type="text"
                            rows="3"
                            cols="10"
                            autoResize
                            placeholder="Enter Task Description"
                            value={values.task_description}
                            onChange={(e) => {
                                setValues({ ...values, task_description: e.target.value });
                            }}
                            required
                            className={classNames({ 'p-invalid': submitted && !values.task_description })}
                        />
                        {submitted && errors?.task_description ? <small className="p-invalid error">{errors?.task_description}</small> : null}
                    </div>
                </div>
            </Dialog>
            <Dialog visible={showCancelDialog} style={{ width: '350px' }} header="Confirmation" modal footer={cancelDialogFooter} onHide={() => setShowCancelDialog(false)}>
                <div className="flex align-items-center justify-content-center mt-1">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete these task?</span>
                </div>
            </Dialog>
            <Dialog visible={deleteTaskDialog} style={{ width: '350px' }} header="Confirmation" modal footer={deleteTaskDialogFooter} onHide={setDeleteTaskDialog}>
                <div className="flex align-items-center justify-content-center mt-1">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete?</span>
                </div>
            </Dialog>
        </div>
    );
};

export default Tasklist;
