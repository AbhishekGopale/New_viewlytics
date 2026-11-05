import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  navView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
  },
  ButtonView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  StartTouch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  SummaryToch: {
    width: width / 2,
    alignItems: "center",
    height: 42,
  },
  subHeaderText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
    padding: 12,
  },
  barStyle: {
    width: width / 2,
    borderWidth: 2,
    borderColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  emptyBarStyle: {
    width: width / 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  SelectButtonView: {
    backgroundColor: COLORS.primary,
  },
  // Summary Css
  SummaryView:
    height <= 700
      ? {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          paddingVertical: 5,
          backgroundColor: "#E4E4E4",
        }
      : {
          flexDirection: "row",
          justifyContent: "space-between",
          width: width,
          paddingVertical: 10,
          backgroundColor: "#E4E4E4",
        },
  numberContainer:
    height <= 700
      ? {
          width: 30,
          height: 30,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: "center",

          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }
      : {
          width: 45,
          height: 45,
          backgroundColor: COLORS.primary,
          borderRadius: 25,
          justifyContent: "center",

          alignSelf: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        },
  number:
    height <= 700
      ? {
          color: COLORS.white,
          fontSize: 10,
          alignSelf: "center",
          fontWeight: "700",
        }
      : {
          color: COLORS.white,
          fontSize: 15,
          alignSelf: "center",
          fontWeight: "700",
        },
  textStyle: {
    fontSize: 15,
    alignSelf: "center",
    color: COLORS.black,
    marginRight: 10,
    marginLeft: 8,
    fontWeight: "600",
    fontFamily: FontsFamily.ExtraBold,
  },
  linechart: {},
  roundView: {
    width: 80,
    height: 80,
    borderRadius: 50,
    opacity: 0.04,
    borderWidth: 8,
    borderColor: COLORS.primary,
    justifyContent: "center",
  },
  roundViewone: {
    width: 70,
    height: 70,
    borderRadius: 50,
    opacity: 0.1,
    borderWidth: 10,
    borderColor: "black",
    alignSelf: "center",
  },
  ImgGroup: {
    width: 60,
    height: 60,
  },
  imgTextContainer: {
    flexDirection: "row",
    padding: 10,
  },
  textView: {
    justifyContent: "center",
  },
  timeText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.black,
  },
  fonttext: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  GroupMainView: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 0,
    // backgroundColor:"red"
  },
  menuview: {
    width: width,
    justifyContent: "center",
    alignContent: "center",
  },
  menutopView: {
    justifyContent: "center",
    alignItems: "center",
  },
  touchbutton: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    margin: 10,
  },
  imgView: {
    width: 60,
    height: 60,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 40,
    position: "absolute",
    top: -15,
    left: -15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  subimgView: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: "center",
  },
  notificationtextStyle: {
    alignSelf: "center",
    color: COLORS.white,
    //fontSize: 18,
    paddingTop: 80,
  },
  notificationView: {
    width: 28,
    height: 28,
    alignContent: "center",
    backgroundColor: COLORS.darkRed,
    borderRadius: 20,
    justifyContent: "center",
    position: "absolute",
    bottom: -8,
    right: -8,
  },
  notificationText: {
    alignSelf: "center",
    color: COLORS.white,
    fontWeight: "700",
  },
  FlatlistView: {
    justifyContent: "center",
    padding: Platform.OS === "ios" ? 10 : 6,
  },
  graphText: {
    fontWeight: "700",
    //  paddingLeft: 20,
    fontSize: 16,
    backgroundColor: "white",
    color: COLORS.black,
    alignSelf: "flex-end",
    backgroundColor: COLORS.white,
    color: COLORS.black,
    fontFamily: FontsFamily.ExtraBold,
    paddingVertical: 10,
  },
  GraphView: {
    backgroundColor: COLORS.white,
    right: 18,
  },
  GraphMainView: {
    backgroundColor: COLORS.white,
    paddingBottom: 150,
  },
  loader: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  onText: {
    fontFamily: FontsFamily.ExtraBold,
    alignSelf: "center",
    fontSize: 15,
    color: COLORS.primary,
    bottom: 1,
  },
  HeaderTextView: {
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "#FF6464",
  },
  textConteiner: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
