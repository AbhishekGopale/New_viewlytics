import { GetAttendanceAnalysisDataRequest, getAttendanceReportRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import components from '../primeReactComponentsIndex';

const AttendanceAnalysis = () => {
    const { React, useState, useEffect, useDispatch, useSelector, Carousel, Chart, Column, DataTable, timeGridPlugin, FullCalendar, interactionPlugin, useNavigate, Dropdown, classNames, Tag } = components;
    const { role_id } = useSelector((state) => state?.auth?.userData)
    const dispatch = useDispatch();
    const { attendanceAnalysisData, attendanceData } = useSelector((state) => state.userDashboard);
    const [ selectedChain, setSelectedChain ] = useState([]);
    const [ attendanceGraphData, setAttendanceGraphData ] = useState([])
    const zoneBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Zone</span>
                {data.zone}
            </>
        );
    };
    const totalBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Total</span>
                {data.total}
            </>
        );
    };
    const presentBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Present</span>
                {data.present}
            </>
        );
    };
    const absentBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Absent</span>
                {data.absent}
            </>
        );
    };
    const weakoffBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Weak Off</span>
                {data.week_off}
            </>
        );
    };
    const leaveBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Leave</span>
                {data.leave}
            </>
        );
    };
    const notloggedinBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Not Log In</span>
                {data.not_log_in}
            </>
        );
    };

    const chainTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Chain</span>
                {data.chain}
            </>
        );
    };
    const totalTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Total</span>
                {data.total}
            </>
        );
    };
    const presentTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Present</span>
                {data.present}
            </>
        );
    };
    const absentTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Absent</span>
                {data.absent}
            </>
        );
    };
    const weekoffTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">W/Off</span>
                {data.week_off}
            </>
        );
    };
    const leaveTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Leave</span>
                {data.leave}
            </>
        );
    };
    const notloginTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Not Logged In</span>
                {data.not_log_in}
            </>
        );
    };

    const data = {
        labels: [ 'Present', 'Absent', 'W/Off', 'Leave', 'Not Logged in' ],
        datasets: [
            // {
            //     type: 'bar',
            //     label: 'Present',
            //     // backgroundColor: 'rgb(13, 71, 161)',
            //     backgroundColor: [
            //         'rgb(13, 71, 161)',
            //         'rgb(255, 0, 0)',
            //         'rgb(255, 255, 0)',
            //         'rgb(0, 255, 0)',
            //         'rgb(255, 165, 0)'
            //     ],
            //     data: [ 99, 25, 12, 48, 9 ]
            // },
            {
                type: 'bar',
                label: 'Present',
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgb(255,192,203)',
                    'rgba(255, 159, 64, 0.5)',
                    '#fde4a5',
                    'rgba(153, 102, 255, 0.5)'
                ],
                // backgroundColor: 'rgb(13, 71, 161)',
                // backgroundColor: [ '#6BCB77', '#F45050', '#F6FA70', '#8696FE', 'rgb(255, 165, 0)' ],
                // data: [ 99, 25, 12, 48, 9 ]
                data: attendanceGraphData
            }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: [ 'rgb(0,0,0 )' ],
                    font: {
                        weight: 200
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                stacked: true
            }
        }
    };

    const zoneWiseChart = {
        labels: [ 'East', 'West', 'North', 'South' ],
        datasets: [
            {
                label: 'Present',
                // data: [ 23, 98, 43, 91 ]
                data: attendanceAnalysisData?.zoneWiseChartData?.East
            },
            {
                label: 'Absent',
                data: attendanceAnalysisData?.zoneWiseChartData?.West
            },
            {
                label: 'W/ Off',
                data: attendanceAnalysisData?.zoneWiseChartData?.North
            },
            {
                label: 'Leave',
                data: attendanceAnalysisData?.zoneWiseChartData?.South
            },
            {
                label: 'Not Logged In',
                data: attendanceAnalysisData?.zoneWiseChartData?.notLoggedIn
            }
        ]
    };
    const zoneChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    // fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {},
                grid: {
                    drawBorder: false
                }
            }
        }
    };
    const attendanceTemplate = (attendanceData) => {
        console.log(attendanceData, 'attendanceData')
        return (
            <div className="flex p-1">
                <div className="card w-10 m-1 p-3 sales-box" style={{ backgroundColor: '#c0c0c061', color: 'black' }}>
                    <div className="mb-2 text-center capitalize">{attendanceData?.chain_name}</div>
                    <div className="text-center">
                        {attendanceData?.presentPro}/{attendanceData?.promotor_count}
                    </div>
                </div>
            </div>
        );
    };
    const handleChainSelect = (e) => {
        let chainArray = [];
        chainArray.push(e.value.presentPro)
        chainArray.push(e.value.AbsentPro)
        chainArray.push(e.value.w_off)
        chainArray.push(e.value.leave)
        chainArray.push(e.value.not_log_in)
        setAttendanceGraphData(chainArray);
        setSelectedChain(e.value)
    }
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    useEffect(() => {
        dispatch(GetAttendanceAnalysisDataRequest());
        dispatch(getAttendanceReportRequest());
    }, [ dispatch ]);
    useEffect(() => {
        if (attendanceData) {
            console.log(attendanceData?.attendanceChain, "attendanceData?.attendanceChain")
            // setSelectedChain(attendanceAnalysisData?.mainArr?.[ 0 ]);
            let chainArray = [];
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.presentPro)
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.AbsentPro)
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.presentPro)
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.w_off)
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.leave)
            chainArray.push(attendanceData?.attendanceChain?.[ 0 ]?.not_login)
            // chainArray.push(attendanceAnalysisData?.mainArr?.[ 0 ].absent)
            // chainArray.push(attendanceAnalysisData?.mainArr?.[ 0 ].week_off)
            // chainArray.push(attendanceAnalysisData?.mainArr?.[ 0 ].leave)
            // chainArray.push(attendanceAnalysisData?.mainArr?.[ 0 ].not_log_in)
            setAttendanceGraphData(chainArray);
        }
    }, [ attendanceData ]);
    return (
        <div className="card attendanceanalysis m-2">
            <div className="grid">
                <div className="col-12">
                    <h6 className="pt-1">Chain Wise</h6>
                    <Carousel className="card " value={attendanceData?.attendanceChain} numVisible={5} showIndicators={false} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={attendanceTemplate} />
                </div>
                {/* <div className=" col-12 card overflow-scroll">
                    <div className="flex">
                    {attendanceAnalysisData?.attedance.map((val, index) => (
                    <div className='w-2 m-2' key={index}>
                        <h6 className='text-center'>
                        {val.chain}
                        </h6>
                        <div className='flex justify-content-center  align-items-center chainwise' >{val.present}/{val.total}</div>
                    </div>))} */}

                {/* <div className='w-2 m-2'>
                        <h6>
                        Not Logged in
                        </h6>
                        <div className='flex justify-content-center  align-items-center chainwise' >20/20</div>
                    </div> */}
                {/* </div>
                </div> */}
                <div className="flex col-12 p-0">
                    <div className="col-6 ">
                        <h6 className="pt-2">Chain Wise Summery</h6>
                        <div className="card chainwisechart">
                            <DataTable
                                className="webdatatable"
                                selectionMode="single"
                                selection={selectedChain}
                                onSelectionChange={(e) => handleChainSelect(e)}
                                dataKey="chain_id"
                                stripedRows
                                emptyMessage="No record found."
                                // value={attendanceAnalysisData?.mainArr}
                                value={attendanceData?.attendanceChain}
                                scrollable
                                scrollHeight="320px"
                            >
                                <Column field="chain_name"
                                    // body={chainTemplate}
                                    header="Chain" style={{ width: '5rem', height: '1rem' }} />
                                <Column field="promotor_count"
                                    // body={totalTemplate}
                                    header="Total" style={{ width: '3rem' }} />
                                <Column field="presentPro"
                                    //  body={presentTemplate}
                                    header="Present" style={{ width: '3rem' }} />
                                <Column field="AbsentPro"
                                    // body={absentTemplate}
                                    header="Absent" style={{ width: '3rem' }} />
                                <Column field="w_off"
                                    // body={weekoffTemplate}
                                    header="W/Off" style={{ width: '3rem' }} />
                                <Column field="leave"
                                    // body={leaveTemplate}
                                    header="Leave" style={{ width: '3rem' }} />
                                <Column field="not_login"
                                    // body={notloginTemplate}
                                    header="Not Logged In" style={{ width: '3rem' }} />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6 ">
                        <h6 className="pt-2">Chain Wise Summary Chart </h6>
                        <Chart type="bar" className="card chainwisechart" data={data} options={options}></Chart>
                    </div>
                </div>

                {(role_id === 2 || role_id === 9) && <div className="col-12 flex p-0  " >
                    <div className="col-6">
                        <h6 className="pt-2">Zone Wise Summary</h6>
                        <div className="card chainwisechart">
                            <DataTable className="webdatatable" stripedRows emptyMessage="No record found." value={attendanceAnalysisData?.zoneWise}
                                dataKey="id"
                                scrollable scrollHeight="355px">
                                <Column field="Zone" body={zoneBodyTemplate} header="Zone" style={{ width: '5rem' }} />
                                <Column field="total" body={totalBodyTemplate} header="Total" style={{ width: '10rem' }} />
                                <Column field="present" body={presentBodyTemplate} header="Present" style={{ width: '10rem' }} />
                                <Column field="absent" body={absentBodyTemplate} header="Absent" style={{ width: '10rem' }} />
                                <Column field="weakoff" body={weakoffBodyTemplate} header="W/Off" style={{ width: '10rem' }} />
                                <Column field="leave" body={leaveBodyTemplate} header="Leave" style={{ width: '10rem' }} />
                                <Column field="not_log_in" body={notloggedinBodyTemplate} header="Not Logged In" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6 className="pt-2">Zone Wise Summary Chart </h6>
                        <Chart type="bar" data={zoneWiseChart} className="card chainwisechart" options={zoneChartOptions}></Chart>
                    </div>
                </div>}

            </div>
        </div>
    );
};

export default AttendanceAnalysis;
