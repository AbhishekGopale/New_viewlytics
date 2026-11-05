import { TabMenu } from 'primereact/tabmenu';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AttendanceAnalysis from '../views/pages/userPages/AttendanceAnalysis';
import OssReport from '../views/pages/userPages/OssReport';
import ShairOfShell from '../views/pages/userPages/ShairOfShell';
import Merchandise from '../views/pages/userPages/Merchandise';
import SalesAnalysis from '../views/pages/userPages/SalesAnalysis';

const TabBar = () => {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const navigate = useNavigate();
    const wizardItems = [
        { label: 'Attendance Analysis', command: () => navigate('attendance/attendence-analysis') },
        { label: 'Shair of Shelf', command: () => navigate('attendance/shair-of-shell') },
        { label: 'OSS Report Analysis', command: () => navigate('attendance/oss-report') },
        { label: 'Sales Analysis', command: () => navigate('attendance/sales-analysis') },
        { label: 'Merchandising', command: () => navigate('attendance/merchandise') }
    ];
    return (
        <div className='mb-6 mt-2 col-12'>
            <TabMenu model={wizardItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            <Routes>
                <Route path={'attendance/attendence-analysis'} element={<AttendanceAnalysis />} />
                <Route path={'attendance/shair-of-shell'} element={<ShairOfShell />} />
                <Route path={'attendance/oss-report'} element={<OssReport />} />
                <Route path={'attendance/sales-analysis'} element={<SalesAnalysis />} />
                <Route path={'attendance/merchandise'} element={<Merchandise />} />
            </Routes>
        </div>
    );
};

export default TabBar;
