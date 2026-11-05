import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "../../colors/colors";
import { Images } from "../../assets/images/map";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import { styles } from "../MeetingScreen/MeetingStyle";
import Header from "../../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminWorkOffline = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState("");
  const [empId, setEmpId] = useState("");

  const AdminWorkDetailsHandle = () => {
    dispatch(
      AdminWorkAction(
        token,
        valueMeeting,
        value,
        formattedTime,
        formattedendTime,
        durations.toString(),
        text,
        navigation
      )
    );
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

  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };
  const closeModalVisible = () => {
    setModal(false);
  };
  const [selectedTime, setSelectedTime] = useState(new Date());
  const date = new Date(selectedTime);

  const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const seconds = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();

  const formattedTime = hours + ":" + minutes + ":" + seconds;

  console.log(formattedTime, "formattedTime=========");
  console.log(selectedTime, "selectedTime========");
  const [time, setTime] = useState(new Date());
  const datess = new Date(time);

  const hoursss = (datess.getHours() < 10 ? "0" : "") + datess.getHours();
  const minutesss = (datess.getMinutes() < 10 ? "0" : "") + datess.getMinutes();
  const secondsss = (datess.getSeconds() < 10 ? "0" : "") + datess.getSeconds();

  const formattedendTime = hoursss + ":" + minutesss + ":" + secondsss;

  console.log(formattedendTime, "formattedendTime=========----");
  console.log(selectedTime, "selectedTime========");
  const [durations, setDurations] = useState(0);
  const [duration, setDuration] = useState(0);

  const [minute, setMinutes] = useState(0);

  const [error, setError] = useState("");
  const [timess, setTimess] = useState("");
  console.log(timess, "timess----------");
  const calculateTimeDifference = () => {
    if (selectedTime < time) {
      const timeDiffInMillis = time.getTime() - selectedTime.getTime();
      const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiffInMillis / (1000 * 60)) % 60);
      setDuration(hours);
      setMinutes(minutes);
      setDurations(hours, minutes);
      let times = `${hours}:${minutes}`;
      setTimess(times);
      setError("");
    } else {
      setError("To Time Must be Greater Than From Time.!");
      setDuration(0);
      setMinutes(0);
    }
  };
  const handleSubmission = () => {
    const formattedTime = moment(selectedTime).format("HH:mm");
  };
  const handleTime = () => {
    const formattedTime = moment(selectedTime).format("HH:mm");
  };
  const Work = [
    { label: "Expense Report", value: "1" },
    { label: "On Request Report", value: "2" },
    { label: "Monthly PPT", value: "3" },
    { label: "Other", value: "4" },
  ];
  const [meetingdata, setMeetingdata] = useState(Work);
  const [valueMeeting, setValueMeeting] = useState("");
  const [openMeeting, setOpenMeeting] = useState(false);
  const [value, setValue] = useState("");
  const [text, setText] = useState("");

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        DB.ADMINWORK_DROPDOWN,
        JSON.stringify(valueMeeting)
      );
      await AsyncStorage.setItem(
        DB.ADMINWORK_DETALIED_NAME,
        JSON.stringify(value)
      );
      await AsyncStorage.setItem(
        DB.ADMINWORK_TIME_FRIST,
        JSON.stringify(formattedTime)
      );

      await AsyncStorage.setItem(
        DB.ADMINWORK_TIME_SECOND,
        JSON.stringify(formattedendTime)
      );
      await AsyncStorage.setItem(
        DB.ADMINWORK_TIME_DURATION,
        JSON.stringify(timess)
      );
      await AsyncStorage.setItem(
        DB.ADMINWORK_DESCRIPTION_DATA,
        JSON.stringify(text)
      );

      console.log("Data saved successfully!");
      Alert.alert(
        "Success",
        "Admin Work data submitted successfully!",
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
  const closeModalss = () => {
    dispatch(ErrorAction(false, ""));
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        header={"Admin Work Offline"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.mainView} showsVerticalScrollIndicator={false}>
        <View style={styles.PaddingView}>
          <View>
            <Text style={styles.textinputheader}>Types Of Work</Text>
          </View>
          <View style={styles.dropView}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              dropDownContainerStyle={{
                borderColor: COLORS.white,
                position: "relative",
                top: 0,
                width: "100%",
                alignSelf: "center",
                height: 200,
              }}
              open={openMeeting}
              value={valueMeeting}
              items={meetingdata}
              setOpen={setOpenMeeting}
              setValue={setValueMeeting}
              setItems={setMeetingdata}
              style={{
                borderColor: COLORS.white,
                padding: 0,
                top: 10,
                width: "100%",
                alignSelf: "center",
              }}
              placeholder="Choose type"
              placeholderStyle={[
                styles.idText,
                {
                  right: 0,
                },
              ]}
              textStyle={[
                styles.idTextInput,
                {
                  marginLeft: 0,
                  right: 0,
                },
              ]}
            />
          </View>
          <View>
            <Text style={styles.textinputheader}>
              Detailed Name Of the Report
            </Text>
          </View>
          <View style={styles.BGView}>
            <ScrollView style={styles.ScrollView}>
              <TextInput
                multiline
                placeholder="Write something..."
                onChangeText={(value) => setValue(value)}
                placeholderTextColor={COLORS.black}
                style={styles.Textinput}
              />
            </ScrollView>
          </View>
          <View style={styles.maincontainer}>
            <Text style={styles.textinputheader}>Timing of meeting</Text>
            <View style={styles.timingView}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image source={Images.calendar} style={styles.calendar} />
                <Text style={styles.timetext}>From</Text>
                <Text style={{ color: COLORS.black }}>
                  {moment(selectedTime).format("HH:mm:ss")}
                </Text>
              </TouchableOpacity>

              <View style={styles.border} />
              <View style={styles.FromToView}>
                <TouchableOpacity
                  onPress={() => {
                    setModal(true);
                  }}
                  style={styles.TouchStyle}
                >
                  <Image source={Images.calendar} style={styles.calendar} />
                  <Text style={styles.timetext}>To</Text>
                </TouchableOpacity>
                <Text style={{ color: COLORS.black }}>
                  {moment(time).format("HH:mm")}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.HrsView}>
            <Text style={styles.textinputheader}>
              Total Duration of meeting
            </Text>
            <View style={styles.TotalhrsView}>
              {error ? (
                <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>
              ) : (
                <Text style={{ marginLeft: 10, color: COLORS.black }}>
                  {duration}:{minute}:00 Hours
                </Text>
              )}
            </View>
          </View>
          <View style={styles.paddingConatiner}>
            <Text style={styles.textinputheader}>
              What is Done in the balance time?
            </Text>
            <View style={styles.BGView}>
              <ScrollView style={{ width: "100%" }}>
                <TextInput
                  multiline
                  placeholder="Write something..."
                  onChangeText={(text) => setText(text)}
                  placeholderTextColor={COLORS.black}
                  style={styles.Textinput}
                />
              </ScrollView>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
            >
              <TouchableOpacity
                style={styles.ModalBackTouch}
                onPress={() => {
                  closeModal();
                }}
              >
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                      closeModal();
                    }}
                  >
                    <DatePicker
                      mode="time"
                      date={selectedTime}
                      textColor={COLORS.black}
                      onDateChange={setSelectedTime}
                    />
                    <TouchableOpacity
                      style={styles.touchView}
                      onPress={() => {
                        setModalVisible(false), handleSubmission;
                      }}
                    >
                      <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={modal}>
              <TouchableOpacity
                style={styles.ModalBackTouch}
                onPress={() => {
                  closeModalVisible();
                }}
              >
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => {
                      closeModalVisible();
                    }}
                  >
                    <DatePicker
                      mode="time"
                      date={time}
                      onDateChange={setTime}
                      textColor={COLORS.black}
                    />
                    <TouchableOpacity
                      style={styles.touchView}
                      onPress={() => {
                        setModal(false);
                        handleTime;
                        calculateTimeDifference();
                      }}
                    >
                      <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              disabled={
                valueMeeting !== "" &&
                value.length > 0 &&
                time !== 0 &&
                text.length > 0 &&
                time !== 0 &&
                error == ""
                  ? false
                  : true
              }
              style={
                valueMeeting !== "" &&
                value.length > 0 &&
                time !== 0 &&
                text.length > 0 &&
                time !== 0 &&
                error == ""
                  ? styles.button
                  : styles.grayButton
              }
              onPress={() => {
                saveData();
              }}
            >
              <Text style={styles.butotonText}>submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminWorkOffline;
