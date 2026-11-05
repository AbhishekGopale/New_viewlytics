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
import { styles } from "./CreateLeavesStyle";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";
import { leavesType } from "../../data/leavesData";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { LeaveCreateAction } from "../../redux/actions/leaveAction";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { MyProfileDetilsAction } from "../../redux/actions/myProfileAction";
import { UpdateLeaveAction } from "../../redux/actions/updateLeaveAction";
const CreateLeaves = (props) => {
  const navigation = useNavigation();
  console.log({ props });
  const dispatch = useDispatch();

  const UpdateLeaveHandle = () => {
    dispatch(
      UpdateLeaveAction(token, value, date, leaveReason, navigation, id)
    );
  };

  const CreateLeaveHandle = () => {
    dispatch(
      LeaveCreateAction(
        token,
        value,
        status,
        date,
        todate,
        leaveReason,
        navigation,
        selectedOption
      )
    );
  };
  const Profilename = useSelector(
    (state) => state?.MyProfile?.myProfileData?.data?.userProfile?.first_name
  );

  const name = useSelector(
    (state) => state?.MyProfile?.myProfileData?.userProfile
  );

  const [empId, setEmpId] = useState("");
  let eId = isFromCreate
    ? empId
    : props && props?.route?.params?.item?.user_id.toString();
  let eLeaveType = props && props?.route?.params?.item?.leave_type;
  let id = props && props?.route?.params?.item?.id;
  let eType =
    eLeaveType == "0"
      ? "Casual Leave"
      : eLeaveType == "1"
      ? "Sick Leave"
      : eLeaveType == "2"
      ? "Compensatory Leave"
      : eLeaveType == "3"
      ? "Other Leave"
      : "";
  let eFromDate = props && props?.route?.params?.item?.from;
  let eToDate = props && props?.route?.params?.item?.to;
  let singleDate = props && props?.route?.params?.item?.date;
  let eReasonForLeave = props && props?.route?.params?.item?.reason;
  let eLeaveStatus = props && props?.route?.params?.item?.leave_status;
  let eLeavereson = props && props?.route?.params?.item?.reason_reject;
  console.log(eLeavereson, "eLeavereson==");
  let eStatus =
    eLeaveStatus == "0"
      ? "Pending"
      : eLeaveStatus == "1"
      ? "Approved"
      : eLeaveStatus == "2"
      ? "Rejected"
      : "";
  let isFromCreate = props && props?.route?.params?.isCreateLeave;
  let headerTitle = props && props?.route?.params?.header;

  const [date, setDate] = useState(
    singleDate ? new Date(singleDate) : new Date()
  );
  console.log({ date });
  const [dateData, setDateData] = useState(
    eFromDate?.length > 0 ? eFromDate : ""
  );
  console.log({ dateData });
  const [todate, setToDate] = useState(new Date());
  console.log({ todate });
  const [todateToday, setToDateToday] = useState(new Date());
  console.log({ todateToday });
  const [todateData, setToDateData] = useState(
    singleDate?.length > 0 ? singleDate : ""
  );
  const [todateDataToday, setToDateDataToday] = useState(
    singleDate?.length > 0 ? singleDate : ""
  );
  console.log({ todateDataToday });

  const [openDate, setOpenDate] = useState(false);
  const [openDateToday, setOpenDateToday] = useState(false);

  const [openToDate, setToOpenDate] = useState(false);
  const [openToDateToday, setToOpenDateToday] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(eType?.length > 0 ? eType : "");
  const [status, setStatus] = useState("");
  console.log({ status });
  const [items, setItems] = useState([
    { label: "Casual Leave", value: "0" },
    { label: "Sick Leave", value: "1" },
    { label: "Compensatory Leave", value: "2" },
    { label: "Other Leave", value: "3" },
  ]);
  const [selectedLeave, setSelectedLeave] = useState("");
  const [empID, setEmpID] = useState(eId?.length > 0 ? eId : "");
  const [leaveReason, setLeaveReason] = useState(
    eReasonForLeave?.length > 0 ? eReasonForLeave : ""
  );
  const [leaveStatus, setLeaveStatus] = useState(
    eStatus?.length > 0 ? eStatus : ""
  );
  const [leaveReasonss, setLeaveReasons] = useState(
    eLeavereson?.length > 0 ? eLeavereson : ""
  );
  console.log("leaveStatus", leaveStatus);
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(MyProfileDetilsAction(data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUser = async () => {
    AsyncStorage.getItem(DB.USERID)
      .then((data) => {
        setEmpId(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser();
    getToken();
  }, []);

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
  const [selectedOption, setSelectedOption] = useState(
    eLeaveStatus == "0" ? "YES" : null
  );
  const handleOptionSelect = (option) => {
    setDateData("");
    console.log("option", option);
    setSelectedOption(option);
  };
  const isLoadings = useSelector(
    (state) => state?.leaveRequstReducer?.isLoading
  );

  return (
    <View style={styles.mainView}>
      <Header
        iconStyle={styles.headerIcon}
        image={Images.back}
        header={headerTitle}
        onPress={() => navigation.goBack()}
      />
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
                Employee Name:-
                {Profilename}
              </Text>
              <TextInput
                placeholderTextColor={COLORS.lightGray}
                style={styles.idTextInput}
                onChangeText={(text) => setEmpID(text)}
                defaultValue={name}
                editable={false}
              />
            </View>
            <View style={styles.horizontalLine} />

            <View style={[styles.idView, { marginTop: 25 }]}>
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
                defaultValue={isFromCreate ? empId : empID}
                editable={false}
              />
            </View>

            <View style={styles.horizontalLine} />
            <View style={{ zIndex: 999 }}>
              <DropDownPicker
                disabled={!isFromCreate}
                open={open}
                value={value}
                items={items}
                defaultValue={value}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{
                  borderColor: COLORS.white,
                  padding: 0,
                  top: 10,
                }}
                placeholder={`Leave type*    ${eType}`}
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
                onChangeValue={(val) => setSelectedLeave(val)}
              />
            </View>

            <View
              style={{
                zIndex: 0,
              }}
            >
              <View style={[styles.horizontalLine]} />
              <View style={{ paddingVertical: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      // marginBottom: 10,
                    }}
                    onPress={() => {
                      setStatus("0");
                      handleOptionSelect("YES");
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor:
                          selectedOption === "YES" ? "green" : "gray",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {selectedOption === "YES" && (
                        <View
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: "green",
                          }}
                        />
                      )}
                    </View>
                    <Text style={{ marginLeft: 10, color: COLORS.black }}>
                      single day
                    </Text>
                  </TouchableOpacity>
                  {eLeaveStatus == "0" ? null : (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 30,
                        // paddingBottom: 10,
                      }}
                      onPress={() => {
                        setStatus("1");
                        handleOptionSelect("NO");
                      }}
                    >
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor:
                            selectedOption === "NO" ? "green" : "gray",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {selectedOption === "NO" && (
                          <View
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: "green",
                            }}
                          />
                        )}
                      </View>
                      <Text style={{ marginLeft: 10, color: COLORS.black }}>
                        Multiple Days
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {selectedOption == "NO" ? (
                <>
                  <TouchableOpacity
                    disabled={!isFromCreate}
                    onPress={() => setOpenDate(true)}
                    style={styles.calendarView}
                  >
                    <Image source={Images.calendar} style={styles.calendar} />
                    <Text style={styles.idText}>From</Text>
                    <Text style={styles.idTextInput}>{dateData}</Text>
                  </TouchableOpacity>
                  <View style={[styles.horizontalLine]} />

                  <TouchableOpacity
                    // disabled={!isFromCreate || dateData == "" ? true : false}
                    onPress={() => setToOpenDate(true)}
                    style={styles.calendarView}
                  >
                    <Image source={Images.calendar} style={styles.calendar} />
                    <Text
                      style={[
                        styles.idText,
                        {
                          width: "15%",
                        },
                      ]}
                    >
                      To
                    </Text>
                    <Text style={styles.idTextInput}>{todateData}</Text>
                  </TouchableOpacity>
                  <View style={[styles.horizontalLine]} />
                </>
              ) : (
                <View></View>
              )}
              <DatePicker
                mode="date"
                modal
                open={openDate}
                date={date}
                minimumDate={new Date()}
                onConfirm={(date) => {
                  setOpenDate(false);
                  setDate(date);
                  setDateData(convertDate(date));
                }}
                onCancel={() => {
                  setOpenDate(false);
                }}
              />
              <DatePicker
                mode="date"
                modal
                open={openToDate}
                date={todateToday}
                onConfirm={(dates) => {
                  setToOpenDate(false);
                  setToDate(dates);
                  setToDateData(convertDate(dates));
                }}
                onCancel={() => {
                  setToOpenDate(false);
                }}
              />
              {selectedOption == "YES" ? (
                <>
                  <TouchableOpacity
                    disabled={!isFromCreate || dateData == "" ? false : true}
                    onPress={() => setOpenDate(true)}
                    style={styles.calendarView}
                  >
                    <Image source={Images.calendar} style={styles.calendar} />
                    <Text
                      style={[
                        styles.idText,
                        {
                          width: "45%",
                        },
                      ]}
                    >
                      Select Date
                    </Text>
                    <Text style={styles.idTextInput}>{dateData}</Text>
                  </TouchableOpacity>
                  <View style={[styles.horizontalLine]} />
                </>
              ) : (
                <View></View>
              )}

              <DatePicker
                mode="date"
                modal
                open={openToDateToday}
                date={todate}
                minimumDate={new Date()}
                onConfirm={(date) => {
                  setOpenDate(false);
                  setDate(date);
                  setDateData(convertDate(date));
                }}
                onCancel={() => {
                  setOpenDate(false);
                }}
              />

              <View
                style={[
                  {
                    marginTop: 20,
                    flexDirection: "column",
                  },
                ]}
              >
                <Text style={[styles.idText, {}]}>Reason for Leave</Text>
                <TextInput
                  editable={isFromCreate}
                  value={leaveReason}
                  onChangeText={(text) => {
                    setLeaveReason(text);
                  }}
                  multiline
                  placeholderTextColor={COLORS.lightGray}
                  style={[
                    styles.idTextInput,
                    {
                      borderWidth: 1,
                      width: "100%",
                      alignSelf: "center",
                      marginLeft: 0,
                      marginTop: 10,
                      height: 120,
                      borderColor: COLORS.black,
                      padding: 15,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
          {leaveStatus ? (
            <View style={styles.leaveStatusView}>
              <Text style={styles.leaveStatusText}>
                *Your leave is {leaveStatus}.{"\n"}
                {leaveReasonss}
              </Text>
            </View>
          ) : null}
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.buttonView}>
        <View />
        {leaveStatus == "Rejected" ? (
          <TouchableOpacity>
            <Image style={styles.info} source={Images.info} />
          </TouchableOpacity>
        ) : leaveStatus == "Pending" ? (
          <TouchableOpacity
            disabled={
              selectedOption == null && leaveReason == "" ? true : false
            }
            style={
              selectedOption == null && leaveReason == ""
                ? styles.grayButton
                : styles.button
            }
            //style={styles.button}
            onPress={() => {
              UpdateLeaveHandle(selectedLeave);
            }}
            // style={styles.button}
          >
            <Text style={styles.buttonText}>
              {leaveStatus == "Pending" ? "update" : "submit"}
            </Text>
          </TouchableOpacity>
        ) : leaveStatus == "Approved" ? null : (
          <TouchableOpacity
            disabled={
              selectedOption == null && leaveReason == "" ? true : false
            }
            style={
              selectedOption == null && leaveReason == ""
                ? styles.grayButton
                : styles.button
            }
            // style={styles.button}
            onPress={() => {
              CreateLeaveHandle(selectedLeave);
            }}
          >
            {isLoadings ? (
              <ActivityIndicator
                color={COLORS.white}
                style={styles.buttonText}
              />
            ) : (
              <Text style={styles.buttonText}>
                {leaveStatus == "Pending" ? "update" : "submit"}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CreateLeaves;
