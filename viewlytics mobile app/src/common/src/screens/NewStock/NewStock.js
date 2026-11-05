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
import { styles } from "./NewStockStyle";
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
import { COLORS } from "../../colors/colors";
import index from "../../Notification/index";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";

const NewStock = () => {
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
        dispatch(NewStockDataAction(token, formattedDate, data, navigation));
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
  const NewstockData = useSelector(
    (state) => state?.newStockListReducer?.NewStockData
  );

  const NewStockFilteredData = useSelector(
    (state) => state?.newStockListReducer?.NewStockFilteredData
  );

  const isFormEnable = useSelector(
    (state) =>
      state?.formDisableReducer?.formDisableData?.forms_status?.newstock_form
  );

  let isEnable = isFormEnable == 1 ? false : true;

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(NewstockData);
    setDataUpdate(NewStockFilteredData);
  }, [NewstockData]);
  const [data, setData] = useState(NewstockData);

  const onPressMenu = (item, index) => {
    let tempArr = NewstockData;
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
  const [valueSKU, setValueSKU] = useState("");
  const [dataUpdate, setDataUpdate] = useState(NewStockFilteredData);
  const handleInputChange = (text) => {
    setInputValue(text);
    if (inputValue !== "") {
      const newObject = {
        sku_id: skid,
        new_inventory: text,
        id: value,
      };
      setDatas([...datas, newObject]);
      setInputValue("");
    }
  };

  const handleArr = (category_id, newValue, sku_id) => {
    // Find the item in the data array with the matching sku_id
    const updatedData = dataUpdate.map((item) => {
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

  const CreatNewStockDataHandle = () => {
    dispatch(
      NewStockCreateDataAction(token, note, dataUpdate, navigation, storeId)
    );
  };

  const onValueChange = (item, skuIndex, value, itemIndex) => {
    let tempArr = NewstockData;

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
  let maxlangth = 4;

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
        header={"New Stock"}
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
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.flatmainView}>
          <StoreDetailCard />
          {NewstockData && NewstockData.length > 0 && (
            <FlatList
              extraData={datas}
              ListFooterComponent={
                <View style={styles.StornameView}>
                  <View style={styles.remarkView}>
                    <Text style={styles.StorenameTexttwo}>Remark </Text>
                  </View>
                  <View style={styles.TextinputView}>
                    <TextInput
                      editable={isEnable}
                      placeholderTextColor={"black"}
                      placeholder="Remark Update"
                      style={styles.Textinput}
                      multiline={true}
                      onChangeText={(text) => setNote(text)}
                    />
                  </View>
                  {isEnable ? (
                    <View style={styles.buttonView}>
                      <TouchableOpacity
                        style={styles.button}
                        disabled={isLoadingss}
                        onPress={() => CreatNewStockDataHandle()}
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
              ListEmptyComponent={
                <View style={styles.NoDataView}>
                  <Text style={styles.NoDataText}>No data!!!</Text>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 350 }}
              numColumns={1}
              scrollEnabled={true}
              data={data}
              renderItem={({ item, index }) => {
                let itemIndex = index;

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
                            {item?.sku.map((element, skuIndex) => {
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
                                        editable={isEnable}
                                        placeholderTextColor={COLORS.gray}
                                        style={styles.dataTextinput}
                                        placeholder={element?.new_stock.toString()}
                                        keyboardType="numeric"
                                        maxLength={maxlangth}
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
          {NewstockData && NewstockData.length == 0 ? (
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
export default NewStock;
