import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import AuthenticationRoute from "../AuthenticationRoute/AuthenticationRoute";
import Navigation from "../Navigation/Navigation";

const Stack = createNativeStackNavigator();

const LoginRouter = () => {
  const [isLogin, setIsLogin] = useState(null);
  console.log(isLogin, "isLogin======");
  useEffect(() => {
    checkUserLogin();
  }, [isLogin]);

  const checkUserLogin = async () => {
    console.log("isUserLogin", await AsyncStorage.getItem(DB.ISLOGIN));
    let isUserLogin = true;
    isUserLogin = await AsyncStorage.getItem(DB.ISLOGIN);
    if (isUserLogin !== null) {
      setIsLogin(isUserLogin);
    } else {
      setIsLogin(false);
    }
  };
  console.log("=================isLoginRouter======================", isLogin);
  return (
    <>
      {isLogin !== null && (
        <Stack.Navigator
          initialRouteName={isLogin === "true" ? "Navigation" : "AuthRoute"}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="AuthRoute" component={AuthenticationRoute} />
          <Stack.Screen name="Navigation" component={Navigation} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default LoginRouter;
