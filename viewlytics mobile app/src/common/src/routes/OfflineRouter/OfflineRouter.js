import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfflineScreen from "../../components/OfflineScreen/OfflineScreen";
import OfflineDashboard from "../../screens/OfflineDashboard/OfflineDashboard";
import NewStockOffline from "../../screens/OfflineScreen/NewStockOffline";
import CompetitionAnalysis from "../../screens/CompetitionAnalysis/CompetitionAnalysis";
import FildVisitScreen from "../../screens/FildVisitScreen/FildVisitScreen";
import Meeting from "../../screens/MeetingScreen/Meeting";
import AdminWork from "../../screens/MeetingScreen/AdminWorkScreen/AdminWork";
import OpeningStockOffline from "../../screens/OfflineScreen/OpeningStockOffline.js";
import SosReportOffline from "../../screens/OfflineScreen/SosReportOffline";
import ShopperEngagementOffline from "../../screens/OfflineScreen/ShopperEngagmentOffline";
import MarketInteligiance from "../../screens/OfflineScreen/MarketIntelligenceOffline";
import PromoOffline from "../../screens/OfflineScreen/PromoOffline";
import OosREportOffline from "../../screens/OfflineScreen/OosReportOffline";
import ClosingStockOffline from "../../screens/OfflineScreen/ClosingOffline";
import MerchandisingAssetOffline from "../../screens/OfflineScreen/MerchandisingOffline";
import CreateAssestOffline from "../../screens/OfflineScreen/CreateAssestOffline";
import ServerScreen from "../../screens/ServerScreen/ServerScreen";
import CompetitionBrandOffline from "../../screens/OfflineScreen/CompetitionBrandOffline";
import AdminWorkOffline from "../../screens/OfflineScreen/AdminWorkOffline";
import MeetingOffline from "../../screens/OfflineScreen/MeetingOffline";
import FildVisitScreenOffline from "../../screens/OfflineScreen/FildVisitScreenOffline";
import CreateFieldScreenOffline from "../../screens/OfflineScreen/FildvisitSubScreen/CreateFieldScreenOffline";
import EightQustionOffline from "../../screens/OfflineScreen/FildvisitSubScreen/EightQustionOffline";
import SixqustionOffline from "../../screens/OfflineScreen/FildvisitSubScreen/SixqustionOffline";
import SavenqustionOffline from "../../screens/OfflineScreen/FildvisitSubScreen/SavenqustionOffline";
const Stack = createNativeStackNavigator();

const OfflineRouter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OfflineScreen" component={OfflineScreen} />
      <Stack.Screen name="OfflineDashboard" component={OfflineDashboard} />
      <Stack.Screen
        name="OpeningStockOffline"
        component={OpeningStockOffline}
      />
      <Stack.Screen name="NewStockOffline" component={NewStockOffline} />
      <Stack.Screen
        name="MerchandisingAssetOffline"
        component={MerchandisingAssetOffline}
      />
      <Stack.Screen
        name="CompetitionAnalysis"
        component={CompetitionAnalysis}
      />
      <Stack.Screen name="PromoOffline" component={PromoOffline} />
      <Stack.Screen
        name="ClosingStockOffline"
        component={ClosingStockOffline}
      />
      <Stack.Screen
        name="ShopperEngagementOffline"
        component={ShopperEngagementOffline}
      />
      <Stack.Screen name="FildVisitScreen" component={FildVisitScreen} />
      <Stack.Screen name="Meeting" component={Meeting} />
      <Stack.Screen name="AdminWork" component={AdminWork} />
      <Stack.Screen name="OosREportOffline" component={OosREportOffline} />
      <Stack.Screen name="SosReportOffline" component={SosReportOffline} />
      <Stack.Screen name="MarketInteligiance" component={MarketInteligiance} />
      <Stack.Screen
        name="CreateAssestOffline"
        component={CreateAssestOffline}
      />
      <Stack.Screen
        name="CompetitionBrandOffline"
        component={CompetitionBrandOffline}
      />
      <Stack.Screen name="AdminWorkOffline" component={AdminWorkOffline} />
      <Stack.Screen name="MeetingOffline" component={MeetingOffline} />
      <Stack.Screen
        name="FildVisitScreenOffline"
        component={FildVisitScreenOffline}
      />
      <Stack.Screen
        name="CreateFieldScreenOffline"
        component={CreateFieldScreenOffline}
      />
      <Stack.Screen
        name="EightQustionOffline"
        component={EightQustionOffline}
      />
      <Stack.Screen name="SixqustionOffline" component={SixqustionOffline} />
      <Stack.Screen
        name="SavenqustionOffline"
        component={SavenqustionOffline}
      />
    </Stack.Navigator>
  );
};
export default OfflineRouter;
