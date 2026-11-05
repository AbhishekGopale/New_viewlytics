import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Images } from "../../assets/images/map";

const CustomCheckbox = ({ isChecked, onPress, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        // backgroundColor: "red",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
      disabled={disabled}
    >
      {isChecked ? (
        <View>
          <Image
            source={Images.checktrue} // Replace './checkedImage.png' with your checked image path
            style={{ height: 25, width: 25, alignSelf: "center" }}
          />
        </View>
      ) : (
        <View
          style={{
            width: 25,
            height: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 15,
              height: 15,
              borderWidth: 0.5,
              borderColor: "black",
              alignSelf: "center",
            }}
          ></View>
        </View>
        // <Image
        //   source={Images.square} // Replace './uncheckedImage.png' with your unchecked image path
        //   style={{ height: 20, width: 20 }}
        // />
      )}
    </TouchableOpacity>
  );
};
export default CustomCheckbox;
