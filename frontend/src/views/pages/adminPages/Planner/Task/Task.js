import { getUserIdRequest } from '../../../../../redux/slice/AdminSlice/userAssignSlice';
import { getAllUserNameRequest } from '../../../../../redux/slice/AdminSlice/userSlice';
import { importTargetRequest } from '../../../../../redux/slice/AdminSlice/targetSlice';
import { GetAllTaskListRequest, GetDateByTaskListRequest, handleSetSearchUserId, handleSetUserDetails } from '../../../../../redux/slice/AdminSlice/plannertaskSlice';
import * as XLSX from 'xlsx';
import components from '../../../primeReactComponentsIndex';
import { ImportModal, task_excel } from '../../../../../indexMain';

const Task = () => {
    const { React, useEffect, useState, moment, useNavigate, useRef, useDispatch, useSelector, Toast, Button, FullCalendar, dayGridPlugin, timeGridPlugin, interactionPlugin, Dropdown, classNames } = components;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { getByUserNameData } = useSelector((state) => state.user);
    const { successMessage } = useSelector((state) => state.target);
    const { userIdData } = useSelector((state) => state.userAssign);
    const { taskListdata, userName, role } = useSelector((state) => state.plannertask);
    const [ values, setValues ] = useState({
        id: '',
        role: '',
        name: '',
        date: ''
    });
    const [ show, setShow ] = useState(false);
    const [ isComponentshow, setIsComponentShow ] = useState(false);
    const [ isShowSearch, SetIsshowSearch ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ submitted, setSubmitted ] = useState(false);
    const [ isImportExcelModalOpen, setIsImportExcelModalOpen ] = useState(false);
    const eventClick = (e) => {
        setValues({
            ...values,
            date: e?.dateStr
        });
        const taskData = {
            user_id: values?.name,
            date: e?.dateStr
        };
        dispatch(GetDateByTaskListRequest(taskData));
        navigate('/admin/task/tasklist');
        setIsComponentShow(true);
    };
    const nameTag = [
        { label: 'Name', value: '0' },
        { label: 'User ID', value: '1' }
    ];

    // Create a new Date object
    const currentDate = new Date();
    const fullYear = moment(currentDate).format('YYYY-MM-DD');
    const year = moment(currentDate).format('YYYY');
    const date = moment().date();
    const dayName = moment(currentDate).format('dddd');

    const handleSubmit = () => {
        setLoading(true);
        setSubmitted(true);
        dispatch(handleSetSearchUserId(values.name));
        dispatch(handleSetUserDetails(values));
        dispatch(GetAllTaskListRequest(values.name));
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        setShow(true);
        setIsComponentShow(true);
    };
    const hideModal = () => {
        setIsImportExcelModalOpen(false);
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
            const taskList = { taskArray: data };
            dispatch(importTargetRequest(taskList));
        });
    };
    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: successMessage, life: 3000 });
        }
        if (userName != null) {
            setValues({
                ...values,
                name: userName,
                role: role
            });
            setIsComponentShow(true);
        }
        if (values.role == '0') {
            dispatch(getAllUserNameRequest());
        }
        if (values.role == '1') {
            dispatch(getUserIdRequest());
        }
    }, [ successMessage, values.role, userName ]);

    return (
        <>
            <div className="flex justify-content-end mt-3 mr-3">
                <Toast ref={toast} />
                <Button icon="pi pi-plus" onClick={() => setIsImportExcelModalOpen(true)} label="Import Excel" chooseLabel="Import Excel" className="p-button-outlined  ml-2 " />
            </div>
            {isShowSearch ? (
                <div className="flex justify-content-center align-items-center mt-5">
                    <div className="card p-dialog col-5">
                        <div className="p-dialog-header">
                            <div className="p-dialog-title">Search</div>
                        </div>

                        <div className="grid p-fluid mt-1">
                            <div className="field col-12 md:col-12 mb-1 ">
                                <Dropdown
                                    id="role"
                                    optionLabel="label"
                                    optionValue="value"
                                    required
                                    placeholder="Select User Type"
                                    options={nameTag}
                                    value={values?.role}
                                    onChange={(e) => {
                                        setValues({ ...values, role: e.target.value });
                                    }}
                                    className={classNames({ 'p-invalid': submitted && values.role == '' })}
                                ></Dropdown>
                                {submitted && values.role == '' ? <small className="p-invalid error">Role is required</small> : null}
                            </div>
                            {values.role == '0' ? (
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        Name
                                    </label>
                                    <Dropdown
                                        placeholder="Select  Name"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        options={getByUserNameData}
                                        value={values.name}
                                        onChange={(e) => setValues({ ...values, name: e.target.value }, setSubmitted(false))}
                                        className={classNames({ 'p-invalid': submitted && !values.name })}
                                    />
                                    {submitted && values.name == '' ? <small className="p-invalid error">Name is required</small> : null}
                                </div>
                            ) : null}
                            {values.role == '1' ? (
                                <div className="field col-12 md:col-12 mb-1">
                                    <label htmlFor="firstname" className="required">
                                        User Id
                                    </label>
                                    <Dropdown
                                        placeholder="Select User ID"
                                        required
                                        optionLabel="label"
                                        optionValue="value"
                                        filter
                                        options={userIdData}
                                        value={values.name}
                                        onChange={(e) => setValues({ ...values, name: e.target.value }, setSubmitted(false))}
                                        className={classNames({ 'p-invalid': submitted && !values.name })}
                                    />
                                    {submitted && values.name == '' ? <small className="p-invalid error">Username is required</small> : null}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex justify-content-end align-content-end  ">
                            <Button label="Submit" onClick={() => handleSubmit()} disabled={values.name == '' ? true : false} loading={loading} icon="pi pi-check" className="p-button-outlined p-button-success " />
                        </div>
                    </div>
                </div>
            ) : null}

            {isComponentshow ? (
                <div className="flex justify-content-center mt-3">
                    <Button className="block" onClick={() => SetIsshowSearch(!isShowSearch)}>
                        {isShowSearch ? <i className="pi pi-arrow-down " /> : <i className="pi pi-arrow-up" />}
                    </Button>
                </div>
            ) : null}
            {isComponentshow == true && (
                <div className="card m-3">
                    <div>
                        <h4 className="title">Monthly planner for task</h4>
                        <div className="flex justify-content-end">
                            <div className="flex flex-column justify-content-center">
                                <span>{dayName},</span>
                                <span>
                                    {date}, {year}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <FullCalendar
                            // events={events}
                            // events={events}
                            customButtons={{
                                custom: {
                                    text: 'custom 1',
                                    click() {
                                        this.gotoPast();
                                    }
                                }
                            }}
                            events={taskListdata}
                            dateClick={(e) => eventClick(e)}
                            // eventClick={eventClick}
                            initialDate={fullYear}
                            initialView="dayGridMonth"
                            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                            selectable
                            selectMirror
                            dayMaxEvents
                        />
                    </div>
                </div>
            )}
            <ImportModal modalopen={isImportExcelModalOpen} hideModal={hideModal} readExcel={readExcel} sampleExcel={task_excel} />
        </>
    );
};

export default Task;
