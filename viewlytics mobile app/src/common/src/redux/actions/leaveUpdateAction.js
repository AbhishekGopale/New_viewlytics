import {
   LEAVE_UPDATE_SUCCESS,LEAVE_UPDATE_LOADING,LEAVE_UPDATE_FAILED
   } from "../types";
   import axios from "axios";
   import AsyncStorage from "@react-native-async-storage/async-storage";
   import { BASE_URL } from "../../constants/constants";
   import { DB } from "../../database";
   
   export const LeaveUpdatekAction = (token, valueMeeting ,value,selectedTime,time,duration,text) => {
     return (dispatch) => {
       dispatch({
         type: LEAVE_UPDATE_LOADING,
       });
       try {
        //   let data = JSON.stringify({
      //     form: formData,
      //   });
      
        let data = JSON.stringify({
            work_type: valueMeeting,
            report_detailed_name: value,
            meeting_start: selectedTime,
            meeting_end:time,
            total_hour: duration,
            what_is_done:text
         
      });
      console.log("dataaaaaaa",data);
         let config = {
           method: "put",
           maxBodyLength: Infinity,
           url: `${BASE_URL}leave/update`,
           headers: {
             "Content-Type": "application/json",
             Authorization: token,
           },
           data: data,
         };
         console.log("Leave Upadate Detailsc",data);
   
         axios
           .request(config)
           .then((response) => {
             console.log("Leave Upadate Details", response.data);
             dispatch({
               type: LEAVE_UPDATE_SUCCESS,
               payload: response.data,
             });
           })
           .catch((error) => {
             console.log(error);
           });
       } catch (error) {
         console.log("Leave Upadate failed", error);
         dispatch({
           type: LEAVE_UPDATE_FAILED,
           payload: {
             error: "Something wents wrong please try again later.",
           },
         });
       }
     };
   };
   