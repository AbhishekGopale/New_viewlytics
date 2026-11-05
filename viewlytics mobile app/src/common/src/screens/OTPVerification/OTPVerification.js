import { View, Text, Platform, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AuthViewComponent from "../../components/AuthViewComponent/AuthViewComponent";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { styles } from "./OTPVerificationStyle";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";
import { useNavigation } from "@react-navigation/native";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
const OTPVerification = (props) => {
  const navigation = useNavigation();
  let mobile = props?.route.params?.data?.mobile;
  let mainOtp = props?.route.params?.data?.otp_code;
  console.log({ mainOtp }, "=================-------=------");
  const [otp, setOtp] = useState();
  const [otpErr, setOtpErr] = useState(false);
  const otpCheck = () => {
    if (otp !== undefined) {
      if (mainOtp == otp) {
        navigation.navigate("HomeScreen");
      }
    } else {
      if (otpErr) {
        setOtpErr(false);
      } else {
        setOtpErr(true);
      }
    }
  };
  return (
    <>
      {otpErr ? (
        <ToastMessage
          msg={"Please Enter Valid Otp"}
          isVisible={true}
          isError={true}
        />
      ) : null}
      <AuthViewComponent>
        <View style={styles.mainView}>
          <Text style={styles.otpText}>OTP Verification</Text>
          <Text style={styles.otpSubText}>Enter the OTP you received to</Text>
          <Text style={styles.otpNoText}>+91 {mobile}</Text>
        </View>
        <View style={styles.subView}>
          <OTPInputView
            style={styles.inputBox}
            pinCount={6}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            // onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(mainOtp) => {
              setOtp(mainOtp.toString());
            }}
          />
        </View>
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </AuthViewComponent>
      <View style={styles.buttonView}>
        <ButtonCustom
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            otpCheck();
          }}
          name={"Submit"}
        />
      </View>
    </>
  );
};

export default OTPVerification;
