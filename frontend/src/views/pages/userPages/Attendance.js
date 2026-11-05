import { GetAllCityRequest, GetAllStateRequest } from '../../../redux/slice/AdminSlice/storeSlice';
import { GetAllChainNameForWebRequest, GetAllTLNameForWebRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import { useDate } from '../../../utilities/Hooks/useDate';
import components from '../primeReactComponentsIndex';

const Attendance = () => {
    const { Button, Calendar, Divider, dayGridPlugin, timeGridPlugin, FullCalendar, interactionPlugin, useState, useDispatch, useSelector, useNavigate, Dropdown, classNames, Tag } = components;
    const dispatch = useDispatch();
    const { stateData, cityData } = useSelector((state) => state.store);
    const { chainData, tlData } = useSelector((state) => state.userDashboard);
    const [ currentDate ] = useDate();
    const [ submitted, setSubmitted ] = useState(false);
    const [ eventDialog, setEventDialog ] = useState(false);
    const [ clickedEvent, setClickedEvent ] = useState(null);
    const [ changedEvent, setChangedEvent ] = useState({ title: '', start: null, end: null, allDay: null });
    const [ events, setEvents ] = useState(null);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ startdate, setStartDate ] = useState(null);
    const [ enddate, setEndDate ] = useState(null);
    const navigate = useNavigate();

    const eventClick = (e) => {
        const { title, start, end } = e.event;
        setEventDialog(true);
        setClickedEvent(e.event);
        setChangedEvent({ title, start, end, allDay: null });
    };
    const save = () => {
        setEventDialog(false);
        clickedEvent.setProp('title', changedEvent.title);
        clickedEvent.setStart(changedEvent.start);
        clickedEvent.setEnd(changedEvent.end);
        clickedEvent.setAllDay(changedEvent.allDay);
        setChangedEvent({ title: '', start: null, end: '', allDay: null });
    };

    const reset = () => {
        const { title, start, end } = clickedEvent;
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
    return (
        <div className="grid card m-3">
            <div className="col-12 h-6rem">
                <div className="flex justify-content-end">
                    <div className="flex flex-column justify-content-center">
                        <span>{currentDate?.dayName},</span>
                        <span>
                            {currentDate?.monthName}, {currentDate?.year}
                        </span>
                    </div>
                    <span className="text-8xl font-light">{currentDate?.day}</span>
                </div>
            </div>

            <div className="flex flex-column w-5">
                <div className="flex flex-row h-16rem mb-2">
                    <div>
                        <h5 className=" title">Attendance Summary</h5>
                    </div>
                    <div className=" ml-2 w-5">
                        <Dropdown
                            id="taskdropdown"
                            optionLabel="label"
                            optionValue="value"
                            required
                            placeholder="Select Zone"
                            options={zoneTag}
                            value={value?.zone}
                            onChange={(e) => {
                                setValue({ ...value, zone: e.target.value });
                                dispatch(GetAllStateRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && value.zone == '' })}
                        ></Dropdown>
                        <Dropdown
                            id="taskdropdown"
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
                        <Dropdown
                            id="taskdropdown"
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
                        <Dropdown
                            id="taskdropdown"
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
                        <Dropdown
                            id="taskdropdown"
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select TL Nmae"
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
                    <div>
                        <Tag className=" h-3rem w-8 border-round-3xl cursor-pointer mx-3" icon="pi pi-search text-xl " value=""></Tag>
                    </div>
                </div>
                <div className="flex flex-column">
                    <h5 className="text-align-left title">Select Date</h5>
                    <div className="flex flex-column justify-content-center align-items-center">
                        <div>
                            <span>From</span>
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
                            <span>To</span>
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
                        <div>
                            <Button className="login-button border-round-3xl mt-2" label="Submit"></Button>
                        </div>
                    </div>
                </div>
            </div>

            <Divider layout="vertical"></Divider>
            <div className="col-6 mt-2">
                <FullCalendar
                    events={events}
                    eventClick={eventClick}
                    initialDate={currentDate?.fullDate}
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

export default Attendance;
