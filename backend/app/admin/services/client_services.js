const clientRepo = require('../repository/client_repo');
const bcrypt = require("bcryptjs");
const { USER_ROLES, TOKEN_CONFIG } = require('../../../config/application');
const isEmpty = require("../validation/isEmpty");
const { ValidationError } = require("../../../helper/commonResponce");
const { get } = require('../controllers/target_controller');
const mail = require("../../../helper/mail");
const clientModel = require("../models/client");
const { raw } = require('body-parser');

exports.createClient = async (reqBody) => {
    try{
        let findCreateEmail = await clientModel.findOne({
            where:{email:reqBody.email},
            raw:true,
            nest:true
        })
        if(findCreateEmail){
            throw new ValidationError(422, { email: 'email already registred' });
        }
        let findCreateMobile = await clientModel.findOne({
            where:{mobile_no:reqBody.mobile_no},
            raw:true,
            nest:true
        })
        if(findCreateMobile){
            throw new ValidationError(422, { mobile_no: 'Mobile No already registred' });
        }
        var saltBecrypt = bcrypt.genSalt(10)
        const randomNumber = Math.floor(100000 + Math.random() * 90000000);
        const createClientObj = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            project_id:reqBody.project_id,
            project_name:reqBody.project_name,
            full_name: reqBody.first_name + " " + reqBody.last_name,
            mobile_no: reqBody.mobile_no,
            email: reqBody.email,
            role_id: reqBody.role_id,
            role_name: reqBody.role_name,
            user_name: reqBody.user_name ? reqBody.user_name : null,
            user_id: `ID${randomNumber}`,
        }
        let clientRelationObj = {
            client_role_id: reqBody.role_id,
            client_role_name: reqBody.role_name,
        }
        if(reqBody.role_id == USER_ROLES[ 'se' ]){
            if (isEmpty(reqBody.client_asm)) throw new ValidationError(422, { client_asm: 'Asm is required' });
            if (isEmpty(reqBody.client_npc)) throw new ValidationError(422, { client_npc: 'Npc is required' });
            clientRelationObj.client_ase = reqBody.client_asm;
            clientRelationObj.client_npc = reqBody.client_npc;
        } else if(reqBody.role_id == USER_ROLES[ 'cl_asm' ]){
            if (isEmpty(reqBody.client_npc)) throw new ValidationError(422, { client_npc: 'Npc is required' });
            clientRelationObj.client_npc = reqBody.client_npc;
        }
        let saltGeneratedPassword = await saltBecrypt

        // console.log(saltGeneratedPassword, ":err")
        let tempPassword = `@!${randomNumber}#`
        console.log(tempPassword,"tempPasswordtempPassword")
        var HashPassword = await bcrypt.hash(tempPassword, saltGeneratedPassword)

        createClientObj.password = HashPassword;
        console.log(createClientObj,clientRelationObj,"onj")
        // return;
        let createdClient = await clientRepo.createClient(createClientObj);
        clientRelationObj.client_id = createdClient.id
        console.log(clientRelationObj,"relation")
        let user_relation = await clientRepo.createClientRelation(clientRelationObj);
        let option = {
            email:reqBody.email,
            data:{
                email:reqBody.email,
                password:tempPassword
            }
        }
        await mail.send({option})
        return true
        
        
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.getClient = async (reqQuery, sort_array, filter_value) => {
    try{
        let GetClient = await clientRepo.getAllClient(reqQuery, sort_array, filter_value)
        return GetClient
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.deleteClient = async (id) => {
    try{
        let deleteClient = await clientRepo.deleteClient(id);
        return true
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.updateClient = async (id ,reqBody) => {
    try{
        const createClientObj = {
            first_name: reqBody.first_name,
            last_name: reqBody.last_name,
            project_id:reqBody.project_id,
            full_name: reqBody.first_name + " " + reqBody.last_name,
            mobile_no: reqBody.mobile_no,
            project_name: reqBody.project_name,
            email: reqBody.email,
            role_id: reqBody.role_id,
            role_name: reqBody.role_name,
            user_name: reqBody.user_name,
        }
        let clientRelationObj = {
            client_role_id: reqBody.role_id,
            client_role_name: reqBody.role_name,
            client_npc:null,
            client_ase:null
        }
        if(reqBody.role_id == USER_ROLES[ 'se' ]){
            if (isEmpty(reqBody.client_ase)) throw new ValidationError(422, { client_ase: 'ASe is required' });
            if (isEmpty(reqBody.client_npc)) throw new ValidationError(422, { client_npc: 'NPC is required' });
            clientRelationObj.client_ase = reqBody.client_ase;
            clientRelationObj.client_npc = reqBody.client_npc;
        } else if(reqBody.role_id == USER_ROLES[ 'cl_asm' ]){
            if (isEmpty(reqBody.client_npc)) throw new ValidationError(422, { client_npc: 'NPC is required' });
            clientRelationObj.client_npc = reqBody.client_npc;
            clientRelationObj.client_ase = reqBody.client_ase ? reqBody.client_ase  : 0;
        }
        console.log(createClientObj,clientRelationObj,"objjj")

        let createdClient = await clientRepo.updateClient(id,createClientObj);

        let user_relation = await clientRepo.updateClientRelation(id,clientRelationObj)
        return true
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.getClientById = async (id) => {
    try{
        let getClient = await clientRepo.getClientId(id)
        return getClient;
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}

exports.ncpList = async () => {
    try{
        let getncp = await clientRepo.getncp();
        return getncp
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}
exports.aseList = async () => {
    try{
        let getase = await clientRepo.getase();
        return getase
    }catch(error){
        console.log('error  ', error)
        throw error;
    }
}



exports.seList = async () => {
    try {
        let getase = await clientRepo.getSe();
        return getase
    } catch (error) {
        console.log('error  ', error)
        throw error;
    }
}