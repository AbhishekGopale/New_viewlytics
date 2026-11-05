import {
  UPDATE_LEAVE_FAILED,
  UPDATE_LEAVE_LOADING,
  UPDATE_LEAVE_SUCCESS,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { GetAllLeavesAction } from "./getAllLeavesAction";
export const UpdateLeaveAction = (
  token,
  value,
  date,
  leaveReason,
  navigation,
  id
) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LEAVE_LOADING,
    });
    try {
      let data = JSON.stringify({
        leave_type: value,
        select_date: date,
        reason: leaveReason,
      });
      console.log("<=====dataaaaaaa=====>", data);
      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${BASE_URL}leave/update/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("update Leave", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Leave Create sucesss===>", response.data);
          dispatch({
            type: UPDATE_LEAVE_SUCCESS,
            payload: response.data,
          });
          dispatch(GetAllLeavesAction(token));

          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Leave Create  failed", error);
      dispatch({
        type: UPDATE_LEAVE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
