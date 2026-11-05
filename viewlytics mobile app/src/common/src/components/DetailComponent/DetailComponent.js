import { View, Text } from "react-native";
import React from "react";
import { styles } from "./DetailComponentStyle";

const DetailComponent = (props) => {
  return (
    <View style={styles.cardStyle}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{props.value}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default DetailComponent;
