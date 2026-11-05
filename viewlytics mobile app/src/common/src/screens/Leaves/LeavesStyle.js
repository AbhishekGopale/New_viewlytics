import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyMainView: {
    justifyContent: "center",
    padding: 25,
    alignItems: "center",
    alignContent: "center",
    marginTop: 50,
  },
  emptyText: {
    alignSelf: "center",
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 28,
    color: COLORS.black,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginTop: 50,
  },
  addLeave: {
    height: 50,
    width: 50,
    tintColor: COLORS.white,
    // marginTop: 10,
  },
  cardMainView: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    height: 80,
    backgroundColor: COLORS.grayWhite,
  },
  detailsView: {
    width: "70%",
    //paddingVertical: 10,
  },
  title: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 18,
    color: COLORS.black,
  },
  description: {
    fontFamily: FontsFamily.Bold,
    fontSize: 12,
    color: COLORS.black,
    marginTop: 10,
    marginVertical: 10,
  },
  timeView: {
    width: "30%",
    alignItems: "center",
    // flexDirection: "row",
  },
  horizontalLine: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.black,
  },
  verticalLine: {
    height: 80,
    width: 10,
    left: 10,
    alignSelf: "center",
    //backgroundColor: "red",
  },
  leaveText: {
    fontFamily: FontsFamily.ExtraBold,
    color: COLORS.black,
    fontSize: 12,
  },
  addLeaveButton: {
    position: "absolute",
    bottom: 10,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 45,
    width: 45,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  time: {
    fontFamily: FontsFamily.ExtraBold,
    fontSize: 10,
    color: COLORS.black,
  },
  touchView: {
    backgroundColor: COLORS.primary,
    width: 150,
    marginTop: 20,
    flexDirection: "row",
    borderRadius: 5,
  },
  cardConteiner: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  headerIcon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    tintColor: COLORS.white,
  },
  datestyle: {
    color: COLORS.black,
    paddingVertical: 5,
  },
});
