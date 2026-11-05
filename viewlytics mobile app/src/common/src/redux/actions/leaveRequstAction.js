import {
  TL_LEAVE_REQUST_FAILED,
  TL_LEAVE_REQUST_LOADING,
  TL_LEAVE_REQUST_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import Navigation from "../../routes/Navigation/Navigation";
import { LeaveRequstEmployeeDetail } from "./leaveRequstEmployeeTLAction";
export const TlLeaveRequstAction = (token, status, itemId, reason) => {
  return (dispatch) => {
    dispatch({
      type: TL_LEAVE_REQUST_LOADING,
    });
    try {
      let data = JSON.stringify({
        leave_status: status,
        reason_reject: reason,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/attendance/leaveupdate/${itemId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("TL_LEAVE_REQUST_Sucess", response);
          dispatch({
            type: TL_LEAVE_REQUST_SUCCESS,
            payload: response.data.data,
          });
          dispatch(LeaveRequstEmployeeDetail(token));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("TL_LEAVE_REQUST_FAILED", error);

      dispatch({
        type: TL_LEAVE_REQUST_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
