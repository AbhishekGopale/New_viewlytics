import {
  LEAVE_CREATE_LOADING,
  LEAVE_CREATE_SUCCESS,
  LEAVE_CREATE_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { GetAllLeavesAction } from "./getAllLeavesAction";
export const LeaveCreateAction = (
  token,
  value,
  status,
  dateData,
  todateData,
  leaveReason,
  navigation,
  selectedOption
) => {
  return (dispatch) => {
    dispatch({
      type: LEAVE_CREATE_LOADING,
    });
    try {
      let data =
        status == "0"
          ? JSON.stringify({
              leave_type: value,
              select_type: status,
              select_date: dateData,
              from: "",
              to: "",
              reason: leaveReason,
            })
          : JSON.stringify({
              leave_type: value,
              select_type: status,
              select_date: "",
              from: dateData,
              to: todateData,
              reason: leaveReason,
            });
      console.log("<=====dataaaaaaa=====>", data);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}leave/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("Leave Create  Detailsc", data);

      axios
        .request(config)
        .then((response) => {
          console.log("Leave Create sucesss===>", response.data);
          dispatch({
            type: LEAVE_CREATE_SUCCESS,
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
        type: LEAVE_CREATE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
