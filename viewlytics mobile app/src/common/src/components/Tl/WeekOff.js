import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { WeekoffPromoter } from "./Data";
import { styles } from "./WeekOffStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { WeekOffEmployeeDetail } from "../../redux/actions/weekOffEmployeeTLAction";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../colors/colors";
import { FontsFamily } from "../../assets/fonts/fonts";
const Weekoff = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(WeekOffEmployeeDetail(data));
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
    // dispatch(WeekOffEmployeeDetail(token));
  }, []);

  const WeekOffEmployeeDetails = useSelector(
    (state) => state?.weekOffEmployeeTLReducer?.allDetails?.data
  );
  const isLoading = useSelector(
    (state) => state?.weekOffEmployeeTLReducer?.isLoading
  );

  return (
    <View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          {WeekOffEmployeeDetails?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 300 }}
              data={WeekOffEmployeeDetails}
              renderItem={({ item }) => (
                <View style={styles.mainView}>
                  <View style={styles.FlatlistView}>
                    <Image
                      source={{ uri: item.profile_image }}
                      style={styles.profileimage}
                    />
                    <View style={styles.TextView}>
                      <Text style={styles.nametext}>{item.first_name}</Text>

                      <Text style={styles.numtext}>{item.role_name}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                marginTop: "50%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 20,
                  alignSelf: "center",
                  fontFamily: FontsFamily.NotoSansBold,
                }}
              >
                No Data Found!
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default Weekoff;
