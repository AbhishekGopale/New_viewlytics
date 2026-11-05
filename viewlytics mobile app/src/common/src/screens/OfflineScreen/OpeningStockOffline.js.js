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
import { styles } from "../OpeningStockScreen/OpeningStockScreenStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { OpeningCreateDataAction } from "../../redux/actions/openingCreateDataAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import moment from "moment";
import { COLORS } from "../../colors/colors";
import { OfflineFormStatus } from "../../redux/actions/offlineFormStatusAction";
const OpeningStockOffline = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [dataUpdate, setDataUpdate] = useState();
  const [storedata, setStoreData] = useState({});
  const [categoryData, setCategoryData] = useState();
  const [categoryRemarks, setCategoryRemarks] = useState("");

  console.log(categoryData, "categoryData============");
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

  const getFilteredCategoryDetails = async () => {
    AsyncStorage.getItem(DB.OFFLINE_OPENING_INV_FILTERED_ARR)
      .then((data) => {
        let newCategoryData = JSON.parse(data);
        setDataUpdate(newCategoryData);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getCategoryDetailsRemark = async () => {
    AsyncStorage.getItem(DB.OFFLINE_OPENING_INV_REMARK)
      .then((data) => {
        let remark = JSON.parse(data);
        console.log("getCategoryDetailsRemark=====>", remark);
        setCategoryRemarks(remark);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [isEnable, setIsEnable] = useState(true);
  const getIsEnable = async () => {
    AsyncStorage.getItem(DB.OPENING_STOCK_FORM)
      .then((data) => {
        console.log("dataOpenStock", data);
        let isData = data == null || data == true ? true : false;

        setIsEnable(isData);
        console.log("isData", isData, isEnable);
        // isEnable = data != true ? false : true;
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
        getFilteredCategoryDetails();
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

  const AllCategoryList = useSelector(
    (state) => state?.categoryListReducer?.allDetails
  );

  const FilteredCategoryList = useSelector(
    (state) => state?.categoryListReducer?.filteredDetails
  );
  const isLoadings = useSelector(
    (state) => state?.categoryListReducer?.filteredDetails
  );
  const skuValue = AllCategoryList;
  const isLoadingss = useSelector(
    (state) => state?.openingCreateDataReducer?.isLoading
  );

  const isFormEnable = useSelector(
    (state) => state?.offlineStatusReducer?.offlineStatus?.opening_form
  );

  console.log("isFormEnable======>", isFormEnable);

  useEffect(() => {
    getIsEnable();
    getToken();
  }, []);
  useEffect(() => {
    setData(categoryData);
    setDataUpdate(FilteredCategoryList);
  }, [AllCategoryList]);

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

  const onValueChange = (item, index, value, itemIndex) => {
    let tempArr = categoryData;
    // let tempArr = AllCategoryList[itemIndex].sku;

    tempArr.forEach((element) => {
      if (element.id == tempArr[itemIndex].id) {
        element.sku.forEach((skuElement) => {
          if (skuElement.value === tempArr[itemIndex].sku[index].value) {
            skuElement.openingStock = value;
          }
        });
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
                  <Text style={[styles?.StorenameTexttwo]}>
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
  const [valueSKU, setValueSKU] = useState("");
  const [value, setValue] = useState("");
  console.log({ value });
  const [skid, setSkid] = useState("");
  console.log({ skid });
  const [skids, setSkids] = useState("");
  console.log({ skids });

  const [catId, setCatID] = useState("");
  const [datas, setDatas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");

  const handleInputChange = (text, os) => {
    setInputValue(text);
    if (inputValue !== "") {
      const newObject = {
        store_id: storeId,
        sku_id: skid,
        opening_inventory: text,
        category_id: catId,
        date: formattedDate,
        // status: "openingStock",
      };
      setDatas([...datas, newObject]);
      setInputValue("");
    }
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
  console.log(finalResult, "finalResult-----------");
  // const SaveData = () => {
  //   AsyncStorage.setItem(, JSON.stringify(finalResult));
  // };
  const SaveData = async (key, array) => {
    try {
      const jsonValue = JSON.stringify(finalResult);
      await AsyncStorage.setItem(DB.OFFLINE_OPENING, jsonValue);
      Alert.alert("Success", "Opening Inventory data submitted successfully", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error saving array to AsyncStorage: ", error);
    }
  };
  const CreatOpeningDataHandle = () => {
    console.log("dataUpdate======>", dataUpdate);

    let newCategoryData = categoryData;
    console.log("newCategoryData========>", newCategoryData);
    AsyncStorage.setItem(DB.OFFLINE_OPENING, JSON.stringify(newCategoryData));
    newCategoryData &&
      newCategoryData.forEach((item) => {
        console.log("item12345", item);
        item.sku.forEach((element) => {
          (element["closing_stock"] = 0),
            (element["new_stock"] = 0),
            (element["open_inventory"] = element.openingStock),
            (element["sku_id"] = element.value);
          element["ele_id"] = element.value;
        });
      });
    AsyncStorage.setItem(
      DB.OFFLINE_OPENING_INV,
      JSON.stringify(newCategoryData)
    );
    AsyncStorage.setItem(DB.OFFLINE_OPENING_INV_REMARK, JSON.stringify(value));
    let newArr = [
      {
        opening_form: true,
        new_stock_form: false,
        closing_form: true,
        all_form: true,
      },
    ];
    AsyncStorage.setItem(DB.OPENING_STOCK_FORM, JSON.stringify(true));
    AsyncStorage.setItem(DB.CLOSING_STOCK_FORM, JSON.stringify(true));
    AsyncStorage.setItem(DB.NEW_STOCK_FORM, JSON.stringify(true));
    AsyncStorage.setItem(DB.ALL_STOCK_FORM, JSON.stringify(true));

    // dispatch(OfflineFormStatus(newArr));
    // navigation.goBack();
    // dispatch(OpeningCreateDataAction(token, value, dataUpdate, navigation));
  };

  const OpeningInventoryError = useSelector(
    (state) => state?.openingCreateDataReducer?.OpeningCreatData?.error
  );

  // const [isLoadings,setIsLoadingss]=useState(false)
  const [openArr, setOpenArr] = useState([]);
  // const handleArr = (text, id) => {
  //   let data = [];
  //   FilteredCategoryList?.forEach((element) => {
  //     if (element.category_id === id) {
  //     }
  //   });
  // };

  const handleArr = (category_id, newValue, sku_id) => {
    // Find the item in the data array with the matching sku_id
    const updatedData = dataUpdate.map((item) => {
      if (item.sku_id === sku_id) {
        // Update the opening_inventory property for the matching item
        return { ...item, opening_inventory: newValue.toString() };
      }
      return item;
    });
    // Update the state with the new data
    setDataUpdate(updatedData);
  };

  return (
    <View style={styles.maincontainer}>
      {/* {OpeningInventoryError?.length > 0 ? (
        <ToastMessage
          msg={OpeningInventoryError}
          isVisible={OpeningInventoryError}
          isError={OpeningInventoryError}
        />
      ) : null} */}
      <Header
        header={"Opening Inventory Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.flatmainView}>
          <StoreDetailCard />
          {categoryData && categoryData.length > 0 && (
            <FlatList
              ListFooterComponent={
                <View style={styles.StornameView}>
                  <View style={styles.remarkView}>
                    <Text style={styles.StorenameTexttwo}>Remark </Text>
                  </View>
                  <View style={styles.TextinputView}>
                    <TextInput
                      // editable={isEnable}
                      placeholder={
                        categoryRemarks ? categoryRemarks : "Remark Update..."
                      }
                      style={styles.Textinput}
                      placeholderTextColor={COLORS.black}
                      onChangeText={(value) => setValue(value)}
                      multiline={true}
                    />
                  </View>
                  {/* {isEnable ? ( */}
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        CreatOpeningDataHandle();
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
              contentContainerStyle={{ paddingBottom: 350 }}
              keyExtractor={(item) => item?.index}
              ListEmptyComponent={
                <View style={styles.NoDataView}>
                  <Text style={styles.NoDataText}>No data!!!</Text>
                </View>
              }
              numColumns={1}
              scrollEnabled={true}
              data={categoryData}
              renderItem={({ item, index }) => {
                let skuItem = item?.sku;
                let itemIndex = index;

                return (
                  <View style={styles.FlatView}>
                    <View style={styles.textView}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressMenu(item, index);
                          setCatID(item.id);
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
                                OPENING STOCK
                              </Text>
                            </View>
                          </View>

                          <View style={styles.mapView}>
                            {item.sku.map((element, index) => {
                              console.log("element=======>", element);
                              return (
                                <View>
                                  <View style={styles.TableView}>
                                    <View
                                      style={{
                                        width: "70%",

                                        //justifyContent: "center",
                                        // alignItems: "center",
                                      }}
                                    >
                                      <Text style={styles.dataText}>
                                        {element.label}
                                      </Text>
                                    </View>
                                    <View style={styles.TextinputTW}>
                                      <TextInput
                                        // editable={isEnable}
                                        style={styles.dataTextinput}
                                        placeholder={element?.openingStock.toString()}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType="numeric"
                                        returnKeyType={"done"}
                                        // defaultValue={element.openingStock}
                                        onChangeText={(text) => {
                                          // Check if the input is a valid integer
                                          if (
                                            /^\d+$/.test(text) ||
                                            text === ""
                                          ) {
                                            setValueSKU(text);
                                            handleArr(
                                              item.id,
                                              text,
                                              element.value
                                            );
                                            handleInputChange(
                                              text,
                                              element.openingStock
                                            );
                                            setSkid(element.value);
                                            setSkids(element.sku_id);
                                            setValue(element.value);
                                          } else {
                                            // Show an alert for invalid input
                                            Alert.alert(
                                              "Invalid Input",
                                              "Please enter a valid integer."
                                            );
                                          }
                                        }}
                                        onEndEditing={(text) => {
                                          onValueChange(
                                            item,
                                            index,
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
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OpeningStockOffline;
