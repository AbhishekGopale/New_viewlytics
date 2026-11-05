import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./SalarySlipStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { SalarySlipAction } from "../../redux/actions/salarySlipAction";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import ToastMessage from "../../components/ToastMessages/ToastMessages";

const SalarySlip = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let eId = props && props?.route?.params?.item?.id.toString();
  let eType = props && props?.route?.params?.item?.type;
  let eFromDate = props && props?.route?.params?.item?.From;
  let eToDate = props && props?.route?.params?.item?.To;
  let eReasonForLeave = props && props?.route?.params?.item?.reasonForLeave;
  let eStatus = props && props?.route?.params?.item?.status;
  let isFromCreate = props && props?.route?.params?.isCreateLeave;
  let headerTitle = props && props?.route?.params?.header;
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  useEffect(() => {
    const currentDate = new Date();

    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear().toString();
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);
  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const handleCurrentMonthCurrentYear = (selectedYear) => {
    if (selectedYear == currentYear) {
      let currentYearMonths = [];
      for (let i = 0; i < currentMonth; i++) {
        currentYearMonths.push(months[i]);
      }
      setMonthFromData(currentYearMonths);
    } else {
      setMonthFromData(months);
    }
  };

  const [date, setDate] = useState(new Date());
  const [dateData, setDateData] = useState(
    eFromDate?.length > 0 ? eFromDate : ""
  );
  const [todate, setToDate] = useState(new Date());
  const [todateData, setToDateData] = useState(
    eToDate?.length > 0 ? eToDate : ""
  );
  const [openDate, setOpenDate] = useState(false);
  const [openToDate, setToOpenDate] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [value, setValue] = useState(eType?.length > 0 ? eType : "");
  const [valueFrom, setValueFrom] = useState("");
  const [valueTo, setValueTo] = useState("");
  const [items, setItems] = useState([
    { label: "Privilege Leave", value: "Privilege Leave" },
    { label: "Sick Leave", value: "Sick Leave" },
    { label: "Casual Leave", value: "Casual Leave" },
    { label: "Compensatory Leave", value: "Compensatory Leave" },
    { label: "Other Leave", value: "Other Leave" },
  ]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearData, setYearData] = useState([]);
  const [monthFromData, setMonthFromData] = useState([]);
  const [monthToData, setMonthToData] = useState([]);
  const [empID, setEmpID] = useState(eId?.length > 0 ? eId : "");
  const [leaveReason, setLeaveReason] = useState(
    eReasonForLeave?.length > 0 ? eReasonForLeave : ""
  );
  const [leaveStatus, setLeaveStatus] = useState(
    eStatus?.length > 0 ? eStatus : ""
  );
  const [year, SetYear] = useState("");
  const [month, setToMonth] = useState("");

  const [token, setToken] = useState("");
  const [monthArray, setMonthArray] = useState([]);

  const salarySlipHandle = () => {
    monthArray.push(parseInt(valueFrom), parseInt(month));
    dispatch(
      SalarySlipAction(parseInt(empID), year, monthArray, token, navigation)
    );
    setMonthArray([]);
  };

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpID(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
    getToken();
  }, []);

  const ToastMessageError = useSelector((state) => state?.SalarySlip?.error);

  const ToastMessageSuccess = useSelector(
    (state) => state?.SalarySlip?.message
  );
  const isLoading = useSelector((state) => state?.SalarySlip?.isLoading);
  let arr = [];
  const fromValue = (val) => {
    setValueFrom(val);
    let selectedValue = val;

    months.forEach((element) => {
      if (parseInt(element.value) > parseInt(val)) {
        arr.push(element);
      }
    });
    setMonthToData(arr);
  };

  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      (ddChars[1] ? dd : "0" + ddChars[0]) +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      yyyy
    );
  }

  const getPreviousYearArray = () => {
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    }
    var yearArray = range(selectedYear - 10, selectedYear);
    let previousYearData = [];
    yearArray.forEach((element) => {
      previousYearData.push({
        label: element.toString(),
        value: element.toString(),
      });
    });
    setYearData(previousYearData);
  };

  useEffect(() => {
    getPreviousYearArray();
  }, []);

  return (
    <View style={styles.mainView}>
      <Header
        iconStyle={styles.headerIcon}
        image={Images.back}
        header={"Salary Slip"}
        onPress={() => navigation.goBack()}
      />

      {ToastMessageSuccess ? (
        <ToastMessage
          msg={ToastMessageSuccess}
          isVisible={ToastMessageSuccess}
          isError={ToastMessageSuccess}
        />
      ) : null}
      {ToastMessageError ? (
        <ToastMessage
          msg={ToastMessageError}
          isVisible={ToastMessageError}
          isError={ToastMessageError}
        />
      ) : null}

      <ScrollView
        style={[
          styles.mainView,
          {
            padding: 15,
          },
        ]}
      >
        <KeyboardAvoidingView
          {...(Platform.OS === "ios"
            ? {
                behavior: "position",
                keyboardVerticalOffset: [200],
              }
            : {})}
        >
          <View style={styles.employeeIdMainView}>
            <View style={styles.idView}>
              <Text
                style={[
                  styles.idText,
                  {
                    marginRight: 15,
                  },
                ]}
              >
                Employee ID
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                style={styles.idTextInput}
                onChangeText={(text) => setEmpID(text)}
                defaultValue={empID}
              />
            </View>
            <View style={styles.horizontalLine} />
            <View style={{ zIndex: 999 }}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.gray,
                  position: "relative",
                  top: 0,
                }}
                open={open}
                value={value}
                items={yearData}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setYearData}
                onChangeValue={(val) => {
                  SetYear(val), handleCurrentMonthCurrentYear(val);
                }}
                style={{
                  borderColor: COLORS.white,
                  padding: 0,
                  top: 10,
                }}
                placeholder="Select Your Year"
                placeholderStyle={[
                  styles.idText,
                  {
                    right: 10,
                  },
                ]}
                textStyle={[
                  styles.idTextInput,
                  {
                    marginLeft: 0,
                    right: 10,
                  },
                ]}
              />
            </View>

            <View
              style={{
                zIndex: 0,
              }}
            >
              <View style={[styles.horizontalLine]} />
              <DropDownPicker
                disabled={year ? false : true}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.gray,
                  position: "relative",
                  top: 0,
                }}
                open={openFrom}
                value={valueFrom}
                items={monthFromData}
                setOpen={setOpenFrom}
                setValue={setValueFrom}
                setItems={setMonthFromData}
                onChangeValue={(val) => {
                  fromValue(val);
                }}
                style={{
                  borderColor: COLORS.white,
                  padding: 0,
                  top: 10,
                }}
                placeholder="From"
                placeholderStyle={[
                  styles.idText,
                  {
                    right: 10,
                  },
                ]}
                textStyle={[
                  styles.idTextInput,
                  {
                    marginLeft: 0,
                    right: 10,
                  },
                ]}
              />

              <View style={[styles.horizontalLine]} />

              <DropDownPicker
                disabled={valueFrom ? false : true}
                listMode="SCROLLVIEW"
                scrollViewProps={{
                  nestedScrollEnabled: true,
                }}
                dropDownContainerStyle={{
                  borderColor: COLORS.gray,
                  position: "relative",
                  top: 0,
                }}
                open={openTo}
                value={valueTo}
                items={monthToData}
                setOpen={setOpenTo}
                setValue={setValueTo}
                setItems={setMonthToData}
                onChangeValue={(val) => {
                  setToMonth(val);
                }}
                style={{
                  borderColor: COLORS.white,
                  padding: 0,
                  top: 10,
                }}
                placeholder="To"
                placeholderStyle={[
                  styles.idText,
                  {
                    right: 10,
                  },
                ]}
                textStyle={[
                  styles.idTextInput,
                  {
                    marginLeft: 0,
                    right: 10,
                  },
                ]}
              />
              <View style={[styles.horizontalLine]} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonView}>
        <View />
        <TouchableOpacity
          disabled={
            year.length > 0 && valueFrom.length > 0 && month.length > 0
              ? false
              : true
          }
          style={
            year.length > 0 && valueFrom.length > 0 && month.length > 0
              ? styles.button
              : styles.grayButton
          }
          onPress={() => {
            salarySlipHandle();
          }}
        >
          {isLoading ? (
            <ActivityIndicator
              color={COLORS.white}
              style={[styles.buttonText]}
            />
          ) : (
            <Text style={styles.buttonText}>submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SalarySlip;
