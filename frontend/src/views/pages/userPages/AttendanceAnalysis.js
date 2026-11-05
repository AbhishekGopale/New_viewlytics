import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Divider } from 'primereact/divider';
import * as XLSX from 'xlsx';
import {
    GetDashboardUserListRequest,
    getAttendanceReportRequest,
    GetAttendanceUserDataRequest,
    handleResetState
} from '../../../redux/slice/UserSlice/userDashboardSlice';

const AttendanceAnalysis = () => {
    const dispatch = useDispatch();
    const {
        attendanceData,
        ossUserData,
        isLoading,
        attendanceUserViewData
    } = useSelector((state) => state.userDashboard);

    const [selectedChainMerchandiser, setSelectedChainMerchandiser] = useState([]);
    const [merchandiserChartData, setMerchandiserChartData] = useState([]);
    const [selectedChainPromoter, setSelectedChainPromoter] = useState([]);
    const [promoterChartData, setPromoterChartData] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [expandedUserIds, setExpandedUserIds] = useState([]);

    const dayStatusTemplate = (rowData) => (
        <React.Fragment>
            {rowData?.day_status === '0' ? <Tag value="Working" /> : null}
            {rowData?.day_status === '1' ? <Tag severity="info" value="Holiday" /> : null}
            {rowData?.day_status === '2' ? <Tag severity="warning" value="Weekend" /> : null}
        </React.Fragment>
    );

    const timeStatusTemplate = (rowData) => (
        <React.Fragment>
            {rowData?.time_status === '1' ? (
                <Tag severity="success" value="Present" />
            ) : (
                <Tag severity="danger" value="Absent" />
            )}
        </React.Fragment>
    );

    const merchandiserBarChartData = {
        labels: ['Present', 'Absent', 'W/Off', 'Leave', 'Not Login'],
        datasets: [
            {
                barPercentage: 0.9,
                barThickness: 35,
                maxBarThickness: 35,
                minBarLength: 5,
                type: 'bar',
                label: 'Attendance Summary',
                data: merchandiserChartData,
                backgroundColor: ['#4CAF50', '#FF5252', '#2196F3', '#FFC107', '#9E9E9E']
            }
        ]
    };

    const promoterBarChartData = {
        labels: ['Present', 'Absent', 'W/Off', 'Leave', 'Not Login'],
        datasets: [
            {
                barPercentage: 0.9,
                barThickness: 35,
                maxBarThickness: 35,
                minBarLength: 5,
                type: 'bar',
                label: 'Attendance Summary',
                data: promoterChartData,
                backgroundColor: ['#4CAF50', '#FF5252', '#2196F3', '#FFC107', '#9E9E9E']
            }
        ]
    };

    const chartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: ['rgb(0,0,0)'],
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
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    };

    // Totals for Merchandiser
    const totalMerchCheckIn = attendanceData?.reduce((acc, item) => acc + (item.merchandiser_id?.[0]?.check_in || 0), 0) || 0;
    const totalMerchCheckOut = attendanceData?.reduce((acc, item) => acc + (item.merchandiser_id?.[0]?.check_out || 0), 0) || 0;
    const totalMerchWeekOff = attendanceData?.reduce((acc, item) => acc + (item.merchandiser_id?.[0]?.weekOff || 0), 0) || 0;
    const totalMerchLeave = attendanceData?.reduce((acc, item) => acc + (item.merchandiser_id?.[0]?.leave || 0), 0) || 0;
    const totalMerchNotLogin = attendanceData?.reduce((acc, item) => acc + (item.merchandiser_id?.[0]?.not_login || 0), 0) || 0;

    const merchandiserFooterGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totals:" footerStyle={{ textAlign: 'center' }} />
                <Column footer={totalMerchCheckIn} style={{ textAlign: 'center' }} />
                <Column footer={totalMerchCheckOut} style={{ textAlign: 'center' }} />
                <Column footer={totalMerchWeekOff} style={{ textAlign: 'center' }} />
                <Column footer={totalMerchLeave} style={{ textAlign: 'center' }} />
                <Column footer={totalMerchNotLogin} style={{ textAlign: 'center' }} />
            </Row>
        </ColumnGroup>
    );

    // Totals for Promoter
    const totalPromoCheckIn = attendanceData?.reduce((acc, item) => acc + (item.promoter_id?.[0]?.check_in || 0), 0) || 0;
    const totalPromoCheckOut = attendanceData?.reduce((acc, item) => acc + (item.promoter_id?.[0]?.check_out || 0), 0) || 0;
    const totalPromoWeekOff = attendanceData?.reduce((acc, item) => acc + (item.promoter_id?.[0]?.weekOff || 0), 0) || 0;
    const totalPromoLeave = attendanceData?.reduce((acc, item) => acc + (item.promoter_id?.[0]?.leave || 0), 0) || 0;
    const totalPromoNotLogin = attendanceData?.reduce((acc, item) => acc + (item.promoter_id?.[0]?.not_login || 0), 0) || 0;

    const promoterFooterGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totals:" footerStyle={{ textAlign: 'center' }} />
                <Column footer={totalPromoCheckIn} style={{ textAlign: 'center' }} />
                <Column footer={totalPromoCheckOut} style={{ textAlign: 'center' }} />
                <Column footer={totalPromoWeekOff} style={{ textAlign: 'center' }} />
                <Column footer={totalPromoLeave} style={{ textAlign: 'center' }} />
                <Column footer={totalPromoNotLogin} style={{ textAlign: 'center' }} />
            </Row>
        </ColumnGroup>
    );

    const carouselResponsiveOptions = [
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
        dispatch(GetDashboardUserListRequest());
        dispatch(getAttendanceReportRequest());
    }, [dispatch]);

    useEffect(() => {
        if (attendanceData && attendanceData.length > 0) {
            if (attendanceData[0]?.merchandiser_id?.[0]) {
                const m = attendanceData[0].merchandiser_id[0];
                setMerchandiserChartData([
                    m.check_in || 0,
                    m.check_out || 0,
                    m.weekOff || 0,
                    m.leave || 0,
                    m.not_login || 0
                ]);
                setSelectedChainMerchandiser(m);
            }
            if (attendanceData[0]?.promoter_id?.[0]) {
                const p = attendanceData[0].promoter_id[0];
                setPromoterChartData([
                    p.check_in || 0,
                    p.check_out || 0,
                    p.weekOff || 0,
                    p.leave || 0,
                    p.not_login || 0
                ]);
                setSelectedChainPromoter(p);
            }
        }
    }, [attendanceData]);

    const chainNameBodyTemplate = (rowData) => {
        const chainName = rowData?.merchandiser_id?.[0]?.chain_name || rowData?.promoter_id?.[0]?.chain_name;
        return (
            <div className="flex capitalize justify-content-center">
                {chainName && chainName !== ' ' ? chainName : 'N/A'}
            </div>
        );
    };

    const handleExportExcel = (userId) => {
        const userItem = attendanceUserViewData?.find((t) => t.userIds === userId);
        if (!userItem?.attendanceData || userItem.attendanceData === '') return;

        const dataToExport = userItem.attendanceData.map((item) => ({
            'Full Name': item?.full_name || '',
            'Role': item?.role_name || '',
            'Date': item?.date || '',
            'Total Hour': item?.total_hour || '',
            'Day Status': item?.day_status === '0' ? 'Working' : item?.day_status === '1' ? 'Holiday' : 'Weekend',
            'Time Status': item?.time_status === '0' ? 'Absent' : 'Present'
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 }
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Reports');
        XLSX.writeFile(workbook, 'attendance_reports.xlsx');
    };

    return (
        <div className="attendanceanalysis mx-4 mt-2">
            <div className="grid">
                {/* Chain Wise (Merchandiser) */}
                <div className="col-12 px-1">
                    <h6 className="pt-1">Chain Wise (Merchandiser)</h6>
                    <div className="col-12 mb-1 card shadow">
                        {attendanceData && Array.isArray(attendanceData) && (
                            <Carousel
                                value={attendanceData}
                                numVisible={3}
                                showIndicators={false}
                                numScroll={1}
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={(item) => (
                                    <div className="flex p-1">
                                        <div
                                            className="card w-10 m-1 p-3 sales-box"
                                            style={{
                                                backgroundColor: item?.merchandiser_id?.[0]?.bgcolor || '#9C27B0',
                                                color: 'white'
                                            }}
                                        >
                                            <div className="mb-2 text-center capitalize text-base">
                                                {item?.merchandiser_id?.[0]?.chain_name ?? 'N/A'}
                                            </div>
                                            <div className="text-center">
                                                {item?.merchandiser_id?.[0]?.check_in || 0} Check In / {item?.merchandiser_id?.[0]?.total || 0} Total Users
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    </div>
                </div>

                {/* Chain Wise (Promoter) */}
                <div className="col-12 px-1">
                    <h6 className="pt-1">Chain Wise (Promoter)</h6>
                    <div className="col-12 mb-1 card shadow">
                        {attendanceData && Array.isArray(attendanceData) && (
                            <Carousel
                                value={attendanceData}
                                numVisible={3}
                                showIndicators={false}
                                numScroll={1}
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={(item) => (
                                    <div className="flex p-1">
                                        <div
                                            className="card w-10 m-1 p-3 sales-box"
                                            style={{
                                                backgroundColor: item?.promoter_id?.[0]?.bgcolor || '#673AB7',
                                                color: 'white'
                                            }}
                                        >
                                            <div className="mb-2 text-center capitalize text-base">
                                                {item?.promoter_id?.[0]?.chain_name ?? 'N/A'}
                                            </div>
                                            <div className="text-center">
                                                {item?.promoter_id?.[0]?.check_in || 0} Check In / {item?.promoter_id?.[0]?.total || 0} Total Users
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                    </div>
                </div>

                {/* User List Divider */}
                <Divider align="center">
                    <span className="p-tag">User List</span>
                </Divider>

                {/* User List Table */}
                <div className="flex col-12 gap-3 justify-content-center">
                    <div className="col-12 px-2 shadow card">
                        <h6 className="pt-2">User List</h6>
                        <DataTable
                            dataKey="id"
                            showGridlines={true}
                            stripedRows={true}
                            value={showAllUsers ? ossUserData : ossUserData?.slice(0, 5)}
                            scrollable={true}
                        >
                            <Column
                                field="npm"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.npm && rowData.npm !== ' ' ? rowData.npm : 'N/A'}
                                    </div>
                                )}
                                sortable={true}
                                header="NPM"
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="ta"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.ta && rowData.ta !== ' ' ? rowData.ta : 'N/A'}
                                    </div>
                                )}
                                sortable={true}
                                header="TA"
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="asm"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.asm && rowData.asm !== ' ' ? rowData.asm : 'N/A'}
                                    </div>
                                )}
                                sortable={true}
                                header="ASM"
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="tl"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.tl && rowData.tl !== ' ' ? rowData.tl : 'N/A'}
                                    </div>
                                )}
                                sortable={true}
                                header="TL"
                                style={{ width: '20rem' }}
                            />
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <div className="actions flex justify-content-center">
                                        <Button
                                            tooltip="View"
                                            tooltipOptions={{ position: 'top' }}
                                            icon="pi pi-eye"
                                            className="p-button-rounded p-button-text p-button-help"
                                            onClick={() => {
                                                dispatch(GetAttendanceUserDataRequest({ store_id: rowData.store_ids }));
                                                setDialogVisible(true);
                                            }}
                                        />
                                    </div>
                                )}
                                style={{ width: '5rem' }}
                            />
                        </DataTable>
                        <div className="flex justify-content-end mt-1">
                            <a
                                href="#"
                                className="title text-sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowAllUsers(!showAllUsers);
                                }}
                            >
                                {showAllUsers ? 'Show Less' : 'Show More'}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Chain Summary Divider */}
                <Divider align="center">
                    <span className="p-tag">Chain Summary</span>
                </Divider>

                {/* Merchandiser Chain Wise Summary & Chart */}
                <div className="flex col-12 gap-3 justify-content-center">
                    <div className="col-6 px-2 shadow card">
                        <h6 className="pt-2">Chain Wise Summary (Merchandiser) </h6>
                        <div className="chainwisechart">
                            <DataTable
                                footerColumnGroup={merchandiserFooterGroup}
                                className="webdatatable"
                                selectionMode="single"
                                selection={selectedChainMerchandiser}
                                onSelectionChange={(e) => {
                                    setSelectedChainMerchandiser(e.value?.merchandiser_id);
                                    if (e.value?.merchandiser_id?.[0]) {
                                        const m = e.value.merchandiser_id[0];
                                        setMerchandiserChartData([
                                            m.check_in || 0,
                                            m.check_out || 0,
                                            m.weekOff || 0,
                                            m.leave || 0,
                                            m.not_login || 0
                                        ]);
                                    }
                                }}
                                dataKey="chain"
                                showGridlines={true}
                                stripedRows={true}
                                emptyMessage="No record found."
                                value={attendanceData}
                                scrollable={true}
                                tableStyle={{ minWidth: '30rem' }}
                                scrollHeight="250px"
                            >
                                <Column field="chain_name" body={chainNameBodyTemplate} sortable={true} header="Chain" style={{ width: '8rem' }} />
                                <Column
                                    field="promotor_count"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.merchandiser_id?.[0]?.check_in !== undefined ? e?.merchandiser_id?.[0]?.check_in : 'N/A'}
                                        </div>
                                    )}
                                    header="Present"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="AbsentPro"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.merchandiser_id?.[0]?.check_out !== undefined ? e?.merchandiser_id?.[0]?.check_out : 'N/A'}
                                        </div>
                                    )}
                                    header="Absent"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="w_off"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.merchandiser_id?.[0]?.weekOff !== undefined ? e?.merchandiser_id?.[0]?.weekOff : 'N/A'}
                                        </div>
                                    )}
                                    header="W/Off"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="leave"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.merchandiser_id?.[0]?.leave !== undefined ? e?.merchandiser_id?.[0]?.leave : 'N/A'}
                                        </div>
                                    )}
                                    header="Leave"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="not_login"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.merchandiser_id?.[0]?.not_login !== undefined ? e?.merchandiser_id?.[0]?.not_login : 'N/A'}
                                        </div>
                                    )}
                                    header="Not Logged In"
                                    style={{ width: '1rem' }}
                                />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6 px-2 shadow card mb-5">
                        <h6 className="pt-2">Chain Wise Summary Chart (Merchandiser) </h6>
                        <Chart
                            type="bar"
                            className="chainwisechart"
                            data={merchandiserBarChartData}
                            options={chartOptions}
                        />
                    </div>
                </div>

                {/* Promoter Chain Wise Summary & Chart */}
                <div className="flex col-12 gap-3 justify-content-center">
                    <div className="col-6 px-2 shadow card">
                        <h6 className="pt-2">Chain Wise Summary (Promoter) </h6>
                        <div className="chainwisechart">
                            <DataTable
                                footerColumnGroup={promoterFooterGroup}
                                className="webdatatable"
                                selectionMode="single"
                                selection={selectedChainPromoter}
                                onSelectionChange={(e) => {
                                    setSelectedChainPromoter(e.value?.promoter_id);
                                    if (e.value?.promoter_id?.[0]) {
                                        const p = e.value.promoter_id[0];
                                        setPromoterChartData([
                                            p.check_in || 0,
                                            p.check_out || 0,
                                            p.weekOff || 0,
                                            p.leave || 0,
                                            p.not_login || 0
                                        ]);
                                    }
                                }}
                                dataKey="chain"
                                showGridlines={true}
                                stripedRows={true}
                                emptyMessage="No record found."
                                value={attendanceData}
                                scrollable={true}
                                tableStyle={{ minWidth: '30rem' }}
                                scrollHeight="250px"
                            >
                                <Column field="chain_name" body={chainNameBodyTemplate} sortable={true} header="Chain" style={{ width: '8rem' }} />
                                <Column
                                    field="promotor_count"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.promoter_id?.[0]?.check_in !== undefined ? e?.promoter_id?.[0]?.check_in : 'N/A'}
                                        </div>
                                    )}
                                    header="Present"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="AbsentPro"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.promoter_id?.[0]?.check_out !== undefined ? e?.promoter_id?.[0]?.check_out : 'N/A'}
                                        </div>
                                    )}
                                    header="Absent"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="w_off"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.promoter_id?.[0]?.weekOff !== undefined ? e?.promoter_id?.[0]?.weekOff : 'N/A'}
                                        </div>
                                    )}
                                    header="W/Off"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="leave"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.promoter_id?.[0]?.leave !== undefined ? e?.promoter_id?.[0]?.leave : 'N/A'}
                                        </div>
                                    )}
                                    header="Leave"
                                    style={{ width: '1rem' }}
                                />
                                <Column
                                    field="not_login"
                                    body={(e) => (
                                        <div className="flex capitalize justify-content-center">
                                            {e?.promoter_id?.[0]?.not_login !== undefined ? e?.promoter_id?.[0]?.not_login : 'N/A'}
                                        </div>
                                    )}
                                    header="Not Logged In"
                                    style={{ width: '1rem' }}
                                />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6 px-2 shadow card mb-5">
                        <h6 className="pt-2">Chain Wise Summary Chart (Promoter) </h6>
                        <Chart
                            type="bar"
                            className="chainwisechart"
                            data={promoterBarChartData}
                            options={chartOptions}
                        />
                    </div>
                </div>

                {/* User Details Modal Dialog */}
                <Dialog
                    visible={dialogVisible}
                    style={{ width: '80vw' }}
                    header="User Details"
                    modal={true}
                    className="p-fluid usercreation"
                    onHide={() => {
                        setDialogVisible(false);
                        dispatch(handleResetState());
                        setExpandedUserIds([]);
                    }}
                >
                    <DataTable
                        className="m-2"
                        loading={isLoading}
                        value={attendanceUserViewData}
                        showGridlines={true}
                        stripedRows={true}
                        emptyMessage="No record found."
                    >
                        <Column field="username" className="capitalize" header="User Name" />
                        <Column field="userIds" header="User ID" />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <Button
                                    className="p-button-outlined w-2 p-button-text p-button"
                                    onClick={() => {
                                        const uid = rowData.userIds;
                                        if (expandedUserIds.includes(uid)) {
                                            setExpandedUserIds(expandedUserIds.filter((id) => id !== uid));
                                        } else {
                                            setExpandedUserIds([...expandedUserIds, uid]);
                                        }
                                    }}
                                >
                                    {expandedUserIds.includes(rowData.userIds) ? 'Hide' : 'View'}
                                </Button>
                            )}
                        />
                    </DataTable>

                    {expandedUserIds.map((uid) => {
                        const userItem = attendanceUserViewData?.find((t) => t.userIds === uid);
                        return (
                            <div key={uid}>
                                <div className="flex justify-content-between">
                                    <h5 className="title mt-3">User ID: {uid}</h5>
                                    <div>
                                        <Button
                                            label="Export Excel"
                                            icon="pi pi-download"
                                            disabled={!userItem?.attendanceData || userItem?.attendanceData === ''}
                                            className="p-button-outlined mt-1 p-button-success ml-auto"
                                            onClick={() => handleExportExcel(uid)}
                                        />
                                    </div>
                                </div>
                                <DataTable
                                    className="mb-2 card shadow userlist-card"
                                    loading={isLoading}
                                    value={userItem?.attendanceData}
                                    showGridlines={true}
                                    stripedRows={true}
                                    emptyMessage="No record found."
                                >
                                    <Column field="date" header="Date" />
                                    <Column field="full_name" className="capitalize" header="Full Name" />
                                    <Column field="role_name" className="capitalize" header="Role" />
                                    <Column field="total_hour" header="Total Hour" />
                                    <Column field="day_status" body={dayStatusTemplate} header="Day Status" />
                                    <Column field="time_status" body={timeStatusTemplate} header="Status" />
                                </DataTable>
                            </div>
                        );
                    })}
                </Dialog>
            </div>
        </div>
    );
};

export default AttendanceAnalysis;
