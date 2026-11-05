import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../CompetitionBrand/CompetitionBrandStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import YesNo from "../CompetitionBrand/YesNoButton";
import { COLORS } from "../../colors/colors";
import { StoreDetails } from "../../redux/actions/storeDetailsAction";
import { FontsFamily } from "../../assets/fonts/fonts";
import DropDownPicker from "react-native-dropdown-picker";
import PersonButton from "../CompetitionBrand/PersonButton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { competitionBrandListAction } from "../../redux/actions/competitionBrandListAction";
import { CreateCompetitionDataAction } from "../../redux/actions/compititionDataAction";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CompetitionBrandOffline = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState("");
  const [isYes, setIsYes] = useState("");
  const [isPerson, setIsPerson] = useState("");
  const [isVisibility, setIsVisibility] = useState("");
  const [isPayOut, setIsPayOut] = useState("");
  const [brandName, setBrandName] = useState("");

  console.log({ brandName });
  console.log({ isPayOut });
  console.log({ isVisibility });
  console.log({ isPerson });
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  console.log({ storeId });
  const [meetingdata, setMeetingdata] = useState([]);
  const [valueMeeting, setValueMeeting] = useState("");
  const [competitionData, setCompetitionData] = useState("");
  console.log(competitionData, "competitionData=======------");
  console.log(valueMeeting, "valueMeeting");
  const [openMeeting, setOpenMeeting] = useState(false);
  const PaidAssest = [
    { label: "Paid Asset", value: "Paid Asset" },
    { label: "UnPaid Asset", value: "UnPaid Asset" },
    { label: "N/A", value: "N/A" },
  ];
  console.log({ isYes });

  const handleYesClick = (value) => {
    setIsYes(value);
  };
  const handleNoClick = (value) => {
    setIsYes(value);
  };
  const handleNoPersonClick = (value) => {
    setIsPerson(value);
  };
  const handleYesPersonClick = (value) => {
    setIsPerson(value);
  };
  const handleYesVisibilityClick = (value) => {
    setIsVisibility(value);
  };
  const handleNoVisibilityClick = (value) => {
    setIsVisibility(value);
  };
  const handleYesPayOutClick = (value) => {
    setIsPayOut(value);
  };
  const handleNoPayOutClick = (value) => {
    setIsPayOut(value);
  };
  const competitionBrand = async () => {
    AsyncStorage.getItem(DB.COMPETITION_BRAND_LIST)
      .then((data) => {
        let newData = JSON.parse(data);
        setCompetitionData(newData);
        console.log(data, "setDropDownData====-------");
      })
      .catch((e) => {});
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
      .catch((e) => {});
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        getStoreId(data);
        getStoredetails();
        competitionBrand();
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getToken();
  }, []);
  const isLoadings = useSelector(
    (state) => state?.storeDetailsReducer?.isLoading
  );
  const storeDetails = useSelector(
    (state) => state?.storeDetailsReducer?.storeDetails
  );
  const storename = storeDetails?.store_name;
  let DropDownData = useSelector(
    (state) => state?.competitionBrandReducer?.allbrand?.data
  );
  console.log(DropDownData, "DropDownData----======");
  const isLoading = useSelector(
    (state) => state?.compititionDataReducer?.isLoading
  );
  const StoreDetailCard = () => {
    return isLoadings ? (
      <View style={{ marginTop: 25 }}>
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
                  source={{ uri: storeData?.Image }}
                  style={styles.ShopImg}
                />
              </View>
              <View style={styles.StoreView}>
                <View>
                  <Text style={[styles.StorenameTexttwo]}>
                    {storeData?.store_name}
                  </Text>
                  <Text style={styles.LocationText}>
                    Store Code :{storeData?.store_code}
                  </Text>
                </View>
                <Text style={styles.LocationText}>
                  Zone :{storeData?.zone_name}
                </Text>
                <Text style={styles.TlText}>TL Name : {storeData?.tl}</Text>
              </View>
            </View>
            <View style={styles.addresstext}>
              <View style={styles.addView}>
                <Text style={styles.AddText}>Address : </Text>
              </View>
              <View style={styles.AdressView}>
                <Text style={styles.AddTexttwo}>{storeData?.location}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.COMPETITION_BRAND_NAME,
        JSON.stringify(brandName)
      );
      AsyncStorage.setItem(
        DB.COMPETITION_BRAND_AVAILABLE,
        JSON.stringify(isYes)
      );
      AsyncStorage.setItem(
        DB.COMPETITION_BRAND_DROPDOWN,
        JSON.stringify(valueMeeting)
      );
      AsyncStorage.setItem(
        DB.COMPETITION_BRAND_PAYOUT,
        JSON.stringify(isPayOut)
      );
      AsyncStorage.setItem(
        DB.COMPETITION_BRAND_PERSON,
        JSON.stringify(isPerson)
      );

      AsyncStorage.setItem(
        DB.COMPETITION_BRAND_VISIBILITY,
        JSON.stringify(isVisibility)
      );

      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "CompetitionBrand data submitted successfully!",
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

  // const CompetionBrandDataCreate = () => {
  //   dispatch(
  //     CreateCompetitionDataAction(
  //       storeId,
  //       token,
  //       isYes,
  //       valueMeeting,
  //       isVisibility,
  //       isPerson,
  //       isPayOut,
  //       brandName,
  //       navigation
  //     )
  //   );
  // };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Header
        header={"Competition Brand Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <StoreDetailCard />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, width: "95%", alignSelf: "center" }}>
          <View>
            <Text
              style={{
                fontFamily: FontsFamily.Bold,
                color: COLORS.black,
                paddingVertical: 10,
                fontWeight: "900",
              }}
            >
              Competition Brand Available?
            </Text>

            <YesNo
              isYes={isYes}
              onYesClick={() => handleNoClick("0")}
              onNoClick={() => handleYesClick("1")}
            />
          </View>

          {isYes === "0" ? (
            <View>
              <View style={{ paddingVertical: 20 }}>
                {competitionData && competitionData.length > 0 && (
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollViewProps={{ nestedScrollEnabled: true }}
                    dropDownContainerStyle={{
                      borderColor: COLORS.lightGray,
                      position: "relative",
                      top: 0,
                    }}
                    open={openMeeting}
                    value={valueMeeting}
                    items={competitionData}
                    setOpen={setOpenMeeting}
                    setValue={setValueMeeting}
                    setItems={setMeetingdata}
                    style={{
                      borderColor: COLORS.lightGray,
                      padding: 0,
                      top: 10,
                      width: "100%",
                      alignSelf: "center",
                    }}
                    placeholder="Competition Brand Name"
                    placeholderStyle={[styles.idText, { right: 0 }]}
                    textStyle={[
                      styles.idTextInput,
                      { marginLeft: 0, right: 0 },
                    ]}
                  />
                )}
              </View>
              {valueMeeting == "0" ? (
                <View style={styles.TextView}>
                  <TextInput
                    multiline
                    placeholder="Write Compation Brand Name..."
                    placeholderTextColor={COLORS.gray}
                    style={styles.Textinput}
                    onChangeText={(brand) => setBrandName(brand)}
                  />
                </View>
              ) : null}

              <View>
                <Text
                  style={{
                    fontFamily: FontsFamily.Bold,
                    color: COLORS.black,
                    paddingTop: 10,
                    fontWeight: "900",
                    fontSize: 18,
                  }}
                >
                  Competition Brand Person?
                </Text>

                <YesNo
                  isYes={isPerson}
                  onYesClick={() => handleNoPersonClick("0")}
                  onNoClick={() => handleYesPersonClick("1")}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FontsFamily.Bold,
                    color: COLORS.black,
                    paddingTop: 10,
                    fontWeight: "900",
                    fontSize: 18,
                  }}
                >
                  Competition Brand Visibility?
                </Text>

                <YesNo
                  isYes={isVisibility}
                  onYesClick={() => handleNoVisibilityClick("0")}
                  onNoClick={() => handleYesVisibilityClick("1")}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: FontsFamily.Bold,
                    color: COLORS.black,
                    paddingTop: 10,
                    fontWeight: "900",
                    fontSize: 18,
                  }}
                >
                  Pay Out
                </Text>

                <PersonButton
                  isYes={isPayOut}
                  onYesClick={() => handleNoPayOutClick("0")}
                  onNoClick={() => handleYesPayOutClick("1")}
                />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 25,
                }}
              >
                <TouchableOpacity
                  style={
                    valueMeeting == "0"
                      ? isYes === "" ||
                        isPayOut === "" ||
                        isPerson === "" ||
                        isVisibility === "" ||
                        valueMeeting === "" ||
                        brandName === ""
                        ? styles.grayButtons
                        : styles.buttons
                      : isYes === "" ||
                        isPayOut === "" ||
                        isPerson === "" ||
                        isVisibility === "" ||
                        valueMeeting === ""
                      ? styles.grayButtons
                      : styles.buttons
                  }
                  disabled={
                    valueMeeting == "0"
                      ? isYes === "" ||
                        isPayOut === "" ||
                        isPerson === "" ||
                        isVisibility === "" ||
                        valueMeeting === "" ||
                        brandName === ""
                        ? true
                        : false
                      : isYes === "" ||
                        isPayOut === "" ||
                        isPerson === "" ||
                        isVisibility === "" ||
                        valueMeeting === ""
                      ? true
                      : false
                  }
                  onPress={() => {
                    // CompetionBrandDataCreate();
                    saveData();
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      color={COLORS.white}
                      style={[styles.butotonText]}
                    />
                  ) : (
                    <Text style={styles.submitText}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : isYes === "1" ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 25,
              }}
            >
              <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                  // CompetionBrandDataCreate();
                  saveData();
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.butotonText]}
                  />
                ) : (
                  <Text style={styles.submitText}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompetitionBrandOffline;
