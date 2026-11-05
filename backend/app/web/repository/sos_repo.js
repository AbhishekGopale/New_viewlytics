const storeModel = require('../../admin/models/store')
const chainModel = require('../../admin/models/chain')
const sosModel = require('../../admin/models/sos_report')




exports.findStore = async (id) => {
    try {
        var findStore = await storeModel.findAll({
            where: {
                tl_id: id
            },
            raw: true,
            nest: true
        })

        return findStore;
    } catch (error) {
        throw error
    }
}

exports.chainFinds = async () => {
    var chainFind = await chainModel.findAll({ raw: true, nest: true })
    return chainFind
}

exports.findSOSData = async (date) => {


    var FindSOS = await sosModel.findAll({
        where: { date: date },
        raw: true,
        nest: true
    })

    return FindSOS;
}