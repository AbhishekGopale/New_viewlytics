import * as ACTION from "../types";

const initialState = {
  isLoading: false,
  allNotification: {},
  error: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_ALL_NOTIFICATION_LOADING:
      return {
        ...state,
        isLoading: true,
        allNotification: {},
        error: "",
      };
    case ACTION.GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allNotification: action.payload,
        error: "",
      };
    case ACTION.GET_ALL_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading: false,
        allNotification: {},
        error: action.payload,
      };
    default:
      return state;
  }
}
