import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./OssButtonStyle";
import { COLORS } from "../../colors/colors";

const OssButton = (props) => {
  const [answer, setAnswer] = useState("");
  const [yesButtonColor, setYesButtonColor] = useState(
    props.isYes == "1" ? "red" : "#c0c0c0"
  );
  const [noButtonColor, setNoButtonColor] = useState(
    props.isYes == "0" ? "#50C878" : "#c0c0c0"
  );

  const handleYes = () => {
    setYesButtonColor("red");
    setNoButtonColor("#c0c0c0");
    if (props.onYesClick) {
      props.onYesClick("1");
    }
  };

  const handleNo = () => {
    setYesButtonColor("#c0c0c0");
    setNoButtonColor("#50C878");
    if (props.onNoClick) {
      props.onNoClick("0");
    }
  };

  return (
    <View style={styles.mainviewtwo}>
      <TouchableOpacity
        style={[styles.buttonyes, { backgroundColor: yesButtonColor }]}
        onPress={handleYes}
      >
        <Text style={styles.textbutton}>OOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: noButtonColor }]}
        onPress={handleNo}
      >
        <Text style={styles.textbutton}>Available</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OssButton;
