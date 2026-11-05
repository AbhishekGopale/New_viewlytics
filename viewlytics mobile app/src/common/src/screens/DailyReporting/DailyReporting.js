import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { styles } from "./DailyReportingStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import DATA, { MERCHANTDATA } from "./Data";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { PromoListAction } from "../../redux/actions/promoListAction";
import { COLORS } from "../../colors/colors";
import { FormDisableAction } from "../../redux/actions/formDisableAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import moment from "moment";
import { NewStockDataAction } from "../../redux/actions/newStockListAction";
import { CompationAnalysisAction } from "../../redux/actions/competitionAnalysisAction";
import { ClosingStockDataAction } from "../../redux/actions/closingStockListAction";
import { AssestListAction } from "../../redux/actions/assestListAction";
import { RemainingFormAction } from "../../redux/actions/remainingFromCountAction";
import { DaynamicFormAction } from "../../redux/actions/dyanamicFromAction";
import { DaynamicWebFormAction } from "../../redux/actions/DaynamicWebFormAction";
import { FontsFamily } from "../../assets/fonts/fonts";
import { competitionBrandListAction } from "../../redux/actions/competitionBrandListAction";
import { AssestCategoryAction } from "../../redux/actions/assetTrackingDataAction";
import { TLDATA } from "../TlReporting/Data";
const DailyReporting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const checkinData = useSelector(
    (state) => state?.checkInOutReducer?.DashbordListData?.data?.checkInStatus
  );
  let remainingForm = useSelector(
    (state) =>
      state?.remainingFromCountReducer?.allDetails?.allStore?.count
        ?.remainingFoirmName
  );

  const Profilerole = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.role_name
  );

  let DaynamicFroms = useSelector(
    (state) => state?.dyanamicFromReducer?.allDetails?.data?.report_names
  );
  let DaynamicWebFroms = useSelector(
    (state) => state?.DaynamicWebFormReducer?.allDetails?.data
  );
  console.log(DaynamicWebFroms, "DaynamicWebFroms------");
  const isLoading = useSelector(
    (state) => state?.dyanamicFromReducer?.isLoading
  );
  console.log(isLoading, "isLoading=====-------*****");

  let filteredDataPramoter = DATA.filter((item) =>
    DaynamicFroms?.includes(item.title)
  );
  console.log(
    filteredDataPramoter,
    "filteredDataPromoter---------------*******"
  );

  let merData = MERCHANTDATA;
  let filteredDataMer = merData.filter((item) =>
    DaynamicFroms?.includes(item.title)
  );

  console.log(filteredDataMer, "filteredDataMer---------------*******");

  const handleItemClick = (item) => {
    checkinData == 1
      ? Alert.alert("Please CheckIn First")
      : navigation.navigate(item.screen);
  };
  const currentDate = moment();

  const formattedDate = currentDate.format("YYYY-MM-DD");
  const [token, setToken] = useState("");
  const [storeid, setStoreID] = useState("");
  console.log(storeid, "storeid====-----");
  console.log({ token });

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreID(data);
        dispatch(FormDisableAction(token, data));
        dispatch(StoreDetails(token, data));
        // dispatch(CategoryDataAction(token, navigation, data, formattedDate));
        // dispatch(NewStockDataAction(token, formattedDate, data, navigation));
        // dispatch(CompationAnalysisAction(token));
        // dispatch(PromoListAction(token, data));
        // dispatch(
        //   ClosingStockDataAction(token, formattedDate, data, navigation)
        // );
        // dispatch(CategoryDataAction(token, storeid, navigation));

        // dispatch(AssestListAction(token, data, navigation));
        // dispatch(competitionBrandListAction(token, data));
        // dispatch(AssestCategoryAction(token, storeid));
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
        dispatch(RemainingFormAction(data));
        dispatch(DaynamicFormAction(data));
        dispatch(DaynamicWebFormAction(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <View>
        <Header
          header={"Daily Reporting"}
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
            ListFooterComponent={
              DaynamicWebFroms && DaynamicWebFroms.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 120 }}
                  numColumns={2}
                  ListHeaderComponent={
                    <View
                      style={{
                        width: "95%",
                        backgroundColor: COLORS.white,
                        alignSelf: "center",
                        borderRadius: 5,
                      }}
                    >
                      <Text
                        style={{
                          padding: 10,
                          fontFamily: FontsFamily.Bold,
                          fontWeight: "900",
                          color: "black",
                          textAlign: "center",
                          fontSize: 20,
                        }}
                      >
                        Adopted Tab
                      </Text>
                    </View>
                  }
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
                          <Text style={styles.FlatText}>
                            {item?.table_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null
            }
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
            data={
              Profilerole == "merchandiser"
                ? filteredDataMer
                : filteredDataPramoter
            }
            // data={Profilerole == "merchandiser" ? MERCHANTDATA : DATA}
            renderItem={({ item }) => (
              <View style={styles.FlatlistView}>
                <TouchableOpacity
                  style={styles.TouchableOpacityView}
                  onPress={() => handleItemClick(item)}
                >
                  <View style={styles.subFlatView}>
                    {/* {item.filldata && remainingForm?.includes(item.filldata) ? (
                      <View></View>
                    ) : (
                      <View style={styles.doneimgView}>
                        <Image
                          source={Images.checktrue}
                          style={styles.doneimg}
                        />
                      </View>
                    )} */}
                    <Image style={styles.imgsStyle} source={item.imgs} />

                    <Text style={styles.FlatText}>{item.title}</Text>
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

export default DailyReporting;
