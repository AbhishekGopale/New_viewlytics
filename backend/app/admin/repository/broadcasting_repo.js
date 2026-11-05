let storeModel = require('../models/store');
let castingModel = require('../models/broadcasting')
let projectModel = require('../models/project');
let zoneModel = require('../models/zone')

exports.userList = async (reqBody) => {
    let userList = await storeModel.findAll({
        where:{project_id:reqBody.project_id,zone:reqBody.zone},
        raw: true,
        nest: true
    });
    return userList;
};

exports.createBroad = async(data) => {
    return await castingModel.create(data, { raw: true })
}

exports.deleteCasting = async (id) => {
    console.log(id,"repooooooo")
    let deleteCasting = await castingModel.destroy({
        where: { id: id }
    })

    return deleteCasting
}

exports.getAllList = async () => {
    let getAllCasting = await  castingModel.findAll({
        raw:true,
        nest:true,
        order: [['id', 'DESC']]
    });
    let totalCount = await castingModel.count({})
    let getAllProject= await projectModel.findAll({
        attributes:["id","project_name"],
        raw:true,
        nest:true
    });
    let getAllZone= await zoneModel.findAll({
        attributes:["id","zone_name"],
        raw:true,
        nest:true
    });
    let cityAddedData = getAllCasting.map((value) => {
		const found = getAllProject.find((element) => {
			return element.id == value.project_id;
		});
        var zoneArray = []
            if (Array.isArray(value.zone_id)) {

                var ZoneMap = value.zone_id.map((data) => {
                    const found = getAllZone.find((element) => {
                        return element.id == data;
                    });

                    zoneArray.push(found.zone_name)
                    console.log(found.zone_name, "idd")
                    value.zone_name = zoneArray
                })

            } else {
                const found = zones.find((element) => {
                    return element.id == value.zone;
                });

                value.zone_name = found ? found.zone_name : ""
            }

		value.project_name = found ? found.project_name : " "
	})
    // console.log()
    return {data:getAllCasting , count:totalCount}
}