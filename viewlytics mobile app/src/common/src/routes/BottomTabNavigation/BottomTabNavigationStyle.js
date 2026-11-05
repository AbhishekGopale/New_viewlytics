import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  tabBar: {
    height: 56,
    backgroundColor: COLORS.primary,
    borderTopColor: COLORS.white,
    borderWidth: 1,
  },
  tabIconContainer: {
    position: "absolute",
    top: 12,
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
  },
  tabIcon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    tintColor: COLORS.white,
  },
  activeIcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  deActiveIcon: {
    borderRadius: 30,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
