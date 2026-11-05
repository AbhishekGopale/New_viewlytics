
const salesrepo = require("../repository/sales_repo")
const ossRepo = require("../repository/oss_repo.js")

const currentDate = new Date();

// Get the start date of the current month
const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

// Get the end date of the current month
const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
const endDate = new Date(nextMonth - 1);

// Format the dates (optional)
const startDateFormatted = startDate.toISOString().slice(0, 10); // YYYY-MM-DD format
const endDateFormatted = endDate.toISOString().slice(0, 10);

exports.salesAnaData = async (id) => {
    try {
        var GroupByStoreData = await salesrepo.findStoreGroup(id, startDateFormatted, endDateFormatted)
        var chainGroup = await salesrepo.findChainWiseStores(id)
        var chainNameFind = await ossRepo.chainFinds()
        var FindStores = await ossRepo.findStore(id)
        var ArchivedFindToInven = await salesrepo.findInventory(startDateFormatted, endDateFormatted)
        var groupId = await salesrepo.findInventoryEndDateWise(startDateFormatted, endDateFormatted)



        chainGroup.map((value) => {
            var chainName = chainNameFind.find((index) => {
                if (index.id == value.chain) return index
            })
            value.chain_name = chainName ? chainName?.chain_name : "chain delete"
        })

        var stores_above = [];
        var stores_below = [];

        for (var i = 0; i < GroupByStoreData.length; i++) {
            var currentStore = GroupByStoreData[i];
            var matchingArchived = groupId.find(item => item.user_id === currentStore.user_id && item.store_id === currentStore.store_id);

            if (matchingArchived) {
                if (parseInt(matchingArchived.total_sum) > parseInt(currentStore.total_target) && currentStore.end_date > matchingArchived.date) {
                    stores_above.push(currentStore);
                } else {
                    stores_below.push(currentStore);
                }
            } else if (currentDate > currentStore.end_date) {
                stores_below.push(currentStore);
            }
        }



        for (const chainObj of chainGroup) {
            const storeIdsArray = chainObj.store_ids.split(',');
            const matchedStores = GroupByStoreData.filter((target) => storeIdsArray.includes(target.store_id.toString()));
            const totalTargetSum = matchedStores.reduce((sum, target) => sum + parseInt(target.total_target), 0);
            chainObj.total_targets = totalTargetSum;
        }

        // console.log(chainGroup, ":::chainGroup")
        for (const chainObj of chainGroup) {
            // Split store_ids, promoter_ids, and merchandiser_ids into arrays
            chainObj.store_ids = chainObj.store_ids.split(',').map(Number);
            chainObj.promoter_ids = chainObj.promoter_ids.split(',').map(Number);
            chainObj.merchandiser_ids = chainObj.merchandiser_ids.split(',').map(Number);
        }



        for (const bItem of chainGroup) {
            const { chain, store_ids } = bItem;
            let totalSum = 0;

            for (const storeId of store_ids) {
                const matchedA = ArchivedFindToInven.find((item) => item.store_id === storeId);
                if (matchedA && matchedA.total_sum !== null) {
                    totalSum += parseInt(matchedA.total_sum, 10);
                }
            }

            bItem.sales = totalSum;
        }


        for (const item of chainGroup) {
            const totalTargets = item.total_targets;
            const sales = item.sales;

            if (totalTargets === 0) {
                item.sales_percentage = 0;
            } else {
                item.sales_percentage = ((sales / totalTargets) * 100).toFixed(2);
            }
        }

        function countStatusZero(store_ids) {
            return store_ids.filter(storeId => FindStores.find(store => store.id === storeId && store.status === 0)).length;
        }
        for (let i = 0; i < chainGroup.length; i++) {
            const store_ids = chainGroup[i].store_ids;
            chainGroup[i].active_stores = countStatusZero(store_ids);
        }

        function updateArrayWithMatchCount(arrayToUpdate, matchArray, fieldName) {
            arrayToUpdate.forEach(aItem => {
                const matchingCount = matchArray.reduce((count, matchItem) => {
                    if (aItem.store_ids.includes(matchItem.store_id)) {
                        return count + 1;
                    }
                    return count;
                }, 0);
                aItem[fieldName] = matchingCount;
            });
        }

        // Update array a with matching counts from array b
        updateArrayWithMatchCount(chainGroup, stores_below, 'below');

        // Update array a with matching counts from array c
        updateArrayWithMatchCount(chainGroup, stores_above, 'above');




        return chainGroup

    } catch (error) {
        throw error
    }
}



