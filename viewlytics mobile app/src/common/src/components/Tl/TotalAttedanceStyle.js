import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  FlatlistView: {
    alignSelf: "center",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    // padding: 10,
    width: width - 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  TextView: {
    justifyContent: "center",
    //  alignItems:"center",
    marginLeft: 20,
    padding: 8,
    //  paddingRight: 10,
  },
  numtext: {
    //  fontSize: 12,
    FontsFamily: FontsFamily.Heavy,
    color: COLORS.black,
    //textAlign:"center"
    marginTop: 5,
  },
  HeaderText: {
    color: COLORS.black,
    fontWeight: "700",
  },
  HeaderView: {
    padding: 10,
    fontFamily: FontsFamily.ExtraBold,
  },
  border: {
    borderWidth: 0.5,
    paddingVertical: 0,
    borderColor: "black",
    alignSelf: "center",
    width: "90%",
  },
  mainView: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileimage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  nametext: {
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
    // fontSize: 18,
  },
  targetView: {
    width: "50%",
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  targetArchivdText: {
    color: COLORS.black,
    //alignSelf: "center",
    fontSize: 12,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
});
