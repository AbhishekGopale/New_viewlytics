import React from 'react';

const TopProjectSelector = ({ projects = [], selectedProjectId, onChange }) => {
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <select
                value={selectedProjectId || ''}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0f172a',
                    background: '#ffffff',
                    cursor: 'pointer',
                    outline: 'none',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}
            >
                <option value="">All Projects</option>
                {projects.map((p) => (
                    <option key={p.value} value={p.value}>
                        {p.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TopProjectSelector;
