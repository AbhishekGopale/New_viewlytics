import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import components from '../primeReactComponentsIndex';

const BASE_URL_API = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = () => {
    let token = '';
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        if (sessionToken) {
            token = JSON.parse(sessionToken);
        }
    } catch (e) {
        token = sessionStorage.getItem('accessToken') || '';
    }

    if (!token) {
        try {
            const localToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
            token = localToken ? JSON.parse(localToken) : (localToken || '');
        } catch (e) {
            token = localStorage.getItem('token') || localStorage.getItem('accessToken') || '';
        }
    }

    if (typeof token === 'string') {
        token = token.trim();
        if (token.startsWith('Bearer ')) {
            token = token.slice(7).trim();
        }
    }

    return token ? { Authorization: `Bearer ${token}` } : {};
};

const ExecutiveDashboard = () => {
    const {
        Button,
        Calendar,
        Column,
        DataTable,
        Dropdown,
        InputText,
        Tag,
        Toast,
        ProgressSpinner,
        Dialog
    } = components;

    const toast = useRef(null);

    // Filter states
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedChain, setSelectedChain] = useState('');
    const [selectedTL, setSelectedTL] = useState('');
    const [selectedManpowerType, setSelectedManpowerType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Dropdown options
    const [filterOptions, setFilterOptions] = useState({
        zones: [],
        states: [],
        cities: [],
        chains: [],
        team_leaders: []
    });

    // Data states
    const [summary, setSummary] = useState({
        attendance_percentage: '0.00%',
        attendance_rate: 0,
        today_checkins: 0,
        week_off_count: 0,
        total_active_users: 0,
        not_login_count: 0,
        user_context: null,
        promoter_summary: { total: 0, check_in: 0, not_login: 0, week_off: 0 },
        tl_summary: { total: 0, check_in: 0, not_login: 0 }
    });
    const [submissions, setSubmissions] = useState([]);
    const [totalSubmissions, setTotalSubmissions] = useState(0);
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [loadingSubmissions, setLoadingSubmissions] = useState(false);

    // UI Drawer state
    const [isFilterOpen, setIsFilterOpen] = useState(false);


    // Fetch Filter Options once
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get(`${BASE_URL_API}/web/executive/filter-options`, {
                    headers: getAuthHeaders()
                });
                if (res.data && res.data.data) {
                    setFilterOptions(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching filter options:', err);
            }
        };
        fetchFilters();
    }, []);

    // Format target date as YYYY-MM-DD
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

    // Build common query parameters
    const buildQueryParams = () => {
        const params = new URLSearchParams();
        params.append('date', formattedDate);
        if (selectedZone) params.append('zone', selectedZone);
        if (selectedState) params.append('state', selectedState);
        if (selectedCity) params.append('city', selectedCity);
        if (selectedProject) params.append('project_id', selectedProject);
        if (selectedChain) params.append('chain_id', selectedChain);
        if (selectedTL) params.append('tl_id', selectedTL);
        if (selectedManpowerType) params.append('role_id', selectedManpowerType);
        return params;
    };

    // Fetch Summary Data
    const fetchSummary = async () => {
        setLoadingSummary(true);
        try {
            const params = buildQueryParams();
            const res = await axios.get(`${BASE_URL_API}/web/executive/attendance-summary?${params.toString()}`, {
                headers: getAuthHeaders()
            });
            if (res.data && res.data.data) {
                setSummary(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching attendance summary:', err);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load summary data', life: 3000 });
        } finally {
            setLoadingSummary(false);
        }
    };

    // Fetch Submissions Data
    const fetchSubmissions = async () => {
        setLoadingSubmissions(true);
        try {
            const params = buildQueryParams();
            if (searchQuery) params.append('search', searchQuery);
            if (statusFilter) params.append('status', statusFilter);
            params.append('limit', '100');
            const res = await axios.get(`${BASE_URL_API}/web/executive/attendance-submissions?${params.toString()}`, {
                headers: getAuthHeaders()
            });
            if (res.data && res.data.data) {
                setSubmissions(res.data.data.submissions || []);
                setTotalSubmissions(res.data.data.total_records || 0);
            }
        } catch (err) {
            console.error('Error fetching attendance submissions:', err);
        } finally {
            setLoadingSubmissions(false);
        }
    };

    // Trigger fetch on filter or date change
    useEffect(() => {
        fetchSummary();
        fetchSubmissions();
    }, [selectedDate, selectedZone, selectedState, selectedCity, selectedChain, selectedTL, statusFilter]);

    // Handle manual filter application
    const handleApplyFilters = () => {
        setIsFilterOpen(false);
        fetchSummary();
        fetchSubmissions();
        toast.current?.show({ severity: 'info', summary: 'Filters Applied', detail: 'Dashboard refreshed with selected filters', life: 2500 });
    };

    // Reset filters
    const handleResetFilters = () => {
        setSelectedZone('');
        setSelectedState('');
        setSelectedCity('');
        setSelectedProject('');
        setSelectedChain('');
        setSelectedTL('');
        setSelectedManpowerType('');
        setSelectedDate(new Date());
        setSearchQuery('');
        setStatusFilter('');
        setIsFilterOpen(false);
    };

    // Filter table records by local search
    const filteredSubmissions = submissions.filter((row) => {
        if (!searchQuery) return true;
        const sLower = searchQuery.toLowerCase();
        return (
            row.manpower_name?.toLowerCase().includes(sLower) ||
            row.manpower_code?.toLowerCase().includes(sLower) ||
            row.store_name?.toLowerCase().includes(sLower) ||
            row.manpower_type?.toLowerCase().includes(sLower)
        );
    });

    // Export Table to CSV
    const exportCSV = () => {
        if (!filteredSubmissions.length) {
            toast.current?.show({ severity: 'warn', summary: 'No Data', detail: 'No submissions available to export', life: 3000 });
            return;
        }
        const headers = ['Manpower Code', 'Manpower Name', 'Manpower Type', 'Attendance Date', 'Attendance Option', 'Submitted At', 'Check Out Time', 'Store Name', 'City', 'Zone', 'Mobile No'];
        const csvRows = [headers.join(',')];

        filteredSubmissions.forEach((row) => {
            const values = [
                `"${row.manpower_code || ''}"`,
                `"${row.manpower_name || ''}"`,
                `"${row.manpower_type || ''}"`,
                `"${row.attendance_date || ''}"`,
                `"${row.attendance_option || ''}"`,
                `"${row.submitted_at || ''}"`,
                `"${row.check_out_time || ''}"`,
                `"${row.store_name || ''}"`,
                `"${row.city || ''}"`,
                `"${row.zone || ''}"`,
                `"${row.mobile_no || ''}"`
            ];
            csvRows.push(values.join(','));
        });

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `Attendance_Submissions_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Column templates
    const statusBodyTemplate = (rowData) => {
        let severity = 'danger';
        if (rowData.attendance_option === 'Present') severity = 'success';
        if (rowData.attendance_option === 'Week Off') severity = 'warning';
        if (rowData.attendance_option === 'Leave') severity = 'info';

        return <Tag value={rowData.attendance_option} severity={severity} style={{ borderRadius: '12px', padding: '4px 10px' }} />;
    };

    const manpowerTypeBodyTemplate = (rowData) => {
        const isPromoter = rowData.manpower_type?.toLowerCase().includes('promoter');
        return (
            <span style={{
                backgroundColor: isPromoter ? '#e0f2fe' : '#f3e8ff',
                color: isPromoter ? '#0369a1' : '#7e22ce',
                fontWeight: '600',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '12px'
            }}>
                {rowData.manpower_type}
            </span>
        );
    };

    const submittedAtTemplate = (rowData) => {
        return (
            <div className="flex align-items-center">
                <i className={`pi ${rowData.submitted_at !== 'N/A' ? 'pi-clock text-primary' : 'pi-minus text-400'} mr-2`} style={{ fontSize: '13px' }}></i>
                <span style={{ fontWeight: rowData.submitted_at !== 'N/A' ? '600' : '400', color: rowData.submitted_at !== 'N/A' ? '#111827' : '#9ca3af' }}>
                    {rowData.submitted_at || 'N/A'}
                </span>
            </div>
        );
    };

    const activeFilterCount = [selectedZone, selectedState, selectedCity, selectedChain, selectedTL].filter(Boolean).length;

    return (
        <div className="executive-dashboard-container p-3" style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            <Toast ref={toast} />

            {/* TOP HEADER */}
            <div className="card shadow-1 p-3 mb-3 border-round-xl bg-white flex flex-column md:flex-row justify-content-between align-items-start md:align-items-center gap-3">
                <div>
                    <div className="flex align-items-center gap-2">
                        <span className="p-badge p-badge-info" style={{ backgroundColor: '#1565C0', fontSize: '11px', padding: '2px 8px' }}>
                            Executive 2.0
                        </span>
                        <h2 className="m-0 text-900 font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                            Executive Dashboard
                        </h2>
                    </div>
                    <div className="flex align-items-center gap-2 mt-1">
                        <i className="pi pi-shield text-primary" style={{ fontSize: '12px' }}></i>
                        <span className="text-600 text-xs font-medium">
                            Role-Scoped Universe: <strong>{summary.user_context?.name || 'IDO NPM'}</strong> ({summary.user_context?.role_name?.toUpperCase() || 'NPM'})
                        </span>
                        <span className="text-400 text-xs">•</span>
                        <span className="text-500 text-xs">Live Database Connection</span>
                    </div>
                </div>

                <div className="flex flex-wrap align-items-center gap-2">
                    {/* Date Picker */}
                    <div className="p-inputgroup" style={{ width: '160px' }}>
                        <Calendar
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.value)}
                            dateFormat="dd M, yy"
                            showIcon
                            className="p-inputtext-sm"
                            maxDate={new Date()}
                        />
                    </div>

                    {/* Filter Button */}
                    <Button
                        label={`Page Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`}
                        icon="pi pi-filter"
                        onClick={() => setIsFilterOpen(true)}
                        className={`p-button-sm ${activeFilterCount > 0 ? 'p-button-primary' : 'p-button-outlined'}`}
                        style={{ borderRadius: '8px' }}
                    />

                    {/* Refresh */}
                    <Button
                        icon="pi pi-refresh"
                        onClick={() => { fetchSummary(); fetchSubmissions(); }}
                        className="p-button-outlined p-button-sm p-button-secondary"
                        tooltip="Refresh Data"
                        tooltipOptions={{ position: 'bottom' }}
                        style={{ borderRadius: '8px' }}
                    />
                </div>
            </div>

            {/* OVERALL SUMMARY HEADER */}
            <div className="mb-2 flex justify-content-between align-items-center">
                <h5 className="m-0 text-800 font-bold" style={{ fontSize: '1.1rem' }}>
                    Overall Summary
                </h5>
                <span className="text-xs text-500">
                    Data scoped to {summary.total_active_users} assigned workforce members
                </span>
            </div>

            {/* 4 PRIMARY KPI CARDS */}
            <div className="grid mb-3">
                {/* 1. ATTENDANCE % CARD */}
                <div className="col-12 sm:col-6 lg:col-3">
                    <div className="card shadow-1 p-3 border-round-xl bg-white h-full flex flex-column justify-content-between" style={{ borderLeft: '4px solid #10b981' }}>
                        <div>
                            <div className="flex justify-content-between align-items-center mb-2">
                                <span className="text-600 font-bold text-sm">Attendance</span>
                                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 border-round font-medium">Live Rate</span>
                            </div>
                            <div className="text-4xl font-extrabold text-green-600 my-1">
                                {loadingSummary ? <ProgressSpinner style={{ width: '30px', height: '30px' }} /> : summary.attendance_percentage}
                            </div>
                            <div className="w-full bg-gray-200 border-round-lg mt-2" style={{ height: '7px', overflow: 'hidden' }}>
                                <div
                                    className="bg-green-500 h-full border-round-lg transition-all transition-duration-500"
                                    style={{ width: `${Math.min(100, parseFloat(summary.attendance_percentage) || 0)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="text-xs text-500 mt-2">
                            {summary.today_checkins} check-ins out of {summary.total_active_users} manpower
                        </div>
                    </div>
                </div>

                {/* 2. TODAY CHECK IN DONE CARD */}
                <div className="col-12 sm:col-6 lg:col-3">
                    <div className="card shadow-1 p-3 border-round-xl bg-white h-full flex flex-column justify-content-between" style={{ borderLeft: '4px solid #1565C0' }}>
                        <div>
                            <div className="flex justify-content-between align-items-center mb-2">
                                <span className="text-600 font-bold text-sm">Today Check In Done</span>
                                <div className="border-circle bg-blue-100 flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                    <i className="pi pi-check text-blue-700 font-bold" style={{ fontSize: '15px' }}></i>
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-900 my-1">
                                {loadingSummary ? <ProgressSpinner style={{ width: '30px', height: '30px' }} /> : summary.today_checkins}
                            </div>
                        </div>
                        <div className="text-xs text-500 mt-2 flex align-items-center gap-1">
                            <i className="pi pi-users text-blue-600"></i>
                            <span>Personnel checked in today</span>
                        </div>
                    </div>
                </div>

                {/* 3. WEEK OFF CARD */}
                <div className="col-12 sm:col-6 lg:col-3">
                    <div className="card shadow-1 p-3 border-round-xl bg-white h-full flex flex-column justify-content-between" style={{ borderLeft: '4px solid #8b5cf6' }}>
                        <div>
                            <div className="flex justify-content-between align-items-center mb-2">
                                <span className="text-600 font-bold text-sm">Week Off</span>
                                <div className="border-circle bg-purple-100 flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                    <i className="pi pi-calendar-times text-purple-600 font-bold" style={{ fontSize: '15px' }}></i>
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-900 my-1">
                                {loadingSummary ? <ProgressSpinner style={{ width: '30px', height: '30px' }} /> : summary.week_off_count}
                            </div>
                        </div>
                        <div className="text-xs text-500 mt-2 flex align-items-center gap-1">
                            <i className="pi pi-info-circle text-purple-500"></i>
                            <span>Scheduled weekly off today</span>
                        </div>
                    </div>
                </div>

                {/* 4. TOTAL USERS (ACTIVE) CARD */}
                <div className="col-12 sm:col-6 lg:col-3">
                    <div className="card shadow-1 p-3 border-round-xl bg-white h-full flex flex-column justify-content-between" style={{ borderLeft: '4px solid #f59e0b' }}>
                        <div>
                            <div className="flex justify-content-between align-items-center mb-2">
                                <span className="text-600 font-bold text-sm">Total Users (Universe)</span>
                                <div className="border-circle bg-amber-100 flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                    <i className="pi pi-user-plus text-amber-600 font-bold" style={{ fontSize: '15px' }}></i>
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-900 my-1">
                                {loadingSummary ? <ProgressSpinner style={{ width: '30px', height: '30px' }} /> : summary.total_active_users}
                            </div>
                        </div>
                        <div className="text-xs text-500 mt-2 flex align-items-center gap-1">
                            <i className="pi pi-id-card text-amber-500"></i>
                            <span>Assigned under your hierarchy</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* HIERARCHY ROLE BREAKDOWN (Matching Production Screenshot media_1793350102637.png) */}
            <div className="card shadow-1 border-round-xl bg-white p-3 mb-3">
                <h5 className="m-0 mb-3 text-800 font-bold" style={{ fontSize: '1.05rem' }}>
                    Role Hierarchy Attendance Breakdown
                </h5>

                {/* TL Attendance Row */}
                <div className="mb-3">
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-bold text-700 text-sm">TL Attendance</span>
                        <span className="text-xs text-500">Team Leaders</span>
                    </div>
                    <div className="grid">
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#22c55e', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.tl_summary?.check_in || 0}</div>
                                <div className="text-xs">Check In</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                                <div className="text-xl font-bold">0</div>
                                <div className="text-xs">Check Out</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
                                <div className="text-xl font-bold">0</div>
                                <div className="text-xs">Leave</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#0284c7', color: 'white' }}>
                                <div className="text-xl font-bold">0</div>
                                <div className="text-xs">Week Off</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#64748b', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.tl_summary?.not_login || 0}</div>
                                <div className="text-xs">Not Login</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#7c3aed', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.tl_summary?.total || 0}</div>
                                <div className="text-xs">Total TL</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promoter Attendance Row */}
                <div>
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-bold text-700 text-sm">Attendance (Promotor)</span>
                        <span className="text-xs text-500">Promoters & Merchandisers</span>
                    </div>
                    <div className="grid">
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#22c55e', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.promoter_summary?.check_in || 0}</div>
                                <div className="text-xs">Check In</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                                <div className="text-xl font-bold">0</div>
                                <div className="text-xs">Check Out</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#f59e0b', color: 'white' }}>
                                <div className="text-xl font-bold">0</div>
                                <div className="text-xs">Leave</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#0284c7', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.promoter_summary?.week_off || 0}</div>
                                <div className="text-xs">Week Off</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#64748b', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.promoter_summary?.not_login || 0}</div>
                                <div className="text-xs">Not Login</div>
                            </div>
                        </div>
                        <div className="col-4 sm:col-2">
                            <div className="card p-2 text-center border-round-lg shadow-none" style={{ backgroundColor: '#7c3aed', color: 'white' }}>
                                <div className="text-xl font-bold">{summary.promoter_summary?.total || 0}</div>
                                <div className="text-xs">Total Promotors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ATTENDANCE SUBMISSION TABLE SECTION */}
            <div className="card shadow-1 border-round-xl bg-white p-3 mb-4">
                <div className="flex flex-column sm:flex-row justify-content-between align-items-start sm:align-items-center gap-3 pb-3 border-bottom-1 surface-border">
                    <div>
                        <h4 className="m-0 text-900 font-bold" style={{ fontSize: '1.25rem' }}>
                            Today's Attendance Submissions ({totalSubmissions})
                        </h4>
                        <span className="text-500 text-xs mt-1 block">
                            Real-time check-in logs with timestamp, store location, and manpower details
                        </span>
                    </div>

                    <div className="flex flex-wrap align-items-center gap-2">
                        {/* Search Input */}
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search manpower, code, store..."
                                className="p-inputtext-sm"
                                style={{ width: '230px', borderRadius: '8px' }}
                            />
                        </span>

                        {/* Status Filter */}
                        <Dropdown
                            value={statusFilter}
                            options={[
                                { label: 'All Status', value: '' },
                                { label: 'Present', value: 'check_in' },
                                { label: 'Not Login', value: 'not_login' },
                                { label: 'Week Off', value: 'week_off' }
                            ]}
                            onChange={(e) => setStatusFilter(e.value)}
                            placeholder="Filter Status"
                            className="p-inputtext-sm"
                            style={{ width: '130px' }}
                        />

                        {/* Export to CSV */}
                        <Button
                            label="Export CSV"
                            icon="pi pi-download"
                            onClick={exportCSV}
                            className="p-button-outlined p-button-success p-button-sm"
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                </div>

                {/* DATA TABLE */}
                <DataTable
                    value={filteredSubmissions}
                    loading={loadingSubmissions}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    className="p-datatable-sm mt-3"
                    responsiveLayout="scroll"
                    emptyMessage="No attendance submissions found for selected filters."
                    rowHover
                    stripedRows
                >
                    <Column
                        field="manpower_code"
                        header="Manpower Code"
                        sortable
                        style={{ minWidth: '130px' }}
                        body={(r) => <span className="font-bold text-900">{r.manpower_code}</span>}
                    />
                    <Column
                        field="manpower_name"
                        header="Manpower Name"
                        sortable
                        style={{ minWidth: '180px' }}
                        body={(r) => <span className="font-medium text-800">{r.manpower_name}</span>}
                    />
                    <Column
                        field="manpower_type"
                        header="Manpower Type"
                        sortable
                        style={{ minWidth: '130px' }}
                        body={manpowerTypeBodyTemplate}
                    />
                    <Column
                        field="attendance_date"
                        header="Attendance Date"
                        sortable
                        style={{ minWidth: '130px' }}
                    />
                    <Column
                        field="attendance_option"
                        header="Attendance Option"
                        sortable
                        style={{ minWidth: '140px' }}
                        body={statusBodyTemplate}
                    />
                    <Column
                        field="submitted_at"
                        header="Submitted At"
                        sortable
                        style={{ minWidth: '130px' }}
                        body={submittedAtTemplate}
                    />
                    <Column
                        field="store_name"
                        header="Store Name"
                        sortable
                        style={{ minWidth: '220px' }}
                        body={(r) => <span className="text-700 text-sm">{r.store_name}</span>}
                    />
                    <Column
                        field="city"
                        header="City / Zone"
                        sortable
                        style={{ minWidth: '120px' }}
                        body={(r) => <span className="text-600 text-xs">{r.city || r.zone || 'N/A'}</span>}
                    />
                </DataTable>
            </div>

            {/* PAGE FILTERS DIALOG (Matching Screenshot) */}
            <Dialog
                header="Page filters"
                visible={isFilterOpen}
                style={{ width: '420px', maxWidth: '95vw' }}
                onHide={() => setIsFilterOpen(false)}
                footer={
                    <div className="flex justify-content-between align-items-center w-full">
                        <Button
                            label="Reset"
                            icon="pi pi-refresh"
                            onClick={handleResetFilters}
                            className="p-button-text p-button-sm p-button-secondary"
                        />
                        <div className="flex gap-2">
                            <Button
                                label="Cancel"
                                onClick={() => setIsFilterOpen(false)}
                                className="p-button-outlined p-button-sm p-button-secondary"
                            />
                            <Button
                                label="Apply Filters"
                                icon="pi pi-check"
                                onClick={handleApplyFilters}
                                className="p-button-sm p-button-primary"
                            />
                        </div>
                    </div>
                }
            >
                <p className="text-500 text-xs mb-3">
                    These filters are applicable to the current page. You can select one or more filters to narrow down your search results.
                </p>

                <div className="flex flex-column gap-3">
                    {/* Zone */}
                    <div>
                        <label className="block text-700 font-semibold text-xs mb-1">Zone</label>
                        <Dropdown
                            value={selectedZone}
                            options={[{ label: 'All Zones', value: '' }, ...(filterOptions.zones || [])]}
                            onChange={(e) => setSelectedZone(e.value)}
                            placeholder="Select Zone"
                            className="w-full p-inputtext-sm"
                        />
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-700 font-semibold text-xs mb-1">State</label>
                        <Dropdown
                            value={selectedState}
                            options={[{ label: 'All States', value: '' }, ...(filterOptions.states || [])]}
                            onChange={(e) => setSelectedState(e.value)}
                            placeholder="Select State"
                            className="w-full p-inputtext-sm"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-700 font-semibold text-xs mb-1">City</label>
                        <Dropdown
                            value={selectedCity}
                            options={[{ label: 'All Cities', value: '' }, ...(filterOptions.cities || [])]}
                            onChange={(e) => setSelectedCity(e.value)}
                            placeholder="Select City"
                            className="w-full p-inputtext-sm"
                        />
                    </div>

                    {/* Chain */}
                    <div>
                        <label className="block text-700 font-semibold text-xs mb-1">Chain</label>
                        <Dropdown
                            value={selectedChain}
                            options={[{ label: 'All Chains', value: '' }, ...(filterOptions.chains || [])]}
                            onChange={(e) => setSelectedChain(e.value)}
                            placeholder="Select Chain"
                            className="w-full p-inputtext-sm"
                        />
                    </div>

                    {/* Team Leader */}
                    <div>
                        <label className="block text-700 font-semibold text-xs mb-1">Team Leader (TL)</label>
                        <Dropdown
                            value={selectedTL}
                            options={[{ label: 'All TLs', value: '' }, ...(filterOptions.team_leaders || [])]}
                            onChange={(e) => setSelectedTL(e.value)}
                            placeholder="Select Team Leader"
                            className="w-full p-inputtext-sm"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ExecutiveDashboard;
