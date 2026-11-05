import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "../FildVisitScreen/FildVisitScreenStyle";
import { COLORS } from "../../colors/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
// import { FildVisitDetail } from "../../redux/actions/fildVisitDetaisAction";
import { useDispatch, useSelector } from "react-redux";
const { height } = Dimensions.get("screen");
// import { StoreDetails } from "../../redux/actions/storeDetailsAction";

const FildVisitScreenOffline = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [datas, setDatas] = useState(null);
  console.log(datas, "datas-------------------");
  const getoldData = async (token) => {
    try {
      const storedDataString = await AsyncStorage.getItem(
        DB.FIELD_VISIT_CREATE_DATA
      );

      if (storedDataString) {
        const arrayobj = JSON.parse(storedDataString);
        console.log("Parsed Data:", arrayobj);
        setDatas(arrayobj);
      } else {
        console.log("No data found in AsyncStorage");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        // dispatch(StoreDetails(token, data));
        // dispatch(FildVisitDetail(token, data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [qustionList, setQustionList] = useState([]);
  const [storeData, setStoreData] = useState({});
  console.log(storeData, "storeData-------");
  const getQustionList = async () => {
    AsyncStorage.getItem(DB.FILD_VISIT_LIST)
      .then((data) => {
        setQustionList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getStoredetails = async () => {
    AsyncStorage.getItem(DB.STORE_DETAILS)
      .then((data) => {
        let newData = JSON.parse(data);
        setStoreData(newData);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        getStoreId(data);
        getQustionList();
        getoldData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isLoading = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );

  const storeDetails = storeData;

  useEffect(() => {
    getToken();
    getStoredetails();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getoldData();
      getQustionList();
    }, [])
  );

  const FildVisitDetails = useSelector(
    (state) => state?.fildVisitDetaisReducer?.allDetails
  );
  const isLoadings = useSelector(
    (state) => state?.fildVisitDetaisReducer?.isLoading
  );

  useEffect(() => {
    setData(FildVisitDetails);
  }, [FildVisitDetails, datas]);

  const [data, setData] = useState(FildVisitDetails);
  console.log(data, "data--------");

  const navigation = useNavigation();
  const StoreDetailCard = () => {
    return (
      <View>
        <View style={styles.StornameView}>
          <View style={styles.maiconteinet}>
            <View style={styles.imgView}>
              <View style={styles.imgConteiner}>
                <Image
                  resizeMode="contain"
                  source={{ uri: storeData?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storeData?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storeData?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storeData?.zone_name}
                </Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storeData?.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        header={"Field Visit Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      {isLoadings || isLoading ? (
        <View
          style={{
            marginTop: 25,
          }}
        >
          <ActivityIndicator color={"blue"} size={"large"} />
        </View>
      ) : (
        <View>
          <View style={styles.DropView}>
            <StoreDetailCard />
          </View>
          <View style={styles.FlatlistContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 400 }}
              scrollEnabled={true}
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View style={styles.mainFlatView}>
                      <TouchableOpacity
                        disabled={
                          item.fill_up == "1" ||
                          datas?.some((bItem) => bItem.value == item?.value)
                            ? true
                            : false
                        }
                        style={[
                          styles.conteiner,
                          {
                            backgroundColor:
                              item.fill_up == "1" ||
                              datas?.some((bItem) => bItem.value == item?.value)
                                ? COLORS.fg
                                : COLORS.white,
                          },
                        ]}
                        onPress={() => {
                          {
                            item?.value == 5
                              ? navigation.navigate("SixqustionOffline", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : item?.value == 7
                              ? navigation.navigate("SavenqustionOffline", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : item?.value == 8
                              ? navigation.navigate("EightQustionOffline", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : navigation.navigate(
                                  "CreateFieldScreenOffline",
                                  {
                                    selectedItem: item,
                                    storeDetails: storeDetails,
                                  }
                                );
                          }
                        }}
                      >
                        <View style={styles.TextView}>
                          <Text style={styles.Qustiontext}>{item.label}</Text>
                        </View>
                        <View style={styles.imgViews}>
                          <Image
                            source={Images.rightArrow}
                            style={styles.imgstyle}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default FildVisitScreenOffline;
