import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./TotalAttedanceStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { TotalEmployeeDetail } from "../../redux/actions/totalEmployeeTLAction";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../colors/colors";
const TotalAttedance = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(TotalEmployeeDetail(data));
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const TotalEmployeeDetails = useSelector(
    (state) => state?.totalEmployeeTLReducer?.allDetails?.data
  );

  const isLoading = useSelector(
    (state) => state?.totalEmployeeTLReducer?.isLoading
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
          data={TotalEmployeeDetails}
          renderItem={({ item }) => (
            <View style={styles.mainView}>
              <View style={styles.FlatlistView}>
                <View
                  style={{
                    width: "45%",

                    flexDirection: "row",
                    padding: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.profile_image }}
                    style={styles.profileimage}
                  />
                  <View style={styles.TextView}>
                    <Text style={styles.nametext}>{item?.first_name}</Text>

                    <Text style={styles.numtext}>{item?.role_name}</Text>
                  </View>
                </View>
                <View style={styles.targetView}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        width: "52%",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <Text
                        style={[
                          styles.targetArchivdText,
                          {
                            color: COLORS.green,
                            alignSelf: "flex-end",
                          },
                        ]}
                      >
                        Achievement
                      </Text>
                    </View>
                    <Text style={{ color: COLORS.black }}>/</Text>

                    <Text
                      style={[
                        styles.targetArchivdText,
                        { color: COLORS.red, width: "48%" },
                      ]}
                    >
                      Target
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <View style={{ width: "52%" }}>
                      <Text style={styles.targetArchivdText}>
                        {item.achieved}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: COLORS.black,
                      }}
                    >
                      /
                    </Text>
                    <View style={{ width: "48%" }}>
                      <Text
                        style={[styles.targetArchivdText, { width: "48%" }]}
                      >
                        {item.taget}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TotalAttedance;
