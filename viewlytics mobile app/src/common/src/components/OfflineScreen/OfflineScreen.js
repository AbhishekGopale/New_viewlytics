import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Images } from "../../assets/images/map";
import { styles } from "./OfflineScreenStyle";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";

const OfflineScreen = () => {
  const navigation = useNavigation();
  const [storeId, setStoreId] = useState("");
  console.log(storeId, "storeId");
  const [token, setToken] = useState("");
  const [empId, setEmpId] = useState("");
  const [onOff, setOnOff] = useState("");
  console.log(onOff, "onOff----");
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        // dispatch(PromoListAction(data));
        getStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [roll, setRoall] = useState("");
  const getUserRoll = async () => {
    AsyncStorage.getItem(DB.USER_ROLL)
      .then((data) => {
        setRoall(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [categoryData, setCategoryData] = useState();
  console.log(categoryData, "categoryData");
  const getCategoryDetails = async () => {
    AsyncStorage.getItem(DB.OFFLINE_OPENING_INV)
      .then((data) => {
        let newCategoryData = JSON.parse(data);
        console.log("newCategoryDataOpening=====>", newCategoryData);
        setCategoryData(newCategoryData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getOnOff = async () => {
    AsyncStorage.getItem(DB.OFFLINE_ON_OFF)
      .then((data) => {
        let datas = JSON.parse(data);
        console.log("newOnOff=====>", datas);
        setOnOff(datas);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
    getUser();
    getUserRoll();
    getCategoryDetails();
    getOnOff();
  }, []);

  console.log(onOff, "statusOnOFf");
  return (
    <View style={styles.mainConteiner}>
      <View style={styles.imgConteiner}>
        <Image source={Images.satelight} style={styles.imgStyle} />
      </View>
      <View style={styles.TextConteiner}>
        <View>
          <Text style={styles.OopsText}>Oops!</Text>
        </View>
        <View style={styles.noteView}>
          <Text numberOfLines={2} style={styles.textstyle}>
            There is no Internet Connection Please check your Internet
            connection
          </Text>
        </View>
        {storeId == null ? (
          <View></View>
        ) : onOff == "0" ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OfflineDashboard");
            }}
            style={styles.goLiveButton}
          >
            <Text style={styles.goLiveText}>Go Offline</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default OfflineScreen;
