import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./DrsScreenStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { DsrDataAction } from "../../redux/actions/dsrAtion";
import moment from "moment";
import { COLORS } from "../../colors/colors";

const DrsScreen = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(DsrDataAction(token, formattedDate, data, navigation));
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
  const DsrData = useSelector((state) => state?.dsrReducer?.DsrData?.newArr);
  const DsrDatasss = useSelector((state) => state?.dsrReducer);
  console.log({ DsrDatasss });
  let ApprochData = DsrDatasss?.DsrData?.ApprochData?.data?.approach_person;
  console.log({ ApprochData });

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(DsrData);
  }, [DsrData]);

  const [data, setData] = useState(DsrData);
  const onPressMenu = (item, index) => {
    let tempArr = data;
    tempArr.forEach((element) => {
      if (element.id === tempArr[index].id) {
        element.isSelected = !tempArr[index].isSelected;
      } else {
        element.isSelected = false;
      }
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };

  const StoreDetailCard = () => {
    return isLoading ? (
      <View
        style={{
          marginTop: 25,
        }}
      >
        <ActivityIndicator color={"blue"} size={"large"} />
      </View>
    ) : (
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
                <Text style={styles.TlText}>TL Name : {storeDetails?.tl}</Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <Text style={styles.AddText}>Number Of People Approached :</Text>
              <View style={styles.AdressView}>
                <Text style={{ color: COLORS.black }}> {ApprochData}</Text>
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
    <View style={styles.maincontainer}>
      <Header
        header={"DSR"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.flatmainView}>
        <StoreDetailCard />
        {DsrData && DsrData.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 280 }}
            ListEmptyComponent={
              <View style={styles.NoDataView}>
                <Text style={styles.NoDataText}>No data!!!</Text>
              </View>
            }
            numColumns={1}
            scrollEnabled={true}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.FlatView}>
                  <View style={styles.textView}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressMenu(item, index);
                      }}
                    >
                      <View style={styles.dsrView}>
                        <View style={styles.mainVie}>
                          <View>
                            <Image
                              resizeMode="cover"
                              source={{ uri: item.image }}
                              style={styles.imagStyle}
                            />
                          </View>
                          <Text style={styles.titleText}>
                            {item.category_name}
                          </Text>
                        </View>
                        <View style={styles.iconView}>
                          {item.isSelected == true ? (
                            <Image source={Images.close} style={styles.icon} />
                          ) : (
                            <Image source={Images.Dwon} style={styles.icon} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>

                    {item.isSelected ? (
                      <View style={styles.DetailTextview}>
                        <View style={styles.mainBox}>
                          <View style={styles.headerView}>
                            <Text style={styles.headerTexttwo}>SKU NAME</Text>
                          </View>
                          <View style={styles.headerViewtwo}>
                            <Text style={styles.headerTextone}>STOCK</Text>
                          </View>
                        </View>

                        <View style={styles.mapView}>
                          {item?.sku?.map((element, index) => {
                            const name = element.label;
                            const value = element.dsr;

                            return (
                              <View style={styles.TableView}>
                                <View style={styles.eleView}>
                                  <Text style={styles.dataText}>{name}</Text>
                                </View>
                                <View style={styles.TextinputTW}>
                                  <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                  >
                                    <Text style={styles.dataText}>
                                      {value == null ? "0" : value}
                                    </Text>
                                  </ScrollView>
                                </View>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default DrsScreen;
