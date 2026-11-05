import { StyleSheet, Dimensions, Platform } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
export const styles = StyleSheet.create({
  headerIcon: {
    width: 15,
    height: 20,
  },
  idTextInput: {
    padding: 0,
    alignSelf: "center",
    marginLeft: 15,

    fontSize: 18,
    color: COLORS.black,
    width: "100%",
  },
  idText: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: "700",
  },
  dropSubView: {
    flexDirection: "row",
    justifyContent: "center",
    //alignItems: "center",
    alignContent: "center",
  },
  Textinput: {
    color: "black",
    width: "100%",
    alignSelf: "center",
    height: Platform.OS === "ios" ? 120 : 120,

    alignItems: "center",
    // fontSize: 20,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  textinputheader: {
    fontWeight: "700",
    color: COLORS.dark,
    fontSize: 18,
    //  marginLeft: 10,
    padding: 5,
  },
  calendar: {
    width: 35,
    height: 25,
    alignSelf: "center",
  },
  timetext: {
    fontWeight: "700",
    fontSize: 18,
    color: COLORS.gray,
    alignSelf: "center",
    textAlign: "center",
  },
  TouchStyle: {
    marginRight: 10,
    // paddingHorizontal:40
  },
  maincontainer: {
    paddingTop: 20,
  },
  placeText: {
    alignSelf: "center",
    color: COLORS.black,
    backgroundColor: COLORS.bg,
    marginRight: 10,
    width: 70,
  },
  TotalhrsView: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    //  justifyContent: "space-between",
    borderRadius: 5,
    height: 40,
    // justifyContent: "center",
    alignItems: "center",
  },
  HrsView: {
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    //alignSelf: "center",
    fontWeight: "700",
    color: COLORS.gray,
    // marginLeft: 10,
  },
  paddingConatiner: {
    paddingTop: 10,
  },
  mainView: {
    padding: 20,
    alignContent: "center",
  },
  dropView: {
    zIndex: 999,
    height: 80,
  },
  BGView: {
    backgroundColor: COLORS.white,
    borderRadius: 0,
  },
  butotonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "700",
  },
  buttonView: {
    alignContent: "flex-end",
    alignContent: "flex-end",
    paddingTop: 30,
  },
  TouchstyleButton: {
    width: 150,
    backgroundColor: COLORS.primary,
    // height: 50,
    padding: 13,
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  timingView: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
    justifyContent: "space-between",
  },
  PaddingView:
    height <= 700
      ? { paddingBottom: 50 }
      : {
          paddingBottom: 100,
        },
  Totext: {
    textAlign: "center",
  },
  ScrollView: {
    width: "95%",
    alignSelf: "center",
  },
  FromToView: {
    justifyContent: "center",
    alignItems: "center",
  },
  diffrantTime: {
    fontWeight: "700",
    alignSelf: "center",
    marginLeft: 10,
  },
  timeTextone: {
    paddingVertical: 5,
  },
  boder: {
    borderWidth: 0.5,
    marginHorizontal: 30,
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },

  durationTime: {
    alignSelf: "center",
    paddingHorizontal: 20,
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,
  },
  touchView: {
    backgroundColor: COLORS.primary,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
  },
  buttonText: {
    alignSelf: "center",
    padding: 10,
    color: COLORS.white,
    fontFamily: FontsFamily.Heavy,
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  grayButton: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 8,
    width: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  buttonTexts: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
