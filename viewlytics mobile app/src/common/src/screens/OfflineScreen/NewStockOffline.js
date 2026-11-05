import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { NewStockDataAction } from "../../redux/actions/newStockListAction";
import moment from "moment";
import { NewStockCreateDataAction } from "../../redux/actions/newstockCreateDataAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { COLORS } from "../../colors/colors";
import index from "../../Notification/index";
import { styles } from "../NewStock/NewStockStyle";
import { OfflineFormStatus } from "../../redux/actions/offlineFormStatusAction";

const NewStockOffline = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storedata, setStoreData] = useState({});
  const [newStockData, SetNewStockData] = useState();
  console.log(newStockData, "newStockData-------");
  let newDataArr = [newStockData];
  console.log(newStockData, "==========newstock");

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
  const getNewCategoryDetails = async () => {
    AsyncStorage.getItem(DB.OFFLINE_OPENING_INV)
      .then((data) => {
        let newCategoryData = JSON.parse(data);
        // console.log("newCategoryData========>", newCategoryData);

        newCategoryData &&
          newCategoryData.forEach((item) => {
            console.log("item12345", item);
            item.sku.forEach((element) => {
              (element["closing_stock"] = 0),
                (element["new_stock"] = 0),
                (element["open_inventory"] = element.openingStock),
                (element["sku_id"] = element.value);
            });
          });
        console.log("=================================", newCategoryData);
        //modify opening stock data as new stock data

        let arr = [];
        newCategoryData &&
          newCategoryData?.forEach((item) => {
            console.log("itemarr12345newCategoryData", item);
            let newObject = {};
            item.sku.forEach((element) => {
              newObject = {
                closing_stock: 0,
                new_stock: 0,
                open_inventory: element.openingStock,
                sku_id: element.value,
              };
              arr.push(newObject);
            });
          });
        console.log("newCategoryDataUpdated=====>", arr);
        setDataUpdate(arr);
        console.log("dataUpdate======>", dataUpdate, arr);
        SetNewStockData(newCategoryData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        // dispatch(StoreDetails(token, data));
        // dispatch(NewStockDataAction(token, formattedDate, data, navigation));
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
        getNewCategoryDetails();
        getCategoryDetailsRemark();
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
  const NewstockData = useSelector(
    (state) => state?.newStockListReducer?.NewStockData
  );

  const NewStockFilteredData = useSelector(
    (state) => state?.newStockListReducer?.NewStockFilteredData
  );

  const NewStockError = useSelector(
    (state) => state?.newStockCreateDataReducer?.error
  );

  // const isFormEnable = useSelector(
  //   (state) => state?.offlineStatusReducer?.offlineStatus?.new_stock_form
  // );

  // console.log("isFormEnableNewStock======>", isFormEnable);

  // let isEnable =
  //   isFormEnable == undefined || isFormEnable == true ? true : false;
  const [categoryRemarks, setCategoryRemarks] = useState("");

  const [isEnable, setIsEnable] = useState();

  const getCategoryDetailsRemark = async () => {
    AsyncStorage.getItem(DB.OFFLINE_NEW_STOCK_REMARK)
      .then((data) => {
        let remark = JSON.parse(data);
        console.log("getCategoryDetailsRemark=====>", remark);
        setCategoryRemarks(remark);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getIsEnable = async () => {
    AsyncStorage.getItem(DB.NEW_STOCK_FORM)
      .then((data) => {
        console.log("NEW_STOCK_FORM", data);
        let isData = data !== null || data == true ? true : false;

        setIsEnable(isData);
        console.log("isData", isData, isEnable);
        // isEnable = data != true ? false : true;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getIsEnable();
    getToken();
  }, []);
  useEffect(() => {
    setData(newStockData);
  }, [newStockData]);
  const [data, setData] = useState(newStockData);

  const onPressMenu = (item, index) => {
    let tempArr = newStockData;
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

  const [value, setValue] = useState("");
  console.log(value, "value--------------");
  const [skid, setSkid] = useState("");
  const [datas, setDatas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [note, setNote] = useState("");
  const [valueSKU, setValueSKU] = useState("");
  const [dataUpdate, setDataUpdate] = useState();
  console.log(dataUpdate, "dataUpdate====");
  const handleInputChange = (text) => {
    setInputValue(text);
    if (inputValue !== "") {
      const newObject = {
        sku_id: skid,
        new_inventory: text,
        id: value,
        // status: "newStock",
      };
      setDatas([...datas, newObject]);
      setInputValue("");
    }
  };

  const handleArr = (category_id, newValue, sku_id) => {
    console.log("dataUpdate==============>", dataUpdate);
    // Find the item in the data array with the matching sku_id
    const updatedData = dataUpdate.map((item) => {
      console.log("itemUpdate", item, sku_id);
      if (item.sku_id === sku_id) {
        // Update the opening_inventory property for the matching item
        return { ...item, new_inventory: newValue.toString() };
      }
      return item;
    });
    // Update the state with the new data
    setDataUpdate(updatedData);
  };

  const filteredData = datas.reduce(
    (accumulator, current) => {
      if (current.sku_id !== "") {
        accumulator.idMap[current.sku_id] = current;
      }
      return accumulator;
    },
    { idMap: {} }
  );

  const finalResult = Object.values(filteredData.idMap);
  console.log(finalResult, "finalResult=====----");
  const SaveData = async (key, array) => {
    try {
      const jsonValue = JSON.stringify(dataUpdate);
      await AsyncStorage.setItem(DB.OFFLINE_NEWSTOCK, jsonValue);
      console.log("Array saved successfully!");
    } catch (error) {
      console.error("Error saving array to AsyncStorage: ", error);
    }
  };

  const CreatNewStockDataHandle = () => {
    console.log("newStockData======>", newStockData);

    AsyncStorage.setItem(DB.OFFLINE_NEW_STOCK_REMARK, JSON.stringify(note))
      .then(() => {
        AsyncStorage.setItem(
          DB.OFFLINE_OPENING_INV,
          JSON.stringify(newStockData)
        )
          .then(() => {
            Alert.alert("Success", "New stock data submitted successfully", [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]);
          })
          .catch((error) => {
            console.error("Error saving opening inventory data:", error);
          });
      })
      .catch((error) => {
        console.error("Error saving remark data:", error);
      });
  };

  const onValueChange = (item, skuIndex, value, itemIndex) => {
    let tempArr = newStockData;

    tempArr.forEach((element) => {
      element.sku.forEach((skuElement, index) => {
        if (skuElement.sku_id === tempArr[itemIndex].sku[skuIndex].sku_id) {
          skuElement.new_stock = value;
        }
      });
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };
  const isLoadingss = useSelector(
    (state) => state?.newStockCreateDataReducer?.isLoading
  );
  return (
    <View style={styles.maincontainer}>
      {/* {NewStockError?.length > 0 ? (
        <ToastMessage
          msg={NewStockError}
          isVisible={NewStockError}
          isError={NewStockError}
        />
      ) : null} */}
      <Header
        header={"New Stock Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.flatmainView}>
          <StoreDetailCard />
          {newStockData && newStockData.length > 0 && (
            <FlatList
              ListFooterComponent={
                <View style={styles.StornameView}>
                  <View style={styles.remarkView}>
                    <Text style={styles.StorenameTexttwo}>Remark </Text>
                  </View>
                  <View style={styles.TextinputView}>
                    <TextInput
                      // editable={isEnable}
                      placeholderTextColor={"black"}
                      placeholder={
                        categoryRemarks ? categoryRemarks : "Remark Update..."
                      }
                      style={styles.Textinput}
                      multiline={true}
                      onChangeText={(text) => setNote(text)}
                    />
                  </View>
                  {/* {isEnable ? ( */}
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        CreatNewStockDataHandle();
                        SaveData();
                      }}
                    >
                      {isLoadingss ? (
                        <ActivityIndicator
                          color={COLORS.white}
                          style={styles.buttonText}
                        />
                      ) : (
                        <Text style={styles.buttonText}>submit</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  {/* ) : null} */}
                </View>
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.NoDataView}>
                  <Text style={styles.NoDataText}>No data!!!</Text>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 350 }}
              numColumns={1}
              scrollEnabled={true}
              data={newStockData}
              renderItem={({ item, index }) => {
                let itemIndex = index;
                console.log(item, "item=====");
                return (
                  <View style={styles.FlatView}>
                    <View style={styles.textView}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressMenu(item, index);
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
                              {item?.category_name}
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
                          <View style={styles.mainBox}>
                            <View style={styles.headerView}>
                              <Text style={styles.headerTexttwo}>SKU NAME</Text>
                            </View>
                            <View style={styles.headerViewtwo}>
                              <Text style={styles.headerTextone}>
                                OPNING STOCK
                              </Text>
                            </View>
                            <View style={styles.headerViewtwo}>
                              <Text style={styles.headerTextone}>
                                NEW STOCK
                              </Text>
                            </View>
                          </View>

                          <View style={styles.mapView}>
                            {item.sku.map((element, skuIndex) => {
                              return (
                                <View>
                                  <View style={styles.TableView}>
                                    <View style={styles.eleView}>
                                      <Text style={styles.dataText}>
                                        {element.label}
                                      </Text>
                                    </View>
                                    <View style={styles.oenView}>
                                      <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                      >
                                        <Text style={styles.opnText}>
                                          {element.open_inventory}
                                        </Text>
                                      </ScrollView>
                                    </View>
                                    <View style={styles.TextinputTW}>
                                      <TextInput
                                        // editable={isEnable}
                                        placeholderTextColor={COLORS.gray}
                                        style={styles.dataTextinput}
                                        placeholder={element?.new_stock.toString()}
                                        keyboardType="numeric"
                                        returnKeyType={"done"}
                                        value={item.value}
                                        onChangeText={(text) => {
                                          if (
                                            /^\d+$/.test(text) ||
                                            text === ""
                                          ) {
                                            setValueSKU(text);
                                            handleArr(
                                              element.value,
                                              text,
                                              element.sku_id
                                            );
                                            handleInputChange(text);
                                            setSkid(element.sku_id);
                                            setValue(element.value);
                                          } else {
                                            Alert.alert(
                                              "Invalid Input",
                                              "Please enter a valid integer."
                                            );
                                          }
                                        }}
                                        onEndEditing={(text) => {
                                          onValueChange(
                                            item,
                                            skuIndex,
                                            valueSKU,
                                            itemIndex
                                          );
                                          setValueSKU("");
                                        }}
                                      />
                                    </View>
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
          {newStockData && newStockData.length == 0 ? (
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
      </KeyboardAvoidingView>
    </View>
  );
};
export default NewStockOffline;
