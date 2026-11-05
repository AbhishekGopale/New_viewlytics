import {
PENDING_LEAVE_LOADING,PENDING_LEAVE_SUCCESS,PENDING_LEAVE_FAILED   
  } from "../types";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { BASE_URL } from "../../constants/constants";
  import { DB } from "../../database";
  
  export const PendinLeaveAction = (
   leaveType,
    from,
    to,
    reason,
    id,
    token,
    navigation
  ) => {
    return (dispatch) => {
      dispatch({
        type: PENDING_LEAVE_LOADING,
      });
      try {
        let data = JSON.stringify({
            "leave_type": leaveType,
            "from": from,
            "to":  to,
            "reason": reason
            
          });
        let config = {
          method: "put",
          maxBodyLength: Infinity,
          url: `${BASE_URL}/leave/update/${id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          data: data,
        };
  
        axios
          .request(config)
          .then((response) => {
            console.log("PandingLeave", response);
            dispatch({
              type: PENDING_LEAVE_SUCCESS,
              payload: response.data.data,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("PandingLeaveFailed", error);
        dispatch({
          type: PENDING_LEAVE_FAILED,
          payload: {
            error: "Something wents wrong please try again later.",
          },
        });
      }
    };
  };
  