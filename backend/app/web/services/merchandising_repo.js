
const assetTracking = require('../../admin/models/asset_traking')
const promoModel = require('../../admin/models/promo')
const shopperEngagement = require('../../admin/models/shopper_engagement')
const marketIntenligency = require('../../admin/models/competition_analysis')

const { Sequelize } = require('sequelize');

exports.findAssets = async (req, res, next) => {
    const rawQuery = `SELECT asset_type, GROUP_CONCAT(DISTINCT store_id) AS store_ids, GROUP_CONCAT(DISTINCT COALESCE(asset_image_1, '')) AS images
FROM assettrakings
WHERE DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
GROUP BY asset_type;
`;
    return assetTracking.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            return results || []
        })
        .catch((error) => {
            console.error('Error executing raw query in findAssets:', error.message);
            return []
        });
}


exports.findPromo = async (res, req, next) => {
    const rawQuery = `SELECT store_id, promo_image, start_date, end_date
FROM promos
WHERE start_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
ORDER BY start_date DESC;
`;
    return promoModel.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            return results || []
        })
        .catch((error) => {
            console.error('Error executing raw query in findPromo:', error.message);
            return []
        });
}


exports.findShopperEnga = async (req, res, next) => {
    const rawQuery = `SELECT id,created_at, store_id,
       cust_approach_image, any_sample_image, other_image,
       cust_approach_image2, any_sample_image2, other_image2
FROM shopperengagements
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
`;
    return shopperEngagement.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            return results || []
        })
        .catch((error) => {
            console.error('Error executing raw query in findShopperEnga:', error.message);
            return []
        });
}

exports.findMarketInteli = async (req, res, next) => {
    const rawQuery = `SELECT id,created_at, store_id, activation_pic, activation_pic_2
FROM competitionanalysises
WHERE DATE_FORMAT(created_at, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
ORDER BY created_at DESC;
`;
    return marketIntenligency.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            return results || []
        })
        .catch((error) => {
            console.error('Error executing raw query in findMarketInteli:', error.message);
            return []
        });
}

exports.categoryImageFind = async (req,res,next) => {
    return []
}