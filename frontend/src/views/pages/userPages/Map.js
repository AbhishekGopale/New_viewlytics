import { GetAllCityRequest, GetAllStateRequest } from '../../../redux/slice/AdminSlice/storeSlice';
import { GetMapDetailsRequest } from '../../../redux/slice/UserSlice/mapSlice';
import { locationGrayIcon, locationGreenIcon, locationRedIcon } from '../../../indexMain';
import { ProgressSpinner } from 'primereact/progressspinner';
import components from '../primeReactComponentsIndex';

const LoadingSpinner = () => {
    return (
        <div className="w-full h-full flex justify-content-center align-items-center">
            <ProgressSpinner />
        </div>
    );
};
const Map = () => {
    const { React, useState, useEffect, useDispatch, useSelector, Button, OverlayPanel, Dropdown, classNames, useRef, GoogleMap, LoadScript, InfoWindow, MarkerF, REACT_APP_GOOGLE_MAP_API_KEY } = components;

    const [ selected, setSelected ] = useState({});
    const [ coords, setCoords ] = useState([]);
    console.log(coords);
    const [ isFilterApplied, setIsFilterApplied ] = useState(false);
    const op = useRef(null);
    const toggle = (event) => {
        op.current.toggle(event);
    };
    const dispatch = useDispatch();
    const [ submitted, setSubmitted ] = useState(false);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const { stateData, cityData } = useSelector((state) => state.store);
    const { mapData } = useSelector((state) => state.map);

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
        status: ''
    });
    const onSelect = (item) => {
        setSelected(item);
    };
    const mapStyles = {
        height: '100%',
        width: '100%',
        transition: 'all 1s ease-in-out'
    };
    const statusTag = [
        { label: 'Active', value: '0' },
        { label: 'Inactive', value: '1' }
    ];
    const hideDialog = () => {
        setIsModalOpen(false);
        setSubmitted(false);
    };
    const defaultCenter = {
        lat: 23.000373573639532,
        lng: 72.65615583534922
    };
    useEffect(() => {
        dispatch(GetMapDetailsRequest());
    }, [ dispatch ]);
    const handleFilter = (value) => {
        setIsFilterApplied(value);
    };

    return (
        <>
            <OverlayPanel visible={isModalOpen} ref={op} appendTo={document.body} onHide={hideDialog}>
                <div className=" mt-2  mb-2">
                    <div className="flex  flex-column justify-content-center align-items-center p-fluid mt-1">
                        <div className="flex justify-content-center align-items-center gap-2">
                            <div className="field col-12 md:col-6 mb-1 " style={{ width: '300px' }}>
                                <label htmlFor="zone">Zone</label>
                                <Dropdown
                                    id="zone"
                                    optionLabel="label"
                                    optionValue="value"
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
                            </div>
                            <div className="field col-12 md:col-6 mb-1 " style={{ width: '300px' }}>
                                <label htmlFor="state">State</label>
                                <Dropdown
                                    id="state"
                                    optionLabel="label"
                                    optionValue="value"
                                    filter
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
                            </div>
                        </div>

                        <div className="flex justify-content-center align-items-center gap-2">
                            <div className="field col-12 md:col-6 mb-1 " style={{ width: '300px' }}>
                                <label htmlFor="city">City</label>
                                <Dropdown
                                    id="city"
                                    optionValue="value"
                                    optionLabel="label"
                                    filter
                                    placeholder="Select City"
                                    disabled={values.state == '' ? true : false}
                                    options={cityData}
                                    value={values.city}
                                    onChange={(e) => {
                                        setValues({ ...values, city: e.target.value });
                                        // dispatch(GetAllChainNameForWebRequest(e.value))
                                    }}
                                    autoFocus
                                    className={classNames({ 'p-invalid': submitted && values.city == '' })}
                                ></Dropdown>
                            </div>
                            <div className="field col-12 md:col-6 mb-1" style={{ width: '300px' }}>
                                <label htmlFor="project">Select Status</label>
                                <Dropdown
                                    id="Select Status"
                                    onChange={(e) => {
                                        setValues({ ...values, status: e.target.value });
                                    }}
                                    options={statusTag}
                                    optionValue="value"
                                    optionLabel="label"
                                    value={values.status}
                                    placeholder="Select status"
                                ></Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-end">
                        <Button
                            label="Apply Filter"
                            icon="pi pi-check"
                            type="button"
                            className="p-button-outlined p-button-success"
                            onClick={(e) => {
                                op?.current.toggle(e);
                                handleFilter(true);
                            }}
                        ></Button>
                    </div>
                </div>
            </OverlayPanel>
            <LoadScript LoadScript googleMapsApiKey={REACT_APP_GOOGLE_MAP_API_KEY} loadingElement={<LoadingSpinner />}>
                <GoogleMap mapContainerStyle={mapStyles} zoom={5} center={defaultCenter}>
                    {mapData?.map((item) => {
                        return (
                            <MarkerF
                                key={item.name}
                                position={item.location}
                                onClick={(e) => {
                                    onSelect(item);
                                    setCoords([ e.domEvent.clientX, e.domEvent.clientY ]);
                                    // console.log(e.domEvent.clientX
                                    //     )
                                    //     console.log(e.domEvent.clientY
                                    //         )
                                }}
                                icon={{ url: item?.status_id === '0' ? locationRedIcon : item?.status_id === '1' ? locationGreenIcon : item?.status_id === '2' ? locationGrayIcon : null }}
                            />
                        );
                        // return <MarkerF key={item.name} position={item.location} onClick={() => onSelect(item)} />
                    })}

                    <div className="flex card justify-content-end  mr-6">
                        <Button
                            label={isFilterApplied ? 'Clear Filter' : 'Filter'}
                            type="button"
                            onClick={(e) => {
                                !isFilterApplied && toggle(e);
                                isFilterApplied && handleFilter(false);
                            }}
                            className="p-button mr-2"
                            style={{ borderRadius: '7px', border: '1px solid ' }}
                            icon={isFilterApplied ? 'pi pi-filter-slash' : 'pi pi-filter'}
                        />
                    </div>
                    {selected?.location && (
                        <InfoWindow position={selected?.location} onCloseClick={() => setSelected({})}>
                            <>
                                <p>
                                    <span className="font-bold">User Name :- </span>
                                    {selected.user_name}
                                </p>
                                <p>
                                    <span className="font-bold">Name :- </span>
                                    {selected.name}
                                </p>
                                <p>
                                    <span className="font-bold">Role :- </span>
                                    {selected.role}
                                </p>
                                <p>
                                    <span className="font-bold">Status :- </span>
                                    {selected.status}
                                </p>
                                <p>
                                    <span className="font-bold">Battery :- </span>
                                    {selected.Battery_Status}
                                </p>
                                <p>
                                    <span className="font-bold">Speed :- </span>
                                    {selected.speed}
                                </p>
                                <p>
                                    <span className="font-bold">Last Update :- </span>
                                    {selected.last_update}
                                </p>
                                <p>
                                    <span className="font-bold">Location :- </span>
                                    {selected.store_name}
                                </p>
                            </>
                        </InfoWindow>

                        //    <div  onCloseClick={() => setSelected({})} style = {{position : "relative", background : "white", left : coords[0], top : coords[1] }}>
                        //     <>
                        //     {console.log('selected location', selected)}
                        //         <p>
                        //             <span className="font-bold">User Name :- </span>
                        //             {selected.user_name}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Name :- </span>
                        //             {selected.name}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Role :- </span>
                        //             {selected.role}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Status :- </span>
                        //             {selected.status}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Battery :- </span>
                        //             {selected.Battery_Status}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Speed :- </span>
                        //             {selected.speed}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Last Update :- </span>
                        //             {selected.last_update}
                        //         </p>
                        //         <p>
                        //             <span className="font-bold">Location :- </span>
                        //             {selected.store_name}
                        //         </p>
                        //     </>

                        // </div>
                    )}
                </GoogleMap>
            </LoadScript>
        </>
    );
};
export default Map;
