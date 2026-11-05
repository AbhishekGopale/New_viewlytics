import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./HeaderStyle";

const Header = (props) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Image style={props.iconStyle} source={props.image} />
      </TouchableOpacity>
      <Text style={styles.title}>{props.header}</Text>
      {props.isNotification ? (
        <TouchableOpacity onPress={props.onClearPress} style={styles.clearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
