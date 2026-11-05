const userAssign = require("../models/storeUserAssign");

exports.userassign = async (data) => {
    return await userAssign.create(data, { raw: true })
}

exports.deleteuserAssign = async (id) => {
    let deleteuserAssign = await userAssign.destroy({
        where: { id: id }
    })

    return deleteuserAssign
}

exports.deleteMany = async (id) => {
    let deleteuserAssign = await userAssign.destroy({
        where: { id: id }
    })

    return deleteuserAssign
}


exports.getUserByID = async (id) => {
    let GetUser = await userAssign.findOne({
        where: { id: id },
        // attributes: ['store_code', 'store_name', 'chain', 'zone', 'city', 'state', 'location'],
        raw: true,
        nest: true
    },
    )
    return GetUser
}