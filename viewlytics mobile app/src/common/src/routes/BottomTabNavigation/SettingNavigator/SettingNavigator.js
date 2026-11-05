import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "../../../screens/SettingScreen/SettingScreen";
import MyProfile from "../../../screens/MyProfile/MyProfile";
import ResetPassword from "../../../screens/ResetPassword/ResetPassword";

const Stack = createNativeStackNavigator();

const SettingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};
export default SettingNavigator;
