import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

export const styles = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  headerIcon: {
    height: 20,
    width: 15,
  },
  idView: {
    flexDirection: "row",
    alignItems: "center",
  },
  idTextInput: {
    padding: 0,
    alignSelf: "center",
    marginLeft: 15,
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.black,
    width: "60%",
  },
  idText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.gray,
  },

  horizontalLine: {
    borderWidth: 0.6,
    borderColor: COLORS.dark,
    marginTop: 15,
    marginBottom: 5,
  },
  downArrow: {
    height: 16,
    width: 25,
    right: 10,
  },
  employeeIdMainView: {
    marginTop: 30,
  },
  centeredView: {
    padding: 15,
    marginTop: "62%",
    // backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    // height: "100%",
  },
  leaveCard: {
    padding: 15,
    backgroundColor: COLORS.primary,
    margin: 15,
    width: "50%",
    borderRadius: 20,
  },
  title: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
  },
  close: {
    height: 15,
    width: 15,
    alignSelf: "flex-end",
    right: "40%",
  },
  modalView: {},
  calendar: {
    height: 25,
    width: 32,
    marginRight: 5,
  },
  calendarView: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    top: 10,
    right: 10,
  },
  buttonView: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 15,
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 8,
    width: "30%",
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
  leaveStatusView: {
    justifyContent: "center",
    margin: 15,
    alignItems: "center",
  },
  leaveStatusText: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 16,
    color: COLORS.primary,
    textAlign: "center",
  },
  info: {
    height: 30,
    width: 30,
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 10,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  grayButton: {
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    paddingVertical: 10,
    width: 100,
    justifyContent: "flex-end",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  buttonText: {
    fontFamily: FontsFamily.Bold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
