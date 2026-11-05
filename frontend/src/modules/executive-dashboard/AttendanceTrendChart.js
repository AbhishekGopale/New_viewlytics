import React from 'react';

const AttendanceTrendChart = ({ trend = [] }) => {
    const maxVal = Math.max(...trend.map(t => Number(t.present || t.count || 0)), 10);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                    Attendance Trend (Bottom View)
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Daily Attendance Count
                </div>
            </div>

            {trend.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '13px' }}>
                    No trend history available for this date range.
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                    {trend.map((item, idx) => {
                        const val = Number(item.present || item.count || 0);
                        const pct = Math.max(8, Math.min(100, Math.round((val / maxVal) * 100)));
                        return (
                            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <div style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
                                    {val}
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        maxWidth: '36px',
                                        height: `${pct}%`,
                                        background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)',
                                        borderRadius: '4px 4px 0 0',
                                        transition: 'height 0.3s ease'
                                    }}
                                />
                                <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', textAlign: 'center' }}>
                                    {item.date ? item.date.slice(5) : `D${idx + 1}`}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AttendanceTrendChart;
