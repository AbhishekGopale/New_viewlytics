import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../screens/HomeScreen/HomeScreen";
import Leaves from "../../../screens/Leaves/Leaves";
import SupportScreen from "../../../screens/SupportScreen/SupportScreen";

const Stack = createNativeStackNavigator();

const AddNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Leaves" component={Leaves} />
      {/* <Stack.Screen name="SupportScreen" component={SupportScreen} /> */}
    </Stack.Navigator>
  );
};
export default AddNavigator;
