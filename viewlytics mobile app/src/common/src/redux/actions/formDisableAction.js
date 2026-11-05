import { BASE_URL } from "../../constants/constants";
import {
  FORM_DISABLE_FAILED,
  FORM_DISABLE_LOADING,
  FORM_DISABLE_SUCCESS,
} from "../types";
import axios from "axios";

export const FormDisableAction = (token, storeId) => {
  return (dispatch) => {
    dispatch({
      type: FORM_DISABLE_LOADING,
    });
    try {
      let data = JSON.stringify({
        store_id: storeId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}form_disable`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      console.log("config=====>", config);

      axios(config)
        .then(function (response) {
          dispatch({
            type: FORM_DISABLE_SUCCESS,
            payload: response.data.data,
          });
          console.log(
            " FORM_DISABLE_SUCCESS---*****--=======>",
            response.data,
            config
          );
        })
        .catch(function (error) {
          console.log("FORM_DISABLE Error<<<<======", error);
          dispatch({
            type: FORM_DISABLE_FAILED,
            payload: {
              error: "Something wents wrong please try again later.",
            },
          });
        });
    } catch (error) {
      console.log("FORM_DISABLE Error", error);
      dispatch({
        type: FORM_DISABLE_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
