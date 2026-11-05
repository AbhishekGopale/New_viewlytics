var merRepo = require("../services/merchandising_repo.js")
const ossRepo = require("../repository/oss_repo.js")



exports.findImage = async (id) => {
    try {

        var FindStores = await ossRepo.findStore(id)
        const arrayOfValues = FindStores.map(obj => obj.id);

        console.log(arrayOfValues, ":arrayOfValues")

        var findAssets = await merRepo.findAssets()

        var findPromo = await merRepo.findPromo()

        var findshopperEngagement = await merRepo.findShopperEnga()

        var findMarketInte = await merRepo.findMarketInteli()

        var categoryImage = await merRepo.categoryImageFind()


        // Process the data array and update the 'images' property with an array
        if (Array.isArray(findAssets)) {
            findAssets.forEach(item => {
                item.images = getImagesArray(item.images);
                item.status = item.asset_type === '0' ? 'paid' : 'unpaid';
            });
        }

        function filterObjectsByStoreIds(arr, storeIds) {
            if (!Array.isArray(arr)) return [];
            return arr.filter(item => {
                if (!item.store_ids) return false;
                const itemStoreIds = String(item.store_ids).split(',').map(Number);
                return itemStoreIds.some(storeId => storeIds.includes(storeId));
            });
        }

        const paidUnpaidImage = filterObjectsByStoreIds(findAssets, arrayOfValues);

        var promoImage = Array.isArray(findPromo) ? findPromo.filter((obj) => arrayOfValues.includes(obj.store_id)) : [];
        promoImage.forEach((obj) => {
            obj.promo_image = obj.promo_image == '' ? null : (process.env.IMAGE_URL || '') + obj.promo_image;
        });

        var marketInteligency = Array.isArray(findMarketInte) ? findMarketInte.filter((obj) => arrayOfValues.includes(obj.store_id)) : [];
        marketInteligency.forEach((obj) => {
            obj.activation_pic = obj.activation_pic == '' ? null : (process.env.IMAGE_URL || '') + obj.activation_pic;
            obj.activation_pic_2 = obj.activation_pic_2 == '' ? null : (process.env.IMAGE_URL || '') + obj.activation_pic_2;
        });

        var shopperEngagements = Array.isArray(findshopperEngagement) ? findshopperEngagement.filter((obj) => arrayOfValues.includes(obj.store_id)) : [];
        shopperEngagements.forEach((obj) => {
            obj.cust_approach_image = obj.cust_approach_image == '' ? null : (process.env.IMAGE_URL || '') + obj.cust_approach_image;
            obj.any_sample_image = obj.any_sample_image == '' ? null : (process.env.IMAGE_URL || '') + obj.any_sample_image;
            obj.other_image = obj.other_image == '' ? null : (process.env.IMAGE_URL || '') + obj.other_image;
            obj.cust_approach_image2 = obj.cust_approach_image2 == '' ? null : (process.env.IMAGE_URL || '') + obj.cust_approach_image2;
            obj.any_sample_image2 = obj.any_sample_image2 == '' ? null : (process.env.IMAGE_URL || '') + obj.any_sample_image2;
            obj.other_image2 = obj.other_image2 == '' ? null : (process.env.IMAGE_URL || '') + obj.other_image2;
        });


        // console.log(shopperEngagements, "::shopperEngagements:")


        return { paidUnpaidImage, promoImage, shopperEngagements, marketInteligency }

    } catch (error) {
        throw error
    }

}


function getImagesArray(images) {
    const imageNames = images.split(',');
    return imageNames.map(image => image == '' ? null : process.env.IMAGE_URL + image);
}
