import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  SelectButtonView: {
    //backgroundColor: COLORS.gray,
  },
  ButtonView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
    // padding: 5,
  },
  SummaryToch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  barStyle: {
    width: width / 2,
    borderWidth: 1,
    color: COLORS.gray,
    backgroundColor: COLORS.white,
  },

  subHeaderText: {
    color: COLORS.black,
    fontWeight: "700",
    fontSize: 15,
    padding: 12,
  },
  StartTouch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  FlatlistView: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    width: width,
    alignSelf: "center",
    padding: 10,
  },
  TextView: {
    width: "100%",
    alignItems: "center",
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
    width: "50%",
  },
  mainView: {
    paddingVertical: 10,
  },
  componantStyle: {
    width: "20%",
    alignItems: "center",
  },
  nametext: {
    fontSize: 16,
    fontFamily: FontsFamily.Bold,
    paddingVertical: 2,
    color: COLORS.black,
  },
  Leavetext: {
    fontFamily: FontsFamily.Light,
    color: COLORS.black,
    paddingTop: 5,
  },
  resontext: {
    color: COLORS.black,
    paddingVertical: 3,
    fontFamily: FontsFamily.Light,
    color: COLORS.black,
    textAlign: "center",
  },
  varticalline: {
    borderWidth: 0.5,
    width: "90%",
    alignSelf: "center",
  },
  resontextone: {
    color: COLORS.black,
    paddingTop: 12,
    fontFamily: FontsFamily.Heavy,
    color: COLORS.black,
  },
  Leavetextone: {
    fontSize: 12,
    fontFamily: FontsFamily.Light,
    paddingVertical: 5,
    color: COLORS.black,
    paddingTop: 10,
  },
  redecText: {
    width: "80%",
    paddingTop: 10,
  },
  resonTextView: {
    flexDirection: "row",
    width: "100%",
  },
  verticalLine: {
    borderWidth: 0.5,
    marginTop: 5,
    paddingVertical: 0,
    width: "100%",
    alignSelf: "center",
  },
  imgStyle: {
    width: 90,
    height: 90,
    borderRadius: 60,
  },
  LeavetypeView: {
    width: "100%",
  },
  imgView: {
    width: "35%",
  },
  imgTextView: {
    flexDirection: "row",
    width: "100%",
  },
  tochableView: {
    backgroundColor: "white",
  },
  //
  mainconteiner: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Flatlistconteiner: {
    alignSelf: "center",
    flexDirection: "row",
    padding: 10,
    width: width - 20,
    backgroundColor: COLORS.white,
    borderRadius: 5,
  },
  profileimage: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  Textconteiner: {
    justifyContent: "center",
    marginLeft: 20,
    padding: 8,
  },
  numtext: {
    FontsFamily: FontsFamily.Heavy,
    color: COLORS.black,
    marginTop: 5,
  },
  nametextflat: {
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
    fontSize: 18,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  ModalView: {
    marginTop: height / 4,

    backgroundColor: COLORS.white,
    borderRadius: 10,
    //  height: height / 3,
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
