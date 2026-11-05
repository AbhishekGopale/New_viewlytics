const shopperModel = require("../../admin/models/shopper_engagement")
const { Op }= require('sequelize')

exports.shopperCreate = async (data) => {
    try{
        return await shopperModel.create(data, { raw: true });
    }catch(error){
        console.log(error)
    }
}

exports.getByIdShopper = async (reqQuery) => {
    try{
        let shopperData = await shopperModel.findOne({
            where: {id:reqQuery.id },
            attributes: ['id', 'user_id', 'store_id', 'store_name', 'cust_approach_image', 'any_sample_image','other_image'],
            raw: true,
            nest: true
        });
        // console.log(shopperData,"useer")
    
        return shopperData;
        
    }catch(error){
        console.log(error)
    }
}

exports.getAllShopper = async (reqQuery,sort_array,filter_value) => {
	let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
    //   var regex = new RegExp(filter_value, "i");
      filter_value = {
        [Op.or]: [{ "store_name":{ [Op.like]: `%${filter_value}%` } }],
      };
    } else {
      filter_value = {};
    }
	let getShopper = await shopperModel.findAll({
        where:filter_value,
		attributes: ['id', 'user_id', 'store_id', 'store_name', 'cust_approach_image', 'any_sample_image','other_image'], raw: true,
		nest: true,
		order:[sort_array],
		offset: SKIP,
		limit : LIMIT
	})
	let totalCount = await shopperModel.count({})
	
	return {data:getShopper , count:totalCount}
}