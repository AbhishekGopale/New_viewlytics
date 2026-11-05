import { Images } from "../assets/images/map";
import { COLORS } from "../colors/colors";

export const settingData = [
  {
    id: 1,
    title: "My Profile",
    backcolor:COLORS.primary,
    icon: Images.rightArrow,
    height: 15,
    width: 10,
    onPress: "MyProfile",
    isIcon: true,
    tintcolor:COLORS.primary,
    Fristicon:Images.profileicon
  },
  {
    id: 2,
    title: "Reset Password",
    backcolor:COLORS.primary,
    tintcolor:COLORS.primary,
    icon: Images.rightArrow,
    height: 15,
    width: 10,
    onPress: "ResetPassword",
    isIcon: true,
    Fristicon:Images.reseticon
  },
 
  {
    id: 3,
    title: "Notification",
    backcolor:COLORS.primary,
    tintcolor:COLORS.primary,
    icon: Images.rightArrow,
    height: 25,
    width: 25,
    onPress: "",
    isIcon: false,
    Fristicon:Images.notifricationicon
  },
  {
    id: 4,
    title: "Delete My Account",
    backcolor:COLORS.red,
    tintcolor:COLORS.red,
    icon: Images.rightArrow,
    height: 25,
    width: 25,
    onPress: "",
    isIcon: false,
    Fristicon:Images.deletIcon
  },
  {
    id: 5,
    title: "Logout",
    backcolor:COLORS.red,
    icon: Images.logout,
    tintcolor:COLORS.red,
    tint:"red",
    height: 20,
    width: 22,
    onPress: "",
    isIcon: false,
    Fristicon:Images.logouticon
  },
];
