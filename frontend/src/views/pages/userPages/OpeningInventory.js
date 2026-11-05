import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as XLSX from 'xlsx';
import components from '../primeReactComponentsIndex';
import {
    getPromoterUserForReportsRequest,
    getMerchandiserUserForReportsRequest,
    GetOpeningInventoryReportRequest,
    handleResetState
} from '../../../redux/slice/AdminSlice/reportSlice';

const OpeningInventory = () => {
    const { MultiSelect, Button, Calendar, Toast, Dropdown } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);

    const {
        sosPromoterData,
        sosMerchandiserData,
        openingReports,
        successMessage,
        errorMessage,
        isLoading
    } = useSelector((state) => state.reports);

    const [values, setValues] = useState({
        startDate: '',
        endDate: '',
        roleName: '',
        pm_id: []
    });

    // Fetch user list when role changes
    useEffect(() => {
        if (values.roleName === '0') {
            dispatch(getPromoterUserForReportsRequest());
        } else if (values.roleName === '1') {
            dispatch(getMerchandiserUserForReportsRequest());
        }
    }, [dispatch, values.roleName]);

    // Reset report state on mount
    useEffect(() => {
        dispatch(handleResetState());
    }, [dispatch]);

    // Handle export & Excel download
    useEffect(() => {
        if (successMessage) {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: successMessage,
                life: 3000
            });

            if (Array.isArray(openingReports) && openingReports.length > 1) {
                try {
                    const headerObj = openingReports[0]?.Header || [];
                    const dsrList = openingReports[1]?.DSR || [];

                    // Collect dynamic SKU headers
                    const skuHeaders = headerObj.reduce((acc, catObj) => {
                        const skus = Object.values(catObj)[0] || [];
                        acc.push(...skus);
                        return acc;
                    }, []);

                    const excelRows = dsrList.map((item) => {
                        const row = {
                            'Project Name': item.project_name || '-',
                            'User Id': item.userId || '-',
                            'Full Name': item.full_name || '-',
                            'Role': item.role_name || '-',
                            'Email': item.email || '-',
                            'Promoter': item.promoter || '-',
                            'Merchandiser': item.merchandiser || '-',
                            'Chain': item.chain || '-',
                            'System Store Code': item.store_code || '-',
                            'Idonneous Store Code': item.store_code_ids || '-',
                            'Store Name': item.store_name || '-',
                            'Zone': item.zone || '-',
                            'Country': item.country_name || '-',
                            'State': item.state || '-',
                            'City': item.city || '-',
                            'Client SE': item.client_se || '-',
                            'Client ASM': item.client_asm || '-',
                            'Client NPC': item.client_npc || '-',
                            'IDO TL': item.ido_tl || '-',
                            'IDO ASM': item.ido_asm || '-',
                            'IDO TA': item.ido_ta || '-',
                            'IDO NPM': item.ido_npm || '-',
                            'Date': item.date || '-',
                            'Remark': item.remark || '-',
                            'Total Opening': item.total_Opening || 0
                        };

                        // Add SKU values
                        skuHeaders.forEach((skuName) => {
                            const foundSku = item.SKUArray?.find((s) => Object.keys(s)[0] === skuName);
                            row[skuName] = foundSku ? foundSku[skuName] : '-';
                        });

                        return row;
                    });

                    const worksheet = XLSX.utils.json_to_sheet(excelRows);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Openinginventory Data');
                    XLSX.writeFile(workbook, 'openinginventory_report.xlsx');
                } catch (err) {
                    console.error('Error generating Excel file:', err);
                }
            }

            dispatch(handleResetState());
        }

        if (errorMessage) {
            toast.current.show({
                severity: 'error',
                summary: 'Error Message',
                detail: errorMessage,
                life: 3000
            });
            dispatch(handleResetState());
        }
    }, [successMessage, errorMessage, openingReports, dispatch]);

    const handleClear = () => {
        setValues({
            startDate: '',
            endDate: '',
            roleName: '',
            pm_id: []
        });
        dispatch(handleResetState());
    };

    const handleExport = () => {
        dispatch(handleResetState());
        const userIds = (values.pm_id || []).map((id) => parseInt(id));
        const payload = {
            startDate: moment(values.startDate).format('YYYY-MM-DD'),
            endDate: moment(values.endDate).format('YYYY-MM-DD'),
            roleName: values.roleName,
            pm_id: userIds
        };
        dispatch(GetOpeningInventoryReportRequest(payload));
    };

    const roleOptions = [
        { label: 'Promoter', role: '0' },
        { label: 'Merchandiser', role: '1' }
    ];

    const isExportDisabled = !(values.startDate && values.endDate && values.pm_id && values.pm_id.length > 0);

    return (
        <div className="flex px-4 flex-column gap-4 justify-content-start align-items-center w-full">
            <Toast ref={toast} />
            <div className="flex flex-column w-full">
                <div className="flex justify-content-between align-items-center pt-4">
                    <h5 className="title">Opening Inventory</h5>
                </div>
                <div className="card">
                    {/* Date Filters */}
                    <div className="grid p-fluid mt-1">
                        <div className="field col-12 md:col-4 mb-1">
                            <span className="required">From</span>
                            <Calendar
                                inputId="startDate"
                                className="calendar-input"
                                value={values.startDate}
                                onChange={(e) => {
                                    setValues({ ...values, startDate: e.value });
                                    dispatch(handleResetState());
                                }}
                                showButtonBar
                                readOnlyInput
                                placeholder="Select Date"
                                maxDate={new Date()}
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <span className="required">To</span>
                            <Calendar
                                inputId="endDate"
                                className="calendar-input"
                                maxDate={new Date()}
                                showButtonBar
                                value={values.endDate}
                                onChange={(e) => {
                                    setValues({ ...values, endDate: e.value });
                                    dispatch(handleResetState());
                                }}
                                readOnlyInput
                                placeholder="Select Date"
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                    </div>

                    {/* Role & User Filters */}
                    <div className="grid p-fluid mt-1">
                        <div className="field col-12 md:col-4 mb-1">
                            <Dropdown
                                placeholder="Select Role"
                                disabled={!values.startDate || !values.endDate}
                                value={values.roleName}
                                onChange={(e) => {
                                    setValues({ ...values, roleName: e.value, pm_id: [] });
                                    dispatch(handleResetState());
                                }}
                                options={roleOptions}
                                optionLabel="label"
                                optionValue="role"
                            />
                        </div>

                        {values.roleName === '0' && (
                            <div className="field col-12 md:col-4 mb-1">
                                <MultiSelect
                                    placeholder="Select Name"
                                    maxSelectedLabels={3}
                                    filter
                                    display="chip"
                                    value={values.pm_id}
                                    optionLabel="label"
                                    optionValue="value"
                                    onChange={(e) => {
                                        setValues({ ...values, pm_id: e.value });
                                        dispatch(handleResetState());
                                    }}
                                    options={sosPromoterData}
                                />
                            </div>
                        )}

                        {values.roleName === '1' && (
                            <div className="field col-12 md:col-4 mb-1">
                                <MultiSelect
                                    placeholder="Select Name"
                                    maxSelectedLabels={3}
                                    filter
                                    display="chip"
                                    value={values.pm_id}
                                    optionLabel="label"
                                    optionValue="value"
                                    onChange={(e) => {
                                        setValues({ ...values, pm_id: e.value });
                                        dispatch(handleResetState());
                                    }}
                                    options={sosMerchandiserData}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-content-end gap-4 mt-4">
                        <Button
                            label="Export Opening Inventory"
                            loading={isLoading}
                            icon="pi pi-download"
                            className="p-button-outlined p-button-success"
                            disabled={isExportDisabled}
                            onClick={handleExport}
                        />
                        <Button
                            label="Clear"
                            icon="pi pi-times"
                            className="p-button-outlined"
                            onClick={handleClear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpeningInventory;
