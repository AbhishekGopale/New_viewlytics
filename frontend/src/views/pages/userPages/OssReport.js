import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import * as XLSX from 'xlsx';
import {
    GetDashboardUserListRequest,
    GetOutOFStockDataRequest,
    getSkuWiseCountOfStoreRequest,
    GetOutOfStockUserDataRequest,
    handleResetState
} from '../../../redux/slice/UserSlice/userDashboardSlice';

const OssReport = () => {
    const dispatch = useDispatch();
    const {
        ossData,
        skuWiseCountOfStoreData,
        ossUserData,
        ossUserViewData,
        isLoading
    } = useSelector((state) => state.userDashboard);

    const [chainGroupMap, setChainGroupMap] = useState([]);
    const [selectedStoreSku, setSelectedStoreSku] = useState([]);
    const [skuViewVisible, setSkuViewVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentSkuList, setCurrentSkuList] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [expandedUserIds, setExpandedUserIds] = useState([]);

    useEffect(() => {
        if (skuWiseCountOfStoreData?.length) {
            setSelectedStoreSku(skuWiseCountOfStoreData[0]);
        }
    }, [skuWiseCountOfStoreData]);

    useEffect(() => {
        if (ossData && ossData.hasOwnProperty('oss_data')) {
            setChainGroupMap(ossData.oss_data?.chainGroupMap || []);
        }
    }, [ossData]);

    useEffect(() => {
        dispatch(GetDashboardUserListRequest());
        dispatch(GetOutOFStockDataRequest());
        dispatch(getSkuWiseCountOfStoreRequest());
    }, [dispatch]);

    const handleExportExcel = (userId) => {
        const userItem = ossUserViewData?.find((t) => t.userIds === userId);
        if (!userItem?.oosData || userItem.oosData === '') return;

        const dataToExport = userItem.oosData.map((item) => ({
            'Date': item?.date || '',
            'Full Name': item?.full_name || '',
            'Role': item?.role_name || '',
            'Chain Name': item?.chain_name || '',
            'Store Name': item?.store_name || '',
            'Category Name': item?.category_name || '',
            'SKU Full Name': item?.sku_full_name || '',
            'SKU No': item?.sku_no || '',
            'Status': item?.oos_status === '1' ? 'Out Of Stock' : 'No Out Of Stock'
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 15 }
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'OSS Reports');
        XLSX.writeFile(workbook, 'oss_reports.xlsx');
    };

    const userList = ossUserData || [];

    return (
        <div className="attendanceanalysis mx-4 mt-2">
            <div className="grid">
                {/* Title */}
                <div className="col-12 px-1 pb-0">
                    <h6 className="pt-1">User Wise Out Of Stock Data</h6>
                </div>

                {/* User List Table */}
                <div className="col-12 px-2 shadow card">
                    <DataTable
                        dataKey="id"
                        showGridlines={true}
                        stripedRows={true}
                        value={showAllUsers ? userList : userList.slice(0, 10)}
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
                                            dispatch(GetOutOfStockUserDataRequest({ store_id: rowData.store_ids }));
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

                {/* SKU View Dialog */}
                <Dialog
                    visible={skuViewVisible}
                    style={{ width: '45vw' }}
                    header="SKU View"
                    modal={true}
                    className="p-fluid usercreation"
                    onHide={() => setSkuViewVisible(false)}
                >
                    <DataTable
                        value={currentSkuList}
                        dataKey="chian_id"
                        id="skuview"
                        className="skulist mt-5 mb-3"
                        showGridlines={true}
                        stripedRows={true}
                        emptyMessage="No record found."
                        tableStyle={{ minWidth: '10rem' }}
                    >
                        <Column
                            field="Sr. No"
                            header="Sr. No"
                            body={(rowData) => (
                                <div className="flex flex-column justify-content-center srno align-items-center">
                                    {rowData.sku?.map((_, idx) => (
                                        <li className="list-none" key={idx}>
                                            {idx + 1}
                                        </li>
                                    ))}
                                </div>
                            )}
                            style={{ width: '15%' }}
                        />
                        <Column
                            field="sku"
                            header="SKU"
                            body={(rowData) => (
                                <div className="flex flex-column" style={{ width: '100%' }}>
                                    {rowData.sku?.map((item, idx) => (
                                        <li className="list-none" key={idx}>
                                            {item}
                                        </li>
                                    ))}
                                </div>
                            )}
                            className="flex"
                            style={{ width: '100%' }}
                        />
                    </DataTable>
                </Dialog>

                {/* User Details Dialog */}
                <Dialog
                    visible={dialogVisible}
                    style={{ width: '90vw' }}
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
                        value={ossUserViewData}
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
                        const userItem = ossUserViewData?.find((t) => t.userIds === uid);
                        return (
                            <div key={uid}>
                                <div className="flex justify-content-between">
                                    <h5 className="title mt-3">User ID: {uid}</h5>
                                    <div className="flex align-items-center justify-content-center">
                                        <span className="pi pi-check mr-3" style={{ color: 'green' }}>
                                            {' '}
                                            : No Out Of Stock
                                        </span>
                                        <span className="pi pi-times ml-3" style={{ color: 'red' }}>
                                            {' '}
                                            : Out Of Stock
                                        </span>
                                    </div>
                                    <div>
                                        <Button
                                            label="Export Excel"
                                            disabled={!userItem?.oosData || userItem.oosData === ''}
                                            icon="pi pi-download"
                                            className="p-button-outlined mt-1 p-button-success ml-auto"
                                            onClick={() => handleExportExcel(uid)}
                                        />
                                    </div>
                                </div>
                                <DataTable
                                    className="mb-2 card shadow userlist-card"
                                    loading={isLoading}
                                    value={userItem?.oosData}
                                    showGridlines={true}
                                    stripedRows={true}
                                    emptyMessage="No record found."
                                >
                                    <Column field="date" header="Date" />
                                    <Column field="full_name" className="capitalize" header="Full Name" />
                                    <Column field="role_name" className="capitalize" header="Role" />
                                    <Column field="chain_name" className="capitalize" header="Chain" />
                                    <Column field="store_name" className="capitalize" header="Store" />
                                    <Column field="category_name" className="capitalize" header="Category" />
                                    <Column field="sku_full_name" header="SKU Full Name" />
                                    <Column field="sku_no" header="SKU No" />
                                    <Column
                                        field="oos_status"
                                        header="OOS Status"
                                        body={(rowData) =>
                                            rowData.oos_status === '0' ? (
                                                <Button
                                                    icon="pi pi-check"
                                                    className="p-button-rounded p-button-text"
                                                    style={{ color: 'green' }}
                                                />
                                            ) : (
                                                <Button
                                                    icon="pi pi-times"
                                                    className="p-button-rounded p-button-text"
                                                    style={{ color: 'red' }}
                                                />
                                            )
                                        }
                                    />
                                </DataTable>
                            </div>
                        );
                    })}
                </Dialog>
            </div>
        </div>
    );
};

export default OssReport;
