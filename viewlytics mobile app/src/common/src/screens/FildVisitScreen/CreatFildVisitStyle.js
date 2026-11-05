import { StyleSheet, Dimensions } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "lightgray",

    padding: 8,
    margin: 10,
    width: width / 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: COLORS.green,
  },
  buttonTextss: {
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
    width: 100,
  },
  headerIcon: {
    width: 15,
    height: 20,
  },
  mainmodalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  capcharbutton: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    marginHorizontal: 20,
  },
  Modalimages: {
    width: 80,
    height: 80,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.black,
    textAlign: "center",
    fontWeight: "700",
  },
  buttonDone: {
    padding: 10,
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  grayButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  textinputview: {
    borderWidth: 1,
    width: width - 40,
    borderRadius: 2,
    height: 60,
    borderColor: COLORS.gray,
  },
  qustionView: {
    width: width,
    padding: 20,
  },
  qustionText: {
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,
    fontSize: 18,
  },

  //sixquston style......

  textStyle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: "500",
    marginVertical: 5,
  },
  textinputviewTwo: {
    borderWidth: 1,
    width: width - 40,
    borderRadius: 5,
    height: 40,
    borderColor: COLORS.gray,
  },
  textinputviewThree: {
    borderWidth: 1,
    width: width - 40,
    borderRadius: 2,
    height: 80,
    borderColor: COLORS.gray,
  },
});
