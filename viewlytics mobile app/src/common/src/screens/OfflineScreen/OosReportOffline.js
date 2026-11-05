import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import OssButton from "../../components/RedioButton/OssButton";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import { OosReportCreateAction } from "../../redux/actions/oosReportCreateAction";
import moment from "moment";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import index from "../../Notification/index";
import { COLORS } from "../../colors/colors";
import { styles } from "../OOSReport/OosReportStyle";

const OosREportOffline = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storedata, setStoreData] = useState({});
  const [categoryData, setCategoryData] = useState();
  const [categoryId, setCategoryId] = useState("");

  const [values, setValue] = useState("");
  console.log({ values });
  console.log(categoryId, "categoryId====");
  console.log(categoryData, "categoryDataoosReport========-------");
  const extractedSkus = categoryData
    ?.map((item) => ({
      sku: item.sku,
    }))
    .flat();
  console.log(extractedSkus, "extractedSkus==========-----");
  const [newSKUArr, setNewSKUArr] = useState([]);

  const getCategoryDetails = async () => {
    AsyncStorage.getItem(DB.CATEGORY_DATA)
      .then((data) => {
        let newCategoryData = JSON.parse(data);
        setCategoryData(newCategoryData);
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
        getStoreId(data);
        getStoredetails();
        getCategoryDetails();
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

  const AllCategoryList = useSelector(
    (state) => state?.categoryListReducer?.allDetails
  );

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(categoryData);
  }, [categoryData]);

  const [data, setData] = useState(categoryData);
  const onPressMenu = (item, index) => {
    let tempArr = categoryData;
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
                  source={{ uri: storedata?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storedata?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storedata?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storedata?.zone_name}
                </Text>
                <Text style={styles.TlText}>TL Name : {storedata?.tl}</Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storedata?.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onValueChange = (value, itemIndex, oos_status, mainIndex) => {
    let tempArr = categoryData;

    tempArr.forEach((element) => {
      // if (element.id == tempArr[itemIndex].id) {
      element.sku.forEach((skuElement, index) => {
        if (skuElement.value === tempArr[mainIndex].sku[itemIndex].value) {
          skuElement.oos_status = oos_status;
        }
      });
      // }
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };

  const [skid, setSkid] = useState("");
  const [datas, setDatas] = useState([]);
  const [note, setNote] = useState("");

  const handleclickanswer = (answer, val) => {
    if (answer === "1" || answer === "0") {
      const newObject = {
        store_id: storeId,
        sku_id: val,
        category_id: values,
        oos_status: answer,
        date: formattedDate,
      };

      // setDatas((datas) => [...datas, newObject]);
      setDatas([...datas, newObject]);
    }
  };

  const skuIdMap = {};
  // for (const item of datas) {
  //   skuIdMap[item.sku_id] = item;
  // }

  // const filteredArray = Object.values(skuIdMap);

  const filteredArray = datas.reduceRight((acc, item) => {
    if (item.sku_id !== "") {
      if (!skuIdMap[item.sku_id]) {
        skuIdMap[item.sku_id] = true;
        acc.unshift(item);
      }
    }
    return acc;
  }, []);

  // const saveDatahandl = () => {
  //   categoryData.forEach((item) => {
  //     console.log("item12345", item);
  //     item.sku.forEach((element) => {
  //       console.log({ element }, "=========");
  //       (element["closing_stock"] = 0),
  //         (element["open_inventory"] = 0),
  //         (element["new_stock"] = 0),
  //         (element["oos_status"] = element.oos_status),
  //         (element["sku_id"] = element.value);
  //     });
  //   });
  //   AsyncStorage.setItem(DB.CATEGORY_DATA, JSON.stringify(categoryData));
  //   console.log(categoryData, "categoryData");
  //   AsyncStorage.setItem(DB.OOS_INV_REMARK, JSON.stringify(note));

  //   navigation.goBack();
  // };
  const saveData = async () => {
    const updatedA = [];
    extractedSkus?.forEach((item) => {
      item.sku.forEach((element) => {
        if (
          newSKUArr.length === 0 ||
          !newSKUArr.some((el) => el.value === element.value)
        ) {
          updatedA.push({
            ...element,
            store_id: storeId,
            category_id: values,
          });
        }
      });
    });

    // Update newSKUArr with updatedA
    setNewSKUArr([...newSKUArr, ...updatedA]);

    console.log(updatedA, "updatedA------======", newSKUArr);
    try {
      await AsyncStorage.setItem(DB.OOS_DATA_OFFLINE, JSON.stringify(updatedA));

      await AsyncStorage.setItem(DB.OOS_INV_REMARK, JSON.stringify(note));
      console.log(note, "categoryDataofflinenote=====");

      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "OOS Report data submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const CreatNewStockDataHandle = () => {
    // AsyncStorage.setItem(DB.SOS_REPORT_FORM, JSON.stringify(filteredArray));

    dispatch(OosReportCreateAction(token, note, filteredArray, navigation));
  };

  const OssReportError = useSelector(
    (state) => state?.oosReportCreateReducer?.error
  );
  const isLoadings = useSelector(
    (state) => state?.oosReportCreateReducer?.isLoading
  );
  return (
    <View style={styles.maincontainer}>
      <Header
        header={"OOS Report Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.flatmainView}>
        <StoreDetailCard />
        <View
          style={{
            width: "95%",
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 5,
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text style={{ color: "green" }}>* OOS </Text>
            <Text style={{ color: "black" }}>
              : it means it's out of stock.
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginLeft: 10 }}>
            <Text style={{ color: "red" }}>* Available </Text>
            <Text style={{ color: "black" }}>
              : it means it's available in-store.
            </Text>
          </View>
        </View>
        {AllCategoryList && AllCategoryList.length > 0 && (
          <FlatList
            ListFooterComponent={
              <View style={styles.StornameView}>
                <View style={styles.remarkView}>
                  <Text style={styles.StorenameTexttwo}>Remark </Text>
                </View>
                <View style={styles.TextinputView}>
                  <TextInput
                    placeholderTextColor={"black"}
                    placeholder="Remark Update"
                    style={styles.Textinput}
                    onChangeText={(text) => setNote(text)}
                    multiline={true}
                  />
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.butttontouch}
                    disabled={isLoadings}
                    onPress={() => saveData()}
                  >
                    {isLoadings ? (
                      <ActivityIndicator
                        color={COLORS.white}
                        style={styles.buttonText}
                      />
                    ) : (
                      <Text style={styles.buttonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 350 }}
            ListEmptyComponent={
              <View style={styles.NoDataView}>
                <Text style={styles.NoDataText}>No data!!!</Text>
              </View>
            }
            numColumns={1}
            scrollEnabled={true}
            data={data}
            keyExtractor={(item) => item?.index}
            renderItem={({ item, index }) => {
              let skuItem = item?.sku;
              let itemIndex = index;
              return (
                <View style={styles.FlatView}>
                  <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={styles.textView}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressMenu(item, index);
                          setValue(item.id);
                        }}
                      >
                        <View style={styles.TablemainView}>
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
                              <Image
                                source={Images.close}
                                style={styles.icon}
                              />
                            ) : (
                              <Image source={Images.Dwon} style={styles.icon} />
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* ///// */}
                      {item.isSelected ? (
                        <View style={styles.DetailTextview}>
                          <View style={styles.mapView}>
                            {item.sku.map((element, index) => {
                              return (
                                <View>
                                  <View style={styles.TableView}>
                                    <View style={styles.eleView}>
                                      <Text style={styles.dataText}>
                                        {element.label}
                                      </Text>
                                      <View style={styles.buttonContiner}>
                                        <OssButton
                                          isYes={element.oos_status}
                                          onYesClick={(answer) => {
                                            // console.log(answer, "answer");
                                            handleclickanswer(
                                              answer,
                                              element.value
                                            );
                                            onValueChange(
                                              element.value,
                                              index,
                                              answer,
                                              itemIndex
                                            );
                                            setSkid(element.value);
                                          }}
                                          onNoClick={(answer) => {
                                            // console.log(answer, "answer");

                                            handleclickanswer(
                                              answer,
                                              element.value
                                            );
                                            onValueChange(
                                              element.value,
                                              index,
                                              answer,
                                              itemIndex
                                            );
                                            setSkid(element.value);
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </KeyboardAvoidingView>
                </View>
              );
            }}
          />
        )}
        {AllCategoryList && AllCategoryList.length == 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontFamily: FontsFamily.NotoSansBold,
                fontSize: 18,
              }}
            >
              Please Fill the Opening Stock First!
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default OosREportOffline;
