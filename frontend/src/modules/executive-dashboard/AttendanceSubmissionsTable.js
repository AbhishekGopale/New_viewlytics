import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';

function padZero(n) {
    return n < 10 ? '0' + n : '' + n;
}

function getFormattedTimestamp() {
    const now = new Date();
    const y = now.getFullYear();
    const m = padZero(now.getMonth() + 1);
    const d = padZero(now.getDate());
    const hh = padZero(now.getHours());
    const mm = padZero(now.getMinutes());
    const ss = padZero(now.getSeconds());
    return `${y}${m}${d}_${hh}${mm}${ss}`;
}

const AttendanceSubmissionsTable = ({ data = [], loading = false, projectName = 'all' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const filtered = useMemo(() => {
        if (!searchTerm.trim()) return data;
        const q = searchTerm.toLowerCase();
        return data.filter((row) => {
            return (
                (row.user_name || '').toLowerCase().includes(q) ||
                (row.role_name || '').toLowerCase().includes(q) ||
                (row.project_name || '').toLowerCase().includes(q) ||
                (row.store_name || '').toLowerCase().includes(q) ||
                (row.chain_name || '').toLowerCase().includes(q) ||
                (row.city || '').toLowerCase().includes(q) ||
                (row.status || '').toLowerCase().includes(q)
            );
        });
    }, [data, searchTerm]);

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

    const handleExportExcel = () => {
        const rows = filtered.map((r, idx) => ({
            'S.No': idx + 1,
            'User': r.user_name || '',
            'Role': r.role_name || '',
            'Project': r.project_name || '',
            'Store': r.store_name || '',
            'Chain': r.chain_name || '',
            'City': r.city || '',
            'State': r.state || '',
            'Zone': r.zone || '',
            'Date': r.date || '',
            'In Time': r.in_time || '',
            'Out Time': r.out_time || '',
            'Total Hours': r.total_hours || '',
            'Status': r.status || ''
        }));

        const cleanProject = (projectName || 'all').replace(/[^a-zA-Z0-9_-]/g, '_');
        const filename = `attendance$${cleanProject}$${getFormattedTimestamp()}.xlsx`;

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
        XLSX.writeFile(workbook, filename);
    };

    return (
        <div
            style={{
                background: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '18px 20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                    Attendance Submissions ({filtered.length})
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <i className="pi pi-search" style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8', fontSize: '13px' }} />
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                            style={{
                                padding: '7px 12px 7px 30px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                outline: 'none',
                                width: '220px'
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleExportExcel}
                        style={{
                            background: '#047857',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '7px 14px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                    >
                        <i className="pi pi-file-excel" />
                        <span>Export Excel</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                    <i className="pi pi-spin pi-spinner" style={{ fontSize: '24px', marginBottom: '8px' }} />
                    <div>Loading attendance submissions...</div>
                </div>
            ) : paginated.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>
                    No attendance records found for the selected filters.
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '600' }}>
                                <th style={{ padding: '10px 12px' }}>User</th>
                                <th style={{ padding: '10px 12px' }}>Role</th>
                                <th style={{ padding: '10px 12px' }}>Project</th>
                                <th style={{ padding: '10px 12px' }}>Store / Chain</th>
                                <th style={{ padding: '10px 12px' }}>Location</th>
                                <th style={{ padding: '10px 12px' }}>Date</th>
                                <th style={{ padding: '10px 12px' }}>In / Out</th>
                                <th style={{ padding: '10px 12px' }}>Hours</th>
                                <th style={{ padding: '10px 12px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((row, idx) => (
                                <tr key={row.id || idx} style={{ borderBottom: '1px solid #f1f5f9', color: '#1e293b' }}>
                                    <td style={{ padding: '10px 12px', fontWeight: '600' }}>{row.user_name || '-'}</td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{row.role_name || '-'}</td>
                                    <td style={{ padding: '10px 12px' }}>{row.project_name || '-'}</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <div>{row.store_name || '-'}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{row.chain_name || ''}</div>
                                    </td>
                                    <td style={{ padding: '10px 12px', color: '#64748b' }}>
                                        {[row.city, row.state].filter(Boolean).join(', ') || '-'}
                                    </td>
                                    <td style={{ padding: '10px 12px' }}>{row.date || '-'}</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <div>{row.in_time || '-'}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{row.out_time || '-'}</div>
                                    </td>
                                    <td style={{ padding: '10px 12px', fontWeight: '600' }}>{row.total_hours || '-'}</td>
                                    <td style={{ padding: '10px 12px' }}>
                                        <span
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                background: (row.status || '').toLowerCase() === 'present' ? '#dcfce7' : '#fee2e2',
                                                color: (row.status || '').toLowerCase() === 'present' ? '#15803d' : '#b91c1c'
                                            }}
                                        >
                                            {row.status || 'Present'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                    <button
                        type="button"
                        disabled={page === 0}
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: page === 0 ? '#f1f5f9' : '#ffffff', cursor: page === 0 ? 'not-allowed' : 'pointer' }}
                    >
                        Prev
                    </button>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                        Page {page + 1} of {totalPages}
                    </span>
                    <button
                        type="button"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: page >= totalPages - 1 ? '#f1f5f9' : '#ffffff', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AttendanceSubmissionsTable;
