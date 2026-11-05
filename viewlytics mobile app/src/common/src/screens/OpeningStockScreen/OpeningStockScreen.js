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
import { styles } from "./OpeningStockScreenStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { OpeningCreateDataAction } from "../../redux/actions/openingCreateDataAction";
import moment from "moment";
import { COLORS } from "../../colors/colors";
import CustomSuccessModal from "../../components/CustomSuccessModal/CustomSuccessModal";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";
const OpeningStockScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [dataUpdate, setDataUpdate] = useState(FilteredCategoryList);

  // console.log(dataUpdate, "dataUpdate====");
  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(CategoryDataAction(token, navigation, data, formattedDate));
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
    (state) =>
      state?.formDisableReducer?.formDisableData?.forms_status?.opening_form
  );
  const openingDataSucess = useSelector(
    (state) => state?.openingCreateDataReducer?.OpeningCreatData?.message
  );
  const [message, setMessage] = useState(
    openingDataSucess ? openingDataSucess : ""
  );

  let isEnable = isFormEnable == 1 ? false : true;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(AllCategoryList);
    setDataUpdate(FilteredCategoryList);
  }, [AllCategoryList]);

  const [data, setData] = useState(AllCategoryList);
  console.log(data, "data");
  const onPressMenu = (item, index) => {
    let tempArr = AllCategoryList;
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
    let tempArr = AllCategoryList;
    // let tempArr = AllCategoryList[itemIndex].sku;

    tempArr.forEach((element) => {
      if (element.id == tempArr[itemIndex].id) {
        element.sku.forEach((skuElement) => {
          if (skuElement.value === tempArr[itemIndex].sku[index].value) {
            skuElement.openingStock = value;
            skuElement.opening_inventory_track = value;
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
  const [valueSKU, setValueSKU] = useState("");
  const [value, setValue] = useState("");
  const [skid, setSkid] = useState("");
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
      };
      setDatas([...datas, newObject]);
      // console.log("datasssss=", datas);
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

  const CreatOpeningDataHandle = () => {
    const isAnyOpeningInventoryEmpty = dataUpdate.some(
      (item) => item?.opening_inventory_track === ""
    );

    if (isAnyOpeningInventoryEmpty) {
      Alert.alert("Please fill in all opening inventories.");
    } else {
      dispatch(
        OpeningCreateDataAction(token, value, dataUpdate, navigation, storeId)
      );
    }
  };

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
    const updatedData = dataUpdate.map((item) => {
      if (item?.sku_id === sku_id) {
        return {
          ...item,
          opening_inventory: newValue.toString(),
          opening_inventory_track: newValue.toString(),
        };
      }
      return item;
    });
    setDataUpdate(updatedData);
  };
  const showAlert = () => {
    Alert.alert(
      "Confirmation",
      `${message}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            setMessage("");
          },
        },
      ],
      { cancelable: false }
    );
  };
  const maxlangth = useSelector(
    (state) => state?.distanceReducer?.distanceDetails[0]?.Digit
  );

  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    // console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };

  return (
    <View style={styles.maincontainer}>
      <Header
        header={"Opening Inventory"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <ServerScreen
        title={isErrorVisibleMsg}
        // subtitle="Your Subtitle"
        // message="Your Message"
        modalVisible={isErrorVisible}
        closeModal={() => {
          closeModalss();
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.flatmainView}>
          <StoreDetailCard />
          {AllCategoryList && AllCategoryList.length > 0 && (
            <FlatList
              extraData={catId}
              ListFooterComponent={
                <View style={styles.StornameView}>
                  <View style={styles.remarkView}>
                    <Text style={styles.StorenameTexttwo}>Remark </Text>
                  </View>
                  <View style={styles.TextinputView}>
                    <TextInput
                      editable={isEnable}
                      placeholder="Remark Update...."
                      style={styles.Textinput}
                      placeholderTextColor={COLORS.black}
                      onChangeText={(value) => setValue(value)}
                      multiline={true}
                    />
                  </View>
                  {isEnable ? (
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        disabled={isLoadingss}
                        style={styles.button}
                        onPress={() => {
                          CreatOpeningDataHandle();
                        }}
                      >
                        {isLoadingss ? (
                          <ActivityIndicator
                            color={COLORS.white}
                            style={styles.buttonText}
                          />
                        ) : (
                          <Text style={styles.buttonText}>Submit</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
              }
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 350 }}
              keyExtractor={(item) => item?.id.toString()}
              ListEmptyComponent={
                <View style={styles.NoDataView}>
                  <Text style={styles.NoDataText}>No data!!!</Text>
                </View>
              }
              numColumns={1}
              scrollEnabled={true}
              data={data}
              renderItem={({ item, index }) => {
                let skuItem = item?.sku;
                let itemIndex = index;

                return (
                  <View style={styles.FlatView}>
                    <View style={styles.textView}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressMenu(item, index);
                          setCatID(item?.id);
                        }}
                      >
                        <View style={styles.TablemainView}>
                          <View style={styles.mainVie}>
                            <View>
                              {item?.image ? (
                                <Image
                                  resizeMode="cover"
                                  source={{ uri: item?.image }}
                                  style={styles.imagStyle}
                                />
                              ) : null}
                            </View>
                            <Text style={styles.titleText}>
                              {item?.category_name}
                            </Text>
                          </View>
                          <View style={styles.iconView}>
                            {item?.isSelected == true ? (
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
                      {item?.isSelected ? (
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
                            {item?.sku?.map((element, index) => {
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
                                        {element?.label}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.TextinputTW,
                                        {
                                          backgroundColor:
                                            element.opening_inventory_track ==
                                            ""
                                              ? "white"
                                              : "green",
                                        },
                                      ]}
                                    >
                                      <TextInput
                                        editable={isEnable}
                                        style={styles.dataTextinput}
                                        placeholder={element.openingStock}
                                        placeholderTextColor={
                                          element.opening_inventory_track == ""
                                            ? COLORS.gray
                                            : COLORS.white
                                        }
                                        keyboardType="numeric"
                                        returnKeyType={"done"}
                                        maxLength={maxlangth}
                                        onChangeText={(text) => {
                                          if (
                                            /^\d+$/.test(text) ||
                                            text === ""
                                          ) {
                                            setValueSKU(text);
                                            handleArr(
                                              item?.id,
                                              text,
                                              element.value
                                            );
                                            handleInputChange(
                                              text,
                                              element.openingStock
                                            );
                                            setSkid(element.value);
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
        <CustomSuccessModal
          visible={modalVisible}
          closeModal={closeModal}
          type="fail"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default OpeningStockScreen;
