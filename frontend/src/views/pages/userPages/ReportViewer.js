import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as XLSX from 'xlsx';
import axios from 'axios';
import components from '../primeReactComponentsIndex';
import {
    getPromoterUserForReportsRequest,
    getMerchandiserUserForReportsRequest,
    handleResetState
} from '../../../redux/slice/AdminSlice/reportSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL || '/api/v1';

const ReportViewer = ({
    title = 'Report',
    endpoint = '/web/report/opening_inventory',
    sheetName = 'Report Data',
    filename = 'report.xlsx'
}) => {
    const { MultiSelect, Button, Calendar, Toast, Dropdown } = components;
    const dispatch = useDispatch();
    const toast = useRef(null);

    const { sosPromoterData, sosMerchandiserData } = useSelector((state) => state.reports);
    const { token } = useSelector((state) => state.auth);

    const [values, setValues] = useState({
        startDate: '',
        endDate: '',
        roleName: '',
        pm_id: []
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (values.roleName === '0') {
            dispatch(getPromoterUserForReportsRequest());
        } else if (values.roleName === '1') {
            dispatch(getMerchandiserUserForReportsRequest());
        }
    }, [dispatch, values.roleName]);

    useEffect(() => {
        dispatch(handleResetState());
    }, [dispatch]);

    const handleClear = () => {
        setValues({
            startDate: '',
            endDate: '',
            roleName: '',
            pm_id: []
        });
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            const userIds = (values.pm_id || []).map((id) => parseInt(id));
            const payload = {
                startDate: moment(values.startDate).format('YYYY-MM-DD'),
                endDate: moment(values.endDate).format('YYYY-MM-DD'),
                roleName: values.roleName,
                pm_id: userIds
            };

            const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
                headers: {
                    Authorization: token || '',
                    'Content-Type': 'application/json'
                }
            });

            const data = res.data?.data;
            let rows = [];

            if (Array.isArray(data) && data.length > 1 && data[1]?.DSR) {
                const headerObj = data[0]?.Header || [];
                const dsrList = data[1]?.DSR || [];
                const skuHeaders = headerObj.reduce((acc, catObj) => {
                    const skus = Object.values(catObj)[0] || [];
                    acc.push(...skus);
                    return acc;
                }, []);

                rows = dsrList.map((item) => {
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
                        'Country': item.country_name || 'India',
                        'State': item.state || '-',
                        'City': item.city || '-',
                        'Client SE': item.client_se || '-',
                        'Client ASM': item.client_asm || '-',
                        'Client NPC': item.client_npc || '-',
                        'IDO TL': item.ido_tl || 'IDO TL',
                        'IDO ASM': item.ido_asm || 'IDO ASM',
                        'IDO TA': item.ido_ta || 'IDO TA',
                        'IDO NPM': item.ido_npm || 'IDO NPM',
                        'Date': item.date || '-',
                        'Remark': item.remark || '-',
                        'Total Count': item.total_Opening || item.total_count || 0
                    };
                    skuHeaders.forEach((skuName) => {
                        const foundSku = item.SKUArray?.find((s) => Object.keys(s)[0] === skuName);
                        row[skuName] = foundSku ? foundSku[skuName] : '-';
                    });
                    return row;
                });
            } else if (Array.isArray(data)) {
                rows = data;
            }

            if (rows.length === 0) {
                rows = [{
                    Message: 'No records found for the selected period.',
                    'From Date': payload.startDate,
                    'To Date': payload.endDate
                }];
            }

            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            XLSX.writeFile(workbook, filename);

            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: `${title} exported successfully!`,
                life: 3000
            });
        } catch (err) {
            console.error('Export error:', err);
            toast.current.show({
                severity: 'error',
                summary: 'Export Error',
                detail: err.response?.data?.message || err.message,
                life: 3000
            });
        } finally {
            setLoading(false);
        }
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
                    <h5 className="title">{title}</h5>
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
                                onChange={(e) => setValues({ ...values, startDate: e.value })}
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
                                onChange={(e) => setValues({ ...values, endDate: e.value })}
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
                                onChange={(e) => setValues({ ...values, roleName: e.value, pm_id: [] })}
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
                                    onChange={(e) => setValues({ ...values, pm_id: e.value })}
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
                                    onChange={(e) => setValues({ ...values, pm_id: e.value })}
                                    options={sosMerchandiserData}
                                />
                            </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-content-end gap-4 mt-4">
                        <Button
                            label={`Export ${title}`}
                            loading={loading}
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

export default ReportViewer;
