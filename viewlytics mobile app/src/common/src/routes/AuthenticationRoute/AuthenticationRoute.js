import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../../screens/SplashScreen/SplashScreen";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";
import ForgotPassword from "../../screens/ForgotPassword/ForgotPassword";
import OTPVerification from "../../screens/OTPVerification/OTPVerification";
const Stack = createNativeStackNavigator();

const AuthenticationRoute = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
    </Stack.Navigator>
  );
};
export default AuthenticationRoute;
