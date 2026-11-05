import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./ClosingStockScreenStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { ClosingStockDataAction } from "../../redux/actions/closingStockListAction";
import moment from "moment";
import { ClosingCreateDataAction } from "../../redux/actions/closingStockCreateDataAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { COLORS } from "../../colors/colors";
import index from "../../Notification/index";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";

const ClosingStockScreen = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const isFormEnable = useSelector(
    (state) =>
      state?.formDisableReducer?.formDisableData?.forms_status?.closing_form
  );

  let isEnable = isFormEnable == 1 ? false : true;

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(
          ClosingStockDataAction(token, formattedDate, data, navigation)
        );
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

        //  dispatch(CategoryDataAction(data));
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
  const ClosingData = useSelector(
    (state) => state?.closingStockListReducer?.ClosingStockData
  );
  const ClosingFilteredData = useSelector(
    (state) => state?.closingStockListReducer?.ClosingStockFilterData
  );

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(ClosingData);
  }, [ClosingData]);

  const [data, setData] = useState(ClosingData);
  const onPressMenu = (item, index) => {
    let tempArr = ClosingData;
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
  const [value, setValue] = useState("");
  const [skid, setSkid] = useState("");
  const [datas, setDatas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [note, setNote] = useState("");
  const [approch, setApproch] = useState("");
  const [valueSKU, setValueSKU] = useState("");
  const onValueChange = (value, itemIndex, sku_id, mainIndex, calledBy) => {
    let tempArr = ClosingData;

    tempArr.forEach((element) => {
      element.sku.forEach((skuElement, index) => {
        if (skuElement.sku_id === tempArr[mainIndex].sku[itemIndex].sku_id) {
          let mainVal = skuElement.open_inventory + skuElement.new_stock;
          if (parseInt(value) > mainVal) {
            skuElement.closing_inventory_track = "";
            skuElement.closing_stock = 0;
          } else {
            skuElement.closing_stock = value;
            skuElement.closing_inventory_track = value;
          }
        }
      });
      // }
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };

  const createTwoButtonAlert = (value, itemIndex, sku_id, mainIndex) =>
    Alert.alert("Invalid Input", "Please Enter Valid Value", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setValue(0),
            onValueChange(value, itemIndex, sku_id, mainIndex, "alert");
        },
      },
    ]);

  const handleInputChange = (text) => {
    setInputValue(text);
    if (text !== "") {
      const newObject = {
        sku_id: skid,
        id: value,
        closing_inventory: text,
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
  const CreatClosingStockDataHandle = () => {
    dispatch(
      ClosingCreateDataAction(
        token,
        note,
        finalResult,
        navigation,
        approch,
        storeId
      )
    );
  };

  let isCreatClosingStockDataHandled = false;
  let isFilled = false;
  const checkFilledData = () => {
    data.forEach((element, index) => {
      element.sku.forEach((skuElement, index) => {
        let totalStock = skuElement?.new_stock + skuElement?.open_inventory;
        if (totalStock > 0) {
          console.log(
            "skuelementclosing_inventory_track=====>",
            skuElement.closing_inventory_track
          );
          if (skuElement.closing_inventory_track === "") {
            isFilled = false;
          } else {
            isFilled = true;
          }
        }
      });
    });
    if (isFilled) {
      CreatClosingStockDataHandle();
    } else {
      Alert.alert("Please fill all the fields");
    }
  };

  const isLoadingss = useSelector(
    (state) => state?.closingStockCreateDataReducer?.isLoading
  );
  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <View style={styles.maincontainer}>
      <Header
        header={"Closing Inventory"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <ServerScreen
        title={isErrorVisibleMsg}
        modalVisible={isErrorVisible}
        closeModal={() => {
          closeModalss();
        }}
      />
      <View style={styles.flatmainView}>
        <StoreDetailCard />
        {ClosingData && ClosingData.length > 0 && (
          <FlatList
            extraData={datas}
            ListFooterComponent={
              <View style={styles.StornameView}>
                <View style={styles.remarkView}>
                  <Text style={styles.StorenameTexttwo}>
                    Number of people approaching
                  </Text>
                </View>
                <View style={[styles.TextinputView, { height: 40 }]}>
                  <TextInput
                    editable={isEnable}
                    placeholder="0000"
                    style={[styles.Textinput, { padding: 10 }]}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.lightGray}
                    multiline={true}
                    onChangeText={(text) => setApproch(text)}
                  />
                </View>
                <View style={styles.remarkView}>
                  <Text style={styles.StorenameTexttwo}>Remark </Text>
                </View>
                <View style={styles.TextinputView}>
                  <TextInput
                    editable={isEnable}
                    placeholder="Remark Update"
                    style={styles.Textinput}
                    placeholderTextColor={COLORS.black}
                    multiline={true}
                    onChangeText={(text) => setNote(text)}
                  />
                </View>
                {isEnable ? (
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      // style={styles.butttontouch}
                      style={styles.button}
                      disabled={isLoadingss}
                      // style={styles.butttontouch}
                      // onPress={() => CreatClosingStockDataHandle()}
                      onPress={() => checkFilledData()}
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
                ) : (
                  <View
                    style={{
                      marginVertical: 25,
                    }}
                  />
                )}
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 450 }}
            ListEmptyComponent={
              <View style={styles.NoDataView}>
                <Text style={styles.NoDataText}>No data!!!</Text>
              </View>
            }
            numColumns={1}
            scrollEnabled={true}
            data={data}
            renderItem={({ item, index }) => {
              let mainIndex = index;
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
                              source={{ uri: item?.image }}
                              style={styles.imagStyle}
                            />
                          </View>
                          <Text style={styles.titleText}>
                            {item?.category_name}
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
                            <Text style={styles.headerTextone}>
                              TOTAL STOCK
                            </Text>
                          </View>
                          <View style={styles.headerViewtwo}>
                            <Text
                              style={[
                                styles.headerTextone,
                                { marginRight: 15 },
                              ]}
                            >
                              CLOSING STOCK
                            </Text>
                          </View>
                        </View>

                        <View style={styles.mapView}>
                          {item?.sku.map((element, index) => {
                            let itemIndex = index;
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
                                        {Number(element.open_inventory) +
                                          Number(element.new_stock)}
                                      </Text>
                                    </ScrollView>
                                  </View>
                                  <View style={styles.TextinputTW}>
                                    {!isEnable ? (
                                      <TextInput
                                        style={styles.dataTextinput}
                                        editable={false}
                                        placeholder={element.closing_stock.toString()}
                                        placeholderTextColor={COLORS.black}
                                      />
                                    ) : (
                                      <TextInput
                                        editable={
                                          Number(element.open_inventory) +
                                            Number(element.new_stock) ==
                                          0
                                            ? false
                                            : true
                                        }
                                        style={styles.dataTextinput}
                                        placeholder={element.closing_stock.toString()}
                                        placeholderTextColor={COLORS.gray}
                                        keyboardType="numeric"
                                        returnKeyType={"done"}
                                        value={
                                          skid == element.sku_id
                                            ? valueSKU.toString()
                                            : element.closing_stock
                                        } // Use the valueSKU state here
                                        onEndEditing={() => {
                                          skid == element.sku_id
                                            ? (onValueChange(
                                                valueSKU,
                                                itemIndex,
                                                element.sku_id,
                                                mainIndex
                                              ),
                                              // setValueSKU(0);
                                              handleInputChange(valueSKU))
                                            : (onValueChange(
                                                element.closing_stock,
                                                itemIndex,
                                                element.sku_id,
                                                mainIndex
                                              ),
                                              // setValueSKU(0);
                                              handleInputChange(valueSKU));
                                        }}
                                        // value={item.value}
                                        // onEndEditing={(text) => {
                                        //   console.log(
                                        //     "onEndText",
                                        //     text,
                                        //     valueSKU,
                                        //     element.open_inventory,
                                        //     element.new_stock
                                        //   );
                                        //   onValueChange(
                                        //     valueSKU,
                                        //     itemIndex,
                                        //     element.sku_id,
                                        //     mainIndex,
                                        //     "onEnd"
                                        //   );
                                        //   setValueSKU(0);
                                        // }}
                                        onChangeText={(text) => {
                                          const limit =
                                            Number(element.open_inventory) +
                                            Number(element.new_stock);

                                          if (
                                            text === "" ||
                                            (text !== "" &&
                                              /^\d+$/.test(text) &&
                                              Number(text) <= limit)
                                          ) {
                                            setSkid(element.sku_id);
                                            setValue(element.value);
                                            setValueSKU(text);
                                          } else {
                                            Alert.alert(
                                              "Invalid Input",
                                              "Please enter a valid integer that is less than or equal to the limit."
                                            );
                                            setValueSKU(0);
                                          }
                                        }}
                                      />
                                    )}
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
        {ClosingData && ClosingData.length == 0 ? (
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
export default ClosingStockScreen;
