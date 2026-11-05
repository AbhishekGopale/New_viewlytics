const chainModel = require('../../admin/models/chain')
const storeModel = require('../../admin/models/store')
const attendanceModel = require('../../admin/models/attendance')
const UserModel = require('../../admin/models/user')
const LeaveModel = require("../../admin/models/leave")
const moment = require('moment');

exports.chianFind = async (data) => {
    try {

        var findChain = await storeModel.findAll({ where: { tl_id: data }, raw: true, nest: true })

        var chainMap = await findChain.map((index) => { return index.chain })
        var unique = chainMap.filter(onlyUnique)
        var chainWisePromotorArray = []
        var chainNameFind = await chainModel.findAll({ raw: true, nest: true })


        const today = moment();
        var TodayDate = today.format('YYYY-MM-DD')
        var findAllDataOfAttendance = await attendanceModel.findAll({ where: { date: TodayDate }, raw: true, nest: true })
        // console.log(findAllDataOfAttendance, "::LchainNameFind")

        var chainArr = []

        let validateData = unique.map(async (value) => {
            var ChainNameFound = chainNameFind.find((element) => {
                if (element.id == value) {
                    return element.chain_name
                }
            });

            var GetAllUsers = await storeModel.findAll({
                where: {
                    chain: ChainNameFound.id
                },
                raw: true,
                nest: true
            })

            // console.log(GetAllUsers, ":GetAllUsers")

            var PromotorName = GetAllUsers.map((pro) => { return pro.promoter_id })
            var uniquePromo = PromotorName.filter(onlyUnique)
            const filtered = uniquePromo.filter(Number);

            // console.log(filtered, ":filtered")

            var presentPromotor = []

            let MapInProId = filtered.map((value) => {
                var ChainNameFound = findAllDataOfAttendance.find((element) => {

                    if (element.user_id === value && element.time_status === '1') {
                        return element
                    }

                })

                // console.log(ChainNameFound, ":ChainNameFound")
                presentPromotor.push(ChainNameFound)


            })

            var undefinedValueremove = presentPromotor.filter(function (x) {
                return x !== undefined;
            });



            // console.log(undefinedValueremove.length, ":presentPromotor", filtered.length)



            var chainWisePromotor = {
                "total_promotor": filtered.length,
                "chain_Id": ChainNameFound.id,
                "chain_name": ChainNameFound.chain_name,
                "present_promotor": undefinedValueremove.length
            }

            chainArr.push(chainWisePromotor)


        })


        let sumPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(chainArr);
            }, 500);
        });
        let result = await sumPromise;
        return result


    } catch (error) {
        throw error
    }
}

exports.chianFindWiseData = async (data) => {
    var findChain = await storeModel.findAll({ where: { tl_id: data }, raw: true, nest: true })
    return findChain;
}

exports.chainFinds = async () => {
    var chainFind = await chainModel.findAll({ raw: true, nest: true })
    return chainFind
}

exports.storeModelToUserFind = async (id) => {
    var GetAllUsers = await storeModel.findAll({
        where: {
            chain: id
        },
        raw: true,
        nest: true
    })

    return GetAllUsers
}

exports.storeDataFind = async () => {
    var GetAllStoreData = await storeModel.findAll({ raw: true, nest: true })
    return GetAllStoreData
}

exports.findUsers = async (Day) => {




    var FindAllUSers = await UserModel.findAll({
        where: {
            w_off: Day
        },
        attributes: ['id'],
        raw: true,
        nest: true
    })


    return FindAllUSers
}



exports.leaveUser = async (data) => {
    var userOnLeave = await LeaveModel.findAll({
        where: {
            date: data
        },
        raw: true,
        nest: true
    })

    return userOnLeave

    // console.log(userOnLeave, ":userOnLeave")
}


function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}