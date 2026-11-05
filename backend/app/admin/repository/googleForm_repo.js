let formModel = require('../models/google_form');
let User = require('../models/user');
let Store = require('../models/store');


exports.createForm = async (data) => {
    console.log(data,"dtdtdtd")
    let form = await formModel.bulkCreate(data, { validate: true, raw: true })
    return form;
};

exports.getAllForm = async (reqQuery,sort_array,filter_value) => {
    let LIMIT = reqQuery.limit * 1;
    let SKIP = (reqQuery.page - 1) * reqQuery.limit;
    if (filter_value != "") {
    //   var regex = new RegExp(filter_value, "i");
    filter_value = {
        [Op.or]: [{ "project_name":{ [Op.like]: `%${filter_value}%` } },{ "url":{ [Op.like]: `%${filter_value}%` } },{ "title":{ [Op.like]: `%${filter_value}%` } }],
    };
    } else {
    filter_value = {};
    }
    // console.log(filter_value)
    let getAllForm = await formModel.findAll({
        where:filter_value,
        attributes: ['id', 'user_id','project_id', 'title','project_name','url', 'form_status', 'status', 'start_date', 'end_date'], raw: true,
        nest: true,
        include: [
			{
				model: User,
				as: 'User',
				attributes: ['id', 'first_name', 'last_name', 'user_name']
			}],
        order:[sort_array],
        offset: SKIP,
        limit : LIMIT
    });
    
    let totalCount = await formModel.count({})
    console.log(totalCount,getAllForm)
    return {data:getAllForm , count:totalCount}
    
}

exports.deleteForm = async (id) => {
    let deletForm = await formModel.destroy({
		where: { id: id }
	});
    return deletForm
};

exports.updateForm = async (id, reqBody) => {
    const UpdateForm = await formModel.update(
		reqBody, { where: { id: id } })

	return UpdateForm
}

exports.getUsers = async (id) => {
    let users = await Store.findAll({
        where:{project_id:id},
        attributes: ['id', 'user_id', 'project_id'],
		raw: true,
		nest: true
    })
    let getUser = await User.findAll({
		raw: true,
		nest: true
	})
    let userAddedData = users.map((value) => {
		const found = getUser.find((element) => {
			return element.id == value.user_id;
		});
		// console.log(found.id,"idd")
		value.user_name = found ? found.user_name : " ",
        value.first_name = found ? found.first_name : "",
        value.last_name = found ? found.last_name : ""

	})
    return users
}