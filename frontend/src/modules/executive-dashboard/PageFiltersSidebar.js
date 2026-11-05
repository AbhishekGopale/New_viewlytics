import React from 'react';

const FilterSelect = ({ label, value, onChange, options = [], defaultLabel = 'All' }) => {
    return (
        <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                {label}
            </label>
            <select
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    background: '#ffffff',
                    color: '#1e293b',
                    outline: 'none'
                }}
            >
                <option value="">{defaultLabel} {label}</option>
                {options.map((opt, idx) => (
                    <option key={opt.value ?? idx} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const PageFiltersSidebar = ({
    filterOptions = {},
    filters = {},
    onFilterChange,
    onResetFilters
}) => {
    return (
        <div
            style={{
                width: '260px',
                minWidth: '240px',
                background: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '18px 16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>
                    Page filters
                </div>
                <button
                    type="button"
                    onClick={onResetFilters}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#3b82f6',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    Reset
                </button>
            </div>

            <div style={{ fontSize: '11px', color: '#64748b', lineHeight: '1.4', marginBottom: '8px' }}>
                These filters are applicable to the current page. You can select one or more filters to narrow down your search results.
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '4px 0 10px 0' }} />

            {/* 1. Store Type / Chain / Accounts */}
            <FilterSelect
                label="Store Type / Chain"
                value={filters.chain_id}
                onChange={(val) => onFilterChange('chain_id', val)}
                options={filterOptions.chains || []}
            />

            {/* 2. Manpower Type */}
            <FilterSelect
                label="Manpower Type"
                value={filters.manpower_type}
                onChange={(val) => onFilterChange('manpower_type', val)}
                options={[
                    { label: 'Promoter', value: 'promoter' },
                    { label: 'Merchandiser', value: 'merchandiser' }
                ]}
            />

            {/* 3. Accounts */}
            <FilterSelect
                label="Accounts"
                value={filters.account}
                onChange={(val) => onFilterChange('account', val)}
                options={filterOptions.chains || []}
            />

            {/* 4. Head / NPM (from DB stores.npm_id) */}
            <FilterSelect
                label="Head / NPM"
                value={filters.npm_id}
                onChange={(val) => onFilterChange('npm_id', val)}
                options={filterOptions.npms || []}
            />

            {/* 5. ASM (from DB stores.asm_id) */}
            <FilterSelect
                label="ASM"
                value={filters.asm_id}
                onChange={(val) => onFilterChange('asm_id', val)}
                options={filterOptions.asms || []}
            />

            {/* 6. AASM / TA (from DB stores.ta_id) */}
            <FilterSelect
                label="AASM / TA"
                value={filters.ta_id}
                onChange={(val) => onFilterChange('ta_id', val)}
                options={filterOptions.tas || []}
            />

            {/* 7. SE / TL (from DB stores.tl_id) */}
            <FilterSelect
                label="SE / Team Leader"
                value={filters.tl_id}
                onChange={(val) => onFilterChange('tl_id', val)}
                options={filterOptions.team_leaders || []}
            />

            {/* 8. Zone */}
            <FilterSelect
                label="Zone"
                value={filters.zone}
                onChange={(val) => onFilterChange('zone', val)}
                options={filterOptions.zones || []}
            />

            {/* 9. State */}
            <FilterSelect
                label="State"
                value={filters.state}
                onChange={(val) => onFilterChange('state', val)}
                options={filterOptions.states || []}
            />

            {/* 10. City */}
            <FilterSelect
                label="City"
                value={filters.city}
                onChange={(val) => onFilterChange('city', val)}
                options={filterOptions.cities || []}
            />
        </div>
    );
};

export default PageFiltersSidebar;
