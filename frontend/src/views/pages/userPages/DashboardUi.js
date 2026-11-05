import components from '../primeReactComponentsIndex';
import { handleResetState } from '../../../redux/slice/AdminSlice/authSlice';
import { GetAllChainNameForWebRequest, GetAllTLNameForWebRequest, GetDashboardDetails } from '../../../redux/slice/UserSlice/userDashboardSlice';
import { GetAllCityRequest, GetAllStateRequest } from '../../../redux/slice/AdminSlice/storeSlice';
import { AttendanceAnalysis, ShairOfShell, OssReport, Merchandise, SalesAnalysis, WebDashboard } from '../../../indexMain'
const DashboardUi = () => {
    const { React, useState, useEffect, useRef, useSelector, useDispatch, classNames, OverlayPanel, Toast, MultiSelect, Image, Button, TabView, TabPanel, RadioButton, Calendar, Dropdown, } = components;
    const op = useRef(null);
    const dispatch = useDispatch();
    const [ date, setDate ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const toast = useRef(null);
    const { successMessage } = useSelector((store) => store.auth);
    const { stateData, cityData } = useSelector((state) => state.store);
    const { chainData, tlData } = useSelector((state) => state.userDashboard);
    const [ isFilterApplied, setIsFilterApplied ] = useState(false);
    const handleFilter = () => {
        setIsFilterApplied(true);
    };
    const toggle = (event) => {
        op.current.toggle(event);
    };
    const zoneTag = [
        { label: 'North', value: 'NORTH' },
        { label: 'South', value: 'SOUTH' },
        { label: 'East', value: 'EAST' },
        { label: 'West', value: 'WEST' }
    ];
    const [ values, setValues ] = useState({
        zone: '',
        state: '',
        city: '',
        chain: '',
        tl: '',
        projectName: ''
    });

    useEffect(() => {
        if (successMessage) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: successMessage, life: 3000 });
            dispatch(handleResetState());
        }
    }, [ successMessage ]);
    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
    };
    const handleSave = async (e) => {
        setSubmitted(true);
        handleFilter();
        // const createdSkuData = {
        //    ...values
        // };

        // dispatch(CreateSkuRequest(createdSkuData));
    };

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-end">
                <Button
                    type="button"
                    label={isFilterApplied ? 'Clear Filter' : 'Filter'}
                    onClick={toggle}
                    style={{ borderRadius: '7px', border: '1px solid ' }}
                    icon={isFilterApplied ? 'pi pi-filter-slash' : 'pi pi-filter'}
                    className="p-button-outlined"
                >
                </Button>
                <Button
                    icon="pi pi-download"
                    // onClick={() => setIsImportExcelModalOpen(true)}
                    label="Export to Pdf"
                    className="p-button-outlined p-button-success   ml-2"
                />
            </div>
            <OverlayPanel visible={isModalOpen} ref={op} appendTo={document.body} onHide={hideDialog}>
                <div className="grid p-fluid mt-1">
                    <div className="field col-12 md:col-3 mb-1">
                        <label htmlFor="date">Date</label>
                        <Calendar inputId="calendar" className="calendar-input" value={date} showButtonBar onChange={(e) => setDate(e.value)} selectionMode="range" readOnlyInput placeholder="Select Date" dateFormat="dd/mm/yy"></Calendar>
                        {submitted && date == '' ? <small className="p-invalid error">Date is required</small> : null}
                    </div>

                    <div className="field col-12 md:col-3 mb-1 ">
                        <label htmlFor="zone">Zone</label>
                        <Dropdown
                            id="zone"
                            optionLabel="label"
                            optionValue="value"
                            required
                            placeholder="Select Zone"
                            options={zoneTag}
                            value={values?.zone}
                            onChange={(e) => {
                                setValues({ ...values, zone: e.target.value });
                                dispatch(GetAllStateRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && values.zone == '' })}
                        ></Dropdown>
                        {submitted && values.zone == '' ? <small className="p-invalid error">Zone is required</small> : null}
                    </div>
                    <div className="field col-12 md:col-3 mb-1 ">
                        <label htmlFor="state">State</label>
                        <Dropdown
                            id="state"
                            required
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Select State"
                            disabled={values.zone == '' ? true : false}
                            // disabled
                            options={stateData}
                            value={values.state}
                            onChange={(e) => {
                                setValues({ ...values, state: e.value });
                                dispatch(GetAllCityRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && values.state == '' })}
                        ></Dropdown>
                        {submitted && values.state == '' ? <small className="p-invalid error">State is required</small> : null}
                    </div>
                    <div className="field col-12 md:col-3 mb-1 ">
                        <label htmlFor="city">City</label>
                        <Dropdown
                            id="city"
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select City"
                            disabled={values.state == '' ? true : false}
                            options={cityData}
                            value={values.city}
                            onChange={(e) => {
                                setValues({ ...values, city: e.target.value });
                                dispatch(GetAllChainNameForWebRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && values.city == '' })}
                        ></Dropdown>
                        {submitted && values.city == '' ? <small className="p-invalid error">City is required</small> : null}
                    </div>
                    <div className="field col-12 md:col-3 mb-1">
                        <label htmlFor="project">Project Name</label>
                        <Dropdown
                            id="project"
                            onChange={(e) => {
                                setValues({ ...values, projectName: e.target.value });
                            }}
                            optionValue="value"
                            optionLabel="label"
                            required
                            value={values.projectName}
                            placeholder="Select Project"
                        ></Dropdown>
                        {submitted && values.projectName == '' ? <small className="p-invalid error">Project Name is required</small> : null}
                    </div>
                    <div className="field col-12 md:col-3 mb-1">
                        <label htmlFor="chain">Chain Name</label>
                        <Dropdown
                            id="chain"
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select Chain"
                            disabled={values.city == '' ? true : false}
                            options={chainData}
                            value={values.chain}
                            onChange={(e) => {
                                setValues({ ...values, chain: e.target.value });
                                dispatch(GetAllTLNameForWebRequest(e.value));
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && values.chain == '' })}
                        ></Dropdown>
                        {submitted && values.chain == '' ? <small className="p-invalid error">Chain is required</small> : null}
                    </div>

                    <div className="field col-12 md:col-3 mb-1 ">
                        <label htmlFor="tl">TL Name</label>
                        <Dropdown
                            id="tl"
                            optionValue="value"
                            optionLabel="label"
                            required
                            placeholder="Select TL Nmae"
                            disabled={values.chain == '' ? true : false}
                            options={tlData}
                            value={values.tl}
                            onChange={(e) => {
                                setValues({ ...values, tl: e.target.value });
                            }}
                            autoFocus
                            className={classNames({ 'p-invalid': submitted && values.tl == '' })}
                        ></Dropdown>
                        {submitted && values.tl == '' ? <small className="p-invalid error">TL is required</small> : null}
                    </div>
                </div>
                <div className="flex justify-content-end">
                    <Button label="Apply Filter" icon="pi pi-check" type="button" className="p-button-outlined p-button-success" onClick={(e) => handleSave(e)}>
                    </Button>
                </div>
            </OverlayPanel>

            <div>
                <TabView>
                    <TabPanel header="Dashboard">
                        <WebDashboard />
                    </TabPanel>
                    <TabPanel header="Attendance Analysis">
                        <AttendanceAnalysis />
                    </TabPanel>
                    <TabPanel header="Shair of Shelf">
                        <ShairOfShell />
                    </TabPanel>
                    <TabPanel header="OSS Report Analysis">
                        <OssReport />
                    </TabPanel>
                    <TabPanel header="Sales Analysis">
                        <SalesAnalysis />
                    </TabPanel>
                    <TabPanel header="Merchandising">
                        <Merchandise />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DashboardUi;
