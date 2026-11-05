import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import * as XLSX from 'xlsx';
import {
    getSosListRequest,
    getCategoryDataRequest,
    getSosListV2Request,
    GetSosUserDataRequest,
    handleResetState
} from '../../../redux/slice/UserSlice/userDashboardSlice';

const ShairOfShell = () => {
    const dispatch = useDispatch();
    const {
        sosData,
        ossUserData,
        sosUserViewData,
        isLoading
    } = useSelector((state) => state.userDashboard);

    const [selectedChain, setSelectedChain] = useState(null);
    const [selectedRole, setSelectedRole] = useState({ name: 'Promotor', role_id: 5 });
    const [dialogVisible, setDialogVisible] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [expandedUserIds, setExpandedUserIds] = useState([]);

    const roles = [
        { name: 'Promotor', role_id: 5 },
        { name: 'Merchandiser', role_id: 6 }
    ];

    const activeInactiveChartData = useMemo(() => {
        return {
            labels: ['Active Stores', 'Inactive Stores'],
            datasets: [
                {
                    total: selectedChain?.store,
                    data: [selectedChain?.status?.[0] || 0, selectedChain?.status?.[1] || 0],
                    backgroundColor: ['#4CAF50', '#9E9E9E']
                }
            ]
        };
    }, [selectedChain]);

    const activeInactiveChartOptions = useMemo(() => ({
        cutout: '70%'
    }), []);

    const sosSplitChartData = useMemo(() => {
        return {
            labels: ['Store Having <50% SOS', 'Store Having >50% SOS'],
            datasets: [
                {
                    total: selectedChain?.store,
                    data: [selectedChain?.down || 0, selectedChain?.up || 0],
                    backgroundColor: ['#FF5252', '#2196F3']
                }
            ]
        };
    }, [selectedChain]);

    const sosSplitChartOptions = useMemo(() => ({
        cutout: '70%'
    }), []);

    useEffect(() => {
        dispatch(handleResetState());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getSosListRequest());
        dispatch(getCategoryDataRequest());
        if (selectedRole?.role_id) {
            dispatch(getSosListV2Request({ role_id: selectedRole.role_id }));
        }
    }, [dispatch, selectedRole]);

    useEffect(() => {
        if (sosData?.sos_data?.mapping?.[0]) {
            setSelectedChain(sosData.sos_data.mapping[0]);
        }
    }, [sosData]);

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

    const handleExportExcel = (userId) => {
        const userItem = sosUserViewData?.find((t) => t.userIds === userId);
        if (!userItem?.sosData || userItem.sosData === '') return;

        const dataToExport = userItem.sosData.map((item) => ({
            'Store Name': item?.store_name || '',
            'Full Name': item?.full_name || '',
            'Role': item?.role_name || '',
            'Category': item?.category_name || '',
            'Competition Facing': item?.compation_facing || '',
            'Brand Facing': item?.brand_facing || '',
            'SOS Percentage': item?.sos_per || '',
            'Date': item?.date || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 }
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SOS Reports');
        XLSX.writeFile(workbook, 'sos_reports.xlsx');
    };

    const sosMapping = sosData?.sos_data?.mapping || [];

    return (
        <div className="attendanceanalysis mx-4 mt-2">
            <div className="grid">
                {/* Header & Role Dropdown */}
                <div className="col-12 px-1">
                    <div className="flex justify-content-between align-items-center">
                        <h6 className="pt-1">SOS Chain Wise Summary</h6>
                        <Dropdown
                            id="role"
                            className="h-3rem roledropdown border-solid mb-2 mr-2"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.value)}
                            options={roles}
                            optionLabel="name"
                            placeholder="Select role"
                        />
                    </div>

                    {/* SOS Chain Cards Carousel */}
                    <div className="col-12 mb-1 card shadow">
                        {sosMapping.length > 0 && (
                            <Carousel
                                value={sosMapping}
                                numVisible={2}
                                showIndicators={false}
                                numScroll={1}
                                responsiveOptions={carouselResponsiveOptions}
                                itemTemplate={(item) => (
                                    <div className="flex p-1">
                                        <div
                                            className="card w-10 m-1 p-3 sales-box"
                                            style={{
                                                backgroundColor: item?.bgcolor || '#673AB7',
                                                color: 'white'
                                            }}
                                        >
                                            <div className="mb-2 text-center capitalize text-base">
                                                {item?.chain_name}
                                            </div>
                                            <div className="text-center">
                                                Total Store: {item?.store || 0} | Above 50% : {item?.up || 0} | Below 50% : {item?.down || 0}
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
                                sortable={true}
                                header="NPM"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.npm && rowData.npm !== ' ' ? rowData.npm : 'N/A'}
                                    </div>
                                )}
                                style={{ width: '20rem' }}
                            />
                            <Column
                                field="ta"
                                sortable={true}
                                header="TA"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.ta && rowData.ta !== ' ' ? rowData.ta : 'N/A'}
                                    </div>
                                )}
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
                                sortable={true}
                                header="TL"
                                body={(rowData) => (
                                    <div className="flex capitalize">
                                        {rowData.tl && rowData.tl !== ' ' ? rowData.tl : 'N/A'}
                                    </div>
                                )}
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
                                                dispatch(GetSosUserDataRequest({ store_id: rowData.store_ids }));
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

                {/* Chain Wise Summary Table & Doughnut Charts */}
                <div className="flex col-12 gap-3 justify-content-center">
                    <div className="col-6 px-2 card shadow">
                        <div className="flex justify-content-between mb-2">
                            <h6 className="pt-2">Chain Wise Summary </h6>
                        </div>
                        <div className="chainwisechart">
                            <DataTable
                                className="webdatatable"
                                selection={selectedChain}
                                onSelectionChange={(e) => setSelectedChain(e.value)}
                                emptyMessage="No record found."
                                selectionMode="single"
                                dataKey="chain_id"
                                showGridlines={true}
                                stripedRows={true}
                                value={sosMapping}
                                scrollable={true}
                                tableStyle={{ minWidth: '30rem' }}
                                scrollHeight="350px"
                            >
                                <Column
                                    field="chain_name"
                                    sortable={true}
                                    body={(rowData) => <div className="flex capitalize">{rowData.chain_name}</div>}
                                    header="Chain"
                                    style={{ width: '10rem' }}
                                />
                                <Column
                                    field="up"
                                    header="Count Of Store Having < 50% SOS"
                                    body={(rowData) => <span>{rowData.up}</span>}
                                    style={{ width: '10rem' }}
                                />
                                <Column
                                    field="down"
                                    header="Count Of Store Having > 50% SOS"
                                    body={(rowData) => <span>{rowData.down}</span>}
                                    style={{ width: '10rem' }}
                                />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6 px-2 mb-5 card shadow">
                        <h6 className="pt-2">Chain Wise Summary Chart </h6>
                        <div className="flex mt-12 pb-5 soschainwise chainwisechart justify-content-center align-items-center">
                            <Chart
                                style={{ position: 'relative', width: '40%' }}
                                type="doughnut"
                                data={activeInactiveChartData}
                                options={activeInactiveChartOptions}
                            />
                            <Divider layout="vertical" />
                            <Chart
                                style={{ position: 'relative', width: '40%' }}
                                type="doughnut"
                                data={sosSplitChartData}
                                options={sosSplitChartOptions}
                            />
                        </div>
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
                        value={sosUserViewData}
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
                        const userItem = sosUserViewData?.find((t) => t.userIds === uid);
                        return (
                            <div key={uid}>
                                <div className="flex justify-content-between">
                                    <h5 className="title mt-3">User ID: {uid}</h5>
                                    <div>
                                        <Button
                                            label="Export Excel"
                                            icon="pi pi-download"
                                            disabled={!userItem?.sosData || userItem?.sosData === ''}
                                            className="p-button-outlined mt-1 p-button-success ml-auto"
                                            onClick={() => handleExportExcel(uid)}
                                        />
                                    </div>
                                </div>
                                <DataTable
                                    className="mb-2 card shadow userlist-card"
                                    loading={isLoading}
                                    value={userItem?.sosData}
                                    showGridlines={true}
                                    stripedRows={true}
                                    emptyMessage="No record found."
                                >
                                    <Column field="date" header="Date" />
                                    <Column field="full_name" header="Full Name" className="capitalize" />
                                    <Column field="role_name" className="capitalize" header="Role" />
                                    <Column field="store_name" header="Store" className="capitalize" />
                                    <Column field="category_name" header="Category" className="capitalize" />
                                    <Column field="brand_facing" className="text-center" header="Brand Facing" />
                                    <Column field="compation_facing" className="text-center" header="Competition Facing" />
                                    <Column field="sos_per" className="text-center" header="SOS %" />
                                </DataTable>
                            </div>
                        );
                    })}
                </Dialog>
            </div>
        </div>
    );
};

export default ShairOfShell;
