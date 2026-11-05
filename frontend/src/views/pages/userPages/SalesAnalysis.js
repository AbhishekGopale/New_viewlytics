import { GetSalesAnalysisDataRequest, getSalesChainWiseSummaryDataRequest } from '../../../redux/slice/UserSlice/userDashboardSlice';
import components from '../primeReactComponentsIndex';

const SalesAnalysis = () => {
    const { React, useState, useEffect, useSelector, useDispatch, Chart, DataTable, Column, Carousel } = components;
    const dispatch = useDispatch();
    const { salesAnalysisData, chainSummaryData } = useSelector((state) => state.userDashboard);
    const [ productsa ] = useState([]);

    useEffect(() => {
        dispatch(GetSalesAnalysisDataRequest());
        dispatch(getSalesChainWiseSummaryDataRequest());
    }, [ dispatch ]);


    const chainLabels = salesAnalysisData?.salesChainArr?.map((x) => x.chain) || [];
    const chainActive = salesAnalysisData?.salesChainArr?.map((x) => x.activeStore) || [];
    const chainTotal = salesAnalysisData?.salesChainArr?.map((x) => x.totalStore) || [];

    const zoneData1 = {
        labels: chainLabels.length > 0 ? chainLabels : ['No Data'],
        datasets: chainLabels.length > 0 ? [
            {
                label: 'Total Stores',
                backgroundColor: 'rgb(21,101,192)',
                data: chainTotal
            },
            {
                label: 'Active Stores',
                backgroundColor: 'rgb(102,187,106)',
                data: chainActive
            }
        ] : []
    };
    const zoneOptions1 = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    // fontColor: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {},
                grid: {
                    drawBorder: false
                }
            }
        }
    };
    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProducts().then((data) => setProducts(data));
    //     // ordersOptions = getOrdersOptions();
    //     // setOverviewColors();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // useEffect(() => {
    //     setProducts(
    //         [
    //             { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //             { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Product Description", "image": "brown-purse.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //             { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Product Description", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //             { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Product Description", "image": "galaxy-earrings.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Product Description", "image": "game-controller.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4 },
    //             { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Product Description", "image": "gaming-set.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3 },
    //             { "id": "1010", "code": "plb34234v", "name": "Gold Phone Case", "description": "Product Description", "image": "gold-phone-case.jpg", "price": 24, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //             { "id": "1011", "code": "4920nnc2d", "name": "Green Earbuds", "description": "Product Description", "image": "green-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1012", "code": "250vm23cc", "name": "Green T-Shirt", "description": "Product Description", "image": "green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 74, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1013", "code": "fldsmn31b", "name": "Grey T-Shirt", "description": "Product Description", "image": "grey-t-shirt.jpg", "price": 48, "category": "Clothing", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 3 },
    //             { "id": "1014", "code": "waas1x2as", "name": "Headphones", "description": "Product Description", "image": "headphones.jpg", "price": 175, "category": "Electronics", "quantity": 8, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    //             { "id": "1015", "code": "vb34btbg5", "name": "Light Green T-Shirt", "description": "Product Description", "image": "light-green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 34, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1016", "code": "k8l6j58jl", "name": "Lime Band", "description": "Product Description", "image": "lime-band.jpg", "price": 79, "category": "Fitness", "quantity": 12, "inventoryStatus": "INSTOCK", "rating": 3 },
    //             { "id": "1017", "code": "v435nn85n", "name": "Mini Speakers", "description": "Product Description", "image": "mini-speakers.jpg", "price": 85, "category": "Clothing", "quantity": 42, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1018", "code": "09zx9c0zc", "name": "Painted Phone Case", "description": "Product Description", "image": "painted-phone-case.jpg", "price": 56, "category": "Accessories", "quantity": 41, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1019", "code": "mnb5mb2m5", "name": "Pink Band", "description": "Product Description", "image": "pink-band.jpg", "price": 79, "category": "Fitness", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1020", "code": "r23fwf2w3", "name": "Pink Purse", "description": "Product Description", "image": "pink-purse.jpg", "price": 110, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //             { "id": "1021", "code": "pxpzczo23", "name": "Purple Band", "description": "Product Description", "image": "purple-band.jpg", "price": 79, "category": "Fitness", "quantity": 6, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //             { "id": "1022", "code": "2c42cb5cb", "name": "Purple Gemstone Necklace", "description": "Product Description", "image": "purple-gemstone-necklace.jpg", "price": 45, "category": "Accessories", "quantity": 62, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1023", "code": "5k43kkk23", "name": "Purple T-Shirt", "description": "Product Description", "image": "purple-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    //             { "id": "1024", "code": "lm2tny2k4", "name": "Shoes", "description": "Product Description", "image": "shoes.jpg", "price": 64, "category": "Clothing", "quantity": 0, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1025", "code": "nbm5mv45n", "name": "Sneakers", "description": "Product Description", "image": "sneakers.jpg", "price": 78, "category": "Clothing", "quantity": 52, "inventoryStatus": "INSTOCK", "rating": 4 },
    //             { "id": "1026", "code": "zx23zc42c", "name": "Teal T-Shirt", "description": "Product Description", "image": "teal-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 3, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //             { "id": "1027", "code": "acvx872gc", "name": "Yellow Earbuds", "description": "Product Description", "image": "yellow-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 35, "inventoryStatus": "INSTOCK", "rating": 3 },
    //             { "id": "1028", "code": "tx125ck42", "name": "Yoga Mat", "description": "Product Description", "image": "yoga-mat.jpg", "price": 20, "category": "Fitness", "quantity": 15, "inventoryStatus": "INSTOCK", "rating": 5 },
    //             { "id": "1029", "code": "gwuby345v", "name": "Yoga Set", "description": "Product Description", "image": "yoga-set.jpg", "price": 20, "category": "Fitness", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 8 }
    //         ]

    //     )
    // }, []);

    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const productTemplate = (chainSummaryData) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-1">
                <div className="p-1">
                    <h6 className="mb-1">{chainSummaryData?.chain_name}</h6>
                    <div className="flex p-1">
                        <div
                            className="card w-7 m-1 p-3 sales-box"
                            style={{
                                backgroundColor: chainSummaryData?.sales_percentage > 100 ? '#4dff4d' : '#D93E3C'
                            }}
                        >
                            <div className="mb-2">Achieved</div>
                            <div className="text-center">{chainSummaryData?.sales_percentage}%</div>
                        </div>

                        <div className="card w-7 m-1 p-3 sales-box" style={{ backgroundColor: '#c0c0c061', color: 'black' }}>
                            <div className="mb-2">Sale</div>
                            <div className="text-center">
                                {chainSummaryData?.sales_percentage}
                                <span className="ml-2">&#8377;</span>
                            </div>
                        </div>
                        <div className="card w-7 m-1 p-3 sales-box" style={{ backgroundColor: '#c0c0c061', color: 'black' }}>
                            <div className="mb-2">Target</div>
                            <div className="text-center">
                                {chainSummaryData?.total_targets}
                                <span className="ml-2">&#8377;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const productsTemplate = (productsa) => {
        return (
            <div className="text-center">
                <div className="p-1">
                    <h6 className="mt-4">{productsa.title}</h6>
                </div>
            </div>
        );
    };
    const zoneTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Zone</span>
                {data.zone}
            </>
        );
    };
    const zonechainTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Chain</span>
                {data.chain}
            </>
        );
    };
    const zonetotalstoreTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Total Store</span>
                {data.totalStore}
            </>
        );
    };
    const zoneactivestoreTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.activeStore}
            </>
        );
    };
    const zonecountgre50Template = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.countofstoreAboveTilldateGre50}
            </>
        );
    };
    const zonecountless50Template = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.countofstoreAboveTilldate}
            </>
        );
    };
    const chainTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Chain</span>
                {data.chain}
            </>
        );
    };
    const totalstoreTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Total Store</span>
                {data.totalStore}
            </>
        );
    };
    const activestoreTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.activeStore}
            </>
        );
    };
    const countgre50Template = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.countofstoreAboveTilldateGre50}
            </>
        );
    };
    const countless50Template = (data) => {
        return (
            <>
                <span className="p-column-title">Active Store</span>
                {data.countofstoreAboveTilldate}
            </>
        );
    };

    return (
        <div className="card attendanceanalysis m-2">
            <div className="grid">
                <div className="col-12">
                    <h6 className="pt-1">Sales chain wise summary</h6>
                    <div className="card col-12 mb-1">
                        <Carousel value={chainSummaryData?.oss_data} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} showIndicators={false} />
                    </div>
                </div>

                <div className="flex col-12 p-0">
                    <div className="col-6">
                        <h6 className="pt-4">Chain Wise Summary </h6>
                        <div className="card chainwisechart">
                            <DataTable className="webdatatable" stripedRows emptyMessage="No record found." value={salesAnalysisData?.salesChainArr} scrollable scrollHeight="385px">
                                <Column field="chain" body={chainTemplate} header="Chain" style={{ width: '5rem' }} />
                                <Column field="Total_store" body={totalstoreTemplate} header="Total store in the chain" style={{ width: '10rem' }} />
                                <Column field="Active_store" body={activestoreTemplate} header="Active store" style={{ width: '5rem' }} />
                                <Column field="countofstore_above_tilldate_gre50" body={countgre50Template} header="Count of stores above than till date sales achievement" style={{ width: '10rem' }} />
                                <Column field="countofstore_above_tilldate" body={countless50Template} header="Count of stores below than till date sales achievement" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="flex justify-content-between">
                            <h6 className="flex  mb-0 pt-4">Chain Wise Summary Chart </h6>
                            <span className="col-4 p-1">
                                <Carousel className="carousel-mange" value={productsa} responsiveOptions={responsiveOptions} itemTemplate={productsTemplate} showIndicators={false} />
                            </span>
                        </div>

                        <div className="card chainwisechart ">
                            <Chart type="bar" data={zoneData1} options={zoneOptions1} height="325px"></Chart>
                        </div>
                    </div>
                </div>

                <div className="flex mt-3">
                    <div className="col-6">
                        <h6 className="pt-4">Zone Wise Summary </h6>
                        <div className="card chainwisechart">
                            <DataTable className="webdatatable" stripedRows value={salesAnalysisData?.zonewise} emptyMessage="No record found." scrollable scrollHeight="385px">
                                <Column field="zone" body={zoneTemplate} header="Zone" style={{ width: '5rem' }} />
                                <Column field="chain" body={zonechainTemplate} header="Chain" style={{ width: '5rem' }} />
                                <Column field="Total_store" body={zonetotalstoreTemplate} header="Total store in the chain" style={{ width: '10rem' }} />
                                <Column field="Active_store" body={zoneactivestoreTemplate} header="Actice store" style={{ width: '5rem' }} />
                                <Column field="countofstore_above_tilldate_gre50" body={zonecountgre50Template} header="Count of stores above than till date sales achievement" style={{ width: '10rem' }} />
                                <Column field="countofstore_above_tilldate" body={zonecountless50Template} header="Count of stores below than till date sales achievement" style={{ width: '10rem' }} />
                            </DataTable>
                        </div>
                    </div>

                    <div className="col-6">
                        <div className="flex justify-content-between">
                            <h6 className="flex mb-0 pt-4">Zone Wise Summary Chart </h6>
                            <span className="col-4 p-1">
                                <Carousel className="carousel-mange" value={productsa} responsiveOptions={responsiveOptions} itemTemplate={productsTemplate} showIndicators={false} />
                            </span>
                        </div>
                        <div className="card chainwisechart">
                            <Chart type="bar" data={zoneData1} options={zoneOptions1} height="325px"></Chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesAnalysis;
