import * as React from "react";
import { Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Images } from "../../assets/images/map";
import { COLORS } from "../../colors/colors";
import { styles } from "./BottomTabNavigationStyle";
import AddButton from "../../components/AddButton/AddButton";
import { useTabMenu } from "../context/TabContext";
import Notification from "../../screens/Notification/Notification";
import SettingScreen from "../../screens/SettingScreen/SettingScreen";
import SettingNavigator from "./SettingNavigator/SettingNavigator";
import AddNavigator from "./AddNavigator/AddNavigator";
import SalesHealthScreen from "../../screens/SalesHealth/SalesHealthScreen";
function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.white,
      }}
    >
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  const { opened, toggleOpened } = useTabMenu();

  const getIconColor = (focused) => ({
    tintColor: focused ? COLORS.primary : COLORS.white,
  });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="AddNavigator"
        component={AddNavigator}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              {focused ? (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 30,
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Images.dashboard}
                    resizeMode="contain"
                    style={[
                      styles.tabIcon,
                      {
                        tintColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
              ) : (
                <View style={styles.deActiveIcon}>
                  <Image
                    source={Images.dashboard}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                  />
                </View>
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="SalesHealthScreen"
        component={SalesHealthScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              {focused ? (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 30,
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Images.startDay}
                    resizeMode="contain"
                    style={[
                      styles.tabIcon,
                      {
                        tintColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
              ) : (
                <View style={styles.deActiveIcon}>
                  <Image
                    source={Images.startDay}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                  />
                </View>
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarButton: () => (
            <AddButton opened={opened} toggleOpened={toggleOpened} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              {focused ? (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 30,
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Images.notification}
                    resizeMode="contain"
                    style={[
                      styles.tabIcon,
                      {
                        tintColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
              ) : (
                <View style={styles.deActiveIcon}>
                  <Image
                    source={Images.notification}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                  />
                </View>
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          tabBarItemStyle: {
            height: 0,
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              {focused ? (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 30,
                    height: 30,
                    width: 30,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={Images.setting}
                    resizeMode="contain"
                    style={[
                      styles.tabIcon,
                      {
                        tintColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
              ) : (
                <View style={styles.deActiveIcon}>
                  <Image
                    source={Images.setting}
                    resizeMode="contain"
                    style={[styles.tabIcon]}
                  />
                </View>
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => opened && e.preventDefault(),
        }}
      />
    </Tab.Navigator>
  );
}
