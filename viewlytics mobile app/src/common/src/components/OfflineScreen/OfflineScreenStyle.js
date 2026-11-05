import { StyleSheet } from "react-native";
import { FontsFamily } from "../../assets/fonts/fonts";
import { COLORS } from "../../colors/colors";
export const styles = StyleSheet.create({
  imgStyle: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  mainConteiner: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  imgConteiner: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  TextConteiner: {
    flex: 1,
  },
  OopsText: {
    alignSelf: "center",
    fontSize: 30,
    color: COLORS.black,
    fontFamily: FontsFamily.Heavy,
  },
  noteView: {
    width: "80%",
    paddingVertical: 20,
  },
  textstyle: {
    textAlign: "center",
    color: COLORS.black,
    padding: 5,
    fontFamily: FontsFamily.NotoSansBold,
  },
  buttontext: {
    borderWidth: 1,
    width: 120,
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    color: COLORS.black,
  },
  tryText: {
    padding: 8,
    color: COLORS.black,
    fontFamily: FontsFamily.NotoSerifRegular,
  },
  goLiveButton: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 150,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 15,
  },
  goLiveText: {
    fontFamily: FontsFamily.NotoSansBold,
    color: COLORS.white,
  },
});
