import {
  View,
  Text,
  Alert,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { styles } from "./NotificationStyle";
import { Images } from "../../assets/images/map";
import { Swipeable } from "react-native-gesture-handler";
import SwipeItem from "../../components/SwipeItem/SwipeItem";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { GetAllNotificationAction } from "../../redux/actions/getAllNotificationAction";
import { COLORS } from "../../colors/colors";
import { DeleteNotificationAction } from "../../redux/actions/deleteNotificationAction";
import { ClearAllNotification } from "../../redux/actions/clearAllNotification";
import ToastMessage from "../../components/ToastMessages/ToastMessages";
const Notification = () => {
  const dispatch = useDispatch();
  const [isMenuPressed, setIsMenuPressed] = useState(false);
  const [token, setToken] = useState("");
  const isLoading = useSelector(
    (state) => state?.GetAllNotification?.isLoading
  );
  const notificationData = useSelector(
    (state) => state?.GetAllNotification?.allNotification?.notification
  );
  console.log(notificationData, "notificationData");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        setToken(data);
        dispatch(GetAllNotificationAction(data));
      })
      .catch((e) => {});
  };
  useEffect(() => {
    getToken();
  }, []);

  const onHeaderPress = () => {
    setIsMenuPressed(!isMenuPressed);
  };

  const onClearPress = () => {
    Alert.alert("Are you sure you want to clear all notification ?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => dispatch(ClearAllNotification(token)) },
    ]);
    setIsMenuPressed(false);
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <View>
          <SwipeItem
            title={item.title}
            description={item.message}
            time={item.created_at}
            handleDelete={() => {
              dispatch(DeleteNotificationAction(token, item.id));
            }}
          />
        </View>
      </>
    );
  };

  const NotificationClearSucess = useSelector(
    (state) => state?.ClearNotification?.clearNotificationData
  );
  return (
    <>
      <View style={styles.headerView}>
        {NotificationClearSucess?.length > 0 ? (
          <ToastMessage
            msg={"Successfully deleted All Notifications!!"}
            isVisible={NotificationClearSucess}
            isError={NotificationClearSucess}
          />
        ) : null}
        <Header
          disabled={notificationData?.length < 0 ? false : false}
          image={notificationData?.length < 0 ? Images.dots : Images.dots}
          iconStyle={styles.headerIcon}
          isNotification={isMenuPressed}
          onClearPress={onClearPress}
          onPress={onHeaderPress}
          header={"Notification"}
        />
      </View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <View style={styles.mainView}>
          <FlatList
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            data={notificationData}
            ListEmptyComponent={
              <View style={styles.NoStoreView}>
                <Text style={styles.nostoreText}>No Notification!!!</Text>
              </View>
            }
          />
        </View>
      )}
    </>
  );
};

export default Notification;
