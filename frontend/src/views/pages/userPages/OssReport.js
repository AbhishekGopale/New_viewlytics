import 'simple-react-donut-chart/src/style.css';
import { GetOutOFStockDataRequest, getOSSDataRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import components from '../primeReactComponentsIndex';

const OssReport = () => {
    const { React, useState, useEffect, useSelector, useDispatch, TabView, TabPanel, Chart, DataTable, Column, Carousel, } = components;

    const dispatch = useDispatch();
    const { outofstockData, outofstockGraphData } = useSelector((state) => state.userDashboard);
    const [ skuCount, setSkuCount ] = useState([]);

    useEffect(() => {
        const data = Array(8).fill(" ").map(item => ({ id: String(Math.floor(Math.random(0, 9) * 1000)), data: Array(Math.floor(Math.random(0, 9) * 10)).fill('') }))
        setSkuCount(data)
    }, [])

    useEffect(() => {
        dispatch(GetOutOFStockDataRequest());
        dispatch(getOSSDataRequest());
    }, [ dispatch ]);
    const activeStoreOptions = {
        cutout: '60%'
    };

    const chainTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Chain</span>
                {data.chain}
            </>
        );
    };

    const totalstoreTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Count of total store</span>
                {data.totalStore}
            </>
        );
    };

    const osscountTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">OSS count</span>
                {data.oosCount}
            </>
        );
    };

    const relianceTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Reliance</span>
                {data.reliance}
            </>
        );
    };

    const spencerTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Spencer's</span>
                {data.spencers}
            </>
        );
    };

    const mrlTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">MRL</span>
                {data.mrl}
            </>
        );
    };
    const metroTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Metro C&C</span>
                {data.metro_c_c}
            </>
        );
    };

    const flipkartTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">Flipkart</span>
                {data.flipKart}
            </>
        );
    };
    const responsiveOptions = [
        {
            breakpoint: "1024px",
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: "600px",
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: "480px",
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = ({ chain }) => {
        return (
            <div className="border-1 surface-border border-round  text-center ossReportsChartCard mx-3 flex  flex-column justify-constent-center align-items-center" >
                <h6 className="mb-1 mt-2">{chain}</h6>
                <Chart style={{ position: 'relative', width: '80%' }} type="doughnut" data={activeStoreData} options={activeStoreOptions}></Chart>
            </div>
        );
    };
    const activeStoreData = {
        labels: [ 'Active Stores', 'Inactive Stores' ],
        datasets: [
            {
                total: 360,
                data: [ 270, 90 ],
                backgroundColor: [
                    'rgb(13, 71, 161)',
                    'rgb(240, 240, 240)',
                ],
            }
        ]
    };


    return (
        <div className="card attendanceanalysis m-2">
            <div className="grid">
                <div className="col-12">
                    <h6 className="pt-1">Completely OSS Stores</h6>
                    <div className="col-12 card" >
                        <p>Count Of Completely OSS Stores</p>
                        {/* <div className=""> */}
                        <Carousel value={outofstockGraphData} numVisible={4} showIndicators={false} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
                        {/* </div> */}
                    </div>
                </div>

                <div className="col-6">
                    <h6 className="pt-4">SKU Wise Count Of Stores </h6>
                    <div className="card">
                        <DataTable className="webdatatable" stripedRows value={outofstockData?.skuWiseCountofStore} scrollable scrollHeight="315px">
                            <Column field="chain" body={chainTemplate} header="Chain" style={{ width: '15remm' }} />
                            <Column field="total_store" body={totalstoreTemplate} header="Count of total store" style={{ width: '15remm' }} />
                            <Column field="oos_count" body={osscountTemplate} header="OSS count" style={{ width: '10remm' }} />
                            <Column field="Reliance" body={relianceTemplate} header="Reliance" style={{ width: '10remm' }} />
                            <Column field="Spencer" body={spencerTemplate} header="Spencer's" style={{ width: '10remm' }} />
                            <Column field="MRL" body={mrlTemplate} header="MRL" style={{ width: '10remm' }} />
                            <Column field="MetroC" body={metroTemplate} header="Metro C&C" style={{ width: '10remm' }} />
                            <Column field="FlipKart" body={flipkartTemplate} header="Flipkart" style={{ width: '10remm' }} />
                        </DataTable>
                    </div>
                </div>

                <div className="col-6 ">
                    <h6 className="pt-4">SKU Wise Count Of Stores </h6>
                    <div className="card" style={{ height: '344px', padding: '10px' }}>
                        <TabView className="ossReportTabsChangeVertically">
                            {skuCount?.length && skuCount.map((item) => {
                                return (

                                    <TabPanel key={item.id} header={item.id} className="tabpanelHeader">

                                        <div className="flex storeCount">
                                            <div className="flex countStoreAndOss ">
                                                <div className="p-2">Count of Total stores</div>
                                                <div className="countValue">100</div>
                                            </div>
                                            <div className="flex countStoreAndOss">
                                                <div className="p-2">OSS Count </div>
                                                <div className=" countValue">3</div>
                                            </div>
                                        </div>

                                        <div className="countGridCard">
                                            {item.data.map((item, index) => {
                                                return (<div key={index} className="ossreportTabpanelGridCard ">
                                                    <div className="ossReportGridCardValue">
                                                        <p>{index + 1}</p>
                                                    </div>
                                                    <h6 className="ossReportGridCardTitle">Reliance</h6>
                                                </div>)
                                            })}


                                            {/* <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>2</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>3</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>4</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>5</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>6</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>7</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>8</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>9</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>10</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>11</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>12</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>13</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>14</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>15</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div>
                                            <div className="ossreportTabpanelGridCard ">
                                                <div className="ossReportGridCardValue">
                                                    <p>16</p>
                                                </div>
                                                <h6 className="ossReportGridCardTitle">Reliance</h6>
                                            </div> */}
                                        </div>
                                    </TabPanel>
                                )
                            })}
                            {/* <TabPanel header="2222" className="tabpanelHeader">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>3</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>4</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>5</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>6</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>7</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="1233" className="tabpanelHeader">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>3</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>4</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>5</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>6</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>7</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>8</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>9</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>10</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>11</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>12</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="12345" className="tabpanelHeader">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="5">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="12" className="tabpanelHeader">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>3</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>4</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>5</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>6</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>7</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>8</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>9</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>10</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>11</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>12</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>13</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>14</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>15</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>16</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="52">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>3</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>4</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>5</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>6</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>7</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>8</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>9</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>10</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>11</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>12</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="2313" className="tabpanelHeader">
                                <div className="flex storeCount">
                                    <div className="flex countStoreAndOss ">
                                        <div className="p-2">Count of Total stores</div>
                                        <div className="countValue">100</div>
                                    </div>
                                    <div className="flex countStoreAndOss">
                                        <div className="p-2">OSS Count </div>
                                        <div className=" countValue">3</div>
                                    </div>
                                </div>

                                <div className="countGridCard">
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>1</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>2</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>3</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>4</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>5</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>6</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>7</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>8</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                    <div className="ossreportTabpanelGridCard ">
                                        <div className="ossReportGridCardValue">
                                            <p>9</p>
                                        </div>
                                        <h6 className="ossReportGridCardTitle">Reliance</h6>
                                    </div>
                                </div>
                            </TabPanel> */}
                        </TabView>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OssReport;
