import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, View } from "react-native";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AttendanceScreenStyle";
import { AttendanceListAction } from "../../redux/actions/attendanceListAction";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "../AddStoreScreen/AddstoreScreenStyle";

const Attendance = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [empId, setEmpId] = useState("");

  const getToken = async (selectedYear, selectedMonth) => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(AttendanceListAction(data, selectedYear, selectedMonth));
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
  }, [currentMonthYear]);
  // const calendarData = {
  //   "2023-09-11": {
  //     marked: true,
  //     dotColor: "red",
  //     events: ["Event 245451", "Event 545452"],
  //   },
  //   "2023-05-22": {
  //     marked: true,
  //     dotColor: "green",
  //     events: ["Event 453453", "Event 424324"],
  //   },
  //   "2023-05-03": {
  //     marked: true,
  //     dotColor: "red",
  //     events: ["Event 1323243", "Event 2423423"],
  //   },
  //   "2023-05-20": {
  //     marked: true,
  //     dotColor: "blue",
  //     events: ["Event 13232", "Event 2323232"],
  //   },
  //   "2023-05-25": {
  //     marked: true,
  //     dotColor: "red",
  //     events: ["Event 123323", "Event 223232"],
  //   },
  //   "2023-05-30": {
  //     marked: true,
  //     dotColor: "green",
  //     events: ["Event 122222", "Event 2222222"],
  //   },
  //   "2023-05-18": {
  //     marked: true,
  //     dotColor: "red",
  //     events: ["Event 11111", "Event 2111"],
  //   },
  // };
  const handleDatPress = (date) => {
    setSelectedDate(date.dateString);
    setSelectedDayData(calendarData[date.dateString]);
  };
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const year = selectedDate !== null ? selectedDate.substring(0, 4) : null;
  const month = selectedDate !== null ? selectedDate.substring(5, 7) : null;

  const listAttendanceleaves = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.leaves
  );
  const listAttendancePresnt = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.present
  );
  const listAttendanceWeekoff = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.w_off
  );
  const listAttendance = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData
  );

  const calendarData = {};
  Object.assign(
    calendarData,
    listAttendanceWeekoff,
    listAttendancePresnt,
    listAttendanceleaves
  );

  const weekOffDates = [listAttendanceWeekoff];
  const presentDates = [listAttendancePresnt];
  const absentDates = [listAttendanceleaves];
  const [currentMonthYear, setCurrentMonthYear] = useState(null);

  const handleMonthChange = (month) => {
    const formattedMonthYear = `${month.year}-${month.month
      .toString()
      .padStart(2, "0")}`;
    let date = formattedMonthYear.split("-");
    let selectedYear = date[0];
    let selectedMonth = date[1];
    getToken(selectedYear, selectedMonth);
    setCurrentMonthYear(formattedMonthYear);
  };
  const getDateCategory = (date) => {
    if (weekOffDates.includes(date)) {
      return "weekOff";
    } else if (presentDates.includes(date)) {
      return "present";
    } else if (absentDates.includes(date)) {
      return "absent";
    }
    return "default";
  };
  const customDayComponent = ({ date }) => {
    const category = getDateCategory(date.dateString);
    const dayTextStyle = {
      textAlign: "center",
      color:
        category === "absent"
          ? "red"
          : category === "present"
          ? "green"
          : "black",
    };
    return (
      <View style={{ flex: 1 }}>
        <Text style={dayTextStyle}>{date.day}</Text>
      </View>
    );
  };
  return (
    <View>
      <Header
        header={"Attendance"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />
      <Calendar
        onDayPress={(date) => {
          handleDatPress(date);
        }}
        markedDates={calendarData}
        renderDay={customDayComponent}
        onMonthChange={handleMonthChange}
      />
      <View style={styles.dataView}>
        {selectedDate && (
          <View style={styles.dateView}>
            <Text style={styles.Datetext}>{selectedDate}</Text>
          </View>
        )}
        <View style={styles.datasView}>
          <Text style={styles.tiitleText}>Title</Text>
          {selectedDayData && (
            <View>
              {selectedDayData?.events?.map((event, index) => (
                <View style={{ padding: 5 }}>
                  <Text style={Styles.EventStyle} key={index}>
                    {event}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Attendance;
