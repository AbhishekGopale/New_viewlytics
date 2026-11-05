import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  deleteNotificationData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.DELETE_NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
        deleteNotificationData: {},
        error: "",
      };
    case ACTION.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteNotificationData: action.payload,
        error: "",
      };
    case ACTION.DELETE_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        deleteNotificationData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
