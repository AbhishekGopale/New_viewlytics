const { Sequelize } = require('../../../config/database');
const attendanceRepo = require("../repository/attendance_repo.js")
const moment = require('moment');
const attendanceModel = require('../../admin/models/attendance')
exports.getChain = async (Id) => {
    try {

        var FindChains = await attendanceRepo.chianFind(Id)

        return FindChains

    } catch (error) {
        throw error
    }

}


exports.getChainWiseAllData = async (Id) => {
    try {

        var FindChains = await attendanceRepo.chianFindWiseData(Id)

        var chainMap = await FindChains.map((index) => { return index.chain })
        var unique = chainMap.filter(onlyUnique)

        var chainNameFind = await attendanceRepo.chainFinds()

        var getAllStoreData = await attendanceRepo.storeDataFind()

        const today = moment();
        var TodayDate = today.format('YYYY-MM-DD')
        var leaveDataFind = await attendanceRepo.leaveUser(TodayDate)

        // console.log(leaveDataFind, ":leaveDataFind")

        var UserOnLeaveMap = leaveDataFind.map((index) => { return index.user_id })

        // console.log(UserOnLeaveMap, ":UserOnLeaveMap")

        const dayKeyFind = new Date(TodayDate)
        const day = dayKeyFind.getDay();
        const dayNames = [ "0", "1", "2", "3", "4", "5", "6" ];
        var Day = dayNames[day]
        var findAllDataOfAttendance = await attendanceModel.findAll({ where: { date: TodayDate }, raw: true, nest: true })

        var findAllUsers = await attendanceRepo.findUsers(Day)

        var UsersIdmap = findAllUsers.map((index) => index.id)

        let validateData = unique.map((value) => {
            var ChainNameFound = chainNameFind.find((element) => {
                if (element.id == value) {
                    return element.chain_name
                }
            });

            return ChainNameFound
        })


        var getAllUserChainWiseArray = []
        var ChainNameMap = validateData.map((value) => {
            var ChainNameFound = FindChains.find((element) => {

                if (element?.chain == value?.id) {
                    return element
                }
            });

            return ChainNameFound
        })

        var UsersMap = ChainNameMap.map((index) => {
            return index?.promoter_id
        })
        var uniquePromo = UsersMap.filter(onlyUnique)
        const filtered = uniquePromo.filter(Number);

        var presentPromotor = []
        var presentPromotorArray = []
        var AbsentPromotorArray = []
        var FullArray = []
        let MapInProId = filtered.map((value) => {
            var ChainNameFound = findAllDataOfAttendance.find((element) => {

                if (element.user_id === value && element.time_status === '1') {
                    presentPromotorArray.push(element.user_id)
                    FullArray.push(element.user_id)
                    return element
                } else if (element.user_id === value && element.time_status === '0') {
                    console.log(element.user_id, "element.user_id")
                    AbsentPromotorArray.push(element.user_id)
                    FullArray.push(element.user_id)
                    return element
                }
            })
            // console.log(FullArray, ": FullArray.push(element.user_id)")
            presentPromotor.push(ChainNameFound)
        })

        const commonElements = getCommonElements(filtered, FullArray);
        // console.log(commonElements, "::::::::::::::::_----------------------------");
        // console.log(AbsentPromotorArray, ":AbsentPromotorArray")

        var undefinedValueremove = presentPromotor.filter(function (x) {

            return x !== undefined;
        });
        var ObjCreateArr = []

        var ChainNameMap = validateData.map((value) => {
            var promotorArr = []
            var ChainWiseFindStore = getAllStoreData?.find((index) => {
                if (index?.chain == value?.id) {
                    promotorArr.push(index.promoter_id)
                }
            })

            var uniquePromo = promotorArr.filter(onlyUnique)
            const filtered = uniquePromo.filter(Number);

            var Obj = {
                chain_id: value?.id,
                chain_name: value?.chain_name,
                promoter_id: filtered,
                promotor_count: filtered?.length
            }

            ObjCreateArr.push(Obj)

        })

        var ObjCreateArrMap = ObjCreateArr.map((index) => {
            var ProArr

            ProArr = index.promoter_id
            // console.log(ProArr, ":ProArr")
            let commonElements = ProArr.filter(element => presentPromotorArray.includes(element));
            ProArr = getCommonElements(ProArr, commonElements) 

            let commonElementsAbsent = ProArr.filter(element => AbsentPromotorArray.includes(element));

            let commonElementsWoff = ProArr.filter(element => UsersIdmap.includes(element));
            ProArr = getCommonElements(ProArr, commonElementsWoff)

            let commonElementsLeaves = ProArr.filter(element => UserOnLeaveMap.includes(element));
            // console.log(commonElementsLeaves, ":commonElementsLeaves", ":UserOnLeaveMap", UserOnLeaveMap)


            let count = commonElements.length;
            let countAbsent = commonElementsAbsent.length;

            index.presentPro = count
            index.AbsentPro = countAbsent
            index.w_off = commonElementsWoff.length
            index.leave = commonElementsLeaves.length
            index.not_login = ProArr.length
            return index

        })
        return ObjCreateArrMap
    } catch (error) {
        throw error
    }
}




function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}


function getCommonElements(array1, array2) {
    // Use the filter() method on the first array to keep only the elements that are present in the second array.
    return array1.filter(item => !array2.includes(item));
}
