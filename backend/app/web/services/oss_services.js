const { Sequelize } = require('../../../config/database');
const ossRepo = require("../repository/oss_repo.js")

exports.findOSSData = async (id) => {
    try {

        var FindStores = await ossRepo.findStore(id)
        var chainNameFind = await ossRepo.chainFinds()

        var ossData = await ossRepo.ossData()

        var chainMap = await FindStores.map((index) => { return index.chain })
        var uniqueChain = chainMap.filter((value, index, array) => {
            return array.indexOf(value) === index
        })

        var chainGroup = uniqueChain.map((value) => {
            var storeid = []
            var activeStore = []
            var InactiveStore = []
            var chainName = chainNameFind.find((index) => {
                if (index.id == value) return index
            }
            )

            FindStores.find((index) => {
                if (index.chain == value) {
                    if (index.status == 0) {
                        activeStore.push(index.id)
                    } else if (index.status == 1) {
                        InactiveStore.push(index.id)
                    }
                    storeid.push(index.id)
                }
            })



            var objForAcInacstores = {
                chain_id: value,
                chain_name: chainName?.chain_name,
                store: storeid.length,
                activeStore: activeStore.length,
                inactiveStore: InactiveStore.length,
                store_id: storeid
            }

            // console.log(objForAcInacstores, ":objForAcInacstores")

            return objForAcInacstores
        })



        var chainGroupMap = chainGroup.map((value) => {

            var storeIDArray = value.store_id

            // console.log(storeIDArray, ":storeIDArray")

            var mappinginStoreId = storeIDArray.map((store) => {
                var hyy = ossData.find((index) => {
                    if (index.store_id == store) {
                        return index
                    }
                })

                return hyy
            })

            var undefinedValueremove = mappinginStoreId.filter(function (x) {

                return x !== undefined;
            });


            value.oss = undefinedValueremove.length
            return value
        })

        return chainGroupMap




    } catch (error) {
        throw error
    }
}