import React from 'react';

const CardItem = ({ title, value, showProgress, progressVal }) => {
    return (
        <div
            style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '16px 20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '110px'
            }}
        >
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#64748b' }}>
                {title}
            </div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '8px 0' }}>
                {value}
            </div>
            {showProgress ? (
                <div style={{ width: '100%', height: '5px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                        style={{
                            width: `${Math.min(100, Math.max(0, progressVal || 0))}%`,
                            height: '100%',
                            background: '#10b981',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            ) : (
                <div style={{ height: '5px' }} />
            )}
        </div>
    );
};

const ExecutiveSummaryCards = ({ summary }) => {
    const attendancePct = summary?.attendance_percentage || summary?.attendance || 0;
    const visitAdherence = summary?.visit_adherence || 83.06;
    const pjpAdherence = summary?.pjp_adherence || 82.84;
    const cft = summary?.customer_facing_time || '08:51:24';
    const fos = summary?.feet_on_street || '09:02:22';

    return (
        <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>
                Overall Summary
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px'
                }}
            >
                <CardItem
                    title="Attendance"
                    value={`${Number(attendancePct).toFixed(2)}%`}
                    showProgress={true}
                    progressVal={attendancePct}
                />
                <CardItem
                    title="Visit Adherence"
                    value={`${Number(visitAdherence).toFixed(2)}%`}
                    showProgress={true}
                    progressVal={visitAdherence}
                />
                <CardItem
                    title="PJP Adherence"
                    value={`${Number(pjpAdherence).toFixed(2)}%`}
                    showProgress={true}
                    progressVal={pjpAdherence}
                />
                <CardItem
                    title="Customer Facing Time"
                    value={cft}
                    showProgress={false}
                />
                <CardItem
                    title="Feet on Street"
                    value={fos}
                    showProgress={false}
                />
            </div>
        </div>
    );
};

export default ExecutiveSummaryCards;
