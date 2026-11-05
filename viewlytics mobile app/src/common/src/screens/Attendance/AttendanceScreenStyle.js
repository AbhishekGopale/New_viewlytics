import { StyleSheet } from "react-native";
import { COLORS } from "../../colors/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  headerIcon: {
    height: 20,
    width: 15,
  },
  calendarWrapper: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 12,
    paddingBottom: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dayTile: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  presentTile: {
    backgroundColor: "#2E7D32", // Full solid green block
  },
  absentTile: {
    backgroundColor: "#D32F2F", // Full solid red block
  },
  weekOffTile: {
    backgroundColor: "#1976D2", // Solid blue block
  },
  selectedBorder: {
    borderWidth: 2,
    borderColor: "#FF9800",
  },
  dayNumberText: {
    fontSize: 14,
    color: "#212121",
    fontWeight: "500",
  },
  coloredDayText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  disabledDayText: {
    color: "#BDBDBD",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#424242",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },
  modalCloseText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "bold",
    paddingHorizontal: 6,
  },
  modalDateText: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 16,
  },
  modalStatusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 16,
  },
  modalStatusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  badgePresent: {
    backgroundColor: "#2E7D32",
  },
  badgeAbsent: {
    backgroundColor: "#D32F2F",
  },
  badgeWeekOff: {
    backgroundColor: "#1976D2",
  },
  badgeDefault: {
    backgroundColor: "#757575",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  detailLabel: {
    fontSize: 13,
    color: "#757575",
  },
  detailValue: {
    fontSize: 13,
    color: "#212121",
    fontWeight: "600",
  },
  modalOkBtn: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  modalOkBtnText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
