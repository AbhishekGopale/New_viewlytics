const targetModel = require('../../admin/models/target')
const storeModel = require('../../admin/models/store')
const inventoryModel = require('../../admin/models/inventory')


const { Sequelize } = require('sequelize');


exports.findStoreGroup = async (id, startDate, endDate) => {


    const rawQuery = `SELECT user_id,end_date, store_id, SUM(TARGET) AS total_target FROM targets WHERE start_date >= '${startDate}' AND end_date <= '${endDate}' GROUP BY user_id, store_id;`;

    return targetModel.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            // console.log(results, "::results")
            return results
        })
        .catch((error) => {
            console.error('Error executing raw query:', error);
        });
}



exports.findChainWiseStores = async (id) => {
    const rawQuery = `SELECT
    chain,
    GROUP_CONCAT(id) AS store_ids,
    GROUP_CONCAT(promoter_id) AS promoter_ids,
    GROUP_CONCAT(merchandiser_id) AS merchandiser_ids
FROM
    stores
WHERE
    tl_id = ${id}
GROUP BY
    chain;
`;
    return storeModel.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            // console.log(results, "::results")
            return results
        })
        .catch((error) => {
            console.error('Error executing raw query:', error);
        });
}

exports.findInventory = async (startDate, endDate) => {
    try {
        


        const rawQuery = `SELECT store_id, SUM(total) AS total_sum
FROM inventorys
WHERE date >= '${startDate}' AND date <= '${endDate}'
GROUP BY store_id;
`;
        return inventoryModel.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
            .then((results) => {
                // console.log(results, "::results")
                return results
            })
            .catch((error) => {
                console.error('Error executing raw query:', error);
            });
    } catch (error) {
        
    }
}

exports.findInventoryEndDateWise = async (startDate, endDate) => {
    var a = Date.parse(startDate)
    var b = Date.parse(endDate)

    const rawQuery = `SELECT user_id,date, store_id, SUM(total) AS total_sum FROM inventorys WHERE date >= '${startDate}' AND date <= '${endDate}' GROUP BY user_id, store_id;`;

    return inventoryModel.sequelize.query(rawQuery, { type: Sequelize.QueryTypes.SELECT })
        .then((results) => {
            return results
        })
        .catch((error) => {
            console.error('Error executing raw query:', error);
        });
}

