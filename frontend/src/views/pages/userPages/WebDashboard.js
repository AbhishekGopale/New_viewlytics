import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as XLSX from 'xlsx';
import components from '../primeReactComponentsIndex';
import {
    GetDashboardDetails,
    GetDashboardSosDataRequest,
    GetDashboardOssV2Request,
    GetDashboardUserListRequest,
    GetDashboardReportCounterRequest,
    GetDashboardActivityLogAllRequest,
    GetAttendanceDataChainWiseInDetailRequest,
    GetDashboardUserViewDataRequest,
    handleResetState
} from '../../../redux/slice/UserSlice/userDashboardSlice';

const rolesList = [
    { name: 'Promotor', role_id: 5 },
    { name: 'Merchandiser', role_id: 6 }
];

const WebDashboard = () => {
    const { Button, Tag, Toast, Column, DataTable, Dropdown, Dialog, Divider } = components;
    const toast = useRef(null);
    const dispatch = useDispatch();

    const { userData } = useSelector((state) => state.auth);
    const {
        promoterData,
        merchandiserData,
        tlDashboardData,
        promoterData2,
        merchandiserData2,
        activity,
        reportCounter,
        ossUserData,
        checkoutdata,
        leavedata,
        mapdata,
        userdata,
        inactivedata,
        isLoading
    } = useSelector((state) => state.userDashboard);

    const [selectedRole, setSelectedRole] = useState(rolesList[0]);
    const [isShowMore, setIsShowMore] = useState(false);
    const [expandedRows, setExpandedRows] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    // Initial load
    useEffect(() => {
        dispatch(handleResetState());
        dispatch(GetDashboardDetails({ id: 'tl' }));
        dispatch(GetAttendanceDataChainWiseInDetailRequest());
        dispatch(GetDashboardUserListRequest());
        dispatch(GetDashboardReportCounterRequest());
        dispatch(GetDashboardActivityLogAllRequest());
    }, [dispatch]);

    // Role change effect
    useEffect(() => {
        if (selectedRole?.role_id) {
            dispatch(GetDashboardSosDataRequest({ role_id: selectedRole.role_id }));
            dispatch(GetDashboardOssV2Request({ role_id: selectedRole.role_id }));
        }
    }, [dispatch, selectedRole]);

    // Active attendance values for selected role
    const getRoleAttendance = () => {
        if (selectedRole?.role_id === 5) {
            return {
                check_in: promoterData?.CheckInPromotor ?? promoterData?.check_in ?? promoterData2?.check_in ?? 0,
                check_out: promoterData?.CheckOutPromotor ?? promoterData?.check_out ?? promoterData2?.check_out ?? 0,
                leave: promoterData?.onLeave ?? promoterData?.leave ?? promoterData2?.leave ?? 0,
                week_off: promoterData?.WeekOff ?? promoterData?.week_off ?? promoterData2?.weekOff ?? 0,
                not_login: promoterData?.NotLogin ?? promoterData?.not_login ?? promoterData2?.not_login ?? 0,
                total: promoterData?.totalPromotor ?? promoterData?.total ?? promoterData2?.total ?? 0
            };
        } else if (selectedRole?.role_id === 6) {
            return {
                check_in: merchandiserData?.CheckInMer ?? merchandiserData?.check_in ?? merchandiserData2?.check_in ?? 0,
                check_out: merchandiserData?.CheckOutMer ?? merchandiserData?.check_out ?? merchandiserData2?.check_out ?? 0,
                leave: merchandiserData?.onLeave ?? merchandiserData?.leave ?? merchandiserData2?.leave ?? 0,
                week_off: merchandiserData?.WeekOff ?? merchandiserData?.week_off ?? merchandiserData2?.weekOff ?? 0,
                not_login: merchandiserData?.NotLogin ?? merchandiserData?.not_login ?? merchandiserData2?.not_login ?? 0,
                total: merchandiserData?.totalMer ?? merchandiserData?.total ?? merchandiserData2?.total ?? 0
            };
        } else {
            return {
                check_in: tlDashboardData?.CheckInTl ?? tlDashboardData?.check_in ?? 0,
                check_out: tlDashboardData?.CheckOutTl ?? tlDashboardData?.check_out ?? 0,
                leave: tlDashboardData?.onLeave ?? tlDashboardData?.leave ?? 0,
                week_off: tlDashboardData?.WeekOff ?? tlDashboardData?.week_off ?? 0,
                not_login: tlDashboardData?.NotLogin ?? tlDashboardData?.not_login ?? 0,
                total: tlDashboardData?.totalTl ?? tlDashboardData?.total ?? 0
            };
        }
    };

    const roleStats = getRoleAttendance();

    const getActionBadge = (actionType) => {
        let text = 'login';
        let severity = 'success';
        switch (actionType) {
            case 0: text = 'login'; severity = 'success'; break;
            case 1: text = 'create'; severity = 'success'; break;
            case 2: text = 'update'; severity = 'success'; break;
            case 3: text = 'delete'; severity = 'danger'; break;
            case 4: text = 'import'; severity = 'info'; break;
            case 5: text = 'export'; severity = 'info'; break;
            default: text = 'login'; severity = 'success';
        }
        return <Tag severity={severity} value={text} />;
    };

    const exportActiveUsersExcel = () => {
        if (!checkoutdata || checkoutdata.length === 0) return;
        const dataToExport = checkoutdata.map((item) => ({
            'Full Name': item?.full_name || '-',
            'Store Name': item?.store_name || '-',
            'Date': item?.date || '-',
            'Total Time': item?.total_time || '-',
            'Check In Time': item?.check_in_time || '-',
            'Check Out Time': item?.check_out_time || '-',
            'Check In Lat': item?.check_in_lang || item?.check_in_lat || '-',
            'Check Out Lat': item?.check_out_lang || item?.check_out_lat || '-',
            'Check In Long': item?.check_in_long || '-',
            'Check Out Long': item?.check_out_long || '-'
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Active Users');
        XLSX.writeFile(workbook, 'active_users.xlsx');
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Active Users Report Export Successfully', life: 3000 });
    };

    const exportInactiveUsersExcel = () => {
        if (!inactivedata || inactivedata.length === 0) return;
        const days = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
        const dataToExport = inactivedata.map((item) => ({
            'Full Name': item?.full_name || '-',
            'User Name': item?.user_name || '-',
            'Week Off': days[item?.w_off] || 'Invalid Day'
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inactive Users');
        XLSX.writeFile(workbook, 'inactive_users.xlsx');
        toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Inactive Users Report Export Successfully', life: 3000 });
    };

    const leaveTypeTemplate = (rowData) => {
        let typeStr = 'N/A';
        switch (String(rowData?.leave_type)) {
            case '0': typeStr = 'Casual'; break;
            case '1': typeStr = 'Sick'; break;
            case '2': typeStr = 'Privilege'; break;
            case '3': typeStr = 'Compensatory'; break;
            case '4': typeStr = 'Emergency'; break;
            case '5': typeStr = 'Other'; break;
            default: typeStr = rowData?.leave_type || 'N/A';
        }
        return <span className="capitalize">{typeStr}</span>;
    };

    const weekOffTemplate = (rowData) => {
        const days = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday' };
        return <span>{days[rowData?.w_off] || rowData?.w_off || '-'}</span>;
    };

    return (
        <div className="dashboard mx-4">
            <Toast ref={toast} />
            <div className="grid">
                {/* 1. TL Attendance Row (Rendered if user is not TL) */}
                {userData?.role_id !== 4 && (
                    <div className="flex flex-column col-12 attendence">
                        <div className="flex ml-1 justify-content-between">
                            <h6 className="pt-3">TL Attendance</h6>
                        </div>
                        <div className="border-1 surface-border border-round text-center py-1 card shadow">
                            <div className="p-1">
                                <div className="flex p-1">
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#4CAF50', color: '#ffffff' }}>
                                        <i className="pi pi-sign-in"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.CheckInTl ?? 0}</div>
                                            <div className="text-center">Check In</div>
                                        </div>
                                    </div>
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#FF5252', color: '#ffffff' }}>
                                        <i className="pi pi-sign-out"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.CheckOutTl ?? 0}</div>
                                            <div className="text-center">Check Out</div>
                                        </div>
                                    </div>
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#FFC107', color: '#ffffff' }}>
                                        <i className="pi pi-user-minus"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.onLeave ?? 0}</div>
                                            <div className="text-center">Leave</div>
                                        </div>
                                    </div>
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#2196F3', color: '#ffffff' }}>
                                        <i className="pi pi-exclamation-circle"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.WeekOff ?? 0}</div>
                                            <div className="text-center">Week Off</div>
                                        </div>
                                    </div>
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#9E9E9E', color: '#ffffff' }}>
                                        <i className="pi pi-times-circle"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.NotLogin ?? 0}</div>
                                            <div className="text-center">Not Login</div>
                                        </div>
                                    </div>
                                    <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#9C27B0', color: '#ffffff' }}>
                                        <i className="pi pi-users"></i>
                                        <div className="flex flex-column ml-2">
                                            <div className="text-center">{tlDashboardData?.totalTl ?? 0}</div>
                                            <div className="text-center">Total</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Attendance Row (Promotor / Merchandiser with role dropdown) */}
                <div className="flex flex-column col-12 attendence">
                    <div className="flex ml-1 justify-content-between">
                        <h6 className="pt-3"> Attendance</h6>
                        {userData?.role_id !== 11 && (
                            <Dropdown
                                id="role"
                                className="h-3rem roledropdown border-solid mb-2 mr-2"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.value)}
                                options={rolesList}
                                optionLabel="name"
                                placeholder="Select role"
                            />
                        )}
                    </div>
                    <div className="border-1 surface-border border-round text-center py-1 card shadow">
                        <div className="p-1">
                            <div className="flex p-1">
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#4CAF50', color: '#ffffff' }}>
                                    <i className="pi pi-sign-in"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.check_in}</div>
                                        <div className="text-center">Check In</div>
                                    </div>
                                </div>
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#FF5252', color: '#ffffff' }}>
                                    <i className="pi pi-sign-out"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.check_out}</div>
                                        <div className="text-center">Check Out</div>
                                    </div>
                                </div>
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#FFC107', color: '#ffffff' }}>
                                    <i className="pi pi-user-minus"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.leave}</div>
                                        <div className="text-center">Leave</div>
                                    </div>
                                </div>
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#2196F3', color: '#ffffff' }}>
                                    <i className="pi pi-exclamation-circle"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.week_off}</div>
                                        <div className="text-center">Week Off</div>
                                    </div>
                                </div>
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#9E9E9E', color: '#ffffff' }}>
                                    <i className="pi pi-times-circle"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.not_login}</div>
                                        <div className="text-center">Not Login</div>
                                    </div>
                                </div>
                                <div className="card w-7 m-1 p-2 sales-box flex flex-row justify-content-center align-items-center gap-3" style={{ background: '#9C27B0', color: '#ffffff' }}>
                                    <i className="pi pi-users"></i>
                                    <div className="flex flex-column ml-2">
                                        <div className="text-center">{roleStats.total}</div>
                                        <div className="text-center">Total</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. User List Section */}
                <div className="col-12 text-center my-2">
                    <span className="p-tag">User List</span>
                </div>
                <div className="flex col-12 gap-3 justify-content-center">
                    <div className="col-12 px-2 shadow card">
                        <h6 className="pt-2">User List</h6>
                        <DataTable
                            dataKey="id"
                            showGridlines
                            stripedRows
                            value={isShowMore ? ossUserData : (ossUserData?.slice(0, 5) || [])}
                            scrollable
                        >
                            <Column
                                field="npm"
                                sortable
                                header="NPM"
                                body={(e) => <div className="flex capitalize">{e.npm && e.npm.trim() ? e.npm : 'N/A'}</div>}
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="ta"
                                sortable
                                header="TA"
                                body={(e) => <div className="flex capitalize">{e.ta && e.ta.trim() ? e.ta : 'N/A'}</div>}
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="asm"
                                sortable
                                header="ASM"
                                body={(e) => <div className="flex capitalize">{e.asm && e.asm.trim() ? e.asm : 'N/A'}</div>}
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="tl"
                                sortable
                                header="TL"
                                body={(e) => <div className="flex capitalize">{e.tl && e.tl.trim() ? e.tl : 'N/A'}</div>}
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
                                                dispatch(GetDashboardUserViewDataRequest({ store_id: rowData.store_ids }));
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
                                href="#/"
                                className="title text-sm"
                                onClick={(e) => { e.preventDefault(); setIsShowMore(!isShowMore); }}
                            >
                                {isShowMore ? 'Show Less' : 'Show More'}
                            </a>
                        </div>
                    </div>
                </div>

                {/* 4. Activity Logs & Report Counter Section */}
                <div className="col-12 text-center my-2">
                    <span className="p-tag">Activity Logs & Report Counter</span>
                </div>
                <div className="flex col-12 gap-3 justify-content-center">
                    {/* Activity Logs */}
                    <div className="col-6 px-2 card mb-0 shadow">
                        <div className="flex ml-1 justify-content-between">
                            <h6 className="pt-2 profile"> Activity Logs </h6>
                        </div>
                        <div className="dashboardtable">
                            <DataTable
                                showGridlines
                                stripedRows
                                value={activity || []}
                                scrollable
                                scrollHeight="250px"
                                expandedRows={expandedRows}
                                onRowToggle={(e) => setExpandedRows(e.data)}
                                rowExpansionTemplate={(e) => (
                                    <div className="p-3 expandtable">
                                        <DataTable value={[e]} className="datatable-responsive row_expand_show_title">
                                            <Column field="action" header="Action" headerStyle={{ width: '12%', minWidth: '4rem' }} />
                                        </DataTable>
                                    </div>
                                )}
                            >
                                <Column expander style={{ width: '2%' }} />
                                <Column
                                    field="username"
                                    sortable
                                    body={(e) => (
                                        <span className="capitalize ml-2">
                                            {`${e.User?.first_name || ''} ${e.User?.last_name || ''}`.trim() || e.user_type || 'User'}
                                        </span>
                                    )}
                                    header="Full name"
                                    style={{ width: '13rem' }}
                                />
                                <Column field="user_type" sortable header="Role" style={{ width: '5rem' }} />
                                <Column
                                    field="timestamp"
                                    sortable
                                    body={(e) => (
                                        <span className="ml-2">
                                            {moment(e.timestamp).format('YYYY-MM-DD h:mm:ss a')}
                                        </span>
                                    )}
                                    header="Last Date"
                                    style={{ width: '15rem' }}
                                />
                                <Column
                                    field="action_type"
                                    sortable
                                    header="Action Type"
                                    body={(e) => (
                                        <div className="actions flex justify-content-center capitalize">
                                            {getActionBadge(e.action_type)}
                                        </div>
                                    )}
                                    style={{ width: '5rem' }}
                                />
                            </DataTable>
                        </div>
                    </div>

                    {/* Report Download Counter */}
                    <div className="col-6 px-2 card mb-0 shadow">
                        <h6 className="pt-2 profile">Report Download Counter</h6>
                        <div className="dashboardtable">
                            <DataTable
                                showGridlines
                                stripedRows
                                value={reportCounter || []}
                                scrollable
                                scrollHeight="250px"
                            >
                                <Column
                                    field="username"
                                    sortable
                                    body={(e) => (
                                        <span className="capitalize ml-2">
                                            {`${e.user?.first_name || ''} ${e.user?.last_name || ''}`.trim() || 'User'}
                                        </span>
                                    )}
                                    header="Full name"
                                    style={{ width: '15rem' }}
                                />
                                <Column field="date" sortable header="Last Date" style={{ width: '20rem' }} />
                                <Column field="report_name" sortable header="Report" style={{ width: '20rem' }} />
                                <Column field="download_count" sortable header="Download Count" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>
                </div>

                {/* User Details Dialog Modal */}
                <Dialog
                    visible={dialogVisible}
                    style={{ width: '90vw' }}
                    header="User Details"
                    modal
                    className="p-fluid usercreation"
                    onHide={() => {
                        setDialogVisible(false);
                        dispatch(handleResetState());
                    }}
                >
                    <div className="flex justify-content-between align-items-center">
                        <h5 className="title mt-2">Active Users</h5>
                        <Button
                            label="Active Users Export Excel"
                            icon="pi pi-download"
                            className="p-button-outlined p-button-success"
                            onClick={exportActiveUsersExcel}
                            disabled={!checkoutdata || checkoutdata.length === 0}
                        />
                    </div>
                    <DataTable
                        showGridlines
                        loading={isLoading}
                        stripedRows
                        emptyMessage="No record found."
                        className="mb-2 card shadow userlist-card"
                        value={checkoutdata || []}
                    >
                        <Column field="date" header="Date" />
                        <Column field="user_id" header="User ID" />
                        <Column field="full_name" header="Full Name" />
                        <Column field="store_name" header="Store Name" />
                        <Column field="total_time" header="Total Time" />
                        <Column field="check_in_time" header="Check-In Time" />
                        <Column field="check_in_long" header="Check-In Long" />
                        <Column field="check_in_lang" header="Check-In Lat" />
                        <Column field="check_out_time" header="Check-Out Time" />
                        <Column field="check_out_long" header="Check-Out Long" />
                        <Column field="check_out_lang" header="Check-Out Lat" />
                    </DataTable>

                    <Divider align="center"><span className="p-tag">Leave List</span></Divider>
                    <DataTable
                        showGridlines
                        loading={isLoading}
                        stripedRows
                        emptyMessage="No record found."
                        className="mb-2 card shadow userlist-card"
                        value={leavedata || []}
                    >
                        <Column field="date" header="Date" />
                        <Column field="user_id" header="User ID" />
                        <Column field="full_name" header="Full Name" />
                        <Column field="role" header="Role" />
                        <Column field="leave_type" body={leaveTypeTemplate} header="Leave Type" />
                    </DataTable>

                    <Divider align="center"><span className="p-tag">Map List</span></Divider>
                    <DataTable
                        showGridlines
                        loading={isLoading}
                        stripedRows
                        emptyMessage="No record found."
                        className="mb-2 card shadow userlist-card"
                        value={mapdata || []}
                    >
                        <Column field="date" header="Date" />
                        <Column field="role" header="Role" />
                        <Column field="user_id" header="User ID" />
                        <Column field="user_name" header="User Name" />
                        <Column field="time" header="Time" />
                        <Column field="imei_number" header="IMEI No" />
                        <Column field="battery" header="Battery" />
                        <Column field="lat" header="Lat" />
                        <Column field="long" header="Long" />
                        <Column field="speed" header="Speed" />
                    </DataTable>

                    <Divider align="center"><span className="p-tag">User List</span></Divider>
                    <DataTable
                        showGridlines
                        loading={isLoading}
                        stripedRows
                        emptyMessage="No record found."
                        className="mb-2 card shadow userlist-card"
                        value={userdata || []}
                    >
                        <Column field="first_name" header="First Name" />
                        <Column field="user_name" header="User Name" />
                        <Column field="w_off" body={weekOffTemplate} header="Week Off" />
                    </DataTable>

                    <div className="flex justify-content-between align-items-center mt-3">
                        <h5 className="title m-0">Inactive Users</h5>
                        <Button
                            label="Inactive Users Export Excel"
                            icon="pi pi-download"
                            className="p-button-outlined p-button-success"
                            onClick={exportInactiveUsersExcel}
                            disabled={!inactivedata || inactivedata.length === 0}
                        />
                    </div>
                    <DataTable
                        showGridlines
                        loading={isLoading}
                        stripedRows
                        emptyMessage="No record found."
                        className="mb-2 card shadow userlist-card"
                        value={inactivedata || []}
                    >
                        <Column field="full_name" className="capitalize" header="Full Name" />
                        <Column field="user_name" className="capitalize" header="User Name" />
                        <Column field="w_off" body={weekOffTemplate} header="Week Off" />
                    </DataTable>
                </Dialog>
            </div>
        </div>
    );
};

export default WebDashboard;
