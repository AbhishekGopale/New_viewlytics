import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as XLSX from 'xlsx';
import {
    getPromoterUserForReportsRequest,
    getMerchandiserUserForReportsRequest
} from '../../../redux/slice/AdminSlice/reportSlice';
import components from '../primeReactComponentsIndex';

const BASE_URL_API = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api/v1';

const AttendanceNew = () => {
    const { Button, Calendar, Dropdown, MultiSelect, Toast } = components;
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

    const handleClear = () => {
        setValues({
            startDate: '',
            endDate: '',
            roleName: '',
            pm_id: []
        });
    };

    const getAuthToken = () => {
        let cleanToken = token || sessionStorage.getItem('accessToken') || localStorage.getItem('token') || '';
        try {
            cleanToken = JSON.parse(cleanToken);
        } catch (e) {}
        if (typeof cleanToken === 'string') {
            cleanToken = cleanToken.trim();
            if (cleanToken.startsWith('Bearer ')) return cleanToken;
            return `Bearer ${cleanToken}`;
        }
        return '';
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            const userIds = (values.pm_id || []).map((id) => parseInt(id));
            const payload = {
                startDate: values.startDate ? moment(values.startDate).format('YYYY-MM-DD') : '',
                endDate: values.endDate ? moment(values.endDate).format('YYYY-MM-DD') : '',
                roleName: values.roleName,
                pm_id: userIds
            };

            const res = await axios.post(`${BASE_URL_API}/web/report/attendance_dump`, payload, {
                headers: {
                    Authorization: getAuthToken(),
                    'Content-Type': 'application/json'
                }
            });

            const rows = res.data?.data || [];
            if (!rows || rows.length === 0) {
                toast.current.show({
                    severity: 'info',
                    summary: 'No Data',
                    detail: 'No attendance records found for selected filter.',
                    life: 3000
                });
                setLoading(false);
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Summary');
            XLSX.writeFile(workbook, `Attendance_Summary_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);

            toast.current.show({
                severity: 'success',
                summary: 'Export Successful',
                detail: `Exported ${rows.length} attendance records.`,
                life: 3000
            });
        } catch (err) {
            console.error('Attendance export error:', err);
            toast.current.show({
                severity: 'error',
                summary: 'Export Failed',
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

    const userOptions = values.roleName === '0' ? sosPromoterData : (values.roleName === '1' ? sosMerchandiserData : []);
    const isExportDisabled = !(values.startDate && values.endDate);

    return (
        <div className="flex px-4 flex-column gap-4 justify-content-start align-items-center w-full">
            <Toast ref={toast} />
            <div className="flex flex-column w-full">
                <div className="flex justify-content-between align-items-center pt-4">
                    <h5 className="title">Attendance Summary</h5>
                </div>
                <div className="card">
                    {/* Date Filters: From * and To * side by side */}
                    <div className="grid p-fluid mt-1">
                        <div className="field col-12 md:col-6 mb-1">
                            <span className="required">From *</span>
                            <Calendar
                                inputId="startDate"
                                className="calendar-input"
                                value={values.startDate}
                                onChange={(e) => setValues({ ...values, startDate: e.value })}
                                showButtonBar
                                readOnlyInput
                                placeholder="Select Date"
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                        <div className="field col-12 md:col-6 mb-1">
                            <span className="required">To *</span>
                            <Calendar
                                inputId="endDate"
                                className="calendar-input"
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
                        <div className="field col-12 md:col-6 mb-1">
                            <Dropdown
                                placeholder="Select Role"
                                value={values.roleName}
                                onChange={(e) => setValues({ ...values, roleName: e.value, pm_id: [] })}
                                options={roleOptions}
                                optionLabel="label"
                                optionValue="role"
                            />
                        </div>
                        <div className="field col-12 md:col-6 mb-1">
                            <MultiSelect
                                placeholder="Select User"
                                disabled={!values.roleName}
                                value={values.pm_id}
                                options={userOptions}
                                onChange={(e) => setValues({ ...values, pm_id: e.value })}
                                optionLabel="label"
                                optionValue="value"
                                display="chip"
                            />
                        </div>
                    </div>

                    {/* Action Buttons: Export Attendance & Clear */}
                    <div className="flex justify-content-end gap-2 mt-4">
                        <Button
                            icon="pi pi-download"
                            label="Export Attendance"
                            className="p-button-outlined p-button-success"
                            onClick={handleExport}
                            loading={loading}
                            disabled={isExportDisabled}
                        />
                        <Button
                            icon="pi pi-times"
                            label="Clear"
                            className="p-button-outlined"
                            onClick={handleClear}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceNew;
