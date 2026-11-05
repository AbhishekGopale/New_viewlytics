import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./AttendanceButoonStyle";

const AttendanceButtons = (props) => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  console.log({ selectedStatus });
  const handleButtonPress = (status, type) => {
    setSelectedButton(status);
    setSelectedStatus(type);
    if (props.onButtonPress) {
      props.onButtonPress(status, type);
    }
  };

  return (
    <View style={styles.mainviewtwo}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              selectedButton === "0" || selectedStatus == "Present"
                ? "#50C878"
                : "#c0c0c0",
          },
        ]}
        onPress={() => handleButtonPress("0", "Present")}
      >
        <Text style={styles.textbutton}>P</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              selectedButton === "1" || selectedStatus == "Leave"
                ? "#50C878"
                : "#c0c0c0",
          },
        ]}
        onPress={() => handleButtonPress("1", "Leave")}
      >
        <Text style={styles.textbutton}>L</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              selectedButton === "2" || selectedStatus == "Holiday"
                ? "#50C878"
                : "#c0c0c0",
          },
        ]}
        onPress={() => handleButtonPress("2", "Holiday")}
      >
        <Text style={styles.textbutton}>H</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              selectedButton === "3" || selectedStatus == "Emergancy"
                ? "#50C878"
                : "#c0c0c0",
          },
        ]}
        onPress={() => handleButtonPress("3", "Emergancy")}
      >
        <Text style={styles.textbutton}>E</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor:
              selectedButton === "4" || selectedStatus == "WeekOff"
                ? "#50C878"
                : "#c0c0c0",
          },
        ]}
        onPress={() => handleButtonPress("4", "WeekOff")}
      >
        <Text style={styles.textbutton}>W</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceButtons;
