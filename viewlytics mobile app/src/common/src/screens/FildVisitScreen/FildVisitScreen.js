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
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FildVisitScreenStyle";
import { COLORS } from "../../colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { FildVisitDetail } from "../../redux/actions/fildVisitDetaisAction";
import { useDispatch, useSelector } from "react-redux";
const { height } = Dimensions.get("screen");
import { StoreDetails } from "../../redux/actions/storeDetailsAction";

const FildVisitScreen = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(FildVisitDetail(token, data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const fieldVisit = () => {
    dispatch(FildVisitDetail(token, storeId));
    dispatch(StoreDetails(token, storeId));
  };
  window.saveFieldVisit = () => {
    fieldVisit();
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        getStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const isLoading = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );

  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );

  useEffect(() => {
    getToken();
  }, []);

  const FildVisitDetails = useSelector(
    (state) => state?.fildVisitDetaisReducer?.allDetails
  );
  const isLoadings = useSelector(
    (state) => state?.fildVisitDetaisReducer?.isLoading
  );

  useEffect(() => {
    setData(FildVisitDetails);
  }, [FildVisitDetails]);
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
                  source={{ uri: storeDetails?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storeDetails?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storeDetails?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storeDetails?.zone_name}
                </Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storeDetails?.location}</Text>
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
        header={"Field Visit"}
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
                        disabled={item.fill_up == "1" ? true : false}
                        style={[
                          styles.conteiner,
                          {
                            backgroundColor:
                              item.fill_up == "1" ? COLORS.fg : COLORS.white,
                          },
                        ]}
                        onPress={() => {
                          {
                            item?.value == 5
                              ? navigation.navigate("Sixqustion", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : item?.value == 7
                              ? navigation.navigate("Savenqustion", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : item?.value == 8
                              ? navigation.navigate("EightQustion", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                })
                              : navigation.navigate("CreateFieldScreen", {
                                  selectedItem: item,
                                  storeDetails: storeDetails,
                                });
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

export default FildVisitScreen;
