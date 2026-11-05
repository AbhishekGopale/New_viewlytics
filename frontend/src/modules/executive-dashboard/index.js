import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DateRangePicker, { formatDisplayDate } from './DateRangePicker';
import TopProjectSelector from './TopProjectSelector';
import ExecutiveSummaryCards from './ExecutiveSummaryCards';
import AttendanceSubmissionsTable from './AttendanceSubmissionsTable';
import AttendanceTrendChart from './AttendanceTrendChart';
import PageFiltersSidebar from './PageFiltersSidebar';

const BASE_URL_API = process.env.REACT_APP_BASE_URL || '/api/v1';

function padZero(n) {
    return n < 10 ? '0' + n : '' + n;
}

function formatDateObj(d) {
    const y = d.getFullYear();
    const m = padZero(d.getMonth() + 1);
    const day = padZero(d.getDate());
    return `${y}-${m}-${day}`;
}

const getAuthToken = () => {
    let token = '';
    try {
        const sessionToken = sessionStorage.getItem('accessToken');
        if (sessionToken) token = JSON.parse(sessionToken);
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
        if (token.startsWith('Bearer ')) return token;
        return `Bearer ${token}`;
    }
    return '';
};

const ExecutiveDashboard = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);

    const [startDate, setStartDate] = useState(formatDateObj(thirtyDaysAgo));
    const [endDate, setEndDate] = useState(formatDateObj(today));
    const [activeTab, setActiveTab] = useState('Manpower');

    // Filter states
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [filters, setFilters] = useState({
        chain_id: '',
        manpower_type: '',
        account: '',
        npm_id: '',
        asm_id: '',
        ta_id: '',
        tl_id: '',
        zone: '',
        state: '',
        city: ''
    });

    const [filterOptions, setFilterOptions] = useState({
        projects: [],
        chains: [],
        zones: [],
        states: [],
        cities: [],
        asms: [],
        team_leaders: [],
        npms: [],
        tas: []
    });

    const [summary, setSummary] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Filter Options
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const res = await axios.get(`${BASE_URL_API}/web/executive/filter-options`, {
                    headers: { Authorization: getAuthToken() }
                });
                if (res.data?.data) {
                    setFilterOptions(res.data.data);
                }
            } catch (err) {
                console.warn('Filter options fetch warning:', err.message);
            }
        };
        fetchFilters();
    }, []);

    // Fetch Dashboard Data
    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        try {
            const params = {
                start_date: startDate,
                end_date: endDate,
                project_id: selectedProjectId || undefined,
                chain_id: filters.chain_id || filters.account || undefined,
                manpower_type: filters.manpower_type || undefined,
                npm_id: filters.npm_id || undefined,
                asm_id: filters.asm_id || undefined,
                ta_id: filters.ta_id || undefined,
                tl_id: filters.tl_id || undefined,
                zone: filters.zone || undefined,
                state: filters.state || undefined,
                city: filters.city || undefined
            };

            const headers = { Authorization: getAuthToken() };

            const [sumRes, subRes, trendRes] = await Promise.all([
                axios.get(`${BASE_URL_API}/web/executive/attendance-summary`, { params, headers }).catch(() => ({ data: { data: {} } })),
                axios.get(`${BASE_URL_API}/web/executive/attendance-submissions`, { params, headers }).catch(() => ({ data: { data: [] } })),
                axios.get(`${BASE_URL_API}/web/executive/attendance-trend`, { params, headers }).catch(() => ({ data: { data: [] } }))
            ]);

            setSummary(sumRes.data?.data || {});
            setSubmissions(subRes.data?.data?.submissions || subRes.data?.data || []);
            setTrend(trendRes.data?.data?.trend || trendRes.data?.data || []);
        } catch (e) {
            console.error('Executive dashboard data fetch error:', e);
        } finally {
            setLoading(false);
        }
    }, [startDate, endDate, selectedProjectId, filters]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleFilterChange = (key, val) => {
        setFilters((prev) => ({ ...prev, [key]: val }));
    };

    const handleResetFilters = () => {
        setFilters({
            chain_id: '',
            manpower_type: '',
            account: '',
            npm_id: '',
            asm_id: '',
            ta_id: '',
            tl_id: '',
            zone: '',
            state: '',
            city: ''
        });
        setSelectedProjectId('');
    };

    const activeProjectObj = (filterOptions.projects || []).find((p) => String(p.value) === String(selectedProjectId));
    const activeProjectName = activeProjectObj ? activeProjectObj.label : 'All_Projects';

    const tabs = ['Manpower', 'Summary', 'On Shelf Availability', 'Share Of Shelf', 'Promo', 'Assets', 'Sales'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '12px 18px', background: '#f8fafc', minHeight: '100vh' }}>
            {/* 1. TOP HEADER BAR (Matching Image 2) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff',
                    borderRadius: '10px',
                    padding: '12px 20px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}
            >
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                    Retail Execution Dashboard
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    {/* Top Project Selector (Image 2) */}
                    <TopProjectSelector
                        projects={filterOptions.projects || []}
                        selectedProjectId={selectedProjectId}
                        onChange={(pId) => setSelectedProjectId(pId)}
                    />

                    {/* Dual Date Range Picker (Image 1) */}
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onApply={(s, e) => {
                            setStartDate(s);
                            setEndDate(e);
                        }}
                    />
                </div>
            </div>

            {/* 2. SECONDARY BAR: Zone, State, City (Matching Image 2) */}
            <div
                style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    background: '#ffffff',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    flexWrap: 'wrap'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Zone:</span>
                    <select
                        value={filters.zone}
                        onChange={(e) => handleFilterChange('zone', e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#ffffff' }}
                    >
                        <option value="">All Zones</option>
                        {(filterOptions.zones || []).map((z) => (
                            <option key={z.value} value={z.value}>{z.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>State:</span>
                    <select
                        value={filters.state}
                        onChange={(e) => handleFilterChange('state', e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#ffffff' }}
                    >
                        <option value="">All States</option>
                        {(filterOptions.states || []).map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>City:</span>
                    <select
                        value={filters.city}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', background: '#ffffff' }}
                    >
                        <option value="">All Cities</option>
                        {(filterOptions.cities || []).map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 3. TABS BAR (Matching Image 2) */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {tabs.map((t) => {
                    const isActive = activeTab === t;
                    return (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setActiveTab(t)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                background: isActive ? '#3b82f6' : '#ffffff',
                                color: isActive ? '#ffffff' : '#475569',
                                fontWeight: '700',
                                fontSize: '13px',
                                cursor: 'pointer',
                                boxShadow: isActive ? '0 1px 3px rgba(59, 130, 246, 0.3)' : '0 1px 2px rgba(0,0,0,0.03)',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>

            {/* 4. MAIN BODY: Left Content Area + Right Page filters Sidebar */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* LEFT CONTENT AREA */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Overall Summary KPI Cards */}
                    <ExecutiveSummaryCards summary={summary} />

                    {/* Attendance Submissions Table with attendance$project$datetime.xlsx export */}
                    <AttendanceSubmissionsTable
                        data={submissions}
                        loading={loading}
                        projectName={activeProjectName}
                    />

                    {/* Attendance Trend Chart moved to BOTTOM (as requested by user) */}
                    <AttendanceTrendChart trend={trend} />
                </div>

                {/* RIGHT COLUMN: Page filters Sidebar (Matching Image 2 & Image 3) */}
                <PageFiltersSidebar
                    filterOptions={filterOptions}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            </div>
        </div>
    );
};

export default ExecutiveDashboard;
