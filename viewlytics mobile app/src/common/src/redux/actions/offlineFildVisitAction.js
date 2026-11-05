import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, BASE_URL_TWO } from "../../constants/constants"; // Assuming BASE_URL_TWO is not used
import { DB } from "../../database";
import {
  FILD_VISIT_OFFLINE_FAILED,
  FILD_VISIT_OFFLINE_LOADING,
  FILD_VISIT_OFFLINE_SUCCESS,
} from "../types";
import { Alert } from "react-native";
import moment from "moment";

export const OfflineFieldVisitAction = () => {
  return async (dispatch) => {
    dispatch({
      type: FILD_VISIT_OFFLINE_LOADING,
    });

    try {
      const token = await AsyncStorage.getItem(DB.TOKEN);
      const storeId = await AsyncStorage.getItem(DB.STORE_ID);
      const data = await AsyncStorage.getItem(DB.FIELD_VISIT_CREATE_DATA);
      const FieldVisitData = JSON.parse(data);

      const formData = new FormData();
      formData.append("store_id", storeId);
      formData.append("date", moment().format("YYYY-MM-DD"));
      formData.append("lat", "");
      formData.append("long", "");
      console.log(FieldVisitData, "FieldVisitData----**********-------");
      FieldVisitData?.forEach((element) => {
        switch (element.value) {
          case 1:
            formData.append("uniform_status", element.oneselectedOption);
            formData.append("uniform_reason", element.onedetils);
            element?.oneimage?.forEach((img) => {
              formData.append("uniform_image[]", img);
            });
            break;
          case 2:
            formData.append("wheth_sos_status", element.twoselectedOption);
            formData.append("wheth_sos_reason", element.twodetils);
            element?.twoimage?.forEach((img) => {
              formData.append("whethsosimage[]", img);
            });
            break;
          case 3:
            element?.threeimage?.forEach((img) => {
              formData.append("whethpogimage[]", img);
            });
            formData.append("wheth_pog_status", element.threeselectedOption);
            formData.append("wheth_pog_reason", element.threedetils);
            break;
          case 4:
            formData.append("wheth_paid_status", element.fourselectedOption);
            formData.append("wheth_paid_reason", element.fourdetils);
            element?.fourimage?.forEach((img) => {
              formData.append("whethpaidimage[]", img);
            });
            break;
          case 5:
            formData.append("courtesy_status", element.fiveselectedOption);
            formData.append("courtesy_reason", element.courtesyVisibility);
            element?.fiveimages?.forEach((img) => {
              formData.append("courtesyimage[]", img);
            });
            break;
          case 6:
            formData.append("online_app_status", element.sixselectedOption);
            formData.append("online_app_reason", element.sixdetils);
            element?.siximage?.forEach((img) => {
              formData.append("onlineappimage[]", img);
            });
            break;
          case 7:
            formData.append("staff_status", element.savenselectedOption);
            formData.append(
              "staff_reason1",
              element.savendetils
                ? element.savendetils
                : element.concernedPersonName
            );
            formData.append(
              "staff_reason2",
              element.concernedPersonDesignation
            );
            formData.append("staff_reason3", element.concernedPersonNumber);
            break;
          case 8:
            formData.append("area_of_improvment", element.areaImprovement);
            break;
          default:
            break;
        }
      });

      const config = {
        method: "post",
        url: `${BASE_URL_TWO}/offline/field_visit`,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      console.log(formData, "formData--------------*****", config);

      const response = await axios.request(config);
      console.log("FILD_VISIT_OFFLINE_SUCCESS success------", response.data);
      dispatch({
        type: FILD_VISIT_OFFLINE_SUCCESS,
        payload: response.data,
      });
      await AsyncStorage.removeItem(DB.FIELD_VISIT_CREATE_DATA);
    } catch (error) {
      console.log("Offline Field visit Error", error);
      Alert.alert("Field visit Data not sync");

      dispatch({
        type: FILD_VISIT_OFFLINE_FAILED,
        payload: {
          error: "Something went wrong, please try again later.",
        },
      });
    }
  };
};
