import { StyleSheet, Dimensions } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

import { COLORS } from "../../colors/colors";

export default styles = StyleSheet.create({
  modalConteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalview: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white", // You can remove this line to make it transparent

    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgStyle: {
    width: 50,
    height: 100,
    alignSelf: "center",
    padding: 40,
  },
  textStyle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: "500",
    // paddingVertical: 10,
    textAlign: "center",
  },
  textStyletwo: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "500",
    // paddingVertical: 10,
    textAlign: "center",
  },
  crossButtonView: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  crossimg: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  imgView: {
    paddingVertical: 30,
  },
  msgtextStyle: {
    color: COLORS.black,
    fontWeight: "500",
    paddingVertical: 10,
    textAlign: "center",
  },
});
