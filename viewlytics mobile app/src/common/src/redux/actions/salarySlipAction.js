import {
  SALARY_SLIP_LOADING,
  SALARY_SLIP_SUCCESS,
  SALARY_SLIP_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";

export const SalarySlipAction = (userId, year, months, token, navigation) => {
  return (dispatch) => {
    dispatch({
      type: SALARY_SLIP_LOADING,
    });
    try {
      let data = JSON.stringify({
        from_date: months,
        to_date: year,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/salary`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };
      console.log("salaryslipdata------>", data);

      axios
        .request(config)
        .then((response) => {
          console.log("SalarySlip=====>", response.data);
          dispatch({
            type: SALARY_SLIP_SUCCESS,
            payload: response.data.data,
          });
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("SalarySlipFailed", error);
      dispatch({
        type: SALARY_SLIP_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
