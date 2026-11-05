import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./PramoterLeaveStyle";
import AcceptReject from "./AcceptReject";
import { COLORS } from "../../colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DB } from "../../database";
import { OnLeaveEmployeeDetail } from "../../redux/actions/onLeaveEmployeeTLAction";
import { LeaveRequstEmployeeDetail } from "../../redux/actions/leaveRequstEmployeeTLAction";
import { useDispatch, useSelector } from "react-redux";
import { TlLeaveRequstAction } from "../../redux/actions/leaveRequstAction";
import { FontsFamily } from "../../assets/fonts/fonts";
const PramoterLeave = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const getToken = async () => {
    AsyncStorage.getItem(DB.TOKEN)
      .then((data) => {
        dispatch(OnLeaveEmployeeDetail(data));
        dispatch(LeaveRequstEmployeeDetail(data));
        setToken(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  const OnLeaveEmployeeDetails = useSelector(
    (state) => state?.onLeaveEmployeeTLReducer?.allDetails?.data
  );

  const LeaveRequstEmployeeDetails = useSelector(
    (state) => state?.leaveRequstEmployeeTLReducer?.allDetails?.data
  );

  const isLoading = useSelector(
    (state) => state?.onLeaveEmployeeTLReducer?.isLoading
  );

  const [isDay, setIsDay] = useState(false);

  return (
    <View>
      <View style={styles.SelectButtonView}>
        <View style={styles.ButtonView}>
          <View style={styles.tochableView}>
            <TouchableOpacity
              onPress={() => {
                setIsDay(false);
              }}
              style={styles.SummaryToch}
            >
              <Text style={styles.subHeaderText}>On Leave</Text>
            </TouchableOpacity>
            {!isDay ? (
              <View style={styles.barStyle} />
            ) : (
              <View style={styles.emptyBarStyle} />
            )}
          </View>
          <View style={{ backgroundColor: "white" }}>
            <TouchableOpacity
              style={styles.StartTouch}
              onPress={() => {
                setIsDay(true);
              }}
            >
              <Text style={styles.subHeaderText}>Leave Requst</Text>
            </TouchableOpacity>
            {isDay ? (
              <View style={styles.barStyle} />
            ) : (
              <View style={styles.emptyBarStyle} />
            )}
          </View>
        </View>
      </View>
      {isDay ? (
        <View>
          {/* {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View>
          ) : ( */}
          <FlatList
            contentContainerStyle={{ paddingBottom: 500 }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
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
            }
            data={LeaveRequstEmployeeDetails}
            renderItem={({ item }) => (
              <View style={styles.mainView}>
                <View style={styles.FlatlistView}>
                  <View style={styles.TextView}>
                    <View style={styles.imgTextView}>
                      <View style={styles.imgView}>
                        <Image
                          source={{ uri: item.profile_image }}
                          style={styles.imgStyle}
                        />
                      </View>
                      <View style={styles.LeavetypeView}>
                        <Text style={styles.nametext}>
                          {item.first_name}
                          {item.last_name}
                        </Text>

                        <Text style={styles.Leavetext}>
                          Leave Type :
                          {item.leave_type == "0"
                            ? "Casual Leave"
                            : item.leave_type == "1"
                            ? "Sick Leave"
                            : item.leave_type == "2"
                            ? "Compensatory Leave"
                            : item.leave_type == "3"
                            ? "Emergency Leave"
                            : item.leave_type == "4"
                            ? "Other Leave"
                            : ""}
                        </Text>
                        <Text style={styles.Leavetext}>{item.role_name}</Text>
                        <Text style={styles.Leavetextone}>
                          From {item.date}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.verticalLine} />
                    <View />
                    <View style={styles.resonTextView}>
                      <Text style={styles.resontextone}>Reason : </Text>
                      <View style={styles.redecText}>
                        <Text style={styles.resontext}>{item.reason}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.componantStyle}></View>
                </View>
                <AcceptReject
                  onApprove={() => {
                    //  const status = 1;
                    const itemId = item.id;
                    const reason = "";
                    dispatch(TlLeaveRequstAction(token, "1", itemId, reason));
                  }}
                  onReject={(reason) => {
                    //const status = 2;
                    const itemId = item.id;
                    dispatch(TlLeaveRequstAction(token, "2", itemId, reason));
                  }}
                />
              </View>
            )}
          />
          {/* )} */}
        </View>
      ) : (
        <View>
          <View>
            {isLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 300 }}
                ListEmptyComponent={
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
                }
                data={OnLeaveEmployeeDetails}
                renderItem={({ item }) => (
                  <View style={styles.mainconteiner}>
                    <View style={styles.Flatlistconteiner}>
                      <Image
                        source={item.profile_image}
                        style={styles.profileimage}
                      />
                      <View style={styles.Textconteiner}>
                        <Text style={styles.nametextflat}>
                          {item.first_name}
                        </Text>

                        <Text style={styles.numtext}>{item.role_name}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default PramoterLeave;
