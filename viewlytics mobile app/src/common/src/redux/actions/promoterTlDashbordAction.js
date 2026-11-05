import { BASE_URL } from "../../constants/constants";
import {
  PROMOTER_TL_DASHBORD_FAILED,
  PROMOTER_TL_DASHBORD_LOADING,
  PROMOTER_TL_DASHBORD_SUCCESS,
} from "../types";
import axios from "axios";

export const PromoterTlAction = (token) => {
  console.log(token);
  return (dispatch) => {
    dispatch({
      type: PROMOTER_TL_DASHBORD_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dashboard/promotertl`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("PROMOTER_TL_DASHBORD_sucess", response?.data?.data);

          let attendance = response?.data?.data?.attendance;
          const monthsArray = Array.from({ length: 12 }, () => 0);

          // Populate the array with total attendance values based on the data
          attendance?.forEach((entry) => {
            const { month, totalAttendances } = entry;
            if (month >= 1 && month <= 12) {
              monthsArray[month - 1] = totalAttendances;
            }
          });
          console.log("monthsArray", monthsArray);
          const target = response?.data?.data?.target;

          const achieved = response?.data?.data?.achieved;

          // Initialize an array for storing DSR and target values for each month
          const dsrArray = Array.from({ length: 12 }, () => [0, 0]);

          // Populate the dsrArray with values from data1 for DSR
          achieved.forEach((entry) => {
            const { month, totalDsrMultiplied } = entry;
            if (month >= 1 && month <= 12) {
              dsrArray[month - 1][1] = totalDsrMultiplied;
            }
          });

          // Populate the dsrArray with values from data2 for target
          target.forEach((entry) => {
            const { month, target } = entry;
            if (month >= 1 && month <= 12) {
              dsrArray[month - 1][0] = target;
            }
          });

          console.log("drsArray=======", dsrArray);
          dispatch({
            type: PROMOTER_TL_DASHBORD_SUCCESS,
            payload: {
              data: response.data,
              attendance: monthsArray,
              achieved: dsrArray,
            },
          });
          // navigation.navigate("CheckInScreen")
        })
        .catch(function (error) {
          console.log("PROMOTER_TL_DASHBORD_error", error);
        });
    } catch (error) {
      console.log("PROMOTER_TL_DASHBORD_FAILED Error", error);
      dispatch({
        type: PROMOTER_TL_DASHBORD_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
