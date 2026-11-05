const { Sequelize } = require('../../../config/database');
const sosRepo = require("../repository/sos_repo")
const moment = require('moment');

exports.finddata = async (id) => {
    try {

        const today = moment();
        var TodayDate = today.format('YYYY-MM-DD')

        var FindStores = await sosRepo.findStore(id)

      
        var chainNameFind = await sosRepo.chainFinds()
        var sosFind = await sosRepo.findSOSData(TodayDate)


        var chainMap = await FindStores.map((index) => { return index.chain })
        var uniqueChain = chainMap.filter(onlyUnique)

        var sosArr = []
        var sosCalculate = FindStores.map((index) => {
            var findSos = sosFind.find((value) => {
                if (index.id == value.store_id) {
                    sosArr.push({
                        store_id: index.id,
                        sos_per: value.sos_per,
                        chain: index.chain
                    })
                }
            })

        })

        // console.log(sosArr, ":sosArr")
        const groupedData = sosArr.reduce((acc, obj) => {
            // console.log(acc, ":acc", obj, ":obj")
            const { store_id, sos_per } = obj;
            if (!acc[store_id]) {
                acc[store_id] = [];
            }
            acc[store_id].push(sos_per);

            return acc;
        }, {});

        const calculatedData = Object.entries(groupedData).map(([store_id, sos_per]) => ({
            id: parseInt(store_id),
            // Convert ID back to integer (if needed)
            sum: sos_per.reduce((sum, value) => ((sum + value) / sos_per.length)),
        }));


        var chiannameAdd = calculatedData.map((value) => {

            // console.log(value, ":chiannameAdd")
            var chainId = FindStores.find((index) => {
                // console.log(index.id, ":index.id")
                if (index.id == value.id) return value.chain_id = index.chain
            })

            return value
        })

        const groupedDatasForChainGRouping = FindStores.reduce((acc, obj) => {
            // console.log(obj, "::::::::::::::")
            const { chain, status } = obj;
            if (!acc[chain]) {
                acc[chain] = { data: [], statusCount: {} };
            }
            acc[chain].data.push(obj);

            acc[chain].statusCount[status] = (acc[chain].statusCount[status] || 0) + 1;
            return acc;
        }, {});


        const calculatedDatas = Object.entries(groupedDatasForChainGRouping).map(([id, group]) => ({

            chain_id: parseInt(id), // Convert ID back to integer (if needed)
            store: group.data.length,
            status: group.statusCount,
        }));



        var mapping = calculatedDatas.map((value) => {

            var chainNameReturn = chainNameFind.find((index) => {
                if (index.id == value.chain_id) {
                    value.chain_name = index.chain_name
                    value.zone = index.zone

                    return value

                }
            })

            let count = 0;

            var findSosPer = chiannameAdd.find((index) => {
                if (index.chain_id == value.chain_id) {
                    // console.log(value.id, "same", index.chain_id)
                    if (index.sum >= 50) {
                        return count++;
                    }
                }
            })
            value.up = count
            value.down = (value.store - count)

            return value
        })

        const groupedByZone = mapping.reduce((result, storeChain) => {
            console.log(storeChain.zone, "::::::::::::")
            storeChain?.zone?.forEach(zone => {
                if (!result[zone]) {
                    result[zone] = [];
                }
                result[zone].push(storeChain);
            });
            return result;
        }, {});

        // console.log(groupedByZone);
        return { mapping, groupedByZone }

    } catch (error) {
        throw error
    }
}



function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

function sosCalculation(value, index, array) {
    return array.indexOf(value) === index;
}