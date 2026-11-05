//Set all reducer and push them in combine reducers.
import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import sendOtpReducer from "./sendOtpReducer";
import isLoginReducer from "./isLoginReducer";
import logoutReducer from "./logoutReducer";
import notificationReducer from "./notificationReducer";
import marketintelligenceReducer from "./marketintelligenceReducer";
import myProfileReducer from "./myProfileReducer";
import removeAccountReducer from "./removeAccountReducer";
import getAllNotificationReducer from "./getAllNotificationReducer";
import deleteNotificationReducer from "./deleteNotificationReducer";
import clearAllNotificationReducer from "./clearAllNotificationReducer";
import getAllLeavesReducer from "./getAllLeavesReducer";
import changePasswordReucer from "./changePasswordReucer";
import dashboardDetailsReducer from "./dashboardDetailsReducer";
import createLeavesReducer from "./createLeavesReducer";
import salarySlipReducer from "./salarySlipReducer";
import pendingLeavereducer from "./pendingLeavereducer";
import supportDetailsReducer from "./supportDetailsReducer";
import googleformReducer from "./googleformReducer";
import loginArrayReducer from "./loginArrayReducer";
import checkInReducer from "./checkInReducer";
import checkOutReducer from "./checkOutReducer";
import storeListReducer from "./storeListReducer";
import promoListReducer from "./promoListReducer";
import promoUpdateReducer from "./promoUpdateReducer";
import shopperEngagemnetReducer from "./shopperEngagemnetReducer";
import MeetingReducer from "./MeetingReducer";
import adminWorkReducer from "./adminWorkReducer";
import leaveReducer from "./leaveReducer";
import leaveUpdateReducer from "./leaveUpdateReducer";
import tlAttandanceDetailsReducer from "./tlAttandanceDetailsReducer";
import competitionAnalysisReducer from "./competitionAnalysisReducer";
import totalEmployeeTLReducer from "./totalEmployeeTLReducer";
import presentEmployeeTLReducer from "./presentEmployeeTLReducer";
import weekOffEmployeeTLReducer from "./weekOffEmployeeTLReducer";
import absentEmployeeTLReducer from "./absentEmployeeTLReducer";
import onLeaveEmployeeTLReducer from "./onLeaveEmployeeTLReducer";
import leaveRequstEmployeeTLReducer from "./leaveRequstEmployeeTLReducer";
import openingAllcategoryReducer from "./openingAllcategoryReducer";
import categoryListReducer from "./categoryListReducer";
import isCheckInReducer from "./isCheckInReducer";
import assestTrackingReducer from "./assestTrackingReducer";
import assestListReducer from "./assestListReducer";
import storeDetailsReducer from "./storeDetailsReducer";
import dashboardCountReducer from "./dashboardCountReducer";
import fildVisitDetaisReducer from "./fildVisitDetaisReducer";
import verifedStoreReducer from "./verifedStoreReducer";
import trakingAssetReducer from "./trakingAssetReducer";
import assetTrackingDataReducer from "./assetTrackingDataReducer";
import assetTrackingDataListReducer from "./assetTrackingDataListReducer";
import attendanceListReducer from "./attendanceListReducer";
import openingCreateDataReducer from "./openingCreateDataReducer";
import newStockListReducer from "./newStockListReducer";
import newStockCreateDataReducer from "./newStockCreateDataReducer";
import closingStockListReducer from "./closingStockListReducer";
import closingStockCreateDataReducer from "./closingStockCreateDataReducer";
import dsrReducer from "./dsrReducer";
import sosReportCreateReducer from "./sosReportCreateReducer";
import oosReportCreateReducer from "./oosReportCreateReducer";
import mapDataCreateReducer from "./mapDataCreateReducer";
import sosReportDataReducer from "./sosReportDataReducer";
import checkInOutReducer from "./checkInOutReducer";
import remainingFromCountReducer from "./remainingFromCountReducer";
import promoterTlDashbordReducer from "./promoterTlDashbordReducer";
import merDashbordReducer from "./merDashbordReducer";
import salesHealthReducer from "./salesHealthReducer";
import leaveRequstReducer from "./leaveRequstReducer";
import fildVisitReducer from "./fildVisitReducer";
import profileUpdateReducer from "./profileUpdateReducer";
import competitionanalysisPostReducer from "./competitionanalysisPostReducer";
import shopperEngagementReducer from "./shopperEngagementReducer";
import pushNotificationReducer from "./pushNotificationReducer";
import formDisableReducer from "./formDisableReducer";
import updateLeaveReducer from "./updateLeaveReducer";
import ToastMessageReducer from "./ToastMessageReducer";
import offlineFormStatusReducer from "./offlineFormStatusReducer";
import logoutcheckoutReducer from "./logoutcheckoutReducer";
import distanceReducer from "./distanceReducer";
import errorReducer from "./errorReducer";
import leaveTypeReducer from "./leaveTypeReducer";
import merstoreListReducer from "./merstoreListReducer";
import attendanceOptionReducer from "./attendanceOptionReducer";
import dyanamicFromReducer from "./dyanamicFromReducer";
import offlineNewCreateReducer from "./offlineNewCreateReducer";
import offlineClosingCreateReducer from "./offlineClosingCreateReducer";
import offlineSosCreateReducer from "./offlineSosCreateReducer";
import offlineOssCreateReducer from "./offlineOssCreateReducer";
import offlineShopperReducer from "./offlineShopperReducer";
import offlinePromoCreateReducer from "./offlinePromoCreateReducer";
import offlineMarketIntelligenceCreateReducer from "./offlineMarketIntelligenceCreateReducer";
import competitionBrandReducer from "./competitionBrandReducer";
import compititionDataReducer from "./compititionDataReducer";
import offlineCompetitionBrandReducer from "./offlineCompetitionBrandReducer";
import offlineMeetingReducer from "./offlineMeetingReducer";
import offlineAdminWorkReducer from "./offlineAdminWorkReducer";
import offlineFildVisitReducer from "./offlineFildVisitReducer";
import offlineMerAssestReducer from "./offlineMerAssestReducer";
import DaynamicWebFormReducer from "./DaynamicWebFormReducer";
import sosCategoryReducer from "./sosCategoryReducer";
import offlineOpeningClosingNewReducer from "./offlineOpeningClosingNewReducer";

const rootReducer = combineReducers({
  Login: loginReducer,
  ForgotPassword: forgotPasswordReducer,
  SendOtp: sendOtpReducer,
  isLogin: isLoginReducer,
  Logout: logoutReducer,
  Notification: notificationReducer,
  ChangePassword: changePasswordReucer,
  MyProfile: myProfileReducer,
  RemoveAccount: removeAccountReducer,
  GetAllNotification: getAllNotificationReducer,
  DeleteNotification: deleteNotificationReducer,
  ClearNotification: clearAllNotificationReducer,
  GetAllLeaves: getAllLeavesReducer,
  GetDashboardDetails: dashboardDetailsReducer,
  CreateLeaves: createLeavesReducer,
  SalarySlip: salarySlipReducer,
  pandingLeave: pendingLeavereducer,
  SupportDetails: supportDetailsReducer,
  GoogleEForm: googleformReducer,
  LoginArray: loginArrayReducer,
  checkIn: checkInReducer,
  checkOutReducer: checkOutReducer,
  storeListReducer: storeListReducer,
  promoListReducer: promoListReducer,
  promoUpdateReducer: promoUpdateReducer,
  shopperEngagemnetReducer: shopperEngagemnetReducer,
  MeetingReducer: MeetingReducer,
  adminWorkReducer: adminWorkReducer,
  leaveReducer: leaveReducer,
  leaveUpdateReducer: leaveUpdateReducer,
  tlAttandanceDetailsReducer: tlAttandanceDetailsReducer,
  competitionAnalysisReducer: competitionAnalysisReducer,
  totalEmployeeTLReducer: totalEmployeeTLReducer,
  presentEmployeeTLReducer: presentEmployeeTLReducer,
  weekOffEmployeeTLReducer: weekOffEmployeeTLReducer,
  absentEmployeeTLReducer: absentEmployeeTLReducer,
  onLeaveEmployeeTLReducer: onLeaveEmployeeTLReducer,
  leaveRequstEmployeeTLReducer: leaveRequstEmployeeTLReducer,
  openingAllcategoryReducer: openingAllcategoryReducer,
  categoryListReducer: categoryListReducer,
  isCheckInReducer: isCheckInReducer,
  assestTrackingReducer: assestTrackingReducer,
  assestListReducer: assestListReducer,
  storeDetailsReducer: storeDetailsReducer,
  DashboardCountList: dashboardCountReducer,
  fildVisitDetaisReducer: fildVisitDetaisReducer,
  verifedStoreReducer: verifedStoreReducer,
  trakingAssetReducer: trakingAssetReducer,
  assetTrackingDataReducer: assetTrackingDataReducer,
  assetTrackingDataListReducer: assetTrackingDataListReducer,
  attendanceListReducer: attendanceListReducer,
  openingCreateDataReducer: openingCreateDataReducer,
  newStockListReducer: newStockListReducer,
  newStockCreateDataReducer: newStockCreateDataReducer,
  closingStockListReducer: closingStockListReducer,
  closingStockCreateDataReducer: closingStockCreateDataReducer,
  dsrReducer: dsrReducer,
  sosReportCreateReducer: sosReportCreateReducer,
  oosReportCreateReducer: oosReportCreateReducer,
  mapDataCreateReducer: mapDataCreateReducer,
  sosReportDataReducer: sosReportDataReducer,
  checkInOutReducer: checkInOutReducer,
  remainingFromCountReducer: remainingFromCountReducer,
  promoterTlDashbordReducer: promoterTlDashbordReducer,
  merDashbordReducer: merDashbordReducer,
  salesHealthReducer: salesHealthReducer,
  leaveRequstReducer: leaveRequstReducer,
  fildVisit: fildVisitReducer,
  profileUpdateReducer: profileUpdateReducer,
  competitionanalysisPostReducer: competitionanalysisPostReducer,
  shopperEngagementReducer: shopperEngagementReducer,
  pushNotificationReducer: pushNotificationReducer,
  formDisableReducer: formDisableReducer,
  updateLeaveReducer: updateLeaveReducer,
  toastMessageReducer: ToastMessageReducer,
  offlineStatusReducer: offlineFormStatusReducer,
  logoutcheckoutReducer: logoutcheckoutReducer,
  marketintelligenceReducer: marketintelligenceReducer,
  distanceReducer: distanceReducer,
  errorReducer: errorReducer,
  leaveTypeReducer: leaveTypeReducer,
  merstoreListReducer: merstoreListReducer,
  attendanceOptionReducer: attendanceOptionReducer,
  dyanamicFromReducer: dyanamicFromReducer,
  offlineNewCreateReducer: offlineNewCreateReducer,
  offlineClosingCreateReducer: offlineClosingCreateReducer,
  offlineSosCreateReducer: offlineSosCreateReducer,
  offlineOssCreateReducer: offlineOssCreateReducer,
  offlineShopperReducer: offlineShopperReducer,
  offlinePromoCreateReducer: offlinePromoCreateReducer,
  offlineMarketIntelligenceCreateReducer:
    offlineMarketIntelligenceCreateReducer,
  competitionBrandReducer: competitionBrandReducer,
  compititionDataReducer: compititionDataReducer,
  offlineCompetitionBrandReducer: offlineCompetitionBrandReducer,
  offlineMeetingReducer: offlineMeetingReducer,
  offlineAdminWorkReducer: offlineAdminWorkReducer,
  offlineFildVisitReducer: offlineFildVisitReducer,
  offlineMerAssestReducer: offlineMerAssestReducer,
  DaynamicWebFormReducer: DaynamicWebFormReducer,
  sosCategoryReducer: sosCategoryReducer,
  offlineOpeningClosingNewReducer: offlineOpeningClosingNewReducer,
});
export default rootReducer;
