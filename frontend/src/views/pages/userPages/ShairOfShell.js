import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { GetShairOfShellDataRequest, getSosListRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import components from '../primeReactComponentsIndex';

const BASE_URL_API = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api/v1';

const ShairOfShell = () => {
    const { Chart, Column, DataTable, Divider, Carousel, Button, Toast } = components;
    const toast = useRef(null);
    const [exportLoading, setExportLoading] = useState(false);
    const [selectedChain, setSelectedChain] = useState([]);
    const [selectedZone, setSelectedZone] = useState([]);
    const { shairofshellchineData, shairofshellData, sosData } = useSelector((store) => store.userDashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedChain(sosData?.sos_data?.mapping?.[0]);
    }, [sosData]);

    useEffect(() => {
        setSelectedZone(shairofshellData?.zoneWise?.[0]);
    }, [shairofshellData?.zoneWise]);

    const chainTotalBodyTemplate = (data) => (
        <>
            <span className="p-column-title">Total store in the chain</span>
            {data.store}
        </>
    );
    const greaterChainBodyTemplate = (data) => (
        <>
            <span className="p-column-title">Total store in the chain</span>
            {data.up}
        </>
    );
    const lessChainBodyTemplate = (data) => (
        <>
            <span className="p-column-title">Total store in the chain</span>
            {data.down}
        </>
    );
    const activeStoreBodyTemplate = (data) => (
        <>
            <span className="p-column-title">Total store in the chain</span>
            {data.status?.[0]}
        </>
    );
    const chaniBodyTemplate = (data) => (
        <>
            <span className="p-column-title">Chain</span>
            {data.chain_name}
        </>
    );
    const zoneBodyTemplate = (data) => (
        <>
            <span className="p-column-title">{data.zone}</span>
        </>
    );
    const totalZoneStoreBodyTemplate = (data) => (
        <>
            <span className="p-column-title">{data.total_store}</span>
        </>
    );
    const activeStoreZoneWiseBodyTemplate = (data) => (
        <>
            <span className="p-column-title">{data.active_store}</span>
        </>
    );
    const greaterSosZoneWiseBodyTemplate = (data) => (
        <>
            <span className="p-column-title">{data.greater_sos}</span>
        </>
    );
    const lessSosZoneWiseBodyTemplate = (data) => (
        <>
            <span className="p-column-title">{data.less_sos}</span>
        </>
    );

    const activeStoreDataChainWise = useMemo(() => {
        return {
            labels: ['Active Stores', 'Inactive Stores'],
            datasets: [
                {
                    total: selectedChain?.store,
                    data: [selectedChain?.status?.[0], selectedChain?.status?.[1]],
                    backgroundColor: ['rgb(13, 71, 161)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedChain]);

    const activeStoreDataZoneWise = useMemo(() => {
        return {
            labels: ['Active Stores', 'Inactive Stores'],
            datasets: [
                {
                    total: selectedZone?.total_store,
                    data: [selectedZone?.active_store, (selectedZone?.total_store || 0) - (selectedZone?.active_store || 0)],
                    backgroundColor: ['rgb(13, 71, 161)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedZone]);

    const activeStoreOptions = useMemo(() => ({ cutout: '60%' }), []);

    const greaterSosDataChainWise = useMemo(() => {
        return {
            labels: ['<50% SOS', '>50% SOS'],
            datasets: [
                {
                    total: selectedChain?.store,
                    data: [selectedChain?.down, selectedChain?.up],
                    backgroundColor: ['rgb(13, 71, 161)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedChain]);

    const greaterSosDataZoneWise = useMemo(() => {
        return {
            labels: ['<50% SOS', '>50% SOS'],
            datasets: [
                {
                    total: 6,
                    data: [selectedZone?.greater_sos, 4],
                    backgroundColor: ['rgb(255, 0, 0)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedZone]);

    const greaterSosChartOptions = useMemo(() => ({ cutout: '60%' }), []);

    const lessSosDataChainWise = useMemo(() => {
        return {
            labels: ['>50% SOS', '<50% SOS'],
            datasets: [
                {
                    total: 4,
                    data: [selectedChain?.less_sos, 3],
                    backgroundColor: ['rgb(255, 255, 0)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedChain]);

    const lessSosDataZoneWise = useMemo(() => {
        return {
            labels: ['>50% SOS', '<50% SOS'],
            datasets: [
                {
                    total: 6,
                    data: [selectedZone?.less_sos, 5],
                    backgroundColor: ['rgb(255, 255, 0)', 'rgb(240, 240, 240)']
                }
            ]
        };
    }, [selectedZone]);

    const lessSosChartOptions = useMemo(() => ({ cutout: '60%' }), []);

    const productTemplate = (item) => {
        return (
            <div className="flex p-1">
                <div className="card w-10 m-1 p-3 sales-box" style={{ backgroundColor: '#c0c0c061', color: 'black' }}>
                    <div className="mb-2 text-center">{item?.chain}</div>
                    <div className="text-center">{item?.total}</div>
                </div>
            </div>
        );
    };

    const responsiveOptions = [
        { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
        { breakpoint: '991px', numVisible: 2, numScroll: 1 },
        { breakpoint: '767px', numVisible: 1, numScroll: 1 }
    ];

    useEffect(() => {
        dispatch(GetShairOfShellDataRequest());
        dispatch(getSosListRequest());
    }, [dispatch]);

    const getAuthToken = () => {
        const token = sessionStorage.getItem('accessToken') || localStorage.getItem('token') || localStorage.getItem('accessToken') || '';
        let cleanToken = token;
        try {
            cleanToken = JSON.parse(token);
        } catch (e) {}
        if (typeof cleanToken === 'string') {
            cleanToken = cleanToken.trim();
            if (cleanToken.startsWith('Bearer ')) return cleanToken;
            return `Bearer ${cleanToken}`;
        }
        return '';
    };

    const handleExportDump = async () => {
        setExportLoading(true);
        try {
            const res = await axios.post(`${BASE_URL_API}/web/report/sos_dump`, {}, {
                headers: {
                    Authorization: getAuthToken(),
                    'Content-Type': 'application/json'
                }
            });

            const rows = res.data?.data || [];
            if (!rows || rows.length === 0) {
                toast.current.show({
                    severity: 'info',
                    summary: 'No Data',
                    detail: 'No Share of Shelf records found to export.',
                    life: 3000
                });
                setExportLoading(false);
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(rows);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'SOS Dump');
            XLSX.writeFile(workbook, `Share_Of_Shelf_Dump_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);

            toast.current.show({
                severity: 'success',
                summary: 'Export Successful',
                detail: `Exported ${rows.length} Share of Shelf records.`,
                life: 3000
            });
        } catch (err) {
            console.error('SOS export error:', err);
            toast.current.show({
                severity: 'error',
                summary: 'Export Failed',
                detail: err.response?.data?.message || err.message,
                life: 3000
            });
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <div className="card attendanceanalysis m-2">
            <Toast ref={toast} />
            <div className="flex justify-content-between align-items-center mx-3 my-2">
                <h5 className="m-0 title">Share of Shelf</h5>
                <Button
                    icon="pi pi-download"
                    label="Export SOS Dump"
                    className="p-button-outlined p-button-success"
                    onClick={handleExportDump}
                    loading={exportLoading}
                />
            </div>
            <div className="grid">
                <div className="col-12">
                    <h6 className="pt-1">SOS Chain Wise Summary</h6>
                    <Carousel
                        className="card"
                        value={shairofshellchineData || []}
                        numVisible={5}
                        showIndicators={false}
                        numScroll={1}
                        responsiveOptions={responsiveOptions}
                        itemTemplate={productTemplate}
                    />
                </div>
                <div className="flex col-12 p-0">
                    <div className="col-6">
                        <h6 className="pt-4">Chain Wise Summary</h6>
                        <div className="card">
                            <DataTable
                                className="webdatatable"
                                selection={selectedChain}
                                onSelectionChange={(e) => setSelectedChain(e.value)}
                                emptyMessage="No record found."
                                selectionMode="single"
                                dataKey="chain_id"
                                value={sosData?.sos_data?.mapping || []}
                                scrollable
                                scrollHeight="200px"
                            >
                                <Column field="name" body={chaniBodyTemplate} header="Chain" style={{ width: '5rem' }} />
                                <Column field="Chain" body={chainTotalBodyTemplate} header="Total store in the chain" style={{ width: '10rem' }} />
                                <Column field="Chain" body={activeStoreBodyTemplate} header="Active store" style={{ width: '11rem' }} />
                                <Column field="Chain" body={greaterChainBodyTemplate} header="Count of store having >50% SOS" style={{ width: '10rem' }} />
                                <Column field="Chain" body={lessChainBodyTemplate} header="Count of store having <50% SOS" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6 className="pt-4">Chain Wise Summary Chart</h6>
                        <div className="flex mt-12 pb-5 card soschainwise">
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={activeStoreDataChainWise} options={activeStoreOptions} />
                            <Divider layout="vertical" />
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={greaterSosDataChainWise} options={greaterSosChartOptions} />
                            <Divider layout="vertical" />
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={lessSosDataChainWise} options={lessSosChartOptions} />
                        </div>
                    </div>
                </div>
                <div className="flex col-12 p-0">
                    <div className="col-6">
                        <h6 className="pt-4">Zone Wise Summary</h6>
                        <div className="card">
                            <DataTable
                                selection={selectedZone}
                                onSelectionChange={(e) => setSelectedZone(e.value)}
                                selectionMode="single"
                                className="webdatatable shairofshelldata"
                                value={shairofshellData?.zoneWise || []}
                                scrollable
                                scrollHeight="200px"
                            >
                                <Column field="zone" body={zoneBodyTemplate} header="Zone" style={{ width: '5rem' }} />
                                <Column field="total_store" body={totalZoneStoreBodyTemplate} header="Total store in the zone" style={{ width: '10rem' }} />
                                <Column field="active_store" body={activeStoreZoneWiseBodyTemplate} header="Active store" style={{ width: '10rem' }} />
                                <Column field="less_sos" body={lessSosZoneWiseBodyTemplate} header="Count of store having >50% SOS" style={{ width: '10rem' }} />
                                <Column field="greater_sos" body={greaterSosZoneWiseBodyTemplate} header="Count of store having <50% SOS" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6 className="pt-4">Zone Wise Summary Chart</h6>
                        <div className="flex mt-12 pb-5 card soschainwise">
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={activeStoreDataZoneWise} options={activeStoreOptions} />
                            <Divider layout="vertical" />
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={greaterSosDataZoneWise} options={greaterSosChartOptions} />
                            <Divider layout="vertical" />
                            <Chart style={{ position: 'relative', width: '30%' }} type="doughnut" data={lessSosDataZoneWise} options={lessSosChartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShairOfShell;
