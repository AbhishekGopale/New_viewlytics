import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./DetailTextInputStyle";
import { Images } from "../../assets/images/map";

const DetailTextInput = (props) => {
  return (
    <View style={styles.cardStyle}>
        <Text style={styles.title}>{props.title}</Text>
      {/* <View style={styles.container}>
    
      <TouchableOpacity style={styles.touchView}>
      <Image source={Images.eye} style={styles.imgStyle}/>
      </TouchableOpacity>
      </View> */}
      <TextInput
   //   secureTextEntry={true}
        onChangeText={(text) => {
          props.onChangeText(text);
        }}
        style={styles.input}
      />
      <View style={styles.line} />
    </View>
  );
};

export default DetailTextInput;
