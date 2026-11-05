const { Sequelize } = require('../../../config/database');
const projectRepo = require('../repository/project_repo.js');
const zoneModel = require('../models/zone')
const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');

exports.createProject = async (reqBody, Image) => {
    try {

        const createProjectObj = {
            project_name: reqBody.project_name,
            image: Image,
            zone: JSON.parse(reqBody.zone)
        }
        let createrProject = await projectRepo.createProject(createProjectObj)
        return createrProject

    } catch (error) {
        console.log(error, "--------------------------------error-----------------------------------------")
        console.log('error  ', error instanceof Sequelize.AggregateError)
        throw error;
    }
};

exports.getAllProject = async (reqQuery,sort_array,filter_value) => {
    try {
        let getChain = await projectRepo.getAllProject(reqQuery,sort_array,filter_value)
        return getChain
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteProject = async (id) => {
    try {

        await projectRepo.deleteProject(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteMany = async (id) => {
    try {

        await projectRepo.deleteMany(id)
        return true

    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.getAllvalueProject = async () => {
    try {
        let getProject = await projectRepo.getAllvalueProject()
        // console.log(getProject,"servu")
        return getProject
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}
exports.getAllZoneProject = async (id) => {
    try {
        let getProject = await projectRepo.getAllZoneProject(id)
        console.log(getProject,"servu")
        return getProject
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.update = async (id, reqBody, Image) => {
    try {
        await projectRepo.updateProject(id, reqBody, Image)
        return true
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.getAllProjectZoneWise = async (reqQuery, sort_array, filter_value, reqUser) => {
    try {
        let getProjectZoneWise = await projectRepo.getAllProjectZoneWise(reqQuery, sort_array, filter_value, reqUser)
        return getProjectZoneWise
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

exports.projectExcel = async (data) => {
    try {



        var getAllZone = await zoneModel.findAll({
            attributes: ['id', 'zone_name'], raw: true,
            nest: true,
        })


        let validateData = data.map((value, index) => {
            // console.log(value,"valuueeuuee")
            // var Images = value.image
            // console.log(Images.length, ";----------------------")
            // downloadImage(Images, `${index}-Projectimg.png`);
            var imageName = `project${index}.jpg`;
            var file = fs.createWriteStream(path.join(__dirname + `../../../../public/upload/${imageName}`));
            https.get(value.image, response => {
                response.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    console.log(`Image downloaded as ${imageName}`);
                });
                }).on('error', err => {
                // fs.unlink(imageName);
                console.error(`Error downloading image: ${err.message}`);
                });


            var zoneArr = []
            var zone = JSON.parse(value.zone)

            zone.map((zone) => {
                getAllZone.find((element) => {
                    if (element.zone_name == zone) zoneArr.push(element.id);
                });
            });

            return {
                project_name: 'project_name' ? value.project_name : null,
                zone: 'zone' ? zoneArr : null,
                image: imageName ? imageName : null,

            }
        });
        // console.log(validateData,"validatsss")
        // return;
        let createZone = await projectRepo.createProjectExcel(validateData)
        return createZone




    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}

// async function downloadImage(url, filename) {

//     const response = await axios.get(url, { responseType: 'arraybuffer' });

//     fs.writeFile(__dirname + `../public/Project_Image/${filename}`, response.data, (err) => {
//         console.log('Image downloaded successfully!');
//     });
// }