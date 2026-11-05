import { StyleSheet, Dimensions, Platform } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },
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
    height: Platform.OS === "ios" ? 140 : 120,

    alignItems: "center",
    fontSize: 20,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  textinputheader: {
    fontWeight: "700",
    color: COLORS.gray,
    fontSize: 18,
    marginLeft: 10,
  },
  calendar: {
    width: 35,
    height: 25,
  },
  timetext: {
    fontWeight: "700",
    fontSize: 18,
    color: COLORS.gray,
    alignSelf: "center",
  },
  TouchStyle: {
    marginRight: 10,
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
    justifyContent: "space-between",
    height: 40,
  },
  HrsView: {
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "700",
    color: COLORS.gray,
    marginLeft: 10,
  },
  paddingConatiner: {
    paddingTop: 10,
  },
  mainView: {
    // /padding: 20,
    alignContent: "center",
  },
  dropView: {
    zIndex: 999,
    height: 80,
  },
  BGView: {
    backgroundColor: COLORS.white,
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
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  TouchstyleButton: {
    width: 100,
    backgroundColor: COLORS.primary,
    height: 50,
    padding: 10,
    alignSelf: "flex-end",
    borderRadius: 5,
  },
  timingView: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  PaddingView:
    height <= 700
      ? { paddingBottom: 50 }
      : {
          //  paddingBottom: 100,
        },
  // StornameView: {
  //     padding: 10,
  //     width: "100%",
  //     //backgroundColor:COLORS.primary
  //   },
  StorenameText: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 20,
    //  fontFamily: FontsFamily.ExtraBold,
  },
  StoreViewone: {
    width: "100%",

    // backgroundColor: COLORS.gray,
    //  flexDirection: "row",
    padding: 10,
    // borderRadius:10
  },
  StorenameTexttwo: {
    fontWeight: "700",
    color: COLORS.black,
    alignSelf: "flex-end",
    fontSize: 18,
  },
  ShopImg: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  imgView: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
  },
  StoreView: {
    width: "100%",

    // backgroundColor: COLORS.gray,
    flexDirection: "row",
    padding: 10,
    // borderRadius:10
  },

  LocationText: {
    color: COLORS.black,
  },
  StorenameTe: {
    fontWeight: "700",
    color: COLORS.black,
    // alignSelf: "flex-end",
    fontSize: 18,
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
    borderRadius: 5,
  },
  FlatListView: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: COLORS.white,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  catName: {
    color: COLORS.black,
    fontWeight: "900",
    fontFamily: FontsFamily.RobotoMedium,
  },
});
