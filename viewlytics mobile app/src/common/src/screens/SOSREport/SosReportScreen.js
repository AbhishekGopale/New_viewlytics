import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../assets/images/map";
import { styles } from "./SosReportScreenStyle";
import { MERDATA } from "./Data";
import { COLORS } from "../../colors/colors";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { getStoreId } from "../../utilities/utilities";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { CategoryDataAction } from "../../redux/actions/categoryListAction";
import { SosReportCreateAction } from "../../redux/actions/sosReportCreateAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import ServerScreen from "../ServerScreen/ServerScreen";
import { ErrorAction } from "../../redux/actions/errorAction";

const SosReport = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");

  const getStoreId = async (token) => {
    AsyncStorage.getItem(DB.STORE_ID)
      .then((data) => {
        setStoreId(data);
        dispatch(StoreDetails(token, data));
        dispatch(CategoryDataAction(token, navigation, data));
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
  const AllCategoryList = useSelector(
    (state) => state?.categoryListReducer?.allDetails
  );

  const SosReportError = useSelector(
    (state) => state?.sosReportCreateReducer?.error
  );

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    setData(AllCategoryList);
  }, [AllCategoryList]);

  const [data, setData] = useState(AllCategoryList);
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const A = Number(valueA + valueB);
  const B = valueA / A;

  const C = B ? B * 100 : 0;

  const [bFacing, setBFacing] = useState("");
  const [cFacing, setCFacing] = useState("");
  const onValueChange = (
    item,
    index,
    bVal,
    cVal,
    itemIndex,
    isBFacing,
    bFac,
    cFac
  ) => {
    let tempArr = AllCategoryList;
    // let tempArr = AllCategoryList[itemIndex].sku;
    tempArr.forEach((element) => {
      if (element.id == tempArr[itemIndex].id) {
        if (element.brandFacing === tempArr[itemIndex].brandFacing) {
          element.brandFacing = isBFacing && bFacing !== "" ? bVal : bFac;
        }
        if (
          element.competitionFacing === tempArr[itemIndex].competitionFacing
        ) {
          element.competitionFacing =
            !isBFacing && cFacing !== "" ? cVal : cFac;
        }
        if (bVal !== 0 && cVal !== 0) {
          const A = Number(bVal + cVal);
          const B = bVal / A;
          const C = B ? B * 100 : 0;
          element.sosPercentage = C;
        }
      }
    });
    setData(JSON.parse(JSON.stringify(tempArr)));
  };

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

  const [value, setValue] = useState([]);
  const [datas, setDatas] = useState([]);
  const mainArray = [...value, ...datas];
  const [inputValue, setInputValue] = useState("");
  const [brandValue, setBrandValue] = useState("");

  // const [note, setNote] = useState("");
  const [catID, setCatId] = useState("");
  const handleInputChanges = (text) => {
    setBrandValue(text);
    if (brandValue !== "") {
      const newObject = {
        store_id: storeId,
        category_id: catID,
        brand_facing: text,
      };
      setValue([...value, newObject]);
      setBrandValue("");
    }
  };
  const handleInputChange = (text) => {
    setInputValue(text);
    if (inputValue !== "") {
      const newObject = {
        store_id: storeId,
        category_id: catID,
        compation_facing: text,
        sos_per: C !== NaN ? C : "00",
      };
      setDatas([...datas, newObject]);
      setInputValue("");
    }
  };
  const filteredDatas = value.reduce(
    (accumulator, current) => {
      if (current.category_id !== "") {
        accumulator.idMap[current.category_id] = current;
      }
      return accumulator;
    },
    { idMap: {} }
  );

  const filteredData = datas.reduce(
    (accumulator, current) => {
      if (current.category_id !== "") {
        accumulator.idMap[current.category_id] = current;
      }
      return accumulator;
    },
    { idMap: {} }
  );

  const compation = Object.values(filteredData.idMap);
  const barnd = Object.values(filteredDatas.idMap);
  const mergedArray = [...barnd, ...compation].reduce((acc, item) => {
    const key = `${item.store_id}-${item.category_id}`;

    if (!acc[key]) {
      acc[key] = { store_id: item.store_id, category_id: item.category_id };
    }

    Object.keys(item).forEach((subKey) => {
      if (subKey !== "store_id" && subKey !== "category_id") {
        acc[key][subKey] = item[subKey];
      }
    });

    return acc;
  }, {});

  // Calculate and add new value to the result array
  const result = Object.values(mergedArray).map((item) => {
    if (
      item.brand_facing !== undefined &&
      item.compation_facing !== undefined
    ) {
      const calculatedValue =
        (item.brand_facing + item.compation_facing / item.brand_facing) * 100;
      return { ...item };
    }
    return item;
  });

  const finalArr = [];

  const handleSubmit = () => {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let newObj = {
        store_id: storeId,
        category_id: element?.id,
        brand_facing: element.brandFacing,
        compation_facing: element.competitionFacing,
        sos_per: Math.round(element.sosPercentage),
      };
      finalArr.push(newObj);
    }

    // data?.map((element) => {
    //   let newObj = {
    //     store_id: storeId,
    //     category_id: element?.id,
    //     brand_facing: element.sku[0].brandFacing,
    //     compation_facing: element.sku[0].competitionFacing,
    //     sos_per: element.sku[0].sosPercentage,
    //   };
    //   finalArr.push(...finalArr, newObj);
    // });
  };

  const CreatSosReportHandle = () => {
    handleSubmit();
    dispatch(SosReportCreateAction(token, finalArr, navigation, storeId));
  };
  const isLoadingss = useSelector(
    (state) => state?.sosReportCreateReducer?.isLoading
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
    <View>
      <Header
        header={"SOS Report"}
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
      <View>
        <StoreDetailCard />
        {AllCategoryList && AllCategoryList.length > 0 && (
          <FlatList
            style={{ paddingBottom: 0 }}
            ListFooterComponent={
              <View style={styles.StornameView}>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    disabled={isLoadingss}
                    style={styles.button}
                    // style={styles.butttontouch}
                    onPress={() => CreatSosReportHandle()}
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
              let itemIndex = index;
              return (
                <View style={styles.FlatView}>
                  <View style={styles.textView}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressMenu(item, index);
                        setCatId(item.id);
                        setValueA("");
                        setValueB("");
                        setBFacing("");
                        setCFacing("");
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
                            <Image source={Images.close} style={styles.icon} />
                          ) : (
                            <Image source={Images.Dwon} style={styles.icon} />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>

                    {item.isSelected ? (
                      <View style={styles.DetailTextview}>
                        <View
                          style={[
                            styles.tableMainView,
                            { borderTopLeftRadius: 5 },
                          ]}
                        >
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableTextone}>
                              Brand Facing
                            </Text>
                          </View>
                          <View style={styles.valueView}>
                            <View style={{ height: 50 }}>
                              <TextInput
                                placeholder={item?.brandFacing.toString()}
                                returnKeyType="done"
                                style={styles.tableText}
                                placeholderTextColor={COLORS.gray}
                                // placeholder="00"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                  if (/^\d+$/.test(text) || text === "") {
                                    handleInputChanges(Number(text));
                                    setValueA(Number(text));
                                    setBFacing(Number(text));
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
                                    index,
                                    bFacing == "" ? item.brandFacing : bFacing,
                                    cFacing == ""
                                      ? item.competitionFacing
                                      : cFacing,
                                    itemIndex,
                                    true,
                                    item?.brandFacing,
                                    item?.competitionFacing
                                  );
                                }}
                              />
                            </View>
                          </View>
                        </View>
                        <View style={styles.tableMainView}>
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableTextone}>
                              Competition Facing
                            </Text>
                          </View>
                          <View style={styles.valueView}>
                            <View style={{ height: 50 }}>
                              <TextInput
                                placeholder={item?.competitionFacing.toString()}
                                returnKeyType="done"
                                style={styles.tableText}
                                keyboardType="numeric"
                                // value={item.value}
                                placeholderTextColor={COLORS.gray}
                                onChangeText={(text) => {
                                  if (/^\d+$/.test(text) || text === "") {
                                    handleInputChange(Number(text));
                                    setValueB(Number(text));
                                    setCFacing(Number(text));
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
                                    index,
                                    bFacing == "" ? item.brandFacing : bFacing,
                                    cFacing == ""
                                      ? item.competitionFacing
                                      : cFacing,
                                    itemIndex,
                                    false,
                                    item?.brandFacing,
                                    item?.competitionFacing
                                  );
                                }}
                              />
                            </View>
                            {/* );
                            })} */}
                          </View>
                        </View>
                        <View
                          style={[
                            styles.tableMainView,
                            { borderTopRightRadius: 5 },
                          ]}
                        >
                          <View style={styles.tablesubView}>
                            <Text style={styles.tableTextone}>SOS(%)</Text>
                          </View>
                          <View
                            style={[
                              styles.valueView,
                              { borderBottomRightRadius: 5 },
                            ]}
                          >
                            <View style={styles.PerView}>
                              <Text style={styles.tableText}>
                                {/* {Math.round(C)} */}
                                {Math.round(item?.sosPercentage)}
                              </Text>
                              <Text
                                style={[styles.tableText, { marginLeft: 5 }]}
                              >
                                %
                              </Text>
                            </View>
                            {/* <TextInput
                        style={styles.tableText}
                        placeholder="123..."
                        defaultValue={item.Per}
                        /> */}
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
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

export default SosReport;
