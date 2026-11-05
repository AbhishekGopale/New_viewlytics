import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  clearNotificationData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CLEAR_NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
        clearNotificationData: {},
        error: "",
      };
    case ACTION.CLEAR_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        clearNotificationData: action.payload,
        error: "",
      };
    case ACTION.CLEAR_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        clearNotificationData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
