import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import BottomTabNavigation from "../BottomTabNavigation/BottomTabNavigation";
import { TabContextProvider } from "../context/TabContext";
import SettingNavigator from "../BottomTabNavigation/SettingNavigator/SettingNavigator";
import MyProfile from "../../screens/MyProfile/MyProfile";
import ResetPassword from "../../screens/ResetPassword/ResetPassword";
import CreateLeaves from "../../screens/CreateLeaves/CreateLeaves";
import SalarySlip from "../../screens/SalarySlip/SalarySlip";
import SupportScreen from "../../screens/SupportScreen/SupportScreen";
import CheckInScreen from "../../screens/CheckInScreen/CheckInScreen";
import Attendance from "../../screens/Attendance/AttendanceScreen";
import AddStoreScreen from "../../screens/AddStoreScreen/AddStoreScreen";
import DailyReporting from "../../screens/DailyReporting/DailyReporting";
import Meeting from "../../screens/MeetingScreen/Meeting";
import AdminWork from "../../screens/MeetingScreen/AdminWorkScreen/AdminWork";
import FildVisitScreen from "../../screens/FildVisitScreen/FildVisitScreen";
import DrsScreen from "../../screens/DRS screen/DrsScreen";
import OpeningStockScreen from "../../screens/OpeningStockScreen/OpeningStockScreen";
import ClosingStockScreen from "../../screens/ClosingStockScreen/ClosingStockScreen";
import ShopperEngagementScreen from "../../screens/ShopperEngagement/ShopperEngagementScreen";
import SOSReportScreen from "../../screens/SOSREport/SosReportScreen";
import CompetitionAnalysis from "../../screens/CompetitionAnalysis/CompetitionAnalysis";
import MerchandisingAssetTracking from "../../screens/MerchandisingAssetTracking/MerchandisingAssetTracking";
import OosReport from "../../screens/OOSReport/OosReport";
import ApproveAttendanceScreen from "../../screens/ApproveAttendanceScreen/ApproveAttendanceScreen";
import PromoScreen from "../../screens/Promo/PromoScreen";
//import MarketingInteligence from "../../screens/MarketingInteligence/MarketingInteligence";
import SosReportMer from "../../screens/SOSREport/SosReportMer";
import NewStock from "../../screens/NewStock/NewStock";
import OfflineScreen from "../../components/OfflineScreen/OfflineScreen";
import CreateFieldScreen from "../../screens/FildVisitScreen/CreatFildVisit";
import OfflineDashboard from "../../screens/OfflineDashboard/OfflineDashboard";
import CreateAssest from "../../screens/MerchandisingAssetTracking/CreateAssest";
import Sixqustion from "../../screens/FildVisitScreen/Sixqustion";
import Savenqustion from "../../screens/FildVisitScreen/Savenqustion";
import EightQustion from "../../screens/FildVisitScreen/EightQustion";
import ServerScreen from "../../screens/ServerScreen/ServerScreen";
import GoogleEFrom from "../../screens/GoogleEfromScreen/GoogleEfrom";
import EFrom from "../../screens/GoogleEfromScreen/Efrom";
import CompetitionBrand from "../../screens/CompetitionBrand/CompetitionBrand";
import TlReporting from "../../screens/TlReporting/TlReporting";
import TabWebView from "../../screens/TlReporting/TabWebView";
import TodayActivityScreen from "../../screens/TodayActivityScreen/TodayActivityScreen";
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <TabContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
        <Stack.Screen
          name="TodayActivityScreen"
          component={TodayActivityScreen}
        />
        <Stack.Screen name="CreateLeaves" component={CreateLeaves} />
        <Stack.Screen name="SalarySlip" component={SalarySlip} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="AddStoreScreen" component={AddStoreScreen} />
        <Stack.Screen name="DailyReporting" component={DailyReporting} />
        <Stack.Screen name="Meeting" component={Meeting} />
        <Stack.Screen name="AdminWork" component={AdminWork} />
        <Stack.Screen name="FildVisitScreen" component={FildVisitScreen} />
        <Stack.Screen name="DrsScreen" component={DrsScreen} />
        <Stack.Screen name="ServerScreen" component={ServerScreen} />
        <Stack.Screen name="GoogleEFrom" component={GoogleEFrom} />
        <Stack.Screen name="EFrom" component={EFrom} />

        <Stack.Screen
          name="OpeningStockScreen"
          component={OpeningStockScreen}
        />
        <Stack.Screen
          name="ClosingStockScreen"
          component={ClosingStockScreen}
        />
        <Stack.Screen
          name="ShopperEngagementScreen"
          component={ShopperEngagementScreen}
        />
        <Stack.Screen name="SOSReportScreen" component={SOSReportScreen} />
        <Stack.Screen
          name="CompetitionAnalysis"
          component={CompetitionAnalysis}
        />
        <Stack.Screen
          name="MerchandisingAssetTracking"
          component={MerchandisingAssetTracking}
        />
        <Stack.Screen name="OosReport" component={OosReport} />
        <Stack.Screen
          name="ApproveAttendanceScreen"
          component={ApproveAttendanceScreen}
        />
        <Stack.Screen name="PromoScreen" component={PromoScreen} />
        {/* <Stack.Screen
          name="MarketingInteligence"
          component={MarketingInteligence}
        /> */}
        <Stack.Screen name="SosReportMer" component={SosReportMer} />
        <Stack.Screen name="NewStock" component={NewStock} />
        <Stack.Screen name="CreateFieldScreen" component={CreateFieldScreen} />
        <Stack.Screen name="Sixqustion" component={Sixqustion} />
        <Stack.Screen name="Savenqustion" component={Savenqustion} />
        <Stack.Screen name="CreateAssest" component={CreateAssest} />
        <Stack.Screen name="OfflineDashboard" component={OfflineDashboard} />
        <Stack.Screen name="EightQustion" component={EightQustion} />
        <Stack.Screen name="CompetitionBrand" component={CompetitionBrand} />
        <Stack.Screen name="TlReporting" component={TlReporting} />
        <Stack.Screen name="TabWebView" component={TabWebView} />
      </Stack.Navigator>
    </TabContextProvider>
  );
};
export default Navigation;
