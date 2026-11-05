import {
  FILD_VISIT_LOADING,
  FILD_VISIT_SUCCESS,
  FILD_VISIT_FAILED,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants/constants";
import { DB } from "../../database";
import { FildVisitDetail } from "./fildVisitDetaisAction";
import { ErrorAction } from "./errorAction";

export const FildVisitPostAction = (
  token,
  value,
  ArrayImg,
  textwo,
  text,
  itemId,
  status,
  detils,
  storeId,
  date,
  navigation,
  currentLatitude,
  currentLongitude,
  storename
) => {
  return (dispatch) => {
    console.log("ArrayImageAction=====>", ArrayImg);
    dispatch({
      type: FILD_VISIT_LOADING,
    });
    try {
      var FormData = require("form-data");
      let data = new FormData();
      value == 5
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("courtesy_status", status),
          data.append("courtesy_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          status == 0
            ? ArrayImg.forEach((element) => {
                data.append("courtesyimage[]", element);
              })
            : null)
        : value == 7
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("staff_status", status),
          data.append("staff_reason1", detils),
          data.append("staff_reason2", text),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          data.append("staff_reason3", textwo))
        : value == 8
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          data.append("area_of_improvment", detils))
        : value == 1
        ? (data.append("store_id", storeId),
          data.append("date", date),
          data.append("uniform_status", status),
          data.append("uniform_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          ArrayImg.forEach((element) => {
            data.append("uniform_image[]", element);
          }))
        : value == 2
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("wheth_sos_status", status),
          data.append("wheth_sos_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          ArrayImg.forEach((element) => {
            data.append("whethsosimage[]", element);
          }))
        : value == 3
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("wheth_pog_status", status),
          data.append("wheth_pog_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          ArrayImg.forEach((element) => {
            data.append("whethpogimage[]", element);
          }))
        : value == 4
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("wheth_paid_status", status),
          data.append("wheth_paid_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          ArrayImg.forEach((element) => {
            data.append("whethpaidimage[]", element);
          }))
        : value == 6
        ? (data.append("store_id", Number(storeId)),
          data.append("date", date),
          data.append("online_app_status", status),
          data.append("online_app_reason", detils),
          data.append("lat", currentLatitude),
          data.append("long", currentLongitude),
          ArrayImg.forEach((element) => {
            data.append("onlineappimage[]", element);
          }))
        : null;
      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: `${BASE_URL}/fieldvisit/create`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      console.log("FILD_VISIT_loding=====", data);

      axios
        .request(config)
        .then((response) => {
          console.log("FILD_VISIT_sucesss------", response.data);
          dispatch({
            type: FILD_VISIT_SUCCESS,
            payload: response.data,
          });
          dispatch(FildVisitDetail(token, storeId));

          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          dispatch(ErrorAction(true, error.message));
        });
    } catch (error) {
      console.log("FILD_VISIT_ faild*****", error);
      dispatch({
        type: FILD_VISIT_FAILED,
        payload: {
          error: "Something wents wrong please try again later.",
        },
      });
    }
  };
};
