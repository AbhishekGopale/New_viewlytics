import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import { Images } from "../../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../colors/colors";
import { DB } from "../../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { FildVisitPostAction } from "../../redux/actions/fildVisitAction";
import Geolocation from "@react-native-community/geolocation";
import { styles } from "../../FildVisitScreen/CreatFildVisitStyle";
// import { ErrorAction } from "../../redux/actions/errorAction";

const SavenqustionOffline = ({ route }) => {
  const { width } = Dimensions.get("screen");

  const [currentLatitude, setcurrentLatitude] = useState("");
  const [currentLongitude, setcurrentLongitude] = useState("");
  Geolocation.getCurrentPosition((data) => {
    setcurrentLatitude(data.coords.latitude);
  });
  Geolocation.getCurrentPosition((data) => {
    setcurrentLongitude(data.coords.longitude);
  });

  const { selectedItem, storeDetails } = route.params;
  let value = selectedItem.value;
  const storename = storeDetails?.store_name;
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreNAme] = useState("");
  const [data, setData] = useState(null);
  console.log(data, "data-------------------");
  const getoldData = async (token) => {
    try {
      const storedDataString = await AsyncStorage.getItem(
        DB.FIELD_VISIT_CREATE_DATA
      );

      if (storedDataString) {
        const arrayobj = JSON.parse(storedDataString);
        console.log("Parsed Data:", arrayobj);
        setData(arrayobj);
      } else {
        console.log("No data found in AsyncStorage");
      }
    } catch (error) {
      console.log("Error:", error);
    }
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
        getoldData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getToken();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const [detils, setDetails] = useState("");
  const [detilss, setDetailss] = useState("");

  const [textwo, setTexttwo] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  var date = moment().format("YYYY-MM-DD");
  const itemId = selectedItem.value;

  const FildVisitDetailsHandle = () => {
    let ArrayImg = [];
    dispatch(
      FildVisitPostAction(
        token,
        value,
        ArrayImg,
        textwo,
        text,
        itemId,
        status,
        detils,
        storeId,
        date,
        navigation,
        currentLatitude,
        currentLongitude,
        storename
      )
    );
  };
  const arrayobj = [
    ...(data || []),
    {
      value: itemId,
      savenselectedOption: selectedOption,
      savendetils: detilss,
      concernedPersonName: detils,
      concernedPersonDesignation: textwo,
      concernedPersonNumber: text,
    },
  ];
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.FIELD_VISIT_CREATE_DATA,
        JSON.stringify(arrayobj)
      );
      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "Field Visit data submitted successfully!",
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
  const isLoading = useSelector((state) => state?.fildVisit?.isLoading);
  const isErrorVisible = useSelector((state) => state?.errorReducer?.isError);
  const isErrorVisibleMsg = useSelector((state) => state?.errorReducer?.msg);
  useEffect(() => {
    console.log("isErrorInEffect", isErrorVisible);
  }, [isErrorVisible]);

  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <>
      <ScrollView
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
        }}
      >
        <Header
          header={"offline"}
          iconStyle={styles.headerIcon}
          image={Images.back}
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            justifyContent: "center",
            //  alignItems: "center",

            backgroundColor: COLORS.white,
          }}
        >
          <View style={styles.qustionView}>
            <Text style={styles.qustionText}>{selectedItem.label}</Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedOption === "Yes" && styles.selectedButton,
              ]}
              onPress={() => {
                handleOptionSelect("Yes");
                setStatus("0");
                setDetails("");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOption === "Yes" && { color: "white" },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                selectedOption === "No" && styles.selectedButton,
              ]}
              onPress={() => {
                handleOptionSelect("No");
                setStatus("1");
                setDetails("");
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedOption === "No" && { color: COLORS.white },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
          {selectedOption === "Yes" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.textStyle}>Name of concerned person</Text>
                <View style={styles.textinputviewTwo}>
                  <TextInput
                    multiline
                    style={styles.textinput}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Name of concerned person"
                    onChangeText={(detils) => setDetails(detils)}
                  />
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.textStyle}>
                  Designation of concerned person
                </Text>
                <View style={styles.textinputviewTwo}>
                  <TextInput
                    multiline
                    style={styles.textinput}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Designation of concerned person"
                    onChangeText={(textwo) => setTexttwo(textwo)}
                  />
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.textStyle}>
                  Contact number of concerned person
                </Text>
                <View style={styles.textinputviewTwo}>
                  <TextInput
                    multiline
                    style={styles.textinput}
                    placeholderTextColor={COLORS.gray}
                    placeholder="Contact number of concerned person"
                    onChangeText={(text) => setText(text)}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={
                  detils == "" || text == "" || textwo == ""
                    ? styles.grayButton
                    : styles.buttonDone
                }
                disabled={
                  detils == "" || text == "" || textwo == "" || isLoading
                    ? true
                    : false
                }
                onPress={() => {
                  saveData();
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.buttonTextss]}
                  />
                ) : (
                  <Text style={[styles.buttonTextss, { color: COLORS.white }]}>
                    Upload
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
          {selectedOption === "No" ? (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={styles.textinputview}>
                <TextInput
                  style={{
                    textAlignVertical: "top",
                    paddingTop: 0,
                    paddingBottom: 0,
                    width: width - 40,
                    height: 60,
                  }}
                  multiline
                  placeholderTextColor={COLORS.gray}
                  placeholder="Note......"
                  onChangeText={(detils) => setDetailss(detils)}
                />
              </View>
              <TouchableOpacity
                style={detilss == "" ? styles.grayButton : styles.buttonDone}
                disabled={detilss == "" || isLoading ? true : false}
                onPress={() => {
                  saveData();
                }}
              >
                {isLoading ? (
                  <ActivityIndicator
                    color={COLORS.white}
                    style={[styles.buttonTextss]}
                  />
                ) : (
                  <Text style={[styles.buttonTextss, { color: COLORS.white }]}>
                    Upload
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <View style={{ height: 50, backgroundColor: COLORS.white }}></View>
    </>
  );
};
export default SavenqustionOffline;
