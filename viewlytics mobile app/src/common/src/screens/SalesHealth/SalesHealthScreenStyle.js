import { StyleSheet } from "react-native";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  ButtonMainView: {
    borderWidth: 1,
    width: "80%",
    height: 60,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },
  touchButton: {
    width: "50%",
    height: "100%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  butttonText: {
    fontWeight: "700",
    alignSelf: "center",
  },
  headerIcon: {
    width: 15,
    height: 20,
  },
  graphView: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    width: "100%",
    alignSelf: "flex-end",
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
