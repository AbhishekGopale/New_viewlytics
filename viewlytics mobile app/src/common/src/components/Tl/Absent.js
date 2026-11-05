import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./AbsetStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { AbsentEmployeeDetail } from "../../redux/actions/absentOffEmployeeTLAction";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../colors/colors";
const Absent = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(AbsentEmployeeDetail(data));
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const AbsentEmployeeDetails = useSelector(
    (state) => state?.absentEmployeeTLReducer?.allDetails?.data
  );

  const isLoading = useSelector(
    (state) => state?.absentEmployeeTLReducer?.isLoading
  );
  return (
    <View>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300 }}
          data={AbsentEmployeeDetails}
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
      )}
    </View>
  );
};

export default Absent;
