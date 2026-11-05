import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  ModalView: {
    marginTop: height / 4,

    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignSelf: "center",
    width: "80%",
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  textinput: {
    width: "80%",
    height: 50,
    color: "black",
    //width: "100%",
    alignSelf: "center",
    height: 80,
    alignItems: "center",
    fontSize: 14,
    color: COLORS.black,
    // padding: 5,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    // margin: 10,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  submitText: {
    alignSelf: "center",
    color: COLORS.white,
    fontWeight: "700",
    padding: 10,
  },
  HeaderText: {
    padding: 20,
    fontWeight: "700",
    color: COLORS.black,
  },
  submitView: {
    padding: 20,
  },
  buttonMainView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
  },
  TouchButton: {
    width: "50%",
    backgroundColor: "#50C878",
    paddingVertical: 5,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
    fontFamily: FontsFamily.ExtraBold,
  },
});
