/**
 * Viewlytics - Executive Dashboard Modular Add-On
 * Runs natively inside the authentic AWS PrimeReact production runtime.
 * Implements:
 * - Dual-Pane Start Date / End Date Range Picker (matching exact UI)
 * - Top Project Selector (scoped under user)
 * - Right Sidebar "Page filters" panel (matching exact UI)
 * - Excel / CSV Data Export with filename attendance$project$datetime
 * - Attendance Trend Chart moved to the BOTTOM
 * - Strict User ID Scoping across all metrics and tables
 */
(function () {
  'use strict';

  var MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var YEARS_LIST = [2024, 2025, 2026, 2027, 2028];

  function padZero(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function formatDateObj(d) {
    var y = d.getFullYear();
    var m = padZero(d.getMonth() + 1);
    var day = padZero(d.getDate());
    return y + '-' + m + '-' + day;
  }

  function getTodayString() {
    return formatDateObj(new Date());
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    var parts = dateStr.split('-');
    if (parts.length < 3) return dateStr;
    var y = parts[0];
    var m = parseInt(parts[1], 10) - 1;
    var d = parseInt(parts[2], 10);
    return d + ' ' + (MONTH_NAMES[m] || '') + ', ' + y;
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay(); // 0 = Sunday
  }

  function generateCalendarGrid(year, month) {
    var daysInMonth = getDaysInMonth(year, month);
    var firstDay = getFirstDayOfMonth(year, month);
    var daysInPrevMonth = getDaysInMonth(year, month - 1);
    var grid = [];

    // Previous month padding
    for (var i = firstDay - 1; i >= 0; i--) {
      grid.push({
        day: daysInPrevMonth - i,
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (var d = 1; d <= daysInMonth; d++) {
      grid.push({
        day: d,
        month: month,
        year: year,
        isCurrentMonth: true
      });
    }

    // Next month padding to complete 35 or 42 cells
    var totalCells = grid.length > 35 ? 42 : 35;
    var nextDay = 1;
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

  function getAuthToken() {
    var token = sessionStorage.getItem('accessToken') || localStorage.getItem('token') || '';
    try {
      token = JSON.parse(token);
    } catch (e) {}
    if (typeof token === 'string') {
      token = token.trim();
      if (token.startsWith('Bearer ')) return token;
      return 'Bearer ' + token;
    }
    return '';
  }

  /**
   * Dual-Pane Date Range Picker Component
   * Matches reference image with Start Date & End Date side-by-side calendars,
   * Month/Year selectors, quick chevron navigation, and Cancel / Apply footer buttons.
   */
  function DualDateRangePicker(props) {
    var React = window.React || (window.Cx && window.Cx.React);
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useRef = React.useRef;

    var [isOpen, setIsOpen] = useState(false);
    var [draftStart, setDraftStart] = useState(props.startDate || getTodayString());
    var [draftEnd, setDraftEnd] = useState(props.endDate || getTodayString());

    var startParts = (props.startDate || getTodayString()).split('-');
    var [startMonth, setStartMonth] = useState(parseInt(startParts[1], 10) - 1);
    var [startYear, setStartYear] = useState(parseInt(startParts[0], 10));

    var endParts = (props.endDate || getTodayString()).split('-');
    var [endMonth, setEndMonth] = useState(parseInt(endParts[1], 10) - 1);
    var [endYear, setEndYear] = useState(parseInt(endParts[0], 10));

    var popoverRef = useRef(null);

    useEffect(function () {
      if (isOpen) {
        setDraftStart(props.startDate || getTodayString());
        setDraftEnd(props.endDate || getTodayString());
        var sP = (props.startDate || getTodayString()).split('-');
        var eP = (props.endDate || getTodayString()).split('-');
        setStartMonth(parseInt(sP[1], 10) - 1);
        setStartYear(parseInt(sP[0], 10));
        setEndMonth(parseInt(eP[1], 10) - 1);
        setEndYear(parseInt(eP[0], 10));
      }
    }, [isOpen, props.startDate, props.endDate]);

    useEffect(function () {
      function handleClickOutside(event) {
        if (popoverRef.current && !popoverRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      return function () {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    var handlePrevMonthStart = function () {
      if (startMonth === 0) { setStartMonth(11); setStartYear(startYear - 1); }
      else { setStartMonth(startMonth - 1); }
    };
    var handleNextMonthStart = function () {
      if (startMonth === 11) { setStartMonth(0); setStartYear(startYear + 1); }
      else { setStartMonth(startMonth + 1); }
    };

    var handlePrevMonthEnd = function () {
      if (endMonth === 0) { setEndMonth(11); setEndYear(endYear - 1); }
      else { setEndMonth(endMonth - 1); }
    };
    var handleNextMonthEnd = function () {
      if (endMonth === 11) { setEndMonth(0); setEndYear(endYear + 1); }
      else { setEndMonth(endMonth + 1); }
    };

    var handleApply = function () {
      var s = draftStart;
      var e = draftEnd;
      if (s > e) {
        var temp = s;
        s = e;
        e = temp;
      }
      props.onApply(s, e);
      setIsOpen(false);
    };

    var handleCancel = function () {
      setDraftStart(props.startDate);
      setDraftEnd(props.endDate);
      setIsOpen(false);
    };

    var renderCalendarPane = function (title, currentMonth, currentYear, selectedDateStr, onSelectDate, onPrev, onNext, onMonthChange, onYearChange) {
      var grid = generateCalendarGrid(currentYear, currentMonth);
      var weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

      return React.createElement(
        'div',
        { style: { width: '270px', padding: '16px' } },
        React.createElement('div', { style: { textAlign: 'center', fontSize: '14px', fontWeight: '700', color: '#52525b', marginBottom: '14px' } }, title),
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' } },
          React.createElement('button', { type: 'button', onClick: onPrev, style: { background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#52525b' } }, React.createElement('i', { className: 'pi pi-chevron-left' })),
          React.createElement(
            'div',
            { style: { display: 'flex', gap: '6px' } },
            React.createElement('select', {
              value: currentMonth,
              onChange: function (e) { onMonthChange(parseInt(e.target.value, 10)); },
              style: { padding: '4px 8px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '13px', fontWeight: '600', color: '#18181b', background: '#ffffff', cursor: 'pointer', outline: 'none' }
            }, MONTH_NAMES.map(function (m, idx) { return React.createElement('option', { key: m, value: idx }, m); })),
            React.createElement('select', {
              value: currentYear,
              onChange: function (e) { onYearChange(parseInt(e.target.value, 10)); },
              style: { padding: '4px 8px', borderRadius: '8px', border: '1px solid #e4e4e7', fontSize: '13px', fontWeight: '600', color: '#18181b', background: '#ffffff', cursor: 'pointer', outline: 'none' }
            }, YEARS_LIST.map(function (y) { return React.createElement('option', { key: y, value: y }, y); }))
          ),
          React.createElement('button', { type: 'button', onClick: onNext, style: { background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px 8px', color: '#52525b' } }, React.createElement('i', { className: 'pi pi-chevron-right' }))
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' } },
          weekdays.map(function (w) { return React.createElement('div', { key: w, style: { fontSize: '12px', fontWeight: '600', color: '#a1a1aa' } }, w); })
        ),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' } },
          grid.map(function (cell, idx) {
            var dateStr = cell.year + '-' + padZero(cell.month + 1) + '-' + padZero(cell.day);
            var isSelected = dateStr === selectedDateStr;
            var isInRange = dateStr >= draftStart && dateStr <= draftEnd && cell.isCurrentMonth;
            var bg = isSelected ? '#27272a' : (isInRange ? '#f4f4f5' : 'transparent');
            var color = isSelected ? '#ffffff' : (cell.isCurrentMonth ? '#18181b' : '#d4d4d8');
            return React.createElement('div', {
              key: idx,
              onClick: function () { if (cell.isCurrentMonth) onSelectDate(dateStr); },
              style: {
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
              }
            }, cell.day);
          })
        )
      );
    };

    var triggerText = formatDisplayDate(props.startDate) + ' – ' + formatDisplayDate(props.endDate);

    return React.createElement(
      'div',
      { ref: popoverRef, style: { position: 'relative', display: 'inline-block' } },
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: function () { setIsOpen(!isOpen); },
          style: {
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '7px 14px',
            fontSize: '13px',
            fontWeight: '600',
            color: '#1e293b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }
        },
        React.createElement('span', null, triggerText),
        React.createElement('i', { className: 'pi pi-calendar', style: { color: '#64748b', fontSize: '14px' } })
      ),
      isOpen && React.createElement(
        'div',
        {
          style: {
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 1100,
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e4e4e7',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column'
          }
        },
        React.createElement('div', { style: { display: 'flex', flexDirection: 'row' } },
          renderCalendarPane('Start Date', startMonth, startYear, draftStart, function (d) { setDraftStart(d); }, handlePrevMonthStart, handleNextMonthStart, setStartMonth, setStartYear),
          React.createElement('div', { style: { width: '1px', background: '#f1f5f9' } }),
          renderCalendarPane('End Date', endMonth, endYear, draftEnd, function (d) { setDraftEnd(d); }, handlePrevMonthEnd, handleNextMonthEnd, setEndMonth, setEndYear)
        ),
        React.createElement(
          'div',
          { style: { borderTop: '1px solid #f1f5f9', padding: '12px 18px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '14px' } },
          React.createElement('button', { type: 'button', onClick: handleCancel, style: { background: 'transparent', border: 'none', color: '#18181b', fontWeight: '700', fontSize: '14px', cursor: 'pointer', padding: '6px 12px' } }, 'Cancel'),
          React.createElement('button', { type: 'button', onClick: handleApply, style: { background: '#71717a', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 22px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' } }, 'Apply')
        )
      )
    );
  }

  /**
   * Main Executive Dashboard View
   */
  function ExecutiveDashboard() {
    var Cx = window.Cx || {};
    var React = window.React || Cx.React;

    if (!React) {
      return null;
    }

    var useState = React.useState;
    var useEffect = React.useEffect;
    var useMemo = React.useMemo;

    var [loading, setLoading] = useState(true);
    var [startDate, setStartDate] = useState(getTodayString());
    var [endDate, setEndDate] = useState(getTodayString());
    var [selectedProjectId, setSelectedProjectId] = useState('');
    var [selectedZone, setSelectedZone] = useState('');
    var [selectedState, setSelectedState] = useState('');
    var [selectedCity, setSelectedCity] = useState('');
    var [selectedChain, setSelectedChain] = useState('');
    var [selectedManpowerType, setSelectedManpowerType] = useState('');
    var [selectedManager, setSelectedManager] = useState('');
    var [statusFilter, setStatusFilter] = useState('all');
    var [searchTerm, setSearchTerm] = useState('');
    var [activeNavTab, setActiveNavTab] = useState('manpower');

    var [summary, setSummary] = useState(null);
    var [trendData, setTrendData] = useState([]);
    var [submissions, setSubmissions] = useState([]);
    var [filterOptions, setFilterOptions] = useState({
      projects: [],
      zones: [],
      states: [],
      cities: [],
      chains: [],
      asms: [],
      team_leaders: []
    });

    // Fetch live data from backend APIs
    var fetchExecutiveData = function (sDate, eDate, projId, zoneVal, stateVal, cityVal, chainVal) {
      setLoading(true);
      var token = getAuthToken();
      var headers = {
        'Content-Type': 'application/json',
        Authorization: token
      };

      var s = sDate || startDate || getTodayString();
      var e = eDate || endDate || s;
      var query = [
        'startDate=' + encodeURIComponent(s),
        'endDate=' + encodeURIComponent(e)
      ];

      var pId = projId !== undefined ? projId : selectedProjectId;
      if (pId) query.push('project_id=' + encodeURIComponent(pId));

      var zVal = zoneVal !== undefined ? zoneVal : selectedZone;
      if (zVal) query.push('zone=' + encodeURIComponent(zVal));

      var stVal = stateVal !== undefined ? stateVal : selectedState;
      if (stVal) query.push('state=' + encodeURIComponent(stVal));

      var cVal = cityVal !== undefined ? cityVal : selectedCity;
      if (cVal) query.push('city=' + encodeURIComponent(cVal));

      var chVal = chainVal !== undefined ? chainVal : selectedChain;
      if (chVal) query.push('chain_id=' + encodeURIComponent(chVal));

      var qs = '?' + query.join('&');

      Promise.all([
        fetch('/api/v1/web/executive/attendance-summary' + qs, { headers }).then(function (r) { return r.json(); }),
        fetch('/api/v1/web/executive/attendance-trend' + qs, { headers }).then(function (r) { return r.json(); }),
        fetch('/api/v1/web/executive/attendance-submissions' + qs + '&limit=300', { headers }).then(function (r) { return r.json(); }),
        fetch('/api/v1/web/executive/filter-options', { headers }).then(function (r) { return r.json(); })
      ])
        .then(function (results) {
          var sumRes = results[0];
          var trendRes = results[1];
          var subRes = results[2];
          var optRes = results[3];

          if (sumRes && sumRes.statusCode === 200 && sumRes.data) {
            setSummary(sumRes.data);
          }
          if (trendRes && trendRes.statusCode === 200 && trendRes.data && Array.isArray(trendRes.data.trend)) {
            setTrendData(trendRes.data.trend);
          }
          if (subRes && subRes.statusCode === 200 && subRes.data) {
            var list = Array.isArray(subRes.data)
              ? subRes.data
              : (subRes.data.submissions && Array.isArray(subRes.data.submissions) ? subRes.data.submissions : []);
            setSubmissions(list);
          }
          if (optRes && optRes.statusCode === 200 && optRes.data) {
            setFilterOptions(optRes.data);
          }
        })
        .catch(function (err) {
          console.error('Executive Dashboard API fetch error:', err);
        })
        .finally(function () {
          setLoading(false);
        });
    };

    useEffect(function () {
      fetchExecutiveData(startDate, endDate, selectedProjectId, selectedZone, selectedState, selectedCity, selectedChain);
    }, [startDate, endDate, selectedProjectId, selectedZone, selectedState, selectedCity, selectedChain]);

    var handleApplyDateRange = function (newStart, newEnd) {
      setStartDate(newStart);
      setEndDate(newEnd);
    };

    var handleResetFilters = function () {
      setSelectedProjectId('');
      setSelectedZone('');
      setSelectedState('');
      setSelectedCity('');
      setSelectedChain('');
      setSelectedManpowerType('');
      setSelectedManager('');
      setStatusFilter('all');
      setSearchTerm('');
    };

    // Filter submissions client-side
    var filteredSubmissions = useMemo(function () {
      var list = submissions || [];
      if (statusFilter !== 'all') {
        if (statusFilter === 'present') {
          list = list.filter(function (s) { return s.attendance_option !== 'Not Login' && s.attendance_option !== 'Week Off'; });
        } else if (statusFilter === 'week_off') {
          list = list.filter(function (s) { return s.attendance_option === 'Week Off'; });
        } else if (statusFilter === 'not_login') {
          list = list.filter(function (s) { return s.attendance_option === 'Not Login'; });
        }
      }
      if (selectedManpowerType) {
        list = list.filter(function (s) {
          return (s.manpower_type || '').toLowerCase() === selectedManpowerType.toLowerCase();
        });
      }
      if (searchTerm && searchTerm.trim() !== '') {
        var term = searchTerm.toLowerCase().trim();
        list = list.filter(function (s) {
          return (
            (s.manpower_name && s.manpower_name.toLowerCase().includes(term)) ||
            (s.manpower_code && s.manpower_code.toLowerCase().includes(term)) ||
            (s.store_name && s.store_name.toLowerCase().includes(term)) ||
            (s.manpower_type && s.manpower_type.toLowerCase().includes(term))
          );
        });
      }
      return list;
    }, [submissions, statusFilter, selectedManpowerType, searchTerm]);

    // Active project name for export filename
    var currentProjectName = useMemo(function () {
      if (!selectedProjectId) {
        if (filterOptions.projects && filterOptions.projects.length === 1) {
          return filterOptions.projects[0].label;
        }
        return 'ALL_PROJECTS';
      }
      var found = (filterOptions.projects || []).find(function (p) { return String(p.value) === String(selectedProjectId); });
      return found ? found.label : 'PROJECT_' + selectedProjectId;
    }, [selectedProjectId, filterOptions.projects]);

    // Excel / CSV Export Function
    var handleExportExcel = function () {
      if (!filteredSubmissions || filteredSubmissions.length === 0) {
        alert('No attendance data available to export for the selected filters.');
        return;
      }

      var now = new Date();
      var dtStr = now.getFullYear() + '-' +
        padZero(now.getMonth() + 1) + '-' +
        padZero(now.getDate()) + '_' +
        padZero(now.getHours()) + '-' +
        padZero(now.getMinutes()) + '-' +
        padZero(now.getSeconds());

      var cleanProj = currentProjectName.replace(/[^a-zA-Z0-9_-]/g, '_');
      var filename = 'attendance$' + cleanProj + '$' + dtStr + '.csv';

      var headers = [
        'Manpower Code',
        'Manpower Name',
        'Manpower Type',
        'Attendance Date',
        'Attendance Option',
        'Submitted At',
        'Check Out Time',
        'Store Name',
        'City',
        'Zone'
      ];

      var csvRows = [headers.join(',')];

      filteredSubmissions.forEach(function (row) {
        var values = [
          row.manpower_code || '',
          row.manpower_name || '',
          row.manpower_type || '',
          row.attendance_date || '',
          row.attendance_option || '',
          row.submitted_at || '',
          row.check_out_time || '',
          row.store_name || '',
          row.city || '',
          row.zone || ''
        ].map(function (val) {
          var str = '' + val;
          str = str.replace(/"/g, '""');
          return '"' + str + '"';
        });
        csvRows.push(values.join(','));
      });

      var csvContent = '\uFEFF' + csvRows.join('\r\n');
      var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement('a');
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // KPI Values
    var attPct = summary && summary.attendance_percentage ? summary.attendance_percentage : '0.00%';
    var attRate = summary && summary.attendance_rate !== undefined ? summary.attendance_rate : 0;
    var totalLogin = summary && summary.today_checkins !== undefined ? summary.today_checkins : 0;
    var weekOff = summary && summary.week_off_count !== undefined ? summary.week_off_count : 0;
    var totalActive = summary && summary.total_active_users !== undefined ? summary.total_active_users : 0;
    var notLogin = summary && summary.not_login_count !== undefined ? summary.not_login_count : 0;
    var userContext = summary && summary.user_context ? summary.user_context : null;

    var progressColor = attRate >= 80 ? '#10b981' : (attRate >= 50 ? '#f59e0b' : '#ef4444');

    // Chart Configuration for Trend
    var chartData = useMemo(function () {
      if (!trendData || trendData.length === 0) return null;
      var labels = trendData.map(function (d) { return d.label || d.date; });
      var rates = trendData.map(function (d) { return d.attendance_rate; });
      var checkins = trendData.map(function (d) { return d.checkins; });

      return {
        labels: labels,
        datasets: [
          {
            label: 'Attendance Rate (%)',
            data: rates,
            fill: true,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Check-ins',
            data: checkins,
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            type: 'bar',
            yAxisID: 'y1'
          }
        ]
      };
    }, [trendData]);

    var chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 12, font: { size: 12 } } },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          max: 100,
          ticks: { callback: function (v) { return v + '%'; } },
          grid: { color: 'rgba(0,0,0,0.05)' }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { precision: 0 }
        }
      }
    };

    var renderStatusTag = function (rowData) {
      var opt = rowData.attendance_option || 'Not Login';
      var bg = '#fee2e2';
      var color = '#b91c1c';

      if (opt === 'Present') {
        bg = '#dcfce7';
        color = '#15803d';
      } else if (opt === 'Week Off') {
        bg = '#e0f2fe';
        color = '#0369a1';
      } else if (opt !== 'Not Login') {
        bg = '#fef3c7';
        color = '#b45309';
      }

      return React.createElement(
        'span',
        {
          style: {
            backgroundColor: bg,
            color: color,
            padding: '3px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            display: 'inline-block'
          }
        },
        opt
      );
    };

    var tabs = [
      { id: 'manpower', label: 'Manpower' },
      { id: 'summary', label: 'Summary', disabled: true },
      { id: 'osa', label: 'On Shelf Availability', disabled: true },
      { id: 'sos', label: 'Share Of Shelf', disabled: true },
      { id: 'promo', label: 'Promo', disabled: true },
      { id: 'assets', label: 'Assets', disabled: true },
      { id: 'sales', label: 'Sales', disabled: true }
    ];

    return React.createElement(
      'div',
      { style: { padding: '16px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'inherit' } },

      // 1. TOP HEADER & FILTER BAR (With Top Project Filter & Dual Date Picker)
      React.createElement(
        'div',
        {
          style: {
            background: '#ffffff',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
          }
        },
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' } },

          // Title & User Context
          React.createElement(
            'div',
            null,
            React.createElement('h2', { style: { margin: 0, fontSize: '20px', fontWeight: '700', color: '#1e293b' } }, 'Retail Execution Dashboard'),
            userContext && React.createElement(
              'div',
              { style: { fontSize: '13px', color: '#64748b', marginTop: '4px' } },
              'User: ',
              React.createElement('strong', { style: { color: '#0f172a' } }, userContext.name),
              ' (',
              (userContext.role_name || '').toUpperCase(),
              ')'
            )
          ),

          // Top Controls: Project Selector + Date Range Picker + Refresh
          React.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } },

            // Top Project Dropdown (Matching PARAG ⌵ in Image 1)
            filterOptions.projects && filterOptions.projects.length > 0 && React.createElement(
              'select',
              {
                value: selectedProjectId,
                onChange: function (e) { setSelectedProjectId(e.target.value); },
                style: {
                  padding: '7px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#1e293b',
                  cursor: 'pointer',
                  outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }
              },
              React.createElement('option', { value: '' }, 'All Projects'),
              filterOptions.projects.map(function (p) {
                return React.createElement('option', { key: p.value, value: p.value }, p.label);
              })
            ),

            // Dual Date Range Picker
            React.createElement(DualDateRangePicker, {
              startDate: startDate,
              endDate: endDate,
              onApply: handleApplyDateRange
            }),

            // Refresh Button
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: function () {
                  fetchExecutiveData(startDate, endDate, selectedProjectId, selectedZone, selectedState, selectedCity, selectedChain);
                },
                style: {
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '7px 11px',
                  cursor: 'pointer'
                },
                title: 'Refresh Data'
              },
              React.createElement('i', { className: 'pi pi-refresh' + (loading ? ' pi-spin' : '') })
            )
          )
        ),

        // Section Tabs Row (Matching Image 1)
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid #e2e8f0', paddingTop: '12px', overflowX: 'auto' } },
          tabs.map(function (tab) {
            var isActive = activeNavTab === tab.id;
            return React.createElement(
              'button',
              {
                key: tab.id,
                type: 'button',
                disabled: tab.disabled,
                onClick: function () { if (!tab.disabled) setActiveNavTab(tab.id); },
                style: {
                  background: isActive ? '#2563eb' : 'transparent',
                  color: isActive ? '#ffffff' : (tab.disabled ? '#94a3b8' : '#475569'),
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '500',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  opacity: tab.disabled ? 0.6 : 1,
                  whiteSpace: 'nowrap'
                }
              },
              tab.label,
              tab.disabled && React.createElement('span', { style: { fontSize: '10px', marginLeft: '6px', background: '#e2e8f0', padding: '1px 5px', borderRadius: '4px', color: '#64748b' } }, 'Later')
            );
          })
        )
      ),

      // 2. MAIN BODY LAYOUT: Content Area (Left ~78%) + Page filters Sidebar (Right ~22%) (Matching Image 1)
      React.createElement(
        'div',
        { style: { display: 'flex', gap: '16px', alignItems: 'flex-start' } },

        // LEFT COLUMN (Main Content Area)
        React.createElement(
          'div',
          { style: { flex: '1', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' } },

          // Overall Summary KPI Cards
          React.createElement(
            'div',
            { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' } },

            // Card 1: Attendance % with Progress Bar
            React.createElement(
              'div',
              { style: { background: '#ffffff', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid ' + progressColor } },
              React.createElement('div', { style: { fontSize: '13px', color: '#64748b', fontWeight: '600' } }, 'Attendance'),
              React.createElement('div', { style: { fontSize: '30px', fontWeight: '800', color: progressColor, margin: '6px 0' } }, attPct),
              React.createElement(
                'div',
                { style: { width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' } },
                React.createElement('div', {
                  style: {
                    width: Math.min(100, Math.max(0, attRate)) + '%',
                    height: '100%',
                    background: progressColor,
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                  }
                })
              )
            ),

            // Card 2: Total Logged In
            React.createElement(
              'div',
              { style: { background: '#ffffff', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid #10b981' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { fontSize: '13px', color: '#64748b', fontWeight: '600' } }, 'Total Login'),
                React.createElement('i', { className: 'pi pi-check-circle', style: { color: '#10b981', fontSize: '18px' } })
              ),
              React.createElement('div', { style: { fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '6px 0' } }, totalLogin),
              React.createElement('div', { style: { fontSize: '12px', color: '#64748b' } }, 'Checked in')
            ),

            // Card 3: Week Off
            React.createElement(
              'div',
              { style: { background: '#ffffff', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid #0ea5e9' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { fontSize: '13px', color: '#64748b', fontWeight: '600' } }, 'Week Off'),
                React.createElement('i', { className: 'pi pi-calendar', style: { color: '#0ea5e9', fontSize: '18px' } })
              ),
              React.createElement('div', { style: { fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '6px 0' } }, weekOff),
              React.createElement('div', { style: { fontSize: '12px', color: '#64748b' } }, 'Weekly off')
            ),

            // Card 4: Total Active Users
            React.createElement(
              'div',
              { style: { background: '#ffffff', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid #6366f1' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { fontSize: '13px', color: '#64748b', fontWeight: '600' } }, 'Total Active Users'),
                React.createElement('i', { className: 'pi pi-users', style: { color: '#6366f1', fontSize: '18px' } })
              ),
              React.createElement('div', { style: { fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '6px 0' } }, totalActive),
              React.createElement('div', { style: { fontSize: '12px', color: '#64748b' } }, 'Active team')
            ),

            // Card 5: Not Logged In
            React.createElement(
              'div',
              { style: { background: '#ffffff', borderRadius: '8px', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', borderTop: '4px solid #f43f5e' } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                React.createElement('div', { style: { fontSize: '13px', color: '#64748b', fontWeight: '600' } }, 'Not Logged In'),
                React.createElement('i', { className: 'pi pi-exclamation-triangle', style: { color: '#f43f5e', fontSize: '18px' } })
              ),
              React.createElement('div', { style: { fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '6px 0' } }, notLogin),
              React.createElement('div', { style: { fontSize: '12px', color: '#64748b' } }, 'Pending')
            )
          ),

          // Attendance Submission Table with Export Button
          React.createElement(
            'div',
            {
              style: {
                background: '#ffffff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }
            },
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' } },
              React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                React.createElement('h3', { style: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' } }, 'Attendance Submission'),
                React.createElement(
                  'span',
                  { style: { background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' } },
                  filteredSubmissions.length + ' records'
                )
              ),

              // Controls: Status Buttons + Search Input + EXPORT BUTTON
              React.createElement(
                'div',
                { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } },

                // Status Filter Pills
                ['all', 'present', 'week_off', 'not_login'].map(function (st) {
                  var isSelected = statusFilter === st;
                  var label = st === 'all' ? 'All' : (st === 'present' ? 'Present' : (st === 'week_off' ? 'Week Off' : 'Not Login'));
                  return React.createElement(
                    'button',
                    {
                      key: st,
                      type: 'button',
                      onClick: function () { setStatusFilter(st); },
                      style: {
                        background: isSelected ? '#0f172a' : '#f1f5f9',
                        color: isSelected ? '#ffffff' : '#475569',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }
                    },
                    label
                  );
                }),

                // Search Input
                React.createElement(
                  'div',
                  { className: 'p-input-icon-left' },
                  React.createElement('i', { className: 'pi pi-search' }),
                  React.createElement('input', {
                    type: 'text',
                    placeholder: 'Search name, code, store...',
                    value: searchTerm,
                    onChange: function (e) { setSearchTerm(e.target.value); },
                    className: 'p-inputtext p-component p-inputtext-sm',
                    style: { borderRadius: '6px', width: '200px' }
                  })
                ),

                // EXPORT TO EXCEL BUTTON
                React.createElement(
                  'button',
                  {
                    type: 'button',
                    onClick: handleExportExcel,
                    style: {
                      background: '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 1px 2px rgba(16,185,129,0.3)'
                    },
                    title: 'Export attendance to Excel (attendance$' + currentProjectName + '$datetime)'
                  },
                  React.createElement('i', { className: 'pi pi-download', style: { fontSize: '13px' } }),
                  'Export Excel'
                )
              )
            ),

            // PrimeReact DataTable
            React.createElement(
              Cx.DataTable || 'div',
              {
                value: filteredSubmissions,
                paginator: true,
                rows: 15,
                rowsPerPageOptions: [10, 15, 25, 50],
                className: 'p-datatable-sm p-datatable-gridlines p-datatable-striped',
                emptyMessage: 'No attendance records found for ' + formatDisplayDate(startDate) + ' – ' + formatDisplayDate(endDate),
                responsiveLayout: 'scroll'
              },
              React.createElement(Cx.Column, { field: 'manpower_code', header: 'Manpower Code', sortable: true, style: { width: '8rem', fontWeight: '600' } }),
              React.createElement(Cx.Column, { field: 'manpower_name', header: 'Manpower Name', sortable: true }),
              React.createElement(Cx.Column, { field: 'manpower_type', header: 'Manpower Type', sortable: true, style: { width: '9rem' } }),
              React.createElement(Cx.Column, { field: 'attendance_date', header: 'Attendance Date', sortable: true, style: { width: '8rem' } }),
              React.createElement(Cx.Column, { header: 'Attendance Option', body: renderStatusTag, sortable: true, style: { width: '10rem', textAlign: 'center' } }),
              React.createElement(Cx.Column, { field: 'submitted_at', header: 'Submitted At', sortable: true, style: { width: '8rem' } }),
              React.createElement(Cx.Column, { field: 'store_name', header: 'Store Name', sortable: true })
            )
          ),

          // ATTENDANCE TREND SECTION (MOVED TO BOTTOM AS REQUESTED)
          React.createElement(
            'div',
            {
              style: {
                background: '#ffffff',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
              }
            },
            React.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' } },
              React.createElement('h3', { style: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' } },
                'Attendance Trend (' + (trendData.length > 0 ? trendData[0].label + ' to ' + trendData[trendData.length - 1].label : 'Recent Days') + ')'
              ),
              React.createElement('span', { style: { fontSize: '12px', color: '#64748b' } }, 'Daily attendance rate vs team check-ins')
            ),
            chartData && Cx.Chart
              ? React.createElement(Cx.Chart, { type: 'line', data: chartData, options: chartOptions, style: { height: '240px' } })
              : React.createElement(
                  'div',
                  { style: { display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 0' } },
                  trendData.map(function (t) {
                    return React.createElement(
                      'div',
                      {
                        key: t.date,
                        style: {
                          flex: '1',
                          minWidth: '90px',
                          padding: '12px',
                          background: '#f8fafc',
                          borderRadius: '6px',
                          textAlign: 'center',
                          border: '1px solid #e2e8f0'
                        }
                      },
                      React.createElement('div', { style: { fontSize: '12px', color: '#64748b', fontWeight: '600' } }, t.label),
                      React.createElement('div', { style: { fontSize: '18px', fontWeight: '800', color: '#10b981', margin: '4px 0' } }, t.attendance_rate + '%'),
                      React.createElement('div', { style: { fontSize: '11px', color: '#475569' } }, t.checkins + ' / ' + t.total_team)
                    );
                  })
                )
          )
        ),

        // RIGHT COLUMN (Page Filters Sidebar matching Image 1)
        React.createElement(
          'div',
          {
            style: {
              width: '280px',
              minWidth: '280px',
              background: '#ffffff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }
          },
          // Sidebar Title & Info
          React.createElement(
            'div',
            null,
            React.createElement('h3', { style: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#0f172a' } }, 'Page filters'),
            React.createElement(
              'p',
              { style: { margin: '6px 0 0', fontSize: '12px', color: '#64748b', lineHeight: '1.4' } },
              'These filters are applicable to the current page. You can select one or more filters to narrow down your search results.'
            )
          ),

          React.createElement('hr', { style: { border: 'none', borderTop: '1px solid #f1f5f9', margin: '4px 0' } }),

          // 1. Project Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'Project'),
            React.createElement(
              'select',
              {
                value: selectedProjectId,
                onChange: function (e) { setSelectedProjectId(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Projects'),
              (filterOptions.projects || []).map(function (p) {
                return React.createElement('option', { key: p.value, value: p.value }, p.label);
              })
            )
          ),

          // 2. Store Type / Chain Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'Accounts / Chain'),
            React.createElement(
              'select',
              {
                value: selectedChain,
                onChange: function (e) { setSelectedChain(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Chains'),
              (filterOptions.chains || []).map(function (c) {
                return React.createElement('option', { key: c.value, value: c.value }, c.label);
              })
            )
          ),

          // 3. Manpower Type Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'Manpower Type'),
            React.createElement(
              'select',
              {
                value: selectedManpowerType,
                onChange: function (e) { setSelectedManpowerType(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Types'),
              React.createElement('option', { value: 'promoter' }, 'Promoter'),
              React.createElement('option', { value: 'merchandiser' }, 'Merchandiser')
            )
          ),

          // 4. Zone Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'Zone'),
            React.createElement(
              'select',
              {
                value: selectedZone,
                onChange: function (e) { setSelectedZone(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Zones'),
              (filterOptions.zones || []).map(function (z) {
                return React.createElement('option', { key: z.value, value: z.value }, z.label);
              })
            )
          ),

          // 5. State Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'State'),
            React.createElement(
              'select',
              {
                value: selectedState,
                onChange: function (e) { setSelectedState(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All States'),
              (filterOptions.states || []).map(function (st) {
                return React.createElement('option', { key: st.value, value: st.value }, st.label);
              })
            )
          ),

          // 6. City Filter
          React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'City'),
            React.createElement(
              'select',
              {
                value: selectedCity,
                onChange: function (e) { setSelectedCity(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Cities'),
              (filterOptions.cities || []).map(function (ct) {
                return React.createElement('option', { key: ct.value, value: ct.value }, ct.label);
              })
            )
          ),

          // 7. Team Leader / Manager Filter
          filterOptions.team_leaders && filterOptions.team_leaders.length > 0 && React.createElement(
            'div',
            null,
            React.createElement('label', { style: { display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' } }, 'Team Leader / Manager'),
            React.createElement(
              'select',
              {
                value: selectedManager,
                onChange: function (e) { setSelectedManager(e.target.value); },
                style: { width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', background: '#ffffff', color: '#1e293b' }
              },
              React.createElement('option', { value: '' }, 'All Managers'),
              filterOptions.team_leaders.map(function (tl) {
                return React.createElement('option', { key: tl.value, value: tl.value }, tl.label);
              })
            )
          ),

          // Reset Filters Button
          React.createElement(
            'button',
            {
              type: 'button',
              onClick: handleResetFilters,
              style: {
                marginTop: '10px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                color: '#475569',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }
            },
            React.createElement('i', { className: 'pi pi-filter-slash' }),
            'Reset Filters'
          )
        )
      )
    );
  }

  // Export to window
  window.ExecutiveDashboard = ExecutiveDashboard;
})();
