import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import * as XLSX from 'xlsx';
import {
    GetDashboardUserListRequest,
    getSalesChainWiseSummaryDataRequest,
    GetSalesAnalysisDataRequest,
    GetSalesUserDataRequest,
    handleResetState
} from '../../../redux/slice/UserSlice/userDashboardSlice';

const SalesAnalysis = () => {
    const dispatch = useDispatch();
    const {
        salesAnalysisData,
        chainSummaryData,
        ossUserData,
        salesUserViewData,
        isLoading
    } = useSelector((state) => state.userDashboard);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        dispatch(GetDashboardUserListRequest());
        dispatch(getSalesChainWiseSummaryDataRequest());
        dispatch(GetSalesAnalysisDataRequest());
    }, [dispatch]);

    const targetTypeTemplate = (rowData) => (
        <div className="actions flex capitalize">
            {rowData.target_type === '0' ? (
                <Tag severity="info" value="Pieces" />
            ) : (
                <Tag severity="success" value="Amount" />
            )}
        </div>
    );

    const handleExportTargetExcel = (userId) => {
        const userItem = salesUserViewData?.find((u) => u.user_id === userId);
        if (!userItem?.targetData) return;

        const dataToExport = userItem.targetData.map((item) => ({
            'Target': item?.target || '',
            'Total Target': item?.total_target || '',
            'Target Type': item?.target_type === '0' ? 'Pieces' : 'Amount',
            'Date': item?.start_date || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [{ wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Target Reports');
        XLSX.writeFile(workbook, 'target_reports.xlsx');
    };

    const handleExportInventoryExcel = (userId) => {
        const userItem = salesUserViewData?.find((u) => u.user_id === userId);
        if (!userItem?.inventoryData) return;

        const dataToExport = userItem.inventoryData.map((item) => ({
            'Category Name': item?.category_name || '',
            'SKU No': item?.sku_no || '',
            'SKU Full Name': item?.sku_full_name || '',
            'Opening Inventory': item?.opning_inventory || '',
            'Closing Inventory': item?.closing_inventory || '',
            'New Inventory': item?.new_inventory || '',
            'Date': item?.date || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
            { wch: 15 },
            { wch: 15 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 },
            { wch: 15 }
        ];
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory Reports');
        XLSX.writeFile(workbook, 'inventory_reports.xlsx');
    };

    const userList = ossUserData || [];

    return (
        <div className="attendanceanalysis mx-4 mt-2">
            <div className="grid">
                {/* Title */}
                <div className="col-12 px-1 pb-0">
                    <h6 className="pt-1">User Wise Sales Data</h6>
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
                                            dispatch(GetSalesUserDataRequest({ store_id: rowData.store_ids }));
                                            setSelectedUserId(rowData.id);
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
                        setSelectedUserId(null);
                    }}
                >
                    {salesUserViewData && Array.isArray(salesUserViewData) && salesUserViewData.map((item, idx) => (
                        <div key={idx} className="mb-4">
                            <h5 className="title mt-2">User: {item?.username || item?.user_id}</h5>

                            {/* Target Data Section */}
                            <div className="card shadow mb-3 p-3">
                                <div className="flex justify-content-between align-items-center mb-2">
                                    <h6 className="m-0">Target Data</h6>
                                    <Button
                                        label="Export Excel"
                                        icon="pi pi-download"
                                        className="p-button-outlined p-button-success"
                                        onClick={() => handleExportTargetExcel(item?.user_id)}
                                        disabled={!item?.targetData || item.targetData.length === 0}
                                    />
                                </div>
                                <DataTable
                                    value={item?.targetData}
                                    showGridlines={true}
                                    stripedRows={true}
                                    emptyMessage="No target record found."
                                >
                                    <Column field="target" header="Target" />
                                    <Column field="total_target" header="Total Target" />
                                    <Column field="target_type" header="Target Type" body={targetTypeTemplate} />
                                    <Column field="start_date" header="Date" />
                                </DataTable>
                            </div>

                            {/* Inventory Data Section */}
                            <div className="card shadow p-3">
                                <div className="flex justify-content-between align-items-center mb-2">
                                    <h6 className="m-0">Inventory Data</h6>
                                    <Button
                                        label="Export Excel"
                                        icon="pi pi-download"
                                        className="p-button-outlined p-button-success"
                                        onClick={() => handleExportInventoryExcel(item?.user_id)}
                                        disabled={!item?.inventoryData || item.inventoryData.length === 0}
                                    />
                                </div>
                                <DataTable
                                    value={item?.inventoryData}
                                    showGridlines={true}
                                    stripedRows={true}
                                    emptyMessage="No inventory record found."
                                >
                                    <Column field="category_name" header="Category Name" />
                                    <Column field="sku_no" header="SKU No" />
                                    <Column field="sku_full_name" header="SKU Full Name" />
                                    <Column field="opning_inventory" header="Opening Inventory" />
                                    <Column field="closing_inventory" header="Closing Inventory" />
                                    <Column field="new_inventory" header="New Inventory" />
                                    <Column field="date" header="Date" />
                                </DataTable>
                            </div>
                        </div>
                    ))}
                </Dialog>
            </div>
        </div>
    );
};

export default SalesAnalysis;
