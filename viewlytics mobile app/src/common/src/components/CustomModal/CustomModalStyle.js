import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  ModalBackTouch: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  textstyle: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
  },
  textstyleone: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    //fontFamily: FontsFamily.Bold,
  },
  modalbuttonView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  modalTouchble: {
    width: "50%",
    alignItems: "center",
    // padding: 9,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  idoLogo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 10,
  },
  logoBackground: {
    height: 120,
    width: 120,
    borderRadius: 60,
    position: "absolute",
    top: -55,
    backgroundColor: "white",
    padding: 0,
  },
  text: {
    fontSize: 15,
    marginTop: 0,
    fontWeight: "700",
    color: "black",
    fontFamily: FontsFamily.ExtraBold,
    textAlign: "center",
  },
  modalView:
    height <= 700
      ? {
          marginTop: 200,
          height: "45%",
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
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
        }
      : {
          marginTop: Platform.OS === "ios" ? height / 2.6 : height / 3.1,
          width: "80%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
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

  subModalview: {
    justifyContent: "space-evenly",
  },
  textstyle: {
    fontWeight: "600",
    alignSelf: "center",
    padding: 5,
    color: COLORS.black,
    fontFamily: FontsFamily.Bold,
  },
});
