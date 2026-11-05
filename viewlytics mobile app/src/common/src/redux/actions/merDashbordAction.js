import { BASE_URL } from "../../constants/constants";
import {
  MER_DASHBORD_FAILED,
  MER_DASHBORD_LOADING,
  MER_DASHBORD_SUCCESS,
} from "../types";
import axios from "axios";

export const MerDashbordAction = (token) => {
  return (dispatch) => {
    dispatch({
      type: MER_DASHBORD_LOADING,
    });
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/dashboard/merchandiser`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      axios(config)
        .then(function (response) {
          console.log("MER_DASHBORD_", response?.data);
          let attendance = response?.data?.data?.attendance;
          console.log({ attendance }, "---------");
          const monthsArray = Array.from({ length: 12 }, () => 0);

          // Populate the array with total attendance values based on the data
          attendance?.forEach((entry) => {
            const { month, totalAttendances } = entry;
            if (month >= 1 && month <= 12) {
              monthsArray[month - 1] = totalAttendances;
            }
          });
          console.log("monthsArray", monthsArray, "=====");
          let pjp = response?.data?.data?.pjp;
          console.log("pjp======", pjp);
          const resultArray = pjp?.map((entry) => {
            const date = Object.keys(entry)[0]; // Extract the date key
            const metrics = entry[date]; // Extract the metrics value

            return {
              date: date,
              ...metrics,
            };
          });

          console.log("result======", resultArray);
          dispatch({
            type: MER_DASHBORD_SUCCESS,
            payload: {
              data: response.data,
              pjp: resultArray,
              attendance: monthsArray,
            },
          });
          // navigation.navigate("CheckInScreen")
        })
        .catch(function (error) {
          console.log("MER_DASHBORD_FAILED_error", error);
        });
    } catch (error) {
      console.log("MER_DASHBORD_FAILED Error", error);
      dispatch({
        type: MER_DASHBORD_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
