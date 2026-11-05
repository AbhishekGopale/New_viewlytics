import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./TlReportingStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { FontsFamily } from "../../assets/fonts/fonts";
import { TLDATA } from "./Data";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DaynamicWebFormAction } from "../../redux/actions/DaynamicWebFormAction";

const TlReporting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeid, setStoreID] = useState("");
  console.log(storeid, "storeid====-----");
  console.log({ token });
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreID(data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        getStoreId(data);
        setToken(data);
        dispatch(DaynamicWebFormAction(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);
  const isLoading = useSelector(
    (state) => state?.DaynamicWebFormReducer?.isLoading
  );
  console.log(isLoading, "isLoading-----");
  let DaynamicWebFroms = useSelector(
    (state) => state?.DaynamicWebFormReducer?.allDetails?.data
  );
  console.log(DaynamicWebFroms, "DaynamicWebFromstlllll------");

  return (
    <>
      <View>
        <Header
          header={"Reporting"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
      <View style={styles.FlatMainConatiner}>
        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            ListEmptyComponent={
              <View style={{ justifyContent: "center", marginVertical: 50 }}>
                <Text
                  style={{
                    color: COLORS.black,
                    fontFamily: FontsFamily.Bold,
                    fontSize: 18,
                  }}
                >
                  No Data Found!!!
                </Text>
              </View>
            }
            numColumns={2}
            scrollEnabled={true}
            data={DaynamicWebFroms}
            renderItem={({ item }) => (
              <View style={styles.FlatlistView}>
                <TouchableOpacity
                  style={styles.TouchableOpacityView}
                  onPress={() =>
                    navigation.navigate("TabWebView", {
                      selectedItem: item,
                    })
                  }
                >
                  <View style={styles.subFlatView}>
                    <Image
                      style={styles.imgsStyle}
                      source={Images.daynamicForms}
                    />
                    <Text style={styles.FlatText}>{item?.table_name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
};

export default TlReporting;
