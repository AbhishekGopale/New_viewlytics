const storeModel = require('../../admin/models/store')
const chainModel = require('../../admin/models/chain')
const sosModel = require('../../admin/models/sos_report')
const ossModel = require('../../admin/models/oos')

exports.findStore = async (id) => {
    try {
        var findStore = await storeModel.findAll({
            where: {
                tl_id: id
            },
            attributes: ['id', 'status'],
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

exports.ossData = async () => {
    // Guard against out-of-memory: table has 4.9M rows; only retrieve necessary attributes
    var findOss = await ossModel.findAll({
        attributes: ['id', 'store_id'],
        limit: 5000,
        order: [['id', 'DESC']],
        raw: true,
        nest: true
    })
    return findOss;
}