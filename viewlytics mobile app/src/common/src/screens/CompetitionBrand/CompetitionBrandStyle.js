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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  buttons: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 5,
    padding: 10,
    marginRight: 8,
  },
  grayButtons: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 8,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginVertical: 5,
    marginRight: 8,
  },

  butotonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "700",
  },
  submitText: {
    color: COLORS.white,
    fontFamily: FontsFamily.Heavy,
  },
  Textinput: {
    color: COLORS.black,
    width: "100%",
    alignSelf: "center",
    height: 40,
    alignItems: "center",
    // backgroundColor: COLORS.white,
  },
  TextView: {
    width: "100%",
    alignSelf: "center",
    //height: 40,
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: COLORS.white,
  },
});
