import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  headerIcon: {
    height: 20,
    width: 15,
  },

  mainView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonView: {
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 15,
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    width: 130,
  },
  buttonGray: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 10,
    width: 130,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  mTop: {
    marginTop: 25,
  },
  errorTexts: {
    textAlign: "center",
    marginRight: 20,
    color: COLORS.red,
  },
});
