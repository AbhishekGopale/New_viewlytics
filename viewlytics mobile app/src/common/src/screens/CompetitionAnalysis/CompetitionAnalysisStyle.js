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

  textinputheader: {
    fontWeight: "700",
    color: COLORS.dark,
    fontSize: 18,
    padding: 5,
    paddingTop: 10,
  },

  mainView: {
    padding: 10,
    alignContent: "center",
  },
  imgView: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  ShopImg: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  StoreView: {
    padding: 10,
  },
  LocationText: {
    color: COLORS.black,
  },
  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 18,
  },

  Textinput: {
    color: COLORS.black,
    width: "100%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  TextView: {
    width: "100%",
    alignSelf: "center",
    //height: 40,
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  // PaddingView:
  // height <= 700
  //   ? { paddingBottom: 1000 }
  //   : {
  //       paddingBottom: 0,
  //     },
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
  TextViewone: {
    width: "100%",
    alignSelf: "center",
    padding: 10,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  Textinputone: {
    color: "black",
    width: "100%",
    alignSelf: "center",
    height: 100,
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  buttonView: {
    // alignContent: "flex-end",
    alignContent: "flex-end",
    paddingTop: 30,
  },
  TouchstyleButton: {
    width: 150,
    backgroundColor: COLORS.primary,
    // height: 50,
    padding: 13,
    alignSelf: "flex-end",
    borderRadius: 10,
  },
  butotonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "700",
  },
  capcharbutton: {
    width: 100,
    height: 100,
    // backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 0,
    //position:"absolute",
    //top:0,
  },
  Modalimages: {
    width: 80,
    height: 80,
  },
  idTextInput: {
    padding: 0,
    alignSelf: "center",
    marginLeft: 15,

    fontSize: 18,
    color: COLORS.black,
    width: "100%",
  },
  mainViewimg: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },

  /// store card
  StornameView: {
    padding: 10,
    width: "100%",
  },
  addView: {
    width: "20%",
  },
  AdressView: {
    width: "80%",
  },
  imgView: {
    flexDirection: "row",
  },
  ShopImg: {
    width: 80,
    height: 90,
    borderRadius: 5,
  },
  StoreView: {
    width: "60%",
  },
  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,

    fontSize: 16,
  },
  LocationText: {
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,
    marginTop: 5,
    fontSize: 12,
  },
  AddTexttwo: {
    fontSize: 11,
    color: COLORS.black,
    fontFamily: FontsFamily.Light,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
  imgConteiner: {
    width: "40%",
  },
  AddText: {
    fontSize: 13,
    color: COLORS.black,
    textAlign: "center",
    fontFamily: FontsFamily.Heavy,
    fontWeight: "bold",
  },
  addresstext: {
    flexDirection: "row",
    backgroundColor: COLORS.bg,
    padding: 5,
    marginTop: 5,
  },
  TlText: {
    paddingTop: 5,
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,

    fontSize: 12,
  },
  maiconteinet: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
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
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
