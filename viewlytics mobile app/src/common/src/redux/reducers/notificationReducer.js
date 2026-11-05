import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  notificationData: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
        notificationData: {},
        error: "",
      };
    case ACTION.NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notificationData: action.payload,
        error: "",
      };
    case ACTION.NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        notificationData: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
