import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { styles } from "./ButtonCustomStyle";
import { COLORS } from "../../colors/colors";

const ButtonCustom = (props) => {
  useEffect(() => {}, [props.isLoading]);

  return (
    <TouchableOpacity
      //  disabled={props.disabled}
      onPress={props.onPress}
      style={[styles.button, props.buttonStyle]}
    >
      {props.isLoading ? (
        <ActivityIndicator size={"small"} color={COLORS.primary} />
      ) : (
        <Text style={styles.text}>{props.name}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
