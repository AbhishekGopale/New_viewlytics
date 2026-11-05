import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "./TextInputCustomStyle";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";

const TextInputCustom = (props) => {
  const [isPass, setIsPass] = useState(false);
  const isSecure = () => {
    setIsPass(!isPass);
  };
  return (
    <View>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.subView}>
        <Image
          source={props.image}
          style={[
            props.imageStyle,
            {
              alignSelf: "center",
            },
          ]}
        />
        <TextInput
          onChangeText={(text) => {
            props.onChangeText(text);
          }}
          secureTextEntry={props.password ? !isPass : false}
          style={styles.textInput}
          placeholder={props.placeholder ? props.placeholder : ""}
          placeholderTextColor={COLORS.white}
        />
        <View>
          {props.password ? (
            <TouchableOpacity
              onPress={() => {
                isSecure();
              }}
            >
              {isPass ? (
                <Image source={Images.eyecross} style={styles.eye} />
              ) : (
                <Image source={Images.eye} style={styles.eye} />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.horizontalLine} />
      <View />
    </View>
  );
};

export default TextInputCustom;
