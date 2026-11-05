import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../colors/colors";
import { styles } from "../YesNoButtonStyle";

const OpenClose = (props) => {
  const [answer, setAnswer] = useState("");
  const [yesButtonColor, setYesButtonColor] = useState(
    props.isYes == "0" ? "#50C878" : "#c0c0c0"
  );
  const [noButtonColor, setNoButtonColor] = useState(
    props.isYes == "1" ? "#50C878" : "#c0c0c0"
  );

  const handleYes = () => {
    setYesButtonColor("#50C878");
    setNoButtonColor("#c0c0c0");
    if (props.onYesClick) {
      props.onYesClick("0");
    }
  };

  const handleNo = () => {
    setYesButtonColor("#c0c0c0");
    setNoButtonColor("#50C878");
    if (props.onNoClick) {
      props.onNoClick("1");
    }
  };

  return (
    <View style={styles.mainviewtwo}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: noButtonColor }]}
        onPress={handleNo}
      >
        <Text style={styles.textbutton}>Allowed</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonyes, { backgroundColor: yesButtonColor }]}
        onPress={handleYes}
      >
        <Text style={styles.textbutton}>Not Allowed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OpenClose;
