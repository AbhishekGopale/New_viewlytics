import React, { useState, useEffect, useRef } from 'react';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS_LIST = [2024, 2025, 2026, 2027, 2028];

function padZero(n) {
    return n < 10 ? '0' + n : '' + n;
}

function formatDateObj(d) {
    const y = d.getFullYear();
    const m = padZero(d.getMonth() + 1);
    const day = padZero(d.getDate());
    return `${y}-${m}-${day}`;
}

export function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    const y = parts[0];
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    return `${d} ${MONTH_NAMES[m] || ''}, ${y}`;
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay(); // 0 = Sunday
}

function generateCalendarGrid(year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);
    const grid = [];

    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
        grid.push({
            day: daysInPrevMonth - i,
            month: month === 0 ? 11 : month - 1,
            year: month === 0 ? year - 1 : year,
            isCurrentMonth: false
        });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        grid.push({
            day: d,
            month: month,
            year: year,
            isCurrentMonth: true
        });
    }

    // Next month padding to fill 35 or 42 cells
    const totalCells = grid.length > 35 ? 42 : 35;
    let nextDay = 1;
    while (grid.length < totalCells) {
        grid.push({
            day: nextDay++,
            month: month === 11 ? 0 : month + 1,
            year: month === 11 ? year + 1 : year,
            isCurrentMonth: false
        });
    }

    return grid;
}

const DateRangePicker = ({ startDate, endDate, onApply }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [draftStart, setDraftStart] = useState(startDate || formatDateObj(new Date()));
    const [draftEnd, setDraftEnd] = useState(endDate || formatDateObj(new Date()));

    const startParts = (startDate || formatDateObj(new Date())).split('-');
    const [startMonth, setStartMonth] = useState(parseInt(startParts[1], 10) - 1);
    const [startYear, setStartYear] = useState(parseInt(startParts[0], 10));

    const endParts = (endDate || formatDateObj(new Date())).split('-');
    const [endMonth, setEndMonth] = useState(parseInt(endParts[1], 10) - 1);
    const [endYear, setEndYear] = useState(parseInt(endParts[0], 10));

    const popoverRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setDraftStart(startDate || formatDateObj(new Date()));
            setDraftEnd(endDate || formatDateObj(new Date()));
            const sP = (startDate || formatDateObj(new Date())).split('-');
            const eP = (endDate || formatDateObj(new Date())).split('-');
            setStartMonth(parseInt(sP[1], 10) - 1);
            setStartYear(parseInt(sP[0], 10));
            setEndMonth(parseInt(eP[1], 10) - 1);
            setEndYear(parseInt(eP[0], 10));
        }
    }, [isOpen, startDate, endDate]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleApply = () => {
        let s = draftStart;
        let e = draftEnd;
        if (s > e) {
            const temp = s;
            s = e;
            e = temp;
        }
        onApply(s, e);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setDraftStart(startDate);
        setDraftEnd(endDate);
        setIsOpen(false);
    };

    const renderCalendarPane = (title, currentMonth, currentYear, selectedDateStr, onSelectDate, onPrev, onNext, onMonthChange, onYearChange) => {
        const grid = generateCalendarGrid(currentYear, currentMonth);
        const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        return (
            <div style={{ width: '270px', padding: '16px' }}>
                <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#52525b', marginBottom: '14px' }}>
                    {title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <button
                        type="button"
                        onClick={onPrev}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#52525b' }}
                    >
                        <i className="pi pi-chevron-left" />
                    </button>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <select
                            value={currentMonth}
                            onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
                            style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '13px', fontWeight: '600', color: '#18181b', background: '#ffffff', cursor: 'pointer', outline: 'none' }}
                        >
                            {MONTH_NAMES.map((m, idx) => (
                                <option key={m} value={idx}>{m}</option>
                            ))}
                        </select>
                        <select
                            value={currentYear}
                            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
                            style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '13px', fontWeight: '600', color: '#18181b', background: '#ffffff', cursor: 'pointer', outline: 'none' }}
                        >
                            {YEARS_LIST.map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={onNext}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#52525b' }}
                    >
                        <i className="pi pi-chevron-right" />
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
                    {weekdays.map((w) => (
                        <div key={w} style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa' }}>
                            {w}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                    {grid.map((cell, idx) => {
                        const dateStr = `${cell.year}-${padZero(cell.month + 1)}-${padZero(cell.day)}`;
                        const isSelected = dateStr === selectedDateStr;
                        const isInRange = dateStr >= draftStart && dateStr <= draftEnd && cell.isCurrentMonth;
                        const bg = isSelected ? '#18181b' : (isInRange ? '#f4f4f5' : 'transparent');
                        const color = isSelected ? '#ffffff' : (cell.isCurrentMonth ? '#18181b' : '#d4d4d8');
                        return (
                            <div
                                key={idx}
                                onClick={() => { if (cell.isCurrentMonth) onSelectDate(dateStr); }}
                                style={{
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '13px',
                                    cursor: cell.isCurrentMonth ? 'pointer' : 'default',
                                    background: bg,
                                    color: color,
                                    fontWeight: isSelected ? '700' : '400',
                                    borderRadius: isSelected ? '8px' : (isInRange ? '4px' : '0'),
                                    userSelect: 'none'
                                }}
                            >
                                {cell.day}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const triggerText = `${formatDisplayDate(startDate)} – ${formatDisplayDate(endDate)}`;

    return (
        <div ref={popoverRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#1e293b',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    transition: 'all 0.15s ease'
                }}
            >
                <span>{triggerText}</span>
                <i className="pi pi-calendar" style={{ fontSize: '14px', color: '#64748b' }} />
            </button>

            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 'calc(100% + 8px)',
                        right: 0,
                        zIndex: 9999,
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '560px'
                    }}
                >
                    <div style={{ display: 'flex', borderBottom: '1px solid #f1f5f9' }}>
                        {renderCalendarPane(
                            'Start Date',
                            startMonth,
                            startYear,
                            draftStart,
                            (d) => setDraftStart(d),
                            () => {
                                if (startMonth === 0) { setStartMonth(11); setStartYear(startYear - 1); }
                                else { setStartMonth(startMonth - 1); }
                            },
                            () => {
                                if (startMonth === 11) { setStartMonth(0); setStartYear(startYear + 1); }
                                else { setStartMonth(startMonth + 1); }
                            },
                            (m) => setStartMonth(m),
                            (y) => setStartYear(y)
                        )}
                        <div style={{ width: '1px', background: '#f1f5f9' }} />
                        {renderCalendarPane(
                            'End Date',
                            endMonth,
                            endYear,
                            draftEnd,
                            (d) => setDraftEnd(d),
                            () => {
                                if (endMonth === 0) { setEndMonth(11); setEndYear(endYear - 1); }
                                else { setEndMonth(endMonth - 1); }
                            },
                            () => {
                                if (endMonth === 11) { setEndMonth(0); setEndYear(endYear + 1); }
                                else { setEndMonth(endMonth + 1); }
                            },
                            (m) => setEndMonth(m),
                            (y) => setEndYear(y)
                        )}
                    </div>

                    <div style={{ padding: '12px 18px', display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#ffffff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                        <button
                            type="button"
                            onClick={handleCancel}
                            style={{ background: 'transparent', border: 'none', padding: '7px 16px', fontSize: '13px', fontWeight: '600', color: '#18181b', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleApply}
                            style={{ background: '#71717a', border: 'none', borderRadius: '8px', padding: '7px 18px', fontSize: '13px', fontWeight: '600', color: '#ffffff', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
