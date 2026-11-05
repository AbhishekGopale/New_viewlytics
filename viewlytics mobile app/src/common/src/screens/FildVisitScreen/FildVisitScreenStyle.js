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

  DropView: {
    zIndex: 9999,
  },
  FlatlistContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  mainFlatView: {
    paddingVertical: 5,
  },
  imgstyle: {
    width: 15,
    height: 20,
    marginRight: 10,
    tintColor: COLORS.black,
  },
  TextView: {
    width: "95%",
  },
  imgViews: {
    position: "absolute",
    right: 0,
  },
  conteiner: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: COLORS.white,
    height: 80,
    alignItems: "center",
    borderRadius: 5,
  },
  Qustiontext: {
    color: COLORS.black,
  },
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,5)",
  },
  modalView: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 20,
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
    position: "absolute",
    bottom: 0,
  },
  selectedButton: {
    backgroundColor: "green",
  },
  selectedButtonNO: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontFamily: FontsFamily.Heavy,
  },
  button: {
    width: "20%",
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "gray",
    // marginVertical:5
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  Modalimages: {
    width: 100,
    height: 100,
  },
  capcharbutton: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  textinputview: {
    borderWidth: 1,
    width: width - 40,
    borderRadius: 2,
    height: 60,
    borderColor: COLORS.gray,
  },

  mainmodalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  submitText: {
    color: COLORS.white,
    fontFamily: FontsFamily.Heavy,
  },
  buttonDone: {
    padding: 10,
    marginTop: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  grayButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
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
  crossView: {
    alignSelf: "flex-end",
    width: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  crossIcon: {
    width: 25,
    height: 25,
  },
  qustionText: {
    color: COLORS.black,
    fontFamily: FontsFamily.RobotoMedium,
    fontSize: 18,
  },
});
