import { View, Text, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import AuthViewComponent from "../../components/AuthViewComponent/AuthViewComponent";
import { styles } from "./ForgotPasswordStyle";
import TextInputCustom from "../../components/TextInputCustom/TextInputCustom";
import { Images } from "../../assets/images/map";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ForgotPasswordAction } from "../../redux/actions/forgotPasswordAction";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
import { FontsFamily } from "../../assets/fonts/fonts";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const REGEX =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const handleForgot = (email, navigation) => {
    let isValid = false;

    if (!email) {
      isValid = false;
      setEmailErr("Please enter e-mail.");
    } else if (!REGEX.test(email)) {
      isValid = false;
      setEmailErr("Please enter valid e-mail.");
    } else {
      isValid = true;
    }
    if (isValid) {
      dispatch(ForgotPasswordAction(email, navigation));
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* {ForgotPasswordMessageSuccess ? (
        <ToastMessage
          msg={ForgotPasswordMessageSuccess}
          isVisible={ForgotPasswordMessageSuccess}
          isError={ForgotPasswordMessageSuccess}
        />
      ) : (
        <ToastMessage
          msg={ForgotPasswordMessageError}
          isVisible={ForgotPasswordMessageError}
          isError={ForgotPasswordMessageError}
        />
      )} */}

      <AuthViewComponent>
        <View style={styles.subView}>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInputCustom
            onChangeText={(value) => {
              setEmail(value), setEmailErr("");
            }}
            image={Images.usericon}
            imageStyle={styles.userStyle}
            name={"Email"}
            password={false}
            placeholder="Please Enter Your Email ID"
          />
          {emailErr !== "" ? (
            <Text
              style={{
                color: "red",
                fontFamily: FontsFamily.NotoSansMedium,
                fontSize: 14,
              }}
            >
              {emailErr}
            </Text>
          ) : null}
          <View style={styles.componentView}></View>
        </View>
      </AuthViewComponent>
      <View style={styles.buttonView}>
        <ButtonCustom
          onPress={() => {
            handleForgot(email, navigation);
          }}
          name={"Submit"}
        />
        <View
          style={{
            margin: 15,
          }}
        />

        <ButtonCustom
          onPress={() => {
            navigation.goBack();
          }}
          name={"Back"}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
