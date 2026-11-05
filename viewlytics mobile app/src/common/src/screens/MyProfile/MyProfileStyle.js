import { StyleSheet } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
  mainViewtwo: {
    justifyContent: "center",
    alignItems: "center",
  },

  mainView: {
    backgroundColor: COLORS.white,
    padding: 10,
    // flex:1
    height: "100%",
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  mainProfileView: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  NameText: {
    fontSize: 25,
    //fontWeight: "700",
    fontFamily: FontsFamily.Heavy,
    color: COLORS.black,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    // fontSize: 18,
    marginVertical: 10,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
  },
  imagecontainer: {
    width: "100%",
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  topTaxt: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    paddingVertical: 5,
  },
  TouchStyle: {
    position: "absolute",
    right: 110,
    bottom: 150,
  },
  IcoStyle: {
    height: 35,
    width: 35,
  },
  submitbutton: {
    width: 100,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    //  alignSelf: "flex-end",
    borderRadius: 10,
    marginTop: 20,
  },
  textstyle: {
    color: COLORS.white,
    padding: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 100,
  },
  grayButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray,
    borderRadius: 5,

    marginTop: 10,

    width: 100,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    // fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  virsionText: {
    // fontSize: 18,
    marginVertical: 10,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
    alignSelf: "flex-end",
    marginRight: 10,
    color: COLORS.gray,
  },
});
