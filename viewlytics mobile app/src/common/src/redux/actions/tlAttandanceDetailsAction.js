import { BASE_URL } from "../../constants/constants";
import {
  TLATTENDANCE_DETAILS_LOADING,
  TLATTENDANCE_DETAILS_SUCCESS,
  TLATTENDANCE_DETAILS_FAILED,
} from "../types";
import axios from "axios";

export const TlAttandanceAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: TLATTENDANCE_DETAILS_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}attendance/dashboard`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          dispatch({
            type: TLATTENDANCE_DETAILS_SUCCESS,
            payload: response.data,
          });
          console.log(
            " TLAttandance Details success =======>",
            response.data.data
          );
        })
        .catch(function (error) {
          console.log("TLAttandance Details Error<<<<======", error);
        });
    } catch (error) {
      console.log("TLAttandance Details  Error", error);
      dispatch({
        type: TLATTENDANCE_DETAILS_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
