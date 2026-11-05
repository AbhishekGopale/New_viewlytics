import { Platform, StyleSheet } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  mainView: {
    padding: 15,
  },
  subView: {
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
  },
  loginText: {
    fontFamily: FontsFamily.Regular,
    color: COLORS.white,
    fontSize: 20,
  },
  verticalLine: {
    height: 50,
    backgroundColor: COLORS.white,
    width: 0.5,
  },
  enable: {
    borderWidth: 1,
    marginTop: 10,
    borderColor: COLORS.white,
  },
  disable: {
    marginTop: 10,
  },
  bottomView: {
    padding: 20,
    marginTop: 25,
  },
  userStyle: {
    height: 14,
    width: 14,
    marginTop: 10,
    tintColor: COLORS.white,
  },
  passwordStyle: {
    height: 20,
    width: 18,
    top: 5,
  },
  passwordView: {
    marginTop: 30,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: COLORS.white,
    fontFamily: FontsFamily.Regular,
    fontSize: 15,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    // margin: 20,
    paddingHorizontal: 25,
    backgroundColor: COLORS.primary,
  },
  otpView: {
    marginTop: 50,
  },
  subOtpView: {},
  otpText: {
    fontFamily: FontsFamily.Regular,
    fontSize: 25,
    color: COLORS.white,
  },
  customInput: {
    flexDirection: "row",
    marginTop: 30,
    width: "100%",
  },
  countryCode: {
    fontFamily: FontsFamily.Regular,
    fontSize: 20,
    color: COLORS.white,
    alignSelf: "center",
  },
  line: {
    height: 36,
    backgroundColor: COLORS.white,
    width: 0.5,
    marginHorizontal: 15,
    alignSelf: "center",
  },
  input: {
    padding: 0,
    color: COLORS.white,
    fontFamily: FontsFamily.Regular,
    fontSize: 20,
    width: "80%",
  },
  horizontalLine: {
    borderWidth: 0.6,
    borderColor: COLORS.white,
    marginTop: 8,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
  },
});
