import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { Image } from 'primereact/image';
import { Checkbox } from 'primereact/checkbox';

import { GetAllStateRequestList, GetAllCityRequest } from '../../../redux/slice/AdminSlice/storeSlice';
import { getZoneLableRequest } from '../../../redux/slice/AdminSlice/zoneSlice';
import {
    getCategoryImgDataRequest,
    getPaidImgDataRequest,
    getUnpaidImgDataRequest,
    getMarketImgDataRequest,
    getShopperImgDataRequest,
    getPromoImgDataRequest,
    getFacingImagesDataRequest,
    getStoreDataRequest,
    getCategoryExportPdfRequest,
    getPaidAssetExportPdfRequest,
    getUnpaidAssetExportPdfRequest,
    getMarketExportPdfRequest,
    getShopperExportPdfRequest,
    getPromoExportPdfRequest,
    getImageExportPdfRequest,
    handleClearImgData
} from '../../../redux/slice/UserSlice/merchandiseImgSlice';

const Merchandise = () => {
    const dispatch = useDispatch();

    const { stateData, cityData } = useSelector((state) => state.store);
    const { zoneList } = useSelector((state) => state.zone);
    const [activeIndex, setActiveIndex] = useState(0);

    const {
        categoryImgData,
        promoImgData,
        unPaidImgData,
        paidImgData,
        marketImgData,
        isPDFCreateLoading,
        shopperImgData,
        facingImagesData,
        errors,
        cityWiseStoreData
    } = useSelector((state) => state.merchandiseImg);

    const [filterValues, setFilterValues] = useState({
        start_date: '',
        end_date: '',
        store_id: [],
        zone_id: '',
        state_id: '',
        city_id: [],
        city_name: []
    });

    const [selectedImages, setSelectedImages] = useState([]);
    const [selfieItems, setSelfieItems] = useState([]);

    useEffect(() => {
        dispatch(getZoneLableRequest());
        dispatch(handleClearImgData());
        dispatch(getCategoryImgDataRequest(filterValues));
    }, [dispatch]);

    const handleCategorySelect = (id, date, index, store_name, img1, img2, img3, img4) => {
        const item = {
            id,
            date,
            index,
            store_name,
            asset_category_image_1: img1,
            asset_category_image_2: img2,
            asset_category_image_3: img3,
            asset_category_image_4: img4
        };
        const exists = selectedImages.some((e) => JSON.stringify(e) === JSON.stringify(item));
        setSelectedImages(exists ? selectedImages.filter((e) => JSON.stringify(e) !== JSON.stringify(item)) : [...selectedImages, item]);
    };

    const handleAssetSelect = (id, date, index, store_name, img1, img2, img3, img4, img5) => {
        const item = {
            id,
            date,
            index,
            store_name,
            asset_image_1: img1,
            asset_image_2: img2,
            asset_image_3: img3,
            asset_image_4: img4,
            asset_image_5: img5
        };
        const exists = selectedImages.some((e) => JSON.stringify(e) === JSON.stringify(item));
        setSelectedImages(exists ? selectedImages.filter((e) => JSON.stringify(e) !== JSON.stringify(item)) : [...selectedImages, item]);
    };

    const handleMarketSelect = (id, date, index, store_name, pic1, pic2) => {
        const item = {
            id,
            date,
            index,
            store_name,
            activation_pic: pic1,
            activation_pic_2: pic2
        };
        const exists = selectedImages.some((e) => JSON.stringify(e) === JSON.stringify(item));
        setSelectedImages(exists ? selectedImages.filter((e) => JSON.stringify(e) !== JSON.stringify(item)) : [...selectedImages, item]);
    };

    const handleShopperSelect = (id, date, index, store_name, s1, s2, a1, a2, o1, o2) => {
        const item = {
            id,
            date,
            index,
            store_name,
            any_sample_image: s1,
            any_sample_image2: s2,
            cust_approach_image: a1,
            cust_approach_image2: a2,
            other_image: o1,
            other_image2: o2
        };
        const exists = selectedImages.some((e) => JSON.stringify(e) === JSON.stringify(item));
        setSelectedImages(exists ? selectedImages.filter((e) => JSON.stringify(e) !== JSON.stringify(item)) : [...selectedImages, item]);
    };

    const handlePromoSelect = (id, date, index, store_name, status, img) => {
        const item = {
            id,
            date,
            index,
            store_name,
            promo_status: status,
            promo_image: img
        };
        const exists = selectedImages.some((e) => JSON.stringify(e) === JSON.stringify(item));
        setSelectedImages(exists ? selectedImages.filter((e) => JSON.stringify(e) !== JSON.stringify(item)) : [...selectedImages, item]);
    };

    const handleApplyFilter = () => {
        const payload = {
            zone_id: filterValues?.zone_id,
            city_id: filterValues?.city_id,
            state_id: filterValues?.state_id,
            start_date: filterValues?.start_date ? moment(filterValues?.start_date).format('YYYY/MM/DD') : '',
            end_date: filterValues?.end_date ? moment(filterValues?.end_date).format('YYYY/MM/DD') : '',
            store_id: filterValues?.store_id
        };
        setSelectedImages([]);

        if (activeIndex === 0) dispatch(getCategoryImgDataRequest(payload));
        else if (activeIndex === 1) dispatch(getPaidImgDataRequest(payload));
        else if (activeIndex === 2) dispatch(getUnpaidImgDataRequest(payload));
        else if (activeIndex === 3) dispatch(getPromoImgDataRequest(payload));
        else if (activeIndex === 4) dispatch(getMarketImgDataRequest(payload));
        else if (activeIndex === 5) dispatch(getShopperImgDataRequest(payload));
        else if (activeIndex === 6) dispatch(getFacingImagesDataRequest(payload));
    };

    const handleClearFilter = () => {
        const empty = {
            start_date: '',
            end_date: '',
            store_id: [],
            zone_id: '',
            state_id: '',
            city_id: [],
            city_name: []
        };
        setFilterValues(empty);
        setSelectedImages([]);

        if (activeIndex === 0) dispatch(getCategoryImgDataRequest(empty));
        else if (activeIndex === 1) dispatch(getPaidImgDataRequest(empty));
        else if (activeIndex === 2) dispatch(getUnpaidImgDataRequest(empty));
        else if (activeIndex === 3) dispatch(getPromoImgDataRequest(empty));
        else if (activeIndex === 4) dispatch(getMarketImgDataRequest(empty));
        else if (activeIndex === 5) dispatch(getShopperImgDataRequest(empty));
        else if (activeIndex === 6) dispatch(getFacingImagesDataRequest(empty));
    };

    const onTabChange = (index) => {
        setSelectedImages([]);
        setActiveIndex(index);

        if (index === 0) dispatch(getCategoryImgDataRequest(filterValues));
        else if (index === 1) dispatch(getPaidImgDataRequest(filterValues));
        else if (index === 2) dispatch(getUnpaidImgDataRequest(filterValues));
        else if (index === 3) dispatch(getPromoImgDataRequest(filterValues));
        else if (index === 4) dispatch(getMarketImgDataRequest(filterValues));
        else if (index === 5) dispatch(getShopperImgDataRequest(filterValues));
        else if (index === 6) dispatch(getFacingImagesDataRequest(filterValues));
    };

    const isValidImg = (url) => url && url !== '-' && url !== 'null' && url !== 'https://idonneous.s3.ap-south-1.amazonaws.com/upload/null' && url !== 'https://idonneous.s3.ap-south-1.amazonaws.com/upload/-';

    return (
        <div className="mx-3 mt-3">
            {activeIndex !== 7 && (
                <div className="card p-2 mt-2 mb-2 shadow">
                    <div className="grid p-fluid mt-1">
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="dropdown" className="required">Select Zone</label>
                            <Dropdown
                                value={filterValues.zone_id}
                                placeholder="Select Zone"
                                required={true}
                                options={zoneList || []}
                                onChange={(e) => {
                                    setFilterValues({ ...filterValues, zone_id: e.target.value });
                                    dispatch(GetAllStateRequestList(e.value));
                                }}
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="dropdown" className="required">State</label>
                            <Dropdown
                                id="dropdown"
                                required={true}
                                optionLabel="label"
                                optionValue="value"
                                filter={true}
                                placeholder="Select State"
                                options={stateData || []}
                                value={filterValues.state_id}
                                disabled={!filterValues.zone_id}
                                onChange={(e) => {
                                    setFilterValues({ ...filterValues, state_id: e.value });
                                    dispatch(GetAllCityRequest(e.value));
                                }}
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="dropdown" className="required">City</label>
                            <MultiSelect
                                id="dropdown"
                                maxSelectedLabels={3}
                                filter={true}
                                display="chip"
                                optionValue="value"
                                optionLabel="label"
                                required={true}
                                placeholder="Select City"
                                disabled={!filterValues.state_id}
                                options={cityData || []}
                                value={filterValues.city_id}
                                onChange={(e) => {
                                    const selectedCityValues = e.value || [];
                                    const names = (cityData || []).filter((c) => selectedCityValues.includes(c.value)).map((c) => c.label);
                                    setFilterValues({
                                        ...filterValues,
                                        city_id: selectedCityValues,
                                        city_name: names
                                    });
                                    dispatch(getStoreDataRequest({ city_name: names }));
                                }}
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="store">Start date</label>
                            <Calendar
                                inputId="calendar"
                                className="calendar-input"
                                showButtonBar={true}
                                value={filterValues.start_date}
                                disabled={!filterValues.city_id || filterValues.city_id.length === 0}
                                onChange={(e) => setFilterValues({ ...filterValues, start_date: e.value })}
                                maxDate={new Date()}
                                readOnlyInput={true}
                                placeholder="Select date"
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="store">End date</label>
                            <Calendar
                                inputId="calendar"
                                className="calendar-input"
                                showButtonBar={true}
                                value={filterValues.end_date}
                                disabled={!filterValues.start_date}
                                onChange={(e) => setFilterValues({ ...filterValues, end_date: e.value })}
                                maxDate={new Date()}
                                readOnlyInput={true}
                                placeholder="Select date"
                                dateFormat="dd/mm/yy"
                            />
                        </div>
                        <div className="field col-12 md:col-4 mb-1">
                            <label htmlFor="store">Store</label>
                            <MultiSelect
                                value={filterValues.store_id}
                                display="chip"
                                filter={true}
                                showClear={true}
                                onChange={(e) => setFilterValues({ ...filterValues, store_id: e.value })}
                                disabled={!filterValues.end_date}
                                options={cityWiseStoreData || []}
                                optionLabel="label"
                                optionValue="value"
                                maxSelectedLabels={2}
                                placeholder="Select Store"
                            />
                        </div>
                    </div>
                    <div className="flex justify-content-end left-auto">
                        <Button
                            label="Apply Filter"
                            disabled={!filterValues.store_id || filterValues.store_id.length === 0}
                            icon="pi pi-check"
                            type="button"
                            className="p-button-outlined p-button-success mr-3"
                            onClick={handleApplyFilter}
                        />
                        <Button
                            label="Clear Filter"
                            className="p-button-outlined p-button"
                            icon="pi pi-filter-slash"
                            disabled={!filterValues?.end_date}
                            onClick={handleClearFilter}
                        />
                    </div>
                </div>
            )}

            <div className="card mt-3 shadow">
                <TabView className="merchandiseTabview" activeIndex={activeIndex} onTabChange={(e) => onTabChange(e.index)}>
                    {/* Tab 0: Category Pictures */}
                    <TabPanel header="Category Pictures" className="merchandiseTaePanel">
                        {categoryImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getCategoryExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {categoryImgData && categoryImgData.map((group) => (
                                    <div key={group.date}>
                                        <div className="flex">
                                            <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        </div>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.items && group.items.map((item, n) => (
                                                <React.Fragment key={n}>
                                                    {[1, 2, 3, 4].map((num) => {
                                                        const imgKey = `asset_category_image_${num}`;
                                                        const imgUrl = item?.[imgKey];
                                                        if (!isValidImg(imgUrl)) return null;
                                                        const isChecked = selectedImages.some(
                                                            (r) => r.id === item?.id && r.date === group.date && r[imgKey] === imgUrl
                                                        );
                                                        return (
                                                            <div key={num} className="mb-2 ml-2">
                                                                <h6 className="mb-1">Category Image {num}</h6>
                                                                <div className="mb-2 ml-2 relative">
                                                                    <div>
                                                                        <Image loading="lazy" effect="blur" src={imgUrl} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                    </div>
                                                                    <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                        <Checkbox
                                                                            checked={isChecked}
                                                                            onChange={() => handleCategorySelect(
                                                                                item?.id,
                                                                                group.date,
                                                                                n,
                                                                                item?.Store?.store_name,
                                                                                num === 1 ? imgUrl : null,
                                                                                num === 2 ? imgUrl : null,
                                                                                num === 3 ? imgUrl : null,
                                                                                num === 4 ? imgUrl : null
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 1: Paid Asset */}
                    <TabPanel header="Paid Asset" className="merchandiseTaePanel">
                        {paidImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getPaidAssetExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {paidImgData && paidImgData.map((group) => (
                                    <div key={group.date}>
                                        <div className="flex">
                                            <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        </div>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.items && group.items.map((item, n) => (
                                                <React.Fragment key={n}>
                                                    {[1, 2, 3, 4, 5].map((num) => {
                                                        const imgKey = `asset_image_${num}`;
                                                        const imgUrl = item?.[imgKey];
                                                        if (!isValidImg(imgUrl)) return null;
                                                        const isChecked = selectedImages.some(
                                                            (r) => r.id === item?.id && r.date === group.date && r[imgKey] === imgUrl
                                                        );
                                                        return (
                                                            <div key={num} className="mb-2 ml-2">
                                                                <h6 className="mb-1">Asset Image {num}</h6>
                                                                <div className="mb-2 ml-2 relative">
                                                                    <div>
                                                                        <Image loading="lazy" effect="blur" src={imgUrl} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                    </div>
                                                                    <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                        <Checkbox
                                                                            checked={isChecked}
                                                                            onChange={() => handleAssetSelect(
                                                                                item?.id,
                                                                                group.date,
                                                                                n,
                                                                                item?.Store?.store_name,
                                                                                num === 1 ? imgUrl : null,
                                                                                num === 2 ? imgUrl : null,
                                                                                num === 3 ? imgUrl : null,
                                                                                num === 4 ? imgUrl : null,
                                                                                num === 5 ? imgUrl : null
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 2: Unpaid Asset */}
                    <TabPanel header="Unpaid Asset" className="merchandiseTaePanel">
                        {unPaidImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getUnpaidAssetExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {unPaidImgData && unPaidImgData.map((group) => (
                                    <div key={group.date}>
                                        <div className="flex">
                                            <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        </div>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.items && group.items.map((item, n) => (
                                                <React.Fragment key={n}>
                                                    {[1, 2, 3, 4, 5].map((num) => {
                                                        const imgKey = `asset_image_${num}`;
                                                        const imgUrl = item?.[imgKey];
                                                        if (!isValidImg(imgUrl)) return null;
                                                        const isChecked = selectedImages.some(
                                                            (r) => r.id === item?.id && r.date === group.date && r[imgKey] === imgUrl
                                                        );
                                                        return (
                                                            <div key={num} className="mb-2 ml-2">
                                                                <h6 className="mb-1">Asset Image {num}</h6>
                                                                <div className="mb-2 ml-2 relative">
                                                                    <div>
                                                                        <Image loading="lazy" effect="blur" src={imgUrl} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                    </div>
                                                                    <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                        <Checkbox
                                                                            checked={isChecked}
                                                                            onChange={() => handleAssetSelect(
                                                                                item?.id,
                                                                                group.date,
                                                                                n,
                                                                                item?.Store?.store_name,
                                                                                num === 1 ? imgUrl : null,
                                                                                num === 2 ? imgUrl : null,
                                                                                num === 3 ? imgUrl : null,
                                                                                num === 4 ? imgUrl : null,
                                                                                num === 5 ? imgUrl : null
                                                                            )}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 3: Promos */}
                    <TabPanel header="Promos" className="merchandiseTaePanel">
                        {promoImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getPromoExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                <Divider align="center" className="pt-0">
                                    <span className="p-tag">Active Promo</span>
                                </Divider>
                                {promoImgData?.active && promoImgData.active.map((group, t) => (
                                    <React.Fragment key={t}>
                                        <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.images && group.images.map((imgItem) => {
                                                if (!isValidImg(imgItem?.promo_image)) return null;
                                                const isChecked = selectedImages.some(
                                                    (r) => r.id === group.id && r.date === group.date && r.promo_image === imgItem.promo_image
                                                );
                                                return (
                                                    <div key={imgItem.id} className="mb-2 ml-2">
                                                        <div className="mb-2 ml-2 relative">
                                                            <div>
                                                                <Image loading="lazy" effect="blur" src={imgItem?.promo_image} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                            </div>
                                                            <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                <Checkbox
                                                                    checked={isChecked}
                                                                    onChange={() => handlePromoSelect(
                                                                        imgItem?.id,
                                                                        group.date,
                                                                        t,
                                                                        imgItem?.Store?.store_name,
                                                                        imgItem?.promo_status,
                                                                        imgItem?.promo_image
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </React.Fragment>
                                ))}
                                <Divider align="center" className="pt-0">
                                    <span className="p-tag">Inactive Promo</span>
                                </Divider>
                                {promoImgData?.inactive && promoImgData.inactive.map((group, t) => (
                                    <React.Fragment key={t}>
                                        <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.images && group.images.map((imgItem) => {
                                                if (!isValidImg(imgItem?.promo_image)) return null;
                                                const isChecked = selectedImages.some(
                                                    (r) => r.id === group.id && r.date === group.date && r.promo_image === imgItem.promo_image
                                                );
                                                return (
                                                    <div key={imgItem.id} className="mb-2 ml-2">
                                                        <div className="mb-2 ml-2 relative">
                                                            <div>
                                                                <Image loading="lazy" effect="blur" src={imgItem?.promo_image} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                            </div>
                                                            <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                <Checkbox
                                                                    checked={isChecked}
                                                                    onChange={() => handlePromoSelect(
                                                                        imgItem?.id,
                                                                        group.date,
                                                                        t,
                                                                        imgItem?.Store?.store_name,
                                                                        imgItem?.promo_status,
                                                                        imgItem?.promo_image
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 4: Market Intelligence */}
                    <TabPanel header="Market Intelligence" className="merchandiseTaePanel">
                        {marketImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getMarketExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {marketImgData && marketImgData.map((group) => (
                                    <div key={group.date}>
                                        <div className="flex">
                                            <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group?.date}</h5>
                                        </div>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.images && group.images.map((item, n) => {
                                                if (!item) return null;
                                                return (
                                                    <React.Fragment key={n}>
                                                        {isValidImg(item?.activation_pic) && (
                                                            <div className="mb-2 ml-2">
                                                                <h6>Activation Picture 1</h6>
                                                                <div className="mb-2 ml-2 relative">
                                                                    <div>
                                                                        <Image loading="lazy" effect="blur" src={item?.activation_pic} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                    </div>
                                                                    <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                        <Checkbox
                                                                            checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.activation_pic === item.activation_pic)}
                                                                            onChange={() => handleMarketSelect(item?.id, group.date, n, item?.Store?.store_name, item.activation_pic, null)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {isValidImg(item?.activation_pic_2) && (
                                                            <div className="mb-2 ml-2">
                                                                <h6>Activation Picture 2</h6>
                                                                <div className="mb-2 ml-2 relative">
                                                                    <div>
                                                                        <Image loading="lazy" effect="blur" src={item?.activation_pic_2} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                    </div>
                                                                    <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                        <Checkbox
                                                                            checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.activation_pic_2 === item.activation_pic_2)}
                                                                            onChange={() => handleMarketSelect(item?.id, group.date, n, item?.Store?.store_name, null, item?.activation_pic_2)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 5: Shopper Engagement */}
                    <TabPanel header="Shopper Engagement" className="merchandiseTaePanel">
                        {shopperImgData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getShopperExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {shopperImgData && shopperImgData.map((group) => (
                                    <React.Fragment key={group.date}>
                                        <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '10px' }}>{group.date}</h5>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.items && group.items.map((item, n) => (
                                                <React.Fragment key={n}>
                                                    {isValidImg(item?.any_sample_image) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Sample Picture 1</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.any_sample_image} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.any_sample_image === item.any_sample_image)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, item?.any_sample_image, null, null, null, null, null)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isValidImg(item?.any_sample_image2) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Sample Picture 2</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.any_sample_image2} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.any_sample_image2 === item.any_sample_image2)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, null, item?.any_sample_image2, null, null, null, null)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isValidImg(item?.cust_approach_image) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Approach Picture 1</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.cust_approach_image} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.cust_approach_image === item.cust_approach_image)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, null, null, item?.cust_approach_image, null, null, null)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isValidImg(item?.cust_approach_image2) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Approach Picture 2</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.cust_approach_image2} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.cust_approach_image2 === item.cust_approach_image2)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, null, null, null, item?.cust_approach_image2, null, null)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isValidImg(item?.other_image) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Other Picture 1</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.other_image} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.other_image === item.other_image)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, null, null, null, null, item?.other_image, null)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {isValidImg(item?.other_image2) && (
                                                        <div className="mb-2 ml-2">
                                                            <h6>Other Picture 2</h6>
                                                            <div className="mb-2 ml-2 relative">
                                                                <div>
                                                                    <Image loading="lazy" effect="blur" src={item?.other_image2} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} />
                                                                </div>
                                                                <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                                    <Checkbox
                                                                        checked={selectedImages.some((r) => r.id === group.id && r.date === group.date && r.other_image2 === item.other_image2)}
                                                                        onChange={() => handleShopperSelect(item?.id, group.date, n, item.store_name, null, null, null, null, null, item?.other_image2)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </TabPanel>

                    {/* Tab 6: Selfie Images */}
                    <TabPanel header="Selfie Images" className="merchandiseTaePanel">
                        {facingImagesData === null ? (
                            <div className="flex mt-4 capitalize"><span className="error">{errors}</span></div>
                        ) : (
                            <>
                                <div className="flex justify-content-end mt-4">
                                    <Button
                                        icon="pi pi-download"
                                        loading={isPDFCreateLoading}
                                        onClick={() => {
                                            dispatch(getImageExportPdfRequest(selectedImages));
                                            setSelectedImages([]);
                                            setSelfieItems([]);
                                        }}
                                        disabled={selectedImages.length === 0}
                                        label="Export to Pdf"
                                        className="p-button-outlined p-button-success ml-2"
                                    />
                                </div>
                                {facingImagesData && facingImagesData.map((group) => (
                                    <React.Fragment key={group.date}>
                                        <h5 style={{ color: 'rgba(0, 0, 0, 0.6)', marginTop: '0px' }}>{group.date}</h5>
                                        <div className="grid" style={{ width: '100%' }}>
                                            {group?.images && group.images.map((item, n) => {
                                                if (!item || !item.image) return null;
                                                const isChecked = selectedImages.some(
                                                    (r) => r.date === group.date && r.check_in_time === item.check_in_time && r.image === item.image
                                                );
                                                return (
                                                    <div key={n} className="mb-2 ml-2 relative">
                                                        <div>
                                                            <Image loading="lazy" effect="blur" src={item?.image} closeOnEscape={true} alt="Product picture" width="150px" height="150px" className="shadow-4" preview={true} downloadable={true} />
                                                        </div>
                                                        <div className="absolute top-0 left-0" style={{ padding: '6px' }}>
                                                            <Checkbox
                                                                checked={isChecked}
                                                                onChange={() => {
                                                                    setSelectedImages((prev) => {
                                                                        const exists = prev.some((r) => r.date === group.date && r.index === n);
                                                                        return exists
                                                                            ? prev.filter((r) => r.date !== group.date || r.index !== n)
                                                                            : [
                                                                                  ...prev,
                                                                                  {
                                                                                      date: group.date,
                                                                                      index: n,
                                                                                      check_in_time: item.check_in_time,
                                                                                      check_out_time: item.check_out_time,
                                                                                      image: item.image,
                                                                                      store_name: item.store_name
                                                                                  }
                                                                              ];
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </>
                        )}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default Merchandise;
