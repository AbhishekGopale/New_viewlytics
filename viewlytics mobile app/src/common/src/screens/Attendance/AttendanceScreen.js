import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Header from "../../components/Header/Header";
import { Images } from "../../assets/images/map";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AttendanceScreenStyle";
import { AttendanceListAction } from "../../redux/actions/attendanceListAction";
import { DB } from "../../database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Attendance = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [token, setToken] = useState("");
  const [empId, setEmpId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [modalVisible, setModalVisible] = useState(false);

  const listAttendanceleaves = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.leaves
  );
  const listAttendancePresnt = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.present
  );
  const listAttendanceWeekoff = useSelector(
    (state) => state?.attendanceListReducer?.AttendanceData?.w_off
  );

  const calendarData = {};
  if (listAttendanceWeekoff && typeof listAttendanceWeekoff === "object") {
    Object.assign(calendarData, listAttendanceWeekoff);
  }
  if (listAttendanceleaves && typeof listAttendanceleaves === "object") {
    Object.assign(calendarData, listAttendanceleaves);
  }
  if (listAttendancePresnt && typeof listAttendancePresnt === "object") {
    Object.assign(calendarData, listAttendancePresnt);
  }

  const isDateIn = (dataset, dateStr) => {
    if (!dataset) return false;
    if (Array.isArray(dataset)) return dataset.includes(dateStr);
    if (typeof dataset === "object") {
      if (dataset[dateStr]) return true;
      const unpadded = dateStr.replace(/-0(\d)$/, "-$1");
      if (dataset[unpadded]) return true;
    }
    return false;
  };

  const getDateCategory = (dateStr, marking) => {
    if (
      isDateIn(listAttendancePresnt, dateStr) ||
      marking?.dotColor === "green" ||
      marking?.color === "green"
    ) {
      return "present";
    }
    if (
      isDateIn(listAttendanceleaves, dateStr) ||
      marking?.dotColor === "red" ||
      marking?.color === "red"
    ) {
      return "absent";
    }
    if (
      isDateIn(listAttendanceWeekoff, dateStr) ||
      marking?.dotColor === "blue" ||
      marking?.color === "blue"
    ) {
      return "weekOff";
    }
    return "default";
  };

  const getToken = async (selectedYear, selectedMonth) => {
    try {
      const data = await AsyncStorage.getItem(DB.TOKEN);
      if (data) {
        setToken(data);
        dispatch(AttendanceListAction(data, selectedYear, selectedMonth));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem(DB.USERID);
      if (data) {
        setEmpId(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    getToken(currentYear, currentMonth);
  }, []);

  const handleMonthChange = (month) => {
    const formattedMonth = month.month.toString().padStart(2, "0");
    const formattedYear = month.year.toString();
    getToken(formattedYear, formattedMonth);
  };

  const handleDatePress = (date, category) => {
    const dateStr = date.dateString;
    setSelectedDate(dateStr);
    setSelectedCategory(category);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header
        header={"Attendance"}
        iconStyle={styles.headerIcon}
        image={Images.back}
        onPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Calendar Card */}
        <View style={styles.calendarWrapper}>
          <Calendar
            key={`cal-${Object.keys(calendarData).length}`}
            markedDates={calendarData}
            onMonthChange={handleMonthChange}
            theme={{
              todayTextColor: "#007BFF",
              arrowColor: "#007BFF",
              monthTextColor: "#212121",
              textMonthFontWeight: "bold",
              textSectionTitleColor: "#757575",
            }}
            dayComponent={({ date, state, marking }) => {
              const dateStr = date.dateString;
              const category = getDateCategory(dateStr, marking);
              const isSelected = selectedDate === dateStr;

              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleDatePress(date, category)}
                  style={[
                    styles.dayTile,
                    category === "present" && styles.presentTile,
                    category === "absent" && styles.absentTile,
                    category === "weekOff" && styles.weekOffTile,
                    isSelected && styles.selectedBorder,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumberText,
                      category !== "default" && styles.coloredDayText,
                      state === "disabled" && styles.disabledDayText,
                    ]}
                  >
                    {date.day}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Legend Box */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, styles.presentTile]} />
            <Text style={styles.legendText}>Present</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, styles.absentTile]} />
            <Text style={styles.legendText}>Absent</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColorBox, styles.weekOffTile]} />
            <Text style={styles.legendText}>Week Off</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: "#E0E0E0", borderWidth: 1, borderColor: "#BDBDBD" },
              ]}
            />
            <Text style={styles.legendText}>No Check-In</Text>
          </View>
        </View>
      </ScrollView>

      {/* Date Details Popup Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalCard}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalHeaderTitle}>Attendance Details</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDateText}>
              {selectedDate
                ? moment(selectedDate).format("dddd, DD MMMM YYYY")
                : ""}
            </Text>

            <View
              style={[
                styles.modalStatusBadge,
                selectedCategory === "present"
                  ? styles.badgePresent
                  : selectedCategory === "absent"
                  ? styles.badgeAbsent
                  : selectedCategory === "weekOff"
                  ? styles.badgeWeekOff
                  : styles.badgeDefault,
              ]}
            >
              <Text style={styles.modalStatusText}>
                {selectedCategory === "present"
                  ? "PRESENT"
                  : selectedCategory === "absent"
                  ? "ABSENT / LEAVE"
                  : selectedCategory === "weekOff"
                  ? "WEEK OFF"
                  : "NO CHECK-IN"}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-In Status</Text>
              <Text style={styles.detailValue}>
                {selectedCategory === "present"
                  ? "Marked / Checked In"
                  : selectedCategory === "weekOff"
                  ? "Week Off"
                  : "Not Marked"}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check-Out Status</Text>
              <Text style={styles.detailValue}>
                {selectedCategory === "present"
                  ? "Completed"
                  : selectedCategory === "weekOff"
                  ? "Week Off"
                  : "Not Marked"}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalOkBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalOkBtnText}>OK</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Attendance;
