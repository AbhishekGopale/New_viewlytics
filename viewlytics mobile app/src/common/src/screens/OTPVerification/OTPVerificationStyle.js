import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderWidth: 1,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 5,
    color: COLORS.black,
    fontFamily: FontsFamily.Heavy,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  subView: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: { width: "100%", height: 100 },
  mainView: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  otpText: {
    fontFamily: FontsFamily.Heavy,
    fontSize: 18,
    color: COLORS.white,
  },
  otpSubText: {
    fontFamily: FontsFamily.Light,
    fontSize: 16,
    color: COLORS.white,
    marginTop: 15,
  },
  otpNoText: {
    fontFamily: FontsFamily.Heavy,
    fontSize: 14,
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 15,
  },
  resendButton: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 25,
    marginTop: 5,
  },
  resendText: {
    fontFamily: FontsFamily.Regular,
    color: COLORS.white,
    fontSize: 15,
  },
  buttonView: {
    // padding: 25,
    // marginTop: 25,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 25,
    width: "90%",
    alignSelf: "center",
  },
});
