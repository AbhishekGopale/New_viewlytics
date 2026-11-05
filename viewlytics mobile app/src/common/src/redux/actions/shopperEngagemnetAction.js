import {
   SHOPPER_ENGAGEMNET_LOADING,
   SHOPPER_ENGAGEMNET_SUCCESS,
   SHOPPER_ENGAGEMNET_FAILED
   } from "../types";
   import axios from "axios";
   import AsyncStorage from "@react-native-async-storage/async-storage";
   import { BASE_URL } from "../../constants/constants";
   import { DB } from "../../database";
   
   export const ShopperEngagemnetAction = (formData, token, navigation) => {
     return (dispatch) => {
       dispatch({
         type: SHOPPER_ENGAGEMNET_LOADING,
       });
       try {
         let data = JSON.stringify({
             "form": formData
           });
         let config = {
           method: "post",
           maxBodyLength: Infinity,
           url: `${BASE_URL}shopengagement/create`,
           headers: {
             "Content-Type": "application/json",
             Authorization: token,
           },
           data: data,
         };
         console.log("ShopperEngagemnet",data);
   
         axios
           .request(config)
           .then((response) => {
             console.log("ShopperEngagemnet", response.data);
             dispatch({
               type: SHOPPER_ENGAGEMNET_SUCCESS,
               payload: response.data,
             });
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (error) {
         console.log("ShopperEngagemnet", error);
         dispatch({
           type: SHOPPER_ENGAGEMNET_FAILED,
           payload: {
             error: "Something wents wrong please try again later.",
           },
         });
       }
     };
   };
   