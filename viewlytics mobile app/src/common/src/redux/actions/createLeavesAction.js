import {
  CREATE_LEAVES__SUCCESS,
  CREATE_LEAVES_LOADING,
  CREATE_LEAVES__FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const CreateLeavesAction = (
  leaveType,
  from,
  to,
  reason,
  token,
  navigation
) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_LEAVES_LOADING,
    });
    try {
      let data = JSON.stringify({
        leave_type: leaveType,
        from: from,
        to: to,
        reason: reason,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/leave/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("CreateLeavesData", response);
          dispatch({
            type: CREATE_LEAVES__SUCCESS,
            payload: response.data.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("CreateLeavesFailed", error);
      dispatch({
        type: CREATE_LEAVES__FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
