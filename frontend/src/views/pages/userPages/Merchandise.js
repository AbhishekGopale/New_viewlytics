import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import components from '../primeReactComponentsIndex';
import { getAllMerchandiserRequest, getAllStoreLabelRequest } from '../../../redux/slice/AdminSlice/userSlice';
import { getMerchndiseImagesRequest } from '../../../redux/slice/UserSlice/merchandiseSlice';

const Merchandise = () => {
  const { MultiSelect, Image, Button, TabView, TabPanel, RadioButton, Calendar } = components;
  const dispatch = useDispatch();

  const [isAll, setIsAll] = useState(false);
  const [storeItem, setStoreItem] = useState(null);
  const [merchandisingItem, setMerchandisingItem] = useState(null);
  const [date, setDate] = useState('');

  const { storeList, merchandiserList } = useSelector((store) => store.user);
  const { images } = useSelector((store) => store.merchandise);

  useEffect(() => {
    dispatch(getMerchndiseImagesRequest());
    dispatch(getAllStoreLabelRequest());
    dispatch(getAllMerchandiserRequest());
  }, [dispatch]);

  const handleClearFilter = () => {
    setStoreItem(null);
    setMerchandisingItem(null);
    setDate('');
    setIsAll(false);
  };

  const renderImageGallery = (items, imageKeyExtractor) => {
    if (!items || items.length === 0) {
      return (
        <div className="text-center p-5 surface-50 border-round">
          <i className="pi pi-images text-4xl text-500 mb-2 block"></i>
          <span className="text-600 font-medium">No merchandising images available for the selected criteria.</span>
        </div>
      );
    }

    return (
      <div className="grid">
        {items.map((item, idx) => {
          const imgUrls = imageKeyExtractor(item);
          const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
          const validUrls = urls.filter(Boolean);

          if (validUrls.length === 0) return null;

          return (
            <div key={item.id || idx} className="col-12 mb-3">
              <div className="font-semibold text-sm mb-2 text-700">
                {item.date ? moment(item.date).format('DD MMMM YYYY') : (item.created_at ? moment(item.created_at).format('DD MMMM YYYY') : `Store: ${item.store_name || item.store_id || 'Store'}`)}
                {item.store_name && <span className="ml-2 text-500 font-normal">({item.store_name})</span>}
              </div>
              <div className="grid">
                {validUrls.map((url, uIdx) => (
                  <div key={uIdx} className="col-6 sm:col-4 md:col-3 lg:col-2">
                    <Image
                      src={url}
                      alt="Merchandise picture"
                      width="100%"
                      height="140px"
                      className="shadow-2 border-round"
                      style={{ objectFit: 'cover' }}
                      preview
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="card m-2">
      {/* Filter Section */}
      <div className="card p-2 mt-2 mb-2">
        <div className="grid p-fluid mt-1">
          <div className="flex align-items-center ml-2 mt-3">
            <RadioButton
              inputId="all"
              name="All"
              value="all"
              onChange={(e) => setIsAll(e.value)}
              checked={isAll === 'all'}
            />
            <label htmlFor="all" className="ml-2 font-medium">All</label>
          </div>

          <div className="field col-12 md:col-3 mb-1">
            <label htmlFor="store" className="font-medium">Select Store</label>
            <MultiSelect
              id="store"
              value={storeItem}
              filter
              showClear
              onChange={(e) => setStoreItem(e.value)}
              options={storeList || []}
              optionLabel="label"
              optionValue="value"
              maxSelectedLabels={3}
              placeholder="Select Store"
            />
          </div>

          <div className="field col-12 md:col-3 mb-1">
            <label htmlFor="merchandiser" className="font-medium">Select Merchandiser</label>
            <MultiSelect
              id="merchandiser"
              maxSelectedLabels={2}
              value={merchandisingItem}
              onChange={(e) => setMerchandisingItem(e.value)}
              filter
              options={merchandiserList || []}
              optionLabel="label"
              optionValue="value"
              placeholder="Select Merchandiser"
            />
          </div>

          <div className="field col-12 md:col-3 mb-1">
            <label htmlFor="date" className="font-medium">Select Start to End date</label>
            <Calendar
              inputId="date"
              className="calendar-input"
              showButtonBar
              value={date}
              onChange={(e) => setDate(e.value)}
              selectionMode="range"
              readOnlyInput
              placeholder="Select date from - to"
              dateFormat="dd/mm/yy"
            />
          </div>

          <div className="field col-12 md:col-2 mb-1 py-2 mt-4">
            <Button
              label="Clear Filter"
              className="p-button-outlined mr-2 mb-2 w-50px"
              style={{ borderRadius: '7px', border: '1px solid' }}
              icon="pi pi-filter-slash"
              onClick={handleClearFilter}
            />
          </div>
        </div>
      </div>

      {/* Dynamic TabView Gallery */}
      <div className="card mt-3">
        <TabView className="merchandiseTabview">
          <TabPanel header="Visibility" className="merchandiseTaePanel">
            {renderImageGallery(images?.paidUnpaidImage, (item) => item.images || [])}
          </TabPanel>

          <TabPanel header="Category Pictures & Promos" className="merchandiseTaePanel">
            {renderImageGallery(images?.promoImage, (item) => item.promo_image)}
          </TabPanel>

          <TabPanel header="Shopper Engagement" className="merchandiseTaePanel">
            {renderImageGallery(images?.shopperEngagements, (item) => [
              item.cust_approach_image,
              item.any_sample_image,
              item.other_image,
              item.cust_approach_image2,
              item.any_sample_image2,
              item.other_image2
            ])}
          </TabPanel>

          <TabPanel header="Market Intelligence" className="merchandiseTaePanel">
            {renderImageGallery(images?.marketInteligency, (item) => [
              item.activation_pic,
              item.activation_pic_2
            ])}
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default Merchandise;
