import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  pushNotificationData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.PUSH_NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
        pushNotificationData: {},
        error: "",
      };
    case ACTION.PUSH_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pushNotificationData: action.payload,
        error: "",
      };
    case ACTION.PUSH_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        pushNotificationData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
