import { GetAllCityRequest, GetAllStateRequest } from '../../../redux/slice/AdminSlice/storeSlice';
import { GetAllChainNameForWebRequest, GetAllTLNameForWebRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import { getZoneLableRequest } from '../../../redux/slice/AdminSlice/zoneSlice';
import components from '../primeReactComponentsIndex';

const PlannerReport = () => {
    const { React, useState, useEffect, useSelector, useDispatch, moment, classNames, Calendar, Dropdown, Button, interactionPlugin, timeGridPlugin, dayGridPlugin, FullCalendar } = components;
    const dispatch = useDispatch();
    const { stateData, cityData } = useSelector((state) => state.store);
    const { chainData, tlData } = useSelector((state) => state.userDashboard);
    const { zoneList } = useSelector((state) => state.zone);
    const [ submitted, setSubmitted ] = useState(false);
    const [ eventDialog, setEventDialog ] = useState(false);
    const [ clickedEvent, setClickedEvent ] = useState(null);
    const [ changedEvent, setChangedEvent ] = useState({ title: '', start: null, end: null, allDay: null });
    const [ events, setEvents ] = useState(null);
    const [ startdate, setStartDate ] = useState(null);
    const [ enddate, setEndDate ] = useState(null);

    const dropdownItems = [
        { name: 'NPM', code: 'npm' },
        { name: 'Admin', code: 'admin' },
        { name: 'Promoters', code: 'promoters' },
        { name: 'TL', code: 'tl' }
    ];
    const eventClick = (e) => {
        const { title, start, end } = e.event;
        setEventDialog(true);
        setClickedEvent(e.event);
        setChangedEvent({ title, start, end, allDay: null });
    };
    const zoneTag = [
        { label: 'North', value: 'NORTH' },
        { label: 'South', value: 'SOUTH' },
        { label: 'East', value: 'EAST' },
        { label: 'West', value: 'WEST' }
    ];

    const [ value, setValue ] = useState({
        zone: '',
        state: '',
        city: '',
        chain: '',
        tl: ''
    });

    // Create a new Date object
    const currentDate = new Date();
    const fullYear = moment(currentDate).format('YYYY-MM-DD');
    const year = moment(currentDate).format('YYYY');
    const month = moment(currentDate).format('MMM');
    const date = moment().date();
    const dayName = moment(currentDate).format('dddd');

    useEffect(() => {
        dispatch(getZoneLableRequest());
    }, [ dispatch ]);

    return (
        <div className="grid card  p-fluid  m-3">
            <div className="flex  col-12">
                <div className="col-6">
                    <h5 className="mr-3 title">Planner Report</h5>
                </div>
                <div className="col-6 flex justify-content-center align-items-center">
                    {/* <h5 className=' title'>Select Date</h5> */}
                    <div className="ml-auto">
                        <Button
                            icon="pi pi-download"
                            // onClick={() => setIsImportExcelModalOpen(true)}
                            label="Export Planner"
                            className="p-button-outlined p-button-success   "
                        />
                    </div>
                </div>
            </div>

            <div className="flex col-12 ">
                <div className="col-6 grid p-fluid">
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Select Zone
                        </label>

                        <Dropdown
                            optionLabel="label"
                            optionValue="value"
                            required
                            placeholder="Select Zone"
                            options={zoneList}
                            value={value?.zone}
                            onChange={(e) => {
                                setValue({ ...value, zone: e.target.value });
                                dispatch(GetAllStateRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.zone == '' })}
                        ></Dropdown>
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Select State
                        </label>
                        <Dropdown
                            required
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Select State"
                            disabled={value.zone == '' ? true : false}
                            // disabled
                            options={stateData}
                            value={value.state}
                            onChange={(e) => {
                                setValue({ ...value, state: e.value });
                                dispatch(GetAllCityRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.state == '' })}
                        ></Dropdown>
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Select City
                        </label>

                        <Dropdown
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select City"
                            disabled={value.state == '' ? true : false}
                            options={cityData}
                            value={value.city}
                            onChange={(e) => {
                                setValue({ ...value, city: e.target.value });
                                dispatch(GetAllChainNameForWebRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.city == '' })}
                        ></Dropdown>
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Select Chain
                        </label>
                        <Dropdown
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select Chain"
                            disabled={value.city == '' ? true : false}
                            options={chainData}
                            value={value.chain}
                            onChange={(e) => {
                                setValue({ ...value, chain: e.target.value });
                                dispatch(GetAllTLNameForWebRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.chain == '' })}
                        ></Dropdown>
                    </div>
                    <div className="field col-12 md:col-6 mb-1">
                        <label htmlFor="dropdown" className="required">
                            Select TL
                        </label>
                        <Dropdown
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select TL "
                            disabled={value.chain == '' ? true : false}
                            options={tlData}
                            value={value.tl}
                            onChange={(e) => {
                                setValue({ ...value, tl: e.target.value });
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.tl == '' })}
                        ></Dropdown>
                    </div>
                </div>

                <div className="col-6">
                    {/* <h5 className='text-align-center title'>Select Date</h5> */}
                    <div className="flex flex-column justify-content-center align-items-center">
                        <div>
                            <span>Select Start Date</span>
                            <div className="field col-12 mb-1">
                                <Calendar
                                    inputId="calendar"
                                    className="calendar-input"
                                    value={startdate}
                                    showButtonBar
                                    onChange={(e) => setStartDate(e.value)}
                                    // selectionMode="range"
                                    readOnlyInput
                                    placeholder="Select Date"
                                    dateFormat="dd/mm/yy"
                                ></Calendar>
                            </div>
                        </div>
                        <div>
                            <span>Select End Date</span>
                            <div className="field col-12 mb-1">
                                <Calendar
                                    inputId="calendar"
                                    className="calendar-input"
                                    value={enddate}
                                    showButtonBar
                                    onChange={(e) => setEndDate(e.value)}
                                    // selectionMode="range"
                                    readOnlyInput
                                    placeholder="Select Date"
                                    dateFormat="dd/mm/yy"
                                ></Calendar>
                            </div>
                        </div>
                        <div className="col-6">
                            <Button className="login-button border-round-3xl mt-2" label="Submit"></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6"></div>
            {/* </div> */}
            <div className="col-12 h-6rem">
                <div className="flex justify-content-end">
                    <div className="flex flex-column justify-content-center">
                        <span>{dayName},</span>
                        <span>
                            {month}, {year}
                        </span>
                    </div>
                    <span className="text-8xl font-light">{date}</span>
                </div>
            </div>
            <div className="col-12 mt-2">
                <FullCalendar
                    events={events}
                    eventClick={eventClick}
                    initialDate={fullYear}
                    initialView="dayGridMonth"
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
                    editable
                    selectable
                    selectMirror
                    dayMaxEvents
                />
            </div>
        </div>
    );
};

export default PlannerReport;
