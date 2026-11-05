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
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { ClosingStockDataAction } from "../../redux/actions/closingStockListAction";
import moment from "moment";
import { ClosingCreateDataAction } from "../../redux/actions/closingStockCreateDataAction";
import { COLORS } from "../../colors/colors";
import { styles } from "../ClosingStockScreen/ClosingStockScreenStyle";
const ClosingStockOffline = () => {
  const currentDate = moment();
  const formattedDate = currentDate.format("YYYY-MM-DD");
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [approch, setApproch] = useState("");
  const [data, setData] = useState();

  const isFormEnable = useSelector(
    (state) =>
      state?.formDisableReducer?.formDisableData?.forms_status?.closing_form
  );

  let isEnable = isFormEnable == 1 ? false : true;
  const [storedata, setStoreData] = useState({});
  const [closingData, setClosingData] = useState([]);
  console.log(closingData, "========--------");
  const extractedSkus = data?.map((item) => item.sku).flat();
  console.log(extractedSkus, "extractedSkus==========-----");

  const getClosingData = async () => {
    if (data) {
      console.log("DataInIF===============================>", data);
    } else {
      console.log("DataInIF===============================>Else");

      AsyncStorage.getItem(DB.OFFLINE_OPENING_INV)
        .then((data) => {
          let newData = JSON.parse(data);
          newData.forEach((element) => {
            console.log("newData==============", element.isSelected);
            element.isSelected = false;
          });
          setClosingData(newData);
          setData(newData);
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
        getStoredetails();
        getClosingData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const isLoading = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
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
  // useEffect(() => {
  //   setData(closingData);
  // }, [closingData]);

  console.log(data, "dataclosing");
  const onPressMenu = (item, index) => {
    let tempArr = data;
    tempArr.forEach((element) => {
      if (element.id === tempArr[index].id) {
        element.isSelected = !tempArr[index].isSelected;
      } else {
        element.isSelected = false;
      }
    });
    console.log("OnPressMenu================>", tempArr);
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
  const [skid, setSkid] = useState("");
  const [datas, setDatas] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [note, setNote] = useState("");
  const [valueSKU, setValueSKU] = useState("");
  const onValueChange = (value, itemIndex, sku_id, mainIndex, calledBy) => {
    let tempArr = data;
    console.log("temporary array==================>", tempArr);
    tempArr.forEach((element) => {
      element.sku.forEach((skuElement, index) => {
        if (skuElement.sku_id === tempArr[mainIndex].sku[itemIndex].sku_id) {
          let mainVal = skuElement.open_inventory + skuElement.new_stock;
          if (parseInt(value) > mainVal) {
            skuElement.closing_stock = 0;
          } else {
            skuElement.closing_stock = value;
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
  console.log(finalResult, "finalResult====");

  const SaveData = async (key, array) => {
    try {
      const jsonValue = JSON.stringify(extractedSkus);

      await AsyncStorage.setItem(DB.OFFLINE_CLOSING_FORM_DATA, jsonValue);
      await AsyncStorage.setItem(
        DB.OFFLINE_CLOSING_STOCK_REMARK,
        JSON.stringify(note)
      );
      await AsyncStorage.setItem(DB.APPROCH_PEOPLE, JSON.stringify(approch));
      console.log("Array saved successfully!");
      Alert.alert(
        "Success",
        "Closing Inventory data submitted successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving array to AsyncStorage: ", error);
    }
  };

  const isLoadingss = useSelector(
    (state) => state?.closingStockCreateDataReducer?.isLoading
  );
  return (
    <View style={styles.maincontainer}>
      <Header
        header={"Closing Inventory Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.flatmainView}>
        <StoreDetailCard />
        {closingData && closingData?.length > 0 && (
          <FlatList
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
                      // style={styles.butttontouch}
                      onPress={() => SaveData()}
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
            contentContainerStyle={{ paddingBottom: 350 }}
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
                          <Text style={styles?.titleText}>
                            {item?.category_name}
                          </Text>
                        </View>
                        <View style={styles.iconView}>
                          {item?.isSelected == true ? (
                            <Image source={Images.close} style={styles.icon} />
                          ) : (
                            <Image source={Images.Dwon} style={styles.icon} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                    {item?.isSelected ? (
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
                            console.log(element, "element===");
                            let itemIndex = index;
                            return (
                              <View>
                                <View style={styles.TableView}>
                                  <View style={styles.eleView}>
                                    <Text style={styles.dataText}>
                                      {element?.label}
                                    </Text>
                                  </View>
                                  <View style={styles.oenView}>
                                    <ScrollView
                                      horizontal={true}
                                      showsHorizontalScrollIndicator={false}
                                    >
                                      <Text style={styles.opnText}>
                                        {(Number(element?.openingStock) || 0) +
                                          (Number(element?.new_stock) || 0)}
                                      </Text>
                                    </ScrollView>
                                  </View>
                                  <View style={styles.TextinputTW}>
                                    {!isEnable ? (
                                      <TextInput
                                        style={styles.dataTextinput}
                                        editable={false}
                                        // placeholder={element.closing_stock.toString()}
                                        placeholderTextColor={COLORS.black}
                                      />
                                    ) : (
                                      <TextInput
                                        editable={
                                          Number(element?.open_inventory) +
                                            Number(element?.new_stock) ==
                                          0
                                            ? false
                                            : true
                                        }
                                        style={styles.dataTextinput}
                                        // placeholder={element.closing_stock.toString()}
                                        placeholderTextColor={COLORS.black}
                                        keyboardType="numeric"
                                        returnKeyType={"done"}
                                        value={
                                          skid == element.sku_id
                                            ? valueSKU.toString()
                                            : element?.closing_stock
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
                                            setSkid(element?.sku_id);
                                            setValue(element?.value);
                                            setValueSKU(text);
                                            console.log(text, "offline text");
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
export default ClosingStockOffline;
